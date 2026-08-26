---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Self-Hosting Intlayer
description: Jalankan instance Intlayer lengkap di infrastruktur Anda sendiri dengan satu perintah. Tidak memerlukan akun Intlayer Cloud.
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Installation
  - Infrastructure
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Self-Hosting Intlayer

Intlayer dapat berjalan sepenuhnya di infrastruktur Anda sendiri — tidak memerlukan akun Intlayer Cloud. Satu perintah akan mem-boot stack yang siap produksi:

Satu perintah menginstal semuanya:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Installer mengunduh `docker-compose.yml` dan `.env`, membuat secret yang diperlukan secara otomatis, dan memulai semua kontainer dengan `docker compose up -d`.

Satu-satunya dependensi eksternal adalah **MongoDB**: backend terhubung ke cluster MongoDB **Atlas**, yang Anda sediakan. Semua yang lain berjalan di dalam container.

## Daftar Isi

<TOC/>

---

## Arsitektur

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
                └─────────────────────────────┘   │ VITE_BACKEND_URL
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────┬───────────┐
          ▼          ▼         ▼          ▼           ▼
     mongo:27017  redis:6379  minio:9000  mailpit:1025  Chromium
     (1-node RS)             (S3 API)     (SMTP)        (in-image)
                             minio:9001   mailpit:8025
                             (console)    (web UI)
```

Chromium (digunakan untuk pembuatan screenshot Puppeteer) dibundel di dalam image backend — tidak diperlukan kontainer terpisah.

---

## Prasyarat

- **Docker** ≥ 24 dan **Docker Compose** ≥ v2. Jika salah satunya tidak ada, installer akan mencetak tautan instalasi dan keluar.
- Port `3000`, `3100`, `8025`, `9000`, dan `9001` tersedia di host.
- Host Linux atau macOS (atau WSL2 di Windows).

Semuanya — Bun, Redis, MinIO, Chromium — dikirimkan di dalam image.

---

## Memulai dengan cepat

### 1. Jalankan installer

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Installer memverifikasi bahwa Docker terinstall dan berjalan, menulis `./intlayer.env` dengan `BETTER_AUTH_SECRET` dan `S3_SECRET_ACCESS_KEY` yang sudah digenerate, dan menarik image. Installer tidak memulai container — backend tidak dapat boot tanpa kredensial database Anda.

Menjalankan installer kembali aman: `intlayer.env` yang sudah ada tidak akan pernah ditimpa, jadi ini juga berfungsi sebagai jalur upgrade.

### 2. Isi kredensial Anda

Buka `intlayer.env` dan lengkapi nilai-nilai yang ditandai `TODO`:

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

File ini juga berisi blok yang dikomentari untuk fitur-fitur opsional — [SMTP mailer](#global-mailer), `OPENAI_API_KEY`, dan penyedia OAuth. Uncomment yang Anda butuhkan.

> File dibaca oleh `docker run --env-file`, yang tidak menghapus tanda kutip dan menganggap semua yang setelah `=` sebagai nilai. Tulis nilai tanpa tanda kutip, dan simpan komentar di baris terpisah.

### 3. Mulai container

Ini adalah perintah yang dicetak oleh installer ketika selesai:

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 \
  -p 3100:3100 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  ghcr.io/aymericzip/intlayer-selfhost:latest
```

Kemudian buka **http://localhost:3000**. Boot pertama menginisialisasi datastores, jadi tunggu sebentar.

> Dashboard disajikan di `localhost`. Lihat [Limitations](#limitations) — domain kustom tidak didukung oleh image yang dipublikasikan.

### Pengaturan Installer

Installer membaca beberapa variabel environment. Karena di-pipe ke `sh`, teruskan ke shell daripada ke `curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Variable                  | Default                                       | Description                     |
| ------------------------- | --------------------------------------------- | ------------------------------- |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | Image to pull                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | Where to write the env file     |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Container name                  |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | Named volume mounted at `/data` |
| `INTLAYER_APP_PORT`       | `3000`                                        | Host port for the dashboard     |
| `INTLAYER_API_PORT`       | `3100`                                        | Host port for the API           |
| `INTLAYER_S3_PORT`        | `9000`                                        | Host port for the MinIO S3 API  |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | Host port for the MinIO console |

> Keempat variabel port hanya mengubah sisi **host** dari mapping yang dicetak dalam perintah `docker run`. Image yang dipublikasikan memiliki `http://localhost:3000`, `http://localhost:3100` dan `http://localhost:9000` dikompilasi ke dalam bundle dashboard pada saat build, jadi remapping mereka membuat browser tetap menunjuk ke port lama. Pertahankan default kecuali Anda membangun image Anda sendiri — lihat [Limitations](#limitations).

---

## Memulai Cepat

Apa yang dilakukan installer:

1.  Memeriksa bahwa `docker` dan `docker compose` ada.
2.  Mengunduh `docker-compose.yml` dan `.env.example` ke `./intlayer/`.
3.  Jika tidak ada `.env` yang ada, menyalin contoh dan menghasilkan secret acak untuk `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID`, dan `S3_SECRET_ACCESS_KEY` melalui `openssl rand`.
4.  Menjalankan `docker compose pull` + `docker compose up -d`.
5.  Mencetak URL: dashboard `:3000`, API `:3100`, UI email `:8025`, konsol MinIO `:9001`.

Setelah stack aktif, buka **http://localhost:3000** dan buat akun pertama Anda.

---

## Layanan

| Layanan     | Image                                 | Port Host                      | Tujuan                                                                  |
| ----------- | ------------------------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| **app**     | dibuat dari `apps/app/Dockerfile`     | `3000`                         | Dashboard TanStack Start (UI CMS)                                       |
| **backend** | dibuat dari `apps/backend/Dockerfile` | `3100`                         | Fastify REST API (`/health` endpoint)                                   |
| **mongo**   | `mongo:7`                             | internal                       | Replika set node tunggal (`rs0`)                                        |
| **redis**   | `redis:7-alpine`                      | internal                       | Job queues (BullMQ) dan caching (ioredis)                               |
| **minio**   | `minio/minio`                         | `9000` (S3), `9001` (konsol)   | Penyimpanan objek yang kompatibel dengan S3 untuk avatar dan screenshot |
| **mailpit** | `axllent/mailpit`                     | `1025` (SMTP), `8025` (UI web) | Sink email transaksional lokal                                          |

> Port MinIO `9000` harus dapat dijangkau oleh browser karena aset yang diunggah (avatar, screenshot) dimuat langsung dari `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variabel lingkungan

### Diperlukan

| Variable               | Example                      | Description                                                                                                                                  |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas user                                                                                                                           |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas password                                                                                                                       |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster host (used in the `mongodb+srv://` URI)                                                                                |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 32-byte secret for session signing                                                                                                           |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Secret for the bundled MinIO                                                                                                                 |
| `RESEND_API_KEY`       | _(your key)_                 | Transactional email via Resend. Required for first-run setup unless you configure a global SMTP mailer (see [Global mailer](#global-mailer)) |

### Wajib (dibuat secara otomatis atau diminta)

| Variabel               | Contoh                                          | Deskripsi                                               |
| ---------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Lingkungan runtime                                      |
| `PORT`                 | `3100`                                          | Port listen backend                                     |
| `BACKEND_URL`          | `http://localhost:3100`                         | URL publik API backend                                  |
| `APP_URL`              | `http://localhost:3000`                         | URL publik dashboard                                    |
| `DOMAIN`               | `localhost`                                     | Domain cookie                                           |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | URI koneksi MongoDB lengkap                             |
| `REDIS_URL`            | `redis://redis:6379`                            | URL koneksi Redis                                       |
| `BETTER_AUTH_SECRET`   | _(dibuat)_                                      | Secret 32-byte untuk penandatanganan sesi               |
| `MAIL_PROVIDER`        | `smtp`                                          | Transportasi mail: `smtp` atau `resend`                 |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | Nama host SMTP (nama kontainer Mailpit)                 |
| `MAIL_SMTP_PORT`       | `1025`                                          | Port SMTP                                               |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Alamat pengirim                                         |
| `S3_ENDPOINT`          | `http://minio:9000`                             | Endpoint yang kompatibel dengan S3                      |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | URL publik untuk pemuatan aset browser                  |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Nama bucket                                             |
| `S3_ACCESS_KEY_ID`     | _(dibuat)_                                      | Kunci akses MinIO                                       |
| `S3_SECRET_ACCESS_KEY` | _(dibuat)_                                      | Kunci secret MinIO                                      |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | URL backend yang tertanam di dashboard pada waktu build |
| `VITE_DOMAIN`          | `localhost`                                     | Domain yang tertanam di dashboard pada waktu build      |

### Opsional (fitur akan menurun secara bertahap jika tidak ada)

| Variabel                                                 | Fitur                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | Terjemahan berbantuan AI dan audit konten                     |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Penagihan dan manajemen langganan                             |
| `RESEND_API_KEY`                                         | Email transaksional via Resend (menimpa Mailpit jika disetel) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | Login GitHub OAuth                                            |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Login Google OAuth                                            |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | Login GitLab OAuth                                            |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Login Microsoft OAuth                                         |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | Login LinkedIn OAuth                                          |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Login Atlassian OAuth                                         |

### Global mailer

Secara default, semua email transaksional dikirim melalui Resend menggunakan `RESEND_API_KEY`. Deployment yang self-hosted dapat mengarahkan **setiap** email — termasuk email non-organisasi seperti reset password dan magic links — melalui global mailer yang dikonfigurasi dengan environment variables.

Atur `MAIL_PROVIDER` untuk mengaktifkannya. Ketika tidak diatur, mailer Resend default digunakan.

| Variable             | Example                        | Description                                                                            |
| -------------------- | ------------------------------ | -------------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Global transport: `smtp` atau `resend`. Biarkan tidak diatur untuk menggunakan default |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header. Menerima alamat bare atau format `Name <email>`                         |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host (diperlukan ketika `MAIL_PROVIDER=smtp`)                                     |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (default ke `587`)                                                           |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Atur `true` untuk port `465`                                             |
| `MAIL_SMTP_USER`     | _(user anda)_                  | SMTP username (opsional; abaikan untuk unauthenticated relays)                         |
| `MAIL_SMTP_PASSWORD` | _(password anda)_              | SMTP password                                                                          |

> Precedence: mailer milik organisasi sendiri (dikonfigurasi dari dashboard **Organization**) mengambil prioritas atas global mailer, yang pada gilirannya mengambil prioritas atas kunci Resend default.

---

## Menghubungkan proyek Intlayer Anda

Setelah stack berjalan, arahkan proyek Anda ke backend dan dashboard yang di-self-host, bukan ke `intlayer.org`.

### Konfigurasi proyek

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL dashboard CMS yang di-self-host.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL API backend yang di-self-host.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Setel variabel lingkungan di `.env` proyek Anda:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Buat kredensial akses di dashboard self-host Anda di bawah **Projects → Access keys** di `http://localhost:3000/projects`.

### `@intlayer/api` SDK

Saat menggunakan `@intlayer/api` SDK secara terprogram, teruskan `backendURL` secara eksplisit:

```typescript fileName="cms.ts" codeFormat="typescript"
import { createIntlayerCMS } from "@intlayer/api";
import { dictionaryEndpoint } from "@intlayer/api/dictionary";

const cms = createIntlayerCMS({
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    backendURL: process.env.INTLAYER_BACKEND_URL, // http://localhost:3100
  },
});

const { data: dictionaries } = await dictionaryEndpoint(cms).getDictionaries();
```

---

## Peningkatan

Ini menarik image terbaru dan memulai ulang kontainer dengan `docker compose pull && docker compose up -d`. Volume yang sudah ada (`mongo-data`, `redis-data`, `minio-data`) dipertahankan — tidak ada kehilangan data.

```sh
docker compose pull
docker compose up -d
```

---

## Cadangkan dan pulihkan

Semua data persisten berada dalam tiga volume Docker bernama.

### Cadangkan

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/mongo-data.tar.gz /data

docker run --rm \
  -v intlayer_redis-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/redis-data.tar.gz /data

docker run --rm \
  -v intlayer_minio-data:/data \
  -v "$(pwd)":/backup \
  busybox tar czf /backup/minio-data.tar.gz /data
```

### Pulihkan

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# Ulangi untuk redis-data dan minio-data
```

---

## Keterbatasan

- **MongoDB harus external (Atlas).** Backend terhubung hanya melalui `mongodb+srv://` (dibangun dari `DB_ID` / `DB_MDP` / `DB_CLUSTER`), jadi plain `mongodb://host:27017` — termasuk `mongod` bundled container sendiri — tidak dapat digunakan. Sediakan cluster MongoDB Atlas.
- **Tidak ada custom domain.** Semua URL `VITE_*` yang dihadapi browser di-inline ke dalam app pada saat build, dan image yang dipublikasikan dilengkapi dengan nilai `localhost`. Dashboard harus diakses di `http://localhost:3000`; melayaninya di domain publik memerlukan rebuilding image dengan target URLs yang tertanam dan tidak didukung out of the box.
- **Email memerlukan mailer yang berfungsi.** Setup first-run menerapkan verifikasi email, jadi baik `RESEND_API_KEY` atau [global SMTP mailer](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) harus dikonfigurasi. Setelah admin pertama masuk, setiap organisasi juga dapat mengonfigurasi SMTP atau Resend mailer-nya sendiri dari dashboard.

---

## Pemecahan Masalah

### Backend crash-loops pada start pertama

MongoDB dan Redis harus sehat sebelum backend dimulai. File compose menggunakan `depends_on` dengan `condition: service_healthy`. Jika Anda melihat restart backend berulang, periksa apakah `healthchecks` `mongo` dan `redis` lulus:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Cari `MongoDB connection error` di bagian atas log.

### Dashboard tidak dapat mencapai API

Verifikasi bahwa `VITE_BACKEND_URL` cocok dengan URL di mana backend dapat dijangkau dari **browser** (bukan jaringan Docker). Jika Anda mengubah port backend atau menambahkan reverse proxy, bangun ulang image dashboard:

### Bucket MinIO hilang

Jika layanan one-shot `minio-init` tidak berjalan (atau berjalan sebelum MinIO siap), buat bucket secara manual:

```sh
docker compose run --rm minio-init
```

---

## Tautan Berguna

- [Dokumentasi Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- [Referensi Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [SDK CMS — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
