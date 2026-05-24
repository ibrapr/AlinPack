import Link from 'next/link';
import { ArrowRight, MessageCircle, Tag } from 'lucide-react';
import type { Machine } from '@/data/types';
import type { Locale } from '@/i18n/config';
import { getDictionary, interpolate } from '@/i18n/getDictionary';
import { getProductBySlug } from '@/data/products';
import { whatsappUrl } from '@/lib/contact';
import MachineThumb from './MachineThumb';

interface MachineCardProps {
  machine: Machine;
  locale: Locale;
  compact?: boolean;
}

export default function MachineCard({ machine, locale, compact = false }: MachineCardProps) {
  const dict = getDictionary(locale);
  const compatibleProducts = machine.compatibleProductSlugs
    .map((s) => getProductBySlug(s))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link
        href={`/${locale}/machines/${machine.slug}`}
        className="relative block aspect-[5/4] overflow-hidden bg-gradient-to-br from-brand-gray-100 to-brand-gray-200"
      >
        <MachineThumb category={machine.category} image={machine.image} alt={machine.name[locale]} />
        <div className="absolute top-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-brand-black shadow-soft">
          <Tag className="h-3 w-3 text-brand-red" />
          <span className="uppercase tracking-wider">{machine.category}</span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold leading-tight tracking-tight text-brand-black group-hover:text-brand-red transition-colors">
          <Link href={`/${locale}/machines/${machine.slug}`}>{machine.name[locale]}</Link>
        </h3>
        <p className="mt-2 line-clamp-1 text-sm text-brand-gray-600 leading-relaxed">
          {machine.shortDescription[locale]}
        </p>

        {!compact && compatibleProducts.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray-500">
              {dict.machines.card.compatibleWith}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {compatibleProducts.map((p) => (
                <Link
                  key={p!.slug}
                  href={`/${locale}/products/${p!.slug}`}
                  className="inline-flex rounded-full bg-brand-gray-100 px-2.5 py-1 text-xs font-medium text-brand-gray-700 hover:bg-brand-red/10 hover:text-brand-red transition-colors"
                >
                  {p!.name[locale]}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 pt-4 border-t border-brand-gray-100">
          <Link
            href={`/${locale}/machines/${machine.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-brand-gray-800 transition-colors"
          >
            {dict.machines.card.viewDetails}
            <ArrowRight className="h-3.5 w-3.5 rtl-flip" />
          </Link>
          <a
            href={whatsappUrl(interpolate(dict.whatsapp.machine, { name: machine.name[locale] }))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gray-200 text-brand-gray-700 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
