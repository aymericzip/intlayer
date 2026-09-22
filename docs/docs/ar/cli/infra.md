---
createdAt: 2026-09-21
updatedAt: 2026-09-21
title: CLI - Init Infra
description: تعرف على كيفية استخدام أمر init infra في واجهة سطر أوامر Intlayer لتثبيت تطبيق سطح المكتب أو الاستضافة الذاتية لـ Intlayer CMS باستخدام Docker (حاوية الكل في واحد أو مكدس Docker Compose).
keywords:
  - CLI
  - البنية التحتية
  - الاستضافة الذاتية
  - تطبيق سطح المكتب
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
    changes: "إضافة أمر init infra"
author: aymericzip
---

# أمر Intlayer CLI Init Infra

## الوصف

يقوم أمر `init infra` بإعداد البنية التحتية لـ Intlayer على جهازك. يقوم بتنزيل أداة التثبيت المستضافة لمنصتك (`https://intlayer.org/install.sh` على macOS / Linux، و`https://intlayer.org/install.ps1` على Windows) وتشغيلها مع إرفاق الطرفية، حتى تصلك قائمة أداة التثبيت ومخرجات التقدم دون تغيير.

تسألك أداة التثبيت عن كيفية تشغيل Intlayer:

- **تطبيق سطح المكتب**: يقوم بتنزيل لوحة التحكم الأصلية لنظام التشغيل والمعالج لديك وفتحها أو تثبيتها. يتصل إصدار سطح المكتب بالواجهة الخلفية لـ Intlayer Cloud.
- **Docker الكل في واحد**: لوحة التحكم + API + MongoDB + Redis + MinIO في حاوية واحدة مدعومة بوحدة تخزين واحدة. يكتب `./intlayer.env` بالأسرار المُنشأة ويسحب صورة `intlayer/cms-all`.
- **Docker Compose**: حاوية واحدة لكل خدمة، للاستضافة الذاتية القابلة للتوسع. يكتب `docker-compose.yml` و`.env` في `./intlayer/` ويسحب الصور.

أداة التثبيت المستضافة هي المصدر الوحيد للحقيقة لعملية الإعداد: يقوم CLI بتشغيلها بدلاً من إعادة تنفيذ نفس الخطوات، لذا فإن `npx intlayer init infra` و`curl -fsSL https://intlayer.org/install.sh | sh` يقومان بنفس الشيء تمامًا.

## الاستخدام

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

يتم تقديم نفس الخطوة من قائمة التحقق الخاصة بـ `npx intlayer init --interactive`، تحت **البنية التحتية (تطبيق سطح المكتب / الاستضافة الذاتية)**.

## الخيارات

- `-m, --mode <mode>` - اختياري. تخطي قائمة أداة التثبيت وتشغيل وضع معين مباشرة. القيم المقبولة: `desktop` أو `docker` (الكل في واحد) أو `compose`. أي قيمة أخرى ستؤدي إلى الخروج مع إظهار خطأ يسرد الأوضاع المقبولة.

## أمثلة

### اختر الوضع بشكل تفاعلي

```bash
npx intlayer init infra
```

### تثبيت تطبيق سطح المكتب

```bash
npx intlayer init infra --mode desktop
```

### الاستضافة الذاتية باستخدام حاوية الكل في واحد

```bash
npx intlayer init infra --mode docker
```

### الاستضافة الذاتية باستخدام Docker Compose

```bash
npx intlayer init infra --mode compose
```

## مثال على المخرجات

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

## إعدادات أداة التثبيت

تقرأ أداة التثبيت بعض متغيرات البيئة، والتي يمررها CLI كما هي. اضبطها في الطرفية قبل تشغيل الأمر:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| المتغير                   | الافتراضي                 | ينطبق على | الوصف                                            |
| ------------------------- | ------------------------- | --------- | ------------------------------------------------ |
| `INTLAYER_MODE`           | _(يُسأل عنه)_             | الكل      | `desktop` أو `docker` أو `compose`، نفس `--mode` |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop   | مكان حفظ أداة تثبيت التطبيق                      |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker    | صورة الكل في واحد المراد سحبها                   |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker    | مكان كتابة ملف البيئة                            |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker    | اسم الحاوية                                      |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker    | وحدة تخزين مسماة مثبتة في `/data`                |
| `INTLAYER_APP_PORT`       | `3000`                    | docker    | منفذ المضيف للوحة التحكم                         |
| `INTLAYER_API_PORT`       | `3100`                    | docker    | منفذ المضيف لـ API                               |
| `INTLAYER_S3_PORT`        | `9000`                    | docker    | منفذ المضيف لـ MinIO S3 API                      |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker    | منفذ المضيف لوحدة تحكم MinIO                     |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose   | مكان كتابة `docker-compose.yml` و`.env`          |
| `INTLAYER_SELFHOST_REF`   | `main`                    | كلاهما    | مرجع Git الذي يتم جلب ملف compose وقالب env منه  |

> تغير متغيرات المنافذ جانب **المضيف** فقط من التعيين. تحتوي الصور المنشورة على `http://localhost:3000` و`http://localhost:3100` و`http://localhost:9000` مجمعة في حزمة لوحة التحكم، لذا احتفظ بالإعدادات الافتراضية ما لم تقم ببناء صورك الخاصة: راجع [دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md#limitations).

## المتطلبات

- **تطبيق سطح المكتب** يحتاج إلى [Node.js](https://nodejs.org): يدمج التطبيق خادم لوحة التحكم ويبدأه باستخدام الملف الثنائي `node` الخاص بالجهاز.
- **أوضاع Docker** تحتاج إلى [Docker](https://docs.docker.com/get-docker/) (Docker Desktop مع الواجهة الخلفية WSL 2 على Windows). يحتاج وضع Compose أيضًا إلى المكون الإضافي `docker compose`.

## ملاحظات

- إعادة تشغيل الأمر آمنة: لا يتم استبدال ملف البيئة الموجود أبدًا، مما يجعله أيضًا مسارًا للترقية (تسحب أداة التثبيت أحدث الصور وتحتفظ بأسرارك).
- يتم تنزيل أداة التثبيت إلى دليل مؤقت ويتم حذفها بمجرد الخروج، مهما كانت النتيجة.
- رمز خروج الأمر هو رمز خروج أداة التثبيت. إذا فشل التنزيل نفسه، يطبع CLI أمر `curl … | sh` (أو `irm … | iex`) المكافئ لتشغيل أداة التثبيت مباشرة.
- لا تزال أوضاع Docker بحاجة إلى خدمة بريد إلكتروني لإرسال رسائل تسجيل الدخول. بعد انتهاء التثبيت، قم بتهيئة Resend أو SMTP في ملف البيئة المنشأ: راجع [خدمة البريد العالمية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md#global-mailer).

## ذات صلة

- [دليل الاستضافة الذاتية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md) - البنية وخطوات التشغيل الأولى والقيود لكل وضع
- [تهيئة Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/init.md) - أمر `init` الأصلي وقائمة التحقق التفاعلية الخاصة به
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) - وظائف لوحة التحكم التي قمت بتثبيتها للتو
