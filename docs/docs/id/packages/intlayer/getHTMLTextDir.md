---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Fungsi getHTMLTextDir | intlayer
description: Lihat cara menggunakan fungsi getHTMLTextDir untuk paket intlayer
keywords:
  - getHTMLTextDir
  - terjemahan
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
  - getHTMLTextDir
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Riwayat awal
---

# Dokumentasi: Fungsi `getHTMLTextDir` di `intlayer`

## Deskripsi

Fungsi `getHTMLTextDir` menentukan arah teks (`ltr`, `rtl`, atau `auto`) berdasarkan locale yang diberikan. Fungsi ini dirancang untuk membantu pengembang mengatur atribut `dir` di HTML agar teks dapat ditampilkan dengan benar.

## Parameter

- `locale?: Locales`
  - **Deskripsi**: String locale (misalnya, `Locales.ENGLISH`, `Locales.ARABIC`) yang digunakan untuk menentukan arah teks.
  - **Tipe**: `Locales` (opsional)

## Mengembalikan

- **Tipe**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Deskripsi**: Arah teks yang sesuai dengan locale:
  - `'ltr'` untuk bahasa yang dibaca dari kiri ke kanan.
  - `'rtl'` untuk bahasa yang dibaca dari kanan ke kiri.
  - `'auto'` jika locale tidak dikenali.

## Contoh Penggunaan

### Menentukan Arah Teks

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

// Mendapatkan arah teks berdasarkan locale
getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

## Kasus Tepi

- **Tidak Ada Locale yang Diberikan:**
  - Fungsi mengembalikan `'auto'` ketika `locale` adalah `undefined`.

- **Locale Tidak Dikenali:**
  - Untuk locale yang tidak dikenali, fungsi akan default ke `'auto'`.

## Penggunaan dalam Komponen:

Fungsi `getHTMLTextDir` dapat digunakan untuk mengatur atribut `dir` secara dinamis dalam dokumen HTML agar teks dapat dirender dengan benar berdasarkan locale.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

Dalam contoh di atas, atribut `dir` diatur secara dinamis berdasarkan locale.
