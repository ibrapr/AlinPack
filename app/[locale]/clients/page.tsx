import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Handshake } from 'lucide-react';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { clients, successStories } from '@/data/clients';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/sections/CTASection';
import ClientLogos from '@/components/sections/ClientLogos';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    title: dict.clients.hero.title,
    description: dict.clients.hero.subtitle,
  };
}

export default function ClientsPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.clients.hero.eyebrow}
        title={dict.clients.hero.title}
      />

      <ClientLogos locale={locale} title={dict.clients.logos.title} variant="grid" />

      <section className="section bg-brand-gray-50">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">— {dict.clients.stories.title}</p>
            <h2 className="mt-3 heading-lg text-balance">{dict.clients.stories.title}</h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {successStories.map((story, idx) => (
              <article key={story.slug} className="card card-hover overflow-hidden flex flex-col">
                <div className="relative aspect-[5/3] bg-gradient-to-br from-brand-black to-brand-black-soft overflow-hidden">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                  <div className="absolute -top-10 -end-10 h-32 w-32 rounded-full bg-brand-red/30 blur-2xl" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="text-7xl font-extrabold text-white/15">0{idx + 1}</span>
                  </div>
                  <div className="absolute top-5 start-5 inline-flex rounded-full bg-brand-red px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {dict.clients.stories.items.one.title === story.title.en ? '' : ''}
                    {story.industry[locale]}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-brand-black">{story.title[locale]}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-brand-gray-600 flex-1">
                    {story.description[locale]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-3xl bg-brand-black p-8 sm:p-12 lg:p-16 text-white">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute -bottom-32 -end-32 h-80 w-80 rounded-full bg-brand-red/25 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red text-white">
                  <Handshake className="h-7 w-7" />
                </div>
                <h2 className="mt-6 heading-lg text-white text-balance">{dict.clients.partner.title}</h2>
              </div>
              <div className="lg:col-span-4 lg:text-end">
                <Link href={`/${locale}/contact`} className="btn-primary text-base px-7 py-3.5">
                  {dict.clients.partner.cta}
                  <ArrowRight className="h-4 w-4 rtl-flip" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
