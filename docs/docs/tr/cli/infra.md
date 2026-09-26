---
createdAt: 2026-09-21
updatedAt: 2026-09-21
priority: 5
title: CLI - Init Infra
description: Masaüstü uygulamasını yüklemek veya Intlayer CMS'yi Docker (hepsi bir arada kapsayıcı veya Docker Compose yığını) ile kendi sunucunuzda barındırmak için Intlayer CLI init infra komutunun nasıl kullanılacağını öğrenin.
keywords:
  - CLI
  - Altyapı
  - Kendi sunucunda barındırma
  - Masaüstü uygulaması
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
    changes: "init infra komutunu ekle"
author: aymericzip
---

# Intlayer CLI Init Infra Komutu

## Açıklama

`init infra` komutu makinenizde Intlayer altyapısını kurar. Platformunuz için barındırılan yükleyiciyi indirir (macOS / Linux'ta `https://intlayer.org/install.sh`, Windows'ta `https://intlayer.org/install.ps1`) ve terminalinize bağlı olarak çalıştırır, böylece yükleyicinin menüsü ve ilerleme çıktısı doğrudan size ulaşır.

Yükleyici, Intlayer'ı nasıl çalıştırmak istediğinizi sorar:

- **Masaüstü uygulaması**: İşletim sisteminiz ve işlemciniz için yerel gösterge panelini indirir ve açar veya yükler. Masaüstü sürümü Intlayer Cloud arka ucuyla iletişim kurar.
- **Hepsi bir arada Docker**: Tek bir birim tarafından desteklenen tek bir kapsayıcıda gösterge paneli + API + MongoDB + Redis + MinIO. Oluşturulan gizli anahtarlarla birlikte `./intlayer.env` dosyasını yazar ve `intlayer/cms-all` imajını çeker.
- **Docker Compose**: Ölçeklenebilir kendi sunucunuzda barındırma için hizmet başına bir kapsayıcı. `./intlayer/` dizinine `docker-compose.yml` ve `.env` yazar ve imajları çeker.

Barındırılan yükleyici kurulum akışının tek doğruluk kaynağıdır: CLI aynı adımları yeniden uygulamak yerine onu çalıştırır, bu nedenle `npx intlayer init infra` ve `curl -fsSL https://intlayer.org/install.sh | sh` tamamen aynı işlemi yapar.

## Kullanım

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

Aynı adım, `npx intlayer init --interactive` kontrol listesinde **Altyapı (masaüstü uygulaması / kendi sunucunda barındırma)** altında da sunulur.

## Seçenekler

- `-m, --mode <mode>` - İsteğe bağlı. Yükleyici menüsünü atlayıp doğrudan bir modu çalıştırır. Kabul edilen değerler: `desktop`, `docker` (hepsi bir arada) veya `compose`. Diğer değerler kabul edilen modları listeleyen bir hatayla sonlanır.

## Örnekler

### Modu etkileşimli olarak seçin

```bash
npx intlayer init infra
```

### Masaüstü uygulamasını yükleyin

```bash
npx intlayer init infra --mode desktop
```

### Hepsi bir arada kapsayıcı ile kendi sunucunuzda barındırın

```bash
npx intlayer init infra --mode docker
```

### Docker Compose ile kendi sunucunuzda barındırın

```bash
npx intlayer init infra --mode compose
```

## Örnek çıktı

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

## Yükleyici ayarları

Yükleyici, CLI'nin değiştirmeden ilettiği birkaç ortam değişkenini okur. Komutu çalıştırmadan önce bunları kabuğunuzda tanımlayın:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| Değişken                  | Varsayılan                | Uygulandığı Yer | Açıklama                                                      |
| ------------------------- | ------------------------- | --------------- | ------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(sorulur)_               | hepsi           | `desktop`, `docker` veya `compose`, `--mode` ile aynı         |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop         | Uygulama yükleyicisinin kaydedildiği yer                      |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker          | Çekilecek hepsi bir arada imaj                                |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker          | Ortam dosyasının yazılacağı yer                               |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker          | Kapsayıcı adı                                                 |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker          | `/data` konumuna bağlanan adlandırılmış birim                 |
| `INTLAYER_APP_PORT`       | `3000`                    | docker          | Gösterge paneli için ana bilgisayar bağlantı noktası          |
| `INTLAYER_API_PORT`       | `3100`                    | docker          | API için ana bilgisayar bağlantı noktası                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker          | MinIO S3 API için ana bilgisayar bağlantı noktası             |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker          | MinIO konsolu için ana bilgisayar bağlantı noktası            |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose         | `docker-compose.yml` ve `.env` dosyalarının yazıldığı yer     |
| `INTLAYER_SELFHOST_REF`   | `main`                    | ikisi de        | Compose dosyası ve ortam şablonunun getirildiği Git referansı |

> Bağlantı noktası değişkenleri eşlemenin yalnızca **ana bilgisayar (host)** tarafını değiştirir. Yayınlanan imajlarda gösterge paneli paketinde `http://localhost:3000`, `http://localhost:3100` ve `http://localhost:9000` derlenmiştir; bu nedenle kendi imajlarınızı oluşturmadığınız sürece varsayılan değerleri koruyun: [kendi sunucunuzda barındırma kılavuzuna](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md#limitations) bakın.

## Gereksinimler

- **Masaüstü uygulaması** [Node.js](https://nodejs.org) gerektirir: Uygulama gösterge paneli sunucusunu barındırır ve makinenin kendi `node` ikili dosyasıyla başlatır.
- **Docker modları** [Docker](https://docs.docker.com/get-docker/) (Windows'ta WSL 2 arka uçlu Docker Desktop) gerektirir. Compose modu ayrıca `docker compose` eklentisine ihtiyaç duyar.

## Notlar

- Komutu yeniden çalıştırmak güvenlidir: Mevcut bir ortam dosyasının üzerine asla yazılmaz, bu nedenle bir yükseltme yolu olarak da çalışır (yükleyici en son imajları çeker ve gizli anahtarlarınızı korur).
- Yükleyici geçici bir dizine indirilir ve sonuç ne olursa olsun çıktığında silinir.
- Komutun çıkış kodu yükleyicininkidir. İndirme işlemi başarısız olursa, CLI yükleyiciyi doğrudan çalıştırabilmeniz için eşdeğer `curl … | sh` (veya `irm … | iex`) komutunu yazdırır.
- Docker modlarının oturum açma e-postalarını gönderebilmesi için yine de bir posta ileticisine ihtiyacı vardır. Yükleyici tamamlandıktan sonra oluşturulan ortam dosyasında Resend veya SMTP yapılandırın: bkz. [Global Posta Sunucusu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md#global-mailer).

## İlgili Bağlantılar

- [Kendi sunucunuzda barındırma kılavuzu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/self_hosting.md) - Mimari, ilk çalıştırma adımları ve her modun sınırlamaları
- [Intlayer'ı Başlat](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/cli/init.md) - Üst `init` komutu ve etkileşimli kontrol listesi
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/intlayer_CMS.md) - Yeni yüklediğiniz gösterge panelinin yetenekleri
