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

इंटलेयर पूरी तरह से आपके अपने इंफ्रास्ट्रक्चर पर चल सकता है - इसके लिए इंटलेयर क्लाउड खाते की आवश्यकता नहीं है। एक ही कमांड एक उत्पादन-तैयार स्टैक को बूट करता है:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

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

## पूर्व-आवश्यकताएँ

- **डॉकर** ≥ 24 और **डॉकर कंपोज** ≥ v2। यदि इनमें से कोई भी गायब है, तो इंस्टॉलर इंस्टॉल लिंक प्रिंट करता है और बाहर निकल जाता है।
- होस्ट पर पोर्ट `3000`, `3100`, `8025`, `9000`, और `9001` उपलब्ध होने चाहिए।
- एक Linux या macOS होस्ट (या Windows पर WSL2)।

---

## त्वरित शुरुआत

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

इंस्टॉलर क्या करता है:

1.  जांचता है कि `docker` और `docker compose` मौजूद हैं या नहीं।
2.  `docker-compose.yml` और `.env.example` को `./intlayer/` में डाउनलोड करता है।
3.  यदि कोई `.env` मौजूद नहीं है, तो उदाहरण कॉपी करता है और `openssl rand` के माध्यम से `BETTER_AUTH_SECRET`, `S3_ACCESS_KEY_ID`, और `S3_SECRET_ACCESS_KEY` के लिए रैंडम सीक्रेट्स जेनरेट करता है।
4.  `docker compose pull` + `docker compose up -d` चलाता है।
5.  URL प्रिंट करता है: डैशबोर्ड `:3000`, API `:3100`, ईमेल UI `:8025`, MinIO कंसोल `:9001`।

स्टैक के चालू होने के बाद, **http://localhost:3000** खोलें और अपना पहला अकाउंट बनाएँ।

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

आंतरिक पोर्ट (mongo, redis) डिफ़ॉल्ट रूप से होस्ट पर एक्सपोज़ नहीं किए जाते हैं।

> MinIO पोर्ट `9000` ब्राउज़र द्वारा पहुँच योग्य होना चाहिए क्योंकि अपलोड किए गए एसेट (अवतार, स्क्रीनशॉट) सीधे `S3_PUBLIC_URL=http://localhost:9000/intlayer` से लोड होते हैं।

---

## एनवायरनमेंट वेरिएबल

इंस्टॉलर एक तैयार-से-उपयोग `.env` जेनरेट करता है। नीचे दी गई तालिका प्रत्येक वेरिएबल का वर्णन करती है।

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

### वैकल्पिक (अनुपस्थिति में फीचर धीरे-धीरे खराब हो जाते हैं)

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

मौजूदा डिप्लॉयमेंट पर इंस्टॉलर को फिर से चलाने से रोलिंग अपग्रेड होता है:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

यह नवीनतम इमेज को खींचता है और `docker compose pull && docker compose up -d` के साथ कंटेनरों को रीस्टार्ट करता है। मौजूदा वॉल्यूम (`mongo-data`, `redis-data`, `minio-data`) संरक्षित रहते हैं - कोई डेटा हानि नहीं होती है।

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

## रिवर्स प्रॉक्सी (Nginx / Caddy) का उपयोग करना

प्रोडक्शन डिप्लॉयमेंट के लिए, ऐप और बैकएंड कंटेनरों को सीधे एक्सपोज़ करने के बजाय उनके सामने एक रिवर्स प्रॉक्सी रखें।

### Nginx उदाहरण

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

अपने पब्लिक डोमेन से मेल खाने के लिए निम्नलिखित `.env` वेरिएबल को अपडेट करें:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> `VITE_*` वेरिएबल बिल्ड टाइम पर डैशबोर्ड इमेज में बेक किए जाते हैं। यदि आप इमेज बनने के बाद उन्हें बदलते हैं, तो आपको `app` इमेज (`docker compose build app`) को फिर से बनाना होगा या रनटाइम कॉन्फ़िग इंजेक्शन का उपयोग करना होगा।

---

## समस्या निवारण

### पहली शुरुआत में बैकएंड क्रैश-लूप करता है

बैकएंड शुरू होने से पहले MongoDB और Redis स्वस्थ होने चाहिए। कंपोज़ फ़ाइल `condition: service_healthy` के साथ `depends_on` का उपयोग करती है। यदि आप बार-बार बैकएंड रीस्टार्ट देखते हैं, तो जांचें कि `mongo` और `redis` हेल्थचेक पास हो गए हैं या नहीं:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### डैशबोर्ड API तक नहीं पहुँच सकता

सत्यापित करें कि `VITE_BACKEND_URL` उस URL से मेल खाता है जहाँ बैकएंड **ब्राउज़र** से (डॉकर नेटवर्क से नहीं) पहुँच योग्य है। यदि आपने बैकएंड पोर्ट बदला है या एक रिवर्स प्रॉक्सी जोड़ा है, तो डैशबोर्ड इमेज को फिर से बनाएँ:

```sh
docker compose build app
docker compose up -d app
```

### ईमेल नहीं भेजा जा रहा है

डिफ़ॉल्ट रूप से, सभी आउटबाउंड ईमेल मेलपिट द्वारा कैप्चर किए जाते हैं। भेजे गए संदेशों को देखने के लिए `http://localhost:8025` खोलें। वास्तविक ईमेल भेजने के लिए, `.env` में `MAIL_PROVIDER=resend` और `RESEND_API_KEY=<your-key>` सेट करें, फिर बैकएंड को रीस्टार्ट करें:

```sh
docker compose restart backend
```

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
