---
createdAt: 2026-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getIntlayerAsync | intlayer"
description: "השתמש ב-getIntlayerAsync כדי לטעון ולקרוא תוכן של מילון עבור שפה בודדת, ללא הכללת שאר השפות בבאנדל."
keywords:
  - getIntlayerAsync
  - מילון
  - ייבוא דינמי
  - מטא-דאטה
  - אופטימיזציית באנדל
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
  - getIntlayerAsync
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "שפה שהושמטה ממתינה לשפת הבקשה (כותרות ועוגיות של Next.js)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד: הפונקציה `getIntlayerAsync` ב-`intlayer`

## תיאור

הפונקציה `getIntlayerAsync` בוחרת מילון אחד לפי המפתח שלו ומפענחת את התוכן שלו עבור שפה נתונה, **תוך טעינת שפה זו בלבד**.

היא המקבילה האסינכרונית של [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md), ומיועדת למקומות שבהם מילון נקרא מחוץ לרינדור: בוני `head` / metadata של ניתובים, טוענים (loaders) ופונקציות שרת.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md)

במקום שבו `getIntlayer` מושכת את המילון הממוזג המכיל את כל השפות, [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) משכתבים קריאה זו ל-`getDictionaryAsync(loaderMap, key, locale)`, ומכוונים אותה למקטעים לפי שפה בתוך `.intlayer/dynamic_dictionaries/`. כתוצאה מכך, הבאנדל נושא תמיד רק את השפה שנמצאת בשימוש בפועל.

- [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

ללא תוספים אלה, בבנייה שאינה מותאמת (unoptimized build), הקריאה מתפענחת דרך רישום המילונים הסינכרוני: אותו תוכן, אך ללא הפיצול לפי שפות.

**תכונות עיקריות:**

- אותם מפתחות, בוררים ותוכן מוחזר בעלי טיפוסיות כמו ב-`getIntlayer`
- טוענת רק את מקטע השפה המבוקש בבניות מותאמות
- קריאות מקבילות עבור אותו מקטע חולקות טעינה בודדת
- בטוחה לשימוש בבוני metadata אסינכרוניים (`async`), טוענים ופונקציות שרת

## חתימת הפונקציה

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // חובה
  localeOrSelector?: LocalesValues | DictionarySelector, // אופציונלי
  plugins?: Plugins[]                         // אופציונלי
): Promise<DeepTransformContent<...>>
```

## פרמטרים

- `key: DictionaryKeys`
  - **תיאור**: מפתח המילון לקריאה, כפי שהוצהר בקובצי התוכן שלך.
  - **סוג**: `DictionaryKeys`, איחוד של כל מפתחות המילון שהוצהרו.
  - **חובה**: כן

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **תיאור**: השפה שלפיה יש לפענח את התוכן, או אובייקט בורר עבור [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md).
    - `'fr'`: שפה
    - `{ item: 2 }`: פריט [אוסף (collection)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/collections.md) (השמט את `item` כדי לקבל את כל הפריטים כמערך)
    - `{ variant: 'black-friday' }`: [גרסה בעלת שם (named variant)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/variants.md) (השמט עבור גרסת ברירת המחדל `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: גרסה מובנית
    - כל בורר יכול לשאת שפה: `{ item: 2, locale: 'fr' }`
  - **סוג**: `LocalesValues | DictionarySelector`
  - **חובה**: לא (אופציונלי). כאשר מושמט, הפענוח מתבצע כמו ב-[`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md#ללא-ציון-שפה) (שפת הבקשה, לאחר מכן השפה השמורה, ולבסוף `defaultLocale`). בהיותה אסינכרונית, היא יכולה גם להמתין לשפת הבקשה במקומות שבהם היא נקראת רק באופן אסינכרוני: ברכיבי Server Components של Next.js, ב-`generateMetadata` ובמטפלי נתיבים (route handlers), היא קוראת את ה-`headers()` וה-`cookies()` של הבקשה, בדומה ל-`getLocale()` מתוך `next-intlayer/server`. קריאה זו מגדירה את הנתיב לרינדור דינמי, ולכן היא מתרחשת רק כאשר `IntlayerProvider` לא סיפק כבר את השפה.

- `plugins: Plugins[]`
  - **תיאור**: ממירי צמתים מותאמים אישית המחליפים את תוספי המפענח הבסיסיים. לשימוש מתקדם בלבד.
  - **סוג**: `Plugins[]`
  - **חובה**: לא (אופציונלי)

### ערך מוחזר

- **סוג**: `Promise<Content>`, הבטחה (promise) המתפענחת לתוכן המפוענח של המילון, עם טיפוסים הנגזרים מההצהרה שלך.

## דוגמאות שימוש

### שימוש בסיסי

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` לעומת `getIntlayerAsync`

|                   | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| מחזירה            | את התוכן                                                                                                           | הבטחה (Promise) של התוכן                    |
| מילון שנטען       | המילון הממוזג (כל השפות)                                                                                           | מקטע השפה המבוקשת בלבד                      |
| מתאימה ביותר עבור | רינדור, נתיבי קוד סינכרוניים                                                                                       | מטא-דאטה, טוענים, פונקציות שרת              |
| האם נדרש תוסף?    | לא                                                                                                                 | לא, אך הפיצול לפי שפות דורש את תוספי הבנייה |

שתי הפונקציות מקבלות את אותם הארגומנטים ומחזירות את אותו התוכן: המעבר מאחת לשנייה משנה רק **מתי** ו**כמה** נטען.

## פונקציות קשורות

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocale.md)

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
