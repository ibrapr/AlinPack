'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { loginAction } from '../actions';

const initial = { error: undefined } as { error?: string };

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initial);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-gray-400">
          Password
        </span>
        <div className="mt-2 relative">
          <Lock className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gray-500" />
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="••••••••"
            className="w-full rounded-2xl border border-white/15 bg-white/5 ps-11 pe-4 py-3.5 text-sm text-white placeholder:text-brand-gray-500 backdrop-blur focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>
      </label>

      {state?.error && (
        <p className="inline-flex items-start gap-2 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary w-full justify-center text-base px-7 py-3.5"
    >
      {pending ? 'Signing in…' : 'Sign in'}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}
