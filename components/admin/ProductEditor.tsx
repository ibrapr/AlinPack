'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, Trash2, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Product, ProductGroup, Machine } from '@/data/types';
import {
  FieldRow,
  TextInput,
  LocalizedInput,
  LocalizedArrayEditor,
  MultiSelectChips,
  Select,
} from './fields';
import { ImageUpload } from './ImageUpload';
import { saveProductAction, deleteProductAction } from '@/app/admin/actions';

interface ProductEditorProps {
  initial: Product;
  isNew: boolean;
  machines: { slug: string; name: string }[];
  selectedMachineSlugs: string[];
}

const groupOptions: { value: ProductGroup; label: string }[] = [
  { value: 'food', label: 'Food & Beverage' },
  { value: 'cosmetics', label: 'Cosmetics & Personal Care' },
  { value: 'chemicals', label: 'Detergents & Chemicals' },
  { value: 'pet', label: 'Pet Food' },
  { value: 'containers', label: 'Containers & Formats' },
];

const iconOptions = [
  'box', 'milk', 'bottle', 'honey', 'coffee', 'tea', 'powder', 'droplet',
  'sparkles', 'spray', 'apple', 'leaf', 'beef', 'fish', 'paw', 'salad',
  'meal', 'tahini', 'jar', 'cup', 'container', 'bucket', 'pouch',
];

export default function ProductEditor({
  initial,
  isNew,
  machines,
  selectedMachineSlugs,
}: ProductEditorProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product>(initial);
  const [linkedMachines, setLinkedMachines] = useState<string[]>(selectedMachineSlugs);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setProduct((prev) => ({ ...prev, [key]: value }));

  const onSave = () => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      try {
        await saveProductAction(product, isNew ? undefined : initial.slug, linkedMachines);
        setSuccess(true);
        if (isNew || product.slug !== initial.slug) {
          router.push(`/admin/products/${product.slug}`);
        } else {
          router.refresh();
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to save.');
      }
    });
  };

  const onDelete = () => {
    if (
      !confirm(
        `Delete "${product.name.en}"? This will also unlink it from any machines. This cannot be undone.`,
      )
    )
      return;
    setError(null);
    startDelete(async () => {
      try {
        await deleteProductAction(initial.slug);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to delete.');
      }
    });
  };

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-gray-500 hover:text-brand-red"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to products
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {isNew ? 'New product' : product.name.en || 'Untitled product'}
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
          <button type="button" onClick={onSave} disabled={pending || deleting} className="btn-primary">
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
          <div className="grid gap-5 sm:grid-cols-3">
            <FieldRow label="Slug" hint="lowercase + hyphens">
              <TextInput
                value={product.slug}
                onChange={(e) =>
                  set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
                }
              />
            </FieldRow>
            <FieldRow label="Group">
              <Select
                value={product.group}
                onChange={(v) => set('group', v)}
                options={groupOptions}
              />
            </FieldRow>
            <FieldRow label="Icon">
              <Select
                value={product.icon || 'box'}
                onChange={(v) => set('icon', v)}
                options={iconOptions.map((i) => ({ value: i, label: i }))}
              />
            </FieldRow>
          </div>
          <FieldRow label="Name (EN / HE)">
            <LocalizedInput value={product.name} onChange={(v) => set('name', v)} />
          </FieldRow>
          <FieldRow label="Short description">
            <LocalizedInput
              value={product.shortDescription}
              onChange={(v) => set('shortDescription', v)}
              type="textarea"
            />
          </FieldRow>
          <FieldRow label="Full description">
            <LocalizedInput
              value={product.description}
              onChange={(v) => set('description', v)}
              type="textarea"
            />
          </FieldRow>
        </Section>

        <Section title="Image" subtitle="Shown on product cards and the product detail page.">
          <FieldRow label="Product image">
            <ImageUpload
              value={product.image}
              onChange={(url) => set('image', url)}
              slug={product.slug || 'product'}
              folder="products"
            />
          </FieldRow>
        </Section>

        <Section
          title="Compatible machines"
          subtitle="Select every machine that can package this product. The public machine and product pages update together."
        >
          {machines.length > 0 ? (
            <MultiSelectChips
              options={machines.map((m) => ({ value: m.slug, label: m.name }))}
              selected={linkedMachines}
              onChange={setLinkedMachines}
            />
          ) : (
            <p className="text-sm text-brand-gray-600">
              No machines have been added yet.
            </p>
          )}
        </Section>

        <Section title="Packaging needs">
          <LocalizedArrayEditor
            value={product.packagingNeeds}
            onChange={(v) => set('packagingNeeds', v)}
            itemPlaceholder="Need"
            addLabel="Add need"
          />
        </Section>

        <Section title="Common packaging types">
          <LocalizedArrayEditor
            value={product.packagingTypes}
            onChange={(v) => set('packagingTypes', v)}
            itemPlaceholder="Type"
            addLabel="Add type"
          />
        </Section>

        {!isNew && linkedMachines.length > 0 && (
          <Section title="Open linked machine editors">
            <div className="flex flex-wrap gap-2">
              {machines
                .filter((m) => linkedMachines.includes(m.slug))
                .map((m) => (
                  <Link
                    key={m.slug}
                    href={`/admin/machines/${m.slug}`}
                    className="inline-flex rounded-full border border-brand-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-gray-700 hover:border-brand-red hover:text-brand-red"
                  >
                    {m.name}
                  </Link>
                ))}
            </div>
          </Section>
        )}
      </div>

      <div className="mt-10 flex justify-end gap-2 border-t border-brand-gray-200 pt-6">
        <Link href="/admin/products" className="btn-outline">
          Cancel
        </Link>
        <button type="button" onClick={onSave} disabled={pending || deleting} className="btn-primary">
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
