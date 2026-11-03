---
createdAt: 2026-01-21
updatedAt: 2026-11-03
priority: 5
title: תיעוד חבילת nuxt-intlayer
description: אינטגרציית Nuxt עבור Intlayer, המספקת מודול עבור יישומי Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "תיעוד מאוחד לכל הייצואים"
author: aymericzip
---

# חבילת nuxt-intlayer

חבילת `nuxt-intlayer` מספקת מודול Nuxt לשילוב Intlayer בפרויקט ה-Nuxt שלך.

## התקנה

```bash
npm install nuxt-intlayer
```

## ייצואים

### מודול (Module)

חבילת `nuxt-intlayer` מספקת מודול Nuxt לשילוב Intlayer בפרויקט ה-Nuxt שלך.

ייבוא:

```tsx
import "nuxt-intlayer";
```

או הוספה אל `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| ייצוא     | טיפוס        | תיאור                                                         |
| --------- | ------------ | ------------------------------------------------------------- |
| `default` | `NuxtModule` | ייצוא ברירת המחדל הוא מודול ה-Nuxt שמגדיר ומקנפג את Intlayer. |
