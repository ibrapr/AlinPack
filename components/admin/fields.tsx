'use client';

import { Plus, Trash2, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LocalizedString, LocalizedStringArray } from '@/data/types';
import type { Locale } from '@/i18n/config';

const localeLabels: Record<Locale, string> = { en: 'English', he: 'עברית' };

export function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-gray-700">{label}</span>
        {hint && <span className="ms-2 text-xs font-normal text-brand-gray-500">{hint}</span>}
        <div className="mt-2">{children}</div>
      </label>
    </div>
  );
}

export const inputClass =
  'w-full rounded-xl border border-brand-gray-200 bg-white px-3.5 py-2.5 text-sm text-brand-black placeholder:text-brand-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="text" {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, 'min-h-[100px] resize-y', props.className)} />;
}

export function LocalizedInput({
  value,
  onChange,
  placeholder,
  type = 'input',
}: {
  value: LocalizedString;
  onChange: (next: LocalizedString) => void;
  placeholder?: string;
  type?: 'input' | 'textarea';
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {(['en', 'he'] as Locale[]).map((loc) => (
        <div key={loc}>
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-gray-500">
            <Globe className="h-3 w-3" />
            {localeLabels[loc]}
          </div>
          {type === 'textarea' ? (
            <Textarea
              dir={loc === 'he' ? 'rtl' : 'ltr'}
              value={value[loc] ?? ''}
              onChange={(e) => onChange({ ...value, [loc]: e.target.value })}
              placeholder={placeholder}
            />
          ) : (
            <TextInput
              dir={loc === 'he' ? 'rtl' : 'ltr'}
              value={value[loc] ?? ''}
              onChange={(e) => onChange({ ...value, [loc]: e.target.value })}
              placeholder={placeholder}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function LocalizedArrayEditor({
  value,
  onChange,
  itemPlaceholder,
  addLabel = 'Add item',
}: {
  value: LocalizedStringArray;
  onChange: (next: LocalizedStringArray) => void;
  itemPlaceholder?: string;
  addLabel?: string;
}) {
  const length = Math.max(value.en?.length || 0, value.he?.length || 0);
  const indices = Array.from({ length }, (_, i) => i);

  const update = (i: number, loc: Locale, v: string) => {
    const next = { en: [...(value.en || [])], he: [...(value.he || [])] };
    while (next[loc].length <= i) next[loc].push('');
    next[loc][i] = v;
    onChange(next);
  };

  const remove = (i: number) => {
    const next = { en: [...(value.en || [])], he: [...(value.he || [])] };
    next.en.splice(i, 1);
    next.he.splice(i, 1);
    onChange(next);
  };

  const add = () => {
    onChange({ en: [...(value.en || []), ''], he: [...(value.he || []), ''] });
  };

  return (
    <div className="space-y-2">
      {indices.map((i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="mt-2.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-gray-100 text-xs font-bold text-brand-gray-600">
            {i + 1}
          </span>
          <div className="flex-1 grid gap-2 sm:grid-cols-2">
            <TextInput
              value={value.en?.[i] ?? ''}
              onChange={(e) => update(i, 'en', e.target.value)}
              placeholder={`${itemPlaceholder || ''} · EN`}
            />
            <TextInput
              dir="rtl"
              value={value.he?.[i] ?? ''}
              onChange={(e) => update(i, 'he', e.target.value)}
              placeholder={`${itemPlaceholder || ''} · HE`}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-1.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-gray-200 text-brand-gray-500 hover:border-brand-red hover:bg-brand-red/5 hover:text-brand-red"
            aria-label="Remove"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-brand-gray-300 px-3 py-1.5 text-xs font-semibold text-brand-gray-700 hover:border-brand-red hover:text-brand-red"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

export function LocalizedPairListEditor<T extends { [key: string]: LocalizedString }>({
  value,
  onChange,
  emptyItem,
  fields,
  addLabel = 'Add',
}: {
  value: T[];
  onChange: (next: T[]) => void;
  emptyItem: () => T;
  fields: { key: keyof T; label: string; type?: 'input' | 'textarea' }[];
  addLabel?: string;
}) {
  const update = (i: number, key: keyof T, next: LocalizedString) => {
    const list = [...value];
    list[i] = { ...list[i], [key]: next };
    onChange(list);
  };
  const remove = (i: number) => {
    const list = [...value];
    list.splice(i, 1);
    onChange(list);
  };
  const add = () => onChange([...value, emptyItem()]);

  return (
    <div className="space-y-4">
      {value.map((item, i) => (
        <div key={i} className="rounded-2xl border border-brand-gray-200 bg-white p-4">
          <div className="flex items-start justify-between gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-gray-100 text-xs font-bold text-brand-gray-600">
              {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-gray-500 hover:text-brand-red"
            >
              <Trash2 className="h-3 w-3" />
              Remove
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {fields.map((f) => (
              <FieldRow key={String(f.key)} label={f.label}>
                <LocalizedInput
                  value={item[f.key] as LocalizedString}
                  onChange={(v) => update(i, f.key, v)}
                  type={f.type || 'input'}
                />
              </FieldRow>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-brand-gray-300 px-4 py-2 text-xs font-semibold text-brand-gray-700 hover:border-brand-red hover:text-brand-red"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

export function MultiSelectChips<T extends { value: string; label: string }>({
  options,
  selected,
  onChange,
}: {
  options: T[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (val: string) => {
    if (selected.includes(val)) onChange(selected.filter((s) => s !== val));
    else onChange([...selected, val]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = selected.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
              on
                ? 'border-brand-red bg-brand-red text-white'
                : 'border-brand-gray-200 bg-white text-brand-gray-700 hover:border-brand-red hover:text-brand-red',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={inputClass}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-brand-gray-300 text-brand-red focus:ring-brand-red/30"
      />
      <span className="text-sm font-medium text-brand-gray-700">{label}</span>
    </label>
  );
}
