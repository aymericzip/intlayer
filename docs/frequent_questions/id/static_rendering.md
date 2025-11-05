---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Rendering Statis vs Dinamis dengan i18n di Next.js
description: Pelajari cara menggunakan rendering statis vs dinamis dengan i18n di Next.js.
keywords:
  - statis
  - dinamis
  - rendering
  - i18n
  - next.js
  - next-intl
  - intlayer
  - framework
  - middleware
  - konfigurasi
slugs:
  - frequent-questions
  - static-rendering
---

# Rendering Statis vs Dinamis dengan i18n di Next.js

## Masalah dengan **next-intl**

- **Apa yang terjadi?**
  Saat Anda menggunakan `useTranslations`, `getTranslations`, atau helper next-intl lainnya _di dalam Server Component_ pada aplikasi dengan routing i18n (`/en/…`, `/fr/…`), Next.js menandai seluruh rute sebagai **dinamis**. ([Next Intl][1])

- **Mengapa?**
  next-intl mengambil locale saat ini dari header yang hanya tersedia pada request (`x-next-intl-locale`) melalui `headers()`. Karena `headers()` adalah **dynamic API**, setiap komponen yang mengaksesnya kehilangan optimasi statis. ([Next Intl][1], [Next.js][2])

- **Solusi resmi (boilerplate)**
  1. Ekspor `generateStaticParams` dengan setiap locale yang didukung.
  2. Panggil `setRequestLocale(locale)` di **setiap** layout/halaman _sebelum_ Anda memanggil `useTranslations`. ([Next Intl][1])
     Ini menghilangkan ketergantungan pada header, tetapi Anda sekarang memiliki kode tambahan yang harus dipelihara dan API yang tidak stabil di produksi.

## Bagaimana **intlayer** menghindari masalah ini

**Pilihan desain**

1. **Hanya parameter route** – Locale berasal dari segmen URL `[locale]` yang sudah diteruskan Next.js ke setiap halaman.
2. **Bundle waktu kompilasi** – Terjemahan diimpor sebagai modul ES biasa, sehingga mereka di-tree-shaken dan disematkan pada saat build.
3. **Tanpa API dinamis** – `useT()` membaca dari konteks React, bukan dari `headers()` atau `cookies()`.
4. **Tanpa konfigurasi tambahan** – Setelah halaman Anda berada di bawah `app/[locale]/`, Next.js secara otomatis melakukan prerender satu file HTML per locale.
