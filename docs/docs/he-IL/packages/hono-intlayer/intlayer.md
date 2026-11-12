---
createdAt: 2026-01-29
updatedAt: 2026-11-03
priority: 5
title: "תיעוד תוכנת הביניים intlayer ל-Hono | hono-intlayer"
description: "תוכנת הביניים intlayer עבור Hono מזהה את שפת המשתמש ומוסיפה פונקציות תרגום של Intlayer להקשר הבקשה."
keywords:
  - intlayer
  - hono
  - תוכנת ביניים
  - middleware
  - Intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד תוכנת הביניים intlayer ל-Hono

תוכנת הביניים `intlayer` עבור Hono מזהה את שפת המשתמש ומאכלסת את אובייקט ההקשר (context) בפונקציות Intlayer. היא מאפשרת גם שימוש בפונקציות תרגום גלובליות בתוך הקשר הבקשה.

## שימוש

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
  });

  return c.text(content);
});
```

## תיאור

תוכנת הביניים מבצעת את המשימות הבאות:

1. **זיהוי שפה**: היא מנתחת את הבקשה (כותרות, עוגיות וכו') כדי לקבוע את השפה המועדפת על המשתמש.
2. **אכלוס ההקשר (Context Population)**: היא מוסיפה נתוני Intlayer להקשר של Hono, הניתנים לגישה דרך `c.get()`. זה כולל:
   - `locale`: השפה שזוהתה.
   - `t`: פונקציית תרגום.
   - `getIntlayer`: פונקציה לאחזור מילונים.
   - `getDictionary`: פונקציה לעיבוד אובייקטי מילון.
