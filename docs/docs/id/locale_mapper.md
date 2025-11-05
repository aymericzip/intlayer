---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Pemeta Locale
description: Temukan bagaimana Pemeta Locale bekerja. Lihat langkah-langkah yang digunakan oleh Pemeta Locale dalam aplikasi Anda. Lihat apa fungsi dari berbagai paket yang berbeda.
keywords:
  - Pemeta Locale
  - Memulai
  - Intlayer
  - Aplikasi
  - Paket
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Menambahkan dokumentasi pemeta locale
---

# Pemeta Locale

Pemeta Locale adalah utilitas yang kuat yang membantu Anda bekerja dengan data internasionalisasi dalam aplikasi Intlayer Anda. Ini menyediakan tiga fungsi utama untuk mengubah dan mengatur data spesifik locale: `localeMap`, `localeFlatMap`, dan `localeRecord`.

## Cara Kerja Pemeta Locale

Pemeta Locale beroperasi pada objek `LocaleData` yang berisi semua informasi yang diperlukan tentang sebuah locale:

```typescript
type LocaleData = {
  locale: LocalesValues; // Kode locale saat ini (misalnya, 'en', 'fr')
  defaultLocale: LocalesValues; // Kode locale default
  isDefault: boolean; // Apakah ini adalah locale default
  locales: LocalesValues[]; // Array dari semua locale yang tersedia
  urlPrefix: string; // Prefix URL untuk locale ini (misalnya, '/fr' atau '')
};
```

Fungsi pemeta secara otomatis menghasilkan data ini untuk setiap locale dalam konfigurasi Anda, dengan mempertimbangkan:

- Daftar locale yang telah Anda konfigurasi
- Pengaturan locale default
- Apakah locale default harus diberi prefix di URL

## Fungsi Inti

### `localeMap`

Mengubah setiap locale menjadi sebuah objek tunggal menggunakan fungsi pemeta.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Contoh: Membuat objek route**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Hasil:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Mirip dengan `localeMap`, tetapi fungsi pemeta mengembalikan array objek yang kemudian diratakan menjadi satu array tunggal.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Contoh: Membuat beberapa route per locale**

```typescript
import { localeFlatMap } from "intlayer";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// Hasil:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

Membuat objek record di mana setiap locale menjadi kunci yang memetakan ke nilai yang diubah oleh fungsi pemeta.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Contoh: Memuat file terjemahan**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Hasil:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Mengatur Locale Mapper

Locale Mapper secara otomatis menggunakan konfigurasi Intlayer Anda, tetapi Anda dapat menimpa default dengan melewatkan parameter:

### Menggunakan Konfigurasi Default

```typescript
import { localeMap } from "intlayer";

// Menggunakan konfigurasi dari intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Menimpa Konfigurasi

```typescript
import { localeMap } from "intlayer";

// Menimpa locales dan default locale
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Locales kustom
  "en", // Default locale kustom
  true // Prefix default locale di URL
);
```

## Contoh Penggunaan Lanjutan

### Membuat Menu Navigasi

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Menghasilkan Data Sitemap

```typescript
import { localeFlatMap } from "intlayer";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Pemuatan Terjemahan Dinamis

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr",
  },
}));
```

## Integrasi Konfigurasi

Locale Mapper terintegrasi dengan mulus ke dalam konfigurasi Intlayer Anda:

- **Locales**: Secara otomatis menggunakan `configuration.internationalization.locales`
- **Default Locale**: Menggunakan `configuration.internationalization.defaultLocale`
- **URL Prefixing**: Menghormati `configuration.middleware.prefixDefault`

Ini memastikan konsistensi di seluruh aplikasi Anda dan mengurangi duplikasi konfigurasi.
