import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { products } from '@/data/products';
import PageHero from '@/components/PageHero';
import ProductsExplorer from '@/components/ProductsExplorer';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    title: dict.products.hero.title,
    description: dict.products.hero.subtitle,
  };
}

export default function ProductsPage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.products.hero.eyebrow}
        title={dict.products.hero.title}
        subtitle={dict.products.hero.subtitle}
      />

      <section className="section bg-brand-gray-50">
        <div className="container-wide">
          <ProductsExplorer products={products} locale={locale} />
        </div>
      </section>

      <CTASection locale={locale} />
    </>
  );
}
