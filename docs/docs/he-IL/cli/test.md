---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: בדיקת תרגומים חסרים
description: למד כיצד לבדוק ולזהות תרגומים חסרים במילונים שלך.
keywords:
  - Test
  - בדיקה
  - Missing Translations
  - תרגומים חסרים
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
author: aymericzip
---

# בדיקת תרגומים חסרים (Test missing translations)

```bash packageManager="npm"
npx intlayer test
```

```bash packageManager="yarn"
yarn intlayer test
```

```bash packageManager="pnpm"
pnpm intlayer test
```

```bash packageManager="bun"
bun x intlayer test
```

## כינויים (Aliases):

- `npx intlayer content test`

פקודה זו מנתחת את קובצי הצהרת התוכן שלך כדי לזהות תרגומים חסרים בכל השפות המוגדרות. היא מספקת דוח מקיף המציג אילו מפתחות תרגום חסרים ועבור אילו שפות, ועוזרת לך לשמור על עקביות בכל התוכן הרב-לשוני שלך.

## דוגמה לפלט:

```bash
npx intlayer content test

Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## ארגומנטים:

**אפשרויות תצורה:**

- **`--env`**: ציון הסביבה (למשל, `development`, `production`).
- **`--env-file [envFile]`**: קובץ סביבה מותאם אישית לטעינת משתנים ממנו.
- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט.

  > דוגמה: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: השבתת המטמון.

  > דוגמה: `npx intlayer build --no-cache`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer test --ci`

**אפשרויות הכנה (Preparation):**

- **`--build`**: בניית המילונים לפני הבדיקה כדי לוודא שהתוכן מעודכן. True יכפה בנייה, false ידלג על בנייה, undefined יאפשר שימוש במטמון של הבנייה.

**אפשרויות רישום (Log):**

- **`--verbose`**: הפעלת לוגים מפורטים לניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).

  > דוגמה: `npx intlayer content test --verbose`

## דוגמה:

```bash packageManager="npm"
npx intlayer content test --verbose
```

```bash packageManager="yarn"
yarn intlayer content test --verbose
```

```bash packageManager="pnpm"
pnpm intlayer content test --verbose
```

```bash packageManager="bun"
bun x intlayer content test --verbose
```

הפלט מסייע לך לזהות במהירות אילו תרגומים יש להשלים כדי להבטיח שהאפליקציה שלך פועלת כראוי בכל השפות המוגדרות.
