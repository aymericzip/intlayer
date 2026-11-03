---
createdAt: 2026-01-30
updatedAt: 2026-11-03
priority: 5
title: "תיעוד הפונקציה t | adonis-intlayer"
description: "השתמש בפונקציה t מתוך adonis-intlayer כדי להחזיר תגובות מותאמות שפה ב-AdonisJS, תוך בחירת תוכן על פי השפה שזוהתה עבור כל בקשה."
keywords:
  - t
  - תרגום
  - Intlayer
  - בינאום
  - תיעוד
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: "תיעוד ראשוני"
author: aymericzip
---

# תיעוד: הפונקציה `t` ב-`adonis-intlayer`

הפונקציה `t` בחבילת `adonis-intlayer` היא כלי הליבה לאספקת תגובות מותאמות שפה באפליקציית ה-AdonisJS שלך. היא מפשטת את תהליך הבינאום (i18n) על ידי בחירה דינמית של תוכן בהתבסס על השפה המועדפת על המשתמש.

## סקירה כללית

הפונקציה `t` משמשת להגדרה ואחזור של תרגומים עבור קבוצת שפות נתונה. היא קובעת אוטומטית את השפה המתאימה להחזרה בהתבסס על הגדרות בקשת הלקוח, כגון כותרת `Accept-Language`. אם השפה המועדפת אינה זמינה, היא חוזרת בצורה חלקה לשפת ברירת המחדל שצוינה בתצורה שלך.

## תכונות עיקריות

- **התאמה דינמית לשפה**: בוחרת אוטומטית את התרגום המתאים ביותר עבור הלקוח.
- **חזרה לשפת ברירת המחדל (Fallback)**: חוזרת לשפת ברירת המחדל אם השפה המועדפת על הלקוח אינה זמינה, מה שמבטיח רציפות בחוויית המשתמש.
- **הקשר אסינכרוני (Asynchronous Context)**: פועלת בצורה חלקה בתוך מחזור חיי הבקשה של AdonisJS באמצעות Async Local Storage.
- **תמיכה ב-TypeScript**: אכיפת בטיחות טיפוסים (type safety) עבור התרגומים שלך.

## חתימת הפונקציה

```typescript
t(translations: Record<string, any>): any;
```

### פרמטרים

- `translations`: אובייקט שבו המפתחות הם קודי שפה (למשל, `he`, `en`, `fr`, `es`) והערכים הם תוכן התרגום התואם.

### ערך מוחזר

- התוכן המייצג את השפה המועדפת על הלקוח.

## טעינת תוכנת הביניים

כדי להבטיח שהפונקציה `t` תפעל כהלכה, **עליך** לרשום את תוכנת הביניים `intlayer` באפליקציית ה-AdonisJS שלך.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

## דוגמאות שימוש

### דוגמה בסיסית

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    he: "ברוכים הבאים!",
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### שימוש בבקרים (Controllers)

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        he: "שלום מהבקר",
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

## נושאים מתקדמים

### מנגנון גיבוי (Fallback)

אם שפה מועדפת אינה זמינה, הפונקציה `t` תחזור לשפת ברירת המחדל המוגדרת בתוך `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.HEBREW,
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### שילוב עם TypeScript

הפונקציה `t` בטוחה מבחינת טיפוסים כאשר נעשה בה שימוש עם מילונים מוגדרים. לפרטים נוספים, עיין ב-[תיעוד TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תיעוד TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)
