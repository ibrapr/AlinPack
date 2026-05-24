import { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
      <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />
      <div className="container-wide relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl animate-fade-in-up">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 heading-xl text-balance">{title}</h1>
          {subtitle && (
            <p className="mt-5 text-lg text-brand-gray-300 leading-relaxed text-balance max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
