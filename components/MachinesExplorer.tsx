'use client';

import { useMemo, useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Machine } from '@/data/types';
import { getDictionary } from '@/i18n/getDictionary';
import { getMachineCategories } from '@/data/machines';
import { products } from '@/data/products';
import MachineCard from './MachineCard';
import { cn } from '@/lib/utils';

interface MachinesExplorerProps {
  machines: Machine[];
  locale: Locale;
}

export default function MachinesExplorer({ machines, locale }: MachinesExplorerProps) {
  const dict = getDictionary(locale);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [productSlug, setProductSlug] = useState<string>('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = getMachineCategories();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return machines.filter((m) => {
      if (category !== 'all' && m.category !== category) return false;
      if (productSlug !== 'all' && !m.compatibleProductSlugs.includes(productSlug)) return false;
      if (!q) return true;
      const haystack = [
        m.name.en,
        m.name.he,
        m.shortDescription.en,
        m.shortDescription.he,
        m.category,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [machines, query, category, productSlug]);

  const reset = () => {
    setQuery('');
    setCategory('all');
    setProductSlug('all');
  };

  const hasFilters = query || category !== 'all' || productSlug !== 'all';

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.machines.searchPlaceholder}
            className="w-full rounded-full border border-brand-gray-200 bg-white py-3.5 ps-12 pe-4 text-sm text-brand-black placeholder:text-brand-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full text-brand-gray-500 hover:bg-brand-gray-100"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-sm font-semibold transition-colors lg:hidden',
            filtersOpen
              ? 'border-brand-red bg-brand-red text-white'
              : 'border-brand-gray-200 bg-white text-brand-black hover:border-brand-red hover:text-brand-red',
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {dict.common.filters}
        </button>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        <aside
          className={cn(
            'lg:col-span-3 lg:block',
            filtersOpen ? 'block' : 'hidden',
          )}
        >
          <div className="rounded-2xl border border-brand-gray-200 bg-white p-5 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-black">
                {dict.common.filters}
              </h3>
              {hasFilters && (
                <button
                  onClick={reset}
                  className="text-xs font-semibold text-brand-red hover:underline"
                >
                  {dict.common.clearFilters}
                </button>
              )}
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500">
                {dict.machines.filters.category}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
                  {dict.common.all}
                </FilterChip>
                {categories.map((c) => (
                  <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                    <span className="capitalize">{c}</span>
                  </FilterChip>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500">
                {dict.machines.filters.product}
              </p>
              <select
                value={productSlug}
                onChange={(e) => setProductSlug(e.target.value)}
                className="mt-3 w-full rounded-xl border border-brand-gray-200 bg-white px-4 py-2.5 text-sm text-brand-black focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              >
                <option value="all">{dict.common.all}</option>
                {products.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name[locale]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-brand-gray-500">
              {filtered.length} {filtered.length === 1 ? 'machine' : 'machines'}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-gray-300 bg-brand-gray-50 p-12 text-center">
              <p className="text-base text-brand-gray-600">{dict.machines.noResults}</p>
              {hasFilters && (
                <button onClick={reset} className="mt-4 btn-outline">
                  {dict.common.clearFilters}
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((m) => (
                <MachineCard key={m.slug} machine={m} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors',
        active
          ? 'border-brand-red bg-brand-red text-white'
          : 'border-brand-gray-200 bg-white text-brand-gray-700 hover:border-brand-red hover:text-brand-red',
      )}
    >
      {children}
    </button>
  );
}
