import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section className="relative overflow-hidden text-white">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/machines/sample-piston-filler.jpg"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="container-wide relative z-10 pt-20 pb-8 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
            {dict.home.hero.badge}
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-normal text-white sm:text-5xl lg:text-6xl">
            {dict.home.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80">
            {dict.home.hero.subtitle}
          </p>
          <div className="mt-7">
            <Link href={`/${locale}/contact`} className="btn-primary rounded-none px-8 py-3.5">
              {dict.home.hero.ctaQuote}
              <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
