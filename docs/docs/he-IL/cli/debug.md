---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "ניפוי שגיאות ב-Intlayer CLI"
description: "פתרון בעיות ב-Intlayer CLI: בדיקת הגרסה המותקנת, הפעלת לוגים מפורטים (verbose) ותיקון שגיאות פקודה ותצורה נפוצות."
keywords:
  - Debug
  - ניפוי שגיאות
  - Troubleshoot
  - פתרון בעיות
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
author: aymericzip
---

# ניפוי שגיאות בפקודת intlayer (Debug intlayer command)

## 1. **ודא שאתה משתמש בגרסה העדכנית ביותר**

הרץ:

```bash packageManager="npm"
npx intlayer --version                  # גרסת intlayer המקומית הנוכחית
npx intlayer@latest --version           # גרסת intlayer העדכנית ביותר
```

```bash packageManager="yarn"
yarn intlayer --version                  # גרסת intlayer המקומית הנוכחית
yarn intlayer@latest --version           # גרסת intlayer העדכנית ביותר
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # גרסת intlayer המקומית הנוכחית
pnpm intlayer@latest --version           # גרסת intlayer העדכנית ביותר
```

```bash packageManager="bun"
bun x intlayer --version                  # גרסת intlayer המקומית הנוכחית
bun x intlayer@latest --version           # גרסת intlayer העדכנית ביותר
```

## 2. **בדוק אם הפקודה רשומה**

תוכל לבדוק זאת באמצעות:

```bash packageManager="npm"
npx intlayer --help                     # מציג את רשימת הפקודות הזמינות ומידע על השימוש
npx intlayer dictionary build --help    # מציג את רשימת האפשרויות הזמינות עבור פקודה
```

```bash packageManager="yarn"
yarn intlayer --help                     # מציג את רשימת הפקודות הזמינות ומידע על השימוש
yarn intlayer dictionary build --help    # מציג את רשימת האפשרויות הזמינות עבור פקודה
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # מציג את רשימת הפקודות הזמינות ומידע על השימוש
pnpm intlayer dictionary build --help    # מציג את רשימת האפשרויות הזמינות עבור פקודה
```

```bash packageManager="bun"
bun x intlayer --help                     # מציג את רשימת הפקודות הזמינות ומידע על השימוש
bun x intlayer dictionary build --help    # מציג את רשימת האפשרויות הזמינות עבור פקודה
```

## 3. **הפעל מחדש את הטרמינל שלך**

לעיתים נדרש להפעיל מחדש את הטרמינל כדי לזהות פקודות חדשות.

## 4. **נקה את מטמון ה-npx (אם נתקעת עם גרסה ישנה)**

```bash
npx clear-npx-cache
```
