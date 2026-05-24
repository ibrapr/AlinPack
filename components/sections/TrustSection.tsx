import { ShieldCheck, Settings, Headset, Award } from 'lucide-react';
import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default function TrustSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = [
    { icon: Award, key: 'experience' as const },
    { icon: Settings, key: 'custom' as const },
    { icon: Headset, key: 'support' as const },
    { icon: ShieldCheck, key: 'global' as const },
  ];

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="eyebrow">— {dict.home.trust.title}</p>
          <h2 className="mt-3 heading-lg text-balance">{dict.home.trust.title}</h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, key }) => (
            <div key={key} className="card p-6 sm:p-7 card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-black">
                {dict.home.trust.items[key].title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-gray-600">
                {dict.home.trust.items[key].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
