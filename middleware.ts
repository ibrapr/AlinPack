import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferred = acceptLanguage
    .split(',')
    .map((s) => s.split(';')[0].trim().toLowerCase().slice(0, 2));

  for (const lang of preferred) {
    if ((locales as readonly string[]).includes(lang)) {
      return lang;
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    '/((?!api|admin|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
