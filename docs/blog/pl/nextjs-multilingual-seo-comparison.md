---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO i i18n w Next.js
description: Dowiedz się, jak skonfigurować wielojęzyczne SEO w swojej aplikacji Next.js, używając next-intl, next-i18next i Intlayer.
keywords:
  - Intlayer
  - SEO
  - Internacjonalizacja
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - blog-seo-i18n-nextjs
---

# SEO i i18n w Next.js: Tłumaczenie to za mało

Kiedy deweloperzy myślą o internacjonalizacji (i18n), ich pierwszym odruchem jest często: _przetłumacz zawartość_. Jednak ludzie zazwyczaj zapominają, że głównym celem internacjonalizacji jest uczynienie Twojej strony bardziej widoczną dla świata.
Jeśli Twoja wielojęzyczna aplikacja Next.js nie informuje wyszukiwarek, jak indeksować i rozumieć różne wersje językowe, większość Twoich wysiłków może pozostać niezauważona.

W tym wpisie na blogu omówimy, **dlaczego i18n to supermoc SEO** oraz jak poprawnie zaimplementować ją w Next.js za pomocą `next-intl`, `next-i18next` i `Intlayer`.

---

## Dlaczego SEO i i18n

Dodanie języków to nie tylko kwestia UX. To także potężny dźwignia dla **organicznej widoczności**. Oto dlaczego:

1. **Lepsza wykrywalność:** Wyszukiwarki indeksują zlokalizowane wersje i pozycjonują je dla użytkowników szukających w ich rodzimym języku.
2. **Unikanie duplikatów treści:** Poprawne tagi kanoniczne i alternatywne informują roboty, która strona należy do którego języka.
3. **Lepsze UX:** Odwiedzający trafiają od razu na właściwą wersję Twojej strony.
4. **Przewaga konkurencyjna:** Niewiele stron dobrze wdraża wielojęzyczne SEO, co oznacza, że możesz się wyróżnić.

---

## Najlepsze praktyki dla wielojęzycznego SEO w Next.js

Oto lista kontrolna, którą powinna wdrożyć każda wielojęzyczna aplikacja:

- **Ustaw meta tagi `hreflang` w `<head>`**  
  Pomaga Google zrozumieć, które wersje istnieją dla każdego języka.

- **Wymień wszystkie przetłumaczone strony w `sitemap.xml`**  
  Użyj schematu `xhtml`, aby roboty mogły łatwo znaleźć alternatywy.

- **Wyklucz prywatne/zlokalizowane ścieżki w `robots.txt`**  
  np. nie pozwól na indeksowanie `/dashboard`, `/fr/dashboard`, `/es/dashboard`.

- **Używaj zlokalizowanych linków**  
  Przykład: `<a href="/fr/about">À propos</a>` zamiast linkować do domyślnego `/about`.

To proste kroki — ale ich pominięcie może kosztować Cię widoczność.

---

## Przykłady implementacji

Programiści często zapominają o prawidłowym odwoływaniu się do swoich stron w różnych lokalizacjach, więc przyjrzyjmy się, jak to działa w praktyce z różnymi bibliotekami.

### **next-intl**

<Tabs>
  <TabItem label="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Reszta kodu strony
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales.filter((l) => l !== defaultLocale).map((l) => `/${l}${path}`),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### **next-i18next**

  </TabItem>
  <TabItem label="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Prefiks ścieżki z lokalizacją, chyba że jest to domyślna lokalizacja */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Pomocnik do tworzenia absolutnego URL */
const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Dynamicznie importuj odpowiedni plik JSON
  const messages = (await import(`@/../public/locales/${locale}/about.json`))
    .default;

  const languages = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>O nas</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, abs(l, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((l) => l !== defaultLocale)
    .map((l) => localizedPath(l, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
```

### **Intlayer**

  </TabItem>
  <TabItem label="intlayer">

````typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generuje obiekt zawierający wszystkie adresy URL dla każdej lokalizacji.
   *
   * Przykład:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Zwraca
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Reszta kodu strony
````

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// Funkcja zwracająca wszystkie wielojęzyczne adresy URL z podanej listy
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Konfiguracja pliku robots.txt z regułami dostępu i sitemapą
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // Blokowanie dostępu do /dashboard we wszystkich lokalizacjach
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer zapewnia funkcję `getMultilingualUrls`, która generuje wielojęzyczne adresy URL dla Twojej mapy witryny.

  </TabItem>
</Tabs>

---

## Podsumowanie

Poprawne wdrożenie i18n w Next.js to nie tylko tłumaczenie tekstu, ale także upewnienie się, że wyszukiwarki i użytkownicy dokładnie wiedzą, którą wersję Twoich treści wyświetlić.
Konfiguracja hreflang, map witryn i reguł robots to klucz do przekształcenia tłumaczeń w realną wartość SEO.

Chociaż next-intl i next-i18next oferują solidne metody integracji, zazwyczaj wymagają one dużo ręcznej konfiguracji, aby zachować spójność między lokalizacjami.

To właśnie tutaj Intlayer naprawdę błyszczy:

Dostarcza wbudowane narzędzia, takie jak getMultilingualUrls, które sprawiają, że integracja hreflang, map witryn i robots jest niemal bezwysiłkowa.

Metadane pozostają scentralizowane, zamiast być rozproszone w plikach JSON lub niestandardowych narzędziach.

Jest zaprojektowany od podstaw dla Next.js, dzięki czemu spędzasz mniej czasu na debugowaniu konfiguracji, a więcej na wdrażaniu.

Jeśli Twoim celem nie jest tylko tłumaczenie, ale skalowanie wielojęzycznego SEO bez przeszkód, Intlayer zapewnia najczystsze i najbardziej przyszłościowe rozwiązanie.
