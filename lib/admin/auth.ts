import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'alinpack_admin';
const SESSION_DAYS = 7;

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64urlEncode(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  // btoa is available in both Edge and Node runtimes
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str: string): Uint8Array {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return b64urlEncode(new Uint8Array(sig));
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'dev-only-insecure-secret';
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export async function createSessionToken(): Promise<string> {
  const payload = { exp: Date.now() + SESSION_DAYS * 86400_000 };
  const payloadB64 = b64urlEncode(enc.encode(JSON.stringify(payload)));
  const sig = await hmac(getSecret(), payloadB64);
  return `${payloadB64}.${sig}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payloadB64, sig] = token.split('.');
  if (!payloadB64 || !sig) return false;
  const expected = await hmac(getSecret(), payloadB64);
  if (!constantTimeEqual(expected, sig)) return false;
  try {
    const payloadJson = dec.decode(b64urlDecode(payloadB64));
    const payload = JSON.parse(payloadJson) as { exp?: number };
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const c = cookies().get(ADMIN_COOKIE);
  return verifySessionToken(c?.value);
}

export function getAdminPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

export function verifyAdminPassword(input: string): boolean {
  const expected = getAdminPassword();
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < input.length; i++) result |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  return result === 0;
}
