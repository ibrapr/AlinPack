import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin/auth';
import { getStorageInfo } from '@/lib/admin/storage';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AuthedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect('/admin/login');
  const info = getStorageInfo();
  return <AdminShell storageMode={info.mode}>{children}</AdminShell>;
}
