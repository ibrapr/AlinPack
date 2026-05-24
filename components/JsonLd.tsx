import { CONTACT } from '@/lib/contact';

export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alin Pack',
    url: 'https://alinpack.com',
    logo: 'https://alinpack.com/logo.png',
    foundingDate: '2007',
    description:
      'Alin Pack provides custom packaging machines and solutions for food, cosmetics, chemicals, and more.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.addressLine1,
      addressLocality: 'Deir Hanna',
      addressCountry: 'IL',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT.phoneIntl,
        contactType: 'sales',
        availableLanguage: ['en', 'he'],
      },
    ],
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
