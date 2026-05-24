import { redirect } from 'next/navigation';
import { isAdminAuthenticated, getAdminPassword } from '@/lib/admin/auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  if (await isAdminAuthenticated()) redirect('/admin');
  const passwordConfigured = !!getAdminPassword();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
      <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />

      <div className="relative w-full max-w-md mx-auto px-6 py-12 animate-fade-in-up">
        <div className="flex items-center gap-2 text-white/70 text-xs font-semibold uppercase tracking-[0.18em]">
          <span className="h-px w-8 bg-brand-red" />
          Admin
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-3 text-sm text-brand-gray-400">
          Enter the admin password to manage machines, products, and clients.
        </p>

        {!passwordConfigured && (
          <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
            <p className="font-semibold">ADMIN_PASSWORD is not set.</p>
            <p className="mt-1 opacity-80">
              Add it to <code className="font-mono">.env.local</code> (locally) or your Vercel environment variables, then reload.
            </p>
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
