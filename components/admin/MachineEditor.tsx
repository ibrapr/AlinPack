'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, Trash2, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Machine, MachineCategory, Product, LocalizedString } from '@/data/types';
import {
  FieldRow,
  TextInput,
  LocalizedInput,
  LocalizedArrayEditor,
  LocalizedPairListEditor,
  MultiSelectChips,
  Select,
  Checkbox,
} from './fields';
import { ImageUpload, ImageGalleryUpload } from './ImageUpload';
import VideoUrlList from './VideoUrlList';
import { saveMachineAction, deleteMachineAction } from '@/app/admin/actions';

interface MachineEditorProps {
  initial: Machine;
  products: Product[];
  isNew: boolean;
}

const categoryOptions: { value: MachineCategory; label: string }[] = [
  { value: 'filling', label: 'Filling' },
  { value: 'sealing', label: 'Sealing' },
  { value: 'capping', label: 'Capping' },
  { value: 'wrapping', label: 'Wrapping' },
  { value: 'labeling', label: 'Labeling' },
  { value: 'line', label: 'Complete line' },
];

const emptyLocalized: LocalizedString = { en: '', he: '' };

export default function MachineEditor({ initial, products, isNew }: MachineEditorProps) {
  const router = useRouter();
  const [machine, setMachine] = useState<Machine>(initial);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();

  const set = <K extends keyof Machine>(key: K, value: Machine[K]) =>
    setMachine((prev) => ({ ...prev, [key]: value }));

  const onSave = () => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      try {
        await saveMachineAction(machine, isNew ? undefined : initial.slug);
        setSuccess(true);
        if (isNew) {
          router.push(`/admin/machines/${machine.slug}`);
        } else if (machine.slug !== initial.slug) {
          router.push(`/admin/machines/${machine.slug}`);
        } else {
          router.refresh();
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to save.');
      }
    });
  };

  const onDelete = () => {
    if (!confirm(`Delete "${machine.name.en}"? This cannot be undone.`)) return;
    setError(null);
    startDelete(async () => {
      try {
        await deleteMachineAction(initial.slug);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to delete.');
      }
    });
  };

  const productOptions = products.map((p) => ({ value: p.slug, label: p.name.en }));

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/machines"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-gray-500 hover:text-brand-red"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to machines
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {isNew ? 'New machine' : machine.name.en || 'Untitled machine'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting || pending}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={pending || deleting}
            className="btn-primary"
          >
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

      <div className="mt-8 space-y-6">
        <Section title="Basics">
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldRow label="Slug" hint="URL identifier · lowercase, hyphens">
              <TextInput
                value={machine.slug}
                onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                placeholder="e.g. piston-filler-pf-3000"
              />
            </FieldRow>
            <FieldRow label="Category">
              <Select
                value={machine.category}
                onChange={(v) => set('category', v)}
                options={categoryOptions}
              />
            </FieldRow>
          </div>
          <FieldRow label="Name (EN / HE)">
            <LocalizedInput value={machine.name} onChange={(v) => set('name', v)} />
          </FieldRow>
          <FieldRow label="Short description" hint="One-line summary shown on cards">
            <LocalizedInput
              value={machine.shortDescription}
              onChange={(v) => set('shortDescription', v)}
              type="textarea"
            />
          </FieldRow>
          <FieldRow label="Full description" hint="Shown on the machine detail page">
            <LocalizedInput
              value={machine.description}
              onChange={(v) => set('description', v)}
              type="textarea"
            />
          </FieldRow>
          <FieldRow label="Visibility">
            <Checkbox
              checked={!!machine.featured}
              onChange={(v) => set('featured', v)}
              label="Feature on homepage"
            />
          </FieldRow>
        </Section>

        <Section
          title="Images"
          subtitle="Main image is shown on machine cards and the detail page hero. Gallery images are shown below the hero."
        >
          <FieldRow label="Main image">
            <ImageUpload
              value={machine.image}
              onChange={(url) => set('image', url)}
              slug={machine.slug || 'machine'}
            />
          </FieldRow>
          <FieldRow label="Gallery">
            <ImageGalleryUpload
              values={machine.gallery || []}
              onChange={(urls) => set('gallery', urls)}
              slug={machine.slug || 'machine'}
            />
          </FieldRow>
        </Section>

        <Section
          title="Videos"
          subtitle="Show how the machine works. Paste YouTube or Vimeo URLs — they render as embedded players on the machine detail page."
        >
          <VideoUrlList
            values={machine.videos || []}
            onChange={(urls) => set('videos', urls)}
          />
        </Section>

        <Section
          title="Compatible products"
          subtitle="Tick every product this machine can package — the product page automatically lists this machine."
        >
          <MultiSelectChips
            options={productOptions}
            selected={machine.compatibleProductSlugs}
            onChange={(v) => set('compatibleProductSlugs', v)}
          />
        </Section>

        <Section title="Features">
          <LocalizedArrayEditor
            value={machine.features}
            onChange={(v) => set('features', v)}
            itemPlaceholder="Feature"
            addLabel="Add feature"
          />
        </Section>

        <Section title="Benefits">
          <LocalizedArrayEditor
            value={machine.benefits}
            onChange={(v) => set('benefits', v)}
            itemPlaceholder="Benefit"
            addLabel="Add benefit"
          />
        </Section>

        <Section title="Technical specifications">
          <LocalizedPairListEditor
            value={machine.specs}
            onChange={(v) => set('specs', v as Machine['specs'])}
            emptyItem={() => ({ label: { ...emptyLocalized }, value: { ...emptyLocalized } })}
            fields={[
              { key: 'label', label: 'Label' },
              { key: 'value', label: 'Value' },
            ]}
            addLabel="Add specification"
          />
        </Section>

        <Section title="FAQs">
          <LocalizedPairListEditor
            value={machine.faqs}
            onChange={(v) => set('faqs', v as Machine['faqs'])}
            emptyItem={() => ({ question: { ...emptyLocalized }, answer: { ...emptyLocalized } })}
            fields={[
              { key: 'question', label: 'Question' },
              { key: 'answer', label: 'Answer', type: 'textarea' },
            ]}
            addLabel="Add FAQ"
          />
        </Section>
      </div>

      <div className="mt-10 flex justify-end gap-2 border-t border-brand-gray-200 pt-6">
        <Link href="/admin/machines" className="btn-outline">
          Cancel
        </Link>
        <button
          type="button"
          onClick={onSave}
          disabled={pending || deleting}
          className="btn-primary"
        >
          <Save className="h-4 w-4" />
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-brand-gray-200 bg-white p-6 sm:p-7">
      <h2 className="text-lg font-bold text-brand-black">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-brand-gray-600">{subtitle}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}
