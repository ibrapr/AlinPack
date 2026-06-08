import Link from 'next/link';
import { ArrowRight, Box, Package, Wrench } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { products } from '@/data/products';
import ProductIcon from '@/components/ProductIcon';
import { getMachinesByProduct } from '@/data/machines';

const PREVIEW = [
  'dairy', 'sauces', 'honey', 'coffee', 'cosmetics', 'detergents',
  'tahini', 'powders', 'salads', 'pet-food', 'liquids', 'fruits',
];

export default function CategoriesPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const previewProducts = PREVIEW.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean);
  const choicePanels = [
    {
      title: locale === 'he' ? 'המוצר שברצונך לארוז' : 'The product you want to pack',
      href: `/${locale}/products`,
      image: '/products/sauces.jpg',
      icon: Package,
    },
    {
      title: locale === 'he' ? 'האריזה בה תרצה לארוז' : 'The package you want to use',
      href: `/${locale}/products/containers`,
      image: '/products/containers.jpg',
      icon: Box,
    },
    {
      title: locale === 'he' ? 'שירות בו נוכל לסייע לך' : 'Service we can help with',
      href: `/${locale}/services`,
      image: '/products/bottles.jpg',
      icon: Wrench,
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="grid gap-4 md:grid-cols-3">
          {choicePanels.map(({ title, href, image, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="group relative min-h-[360px] overflow-hidden bg-brand-gray-100 sm:min-h-[420px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                <div className="mb-4 flex h-11 w-11 items-center justify-center border border-white/25 bg-white/15 text-white backdrop-blur-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-extrabold leading-snug tracking-normal">
                  {title}
                </h2>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors group-hover:text-white">
                  {locale === 'he' ? 'לצפייה' : 'View options'}
                  <ArrowRight className="h-4 w-4 rtl-flip" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 border-y border-brand-gray-200 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
                {dict.home.categories.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-normal text-brand-black">
                {locale === 'he' ? 'המוצר שלך' : 'Your product'}
              </h2>
            </div>
            <Link href={`/${locale}/products`} className="link-underline">
              {dict.home.categories.cta}
              <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>
          </div>

          <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {previewProducts.map((product) => {
              const count = getMachinesByProduct(product.slug).length;
              return (
                <Link
                  key={product.slug}
                  href={`/${locale}/products/${product.slug}`}
                  className="group flex items-center gap-3 border-b border-brand-gray-100 pb-4"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                    <ProductIcon name={product.icon || 'box'} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-brand-black group-hover:text-brand-red">
                      {product.name[locale]}
                    </span>
                    <span className="mt-0.5 block text-xs text-brand-gray-500">
                      {count} {dict.products.card.machines}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
