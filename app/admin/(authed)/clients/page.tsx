import { readContent } from '@/lib/admin/storage';
import type { Client } from '@/data/types';
import ClientsEditor from '@/components/admin/ClientsEditor';

export const dynamic = 'force-dynamic';

export default async function ClientsAdminPage() {
  const clients = await readContent<Client[]>('clients.json').catch(() => [] as Client[]);
  return <ClientsEditor initial={clients} />;
}
