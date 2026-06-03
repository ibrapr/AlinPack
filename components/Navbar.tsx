'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import { locales, localeNames } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

interface NavbarProps {
  locale: Locale;
}

export default function Navbar({ locale }: NavbarProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLeft = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];
  const navRight = [
    { href: `/${locale}/machines`, label: dict.nav.machines },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/contact`, label: locale === 'he' ? dict.nav.contact : 'Contact Us' },
  ];
  const nav = [...navLeft, ...navRight];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname?.startsWith(href);
  };

  const switchPath = (target: Locale) => {
    const segments = (pathname || '/').split('/');
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join('/') || `/${target}`;
  };

  const onDark = false;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'bg-white border-b border-brand-gray-200 shadow-soft' : 'bg-white',
      )}
    >
      <div className="relative mx-auto flex h-20 w-full max-w-none items-center justify-between gap-4 px-6 sm:px-8 lg:px-12 xl:px-20">
        <nav className="absolute left-0 top-1/2 hidden -translate-y-1/2 items-center gap-12 lg:flex xl:gap-16">
          {navLeft.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative py-2 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors',
                isActive(item.href)
                  ? 'text-brand-red'
                  : 'text-brand-gray-700 hover:text-brand-black',
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand-red" />
              )}
            </Link>
          ))}
        </nav>

        <Link
          href={`/${locale}`}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2"
          aria-label="Alin Pack"
        >
          <Logo dark={onDark} priority />
        </Link>

        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-8 lg:flex xl:gap-10">
          <nav className="flex items-center gap-12 xl:gap-16">
            {navRight.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative py-2 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors',
                  isActive(item.href)
                    ? 'text-brand-red'
                    : 'text-brand-gray-700 hover:text-brand-black',
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand-red" />
                )}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} variant={onDark ? 'minimal' : 'default'} />
        </div>

        <button
          aria-label={open ? dict.nav.close : dict.nav.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors',
            onDark
              ? 'border-white/20 bg-white/5 text-white hover:bg-white/10'
              : 'border-brand-gray-200 bg-white text-brand-black hover:border-brand-red hover:text-brand-red',
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="container-wide py-6 border-t border-brand-gray-200 bg-white">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-brand-red/10 text-brand-red'
                    : 'text-brand-gray-700 hover:bg-brand-gray-100',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t border-brand-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-2">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={switchPath(l)}
                  className={cn(
                    'inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-bold transition-colors',
                    l === locale
                      ? 'border-brand-red bg-brand-red text-white'
                      : 'border-brand-gray-200 bg-white text-brand-black hover:border-brand-red hover:text-brand-red',
                  )}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>

            <Link href={`/${locale}/contact`} className="btn-primary mt-3 w-full justify-center">
              {dict.nav.requestQuote}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
