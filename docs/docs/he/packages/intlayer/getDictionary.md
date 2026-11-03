---
createdAt: 2026-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה getDictionary | intlayer"
description: "השתמש ב-getDictionary כדי לפענח אובייקט מילון שאתה מעביר בעצמך ולקבל את התוכן שלו עבור שפה מסוימת, תוך החלת כל תוסף תוכן."
keywords:
  - getDictionary
  - מילון
  - מפענח
  - תוכן
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד: הפונקציה `getDictionary` ב-`intlayer`

## תיאור

הפונקציה `getDictionary` מפענחת **אובייקט מילון שאתה מעביר בעצמך** ומחזירה את התוכן המפוענח שלו עבור שפה נתונה. היא סורקת את התוכן במעבר יחיד ומחילה כל תוסף מפענח (interpreter plugin) לפי הצורך, תוך פענוח תרגומי `t()`, ריבוי (enumerations), תנאים, שילובים (insertions), קינון (nesting), צומתי Markdown, HTML וקובצי תוכן.

בשונה מ-[`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayer.md), אשר מחפשת מילון לפי מפתח (key) ברישום שנוצר מראש, `getDictionary` מקבלת את אובייקט המילון עצמו. זה הופך אותה לכלי המתאים ביותר עבור תוכן שנבנה בזמן ריצה (runtime), נמשך מ-API או מ-CMS, או מוגדר ישירות (inline) בתוך בדיקה.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayer.md)

**תכונות עיקריות:**

- עובדת עם כל אובייקט העוקב אחר מבנה המילון (`{ key, content }`)
- מקבלת גם קבוצת מילונים מוסמכת (qualified dictionary group כגון collections, variants) יחד עם בורר (selector)
- בעלת טיפוסיות מלאה (fully typed): האובייקט המוחזר משקף את ה-`content` שהעברת
- תומכת בתוספי מפענח מותאמים אישית

## חתימת הפונקציה

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // חובה
  localeOrSelector?: LocalesValues | DictionarySelector, // אופציונלי
  plugins?: Plugins[]                                // אופציונלי
): DeepTransformContent<...>
```

## פרמטרים

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **תיאור**: המילון (או קבוצת המילונים המוסמכת) לפענוח.
  - **סוג**: `Dictionary | QualifiedDictionaryGroup`
  - **חובה**: כן

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **תיאור**: השפה שלפיה יש לפענח את התוכן, או אובייקט בורר (`{ item }`, `{ variant }`, אופציונלית עם `locale`). ראה [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md).
  - **סוג**: `LocalesValues | DictionarySelector`
  - **חובה**: לא (אופציונלי), ברירת המחדל היא ה-`defaultLocale` המוגדר.

- `plugins: Plugins[]`
  - **תיאור**: מערך של ממירי צמתים המגדירים כיצד צמתים מזוהים מפוענחים. אם מושמט, נעשה שימוש בסט ברירת המחדל של תוספי המפענח.
  - **סוג**: `Plugins[]`
  - **חובה**: לא (אופציונלי)

### ערך מוחזר

- **סוג**: התוכן המפוענח של המילון.
- **תיאור**: ה-`content` שהעברת, כאשר כל צומת של Intlayer מפוענח עבור השפה המבוקשת. עבור קבוצת אוסף (collection group) ללא בורר `item`, מוחזר מערך מסודר של רשומות מפוענחות. הערך `null` מוחזר כאשר הבורר אינו מצביע על דבר.

## דוגמאות שימוש

### שימוש בסיסי

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        he: "שלום",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### פענוח תוכן שנמשך בזמן ריצה

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### שימוש עם בורר (Selector)

```typescript
import { getDictionary } from "intlayer";

// קבוצת מילונים מוסמכת מפוענחת לרשומה בודדת…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …או למערך מסודר כאשר לא סופק `item`
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

## פונקציות קשורות

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getDictionaryAsync.md)
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useDictionary.md)

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
