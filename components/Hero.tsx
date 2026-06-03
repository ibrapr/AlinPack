import Link from 'next/link';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { whatsappUrl } from '@/lib/contact';
import MachineIllustration from './MachineIllustration';

export default function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-gradient-hero text-brand-black">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08]" aria-hidden="true" />
      <div className="absolute -top-32 -start-32 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -end-20 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />

      <div className="container-wide relative pt-12 pb-14 sm:pt-16 sm:pb-18 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-black shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-brand-red" />
              {dict.home.hero.badge}
            </div>

            <h1 className="mt-6 heading-xl text-balance">
              {dict.home.hero.title.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-brand-red via-brand-red-light to-brand-red bg-clip-text text-transparent">
                  {dict.home.hero.title.split(' ').slice(-2).join(' ')}
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-brand-gray-700 leading-relaxed text-balance">
              {dict.home.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href={`/${locale}/contact`} className="btn-primary text-base px-7 py-3.5">
                {dict.home.hero.ctaQuote}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
              <Link
                href={`/${locale}/machines`}
                className="btn border border-brand-gray-300 bg-white text-brand-black hover:border-brand-red hover:text-brand-red text-base px-7 py-3.5"
              >
                {dict.home.hero.ctaMachines}
              </Link>
              <a
                href={whatsappUrl(dict.whatsapp.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gray-700 hover:text-brand-red transition-colors px-3 py-2"
              >
                <MessageCircle className="h-4 w-4" />
                {dict.home.hero.ctaWhatsapp}
              </a>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-5 sm:gap-8 max-w-lg">
              <Stat number="18+" label={dict.home.stats.items.years} />
              <Stat number="500+" label={dict.home.stats.items.machines} />
              <Stat number="24" label={dict.home.stats.items.industries} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative animate-fade-in-up [animation-delay:200ms]">
              <div className="relative aspect-[5/6] sm:aspect-[4/5] lg:aspect-[4/5] rounded-3xl border border-brand-gray-200 bg-white p-6 overflow-hidden shadow-card">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" aria-hidden="true" />
                <MachineIllustration />
                <div className="absolute bottom-6 start-6 end-6 rounded-2xl border border-brand-gray-200 bg-white/95 backdrop-blur-xl p-4 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-white">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-black">
                        Built for production reliability
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -end-4 hidden sm:flex items-center gap-2 rounded-2xl border border-brand-gray-200 bg-white/95 backdrop-blur-xl px-3.5 py-2.5 shadow-card animate-float">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full bg-brand-red/70 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
                </span>
                <span className="text-xs font-medium text-brand-black">Live engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold text-brand-black">{number}</p>
      <p className="mt-1 text-xs sm:text-sm font-medium text-brand-gray-400 leading-tight">{label}</p>
    </div>
  );
}
