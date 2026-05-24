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

const CONTACT_TO_EMAIL = 'ibrapro26@gmail.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Alin Pack Website <onboarding@resend.dev>';

function clean(value: FormDataEntryValue | null): string {
  return String(value ?? '').trim();
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function emailText(request: ContactRequest): string {
  return [
    'New request from Alin Pack website',
    '',
    `Name: ${request.name}`,
    `Company: ${request.company || '-'}`,
    `Phone: ${request.phone}`,
    `Email: ${request.email}`,
    `Product / Machine: ${request.product || '-'}`,
    `Language: ${request.locale}`,
    `Submitted: ${request.createdAt}`,
    '',
    'Message:',
    request.message,
  ].join('\n');
}

async function sendEmail(request: ContactRequest): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_xxx') return false;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: request.email,
      subject: `New Alin Pack request from ${request.name}`,
      text: emailText(request),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email send failed: ${res.status} ${text}`);
  }

  return true;
}

async function saveRequest(request: ContactRequest): Promise<boolean> {
  try {
    const existing = await readContent<ContactRequest[]>('contact-requests.json').catch(() => []);
    await writeContent(
      'contact-requests.json',
      [request, ...existing].slice(0, 500),
      `chore(contact): add request from ${request.name}`,
    );
    return true;
  } catch (error) {
    console.error('Contact request save failed:', error);
    return false;
  }
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

  const saved = await saveRequest(request);
  let emailed = false;

  try {
    emailed = await sendEmail(request);
  } catch (error) {
    console.error('Contact request email failed:', error);
  }

  if (!saved && !emailed) {
    return NextResponse.json(
      { error: 'Request could not be sent. Please contact us on WhatsApp.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, emailed, saved, to: CONTACT_TO_EMAIL });
}
