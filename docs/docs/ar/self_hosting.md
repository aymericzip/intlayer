---
createdAt: 2026-06-30
updatedAt: 2026-09-21
priority: 8
title: استضافة Intlayer ذاتيًا (Self-Hosting)
description: "قم بتشغيل Intlayer على بنيتك التحتية الخاصة: كتطبيق سطح مكتب، أو حاوية Docker واحدة شاملة (all-in-one)، أو حزمة Docker Compose قابلة للتطوير. لا يلزم وجود حساب على Intlayer Cloud."
keywords:
  - استضافة ذاتية
  - Docker
  - Docker Compose
  - تطبيق سطح المكتب
  - Intlayer
  - CMS
  - تثبيت
  - بنية تحتية
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# استضافة Intlayer ذاتيًا (Self-Hosting)

يمكن تشغيل Intlayer على بنيتك التحتية الخاصة دون الحاجة إلى حساب Intlayer Cloud. تتوفر ثلاثة إعدادات، يتم إدارتها جميعًا من خلال نفس برنامج التثبيت (`install.sh`، أو `install.ps1` على نظام Windows، أو `npx intlayer init infra`):

| Setup                        | What it is                                                                            | Pick it for                              |
| ---------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------- |
| **تطبيق سطح المكتب**         | لوحة تحكم أصلية لأنظمة macOS و Linux و Windows                                        | عميل محلي، لا يتطلب استضافة              |
| **Docker شامل (All-in-one)** | لوحة التحكم وواجهة برمجة التطبيقات (API) و MongoDB و Redis و MinIO في **حاوية واحدة** | للتجارب والتركيبات الصغيرة على جهاز واحد |
| **Docker Compose**           | **حاوية واحدة لكل خدمة**، مع إمكانية استبدال أي مخزن بيانات بخدمة مُدارة              | للإنتاج والتوسع وقواعد البيانات المُدارة |

## Table of Contents

<TOC/>

## الصور والحزم المنشورة

| Artifact             | Docker Hub                                                                | GHCR mirror                                | Contents                                                                         |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| All-in-one container | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| Dashboard (frontend) | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | TanStack Start dashboard on Bun                                                  |
| API (backend)        | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API on Bun + Chromium                                               |
| Desktop app          | [GitHub releases](https://github.com/aymericzip/intlayer/releases/latest) | n/a                                        | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

يتم بناء جميع الصور الثلاث من نفس الملف [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) ويتم نشرها مع كل إصدار. تقوم حزمة Compose أيضًا بسحب الصور الرسمية `mongo:8` و `redis:8-alpine` و `quay.io/minio/minio`.

## الإعداد

يسأل برنامج التثبيت عن الإعداد المطلوب، ويتحقق من المتطلبات الأساسية (مع عرض تثبيت Docker)، ويكتب ملف البيئة مع المفاتيح السرية المنشأة مسبقًا، ويسحب الصور. لا يبدأ أي شيء تلقائيًا: تتطلب أوضاع Docker إعداد برنامج بريد أولاً، لذا ينتهي البرنامج بطباعة الأمر المطلوب تشغيله. إعادة التشغيل آمنة: لا يتم استبدال ملف البيئة الحالي أبدًا، مما يجعله أيضًا مسارًا للترقية.

<Tabs group="mode">
<Tab label="تطبيق سطح المكتب" value="desktop">

لوحة تحكم Intlayer كتطبيق أصلي تم إنشاؤه باستخدام Tauri. يسجل الدخول إلى Intlayer Cloud (`https://app.intlayer.org`)، لذلك لا توجد حاجة للاستضافة. إنه الخيار المناسب عندما تفضل عميلاً محلياً بدلاً من علامة تبويب في المتصفح.

### التثبيت

يقوم برنامج التثبيت بتنزيل الحزمة المناسبة لنظام التشغيل والمعالج لديك ثم يفتحها (macOS)، أو يثبتها (`dpkg` / `rpm` على Linux) أو يشغل معالج الإعداد (Windows). يمكنك أيضًا تنزيلها يدويًا من [صفحة الإصدارات](https://github.com/aymericzip/intlayer/releases/latest).

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

### المتطلبات

- **Node.js**: يدمج التطبيق خادم لوحة التحكم ويشغله باستخدام ملف `node` الثنائي على جهازك. قم بتثبيته من [nodejs.org](https://nodejs.org) إذا لم يفتح التطبيق.

> يتصل إصدار سطح المكتب المنشور بالواجهة الخلفية لـ Intlayer Cloud. يتطلب توجيهه إلى واجهة خلفية مستضافة ذاتيًا إعادة بناء التطبيق مع تعيين `VITE_BACKEND_URL` للإشارة إلى واجهة برمجة التطبيقات الخاصة بك، راجع [القيود](#limitations).

</Tab>
<Tab label="Docker شامل (All-in-one)" value="docker">

يعمل كل شيء داخل حاوية `intlayer/cms-all` واحدة، تحت إشراف [s6-overlay](https://github.com/just-containers/s6-overlay)، مع استمرار حفظ جميع مخازن البيانات على وحدة تخزين واحدة.

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

| الخدمة      | منفذ (منافذ) المضيف               | الغرض                                                 |
| ----------- | --------------------------------- | ----------------------------------------------------- |
| **app**     | `3000`                            | لوحة التحكم (واجهة مستخدم CMS)                        |
| **backend** | `3100`                            | واجهة برمجة تطبيقات REST (نقطة نهاية `/health`)       |
| **mongo**   | داخلي                             | MongoDB 8، مجموعة نسخ متماثلة بعقدة واحدة `rs0`       |
| **redis**   | داخلي                             | قوائم انتظار المهام (BullMQ) والتخزين المؤقت          |
| **minio**   | `9000` (S3)، `9001` (وحدة التحكم) | تخزين كائنات متوافق مع S3 للصور الرمزية ولقطات الشاشة |

يتم إدارة ترتيب التمهيد من خلال تبعيات s6 (`mongod` ← تهيئة مجموعة النسخ، `minio` ← إنشاء الحاوية، ثم `backend`، ثم `app`)، وتتم إعادة تشغيل الخدمات عند الخروج، بحيث يتعافى التمهيد الأول ذاتيًا.

### المتطلبات الأساسية

- **Docker** ≥ 24: يعرض برنامج التثبيت تثبيته (عبر [get.docker.com](https://get.docker.com) على Linux، أو Homebrew على macOS). على نظام Windows، قم بتثبيت [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (واجهة WSL 2 الخلفية) أولاً.
- المنافذ `3000` و `3100` و `9000` و `9001` متاحة على المضيف. يجب أن يظل منفذ MinIO `9000` قابلاً للوصول من قبل المتصفح حيث يتم تحميل الأصول مباشرة من `S3_PUBLIC_URL`.
- خادم بريد (mailer): مفتاح API لـ [Resend](https://resend.com) أو مرحّل SMTP.

### 1. التثبيت

يكتب `./intlayer.env` مع مفاتيح `BETTER_AUTH_SECRET` و `S3_SECRET_ACCESS_KEY` المنشأة مسبقًا، ويسحب `intlayer/cms-all:latest`.

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

تقوم أداة CLI بتشغيل برنامج التثبيت الذي يطبع الأمر `docker run …` الموضح في علامات التبويب الأخرى. الصقه في جهازك الطرفي بعد تكوين خادم البريد.

</Tab>
</Tabs>

### 2. تكوين خادم البريد

افتح `intlayer.env` واملأ إعدادات Resend **أو** SMTP (انظر التفاصيل في [خادم البريد العام](#global-mailer)):

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

### 3. التشغيل

هذا هو أمر التشغيل الذي يطبعه برنامج التثبيت:

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

تقوم أداة CLI بتشغيل برنامج التثبيت الذي يطبع الأمر `docker run …` الموضح في علامات التبويب الأخرى. الصقه في جهازك الطرفي بعد تكوين خادم البريد.

</Tab>
</Tabs>

افتح **http://localhost:3000** واتبع [إعداد التشغيل الأول](#first-run-setup). يقوم التمهيد الأول بتهيئة مجموعة النسخ والحاوية، لذا امنحه دقيقة واحدة.

### النسخ الاحتياطي والترقية

يتم الاحتفاظ بجميع الحالات داخل وحدة التخزين `intlayer-data` (`/data/mongo`، `/data/redis`، `/data/minio`).

```sh
# Backup (stop the container first so MongoDB's files are consistent)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# Restore
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

للترقية، أعد تشغيل برنامج التثبيت (يقوم بسحب أحدث صورة والاحتفاظ بملف `intlayer.env`)، ثم قم بتشغيل `docker rm -f intlayer` وأعد تشغيل أمر البدء. لاستخدام قاعدة بيانات MongoDB مُدارة بدلاً من المضمنة، عيّن `MONGODB_URI` في `intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

حاوية واحدة لكل خدمة على شبكة Compose خاصة. تستخدم لوحة التحكم وواجهة برمجة التطبيقات الصور المنشورة `intlayer/cms-frontend` و `intlayer/cms-backend`؛ وتستخدم مخازن البيانات صور `mongo` و `redis` و `minio` الرسمية.

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

| الخدمة       | الصورة                  | الدور                                                                                  |
| ------------ | ----------------------- | -------------------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | لوحة التحكم على المنفذ `:3000`؛ تنتظر حتى تكون الواجهة الخلفية جاهزة                   |
| `backend`    | `intlayer/cms-backend`  | واجهة برمجة التطبيقات على المنفذ `:3100` مع Chromium؛ تنتظر Mongo و Redis وحاوية MinIO |
| `mongo`      | `mongo:8`               | مجموعة نسخ بعقدة واحدة `rs0`، تتم تهيئتها بواسطة فحص الحالة الخاص بها                  |
| `redis`      | `redis:8-alpine`        | قوائم الانتظار والتخزين المؤقت، واستمرارية الإلحاق فقط (append-only)                   |
| `minio`      | `quay.io/minio/minio`   | تخزين S3 على المنفذ `:9000`، وحدة التحكم على `:9001`                                   |
| `minio-init` | `quay.io/minio/mc`      | تشغيل لمرة واحدة: ينشئ الحاوية وسياسة التنزيل المجهول الخاصة بها                       |

يتم حفظ البيانات في وحدات التخزين `intlayer_mongo-data` و `intlayer_redis-data` و `intlayer_minio-data`. تم تثبيت اتصالات الخدمة (`MONGODB_URI` و `REDIS_URL` و `S3_ENDPOINT` وعنوان URL الداخلي للواجهة الخلفية للعرض من جانب الخادم) في ملف compose ولها الأسبقية على `.env`، الذي يحتفظ فقط بالمفاتيح السرية والتكاملات الاختيارية.

### المتطلبات الأساسية

- **Docker** ≥ 24 مع ملحق Compose: يعرض برنامج التثبيت تثبيته على Linux و macOS. على نظام Windows، قم بتثبيت [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (واجهة WSL 2 الخلفية) أولاً.
- المنافذ `3000` و `3100` و `9000` و `9001` متاحة على المضيف.
- خادم بريد: مفتاح API لـ [Resend](https://resend.com) أو مرحّل SMTP.

### 1. التثبيت

يكتب `docker-compose.yml` وملف `.env` مع المفاتيح السرية المنشأة في `./intlayer/` ويسحب الصور.

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

### 2. تكوين خادم البريد

املأ بيانات Resend **أو** SMTP في `intlayer/.env`، تمامًا كما في الحاوية الشاملة (انظر [خادم البريد العام](#global-mailer)).

### 3. التشغيل

```sh
cd intlayer && docker compose up -d
```

افتح **http://localhost:3000** واتبع [إعداد التشغيل الأول](#first-run-setup).

### مخازن البيانات المُدارة

احذف الخدمة التي تستبدلها من ملف compose (بالإضافة إلى إدخال `depends_on` الخاص بها في `backend`)، وتجاوز المتغير المقابل:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

تعمل المتغيرات `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` / `S3_BUCKET_NAME` بشكل مباشر مع أي مزود متوافق مع S3.

### التوسع

الخدمتان `app` و `backend` عديمتا الحالة (stateless). خلف موازن التحميل، وبافتراض إزالة تعيينات منافذ المضيف الثابتة وتوجيه الوكيل حسب اسم الخدمة، سيعمل الأمر `docker compose up -d --scale backend=3`. يتم تنسيق المهام في الخلفية عبر Redis (BullMQ)، بحيث تشارك نسخ الواجهة الخلفية المتعددة قوائم الانتظار بأمان.

### البناء من المصدر

من استنساخ المستودع، قم بتبديل خدمتي Intlayer من `image:` إلى `build:` باستخدام ملف تجاوز:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

استخدم هذا أيضًا عند إنشاء صور لنطاق مخصص: مرر قيم `VITE_*` كوسائط بناء (انظر [القيود](#limitations)).

### النسخ الاحتياطي والترقية

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

### إعدادات برنامج التثبيت

بدون `--mode` (أو `INTLAYER_MODE`)، يعرض برنامج التثبيت قائمة: `desktop` أو `docker` (شامل) أو `compose`. كما يقرأ بعض متغيرات البيئة؛ قم بتمريرها إلى الصدفة بدلاً من `curl` لأن الأمر يتم توجيهه بالأنابيب:

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

> تغير متغيرات المنفذ جانب **المضيف** فقط من التعيين. تحتوي الصور المنشورة على `http://localhost:3000` و `http://localhost:3100` و `http://localhost:9000` المترجمة في حزمة لوحة التحكم، لذا احتفظ بالإعدادات الافتراضية ما لم تقم ببناء صورتك الخاصة، راجع [القيود](#limitations).

## إعداد التشغيل الأول

سيؤدي فتح لوحة التحكم على مثيل جديد (قاعدة بيانات فارغة) إلى إعادة التوجيه تلقائيًا إلى صفحة **`/init`**:

1. أنشئ الحساب الأول. نظرًا لأن مجموعة المستخدمين فارغة، تتم ترقية هذا الحساب تلقائيًا إلى **مسؤول متميز**.
2. يتم إرسال رسالة بريد إلكتروني للتحقق عبر Resend أو مرحّل SMTP الخاص بك. التحقق من البريد الإلكتروني **إلزامي**، ولهذا السبب يجب تكوين خادم البريد قبل البدء.
3. انقر فوق الرابط الموجود في البريد الإلكتروني وقم بتسجيل الدخول.

بمجرد وجود مسؤول، يعيد المسار `/init` التوجيه إلى صفحة تسجيل الدخول العادية.

## متغيرات البيئة

يقرأ كلا وضعي Docker نفس الملف (`intlayer.env` للحاوية أو `.env` لـ Compose) الذي تم إنشاؤه من [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### مطلوب

| Variable               | Example       | Description                                                                                                                                   |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(generated)_ | 32-byte secret for session signing                                                                                                            |
| `S3_SECRET_ACCESS_KEY` | _(generated)_ | Secret for the bundled MinIO                                                                                                                  |
| `RESEND_API_KEY`       | _(your key)_  | Transactional email via Resend. Required for first-run setup unless an SMTP relay is configured instead (see [Global mailer](#global-mailer)) |

### محدد بواسطة النشر

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

تتلقى خدمة `app` في Compose أيضًا `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: يصل المتصفح إلى واجهة برمجة التطبيقات على `localhost:3100`، ولكن العرض من جانب الخادم يتم داخل شبكة Compose ولذلك يجب استخدام اسم الخدمة.

### اختياري (تتراجع الميزات بسلاسة عند غيابها)

| Variable                                         | Feature                                   |
| ------------------------------------------------ | ----------------------------------------- |
| `OPENAI_API_KEY`                                 | AI-assisted translation and content audit |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | GitHub OAuth login                        |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | Google OAuth login                        |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | GitLab OAuth login                        |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Microsoft OAuth login                     |

### خادم البريد العام

تمر جميع رسائل البريد الإلكتروني الخاصة بالمعاملات، بما في ذلك رسائل البريد الإلكتروني غير التابعة للمؤسسة مثل عمليات إعادة تعيين كلمة المرور والروابط السحرية، عبر أحد وسيطي النقل العالميين:

- **Resend**: باستخدام `RESEND_API_KEY`.
- **SMTP**: باستخدام متغيرات `MAIL_SMTP_*`. بمجرد تعيين `MAIL_SMTP_HOST`، يتم استخدام SMTP وتجاهل `RESEND_API_KEY`.

يلزم استخدام `MAIL_PROVIDER` فقط لفرض وسيلة نقل معينة إذا تم تكوين كليهما (على سبيل المثال `MAIL_PROVIDER=resend` للاحتفاظ بـ Resend عند وجود مضيف SMTP).

| Variable             | Example                        | Description                                                                  |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | Sender header for either transport. Accepts a bare address or `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | SMTP host. Setting it selects the SMTP transport                             |
| `MAIL_SMTP_PORT`     | `587`                          | SMTP port (defaults to `587`)                                                |
| `MAIL_SMTP_SECURE`   | `false`                        | Implicit TLS. Set `true` for port `465`                                      |
| `MAIL_SMTP_USER`     | _(your user)_                  | SMTP username (optional; omit for unauthenticated relays)                    |
| `MAIL_SMTP_PASSWORD` | _(your password)_              | SMTP password                                                                |
| `MAIL_PROVIDER`      | `resend`                       | Optional override: `smtp` or `resend`. Leave unset to auto-select            |

> ترتيب الأسبقية: يتجاوز خادم البريد الخاص بالمؤسسة (المكون من لوحة تحكم **المؤسسة**) خادم البريد العام، ويتجاوز خادم البريد العام مفتاح Resend الافتراضي.

## ربط مشروع Intlayer الخاص بك

بمجرد تشغيل الحزمة، قم بتكوين مشروعك للإشارة إلى الواجهة الخلفية ولوحة التحكم المستضافة ذاتيًا بدلاً من `intlayer.org`.

### تكوين المشروع

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

أنشئ بيانات اعتماد الوصول في لوحة التحكم المستضافة ذاتيًا في **المشاريع ← مفاتيح الوصول** (`http://localhost:3000/projects`).

### حزمة SDK `@intlayer/api`

عند استخدام حزمة SDK `@intlayer/api` برمجيًا، مرر `backendURL` بشكل صريح:

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

## القيود

- **النطاقات المخصصة وإعادة تعيين المنافذ غير مدعومة بعد.** يتم تضمين جميع عناوين URL الخاصة بـ `VITE_*` الموجهة للمتصفح في لوحة التحكم أثناء وقت البناء، وتأتي الصور المنشورة (وتطبيق سطح المكتب) مع قيم `localhost` / Intlayer Cloud. يجب الوصول إلى لوحة التحكم على `http://localhost:3000`، والواجهة الخلفية على `:3100`، و MinIO على `:9000`. تتطلب الاستضافة على نطاق عام، أو توجيه تطبيق سطح المكتب إلى واجهة خلفية مستضافة ذاتيًا، إعادة البناء مع تضمين عناوين URL المستهدفة (باستخدام `--build-arg VITE_BACKEND_URL=… VITE_SITE_URL=… VITE_DOMAIN=…` في `docker/selfhost/Dockerfile`، أو عبر `docker-compose.build.yml`) وهذا غير مدعوم افتراضيًا.
- **يتطلب إرسال البريد الإلكتروني خادم بريد فعال.** يفرض إعداد التشغيل الأول التحقق من البريد الإلكتروني، لذلك يجب تكوين `RESEND_API_KEY` أو [مرحّل SMTP](#global-mailer) (`MAIL_SMTP_*`). بعد تسجيل دخول المسؤول الأول، يمكن لكل مؤسسة أيضًا تكوين خادم بريد SMTP أو Resend الخاص بها من لوحة التحكم.
- **يحتاج تطبيق سطح المكتب إلى Node.js على الجهاز لبدء خادمه المدمج.**

## روابط مفيدة

- [توثيق Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)
- [مرجع التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [إصدارات تطبيق سطح المكتب](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)، [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend)، [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)، مرآة GHCR: `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): ملف Dockerfile، و `docker-compose.yml`، و `.env.template`
