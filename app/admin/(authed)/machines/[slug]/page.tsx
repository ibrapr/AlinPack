import { notFound } from 'next/navigation';
import { readContent } from '@/lib/admin/storage';
import type { Machine, Product } from '@/data/types';
import MachineEditor from '@/components/admin/MachineEditor';

export const dynamic = 'force-dynamic';

export default async function EditMachinePage({ params }: { params: { slug: string } }) {
  const [machines, products] = await Promise.all([
    readContent<Machine[]>('machines.json'),
    readContent<Product[]>('products.json'),
  ]);
  const machine = machines.find((m) => m.slug === params.slug);
  if (!machine) notFound();

  return <MachineEditor initial={machine} products={products} isNew={false} />;
}
