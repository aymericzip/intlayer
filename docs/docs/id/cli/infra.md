---
createdAt: 2026-09-21
updatedAt: 2026-09-21
priority: 5
title: CLI - Init Infra
description: Pelajari cara menggunakan perintah init infra Intlayer CLI untuk menginstal aplikasi desktop atau melakukan self-host Intlayer CMS dengan Docker (wadah all-in-one atau tumpukan Docker Compose).
keywords:
  - CLI
  - Infrastruktur
  - Self-hosting
  - Aplikasi desktop
  - Docker
  - Docker Compose
  - CMS
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - infra
history:
  - version: 9.5.6
    date: 2026-09-21
    changes: "Menambahkan perintah init infra"
author: aymericzip
---

# Perintah Intlayer CLI Init Infra

## Deskripsi

Perintah `init infra` menyiapkan infrastruktur Intlayer di komputer Anda. Perintah ini mengunduh penginstal yang dihosting untuk platform Anda (`https://intlayer.org/install.sh` di macOS / Linux, `https://intlayer.org/install.ps1` di Windows) dan menjalankannya di terminal Anda, sehingga menu dan proses penginstalan dapat terlihat langsung.

Penginstal akan menanyakan cara Anda ingin menjalankan Intlayer:

- **Aplikasi desktop**: mengunduh dasbor native untuk OS dan CPU Anda lalu membuka atau menginstalnya. Build desktop terhubung ke backend Intlayer Cloud.
- **All-in-one Docker**: dasbor + API + MongoDB + Redis + MinIO dalam satu wadah dengan satu volume. Menulis `./intlayer.env` dengan rahasia yang dihasilkan dan menarik citra `intlayer/cms-all`.
- **Docker Compose**: satu wadah per layanan, untuk self-hosting yang skalabel. Menulis `docker-compose.yml` dan `.env` ke `./intlayer/` serta menarik citra.

Penginstal yang dihosting adalah sumber kebenaran tunggal untuk alur penyiapan: CLI menjalankannya daripada mengimplementasikan ulang langkah yang sama, jadi `npx intlayer init infra` dan `curl -fsSL https://intlayer.org/install.sh | sh` melakukan hal yang persis sama.

## Penggunaan

```bash packageManager="npm"
npx intlayer init infra [options]
```

```bash packageManager="yarn"
yarn intlayer init infra [options]
```

```bash packageManager="pnpm"
pnpm intlayer init infra [options]
```

```bash packageManager="bun"
bun x intlayer init infra [options]
```

Langkah yang sama ditawarkan dari daftar periksa `npx intlayer init --interactive`, di bawah **Infrastruktur (aplikasi desktop / self-hosting)**.

## Opsi

- `-m, --mode <mode>` - Opsional. Lewati menu penginstal dan jalankan satu mode secara langsung. Nilai yang diterima: `desktop`, `docker` (all-in-one), atau `compose`. Nilai lain akan keluar dengan kesalahan yang mencantumkan mode yang diterima.

## Contoh

### Pilih mode secara interaktif

```bash
npx intlayer init infra
```

### Instal aplikasi desktop

```bash
npx intlayer init infra --mode desktop
```

### Self-host dengan wadah all-in-one

```bash
npx intlayer init infra --mode docker
```

### Self-host dengan Docker Compose

```bash
npx intlayer init infra --mode compose
```

## Contoh output

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env
▸ Pulling images

  Everything is installed. Two steps left.

  1. Configure a mailer in:

       ./intlayer/.env

     Either RESEND_API_KEY (resend.com) or the MAIL_SMTP_* block — the first
     account cannot be verified without a working mailer.
  2. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000 — first boot initialises the
  datastores, so give it a minute. The first account you create becomes the
  super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

## Pengaturan penginstal

Penginstal membaca beberapa variabel lingkungan yang diteruskan oleh CLI tanpa diubah. Tetapkan di shell Anda sebelum menjalankan perintah:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Variabel                  | Default                   | Berlaku untuk | Deskripsi                                                  |
| ------------------------- | ------------------------- | ------------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(ditanyakan)_            | semua         | `desktop`, `docker`, atau `compose`, sama dengan `--mode`  |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop       | Lokasi penyimpanan penginstal aplikasi                     |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker        | Citra all-in-one yang akan diambil                         |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker        | Lokasi penulisan file lingkungan                           |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker        | Nama wadah                                                 |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker        | Volume bernama yang dipasang di `/data`                    |
| `INTLAYER_APP_PORT`       | `3000`                    | docker        | Port host untuk dasbor                                     |
| `INTLAYER_API_PORT`       | `3100`                    | docker        | Port host untuk API                                        |
| `INTLAYER_S3_PORT`        | `9000`                    | docker        | Port host untuk MinIO S3 API                               |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker        | Port host untuk konsol MinIO                               |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose       | Lokasi penulisan `docker-compose.yml` dan `.env`           |
| `INTLAYER_SELFHOST_REF`   | `main`                    | keduanya      | Referensi Git tempat file compose dan template env diambil |

> Variabel port hanya mengubah sisi **host** dari pemetaan. Citra yang diterbitkan telah mengompilasi `http://localhost:3000`, `http://localhost:3100`, dan `http://localhost:9000` ke dalam bundel dasbor, jadi pertahankan nilai default kecuali Anda membangun citra sendiri: lihat [panduan self-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md#limitations).

## Persyaratan

- **Aplikasi desktop** membutuhkan [Node.js](https://nodejs.org): aplikasi menyematkan server dasbor dan memulainya dengan biner `node` mesin.
- **Mode Docker** membutuhkan [Docker](https://docs.docker.com/get-docker/) (Docker Desktop dengan backend WSL 2 di Windows). Mode Compose juga membutuhkan plugin `docker compose`.

## Catatan

- Menjalankan ulang perintah aman: file lingkungan yang ada tidak pernah ditimpa, yang juga berfungsi sebagai jalur peningkatan (penginstal menarik citra terbaru dan menyimpan rahasia Anda).
- Penginstal diunduh ke direktori sementara dan dihapus setelah keluar, apa pun hasilnya.
- Kode keluar perintah adalah kode keluar penginstal. Jika pengunduhan gagal, CLI mencetak perintah `curl … | sh` (atau `irm … | iex`) yang setara agar Anda dapat menjalankan penginstal secara langsung.
- Mode Docker masih memerlukan pengirim email untuk mengirim email masuk. Setelah penginstal selesai, konfigurasikan Resend atau SMTP di file lingkungan yang dihasilkan: lihat [Mailer Global](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md#global-mailer).

## Terkait

- [Panduan self-hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md) - Arsitektur, langkah awal, dan batasan setiap mode
- [Inisialisasi Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/init.md) - Perintah induk `init` dan daftar periksa interaktifnya
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) - Penjelasan fungsi dasbor yang baru saja Anda pasang
