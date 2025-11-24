---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Daftar file deklarasi konten

```bash
npx intlayer content list
```

## Alias:

- `npx intlayer list`

Perintah ini menampilkan semua file deklarasi konten dalam proyek Anda, menunjukkan kunci kamus dan jalur file mereka. Ini berguna untuk mendapatkan gambaran semua file konten Anda dan memverifikasi bahwa mereka ditemukan dengan benar oleh Intlayer.

## Contoh:

```bash
npx intlayer content list
```

## Contoh output:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total file deklarasi konten: 3
```

Perintah ini akan menampilkan:

- Daftar terformat dari semua file deklarasi konten dengan kunci dan jalur file relatifnya
- Total jumlah file deklarasi konten yang ditemukan

Output ini membantu Anda memverifikasi bahwa semua file konten Anda dikonfigurasi dengan benar dan dapat ditemukan oleh sistem Intlayer.
