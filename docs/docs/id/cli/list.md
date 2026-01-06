---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: Daftar File Deklarasi Konten
description: Pelajari cara mendaftar semua file deklarasi konten dalam proyek Anda.
keywords:
  - Daftar
  - Deklarasi Konten
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: Menambahkan opsi output JSON ke perintah list
---

# Daftar file deklarasi konten

```bash
npx intlayer content list
```

## Alias:

- `npx intlayer list`

Perintah ini menampilkan semua file deklarasi konten dalam proyek Anda, menunjukkan kunci kamus dan jalur file mereka. Ini berguna untuk mendapatkan gambaran semua file konten Anda dan memverifikasi bahwa mereka ditemukan dengan benar oleh Intlayer.

## Argumen:

- **`--json`**: Menampilkan hasil sebagai JSON alih-alih teks yang diformat. Berguna untuk scripting dan akses programatik.

  > Contoh: `npx intlayer content list --json`

## Contoh:

### Daftar file deklarasi konten:

```bash
npx intlayer content list
```

### Output sebagai JSON:

```bash
npx intlayer content list --json
```

## Contoh output:

### Output yang diformat:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total file deklarasi konten: 3
```

### Output JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Perintah ini akan menampilkan:

- Daftar terformat dari semua file deklarasi konten dengan kunci dan jalur file relatifnya
- Total jumlah file deklarasi konten yang ditemukan

Output ini membantu Anda memverifikasi bahwa semua file konten Anda dikonfigurasi dengan benar dan dapat ditemukan oleh sistem Intlayer.
