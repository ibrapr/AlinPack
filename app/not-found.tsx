import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-white text-brand-black">
        <div className="text-center px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-red">404</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Page not found</h1>
          <p className="mt-4 text-base text-brand-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link
            href="/en"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark"
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
