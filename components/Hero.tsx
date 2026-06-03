import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { whatsappUrl } from '@/lib/contact';

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const slides = [
    {
      title: locale === 'he' ? 'מכונות אריזה חכמות' : 'Filling and sealing smart solutions',
      image: '/machines/sample-piston-filler.jpg',
      href: `/${locale}/machines`,
    },
    {
      title: locale === 'he' ? 'האריזה שלך, הפתרון שלנו' : 'Your packaging, our solution',
      image: '/products/dairy.jpg',
      href: `/${locale}/products`,
    },
    {
      title: locale === 'he' ? 'פתרונות מדויקים למוצרים קטנים' : 'Great precision for small cups',
      image: '/products/cups.jpg',
      href: `/${locale}/products/cups`,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white text-brand-black">
      <div className="container-wide relative pt-24 sm:pt-28 lg:pt-32">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="flex min-h-[420px] flex-col justify-between bg-brand-black p-7 text-white sm:p-10 lg:min-h-[520px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                {dict.home.hero.badge}
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">
                {dict.home.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/78">
                {dict.home.hero.subtitle}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/contact`} className="btn-primary rounded-none text-base px-7 py-3.5">
                {dict.home.hero.ctaQuote}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
              <a
                href={whatsappUrl(dict.whatsapp.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-brand-red hover:bg-brand-red"
              >
                <MessageCircle className="h-4 w-4" />
                {dict.home.hero.ctaWhatsapp}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {slides.map((slide, index) => (
              <Link
                key={slide.title}
                href={slide.href}
                className="group relative min-h-[190px] overflow-hidden bg-brand-gray-100 lg:min-h-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/82 via-brand-black/18 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="mb-3 inline-flex border border-white/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    {locale === 'he' ? 'קרא עוד' : 'Read more'}
                  </span>
                  <h2 className="max-w-sm text-2xl font-bold leading-tight tracking-normal">
                    {slide.title}
                  </h2>
                </div>
                <span className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center bg-white text-sm font-bold text-brand-red">
                  {index + 1}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid border-x border-b border-brand-gray-200 bg-white sm:grid-cols-3">
          <Stat number="18+" label={dict.home.stats.items.years} />
          <Stat number="500+" label={dict.home.stats.items.machines} />
          <Stat number="24" label={dict.home.stats.items.industries} />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="border-t border-brand-gray-200 px-6 py-5 sm:border-t-0 sm:border-s">
      <p className="text-3xl font-extrabold text-brand-red">{number}</p>
      <p className="mt-1 text-sm font-semibold text-brand-gray-700">{label}</p>
    </div>
  );
}
