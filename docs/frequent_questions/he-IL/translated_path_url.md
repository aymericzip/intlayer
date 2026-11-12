---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: האם ניתן לתרגם את נתיב ה-URL?
description: "כן: Intlayer מאפשרת לתרגם נתיבי URL, כגון /about ל- /fr/a-propos, באמצעות שכתוב כתובות URL מותאם אישית (rewrites) המוגדר לפי כל locale."
keywords:
  - מערך
  - content
  - הצהרה
  - intlayer
  - middleware
  - proxy
  - rewrite
  - prefix
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
author: aymericzip
---

# האם ניתן לתרגם כתובות URL?

כן! Intlayer תומכת בשכתוב כתובות URL מותאם אישית (custom URL rewrites), המאפשר לך להגדיר נתיבים ספציפיים לכל locale. לדוגמה:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

כדי ליישם זאת, תוכל להגדיר את חלק ה-`routing` בקובץ `intlayer.config.ts` שלך.

למידע נוסף על אופן היישום של תכונה זו, עיין ב-[תיעוד שכתוב כתובות URL מותאם אישית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/custom_url_rewrites.md).

תוכל גם להשתמש בפונקציות `getMultilingualUrl` ו-`getLocalizedUrl` כדי ליצור כתובות URL אלו באופן תכנותי, והן יכבדו את כללי השכתוב (rewrite) שהגדרת.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (אם הוגדר)
```
