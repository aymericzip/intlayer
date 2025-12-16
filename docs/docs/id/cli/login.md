---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Masuk
description: Pelajari cara menggunakan perintah login Intlayer CLI untuk mengautentikasi dengan Intlayer CMS dan memperoleh kredensial akses.
keywords:
  - CLI
  - Login
  - Autentikasi
  - CMS
  - Intlayer
  - Kredensial
slugs:
  - doc
  - concept
  - cli
  - login
---

# Perintah Login CLI Intlayer

---

## Deskripsi

Perintah `login` dari Intlayer CLI memungkinkan Anda untuk mengautentikasi dengan Intlayer CMS. Perintah ini secara otomatis membuka browser default Anda untuk menyelesaikan proses autentikasi dan menerima kredensial yang diperlukan (Client ID dan Client Secret) untuk menggunakan layanan Intlayer.

## Penggunaan

```bash
npx intlayer login [options]
```

atau

```bash
intlayer login [options]
```

## Opsi

### `--cms-url <url>`

Tentukan URL Intlayer CMS yang akan digunakan untuk autentikasi.

- **Tipe**: `string`
- **Default**: Nilai yang dikonfigurasi di `intlayer.config.*` atau `https://intlayer.org`
- **Contoh**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Opsi Konfigurasi

Anda juga dapat menggunakan opsi konfigurasi umum:

- `--env-file <path>`: Path ke file environment
- `-e, --env <env>`: Lingkungan eksekusi
- `--base-dir <dir>`: Direktori dasar proyek
- `--verbose`: Aktifkan output rinci (default: true)
- `--prefix <prefix>`: Prefix untuk log

## Cara Kerjanya

1. **Mulai Server Lokal**: Perintah memulai server HTTP lokal pada port acak untuk menerima kredensial dari CMS
2. **Membuka Browser**: Perintah otomatis membuka browser default Anda ke URL login CMS
3. **Autentikasi**: Selesaikan autentikasi di browser menggunakan akun Intlayer Anda
4. **Penerimaan Kredensial**: Server lokal menerima Client ID dan Client Secret dari CMS
5. **Instruksi**: Perintah menampilkan instruksi untuk mengonfigurasi kredensial di proyek Anda

## Keluaran

Setelah login berhasil, perintah akan menampilkan:

1. **Kredensial yang diterima** (Client ID dan Client Secret)
2. **Instruksi untuk file `.env`**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Instruksi untuk file konfigurasi Intlayer**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Konfigurasi Manual

Jika browser tidak terbuka secara otomatis, Anda dapat mengunjungi URL yang ditampilkan di terminal secara manual.

## Contoh

### Login dengan URL CMS Kustom

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Login dengan File Environment Tertentu

```bash
npx intlayer login --env-file .env.production
```

### Login dalam Mode Verbose

```bash
npx intlayer login --verbose
```

## Pemecahan Masalah

### Browser Tidak Terbuka

Jika browser tidak terbuka secara otomatis, salin URL yang ditampilkan di terminal dan buka secara manual di browser Anda.

### Masalah Koneksi

Jika Anda mengalami masalah koneksi, verifikasi:

1. Bahwa URL CMS sudah benar
2. Bahwa koneksi internet Anda berfungsi dengan baik
3. Bahwa tidak ada firewall yang memblokir koneksi

### Kredensial Tidak Diterima

Jika kredensial tidak diterima:

1. Pastikan Anda telah menyelesaikan proses autentikasi di browser
2. Verifikasi bahwa port lokal tidak diblokir
3. Coba jalankan perintah lagi

## Langkah Selanjutnya

Setelah menyelesaikan login:

1. Tambahkan kredensial ke file `.env` Anda
2. Konfigurasikan file `intlayer.config.*` Anda dengan kredensial tersebut
3. Gunakan perintah CLI untuk mengelola kamus Anda:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/push.md) - Push kamus ke CMS
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/pull.md) - Pull kamus dari CMS
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) - Isi terjemahan yang hilang

## Lihat Juga

- [Dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- [Konfigurasi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
