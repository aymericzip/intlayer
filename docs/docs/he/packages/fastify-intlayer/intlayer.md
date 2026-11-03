---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: "תיעוד תוסף intlayer ל-Fastify | fastify-intlayer"
description: "תוסף intlayer עבור Fastify מזהה את שפת המשתמש ומעטר כל בקשה בפונקציות תרגום של Intlayer."
keywords:
  - intlayer
  - fastify
  - תוסף
  - plugin
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד תוסף intlayer ל-Fastify

תוסף `intlayer` עבור Fastify מזהה את שפת המשתמש ומעטר את אובייקט הבקשה בפונקציות Intlayer. הוא מאפשר גם שימוש בפונקציות תרגום גלובליות בתוך הקשר הבקשה.

## שימוש

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    he: "שלום",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## תיאור

התוסף מבצע את המשימות הבאות:

1. **זיהוי שפה**: הוא מנתח את הבקשה (כותרות, עוגיות וכו') כדי לקבוע את השפה המועדפת על המשתמש.
2. **עיטור הבקשה (Request Decoration)**: הוא מוסיף מאפיין `intlayer` לאובייקט `FastifyRequest`, המכיל:
   - `locale`: השפה שזוהתה.
   - `t`: פונקציית תרגום.
   - `getIntlayer`: פונקציה לאחזור מילונים.
