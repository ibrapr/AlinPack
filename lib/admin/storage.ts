import { promises as fs } from 'node:fs';
import path from 'node:path';
import { revalidatePath } from 'next/cache';

export type ContentFile =
  | 'machines.json'
  | 'products.json'
  | 'clients.json'
  | 'success-stories.json'
  | 'services.json';

const REPO_PATH_PREFIX = 'data/content';

export interface StorageInfo {
  mode: 'github' | 'local';
  repoOwner?: string;
  repoName?: string;
  branch?: string;
}

export function getStorageInfo(): StorageInfo {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
    return {
      mode: 'github',
      repoOwner: process.env.GITHUB_OWNER,
      repoName: process.env.GITHUB_REPO,
      branch: process.env.GITHUB_BRANCH || 'main',
    };
  }
  return { mode: 'local' };
}

async function readLocal<T>(file: ContentFile): Promise<T> {
  const full = path.join(process.cwd(), REPO_PATH_PREFIX, file);
  const text = await fs.readFile(full, 'utf-8');
  return JSON.parse(text) as T;
}

async function writeLocal(file: ContentFile, value: unknown): Promise<void> {
  const full = path.join(process.cwd(), REPO_PATH_PREFIX, file);
  await fs.writeFile(full, JSON.stringify(value, null, 2) + '\n', 'utf-8');
}

interface GhFile {
  content: string;
  sha: string;
}

async function ghGet(file: ContentFile): Promise<GhFile> {
  const info = getStorageInfo();
  if (info.mode !== 'github') throw new Error('GitHub storage not configured');
  const url = `https://api.github.com/repos/${info.repoOwner}/${info.repoName}/contents/${REPO_PATH_PREFIX}/${file}?ref=${info.branch}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub GET ${file} failed: ${res.status} ${txt}`);
  }
  const data = (await res.json()) as { content: string; sha: string; encoding: string };
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

async function ghPut(file: ContentFile, content: string, message: string, sha?: string): Promise<void> {
  const info = getStorageInfo();
  if (info.mode !== 'github') throw new Error('GitHub storage not configured');
  const url = `https://api.github.com/repos/${info.repoOwner}/${info.repoName}/contents/${REPO_PATH_PREFIX}/${file}`;
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: info.branch!,
  };
  if (sha) body.sha = sha;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub PUT ${file} failed: ${res.status} ${txt}`);
  }
}

/**
 * Save an arbitrary binary file (e.g. an image) under /public/.
 *
 * Local mode: writes to disk at public/<relativePath>.
 * GitHub mode: commits the file to public/<relativePath> in the repo via Contents API.
 *
 * @param relativePath Path inside /public, e.g. `machines/my-machine.jpg`
 * @param data         Raw bytes
 * @param message      Commit message (GitHub mode)
 * @returns Public URL the file will be served at (e.g. `/machines/my-machine.jpg`)
 */
export async function writeBinaryAsset(
  relativePath: string,
  data: Buffer,
  message: string,
): Promise<string> {
  const cleanRel = relativePath.replace(/^\/+/, '').replace(/\\/g, '/');
  const info = getStorageInfo();

  if (info.mode === 'github') {
    const repoPath = `public/${cleanRel}`;
    // Check for existing file (for sha to overwrite)
    const existing = await ghGetRaw(repoPath).catch(() => null);
    await ghPutRaw(repoPath, data, message, existing?.sha);
  } else {
    const full = path.join(process.cwd(), 'public', cleanRel);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, data);
  }

  return `/${cleanRel}`;
}

async function ghGetRaw(repoPath: string): Promise<{ sha: string } | null> {
  const info = getStorageInfo();
  if (info.mode !== 'github') return null;
  const url = `https://api.github.com/repos/${info.repoOwner}/${info.repoName}/contents/${repoPath}?ref=${info.branch}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET ${repoPath}: ${res.status}`);
  const data = (await res.json()) as { sha: string };
  return { sha: data.sha };
}

async function ghPutRaw(repoPath: string, data: Buffer, message: string, sha?: string): Promise<void> {
  const info = getStorageInfo();
  if (info.mode !== 'github') throw new Error('GitHub storage not configured');
  const url = `https://api.github.com/repos/${info.repoOwner}/${info.repoName}/contents/${repoPath}`;
  const body: Record<string, string> = {
    message,
    content: data.toString('base64'),
    branch: info.branch!,
  };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub PUT ${repoPath} failed: ${res.status} ${txt}`);
  }
}

export async function readContent<T>(file: ContentFile): Promise<T> {
  const info = getStorageInfo();
  if (info.mode === 'github') {
    const gh = await ghGet(file);
    return JSON.parse(gh.content) as T;
  }
  return readLocal<T>(file);
}

export async function writeContent(
  file: ContentFile,
  value: unknown,
  message: string,
): Promise<void> {
  const info = getStorageInfo();
  if (info.mode === 'github') {
    const existing = await ghGet(file).catch(() => null);
    const json = JSON.stringify(value, null, 2) + '\n';
    await ghPut(file, json, message, existing?.sha);
  } else {
    await writeLocal(file, value);
  }
  // Best-effort revalidation; pages will rebuild on next request.
  try {
    revalidatePath('/', 'layout');
  } catch {
    /* not in request context */
  }
}
