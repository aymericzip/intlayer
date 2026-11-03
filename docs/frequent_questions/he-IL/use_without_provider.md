---
createdAt: 2026-09-28
updatedAt: 2026-11-03
priority: 4
title: האם אוכל להשתמש ב-Intlayer ללא provider גלובלי?
description: "קריאת תוכן Intlayer ללא התקנת provider, כיצד ה-locale נקבע בשרת ובדפדפן, והבדלי הביצועים בהשוואה לשימוש ב-provider."
keywords:
  - provider
  - פרוויידר
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - ביצועים
  - performance
  - hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# האם אוכל להשתמש ב-Intlayer ללא provider גלובלי?

כן. `getIntlayer` ו-`getDictionary` הן פונקציות רגילות שאינן זקוקות ל-provider כלשהו, וגם `useIntlayer` עובד מחוץ ל-provider.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // לא הועבר locale
```

## באיזה locale נעשה שימוש?

כאשר אתה מעביר locale מפורש, הוא תמיד קודם. אחרת, ה-locale נקבע לפי הסדר הבא:

1. **ה-locale של הבקשה הנוכחית**, בשרת, כאשר אינטגרציה של Intlayer מטפלת בה: ה-middlewares של `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` ו-`astro-intlayer`, או `IntlayerProvider` ב-React Server Components.
2. **ה-locale השמור בדפדפן** (cookie, `localStorage`, `sessionStorage`), הערך שנשמר על ידי מחליף השפות שלך.
3. **ה-`defaultLocale`** המוגדר בתצורה שלך.

כל בקשה נפתרת מתוך קובצי ה-cookies וה-headers שלה, ונשמרת בטווח (scope) ייעודי לכל בקשה. משתמשים בו-זמניים בעלי locales שונים לעולם אינם חולקים את אותו ה-locale.

אותו סדר פענוח חל על `getDictionary`, על קריאות ששוכתבו על ידי [אופטימיזציית הבנייה (build optimization)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md), ועל `useIntlayer` ו-`useDictionaryDynamic` המרונדרים מחוץ ל-provider.

- [אופטימיזציית הבנייה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

ה-[formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) (`number`, `date`, `list`…) וה-hooks שלהם (`useNumber`, `useDate`, `useList`…) פועלים לפי אותו סדר כאשר לא מועבר `locale`.

- [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

### רכיבי שרת ב-Next.js (Server Components)

ב-Next.js, ניתן לקרוא את ה-locale של הבקשה רק באופן אסינכרוני, דרך `headers()` ו-`cookies()`. השתמש ב-[`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayerAsync.md), הממתין לו באותו אופן שבו `getLocale()` מתוך `next-intlayer/server` פועל:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // ה-locale של הבקשה

  return { title };
};
```

קריאת ה-headers מעבירה את הנתיב למצב רינדור דינמי (dynamic rendering). כאשר `IntlayerProvider` כבר מספק את ה-locale, ה-headers אינן נקראות והנתיב נשאר סטטי.

## ביצועים: עם או בלי provider

התוכן זהה. ההבדל הוא בתגובתיות (reactivity) ובעלות הרינדור.

|              | עם provider                                  | ללא provider                                                                                                                     |
| ------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| החלפת locale | רכיבים מתרנדרים מחדש במקומם, ללא רענון עמוד  | שום דבר אינו מתרנדר מחדש; ה-locale החדש יוצג בקריאה הבאה (ניווט, רענון)                                                          |
| עלות קריאה   | איתור context והרשמה (subscription) ל-locale | קריאת פונקציה עם memoization, אותו אובייקט עבור אותו `key + locale`                                                              |
| עלות החלפה   | רינדור מחדש של כל צרכן (consumer)            | ללא עלות                                                                                                                         |
| רינדור שרת   | השרת והדפדפן מרנדרים את אותו ה-locale        | מחוץ לאינטגרציית בקשה, השרת מרנדר את ה-`defaultLocale` והדפדפן את ה-locale השמור: ייתכן חוסר התאמה בהידרציה (hydration mismatch) |
| Bundle       | קוד ה-provider                               | כ-100 בתים (gzipped) לקריאת ה-locale השמור, נשמר במטמון עד לשינוי ה-locale                                                       |

שמור על ה-provider עבור אפליקציות אינטראקטיביות שמחליפות locale במקום או מתרנדרות בשרת. ניתן לוותר עליו עבור backends, סקריפטים, דפים סטטיים שה-locale שלהם מגיע מתוך ה-URL (העבר אותו במפורש), או קוד שקורא את התוכן פעם אחת בלבד.

לפרטים נוספים, עיין ב-[`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md).

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getIntlayer.md)
