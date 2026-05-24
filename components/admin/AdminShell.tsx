'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Settings2,
  Boxes,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/app/admin/actions';

interface AdminShellProps {
  children: React.ReactNode;
  storageMode: 'github' | 'local';
}

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/machines', label: 'Machines', icon: Settings2 },
  { href: '/admin/products', label: 'Products', icon: Boxes },
  { href: '/admin/clients', label: 'Clients', icon: Users },
];

export default function AdminShell({ children, storageMode }: AdminShellProps) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);

  const isActive = (item: (typeof nav)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex min-h-screen">
      {/* Mobile top bar */}
      <header className="lg:hidden fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-brand-gray-200 bg-white px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Alin Pack" width={120} height={32} className="h-7 w-auto" />
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-red">Admin</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-gray-200 text-brand-black"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <aside
        className={cn(
          'fixed inset-y-0 start-0 z-30 w-72 transform border-e border-brand-gray-200 bg-white transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center gap-3 border-b border-brand-gray-200 px-6">
            <Image src="/logo.png" alt="Alin Pack" width={150} height={40} className="h-8 w-auto" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red">
              Admin
            </span>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                    isActive(item)
                      ? 'bg-brand-red/10 text-brand-red'
                      : 'text-brand-gray-700 hover:bg-brand-gray-100',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-brand-gray-200 p-4 space-y-2">
            <div
              className={cn(
                'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold',
                storageMode === 'github'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700',
              )}
            >
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  storageMode === 'github' ? 'bg-emerald-500' : 'bg-amber-500',
                )}
              />
              Storage: {storageMode === 'github' ? 'GitHub (live)' : 'Local files'}
            </div>

            <a
              href="/en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-brand-gray-700 hover:bg-brand-gray-100"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </a>

            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-brand-gray-700 hover:bg-brand-red/10 hover:text-brand-red"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {open && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
        />
      )}

      <main className="flex-1 ms-0 lg:ms-72 pt-16 lg:pt-0 min-h-screen">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
