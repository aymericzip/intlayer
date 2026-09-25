---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentasi Paket vite-intlayer
description: Plugin Vite untuk Intlayer, menyediakan alias kamus dan watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Indeks ekspor diperbarui – proxy dan compiler sekarang dibundel ke dalam intlayer(); menambahkan dokumentasi intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Unified documentation for all exports"
author: aymericzip
---

# Paket vite-intlayer

Paket `vite-intlayer` menyediakan plugin Vite untuk mengintegrasikan Intlayer ke dalam aplikasi berbasis Vite Anda.

## Instalasi

```bash
npm install vite-intlayer
```

## Ekspor

### Plugin

Impor:

```tsx
import "vite-intlayer";
```

| Fungsi                     | Deskripsi                                                                                                                                                        | Dokumen Terkait                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Plugin Vite utama. Menyiapkan kamus, mengonfigurasi alias, memulai pemantau server dev, dan (sejak v9) membundel proxy dan compiler.                             | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Usang**) Alias untuk `intlayer`.                                                                                                                              | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Usang**) Alias untuk `intlayer`.                                                                                                                              | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Plugin middleware perutean lokal (deteksi, pengalihan, penulisan ulang). Sejak v9 dibundel dalam `intlayer()` – daftarkan secara terpisah hanya jika diperlukan. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Usang**) Alias untuk `intlayerProxy`.                                                                                                                         | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Usang**) Alias untuk `intlayerProxy`.                                                                                                                         | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Mengekstrak deklarasi konten sebaris dari komponen dan menulisnya ke kamus. Sejak v9 dibundel dalam `intlayer()`.                                                | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Menghapus kolom kamus yang tidak digunakan dari bundel produksi melalui tree-shaking.                                                                            | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Meminimalkan file JSON kamus yang dikompilasi dan secara opsional mengubah nama bidang.                                                                          | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerMinify.md)     |

### Utilitas

| Export                       | Deskripsi                                                                                                 | Dokumentasi Terkait                                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Mengembalikan middleware Node.js `(req, res, next)` yang framework-agnostic dengan logika locale-routing. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/intlayerProxy.md) |

### Tipe

| Export                       | Deskripsi                                                                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Opsi yang diterima oleh `intlayer()`. Memperluas `GetConfigurationOptions` dengan `compatCallers` dan `proxy`.       |
| `IntlayerProxyPluginOptions` | Opsi yang diterima oleh `intlayerProxy()` dan `createIntlayerProxyHandler()`. Mencakup `ignore` dan `configOptions`. |
| `IntlayerCompilerOptions`    | Opsi yang diterima oleh `intlayerCompiler()`. Mencakup `configOptions` dan `compilerConfig`.                         |
| `CompatCallerConfig`         | Re-export dari `@intlayer/babel`. Menjelaskan pola compat-adapter caller untuk analisis penggunaan field.            |
