---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: תוסף Prettier | מיון תרגומי Intlayer
description: "מיין את הלוקאלים של t(), הקטגוריות של plural(), התנאים של enu(), המקרים של select() והמפתחות של הצהרות התוכן שלך בעזרת prettier-plugin-intlayer."
keywords:
  - Intlayer
  - Prettier
  - עיצוב קוד
  - מיון תרגומים
  - מיון לוקאלים
  - i18n
  - בינאום
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תוסף Prettier

`prettier-plugin-intlayer` מסדר את מפתחות התרגומים שלך בסדר קבוע בכל פעם ש-Prettier מעצב קובץ. ה-diffs נשארים קטנים, התנגשויות מיזוג (merge conflicts) הופכות לנדירות יותר וקל לזהות לוקאל חסר.

```ts
// לפני
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// אחרי
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## התקנה

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

נדרש Prettier בגרסה 3 ומעלה.

אם הפרויקט שלך כבר משתמש ב-Prettier, הפקודה `intlayer init prettier` תתקין את התוסף ותוסיף אותו לקובץ ההגדרות עבורך.

## שימוש

הוסף את התוסף להגדרות Prettier שלך:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

כדי להחיל אותו על קובצי הצהרות התוכן בלבד, השתמש ב-override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## מה ממוין

### `t()`: לוקאלים

הלוקאלים המוצמדים מופיעים ראשונים (`en` כברירת מחדל). שאר הלוקאלים מופיעים בסדר אלפביתי.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: סדר CLDR

הקטגוריות מסודרות מהכמות הקטנה ביותר אל ברירת המחדל (fallback): `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: ספים עולים

התנאים ממוינים לפי המספר שלהם, ולאחר מכן לפי האופרטור (`<1`, `<=1`, `1`, `>=1`, `>1`). הערך `fallback` ממוקם אחרון.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

בזמן ריצה, התנאי התואם הראשון מנצח. התוסף מחיל את הסדר החדש רק כאשר כל כמות עדיין מניבה את אותו התוכן בדיוק. כאשר הסדר קובע את התוצאה, האובייקט נשאר כפי שנכתב. לדוגמה, ב-`{ '<1': …, '<=-2.3': … }` המפתח `'<1'` לוכד כל מספר שלילי.

### `select()`: סדר אלפביתי

המקרים ממוינים בסדר אלפביתי ו-`fallback` ממוקם אחרון.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

ללא מפתח `fallback` או `other`, המקרה האחרון משמש כברירת מחדל. מקרה זה נשאר אחרון ורק המקרים שלפניו ממוינים.

### קובצי `.content.json`

המבנה הסדרתי (serialized) ממוין באותו אופן: `{ "nodeType": "translation", "translation": { … } }`, כמו גם צומתי `plural`, `enumeration` ו-`select`.

### מפתחות תוכן (אופציונלי)

באמצעות `intlayerSortContentKeys: true`, התוסף ממיין גם את מפתחות ה-`content` של המילון בסדר אלפביתי, בכל רמת קינון. הגדרה זו חלה רק על קובצי `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

המיון ממשיך דרך כל פונקציית עזר (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) כדי להגיע לאובייקטים שבתוכם. מיפוי המפתחות הפנימי של כל פונקציית עזר שומר על הסדר שלו. מפתחות המועברים אל `cond()` ו-`gender()` לעולם אינם ממוינים מחדש, מכיוון שהמפתח האחרון שלהם משמש כ-fallback. השדות שלצד `content` (`key`, `title`, `locale`…) נשארים ללא שינוי.

## אפשרויות

| אפשרות                    | ברירת מחדל | תיאור                                                                                  |
| ------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]`   | לוקאלים הנשמרים ראשונים ב-`t()`, בסדר זה. העבר `[]` כדי למיין את כל הלוקאלים אלפביתית. |
| `intlayerSortContentKeys` | `false`    | בקובצי `*.content.*`, מיין גם את מפתחות התוכן של המילון ואובייקטים מקוננים.            |

## מה נשאר ללא שינוי

- אובייקטים המכילים spread (`...base`), מפתח מחושב (`[key]`), פונקציה (method) או מפתח משוכפל.
- מיפויי `plural()` בעלי מפתח שאינו קטגוריית CLDR.
- מיפויי `enu()` שהסדר החדש שלהם ישנה את התוכן המתקבל.
- קריאות לכל פונקציה אחרת בעלת שם הדומה לפונקציית עזר אך מועבר אליה ארגומנט שאינו אובייקט.

הערות זזות יחד עם המפתח שאליו הן שייכות.

## מנתחים נתמכים (Parsers)

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` ו-`jsonc`. בלוקי ה-`<script>` של קובצי Vue, Svelte ו-Astro מעוצבים באמצעות מנתחים אלו.

> **מגבלה ידועה.** Prettier מפעיל תוסף יחיד לכל parser. אם תוסף אחר מחליף גם הוא את מנתחי ה-JavaScript/TypeScript (לדוגמה `prettier-plugin-tailwindcss`), רק התוסף האחרון ברשימה יוחל על קבצים אלו. הגדר את טווח `prettier-plugin-intlayer` לקובצי `*.content.*` באמצעות override כדי למנוע התנגשות.
