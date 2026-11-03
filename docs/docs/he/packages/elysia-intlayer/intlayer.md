---
createdAt: 2026-08-24
updatedAt: 2026-11-03
priority: 5
title: "תיעוד תוסף intlayer ל-Elysia | elysia-intlayer"
description: "תוסף intlayer עבור Elysia מזהה את שפת המשתמש ומזריק פונקציות תרגום לתוך הקשר הניתוב (route context) של כל בקשה."
keywords:
  - intlayer
  - elysia
  - תוסף
  - plugin
  - Intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד תוסף intlayer ל-Elysia

תוסף `intlayer` עבור Elysia מזהה את שפת המשתמש ומזריק אובייקט `intlayer` לתוך הקשר הניתוב (route context). הוא מאפשר גם שימוש בפונקציות תרגום עצמאיות (standalone) בתוך הקשר הבקשה.

## שימוש

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> התוסף רושם את ההקשר שלו דרך `derive` **גלובלי**, אשר Elysia מגדירה טיפוסית כ-`Partial<{ intlayer: IntlayerContext }>`. הערך תמיד קיים בזמן ריצה עבור נתיבים שנרשמו לאחר `.use(intlayer())`, לכן השתמש בטענת non-null (`intlayer!.t`) או בשרשור אופציונלי (optional chaining) כדי לרצות את TypeScript במצב `strict`.

אותם כלי עזר זמינים גם כייצואים עצמאיים, כך שתוכל לקרוא להם מבלי לפרק (destructure) את הקשר הנתיב:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## תיאור

התוסף מבצע את המשימות הבאות:

1. **זיהוי שפה**: הוא קורא את השפה שהוגדרה במפורש על ידי הלקוח מתוך האחסון (עוגייה, כותרת), ולאחר מכן חוזר לשפה שהותאמה מתוך כותרת `Accept-Language`. אם אף שפה נתמכת אינה תואמת, הוא חוזר ל-`defaultLocale` שהוגדר.
2. **הזרקת הקשר (Context Injection)**: הוא מוסיף מאפיין `intlayer` להקשר הניתוב של Elysia (ראה את הטבלה להלן).
3. **הכנת מילונים**: הוא קורא ל-`prepareIntlayer` בעת יצירת התוסף, כך שהמילונים נבנים כאשר האפליקציה עולה.

### הקשר הנתיב (Route Context)

| מאפיין            | טיפוס                  | תיאור                                                                |
| ----------------- | ---------------------- | -------------------------------------------------------------------- |
| `locale`          | `Locale`               | השפה לשימוש עבור בקשה זו. `locale_storage` קודם ל-`locale_detected`. |
| `locale_storage`  | `Locale` (אופציונלי)   | השפה שהתבקשה במפורש על ידי הלקוח דרך עוגייה או כותרת.                |
| `locale_detected` | `Locale`               | השפה שהותאמה מתוך כותרות הבקשה.                                      |
| `defaultLocale`   | `Locale`               | השפה שהוגדרה כברירת מחדל ב-`intlayer.config.ts`.                     |
| `t`               | `TranslateFunction`    | מתרגמת מפת שפות ישירה (inline locale map).                           |
| `getIntlayer`     | `typeof getIntlayer`   | קוראת מילון לפי מפתח, כברירת מחדל לפי שפת הבקשה.                     |
| `getDictionary`   | `typeof getDictionary` | קוראת מילון מיובא, כברירת מחדל לפי שפת הבקשה.                        |

כאשר הם נקראים מחוץ לבקשה המטופלת על ידי התוסף, כלי העזר העצמאיים חוזרים לשפת ברירת המחדל שהוגדרה.

## סדר פענוח השפה

כברירת מחדל, התוסף מפענח את השפה לפי הסדר הבא:

1. עוגיית `INTLAYER_LOCALE`.
2. כותרת `x-intlayer-locale`.
3. משא ומתן כותרת `Accept-Language`.
4. ה-`defaultLocale` המוגדר.

```bash
# משא ומתן מתוך `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# העוגייה קודמת ל-`Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# הכותרת קודמת ל-`Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## תצורה

התוסף קורא את קובץ ה-`intlayer.config.ts` שלך. באפשרותך להתאים אישית את העוגייה והכותרת המשמשות לזיהוי שפה:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> למידע נוסף על תצורה, בקר ב-[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

## תיעוד קשור

- [ייצואי חבילת elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/elysia-intlayer/exports.md)
- [תרגם את אתר ה-Elysia backend שלך באמצעות Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_elysia.md)
