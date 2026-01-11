---
createdAt: 2026-01-11
updatedAt: 2026-01-11
title: `vite-env-only` & Intlayer – galat positif palsu: `node:fs` ditolak
description: Mengapa vite-env-only melaporkan impor `node:fs` yang ditolak dengan Intlayer + React-Router + Vite dan apa yang harus dilakukan.
keywords:
  - intlayer
  - vite
  - react-router
  - vite-env-only
  - node:fs
  - import denied
  - alias
  - client bundle
slugs:
  - frequent-questions
  - vite-env-only-node-fs-false-positive
---

# vite-env-only menolak `node:fs` dengan Intlayer

Jika Anda menggunakan plugin **vite-env-only** (seperti disarankan dalam dokumentasi React-Router v7 yang lebih lama) dan melihat:

```bash

Error: [vite-env-only] Import denied

* Denied by specifier pattern: /^node:/
* Importer: index.html
* Import: "node:fs"

```

…meskipun **tidak ada `node:fs` di bundel klien Anda**, ini adalah **false positive**.

## Apa penyebabnya

`vite-env-only` menjalankan pemeriksaan berbasis Babel **lebih awal dalam resolusi graph Vite**, _sebelum_:

- aliasing (termasuk pemetaan browser vs node milik Intlayer),
- dead-code elimination,
- resolusi SSR vs client,
- modul virtual seperti milik React-Router.

Paket Intlayer berisi kode yang dapat berjalan di Node maupun browser. Pada tahap _perantara_, built-in Node seperti `node:fs` mungkin muncul dalam graph **sebelum** Vite menghapusnya dari build klien. `vite-env-only` melihat itu dan langsung menghasilkan error, meskipun bundle akhir tidak mengandungnya.

## React-Router dan Konvensi Modul Server

Dalam dokumentasi React-Router tentang **konvensi modul server**  
(https://reactrouter.com/api/framework-conventions/server-modules), tim **secara eksplisit menyarankan menggunakan `vite-env-only`** untuk mencegah impor yang hanya untuk server bocor ke bundle klien.

Namun, konvensi tersebut bergantung pada aliasing Vite, conditional exports, dan tree-shaking untuk menghapus kode yang hanya untuk server. Meskipun aliasing dan conditional exports sudah diterapkan, beberapa utilitas berbasis Node masih hadir dalam paket seperti `@intlayer/core` pada tahap itu (meskipun mereka tidak pernah diimpor di sisi klien). Karena tree-shaking belum dijalankan, fungsi-fungsi tersebut masih diparsing oleh Babel, dan `vite-env-only` mendeteksi impor `node:` mereka dan menghasilkan false positive — meskipun impor tersebut benar-benar dibersihkan dari bundle klien akhir.

## Cara memperbaiki / mengatasi

### Direkomendasikan: Hapus `vite-env-only`

Cukup hapus plugin tersebut. Dalam banyak kasus Anda tidak membutuhkannya — Vite sudah menangani impor client vs server melalui resolusinya sendiri.

Ini memperbaiki penolakan `node:fs` yang keliru tanpa perubahan pada Intlayer.

### Validasi build akhir sebagai gantinya

Jika Anda masih ingin memastikan tidak ada built-in Node di client, lakukan itu **setelah build**, misalnya:

```bash
pnpm build
grep -R "node:" dist/
```

Jika tidak ada hasil, bundle client Anda bersih.

## Ringkasan

- `vite-env-only` dapat menghasilkan error pada `node:fs` karena ia melakukan pengecekan terlalu awal.
- Konvensi server modules Vite + Intlayer + React-Router biasanya menghapus referensi yang hanya untuk server dengan benar.
- Menghapus plugin tersebut atau memverifikasi _hasil akhir_ biasanya merupakan solusi terbaik.
