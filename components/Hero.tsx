import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const links = [
    {
      title: locale === 'he' ? 'מכונות' : 'Machines',
      text: locale === 'he' ? 'קווי מילוי, סגירה ואריזה' : 'Filling, sealing and packaging lines',
      href: `/${locale}/machines`,
    },
    {
      title: locale === 'he' ? 'מוצרים' : 'Products',
      text: locale === 'he' ? 'פתרונות לפי סוג מוצר' : 'Solutions by product type',
      href: `/${locale}/products`,
    },
    {
      title: locale === 'he' ? 'שירות' : 'Service',
      text: locale === 'he' ? 'תכנון, התאמה ותמיכה' : 'Planning, adaptation and support',
      href: `/${locale}/services`,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white text-brand-black">
      <div className="container-wide relative pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            {dict.home.hero.badge}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-normal text-brand-black sm:text-5xl lg:text-6xl">
            {dict.home.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-brand-gray-700">
            {dict.home.hero.subtitle}
          </p>
          <div className="mt-7">
            <Link href={`/${locale}/contact`} className="btn-primary rounded-none px-8 py-3.5">
              {dict.home.hero.ctaQuote}
              <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden border border-brand-gray-200 bg-brand-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/machines/sample-piston-filler.jpg"
            alt=""
            className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[440px]"
            loading="eager"
          />
        </div>

        <div className="grid border-x border-b border-brand-gray-200 bg-white md:grid-cols-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group border-t border-brand-gray-200 p-6 transition-colors hover:bg-brand-gray-50 md:border-s md:border-t-0"
            >
              <h2 className="text-lg font-extrabold uppercase tracking-[0.12em] text-brand-black group-hover:text-brand-red">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
