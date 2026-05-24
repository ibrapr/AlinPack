'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  locale: Locale;
  variant?: 'default' | 'minimal';
}

export default function LanguageSwitcher({ locale, variant = 'default' }: LanguageSwitcherProps) {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const switchPath = (target: Locale) => {
    const segments = pathname.split('/');
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join('/') || `/${target}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors',
          variant === 'minimal'
            ? 'px-3.5 py-2 text-white/80 hover:text-white border border-white/15 bg-white/5 backdrop-blur'
            : 'border border-brand-gray-200 bg-white px-3.5 py-2 text-brand-gray-700 hover:border-brand-red hover:text-brand-red',
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase tracking-wider">{locale}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute end-0 mt-2 w-44 origin-top-right rounded-2xl border border-brand-gray-200 bg-white p-1.5 shadow-card animate-scale-in z-50">
          {locales.map((l) => (
            <Link
              key={l}
              href={switchPath(l)}
              className={cn(
                'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors',
                l === locale
                  ? 'bg-brand-gray-100 font-semibold text-brand-black'
                  : 'text-brand-gray-700 hover:bg-brand-gray-100',
              )}
              onClick={() => setOpen(false)}
            >
              <span>{localeNames[l]}</span>
              {l === locale && <Check className="h-4 w-4 text-brand-red" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
