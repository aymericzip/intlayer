---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO and i18n in Next.js
description: Learn how to set up multilingual SEO in your Next.js app using next-intl, next-i18next, and Intlayer.
keywords:
  - Intlayer
  - SEO
  - Internationalization
  - Next.js
  - i18n
  - JavaScript
  - React
  - next-intl
  - next-i18next
slugs:
  - blog
  - seo
  - i18n
  - nextjs
---

# SEO and i18n in Next.js: Translating is not enough

When developers think about internationalization (i18n), the first reflex is often: _translate the content_. But people usually forget that the main goal of internationalization is to make your website more visible to the world.
If your multilingual Next.js app doesn’t tell search engines how to crawl and understand your different language versions, most of your effort may go unnoticed.

In this blog, we’ll explore **why i18n is an SEO superpower** and how to implement it correctly in Next.js with `next-intl`, `next-i18next`, and `Intlayer`.

---

## Why SEO and i18n

Adding languages isn’t just about UX. It’s also a powerful lever for **organic visibility**. Here’s why:

1. **Better discoverability:** Search engines index localized versions and rank them for users searching in their native language.
2. **Avoid duplicate content:** Proper canonical and alternate tags tell crawlers which page belongs to which locale.
3. **Better UX:** Visitors land on the right version of your site immediately.
4. **Competitive advantage:** Few sites implement multilingual SEO well which means you can stand out.

---

## Best Practices for Multilingual SEO in Next.js

Here’s a checklist every multilingual app should implement:

- **Set `hreflang` meta tags in `<head>`**  
  Helps Google understand which versions exist for each language.

- **List all translated pages in `sitemap.xml`**  
  Use the `xhtml` schema so crawlers can find alternates easily.

- **Exclude private/localized routes in `robots.txt`**  
  e.g. don’t let `/dashboard`, `/fr/dashboard`, `/es/dashboard` be indexed.

- **Use localized links**  
  Example: `<a href="/fr/about">À propos</a>` instead of linking to the default `/about`.

These are simple steps — but skipping them can cost you visibility.

---

## Implementation Examples

Developers often forget to properly reference their pages across locales so let’s look at how this works in practice with different libraries.

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

// ... Rest of the page code
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

/** Prefix path with locale unless it's the default locale */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Absolute URL helper */
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

  // Dynamically import the correct JSON file
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
  return <h1>About</h1>;
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
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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

// ... Rest of the page code
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

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer provides a `getMultilingualUrls` function to generate multilingual URLs for your sitemap.

  </TabItem>
</Tabs>

---

## Conclusion

Getting i18n right in Next.js isn’t just about translating text, it’s about making sure search engines and users know exactly which version of your content to serve.
Setting up hreflang, sitemaps, and robots rules is what turns translations into real SEO value.

While next-intl and next-i18next give you solid ways to wire this up, they usually require a lot of manual setup to keep things consistent across locales.

This is where Intlayer really shines:

It comes with built-in helpers like getMultilingualUrls, making hreflang, sitemap, and robots integration almost effortless.

Metadata stays centralized instead of scattered across JSON files or custom utilities.

It’s designed for Next.js from the ground up, so you spend less time debugging config and more time shipping.

If your goal is not just to translate but to scale multilingual SEO without friction, Intlayer gives you the cleanest, most future-proof setup.
