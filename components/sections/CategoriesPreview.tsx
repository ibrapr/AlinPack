import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { products } from '@/data/products';
import ProductIcon from '@/components/ProductIcon';
import { getMachinesByProduct } from '@/data/machines';

const PREVIEW = [
  'dairy', 'sauces', 'honey', 'coffee', 'cosmetics', 'detergents',
  'tahini', 'powders', 'salads', 'pet-food', 'liquids', 'fruits',
];

export default function CategoriesPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const previewProducts = PREVIEW.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean);

  return (
    <section className="section bg-brand-gray-50">
      <div className="container-wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.home.categories.eyebrow}</p>
            <h2 className="mt-3 heading-lg text-balance">{dict.home.categories.title}</h2>
            <p className="mt-4 body-lg">{dict.home.categories.subtitle}</p>
          </div>
          <Link href={`/${locale}/products`} className="btn-outline self-start sm:self-auto">
            {dict.home.categories.cta}
            <ArrowRight className="h-4 w-4 rtl-flip" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {previewProducts.map((product) => {
            const count = getMachinesByProduct(product.slug).length;
            return (
              <Link
                key={product.slug}
                href={`/${locale}/products/${product.slug}`}
                className="group relative flex flex-col items-start gap-3 rounded-2xl border border-brand-gray-200 bg-white p-4 sm:p-5 transition-all hover:border-brand-red hover:shadow-card hover:-translate-y-0.5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                  <ProductIcon name={product.icon || 'box'} className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black group-hover:text-brand-red transition-colors">
                    {product.name[locale]}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-gray-500">
                    {count} {dict.products.card.machines}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
