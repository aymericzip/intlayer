---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useDictionary | react-intlayer
description: "השתמש ב-useDictionary ב-React כדי לפענח אובייקט מילון שאתה מגדיר בעצמך, עם תרגומים, ריבוי (enumerations) ועוד."
keywords:
  - useDictionary
  - מילון
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# תיעוד ההוק useDictionary

ההוק `useDictionary` מאפשר לך לעבד אובייקט בעל מבנה של מילון (המכיל מפתחות ותוכן) ולטפל בתוכו בתרגומים, ריבוי (enumerations) וכו'. בניגוד ל-`useIntlayer`, אשר מיועד לעבוד עם הצהרות מילון שנוצרו מראש (generated dictionary declarations), `useDictionary` גמיש יותר וניתן להשתמש בו עם כל אובייקט העוקב אחר מבנה המילון.

## שימוש

```tsx
import { useDictionary } from "react-intlayer";
import { t } from "intlayer";

const MyComponent = () => {
  const content = useDictionary({
    key: "my_key",
    content: {
      myTranslation: t({
        he: "שלום",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  });

  return (
    <div>
      <p>{content.myTranslation}</p>
    </div>
  );
};
```

## תיאור

ההוק מבצע את המשימות הבאות:

1. **זיהוי שפה (Locale Detection)**: משתמש בשפה הנוכחית מתוך קונטקסט ה-`IntlayerProvider`.
2. **עיבוד תרגום (Translation Processing)**: מפענח את התוכן בהתבסס על השפה שזוהתה, ומעבד כל הגדרת `t()`, `enu()` וכו' שנמצאת בתוך האובייקט.
3. **תוכן גמיש**: עובד ישירות עם האובייקט שמועבר אליו, מה שהופך אותו לאידיאלי עבור תוכן דינמי או אובייקטים שאינם חלק מהמילונים הסטנדרטיים שנבנו מראש.
