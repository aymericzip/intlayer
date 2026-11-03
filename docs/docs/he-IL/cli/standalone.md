---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer standalone: באנדל עצמאי של Intlayer לכל דף"
description: "בנה באנדל JavaScript יחיד של Intlayer והחבילות הדרושות לך, כדי להשתמש בו בדפים ללא מנהל חבילות או באנדלר."
keywords:
  - Standalone
  - עצמאי
  - Bundle
  - באנדל
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "הוספת דגל `--ci`"
  - version: 8.6.4
    date: 2026-03-31
    changes: "אתחול תיעוד פקודת standalone"
author: aymericzip
---

# באנדל עצמאי (Standalone Bundle)

הפקודה `standalone` מאפשרת לך ליצור באנדל JavaScript עצמאי המכיל את Intlayer וכל חבילה אחרת שתציין. זה שימושי במיוחד לשימוש ב-Intlayer בסביבות ללא מנהל חבילות או באנדלר, כגון אפליקציית HTML/JS פשוטה.

הבאנדל משתמש ב-[esbuild](https://esbuild.github.io/) כדי לשלב את החבילות המבוקשות ואת התלויות שלהן לתוך קובץ יחיד שניתן לייבא בקלות לכל פרויקט רשת.

## שימוש

```bash packageManager="npm"
npx intlayer standalone --packages [packages...] [options]
```

```bash packageManager="yarn"
yarn intlayer standalone --packages [packages...] [options]
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages [packages...] [options]
```

```bash packageManager="bun"
bun x intlayer standalone --packages [packages...] [options]
```

## אפשרויות

- `-o, --outfile [outfile]` - אופציונלי. שם קובץ הפלט. ברירת המחדל היא `intlayer-bundle.js`.
- `--packages [packages...]` - חובה. רשימת חבילות להכללה בבאנדל (למשל `intlayer`, `vanilla-intlayer`).
- `--version [version]` - אופציונלי. גרסת החבילות לבאנדל. אם לא צוין, ברירת המחדל היא גרסת ה-Intlayer CLI.
- `--minify` - אופציונלי. האם לבצע מזעור (minify) לפלט. ברירת המחדל היא `true`.
- `--platform [platform]` - אופציונלי. פלטפורמת היעד עבור הבאנדל (למשל `browser`, `node`). ברירת המחדל היא `browser`.
- `--format [format]` - אופציונלי. פורמט הפלט עבור הבאנדל (למשל `esm`, `cjs`, `iife`). ברירת המחדל היא `esm`.

## אפשרויות נפוצות

- `--env-file [envFile]` - קובץ סביבה.
- `-e, --env [env]` - סביבה.
- `--base-dir [baseDir]` - ספריית בסיס.
- `--no-cache` - השבתת המטמון.
- `--ci` - הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.
- `--verbose` - פלט מפורט.

## דוגמאות:

### יצירת באנדל עבור Vanilla JS:

```bash packageManager="npm"
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

```bash packageManager="yarn"
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

```bash packageManager="bun"
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

פעולה זו תיצור קובץ `intlayer.js` המכיל את שתי החבילות `intlayer` ו-`vanilla-intlayer`, ממוזער ובפורמט ESM, מוכן לשימוש בדפדפן באמצעות תגית `<script>`.

### יצירת באנדל לגרסה ספציפית:

```bash packageManager="npm"
npx intlayer standalone --packages intlayer --version 8.6.4
```

```bash packageManager="yarn"
yarn intlayer standalone --packages intlayer --version 8.6.4
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages intlayer --version 8.6.4
```

```bash packageManager="bun"
bun x intlayer standalone --packages intlayer --version 8.6.4
```

### יצירת באנדל בפורמט שונה:

```bash packageManager="npm"
npx intlayer standalone --packages intlayer --format iife
```

```bash packageManager="yarn"
yarn intlayer standalone --packages intlayer --format iife
```

```bash packageManager="pnpm"
pnpm intlayer standalone --packages intlayer --format iife
```

```bash packageManager="bun"
bun x intlayer standalone --packages intlayer --format iife
```

## מה הפקודה עושה:

1. **יוצרת סביבה זמנית** - מקימה ספרייה זמנית לניהול התלויות.
2. **מתקינה חבילות** - משתמשת ב-`npm` או ב-`bun` (אם זמין) כדי להתקין את החבילות המבוקשות ואת התלויות שלהן.
3. **יוצרת נקודת כניסה (entry point)** - מייצרת קובץ כניסה זמני שמייצא את כל החבילות המבוקשות וחושף אותן כמשתנים גלובליים בריצה בדפדפן.
4. **מאגדת באמצעות esbuild** - משתמשת ב-esbuild כדי לאגד הכל לקובץ יחיד, תוך החלת מזעור ועיצוב כפי שהתבקש.
5. **מייצאת את הקובץ** - כותבת את הבאנדל שנוצר לנתיב הפלט שציינת.

## משתנים גלובליים (Global Variables)

כאשר הבאנדל נטען בדפדפן, הוא חושף את החבילות המבוקשות כמשתנים גלובליים על גבי אובייקט `window`. שמות המשתנים נגזרים משמות החבילות (למשל `intlayer` הופך ל-`Intlayer`, `vanilla-intlayer` הופך ל-`VanillaIntlayer`).

```javascript
// גישה ל-Intlayer מתוך הבאנדל
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
