import type { Product } from './types';
import productsJson from './content/products.json';

export const products: Product[] = productsJson as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByGroup(group: Product['group']): Product[] {
  return products.filter((p) => p.group === group);
}
