---
createdAt: 2025-09-28
updatedAt: 2025-09-28
title: SEO dan i18n di Next.js
description: Pelajari cara mengatur SEO multibahasa di aplikasi Next.js Anda menggunakan next-intl, next-i18next, dan Intlayer.
keywords:
  - Intlayer
  - SEO
  - Internasionalisasi
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

# SEO dan i18n di Next.js: Menerjemahkan saja tidak cukup

Ketika pengembang memikirkan internasionalisasi (i18n), refleks pertama sering kali adalah: _menerjemahkan konten_. Namun orang biasanya lupa bahwa tujuan utama internasionalisasi adalah membuat situs web Anda lebih terlihat oleh dunia.
Jika aplikasi Next.js multibahasa Anda tidak memberi tahu mesin pencari bagaimana cara merayapi dan memahami versi bahasa yang berbeda, sebagian besar upaya Anda mungkin tidak terlihat.

Dalam blog ini, kita akan mengeksplorasi **mengapa i18n adalah kekuatan super SEO** dan bagaimana mengimplementasikannya dengan benar di Next.js menggunakan `next-intl`, `next-i18next`, dan `Intlayer`.

---

## Mengapa SEO dan i18n

Menambahkan bahasa bukan hanya tentang UX. Ini juga merupakan tuas yang kuat untuk **visibilitas organik**. Berikut alasannya:

1. **Penemuan yang lebih baik:** Mesin pencari mengindeks versi lokal dan memberi peringkat untuk pengguna yang mencari dalam bahasa asli mereka.
2. **Menghindari konten duplikat:** Tag kanonik dan alternatif yang tepat memberi tahu crawler halaman mana yang milik locale mana.
3. **UX yang lebih baik:** Pengunjung langsung mendarat di versi situs Anda yang tepat.
4. **Keunggulan kompetitif:** Sedikit situs yang mengimplementasikan SEO multibahasa dengan baik yang berarti Anda bisa menonjol.

---

## Praktik Terbaik untuk SEO Multibahasa di Next.js

Berikut adalah daftar periksa yang harus diimplementasikan setiap aplikasi multibahasa:

- **Atur tag meta `hreflang` di `<head>`**  
  Membantu Google memahami versi mana yang ada untuk setiap bahasa.

- **Daftarkan semua halaman terjemahan di `sitemap.xml`**  
  Gunakan skema `xhtml` agar perayap dapat dengan mudah menemukan alternatif.

- **Kecualikan rute privat/lokal di `robots.txt`**  
  Contoh: jangan biarkan `/dashboard`, `/fr/dashboard`, `/es/dashboard` diindeks.

- **Gunakan tautan yang dilokalkan**  
  Contoh: `<a href="/fr/about">À propos</a>` daripada menautkan ke `/about` default.

Ini adalah langkah sederhana — tetapi melewatkannya dapat mengurangi visibilitas Anda.

---

## Contoh Implementasi

Pengembang sering lupa untuk merujuk halaman mereka dengan benar di berbagai locale, jadi mari kita lihat bagaimana ini bekerja dalam praktik dengan berbagai pustaka.

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

// ... Sisa kode halaman
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

/** Prefix path dengan locale kecuali jika itu adalah locale default */
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

/** Helper URL absolut */
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

  // Mengimpor file JSON yang sesuai secara dinamis
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
  return <h1>Tentang</h1>;
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
      changeFrequency: "monthly", // Frekuensi perubahan halaman
      priority: 0.7, // Prioritas halaman dalam sitemap
      alternates: { languages }, // Alternatif bahasa untuk halaman ini
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
   * Menghasilkan objek yang berisi semua url untuk setiap locale.
   *
   * Contoh:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Mengembalikan
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

// ... Sisa kode halaman
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

// Mendapatkan semua URL multibahasa dari daftar URL yang diberikan
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // Melarang akses ke semua versi multibahasa dari /dashboard
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Intlayer menyediakan fungsi `getMultilingualUrls` untuk menghasilkan URL multibahasa untuk sitemap Anda.

  </TabItem>
</Tabs>

---

## Kesimpulan

Mengelola i18n dengan benar di Next.js bukan hanya soal menerjemahkan teks, tetapi juga memastikan mesin pencari dan pengguna tahu versi konten mana yang harus disajikan.
Mengatur hreflang, sitemap, dan aturan robots adalah yang mengubah terjemahan menjadi nilai SEO yang nyata.

Meskipun next-intl dan next-i18next memberikan cara yang solid untuk menghubungkan ini, biasanya mereka memerlukan banyak pengaturan manual agar tetap konsisten di seluruh locale.

Di sinilah Intlayer benar-benar bersinar:

Ini dilengkapi dengan helper bawaan seperti getMultilingualUrls, membuat integrasi hreflang, sitemap, dan robots hampir tanpa usaha.

Metadata tetap terpusat alih-alih tersebar di berbagai file JSON atau utilitas kustom.

Ini dirancang khusus untuk Next.js sejak awal, sehingga Anda menghabiskan lebih sedikit waktu untuk debugging konfigurasi dan lebih banyak waktu untuk pengiriman.

Jika tujuan Anda bukan hanya menerjemahkan tetapi juga mengembangkan SEO multibahasa tanpa hambatan, Intlayer memberikan pengaturan yang paling bersih dan paling tahan masa depan.
