import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';
import { CONTACT, whatsappUrl, telUrl, mailUrl } from '@/lib/contact';
import Logo from './Logo';

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-brand-black text-brand-gray-300 overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-grid-pattern" aria-hidden="true" />
      <div className="absolute -top-40 -end-40 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" aria-hidden="true" />

      <div className="relative container-wide py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-6 max-w-sm text-brand-gray-400 leading-relaxed">
              {dict.footer.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors"
              >
                {dict.common.requestQuote}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
              <a
                href={whatsappUrl(dict.whatsapp.default)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-gray-700 px-5 py-2.5 text-sm font-semibold text-white hover:border-brand-red hover:bg-brand-red/10 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {dict.footer.company}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{dict.nav.about}</Link></li>
                <li><Link href={`/${locale}/services`} className="hover:text-white transition-colors">{dict.nav.services}</Link></li>
                <li><Link href={`/${locale}/clients`} className="hover:text-white transition-colors">{dict.nav.clients}</Link></li>
                <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{dict.nav.contact}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {dict.footer.explore}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li><Link href={`/${locale}/machines`} className="hover:text-white transition-colors">{dict.nav.machines}</Link></li>
                <li><Link href={`/${locale}/products`} className="hover:text-white transition-colors">{dict.nav.products}</Link></li>
                <li><Link href={`/${locale}/products/dairy`} className="hover:text-white transition-colors">Dairy</Link></li>
                <li><Link href={`/${locale}/products/honey`} className="hover:text-white transition-colors">Honey</Link></li>
                <li><Link href={`/${locale}/products/cosmetics`} className="hover:text-white transition-colors">Cosmetics</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {dict.footer.contact}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={telUrl()} className="flex items-start gap-2.5 hover:text-white transition-colors">
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
                    <span dir="ltr">{CONTACT.phone}</span>
                  </a>
                </li>
                <li>
                  <a href={mailUrl()} className="flex items-start gap-2.5 hover:text-white transition-colors">
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
                    <span>{CONTACT.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
                  <span>
                    {CONTACT.addressLine1}<br />{CONTACT.addressLine2}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {dict.contact.info.hoursLabel}
            </h3>
            <p className="mt-4 text-sm text-brand-gray-400">{dict.contact.info.hoursValue}</p>

            <div className="mt-8 rounded-2xl border border-brand-gray-800 bg-brand-gray-900/40 p-5">
              <p className="text-sm font-semibold text-white">
                {dict.home.ctaSection.title}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:text-brand-red-light"
              >
                {dict.home.ctaSection.cta}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brand-gray-800 pt-8 text-sm text-brand-gray-500 sm:flex-row">
          <p>{dict.footer.legal.replace('2026', String(year))}</p>
          <p className="text-brand-gray-600">{dict.footer.credits}</p>
        </div>
      </div>
    </footer>
  );
}
