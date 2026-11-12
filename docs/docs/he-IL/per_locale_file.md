---
createdAt: 2025-04-18
updatedAt: 2026-11-03
priority: 8
title: "קובצי הצהרת תוכן לפי שפה (Per-Locale Content Declaration Files)"
description: "גלו כיצד להצהיר על תוכן לפי שפה ב-Intlayer. עקבו אחר התיעוד כדי להבין את הפורמטים השונים ותרחישי השימוש."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - לפי שפה
  - Per-Locale
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
history:
  - version: 7.3.1
    date: 2025-11-29
    changes: "הוספת הגדרה גלובלית עבור קבצים לפי שפה"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריית גרסאות ראשונית"
author: aymericzip
---

# הצהרת תוכן לפי שפה (`Per-Locale`) ב-Intlayer

Intlayer תומך בשתי דרכים להצהרת תוכן רב-לשוני:

- קובץ יחיד עם כל התרגומים
- קובץ אחד לכל שפה (פורמט לפי שפה, per-locale)

גמישות זו מאפשרת:

- הגירה קלה מכלי i18n אחרים
- תמיכה בתהליכי עבודה אוטומטיים של תרגום
- ארגון ברור של תרגומים לקבצים נפרדים וייעודיים לכל שפה

## פורמט לפי שפה (Per-Locale Format)

פורמט זה שימושי כאשר:

- אתם מעוניינים לנהל גרסאות או לדרוס תרגומים באופן עצמאי.
- אתם משלבים תהליכי עבודה של תרגום מכונה או תרגום אנושי.

ניתן לפצל תרגומים לקובצי שפה נפרדים על ידי ציון השדה `locale`:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // חשוב
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // חשוב
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // חשוב
  "content": {
    "multilingualContent": "Title of my component",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // חשוב
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> חשוב: ודאו שהשדה `locale` מוגדר. הוא מיידע את Intlayer איזו שפה מייצג הקובץ.

> הערה: בשני המקרים, על קובץ הצהרת התוכן לעקוב אחר תבנית השמות `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` כדי ש-Intlayer יזהה אותו. הסיומת `.[locale]` היא אופציונלית ומשמשת כמוסכמת שמות בלבד.

### הגדרה גלובלית עבור קבצים לפי שפה

תוכלו לקבוע את התצורה הגלובלית עבור קבצים לפי שפה על ידי הוספת ההגדרות הבאות לקובץ `intlayer.config.ts`:

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    locale: Locales.ENGLISH,
  },
};

export default config;
```

באמצעות הגדרה זו, כל הקבצים לפי שפה ייווצרו כאשר שפת ברירת המחדל מוגדרת לאנגלית. הדבר כולל גם יצירה של קובצי `.content` באמצעות פקודת `extract` והמהדר. (עיינו ב[מהדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) או ב[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) למידע נוסף.)

- [מהדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

## קובץ יחיד עם מספר תרגומים

פורמט זה אידיאלי עבור:

- איטרציה מהירה בקוד.
- שילוב חלק עם ה-CMS.

זוהי הגישה המומלצת עבור רוב מקרי השימוש. היא מרכזת את התרגומים, ומאפשרת לבצע איטרציות במהירות ולהשתלב עם ה-CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      he: "כותרת הרכיב שלי",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      he: "כותרת הרכיב שלי",
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "he": "כותרת הרכיב שלי",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> מומלץ: פורמט זה הוא הטוב ביותר בעת שימוש בעורך הוויזואלי של Intlayer או בעת ניהול תרגומים ישירות בקוד.

## שילוב פורמטים (Mixing Formats)

תוכלו לשלב את שתי גישות ההצהרה עבור אותו מפתח תוכן. לדוגמה:

- להצהיר על תוכן הבסיס שלכם סטטית בקובץ כמו `index.content.ts`.
- להוסיף או לדרוס תרגומים ספציפיים בקבצים נפרדים כגון `index.fr.content.ts` או `index.content.json`.

הגדרה זו שימושית במיוחד כאשר:

- אתם מעוניינים להגדיר את מבנה התוכן הראשוני בקוד.
- אתם מתכננים להעשיר או להשלים תרגומים בהמשך באמצעות ה-CMS או כלים אוטומטיים.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### דוגמה

להלן קובץ הצהרת תוכן רב-לשוני:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Title of my component",
    projectName: "My project",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

‏Intlayer ממזג קבצים רב-לשוניים וקבצים לפי שפה באופן אוטומטי.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // שפת ברירת המחדל היא ENGLISH, ולכן יוחזר התוכן באנגלית

console.log(JSON.stringify(intlayer, null, 2));
// תוצאה:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayerEs = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayerEs, null, 2));
// תוצאה:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayerFr = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayerFr, null, 2));
// תוצאה:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### יצירת תרגום אוטומטית

השתמשו ב-[Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md) כדי למלא אוטומטית תרגומים חסרים בהתבסס על השירותים המועדפים עליכם.

- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
