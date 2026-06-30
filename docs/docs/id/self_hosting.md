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

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Installer mengunduh `docker-compose.yml` dan `.env`, membuat secret yang diperlukan secara otomatis, dan memulai semua kontainer dengan `docker compose up -d`.

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

---

## Memulai Cepat

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

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

Port internal (mongo, redis) tidak terekspos ke host secara default.

> Port MinIO `9000` harus dapat dijangkau oleh browser karena aset yang diunggah (avatar, screenshot) dimuat langsung dari `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## Variabel Lingkungan

Installer menghasilkan `.env` yang siap pakai. Tabel di bawah ini menjelaskan setiap variabel.

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

Menjalankan ulang installer pada deployment yang ada akan melakukan rolling upgrade:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Ini menarik image terbaru dan memulai ulang kontainer dengan `docker compose pull && docker compose up -d`. Volume yang sudah ada (`mongo-data`, `redis-data`, `minio-data`) dipertahankan — tidak ada kehilangan data.

Untuk meningkatkan secara manual dari dalam direktori `./intlayer/`:

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

## Menggunakan reverse proxy (Nginx / Caddy)

Untuk deployment produksi, letakkan reverse proxy di depan kontainer aplikasi dan backend daripada mengeksposnya secara langsung.

### Contoh Nginx

```nginx
server {
    listen 80;
    server_name cms.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Perbarui variabel `.env` berikut agar sesuai dengan domain publik Anda:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> Variabel `VITE_*` tertanam dalam image dashboard pada waktu build. Jika Anda mengubahnya setelah image dibuat, Anda perlu membangun ulang image `app` (`docker compose build app`) atau menggunakan injeksi konfigurasi runtime.

---

## Pemecahan Masalah

### Backend crash-loops pada start pertama

MongoDB dan Redis harus sehat sebelum backend dimulai. File compose menggunakan `depends_on` dengan `condition: service_healthy`. Jika Anda melihat restart backend berulang, periksa apakah `healthchecks` `mongo` dan `redis` lulus:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### Dashboard tidak dapat mencapai API

Verifikasi bahwa `VITE_BACKEND_URL` cocok dengan URL di mana backend dapat dijangkau dari **browser** (bukan jaringan Docker). Jika Anda mengubah port backend atau menambahkan reverse proxy, bangun ulang image dashboard:

```sh
docker compose build app
docker compose up -d app
```

### Email tidak terkirim

Secara default, semua email keluar ditangkap oleh Mailpit. Buka `http://localhost:8025` untuk melihat pesan yang terkirim. Untuk mengirim email sungguhan, setel `MAIL_PROVIDER=resend` dan `RESEND_API_KEY=<your-key>` di `.env`, lalu restart backend:

```sh
docker compose restart backend
```

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
