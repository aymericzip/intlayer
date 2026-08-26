---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: Intlayer'ı Kendi Sunucunuzda Barındırma
description: Tek bir komutla kendi altyapınızda eksiksiz bir Intlayer örneğini çalıştırın. Intlayer Cloud hesabı gerekmez.
keywords:
  - Kendi Sunucusunda Barındırma
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - Kurulum
  - Altyapı
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayer'ı Kendi Sunucunuzda Barındırma

Intlayer, tamamen kendi altyapınızda çalışabilir; Intlayer Cloud hesabı gerekmez. Tek bir komutla üretime hazır bir yığını başlatabilirsiniz:

Tek bir komut her şeyi kurar:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Yükleyici, bir `docker-compose.yml` ve bir `.env` indirir, gerekli gizli anahtarları otomatik olarak oluşturur ve tüm kapsayıcıları `docker compose up -d` ile başlatır.

Tek dış bağımlılık **MongoDB**'dir: backend, sağladığınız bir MongoDB **Atlas** cluster'ına bağlanır. Diğer her şey kontainer içinde çalışır.

## İçindekiler

<TOC/>

---

## Mimari

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
     (1-düğüm RS)            (S3 API)     (SMTP)        (görüntü içinde)
                             minio:9001   mailpit:8025
                             (konsol)     (web arayüzü)
```

Chromium (Puppeteer ekran görüntüsü oluşturma için kullanılır) backend görüntüsünün içine dahil edilmiştir; ayrı bir kapsayıcıya gerek yoktur.

---

## Önkoşullar

- **Docker** ≥ 24 ve **Docker Compose** ≥ v2. Herhangi biri eksikse, yükleyici kurulum bağlantısını yazdırır ve çıkar.
- Ana bilgisayarda `3000`, `3100`, `8025`, `9000` ve `9001` bağlantı noktalarının kullanılabilir olması.
- Bir Linux veya macOS ana bilgisayarı (veya Windows'ta WSL2).

Diğer her şey — Bun, Redis, MinIO, Chromium — image içinde gelir.

---

## Hızlı başlangıç

### 1. Installer'ı çalıştırın

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Docker'ın yüklü ve çalışır durumda olduğunu doğrular, `BETTER_AUTH_SECRET` ve `S3_SECRET_ACCESS_KEY` zaten oluşturulmuş şekilde `./intlayer.env` dosyasını yazar ve image'ı çeker. Container'ı başlatmaz — backend, veritabanı kimlik bilgileriniz olmadan önyüklenemiyor.

Installer'ı yeniden çalıştırmak güvenlidir: mevcut `intlayer.env` asla üzerine yazılmaz, bu nedenle güncelleme yolu olarak da işlev görür.

### 2. Kimlik bilgilerinizi doldurun

`intlayer.env` dosyasını açın ve `TODO` ile işaretlenmiş değerleri tamamlayın:

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

Dosya ayrıca isteğe bağlı özellikler için yorum satırı içeren bloklar taşır — [SMTP mailer](#global-mailer), `OPENAI_API_KEY` ve OAuth sağlayıcıları. İhtiyacınız olanların yorum satırını kaldırın.

> Dosya `docker run --env-file` tarafından okunur ve tırnak işaretlerini kaldırmaz ve `=` işaretinden sonraki her şeyi değer olarak kabul eder. Çıplak değerler yazın ve açıklamaları kendi satırlarında tutun.

### 3. Container'ı başlat

Bu, yükleyici bittiğinde yazdıran komuttur:

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

Ardından **http://localhost:3000** adresini açın. İlk başlangıçta veri depolarını başlatır, bu nedenle bir dakika bekleyin.

> Dashboard `localhost` üzerinde sunulur. Bkz. [Sınırlamalar](#limitations) — yayınlanan görüntü özel alanları desteklemez.

### Installer ayarları

Installer birkaç ortam değişkenini okur. `sh` içine yönlendirildiği için, onları `curl` yerine shell'e iletin:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Değişken                  | Varsayılan                                    | Açıklama                      |
| ------------------------- | --------------------------------------------- | ----------------------------- |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | Çekilecek image               |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | Env dosyasının yazılacağı yer |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Container adı                 |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | `/data` dizinine bağlı volume |
| `INTLAYER_APP_PORT`       | `3000`                                        | Dashboard için host portu     |
| `INTLAYER_API_PORT`       | `3100`                                        | API için host portu           |
| `INTLAYER_S3_PORT`        | `9000`                                        | MinIO S3 API için host portu  |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | MinIO konsolu için host portu |

> Dört port değişkeni yalnızca `docker run` komutunda yazdırılan eşlemenin **host** tarafını değiştirir. Yayınlanan image, derleme zamanında dashboard bundle'ına `http://localhost:3000`, `http://localhost:3100` ve `http://localhost:9000` derlenmiş olarak sahiptir, bu nedenle onları yeniden eşlemek tarayıcıyı eski portlara işaret ettirir. Kendi image'ınızı oluşturmıyorsanız varsayılanları tutun — [Sınırlamalar](#limitations)'a bakın.

---

## İlk çalıştırma kurulumu

Yeni bir instance'ta (boş veritabanı), dashboard'u açmak sizi **`/init`** sayfasına yönlendirir:

1. İlk hesabı oluşturun. Kullanıcılar koleksiyonu boş olduğundan, bu hesap otomatik olarak **super admin** olarak yükseltilir.
2. Bir doğrulama e-postası gönderilir (Resend aracılığıyla). E-posta doğrulaması **zorunludur** — bu nedenle `RESEND_API_KEY` başlamadan önce ayarlanmalıdır.
3. E-postadaki bağlantıyı tıklayın, ardından oturum açın.

Bir admin mevcut olduğunda, `/init` standart oturum açma sayfasına yönlendirilir.

---

## Servisler

| Servis      | Görüntü                                           | Ana Bilgisayar Bağlantı Noktası(ları) | Amaç                                                         |
| ----------- | ------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| **app**     | `apps/app/Dockerfile` dosyasından oluşturuldu     | `3000`                                | TanStack Start kontrol paneli (CMS UI)                       |
| **backend** | `apps/backend/Dockerfile` dosyasından oluşturuldu | `3100`                                | Fastify REST API (`/health` uç noktası)                      |
| **mongo**   | `mongo:7`                                         | dahili                                | Tek düğümlü replika seti (`rs0`)                             |
| **redis**   | `redis:7-alpine`                                  | dahili                                | İş kuyrukları (BullMQ) ve önbellekleme (ioredis)             |
| **minio**   | `minio/minio`                                     | `9000` (S3), `9001` (konsol)          | Avatarlar ve ekran görüntüleri için S3 uyumlu nesne depolama |
| **mailpit** | `axllent/mailpit`                                 | `1025` (SMTP), `8025` (web UI)        | Yerel işlem e-postası alıcısı                                |

> MinIO bağlantı noktası `9000` tarayıcı tarafından erişilebilir olmalıdır çünkü yüklenen varlıklar (avatarlar, ekran görüntüleri) doğrudan `S3_PUBLIC_URL=http://localhost:9000/intlayer` adresinden yüklenir.

---

## Ortam değişkenleri

### Gerekli

| Variable               | Example                      | Description                                                                                                                                                          |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas kullanıcısı                                                                                                                                            |
| `DB_MDP`               | _(şifreniz)_                 | MongoDB Atlas şifresi                                                                                                                                                |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster host'u (`mongodb+srv://` URI'de kullanılır)                                                                                                    |
| `BETTER_AUTH_SECRET`   | _(generated)_                | Session imzalama için 32-byte secret                                                                                                                                 |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Bundled MinIO için secret                                                                                                                                            |
| `RESEND_API_KEY`       | _(your key)_                 | Resend aracılığıyla işlemsel e-posta. Global SMTP mailer'ı yapılandırmadığınız sürece ilk çalıştırma kurulumu için gereklidir (bkz. [Global mailer](#global-mailer)) |

### Gerekli (otomatik oluşturulur veya istenir)

| Değişken               | Örnek                                           | Açıklama                                                   |
| ---------------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | Çalışma zamanı ortamı                                      |
| `PORT`                 | `3100`                                          | Backend dinleme portu                                      |
| `BACKEND_URL`          | `http://localhost:3100`                         | Backend API'sinin genel URL'si                             |
| `APP_URL`              | `http://localhost:3000`                         | Kontrol panelinin genel URL'si                             |
| `DOMAIN`               | `localhost`                                     | Çerez alanı                                                |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | Tam MongoDB bağlantı URI'si                                |
| `REDIS_URL`            | `redis://redis:6379`                            | Redis bağlantı URL'si                                      |
| `BETTER_AUTH_SECRET`   | _(oluşturuldu)_                                 | Oturum imzalamak için 32 baytlık gizli anahtar             |
| `MAIL_PROVIDER`        | `smtp`                                          | E-posta taşıma yöntemi: `smtp` veya `resend`               |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | SMTP ana bilgisayar adı (Mailpit kapsayıcı adı)            |
| `MAIL_SMTP_PORT`       | `1025`                                          | SMTP portu                                                 |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | Gönderen adresi                                            |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3 uyumlu uç nokta                                         |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | Tarayıcı varlık yüklemesi için genel URL                   |
| `S3_BUCKET_NAME`       | `intlayer`                                      | Kova adı                                                   |
| `S3_ACCESS_KEY_ID`     | _(oluşturuldu)_                                 | MinIO erişim anahtarı                                      |
| `S3_SECRET_ACCESS_KEY` | _(oluşturuldu)_                                 | MinIO gizli anahtarı                                       |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | Oluşturma zamanında kontrol paneline gömülü backend URL'si |
| `VITE_DOMAIN`          | `localhost`                                     | Oluşturma zamanında kontrol paneline gömülü alan adı       |

### İsteğe Bağlı (yokluğunda özellikler sorunsuz şekilde bozulur)

| Değişken                                                 | Özellik                                                                     |
| -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | AI destekli çeviri ve içerik denetimi                                       |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Faturalandırma ve abonelik yönetimi                                         |
| `RESEND_API_KEY`                                         | Resend aracılığıyla işlemsel e-posta (ayarlanırsa Mailpit'i geçersiz kılar) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth girişi                                                         |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth girişi                                                         |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth girişi                                                         |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth girişi                                                      |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | LinkedIn OAuth girişi                                                       |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Atlassian OAuth girişi                                                      |

### Global mailer

Varsayılan olarak, tüm işlemsel e-postalar Resend üzerinden `RESEND_API_KEY` kullanılarak gönderilir. Self-hosted dağıtımlar bunun yerine **tüm** e-postaları — şifre sıfırlamaları ve magic linkler gibi organizasyon dışı e-postalar dahil — ortam değişkenleriyle yapılandırılmış global bir mailer üzerinden yönlendirebilir.

Etkinleştirmek için `MAIL_PROVIDER` ayarlayın. Ayarlanmadığında, varsayılan Resend mailer kullanılır.

| Değişken             | Örnek                          | Açıklama                                                                          |
| -------------------- | ------------------------------ | --------------------------------------------------------------------------------- |
| `MAIL_PROVIDER`      | `smtp`                         | Global transport: `smtp` veya `resend`. Varsayılanları kullanmak için ayarlamayın |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Gönderen başlığı. Düz bir adres veya `Name <email>` formatını kabul eder          |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host (`MAIL_PROVIDER=smtp` olduğunda gerekli)                                |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (varsayılan `587`)                                                      |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Port `465` için `true` olarak ayarlayın                             |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP kullanıcı adı (isteğe bağlı; kimliği doğrulanmamış relayler için atlayın)    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP şifresi                                                                      |

> Öncelik: bir organizasyonun kendi mailer'ı (**Organization** panosundan yapılandırılmış) global mailer'dan daha yüksek önceliğe sahiptir ve bu da varsayılan Resend anahtarından daha yüksek önceliğe sahiptir.

---

## Intlayer projenizi bağlama

Yığın çalışmaya başladıktan sonra, projenizi `intlayer.org` yerine kendi barındırılan backend ve kontrol paneline yönlendirin.

### Proje yapılandırması

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Kendi sunucunuzda barındırılan CMS kontrol panelinin URL'si.
     * Varsayılan: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // örn. http://localhost:3000

    /**
     * Kendi sunucunuzda barındırılan backend API'sinin URL'si.
     * Varsayılan: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // örn. http://localhost:3100
  },
};

export default config;
```

Projenizin `.env` dosyasında ortam değişkenlerini ayarlayın:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

Kendi barındırılan kontrol panelinizde **Projeler → Erişim Anahtarları** altında `http://localhost:3000/projects` adresinde erişim kimlik bilgileri oluşturun.

### `@intlayer/api` SDK

`@intlayer/api` SDK'sını programlı olarak kullanırken, `backendURL`'i açıkça geçirin:

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

## Yükseltme

Bu, en son görüntüleri çeker ve kapsayıcıları `docker compose pull && docker compose up -d` ile yeniden başlatır. Mevcut birimler (`mongo-data`, `redis-data`, `minio-data`) korunur; veri kaybı olmaz.

```sh
docker compose pull
docker compose up -d
```

---

## Yedekleme ve Geri Yükleme

Tüm kalıcı veriler, üç adet adlandırılmış Docker biriminde bulunur.

### Yedekleme

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

### Geri Yükleme

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# redis-data ve minio-data için tekrarlayın
```

---

## Sınırlamalar

- **MongoDB harici (Atlas) olmalıdır.** Backend yalnızca `mongodb+srv://` üzerinden bağlanır (`DB_ID` / `DB_MDP` / `DB_CLUSTER` öğesinden oluşturulur), bu nedenle düz `mongodb://host:27017` — konteyner'ın kendi paketlenmiş `mongod` dahil — kullanılamaz. Bir MongoDB Atlas kümesi sağlayın.
- **Özel alan adı yok.** Tüm tarayıcıya yönelik `VITE_*` URL'leri derleme zamanında uygulamaya satır içine alınır ve yayınlanan görüntü `localhost` değerleriyle gemi. Pano şu adreste erişilmelidir: `http://localhost:3000`; bunu genel bir alan adında sunmak, görüntüyü hedef URL'ler ile yeniden oluşturmayı gerektiriyor ve kutudan hemen çıkar desteklenmiyor.
- **E-posta çalışan bir postacı gerektirir.** İlk çalıştırma kurulumu e-posta doğrulamasını uygular, bu nedenle `RESEND_API_KEY` veya bir [global SMTP postacısı](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) yapılandırılmalıdır. İlk yönetici oturum açtıktan sonra, her kuruluş panodan kendi SMTP veya Resend postacısını da yapılandırabilir.

---

## Sorun Giderme

### İlk Başlangıçta Backend Sürekli Çöküyor

Backend başlamadan önce MongoDB ve Redis'in sağlıklı olması gerekir. Compose dosyası `condition: service_healthy` ile `depends_on` kullanır. Tekrarlayan backend yeniden başlatmaları görüyorsanız, `mongo` ve `redis` sağlık kontrollerinin geçtiğinden emin olun:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

Log dosyasının üst kısmına yakın yerde `MongoDB connection error` (MongoDB bağlantı hatası) ifadesini arayın.

### Kontrol Paneli API'ye Ulaşamıyor

`VITE_BACKEND_URL`'in backend'e **tarayıcıdan** (Docker ağı değil) erişilebilen URL ile eşleştiğini doğrulayın. Backend portunu değiştirdiyseniz veya bir ters proxy eklediyseniz, kontrol paneli görüntüsünü yeniden oluşturun:

### MinIO Kovası Eksik

Eğer `minio-init` tek seferlik servisi çalışmadıysa (veya MinIO hazır olmadan önce çalıştıysa), kovayı manuel olarak oluşturun:

```sh
docker compose run --rm minio-init
```

---

## Faydalı Bağlantılar

- [Intlayer CMS belgeleri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md)
- [Yapılandırma referansı](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
