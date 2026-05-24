import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-hero text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]" />
      <div className="absolute -top-32 -end-32 h-80 w-80 rounded-full bg-brand-red/20 blur-3xl" />
      <div className="container-wide relative text-center py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">404</p>
        <h1 className="mt-4 heading-xl">Page not found</h1>
        <p className="mt-5 text-lg text-brand-gray-300 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/en" className="btn-primary">
            Back to home
            <ArrowRight className="h-4 w-4 rtl-flip" />
          </Link>
          <Link
            href="/en/machines"
            className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur"
          >
            Browse machines
          </Link>
        </div>
      </div>
    </section>
  );
}
