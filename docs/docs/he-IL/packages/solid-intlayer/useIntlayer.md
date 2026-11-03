---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useIntlayer | solid-intlayer
description: "השתמש ב-useIntlayer ב-Solid כדי לקרוא את התוכן המתורגם של מילון לפי מפתח, כערכים תגובתיים (reactive) המתעדכנים בעת שינוי השפה."
keywords:
  - useIntlayer
  - מילון
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון שימוש ב-API של Solid useIntlayer לגישה ישירה למאפיינים"
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# תיעוד ההוק useIntlayer

ההוק `useIntlayer` מאפשר לך לאחזר תוכן מתורגם מתוך מילון באמצעות המפתח שלו. ב-Solid, הוק זה מחזיר תוכן תגובתי (reactive) המתעדכן בכל פעם שהשפה משתנה.

## שימוש

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## תיאור

ההוק מבצע את המשימות הבאות:

1. **זיהוי שפה (Locale Detection)**: משתמש בשפה הנוכחית מתוך קונטקסט ה-`IntlayerProvider`.
2. **הזרקת מילון (Dictionary Injection)**: מזריק אוטומטית את תוכן המילון התואם למפתח שסופק, תוך שימוש בהצהרות המותאמות שנוצרו על ידי המהדר של Intlayer.
3. **תגובתיות (Reactivity)**: מחזיר תוכן תגובתי המתעדכן אוטומטית בעת שינוי מצב השפה הגלובלי.
4. **עיבוד תרגום (Translation Processing)**: מפענח את התוכן בהתבסס על השפה שזוהתה, ומעבד כל הגדרת `t()`, `enu()` וכו' שנמצאת בתוך המילון.

## פרמטרים

- **key**: המפתח הייחודי של המילון (כפי שהוגדר בקובצי הצהרת התוכן שלך).
- **locale** (אופציונלי): דריסת השפה הנוכחית.

## ערך מוחזר

תוכן תגובתי (Reactive content).
