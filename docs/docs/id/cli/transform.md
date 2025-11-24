---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Transformasi Komponen
description: Pelajari cara mentransformasi komponen yang ada untuk menggunakan Intlayer.
keywords:
  - Transformasi
  - Komponen
  - Migrasi
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Transformasi komponen

```bash
npx intlayer transform
```

Perintah ini menganalisis file kode Anda untuk membantu migrasi komponen yang ada agar menggunakan Intlayer. Mendukung pemilihan file secara interaktif atau penargetan file tertentu.

## Alias:

- `npx intlayer trans`

## Argumen:

**Opsi pemilihan file:**

- **`-f, --file [files...]`**: Daftar file spesifik yang akan ditransformasi. Jika tidak diberikan, CLI akan memindai file yang cocok (`**/*.{tsx,jsx,vue,svelte,ts,js}`) dan meminta Anda memilih file mana yang akan ditransformasi.

  > Contoh: `npx intlayer transform -f src/components/MyComponent.tsx`

**Opsi output:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Direktori untuk menyimpan file deklarasi konten yang dihasilkan.

  > Contoh: `npx intlayer transform -o src/content`

- **`--code-only`**: Hanya mentransformasi kode komponen (tidak menulis deklarasi konten).

  > Contoh: `npx intlayer transform --code-only`

- **`--declaration-only`**: Hanya menghasilkan deklarasi konten (tidak menulis ulang komponen).

  > Contoh: `npx intlayer transform --declaration-only`

**Opsi konfigurasi:**

- **`--base-dir`**: Menentukan direktori dasar untuk proyek.
- **`--env`**: Menentukan environment.
- **`--env-file`**: Menyediakan file environment khusus.
- **`--verbose`**: Mengaktifkan logging verbose.

**Plugin yang dibutuhkan:**

Perintah transform bekerja tanpa plugin tambahan pada file TypeScript / JSX. Namun, perintah ini membutuhkan plugin berikut untuk diinstal pada proyek Vue dan Svelte:

- **`@intlayer/vue-transformer`**: Untuk file Vue.
- **`@intlayer/svelte-transformer`**: Untuk file Svelte.
