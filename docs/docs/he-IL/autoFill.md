---
createdAt: 2025-03-13
updatedAt: 2026-11-03
priority: 8
title: "מילוי אוטומטי (Auto Fill): תרגום תוכן חסר באופן אוטומטי"
description: "השתמשו במילוי אוטומטי של Intlayer כדי לייצר תרגומים חסרים מתוך שפת המקור שלכם ולכתוב אותם לקובצי התוכן המתאימים."
keywords:
  - מילוי אוטומטי
  - Auto Fill
  - אוטומציית תוכן
  - תוכן דינמי
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 7.0.0
    date: 2025-10-23
    changes: "שינוי שם `autoFill` ל-`fill` ועדכון ההתנהגות"
  - version: 6.0.0
    date: 2025-09-20
    changes: "הוספת הגדרות גלובליות"
  - version: 6.0.0
    date: 2025-09-17
    changes: "הוספת משתנה `{{fileName}}`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריית גרסאות ראשונית"
author: aymericzip
---

# מילוי תרגומים בקובצי הצהרת תוכן

**מילוי אוטומטי (Autofill) של קובצי הצהרת תוכן** בתוך תהליך ה-CI שלכם הוא דרך מצוינת להאיץ את זרימת העבודה של הפיתוח.

## הבנת התנהגות המערכת

פקודת `fill` כוללת שני מצבים:

- **Complete**: ממלא אוטומטית את כל התוכן החסר עבור כל שפה ועורך את הקובץ הנוכחי, או קובץ אחר אם צוין. כלומר, מצב complete ידלג על תרגום תוכן קיים אם הוא כבר תורגם.
- **Review**: ממלא אוטומטית את **כל** התוכן עבור כל שפה ומייצר עבור קובץ ספציפי, או קובץ אחר אם צוין.

פקודת ה-fill תעבד את כל קובצי הצהרת התוכן המקומיים שלכם. כלומר, היא לא תעבד תוכן מרוחק מה-CMS. ה-CMS כולל מערכת ניהול תרגומים משלו.
אם אתם משתמשים בתוספים כגון `@intlayer/sync-json-plugin`, ‏Intlayer ימיר את קובצי ה-JSON לקובצי הצהרת תוכן מקומיים, ולכן הם יעובדו על ידי פקודת `fill`.

הקבצים החדשים שנוצרו כוללים הוראת `filled` כמטא-דאטה של המילון. הוראה זו תשמש את Intlayer כדי לדעת אם הקובץ מולא אוטומטית או לא, ולדלג על תרגום חוזר של הקובץ אם ההוראה קיימת.

Intlayer יתחשב בנוסף בהנחיות הבאות עבור מילוי אוטומטי:

- מתוך קובץ ה-`.content.{ts|js|json}` שלכם, הוראת `fill`
- מתוך קובץ ההגדרות שלכם `.intlayer.config.ts`, הוראת `dictionary.fill`
- אחרת יוגדר כברירת מחדל כ-`true`

עבור קובצי הצהרת תוכן לפי שפה (per-locale), ההוראה `true` תוחלף ב-`./{{fileName}}.fill.content.json`. זאת משום שקובץ הצהרת תוכן עבור שפה בודדת אינו יכול לקבל תוכן מתורגם של שפות נוספות באותו הקובץ. לכן, ייווצר קובץ חדש כדי לא לדרוס את הקובץ הקיים.

## התנהגות ברירת המחדל

כברירת מחדל, `fill` מוגדר גלובלית כ-`true`, מה שאומר ש-Intlayer ימלא אוטומטית את כל קובצי התוכן ויערוך את הקובץ עצמו. ניתן להתאים התנהגות זו בכמה דרכים:

### אפשרויות הגדרה גלובליות

1. **`fill: true` (ברירת מחדל)**, ממלא אוטומטית את כל השפות ועורך את הקובץ הנוכחי
2. **`fill: false`**, משבית מילוי אוטומטי עבור קובץ תוכן זה
3. **`fill: "./relative/path/to/file"`**, יוצר/מעדכן את הקובץ שצוין מבלי לערוך את הקובץ הנוכחי, על ידי הפניה לנתיב יחסי המפוענח ביחס למיקום הקובץ הנוכחי
4. **`fill: "/absolute/path/to/file"`**, יוצר/מעדכן את הקובץ שצוין מבלי לערוך את הקובץ הנוכחי, על ידי הפניה לנתיב יחסי המפוענח ביחס לתיקיית הבסיס (השדה `baseDir` בקובץ ההגדרות `.intlayer.config.ts`)
5. **`fill: "C:\\absolute\path\to\file"`**, יוצר/מעדכן את הקובץ שצוין מבלי לערוך את הקובץ הנוכחי, על ידי הפניה לנתיב מוחלט המפוענח לפי מערכת ההפעלה שלכם
6. **`fill: { [key in Locales]?: string }`**, יוצר/מעדכן את הקובץ שצוין עבור כל שפה בנפרד

### שינויי התנהגות בגרסה v7

בגרסה v7, התנהגות פקודת `fill` עודכנה:

- **`fill: true`**, משכתב את הקובץ הנוכחי עם התוכן הממולא עבור כל השפות
- **`fill: "path/to/file"`**, ממלא את הקובץ שצוין מבלי לשנות את הקובץ הנוכחי
- **`fill: false`**, משבית לחלוטין את המילוי האוטומטי

בעת שימוש באפשרות נתיב לכתיבה לקובץ אחר, מנגנון המילוי פועל באמצעות יחסי _מאסטר-עבד (master-slave)_ בין קובצי הצהרת התוכן. הקובץ הראשי (master) משמש כמקור האמת, וכאשר הוא מתעדכן, Intlayer יחיל אוטומטית את השינויים הללו על קובצי ההצהרה הנגזרים (הממולאים) המצוינים בנתיב.

### התאמה אישית לפי שפה

תוכלו גם להתאים אישית את ההתנהגות עבור כל שפה באמצעות אובייקט:

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  content: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
      defaultLocale: Locales.ENGLISH,
      requiredLocales: [Locales.ENGLISH], // מומלץ כדי למנוע שגיאות טיפוס בפונקציית ה-t
    },
  },
  dictionary: {
    fill: {
      en: true, // מילוי ועריכת הקובץ הנוכחי עבור אנגלית
      fr: "./translations/fr.json", // יצירת קובץ נפרד עבור צרפתית
      es: false, // השבתת מילוי עבור ספרדית
    },
  },
};
```

הדבר מאפשר לכם להגדיר התנהגויות מילוי שונות עבור שפות שונות באותו הפרויקט.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  fill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

להלן דוגמה של [קובץ הצהרת תוכן לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) המשתמש בהוראת `fill`.

- [קובץ הצהרת תוכן לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

כאשר תריצו את הפקודה הבאה:

```bash packageManager="npm"
npx intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="yarn"
yarn intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="pnpm"
pnpm intlayer fill --file 'src/components/example/example.content.ts'
```

```bash packageManager="bun"
bun x intlayer fill --file 'src/components/example/example.content.ts'
```

‏Intlayer ייצר אוטומטית את קובץ ההצהרה הנגזר בנתיב `src/components/example/example.content.json`, תוך מילוי כל השפות שטרם הוצהרו בקובץ הראשי.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

לאחר מכן, שני קובצי ההצהרה ימוזגו למילון יחיד, הנגיש באמצעות ה-hook הסטנדרטי `useIntlayer("example")` (ב-React) או ה-composable (ב-Vue).

## הגדרות גלובליות

ניתן לקבוע את תצורת המילוי האוטומטי הגלובלית בקובץ `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // יצירה אוטומטית של תרגומים חסרים עבור כל המילונים
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // יצירה אוטומטית של תרגומים חסרים לכל המילונים בדומה לשימוש ב-"./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

תוכלו עדיין לכוונן הגדרות עבור כל מילון בנפרד באמצעות השדה `fill` בקובצי התוכן. Intlayer יתחשב תחילה בהגדרה הספציפית ברמת המילון ורק לאחר מכן ייסוג להגדרה הגלובלית.

## פורמט קובץ ממולא אוטומטית

הפורמט המומלץ עבור קובצי הצהרה שמולאו אוטומטית הוא **JSON**, מה שמסייע במניעת אילוצי עיצוב קוד (formatting). עם זאת, Intlayer תומך גם ב-`.ts`,‏ `.js`,‏ `.mjs`,‏ `.cjs` ובפורמטים נוספים.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "./example.filled.content.ts",
  content: {
    // התוכן שלכם
  },
};
```

זה ייצר את הקובץ במיקום:

```
src/components/example/example.filled.content.ts
```

> יצירת קובצי `.js`,‏ `.ts` ודומיהם פועלת באופן הבא:
>
> - אם הקובץ כבר קיים, Intlayer יפענח אותו באמצעות AST (עץ תחביר מופשט) כדי לאתר כל שדה ולהחדיר תרגומים חסרים.
> - אם הקובץ אינו קיים, Intlayer ייצר אותו באמצעות תבנית ברירת המחדל של קובץ הצהרת תוכן.

## נתיבים מוחלטים

השדה `fill` תומך גם בנתיבים מוחלטים.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/example.content.json",
  content: {
    // התוכן שלכם
  },
};
```

זה ייצר את הקובץ במיקום:

```
/messages/example.content.json
```

## יצירה אוטומטית של קובצי הצהרת תוכן לפי שפה

השדה `fill` תומך גם ביצירה של קובצי הצהרת תוכן **לפי שפה (per-locale)**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // התוכן שלכם
  },
};
```

פעולה זו תייצר שני קבצים נפרדים:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> במקרה זה, אם האובייקט אינו מכיל את כל השפות, Intlayer ידלג על יצירת השפות הנותרות.

## סינון מילוי אוטומטי של שפות ספציפיות

שימוש באובייקט עבור השדה `fill` מאפשר לכם להחיל מסננים ולייצר קבצים רק עבור שפות ספציפיות.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // התוכן שלכם
  },
};
```

פעולה זו תייצר רק את קובץ התרגום בצרפתית.

## משתני נתיב

ניתן להשתמש במשתנים בתוך נתיב ה-`fill` כדי לפענח דינמית את נתיבי היעד עבור הקבצים שנוצרו.

**משתנים זמינים:**

- `{{locale}}`, קוד השפה (למשל `fr`, `es`)
- `{{fileName}}`, שם הקובץ (למשל `index`)
- `{{key}}`, מפתח המילון (למשל `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // התוכן שלכם
  },
};
```

פעולה זו תייצר:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "./{{fileName}}.content.json",
  content: {
    // התוכן שלכם
  },
};
```

פעולה זו תייצר:

- `./index.content.json`
- `./index.content.json`
