---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrasi dari React Intl ke Intlayer"
description: "Pelajari cara migrasi aplikasi React Anda dari react-intl ke Intlayer menggunakan adapter kompatibilitas."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Migrasi dari React Intl ke Intlayer

Jika aplikasi React Anda menggunakan `react-intl` (FormatJS), transisi ke Intlayer sangat mudah. Lapisan kompatibilitas kami menangani ICU MessageFormat dan semua komponen `Formatted*` yang ada secara mulus.

## Yang perlu dilakukan

Mulai dengan menjalankan perintah inisialisasi di proyek Anda:

```bash
npx intlayer init
```

Kemudian, siapkan plugin Vite atau Next.js Intlayer di konfigurasi Anda. Plugin ini menyuntikkan alias waktu build untuk mengalihkan impor `react-intl` ke `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Yang terjadi di balik layar

Plugin bundler mengaliaskan `react-intl` ke `@intlayer/react-intl`. Alih-alih mengurai file JSON yang besar secara manual dan membungkus aplikasi Anda dalam `IntlProvider`, plugin Intlayer mengekstrak kunci secara statis dan menggunakan kamus Intlayer saat runtime.

Di balik layar:

- **ICU MessageFormat:** Intlayer menggunakan resolver `resolveMessage(..., 'icu')` yang mendukung sepenuhnya pluralisasi ICU, seleksi, pemformatan tanggal/angka, dan tag teks kaya secara native.
- **Pemanggil method & JSX:** `intl.formatMessage({ id: 'a.b' })` dan `<FormattedMessage id="a.b">` diidentifikasi oleh plugin compiler Intlayer (`@intlayer/babel` / `@intlayer/swc`), mengonversi kunci bertitik datar sehingga segmen pertama dengan benar menyelesaikan kunci kamus Intlayer.
- **Formatter:** `<FormattedNumber>`, `<FormattedDate>`, dll., dijembatani ke `core/formatters` native menggunakan `Intl`.
