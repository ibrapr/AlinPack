import { clients } from '@/data/clients';
import type { Locale } from '@/i18n/config';

interface ClientLogosProps {
  locale: Locale;
  title?: string;
  subtitle?: string;
  variant?: 'marquee' | 'grid';
}

export default function ClientLogos({ locale, title, subtitle, variant = 'marquee' }: ClientLogosProps) {
  if (variant === 'grid') {
    return (
      <section className="section bg-white">
        <div className="container-wide">
          {(title || subtitle) && (
            <div className="max-w-2xl mb-12">
              {title && <h2 className="heading-md">{title}</h2>}
              {subtitle && <p className="mt-3 body">{subtitle}</p>}
            </div>
          )}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brand-gray-200 bg-brand-gray-200 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group flex flex-col bg-white transition-colors hover:bg-brand-gray-50"
              >
                <div className="relative aspect-[5/3] overflow-hidden bg-brand-gray-100">
                  {client.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="absolute inset-0 h-full w-full object-contain p-8"
                      loading="lazy"
                    />
                  ) : client.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.image}
                      alt={client.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-100 to-white" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-5 text-center">
                  <p className="text-base font-bold text-brand-black">{client.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-gray-500">
                    {client.industry[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const doubled = [...clients, ...clients];

  return (
    <section className="section-sm bg-white">
      <div className="container-wide">
        {title && (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-gray-500 mb-8">
            {title}
          </p>
        )}
      </div>
      <div className="relative overflow-hidden gradient-mask-x">
        <div className="flex w-max animate-marquee pause-on-hover">
          {doubled.map((client, i) => (
            <div key={`${client.name}-${i}`} className="flex flex-shrink-0 items-center px-4 py-4">
              <div className="flex items-center gap-3 rounded-2xl border border-brand-gray-200 bg-white py-2 ps-2 pe-5 shadow-soft">
                {client.logo || client.image ? (
                  <div className="relative h-12 w-16 overflow-hidden rounded-xl bg-brand-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={client.logo || client.image}
                      alt={client.name}
                      className={`absolute inset-0 h-full w-full ${client.logo ? 'object-contain p-2' : 'object-cover'}`}
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <span className="text-base sm:text-lg font-bold text-brand-gray-500 transition-colors hover:text-brand-black whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
