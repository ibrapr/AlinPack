import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Award, Heart, Handshake, Lightbulb, MessageSquare, Settings, Wrench, Truck, ShieldCheck } from 'lucide-react';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import PageHero from '@/components/PageHero';
import StatsSection from '@/components/sections/StatsSection';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    title: dict.about.hero.title,
    description: dict.about.hero.subtitle,
  };
}

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  const values = [
    { icon: Award, key: 'quality' as const },
    { icon: Heart, key: 'honesty' as const },
    { icon: Handshake, key: 'partnership' as const },
    { icon: Lightbulb, key: 'innovation' as const },
  ];

  const steps = [
    { icon: MessageSquare, key: 'one' as const },
    { icon: Settings, key: 'two' as const },
    { icon: Wrench, key: 'three' as const },
    { icon: Truck, key: 'four' as const },
    { icon: ShieldCheck, key: 'five' as const },
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.about.hero.eyebrow}
        title={dict.about.hero.title}
      />

      <section className="section bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">— {dict.about.story.title}</p>
            <h2 className="mt-3 heading-lg text-balance">{dict.about.story.title}</h2>
            <div className="mt-5 max-w-2xl text-base leading-relaxed text-brand-gray-600">
              <p>{dict.about.story.p1}</p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl bg-brand-black p-8 text-white overflow-hidden relative">
              <div className="absolute -top-20 -end-20 h-48 w-48 rounded-full bg-brand-red/20 blur-2xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                {dict.about.mission.title}
              </p>
              <p className="relative mt-4 line-clamp-3 text-lg font-medium leading-relaxed text-balance">
                "{dict.about.mission.text}"
              </p>
            </div>

            <div className="mt-6 rounded-3xl border border-brand-gray-200 bg-brand-gray-50 p-8">
              <p className="text-6xl font-bold text-brand-black">2007</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                {dict.common.since}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-brand-gray-50">
        <div className="container-wide">
          <div className="max-w-2xl">
            <h2 className="heading-lg text-balance">{dict.about.values.title}</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, key }) => (
              <div key={key} className="card card-hover p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand-black">
                  {dict.about.values.items[key].title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-gray-600">
                  {dict.about.values.items[key].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">{dict.about.process.eyebrow}</p>
            <h2 className="mt-3 heading-lg text-balance">{dict.about.process.title}</h2>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(({ icon: Icon, key }, idx) => (
              <li key={key} className="relative rounded-2xl border border-brand-gray-200 bg-white p-6 transition-colors hover:border-brand-red">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-black text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-brand-gray-200">0{idx + 1}</span>
                </div>
                <h3 className="mt-5 text-base font-bold text-brand-black">
                  {dict.about.process.steps[key].title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-gray-600">
                  {dict.about.process.steps[key].description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <StatsSection locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
