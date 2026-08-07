---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Plugin Vite intlayer | vite-intlayer
description: Pelajari cara menggunakan plugin intlayer untuk paket vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Init doc"
author: aymericzip
---

# Dokumentasi Plugin Vite intlayer

Plugin Vite `intlayer` mengintegrasikan konfigurasi Intlayer ke dalam proses build. Plugin ini menangani alias kamus, memulai watcher kamus dalam mode pengembangan, dan mempersiapkan kamus untuk proses build.

## Penggunaan

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opsi

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` extends `GetConfigurationOptions` (lihat `@intlayer/config`) dengan field tambahan berikut:

| Opsi            | Tipe                            | Default     | Deskripsi                                                                                                                                           |
| --------------- | ------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Pola caller tambahan untuk package compat-adapter (misalnya `@intlayer/react-i18next`). Diteruskan ke field-usage analyser pada saat build.         |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Opsi yang diteruskan ke bundled locale-routing proxy. Gunakan `ignore` untuk mengecualikan path tertentu (misalnya API routes) dari locale routing. |

Semua opsi lainnya (`override`, `configFile`, …) diteruskan langsung ke `getConfiguration()`.

### Contoh

#### Abaikan rute API dari routing lokal

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Dengan jalur file konfigurasi kustom

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Dengan pemanggil compat-adapter

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## Apa yang dilakukan plugin ini

### 1. Persiapan Kamus

Sebelum build dimulai (dan sekali per jam dalam dev), `intlayer` memanggil `prepareIntlayer` untuk mengompilasi semua file `.content.ts` menjadi kamus JSON yang dioptimalkan disimpan di `.intlayer/`.

### 2. Alias modul

Plugin menambahkan Vite resolve aliases sehingga `import { myDict } from 'intlayer/dictionaries/my-dict'` mengarah ke file JSON yang sudah dikompilasi di disk. SSR builds menggunakan `ssr.noExternal` untuk memastikan semua paket `@intlayer/*` dibundle dengan aliases yang diterapkan.

### 3. Dev-server watcher

Dalam mode pengembangan, sebuah `chokidar` watcher dimulai. Ketika file `.content.ts` berubah, kamus-kamus dikompilasi ulang dan HMR Vite menyebarkan pembaruan ke browser.

### 4. Bundled locale-routing proxy (v9+)

Sejak Intlayer v9 middleware `intlayerProxy` didaftarkan secara otomatis di dalam `intlayer()`. Ini menangani:

- Deteksi locale dari prefiks URL, cookies, dan header `Accept-Language`.
- 301 redirects ketika locale yang terdeteksi tidak cocok dengan URL saat ini.
- Internal URL rewrites sehingga framework melihat parameter rute `[locale]` yang benar.

Proxy dikendalikan oleh `routing.enableProxy` (default `true`) dalam konfigurasi Intlayer Anda. Untuk menonaktifkannya sepenuhnya:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Untuk menyesuaikan perilaku proxy tanpa panggilan `intlayerProxy()` terpisah, teruskan opsi `proxy` ke plugin utama:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Lihat [dokumentasi intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerProxy.md) untuk referensi perilaku routing lengkap.

### 5. Bundled compiler (v9+)

Ketika `compiler.enabled` adalah `true` **dan** `compiler.output` diatur dalam konfigurasi Intlayer Anda, `intlayer()` mendaftarkan `intlayerCompiler` secara otomatis. Compiler mengekstrak deklarasi konten inline yang ditulis langsung di dalam file komponen dan menulis konten tersebut ke dalam kamus saat transform time. Lihat [dokumentasi intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerCompiler.md).

### 6. Optimisasi Build

Selama build produksi, plugin menambahkan:

- **intlayerOptimize** – transformasi Babel yang menulis ulang `useIntlayer('key')` → `useDictionary(hash)` dan menyuntikkan impor JSON langsung.
- **intlayerPrune** – menghapus bidang konten yang tidak digunakan dari JSON kamus.
- **intlayerMinify** – mengompresi JSON kamus dan secara opsional mengubah nama bidang.

Ini tidak aktif dalam mode pengembangan.

## Alias yang Sudah Usang

| Ekspor yang Sudah Usang | Pengganti  |
| ----------------------- | ---------- |
| `intlayerPlugin`        | `intlayer` |
| `intLayerPlugin`        | `intlayer` |
