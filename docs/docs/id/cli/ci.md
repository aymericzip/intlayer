---
createdAt: 2026-01-06
updatedAt: 2026-01-06
title: Perintah CI
description: Pelajari cara menggunakan perintah Intlayer CI untuk menjalankan perintah Intlayer dengan kredensial yang disuntikkan otomatis di pipeline CI/CD dan monorepo.
keywords:
  - CI
  - CI/CD
  - Otomasi
  - Monorepo
  - Kredensial
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - ci
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: Tambahkan perintah CI
---

# Perintah CI

```bash
npx intlayer ci <command...>
```

Perintah CI dirancang untuk otomasi dan pipeline CI/CD. Perintah ini secara otomatis menyuntikkan kredensial dari variabel lingkungan `INTLAYER_PROJECT_CREDENTIALS` dan dapat menjalankan perintah Intlayer di beberapa proyek dalam monorepo.

## Cara kerja

Perintah CI beroperasi dalam dua mode:

1. **Mode Proyek Tunggal**: Jika direktori kerja saat ini cocok dengan salah satu jalur proyek di `INTLAYER_PROJECT_CREDENTIALS`, perintah akan dijalankan hanya untuk proyek spesifik tersebut.

2. **Mode Iterasi**: Jika tidak ada konteks proyek spesifik yang terdeteksi, perintah akan mengiterasi semua proyek yang dikonfigurasi dan menjalankan perintah untuk masing-masing.

## Variabel Lingkungan

Perintah memerlukan variabel lingkungan `INTLAYER_PROJECT_CREDENTIALS` untuk disetel. Variabel ini harus berisi objek JSON yang memetakan jalur proyek ke kredensialnya:

```json
{
  "packages/app": {
    "clientId": "your-client-id-1",
    "clientSecret": "your-client-secret-1"
  },
  "packages/admin": {
    "clientId": "your-client-id-2",
    "clientSecret": "your-client-secret-2"
  }
}
```

## Deteksi Package Manager

Perintah CI secara otomatis mendeteksi package manager yang digunakan (npm, yarn, pnpm, atau bun) berdasarkan variabel lingkungan `npm_config_user_agent` dan menggunakan perintah yang sesuai untuk mengeksekusi Intlayer.

## Argumen

- **`<command...>`**: Perintah Intlayer yang akan dieksekusi (misalnya, `fill`, `push`, `build`). Anda dapat meneruskan perintah Intlayer apa pun dan argumennya.

  > Contoh: `npx intlayer ci fill --verbose`
  >
  > Contoh: `npx intlayer ci push`
  >
  > Contoh: `npx intlayer ci build --watch`

## Contoh

### Menjalankan perintah dalam mode proyek tunggal

Jika Anda berada di direktori proyek yang cocok dengan salah satu jalur di `INTLAYER_PROJECT_CREDENTIALS`:

```bash
cd packages/app
npx intlayer ci fill
```

Ini akan menjalankan perintah `fill` dengan kredensial yang secara otomatis disuntikkan untuk proyek `packages/app`.

### Menjalankan perintah di semua proyek

Jika Anda berada di direktori yang tidak cocok dengan jalur proyek mana pun, perintah akan mengiterasi semua proyek yang dikonfigurasi:

```bash
cd /path/to/monorepo
npx intlayer ci push
```

Ini akan menjalankan perintah `push` untuk setiap proyek yang dikonfigurasi di `INTLAYER_PROJECT_CREDENTIALS`.

### Meneruskan flag tambahan

Anda dapat meneruskan flag apa pun ke perintah Intlayer yang mendasarinya:

```bash
npx intlayer ci fill --verbose --mode complete
```

### Menggunakan di pipeline CI/CD

Dalam konfigurasi CI/CD Anda (misalnya, GitHub Actions, GitLab CI), setel `INTLAYER_PROJECT_CREDENTIALS` sebagai rahasia:

```yaml
# Contoh GitHub Actions
env:
  INTLAYER_PROJECT_CREDENTIALS: ${{ secrets.INTLAYER_PROJECT_CREDENTIALS }}

steps:
  - name: Isi kamus
    run: npx intlayer ci fill
```

## Penanganan Kesalahan

- Jika `INTLAYER_PROJECT_CREDENTIALS` tidak disetel, perintah akan keluar dengan kesalahan.
- Jika `INTLAYER_PROJECT_CREDENTIALS` bukan JSON yang valid, perintah akan keluar dengan kesalahan.
- Jika jalur proyek tidak ada, akan dilewati dengan peringatan.
- Jika proyek mana pun gagal, perintah akan keluar dengan kode status bukan nol.

## Kasus Penggunaan

- **Otomasi monorepo**: Menjalankan perintah Intlayer di beberapa proyek dalam monorepo
- **Pipeline CI/CD**: Mengotomatisasi manajemen kamus dalam alur kerja integrasi berkelanjutan
- **Operasi massal**: Melakukan operasi yang sama pada beberapa proyek Intlayer sekaligus
- **Manajemen rahasia**: Mengelola kredensial dengan aman untuk beberapa proyek menggunakan variabel lingkungan

## Praktik Keamanan Terbaik

- Simpan `INTLAYER_PROJECT_CREDENTIALS` sebagai rahasia terenkripsi di platform CI/CD Anda
- Jangan pernah melakukan commit kredensial ke kontrol versi
- Gunakan kredensial khusus lingkungan untuk berbagai lingkungan deployment
- Putar kredensial secara teratur
