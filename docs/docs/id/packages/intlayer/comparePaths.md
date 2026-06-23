---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentasi Fungsi comparePaths | intlayer
description: Lihat cara menggunakan fungsi comparePaths untuk paket intlayer
keywords:
  - comparePaths
  - normalizePath
  - tautan aktif
  - navigasi
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
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "Dokumentasi awal"
author: aymericzip
---

# Dokumentasi: Fungsi `comparePaths` dalam `intlayer`

## Deskripsi

Fungsi `comparePaths` membandingkan dua URL atau path untuk kesamaan dengan mengabaikan segmen locale, protokol/host, query string, hash, dan garis miring di akhir (trailing slashes). Ini adalah cara yang disarankan untuk menentukan apakah tautan navigasi menunjuk ke halaman saat ini — misalnya untuk menyoroti tautan yang aktif — tanpa harus membuat logika normalisasi Anda sendiri (yang rentan terhadap kesalahan).

Secara internal, fungsi ini menggunakan kembali [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md) untuk menghapus segmen locale, sehingga menghormati mode routing dan locale yang telah Anda konfigurasi.

Paket ini juga mengekspor helper pendukung [`normalizePath`](#normalizepath), yang mengembalikan path kanonik yang tidak bergantung pada locale untuk digunakan dalam perbandingan.

**Fitur Utama:**

- Perbandingan yang tidak bergantung pada locale (`/id/about` cocok dengan `/about`)
- Berfungsi baik dengan URL absolut maupun path relatif
- Mengabaikan query string, hash, dan garis miring akhir
- Mentolerir ketiadaan garis miring awal dan nilai kosong (dinormalisasi menjadi `/`)
- Ringan — dibangun di atas `getPathWithoutLocale`

---

## Tanda Tangan Fungsi

```typescript
comparePaths(
  pathname: string,  // Wajib
  href: string,      // Wajib
  locales?: Locales[] // Opsional
): boolean

normalizePath(
  inputUrl: string,   // Wajib
  locales?: Locales[] // Opsional
): string
```

---

## Parameter

- `pathname: string`
  - **Deskripsi**: String URL atau path pertama yang akan dibandingkan (biasanya path saat ini).
  - **Tipe**: `string`
  - **Wajib**: Ya

- `href: string`
  - **Deskripsi**: String URL atau path kedua yang akan dibandingkan (biasanya `href` dari tautan navigasi).
  - **Tipe**: `string`
  - **Wajib**: Ya

- `locales: Locales[]`
  - **Deskripsi**: Array opsional dari locale yang didukung. Secara default mengambil locale yang dikonfigurasi dalam proyek.
  - **Tipe**: `Locales[]`
  - **Wajib**: Tidak (Opsional)

### Mengembalikan

- **Tipe**: `boolean`
- **Deskripsi**: `true` ketika kedua input mengarah ke path yang sama yang tidak bergantung pada locale, jika tidak `false`.

---

## Contoh Penggunaan

### Penggunaan Dasar

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### URL Absolut dan Relatif

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### Menyoroti Tautan Navigasi yang Aktif

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` mengembalikan path kanonik yang tidak bergantung pada locale yang digunakan oleh `comparePaths`. Fungsi ini menghapus segmen locale, protokol/host, query string, dan hash, memastikan adanya satu garis miring di awal, menghapus garis miring di akhir (kecuali untuk root), dan kembali ke `/` untuk nilai yang kosong.

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## Fungsi Terkait

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPathWithoutLocale.md): Menghapus segmen locale dari URL atau path.
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getPrefix.md): Menentukan awalan URL untuk locale tertentu.
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md): Menghasilkan URL yang dilokalkan untuk locale tertentu.

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
