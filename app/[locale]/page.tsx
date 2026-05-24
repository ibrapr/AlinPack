import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/i18n/config';
import Hero from '@/components/Hero';
import TrustSection from '@/components/sections/TrustSection';
import CategoriesPreview from '@/components/sections/CategoriesPreview';
import FeaturedMachines from '@/components/sections/FeaturedMachines';
import WhyChoose from '@/components/sections/WhyChoose';
import StatsSection from '@/components/sections/StatsSection';
import ClientLogos from '@/components/sections/ClientLogos';
import CTASection from '@/components/sections/CTASection';
import { getDictionary } from '@/i18n/getDictionary';

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} />
      <TrustSection locale={locale} />
      <CategoriesPreview locale={locale} />
      <FeaturedMachines locale={locale} />
      <WhyChoose locale={locale} />
      <StatsSection locale={locale} />
      <ClientLogos locale={locale} title={dict.clients.logos.title} />
      <CTASection locale={locale} />
    </>
  );
}
