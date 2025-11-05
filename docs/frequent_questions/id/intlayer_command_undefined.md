---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Perintah Intlayer tidak terdefinisi
description: Pelajari cara memperbaiki error perintah intlayer tidak terdefinisi.
keywords:
  - intlayer
  - perintah
  - tidak terdefinisi
  - error
  - vscode
  - ekstensi
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - intlayer-command-undefined
---

# Perintah Intlayer tidak terdefinisi

## Ikhtisar

CLI Intlayer menyediakan cara yang nyaman untuk mengontrol konten intlayer Anda, termasuk membangun kamus, mendorong terjemahan, dan lainnya. Namun, ini tidak esensial agar proyek Anda dapat berjalan. Jika Anda menggunakan plugin bundler (seperti `withIntlayer()` untuk Next.js atau `intlayer()` untuk Vite), Intlayer akan secara otomatis membangun kamus selama proses build aplikasi atau saat server pengembangan dimulai. Dalam mode pengembangan, ia juga akan memantau perubahan dan membangun ulang file deklarasi konten secara otomatis.

Anda dapat mengakses perintah intlayer dengan berbagai cara:

- Menggunakan perintah CLI `intlayer` secara langsung
- Menggunakan [ekstensi VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- Menggunakan SDK `@intlayer/cli`

## Masalah

Saat mencoba menggunakan perintah `intlayer`, Anda mungkin menemui kesalahan ini:

```bash
'intlayer' tidak dikenali sebagai perintah internal atau eksternal,
program yang dapat dijalankan atau file batch.
```

## Solusi

Coba solusi berikut secara berurutan:

1. **Verifikasi bahwa perintah sudah terpasang**

```bash
npx intlayer -h
```

Output yang diharapkan:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            menampilkan nomor versi
    -h, --help               menampilkan bantuan untuk perintah

Commands:
    dictionary|dictionaries  Operasi kamus
    configuration|config     Operasi konfigurasi
    help [command]           menampilkan bantuan untuk perintah
```

2. **Pasang paket intlayer-cli secara global**

```bash
npm install intlayer-cli -g -g
```

> Seharusnya tidak perlu jika Anda sudah menginstal paket `intlayer`

3. **Pasang paket secara global**

```bash
npm install intlayer -g
```

4. **Restart terminal Anda**  
   Kadang-kadang perlu me-restart terminal agar perintah baru dikenali.

5. **Bersihkan dan pasang ulang**  
   Jika solusi di atas tidak berhasil:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Verifikasi file instalasi**  
   Jika masalah masih berlanjut, periksa apakah file-file ini ada:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (harus memiliki field `bin` yang merujuk ke `./dist/cjs/cli.cjs`)

7. **Periksa variabel lingkungan PATH**  
   Pastikan direktori bin global npm ada di PATH Anda:

```bash
# Untuk sistem berbasis Unix (macOS/Linux)
echo $PATH
# Seharusnya termasuk sesuatu seperti /usr/local/bin atau ~/.npm-global/bin

# Untuk Windows
echo %PATH%
# Seharusnya termasuk direktori bin global npm
```

8. **Gunakan npx dengan path lengkap**  
   Jika perintah masih tidak ditemukan, coba gunakan npx dengan path lengkap:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Periksa instalasi yang bertentangan**

```bash
# Daftar semua paket yang terpasang secara global
npm list -g --depth=0

# Hapus instalasi global yang bertentangan
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Kemudian pasang ulang
npm install -g intlayer
```

10. **Verifikasi versi Node.js dan npm**  
    Pastikan Anda menggunakan versi yang kompatibel:

```bash
node --version
npm --version
```

    Jika Anda menggunakan versi yang sudah usang, pertimbangkan untuk memperbarui Node.js dan npm.

11. **Periksa masalah izin**  
    Jika Anda mendapatkan kesalahan izin:

    ```bash
    # Untuk sistem berbasis Unix
    sudo npm install -g intlayer

    # Atau ubah direktori default npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Tambahkan ke ~/.profile atau ~/.bashrc Anda:
    export PATH=~/.npm-global/bin:$PATH
    ```
