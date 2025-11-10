---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Cara menerjemahkan Next.js 15 Anda menggunakan next-i18next – panduan i18n 2025
description: Panduan praktis dan siap produksi untuk menginternasionalisasi aplikasi Next.js 15 App Router dengan i18next/next-i18next dan meningkatkan dengan Intlayer.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Menerjemahkan website Next.js 15 Anda menggunakan next-i18next dengan Intlayer | Internasionalisasi (i18n)

### Untuk siapa panduan ini

- **Junior**: Ikuti langkah-langkah persis dan salin blok kode. Anda akan mendapatkan aplikasi multibahasa yang berfungsi.
- **Mid-level**: Gunakan daftar periksa dan catatan praktik terbaik untuk menghindari kesalahan umum.
- **Senior**: Baca sekilas struktur tingkat tinggi, SEO, dan bagian otomatisasi; Anda akan menemukan pengaturan default yang masuk akal dan titik ekstensi.

### Apa yang akan Anda bangun

- Proyek App Router dengan rute yang dilokalkan (misalnya, `/`, `/fr/...`)
- Konfigurasi i18n dengan locale, locale default, dukungan RTL
- Inisialisasi i18n sisi server dan penyedia klien
- Terjemahan dengan namespace yang dimuat sesuai permintaan
- SEO dengan `hreflang`, `sitemap` yang dilokalkan, `robots`
- Middleware untuk routing locale
- Integrasi Intlayer untuk mengotomatisasi alur kerja terjemahan (tes, pengisian AI, sinkronisasi JSON)

> Catatan: next-i18next dibangun di atas i18next. Panduan ini menggunakan primitif i18next yang kompatibel dengan next-i18next dalam App Router, sambil menjaga arsitektur tetap sederhana dan siap produksi.
> Untuk perbandingan yang lebih luas, lihat [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Struktur proyek

Pasang dependensi next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

Mulailah dengan struktur yang jelas. Simpan pesan yang dipisahkan berdasarkan locale dan namespace.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Daftar periksa (mid/senior):

- Simpan satu JSON per namespace per locale
- Jangan terlalu memusatkan pesan; gunakan namespace kecil yang terfokus pada halaman/fitur
- Hindari mengimpor semua locale sekaligus; muat hanya yang Anda butuhkan

---

## 2) Pasang dependensi

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Jika Anda berencana menggunakan API atau interoperabilitas konfigurasi next-i18next, juga jalankan:

```bash
pnpm add next-i18next
```

---

## 3) Konfigurasi inti i18n

Tentukan locales, locale default, RTL, dan helper untuk path/URL yang dilokalkan.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Catatan senior: Jika Anda menggunakan `next-i18next.config.js`, pastikan untuk menyelaraskannya dengan `i18n.config.ts` agar tidak terjadi perbedaan.

---

## 4) Inisialisasi i18n sisi server

Inisialisasi i18next di server dengan backend dinamis yang hanya mengimpor JSON locale/namespace yang diperlukan.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Memuat sumber daya JSON dari src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Catatan tengah: Jaga daftar namespace agar tetap singkat per halaman untuk membatasi payload. Hindari bundle global “catch-all”.

---

## 5) Provider klien untuk komponen React

Bungkus komponen klien dengan provider yang mencerminkan konfigurasi server dan hanya memuat namespace yang diminta.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Tips junior: Anda tidak perlu mengirim semua pesan ke klien. Mulailah hanya dengan namespace halaman saja.

---

## 6) Tata letak dan rute yang dilokalkan

Atur bahasa dan arah, serta pra-generate rute per locale untuk mendukung rendering statis.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Contoh halaman dengan penggunaan server + client

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Memaksa rendering statis untuk halaman ini
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Terjemahan (satu JSON per namespace di bawah `src/locales/...`):

```json fileName="src/locales/id/about.json"
{
  "title": "Tentang",
  "description": "Deskripsi halaman tentang",
  "counter": {
    "label": "Penghitung",
    "increment": "Tambah"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Komponen client (memuat hanya namespace yang diperlukan):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Pastikan halaman/provider hanya menyertakan namespace yang Anda butuhkan (misalnya, `about`).
> Jika Anda menggunakan React < 19, gunakan memo untuk formatter berat seperti `Intl.NumberFormat`.

Komponen server sinkron yang disematkan di bawah batas klien:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadata, Hreflang, Sitemap, Robots

Menerjemahkan konten adalah cara untuk meningkatkan jangkauan. Sambungkan SEO multibahasa secara menyeluruh.

Praktik terbaik:

- Atur `lang` dan `dir` di root
- Tambahkan `alternates.languages` untuk setiap locale (+ `x-default`)
- Daftarkan URL yang diterjemahkan di `sitemap.xml` dan gunakan `hreflang`
- Kecualikan area privat yang dilokalkan (misalnya, `/fr/admin`) di `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Impor bundel JSON yang benar dari src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
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
    locales.map((locale) => [locale, abs(locale, "/about")])
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
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware untuk routing locale

Mendeteksi locale dan mengarahkan ulang ke rute yang dilokalkan jika tidak ada.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // mengecualikan file dengan ekstensi

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Cocokkan semua path kecuali yang diawali dengan ini dan file dengan ekstensi
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Praktik terbaik Performa dan DX

- **Set html `lang` dan `dir`**: Dilakukan di `src/app/[locale]/layout.tsx`.
- **Pisahkan pesan berdasarkan namespace**: Jaga bundle tetap kecil (`common.json`, `about.json`, dll.).
- **Minimalkan payload klien**: Pada halaman, kirim hanya namespace yang diperlukan ke provider.
- **Utamakan halaman statis**: Gunakan `export const dynamic = 'force-static'` dan `generateStaticParams` per locale.
- **Sinkronkan komponen server**: Kirim string/format yang sudah dihitung sebelumnya daripada panggilan async saat render.
- **Memoisasi operasi berat**: Terutama di kode klien untuk versi React yang lebih lama.
- **Cache dan header**: Utamakan statis atau `revalidate` daripada rendering dinamis jika memungkinkan.

---

## 11) Pengujian dan CI

- Tambahkan unit test untuk komponen yang menggunakan `t` untuk memastikan kunci ada.
- Validasi bahwa setiap namespace memiliki kunci yang sama di semua locale.
- Tampilkan kunci yang hilang selama CI sebelum deploy.

Intlayer akan mengotomatisasi banyak hal ini (lihat bagian berikutnya).

---

## 12) Tambahkan Intlayer di atas (otomatisasi)

Intlayer membantu Anda menjaga sinkronisasi terjemahan JSON, menguji kunci yang hilang, dan mengisi dengan AI jika diinginkan.

Pasang dependensi intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Tambahkan skrip package:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Alur umum:

- `pnpm i18n:test` di CI untuk gagal membangun jika ada kunci yang hilang
- `pnpm i18n:fill` secara lokal untuk mengusulkan terjemahan AI untuk kunci yang baru ditambahkan

> Anda dapat memberikan argumen CLI; lihat [dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

---

## 13) Pemecahan Masalah

- **Kunci tidak ditemukan**: Pastikan halaman/provider mencantumkan namespace yang benar dan file JSON ada di bawah `src/locales/<locale>/<namespace>.json`.
- **Bahasa salah/kedipan bahasa Inggris**: Periksa kembali deteksi locale di `middleware.ts` dan provider `lng`.
- **Masalah tata letak RTL**: Verifikasi bahwa `dir` berasal dari `isRtl(locale)` dan CSS Anda menghormati `[dir="rtl"]`.
- **Alternatif SEO hilang**: Pastikan `alternates.languages` mencakup semua locale dan `x-default`.
- **Bundle terlalu besar**: Pisahkan namespace lebih lanjut dan hindari mengimpor seluruh pohon `locales` di sisi klien.

---

## 14) Apa Selanjutnya

- Tambahkan lebih banyak locale dan namespace seiring berkembangnya fitur
- Lokalisasi halaman error, email, dan konten yang digerakkan oleh API
- Perluas workflow Intlayer untuk membuka PR secara otomatis guna pembaruan terjemahan

Jika Anda lebih suka menggunakan starter, coba template ini: `https://github.com/aymericzip/intlayer-next-i18next-template`.
