---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד ה-Composable useRewriteURL | vue-intlayer"
description: ‏Composable ייעודי ל-Vue לניהול שכתוב כתובות URL מותאמות לשפה ב-Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
author: aymericzip
---

# ה-Composable useRewriteURL

ה-composable `useRewriteURL` עבור Vue 3 מיועד לטפל בשכתוב כתובות URL מותאמות לשפה בצד הלקוח. הוא מתקן אוטומטית את כתובת ה-URL בדפדפן לגרסה המקומית ה"יפה" (pretty URL) בהתבסס על השפה הנוכחית של המשתמש והתצורה ב-`intlayer.config.ts`.

הוא פועל באמצעות `window.history.replaceState`, מה שמונע הפעלת ניווטים לא רצויים ב-Vue Router.

## שימוש

קרא ל-composable בתוך פונקציית ה-`setup()` שלך או ב-`<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// מתקן אוטומטית את /fr/tests ל-/fr/essais בשורת הכתובות אם קיים כלל שכתוב
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## כיצד זה עובד

1. **ניטור תגובתי (Reactive Monitoring)**: ה-composable מגדיר `watch` על ה-`locale` של המשתמש.
2. **התאמת שכתוב**: בכל פעם שהשפה משתנה (או בעת טעינת הרכיב), הוא בודק האם ה-`window.location.pathname` הנוכחי תואם לנתיב קנוני שיש לו כינוי מקומי יפה יותר.
3. **תיקון ה-URL**: אם נמצא כינוי יפה יותר, ה-composable קורא ל-`window.history.replaceState` כדי לעדכן את שורת הכתובות ללא טעינה מחדש של הדף ומבלי לאבד את מצב הנתב (router state).

## מדוע להשתמש בו?

- **אופטימיזציה ל-SEO**: מבטיח שמנועי חיפוש יאנדקסו את הגרסה המותאמת לשפה הרשמית של כתובות ה-URL שלך.
- **חוויית משתמש משופרת**: מתקן כתובות URL שהוזנו ידנית כדי לשקף את השמות המועדפים עליך (למשל, `/fr/a-propos` במקום `/fr/about`).
- **תקורה נמוכה**: מעדכן את ה-URL באופן שקט מבלי להפעיל מחדש את מחזורי חיי הרכיבים (lifecycles) או שומרי הניווט (navigation guards).
