---
createdAt: 2026-01-30
updatedAt: 2026-11-03
priority: 5
title: "תיעוד תוכנת הביניים intlayer ל-AdonisJS | adonis-intlayer"
description: "תוכנת הביניים intlayer עבור AdonisJS מזהה את שפת המשתמש וחושפת פונקציות תרגום דרך הקשר הבקשה."
keywords:
  - intlayer
  - adonisjs
  - תוכנת ביניים
  - middleware
  - Intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד תוכנת הביניים intlayer ל-AdonisJS

תוכנת הביניים `intlayer` עבור AdonisJS מזהה את שפת המשתמש ומספקת פונקציות תרגום דרך הקשר הבקשה. היא מאפשרת גם שימוש בפונקציות תרגום גלובליות לאורך זרימת הבקשה.

## שימוש

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## תיאור

תוכנת הביניים מבצעת את המשימות הבאות:

1. **זיהוי שפה**: היא מנתחת את הבקשה (כותרות, עוגיות וכו') כדי לקבוע את השפה המועדפת על המשתמש.
2. **הגדרת הקשר (Context Setup)**: היא מאכלסת את הקשר הבקשה במידע השפה.

> הערה: כדי להשתמש בעוגיות לצורך זיהוי שפה, ודא ש-`@adonisjs/cookie` מוגדר ונמצא בשימוש באפליקציה שלך.
