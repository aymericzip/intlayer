---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Cara menginternasionalisasi aplikasi Next.js Anda menggunakan next-intl
description: Mengatur i18n dengan next-intl: praktik terbaik dan tips SEO untuk aplikasi Next.js multibahasa, mencakup internasionalisasi, organisasi konten, dan pengaturan teknis.
slugs:
  - blog
  - nextjs-internationalization-using-next-intl
applicationTemplate: https://github.com/aymericzip/next-intl-template
history:
  - version: 7.0.0
    date: 2025-11-01
    changes: Versi awal
---

# Cara menginternasionalisasi aplikasi Next.js Anda menggunakan next-intl pada tahun 2025

## Daftar Isi

<TOC/>

## Apa itu next-intl?

**next-intl** adalah perpustakaan internasionalisasi (i18n) yang populer yang dirancang khusus untuk Next.js App Router. Ini menyediakan cara yang mulus untuk membangun aplikasi Next.js multibahasa dengan dukungan TypeScript yang sangat baik dan optimasi bawaan.

> Jika Anda mau, Anda juga dapat merujuk ke [panduan next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-i18next.md), atau langsung menggunakan [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_next-intl.md).

> Lihat perbandingan di [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md).

## Praktik yang harus Anda ikuti

Sebelum kita masuk ke implementasi, berikut beberapa praktik yang harus Anda ikuti:

- **Atur atribut HTML `lang` dan `dir`**  
  Dalam layout Anda, hitung `dir` menggunakan `getLocaleDirection(locale)` dan atur `<html lang={locale} dir={dir}>` untuk aksesibilitas dan SEO yang tepat.
- **Pisahkan pesan berdasarkan namespace**  
  Atur file JSON per locale dan namespace (misalnya, `common.json`, `about.json`) agar hanya memuat apa yang Anda butuhkan.
- **Minimalkan payload klien**  
  Pada halaman, kirim hanya namespace yang diperlukan ke `NextIntlClientProvider` (misalnya, `pick(messages, ['common', 'about'])`).
- **Utamakan halaman statis**  
  Gunakan halaman statis sebanyak mungkin untuk kinerja dan SEO yang lebih baik.
- **I18n pada komponen server**  
  Komponen server, seperti halaman atau semua komponen yang tidak ditandai sebagai `client` adalah statis dan dapat di-pre-render pada waktu build. Jadi kita harus mengoper fungsi terjemahan ke mereka sebagai props.
- **Atur tipe TypeScript**  
  Untuk locale Anda guna memastikan keamanan tipe di seluruh aplikasi Anda.
- **Proxy untuk pengalihan**  
  Gunakan proxy untuk menangani deteksi locale dan routing serta mengarahkan pengguna ke URL dengan prefix locale yang sesuai.
- **Internasionalisasi metadata, sitemap, robots.txt Anda**  
  Internasionalisasikan metadata, sitemap, robots.txt Anda menggunakan fungsi `generateMetadata` yang disediakan oleh Next.js untuk memastikan penemuan yang lebih baik oleh mesin pencari di semua locale.
- **Lokalisaikan Tautan**  
  Lokalisasi Tautan menggunakan komponen `Link` untuk mengarahkan pengguna ke URL dengan prefix locale yang sesuai. Ini penting untuk memastikan penemuan halaman Anda di semua locale.
- **Otomatisasi pengujian dan terjemahan**  
  Otomatisasi pengujian dan terjemahan membantu menghemat waktu dalam memelihara aplikasi multibahasa Anda.

> Lihat dokumentasi kami yang mencantumkan semua yang perlu Anda ketahui tentang internasionalisasi dan SEO: [Internasionalisasi (i18n) dengan next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md).

---

## Panduan Langkah demi Langkah untuk Mengatur next-intl di Aplikasi Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-intl-template?embed=1&ctl=1&file=src/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

> Lihat [Template Aplikasi](https://github.com/aymericzip/next-intl-template) di GitHub.

Berikut adalah struktur proyek yang akan kita buat:

```bash
.
├── global.ts
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
└── src # Src adalah opsional
    ├── proxy.ts
    ├── app
    │   ├── i18n.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Grup Rute untuk tidak mencemari semua halaman dengan sumber daya home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Langkah 1: Pasang Dependensi

Pasang paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

- **next-intl**: Perpustakaan internasionalisasi inti untuk Next.js App Router yang menyediakan hooks, fungsi server, dan penyedia klien untuk mengelola terjemahan.

### Langkah 2: Konfigurasikan Proyek Anda

Buat file konfigurasi yang mendefinisikan locale yang didukung dan mengatur konfigurasi request next-intl. File ini berfungsi sebagai sumber kebenaran tunggal untuk pengaturan i18n Anda dan memastikan keamanan tipe di seluruh aplikasi Anda.

Mencentralisasi konfigurasi locale Anda mencegah inkonsistensi dan memudahkan penambahan atau penghapusan locale di masa depan. Fungsi `getRequestConfig` dijalankan pada setiap permintaan dan hanya memuat terjemahan yang dibutuhkan untuk setiap halaman, memungkinkan pemisahan kode dan mengurangi ukuran bundle.

```tsx fileName="src/i18n.ts"
import { notFound } from "next/navigation";
import createMiddleware from "next-intl/middleware";
import { createNavigation } from "next-intl/navigation";

// Mendefinisikan locale yang didukung dengan keamanan tipe
export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale | (string & {})) {
  return /^(ar|fa|he|iw|ur|ps|sd|ug|yi|ckb|ku)(-|$)/i.test(locale);
}

// Memuat pesan secara dinamis per locale untuk memungkinkan pemisahan kode
// Promise.all memuat namespace secara paralel untuk kinerja yang lebih baik
async function loadMessages(locale: Locale) {
  // Hanya memuat namespace yang dibutuhkan oleh layout/halaman Anda
  const [common, home, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/home.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
    // ... File JSON masa depan harus ditambahkan di sini
  ]);

  return { common, home, about } as const;
}

// Helper untuk menghasilkan URL yang dilokalkan (misalnya, /about vs /fr/about)
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// getRequestConfig dijalankan pada setiap permintaan dan menyediakan pesan ke komponen server
// Di sinilah next-intl terhubung ke rendering sisi server Next.js
export default async function getRequestConfig({
  requestLocale,
}: {
  requestLocale: Promise<string | undefined>;
}) {
  const requested: Locale = ((await requestLocale) as Locale) ?? defaultLocale;

  if (!locales.includes(requested)) notFound();

  return {
    locale: requested,
    messages: await loadMessages(requested),
  };
}

export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 tahun
    "SameSite=Lax",
  ].join("; ");
}

const routingOptions = {
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Ubah rute /en/... menjadi /...
  // Opsional: pathnames yang dilokalkan
  // pathnames: {
  //   '/': '/',
  //   '/about': {en: '/about', fr: '/a-propos', es: '/acerca-de'},
  //   '/blog/[slug]': '/blog/[slug]'
  // }
  //  localeDetection: true, // mencegah pengalihan "/" -> "/en" dari cookie
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routingOptions);

export const proxy = createMiddleware(routingOptions);
```

### Langkah 3: Definisikan Rute Dinamis Locale

Atur routing dinamis untuk locale dengan membuat direktori `[locale]` di folder aplikasi Anda. Ini memungkinkan Next.js untuk menangani routing berbasis locale di mana setiap locale menjadi segmen URL (misalnya, `/en/about`, `/fr/about`).

Menggunakan routing dinamis memungkinkan Next.js untuk menghasilkan halaman statis untuk semua locale saat build time, meningkatkan performa dan SEO. Komponen layout mengatur atribut HTML `lang` dan `dir` berdasarkan locale, yang sangat penting untuk aksesibilitas dan pemahaman mesin pencari.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import { getLocaleDirection, setRequestLocale } from "next-intl/server";

// Pra-hasilkan halaman statis untuk semua locale saat build time (SSG)
// Ini meningkatkan performa dan SEO
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Dalam Next.js App Router, params adalah Promise (dapat di-await)
  // Ini memungkinkan segmen rute dinamis diselesaikan secara asinkron
  const { locale } = await params;

  // Penting: setRequestLocale memberi tahu next-intl locale mana yang digunakan untuk permintaan ini
  // Tanpa ini, getTranslations() tidak akan tahu locale mana yang digunakan di komponen server
  setRequestLocale(locale);

  // Dapatkan arah teks (LTR/RTL) untuk rendering HTML yang tepat
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
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Pesan dimuat di sisi server. Kirim hanya yang dibutuhkan ke klien.
  // Ini meminimalkan bundle JavaScript yang dikirim ke browser
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Terjemahan/formatting yang hanya dijalankan di sisi server
  // Ini dijalankan di server dan dapat diteruskan sebagai props ke komponen
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider membuat terjemahan tersedia untuk komponen klien
    // Hanya teruskan namespace yang benar-benar digunakan oleh komponen klien Anda
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Langkah 4: Buat File Terjemahan Anda

Buat file JSON untuk setiap locale dan namespace. Struktur ini memungkinkan Anda mengatur terjemahan secara logis dan memuat hanya yang Anda butuhkan untuk setiap halaman.

Mengorganisir terjemahan berdasarkan namespace (misalnya, `common.json`, `about.json`) memungkinkan pemisahan kode dan mengurangi ukuran bundle. Anda hanya memuat terjemahan yang dibutuhkan untuk setiap halaman, sehingga meningkatkan performa.

```json fileName="locales/en/common.json"
{
  "welcome": "Welcome",
  "greeting": "Hello, world!"
}
```

```json fileName="locales/fr/common.json"
{
  "welcome": "Bienvenue",
  "greeting": "Bonjour le monde!"
}
```

```json fileName="locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

### Langkah 5: Gunakan Terjemahan di Halaman Anda

Buat komponen halaman yang memuat terjemahan di server dan meneruskannya ke komponen server dan klien. Ini memastikan terjemahan dimuat sebelum rendering dan mencegah konten berkedip.

Memuat terjemahan di sisi server meningkatkan SEO dan mencegah FOUC (Flash of Untranslated Content). Dengan menggunakan `pick` untuk mengirim hanya namespace yang diperlukan ke penyedia klien, kita meminimalkan bundle JavaScript yang dikirim ke browser.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponent from "@/components/ClientComponent";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Pesan dimuat di sisi server. Kirim hanya yang diperlukan ke klien.
  // Ini meminimalkan bundle JavaScript yang dikirim ke browser
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Terjemahan/formatting yang benar-benar di sisi server
  // Ini dijalankan di server dan dapat diteruskan sebagai props ke komponen
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    // NextIntlClientProvider membuat terjemahan tersedia untuk komponen klien
    // Hanya kirim namespace yang benar-benar digunakan oleh komponen klien Anda
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponent />
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

### Langkah 6: Gunakan Terjemahan di Komponen Klien

Komponen klien dapat menggunakan hook `useTranslations` dan `useFormatter` untuk mengakses terjemahan dan fungsi pemformatan. Hook ini membaca dari konteks `NextIntlClientProvider`.

Komponen klien memerlukan hook React untuk mengakses terjemahan. Hook `useTranslations` dan `useFormatter` terintegrasi dengan mulus dengan next-intl dan menyediakan pembaruan reaktif saat locale berubah.

> Jangan lupa untuk menambahkan namespace yang diperlukan ke pesan klien halaman (hanya sertakan namespace yang benar-benar dibutuhkan oleh komponen klien Anda).

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponent = () => {
  // Scope langsung ke objek bersarang
  // useTranslations/useFormatter adalah hook yang membaca dari konteks NextIntlClientProvider
  // Mereka hanya berfungsi jika komponen dibungkus dalam NextIntlClientProvider
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

### Langkah 7: Menggunakan Terjemahan di Komponen Server

Komponen server tidak dapat menggunakan React hooks, sehingga mereka menerima terjemahan dan formatter melalui props dari komponen induknya. Pendekatan ini menjaga komponen server tetap sinkron dan memungkinkan mereka untuk disisipkan di dalam komponen klien.

Komponen server yang mungkin disisipkan di bawah batasan klien harus bersifat sinkron. Dengan meneruskan string yang sudah diterjemahkan dan nilai yang sudah diformat sebagai props, kita menghindari operasi async dan memastikan rendering yang tepat. Pre-komputasi terjemahan dan format di komponen halaman induk.

```tsx fileName="src/components/ServerComponent.tsx"
// Komponen server yang disisipkan di dalam komponen klien harus bersifat sinkron
// React tidak dapat menyerialisasi fungsi async melintasi batas server/klien
// Solusi: pre-komputasi terjemahan/format di induk dan teruskan sebagai props
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

> Di halaman/layout Anda, gunakan `getTranslations` dan `getFormatter` dari `next-intl/server` untuk menghitung terjemahan dan format terlebih dahulu, lalu teruskan sebagai props ke komponen server.

---

### (Opsional) Langkah 8: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda dengan next-intl, render tautan yang mengenali locale yang mengarah ke pathname yang sama sambil mengganti locale. Provider akan menulis ulang URL secara otomatis, jadi Anda hanya perlu menargetkan rute saat ini.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n";

const getLocaleLabel = (locale: Locale): string => {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    return displayNames.of(locale) ?? locale.toUpperCase();
  } catch {
    return locale.toUpperCase();
  }
};

const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
};

export default function LocaleSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();

  // Hapus prefix locale dari pathname untuk mendapatkan path dasar
  const getBasePath = (path: string) => {
    for (const locale of locales) {
      if (path.startsWith(`/${locale}`)) {
        return path.slice(locale.length + 1) || "/";
      }
    }
    return path;
  };

  const basePath = getBasePath(pathname);

  return (
    <nav aria-label="Pemilih bahasa">
      <div>
        {(locales as readonly Locale[]).map((locale) => {
          const isActive = locale === activeLocale;
          // Bangun href berdasarkan apakah ini locale default
          const href =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
          return (
            <Link
              key={locale}
              href={href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                document.cookie = getCookie(locale);
              }}
            >
              <span>{localeFlags[locale]}</span>
              <span>{getLocaleLabel(locale)}</span>
              <span>{locale.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### (Opsional) Langkah 9: Gunakan komponen Link yang sudah dilokalisasi

`next-intl` menyediakan subpaket `next-intl/navigation` yang berisi komponen link yang sudah dilokalisasi dan secara otomatis menerapkan locale aktif. Kami sudah mengekstraknya untuk Anda di file `@/i18n`, jadi Anda bisa menggunakannya seperti ini:

```tsx fileName="src/components/MyComponent.tsx"
import { Link } from "@/i18n";

return <Link href="/about">t("about.title")</Link>;
```

### (Opsional) Langkah 10: Akses locale aktif di dalam Server Actions

Server Actions dapat membaca locale saat ini menggunakan `next-intl/server`. Ini berguna untuk mengirim email yang sudah dilokalisasi atau menyimpan preferensi bahasa bersamaan dengan data yang dikirimkan.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLocale() {
  return getLocale();
}

export async function handleContactForm(formData: FormData) {
  const locale = await getCurrentLocale();

  // Gunakan locale untuk memilih template, label analitik, dll.
  console.log(`Menerima formulir kontak dari locale ${locale}`);
}
```

> `getLocale` membaca locale yang diatur oleh proxy `next-intl`, sehingga berfungsi di mana saja di server: Route Handlers, Server Actions, dan edge functions.

### (Opsional) Langkah 11: Internasionalisasi Metadata Anda

Menerjemahkan konten itu penting, tetapi tujuan utama internasionalisasi adalah membuat situs web Anda lebih terlihat oleh dunia. I18n adalah tuas luar biasa untuk meningkatkan visibilitas situs web Anda melalui SEO yang tepat.

Metadata yang diinternasionalkan dengan benar membantu mesin pencari memahami bahasa apa saja yang tersedia di halaman Anda. Ini termasuk pengaturan tag meta hreflang, menerjemahkan judul dan deskripsi, serta memastikan URL kanonis diatur dengan benar untuk setiap locale.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n";
import { getTranslations } from "next-intl/server";

// generateMetadata berjalan untuk setiap locale, menghasilkan metadata yang ramah SEO
// Ini membantu mesin pencari memahami versi bahasa alternatif
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

### (Opsional) Langkah 12: Internasionalisasi Sitemap Anda

Buat sitemap yang mencakup semua versi lokal dari halaman Anda. Ini membantu mesin pencari menemukan dan mengindeks semua versi bahasa dari konten Anda.

Sitemap yang diinternasionalkan dengan benar memastikan mesin pencari dapat menemukan dan mengindeks semua versi bahasa dari halaman Anda. Ini meningkatkan visibilitas dalam hasil pencarian internasional.

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Dapatkan peta semua locale dan path lokalnya
 *
 * Contoh output:
 * {
 *   "en": "https://example.com",
 *   "fr": "https://example.com/fr",
 *   "es": "https://example.com/es",
 *   "x-default": "https://example.com"
 * }
 */
const getLocalizedMap = (path: string) =>
  Object.fromEntries([
    ...locales.map((locale) => [locale, formatterLocalizedPath(locale, path)]),
    ["x-default", formatterLocalizedPath(defaultLocale, path)],
  ]);

// Menghasilkan sitemap dengan semua varian locale untuk SEO yang lebih baik
// Field alternates memberi tahu mesin pencari tentang versi bahasa
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: { languages: getLocalizedMap("/") },
    },
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: getLocalizedMap("/about") },
    },
  ];
}
```

### (Opsional) Langkah 13: Internasionalisasi robots.txt Anda

Buat file robots.txt yang menangani dengan benar semua versi locale dari rute yang dilindungi. Ini memastikan mesin pencari tidak mengindeks halaman admin atau dashboard dalam bahasa apa pun.

Mengonfigurasi robots.txt dengan benar untuk semua locale mencegah mesin pencari mengindeks halaman sensitif ketika rute Anda berbeda untuk setiap locale.

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
// Menghasilkan path untuk semua locale (misalnya, /admin, /fr/admin, /es/admin)
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

### (Opsional) Langkah 14: Mengatur Proxy untuk Routing Locale

Buat proxy untuk secara otomatis mendeteksi locale yang dipilih pengguna dan mengarahkan mereka ke URL dengan prefix locale yang sesuai. next-intl menyediakan fungsi proxy yang nyaman yang menangani ini secara otomatis.

Proxy memastikan bahwa pengguna secara otomatis diarahkan ke bahasa pilihan mereka saat mengunjungi situs Anda. Ini juga menyimpan preferensi pengguna untuk kunjungan berikutnya, meningkatkan pengalaman pengguna.

```ts fileName="src/proxy.ts"
import { proxy } from "@/i18n";

// Middleware berjalan sebelum rute, menangani deteksi locale dan routing
// localeDetection: true menggunakan header Accept-Language untuk mendeteksi locale secara otomatis
export default proxy;

export const config = {
  // Lewati API, internal Next, dan aset statis
  // Regex: mencocokkan semua rute kecuali yang dimulai dengan api, _next, atau yang mengandung titik (file)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### (Opsional) Langkah 15: Atur Tipe TypeScript untuk Locale

Mengatur TypeScript akan membantu Anda mendapatkan autocompletion dan keamanan tipe untuk kunci Anda.

Untuk itu, Anda dapat membuat file global.ts di root proyek Anda dan menambahkan kode berikut:

```ts fileName="global.ts"
import type { locales } from "@/i18n";

type Messages = {
  common: typeof import("./locales/en/common.json");
  home: typeof import("./locales/en/home.json");
  about: typeof import("./locales/en/about.json");
  // ... File JSON masa depan juga harus ditambahkan di sini
};

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: Messages;
  }
}
```

Kode ini akan menggunakan Module Augmentation untuk menambahkan locales dan messages ke tipe AppConfig dari next-intl.

### (Opsional) Langkah 15: Otomatiskan Terjemahan Anda Menggunakan Intlayer

Intlayer adalah perpustakaan **gratis** dan **open-source** yang dirancang untuk membantu proses lokalisasi dalam aplikasi Anda. Sementara next-intl menangani pemuatan dan pengelolaan terjemahan, Intlayer membantu mengotomatisasi alur kerja terjemahan.

Mengelola terjemahan secara manual bisa memakan waktu dan rentan kesalahan. Intlayer mengotomatisasi pengujian, pembuatan, dan pengelolaan terjemahan, menghemat waktu Anda dan memastikan konsistensi di seluruh aplikasi Anda.

Intlayer memungkinkan Anda untuk:

- **Mendeklarasikan konten Anda di mana pun Anda inginkan dalam codebase Anda**  
  Intlayer memungkinkan Anda mendeklarasikan konten di mana pun Anda inginkan dalam codebase menggunakan file `.content.{ts|js|json}`. Ini akan memungkinkan organisasi konten yang lebih baik, memastikan keterbacaan dan pemeliharaan codebase yang lebih baik.

- **Mengujikan terjemahan yang hilang**
  Intlayer menyediakan fungsi pengujian yang dapat diintegrasikan ke dalam pipeline CI/CD Anda, atau dalam unit test Anda. Pelajari lebih lanjut tentang [mengujikan terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md).

- **Otomatisasi terjemahan Anda**,
  Intlayer menyediakan CLI dan ekstensi VSCode untuk mengotomatisasi terjemahan Anda. Ini dapat diintegrasikan ke dalam pipeline CI/CD Anda. Pelajari lebih lanjut tentang [mengotomatisasi terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).
  Anda dapat menggunakan **API key Anda sendiri, dan penyedia AI pilihan Anda**. Ini juga menyediakan terjemahan yang sadar konteks, lihat [mengisi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md).

- **Menghubungkan konten eksternal**
  Intlayer memungkinkan Anda menghubungkan konten Anda ke sistem manajemen konten (CMS) eksternal. Untuk mengambilnya dengan cara yang dioptimalkan dan memasukkannya ke dalam sumber daya JSON Anda. Pelajari lebih lanjut tentang [mengambil konten eksternal](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/function_fetching.md).

- **Editor visual**  
  Intlayer menawarkan editor visual gratis untuk mengedit konten Anda menggunakan editor visual. Pelajari lebih lanjut tentang [mengedit terjemahan Anda secara visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Dan masih banyak lagi. Untuk menemukan semua fitur yang disediakan oleh Intlayer, silakan merujuk ke [Dokumentasi Manfaat Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).
