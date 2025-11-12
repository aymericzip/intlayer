---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Saya mendapatkan error terkait sub-paket @intlayer/*
description: Memperbaiki error terkait sub-paket @intlayer/*.
keywords:
  - @intlayer/*
  - sub-paket
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Saya mendapatkan error terkait sub-paket `@intlayer/*`

Masalah ini biasanya terjadi setelah pembaruan paket Intlayer.

Contoh pesan error:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  Tidak ada ekspor yang cocok di "node_modules/@intlayer/config/dist/esm/client.mjs" untuk impor "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Alasan

Paket dasar seperti `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` menggunakan kembali sub-paket yang sama seperti `@intlayer/config`, `@intlayer/core`, `@intlayer/types` untuk menghindari duplikasi kode.

Antara dua versi, ekspor dari sub-paket tidak dijamin sama. Untuk membatasi masalah ini, intlayer mengunci versi sub-paket ke versi paket utama.

> Contoh: `intlayer@1.0.0` menggunakan `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Kecuali untuk `@intlayer/swc`), sub-paket `@intlayer/*` tidak dimaksudkan untuk digunakan secara langsung. Jadi kami menyarankan untuk tidak menginstalnya secara langsung.

## Resolusi

1. Pastikan versi paket utama dan sub-paket adalah sama.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Versi salah, seharusnya 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Coba hapus lockfile dan folder node_modules lalu instal ulang dependensi.

Terkadang, package manager menyimpan versi lama dari sub-paket di lockfile dalam cache. Untuk memperbaikinya, Anda bisa mencoba menghapus lockfile dan folder node_modules lalu instal ulang dependensi.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Periksa instalasi global

Kami menyarankan untuk menginstal `intlayer` atau `intlayer-cli` secara global untuk mengakses perintah CLI. Jika versi global tidak sama dengan versi lokal, package manager mungkin menganggap versi yang salah.

**Periksa apakah sebuah paket terinstal secara global**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Perbaiki potensi konflik dependensi global**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Coba bersihkan cache

Untuk beberapa lingkungan seperti docker, github actions, atau platform hosting web seperti Vercel, cache mungkin ada. Anda bisa mencoba membersihkan cache dan mencoba instalasi ulang.

Anda juga bisa mencoba membersihkan cache package manager Anda dengan perintah berikut:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
