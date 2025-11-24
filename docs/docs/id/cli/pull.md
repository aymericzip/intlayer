---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Tarik Kamus
description: Pelajari cara menarik kamus dari editor dan CMS Intlayer.
keywords:
  - Tarik
  - Kamus
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Tarik Kamus Jarak Jauh

```bash
npx intlayer pull
```

Jika [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) sudah terpasang, Anda juga dapat menarik kamus dari editor. Dengan cara ini, Anda dapat menimpa isi kamus Anda sesuai kebutuhan aplikasi Anda.

## Alias:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Argumen:

**Opsi Kamus:**

- **`-d, --dictionaries`**: Id dari kamus yang akan ditarik. Jika tidak ditentukan, semua kamus akan ditarik.

  > Contoh: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: Id dari kamus yang akan ditarik (alias dari --dictionaries).

  > Contoh: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Opsi konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi variabel lingkungan:**

- **`--env`**: Tentukan lingkungan (misalnya, `development`, `production`).
- **`--env-file`**: Berikan file lingkungan kustom untuk memuat variabel dari file tersebut.
- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

  > Contoh: `npx intlayer dictionary push --env production`

**Opsi output:**

- **`--new-dictionaries-path`** : Jalur ke direktori tempat kamus baru akan disimpan. Jika tidak ditentukan, kamus baru akan disimpan di direktori `./intlayer-dictionaries` dalam proyek. Jika ada field `filePath` yang ditentukan dalam konten kamus Anda, kamus tidak akan mempertimbangkan argumen ini dan akan disimpan di direktori `filePath` yang ditentukan.

**Opsi log:**

- **`--verbose`**: Aktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

## Contoh:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
