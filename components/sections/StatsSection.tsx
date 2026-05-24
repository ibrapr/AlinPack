import { getDictionary } from '@/i18n/getDictionary';
import type { Locale } from '@/i18n/config';

export default function StatsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const stats = [
    { value: '18+', label: dict.home.stats.items.years },
    { value: '500+', label: dict.home.stats.items.machines },
    { value: '120+', label: dict.home.stats.items.clients },
    { value: '24', label: dict.home.stats.items.industries },
  ];

  return (
    <section className="section bg-brand-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      <div className="absolute -top-32 start-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-brand-red/15 blur-3xl" />

      <div className="container-wide relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">— {dict.home.stats.title}</p>
          <h2 className="mt-3 heading-lg text-white text-balance">{dict.home.stats.title}</h2>
          <p className="mt-4 text-lg text-brand-gray-300 text-balance">{dict.home.stats.subtitle}</p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px sm:grid-cols-4 rounded-3xl overflow-hidden border border-white/10 bg-white/5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-brand-black p-8 sm:p-10 text-center group transition-colors hover:bg-brand-black-soft"
            >
              <p className="text-5xl sm:text-6xl font-bold text-white tracking-tight transition-colors group-hover:text-brand-red">
                {s.value}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-brand-gray-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
