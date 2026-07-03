---
createdAt: 2026-06-30
updatedAt: 2026-06-30
title: استضافة Intlayer ذاتياً
description: قم بتشغيل نسخة كاملة من Intlayer على بنيتك التحتية الخاصة بأمر واحد. لا حاجة لحساب Intlayer Cloud.
keywords:
  - Self-Hosting
  - Docker
  - Docker Compose
  - Intlayer
  - CMS
  - تثبيت
  - بنية تحتية
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# استضافة Intlayer ذاتياً

يمكن تشغيل Intlayer بالكامل على بنيتك التحتية الخاصة — دون الحاجة إلى حساب Intlayer Cloud. يُشغّل أمر واحد مكدساً جاهزاً للإنتاج:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

يقوم المثبّت بتنزيل ملف `docker-compose.yml` وملف `.env`، ويولّد الأسرار المطلوبة تلقائياً، ويبدأ تشغيل جميع الحاويات بـ `docker compose up -d`.

## جدول المحتويات

<TOC/>

---

## البنية المعمارية

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

يتم تضمين Chromium (المستخدم لتوليد لقطات الشاشة عبر Puppeteer) داخل صورة الخادم الخلفي — لا حاجة لحاوية منفصلة.

---

## المتطلبات الأساسية

- **Docker** ≥ 24 و**Docker Compose** ≥ v2. إذا كان أحدهما مفقوداً، يطبع المثبّت رابط التثبيت ويخرج.
- المنافذ `3000`، `3100`، `8025`، `9000`، و`9001` متاحة على المضيف.
- مضيف Linux أو macOS (أو WSL2 على Windows).

---

## البدء السريع

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

ما يقوم به المثبّت:

1. يتحقق من وجود `docker` و`docker compose`.
2. يُنزّل `docker-compose.yml` و`.env.example` إلى `./intlayer/`.
3. إذا لم يكن هناك `.env`، ينسخ المثال ويولّد أسراراً عشوائية لـ `BETTER_AUTH_SECRET` و`S3_ACCESS_KEY_ID` و`S3_SECRET_ACCESS_KEY` عبر `openssl rand`.
4. يُشغّل `docker compose pull` + `docker compose up -d`.
5. يطبع عناوين URL: لوحة التحكم `:3000`، API `:3100`، واجهة البريد الإلكتروني `:8025`، وحدة تحكم MinIO `:9001`.

بعد تشغيل المكدس، افتح **http://localhost:3000** وأنشئ حسابك الأول.

---

## الخدمات

| الخدمة      | الصورة                               | المنفذ (المضيف)                     | الغرض                                                  |
| ----------- | ------------------------------------ | ----------------------------------- | ------------------------------------------------------ |
| **app**     | built from `apps/app/Dockerfile`     | `3000`                              | لوحة تحكم TanStack Start (واجهة CMS)                   |
| **backend** | built from `apps/backend/Dockerfile` | `3100`                              | واجهة Fastify REST API (نقطة نهاية `/health`)          |
| **mongo**   | `mongo:7`                            | داخلي                               | مجموعة نسخ متماثلة أحادية العقدة (`rs0`)               |
| **redis**   | `redis:7-alpine`                     | داخلي                               | قوائم انتظار المهام (BullMQ) والتخزين المؤقت (ioredis) |
| **minio**   | `minio/minio`                        | `9000` (S3)، `9001` (وحدة التحكم)   | تخزين كائنات متوافق مع S3 للصور الرمزية ولقطات الشاشة  |
| **mailpit** | `axllent/mailpit`                    | `1025` (SMTP)، `8025` (واجهة الويب) | مجمّع بريد إلكتروني تفاعلي محلي                        |

المنافذ الداخلية (mongo، redis) غير معرّضة للمضيف افتراضياً.

> يجب أن يكون منفذ MinIO `9000` قابلاً للوصول من المتصفح لأن الأصول المرفوعة (الصور الرمزية، لقطات الشاشة) تُحمَّل مباشرة من `S3_PUBLIC_URL=http://localhost:9000/intlayer`.

---

## متغيرات البيئة

يولّد المثبّت ملف `.env` جاهزاً للاستخدام. يصف الجدول أدناه كل متغير.

### المطلوبة (مولّدة تلقائياً أو مطلوبة)

| المتغير                | مثال                                            | الوصف                                                     |
| ---------------------- | ----------------------------------------------- | --------------------------------------------------------- |
| `NODE_ENV`             | `production`                                    | بيئة وقت التشغيل                                          |
| `PORT`                 | `3100`                                          | منفذ استماع الخادم الخلفي                                 |
| `BACKEND_URL`          | `http://localhost:3100`                         | عنوان URL العام لواجهة برمجة تطبيقات الخادم الخلفي        |
| `APP_URL`              | `http://localhost:3000`                         | عنوان URL العام للوحة التحكم                              |
| `DOMAIN`               | `localhost`                                     | نطاق ملفات تعريف الارتباط                                 |
| `MONGODB_URI`          | `mongodb://mongo:27017/intlayer?replicaSet=rs0` | عنوان URI الكامل لاتصال MongoDB                           |
| `REDIS_URL`            | `redis://redis:6379`                            | عنوان URL لاتصال Redis                                    |
| `BETTER_AUTH_SECRET`   | _(مولّد تلقائياً)_                              | سر من 32 بايت لتوقيع الجلسة                               |
| `MAIL_PROVIDER`        | `smtp`                                          | بروتوكول البريد: `smtp` أو `resend`                       |
| `MAIL_SMTP_HOST`       | `mailpit`                                       | اسم المضيف SMTP (اسم حاوية Mailpit)                       |
| `MAIL_SMTP_PORT`       | `1025`                                          | منفذ SMTP                                                 |
| `MAIL_FROM`            | `Intlayer <no-reply@localhost>`                 | عنوان المرسل                                              |
| `S3_ENDPOINT`          | `http://minio:9000`                             | نقطة نهاية متوافقة مع S3                                  |
| `S3_PUBLIC_URL`        | `http://localhost:9000/intlayer`                | عنوان URL العام لتحميل الأصول في المتصفح                  |
| `S3_BUCKET_NAME`       | `intlayer`                                      | اسم الدلو (Bucket)                                        |
| `S3_ACCESS_KEY_ID`     | _(مولّد تلقائياً)_                              | مفتاح وصول MinIO                                          |
| `S3_SECRET_ACCESS_KEY` | _(مولّد تلقائياً)_                              | مفتاح سر MinIO                                            |
| `VITE_BACKEND_URL`     | `http://localhost:3100`                         | عنوان URL الخادم الخلفي المضمّن في لوحة التحكم عند البناء |
| `VITE_DOMAIN`          | `localhost`                                     | النطاق المضمّن في لوحة التحكم عند البناء                  |

### اختيارية (تتدهور الميزات بشكل سلس عند غيابها)

| المتغير                                                  | الميزة                                                           |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| `OPENAI_API_KEY`                                         | الترجمة بمساعدة الذكاء الاصطناعي ومراجعة المحتوى                 |
| `STRIPE_SECRET_KEY`، `STRIPE_WEBHOOK_SECRET`، `STRIPE_*` | إدارة الفواتير والاشتراكات                                       |
| `RESEND_API_KEY`                                         | البريد الإلكتروني التفاعلي عبر Resend (يتجاوز Mailpit عند الضبط) |
| `GITHUB_CLIENT_ID`، `GITHUB_CLIENT_SECRET`               | تسجيل الدخول عبر OAuth لـ GitHub                                 |
| `GOOGLE_CLIENT_ID`، `GOOGLE_CLIENT_SECRET`               | تسجيل الدخول عبر OAuth لـ Google                                 |
| `GITLAB_CLIENT_ID`، `GITLAB_CLIENT_SECRET`               | تسجيل الدخول عبر OAuth لـ GitLab                                 |
| `MICROSOFT_CLIENT_ID`، `MICROSOFT_CLIENT_SECRET`         | تسجيل الدخول عبر OAuth لـ Microsoft                              |
| `LINKEDIN_CLIENT_ID`، `LINKEDIN_CLIENT_SECRET`           | تسجيل الدخول عبر OAuth لـ LinkedIn                               |
| `ATLASSIAN_CLIENT_ID`، `ATLASSIAN_CLIENT_SECRET`         | تسجيل الدخول عبر OAuth لـ Atlassian                              |

---

## ربط مشروعك بـ Intlayer

بمجرد تشغيل المكدس، وجّه مشروعك نحو الخادم الخلفي ولوحة التحكم المستضافَين ذاتياً بدلاً من `intlayer.org`.

### تهيئة المشروع

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * عنوان URL للوحة تحكم CMS المستضافة ذاتياً.
     * الافتراضي: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // e.g. http://localhost:3000

    /**
     * عنوان URL لواجهة برمجة تطبيقات الخادم الخلفي المستضافة ذاتياً.
     * الافتراضي: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // e.g. http://localhost:3100
  },
};

export default config;
```

اضبط متغيرات البيئة في ملف `.env` الخاص بمشروعك:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

أنشئ بيانات اعتماد الوصول في لوحة التحكم المستضافة ذاتياً ضمن **المشاريع ← مفاتيح الوصول** على `http://localhost:3000/projects`.

### SDK الخاص بـ `@intlayer/api`

عند استخدام SDK الخاص بـ `@intlayer/api` برمجياً، مرّر `backendURL` بشكل صريح:

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

## الترقية

إعادة تشغيل المثبّت على نشر قائم تنفّذ ترقية متدحرجة:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

يجلب هذا الأمر أحدث الصور ويعيد تشغيل الحاويات باستخدام `docker compose pull && docker compose up -d`. يتم الاحتفاظ بالأحجام الموجودة (`mongo-data`، `redis-data`، `minio-data`) — دون فقدان للبيانات.

للترقية يدوياً من داخل مجلد `./intlayer/`:

```sh
docker compose pull
docker compose up -d
```

---

## النسخ الاحتياطي والاستعادة

تعيش جميع البيانات الدائمة في ثلاثة أحجام Docker مسماة.

### النسخ الاحتياطي

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

### الاستعادة

```sh
docker run --rm \
  -v intlayer_mongo-data:/data \
  -v "$(pwd)":/backup \
  busybox tar xzf /backup/mongo-data.tar.gz -C /

# كرر لـ redis-data و minio-data
```

---

## استخدام وكيل عكسي (Nginx / Caddy)

للنشر في الإنتاج، ضع وكيلاً عكسياً أمام حاويات التطبيق والخادم الخلفي بدلاً من كشفها مباشرة.

### مثال Nginx

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

حدّث متغيرات البيئة التالية في `.env` لتتناسب مع نطاقاتك العامة:

```sh
BACKEND_URL=https://api.example.com
APP_URL=https://cms.example.com
DOMAIN=example.com
VITE_BACKEND_URL=https://api.example.com
VITE_DOMAIN=example.com
```

> تُخبز متغيرات `VITE_*` في صورة لوحة التحكم عند وقت البناء. إذا غيّرتها بعد بناء الصورة، ستحتاج إلى إعادة بناء صورة `app` (`docker compose build app`) أو استخدام حقن التهيئة في وقت التشغيل.

---

## استكشاف الأخطاء وإصلاحها

### الخادم الخلفي يتعطل عند الإقلاع

يجب أن يكون MongoDB وRedis في حالة صحية قبل بدء تشغيل الخادم الخلفي. يستخدم ملف compose `depends_on` مع `condition: service_healthy`. إذا رأيت إعادات تشغيل متكررة للخادم الخلفي، تحقق من اجتياز فحوصات صحة `mongo` و`redis`:

```sh
docker compose ps
docker compose logs mongo
docker compose logs redis
```

### لوحة التحكم لا تستطيع الوصول إلى API

تحقق من أن `VITE_BACKEND_URL` يطابق عنوان URL حيث يمكن الوصول إلى الخادم الخلفي من **المتصفح** (ليس شبكة Docker). إذا غيّرت منفذ الخادم الخلفي أو أضفت وكيلاً عكسياً، أعد بناء صورة لوحة التحكم:

```sh
docker compose build app
docker compose up -d app
```

### البريد الإلكتروني لا يُرسل

افتراضياً، يتم التقاط جميع البريد الصادر بواسطة Mailpit. افتح `http://localhost:8025` لرؤية الرسائل المرسلة. لإرسال بريد إلكتروني حقيقي، اضبط `MAIL_PROVIDER=resend` و`RESEND_API_KEY=<your-key>` في `.env`، ثم أعد تشغيل الخادم الخلفي:

```sh
docker compose restart backend
```

### دلو MinIO مفقود

إذا لم تُشغَّل خدمة `minio-init` المؤقتة (أو شُغّلت قبل أن يكون MinIO جاهزاً)، أنشئ الدلو يدوياً:

```sh
docker compose run --rm minio-init
```

---

## روابط مفيدة

- [توثيق Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- [مرجع التهيئة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [CMS SDK — `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [Docker Image (aymercizip/intlayer-selfhost)](https://hub.docker.com/repository/docker/aymercizip/intlayer-selfhost/general)
