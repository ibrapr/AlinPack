import { NextRequest, NextResponse } from 'next/server';
import { readContent, writeContent } from '@/lib/admin/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContactRequest {
  id: string;
  createdAt: string;
  locale: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  product: string;
  message: string;
}

function clean(value: FormDataEntryValue | null): string {
  return String(value ?? '').trim();
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const request: ContactRequest = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    locale: clean(form.get('locale')) || 'en',
    name: clean(form.get('name')),
    company: clean(form.get('company')),
    phone: clean(form.get('phone')),
    email: clean(form.get('email')),
    product: clean(form.get('product')),
    message: clean(form.get('message')),
  };

  if (!request.name || !request.phone || !request.email || !request.message) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
  }

  if (!validEmail(request.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const existing = await readContent<ContactRequest[]>('contact-requests.json').catch(() => []);
  await writeContent(
    'contact-requests.json',
    [request, ...existing].slice(0, 500),
    `chore(contact): add request from ${request.name}`,
  );

  return NextResponse.json({ ok: true });
}
