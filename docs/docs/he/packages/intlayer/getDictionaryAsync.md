---
createdAt: 2026-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getDictionaryAsync | intlayer"
description: "השתמש ב-getDictionaryAsync כדי לטעון שפה בודדת של מילון ולקרוא את התוכן המפוענח שלה, ללא שאר השפות."
keywords:
  - getDictionaryAsync
  - מילון
  - מילונים דינמיים
  - מפת טוענים
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד: הפונקציה `getDictionaryAsync` ב-`intlayer`

## תיאור

הפונקציה `getDictionaryAsync` טוענת **מקטע שפה בודד (locale chunk)** של מילון ומחזירה את התוכן המפוענח שלו.

היא המקבילה של [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getDictionary.md) עבור מפות הטוענים לכל שפה שנוצרות בתוך `.intlayer/dynamic_dictionaries/`: במקום לקבל מילון המכיל את כל השפות, היא מקבלת את מפת הטוענים וממתינה (await) רק למקטע הנדרש לשפה המבוקשת.

- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getDictionary.md)

> בקוד האפליקציה בדרך כלל קוראים ל-[`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayerAsync.md), ולא לפונקציה זו. [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) משכתבים כל קריאת `getIntlayerAsync('key', locale)` לקריאת `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` מיוצאת עבור טוענים מותאמים אישית ועבור כלי פיתוח שבונים מפות טוענים משלהם.

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayerAsync.md)
- [תוספי הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)

**תכונות עיקריות:**

- טוענת רק את מקטע השפה המבוקש
- תומכת במפות טוענים רגילות (`locale → loader`) ומוסמכות (`locale → qualifierId → loader`)
- מונעת כפילויות של טעינות מקבילות עבור אותו מקטע (deduplication), ושומרת במטמון (cache) את התוכן המפוענח
- טעינות שנכשלו מפונות מהמטמון כדי שקריאה מאוחרת יותר תנסה לטעון את המקטע מחדש

## חתימת הפונקציה

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // חובה
  key: string,                                           // חובה
  localeOrSelector?: LocalesValues | DictionarySelector, // אופציונלי
  plugins?: Plugins[]                                    // אופציונלי
): Promise<DeepTransformContent<...>>
```

## פרמטרים

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **תיאור**: מפת הטוענים לפי שפה. מפות רגילות מקשרות שפה לטוען; מפות מוסמכות (המשמשות אוספים וגרסאות) מקשרות שפה למזהה מאפיין (qualifier id), ולאחר מכן לטוען. עבור מפה מוסמכת, נטענים רק המקטעים שהבורר מצביע עליהם.
  - **סוג**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **חובה**: כן

- `key: string`
  - **תיאור**: מפתח המילון, המשמש ליצירת מרחב שמות עבור מטמון המקטעים.
  - **סוג**: `string`
  - **חובה**: כן

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **תיאור**: השפה שלפיה יש לפענח את התוכן, או אובייקט בורר (`{ item }`, `{ variant }`, אופציונלית עם `locale`). ראה [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md).
  - **סוג**: `LocalesValues | DictionarySelector`
  - **חובה**: לא (אופציונלי), ברירת המחדל היא ה-`defaultLocale` המוגדר.

- `plugins: Plugins[]`
  - **תיאור**: ממירי צמתים. ברירת המחדל היא סט המפענחים הבסיסי.
  - **סוג**: `Plugins[]`
  - **חובה**: לא (אופציונלי)

### ערך מוחזר

- **סוג**: `Promise<Content>`, הבטחה (promise) המתפענחת לתוכן המפוענח של המקטע שנטען.
- **תיאור**: מתפענח ל-`null` כאשר המפה אינה פולטת מקטע עבור השפה המבוקשת ואף לא עבור חלופות ברירת המחדל (fallbacks) שלה, בדומה לאופן שבו מתפענח קואורדינט מוסמך חסר.

## דוגמאות שימוש

### עם מפת טוענים שנוצרה אוטומטית

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### עם מפת טוענים מותאמת אישית

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### עם בורר על מפה מוסמכת

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

## הערות התנהגות

### שמירה במטמון ומניעת כפילויות

המטמון שומר את ה-**promise** של כל שלשת `key + locale + selector`, כך שקריאות מקבילות עבור אותו מקטע ממתינות לטעינה בודדת. טעינה שנדחתה (rejected) מוסרת מהמטמון, כך שמקטע שנכשל ייבדק מחדש בקריאה הבאה במקום לשחזר את אותה שגיאה לתמיד.

### חלופת שפה (Locale fallback)

סריקת מפת טוענים רגילה מתבצעת לאורך אותה שרשרת גיבוי כמו במצב הסינכרוני: השפה המבוקשת תחילה, לאחר מכן שפות הגיבוי (fallbacks) שלה, ואז `null` אם אף אחת מהן לא פלטה מקטע.

## פונקציות קשורות

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getDictionary.md)
- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
