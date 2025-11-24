---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Dokumentasi Fungsi getPrefix | intlayer
description: Lihat cara menggunakan fungsi getPrefix untuk paket intlayer
keywords:
  - getPrefix
  - prefix
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Dokumentasi awal
---

# Dokumentasi: Fungsi `getPrefix` dalam `intlayer`

## Deskripsi

Fungsi `getPrefix` menentukan prefix URL untuk locale tertentu berdasarkan konfigurasi mode routing. Fungsi ini membandingkan locale dengan default locale dan mengembalikan sebuah objek yang berisi tiga format prefix berbeda untuk konstruksi URL yang fleksibel.

**Fitur Utama:**

- Menerima locale sebagai parameter pertama (wajib)
- Objek `options` opsional dengan `defaultLocale` dan `mode`
- Mengembalikan objek dengan properti `prefix` dan `localePrefix`
- Mendukung semua mode routing: `prefix-no-default`, `prefix-all`, `no-prefix`, dan `search-params`
- Utilitas ringan untuk menentukan kapan menambahkan prefix locale

---

## Tanda Tangan Fungsi

```typescript
getPrefix(
  locale: Locales,               // Wajib
  options?: {                    // Opsional
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // misalnya, 'fr/' atau ''
  localePrefix?: Locale; // misalnya, 'fr' atau undefined
}
```

---

## Parameter

- `locale: Locales`
  - **Deskripsi**: Locale yang akan digunakan untuk menghasilkan prefix. Jika nilainya falsy (undefined, null, string kosong), fungsi akan mengembalikan string kosong.
  - **Tipe**: `Locales`
  - **Wajib**: Ya

- `options?: object`
  - **Deskripsi**: Objek konfigurasi untuk penentuan prefix.
  - **Tipe**: `object`
  - **Wajib**: Tidak (Opsional)

  - `options.defaultLocale?: Locales`
    - **Deskripsi**: Locale default untuk aplikasi. Jika tidak disediakan, menggunakan locale default yang dikonfigurasi dari konfigurasi proyek Anda.
    - **Tipe**: `Locales`
    - **Default**: [`Konfigurasi Proyek`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Deskripsi**: Mode routing URL untuk penanganan locale. Jika tidak disediakan, menggunakan mode yang dikonfigurasi dari konfigurasi proyek Anda.
    - **Tipe**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Konfigurasi Proyek`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md#middleware)
    - **Mode**:
      - `prefix-no-default`: Mengembalikan string kosong ketika locale sama dengan locale default
      - `prefix-all`: Mengembalikan prefix untuk semua locale termasuk default
      - `no-prefix`: Mengembalikan string kosong (tanpa prefix di URL)
      - `search-params`: Mengembalikan string kosong (locale dalam parameter query)

### Mengembalikan

- **Tipe**: `GetPrefixResult`
- **Deskripsi**: Objek yang berisi tiga format prefix yang berbeda:
  - `prefix`: Prefix path dengan slash di akhir (misalnya, `'fr/'`, `''`)
  - `localePrefix`: Identifier locale tanpa slash (misalnya, `'fr'`, `undefined`)

---

## Contoh Penggunaan

### Penggunaan Dasar

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Periksa prefix untuk locale Bahasa Inggris
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Mengembalikan: { prefix: 'en/', localePrefix: 'en' }

// Periksa prefix untuk locale Bahasa Perancis
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Mengembalikan: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Mengembalikan: { prefix: '', localePrefix: undefined }
```

### Mode Routing Berbeda

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Selalu mengembalikan prefix
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Mengembalikan: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Tidak ada prefix saat locale sama dengan default
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Mengembalikan: { prefix: '', localePrefix: undefined }

// prefix-no-default: Mengembalikan prefix saat locale berbeda dari default
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Mengembalikan: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Tidak pernah mengembalikan prefix
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Mengembalikan: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Mengembalikan: { prefix: '', localePrefix: undefined }
```

### Contoh Praktis

```typescript
import { getPrefix, Locales } from "intlayer";

// Membangun URL dengan prefix yang sesuai untuk locale tertentu
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Menggunakan prefix untuk konstruksi path
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Hasil: "/fr/about"

// Menggunakan localePrefix untuk identifikasi locale
console.log(`Current locale: ${localePrefix}`);
// Output: "Current locale: fr"
```

---

## Fungsi Terkait

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md): Menghasilkan URL yang dilokalkan untuk locale tertentu
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getMultilingualUrls.md): Menghasilkan URL untuk semua locale yang dikonfigurasi

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Prefix path dengan slash di akhir (misal, 'fr/' atau '')
  localePrefix?: Locale; // Identifier locale tanpa garis miring (misalnya, 'fr' atau undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
