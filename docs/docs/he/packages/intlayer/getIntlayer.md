---
createdAt: 2026-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getIntlayer | intlayer"
description: "השתמש ב-getIntlayer כדי לקרוא תוכן של מילון עבור שפה בכל מקום, המקבילה נטולת הפריימוורק של ה-hook useIntlayer."
keywords:
  - getIntlayer
  - מילון
  - תוכן
  - בורר
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayer
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "שפה שהושמטה מתפענחת לפי שפת הבקשה או השפה השמורה לפני שפת ברירת המחדל"
  - version: 9.4.0
    date: 2026-08-23
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד: הפונקציה `getIntlayer` ב-`intlayer`

## תיאור

הפונקציה `getIntlayer` בוחרת מילון אחד לפי המפתח שלו ומחזירה את התוכן שלו כשהוא מפוענח עבור שפה נתונה. היא המקבילה נטולת הפריימוורק (framework-agnostic) של ה-hook `useIntlayer`: אותו תוכן, אותם בוררים, אך ניתנת לשימוש בכל מקום שבו React context אינו זמין, סקריפטים של Node, פונקציות שרת, טועני ניתוב (route loaders), בוני metadata, מטפלי Express/Fastify ובדיקות.

היא קוראת את המילונים שנוצרו על ידי Intlayer בתוך `.intlayer/`, כך שארגומנט ה-`key` נבדק מבחינת טיפוסים ומושלם אוטומטית מתוך הצהרות התוכן שלך, והאובייקט המוחזר מוגדר טיפוסית במלואו עד לכל עלה במבנה.

**תכונות עיקריות:**

- מפתחות מילון בעלי טיפוסיות ותוכן מוחזר בעל טיפוסיות מלאה
- מפענחת כל צומת תוכן (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- מקבלת שפה או אובייקט בורר (אוספים, גרסאות)
- התוצאות נשמרות בזיכרון (memoized) לכל שלשת `key + locale + selector`
- חוזרת לפרוקסי בטוח בפיתוח כאשר מילון חסר, במקום לקרוס

## חתימת הפונקציה

```typescript
getIntlayer(
  key: DictionaryKeys,                        // חובה
  localeOrSelector?: LocalesValues | DictionarySelector, // אופציונלי
  plugins?: Plugins[]                         // אופציונלי
): DeepTransformContent<...>
```

## פרמטרים

- `key: DictionaryKeys`
  - **תיאור**: המפתח של המילון לקריאה, כפי שהוצהר בקובצי התוכן שלך.
  - **סוג**: `DictionaryKeys`, איחוד של כל מפתחות המילון שהוצהרו.
  - **חובה**: כן

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **תיאור**: השפה שלפיה יש לפענח את התוכן, או אובייקט בורר עבור [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md).
    - `'fr'`: שפה
    - `{ item: 2 }`: פריט בתוך [אוסף (collection)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/collections.md) (השמט את `item` כדי לקבל את כל הפריטים כמערך)
    - `{ variant: 'black-friday' }`: [גרסה בעלת שם (named variant)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/variants.md) (השמט כדי לקבל את ברירת המחדל `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: גרסה מובנית
    - כל בורר יכול לכלול שפה: `{ item: 2, locale: 'fr' }`
  - **סוג**: `LocalesValues | DictionarySelector`
  - **חובה**: לא (אופציונלי). כאשר מושמט, ראה [ללא ציון שפה](#ללא-ציון-שפה).

- `plugins: Plugins[]`
  - **תיאור**: ממירי צמתים מותאמים אישית המחליפים את תוספי המפענח הבסיסיים. לשימוש מתקדם בלבד, השמט זאת כדי לשמור על התנהגות ברירת המחדל.
  - **סוג**: `Plugins[]`
  - **חובה**: לא (אופציונלי)

### ערך מוחזר

- **סוג**: התוכן המפוענח של המילון, עם טיפוסים הנגזרים מההצהרה שלך.
- **תיאור**: אובייקט רגיל המשקף את שדה ה-`content` של המילון שלך, כאשר כל צומת של Intlayer פוענח לערכו הסופי עבור השפה המבוקשת.

## דוגמאות שימוש

### שימוש בסיסי

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      he: "שלום",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "fr"); // "Bonjour"
```

### ללא ציון שפה

כאשר לא מועברת שפה, `getIntlayer` אינה קופצת מיד לשפת ברירת המחדל. היא מפענחת, לפי הסדר הבא:

1. **שפת הבקשה הנוכחית**, בשרת, כאשר אינטגרציה של Intlayer מטפלת בה: תוכנות הביניים (middlewares) של `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer` ו-`elysia-intlayer`, תוכנות הביניים של `remix-intlayer` ו-`astro-intlayer`, ו-`IntlayerProvider` / `setLocale` ברכיבי React Server Components. כל בקשה מפוענחת מתוך העוגיות והכותרות שלה, כך שמשתמשים במקביל לעולם אינם חולקים שפה.
2. **השפה השמורה בדפדפן** (עוגייה, `localStorage`, `sessionStorage`), השפה שבורר השפות שומר.
3. **ה-`defaultLocale`** שהוצהר בתוך [התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md) שלך.

- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // שפת הבקשה, אחרת השפה השמורה, אחרת שפת ברירת המחדל
```

אותו סדר פענוח חל גם על `getDictionary`, על הקריאות שמשוכתבות על ידי [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md), ועל `useIntlayer` / `useDictionaryDynamic` המרונדרים מחוץ לספק (provider). העברה מפורשת של שפה תמיד קודמת לכל.

- [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)

> `getIntlayer` אינה ריאקטיבית: לאחר החלפת שפה, קרא לה שוב כדי לקרוא את השפה החדשה. בדף המרונדר בשרת, קריאה המתבצעת מחוץ לכל ספק מרנדרת את שפת ברירת המחדל בשרת ואת השפה השמורה בדפדפן, מה שעלול לגרום לאי-התאמה בהידרציה (hydration mismatch). עטוף בספק של הפריימוורק שלך, או העבר את השפה ישירות במקרה זה.

### בתוך מטפל שרת (Server Handler)

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### עם בורר (אוספים וגרסאות)

```typescript
import { getIntlayer } from "intlayer";

// פריט אוסף בודד
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// כל פריטי האוסף, כמערך מסודר
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// גרסה בעלת שם
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

## הערות התנהגות

### שמירה במטמון (Caching)

התוצאות נשמרות במטמון ברמת המודול עם מפתח לפי `key + locale + selector`. קריאה חוזרת ל-`getIntlayer("app", "fr")` מפענחת את המילון פעם אחת ומחזירה את אותו האובייקט בדיוק לאחר מכן.

### מילונים חסרים

בסביבת פיתוח, בקשת מפתח שאין עבורו מילון שנוצר תרשום אזהרה פעם אחת ביומן (log) ותחזיר פרוקסי גיבוי בטוח: קריאת `content.title` תניב את המחרוזת `"app.title"` במקום להעלות שגיאה. הדבר שומר על הדף שמיש בזמן שההצהרה החסרה מתוקנת. הרץ את בניית Intlayer (או את שרת הפיתוח) כדי שהמילון ייווצר.

### גודל הבאנדל

`getIntlayer` קוראת את המילון הממוזג, המכיל את **כל** השפות. בבאנדלים של צד הלקוח, [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) משכתבים את הקריאה כך שרק התוכן הנדרש יישלח. כאשר אתה קורא תוכן מחוץ לרינדור (metadata, טוענים, פונקציות שרת) וברצונך לטעון שפה בודדת לפי דרישה, השתמש ב-[`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayerAsync.md) במקום זאת.

- [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayerAsync.md)

## פונקציות קשורות

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useIntlayer.md)

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
