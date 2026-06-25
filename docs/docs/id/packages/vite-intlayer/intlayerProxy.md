---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Dokumentasi Plugin Vite intlayerProxy | vite-intlayer
description: Middleware perutean bahasa untuk server dev/preview Vite dan SSR produksi. Menangani deteksi bahasa, pengalihan URL, dan penulisan ulang internal.
keywords:
  - intlayerProxy
  - vite
  - plugin
  - middleware
  - bahasa
  - perutean
  - internasionalisasi
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Menggabungkan configOptions ke dalam satu objek options; proxy dibundel ke dalam intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` adalah plugin Vite yang mendaftarkan middleware perutean bahasa untuk **setiap lingkungan**: server dev, server preview, dan SSR produksi (Nitro / TanStack Start).

> **Sejak Intlayer v9** `intlayerProxy` secara otomatis disertakan di dalam plugin utama [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md) dan diaktifkan secara default melalui `routing.enableProxy: true`. Anda hanya perlu mendaftarkannya secara terpisah jika Anda memerlukan kontrol tingkat yang lebih rendah atau menggunakannya di luar setup `intlayer()` standar.

## Penggunaan

### Sebagai bagian dari `intlayer()` (direkomendasikan, v9+)

Teruskan opsi `proxy` ke plugin utama alih-alih mendaftarkan `intlayerProxy` secara terpisah:

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

### Mandiri (bila diperlukan)

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
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Semua opsi bersifat opsional dan diteruskan sebagai satu objek:

| Opsi            | Tipe                                | Deskripsi                                                                                                                                                                 |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | Predikat yang mengecualikan permintaan dari perutean bahasa. Kembalikan `true` untuk melewati permintaan (misalnya rute API, pemeriksaan kesehatan).                      |
| `configOptions` | `GetConfigurationOptions`           | Override konfigurasi Intlayer yang diteruskan ke `getConfiguration()`. Gunakan saat Anda memerlukan proxy untuk membaca file konfigurasi tertentu atau mengabaikan nilai. |

### Contoh

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` membuat middleware Node.js `(req, res, next)` yang mandiri dan tidak bergantung pada framework yang berisi semua logika perutean bahasa. Berguna dalam lingkungan di mana API plugin Vite tidak tersedia (misalnya server Node.js biasa atau modul Nitro khusus).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### SSR Produksi (TanStack Start / Nitro melalui h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Perilaku perutean

Middleware ini mencerminkan logika perutean dari middleware `next-intlayer` dan mendukung semua mode perutean Intlayer.

### Mode perutean

| Mode            | URL terlihat di browser  | Perilaku                                                                                                                                |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/id/about`              | Default. Prefiks bahasa di URL. Bahasa default dialihkan ke URL tanpa prefiks kecuali `prefix-all` aktif.                               |
| `prefix-all`    | `/en/about`, `/id/about` | Semua bahasa — termasuk default — selalu diberi prefiks.                                                                                |
| `no-prefix`     | `/about`                 | Tidak ada bahasa di URL. Bahasa hanya disimpan di cookie; penulisan ulang URL terjadi secara internal.                                  |
| `search-params` | `/about?locale=id`       | Bahasa diteruskan sebagai parameter kueri. Mengalihkan untuk menambahkan/memperbarui parameter `locale` ketika hilang atau kedaluwarsa. |

### Prioritas deteksi

1. Prefiks jalur URL (misalnya `/id/about` → `id`).
2. Nilai cookie / localStorage (`intlayer-locale`).
3. Header `Accept-Language`.
4. `defaultLocale` dari konfigurasi.

### Bypass otomatis

Middleware selalu meloloskan permintaan ini secara langsung tanpa penanganan bahasa:

- Permintaan yang cocok dengan predikat `ignore`.
- `/node_modules/**`
- `/@**` – Internal Vite (`@vite/`, `@fs/`, `@id/`, dll.).
- `/_**` – Internal server (`__vite_ping`, `__manifest`, dll.).
- Permintaan yang jalurnya diakhiri dengan ekstensi file (aset statis). Jika prefiks bahasa ada pada jalur aset statik (misalnya `/id/logo.png`), prefiks tersebut akan dilucuti agar file dapat disajikan dengan benar.

### Perutean domain

Ketika `routing.domains` dikonfigurasi dalam konfigurasi Intlayer Anda, middleware menangani perutean bahasa lintas domain:

- Permintaan untuk `/zh/about` di `intlayer.org` dialihkan ke `https://intlayer.zh/about` ketika `domains.zh = "intlayer.zh"`.
- Permintaan ke `intlayer.zh/about` ditulis ulang secara internal ke `/zh/about` sehingga parameter rute `[locale]` terisi.

### Perlindungan pengalihan tak terbatas (Redirect loop protection)

Middleware melacak jumlah pengalihan per pasangan `originalUrl → newUrl` dalam jendela geser 2 detik. Lebih dari 10 pengalihan dalam jendela tersebut akan mengembalikan respons `500` dengan deskripsi kesalahan alih-alih mengulang selamanya.

## Nitro / SSR produksi (injeksi otomatis, v9+)

Ketika `intlayerProxy` digunakan sebagai plugin Vite, ia membawa properti `.nitro`. Plugin build `nitro/vite` membaca properti ini dan memasukkannya ke dalam `nitroConfig.modules`, sehingga `intlayerNitroHandler` terdaftar sebagai middleware server Nitro secara otomatis — tidak diperlukan konfigurasi manual untuk SSR produksi.

Handler Nitro menggunakan model event Web Fetch API h3 v2 (bukan `fromNodeMiddleware`) sehingga kompatibel dengan semua preset Nitro: Node, Bun, Deno, edge runtimes.

## Alias yang tidak digunakan lagi (Deprecated)

| Ekspor yang tidak digunakan lagi | Pengganti       |
| -------------------------------- | --------------- |
| `intlayerMiddleware`             | `intlayerProxy` |
| `intLayerMiddlewarePlugin`       | `intlayerProxy` |
