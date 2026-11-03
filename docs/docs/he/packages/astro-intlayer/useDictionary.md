---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useDictionary | astro-intlayer
description: גלה כיצד להשתמש בהוק useDictionary ברכיבי ובסקריפטים של Astro כדי לפענח אובייקטי מילון.
keywords:
  - useDictionary
  - מילון
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד ההוק useDictionary

ההוק `useDictionary` מפענח אובייקט מילון מיובא או מוטבע ומחזיר את תוכנו עבור השפה הנוכחית ביישומי Astro.

בניגוד ל-`useIntlayer`, המאחזר מילונים לפי מפתח מתוך רישום המילונים הגלובלי, `useDictionary` עובד ישירות עם אובייקט מילון.

## שימוש

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

ניתן גם להעביר מילונים מוטבעים (inline) המוגדרים באמצעות `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
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
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## פרמטרים

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: אובייקט מילון או קבוצת מילונים מוכשרת (qualified dictionary group).
2. **`localeOrSelector`** (אופציונלי): שפה ספציפית או אובייקט בורר (selector) (`{ item }`, `{ variant }`, אופציונלית עם `locale`).

## תיאור

ההוק מבצע את המשימות הבאות:

1. **זיהוי שפה (Locale Detection)**: בשרת, הוא משיג את השפה מתוך `Astro.locals.intlayer`. בדפדפן, הוא משתמש בשפת חנות הלקוח (client-side store).
2. **עיבוד תוכן (Content Processing)**: מפענח תרגומים (`t()`), ריבוי (enumerations), תנאים ומבנים מקוננים בהתאם לשפה שפוענחה.
3. **בוררים (Selectors)**: מחיל כל בורר פריט או וריאנט שסופק בארגומנטים.

## תיעוד קשור

- [אינטגרציית `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/intlayer.md)
- [הוק `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useIntlayer.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/astro-intlayer/useLocale.md)
