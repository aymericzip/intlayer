---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Daftar Proyek Intlayer
description: Pelajari cara mendaftarkan semua proyek Intlayer di sebuah direktori atau repositori git.
keywords:
  - Daftar
  - Proyek
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Daftar Proyek Intlayer

```bash
npx intlayer projects list
```

Perintah ini mencari dan menampilkan semua proyek Intlayer dengan menemukan direktori yang berisi berkas konfigurasi Intlayer. Ini berguna untuk menemukan semua proyek Intlayer dalam monorepo, workspace, atau repositori git.

## Alias:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Argumen:

- **`--base-dir [path]`**: Tentukan direktori dasar untuk memulai pencarian. Secara default adalah direktori kerja saat ini.

  > Contoh: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Cari dari direktori root git alih-alih direktori dasar. Ini berguna untuk menemukan semua proyek Intlayer dalam monorepo atau repositori git.

  > Contoh: `npx intlayer projects list --git-root`

- **`--json`**: Menampilkan hasil sebagai JSON alih-alih teks yang diformat. Berguna untuk scripting dan akses programatik.

  > Contoh: `npx intlayer projects list --json`

## Cara kerjanya:

Perintah ini mencari berkas konfigurasi Intlayer di direktori yang ditentukan (atau root git jika `--git-root` digunakan). Ia mencari pola berkas konfigurasi berikut:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Setiap direktori yang berisi salah satu berkas ini dianggap sebagai proyek Intlayer dan akan ditampilkan dalam output.

## Contoh:

### Daftar proyek di direktori saat ini:

```bash
npx intlayer projects list
```

### Daftar proyek di direktori tertentu:

```bash
npx intlayer projects list --base-dir ./packages
```

### Daftar semua proyek di repositori git:

```bash
npx intlayer projects list --git-root
```

### Menggunakan alias pintas:

```bash
npx intlayer pl --git-root
```

### Output sebagai JSON:

```bash
npx intlayer projects list --json
```

## Contoh output:

### Output yang diformat:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Output JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Kasus penggunaan:

- **Manajemen monorepo**: Temukan semua proyek Intlayer dalam struktur monorepo
- **Penemuan proyek**: Temukan semua proyek yang mendukung Intlayer di sebuah workspace
- **CI/CD**: Verifikasi proyek Intlayer dalam alur kerja otomatis
- **Dokumentasi**: Hasilkan dokumentasi yang mencantumkan semua proyek yang menggunakan Intlayer

Keluaran menyediakan jalur absolut ke setiap direktori proyek, sehingga mudah untuk menavigasi atau membuat skrip operasi pada beberapa proyek Intlayer.
