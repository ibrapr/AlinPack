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
      <div className="relative h-14 overflow-hidden bg-brand-gray-100 sm:h-24">
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
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/45 to-transparent sm:h-10" />
        <div className="absolute bottom-1.5 start-1.5 flex h-7 w-7 items-center justify-center rounded-md bg-white/95 text-brand-red shadow-soft sm:bottom-2 sm:start-2 sm:h-8 sm:w-8 sm:rounded-lg">
          <ProductIcon name={product.icon || 'box'} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </div>
        <span className="absolute end-1.5 top-1.5 rounded-full bg-white/95 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-brand-gray-700 shadow-soft sm:end-2 sm:top-2 sm:text-[9px]">
          {matchingMachines.length} {dict.products.card.machines}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-base font-bold leading-tight text-brand-black group-hover:text-brand-red transition-colors">
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
