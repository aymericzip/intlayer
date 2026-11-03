---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד הרכיב IntlayerProvider | react-intlayer
description: גלה כיצד להשתמש ברכיב IntlayerProvider עבור חבילת react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד הרכיב IntlayerProvider

הרכיב `IntlayerProvider` הוא הספק הראשי עבור Intlayer ביישומי React. הוא מספק את קונטקסט ה-Intlayer לכל הילדים שלו.

## שימוש

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## מאפיינים (Props)

| מאפיין (Prop)     | טיפוס                             | תיאור                                          |
| ----------------- | --------------------------------- | ---------------------------------------------- |
| `locale`          | `LocalesValues`                   | השפה הראשונית לשימוש.                          |
| `defaultLocale`   | `LocalesValues`                   | שפת ברירת המחדל לשימוש כגיבוי (fallback).      |
| `setLocale`       | `(locale: LocalesValues) => void` | פונקציה מותאמת אישית להגדרת השפה.              |
| `disableEditor`   | `boolean`                         | האם להשבית את העורך.                           |
| `isCookieEnabled` | `boolean`                         | האם לאפשר עוגיות (cookies) לשמירת השפה הנבחרת. |
