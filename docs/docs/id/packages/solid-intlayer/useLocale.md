---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Hook useLocale | solid-intlayer
description: Lihat cara menggunakan hook useLocale untuk paket solid-intlayer
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Dokumentasi Hook useLocale

Hook `useLocale` memungkinkan Anda mengelola locale saat ini di aplikasi Solid Anda. Hook ini memberikan akses ke locale saat ini (sebagai accessor), defaultLocale, daftar locale yang tersedia, dan sebuah fungsi untuk memperbarui locale.

## Penggunaan

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## Deskripsi

Hook ini mengembalikan sebuah objek dengan properti-properti berikut:

1. **locale**: Sebuah Solid accessor (`() => string`) yang mengembalikan locale saat ini.
2. **defaultLocale**: Locale default yang didefinisikan di `intlayer.config.ts` Anda.
3. **availableLocales**: Array dari semua locale yang didukung oleh aplikasi Anda.
4. **setLocale**: Fungsi untuk memperbarui locale aplikasi. Fungsi ini juga menangani persistensi (cookies/local storage) jika diaktifkan.

## Parameter

- **props** (opsional):
  - **onLocaleChange**: Fungsi callback yang dipanggil setiap kali locale berubah.
  - **isCookieEnabled**: Menentukan apakah locale akan dipertahankan dalam cookie.
