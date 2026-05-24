import Link from 'next/link';
import { Plus, Edit3, ExternalLink, Layers } from 'lucide-react';
import { readContent } from '@/lib/admin/storage';
import type { Product, Machine } from '@/data/types';

export const dynamic = 'force-dynamic';

export default async function ProductsAdminListPage() {
  const [products, machines] = await Promise.all([
    readContent<Product[]>('products.json').catch(() => [] as Product[]),
    readContent<Machine[]>('machines.json').catch(() => [] as Machine[]),
  ]);

  const machineCounts = new Map<string, number>();
  for (const m of machines) {
    for (const slug of m.compatibleProductSlugs) {
      machineCounts.set(slug, (machineCounts.get(slug) ?? 0) + 1);
    }
  }

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin" className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500 hover:text-brand-red">
            ← Back to dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-brand-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} in the catalog.
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          New product
        </Link>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border border-brand-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-brand-gray-200 bg-brand-gray-50">
            <tr className="text-xs font-bold uppercase tracking-wider text-brand-gray-600">
              <th className="px-4 py-3 text-start">Name</th>
              <th className="px-4 py-3 text-start hidden sm:table-cell">Photo</th>
              <th className="px-4 py-3 text-start hidden sm:table-cell">Group</th>
              <th className="px-4 py-3 text-start hidden md:table-cell">Machines</th>
              <th className="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-100">
            {products.map((p) => (
              <tr key={p.slug} className="text-sm hover:bg-brand-gray-50">
                <td className="px-4 py-3">
                  <p className="font-semibold text-brand-black">{p.name.en}</p>
                  <p className="text-xs text-brand-gray-500 font-mono">{p.slug}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="relative h-14 w-20 overflow-hidden rounded-xl border border-brand-gray-200 bg-brand-gray-100">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt={p.name.en}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-gray-50" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-gray-100 px-2.5 py-1 text-xs font-semibold text-brand-gray-700">
                    <Layers className="h-3 w-3 text-brand-red" />
                    {p.group}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-xs text-brand-gray-600">
                  {machineCounts.get(p.slug) ?? 0}
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex justify-end gap-2">
                    <a
                      href={`/en/products/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-gray-200 text-brand-gray-600 hover:border-brand-red hover:text-brand-red"
                      title="View on site"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <Link
                      href={`/admin/products/${p.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-gray-800"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-brand-gray-500">
                  No products yet. Click "New product" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
