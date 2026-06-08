import type { Metadata } from 'next';
import { Inter, Heebo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, localeDirections, isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import OrganizationJsonLd from '@/components/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  return {
    title: {
      default: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.defaultDescription,
    alternates: {
      languages: {
        en: '/en',
        he: '/he',
      },
    },
    openGraph: {
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.defaultDescription,
      locale: params.locale,
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dir = localeDirections[locale];

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${heebo.variable}`}>
      <body dir={dir} className="public-site min-h-screen bg-white text-brand-black antialiased">
        <OrganizationJsonLd />
        <Navbar locale={locale} />
        <main className="pt-[52px] lg:pt-[102px]">{children}</main>
        <Footer locale={locale} />
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}
