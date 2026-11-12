---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד הרכיב IntlayerProvider | solid-intlayer
description: גלה כיצד להשתמש ברכיב IntlayerProvider עבור חבילת solid-intlayer
keywords:
  - IntlayerProvider
  - ספק
  - provider
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
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# תיעוד הרכיב IntlayerProvider

`IntlayerProvider` הוא רכיב השורש המספק את קונטקסט הבינאום ליישום ה-Solid שלך. הוא מנהל את מצב השפה הנוכחית ומבטיח שכל רכיבי הילד יוכלו לגשת לתרגומים.

## שימוש

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## תיאור

`IntlayerProvider` ממלא את התפקידים הבאים:

1. **ניהול מצב (State Management)**: מאתחל ושומר את השפה הנוכחית, תוך שימוש ב-signals עבור תגובתיות (reactivity).
2. **פענוח שפה (Locale Resolution)**: קובע את השפה הראשונית בהתבסס על עוגיות (cookies), העדפות דפדפן או תצורת ברירת המחדל.
3. **הזרקת קונטקסט (Context Injection)**: מעמיד את השפה ואת פונקציית `setLocale` לרשות כל רכיב באמצעות הוקים כמו `useIntlayer` או `useLocale`.
4. **שמירה מתמשכת (Persistence)**: מסנכרן אוטומטית שינויי שפה עם עוגיות או local storage כדי לשמר את העדפת המשתמש בין הפעלות (sessions).

## מאפיינים (Props)

- **locale** (אופציונלי): הגדרה ידנית של השפה הנוכחית.
- **defaultLocale** (אופציונלי): דריסת שפת ברירת המחדל מתוך התצורה.
- **setLocale** (אופציונלי): אספקת פונקציה מותאמת אישית לעדכון השפה.
- **disableEditor** (אופציונלי): השבתת האינטגרציה עם העורך הוויזואלי.
- **isCookieEnabled** (אופציונלי): הפעלה או השבתה של שמירה מתמשכת בעוגיות.
