import Link from 'next/link';
import { ArrowRight, Settings2, Boxes, Users, Github, FileEdit } from 'lucide-react';
import { readContent, getStorageInfo } from '@/lib/admin/storage';
import type { Machine, Product, Client } from '@/data/types';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [machines, products, clients] = await Promise.all([
    readContent<Machine[]>('machines.json').catch(() => [] as Machine[]),
    readContent<Product[]>('products.json').catch(() => [] as Product[]),
    readContent<Client[]>('clients.json').catch(() => [] as Client[]),
  ]);
  const storage = getStorageInfo();

  const cards = [
    {
      href: '/admin/machines',
      label: 'Machines',
      count: machines.length,
      icon: Settings2,
      blurb: 'Add, edit, or remove packaging machines.',
    },
    {
      href: '/admin/products',
      label: 'Products',
      count: products.length,
      icon: Boxes,
      blurb: 'Manage product categories and packaging needs.',
    },
    {
      href: '/admin/clients',
      label: 'Clients',
      count: clients.length,
      icon: Users,
      blurb: 'Keep the trusted-companies list up to date.',
    },
  ];

  return (
    <div>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red">
          Admin dashboard
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-3 max-w-2xl text-base text-brand-gray-600">
          Manage the content shown on the public Alin Pack website. Changes go live{' '}
          {storage.mode === 'github'
            ? 'as soon as Vercel finishes a fresh deploy (~30 seconds after saving).'
            : 'immediately in this local development environment.'}
        </p>
      </header>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, label, count, icon: Icon, blurb }) => (
          <Link
            key={href}
            href={href}
            className="card card-hover group p-6 flex flex-col"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-3xl font-extrabold text-brand-black">{count}</span>
            </div>
            <h2 className="mt-5 text-lg font-bold text-brand-black">{label}</h2>
            <p className="mt-1 text-sm leading-relaxed text-brand-gray-600">{blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-red">
              Manage <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-brand-gray-200 bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-black flex items-center gap-2">
          {storage.mode === 'github' ? (
            <Github className="h-4 w-4 text-brand-red" />
          ) : (
            <FileEdit className="h-4 w-4 text-amber-600" />
          )}
          Storage
        </h2>

        {storage.mode === 'github' ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            <Field label="Repository" value={`${storage.repoOwner}/${storage.repoName}`} />
            <Field label="Branch" value={storage.branch || 'main'} />
            <Field label="Mode" value="Commits via GitHub API → Vercel auto-deploy" />
          </dl>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-brand-gray-600">
            You're editing the local <code className="font-mono text-xs">data/content/*.json</code> files
            directly. To go live, set <code className="font-mono text-xs">GITHUB_TOKEN</code>,{' '}
            <code className="font-mono text-xs">GITHUB_OWNER</code>, and{' '}
            <code className="font-mono text-xs">GITHUB_REPO</code> in your Vercel environment.
          </p>
        )}
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-brand-gray-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-brand-black">{value}</dd>
    </div>
  );
}
