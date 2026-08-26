---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: इंटलेयर को सेल्फ-होस्ट करना
description: एक ही कमांड से अपने स्वयं के इंफ्रास्ट्रक्चर पर एक पूर्ण इंटलेयर इंस्टेंस चलाएँ। इंटलेयर क्लाउड अकाउंट की कोई आवश्यकता नहीं है।
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

# इंटलेयर को सेल्फ-होस्ट करना

Intlayer आपके स्वयं के infrastructure पर चल सकता है। कोई Intlayer Cloud खाता आवश्यक नहीं है। एक single all-in-one Docker image dashboard, API, और स्थानीय datastores (Redis और MinIO) को bundle करता है जिसकी इसे आवश्यकता है, [s6-overlay](https://github.com/just-containers/s6-overlay) द्वारा supervised।

इंटलेयर पूरी तरह से आपके अपने इंफ्रास्ट्रक्चर पर चल सकता है - इसके लिए इंटलेयर क्लाउड खाते की आवश्यकता नहीं है। एक ही कमांड एक उत्पादन-तैयार स्टैक को बूट करता है:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

इंस्टॉलर Docker की जांच करता है (इसे इंस्टॉल करने की पेशकश करते हुए), `intlayer.env` फ़ाइल लिखता है जिसमें आपके सीक्रेट पहले से ही जेनरेट हो चुके होते हैं, और इमेज को पुल करता है। फिर यह आपको अपनी क्रेडेंशियल भरने के लिए कहता है और `docker run` कमांड प्रिंट करता है — [क्विक स्टार्ट](#quick-start) देखें।

इंस्टॉलर एक `docker-compose.yml` और एक `.env` डाउनलोड करता है, आवश्यक सीक्रेट्स को स्वतः जेनरेट करता है, और `docker compose up -d` के साथ सभी कंटेनरों को शुरू करता है।

## विषय-सूची

<TOC/>

---

## आर्किटेक्चर

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

क्रोमियम (Puppeteer स्क्रीनशॉट जनरेशन के लिए उपयोग किया जाता है) बैकएंड इमेज के अंदर बंडल किया गया है - किसी अलग कंटेनर की आवश्यकता नहीं है।

---

## त्वरित शुरुआत

1.  जांचता है कि `docker` और `docker compose` मौजूद हैं या नहीं।
2.  `docker-compose.yml` और `.env.example` को `./intlayer/` में डाउनलोड करता है।
3.  यदि कोई `.env` मौजूद नहीं है, तो उदाहरण कॉपी करता है और `openssl rand` के माध्यम से `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID`, और `S3_SECRET_ACCESS_KEY` के लिए रैंडम सीक्रेट्स जेनरेट करता है।
4.  `docker compose pull` + `docker compose up -d` चलाता है।
5.  URL प्रिंट करता है: डैशबोर्ड `:3000`, API `:3100`, ईमेल UI `:8025`, MinIO कंसोल `:9001`।

स्टैक के चालू होने के बाद, **http://localhost:3000** खोलें और अपना पहला अकाउंट बनाएँ।

---

## क्विक स्टार्ट

### 1. इंस्टॉलर चलाएँ

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

यह Docker इंस्टॉल है और चल रहा है, यह सत्यापित करता है, `./intlayer.env` को `BETTER_AUTH_SECRET` और `S3_SECRET_ACCESS_KEY` के साथ पहले से ही जेनरेट किए गए लिखता है, और इमेज को पुल करता है। यह कंटेनर शुरू नहीं करता है — बैकएंड आपके डेटाबेस क्रेडेंशियल्स के बिना बूट नहीं कर सकता।

इंस्टॉलर को फिर से चलाना सुरक्षित है: एक मौजूदा `intlayer.env` को कभी भी ओवरराइट नहीं किया जाता है, इसलिए यह अपग्रेड पथ के रूप में दोहरी भूमिका निभाता है।

### 2. अपनी साख भरें

`intlayer.env` खोलें और `TODO` से चिह्नित मानों को पूरा करें:

```sh fileName="intlayer.env"
DB_ID=<atlas-user>
DB_MDP=<atlas-password>
DB_CLUSTER=<cluster>.xxxxx.mongodb.net
RESEND_API_KEY=<your-resend-key>
```

फाइल में वैकल्पिक सुविधाओं के लिए comment किए गए ब्लॉक भी हैं — [SMTP mailer](#global-mailer), `OPENAI_API_KEY`, और OAuth providers। जो आपको चाहिए उसे uncomment करें।

> फाइल को `docker run --env-file` द्वारा पढ़ा जाता है, जो quotes को strip नहीं करता और `=` के बाद सब कुछ को मान के रूप में मानता है। bare values लिखें, और comments को उनकी अपनी lines पर रखें।

### 3. कंटेनर शुरू करें

यह वह कमांड है जो इंस्टॉलर समाप्त होने पर प्रिंट करता है:

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

फिर **http://localhost:3000** खोलें। पहली बूट डेटास्टोर को initialize करती है, इसलिए इसे एक मिनट दें।

> डैशबोर्ड `localhost` पर सर्व किया जाता है। [Limitations](#limitations) देखें — कस्टम डोमेन प्रकाशित image द्वारा समर्थित नहीं हैं।

### इंस्टॉलर सेटिंग्स

इंस्टॉलर कुछ environment variables को पढ़ता है। क्योंकि यह `sh` में piped है, उन्हें `curl` के बजाय shell में pass करें:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_ENV_FILE=./config/intlayer.env sh
```

| Variable                  | Default                                       | Description                     |
| ------------------------- | --------------------------------------------- | ------------------------------- |
| `INTLAYER_IMAGE`          | `ghcr.io/aymericzip/intlayer-selfhost:latest` | खींचने के लिए Image             |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`                              | env file लिखने के लिए जगह       |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                                    | Container का नाम                |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`                               | `/data` पर mounted named volume |
| `INTLAYER_APP_PORT`       | `3000`                                        | dashboard के लिए Host port      |
| `INTLAYER_API_PORT`       | `3100`                                        | API के लिए Host port            |
| `INTLAYER_S3_PORT`        | `9000`                                        | MinIO S3 API के लिए Host port   |
| `INTLAYER_CONSOLE_PORT`   | `9001`                                        | MinIO console के लिए Host port  |

> चार port variables केवल `docker run` command में printed mapping के **host** side को बदलते हैं। प्रकाशित image में `http://localhost:3000`, `http://localhost:3100` और `http://localhost:9000` build time पर dashboard bundle में compiled हैं, इसलिए उन्हें remapping करने से browser पुराने ports की ओर इशारा करता है। जब तक आप अपना खुद का image बिल्ड नहीं कर रहे हैं, तब तक defaults को रखें — [Limitations](#limitations) देखें।

---

## पहली बार सेटअप

एक नए instance (खाली डेटाबेस) पर, डैशबोर्ड खोलने से आप **`/init`** पृष्ठ पर रीडायरेक्ट हो जाते हैं:

1. पहला खाता बनाएँ। क्योंकि users collection खाली है, यह खाता स्वचालित रूप से **super admin** को प्रचारित किया जाता है।
2. एक सत्यापन ईमेल भेजा जाता है (Resend के माध्यम से)। ईमेल सत्यापन **अनिवार्य** है — यही कारण है कि `RESEND_API_KEY` को शुरू करने से पहले सेट किया जाना चाहिए।
3. ईमेल में लिंक पर क्लिक करें, फिर साइन इन करें।

एक बार admin मौजूद हो जाने पर, `/init` मानक साइन-इन पृष्ठ पर रीडायरेक्ट करता है।

---

## सेवाएँ

| सर्विस      | इमेज                                 | होस्ट पोर्ट(s)                 | उद्देश्य                                            |
| ----------- | ------------------------------------ | ------------------------------ | --------------------------------------------------- |
| **app**     | `apps/app/Dockerfile` से निर्मित     | `3000`                         | TanStack Start डैशबोर्ड (CMS UI)                    |
| **backend** | `apps/backend/Dockerfile` से निर्मित | `3100`                         | Fastify REST API (`/health` एंडपॉइंट)               |
| **mongo**   | `mongo:7`                            | आंतरिक                         | सिंगल-नोड रेप्लिका सेट (`rs0`)                      |
| **redis**   | `redis:7-alpine`                     | आंतरिक                         | जॉब क्यू (BullMQ) और कैशिंग (ioredis)               |
| **minio**   | `minio/minio`                        | `9000` (S3), `9001` (कंसोल)    | अवतार और स्क्रीनशॉट के लिए S3-संगत ऑब्जेक्ट स्टोरेज |
| **mailpit** | `axllent/mailpit`                    | `1025` (SMTP), `8025` (वेब UI) | लोकल ट्रांजैक्शनल ईमेल सिंक                         |

> MinIO पोर्ट `9000` ब्राउज़र द्वारा पहुँच योग्य होना चाहिए क्योंकि अपलोड किए गए एसेट (अवतार, स्क्रीनशॉट) सीधे `S3_PUBLIC_URL=http://localhost:9000/intlayer` से लोड होते हैं।

---

## Environment variables

### आवश्यक

| Variable               | Example                      | Description                                                                                                                                  |
| ---------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_ID`                | `intlayer`                   | MongoDB Atlas user                                                                                                                           |
| `DB_MDP`               | _(your password)_            | MongoDB Atlas password                                                                                                                       |
| `DB_CLUSTER`           | `cluster0.xxxxx.mongodb.net` | MongoDB Atlas cluster host (used in the `mongodb+srv://` URI)                                                                                |
| `BETTER_AUTH_SECRET`   | _(generated)_                | 32-byte secret for session signing                                                                                                           |
| `S3_SECRET_ACCESS_KEY` | _(generated)_                | Secret for the bundled MinIO                                                                                                                 |
| `RESEND_API_KEY`       | _(your key)_                 | Transactional email via Resend. Required for first-run setup unless you configure a global SMTP mailer (see [Global mailer](#global-mailer)) |

### आवश्यक (स्वतः जेनरेटेड या प्रॉम्प्टेड)

| वेरिएबल                | उदाहरण                                          | विवरण                                              |
| ---------------------- | ----------------------------------------------- | -------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | रनटाइम एनवायरनमेंट                                 |
| `PORT`                 | `3100`                                          | बैकएंड लिसनिंग पोर्ट                               |
| `BACKEND_URL`          | `http://localhost:3100`                         | बैकएंड API का पब्लिक URL                           |
| `APP_URL`              | `http://localhost:3000`                         | डैशबोर्ड का पब्लिक URL                             |
| `DOMAIN`               | `localhost`                                     | कुकी डोमेन                                         |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | पूर्ण MongoDB कनेक्शन URI                          |
| `REDIS_URL`            | `redis://redis:6379`                            | Redis कनेक्शन URL                                  |
| `BETTER_AUTH_SECRET`   | _(जेनरेटेड)_                                    | सेशन साइनिंग के लिए 32-बाइट सीक्रेट                |
| `MAIL_PROVIDER`        | `smtp`                                          | मेल ट्रांसपोर्ट: `smtp` या `resend`                |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | SMTP होस्टनेम (मेलपिट कंटेनर नाम)                  |
| `MAIL_SMTP_PORT`       | `1025`                                          | SMTP पोर्ट                                         |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | प्रेषक पता                                         |
| `S3_ENDPOINT`          | `http://minio:9000`                             | S3-संगत एंडपॉइंट                                   |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | ब्राउज़र एसेट लोडिंग के लिए पब्लिक URL             |
| `S3_BUCKET_NAME`       | `intlayer`                                      | बकेट नाम                                           |
| `S3_ACCESS_KEY_ID`     | _(जेनरेटेड)_                                    | MinIO एक्सेस की                                    |
| `S3_SECRET_ACCESS_KEY` | _(जेनरेटेड)_                                    | MinIO सीक्रेट की                                   |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | बिल्ड टाइम पर डैशबोर्ड में बेक किया गया बैकएंड URL |
| `VITE_DOMAIN`          | `localhost`                                     | बिल्ड टाइम पर डैशबोर्ड में बेक किया गया डोमेन      |

### Optional (features degrade gracefully when absent)

| Variable                                                 | Feature                                   |
| -------------------------------------------------------- | ----------------------------------------- |
| `OPENAI_API_KEY`                                         | AI-assisted translation and content audit |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | Billing and subscription management       |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth login                     |

### वैकल्पिक (अनुपस्थिति में फीचर धीरे-धीरे खराब हो जाते हैं)

डिफ़ॉल्ट रूप से, सभी transactional ईमेल `RESEND_API_KEY` का उपयोग करके Resend के माध्यम से भेजे जाते हैं। Self-hosted deployments इसके बजाय **प्रत्येक** ईमेल — non-organization ईमेल जैसे कि password resets और magic links सहित — को environment variables के साथ कॉन्फ़िगर किए गए global mailer के माध्यम से route कर सकते हैं।

`MAIL_PROVIDER` को सेट करें इसे सक्रिय करने के लिए। जब यह सेट नहीं है, तो डिफ़ॉल्ट Resend mailer का उपयोग किया जाता है।

| वेरिएबल                                                  | फीचर                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | AI-सहायता प्राप्त अनुवाद और कंटेंट ऑडिट                                       |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_*` | बिलिंग और सब्सक्रिप्शन प्रबंधन                                                |
| `RESEND_API_KEY`                                         | रीसेंड के माध्यम से ट्रांजैक्शनल ईमेल (सेट होने पर मेलपिट को ओवरराइड करता है) |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`               | GitHub OAuth लॉगिन                                                            |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`               | Google OAuth लॉगिन                                                            |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`               | GitLab OAuth लॉगिन                                                            |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`         | Microsoft OAuth लॉगिन                                                         |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`           | LinkedIn OAuth लॉगिन                                                          |
| `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET`         | Atlassian OAuth लॉगिन                                                         |

> प्राधिकार: एक संगठन का अपना mailer (**Organization** dashboard से कॉन्फ़िगर किया गया) global mailer को प्राथमिकता देता है, जो बदले में default Resend key को प्राथमिकता देता है।

---

## अपने इंटलेयर प्रोजेक्ट को कनेक्ट करना

एक बार जब स्टैक चल रहा हो, तो अपने प्रोजेक्ट को `intlayer.org` के बजाय सेल्फ-होस्टेड बैकएंड और डैशबोर्ड पर पॉइंट करें।

### प्रोजेक्ट कॉन्फ़िगरेशन

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * सेल्फ-होस्टेड CMS डैशबोर्ड का URL।
     * डिफ़ॉल्ट: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // उदाहरण के लिए http://localhost:3000

    /**
     * सेल्फ-होस्टेड बैकएंड API का URL।
     * डिफ़ॉल्ट: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // उदाहरण के लिए http://localhost:3100
  },
};

export default config;
```

अपने प्रोजेक्ट के `.env` में एनवायरनमेंट वेरिएबल सेट करें:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

अपने सेल्फ-होस्टेड डैशबोर्ड में `http://localhost:3000/projects` पर **प्रोजेक्ट्स → एक्सेस कीज़** के अंतर्गत एक्सेस क्रेडेंशियल बनाएँ।

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

---

## अपग्रेड करना

`./intlayer/` डायरेक्टरी के अंदर से मैन्युअल रूप से अपग्रेड करने के लिए:

```sh
docker compose pull
docker compose up -d
```

---

## बैकअप और रीस्टोर

सभी स्थायी डेटा तीन नामित डॉकर वॉल्यूम में रहते हैं।

### बैकअप

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

### रीस्टोर

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# redis-data और minio-data के लिए दोहराएँ
```

---

## सीमाएं

- **MongoDB बाहरी (Atlas) होना चाहिए।** बैकएंड केवल `mongodb+srv://` पर कनेक्ट करता है (जो `DB_ID` / `DB_MDP` / `DB_CLUSTER` से बनाया गया है), इसलिए एक सादा `mongodb://host:27017` — कंटेनर के अपने बंडल किए गए `mongod` सहित — का उपयोग नहीं किया जा सकता है। एक MongoDB Atlas क्लस्टर प्रदान करें।
- **कोई कस्टम डोमेन नहीं।** सभी ब्राउज़र-सामने वाले `VITE_*` URLs बिल्ड टाइम पर ऐप में इनलाइन किए जाते हैं, और प्रकाशित इमेज `localhost` मानों के साथ आती है। डैशबोर्ड को `http://localhost:3000` पर एक्सेस किया जाना चाहिए; इसे एक सार्वजनिक डोमेन पर सर्व करने के लिए इमेज को लक्ष्य URLs के साथत: फिर से बनाने की आवश्यकता होगी और इसे तुरंत समर्थित नहीं किया जाता है।
- **ईमेल को एक काम करने वाले मेलर की आवश्यकता है।** पहली बार सेटअप ईमेल सत्यापन को लागू करता है, इसलिए या तो `RESEND_API_KEY` या एक [global SMTP mailer](#global-mailer) (`MAIL_PROVIDER=smtp` + `MAIL_SMTP_*`) को कॉन्फ़िगर किया जाना चाहिए। पहले एडमिन साइन इन करने के बाद, प्रत्येक संगठन डैशबोर्ड से अपना स्वयं का SMTP या Resend मेलर भी कॉन्फ़िगर कर सकता है।

---

## समस्या निवारण

### पहली शुरुआत में बैकएंड क्रैश-लूप करता है

बैकएंड शुरू होने से पहले MongoDB और Redis स्वस्थ होने चाहिए। कंपोज़ फ़ाइल `condition: service_healthy` के साथ `depends_on` का उपयोग करती है। यदि आप बार-बार बैकएंड रीस्टार्ट देखते हैं, तो जांचें कि `mongo` और `redis` हेल्थचेक पास हो गए हैं या नहीं:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

लॉग के शीर्ष के पास `MongoDB connection error` खोजें।

### ईमेल नहीं भेजा जा रहा है

डिफ़ॉल्ट रूप से, सभी आउटबाउंड ईमेल मेलपिट द्वारा कैप्चर किए जाते हैं। भेजे गए संदेशों को देखने के लिए `http://localhost:8025` खोलें। वास्तविक ईमेल भेजने के लिए, `.env` में `MAIL_PROVIDER=resend` और `RESEND_API_KEY=<your-key>` सेट करें, फिर बैकएंड को रीस्टार्ट करें:

### MinIO बकेट गायब है

यदि `minio-init` वन-शॉट सर्विस नहीं चली (या MinIO के तैयार होने से पहले चली), तो बकेट को मैन्युअल रूप से बनाएँ:

```sh
docker compose run --rm minio-init
```

---

## उपयोगी लिंक

- [इंटलेयर सीएमएस डॉक्यूमेंटेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)
- [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [सीएमएस SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
