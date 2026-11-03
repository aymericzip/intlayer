---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: "תיעוד תוכנת הביניים intlayer ל-Express | express-intlayer"
description: "תוכנת הביניים intlayer עבור Express מזהה את שפת המשתמש וחושפת את t ו-getIntlayer דרך res.locals במטפלי הבקשות שלך."
keywords:
  - intlayer
  - express
  - תוכנת ביניים
  - middleware
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד תוכנת הביניים intlayer ל-Express

תוכנת הביניים `intlayer` עבור Express מזהה את שפת המשתמש ומספקת פונקציות תרגום דרך האובייקט `res.locals`. היא מאפשרת גם את השימוש בפונקציות `t` ו-`getIntlayer` ברחבי מטפלי הבקשות שלך.

## שימוש

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## תיאור

תוכנת הביניים מבצעת את המשימות הבאות:

1. **זיהוי שפה**: היא בודקת עוגיות (cookies), כותרות (כמו `Accept-Language`) ופרמטרי URL כדי לקבוע את שפת המשתמש.
2. **הגדרת הקשר (Context)**: היא מאכלסת את `res.locals` בנתונים הבאים:
   - `locale`: השפה שזוהתה.
   - `t`: פונקציית תרגום המשויכת לשפה שזוהתה.
   - `getIntlayer`: פונקציה לאחזור מילונים המשויכת לשפה שזוהתה.
3. **Async Local Storage**: היא מגדירה הקשר המאפשר שימוש בפונקציות הגלובליות `t` ו-`getIntlayer` המיובאות מתוך `express-intlayer` לאורך זרימת הבקשה.
