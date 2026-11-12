---
createdAt: 2026-09-19
updatedAt: 2026-11-03
priority: 5
title: תיעוד ההוק useIntlayer | astro-intlayer
description: גלה כיצד להשתמש בהוק useIntlayer ברכיבי Astro ובסקריפטים של הלקוח כדי לגשת לתוכן מתורגם.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד ההוק useIntlayer

ההוק `useIntlayer` מאפשר לך לאחזר תוכן מילון מתורגם לפי מפתח ביישומי Astro.

ניתן לקרוא לו בשני הקשרים שונים באמצעות אותו נתיב ייבוא:

1. **שרת / Frontmatter**: בתוך קובצי `.astro`, הוא מפענח אוטומטית את התוכן באמצעות שפת הבקשה המאוחסנת ב-`Astro.locals.intlayer`.
2. **דפדפן / סקריפט לקוח `<script>`**: בתוך סקריפטים של הלקוח או רכיבי פריימוורק ממשק משתמש, הוא מתפענח למימוש חנות צד-הלקוח (`vanilla-intlayer`).

## שימוש

### בתוך Frontmatter של רכיב Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### בתוך בלוקי `<script>` של הלקוח

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## פרמטרים

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: המפתח הייחודי של המילון (כפי שהוגדר בקובצי הצהרת התוכן `.content.ts` שלך).
2. **`localeOrSelector`** (אופציונלי): שפה ספציפית או אובייקט בורר (`{ item }`, `{ variant }`, אופציונלית עם `locale`). כאשר מסופק, הוא דורס את השפה שזוהתה מקונטקסט הבקשה או מחנות הלקוח.

## תיאור

ההוק מבצע את המשימות הבאות:

1. **פענוח שפה (Locale Resolution)**:
   - בשרת, קורא את השפה הפעילה מתוך `Astro.locals.intlayer` באמצעות היקף `AsyncLocalStorage` שאותחל על ידי `astro-intlayer/middleware`.
   - בדפדפן, קורא את השפה הפעילה מתוך אחסון/חנות הלקוח.
2. **אחזור מילון (Dictionary Retrieval)**: מזריק את תוכן המילון התואם למפתח שצוין.
3. **עיבוד תרגום (Translation Processing)**: מפענח תרגומים (`t()`), ריבוי (enumerations), תנאים ו-Markdown לתוכן מוכן לרינדור.

## תיעוד קשור

- [אינטגרציית `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/astro-intlayer/intlayer.md)
- [הוק `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/astro-intlayer/useDictionary.md)
- [הוק `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/astro-intlayer/useLocale.md)
