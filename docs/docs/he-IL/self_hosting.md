---
createdAt: 2026-06-30
updatedAt: 2026-11-03
priority: 8
title: "אירוח עצמי של Intlayer באמצעות Docker"
description: "הריצו את Intlayer על התשתית שלכם כאפליקציית שולחן עבודה (desktop), כקונטיינר Docker הכל-באחד או כ-Docker Compose stack, ללא צורך בחשבון ענן."
keywords:
  - אירוח עצמי
  - Self-Hosting
  - Docker
  - Docker Compose
  - אפליקציית שולחן עבודה
  - Intlayer
  - CMS
  - התקנה
  - תשתית
slugs:
  - doc
  - self-hosting
author: aymericzip
---

# אירוח עצמי של Intlayer (Self-Hosting)

Intlayer יכול לפעול על התשתית שלכם, ללא צורך בחשבון Intlayer Cloud. שלוש תצורות התקנה זמינות, כולן מופעלות באמצעות אותו כלי התקנה (`install.sh`, `install.ps1` ב-Windows, או `npx intlayer init infra`):

| תצורה                                   | מה היא כוללת                                                                          | מומלצת עבור                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **אפליקציית שולחן עבודה (Desktop app)** | לוח בקרה מקומי עבור macOS, Linux ו-Windows                                            | לקוח מקומי, ללא צורך באירוח שרת                                 |
| **Docker הכל-באחד (All-in-one)**        | לוח בקרה, API, MongoDB, Redis ו-MinIO ב**קונטיינר יחיד**                              | ניסויים והתקנות קטנות על שרת בודד                               |
| **Docker Compose**                      | **קונטיינר ייעודי לכל שירות**, כאשר כל מאגר נתונים ניתן להחלפה בשירות מנוהל (managed) | סביבת ייצור (Production), הרחבה (scaling) ומאגרי נתונים מנוהלים |

## תוכן עניינים

<TOC/>

## תמונות וחבילות שפורסמו

| תוצר (Artifact)       | Docker Hub                                                                | מראת GHCR                                  | תכולה                                                                            |
| --------------------- | ------------------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| קונטיינר הכל-באחד     | [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all)           | `ghcr.io/aymericzip/intlayer/cms-all`      | app + backend + MongoDB 8 + Redis + MinIO + Chromium                             |
| לוח בקרה (frontend)   | [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend) | `ghcr.io/aymericzip/intlayer/cms-frontend` | לוח בקרה TanStack Start על גבי Bun                                               |
| API (backend)         | [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend)   | `ghcr.io/aymericzip/intlayer/cms-backend`  | Fastify REST API על גבי Bun בתוספת Chromium                                      |
| אפליקציית שולחן עבודה | [שחרורי GitHub](https://github.com/aymericzip/intlayer/releases/latest)   | לא רלוונטי                                 | `.dmg` (macOS), `.deb` / `.rpm` / `.AppImage` (Linux), `.exe` / `.msi` (Windows) |

כל שלוש התמונות נבנות מאותו [`docker/selfhost/Dockerfile`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost) ומפורסמות בכל גרסה חדשה. ה-Compose stack מושך בנוסף את התמונות הרשמיות של `mongo:8`, `redis:8-alpine` ו-`quay.io/minio/minio`.

## התקנה

כלי ההתקנה שואל באיזו תצורה אתם מעוניינים, בודק את דרישות הקדם (ומציע להתקין את Docker במידת הצורך), כותב את קובץ הסביבה כאשר הסודות (secrets) כבר נוצרו, ומושך את התמונות. הוא לעולם אינו מפעיל דבר בעצמו: מצבי ה-Docker דורשים קודם כל שרת דוא"ל (mailer), ולכן הוא מסיים בהדפסת הפקודה שעליכם להריץ. הרצה חוזרת של הכלי בטוחה לחלוטין: קובץ סביבה קיים לעולם אינו נדרס, מה שהופך אותו גם לנתיב השדרוג.

<Tabs group="mode">
<Tab label="אפליקציית שולחן עבודה" value="desktop">

לוח הבקרה של Intlayer כאפליקציה מקומית (native), שנבנתה באמצעות Tauri. היא מתחברת ל-Intlayer Cloud (`https://app.intlayer.org`), כך שאין צורך לארח דבר. זוהי הבחירה הנכונה כאשר אתם מעוניינים בלקוח מקומי במקום בלשונית בדפדפן.

### התקנה

כלי ההתקנה מוריד את החבילה המתאימה למערכת ההפעלה ולמעבד שלכם, ולאחר מכן פותח אותה (ב-macOS), מתקין אותה (`dpkg` / `rpm` ב-Linux) או מפעיל את אשף ההתקנה (ב-Windows). תוכלו גם להוריד אותה ידנית מ[דף השחרורים](https://github.com/aymericzip/intlayer/releases/latest).

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode desktop
```

</Tab>
<Tab label="Windows" value="windows">

ב-PowerShell:

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

### דרישות

- **Node.js**: האפליקציה מטמיעה את שרת לוח הבקרה ומפעילה אותו באמצעות הבינארי של `node` המותקן במחשב שלכם. התקינו אותו מ-[nodejs.org](https://nodejs.org) אם האפליקציה אינה עולה.

> גרסת שולחן העבודה שפורסמה מתקשרת עם ה-backend של Intlayer Cloud. הפנייתה ל-backend באירוח עצמי דורשת בנייה מחדש של האפליקציה עם `VITE_BACKEND_URL` המוגדר ל-API שלכם, ראו [מגבלות](#limitations).

</Tab>
<Tab label="Docker הכל-באחד" value="docker">

הכול רץ בתוך קונטיינר יחיד מסוג `intlayer/cms-all`, תחת פיקוח של [s6-overlay](https://github.com/just-containers/s6-overlay), כאשר כל מאגר נתונים נשמר תחת volume יחיד.

```
                ┌─────────────────────────────┐
 browser ──────▶ │  app  (TanStack Start)  :3000│ ──┐
 (localhost)    └─────────────────────────────┘   │ VITE_BACKEND_URL (מוטמע בבנייה)
                ┌─────────────────────────────┐   │
                │  backend (Fastify/Bun)  :3100│ ◀─┘
                └──────────────┬──────────────┘
          ┌──────────┬─────────┼──────────────┐
          ▼          ▼         ▼               ▼
      mongo:27017  redis:6379  minio:9000   Chromium
      /data/mongo  /data/redis /data/minio  (בתוך התמונה)
      (1-node RS)              minio:9001
```

| שירות       | פורט(ים) במארח                | מטרה                                                              |
| ----------- | ----------------------------- | ----------------------------------------------------------------- |
| **app**     | `3000`                        | לוח בקרה (ממשק ה-CMS)                                             |
| **backend** | `3100`                        | REST API (נקודת קצה `/health`)                                    |
| **mongo**   | פנימי בלבד                    | MongoDB 8, קבוצת שעתוק בצומת יחיד (single-node replica set) `rs0` |
| **redis**   | פנימי בלבד                    | תורי משימות (BullMQ) ושמירה במטמון (caching)                      |
| **minio**   | `9000` (S3), `9001` (console) | אחסון אובייקטים תואם S3 עבור תמונות פרופיל וצילומי מסך            |

סדר העלייה נאכף על ידי תלויות s6 (`mongod` ← אתחול קבוצת שעתוק, `minio` ← יצירת bucket, לאחר מכן `backend`, ולאחר מכן `app`), ושירותים מופעלים מחדש בעת קריסה, כך שהאתחול הראשון מתאושש בעצמו.

### דרישות קדם

- **Docker** גרסה 24 ומעלה: כלי ההתקנה מציע להתקין אותו (דרך [get.docker.com](https://get.docker.com) ב-Linux, או Homebrew ב-macOS). ב-Windows, התקינו תחילה את [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (עם מנוע WSL 2).
- פורטים `3000`, `3100`, `9000` ו-`9001` פנויים במארח. פורט MinIO `9000` חייב להישאר נגיש לדפדפן, אשר טוען נכסים ישירות מ-`S3_PUBLIC_URL`.
- שרת דוא"ל (mailer): מפתח API של [Resend](https://resend.com) או שרת ממסר SMTP.

### 1. התקנה

יוצר את `./intlayer.env` עם `BETTER_AUTH_SECRET` ו-`S3_SECRET_ACCESS_KEY` שנוצרו אוטומטית, מציג מספר שאלות להשלמת שאר הנתונים, ומושך את `intlayer/cms-all:latest`.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode docker
```

</Tab>
<Tab label="Windows" value="windows">

ב-PowerShell:

```powershell
$env:INTLAYER_MODE = "docker"; irm https://intlayer.org/install.ps1 | iex
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode docker
```

</Tab>
</Tabs>

### 2. מענה על שאלות ההגדרה

כלי ההתקנה מבקש להזין (לחצו על Enter כדי לקבל את ההצעה, ניתן לשנות כל תשובה בקובץ מאוחר יותר):

- **הדומיין** שבו יופעל Intlayer. השאירו ריק כדי להישאר ב-`localhost`. עם דומיין כגון `example.org`, הוא מציע את `https://cms.example.org` עבור לוח הבקרה, `https://back.example.org` עבור ה-API ו-`https://s3.example.org/intlayer` עבור אחסון האובייקטים, וכותב את `DOMAIN`, `APP_URL`, `BACKEND_URL` ו-`S3_PUBLIC_URL`. ראו [דומיין מותאם אישית](#custom-domain) להמשך.
- **שירות הדוא"ל (mailer)**: Resend (מפתח API) או ממסר SMTP (שרת, פורט, פרטי הזדהות), בתוספת כתובת השולח. ניתן לדלג על שלב זה ולהגדיר ידנית מאוחר יותר.
- **מפתח API אופציונלי של OpenAI** עבור תכונות ה-AI.

ללא מסוף אינטראקטיבי (למשל כאשר הסקריפט מורץ מתוך CI), השאלות מדולגות ורק הסודות נוצרים. פתחו את `intlayer.env` ומלאו את Resend **או** SMTP באופן ידני (פרטים בסעיף [שרת דוא"ל גלובלי](#global-mailer)):

```sh fileName="intlayer.env"
# אפשרות א': Resend
RESEND_API_KEY=<your-resend-key>

# אפשרות ב': SMTP (מחליף את Resend ברגע ש-MAIL_SMTP_HOST מוגדר)
MAIL_SMTP_HOST=smtp.example.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USER=<user>
MAIL_SMTP_PASSWORD=<password>
MAIL_FROM=Intlayer <no-reply@example.com>
```

### 3. הפעלה

זוהי הפקודה שכלי ההתקנה מדפיס (עם דומיין מותאם אישית, מקדימה אותה פקודת `docker build` המייצרת את `intlayer/cms-all:custom`, ראו [דומיין מותאם אישית](#custom-domain)):

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

ה-CLI מריץ את כלי ההתקנה, אשר מדפיס את פקודת ה-`docker run …` המוצגת בלשוניות האחרות. העתיקו אותה למסוף שלכם לאחר ששירות הדוא"ל מוגדר.

</Tab>
</Tabs>

פתחו את **http://localhost:3000** (או את כתובת לוח הבקרה שלכם) ופעלו לפי [הגדרה ראשונית](#first-run-setup). האתחול הראשון מאתחל את קבוצת השעתוק (replica set) ואת ה-bucket, לכן המתינו כדקה.

### גיבוי ושדרוג

כל הנתונים נשמרים ב-volume מסוג `intlayer-data` (`/data/mongo`, `/data/redis`, `/data/minio`).

```sh
# גיבוי (עצרו תחילה את הקונטיינר כדי שקובצי ה-MongoDB יהיו עקביים)
docker stop intlayer
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar czf /backup/intlayer-data.tar.gz /data
docker start intlayer

# שחזור
docker run --rm -v intlayer-data:/data -v "$(pwd)":/backup busybox tar xzf /backup/intlayer-data.tar.gz -C /
```

כדי לשדרג, הריצו שוב את כלי ההתקנה (הוא מושך את התמונה העדכנית ביותר ושומר על `intlayer.env`), לאחר מכן בצעו `docker rm -f intlayer` והריצו שוב את פקודת ההפעלה. כדי להשתמש ב-MongoDB מנוהל במקום המובנה, הגדירו את `MONGODB_URI` ב-`intlayer.env`.

</Tab>
<Tab label="Docker Compose" value="compose">

קונטיינר אחד לכל שירות ברשת Compose פרטית. לוח הבקרה וה-API משתמשים בתמונות שפורסמו `intlayer/cms-frontend` ו-`intlayer/cms-backend`. מאגרי הנתונים משתמשים בתמונות הרשמיות של `mongo`, `redis` ו-`minio`.

```
                ┌───────────────────┐
 browser ──────▶ │  app        :3000 │ ── SSR ──▶ http://backend:3100
 (localhost)    └───────────────────┘
                ┌───────────────────┐
 browser ──────▶ │  backend    :3100 │
 (localhost)    └─────────┬─────────┘
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
     mongo:27017     redis:6379      minio:9000 ◀── דפדפן (assets)
     (1-node RS)                     minio:9001
```

| שירות        | תמונה                   | תפקיד                                                                        |
| ------------ | ----------------------- | ---------------------------------------------------------------------------- |
| `app`        | `intlayer/cms-frontend` | לוח בקרה בפורט `:3000`. ממתין שה-backend יהיה תקין (healthy)                 |
| `backend`    | `intlayer/cms-backend`  | API בפורט `:3100` עם Chromium. ממתין ל-Mongo, Redis ו-MinIO bucket           |
| `mongo`      | `mongo:8`               | קבוצת שעתוק בצומת יחיד `rs0`, מאותחלת על ידי בדיקת התקינות (healthcheck) שלה |
| `redis`      | `redis:8-alpine`        | תורים ושמירה במטמון, שמירת נתונים מבוססת append-only                         |
| `minio`      | `quay.io/minio/minio`   | אחסון S3 בפורט `:9000`, לוח ניהול בפורט `:9001`                              |
| `minio-init` | `quay.io/minio/mc`      | פעולה חד-פעמית: יוצרת את ה-bucket ואת מדיניות ההורדה האנונימית שלו           |

הנתונים נשמרים ב-volumes: `intlayer_mongo-data`, `intlayer_redis-data` ו-`intlayer_minio-data`. חיווט השירותים (`MONGODB_URI`, `REDIS_URL`, `S3_ENDPOINT`, וכתובת ה-backend הפנימית המשמשת לרינדור צד שרת) קבוע בקובץ ה-compose וקודם ל-`.env`, אשר מכיל רק סודות ואינטגרציות אופציונליות.

### דרישות קדם

- **Docker** גרסה 24 ומעלה עם תוסף Compose: כלי ההתקנה מציע להתקין אותו ב-Linux וב-macOS. ב-Windows, התקינו תחילה את [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/) (עם מנוע WSL 2).
- פורטים `3000`, `3100`, `9000` ו-`9001` פנויים במארח.
- שרת דוא"ל (mailer): מפתח API של [Resend](https://resend.com) או שרת ממסר SMTP.

### 1. התקנה

כותב את `docker-compose.yml` ואת `.env` עם הסודות שנוצרו לתוך `./intlayer/`, שואל את אותן שאלות הגדרה כמו במצב הכל-באחד (דומיין, שרת דוא"ל, מפתח OpenAI), ומושך את התמונות.

<Tabs group="os">
<Tab label="macOS / Linux" value="unix">

```sh
curl -fsSL https://intlayer.org/install.sh | sh -s -- --mode compose
```

או באופן ידני:

```sh
mkdir intlayer && cd intlayer
curl -fsSLO https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml
curl -fsSL  https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -o .env
# מלאו את BETTER_AUTH_SECRET ואת S3_SECRET_ACCESS_KEY (באמצעות openssl rand -hex 32)
```

</Tab>
<Tab label="Windows" value="windows">

ב-PowerShell:

```powershell
$env:INTLAYER_MODE = "compose"; irm https://intlayer.org/install.ps1 | iex
```

או באופן ידני:

```powershell
mkdir intlayer; cd intlayer
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/docker-compose.yml -OutFile docker-compose.yml
irm https://raw.githubusercontent.com/aymericzip/intlayer/main/docker/selfhost/.env.template -OutFile .env
# מלאו את BETTER_AUTH_SECRET ואת S3_SECRET_ACCESS_KEY
```

</Tab>
<Tab label="Intlayer CLI" value="cli">

```bash
npx intlayer init infra --mode compose
```

</Tab>
</Tabs>

### 2. הגדרת שרת דוא"ל (mailer)

אם דילגתם על שאלת שרת הדוא"ל, מלאו את Resend **או** את ה-SMTP בקובץ `intlayer/.env`, בדיוק כפי שנעשה עבור קונטיינר הכל-באחד (ראו [שרת דוא"ל גלובלי](#global-mailer)).

### 3. הפעלה

```sh
cd intlayer && docker compose up -d
```

עם דומיין מותאם אישית, כלי ההתקנה מוריד בנוסף את `docker-compose.build.yml` ופקודת ההפעלה הופכת ל-`docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build` (ראו [דומיין מותאם אישית](#custom-domain)).

פתחו את **http://localhost:3000** (או את כתובת לוח הבקרה שלכם) ופעלו לפי [הגדרה ראשונית](#first-run-setup).

### מאגרי נתונים מנוהלים (Managed Datastores)

מחקו את השירות שאתם מחליפים מקובץ ה-compose (ואת הרישום שלו ב-`depends_on` תחת `backend`), ולאחר מכן דרסו את המשתנה המתאים:

```yaml fileName="docker-compose.yml"
services:
  backend:
    environment:
      MONGODB_URI: mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/intlayer
      REDIS_URL: rediss://default:password@redis.example.com:6380
      S3_ENDPOINT: https://s3.eu-west-1.amazonaws.com
      S3_PUBLIC_URL: https://intlayer-assets.s3.eu-west-1.amazonaws.com
```

המשתנים `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` ו-`S3_BUCKET_NAME` שומרים על משמעותם מול כל ספק תואם S3.

### הרחבה לגובה ולרוחב (Scaling)

שירותי `app` ו-`backend` הם חסרי מצב (stateless). מאחורי נתב עומסים (load balancer), הפקודה `docker compose up -d --scale backend=3` פועלת בהצלחה ברגע שמיפויי הפורטים הקבועים במארח מוסרים וה-proxy פונה לשירותים לפי שמם. משימות רקע מתואמות באמצעות Redis (BullMQ), כך שכמה עותקים (replicas) של ה-backend חולקים את התור בבטחה.

### בנייה מקוד המקור (Building from source)

קובץ override מחליף את שני שירותי Intlayer מ-`image:` ל-`build:`. מתוך תיקיית הקוד של המאגר:

```sh
cd docker/selfhost
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

ללא עותק מקומי של הקוד, כוונו את הקשר הבנייה (build context) ישירות למאגר עצמו על ידי הגדרת `INTLAYER_BUILD_CONTEXT=https://github.com/aymericzip/intlayer.git#main` בקובץ `.env`. ארגומנטי הבנייה מסוג `VITE_*` של לוח הבקרה עוקבים אחר `DOMAIN`, `APP_URL` ו-`BACKEND_URL` מאותו קובץ, וכך מיושם [דומיין מותאם אישית](#custom-domain).

### גיבוי ושדרוג

```sh
# גיבוי volume אחד (חזרו על הפעולה עבור intlayer_redis-data ו-intlayer_minio-data)
docker compose stop
docker run --rm -v intlayer_mongo-data:/data -v "$(pwd)":/backup busybox tar czf /backup/mongo-data.tar.gz /data
docker compose start

# שדרוג, ה-volumes נשמרים
docker compose pull && docker compose up -d
```

</Tab>
</Tabs>

### הגדרות כלי ההתקנה (Installer settings)

ללא הארגומנט `--mode` (או `INTLAYER_MODE`), כלי ההתקנה מציג תפריט: `desktop`, `docker` (הכל-באחד) או `compose`. הוא גם קורא מספר משתני סביבה. מכיוון שהוא מועבר בצינור (pipe) למעטפת, העבירו אותם למעטפת ולא ל-`curl`:

```sh
curl -fsSL https://intlayer.org/install.sh | INTLAYER_COMPOSE_DIR=./cms sh -s -- --mode compose
```

```powershell
$env:INTLAYER_MODE = "compose"; $env:INTLAYER_COMPOSE_DIR = ".\cms"; irm https://intlayer.org/install.ps1 | iex
```

| משתנה                     | ברירת מחדל                | חל על   | תיאור                                                               |
| ------------------------- | ------------------------- | ------- | ------------------------------------------------------------------- |
| `INTLAYER_MODE`           | _(נשאל)_                  | הכול    | `desktop`, `docker` או `compose`, זהה ל-`--mode`                    |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop | היכן נשמר קובץ ההתקנה של האפליקציה                                  |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker  | תמונת הכל-באחד למשיכה                                               |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker  | היכן לכתוב את קובץ הסביבה                                           |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker  | שם הקונטיינר                                                        |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker  | ה-volume בעל השם המורכב ב-`/data`                                   |
| `INTLAYER_APP_PORT`       | `3000`                    | docker  | פורט במארח עבור לוח הבקרה                                           |
| `INTLAYER_API_PORT`       | `3100`                    | docker  | פורט במארח עבור ה-API                                               |
| `INTLAYER_S3_PORT`        | `9000`                    | docker  | פורט במארח עבור MinIO S3 API                                        |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker  | פורט במארח עבור קונסולת MinIO                                       |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose | היכן נכתבים `docker-compose.yml` ו-`.env`                           |
| `INTLAYER_SELFHOST_REF`   | `main`                    | שניהם   | ה-Git ref שממנו נמשכים קובץ ה-compose ותבנית ה-env                  |
| `INTLAYER_BUILD_CONTEXT`  | `…/intlayer.git#main`     | שניהם   | הקשר הבנייה (build context) כאשר דומיין מותאם אישית דורש בנייה מחדש |
| `INTLAYER_CUSTOM_IMAGE`   | `intlayer/cms-all:custom` | docker  | תגית תמונת הכל-באחד שנבנתה עבור דומיין מותאם אישית                  |

> משתני הפורטים משנים אך ורק את צד ה**מארח (host)** במיפוי. התמונות שפורסמו כוללות את `http://localhost:3000`, `http://localhost:3100` ו-`http://localhost:9000` מקומפלים לתוך ה-bundle של לוח הבקרה, כך שמיפוי מחדש שלהם ישאיר את הדפדפן מכוון לפורטים הישנים. שמרו על ברירות המחדל אלא אם אתם בונים תמונות בעצמכם, ראו [מגבלות](#limitations).

## הגדרה ראשונית (First-run setup)

במופע חדש (מסד נתונים ריק), פתיחת לוח הבקרה מפנה אתכם לדף **`/init`**:

1. צרו את החשבון הראשון. מכיוון שטבלת המשתמשים ריקה, חשבון זה מקודם אוטומטית ל-**super admin**.
2. הודעת אימות נשלחת באמצעות Resend או ממסר ה-SMTP שלכם. אימות דוא"ל הוא **חובה**, ולכן שרת דוא"ל חייב להיות מוגדר לפני ההפעלה.
3. לחצו על הקישור בהודעת הדוא"ל, ולאחר מכן התחברו.

ברגע שקיים מנהל (admin), `/init` מפנה לדף ההתחברות הרגיל.

## משתני סביבה

שני מצבי ה-Docker קוראים את אותו הקובץ (`intlayer.env` עבור הקונטיינר, `.env` עבור Compose), שנוצר מתוך [`docker/selfhost/.env.template`](https://github.com/aymericzip/intlayer/blob/main/docker/selfhost/.env.template).

### משתני חובה

| משתנה                  | דוגמה             | תיאור                                                                                                                       |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`   | _(נוצר אוטומטית)_ | סוד באורך 32 בתים לחתימה על סשנים                                                                                           |
| `S3_SECRET_ACCESS_KEY` | _(נוצר אוטומטית)_ | סוד עבור שרת ה-MinIO המובנה                                                                                                 |
| `RESEND_API_KEY`       | _(המפתח שלכם)_    | דוא"ל טרנזקציוני באמצעות Resend. נדרש להגדרה ראשונית אלא אם מוגדר במקומו ממסר SMTP (ראו [שרת דוא"ל גלובלי](#global-mailer)) |

> תמונת הכל-באחד מקבלת גם `S3_SECRET_ACCESS_KEY` ריק: היא מייצרת מפתח כזה באתחול הראשון ושומרת אותו ב-`/data/.s3-secret-access-key`. Docker Compose עדיין דורש הגדרה שלו.

### משתנים קבועים לפי הפריסה

אלה נקבעים על ידי התמונה (במצב הכל-באחד) או על ידי קובץ ה-compose, ודורשים דריסה רק עבור טופולוגיה שאינה סטנדרטית. המשתנים `DOMAIN`, `APP_URL`, `BACKEND_URL` ו-`S3_PUBLIC_URL` הם יוצאי דופן: כאשר הם מוגדרים בקובץ הסביבה, הם קודמים בשני המצבים (ראו [דומיין מותאם אישית](#custom-domain)).

| משתנה              | הכל-באחד                                            | Docker Compose                   | תיאור                                                                     |
| ------------------ | --------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `PORT`             | `3100`                                              | `3100`                           | פורט ההאזנה של ה-backend                                                  |
| `APP_URL`          | `http://localhost:3000`                             | `http://localhost:3000`          | כתובת ציבורית של לוח הבקרה                                                |
| `BACKEND_URL`      | `http://localhost:3100`                             | `http://localhost:3100`          | כתובת ציבורית של ה-API של ה-backend                                       |
| `DOMAIN`           | `localhost`                                         | `localhost`                      | דומיין ה-Cookie                                                           |
| `SELF_HOSTED`      | `true`                                              | `true`                           | משבית נקודות קצה של ה-API הייעודיות לענן בלבד (חיוב, מנויים, marketplace) |
| `MONGODB_URI`      | `mongodb://127.0.0.1:27017/intlayer?replicaSet=rs0` | `mongodb://mongo:27017/…`        | מחרוזת חיבור ל-MongoDB, כל קלאסטר `mongodb://` או `mongodb+srv://` נתמך   |
| `REDIS_URL`        | `redis://127.0.0.1:6379`                            | `redis://redis:6379`             | Redis                                                                     |
| `S3_ENDPOINT`      | `http://127.0.0.1:9000`                             | `http://minio:9000`              | MinIO (תקשורת שרת-אל-שרת)                                                 |
| `S3_PUBLIC_URL`    | `http://localhost:9000/intlayer`                    | `http://localhost:9000/intlayer` | כתובת ציבורית לטעינת נכסים בדפדפן                                         |
| `S3_BUCKET_NAME`   | `intlayer`                                          | `intlayer`                       | שם ה-Bucket                                                               |
| `S3_ACCESS_KEY_ID` | `intlayer`                                          | `intlayer`                       | מפתח גישה של MinIO                                                        |

שירות `app` ב-Compose מקבל בנוסף את `INTLAYER_BACKEND_INTERNAL_URL=http://backend:3100`: הדפדפן פונה ל-API ב-`localhost:3100`, אך רינדור צד השרת פועל בתוך רשת ה-Compose וחייב להשתמש בשם השירות.

### דומיין מותאם אישית (Custom domain)

ה-backend קורא את כתובות ה-URL הציבוריות שלו בזמן ריצה, אך בלוח הבקרה הן **מוטמעות ומקומפלות מראש**: התמונות שפורסמו `intlayer/cms-frontend` ו-`intlayer/cms-all` פועלות אך ורק ב-`http://localhost:3000`. הגשת Intlayer בדומיין משלכם דורשת לפיכך שני דברים, שניהם מוכנים על ידי כלי ההתקנה כאשר אתם עונים על שאלת הדומיין:

1. **ארבעה משתנים בקובץ ה-env**, הנקראים על ידי ה-backend (עוגיות, קישורי דוא"ל, התקשרויות חוזרות של OAuth, כתובות URL של נכסים) ומשמשים כארגומנטי בנייה על ידי `docker-compose.build.yml`:

   ```sh fileName="intlayer.env"
   DOMAIN=example.org                          # דומיין העוגיות, אב של השרתים המפורטים להלן
   APP_URL=https://cms.example.org
   BACKEND_URL=https://back.example.org
   S3_PUBLIC_URL=https://s3.example.org/intlayer
   ```

2. **תמונת לוח בקרה שנבנתה עם כתובות URL אלו.** Docker בונה אותה ישירות מהמאגר, ללא צורך ב-checkout:

   ```sh
   # Docker Compose: קובץ ה-override קורא את ארגומנטי הבנייה מתוך .env
   docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build

   # הכל-באחד
   docker build -f docker/selfhost/Dockerfile \
     --build-arg VITE_DOMAIN=example.org \
     --build-arg VITE_SITE_URL=https://cms.example.org \
     --build-arg VITE_IDE_URL=https://cms.example.org \
     --build-arg VITE_BACKEND_URL=https://back.example.org \
     -t intlayer/cms-all:custom \
     https://github.com/aymericzip/intlayer.git#main
   ```

לאחר מכן הציבו reverse proxy עם TLS לפני הקונטיינר: `cms.example.org` ← פורט `3000`, `back.example.org` ← `3100`, `s3.example.org` ← `9000`. שלושת המארחים חייבים לחלוק את אותה סיומת `DOMAIN`, שכן עוגיית הסשן מוגבלת אליה.

### משתנים אופציונליים (היעדרם גורם להשבתה חיננית של התכונה)

| משתנה                                            | תכונה                           |
| ------------------------------------------------ | ------------------------------- |
| `OPENAI_API_KEY`                                 | תרגום בסיוע AI וביקורת תוכן     |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`       | התחברות באמצעות GitHub OAuth    |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`       | התחברות באמצעות Google OAuth    |
| `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`       | התחברות באמצעות GitLab OAuth    |
| `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | התחברות באמצעות Microsoft OAuth |

### שרת דוא"ל גלובלי (Global mailer)

כל הודעת דוא"ל טרנזקציונית, כולל הודעות שאינן ברמת הארגון כגון איפוס סיסמה וקישורי קסם (magic links), עוברת דרך אחד משני ערוצי העברה גלובליים:

- **Resend**, באמצעות `RESEND_API_KEY`.
- **SMTP**, באמצעות משתני `MAIL_SMTP_*`. ברגע ש-`MAIL_SMTP_HOST` מוגדר, נעשה שימוש ב-SMTP והמשתנה `RESEND_API_KEY` זוכה להתעלמות.

המשתנה `MAIL_PROVIDER` נדרש רק כדי לאלץ ערוץ מסוים כאשר שניהם מוגדרים (לדוגמה `MAIL_PROVIDER=resend` כדי להישאר עם Resend גם כאשר שרת SMTP מוגדר).

| משתנה                | דוגמה                          | תיאור                                                                    |
| -------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| `MAIL_FROM`          | `Intlayer <no-reply@acme.com>` | כותרת השולח (Sender) עבור שני הערוצים. מקבל כתובת בלבד או `Name <email>` |
| `MAIL_SMTP_HOST`     | `smtp.acme.com`                | שרת SMTP. הגדרתו בוחרת בערוץ ה-SMTP                                      |
| `MAIL_SMTP_PORT`     | `587`                          | פורט SMTP (ברירת מחדל: `587`)                                            |
| `MAIL_SMTP_SECURE`   | `false`                        | TLS מרומז (Implicit TLS). הגדירו `true` עבור פורט `465`                  |
| `MAIL_SMTP_USER`     | _(המשתמש שלכם)_                | שם משתמש SMTP (אופציונלי; השמיטו עבור ממסרים ללא אימות)                  |
| `MAIL_SMTP_PASSWORD` | _(הסיסמה שלכם)_                | סיסמת SMTP                                                               |
| `MAIL_PROVIDER`      | `resend`                       | דריסה אופציונלית: `smtp` או `resend`. השאירו ריק לבחירה אוטומטית         |

> עדיפות: שרת דוא"ל ייעודי של ארגון (המוגדר מתוך לוח הבקרה של **Organization**) קודם לשרת הדוא"ל הגלובלי, אשר בתורו קודם למפתח ברירת המחדל של Resend.

## חיבור פרויקט ה-Intlayer שלכם

ברגע שהמערך פועל, כוונו את הפרויקט שלכם אל ה-backend ולוח הבקרה המאוחסנים עצמאית במקום אל `intlayer.org`.

### תצורת הפרויקט

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * כתובת לוח הבקרה של ה-CMS באירוח עצמי.
     * ברירת מחדל: https://app.intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL, // לדוגמה http://localhost:3000

    /**
     * כתובת ה-API של ה-backend באירוח עצמי.
     * ברירת מחדל: https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL, // לדוגמה http://localhost:3100
  },
};

export default config;
```

הגדירו את משתני הסביבה בקובץ `.env` של הפרויקט שלכם:

```sh
INTLAYER_CMS_URL=http://localhost:3000
INTLAYER_BACKEND_URL=http://localhost:3100
INTLAYER_CLIENT_ID=<your-client-id>
INTLAYER_CLIENT_SECRET=<your-client-secret>
```

צרו פרטי גישה בלוח הבקרה המאוחסן עצמאית תחת **Projects ← Access keys** בכתובת `http://localhost:3000/projects`.

### `@intlayer/api` SDK

כאשר משתמשים ב-SDK של `@intlayer/api` באופן תכנותי, העבירו את `backendURL` במפורש:

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

## מגבלות

- **דומיין מותאם אישית דורש בנייה מחדש.** כל כתובות ה-URL מסוג `VITE_*` הפונות לדפדפן מוטמעות בלוח הבקרה בזמן הבנייה, והתמונות שפורסמו (כמו גם אפליקציית שולחן העבודה) מגיעות עם ערכי `localhost` / Intlayer Cloud. כברירת מחדל, הגישה ללוח הבקרה חייבת להתבצע ב-`http://localhost:3000`, ל-API ב-`:3100` ול-MinIO ב-`:9000`. מיפוי מחדש של הפורטים במארח מוביל לאותה בעיה. כלי ההתקנה מגדיר הכול לקראת בנייה מחדש מתוך המאגר כאשר אתם מציינים דומיין (ראו [דומיין מותאם אישית](#custom-domain)), אך תהליך הבנייה עצמו נמשך מספר דקות. הפניית אפליקציית שולחן העבודה ל-backend באירוח עצמי אינה נתמכת.
- **דוא"ל דורש שרת דוא"ל פעיל.** ההגדרה הראשונית מחייבת אימות דוא"ל, ולכן חובה להגדיר `RESEND_API_KEY` או [שרת ממסר SMTP](#global-mailer) (`MAIL_SMTP_*`). לאחר כניסת המנהל הראשון, כל ארגון יכול להגדיר שרת SMTP או Resend ייעודי משלו ישירות מלוח הבקרה.
- **אפליקציית שולחן העבודה זקוקה ל-Node.js** במחשב כדי להפעיל את השרת המוטמע שלה.
- **ללא עוזר תיעוד מבוסס AI.** עוזר התיעוד מבוסס ה-AI של intlayer.org (`/api/ai/ask`, `/api/search/doc`) נשען על כ-130 מגה-בייט של embeddings מוכנים מראש שאינם נכללים בתמונות האירוח העצמי. שני הנתיבים הללו אינם רשומים במצב אירוח עצמי. תכונות ה-AI המובנות של לוח הבקרה (תרגום, ביקורת, השלמה אוטומטית וצ'אט) אינן מושפעות ודורשות רק את `OPENAI_API_KEY`.

## קישורים שימושיים

- [תיעוד Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [CMS SDK: `@intlayer/api`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md#programmatic-access-with-the-intlayerapi-sdk)
- [שחרורי אפליקציית שולחן עבודה](https://github.com/aymericzip/intlayer/releases/latest)
- Docker Hub: [`intlayer/cms-all`](https://hub.docker.com/r/intlayer/cms-all), [`intlayer/cms-frontend`](https://hub.docker.com/r/intlayer/cms-frontend), [`intlayer/cms-backend`](https://hub.docker.com/r/intlayer/cms-backend), מראה ב-GHCR תחת `ghcr.io/aymericzip/intlayer/`
- [`docker/selfhost/`](https://github.com/aymericzip/intlayer/tree/main/docker/selfhost): Dockerfile, `docker-compose.yml` ו-`.env.template`
