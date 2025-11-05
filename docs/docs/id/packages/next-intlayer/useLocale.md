---
createdAt: 2025-08-23
updatedAt: 2025-10-09
title: Dokumentasi Hook useLocale | next-intlayer
description: Lihat cara menggunakan hook useLocale untuk paket next-intlayer
keywords:
  - useLocale
  - kamus
  - kunci
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
history:
  - version: 6.2.0
    date: 2025-10-09
    changes: Menambahkan dokumentasi untuk hook `useLocale` dengan opsi `onLocaleChange`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Integrasi Next.js: Dokumentasi Hook `useLocale` untuk `next-intlayer`

Bagian ini menawarkan dokumentasi terperinci tentang hook `useLocale` yang disesuaikan untuk aplikasi Next.js dalam pustaka `next-intlayer`. Hook ini dirancang untuk menangani perubahan locale dan routing secara efisien.

## Mengimpor `useLocale` di Next.js

Untuk menggunakan hook `useLocale` dalam aplikasi Next.js Anda, impor seperti yang ditunjukkan di bawah ini:

```javascript
import { useLocale } from "next-intlayer"; // Digunakan untuk mengelola locale dan routing di Next.js
```

## Penggunaan

Berikut cara mengimplementasikan hook `useLocale` dalam komponen Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Saat Ini: {locale}</h1>
      <p>Locale Default: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Saat Ini: {locale}</h1>
      <p>Locale Default: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Locale Saat Ini: {locale}</h1>
      <p>Locale Default: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Parameter

Hook `useLocale` menerima parameter berikut:

- **`onLocaleChange`**: Sebuah string yang menentukan bagaimana URL harus diperbarui saat locale berubah. Nilainya bisa `"replace"`, `"push"`, atau `"none"`.

  > Mari kita ambil contoh:
  >
  > 1. Anda berada di `/fr/home`
  > 2. Anda menavigasi ke `/fr/about`
  > 3. Anda beralih ke `/es/about`
  > 4. Anda mengklik tombol "kembali" pada browser
  >
  > Perilaku akan berbeda berdasarkan nilai `onLocaleChange`:
  >
  > - `undefined`: (default) Hanya memperbarui locale dalam konteks klien, dan mengatur cookie, tanpa mengubah URL.
  >   -> Tombol "kembali" akan menuju ke `/fr/home`
  > - `"replace"`: Mengganti URL saat ini dengan URL lokal baru, dan mengatur cookie.
  >   -> Tombol "kembali" akan menuju ke `/es/home`
  > - `"push"`: Menambahkan URL lokal baru ke riwayat browser, dan mengatur cookie.
  >   -> Tombol "kembali" akan menuju ke `/fr/about`
  > - `(locale) => void`: Mengatur cookie dan memicu fungsi kustom yang akan dipanggil saat locale berubah.
  >
  >   Opsi `undefined` adalah perilaku default karena kami merekomendasikan menggunakan komponen `Link` untuk menavigasi ke locale baru.
  >   Contoh:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     About
  >   </Link>
  >   ```

## Nilai Kembalian

Saat Anda memanggil hook `useLocale`, hook ini mengembalikan sebuah objek yang berisi properti-properti berikut:

- **`locale`**: Locale saat ini yang diatur dalam konteks React.
- **`defaultLocale`**: Locale utama yang didefinisikan dalam konfigurasi.
- **`availableLocales`**: Daftar semua locale yang tersedia sesuai dengan definisi dalam konfigurasi.
- **`setLocale`**: Fungsi untuk mengubah locale aplikasi dan memperbarui URL sesuai. Fungsi ini mengatur aturan prefix, apakah locale ditambahkan ke path atau tidak berdasarkan konfigurasi. Menggunakan `useRouter` dari `next/navigation` untuk fungsi navigasi seperti `push` dan `refresh`.
- **`pathWithoutLocale`**: Properti terhitung yang mengembalikan path tanpa locale. Ini berguna untuk membandingkan URL. Misalnya, jika locale saat ini adalah `fr`, dan URL-nya `fr/my_path`, maka path tanpa locale adalah `/my_path`. Menggunakan `usePathname` dari `next/navigation` untuk mendapatkan path saat ini.

## Kesimpulan

Hook `useLocale` dari `next-intlayer` adalah alat penting untuk mengelola locale dalam aplikasi Next.js. Hook ini menawarkan pendekatan terintegrasi untuk menyesuaikan aplikasi Anda dengan berbagai locale dengan menangani penyimpanan locale, manajemen state, dan modifikasi URL secara mulus.
