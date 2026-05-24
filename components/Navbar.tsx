'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
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

  const nav = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/machines`, label: dict.nav.machines },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/clients`, label: dict.nav.clients },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname?.startsWith(href);
  };

  const onDark = !scrolled && !open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'bg-white/90 backdrop-blur-xl border-b border-brand-gray-200/60 shadow-soft'
          : 'bg-transparent',
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="flex-shrink-0" aria-label="Alin Pack">
          <Logo dark={onDark} priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                isActive(item.href)
                  ? onDark
                    ? 'text-white'
                    : 'text-brand-red'
                  : onDark
                  ? 'text-white/80 hover:text-white'
                  : 'text-brand-gray-700 hover:text-brand-black',
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full',
                    onDark ? 'bg-brand-red' : 'bg-brand-red',
                  )}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher locale={locale} variant={onDark ? 'minimal' : 'default'} />
          <Link href={`/${locale}/contact`} className="btn-primary">
            {dict.nav.requestQuote}
            <ArrowRight className="h-4 w-4 rtl-flip" />
          </Link>
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
                <ArrowRight className="h-4 w-4 opacity-60 rtl-flip" />
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-brand-gray-200 pt-6">
            <LanguageSwitcher locale={locale} />
            <Link href={`/${locale}/contact`} className="btn-primary flex-1 justify-center">
              {dict.nav.requestQuote}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
