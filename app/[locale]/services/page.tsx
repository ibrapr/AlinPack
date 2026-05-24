import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Lightbulb, Truck, Settings, Headset, Wrench, Package } from 'lucide-react';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    title: dict.services.hero.title,
    description: dict.services.hero.subtitle,
  };
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  const items = [
    { icon: Lightbulb, key: 'consultation' as const },
    { icon: Truck, key: 'supply' as const },
    { icon: Settings, key: 'custom' as const },
    { icon: Headset, key: 'support' as const },
    { icon: Wrench, key: 'maintenance' as const },
    { icon: Package, key: 'spare' as const },
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.services.hero.eyebrow}
        title={dict.services.hero.title}
      />

      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ icon: Icon, key }, idx) => (
              <article key={key} className="card card-hover p-6 group">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-black text-white transition-colors group-hover:bg-brand-red">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="text-3xl font-extrabold text-brand-gray-200">0{idx + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand-black group-hover:text-brand-red transition-colors">
                  {dict.services.items[key].title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-gray-600">
                  {dict.services.items[key].description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        locale={locale}
        title={dict.services.ctaTitle}
        subtitle={dict.services.ctaSubtitle}
      />
    </>
  );
}
