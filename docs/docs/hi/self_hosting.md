---
createdAt: 2026-06-30
updatedAt: 2026-09-21
title: Intlayer सेल्फ-होस्टिंग
description: "अपने स्वयं के बुनियादी ढांचे पर Intlayer चलाएं: एक डेस्कटॉप ऐप, एकल ऑल-इन-वन Docker कंटेनर, या एक स्केलेबल Docker Compose स्टैक के रूप में। किसी Intlayer Cloud खाते की आवश्यकता नहीं है।"
keywords:
  - सेल्फ-होस्टिंग
  - Docker
  - Docker Compose
  - डेस्कटॉप ऐप
  - Intlayer
  - CMS
  - इंस्टॉलेशन
  - इंफ्रास्ट्रक्चर
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# Intlayer सेल्फ-होस्टिंग

Intlayer आपके अपने बुनियादी ढांचे पर चल सकता है, किसी Intlayer Cloud खाते की आवश्यकता नहीं है। तीन सेटअप उपलब्ध हैं, जो सभी एक ही इंस्टॉलर (`install.sh`, Windows पर `install.ps1`, या `npx intlayer init infra`) द्वारा प्रबंधित होते हैं:

| Setup               | What it is                                                                       | Pick it for                                            |
| ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **डेस्कटॉप ऐप**     | macOS, Linux और Windows के लिए नेटिव डैशबोर्ड                                    | एक स्थानीय क्लाइंट, कुछ भी होस्ट करने की आवश्यकता नहीं |
| **ऑल-इन-वन Docker** | डैशबोर्ड, API, MongoDB, Redis और MinIO एक **एकल कंटेनर** में                     | परीक्षण और छोटे एकल-मशीन इंस्टॉलेशन                    |
| **Docker Compose**  | **प्रति सेवा एक कंटेनर**, प्रत्येक डेटास्टोर को प्रबंधित सेवा से बदला जा सकता है | प्रोडक्शन, स्केलिंग, प्रबंधित डेटाबेस                  |

## Table of Contents

<TOC/>

## प्रकाशित इमेज और पैकेज

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

तीनों इमेज एक ही [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) से बनाई गई हैं और प्रत्येक रिलीज़ पर प्रकाशित की जाती हैं। Compose स्टैक आधिकारिक `mongo:8`, `redis:8-alpine` और `quay.io/minio/minio` इमेज भी खींचता है।

## सेटअप

इंस्टॉलर पूछता है कि आप कौन सा सेटअप चाहते हैं, पूर्वापेक्षाओं की जाँच करता है (Docker स्थापित करने की पेशकश करता है), पहले से उत्पन्न रहस्यों के साथ पर्यावरण फ़ाइल लिखता है, और इमेज खींचता है। यह अपने आप कुछ भी शुरू नहीं करता है: Docker मोड को पहले मेलर की आवश्यकता होती है, इसलिए यह चलाने के लिए कमांड प्रिंट करके समाप्त होता है। इसे फिर से चलाना सुरक्षित है: मौजूदा पर्यावरण फ़ाइल कभी भी अधिलेखित नहीं होती है, जो इसे अपग्रेड पथ भी बनाती है।

<Tabs group="mode">
<Tab label="डेस्कटॉप ऐप" value="desktop">

Tauri के साथ निर्मित एक नेटिव एप्लिकेशन के रूप में Intlayer डैशबोर्ड। यह Intlayer Cloud (`https://app.intlayer.org`) में साइन इन करता है, इसलिए कुछ भी होस्ट करने की आवश्यकता नहीं है। जब आप ब्राउज़र टैब के बजाय स्थानीय क्लाइंट चाहते हैं तो यह सही विकल्प है।

### इंस्टॉल करें

इंस्टॉलर आपके OS और CPU के लिए उपयुक्त पैकेज डाउनलोड करता है और उसे खोलता है (macOS), इंस्टॉल करता है (Linux पर `dpkg` / `rpm`), या सेटअप विज़ार्ड शुरू करता है (Windows)। आप इसे [रिलीज़ पेज](https://github.com/aymericzip/intlayer/releases/latest) से मैन्युअल रूप से भी डाउनलोड कर सकते हैं।

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

### आवश्यकताएं

- **Node.js**: ऐप डैशबोर्ड सर्वर को एम्बेड करता है और इसे मशीन के `node` बाइनरी के साथ शुरू करता है। यदि ऐप नहीं खुलता है तो इसे [nodejs.org](https://nodejs.org) से इंस्टॉल करें।

> प्रकाशित डेस्कटॉप बिल्ड Intlayer Cloud बैकएंड से संचार करता है। इसे सेल्फ-होस्टेड बैकएंड पर इंगित करने के लिए ऐप को आपके API पर सेट `VITE_BACKEND_URL` के साथ फिर से बनाने की आवश्यकता होती है, [सीमाएँ](#limitations) देखें।

</Tab>
<Tab label="ऑल-इन-वन Docker" value="docker">

सब कुछ एक ही `intlayer/cms-all` कंटेनर के अंदर चलता है, जिसकी देखरेख [s6-overlay](https://github.com/just-containers/s6-overlay) द्वारा की जाती है, जिसमें प्रत्येक डेटास्टोर एक ही वॉल्यूम पर बना रहता है।

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

| सेवा        | होस्ट पोर्ट                 | उद्देश्य                                            |
| ----------- | --------------------------- | --------------------------------------------------- |
| **app**     | `3000`                      | डैशबोर्ड (CMS UI)                                   |
| **backend** | `3100`                      | REST API (`/health` एंडपॉइंट)                       |
| **mongo**   | आंतरिक                      | MongoDB 8, एकल-नोड प्रतिकृति सेट `rs0`              |
| **redis**   | आंतरिक                      | कार्य कतारें (BullMQ) और कैशिंग                     |
| **minio**   | `9000` (S3), `9001` (कंसोल) | अवतार और स्क्रीनशॉट के लिए S3-संगत ऑब्जेक्ट स्टोरेज |

बूट क्रम s6 निर्भरताओं द्वारा प्रबंधित किया जाता है (`mongod` → प्रतिकृति-सेट आरंभ, `minio` → बकेट निर्माण, फिर `backend`, फिर `app`), और सेवाएं समाप्त होने पर पुनरारंभ होती हैं, इसलिए पहला बूट स्वचालित रूप से ठीक हो जाता है।

### पूर्वापेक्षाएँ

- **Docker** ≥ 24: इंस्टॉलर इसे इंस्टॉल करने की पेशकश करता है (Linux पर [get.docker.com](https://get.docker.com) के माध्यम से, macOS पर Homebrew)। Windows पर, पहले [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2 बैकएंड) इंस्टॉल करें।
- होस्ट पर पोर्ट `3000`, `3100`, `9000` और `9001` खाली होने चाहिए। MinIO `9000` ब्राउज़र द्वारा सुलभ रहना चाहिए क्योंकि संपत्तियां सीधे `S3_PUBLIC_URL` से लोड होती हैं।
- एक मेलर: [Resend](https://resend.com) API कुंजी या एक SMTP रिले।

### 1. इंस्टॉल करें

उत्पन्न `BETTER_AUTH_SECRET` और `S3_SECRET_ACCESS_KEY` के साथ `./intlayer.env` लिखता है और `intlayer/cms-all:latest` खींचता है।

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

CLI इंस्टॉलर चलाता है जो अन्य टैब में दिखाए गए `docker run …` कमांड को प्रिंट करता है। मेलर को कॉन्फ़िगर करने के बाद इसे अपने टर्मिनल में पेस्ट करें।

</Tab>
</Tabs>

### 2. मेलर कॉन्फ़िगर करें

`intlayer.env` खोलें और Resend **या** SMTP भरें (विवरण के लिए [ग्लोबल मेलर](#global-mailer) देखें):

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

### 3. चलाएं

यह इंस्टॉलर द्वारा प्रिंट किया गया रन कमांड है:

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

CLI इंस्टॉलर चलाता है जो अन्य टैब में दिखाए गए `docker run …` कमांड को प्रिंट करता है। मेलर को कॉन्फ़िगर करने के बाद इसे अपने टर्मिनल में पेस्ट करें।

</Tab>
</Tabs>

**http://localhost:3000** खोलें और [प्रथम-रन सेटअप](#first-run-setup) का पालन करें। पहला बूट प्रतिकृति सेट और बकेट को इनिशियलाइज़ करता है, इसलिए इसे एक मिनट का समय दें।

### बैकअप और अपग्रेड

सभी स्थिति `intlayer-data` वॉल्यूम (`/data/mongo`, `/data/redis`, `/data/minio`) में रखी जाती है।

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

अपग्रेड करने के लिए, इंस्टॉलर को फिर से चलाएं (यह नवीनतम इमेज खींचता है और `intlayer.env` रखता है), फिर `docker rm -f intlayer` चलाएं और स्टार्ट कमांड को फिर से चलाएं। बंडल किए गए के बजाय प्रबंधित MongoDB का उपयोग करने के लिए, `intlayer.env` में `MONGODB_URI` सेट करें।

</Tab>
<Tab label="Docker Compose" value="compose">

एक निजी Compose नेटवर्क पर प्रति सेवा एक कंटेनर। डैशबोर्ड और API प्रकाशित `intlayer/cms-frontend` और `intlayer/cms-backend` इमेज का उपयोग करते हैं; डेटास्टोर आधिकारिक `mongo`, `redis` और `minio` इमेज का उपयोग करते हैं।

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

| सेवा         | इमेज                    | भूमिका                                                                               |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------ |
| `app`        | `intlayer/cms-frontend` | `:3000` पर डैशबोर्ड; बैकएंड के स्वस्थ होने की प्रतीक्षा करता है                      |
| `backend`    | `intlayer/cms-backend`  | Chromium के साथ `:3100` पर API; Mongo, Redis और MinIO बकेट की प्रतीक्षा करता है      |
| `mongo`      | `mongo:8`               | एकल-नोड प्रतिकृति सेट `rs0`, अपने स्वयं के स्वास्थ्य परीक्षण द्वारा प्रारंभ किया गया |
| `redis`      | `redis:8-alpine`        | कतारें और कैशिंग, केवल-जोड़ें (append-only) दृढ़ता                                   |
| `minio`      | `quay.io/minio/minio`   | `:9000` पर S3 स्टोरेज, `:9001` पर कंसोल                                              |
| `minio-init` | `quay.io/minio/mc`      | वन-शॉट: बकेट और उसकी अज्ञात डाउनलोड नीति बनाता है                                    |

डेटा `intlayer_mongo-data`, `intlayer_redis-data` और `intlayer_minio-data` वॉल्यूम में संग्रहीत किया जाता है। सेवा कनेक्शन (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, सर्वर-साइड रेंडरिंग के लिए आंतरिक बैकएंड URL) compose फ़ाइल में तय होते हैं और `.env` पर प्राथमिकता लेते हैं, जो केवल रहस्यों और वैकल्पिक एकीकरणों को रखता है।

### पूर्वापेक्षाएँ

- **Docker** ≥ 24 (Compose प्लगइन के साथ): इंस्टॉलर इसे Linux और macOS पर स्थापित करने की पेशकश करता है। Windows पर, पहले [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (WSL 2 बैकएंड) स्थापित करें।
- होस्ट पर पोर्ट `3000`, `3100`, `9000` और `9001` खाली होने चाहिए।
- एक मेलर: [Resend](https://resend.com) API कुंजी या एक SMTP रिले।

### 1. इंस्टॉल करें

उत्पन्न रहस्यों के साथ `docker-compose.yml` और एक `.env` को `./intlayer/` में लिखता है और इमेज खींचता है।

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

### 2. मेलर कॉन्फ़िगर करें

ऑल-इन-वन कंटेनर की तरह ही `intlayer/.env` में Resend **या** SMTP भरें ([ग्लोबल मेलर](#global-mailer) देखें)।

### 3. चलाएं

```sh
cd intlayer && docker compose up -d
```

**http://localhost:3000** खोलें और [प्रथम-रन सेटअप](#first-run-setup) का पालन करें।

### प्रबंधित डेटास्टोर

आप जिस सेवा को बदल रहे हैं उसे compose फ़ाइल से (और `backend` पर इसकी `depends_on` प्रविष्टि) हटा दें, और संबंधित चर को ओवरराइड करें:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

`S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` किसी भी S3-संगत प्रदाता के खिलाफ काम करते हैं।

### स्केलिंग

`app` और `backend` स्टेटलेस हैं। लोड बैलेंसर के पीछे, निश्चित होस्ट पोर्ट मैपिंग को हटाने और सेवा नाम द्वारा प्रॉक्सी रूटिंग के साथ, `docker compose up -d --scale backend=3` काम करता है। पृष्ठभूमि कार्य Redis (BullMQ) के माध्यम से समन्वित होते हैं, इसलिए कई बैकएंड प्रतिकृतियां सुरक्षित रूप से कतारें साझा करती हैं।

### स्रोत से निर्माण

रिपॉजिटरी क्लोन से, एक ओवरराइड के साथ दो Intlayer सेवाओं को `image:` से `build:` पर स्विच करें:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

कस्टम डोमेन के लिए इमेज बनाते समय भी इसका उपयोग करें: निर्माण तर्क के रूप में `VITE_*` मान पास करें ([सीमाएँ](#limitations) देखें)।

### बैकअप और अपग्रेड

```sh
# Backup one volume (repeat for intlayer_redis-data and intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker start intlayer

# Upgrade, volumes are kept
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### इंस्टॉलर सेटिंग्स

`--mode` (या `INTLAYER_MODE`) के बिना, इंस्टॉलर एक मेनू का संकेत देता है: `desktop`, `docker` (ऑल-इन-वन) या `compose`। यह कुछ पर्यावरण चर भी पढ़ता है; इन्हें `curl` के बजाय शेल में पास करें क्योंकि यह पाइप किया गया है:

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

> पोर्ट चर मैपिंग के केवल **होस्ट** पक्ष को बदलते हैं। प्रकाशित इमेज में `http://localhost:3000`, `http://localhost:3100` और `http://localhost:9000` डैशबोर्ड बंडल में संकलित होते हैं, इसलिए जब तक आप अपनी खुद की इमेज नहीं बनाते, तब तक डिफ़ॉल्ट रखें, [सीमाएँ](#limitations) देखें।

## प्रथम-रन सेटअप

एक नए इंस्टेंस (खाली डेटाबेस) पर डैशबोर्ड खोलने पर स्वचालित रूप से **`/init`** पर पुनर्निर्देशित किया जाएगा:

1. पहला खाता बनाएं। चूंकि उपयोगकर्ता संग्रह खाली है, इसलिए यह खाता स्वचालित रूप से **सुपर एडमिन** में पदोन्नत हो जाता है।
2. आपके Resend या SMTP रिले के माध्यम से एक सत्यापन ईमेल भेजा जाता है। ईमेल सत्यापन **अनिवार्य** है, यही कारण है कि शुरू करने से पहले एक मेलर कॉन्फ़िगर किया जाना चाहिए।
3. ईमेल में दिए गए लिंक पर क्लिक करें और साइन इन करें।

एक बार व्यवस्थापक मौजूद होने के बाद, `/init` सामान्य साइन-इन पृष्ठ पर पुनर्निर्देशित करता है।

## पर्यावरण चर

दोनों Docker मोड [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template) से उत्पन्न एक ही फ़ाइल (कंटेनर के लिए `intlayer.env`, Compose के लिए `.env`) पढ़ते हैं।

### आवश्यक

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### परिनियोजन द्वारा तय

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

Compose `app` सेवा अतिरिक्त रूप से `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100` प्राप्त करती है: ब्राउज़र `localhost:3100` पर API तक पहुँचता है, लेकिन सर्वर-साइड रेंडरिंग Compose नेटवर्क के अंदर चलती है और इसलिए इसे सेवा नाम का उपयोग करना चाहिए।

### वैकल्पिक (अनुपस्थित होने पर सुविधाएं सुचारू रूप से कार्य करती हैं)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### ग्लोबल मेलर

पासवर्ड रीसेट और मैजिक लिंक जैसे गैर-संगठन ईमेल सहित सभी लेन-देन संबंधी ईमेल दो वैश्विक ट्रांसपोर्ट में से एक से होकर गुजरते हैं:

- **Resend**: `RESEND_API_KEY` का उपयोग करके।
- **SMTP**: `MAIL_SMTP_*` चरों का उपयोग करके। जैसे ही `MAIL_SMTP_HOST` सेट होता है, SMTP का उपयोग किया जाता है और `RESEND_API_KEY` को अनदेखा कर दिया जाता है।

`MAIL_PROVIDER` केवल तभी आवश्यक होता है जब दोनों कॉन्फ़िगर होने पर किसी एक ट्रांसपोर्ट को बाध्य करना हो (उदाहरण के लिए SMTP होस्ट मौजूद होने पर Resend रखने के लिए `MAIL_PROVIDER=resend`)।

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> प्राथमिकता क्रम: किसी संगठन का अपना मेलर (**संगठन** डैशबोर्ड से कॉन्फ़िगर किया गया) ग्लोबल मेलर को ओवरराइड करता है, और ग्लोबल मेलर डिफ़ॉल्ट Resend कुंजी को ओवरराइड करता है।

## अपने Intlayer प्रोजेक्ट को कनेक्ट करना

एक बार स्टैक चलने के बाद, अपने प्रोजेक्ट को `intlayer.org` के बजाय अपने सेल्फ-होस्टेड बैकएंड और डैशबोर्ड की ओर इंगित करने के लिए कॉन्फ़िगर करें।

### प्रोजेक्ट कॉन्फ़िगरेशन

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

अपने सेल्फ-होस्टेड डैशबोर्ड में **प्रोजेक्ट्स → एक्सेस कुंजियाँ** (`http://localhost:3000/projects`) पर एक्सेस क्रेडेंशियल बनाएं।

### `@intlayer/api` SDK

प्रोग्रामेटिक रूप से `@intlayer/api` SDK का उपयोग करते समय, `backendURL` को स्पष्ट रूप से पास करें:

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

## सीमाएँ

- **कोई कस्टम डोमेन और कोई पोर्ट रीमैपिंग नहीं।** सभी ब्राउज़र-सामना करने वाले `VITE_*` URL निर्माण के समय डैशबोर्ड में इनलाइन होते हैं, और प्रकाशित इमेज (और डेस्कटॉप ऐप) `localhost` / Intlayer Cloud मानों के साथ आते हैं। डैशबोर्ड को `http://localhost:3000` पर, API को `:3100` पर और MinIO को `:9000` पर एक्सेस किया जाना चाहिए। इसे सार्वजनिक डोमेन पर होस्ट करना, या डेस्कटॉप ऐप को सेल्फ-होस्टेड बैकएंड पर इंगित करना, लक्ष्य URL के साथ पुनर्निर्माण की आवश्यकता होती है (`docker/selfhost/Dockerfile` पर `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` के साथ, या `docker-compose.build.yml` के माध्यम से) और यह डिफ़ॉल्ट रूप से समर्थित नहीं है।
- **ईमेल के लिए एक कार्यशील मेलर की आवश्यकता होती है।** प्रथम-रन सेटअप ईमेल सत्यापन लागू करता है, इसलिए या तो `RESEND_API_KEY` या [SMTP रिले](#global-mailer) (`MAIL_SMTP_*`) कॉन्फ़िगर किया जाना चाहिए। पहले एडमिन के साइन इन करने के बाद, प्रत्येक संगठन डैशबोर्ड से अपना स्वयं का SMTP या Resend मेलर भी कॉन्फ़िगर कर सकता है।
- **डेस्कटॉप ऐप को अपने एम्बेडेड सर्वर को शुरू करने के लिए मशीन पर Node.js की आवश्यकता होती है।**

## उपयोगी लिंक्स

- [Intlayer CMS दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)
- [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [डेस्कटॉप ऐप रिलीज़](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), GHCR मिरर: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml`, `.env.template`
