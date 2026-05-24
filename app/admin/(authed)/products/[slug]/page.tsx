import { notFound } from 'next/navigation';
import { readContent } from '@/lib/admin/storage';
import type { Product, Machine } from '@/data/types';
import ProductEditor from '@/components/admin/ProductEditor';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { slug: string } }) {
  const [products, machines] = await Promise.all([
    readContent<Product[]>('products.json'),
    readContent<Machine[]>('machines.json'),
  ]);
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const machineOptions = machines.map((m) => ({ slug: m.slug, name: m.name.en }));
  const selectedMachineSlugs = machines
    .filter((m) => m.compatibleProductSlugs.includes(product.slug))
    .map((m) => m.slug);

  return (
    <ProductEditor
      initial={product}
      isNew={false}
      machines={machineOptions}
      selectedMachineSlugs={selectedMachineSlugs}
    />
  );
}
