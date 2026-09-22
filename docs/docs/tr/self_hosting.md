---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Intlayer Kendi Kendine Barındırma (Self-Hosting)
description: "Intlayer'ı kendi altyapınızda çalıştırın: masaüstü uygulaması, tek hepsi-bir-arada Docker kapsayıcısı veya ölçeklenebilir bir Docker Compose yığını. Intlayer Cloud hesabı gerekmez."
keywords:
  - Self-Hosting
  - Kendi Kendine Barındırma
  - Docker
  - Docker Compose
  - Masaüstü Uygulaması
  - Intlayer
  - CMS
  - Kurulum
  - Altyapı
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayer Kendi Kendine Barındırma (Self-Hosting)

Intlayer, bir Intlayer Cloud hesabına ihtiyaç duymadan kendi altyapınızda çalışabilir. Aynı yükleyici (`install.sh`, Windows üzerinde `install.ps1` veya `npx intlayer init infra`) ile yapılandırılabilen üç kurulum sunulmaktadır:

| Setup                      | What it is                                                                               | Pick it for                                |
| -------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------ |
| **Masaüstü Uygulaması**    | macOS, Linux ve Windows için yerel kontrol paneli                                        | Yerel bir istemci, barındırma gerekmez     |
| **Hepsi-Bir-Arada Docker** | Kontrol paneli, API, MongoDB, Redis ve MinIO **tek bir kapsayıcıda**                     | Testler ve küçük tek sunuculu kurulumlar   |
| **Docker Compose**         | **Hizmet başına bir kapsayıcı**, her veri deposu yönetilen bir hizmetle değiştirilebilir | Üretim, ölçekleme, yönetilen veritabanları |

## Table of Contents

<TOC/>

## Yayınlanan İmajlar ve Paketler

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

Her üç imaj da aynı [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) dosyasından oluşturulur ve her sürümde yayınlanır. Compose yığını ayrıca resmi `mongo:8`, `redis:8-alpine` ve `quay.io/minio/minio` imajlarını çeker.

## Kurulum

Yükleyici istediğiniz kurulumu sorar, önkoşulları kontrol eder (Docker kurulumunu önerir), önceden oluşturulmuş gizli anahtarlarla ortam dosyasını yazar ve imajları çeker. Kendi kendine hiçbir şey başlatmaz: Docker modları önce bir e-posta göndericisinin ayarlanmasını gerektirir, bu nedenle çalıştırılacak komutu yazdırarak tamamlanır. Tekrar çalıştırmak güvenlidir: mevcut bir ortam dosyasının üzerine asla yazılmaz, bu da onu bir güncelleme yolu haline getirir.

<Tabs group="mode">
<Tab label="Masaüstü Uygulaması" value="desktop">

Tauri ile oluşturulmuş yerel bir uygulama olarak Intlayer kontrol paneli. Intlayer Cloud (`https://app.intlayer.org`) üzerinden oturum açar, bu nedenle barındırma gerekmez. Bir tarayıcı sekmesi yerine yerel bir istemci tercih ettiğinizde en iyi seçenektir.

### Yükleme

Yükleyici işletim sisteminiz ve işlemciniz için uygun paketi indirir ve açar (macOS), yükler (Linux'ta `dpkg` / `rpm`) veya kurulum sihirbazını başlatır (Windows). Ayrıca [Sürümler sayfasından](https://github.com/aymericzip/intlayer/releases/latest) manuel olarak da indirebilirsiniz.

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

### Gereksinimler

- **Node.js**: Uygulama kontrol paneli sunucusunu yerleşik olarak içerir ve makinenin `node` ikili dosyasıyla başlatır. Uygulama açılmazsa [nodejs.org](https://nodejs.org) adresinden yükleyin.

> Yayınlanan masaüstü derlemesi Intlayer Cloud arka ucuyla iletişim kurar. Kendi kendine barındırılan bir arka uca yönlendirmek, uygulamanın API'nize işaret eden `VITE_BACKEND_URL` ile yeniden derlenmesini gerektirir, bkz. [Sınırlamalar](#limitations).

</Tab>
<Tab label="Hepsi-Bir-Arada Docker" value="docker">

Her şey [s6-overlay](https://github.com/just-containers/s6-overlay) tarafından denetlenen tek bir `intlayer/cms-all` kapsayıcısı içinde çalışır ve tüm veri depoları tek bir birimde kalıcı olarak saklanır.

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

| Hizmet      | Ana Bilgisayar Port(lar)ı    | Amaç                                                         |
| ----------- | ---------------------------- | ------------------------------------------------------------ |
| **app**     | `3000`                       | Kontrol paneli (CMS kullanıcı arayüzü)                       |
| **backend** | `3100`                       | REST API (`/health` uç noktası)                              |
| **mongo**   | dahili                       | MongoDB 8, tek düğümlü replika seti `rs0`                    |
| **redis**   | dahili                       | İş kuyrukları (BullMQ) ve önbellekleme                       |
| **minio**   | `9000` (S3), `9001` (konsol) | Avatarlar ve ekran görüntüleri için S3 uyumlu nesne depolama |

Önyükleme sırası s6 bağımlılıkları tarafından yönetilir (`mongod` → replika seti başlatma, `minio` → demet oluşturma, ardından `backend`, ardından `app`) ve hizmetler sonlandığında yeniden başlatılır, böylece ilk önyükleme kendi kendini toparlar.

### Önkoşullar

- **Docker** ≥ 24: Yükleyici kurulumu önerir (Linux'ta [get.docker.com](https://get.docker.com), macOS'ta Homebrew). Windows'ta önce [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2 arka ucu) kurun.
- Ana bilgisayarda `3000`, `3100`, `9000` ve `9001` portları boş olmalıdır. Tarayıcı varlıkları doğrudan `S3_PUBLIC_URL` adresinden yüklediğinden MinIO `9000` portu tarayıcı tarafından erişilebilir kalmalıdır.
- Bir e-posta göndericisi (mailer): [Resend](https://resend.com) API anahtarı veya bir SMTP geçişi.

### 1. Yükleme

Oluşturulan `BETTER_AUTH_SECRET` ve `S3_SECRET_ACCESS_KEY` ile birlikte `./intlayer.env` dosyasını yazar ve `intlayer/cms-all:latest` imajını çeker.

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

CLI, yükleyiciyi çalıştırır ve diğer sekmelerde gösterilen `docker run …` komutunu yazdırır. E-posta göndericisini yapılandırdıktan sonra terminalinize yapıştırın.

</Tab>
</Tabs>

### 2. E-posta Göndericisini Yapılandırın

`intlayer.env` dosyasını açın ve Resend **veya** SMTP bilgilerini doldurun (ayrıntılar için [Genel e-posta göndericisi](#global-mailer) bölümüne bakın):

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

### 3. Başlatma

Yükleyici tarafından yazdırılan çalıştırma komutudur:

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

CLI, yükleyiciyi çalıştırır ve diğer sekmelerde gösterilen `docker run …` komutunu yazdırır. E-posta göndericisini yapılandırdıktan sonra terminalinize yapıştırın.

</Tab>
</Tabs>

**http://localhost:3000** adresini açın ve [İlk Çalıştırma Kurulumu](#first-run-setup) adımlarını izleyin. İlk önyüklemede replika seti ve demet başlatılır, bu nedenle bir dakika bekleyin.

### Yedekleme ve Güncelleme

Tüm durum `intlayer-data` birimi (`/data/mongo`, `/data/redis`, `/data/minio`) içinde tutulur.

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

Güncellemek için yükleyiciyi tekrar çalıştırın (en son imajı çeker ve `intlayer.env` dosyasını korur), ardından `docker rm -f intlayer` komutunu çalıştırın ve başlatma komutunu yeniden çalıştırın. Birlikte gelen yerine yönetilen bir MongoDB kullanmak için `intlayer.env` dosyasında `MONGODB_URI` değişkenini ayarlayın.

</Tab>
<Tab label="Docker Compose" value="compose">

Özel bir Compose ağında hizmet başına bir kapsayıcı. Kontrol paneli ve API, yayınlanan `intlayer/cms-frontend` ve `intlayer/cms-backend` imajlarını kullanır; veri depoları ise resmi `mongo`, `redis` ve `minio` imajlarını kullanır.

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

| Hizmet       | İmaj                    | Rol                                                                        |
| ------------ | ----------------------- | -------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | `:3000` portundaki kontrol paneli; arka ucun sağlıklı olmasını bekler      |
| `backend`    | `intlayer/cms-backend`  | Chromium ile `:3100` portundaki API; Mongo, Redis ve MinIO demetini bekler |
| `mongo`      | `mongo:8`               | Kendi durum kontrolü ile başlatılan tek düğümlü replika seti `rs0`         |
| `redis`      | `redis:8-alpine`        | Kuyruklar ve önbellekleme, yalnızca eklemeli (append-only) kalıcılık       |
| `minio`      | `quay.io/minio/minio`   | `:9000` portunda S3 depolama, `:9001` portunda konsol                      |
| `minio-init` | `quay.io/minio/mc`      | Tek seferlik: demeti ve anonim indirme politikasını oluşturur              |

Veriler `intlayer_mongo-data`, `intlayer_redis-data` ve `intlayer_minio-data` birimlerinde depolanır. Hizmet bağlantıları (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, sunucu tarafı işleme için dahili arka uç URL'si) compose dosyasında tanımlıdır ve yalnızca gizli anahtarları ve isteğe bağlı entegrasyonları barındıran `.env` dosyasına göre önceliklidir.

### Önkoşullar

- **Docker** ≥ 24 (Compose eklentisiyle birlikte): Yükleyici Linux ve macOS'ta kurulumu önerir. Windows'ta önce [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2 arka ucu) kurun.
- Ana bilgisayarda `3000`, `3100`, `9000` ve `9001` portları boş olmalıdır.
- Bir e-posta göndericisi: [Resend](https://resend.com) API anahtarı veya bir SMTP geçişi.

### 1. Yükleme

Oluşturulan gizli anahtarlarla birlikte `docker-compose.yml` ve bir `.env` dosyasını `./intlayer/` dizinine yazar ve imajları çeker.

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

### 2. E-posta Göndericisini Yapılandırın

Tıpkı hepsi-bir-arada kapsayıcısında olduğu gibi `intlayer/.env` dosyasına Resend **veya** SMTP bilgilerini girin ([Genel e-posta göndericisi](#global-mailer) bölümüne bakın).

### 3. Başlatma

```sh
cd intlayer && docker compose up -d
```

**http://localhost:3000** adresini açın ve [İlk Çalıştırma Kurulumu](#first-run-setup) adımlarını izleyin.

### Yönetilen Veri Depoları

Değiştirdiğiniz hizmeti compose dosyasından (ve `backend` altındaki `depends_on` girişinden) silin ve ilgili değişkeni geçersiz kılın:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` değişkenleri herhangi bir S3 uyumlu sağlayıcı ile sorunsuz çalışır.

### Ölçekleme

`app` ve `backend` durumsuzdur (stateless). Bir yük dengeleyicinin arkasında, sabit ana bilgisayar port eşlemelerini kaldırdığınız ve proxy'nin hizmet adına göre yönlendirme yaptığı varsayımıyla `docker compose up -d --scale backend=3` komutu çalışır. Arka plan işleri Redis (BullMQ) aracılığıyla koordine edilir, bu nedenle birden çok arka uç kopyası kuyrukları güvenle paylaşır.

### Kaynaktan Derleme

Depo klonundan bir geçersiz kılma (override) ile iki Intlayer hizmetini `image:` yerine `build:` kullanımına geçirin:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Özel bir alan adı için imajlar oluştururken de bunu kullanın: `VITE_*` değerlerini derleme argümanları olarak iletin (bkz. [Sınırlamalar](#limitations)).

### Yedekleme ve Güncelleme

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

### Yükleyici Ayarları

`--mode` (veya `INTLAYER_MODE`) belirtilmezse, yükleyici bir menü sunar: `desktop`, `docker` (hepsi-bir-arada) veya `compose`. Ayrıca birkaç ortam değişkenini de okur; bunlar kabuğa yönlendirildiği için `curl` yerine doğrudan kabuğa aktarılmalıdır:

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

> Port değişkenleri yalnızca eşlemenin **ana bilgisayar** tarafını değiştirir. Yayınlanan imajlarda kontrol paneli paketine `http://localhost:3000`, `http://localhost:3100` ve `http://localhost:9000` derlenmiştir; bu nedenle kendi imajınızı derlemediğiniz sürece varsayılan değerleri koruyun, bkz. [Sınırlamalar](#limitations).

## İlk Çalıştırma Kurulumu

Yeni bir örnekte (boş veritabanı) kontrol panelini açtığınızda otomatik olarak **`/init`** sayfasına yönlendirilirsiniz:

1. İlk hesabı oluşturun. Kullanıcı koleksiyonu boş olduğundan, bu hesap otomatik olarak **Süper Yönetici** yapılır.
2. Resend veya SMTP geçişiniz üzerinden bir doğrulama e-postası gönderilir. E-posta doğrulaması **zorunludur**; bu nedenle başlatmadan önce bir e-posta göndericisi yapılandırılmalıdır.
3. E-postadaki bağlantıya tıklayın ve giriş yapın.

Yönetici oluşturulduktan sonra `/init` adresi normal oturum açma sayfasına yönlendirilir.

## Ortam Değişkenleri

Her iki Docker modu da [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template) dosyasından oluşturulan aynı dosyayı (kapsayıcı için `intlayer.env`, Compose için `.env`) okur.

### Gerekli

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### Dağıtım Tarafından Sabitlenmiş

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

Compose `app` hizmeti ek olarak `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100` alır: tarayıcı API'ye `localhost:3100` üzerinden erişirken, sunucu tarafı işleme Compose ağı içinde çalışır ve bu nedenle hizmet adını kullanmalıdır.

### İsteğe Bağlı (ayarlanmadığında özellikler sorunsuz bir şekilde devre dışı kalır)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### Genel E-posta Göndericisi (Mailer)

Şifre sıfırlama ve sihirli bağlantılar dahil olmak üzere kuruluş dışı e-postalar da dahil tüm işlem e-postaları iki genel aktarımdan biri üzerinden gönderilir:

- **Resend**: `RESEND_API_KEY` kullanır.
- **SMTP**: `MAIL_SMTP_*` değişkenlerini kullanır. `MAIL_SMTP_HOST` ayarlandığı anda SMTP seçilir ve `RESEND_API_KEY` yok sayılır.

`MAIL_PROVIDER` yalnızca her ikisi de yapılandırıldığında bir aktarımı zorlamak için gereklidir (örneğin bir SMTP sunucusu mevcutken Resend'i korumak için `MAIL_PROVIDER=resend`).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> Öncelik: Bir kuruluşun kendi e-posta göndericisi (**Kuruluş** kontrol panelinden yapılandırılır) genel e-posta göndericisini geçersiz kılar; genel e-posta göndericisi ise varsayılan Resend anahtarını geçersiz kılar.

## Intlayer Projenizi Bağlama

Yığın çalıştırıldıktan sonra, projenizi `intlayer.org` yerine kendi barındırdığınız arka uca ve kontrol paneline işaret edecek şekilde yapılandırın.

### Proje Yapılandırması

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

Erişim kimlik bilgilerini kendi barındırdığınız kontrol panelinden oluşturun: **Projeler → Erişim Anahtarları** (`http://localhost:3000/projects`).

### `@intlayer/api` SDK

`@intlayer/api` SDK'sını programlı olarak kullanırken `backendURL` parametresini açıkça iletin:

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

## Sınırlamalar

- **Özel alan adları ve port yeniden eşleme desteklenmez.** Tarayıcıya yönelik tüm `VITE_*` URL'leri derleme sırasında kontrol paneline dahil edilir ve yayınlanan imajlar (ve masaüstü uygulaması) `localhost` / Intlayer Cloud değerleriyle yapılandırılmıştır. Kontrol paneline `http://localhost:3000`, API'ye `:3100` ve MinIO'ya `:9000` üzerinden erişilmelidir. Genel bir alan adında barındırmak veya masaüstü uygulamasını kendi kendine barındırılan bir arka uca yönlendirmek, hedef URL'ler ile yeniden derleme gerektirir (`docker/selfhost/Dockerfile` veya `docker-compose.build.yml` üzerinde `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` ile) ve kutudan çıktığı haliyle desteklenmez.
- **E-posta gönderimi çalışan bir gönderici gerektirir.** İlk çalıştırma kurulumunda e-posta doğrulaması zorunlu olduğundan `RESEND_API_KEY` veya bir [SMTP geçişi](#global-mailer) (`MAIL_SMTP_*`) yapılandırılmalıdır. İlk yönetici oturum açtıktan sonra kuruluşlar kontrol panelinden kendi SMTP veya Resend göndericilerini de yapılandırabilir.
- **Masaüstü uygulaması yerleşik sunucuyu başlatmak için makinede Node.js gerektirir.**

## Faydalı Bağlantılar

- [Intlayer CMS Belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- [Yapılandırma Referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Masaüstü Uygulaması Sürümleri](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), GHCR yansıması: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml`, `.env.template`
