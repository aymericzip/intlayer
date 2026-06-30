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

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Yükleyici, bir `docker-compose.yml` ve bir `.env` indirir, gerekli gizli anahtarları otomatik olarak oluşturur ve tüm kapsayıcıları `docker compose up -d` ile başlatır.

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

---

## Hızlı Başlangıç

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Yükleyicinin yaptığı işlemler:

1. `docker` ve `docker compose`'un mevcut olduğunu kontrol eder.
2. `docker-compose.yml` ve `.env.example` dosyalarını `./intlayer/` dizinine indirir.
3. `.env` dosyası mevcut değilse, örneği kopyalar ve `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID` ve `S3_SECRET_ACCESS_KEY` için `openssl rand` aracılığıyla rastgele gizli anahtarlar oluşturur.
4. `docker compose pull` + `docker compose up -d` komutlarını çalıştırır.
5. URL'leri yazdırır: kontrol paneli `:3000`, API `:3100`, e-posta arayüzü `:8025`, MinIO konsolu `:9001`.

Yığın çalışmaya başladıktan sonra **http://localhost:3000** adresini açın ve ilk hesabınızı oluşturun.

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

Dahili bağlantı noktaları (mongo, redis) varsayılan olarak ana bilgisayara açık değildir.

> MinIO bağlantı noktası `9000` tarayıcı tarafından erişilebilir olmalıdır çünkü yüklenen varlıklar (avatarlar, ekran görüntüleri) doğrudan `S3_PUBLIC_URL=http://localhost:9000/intlayer` adresinden yüklenir.

---

## Ortam Değişkenleri

Yükleyici, kullanıma hazır bir `.env` dosyası oluşturur. Aşağıdaki tablo her değişkeni açıklar.

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

Mevcut bir dağıtım üzerinde yükleyiciyi yeniden çalıştırmak, kademeli bir yükseltme gerçekleştirir:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Bu, en son görüntüleri çeker ve kapsayıcıları `docker compose pull && docker compose up -d` ile yeniden başlatır. Mevcut birimler (`mongo-data`, `redis-data`, `minio-data`) korunur; veri kaybı olmaz.

Manuel olarak `./intlayer/` dizini içinden yükseltme yapmak için:

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

## Ters Proxy Kullanımı (Nginx / Caddy)

Üretim dağıtımları için, uygulama ve backend kapsayıcılarının önüne doğrudan açmak yerine bir ters proxy yerleştirin.

### Nginx örneği

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

Aşağıdaki `.env` değişkenlerini genel alan adlarınızla eşleşecek şekilde güncelleyin:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> `VITE_*` değişkenleri oluşturma zamanında kontrol paneli görüntüsüne gömülür. Görüntü oluşturulduktan sonra bunları değiştirirseniz, `app` görüntüsünü yeniden oluşturmanız (`docker compose build app`) veya çalışma zamanı yapılandırma enjeksiyonu kullanmanız gerekir.

---

## Sorun Giderme

### İlk Başlangıçta Backend Sürekli Çöküyor

Backend başlamadan önce MongoDB ve Redis'in sağlıklı olması gerekir. Compose dosyası `condition: service_healthy` ile `depends_on` kullanır. Tekrarlayan backend yeniden başlatmaları görüyorsanız, `mongo` ve `redis` sağlık kontrollerinin geçtiğinden emin olun:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### Kontrol Paneli API'ye Ulaşamıyor

`VITE_BACKEND_URL`'in backend'e **tarayıcıdan** (Docker ağı değil) erişilebilen URL ile eşleştiğini doğrulayın. Backend portunu değiştirdiyseniz veya bir ters proxy eklediyseniz, kontrol paneli görüntüsünü yeniden oluşturun:

```sh
docker compose build app
docker compose up -d app
```

### E-posta Gönderilmiyor

Varsayılan olarak, tüm giden e-postalar Mailpit tarafından yakalanır. Gönderilen mesajları görmek için `http://localhost:8025` adresini açın. Gerçek e-posta göndermek için `.env` dosyasında `MAIL_PROVIDER=resend` ve `RESEND_API_KEY=<anahtarınız>` ayarlayın, ardından backend'i yeniden başlatın:

```sh
docker compose restart backend
```

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
