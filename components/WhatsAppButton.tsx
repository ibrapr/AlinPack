'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { whatsappUrl } from '@/lib/contact';

export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={whatsappUrl(dict.whatsapp.default)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.whatsapp.tooltip}
      className={`fixed bottom-5 end-5 z-40 group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-card-hover transition-all duration-500 hover:shadow-card-hover hover:scale-105 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
