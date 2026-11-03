---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useDictionary | remix-intlayer
description: גלה כיצד להשתמש בהוק useDictionary ביישומי Remix 3 כדי לפענח אובייקטי מילון עבור שפת הבקשה הנוכחית.
keywords:
  - useDictionary
  - מילון
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד ההוק useDictionary

ההוק `useDictionary` מתמיר אובייקט מילון מיובא או מוטבע ומחזיר את תוכנו מפוענח עבור שפת הבקשה הנוכחית ביישומי Remix 3.

בניגוד ל-`useIntlayer`, המפענח מילונים לפי מפתח המחרוזת שלהם מתוך רישום המילונים הגלובלי, `useDictionary` מקבל אובייקט מילון ישירות.

## שימוש

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

ניתן גם להעביר מילונים מוטבעים (inline) המוגדרים באמצעות `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        he: "כל הזכויות שמורות.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## פרמטרים

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: אובייקט מילון או קבוצת מילונים מוכשרת (qualified dictionary group).
2. **`localeOrSelector`** (אופציונלי): שפה ספציפית או אובייקט בורר (`{ item }`, `{ variant }`, אופציונלית עם `locale`). מקבל עדיפות על פני שפת הבקשה אם סופק.

## תיאור

ההוק מבצע את המשימות הבאות:

1. **זיהוי שפה (Locale Detection)**: קורא את שפת הבקשה הפעילה מתוך אחסון ה-`AsyncLocalStorage` שנוצר על ידי ה-middleware של `intlayer()`.
2. **פענוח תוכן (Content Resolution)**: מעריך תרגומים (`t()`), ריבוי (enumerations), תנאים ומבנים מקוננים בהתאם לשפה שפוענחה.
3. **עיבוד בוררים (Selector Processing)**: מחיל כל בורר פריט או וריאנט שצוין בארגומנטים.

## תיעוד קשור

- [תוכנת תיווך `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/intlayerMiddleware.md)
- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/useIntlayer.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/remix-intlayer/useLocale.md)
