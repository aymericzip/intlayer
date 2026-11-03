---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת lynx-intlayer
description: "חבילת lynx-intlayer משלבת את Intlayer ביישומי Lynx, עם ה-polyfills וכלי העזר הנדרשים לתמיכה בשפות במובייל."
keywords:
  - lynx-intlayer
  - lynx
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת lynx-intlayer

חבילת `lynx-intlayer` מספקת את הכלים הנדרשים לשילוב Intlayer ביישומי Lynx.

## התקנה

```bash
npm install lynx-intlayer
```

## ייצואים

### Polyfill

ייבוא:

```tsx
import "lynx-intlayer";
```

| פונקציה            | תיאור                                                               |
| ------------------ | ------------------------------------------------------------------- |
| `intlayerPolyfill` | פונקציה המפעילה את ה-polyfills הנדרשים עבור Lynx לתמיכה ב-Intlayer. |

### תוסף Rsbuild

חבילת `lynx-intlayer` מספקת תוסף Rsbuild לשילוב Intlayer בתהליך הבנייה של Lynx.

ייבוא:

```tsx
import "lynx-intlayer";
```

| פונקציה              | תיאור                                          |
| -------------------- | ---------------------------------------------- |
| `pluginIntlayerLynx` | תוסף Rsbuild המשלב את Intlayer בבנייה של Lynx. |
