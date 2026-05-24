import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { machines } from '@/data/machines';
import { products } from '@/data/products';

const SITE = 'https://alinpack.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/machines', '/products', '/services', '/clients', '/contact'];

  const staticEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
  );

  const machineEntries = locales.flatMap((locale) =>
    machines.map((m) => ({
      url: `${SITE}/${locale}/machines/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  const productEntries = locales.flatMap((locale) =>
    products.map((p) => ({
      url: `${SITE}/${locale}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...machineEntries, ...productEntries];
}
