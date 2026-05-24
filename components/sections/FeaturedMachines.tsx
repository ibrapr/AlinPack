import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { getFeaturedMachines } from '@/data/machines';
import MachineCard from '@/components/MachineCard';

export default function FeaturedMachines({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const machines = getFeaturedMachines().slice(0, 4);

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.home.featured.eyebrow}</p>
            <h2 className="mt-3 heading-lg text-balance">{dict.home.featured.title}</h2>
          </div>
          <Link href={`/${locale}/machines`} className="btn-outline self-start sm:self-auto">
            {dict.home.featured.cta}
            <ArrowRight className="h-4 w-4 rtl-flip" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {machines.map((m) => (
            <MachineCard key={m.slug} machine={m} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
