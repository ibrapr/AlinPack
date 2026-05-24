import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { whatsappUrl } from '@/lib/contact';

interface CTASectionProps {
  locale: Locale;
  title?: string;
  subtitle?: string;
  cta?: string;
}

export default function CTASection({ locale, title, subtitle, cta }: CTASectionProps) {
  const dict = getDictionary(locale);

  return (
    <section className="section">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 sm:p-12 lg:p-16 text-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
          <div className="absolute -top-32 -end-32 h-72 w-72 rounded-full bg-brand-red/25 blur-3xl" />
          <div className="absolute -bottom-32 -start-32 h-72 w-72 rounded-full bg-brand-red/15 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                {dict.meta.tagline}
              </p>
              <h2 className="mt-4 heading-lg text-white text-balance">
                {title || dict.home.ctaSection.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-brand-gray-300 text-balance">
                {subtitle || dict.home.ctaSection.subtitle}
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end">
              <Link href={`/${locale}/contact`} className="btn-primary text-base px-7 py-3.5 w-full sm:w-auto justify-center">
                {cta || dict.home.ctaSection.cta}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
              <a
                href={whatsappUrl(dict.whatsapp.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10 text-base px-7 py-3.5 w-full sm:w-auto justify-center backdrop-blur"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
