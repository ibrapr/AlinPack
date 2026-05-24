import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin/auth';
import { writeBinaryAsset } from '@/lib/admin/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB — Vercel serverless body limit is ~4.5MB

function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64) || 'machine';
}

function extensionFor(mime: string, filename: string): string {
  const fromName = filename.split('.').pop();
  if (fromName && fromName.length <= 5 && /^[a-zA-Z0-9]+$/.test(fromName)) {
    return fromName.toLowerCase();
  }
  switch (mime) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/svg+xml':
      return 'svg';
    default:
      return 'bin';
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const fileRaw = form.get('file');
  const slugRaw = String(form.get('slug') || 'machine');
  const folder = String(form.get('folder') || 'machines');

  // Duck-typed File-like check (Node 18 doesn't expose `File` globally)
  const file =
    fileRaw && typeof fileRaw === 'object' && 'arrayBuffer' in fileRaw && 'type' in fileRaw && 'name' in fileRaw
      ? (fileRaw as unknown as { arrayBuffer: () => Promise<ArrayBuffer>; type: string; name: string; size: number })
      : null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type "${file.type}". Use JPG, PNG, WebP, GIF, or SVG.` },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 4MB.` },
      { status: 400 },
    );
  }

  const arrayBuf = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  const safeFolder = folder.replace(/[^a-z0-9/-]/gi, '').replace(/^\/+|\/+$/g, '') || 'machines';
  const slug = sanitizeSlug(slugRaw);
  const ext = extensionFor(file.type, file.name);
  const timestamp = Date.now().toString(36);
  const filename = `${slug}-${timestamp}.${ext}`;
  const relativePath = `${safeFolder}/${filename}`;

  try {
    const url = await writeBinaryAsset(relativePath, buffer, `chore(admin): upload ${filename}`);
    return NextResponse.json({ url });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Upload failed.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
