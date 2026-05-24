'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Trash2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Client } from '@/data/types';
import { TextInput } from './fields';
import { ImageUpload } from './ImageUpload';
import { saveClientsAction } from '@/app/admin/actions';

export default function ClientsEditor({ initial }: { initial: Client[] }) {
  const router = useRouter();
  const [list, setList] = useState<Client[]>(initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  const update = (i: number, patch: Partial<Client>) => {
    setList((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  };

  const updateIndustry = (i: number, locale: 'en' | 'he', value: string) => {
    setList((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], industry: { ...next[i].industry, [locale]: value } };
      return next;
    });
  };

  const remove = (i: number) => {
    setList((prev) => prev.filter((_, idx) => idx !== i));
  };

  const add = () => {
    setList((prev) => [...prev, { name: '', industry: { en: '', he: '' } }]);
  };

  const onSave = () => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      try {
        await saveClientsAction(list);
        setSuccess(true);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to save.');
      }
    });
  };

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a
            href="/admin"
            className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500 hover:text-brand-red"
          >
            ← Back to dashboard
          </a>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-brand-gray-600">
            {list.length} {list.length === 1 ? 'company' : 'companies'} displayed on the public site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={add} className="btn-outline">
            <Plus className="h-4 w-4" />
            Add client
          </button>
          <button type="button" onClick={onSave} disabled={pending} className="btn-primary">
            <Save className="h-4 w-4" />
            {pending ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </header>

      {error && (
        <div className="mt-6 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && !error && (
        <div className="mt-6 flex items-start gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
          Saved.
        </div>
      )}

      <div className="mt-8 space-y-3">
        {list.map((client, i) => (
          <div
            key={i}
            className="grid items-start gap-4 rounded-2xl border border-brand-gray-200 bg-white p-4 lg:grid-cols-[220px_1fr_auto]"
          >
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-500">
                Client image / logo
              </label>
              <ImageUpload
                value={client.logo || client.image}
                onChange={(url) => update(i, { logo: url, image: undefined })}
                slug={client.name || 'client'}
                folder="clients"
                className="mt-1"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-500">
                  Company name
                </label>
                <TextInput
                  value={client.name}
                  onChange={(e) => update(i, { name: e.target.value })}
                  placeholder="e.g. Premium Dairy Co."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-500">
                  Industry · EN
                </label>
                <TextInput
                  value={client.industry.en}
                  onChange={(e) => updateIndustry(i, 'en', e.target.value)}
                  placeholder="e.g. Dairy"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gray-500">
                  Industry · HE
                </label>
                <TextInput
                  dir="rtl"
                  value={client.industry.he}
                  onChange={(e) => updateIndustry(i, 'he', e.target.value)}
                  placeholder="לדוגמה: מוצרי חלב"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end lg:items-start">
              <button
                type="button"
                onClick={() => remove(i)}
                className="inline-flex items-center gap-1 rounded-lg border border-brand-gray-200 px-3 py-2 text-xs font-semibold text-brand-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <div className="rounded-2xl border border-dashed border-brand-gray-300 bg-white p-12 text-center">
            <p className="text-sm text-brand-gray-600">No clients yet. Click "Add client" to add one.</p>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-end gap-2 border-t border-brand-gray-200 pt-6">
        <button type="button" onClick={add} className="btn-outline">
          <Plus className="h-4 w-4" />
          Add client
        </button>
        <button type="button" onClick={onSave} disabled={pending} className="btn-primary">
          <Save className="h-4 w-4" />
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
