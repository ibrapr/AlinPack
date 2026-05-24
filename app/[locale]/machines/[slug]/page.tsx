import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, MessageCircle, Check, Sparkles, ListChecks, PlayCircle } from 'lucide-react';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary, interpolate } from '@/i18n/getDictionary';
import { machines, getMachineBySlug, getRelatedMachines } from '@/data/machines';
import { getProductBySlug } from '@/data/products';
import { whatsappUrl } from '@/lib/contact';
import MachineThumb from '@/components/MachineThumb';
import MachineCard from '@/components/MachineCard';
import FAQ from '@/components/FAQ';
import VideoEmbed from '@/components/VideoEmbed';

export async function generateStaticParams() {
  return machines.flatMap((m) => [
    { locale: 'en', slug: m.slug },
    { locale: 'he', slug: m.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const machine = getMachineBySlug(params.slug);
  if (!machine) return {};
  const locale = params.locale as Locale;
  return {
    title: machine.name[locale],
    description: machine.shortDescription[locale],
    openGraph: {
      title: machine.name[locale],
      description: machine.shortDescription[locale],
    },
  };
}

export default function MachineDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const machine = getMachineBySlug(params.slug);
  if (!machine) notFound();
  const dict = getDictionary(locale);
  const compatibleProducts = machine.compatibleProductSlugs.map((s) => getProductBySlug(s)).filter(Boolean);
  const related = getRelatedMachines(machine, 3);

  const whatsapp = whatsappUrl(interpolate(dict.whatsapp.machine, { name: machine.name[locale] }));

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
        <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />

        <div className="container-wide relative py-12 sm:py-16 lg:py-20">
          <Link
            href={`/${locale}/machines`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 rtl-flip" />
            {dict.machineDetail.back}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                {machine.category}
              </div>
              <h1 className="mt-5 heading-xl text-balance">{machine.name[locale]}</h1>
              <p className="mt-5 max-w-xl text-base text-brand-gray-300 leading-relaxed">
                {machine.shortDescription[locale]}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={`/${locale}/contact?machine=${machine.slug}`} className="btn-primary text-base px-7 py-3.5">
                  {dict.machineDetail.requestQuote}
                  <ArrowRight className="h-4 w-4 rtl-flip" />
                </Link>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10 text-base px-7 py-3.5 backdrop-blur"
                >
                  <MessageCircle className="h-4 w-4" />
                  {dict.machineDetail.whatsapp}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative aspect-[5/4] rounded-3xl border border-white/10 overflow-hidden bg-brand-black">
                <MachineThumb
                  category={machine.category}
                  image={machine.image}
                  alt={machine.name[locale]}
                />
              </div>

              {machine.gallery && machine.gallery.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {machine.gallery.slice(0, 4).map((url, i) => (
                    <div
                      key={url + i}
                      className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-brand-black"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`${machine.name[locale]} ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="heading-md">{dict.machineDetail.overview}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-gray-600">
              {machine.description[locale]}
            </p>

            <div className="mt-12">
              <h3 className="heading-sm flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-red" />
                {dict.machineDetail.features}
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {machine.features[locale].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-brand-gray-50 p-4">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" />
                    <span className="text-sm text-brand-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h3 className="heading-sm flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-brand-red" />
                {dict.machineDetail.benefits}
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {machine.benefits[locale].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-brand-gray-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {machine.videos && machine.videos.length > 0 && (
              <div className="mt-12">
                <h3 className="heading-sm flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-brand-red" />
                  See it in action
                </h3>
                <div className={`mt-6 grid gap-4 ${machine.videos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
                  {machine.videos.map((url, i) => (
                    <VideoEmbed key={url + i} url={url} title={`${machine.name[locale]} video ${i + 1}`} />
                  ))}
                </div>
              </div>
            )}

            {machine.faqs.length > 0 && (
              <div className="mt-12">
                <FAQ items={machine.faqs} locale={locale} title={dict.machineDetail.faq} />
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-soft">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-black">
                  {dict.machineDetail.specs}
                </h3>
                <dl className="mt-4 divide-y divide-brand-gray-100">
                  {machine.specs.map((s, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 py-3 text-sm">
                      <dt className="text-brand-gray-500">{s.label[locale]}</dt>
                      <dd className="text-end font-semibold text-brand-black">{s.value[locale]}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {compatibleProducts.length > 0 && (
                <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-soft">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-black">
                    {dict.machineDetail.products}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {compatibleProducts.map((p) => (
                      <Link
                        key={p!.slug}
                        href={`/${locale}/products/${p!.slug}`}
                        className="inline-flex rounded-full border border-brand-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-gray-700 hover:border-brand-red hover:bg-brand-red/5 hover:text-brand-red transition-colors"
                      >
                        {p!.name[locale]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-brand-black p-6 text-white">
                <p className="text-sm font-semibold text-brand-red uppercase tracking-wider">
                  {dict.common.talkToExpert}
                </p>
                <p className="mt-3 text-base font-semibold leading-snug">
                  {dict.home.ctaSection.title}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={`/${locale}/contact?machine=${machine.slug}`}
                    className="btn-primary w-full justify-center"
                  >
                    {dict.machineDetail.requestQuote}
                  </Link>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10 w-full justify-center"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-brand-gray-50">
          <div className="container-wide">
            <h2 className="heading-md">{dict.machineDetail.related}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((m) => (
                <MachineCard key={m.slug} machine={m} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
