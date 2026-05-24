'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminAuthenticated,
  verifyAdminPassword,
  getAdminPassword,
} from '@/lib/admin/auth';
import type { ContentFile } from '@/lib/admin/storage';
import { readContent, writeContent } from '@/lib/admin/storage';
import type { Machine, Product, Client } from '@/data/types';

async function requireAuth() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
}

export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  const password = String(formData.get('password') ?? '');
  if (!getAdminPassword()) {
    return { error: 'ADMIN_PASSWORD env var is not configured on the server.' };
  }
  if (!verifyAdminPassword(password)) {
    return { error: 'Incorrect password.' };
  }
  const token = await createSessionToken();
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
  redirect('/admin');
}

export async function logoutAction() {
  cookies().delete(ADMIN_COOKIE);
  redirect('/admin/login');
}

// ---------- Machines ----------

export async function saveMachineAction(machine: Machine, originalSlug?: string): Promise<void> {
  await requireAuth();
  const list = await readContent<Machine[]>('machines.json');
  const slug = machine.slug.trim();
  if (!slug) throw new Error('Slug is required');

  const idx = originalSlug ? list.findIndex((m) => m.slug === originalSlug) : -1;
  if (idx === -1) {
    if (list.some((m) => m.slug === slug)) throw new Error(`Machine with slug "${slug}" already exists.`);
    list.push(machine);
  } else {
    if (slug !== originalSlug && list.some((m) => m.slug === slug)) {
      throw new Error(`Another machine already uses slug "${slug}".`);
    }
    list[idx] = machine;
  }

  await writeContent('machines.json', list, `chore(admin): save machine ${slug}`);
  revalidatePath('/admin/machines');
  revalidatePath(`/admin/machines/${slug}`);
}

export async function deleteMachineAction(slug: string): Promise<void> {
  await requireAuth();
  const list = await readContent<Machine[]>('machines.json');
  const next = list.filter((m) => m.slug !== slug);
  if (next.length === list.length) throw new Error(`Machine "${slug}" not found.`);
  await writeContent('machines.json', next, `chore(admin): delete machine ${slug}`);
  revalidatePath('/admin/machines');
  redirect('/admin/machines');
}

// ---------- Products ----------

export async function saveProductAction(
  product: Product,
  originalSlug?: string,
  linkedMachineSlugs?: string[],
): Promise<void> {
  await requireAuth();
  const list = await readContent<Product[]>('products.json');
  const slug = product.slug.trim();
  if (!slug) throw new Error('Slug is required');

  const idx = originalSlug ? list.findIndex((p) => p.slug === originalSlug) : -1;
  if (idx === -1) {
    if (list.some((p) => p.slug === slug)) throw new Error(`Product with slug "${slug}" already exists.`);
    list.push(product);
  } else {
    if (slug !== originalSlug && list.some((p) => p.slug === slug)) {
      throw new Error(`Another product already uses slug "${slug}".`);
    }
    list[idx] = product;
  }

  await writeContent('products.json', list, `chore(admin): save product ${slug}`);

  if (linkedMachineSlugs) {
    const selected = new Set(linkedMachineSlugs);
    const machines = await readContent<Machine[]>('machines.json');
    let modified = false;

    for (const machine of machines) {
      const before = machine.compatibleProductSlugs;
      const next = before.filter((s) => s !== slug && s !== originalSlug);
      if (selected.has(machine.slug)) next.push(slug);

      if (next.length !== before.length || next.some((s, i) => s !== before[i])) {
        machine.compatibleProductSlugs = next;
        modified = true;
      }
    }

    if (modified) {
      await writeContent('machines.json', machines, `chore(admin): update machine links for product ${slug}`);
    }
  }

  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${slug}`);
}

export async function deleteProductAction(slug: string): Promise<void> {
  await requireAuth();
  const list = await readContent<Product[]>('products.json');
  const next = list.filter((p) => p.slug !== slug);
  if (next.length === list.length) throw new Error(`Product "${slug}" not found.`);
  await writeContent('products.json', next, `chore(admin): delete product ${slug}`);

  // Also remove the slug from every machine's compatibleProductSlugs
  const machines = await readContent<Machine[]>('machines.json');
  let modified = false;
  for (const m of machines) {
    if (m.compatibleProductSlugs.includes(slug)) {
      m.compatibleProductSlugs = m.compatibleProductSlugs.filter((s) => s !== slug);
      modified = true;
    }
  }
  if (modified) {
    await writeContent('machines.json', machines, `chore(admin): unlink product ${slug} from machines`);
  }
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

// ---------- Clients ----------

export async function saveClientsAction(list: Client[]): Promise<void> {
  await requireAuth();
  // Deduplicate by name (case-insensitive)
  const seen = new Set<string>();
  for (const c of list) {
    const key = c.name.trim().toLowerCase();
    if (!c.name.trim()) throw new Error('Client name cannot be empty.');
    if (seen.has(key)) throw new Error(`Duplicate client name "${c.name}".`);
    seen.add(key);
  }
  await writeContent('clients.json', list, `chore(admin): update clients list`);
  revalidatePath('/admin/clients');
}
