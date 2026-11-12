---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד הרכיב MarkdownRenderer | react-intlayer
description: גלה כיצד להשתמש ברכיב MarkdownRenderer עבור חבילת react-intlayer
keywords:
  - MarkdownRenderer
  - react
  - Intlayer
  - intlayer
  - בינאום
  - תיעוד
slugs:
  - doc
  - packages
  - react-intlayer
  - MarkdownRenderer
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: "התחלת תיעוד"
author: aymericzip
---

# תיעוד הרכיב MarkdownRenderer

הרכיב `MarkdownRenderer` מרנדר תוכן Markdown באמצעות רכיבים מותאמים אישית.

## שימוש

```tsx
import { MarkdownRenderer } from "react-intlayer/markdown";

const MyComponent = () => (
  <MarkdownRenderer># My Title My content</MarkdownRenderer>
);
```

## מאפיינים (Props)

| מאפיין (Prop) | טיפוס             | תיאור                                                                    |
| ------------- | ----------------- | ------------------------------------------------------------------------ |
| `children`    | `string`          | תוכן ה-Markdown לרינדור.                                                 |
| `components`  | `Overrides`       | מפת רכיבים מותאמים אישית (overrides) לשימוש עבור רכיבי Markdown מסוימים. |
| `options`     | `MarkdownOptions` | אפשרויות נוספות עבור מרנדר ה-Markdown.                                   |
