'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Product, ProductGroup } from '@/data/types';
import { getDictionary } from '@/i18n/getDictionary';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductsExplorerProps {
  products: Product[];
  locale: Locale;
}

const groupOrder: (ProductGroup | 'all')[] = ['all', 'food', 'cosmetics', 'chemicals', 'pet', 'containers'];

export default function ProductsExplorer({ products, locale }: ProductsExplorerProps) {
  const dict = getDictionary(locale);
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<(ProductGroup | 'all')>('all');

  const groupLabels: Record<ProductGroup | 'all', string> = {
    all: dict.products.groupAll,
    food: dict.products.groupFood,
    cosmetics: dict.products.groupCosmetics,
    chemicals: dict.products.groupChemicals,
    pet: dict.products.groupPet,
    containers: dict.products.groupContainers,
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (group !== 'all' && p.group !== group) return false;
      if (!q) return true;
      return (
        p.name.en.toLowerCase().includes(q) ||
        p.name.he.includes(q) ||
        p.shortDescription.en.toLowerCase().includes(q) ||
        p.shortDescription.he.includes(q)
      );
    });
  }, [products, query, group]);

  return (
    <div>
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.products.searchPlaceholder}
          className="w-full rounded-full border border-brand-gray-200 bg-white py-3.5 ps-12 pe-4 text-sm text-brand-black placeholder:text-brand-gray-400 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
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

      <div className="mt-6 flex flex-wrap gap-2">
        {groupOrder.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              group === g
                ? 'border-brand-black bg-brand-black text-white'
                : 'border-brand-gray-200 bg-white text-brand-gray-700 hover:border-brand-red hover:text-brand-red',
            )}
          >
            {groupLabels[g]}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brand-gray-300 bg-brand-gray-50 p-12 text-center">
            <p className="text-base text-brand-gray-600">{dict.common.noResults}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
