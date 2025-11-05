---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentasi Hook useLocale | react-intlayer
description: Lihat cara menggunakan hook useLocale untuk paket react-intlayer
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internasionalisasi
  - Dokumentasi
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Integrasi React: Dokumentasi Hook `useLocale`

Bagian ini menyediakan detail lengkap tentang hook `useLocale` dari pustaka `react-intlayer`, yang dirancang untuk menangani manajemen locale dalam aplikasi React.

## Mengimpor `useLocale` di React

Untuk mengintegrasikan hook `useLocale` ke dalam aplikasi React Anda, impor dari paket yang sesuai:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Digunakan dalam komponen React untuk manajemen locale
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Digunakan dalam komponen React untuk manajemen locale
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Digunakan dalam komponen React untuk manajemen locale
```

## Ikhtisar

Hook `useLocale` menawarkan cara mudah untuk mengakses dan memanipulasi pengaturan locale di dalam komponen React. Ini menyediakan akses ke locale saat ini, locale default, semua locale yang tersedia, dan fungsi untuk memperbarui pengaturan locale.

## Penggunaan

Berikut cara menggunakan hook `useLocale` dalam sebuah komponen React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

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

export default LocaleSwitcher;
```

## Parameter dan Nilai Kembali

Saat Anda memanggil hook `useLocale`, hook ini mengembalikan sebuah objek yang berisi properti-properti berikut:

- **`locale`**: Locale saat ini yang diatur dalam konteks React.
- **`defaultLocale`**: Locale utama yang didefinisikan dalam konfigurasi.
- **`availableLocales`**: Daftar semua locale yang tersedia sesuai dengan definisi dalam konfigurasi.
- **`setLocale`**: Fungsi untuk memperbarui locale saat ini dalam konteks aplikasi.

## Contoh

Contoh ini menunjukkan sebuah komponen yang menggunakan hook `useLocale` untuk menampilkan pemilih locale, memungkinkan pengguna untuk mengubah locale aplikasi secara dinamis:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Kesimpulan

Hook `useLocale` dari `react-intlayer` adalah alat penting untuk mengelola locale dalam aplikasi React Anda, menyediakan fungsionalitas yang dibutuhkan untuk menyesuaikan aplikasi Anda dengan berbagai audiens internasional secara efektif.
