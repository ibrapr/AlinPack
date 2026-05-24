import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, MessageCircle, Check, Package } from 'lucide-react';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary, interpolate } from '@/i18n/getDictionary';
import { products, getProductBySlug } from '@/data/products';
import { getMachinesByProduct } from '@/data/machines';
import { whatsappUrl } from '@/lib/contact';
import MachineCard from '@/components/MachineCard';
import ProductIcon from '@/components/ProductIcon';
import CTASection from '@/components/sections/CTASection';

export async function generateStaticParams() {
  return products.flatMap((p) => [
    { locale: 'en', slug: p.slug },
    { locale: 'he', slug: p.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  const locale = params.locale as Locale;
  return {
    title: product.name[locale],
    description: product.shortDescription[locale],
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const dict = getDictionary(locale);
  const matchingMachines = getMachinesByProduct(product.slug);

  const whatsapp = whatsappUrl(interpolate(dict.whatsapp.product, { name: product.name[locale] }));

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
        <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />

        <div className="container-wide relative py-12 sm:py-16 lg:py-20">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 rtl-flip" />
            {dict.productDetail.back}
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                <ProductIcon name={product.icon || 'box'} className="h-3.5 w-3.5" />
                {product.group}
              </div>
              <h1 className="mt-5 heading-xl text-balance">{product.name[locale]}</h1>
              <p className="mt-5 max-w-xl text-base text-brand-gray-300 leading-relaxed">
                {product.shortDescription[locale]}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#machines" className="btn-primary text-base px-7 py-3.5">
                  {dict.productDetail.machines}
                  <ArrowRight className="h-4 w-4 rtl-flip" />
                </a>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10 text-base px-7 py-3.5 backdrop-blur"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="relative mx-auto aspect-square max-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-brand-black shadow-card sm:max-w-[260px] lg:max-w-none">
                {product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt={product.name[locale]}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="relative flex h-full items-center justify-center">
                      <div className="text-brand-red">
                        <ProductIcon name={product.icon || 'box'} className="h-32 w-32" />
                      </div>
                    </div>
                  </>
                )}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl">
                  <p className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                    {matchingMachines.length} {dict.products.card.machines}
                  </p>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-brand-red">
                    <ProductIcon name={product.icon || 'box'} className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-wide grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="heading-md">{dict.productDetail.overview}</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-gray-600">
              {product.description[locale]}
            </p>

            <div className="mt-10">
              <h3 className="heading-sm">{dict.productDetail.needs}</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.packagingNeeds[locale].map((n, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-brand-gray-50 p-4">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-red" />
                    <span className="text-sm text-brand-gray-700">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-brand-gray-200 bg-white p-6 shadow-soft">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-black flex items-center gap-2">
                <Package className="h-4 w-4 text-brand-red" />
                {dict.productDetail.types}
              </h3>
              <ul className="mt-5 space-y-2">
                {product.packagingTypes[locale].map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-brand-gray-100 bg-brand-gray-50 px-4 py-3 text-sm"
                  >
                    <span className="font-medium text-brand-gray-700">{t}</span>
                    <ArrowRight className="h-4 w-4 text-brand-gray-400 rtl-flip" />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="machines" className="section bg-brand-gray-50 scroll-mt-24">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="eyebrow">— {dict.productDetail.machines}</p>
            <h2 className="mt-3 heading-lg text-balance">{dict.productDetail.machines}</h2>
          </div>

          {matchingMachines.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-brand-gray-300 bg-white p-12 text-center">
              <p className="text-base text-brand-gray-600">{dict.productDetail.noMachines}</p>
              <Link href={`/${locale}/contact`} className="mt-4 inline-flex btn-primary">
                {dict.common.contactUs}
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchingMachines.map((m) => (
                <MachineCard key={m.slug} machine={m} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        locale={locale}
        title={dict.productDetail.ctaTitle}
        subtitle={dict.productDetail.ctaSubtitle}
      />
    </>
  );
}
