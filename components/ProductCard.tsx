import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/types';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getMachinesByProduct } from '@/data/machines';
import ProductIcon from './ProductIcon';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const dict = getDictionary(locale);
  const matchingMachines = getMachinesByProduct(product.slug);

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray-100">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name[locale]}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-gray-50 text-brand-red">
            <ProductIcon name={product.icon || 'box'} className="h-16 w-16" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute bottom-3 start-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-brand-red shadow-soft">
          <ProductIcon name={product.icon || 'box'} className="h-5 w-5" />
        </div>
        <span className="absolute end-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-gray-700 shadow-soft">
          {matchingMachines.length} {dict.products.card.machines}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-tight text-brand-black group-hover:text-brand-red transition-colors">
          {product.name[locale]}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-brand-gray-600 leading-relaxed">
          {product.shortDescription[locale]}
        </p>

        <div className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-black group-hover:text-brand-red transition-colors">
          {dict.products.card.view}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl-flip" />
        </div>
      </div>
    </Link>
  );
}
