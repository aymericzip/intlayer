---
createdAt: 2025-02-07
updatedAt: 2026-11-03
priority: 8
title: "קובצי הגדרת תוכן (.content.ts)"
description: "הגדר את התוכן הרב-לשוני שלך בקובצי .content לצד הרכיבים שלך: פורמטים נתמכים, סיומות קבצים וכיצד Intlayer מגלה אותם."
keywords:
  - קובץ תוכן
  - תיעוד
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 9.1.0
    date: 2026-07-30
    changes: "הוספת סוג תוכן select"
  - version: 8.10.0
    date: 2026-05-19
    changes: "הוספת תמיכה בפורמטי קבצים YAML ו-Markdown"
  - version: 8.9.0
    date: 2026-05-12
    changes: "הוספת סוג צומת תוכן `plural`"
  - version: 8.0.0
    date: 2026-01-28
    changes: "הוספת סוג צומת תוכן `html`"
  - version: 8.0.0
    date: 2026-01-24
    changes: "שינוי שם מצב ייבוא `live` ל-`fetch` כדי לתאר טוב יותר את המנגנון הפנימי."
  - version: 8.0.0
    date: 2026-01-18
    changes: "הוספת אפשרויות מילון `location`, `schema` ו-`importMode`"
  - version: 7.5.13
    date: 2026-01-10
    changes: "הוספת תמיכה בפורמטי קבצים JSON5 ו-JSONC"
  - version: 7.5.0
    date: 2025-12-13
    changes: "הוספת תמיכה בפורמט ICU ו-i18next"
  - version: 7.0.0
    date: 2025-10-23
    changes: "שינוי שם `autoFill` ל-`fill`"
  - version: 6.0.0
    date: 2025-09-20
    changes: "הוספת תיעוד שדות"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# קובץ תוכן (Content File)

<iframe title="i18n, Markdown, JSON… פתרון אחד לניהול הכל | Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

## מהו קובץ תוכן?

קובץ תוכן ב-Intlayer הוא קובץ המכיל הגדרות מילון (dictionaries).
קבצים אלה מגדירים את תוכן הטקסט, התרגומים והמשאבים של האפליקציה שלך.
קובצי תוכן מעובדים על ידי Intlayer כדי ליצור מילונים.

המילונים יהיו התוצאה הסופית שהאפליקציה שלך תייבא באמצעות ה-hook‏ `useIntlayer`.

### מושגי מפתח

#### מילון (Dictionary)

מילון הוא אוסף מובנה של תוכן המאורגן לפי מפתחות (keys). כל מילון מכיל:

- **Key**: מזהה ייחודי עבור המילון
- **Content**: ערכי התוכן עצמם (טקסט, מספרים, אובייקטים וכו')
- **Metadata**: מידע נוסף כגון כותרת, תיאור, תגיות וכו'

#### קובץ תוכן (Content File)

דוגמה לקובץ תוכן:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type ReactNode } from "react";
import {
  t,
  enu,
  plural,
  cond,
  select,
  gender,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  pluralContent: string;
  conditionalContent: string;
  selectContent: string;
  genderContent: string;
  markdownContent: never;
  htmlContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      he: "תוכן בעברית",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
    pluralContent: plural({
      one: "One car",
      other: "{{count}} cars",
    }),
    conditionalContent: cond({
      true: "Validation is enabled",
      false: "Validation is disabled",
    }),
    selectContent: select({
      draft: "This post is a draft",
      published: "This post is live",
      fallback: "Unknown status",
    }),
    genderContent: gender({
      male: "He is a developer",
      female: "She is a developer",
      fallback: "They are a developer",
    }),
    insertionContent: insert("Hello {{name}}!"),
    nestedContent: nest(
      "navbar", // המפתח של המילון להטמעה
      "login.button" // [אופציונלי] הנתיב לתוכן להטמעה
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Markdown Example"),
    htmlContent: html("<p>Hello <strong>World</strong></p>"),

    /*
     * זמין רק בשימוש ב-`react-intlayer` או `next-intlayer`
     */
    jsxContent: <h1>My title</h1>,
  },
} satisfies Dictionary<Content>; // [אופציונלי] Dictionary הוא גנרי ומאפשר לך לחזק את עיצוב הטיפוסים של המילון
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Hello World",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "he": "תוכן בעברית",
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "No cars",
        "1": "One car",
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        ">5": "Some cars",
        ">19": "Many cars",
      },
    },
    "pluralContent": {
      "nodeType": "plural",
      "plural": {
        "one": "One car",
        "other": "{{count}} cars",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Validation is enabled",
        "false": "Validation is disabled",
      },
    },
    "selectContent": {
      "nodeType": "select",
      "select": {
        "draft": "This post is a draft",
        "published": "This post is live",
        "fallback": "Unknown status",
      },
    },
    "genderContent": {
      "nodeType": "gender",
      "gender": {
        "male": "He is a developer",
        "female": "She is a developer",
        "fallback": "They are a developer",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Hello {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Markdown Example",
    },
    "htmlContent": {
      "nodeType": "html",
      "html": "<p>Hello <strong>World</strong></p>",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["My title"],
      },
    },
  },
}
```

#### צומתי תוכן (Content Nodes)

צומתי תוכן הם אבני הבניין של תוכן המילון. הם יכולים להיות:

- **ערכים פרימיטיביים**: מחרוזות (strings), מספרים, בוליאניים, null, undefined
- **צמתים מטיפוס מוגדר (Typed nodes)**: סוגי תוכן מיוחדים כגון תרגומים, תנאים, markdown וכו'
- **פונקציות**: תוכן דינמי שניתן להעריך בזמן ריצה [ראה שליפת פונקציה (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/function_fetching.md)
- **תוכן מקונן (Nested content)**: הפניות למילונים אחרים

#### סוגי תוכן (Content Types)

Intlayer תומך במגוון סוגי תוכן באמצעות צמתים בעלי טיפוס ייעודי:

- **תוכן תרגום (Translation Content)**: טקסט רב-לשוני עם ערכים ספציפיים לכל שפה [ראה תוכן תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md)
- **תוכן תנאי (Condition Content)**: תוכן מותנה המבוסס על ביטויים בוליאניים [ראה תוכן תנאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/condition.md)
- **תוכן רשימה (Enumeration Content)**: תוכן המשתנה בהתאם לערכים ממוספרים [ראה תוכן רשימה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/enumeration.md)
- **תוכן רבים (Plural Content)**: תוכן המשתנה בהתאם לכללי ריבוי [ראה תוכן רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)
- **תוכן הטמעה (Insertion Content)**: תוכן שניתן להטמיע בתוך תוכן אחר [ראה תוכן הטמעה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- **תוכן Markdown**: תוכן טקסט עשיר בפורמט Markdown [ראה תוכן Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)
- **תוכן HTML**: תוכן HTML עשיר עם אפשרות לרכיבים מותאמים אישית [ראה תוכן HTML](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/html.md)
- **תוכן מקונן (Nested Content)**: הפניות למילונים אחרים [ראה תוכן מקונן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/nesting.md)
- **תוכן מגדרי (Gender Content)**: תוכן המשתנה בהתאם למגדר [ראה תוכן מגדרי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)
- **תוכן Select**: תוכן המשתנה בהתאם לערך מחרוזת שרירותי [ראה תוכן Select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/select.md)
- **תוכן קובץ (File Content)**: הפניות לקבצים חיצוניים [ראה תוכן קובץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/file.md)

## מבנה מילון

מילון ב-Intlayer מוגדר על ידי הטיפוס `Dictionary` ומכיל מספר מאפיינים השולטים בהתנהגותו:

### מאפייני חובה

#### `key` (string)

המזהה של המילון. אם למספר מילונים יש את אותו מפתח, Intlayer ימזג אותם באופן אוטומטי.

> השתמש במוסכמת שמות של kebab-case (למשל, `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

המאפיין `content` מכיל את נתוני המילון בפועל ותומך ב:

- **ערכים פרימיטיביים**: מחרוזות, מספרים, בוליאניים, null, undefined
- **צמתים מטיפוס מוגדר**: סוגי תוכן מיוחדים באמצעות פונקציות העזר של Intlayer
- **אובייקטים מקוננים**: מבני נתונים מורכבים
- **מערכים**: אוספי תוכן
- **פונקציות**: הערכת תוכן דינמית

### מאפיינים אופציונליים

#### `title` (string)

כותרת קריאה לבני אדם עבור המילון, המסייעת בזיהויו בעורכים ובמערכות CMS. הדבר שימושי במיוחד בעת ניהול מספר רב של מילונים או בעבודה עם ממשקי ניהול תוכן.

**דוגמה:**

```typescript
{
  key: "about-page-meta",
  title: "About Page Metadata",
  content: { /* ... */ }
}
```

#### `description` (string)

תיאור מפורט המסביר את מטרת המילון, הנחיות שימוש ושיקולים מיוחדים. תיאור זה משמש גם כהקשר ליצירת תרגומים באמצעות בינה מלאכותית, מה שהופך אותו לבעל ערך רב לשמירה על איכות ועקביות התרגום.

**דוגמה:**

```typescript
{
  key: "about-page-meta",
  description: [
    "This dictionary manages the metadata of the About Page",
    "Consider good practices for SEO:",
    "- The title should be between 50 and 60 characters",
    "- The description should be between 150 and 160 characters",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

מערך של מחרוזות לסיווג וארגון מילונים. תגיות מספקות הקשר נוסף וניתן להשתמש בהן לסינון, חיפוש או ארגון מילונים בעורכים ובמערכות CMS.

**דוגמה:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

מציין את המעצב (formatter) שבו יש להשתמש עבור תוכן המילון. מאפשר להשתמש בתחבירי עיצוב הודעות שונים.

- `'intlayer'`: מעצב ברירת המחדל של Intlayer.
- `'icu'`: משתמש בעיצוב הודעות ICU.
- `'i18next'`: משתמש בעיצוב הודעות i18next.

**דוגמה:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

ממיר את המילון למילון ייעודי לשפה בודדת (per-locale dictionary), שבו כל שדה שמוצהר בתוכן יומר אוטומטית לצומת תרגום. כאשר מאפיין זה מוגדר:

- המילון מטופל כמילון לשפה בודדת
- כל שדה הופך לצומת תרגום עבור אותה שפה ספציפית
- אין להשתמש בצומתי תרגום (`t()`) בתוך התוכן בעת שימוש במאפיין זה
- אם המאפיין חסר, המילון יטופל כמילון רב-לשוני

> ראה [הצהרת תוכן לפי שפה ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) למידע נוסף.

- [הצהרת תוכן לפי שפה ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

**דוגמה:**

```jsonc
// מילון לשפה בודדת
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // שדה זה הופך לצומת תרגום עבור 'en'
    "description": "Learn more about our company",
  },
}
```

#### `schema` (SchemaKeys)

הסכמה של תוכן המילון. אם מוגדר, התוכן יאומת מול סכמה זו. מאפשר לך לאכוף מבנה ספציפי עבור תוכן המילון שלך באמצעות סכמות אימות מותאמות אישית המוגדרות בקונפיגורציית Intlayer.

**דוגמה:**

```typescript fileName="intlayer.config.ts"
import { z } from "zod";

export default {
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(50).max(60),
      description: z.string().min(150).max(160),
    }),
  },
};
```

```typescript fileName="src/example.content.ts"
import { type Dictionary } from "intlayer";

const aboutPageMetaContent = {
  key: "about-page-meta",
  schema: "seo-metadata",
  content: {
    title: "About Our Company - Learn More About Us",
    description: "Discover our company's mission, values, and team.",
  },
} satisfies Dictionary;

export default aboutPageMetaContent;
```

#### `location` ('remote' | 'local' | 'hybrid' | 'plugin')

מציין את מיקום המילון. ניתן להגדיר מאפיין זה כדי לשלוט מהיכן המילון נלקח:

- `'local'`: מילון מקומי (מקובצי תוכן)
- `'remote'`: מילון מרוחק (ממקור חיצוני / CMS)
- `'hybrid'`: מילון שקיים גם מקומית וגם מרחוק
- `'plugin'`: מילון המסופק על ידי פלאגין

**דוגמה:**

```typescript
{
  key: "about-page",
  location: "local",
  content: {
    title: "About Us"
  }
}
```

#### `fill` (Fill)

הוראות למילוי אוטומטי של תוכן המילון ממקורות חיצוניים. ניתן להגדיר זאת גלובלית ב-`intlayer.config.ts` או ברמת המילון הבודד. תומך במספר פורמטים:

- **`true`**: הפעלת מילוי עבור כל השפות
- **`false`**: השבתת מילוי עבור כל השפות
- **`string`**: נתיב לקובץ בודד או תבנית עם משתנים
- **`object`**: נתיבי קבצים לכל שפה בנפרד

**דוגמאות:**

```jsonc
// השבתת מילוי
{
  "fill": false
}
// קובץ בודד
{
  "fill": "./translations/aboutPage.content.json"
}
// תבנית עם משתנים
{
  "fill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// הגדרה מפורטת לפי שפה
{
  "fill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**משתנים זמינים:**

- `{{locale}}` – קוד שפה (למשל `fr`, `es`, `he`)
- `{{fileName}}` – שם הקובץ (למשל `example`)
- `{{key}}` – מפתח המילון (למשל `example`)

> ראה [הגדרת Auto-Fill ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/autoFill.md) למידע נוסף.

- [הגדרת Auto-Fill ב-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/autoFill.md)

##### `priority` (number)

מציין את עדיפות המילון לצורך פתרון התנגשויות (conflict resolution). כאשר למספר מילונים יש את אותו מפתח, המילון עם מספר העדיפות הגבוה ביותר ידרוס את האחרים. הדבר שימושי לניהול היררכיות תוכן ודריסות (overrides).

**דוגמה:**

```typescript
// מילון בסיס
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// מילון דורס
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Welcome to our premium service!" }
}
// מילון זה ידרוס את מילון הבסיס
```

#### `item` (number)

בשימוש בשילוב עם [קולקציות (Collections)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/collections.md), שדה זה מגדיר את מיקום הפריט בתוך אוסף. הוא מאפשר לבנות אוספים סדורים של פריטים מתורגמים שניתן לבחור לפי אינדקס בזמן ריצה.

- [קולקציות (Collections)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/collections.md)

**דוגמה:**

```typescript
{
  key: "faq",
  item: 1,
  content: {
    question: "What is Intlayer?",
    answer: "An i18n toolkit."
  }
}
```

> ראה [קולקציות (Collections)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/collections.md) למידע נוסף.

- [קולקציות (Collections)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/collections.md)

#### `variant` (string)

בשימוש בשילוב עם [וריאציות (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/variants.md), שדה זה מגדיר חלופות תוכן בעלות שם. הוא מאפשר לך לעבור בין וריאציות שונות של אותו מפתח מילון בזמן ריצה ללא שינויי קוד (למשל, עבור מבחני A/B, באנרים עונתיים). אם לא צוין, הוא נחשב לגרסת ברירת המחדל.

- [וריאציות (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/variants.md)

**דוגמה:**

```typescript
{
  key: "hero-banner",
  variant: "black_friday",
  content: {
    headline: "50 % off, today only",
    cta: "Shop now"
  }
}
```

> ראה [וריאציות (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/variants.md) למידע נוסף.

- [וריאציות (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/variants.md)

### מאפייני CMS

#### `version` (string)

מזהה גרסה עבור מילונים מרוחקים. מסייע לעקוב אחר הגרסה של המילון הנמצאת בשימוש כעת, שימושי במיוחד בעבודה עם מערכות ניהול תוכן מרוחקות.

#### `importMode` ('static' | 'dynamic' | 'fetch')

מצב הייבוא קובע כיצד המילון שלך מיובא באפליקציה שלך.

- `'static'`: המילון מיובא באופן סטטי בזמן הבנייה (build time). זהו מצב ברירת המחדל.
- `'dynamic'`: המילון מיובא באופן דינמי בזמן ריצה באמצעות ממשק ה-Suspense API.
- `'fetch'`: המילון מיובא באופן דינמי באמצעות ממשק ה-Live Sync API.

אם הוגדר, מאפיין זה דורס את ה-`importMode` הגלובלי שהוגדר במאפיין `dictionary` בתוך `intlayer.config.ts`.

### מאפייני מערכת (נוצרים אוטומטית)

מאפיינים אלה נוצרים אוטומטית על ידי Intlayer ואין לשנותם ידנית:

#### `$schema` (string)

סכמת JSON המשמשת לאימות מבנה המילון. נוספת אוטומטית על ידי Intlayer כדי להבטיח את תקינות המילון.

#### `id` (string)

עבור מילונים מרוחקים, זהו המזהה הייחודי של המילון בשרת המרוחק. משמש לשליפה וניהול תוכן מרוחק.

#### `projectIds` (string[])

עבור מילונים מרוחקים, מערך זה מכיל את מזהי הפרויקטים שיכולים להשתמש במילון זה. מילון מרוחק יכול להיות משותף בין מספר פרויקטים.

#### `localId` (LocalDictionaryId)

מזהה ייחודי עבור מילונים מקומיים. נוצר אוטומטית על ידי Intlayer כדי לעזור בזיהוי המילון וקביעה האם הוא מקומי או מרוחק, יחד עם מיקומו.

#### `localIds` (LocalDictionaryId[])

עבור מילונים ממוזגים, מערך זה מכיל את המזהים של כל המילונים שמוזגו יחד. שימושי למעקב אחר מקור התוכן הממוזג.

#### `filePath` (string)

נתיב הקובץ של המילון המקומי, המציין מאיזה קובץ `.content` נוצר המילון. מסייע באיתור באגים ובמעקב אחר מקורות.

#### `versions` (string[])

עבור מילונים מרוחקים, מערך זה מכיל את כל הגרסאות הזמינות של המילון. עוזר לעקוב אילו גרסאות זמינות לשימוש.

#### `filled` (true)

מציין האם המילון מולא אוטומטית ממקורות חיצוניים. במקרה של התנגשויות, מילוני בסיס ידריסו מילונים שמולאו אוטומטית.

## סוגי צומתי תוכן (Content Node Types)

Intlayer מספק מספר סוגי צומתי תוכן מיוחדים המרחיבים ערכים פרימיטיביים בסיסיים:

### תוכן תרגום (`t`)

תוכן רב-לשוני המשתנה לפי שפה:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  he: "ברוכים הבאים לאתר שלנו",
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

> ראה [תיעוד תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md) למידע נוסף.

- [תיעוד תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md)

### תוכן תנאי (`cond`)

תוכן המשתנה בהתבסס על תנאים בוליאניים:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

> ראה [תיעוד תנאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/condition.md) למידע נוסף.

- [תיעוד תנאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/condition.md)

### תוכן רבים (`plural`)

תוכן המשתנה בהתאם לכללי ריבוי:

```typescript
import { plural } from "intlayer";

pluralContent: plural({
  one: "One car",
  other: "{{count}} cars",
});
```

> ראה [תיעוד רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md) למידע נוסף.

- [תיעוד רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)

### תוכן רשימה (`enu`)

תוכן המשתנה בהתאם לערכים ממוספרים:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Your request is pending",
  approved: "Your request has been approved",
  rejected: "Your request has been rejected",
});
```

> ראה [תיעוד Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/enumeration.md) למידע נוסף.

- [תיעוד Enumeration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/enumeration.md)

### תוכן הטמעה (`insert`)

תוכן שניתן להטמיע בתוך תוכן אחר:

```typescript
import { insert } from "intlayer";

insertionContent: insert("This text can be inserted anywhere");
```

> ראה [תיעוד Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md) למידע נוסף.

- [תיעוד Insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)

### תוכן מקונן (`nest`)

הפניות למילונים אחרים:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

> ראה [תוכן מקונן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/nesting.md) למידע נוסף.

- [תוכן מקונן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/nesting.md)

### תוכן Markdown (`md`)

תוכן טקסט עשיר בפורמט Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Welcome\n\nThis is **bold** text with [links](https://example.com)"
);

localizedMarkdownContent: t({
  en: md(file("./content.en.md")),
  fr: md(file("./content.fr.md")),
});
```

> ראה [תוכן Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md) למידע נוסף.

- [תוכן Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)

### תוכן HTML (`html`)

תוכן HTML עשיר שיכול להשתמש בתגיות סטנדרטיות או ברכיבים מותאמים אישית:

```typescript
import { html, file, t } from "intlayer";

// Inline HTML
htmlContent: html("<p>Hello <strong>World</strong></p>");

// HTML לפי שפה מקבצים חיצוניים
localizedHtmlContent: t({
  en: html(file("./content.en.html")),
  fr: html(file("./content.fr.html")),
});
```

> ראה [תוכן HTML](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/html.md) למידע נוסף.

- [תוכן HTML](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/html.md)

### תוכן מגדרי (`gender`)

תוכן המשתנה בהתאם למגדר:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "He is a developer",
  female: "She is a developer",
  fallback: "They are a developer",
});
```

> ראה [תוכן מגדרי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md) למידע נוסף.

- [תוכן מגדרי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)

### תוכן Select (`select`)

תוכן המשתנה בהתאם לערך מחרוזת שרירותי, המקבילה ל-`select` של ICU:

```typescript
import { select } from "intlayer";

selectContent: select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

השתמש בו כאשר המבחין (discriminant) אינו כמות (`enu`), אינו בוליאני (`cond`) ואינו מגדר (`gender`). עדיף להשתמש בו על פני אינדוקס של אובייקט רגיל עם ערך בזמן ריצה: גישה מחושבת דינמית אינה ניתנת לפענוח סטטי על ידי הקומפיילר של Intlayer.

> ראה [תוכן Select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/select.md) למידע נוסף.

- [תוכן Select](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/select.md)

### תוכן קובץ (`file`)

הפניות לקבצים חיצוניים:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

> ראה [תוכן קובץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/file.md) למידע נוסף.

- [תוכן קובץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/file.md)

## יצירת קובצי תוכן

### מבנה קובץ תוכן בסיסי

קובץ תוכן מייצא אובייקט כברירת מחדל (default export) העונה על הטיפוס `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Welcome Page Content",
  description:
    "Content for the main welcome page including hero section and features",
  tags: ["page", "welcome", "homepage"],
  content: {
    hero: {
      title: t({
        he: "ברוכים הבאים לפלטפורמה שלנו",
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        he: "בנו יישומים מדהימים בקלות",
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          he: "להתחיל",
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          he: "הרשמה",
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          he: "קל לשימוש",
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          he: "ממשק אינטואיטיבי לכל הרמות",
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### קובץ תוכן JSON

ניתן גם ליצור קובצי תוכן בפורמט JSON:

```json
{
  "key": "welcome-page",
  "title": "Welcome Page Content",
  "description": "Content for the main welcome page",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### קובץ תוכן Markdown

```markdown
---
key: welcome-page
locale: en
title: Welcome Page Content
description: Content for the main welcome page
tags:
  - page
  - welcome
---

# Welcome to Our Platform

## Build amazing applications with ease
```

### קובץ תוכן YAML

```yaml
key: welcome-page
title: Welcome Page Content
description: Content for the main welcome page
locale: "en"
tags:
  - page
  - welcome
content:
  hero:
    title: Welcome to Our Platform
    subtitle: Build amazing applications with ease
```

### קובצי תוכן לפי שפה (Per-Locale)

עבור מילונים לפי שפה, ציין את המאפיין `locale`:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing applications with ease",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## סיומות קובצי תוכן

Intlayer מאפשר לך להתאים אישית את הסיומות של קובצי הגדרת התוכן שלך. התאמה אישית זו מספקת גמישות בניהול פרויקטים גדולים ומסייעת למנוע התנגשויות עם מודולים אחרים.

### סיומות ברירת מחדל

כברירת מחדל, Intlayer עוקב אחר כל הקבצים בעלי הסיומות הבאות עבור הגדרות תוכן:

- `.content.json`
- `.content.json5`
- `.content.jsonc`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`

סיומות ברירת מחדל אלו מתאימות למרבית האפליקציות. עם זאת, כאשר יש לך צרכים מיוחדים, באפשרותך להגדיר סיומות מותאמות אישית כדי לייעל את תהליך הבנייה ולהפחית את הסיכון להתנגשויות עם רכיבים אחרים.

> כדי להתאים אישית את סיומות הקבצים שבהן Intlayer משתמש לזיהוי קובצי הגדרת תוכן, ניתן לציין אותן בקובץ הקונפיגורציה של Intlayer. גישה זו מועילה במיוחד לפרויקטים בקנה מידה גדול שבהם הגבלת היקף המעקב משפרת את ביצועי הבנייה.

## מושגים מתקדמים

### מיזוג מילונים (Dictionary Merging)

כאשר למספר מילונים יש את אותו מפתח, Intlayer ממזג אותם אוטומטית. התנהגות המיזוג תלויה במספר גורמים:

- **עדיפות (Priority)**: מילונים עם ערכי `priority` גבוהים יותר דורסים מילונים בעלי ערכים נמוכים יותר
- **Auto-fill מול בסיס**: מילוני בסיס דורסים מילונים שמולאו אוטומטית
- **מיקום (Location)**: מילונים מקומיים דורסים מילונים מרוחקים (כאשר העדיפויות שוות)

### בטיחות טיפוסים (Type Safety)

Intlayer מספק תמיכה מלאה ב-TypeScript עבור קובצי תוכן:

```typescript
// הגדרת טיפוס התוכן שלך
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// שימוש בתוך המילון שלך
export default {
  key: "welcome-page",
  content: {
    // TypeScript יספק השלמה אוטומטית ובדיקת טיפוסים
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### שרשור/קינון צמתים (Node Imbrication)

ניתן ללא בעיה לקנן פונקציות וצמתים אלה בתוך אלה.

דוגמה:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` מחזיר `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // תוכן מורכב המשלב תנאי, רשימה ותוכן רב-לשוני
    // `getIntlayer('page','en').advancedContent(true)(10)` מחזיר 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            "en": "Hi",
            "fr": "Salut",
            "es": "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "No items found",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "One item found",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### שיטות מומלצות (Best Practices)

1. **מוסכמות שמות**:
   - השתמש ב-kebab-case עבור מפתחות מילון (`"about-page-meta"`)
   - קבץ תוכן קשור תחת אותה קידומת מפתח

2. **ארגון תוכן**:
   - שמור תוכן קשור יחד באותו מילון
   - השתמש באובייקטים מקוננים כדי לארגן מבני תוכן מורכבים
   - נצל תגיות (tags) לקטגוריזציה
   - השתמש ב-`fill` כדי למלא תרגומים חסרים באופן אוטומטי

3. **ביצועים**:
   - התאם את תצורת התוכן כדי להגביל את היקף הקבצים שבמעקב
   - השתמש במילונים חיים (live dictionaries) רק כאשר עדכונים בזמן אמת נחוצים (למשל, מבחני A/B וכו')
   - ודא שתוסף טרנספורמציית הבנייה (`@intlayer/swc` או `@intlayer/babel`) מופעל כדי לייעל את המילון בזמן הבנייה
