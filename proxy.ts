import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, localizePath, splitLocale } from './src/i18n/config';

/**
 * Locale routing.
 *
 *   /ru/..., /kk/...  -> served as is
 *   /en/...           -> 308 to the unprefixed URL (English has exactly one public address)
 *   /...              -> visitor explicitly chose ru/kk before (cookie)? 307 to /ru/... or /kk/...
 *                        otherwise rewritten internally to /en/... (URL stays unprefixed)
 *
 * The browser's Accept-Language is deliberately ignored: a recruiter opening a link from
 * an English CV should see English. Crawlers never carry the cookie, so "/" is always indexed as EN.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { locale, path } = splitLocale(pathname);
  const url = request.nextUrl.clone();

  if (locale === DEFAULT_LOCALE) {
    url.pathname = path;
    return NextResponse.redirect(url, 308);
  }
  if (locale) return NextResponse.next();

  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(remembered) && remembered !== DEFAULT_LOCALE) {
    url.pathname = localizePath(path, remembered);
    return NextResponse.redirect(url, 307);
  }

  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: skip API routes, Next internals, metadata files and anything with a file extension.
  matcher: ['/((?!api|_next|_vercel|og|assets|images|fonts|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
};
