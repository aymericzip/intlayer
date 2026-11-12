---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer build: בניית מילונים מתוך תוכן"
description: למד כיצד לבנות את מילוני ה-Intlayer שלך מתוך קובצי הצהרת תוכן.
keywords:
  - Build
  - בנייה
  - מילונים
  - Dictionaries
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "הוספת דגל `--ci`"
  - version: 8.1.5
    date: 2026-02-23
    changes: "הוספת אפשרות checkTypes"
author: aymericzip
---

# בניית מילונים (Build Dictionaries)

כדי לבנות את המילונים שלך, תוכל להריץ את הפקודות:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

או במצב האזנה (watch mode):

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

פקודה זו תאתר את קובצי הצהרת התוכן שלך כברירת מחדל לפי התבנית `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`, ותבנה את המילונים בתוך תיקיית `.intlayer`.

## כינויים (Aliases):

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## ארגומנטים:

- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט. כדי לאחזר את תצורת Intlayer, הפקודה תחפש את הקובץ `intlayer.config.{ts,js,json,cjs,mjs}` בספריית הבסיס.

  > דוגמה: `npx intlayer build --base-dir ./src`

- **`--env`**: ציון הסביבה (למשל, `development`, `production`). שימושי במקרה שבו אתה משתמש במשתני סביבה בקובץ תצורת ה-Intlayer שלך.

  > דוגמה: `npx intlayer build --env production`

- **`--env-file`**: סיפוק קובץ סביבה מותאם אישית לטעינת משתנים ממנו. שימושי במקרה שבו אתה משתמש במשתני סביבה בקובץ תצורת ה-Intlayer שלך.

  > דוגמה: `npx intlayer build --env-file .env.production.local`

- **`--with`**: הפעלת פקודה במקביל לבנייה.

  > דוגמה: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: דילוג על שלב ההכנה (prepare step).

  > דוגמה: `npx intlayer build --skip-prepare`

- **`--no-cache`**: השבתת המטמון (cache).

  > דוגמה: `npx intlayer build --no-cache`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בפרויקט הנוכחי כאשר מופעלת מתוך תיקיית פרויקט). ניתן להזריק אישורי גישה לכל פרויקט דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer build --ci`

- **`--check-types`**: בדיקת טיפוסים (types) של קובצי הצהרת התוכן.

  > דוגמה: `npx intlayer build --check-types`
