---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Komponen IntlayerProvider | solid-intlayer
description: Lihat cara menggunakan komponen IntlayerProvider untuk paket solid-intlayer
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentasi terpadu untuk semua ekspor
---

# Dokumentasi Komponen IntlayerProvider

Komponen `IntlayerProvider` adalah komponen root yang menyediakan konteks internacionalisasi untuk aplikasi Solid Anda. Komponen ini mengelola state locale saat ini dan memastikan semua komponen anak dapat mengakses terjemahan.

## Penggunaan

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Deskripsi

Komponen `IntlayerProvider` menjalankan peran-peran berikut:

1. **Manajemen State**: Menginisialisasi dan menyimpan locale saat ini, menggunakan signals untuk reaktivitas.
2. **Resolusi Locale**: Menentukan locale awal berdasarkan cookie, preferensi browser, atau konfigurasi default.
3. **Injeksi Konteks**: Membuat locale dan fungsi `setLocale` tersedia bagi komponen mana pun melalui hook seperti `useIntlayer` atau `useLocale`.
4. **Persistensi**: Menyinkronkan perubahan locale secara otomatis dengan cookie atau local storage untuk mempertahankan preferensi pengguna antar sesi.

## Properti

- **locale** (opsional): Menetapkan locale saat ini secara manual.
- **defaultLocale** (opsional): Menimpa default locale dari konfigurasi.
- **setLocale** (opsional): Menyediakan fungsi setter locale kustom.
- **disableEditor** (opsional): Nonaktifkan integrasi editor visual.
- **isCookieEnabled** (opsional): Mengaktifkan atau menonaktifkan persistensi cookie.
