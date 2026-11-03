---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד ההוק useRewriteURL | next-intlayer"
description: הוק ייעודי ל-Next.js לניהול שכתוב כתובות URL מותאמות לשפה ב-Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
author: aymericzip
---

# הוק useRewriteURL

ההוק `useRewriteURL` עבור Next.js הוא הוק צד-לקוח המנהל אוטומטית שכתוב כתובות URL מותאמות לשפה. הוא מבטיח שכתובת ה-URL בדפדפן תשקף תמיד את הנתיב המקומי ה"יפה" (pretty path) שהוגדר ב-`intlayer.config.ts` שלך, גם אם המשתמש מקליד ידנית נתיב קנוני עם קידומת שפה.

הוק זה פועל ברקע בצורה שקטה באמצעות `window.history.replaceState`, ונמנע מניווטי נתב מיותרים של Next.js או מרענוני דף.

## שימוש

פשוט קרא להוק בתוך רכיב לקוח (Client Component) המהווה חלק מה-layout שלך.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // מתקן אוטומטית את /fr/privacy-notice ל-/fr/politique-de-confidentialite בשורת הכתובות
  useRewriteURL();

  return null;
};
```

## כיצד זה עובד

1. **ניטור נתיב**: ההוק מאזין לשינויים בשפת המשתמש (`locale`).
2. **זיהוי שכתוב**: הוא בודק את `window.location.pathname` הנוכחי מול כללי השכתוב בתצורה שלך.
3. **תיקון ה-URL**: אם נמצא כינוי מקומי יפה יותר עבור הנתיב הנוכחי, ההוק מפעיל את `window.history.replaceState` כדי לעדכן את שורת הכתובות תוך שמירה על המשתמש באותו דף פנימי.

## מדוע להשתמש בו ב-Next.js?

בעוד ש-`intlayerMiddleware` מטפל בשכתובים בצד השרת ובהפניות ראשוניות, ההוק `useRewriteURL` מבטיח שכתובת ה-URL בדפדפן תישאר עקבית עם מבנה ה-SEO המועדף עליך גם לאחר מעברים בצד הלקוח.

- **כתובות URL נקיות**: אוכף את השימוש במקטעים מתורגמים כמו `/fr/essais` במקום `/fr/tests`.
- **ביצועים**: מעדכן את שורת הכתובות מבלי להפעיל מחזור מלא של הנתב או למשוך נתונים מחדש.
- **התאמה ל-SEO**: מונע בעיות תוכן כפול (duplicate content) על ידי הבטחה שרק גרסת URL יחידה גלויה למשתמש ולסורקי מנועי החיפוש.
