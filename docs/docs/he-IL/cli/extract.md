---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer extract: חילוץ מחרוזות מתוך רכיבים"
description: למד כיצד לחלץ מחרוזות מתוך הרכיבים שלך לקובץ .content סמוך לרכיב.
keywords:
  - Extract
  - חילוץ
  - Components
  - רכיבים
  - Migration
  - הגירה
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
author: aymericzip
---

# חילוץ מחרוזות (Extract strings)

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

פקודה זו מנתחת את קובצי הקוד שלך כדי לחלץ מחרוזות מתוך רכיבים לתוך קובץ `.content` סמוך לרכיב. היא תומכת בבחירת קבצים אינטראקטיבית או במיקוד לקבצים ספציפיים.

## כינויים (Aliases):

- `npx intlayer ext`

## ארגומנטים:

**אפשרויות בחירת קבצים:**

- **`-f, --file [files...]`**: רשימת קבצים ספציפיים לחילוץ. אם לא סופקה, ה-CLI יסרוק עבור קבצים תואמים (`**/*.{tsx,jsx,vue,svelte,ts,js}`) ויבקש ממך לבחור אילו מהם לחלץ.

  > דוגמה: `npx intlayer extract -f src/components/MyComponent.tsx`

- **`--code-only`**: חילוץ קוד הרכיב בלבד (ללא כתיבת הצהרת תוכן).

  > דוגמה: `npx intlayer extract --code-only`

- **`--declaration-only`**: יצירת הצהרת תוכן בלבד (ללא שכתוב של הרכיב).

  > דוגמה: `npx intlayer extract --declaration-only`

**אפשרויות תצורה:**

- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט.
- **`--env`**: ציון הסביבה.
- **`--env-file`**: קובץ סביבה מותאם אישית.
- **`--verbose`**: הפעלת לוגים מפורטים (verbose logging).
- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

**תוספים נדרשים (Required plugins):**

פקודת ה-extract עובדת ללא תוספים נוספים על קובצי TypeScript / JSX. עם זאת, היא דורשת את התקנת התוספים הבאים עבור פרויקטים ב-Vue ו-Svelte:

- **`@intlayer/vue-compiler`**: עבור קובצי Vue.
- **`@intlayer/svelte-compiler`**: עבור קובצי Svelte.
