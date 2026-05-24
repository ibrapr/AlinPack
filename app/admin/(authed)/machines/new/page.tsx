import { readContent } from '@/lib/admin/storage';
import type { Machine, Product } from '@/data/types';
import MachineEditor from '@/components/admin/MachineEditor';

export const dynamic = 'force-dynamic';

export default async function NewMachinePage() {
  const products = await readContent<Product[]>('products.json').catch(() => [] as Product[]);

  const blank: Machine = {
    slug: '',
    name: { en: '', he: '' },
    category: 'filling',
    shortDescription: { en: '', he: '' },
    description: { en: '', he: '' },
    features: { en: [], he: [] },
    benefits: { en: [], he: [] },
    specs: [],
    compatibleProductSlugs: [],
    faqs: [],
    videos: [],
    gallery: [],
    featured: false,
  };

  return <MachineEditor initial={blank} products={products} isNew />;
}
