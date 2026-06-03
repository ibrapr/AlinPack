'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

interface ContactFormProps {
  locale: Locale;
  defaultProduct?: string;
}

export default function ContactForm({ locale, defaultProduct }: ContactFormProps) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    try {
      const form = new FormData(e.currentTarget);
      form.append('locale', locale);
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: form,
      });
      if (!res.ok) throw new Error('Submit failed');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-brand-gray-200 bg-white p-6 sm:p-8 shadow-soft">
      <h3 className="heading-sm">{dict.contact.form.title}</h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label={dict.contact.form.name} required>
          <input
            type="text"
            name="name"
            required
            placeholder={dict.contact.form.namePlaceholder}
            className="input"
          />
        </Field>
        <Field label={dict.contact.form.company}>
          <input
            type="text"
            name="company"
            placeholder={dict.contact.form.companyPlaceholder}
            className="input"
          />
        </Field>
        <Field label={dict.contact.form.phone} required>
          <input
            type="tel"
            name="phone"
            required
            placeholder={dict.contact.form.phonePlaceholder}
            className="input"
          />
        </Field>
        <Field label={dict.contact.form.email} required>
          <input
            type="email"
            name="email"
            required
            placeholder={dict.contact.form.emailPlaceholder}
            className="input"
          />
        </Field>
        <Field label={dict.contact.form.product} className="sm:col-span-2">
          <input
            type="text"
            name="product"
            defaultValue={defaultProduct}
            placeholder={dict.contact.form.productPlaceholder}
            className="input"
          />
        </Field>
        <Field label={dict.contact.form.message} required className="sm:col-span-2">
          <textarea
            name="message"
            required
            rows={5}
            placeholder={dict.contact.form.messagePlaceholder}
            className="input resize-none"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary text-base px-7 py-3.5"
        >
          {status === 'sending' ? dict.contact.form.submitting : dict.contact.form.submit}
          <Send className="h-4 w-4 rtl-flip" />
        </button>

        {status === 'success' && (
          <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {dict.contact.form.success}
          </p>
        )}
        {status === 'error' && (
          <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-red">
            <AlertCircle className="h-4 w-4" />
            {dict.contact.form.error}
          </p>
        )}
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid #E4E4E7;
          background: #fff;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: #0B1F3A;
          transition: border-color 150ms, box-shadow 150ms;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #0B5DAA;
          box-shadow: 0 0 0 3px rgba(11, 93, 170, 0.15);
        }
        :global(.input::placeholder) {
          color: #A1A1AA;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={className}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-gray-600">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </span>
      {children}
    </label>
  );
}
