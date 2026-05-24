import Link from 'next/link';
import { Plus, Edit3, ExternalLink, Tag, ImageOff } from 'lucide-react';
import { readContent } from '@/lib/admin/storage';
import type { Machine } from '@/data/types';

export const dynamic = 'force-dynamic';

export default async function MachinesAdminListPage() {
  const machines = await readContent<Machine[]>('machines.json').catch(() => [] as Machine[]);

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin" className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500 hover:text-brand-red">
            ← Back to dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Machines</h1>
          <p className="mt-1 text-sm text-brand-gray-600">
            {machines.length} {machines.length === 1 ? 'machine' : 'machines'} in the catalog.
          </p>
        </div>
        <Link href="/admin/machines/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          New machine
        </Link>
      </header>

      <div className="mt-8 overflow-hidden rounded-2xl border border-brand-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-brand-gray-200 bg-brand-gray-50">
            <tr className="text-start text-xs font-bold uppercase tracking-wider text-brand-gray-600">
              <th className="px-4 py-3 text-start w-16">Image</th>
              <th className="px-4 py-3 text-start">Name</th>
              <th className="px-4 py-3 text-start hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 text-start hidden md:table-cell">Products</th>
              <th className="px-4 py-3 text-start hidden md:table-cell">Featured</th>
              <th className="px-4 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-100">
            {machines.map((m) => (
              <tr key={m.slug} className="text-sm hover:bg-brand-gray-50">
                <td className="px-4 py-3">
                  <div className="h-12 w-12 overflow-hidden rounded-lg border border-brand-gray-200 bg-brand-gray-50">
                    {m.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-brand-gray-400">
                        <ImageOff className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-brand-black">{m.name.en}</p>
                  <p className="text-xs text-brand-gray-500 font-mono">{m.slug}</p>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-gray-100 px-2.5 py-1 text-xs font-semibold text-brand-gray-700">
                    <Tag className="h-3 w-3 text-brand-red" />
                    {m.category}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-xs text-brand-gray-600">
                  {m.compatibleProductSlugs.length}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  {m.featured ? (
                    <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Yes
                    </span>
                  ) : (
                    <span className="text-xs text-brand-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-end">
                  <div className="flex justify-end gap-2">
                    <a
                      href={`/en/machines/${m.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-gray-200 text-brand-gray-600 hover:border-brand-red hover:text-brand-red"
                      title="View on site"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <Link
                      href={`/admin/machines/${m.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-gray-800"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {machines.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-brand-gray-500">
                  No machines yet. Click "New machine" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
