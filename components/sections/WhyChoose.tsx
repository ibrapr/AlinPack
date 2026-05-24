import { MessageSquare, Award, Settings2, Handshake } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default function WhyChoose({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = [
    { icon: MessageSquare, key: 'consult' as const },
    { icon: Award, key: 'quality' as const },
    { icon: Settings2, key: 'customization' as const },
    { icon: Handshake, key: 'service' as const },
  ];

  return (
    <section className="section bg-brand-gray-50">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">{dict.home.why.eyebrow}</p>
            <h2 className="mt-3 heading-lg text-balance">{dict.home.why.title}</h2>

            <div className="mt-8 hidden lg:block">
              <div className="relative h-64 rounded-3xl bg-gradient-to-br from-brand-black to-brand-black-soft overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-extrabold text-white">2007</p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">
                      Established
                    </p>
                  </div>
                </div>
                <div className="absolute -top-20 -end-20 h-40 w-40 rounded-full bg-brand-red/20 blur-2xl" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map(({ icon: Icon, key }) => (
                <div
                  key={key}
                  className="card card-hover p-6 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-black text-white transition-colors group-hover:bg-brand-red">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-black">
                    {dict.home.why.items[key].title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-gray-600">
                    {dict.home.why.items[key].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
