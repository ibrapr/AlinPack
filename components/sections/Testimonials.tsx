import { Quote } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default function Testimonials({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = [
    dict.home.testimonials.items.one,
    dict.home.testimonials.items.two,
    dict.home.testimonials.items.three,
  ];

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow">{dict.home.testimonials.eyebrow}</p>
          <h2 className="mt-3 heading-lg text-balance">{dict.home.testimonials.title}</h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={i}
              className="card card-hover p-7 flex flex-col"
            >
              <Quote className="h-8 w-8 text-brand-red" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-brand-gray-700">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-gray-100 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-black text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-black">{t.name}</p>
                  <p className="text-xs text-brand-gray-500">{t.company}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
