---
createdAt: 2026-08-24
updatedAt: 2026-11-03
priority: 5
title: "תיעוד חבילת elysia-intlayer"
description: "תוסף Elysia עבור Intlayer, המספק פונקציות תרגום וזיהוי שפה."
keywords:
  - elysia-intlayer
  - elysia
  - תוסף
  - plugin
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "תיעוד מאוחד עבור כל הייצואים (exports)"
author: aymericzip
---

# חבילת elysia-intlayer

חבילת `elysia-intlayer` מספקת תוסף עבור אפליקציות Elysia לניהול בינאום. היא מזהה את שפת המשתמש ומזריקה אובייקט `intlayer` לתוך הקשר הניתוב (route context).

## התקנה

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` היא peer dependency (`>=1.0.0`). Elysia מיועדת עבור סביבת הריצה **Bun**.

## ייצואים (Exports)

### תוסף (Plugin)

ייבוא:

```ts
import { intlayer } from "elysia-intlayer";
```

| פונקציה    | תיאור                                                                                                                                                                                                                                                                       | תיעוד קשור                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | תוסף Elysia המשלב את Intlayer באפליקציית ה-Elysia שלך. מטפל בזיהוי שפה מאחסון (עוגייה, כותרת) ולאחר מכן מ-`Accept-Language`, מזריק אובייקט `intlayer` החושף את `locale`, `t`, `getIntlayer` ו-`getDictionary` לתוך הקשר הנתיב, ומגדיר את הקשר הבקשה של `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/elysia-intlayer/intlayer.md) |

### פונקציות

ייבוא:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| פונקציה         | תיאור                                                                                                                                                                                                               | תיעוד קשור                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | פונקציית תרגום גלובלית המאחזרת תוכן עבור השפה הנוכחית ב-Elysia. משתמשת ב-`AsyncLocalStorage` כדי לגשת להקשר הבקשה שהוגדר על ידי תוסף `intlayer`, וחוזרת לשפת ברירת המחדל מחוצה לו. ניתנת לגישה גם דרך `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md) |
| `getIntlayer`   | מאחזרת מילון לפי המפתח שלו מתוך ההצהרה שנוצרה ומחזירה את התוכן שלו עבור השפה הנוכחית. גרסה מותאמת של `getDictionary`. משתמשת ב-`AsyncLocalStorage` לגישה להקשר הבקשה. ניתנת לגישה גם דרך `intlayer.getIntlayer`.    | -                                                                                                      |
| `getDictionary` | מעבדת אובייקטי מילון ומחזירה תוכן עבור השפה הנוכחית. מעבדת תרגומי `t()`, ריבוי, markdown, HTML וכו'. משתמשת ב-`AsyncLocalStorage` לגישה להקשר הבקשה. ניתנת לגישה גם דרך `intlayer.getDictionary`.                   | -                                                                                                      |

### טיפוסים (Types)

ייבוא:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| טיפוס               | תיאור                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | מבנה אובייקט ה-`intlayer` המוזרק לכל הקשר נתיב: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | חתימת פונקציית התרגום, המתרגמת מפת שפות לתוכן המתאים לשפת הבקשה הנוכחית.                                                                             |

## שימוש

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // טעינת תוסף הבינאום
  .use(intlayer())
  // קריאת השפה וכלי העזר מתוך הקשר הנתיב
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      he: "שלום",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // או שימוש בכלי עזר עצמאיים, הקשורים לבקשה הנוכחית
  .get("/t_example", () =>
    t({
      he: "דוגמה לתוכן מוחזר בעברית",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> התוסף רושם את ההקשר שלו דרך `derive` **גלובלי**, אשר Elysia מגדירה טיפוסית כ-`Partial<{ intlayer: IntlayerContext }>`. הערך תמיד קיים בזמן ריצה עבור נתיבים שנרשמו לאחר `.use(intlayer())`, לכן השתמש בטענת non-null (`intlayer!.locale`) או בשרשור אופציונלי (optional chaining) כדי לרצות את TypeScript במצב `strict`.

## תיעוד קשור

- [תרגם את אתר ה-Elysia backend שלך באמצעות Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_elysia.md)
- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)
