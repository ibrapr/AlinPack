import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { machines } from '@/data/machines';
import PageHero from '@/components/PageHero';
import MachinesExplorer from '@/components/MachinesExplorer';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    title: dict.machines.hero.title,
    description: dict.machines.hero.subtitle,
  };
}

export default function MachinesPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.machines.hero.eyebrow}
        title={dict.machines.hero.title}
        subtitle={dict.machines.hero.subtitle}
      />

      <section className="section bg-brand-gray-50">
        <div className="container-wide">
          <MachinesExplorer machines={machines} locale={locale} />
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
