---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Cara menerjemahkan Next.js 15 Anda menggunakan next-intl – panduan i18n 2025
description: Temukan cara membuat situs web Next.js 15 App Router Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Menerjemahkan situs Next.js 15 Anda menggunakan next-intl dengan Intlayer | Internasionalisasi (i18n)

Panduan ini akan memandu Anda melalui praktik terbaik next-intl dalam aplikasi Next.js 15 (App Router), dan menunjukkan cara menambahkan Intlayer di atasnya untuk manajemen terjemahan yang kuat dan otomatisasi.

Lihat perbandingan di [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md).

- Untuk pemula: ikuti bagian langkah demi langkah untuk mendapatkan aplikasi multibahasa yang berfungsi.
- Untuk pengembang tingkat menengah: perhatikan optimasi payload dan pemisahan server/client.
- Untuk senior: perhatikan generasi statis, middleware, integrasi SEO, dan hooks otomatisasi.

Apa yang akan kita bahas:

- Pengaturan dan struktur file
- Mengoptimalkan cara pesan dimuat
- Penggunaan komponen client dan server
- Metadata, sitemap, robots untuk SEO
- Middleware untuk routing locale
- Menambahkan Intlayer di atasnya (CLI dan otomatisasi)

## Siapkan aplikasi Anda menggunakan next-intl

Pasang dependensi next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Pengaturan dan Memuat Konten

Muat hanya namespace yang dibutuhkan oleh rute Anda dan validasi locale lebih awal. Pertahankan komponen server agar sinkron jika memungkinkan dan kirim hanya pesan yang diperlukan ke client.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Muat hanya namespace yang dibutuhkan oleh layout/halaman Anda
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Atur locale permintaan aktif untuk render server ini (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Pesan dimuat di sisi server. Kirim hanya yang diperlukan ke klien.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Terjemahan/formatting yang benar-benar di sisi server
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Penggunaan dalam komponen klien

Mari kita ambil contoh komponen klien yang merender sebuah penghitung.

**Terjemahan (bentuk yang digunakan ulang; muat ke dalam pesan next-intl sesuai keinginan Anda)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Komponen klien**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Scope langsung ke objek yang bersarang
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Jangan lupa untuk menambahkan pesan "about" pada pesan klien halaman
> (hanya sertakan namespace yang benar-benar dibutuhkan oleh klien Anda).

### Penggunaan dalam komponen server

Komponen UI ini adalah komponen server dan dapat dirender di bawah komponen klien (halaman → klien → server). Jaga agar tetap sinkron dengan melewatkan string yang sudah dihitung sebelumnya.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Catatan:

- Hitung `formattedCount` di sisi server (misalnya, `const initialFormattedCount = format.number(0)`).
- Hindari melewatkan fungsi atau objek yang tidak dapat diserialisasi ke dalam komponen server.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
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
    locales.map((locale) => [locale, localizedPath(locale, url)])
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
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

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
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Middleware untuk routing locale

Tambahkan middleware untuk menangani deteksi locale dan routing:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Lewati API, internal Next, dan aset statis
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Praktik terbaik

- **Setel html `lang` dan `dir`**: Di `src/app/[locale]/layout.tsx`, hitung `dir` melalui `getLocaleDirection(locale)` dan setel `<html lang={locale} dir={dir}>`.
- **Pisahkan pesan berdasarkan namespace**: Atur JSON per locale dan namespace (misalnya, `common.json`, `about.json`).
- **Minimalkan payload klien**: Pada halaman, kirim hanya namespace yang diperlukan ke `NextIntlClientProvider` (misalnya, `pick(messages, ['common', 'about'])`).
- **Utamakan halaman statis**: Ekspor `export const dynamic = 'force-static'` dan buat parameter statis untuk semua `locales`.
- **Komponen server sinkron**: Kirim string yang sudah dipra-hitung (label yang diterjemahkan, angka yang diformat) daripada panggilan async atau fungsi yang tidak dapat diserialisasi.

## Implementasikan Intlayer di atas next-intl

Pasang dependensi intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

Buat file konfigurasi intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Pertahankan struktur folder per-namespace Anda agar sinkron dengan Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Tambahkan skrip `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Catatan:

- `intlayer fill`: menggunakan penyedia AI Anda untuk mengisi terjemahan yang hilang berdasarkan locale yang telah Anda konfigurasikan.
- `intlayer test`: memeriksa terjemahan yang hilang/tidak valid (gunakan dalam CI).

Anda dapat mengonfigurasi argumen dan penyedia; lihat [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).
