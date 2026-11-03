---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useIntlayer | react-intlayer
description: "השתמש ב-useIntlayer ב-React כדי לקרוא את התוכן המתורגם של מילון לפי מפתח, עם טיפוסים מדויקים מקובצי הצהרת התוכן שלך."
keywords:
  - useIntlayer
  - מילון
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# תיעוד ההוק useIntlayer

ההוק `useIntlayer` מאפשר לך לאחזר תוכן מתורגם מתוך מילון באמצעות המפתח שלו. הוא מבוסס על `useDictionary`, אך מזריק אוטומטית גרסה מותאמת ביצועים של המילון מתוך ההצהרות שנוצרו.

## שימוש

```tsx
import { useIntlayer } from "react-intlayer";

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
2. **הזרקת מילון (Dictionary Injection)**: מזריק אוטומטית את תוכן המילון התואם למפתח שסופק, תוך שימוש בהצהרות המותאמות שנוצרו על ידי המהדר (compiler) של Intlayer.
3. **עיבוד תרגום (Translation Processing)**: מפענח את התוכן בהתבסס על השפה שזוהתה, ומעבד כל הגדרת `t()`, `enu()` וכו' שנמצאת בתוך המילון.
