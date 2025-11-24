---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Dorong Kamus
description: Pelajari cara mendorong kamus Anda ke editor dan CMS Intlayer.
keywords:
  - Dorong
  - Kamus
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Dorong Kamus

```bash
npx intlayer dictionary push
```

Jika [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) sudah terpasang, Anda juga dapat mendorong kamus ke editor. Perintah ini akan memungkinkan kamus tersedia di [editor](https://intlayer.org/dashboard). Dengan cara ini, Anda dapat membagikan kamus Anda dengan tim dan mengedit konten tanpa harus mengubah kode aplikasi Anda.

## Alias:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Argumen:

**Opsi Kamus:**

- **`-d`, `--dictionaries`**: id dari kamus yang akan didorong. Jika tidak ditentukan, semua kamus akan didorong.

  > Contoh: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: id dari kamus yang akan didorong (alias dari --dictionaries).

  > Contoh: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Opsi Konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek. Untuk mengambil konfigurasi intlayer, perintah akan mencari file `intlayer.config.{ts,js,json,cjs,mjs}` di direktori dasar.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Nonaktifkan cache.

  > Contoh: `npx intlayer build --no-cache`

**Opsi variabel lingkungan:**

- **`--env`**: Tentukan environment (misalnya, `development`, `production`). Berguna jika Anda menggunakan variabel lingkungan dalam file konfigurasi intlayer Anda.
- **`--env-file`**: Berikan file environment khusus untuk memuat variabel. Berguna jika Anda menggunakan variabel lingkungan dalam file konfigurasi intlayer Anda.

  > Contoh: `npx intlayer dictionary push --env-file .env.production.local`

  > Contoh: `npx intlayer dictionary push --env production`

**Opsi output:**

- **`-r`, `--delete-locale-dictionary`**: Lewati pertanyaan yang menanyakan untuk menghapus direktori locales setelah kamus didorong, dan hapus direktori tersebut. Secara default, jika kamus didefinisikan secara lokal, itu akan menimpa konten kamus yang ada di jarak jauh.

  > Contoh: `npx intlayer dictionary push -r`

  > Contoh: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Lewati pertanyaan yang menanyakan untuk menghapus direktori locales setelah kamus didorong, dan simpan direktori tersebut. Secara default, jika kamus didefinisikan secara lokal, itu akan menimpa konten kamus yang ada di jarak jauh.

  > Contoh: `npx intlayer dictionary push -k`

  > Contoh: `npx intlayer dictionary push --keep-locale-dictionary`

**Opsi persiapan:**

- **`--build`**: Membangun kamus sebelum mendorong untuk memastikan kontennya terbaru. True akan memaksa pembangunan, false akan melewati pembangunan, undefined akan memungkinkan menggunakan cache dari pembangunan.

**Opsi log:**

- **`--verbose`**: Mengaktifkan logging verbose untuk debugging. (default true saat menggunakan CLI)

**Opsi Git:**

- **`--git-diff`**: Hanya jalankan pada kamus yang mencakup perubahan dari base (default `origin/main`) ke cabang saat ini (default: `HEAD`).
- **`--git-diff-base`**: Menentukan referensi base untuk git diff (default `origin/main`).
- **`--git-diff-current`**: Menentukan referensi saat ini untuk git diff (default: `HEAD`).
- **`--uncommitted`**: Sertakan perubahan yang belum dikomit.
- **`--unpushed`**: Sertakan perubahan yang belum didorong.
- **`--untracked`**: Sertakan file yang tidak terlacak.

  > Contoh: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Contoh: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
