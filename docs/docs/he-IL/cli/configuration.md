---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer configuration: קבלה והעלאה של תצורה"
description: "השתמש ב-Intlayer CLI כדי להדפיס את התצורה המפוענחת שלך ולהעלות אותה ל-Intlayer CMS, כך שלוח הבקרה והפרויקט שלך יישארו מסונכרנים."
keywords:
  - Configuration
  - תצורה
  - Config
  - CLI
  - Intlayer
  - CMS
slugs:
  - doc
  - concept
  - cli
  - configuration
author: aymericzip
---

# ניהול תצורה (Manage Configuration)

## קבלת תצורה (Get Configuration)

הפקודה `configuration get` מאחזרת את התצורה הנוכחית של Intlayer, במיוחד את הגדרות האזורים והשפות (locales). פקודה זו שימושית לאימות ההגדרות שלך.

```bash packageManager="npm"
npx intlayer configuration get
```

```bash packageManager="yarn"
yarn intlayer configuration get
```

```bash packageManager="pnpm"
pnpm intlayer configuration get
```

```bash packageManager="bun"
bun x intlayer configuration get
```

## כינויים (Aliases):

- `npx intlayer config get`
- `npx intlayer conf get`

## ארגומנטים:

- **`--env`**: ציון הסביבה (למשל, `development`, `production`).
- **`--env-file`**: סיפוק קובץ סביבה מותאם אישית לטעינת משתנים ממנו.
- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט.
- **`--verbose`**: הפעלת רישום מפורט (verbose logging) לצורך ניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).
- **`--no-cache`**: השבתת המטמון (cache).
- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בפרויקט הנוכחי כאשר מופעלת מתוך תיקיית פרויקט). ניתן להזריק אישורי גישה לכל פרויקט דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

## העלאת תצורה (Push Configuration)

הפקודה `configuration push` מעלה את התצורה שלך ל-Intlayer CMS ולעורך. שלב זה נחוץ כדי לאפשר שימוש במילונים מרוחקים בעורך הוויזואלי של Intlayer (Visual Editor).

```bash packageManager="npm"
npx intlayer configuration push
```

```bash packageManager="yarn"
yarn intlayer configuration push
```

```bash packageManager="pnpm"
pnpm intlayer configuration push
```

```bash packageManager="bun"
bun x intlayer configuration push
```

## כינויים (Aliases):

- `npx intlayer config push`
- `npx intlayer conf push`

## ארגומנטים:

- **`--env`**: ציון הסביבה (למשל, `development`, `production`).
- **`--env-file`**: סיפוק קובץ סביבה מותאם אישית לטעינת משתנים ממנו.
- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט.
- **`--verbose`**: הפעלת רישום מפורט (verbose logging) לצורך ניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).
- **`--no-cache`**: השבתת המטמון (cache).
- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בפרויקט הנוכחי כאשר מופעלת מתוך תיקיית פרויקט). ניתן להזריק אישורי גישה לכל פרויקט דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

על ידי העלאת התצורה, הפרויקט שלך משולב באופן מלא עם ה-Intlayer CMS, מה שמאפשר ניהול מילונים חלק בין צוותים.
