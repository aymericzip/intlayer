---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: Self-Hosting Intlayer
description: "Jalankan Intlayer di infrastruktur Anda sendiri: aplikasi desktop, kontainer Docker all-in-one tunggal, atau stack Docker Compose yang dapat diskalakan. Tidak memerlukan akun Intlayer Cloud."
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Aplikasi Desktop
  - Intlayer
  - CMS
  - Instalasi
  - Infrastruktur
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Self-Hosting Intlayer

Intlayer dapat dijalankan di infrastruktur Anda sendiri tanpa memerlukan akun Intlayer Cloud. Tiga konfigurasi disediakan, semuanya dapat diatur menggunakan penginstal yang sama (`install.sh`, `install.ps1` di Windows, atau `npx intlayer init infra`):

| Setup                 | What it is                                                                                     | Pick it for                                     |
| --------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Aplikasi Desktop**  | Dasbor native untuk macOS, Linux, dan Windows                                                  | Klien lokal, tidak ada yang perlu di-host       |
| **Docker All-in-One** | Dasbor, API, MongoDB, Redis, dan MinIO dalam **satu kontainer**                                | Pengujian dan instalasi box tunggal skala kecil |
| **Docker Compose**    | **Satu kontainer per layanan**, setiap penyimpanan data dapat diganti dengan layanan terkelola | Produksi, penskalaan, basis data terkelola      |

## Table of Contents

<TOC/>

## Image dan Paket yang Diterbitkan

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Ketiga image dibuat dari [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) yang sama dan diterbitkan pada setiap rilis. Stack Compose juga menarik image resmi `mongo:8`, `redis:8-alpine`, dan `quay.io/minio/minio`.

## Pengaturan

Penginstal akan menanyakan pengaturan yang diinginkan, memeriksa prasyarat (menawarkan untuk menginstal Docker), menulis file lingkungan dengan secret yang telah dibuat sebelumnya, dan menarik image. Penginstal tidak memulai apa pun dengan sendirinya: mode Docker memerlukan pengirim email terlebih dahulu, sehingga proses diakhiri dengan mencetak perintah yang harus dijalankan. Menjalankan ulang aman dilakukan: file lingkungan yang ada tidak akan pernah ditimpa, yang juga menjadikannya jalur pembaruan.

<Tabs group="mode">
<Tab label="Aplikasi Desktop" value="desktop">

Dasbor Intlayer sebagai aplikasi native yang dibangun dengan Tauri. Masuk ke Intlayer Cloud (`https://app.intlayer.org`), sehingga tidak ada yang perlu di-host. Pilihan yang tepat ketika Anda menginginkan klien lokal daripada tab browser.

### Instalasi

Penginstal mengunduh paket yang sesuai untuk OS dan CPU Anda dan membukanya (macOS), menginstalnya (`dpkg` / `rpm` di Linux), atau meluncurkan wizard pengaturan (Windows). Anda juga dapat mengunduhnya secara manual dari [halaman Rilis](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "desktop"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode desktop
```

</Tab>
</Tabs>

### Persyaratan

- **Node.js**: Aplikasi menyematkan server dasbor dan memulainya dengan biner `node` mesin. Instal dari [nodejs.org](https://nodejs.org) jika aplikasi tidak dapat dibuka.

> Build desktop yang diterbitkan berkomunikasi dengan backend Intlayer Cloud. Mengarahkannya ke backend self-hosted memerlukan pembuatan ulang aplikasi dengan `VITE_BACKEND_URL` yang disetel ke API Anda, lihat [Batasan](#limitations).

</Tab>
<Tab label="Docker All-in-One" value="docker">

Semuanya berjalan di dalam satu kontainer `intlayer/cms-all`, diawasi oleh [s6-overlay](https://github.com/just-containers/s6-overlay), dengan setiap penyimpanan data dipertahankan pada satu volume.

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (baked at build)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      /data/mongo  /data/redis /data/minio  (in-image)
      (1-node RS)              minio:9001
```

| Layanan     | Port Host                    | Tujuan                                                                       |
| ----------- | ---------------------------- | ---------------------------------------------------------------------------- |
| **app**     | `3000`                       | Dasbor (UI CMS)                                                              |
| **backend** | `3100`                       | REST API (endpoint `/health`)                                                |
| **mongo**   | internal                     | MongoDB 8, replica-set node tunggal `rs0`                                    |
| **redis**   | internal                     | Antrean pekerjaan (BullMQ) dan caching                                       |
| **minio**   | `9000` (S3), `9001` (konsol) | Penyimpanan objek yang kompatibel dengan S3 untuk avatar dan tangkapan layar |

Urutan booting dikelola oleh dependensi s6 (`mongod` → inisialisasi replica-set, `minio` → pembuatan bucket, kemudian `backend`, lalu `app`), dan layanan akan dimulai ulang jika berhenti, sehingga booting pertama akan pulih dengan sendirinya.

### Prasyarat

- **Docker** ≥ 24: Penginstal menawarkan untuk menginstalnya (melalui [get.docker.com](https://get.docker.com) di Linux, Homebrew di macOS). Di Windows, instal [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2) terlebih dahulu.
- Port `3000`, `3100`, `9000`, dan `9001` bebas di host. MinIO `9000` harus tetap dapat dijangkau oleh browser karena aset dimuat langsung dari `S3_PUBLIC_URL`.
- Pengirim email: Kunci API [Resend](https://resend.com) atau relay SMTP.

### 1. Instalasi

Menulis `./intlayer.env` dengan `BETTER_AUTH_SECRET` dan `S3_SECRET_ACCESS_KEY` yang telah dibuat, lalu menarik `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

CLI menjalankan penginstal yang mencetak perintah `docker run …` yang ditunjukkan pada tab lain. Tempel ke terminal Anda setelah mengonfigurasi mailer.

</Tab>
</Tabs>

### 2. Konfigurasi Mailer

Buka `intlayer.env` dan isi Resend **atau** SMTP (lihat [Mailer global](#global-mailer) untuk detailnya):

```sh fileName="intlayer.env"
# Option A: Resend
RESEND_API_KEY=<your-resend-key>

# Option B: SMTP (takes over from Resend as soon as MAIL_SMTP_HOST is set)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. Jalankan

Ini adalah perintah eksekusi yang dicetak oleh penginstal:

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
docker run -d --name intlayer \
  --restart unless-stopped \
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 \
  -v intlayer-data:/data \
  --env-file ./intlayer.env \
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Windows" value="windows">

```powershell
docker run -d --name intlayer `
  --restart unless-stopped `
  -p 3000:3000 -p 3100:3100 -p 9000:9000 -p 9001:9001 `
  -v intlayer-data:/data `
  --env-file ./intlayer.env `
  intlayer/cms-all:latest
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

CLI menjalankan penginstal yang mencetak perintah `docker run …` yang ditunjukkan pada tab lain. Tempel ke terminal Anda setelah mengonfigurasi mailer.

</Tab>
</Tabs>

Buka **http://localhost:3000** dan ikuti [Pengaturan Pertama Kali](#first-run-setup). Booting pertama menginisialisasi replica-set dan bucket, jadi berikan waktu sekitar satu menit.

### Cadangan dan Peningkatan

Semua status disimpan dalam volume `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Untuk meningkatkan (upgrade), jalankan kembali penginstal (akan menarik image terbaru dan mempertahankan `intlayer.env`), lalu jalankan `docker rm -f intlayer` dan jalankan kembali perintah mulai. Untuk menggunakan MongoDB terkelola alih-alih yang disertakan, setel `MONGODB_URI` di `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

Satu kontainer per layanan di jaringan Compose privat. Dasbor dan API menggunakan image `intlayer/cms-frontend` dan `intlayer/cms-backend` yang diterbitkan; penyimpanan data menggunakan image resmi `mongo`, `redis`, dan `minio`.

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── browser (assets)
     (1-node RS)                     minio:9001
```

| Layanan      | Image                   | Peran                                                                                |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------ |
| `app`        | `intlayer/cms-frontend` | Dasbor pada `:3000`; menunggu backend sehat                                          |
| `backend`    | `intlayer/cms-backend`  | API pada `:3100` dengan Chromium; menunggu Mongo, Redis, dan bucket MinIO            |
| `mongo`      | `mongo:8`               | Replica-set node tunggal `rs0`, diinisialisasi oleh pemeriksaan kesehatannya sendiri |
| `redis`      | `redis:8-alpine`        | Antrean dan caching, persistensi append-only                                         |
| `minio`      | `quay.io/minio/minio`   | Penyimpanan S3 pada `:9000`, konsol pada `:9001`                                     |
| `minio-init` | `quay.io/minio/mc`      | Sekali jalan: membuat bucket dan kebijakan unduhan anonimnya                         |

Data disimpan dalam volume `intlayer_mongo-data`, `intlayer_redis-data`, dan `intlayer_minio-data`. Sambungan layanan (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, URL backend internal untuk server-side rendering) telah ditentukan dalam file compose dan lebih diutamakan daripada `.env`, yang hanya menyimpan secret dan integrasi opsional.

### Prasyarat

- **Docker** ≥ 24 dengan plugin Compose: Penginstal menawarkan untuk menginstalnya di Linux dan macOS. Di Windows, instal [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (backend WSL 2) terlebih dahulu.
- Port `3000`, `3100`, `9000`, dan `9001` bebas di host.
- Pengirim email: Kunci API [Resend](https://resend.com) atau relay SMTP.

### 1. Instalasi

Menulis `docker-compose.yml` dan `.env` dengan secret yang dihasilkan ke `./intlayer/` dan menarik image.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

Or by hand:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY (openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

In PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

Or by hand:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# fill in BETTER_AUTH_SECRET and S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. Konfigurasi Mailer

Isi Resend **atau** SMTP di `intlayer/.env`, persis seperti kontainer all-in-one (lihat [Mailer global](#global-mailer)).

### 3. Jalankan

```sh
cd intlayer && docker compose up -d
```

Buka **http://localhost:3000** dan ikuti [Pengaturan Pertama Kali](#first-run-setup).

### Penyimpanan Data Terkelola

Hapus layanan yang Anda ganti dari file compose (bersama dengan entri `depends_on` di `backend`), dan timpa variabel yang sesuai:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` berfungsi langsung terhadap penyedia mana pun yang kompatibel dengan S3.

### Penskalaan

`app` dan `backend` bersifat stateless. Di balik penyeimbang beban (load balancer), jika pemetaan port host tetap dihapus dan proksi merutekan berdasarkan nama layanan, `docker compose up -d --scale backend=3` akan berfungsi. Pekerjaan latar belakang dikoordinasikan melalui Redis (BullMQ), sehingga beberapa replika backend dapat berbagi antrean dengan aman.

### Membangun dari Sumber

Dari hasil kloning repositori, ganti dua layanan Intlayer dari `image:` ke `build:` dengan override:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Gunakan ini juga saat membuat image untuk domain kustom: berikan nilai `VITE_*` sebagai argumen build (lihat [Batasan](#limitations)).

### Cadangan dan Peningkatan

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### Pengaturan Penginstal

Tanpa `--mode` (atau `INTLAYER_MODE`), penginstal akan menampilkan menu: `desktop`, `docker` (all-in-one), atau `compose`. Penginstal juga membaca beberapa variabel lingkungan; teruskan ke shell alih-alih ke `curl` karena ini disalurkan (piped):

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| Variable                  | Default                   | Applies to | Description                                                |
| ------------------------- | ------------------------- | ---------- | ---------------------------------------------------------- |
| `INTLAYER_MODE`           | _(asked)_                 | all        | `desktop`, `docker` or `compose`, same as `--mode`         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop    | Where the app installer is saved                           |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker     | All-in-one image to pull                                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker     | Where to write the environment file                        |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker     | Container name                                             |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker     | Named volume mounted at `/data`                            |
| `INTLAYER_APP_PORT`       | `3000`                    | docker     | Host port for the dashboard                                |
| `INTLAYER_API_PORT`       | `3100`                    | docker     | Host port for the API                                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker     | Host port for the MinIO S3 API                             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker     | Host port for the MinIO console                            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose    | Where `docker-compose.yml` and `.env` are written          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | both       | Git ref the compose file and env template are fetched from |

> Variabel port hanya mengubah sisi **host** dari pemetaan. Image yang diterbitkan memiliki `http://localhost:3000`, `http://localhost:3100`, dan `http://localhost:9000` yang dikompilasi ke dalam bundle dasbor, jadi pertahankan default kecuali Anda membuat image sendiri, lihat [Batasan](#limitations).

## Pengaturan Pertama Kali

Membuka dasbor pada instance baru (database kosong) akan otomatis dialihkan ke **`/init`**:

1. Buat akun pertama. Karena koleksi pengguna kosong, akun ini secara otomatis dipromosikan menjadi **Super Admin**.
2. Email verifikasi dikirim melalui Resend atau relay SMTP Anda. Verifikasi email **wajib** dilakukan, itulah mengapa pengirim email harus dikonfigurasi sebelum memulai.
3. Klik tautan di email dan masuk.

Setelah admin ada, `/init` akan dialihkan ke halaman masuk biasa.

## Variabel Lingkungan

Kedua mode Docker membaca file yang sama (berupa `intlayer.env` untuk kontainer atau `.env` untuk Compose) yang dihasilkan dari [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### Wajib

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Ditetapkan oleh Penerapan

These are set by the image (all-in-one) or by the compose file, and only need overriding for a non-standard topology.

| Variable           | All-in-one                                          | Docker Compose                   | Description                                                                   |
| ------------------ | --------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | Backend listening port                                                        |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | Public URL of the dashboard                                                   |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | Public URL of the backend API                                                 |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | Cookie domain                                                                 |
| `SELF_HOSTED`      | `true`                                              | `true`                           | Disables the cloud-only API endpoints (billing, subscriptions, marketplace)   |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | MongoDB connection string, any `mongodb://` or `mongodb+srv://` cluster works |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                         |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (server-to-server)                                                      |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | Public URL for browser asset loading                                          |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | Bucket name                                                                   |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | MinIO access key                                                              |

Layanan Compose `app` juga menerima `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: browser menjangkau API di `localhost:3100`, tetapi rendering sisi server berjalan di dalam jaringan Compose sehingga harus menggunakan nama layanan.

### Opsional (fitur akan dinonaktifkan dengan lancar jika tidak disetel)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Mailer Global

Semua email transaksional, termasuk email di luar organisasi seperti reset kata sandi dan magic link, melewati salah satu dari dua transport global:

- **Resend**: Menggunakan `RESEND_API_KEY`.
- **SMTP**: Menggunakan variabel `MAIL_SMTP_*`. Menyetel `MAIL_SMTP_HOST` akan langsung memilih transport SMTP dan mengabaikan `RESEND_API_KEY`.

`MAIL_PROVIDER` hanya diperlukan untuk memaksa salah satu transport jika keduanya dikonfigurasi (misalnya `MAIL_PROVIDER=resend` untuk tetap menggunakan Resend saat host SMTP ada).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Urutan prioritas: Mailer milik organisasi sendiri (dikonfigurasi dari dasbor **Organisasi**) menggantikan mailer global, dan mailer global menggantikan kunci Resend default.

## Menghubungkan Proyek Intlayer Anda

Setelah stack berjalan, konfigurasikan proyek Anda untuk mengarah ke backend dan dasbor self-hosted Anda, bukan ke `intlayer.org`.

### Konfigurasi Proyek

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * URL of the self-hosted CMS dashboard.
     * Default: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * URL of the self-hosted backend API.
     * Default: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

Set the environment variables in your project's `.env`:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Buat kredensial akses di dasbor self-hosted Anda di **Proyek → Kunci Akses** (`http://localhost:3000/projects`).

### SDK `@intlayer/api`

Saat menggunakan SDK `@intlayer/api` secara terprogram, teruskan `backendURL` secara eksplisit:

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

## Batasan

- **Domain kustom dan pemetaan ulang port belum didukung.** Semua URL `VITE_*` yang ditujukan untuk browser dipanggang ke dalam dasbor pada waktu build, dan image yang diterbitkan (serta aplikasi desktop) memiliki nilai `localhost` / Intlayer Cloud. Dasbor harus diakses di `http://localhost:3000`, API di `:3100`, dan MinIO di `:9000`. Menghosting di domain publik atau mengarahkan aplikasi desktop ke backend self-hosted memerlukan pembuatan ulang dengan URL target yang dipanggang (pada `docker/selfhost/Dockerfile` atau `docker-compose.build.yml` dengan `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…`), dan tidak didukung secara langsung.
- **Pengiriman email memerlukan mailer yang berfungsi.** Pengaturan pertama kali mewajibkan verifikasi email, jadi `RESEND_API_KEY` atau [relay SMTP](#global-mailer) (`MAIL_SMTP_*`) harus dikonfigurasi. Setelah admin pertama masuk, organisasi juga dapat mengonfigurasi mailer SMTP atau Resend mereka sendiri dari dasbor.
- **Aplikasi desktop memerlukan Node.js di mesin untuk memulai server yang disematkan.**

## Tautan Berguna

- [Dokumentasi Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- [Referensi Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Rilis Aplikasi Desktop](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), mirror GHCR: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml`, `.env.template`
