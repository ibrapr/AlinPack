import { readContent } from '@/lib/admin/storage';
import type { Product } from '@/data/types';
import type { Machine } from '@/data/types';
import ProductEditor from '@/components/admin/ProductEditor';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const machines = await readContent<Machine[]>('machines.json').catch(() => [] as Machine[]);
  const blank: Product = {
    slug: '',
    name: { en: '', he: '' },
    group: 'food',
    shortDescription: { en: '', he: '' },
    description: { en: '', he: '' },
    packagingNeeds: { en: [], he: [] },
    packagingTypes: { en: [], he: [] },
    icon: 'box',
  };

  return (
    <ProductEditor
      initial={blank}
      isNew
      machines={machines.map((m) => ({ slug: m.slug, name: m.name.en }))}
      selectedMachineSlugs={[]}
    />
  );
}
