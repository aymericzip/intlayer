'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { defaultLocale, getCookie, type Locale, locales } from '@/i18n';

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Remove the locale prefix from the pathname to get the base path
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || '/';
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Language selector" className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 p-2 dark:border-zinc-800 dark:bg-zinc-900">
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Build the href based on whether it's the default locale
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-sm transition-all ${
                isActive
                  ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50'
              }`}
            >
              <span className="hidden sm:inline">{getLocaleLabel(locale)}</span>
              <span className="sm:hidden">{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
