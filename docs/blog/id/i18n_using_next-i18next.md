---
createdAt: 2025-11-01
updatedAt: 2025-11-01
title: Cara menginternasionalisasi aplikasi Next.js Anda menggunakan next-i18next
description: Mengatur i18n dengan next-i18next: praktik terbaik dan tips SEO untuk aplikasi Next.js multibahasa, mencakup internasionalisasi, pengorganisasian konten, dan pengaturan teknis.
slugs:
  - blog
  - nextjs-internationalization-using-next-i18next
applicationTemplate: https://github.com/aymericzip/next-i18next-template
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Versi awal
---

# Cara menginternasionalisasi aplikasi Next.js Anda menggunakan next-i18next pada tahun 2025

## Daftar Isi

<TOC/>

## Apa itu next-i18next?

**next-i18next** adalah solusi internasionalisasi (i18n) yang populer untuk aplikasi Next.js. Meskipun paket `next-i18next` asli dirancang untuk Pages Router, panduan ini menunjukkan cara mengimplementasikan i18next dengan **App Router** modern menggunakan `i18next` dan `react-i18next` secara langsung.

Dengan pendekatan ini, Anda dapat:

- **Mengorganisir terjemahan** menggunakan namespace (misalnya, `common.json`, `about.json`) untuk manajemen konten yang lebih baik.
- **Memuat terjemahan secara efisien** dengan hanya memuat namespace yang diperlukan untuk setiap halaman, sehingga mengurangi ukuran bundle.
- **Mendukung komponen server dan klien** dengan penanganan SSR dan hidrasi yang tepat.
- **Memastikan dukungan TypeScript** dengan konfigurasi locale dan kunci terjemahan yang aman tipe.
- **Mengoptimalkan untuk SEO** dengan metadata yang tepat, sitemap, dan internasionalisasi robots.txt.

> Sebagai alternatif, Anda juga dapat merujuk ke [panduan next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-intl.md), atau langsung menggunakan [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md).

> Lihat perbandingan di [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md).

## Praktik yang harus Anda ikuti

Sebelum kita masuk ke implementasi, berikut beberapa praktik yang harus Anda ikuti:

- **Atur atribut HTML `lang` dan `dir`**
  Di layout Anda, hitung `dir` menggunakan `getLocaleDirection(locale)` dan atur `<html lang={locale} dir={dir}>` untuk aksesibilitas dan SEO yang tepat.
- **Pisahkan pesan berdasarkan namespace**
  Atur file JSON per locale dan namespace (misalnya, `common.json`, `about.json`) agar hanya memuat apa yang Anda butuhkan.
- **Minimalkan payload klien**
  Pada halaman, kirim hanya namespace yang diperlukan ke `NextIntlClientProvider` (misalnya, `pick(messages, ['common', 'about'])`).
- **Utamakan halaman statis**
  Gunakan halaman statis sebanyak mungkin untuk kinerja dan SEO yang lebih baik.
- **I18n pada komponen server**
  Komponen server, seperti halaman atau semua komponen yang tidak ditandai sebagai `client`, adalah statis dan dapat di-pre-render saat build time. Jadi kita harus mengoper fungsi terjemahan ke mereka sebagai props.
- **Siapkan tipe TypeScript**
  Untuk locale Anda agar memastikan keamanan tipe di seluruh aplikasi Anda.
- **Proxy untuk pengalihan**
  Gunakan proxy untuk menangani deteksi locale dan routing serta mengarahkan pengguna ke URL dengan prefix locale yang sesuai.
- **Internasionalisasi metadata, sitemap, robots.txt Anda**
  Internasionalisasikan metadata, sitemap, robots.txt Anda menggunakan fungsi `generateMetadata` yang disediakan oleh Next.js untuk memastikan penemuan yang lebih baik oleh mesin pencari di semua locale.
- **Lokalisasi Tautan**
  Lokalisasi tautan menggunakan komponen `Link` untuk mengarahkan pengguna ke URL dengan prefix locale yang sesuai. Ini penting untuk memastikan penemuan halaman Anda di semua locale.
- **Otomatisasi pengujian dan terjemahan**
  Otomatisasi pengujian dan terjemahan membantu menghemat waktu dalam memelihara aplikasi multibahasa Anda.

> Lihat dokumentasi kami yang mencantumkan semua yang perlu Anda ketahui tentang internasionalisasi dan SEO: [Internasionalisasi (i18n) dengan next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md).

---

## Panduan Langkah demi Langkah untuk Mengatur i18next dalam Aplikasi Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/next-i18next-template?embed=1&ctl=1&file=src/app/i18n.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"

> Lihat [Application Template](https://github.com/aymericzip/next-i18next-template) di GitHub.

Berikut adalah struktur proyek yang akan kita buat:

```bash
.
├── i18n.config.ts
└── src # Src adalah opsional
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── types
    │   └── i18next.d.ts
    ├── app
    │   ├── proxy.ts
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       ├── (home) # / (Route Group untuk tidak mencemari semua halaman dengan pesan home)
    │       │   ├── layout.tsx
    │       │   └── page.tsx
    │       └── about # /about
    │           ├── layout.tsx
    │           └── page.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

### Langkah 1: Instalasi Dependensi

Instal paket-paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add i18next react-i18next i18next-resources-to-backend
```

- **i18next**: Kerangka kerja internasionalisasi inti yang menangani pemuatan dan pengelolaan terjemahan.
- **react-i18next**: Binding React untuk i18next yang menyediakan hooks seperti `useTranslation` untuk komponen klien.
- **i18next-resources-to-backend**: Plugin yang memungkinkan pemuatan dinamis file terjemahan, sehingga Anda hanya memuat namespace yang Anda butuhkan.

### Langkah 2: Konfigurasikan Proyek Anda

Buat file konfigurasi untuk mendefinisikan locale yang didukung, locale default, dan fungsi pembantu untuk lokalisasi URL. File ini berfungsi sebagai sumber kebenaran tunggal untuk pengaturan i18n Anda dan memastikan keamanan tipe di seluruh aplikasi Anda.

Mencentralisasi konfigurasi locale Anda mencegah inkonsistensi dan memudahkan penambahan atau penghapusan locale di masa depan. Fungsi pembantu memastikan pembuatan URL yang konsisten untuk SEO dan routing.

```ts fileName="i18n.config.ts"
// Mendefinisikan locale yang didukung sebagai array const untuk keamanan tipe
// Pernyataan 'as const' membuat TypeScript menginferensi tipe literal daripada string[]
export const locales = ["en", "fr"] as const;

// Mengekstrak tipe Locale dari array locales
// Ini membuat tipe union: "en" | "fr"
export type Locale = (typeof locales)[number];

// Tetapkan locale default yang digunakan ketika tidak ada locale yang ditentukan
export const defaultLocale: Locale = "en";

// Bahasa dengan arah teks kanan-ke-kiri yang memerlukan penanganan khusus
export const rtlLocales = ["ar", "he", "fa", "ur"] as const;

// Periksa apakah sebuah locale memerlukan arah teks RTL (kanan-ke-kiri)
// Digunakan untuk bahasa seperti Arab, Ibrani, Persia, dan Urdu
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Hasilkan path yang dilokalkan untuk locale dan path tertentu
// Path untuk locale default tidak memiliki prefix (misal, "/about" bukan "/en/about")
// Locale lain diberi prefix (misal, "/fr/about")
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

// URL dasar untuk URL absolut (digunakan dalam sitemap, metadata, dll.)
const ORIGIN = "https://example.com";

// Menghasilkan URL absolut dengan prefix locale
// Digunakan untuk metadata SEO, sitemap, dan URL kanonis
export function absoluteUrl(locale: string, path: string) {
  return `${ORIGIN}${localizedPath(locale, path)}`;
}

// Digunakan untuk mengatur cookie locale di browser
export function getCookie(locale: Locale) {
  return [
    `NEXT_LOCALE=${locale}`,
    "Path=/",
    `Max-Age=${60 * 60 * 24 * 365}`, // 1 tahun
    "SameSite=Lax",
  ].join("; ");
}
```

### Langkah 3: Sentralisasi Namespace Terjemahan

Buat satu sumber kebenaran untuk setiap namespace yang diekspos oleh aplikasi Anda. Menggunakan kembali daftar ini menjaga sinkronisasi kode server, klien, dan tooling serta membuka tipe kuat untuk helper terjemahan.

```ts fileName="src/i18n.namespaces.ts"
export const namespaces = ["common", "about"] as const;

export type Namespace = (typeof namespaces)[number];
```

### Langkah 4: Ketik Kuat Kunci Terjemahan dengan TypeScript

Perluas `i18next` untuk menunjuk ke file bahasa kanonik Anda (biasanya bahasa Inggris). TypeScript kemudian menafsirkan kunci yang valid per namespace, sehingga panggilan ke `t()` diperiksa secara menyeluruh.

```ts fileName="src/types/i18next.d.ts"
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof import("@/locales/en/common.json");
      about: typeof import("@/locales/en/about.json");
    };
  }
}
```

> Tip: Simpan deklarasi ini di bawah `src/types` (buat foldernya jika belum ada). Next.js sudah memasukkan `src` dalam `tsconfig.json`, sehingga augmentasi ini akan terdeteksi secara otomatis. Jika tidak, tambahkan yang berikut ke file `tsconfig.json` Anda:

```json5 fileName="tsconfig.json"
{
  "include": ["src/types/**/*.ts"],
}
```

Dengan ini, Anda dapat mengandalkan autocomplete dan pemeriksaan saat kompilasi:

```tsx
import { useTranslation, type TFunction } from "react-i18next";

const { t } = useTranslation("about");

// OK, bertipe: t("counter.increment")
// ERROR, error kompilasi: t("doesNotExist")
export type AboutTranslator = TFunction<"about">;
```

### Langkah 5: Siapkan Inisialisasi i18n di Sisi Server

Buat fungsi inisialisasi sisi server yang memuat terjemahan untuk komponen server. Fungsi ini membuat instance i18next terpisah untuk rendering sisi server, memastikan bahwa terjemahan dimuat sebelum rendering.

Komponen server membutuhkan instance i18next mereka sendiri karena mereka berjalan dalam konteks yang berbeda dari komponen klien. Memuat terjemahan terlebih dahulu di server mencegah tampilan konten yang belum diterjemahkan dan meningkatkan SEO dengan memastikan mesin pencari melihat konten yang sudah diterjemahkan.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces, type Namespace } from "@/i18n.namespaces";

// Konfigurasikan pemuatan sumber daya dinamis untuk i18next
// Fungsi ini secara dinamis mengimpor file JSON terjemahan berdasarkan locale dan namespace
// Contoh: locale="fr", namespace="about" -> mengimpor "@/locales/fr/about.json"
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

const DEFAULT_NAMESPACES = [
  namespaces[0],
] as const satisfies readonly Namespace[];

/**
 * Inisialisasi instance i18next untuk rendering sisi server
 *
 * @returns Instance i18next yang sudah diinisialisasi siap digunakan di sisi server
 */
export async function initI18next(
  locale: string,
  ns: readonly Namespace[] = DEFAULT_NAMESPACES
) {
  // Buat instance i18next baru (terpisah dari instance sisi klien)
  const i18n = createInstance();

  // Inisialisasi dengan integrasi React dan pemuat backend
  await i18n
    .use(initReactI18next) // Aktifkan dukungan React hooks
    .use(backend) // Aktifkan pemuatan sumber daya dinamis
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns, // Muat hanya namespace yang ditentukan untuk kinerja lebih baik
      defaultNS: "common", // Namespace default jika tidak ada yang ditentukan
      interpolation: { escapeValue: false }, // Jangan escape HTML (React menangani proteksi XSS)
      react: { useSuspense: false }, // Nonaktifkan Suspense untuk kompatibilitas SSR
      returnNull: false, // Kembalikan string kosong alih-alih null untuk kunci yang hilang
      initImmediate: false, // Tunda inisialisasi sampai sumber daya dimuat (SSR lebih cepat)
    });
  return i18n;
}
```

### Langkah 6: Buat Provider i18n di Sisi Klien

Buat provider komponen klien yang membungkus aplikasi Anda dengan konteks i18next. Provider ini menerima terjemahan yang sudah dimuat sebelumnya dari server untuk mencegah flash konten yang belum diterjemahkan (FOUC) dan menghindari pengambilan data ganda.

Komponen klien membutuhkan instance i18next mereka sendiri yang berjalan di browser. Dengan menerima sumber daya yang sudah dimuat sebelumnya dari server, kita memastikan hidrasi yang mulus dan mencegah konten berkedip. Provider ini juga mengelola perubahan locale dan pemuatan namespace secara dinamis.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance, type ResourceLanguage } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";

// Konfigurasikan pemuatan sumber daya dinamis untuk sisi klien
// Pola yang sama seperti sisi server, tetapi instance ini berjalan di browser
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`@/locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: readonly Namespace[];
  // Sumber daya yang sudah dimuat dari server (mencegah FOUC - Flash of Untranslated Content)
  // Format: { namespace: translationBundle }
  resources?: Record<Namespace, ResourceLanguage>;
  children: React.ReactNode;
};

/**
 * Penyedia i18n sisi klien yang membungkus aplikasi dengan konteks i18next
 * Menerima sumber daya yang sudah dimuat sebelumnya dari server untuk menghindari pengambilan ulang terjemahan
 */
export default function I18nProvider({
  locale,
  namespaces = [allNamespaces[0]] as const,
  resources,
  children,
}: Props) {
  // Membuat instance i18n sekali menggunakan inisialisasi malas useState
  // Ini memastikan instance dibuat hanya sekali, tidak pada setiap render
  const [i18n] = useState(() => {
    const i18nInstance = createInstance();

    i18nInstance
      .use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        // Jika resources disediakan (dari server), gunakan untuk menghindari pengambilan data di sisi klien
        // Ini mencegah FOUC dan meningkatkan performa muat awal
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
        returnNull: false, // Mencegah nilai undefined dikembalikan
      });

    return i18nInstance;
  });

  // Perbarui bahasa saat properti locale berubah
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Pastikan semua namespace yang diperlukan dimuat di sisi klien
  // Menggunakan join("|") sebagai dependency untuk membandingkan array dengan benar
  useEffect(() => {
    i18n.loadNamespaces(namespaces);
  }, [namespaces.join("|"), i18n]);

  // Menyediakan instance i18n ke semua komponen anak melalui konteks React
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### Langkah 7: Definisikan Rute Locale Dinamis

Atur routing dinamis untuk locale dengan membuat direktori `[locale]` di folder app Anda. Ini memungkinkan Next.js untuk menangani routing berbasis locale di mana setiap locale menjadi segmen URL (misalnya, `/en/about`, `/fr/about`).

Menggunakan rute dinamis memungkinkan Next.js menghasilkan halaman statis untuk semua locale saat build time, meningkatkan performa dan SEO. Komponen layout mengatur atribut HTML `lang` dan `dir` berdasarkan locale, yang sangat penting untuk aksesibilitas dan pemahaman mesin pencari.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

// Nonaktifkan parameter dinamis - semua locale harus diketahui saat build
// Ini memastikan generasi statis untuk semua rute locale
export const dynamicParams = false;

/**
 * Menghasilkan parameter statis untuk semua locale saat build
 * Next.js akan melakukan pre-render halaman untuk setiap locale yang dikembalikan di sini
 * Contoh: [{ locale: "en" }, { locale: "fr" }]
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Komponen layout root yang menangani atribut HTML spesifik locale
 * Mengatur atribut lang dan arah teks (ltr/rtl) berdasarkan locale
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Validasi locale dari parameter URL
  // Jika locale yang diberikan tidak valid, gunakan locale default
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // Tentukan arah teks berdasarkan locale
  // Bahasa RTL seperti Arab membutuhkan dir="rtl" untuk rendering teks yang benar
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

### Langkah 8: Buat File Terjemahan Anda

Buat file JSON untuk setiap locale dan namespace. Struktur ini memungkinkan Anda mengatur terjemahan secara logis dan memuat hanya yang Anda butuhkan untuk setiap halaman.

Mengorganisir terjemahan berdasarkan namespace (misalnya, `common.json`, `about.json`) memungkinkan pemisahan kode dan mengurangi ukuran bundle. Anda hanya memuat terjemahan yang dibutuhkan untuk setiap halaman, sehingga meningkatkan performa.

```json fileName="src/locales/en/common.json"
{
  "appTitle": "Next.js i18n App",
  "appDescription": "Example Next.js application with internationalization using i18next"
}
```

```json fileName="src/locales/fr/common.json"
{
  "appTitle": "Application Next.js i18n",
  "appDescription": "Exemple d'application Next.js avec internationalisation utilisant i18next"
}
```

```json fileName="src/locales/en/home.json"
{
  "title": "Home",
  "description": "Home page description",
  "welcome": "Welcome",
  "greeting": "Hello, world!",
  "aboutPage": "About Page",
  "documentation": "Documentation"
}
```

```json fileName="src/locales/id/home.json"
{
  "title": "Beranda",
  "description": "Deskripsi halaman beranda",
  "welcome": "Selamat datang",
  "greeting": "Halo, dunia!",
  "aboutPage": "Halaman Tentang",
  "documentation": "Dokumentasi"
}
```

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "description": "Click the button to increase the counter"
  }
}
```

```json fileName="src/locales/id/about.json"
{
  "title": "Tentang",
  "description": "Deskripsi halaman tentang",
  "counter": {
    "label": "Penghitung",
    "increment": "Tambah",
    "description": "Klik tombol untuk menambah penghitung"
  }
}
```

### Langkah 9: Memanfaatkan Terjemahan di Halaman Anda

Buat komponen halaman yang menginisialisasi i18next di server dan meneruskan terjemahan ke komponen server dan klien. Ini memastikan bahwa terjemahan dimuat sebelum rendering dan mencegah tampilan konten yang berkedip.

Inisialisasi sisi server memuat terjemahan sebelum halaman dirender, meningkatkan SEO dan mencegah FOUC (Flash of Unstyled Content). Dengan meneruskan sumber daya yang sudah dimuat ke penyedia klien, kita menghindari pengambilan data ganda dan memastikan hidrasi yang mulus.

```tsx fileName="src/app/[locale]/about/index.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import { namespaces as allNamespaces, type Namespace } from "@/i18n.namespaces";
import type { ResourceLanguage } from "i18next";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

/**
 * Komponen server halaman yang menangani inisialisasi i18n
 * Memuat terjemahan terlebih dahulu di server dan meneruskannya ke komponen klien
 */
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  // Tentukan namespace terjemahan yang dibutuhkan halaman ini
  // Gunakan kembali daftar terpusat untuk keamanan tipe dan autocomplete
  const pageNamespaces = allNamespaces;

  // Inisialisasi i18next di server dengan namespace yang diperlukan
  // Ini memuat file JSON terjemahan di sisi server
  const i18n = await initI18next(locale, pageNamespaces);

  // Dapatkan fungsi terjemahan tetap untuk namespace "about"
  // getFixedT mengunci namespace, sehingga t("title") bukan t("about:title")
  const tAbout = i18n.getFixedT(locale, "about");

  // Ekstrak bundel terjemahan dari instance i18n
  // Data ini diteruskan ke I18nProvider untuk menghidrat i18n sisi klien
  // Mencegah FOUC (Flash of Untranslated Content) dan menghindari pengambilan ganda
  const resources = Object.fromEntries(
    pageNamespaces.map((ns) => [ns, i18n.getResourceBundle(locale, ns)])
  ) satisfies Record<Namespace, ResourceLanguage>;

  return (
    <I18nProvider
      locale={locale}
      namespaces={pageNamespaces}
      resources={resources}
    >
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

### Langkah 10: Gunakan Terjemahan di Komponen Klien

Komponen klien dapat menggunakan hook `useTranslation` untuk mengakses terjemahan. Hook ini memberikan akses ke fungsi terjemahan dan instance i18n, memungkinkan Anda menerjemahkan konten dan mengakses informasi locale.

Komponen klien memerlukan React hooks untuk mengakses terjemahan. Hook `useTranslation` terintegrasi dengan mulus dengan i18next dan memberikan pembaruan reaktif saat locale berubah.

> Pastikan halaman/provider hanya menyertakan namespace yang Anda butuhkan (misalnya, `about`).  
> Jika Anda menggunakan React < 19, gunakan memoization untuk formatter berat seperti `Intl.NumberFormat`.

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Contoh komponen client yang menggunakan React hooks untuk terjemahan
 * Dapat menggunakan hooks seperti useState, useEffect, dan useTranslation
 */
const ClientComponent = () => {
  // Hook useTranslation memberikan akses ke fungsi terjemahan dan instance i18n
  // Tentukan namespace untuk hanya memuat terjemahan pada namespace "about"
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // Membuat formatter angka yang sesuai dengan locale
  // i18n.language memberikan locale saat ini (misal, "en", "fr")
  // Intl.NumberFormat memformat angka sesuai konvensi locale
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Format angka menggunakan format spesifik lokal */}
      <p className="text-5xl font-bold text-white m-0">
        {numberFormat.format(count)}
      </p>
      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
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

### Langkah 11: Menggunakan Terjemahan di Komponen Server

Komponen server tidak dapat menggunakan React hooks, sehingga mereka menerima terjemahan melalui props dari komponen induk mereka. Pendekatan ini menjaga komponen server tetap sinkron dan memungkinkan mereka untuk disisipkan di dalam komponen klien.

Komponen server yang mungkin disisipkan di bawah batasan klien harus bersifat sinkron. Dengan meneruskan string terjemahan dan informasi locale sebagai props, kita menghindari operasi async dan memastikan rendering yang tepat.

```tsx fileName="src/components/ServerComponent.tsx"
import type { TFunction } from "i18next";

type ServerComponentProps = {
  // Fungsi terjemahan yang diteruskan dari komponen server induk
  // Komponen server tidak dapat menggunakan hooks, jadi terjemahan datang melalui props
  t: TFunction<"about">;
  locale: string;
  count: number;
};

/**
 * Contoh komponen server - menerima terjemahan sebagai props
 * Dapat disisipkan di dalam komponen klien (komponen server async)
 * Tidak dapat menggunakan React hooks, jadi semua data harus berasal dari props atau operasi async
 */
const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // Format angka di sisi server menggunakan locale
  // Ini dijalankan di server selama SSR, meningkatkan waktu muat halaman awal
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-bold text-white m-0">{formatted}</p>
      {/* Gunakan fungsi terjemahan yang diteruskan sebagai prop */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-semibold text-white">
          {t("counter.label")}
        </span>
        <span className="text-sm opacity-80 italic">
          {t("counter.description")}
        </span>
      </div>
    </div>
  );
};

export default ServerComponent;
```

---

### (Opsional) Langkah 12: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda di Next.js, cara yang direkomendasikan adalah menggunakan URL dengan prefix locale dan link Next.js. Contoh di bawah ini membaca locale saat ini dari rute, menghapusnya dari pathname, dan menampilkan satu link untuk setiap locale yang tersedia.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, getCookie, type Locale, locales } from "@/i18n.config";

export default function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();

  const activeLocale = (params?.locale as Locale | undefined) ?? defaultLocale;

  const getLocaleLabel = (locale: Locale): string => {
    try {
      const displayNames = new Intl.DisplayNames([locale], {
        type: "language",
      });
      return displayNames.of(locale) ?? locale.toUpperCase();
    } catch {
      return locale.toUpperCase();
    }
  };

  const basePath = useMemo(() => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return "/";

    const maybeLocale = segments[0] as Locale;

    if ((locales as readonly string[]).includes(maybeLocale)) {
      const rest = segments.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }

    return pathname;
  }, [pathname]);

  return (
    <nav aria-label="Pemilih bahasa">
      {(locales as readonly Locale[]).map((locale) => {
        const isActive = locale === activeLocale;

        const href =
          locale === defaultLocale ? basePath : `/${locale}${basePath}`;

        return (
          <Link
            key={locale}
            href={href}
            aria-current={isActive ? "halaman" : undefined}
            onClick={() => {
              document.cookie = getCookie(locale);
            }}
          >
            {getLocaleLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
```

### (Opsional) Langkah 13: Bangun komponen Link yang dilokalkan

Menggunakan kembali URL yang dilokalkan di seluruh aplikasi Anda menjaga navigasi tetap konsisten dan ramah SEO. Bungkus `next/link` dalam helper kecil yang menambahkan prefix locale aktif pada rute internal sambil membiarkan URL eksternal tidak berubah.

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import NextLink, { type LinkProps } from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps, PropsWithChildren } from "react";
import {
  defaultLocale,
  type Locale,
  locales,
  localizedPath,
} from "@/i18n.config";

const isExternal = (href: string) => /^https?:\/\//.test(href);

type LocalizedLinkProps = PropsWithChildren<
  Omit<LinkProps, "href"> &
    Omit<ComponentProps<"a">, "href"> & { href: string; locale?: Locale }
>;

export default function LocalizedLink({
  href,
  locale,
  children,
  ...props
}: LocalizedLinkProps) {
  const params = useParams();
  const fallback = (params?.locale as Locale | undefined) ?? defaultLocale;
  const normalizedLocale = (locales as readonly string[]).includes(fallback)
    ? ((locale ?? fallback) as Locale)
    : defaultLocale;

  const normalizedPath = href.startsWith("/") ? href : `/${href}`;
  const localizedHref = isExternal(href)
    ? href
    : localizedPath(normalizedLocale, normalizedPath);

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
```

> Tip: Karena `LocalizedLink` adalah pengganti langsung, migrasikan secara bertahap dengan menukar impor dan membiarkan komponen menangani URL spesifik locale.

### (Opsional) Langkah 14: Akses locale aktif di dalam Server Actions

Server Actions sering membutuhkan locale saat ini untuk email, pencatatan, atau integrasi pihak ketiga. Gabungkan cookie locale yang diatur oleh proxy Anda dengan header `Accept-Language` sebagai cadangan.

```ts fileName="src/app/actions/get-current-locale.ts"
"use server";

import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "@/i18n.config";

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split("-")[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize(cookies().get("NEXT_LOCALE")?.value);

  if (cookieLocale) return cookieLocale;

  const headerLocale = normalize(headers().get("accept-language"));
  return headerLocale ?? defaultLocale;
}

// Contoh server action yang menggunakan locale saat ini
export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();

  // Gunakan locale untuk efek samping yang terlokalisasi (email, CRM, dll.)
  console.log(`Stuff from server with locale ${locale}`);
}
```

> Karena helper ini bergantung pada cookies dan headers Next.js, ia bekerja di Route Handlers, Server Actions, dan konteks server-only lainnya.

### (Opsional) Langkah 15: Internasionalisasi Metadata Anda

Menerjemahkan konten itu penting, tetapi tujuan utama internasionalisasi adalah membuat situs web Anda lebih terlihat oleh dunia. I18n adalah tuas luar biasa untuk meningkatkan visibilitas situs web Anda melalui SEO yang tepat.

Metadata yang diinternasionalisasi dengan benar membantu mesin pencari memahami bahasa apa saja yang tersedia di halaman Anda. Ini termasuk pengaturan tag meta hreflang, menerjemahkan judul dan deskripsi, serta memastikan URL kanonik diatur dengan benar untuk setiap locale.

Berikut adalah daftar praktik baik terkait SEO multibahasa:

- Atur tag meta hreflang di tag `<head>` untuk membantu mesin pencari memahami bahasa apa saja yang tersedia di halaman
- Daftarkan semua terjemahan halaman di sitemap.xml menggunakan skema XML `http://www.w3.org/1999/xhtml`
- Jangan lupa untuk mengecualikan halaman dengan prefix dari robots.txt (misalnya, `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
- Gunakan komponen Link kustom untuk mengarahkan ke halaman dengan lokalitas paling sesuai (misalnya, dalam bahasa Prancis `<a href="/fr/about">À propos</a>`)

Pengembang sering lupa untuk mereferensikan halaman mereka dengan benar di berbagai locale. Mari kita perbaiki itu:

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import {
  locales,
  defaultLocale,
  localizedPath,
  absoluteUrl,
} from "@/i18n.config";

/**
 * Menghasilkan metadata SEO untuk setiap versi locale dari halaman
 * Fungsi ini dijalankan untuk setiap locale pada saat build time
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Mengimpor file terjemahan secara dinamis untuk locale ini
  // Digunakan untuk mendapatkan judul dan deskripsi yang diterjemahkan untuk metadata
  const messages = (await import(`@/locales/${locale}/about.json`)).default;

  // Membuat pemetaan hreflang untuk semua locale
  // Membantu mesin pencari memahami alternatif bahasa
  // Format: { "en": "/about", "fr": "/fr/about" }
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      // URL kanonik untuk versi locale ini
      canonical: absoluteUrl(locale, "/about"),
      // Alternatif bahasa untuk SEO (tag hreflang)
      // "x-default" menentukan versi locale default
      languages: {
        ...languages,
        "x-default": absoluteUrl(defaultLocale, "/about"),
      },
    },
  };
}

export default async function AboutPage() {
  return <h1>Tentang</h1>;
}
```

### (Opsional) Langkah 16: Internasionalisasi Sitemap Anda

Buat sitemap yang mencakup semua versi locale dari halaman Anda. Ini membantu mesin pencari menemukan dan mengindeks semua versi bahasa dari konten Anda.

Sitemap yang diinternasionalisasi dengan benar memastikan mesin pencari dapat menemukan dan mengindeks semua versi bahasa dari halaman Anda. Ini meningkatkan visibilitas dalam hasil pencarian internasional.

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? `${origin}${path}` : `${origin}/${locale}${path}`;

/**
 * Mendapatkan peta semua locale dan path yang dilokalkan
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

### (Opsional) Langkah 17: Internasionalisasi robots.txt Anda

Buat file robots.txt yang menangani semua versi locale dari rute yang dilindungi dengan benar. Ini memastikan bahwa mesin pencari tidak mengindeks halaman admin atau dashboard dalam bahasa apa pun.

Mengonfigurasi robots.txt dengan benar untuk semua locale mencegah mesin pencari mengindeks halaman sensitif dalam bahasa apa pun. Ini sangat penting untuk keamanan dan privasi.

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const origin = "https://example.com";

// Menghasilkan path untuk semua locale (misalnya, /admin, /fr/admin, /es/admin)
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => `/${locale}${path}`),
];

const disallow = [...withAllLocales("/dashboard"), ...withAllLocales("/admin")];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
}
```

### (Opsional) Langkah 18: Siapkan Middleware untuk Routing Locale

Buat proxy untuk secara otomatis mendeteksi locale yang dipilih pengguna dan mengarahkan mereka ke URL dengan prefix locale yang sesuai. Ini meningkatkan pengalaman pengguna dengan menampilkan konten dalam bahasa pilihan mereka.

Middleware memastikan bahwa pengguna secara otomatis diarahkan ke bahasa pilihan mereka saat mengunjungi situs Anda. Middleware juga menyimpan preferensi pengguna dalam cookie untuk kunjungan berikutnya.

```ts fileName="src/proxy.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

// Regex untuk mencocokkan file dengan ekstensi (misalnya .js, .css, .png)
// Digunakan untuk mengecualikan aset statis dari routing locale
const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Mengambil locale dari header Accept-Language
 * Menangani format seperti "fr-CA", "en-US", dll.
 * Kembali ke locale default jika bahasa browser tidak didukung
 */
const pickLocale = (accept: string | null) => {
  // Dapatkan preferensi bahasa pertama (misalnya, "fr-CA" dari "fr-CA,en-US;q=0.9")
  const raw = accept?.split(",")[0] ?? defaultLocale;
  // Ambil kode bahasa dasar (misalnya, "fr" dari "fr-CA")
  const base = raw.toLowerCase().split("-")[0];
  // Periksa apakah kita mendukung locale ini, jika tidak gunakan default
  return (locales as readonly string[]).includes(base) ? base : defaultLocale;
};

/**
 * Proxy Next.js untuk deteksi dan routing locale
 * Berjalan pada setiap permintaan sebelum halaman dirender
 * Secara otomatis mengarahkan ulang ke URL dengan prefix locale jika diperlukan
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewati proxy untuk internal Next.js, rute API, dan file statis
  // Ini tidak boleh memiliki prefix locale
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Periksa apakah URL sudah memiliki prefix locale
  // Contoh: "/fr/about" atau "/en" akan mengembalikan true
  const hasLocale = (locales as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  // Jika tidak ada prefix locale, deteksi locale dan redirect
  if (!hasLocale) {
    // Coba dapatkan locale dari cookie terlebih dahulu (preferensi pengguna)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Gunakan locale dari cookie jika valid, jika tidak deteksi dari header browser
    const locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? cookieLocale
        : pickLocale(request.headers.get("accept-language"));

    // Kloning URL untuk memodifikasi pathname
    const url = request.nextUrl.clone();
    // Tambahkan prefix locale ke pathname
    // Tangani root path secara khusus untuk menghindari double slash
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

    // Buat respons pengalihan dan set cookie locale
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", locale, { path: "/" });
    return res;
  }
}

export const config = {
  matcher: [
    // Cocokkan semua path kecuali:
    // - Rute API (/api/*)
    // - Internal Next.js (/_next/*)
    // - File statis (/static/*)
    // - File dengan ekstensi (.*\\..*)
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

### (Opsional) Langkah 19: Otomatiskan Terjemahan Anda Menggunakan Intlayer

Intlayer adalah perpustakaan **gratis** dan **open-source** yang dirancang untuk membantu proses lokalisasi dalam aplikasi Anda. Sementara i18next menangani pemuatan dan pengelolaan terjemahan, Intlayer membantu mengotomatisasi alur kerja terjemahan.

Mengelola terjemahan secara manual bisa memakan waktu dan rentan terhadap kesalahan. Intlayer mengotomatisasi pengujian, pembuatan, dan pengelolaan terjemahan, menghemat waktu Anda dan memastikan konsistensi di seluruh aplikasi Anda.

Intlayer memungkinkan Anda untuk:

- **Mendeklarasikan konten Anda di mana pun Anda mau dalam codebase Anda**  
  Intlayer memungkinkan Anda mendeklarasikan konten di mana pun Anda mau dalam codebase menggunakan file `.content.{ts|js|json}`. Ini akan memungkinkan organisasi konten yang lebih baik, memastikan keterbacaan dan pemeliharaan codebase yang lebih baik.

- **Menguji terjemahan yang hilang**  
  Intlayer menyediakan fungsi pengujian yang dapat diintegrasikan dalam pipeline CI/CD Anda, atau dalam unit test Anda. Pelajari lebih lanjut tentang [mengujicoba terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md).

- **Otomatiskan terjemahan Anda**,
  Intlayer menyediakan CLI dan ekstensi VSCode untuk mengotomatisasi terjemahan Anda. Ini dapat diintegrasikan dalam pipeline CI/CD Anda. Pelajari lebih lanjut tentang [otomatisasi terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).
  Anda dapat menggunakan **kunci API Anda sendiri, dan penyedia AI pilihan Anda**. Ini juga menyediakan terjemahan yang sadar konteks, lihat [isi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md).

- **Hubungkan konten eksternal**
- **Otomatiskan terjemahan Anda**,  
  Intlayer menyediakan CLI dan ekstensi VSCode untuk mengotomatisasi terjemahan Anda. Ini dapat diintegrasikan dalam pipeline CI/CD Anda. Pelajari lebih lanjut tentang [otomatisasi terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).  
  Anda dapat menggunakan **API key Anda sendiri, dan penyedia AI pilihan Anda**. Ini juga menyediakan terjemahan yang sadar konteks, lihat [mengisi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md).

- **Hubungkan konten eksternal**  
  Intlayer memungkinkan Anda menghubungkan konten Anda ke sistem manajemen konten eksternal (CMS). Untuk mengambilnya dengan cara yang dioptimalkan dan memasukkannya ke dalam sumber daya JSON Anda. Pelajari lebih lanjut tentang [mengambil konten eksternal](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/function_fetching.md).

- **Editor visual**  
  Intlayer menawarkan editor visual gratis untuk mengedit konten Anda menggunakan editor visual. Pelajari lebih lanjut tentang [pengeditan visual terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Dan masih banyak lagi. Untuk menemukan semua fitur yang disediakan oleh Intlayer, silakan merujuk ke [Dokumentasi Manfaat Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).
