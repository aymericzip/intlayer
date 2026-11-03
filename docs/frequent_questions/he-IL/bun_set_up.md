---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: שגיאת module not found בעת שימוש ב-Bun
description: 'תקן את שגיאת "Cannot find package" בעת הרצת Intlayer עם Bun, הנגרמת מאופן הגדרת ה-scope של הפונקציה require() ב-Bun, באמצעות ההגדרה הפותרת אותה.'
keywords:
  - bun
  - module not found
  - intlayer
  - configuration
  - הגדרות
  - package manager
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
---

# שגיאת module not found בעת שימוש ב-Bun

## תיאור הבעיה

בעת שימוש ב-Bun, ייתכן שתיתקל בשגיאה הבאה:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## הסיבה

Intlayer משתמשת ב-`require` באופן פנימי, ו-Bun מגבילה את ה-scope של הפונקציה `require` לפתור (resolve) חבילות של חבילת `@intlayer/config` בלבד, במקום של הפרויקט כולו.

## הפתרון

### ספק את הפונקציה `require` בהגדרות

```ts
const config: IntlayerConfig = {
  build: {
    require,
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require,
});

export default configuration;
```
