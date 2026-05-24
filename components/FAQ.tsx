'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { LocalizedString } from '@/data/types';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
}

interface FAQProps {
  items: FAQItem[];
  locale: Locale;
  title?: string;
}

export default function FAQ({ items, locale, title }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <div>
      {title && <h2 className="heading-sm mb-6">{title}</h2>}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const isOpen = open === idx;
          return (
            <div
              key={idx}
              className={cn(
                'rounded-2xl border bg-white transition-colors',
                isOpen ? 'border-brand-red shadow-soft' : 'border-brand-gray-200 hover:border-brand-gray-300',
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 p-5 text-start"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-brand-black">
                  {item.question[locale]}
                </span>
                <span
                  className={cn(
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors',
                    isOpen ? 'bg-brand-red text-white' : 'bg-brand-gray-100 text-brand-gray-700',
                  )}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300',
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brand-gray-600">
                    {item.answer[locale]}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
