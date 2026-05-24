import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { isValidLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { CONTACT, whatsappUrl, telUrl, mailUrl, mapsEmbed, mapsLink } from '@/lib/contact';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const dict = getDictionary(params.locale);
  return {
    title: dict.contact.hero.title,
    description: dict.contact.hero.subtitle,
  };
}

export default function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { machine?: string; product?: string };
}) {
  if (!isValidLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);
  const prefill = searchParams?.machine || searchParams?.product || '';

  return (
    <>
      <PageHero
        eyebrow={dict.contact.hero.eyebrow}
        title={dict.contact.hero.title}
        subtitle={dict.contact.hero.subtitle}
      />

      <section className="section bg-brand-gray-50">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="heading-sm">{dict.contact.info.title}</h2>

              <div className="mt-6 space-y-3">
                <ContactRow
                  icon={Phone}
                  label={dict.contact.info.phoneLabel}
                  value={CONTACT.phone}
                  href={telUrl()}
                  ltr
                />
                <ContactRow
                  icon={MessageCircle}
                  label={dict.contact.info.whatsappLabel}
                  value={CONTACT.phone}
                  href={whatsappUrl(dict.whatsapp.default)}
                  external
                  accent
                  ltr
                />
                <ContactRow
                  icon={Mail}
                  label={dict.contact.info.emailLabel}
                  value={CONTACT.email}
                  href={mailUrl()}
                />
                <ContactRow
                  icon={MapPin}
                  label={dict.contact.info.addressLabel}
                  value={`${CONTACT.addressLine1}, ${CONTACT.addressLine2}`}
                />
                <ContactRow
                  icon={Clock}
                  label={dict.contact.info.hoursLabel}
                  value={dict.contact.info.hoursValue}
                />
              </div>

              <div className="mt-10 rounded-3xl overflow-hidden border border-brand-gray-200 bg-white">
                <div className="flex items-center justify-between p-5 border-b border-brand-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-black">
                    {dict.contact.map.title}
                  </h3>
                  <a
                    href={mapsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-red hover:underline"
                  >
                    Open in Maps
                    <ArrowRight className="h-3 w-3 rtl-flip" />
                  </a>
                </div>
                <div className="relative aspect-[5/4]">
                  <iframe
                    src={mapsEmbed()}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    title="Alin Pack location"
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm locale={locale} defaultProduct={prefill} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
  accent,
  ltr,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  accent?: boolean;
  ltr?: boolean;
}) {
  const inner = (
    <>
      <div
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
          accent ? 'bg-[#25D366] text-white' : 'bg-brand-red/10 text-brand-red'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500">{label}</p>
        <p className={`mt-0.5 text-sm font-semibold text-brand-black ${ltr ? '' : ''}`} dir={ltr ? 'ltr' : undefined}>
          {value}
        </p>
      </div>
    </>
  );

  const cls = 'flex items-center gap-4 rounded-2xl border border-brand-gray-200 bg-white p-4 transition-colors hover:border-brand-red';

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}
