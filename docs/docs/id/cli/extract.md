---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Ekstrak string
description: Pelajari cara mengekstrak string dari komponen Anda ke file .content yang berada dekat dengan komponen.
keywords:
  - Ekstrak
  - Komponen
  - Migrasi
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Ekstrak string

```bash
npx intlayer extract
```

Perintah ini menganalisis berkas kode Anda untuk mengekstrak string dari komponen ke file .content yang berada dekat dengan komponen. Perintah ini mendukung pemilihan berkas secara interaktif atau penargetan berkas tertentu.

## Alias:

- `npx intlayer ext`

## Argumen:

**Opsi pemilihan file:**

/// - **`-f, --file [files...]`**: Daftar file spesifik untuk diekstrak. Jika tidak disediakan, CLI akan memindai file yang cocok (`**/*.{tsx,jsx,vue,svelte,ts,js}`) dan meminta Anda memilih file mana yang akan diekstrak.

> Contoh: `npx intlayer extract -f src/components/MyComponent.tsx`

**Opsi keluaran:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Direktori untuk menyimpan file deklarasi konten yang dihasilkan.

  > Contoh: `npx intlayer extract -o src/content`

- **`--code-only`**: Hanya mengekstrak kode komponen (tidak menulis deklarasi konten).

  > Contoh: `npx intlayer extract --code-only`

- **`--declaration-only`**: Hanya menghasilkan deklarasi konten (tidak menulis ulang komponen).

  > Contoh: `npx intlayer extract --declaration-only`

**Opsi konfigurasi:**

- **`--base-dir`**: Tentukan direktori dasar untuk proyek.
- **`--env`**: Tentukan environment.
- **`--env-file`**: Sediakan berkas environment kustom.
- **`--verbose`**: Aktifkan verbose logging.

**Plugin yang Diperlukan:**

Perintah extract bekerja tanpa plugin tambahan pada berkas TypeScript / JSX. Namun, ia memerlukan plugin berikut untuk diinstal pada proyek Vue dan Svelte:

- **`@intlayer/vue-transformer`**: Untuk berkas Vue.
- **`@intlayer/svelte-transformer`**: Untuk berkas Svelte.
