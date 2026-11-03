---
createdAt: 2026-09-21
updatedAt: 2026-11-03
priority: 5
title: "intlayer init infra: אירוח עצמי של Intlayer CMS"
description: "התקן את אפליקציית שולחן העבודה של Intlayer או ארח בעצמך את Intlayer CMS עם Docker, כקונטיינר All-in-One או כסטאק Docker Compose."
keywords:
  - CLI
  - Infrastructure
  - תשתית
  - Self-hosting
  - אירוח עצמי
  - Desktop app
  - אפליקציית שולחן עבודה
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
    changes: "הוספת פקודת init infra"
author: aymericzip
---

# פקודת Intlayer CLI Init Infra

## תיאור

הפקודה `init infra` מגדירה את תשתית Intlayer במחשב שלך. היא מורידה את תוכנית ההתקנה המקוונת עבור הפלטפורמה שלך (`https://intlayer.org/install.sh` ב-macOS / Linux, `https://intlayer.org/install.ps1` ב-Windows) ומריצה אותה כשהטרמינל שלך מחובר אליה, כך שהתפריט ופלט ההתקדמות של תוכנית ההתקנה מוצגים ישירות.

תוכנית ההתקנה שואלת כיצד תרצה להריץ את Intlayer:

- **Desktop app (אפליקציית שולחן עבודה)**: מורידה את לוח הבקרה המקורי עבור מערכת ההפעלה והמעבד שלך ופותחת או מתקינה אותו. גרסת שולחן העבודה מתקשרת עם שרתי Intlayer Cloud.
- **All-in-one Docker**: לוח בקרה + API + MongoDB + Redis + MinIO בתוך קונטיינר יחיד המגובה ב-volume אחד. כותבת את `./intlayer.env` עם הסודות שנוצרו ומושכת את התמונה `intlayer/cms-all`.
- **Docker Compose**: קונטיינר אחד לכל שירות, עבור אירוח עצמי הניתן להרחבה (scalable). כותבת `docker-compose.yml` ו-`.env` לתוך `./intlayer/` ומושכת את התמונות.

תוכנית ההתקנה המקוונת היא מקור האמת היחיד לתהליך ההגדרה: ה-CLI מריץ אותה במקום לממש מחדש את אותם שלבים, כך ש-`npx intlayer init infra` ו-`curl -fsSL https://intlayer.org/install.sh | sh` מבצעים בדיוק את אותה הפעולה.

## שימוש

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

אותו שלב מוצע גם מתוך רשימת המשימות של `npx intlayer init --interactive`, תחת **Infrastructure (desktop app / self-hosting)**.

## אפשרויות

- `-m, --mode <mode>` - אופציונלי. דילוג על תפריט ההתקנה והרצת מצב מסוים ישירות. ערכים קבילים: `desktop`, `docker` (all-in-one) או `compose`. כל ערך אחר ייצא עם הודעת שגיאה המפרטת את המצבים הנתמכים.

## דוגמאות

### בחירת המצב באופן אינטראקטיבי

```bash
npx intlayer init infra
```

### התקנת אפליקציית שולחן העבודה

```bash
npx intlayer init infra --mode desktop
```

### אירוח עצמי באמצעות קונטיינר All-in-One

```bash
npx intlayer init infra --mode docker
```

### אירוח עצמי באמצעות Docker Compose

```bash
npx intlayer init infra --mode compose
```

## דוגמה לפלט

```bash
npx intlayer init infra --mode compose
◇  Installer downloaded
▸ Fetching docker-compose.yml into ./intlayer
▸ Writing ./intlayer/.env

  Let's fill in .env. Press Enter to accept a suggestion;
  every value can be changed later in the file.

? Domain Intlayer will be served on (empty = localhost only):

  How should Intlayer send emails? The first account cannot be verified
  without a working mailer.

    1) Resend            API key from resend.com
    2) SMTP relay        Your own SMTP server
    3) Later             Fill in the file by hand before starting

? Choice [1-3]: 1
? Resend API key:
? Sender address [Intlayer <no-reply@example.com>]:
? OpenAI API key, enables AI translation (empty = skip):
▸ Pulling images

  Everything is installed.

  1. Start the stack:

       cd ./intlayer && docker compose up -d

  Then open http://localhost:3000
  First boot initialises the datastores, so give it a minute. The first
  account you create becomes the super admin.

    Logs      docker compose logs -f
    Stop      docker compose down
    Upgrade   docker compose pull && docker compose up -d
```

כאשר מציינים דומיין (למשל `example.org`), תוכנית ההתקנה מציעה את `https://cms.example.org`, `https://back.example.org` ו-`https://s3.example.org/intlayer` עבור לוח הבקרה, ה-API ואחסון האובייקטים, כותבת אותם לקובץ הסביבה ומשנה את פקודת ההפעלה לבנייה מתוך המאגר, שכן תמונת לוח הבקרה המפורסמת פועלת רק על `localhost`. ראה [Custom domain](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md#custom-domain).

- [Custom domain](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md#custom-domain)

## הגדרות תוכנית ההתקנה

תוכנית ההתקנה קוראת מספר משתני סביבה, שה-CLI מעביר ללא שינוי. הגדר אותם במעטפת שלך לפני הרצת הפקודה:

```bash
INTLAYER_COMPOSE_DIR=./cms npx intlayer init infra --mode compose
```

| משתנה                     | ברירת מחדל                | תקף עבור | תיאור                                            |
| ------------------------- | ------------------------- | -------- | ------------------------------------------------ |
| `INTLAYER_MODE`           | _(נשאל)_                  | הכל      | `desktop`, `docker` או `compose`, זהה ל-`--mode` |
| `INTLAYER_DOWNLOAD_DIR`   | `~/Downloads`             | desktop  | המיקום שבו נשמרת תוכנית ההתקנה של האפליקציה      |
| `INTLAYER_IMAGE`          | `intlayer/cms-all:latest` | docker   | תמונת All-in-one למשיכה                          |
| `INTLAYER_ENV_FILE`       | `./intlayer.env`          | docker   | המיקום שבו ייכתב קובץ הסביבה                     |
| `INTLAYER_CONTAINER_NAME` | `intlayer`                | docker   | שם הקונטיינר                                     |
| `INTLAYER_DATA_VOLUME`    | `intlayer-data`           | docker   | Named volume המעוגן ב-`/data`                    |
| `INTLAYER_APP_PORT`       | `3000`                    | docker   | פורט במחשב המארח עבור לוח הבקרה                  |
| `INTLAYER_API_PORT`       | `3100`                    | docker   | פורט במחשב המארח עבור ה-API                      |
| `INTLAYER_S3_PORT`        | `9000`                    | docker   | פורט במחשב המארח עבור ה-S3 API של MinIO          |
| `INTLAYER_CONSOLE_PORT`   | `9001`                    | docker   | פורט במחשב המארח עבור לוח הניהול של MinIO        |
| `INTLAYER_COMPOSE_DIR`    | `./intlayer`              | compose  | המיקום שבו ייכתבו `docker-compose.yml` ו-`.env`  |
| `INTLAYER_SELFHOST_REF`   | `main`                    | שניהם    | Git ref שממנו נמשכים קובץ ה-compose ותבנית ה-env |

> משתני הפורטים משנים רק את צד ה-**host** של המיפוי. לתמונות המפורסמות יש את `http://localhost:3000`, `http://localhost:3100` ו-`http://localhost:9000` מהודרים לתוך הבאנדל של לוח הבקרה, לכן שמור על ברירות המחדל אלא אם אתה בונה תמונות משלך: ראה [מדריך אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md#limitations).

- [מדריך אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md#limitations)

## דרישות

- **אפליקציית שולחן העבודה** דורשת את [Node.js](https://nodejs.org): האפליקציה כוללת את שרת לוח הבקרה ומפעילה אותו באמצעות הבינארי של `node` המותקן במחשב.
- **מצבי Docker** דורשים את [Docker](https://docs.docker.com/get-docker/) (Docker Desktop עם תשתית WSL 2 ב-Windows). מצב Compose דורש בנוסף את התוסף `docker compose`.

## הערות

- הרצה חוזרת של הפקודה בטוחה לחלוטין: קובץ סביבה קיים לעולם אינו נדרס, כך שהיא משמשת גם כנתיב שדרוג (תוכנית ההתקנה מושכת את התמונות העדכניות ביותר ושומרת על הסודות שלך).
- תוכנית ההתקנה מורדת לספרייה זמנית ונמחקת ברגע שהיא מסתיימת, ללא קשר לתוצאה.
- קוד היציאה של הפקודה הוא זה של תוכנית ההתקנה. אם ההורדה עצמה נכשלת, ה-CLI מדפיס את פקודת `curl … | sh` (או `irm … | iex`) המקבילה כדי שתוכל להריץ את תוכנית ההתקנה ישירות.
- מצבי Docker דורשים שירות דואר (mailer) כדי לשלוח הודעות אימייל להתחברות. תוכנית ההתקנה שואלת על כך; אם תדלג על השאלה (או תריץ ללא טרמינל אינטראקטיבי, שבו מדלגים על השאלות לחלוטין), הגדר את Resend או SMTP בקובץ הסביבה שנוצר: ראה [שירות דואר גלובלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md#global-mailer).

## נושאים קשורים

- [מדריך אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)
- [אתחול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/init.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)
