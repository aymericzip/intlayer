---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד ההוק useRewriteURL | svelte-intlayer"
description: "השתמש ב-useRewriteURL ב-Svelte כדי לשכתב את כתובת ה-URL של הדפדפן לגרסה המותאמת לשפה, בהתאם לכללי שכתוב ה-URL המותאמים אישית של התצורה שלך."
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
author: aymericzip
---

# הוק useRewriteURL

ההוק `useRewriteURL` עבור Svelte מיועד לניהול שכתוב כתובות URL מותאמות לשפה בצד הלקוח. הוא מתקן אוטומטית את כתובת ה-URL בדפדפן לגרסה המקומית ה"יפה" (pretty URL) בהתבסס על השפה הנוכחית והתצורה ב-`intlayer.config.ts`.

הוא מעדכן את ה-URL בשקט באמצעות `window.history.replaceState`, ונמנע מניווטים מלאים ב-SvelteKit.

## שימוש

קרא להוק בתוך רכיב Svelte.

```svelte
<script>
  import { useRewriteURL } from "svelte-intlayer";

  // מתקן אוטומטית את /fr/tests ל-/fr/essais בשורת הכתובות אם קיים כלל שכתוב
  useRewriteURL();
</script>

<slot />
```

## כיצד זה עובד

1. **עדכונים תגובתיים (Reactive Updates)**: ההוק נרשם כמנוי לחנות ה-`locale` של Intlayer.
2. **זיהוי**: בכל פעם שהשפה משתנה (או בעת טעינת הרכיב), הוא מחשב האם ל-`window.location.pathname` הנוכחי יש כינוי מקומי יפה יותר שהוגדר בכללי השכתוב שלך.
3. **תיקון ה-URL**: אם נמצא נתיב יפה יותר, ההוק קורא ל-`window.history.replaceState` כדי לעדכן את שורת הכתובות ללא טעינה מחדש של הדף ומבלי להפעיל את לוגיקת הניווט של SvelteKit.

## מדוע להשתמש בו?

- **שיטות עבודה מומלצות ל-SEO**: מבטיח שמנועי חיפוש יאנדקסו רק את הגרסה היפה והמותאמת לשפה של כתובות ה-URL שלך.
- **חוויית משתמש משופרת**: מתקן כתובות URL שהוזנו ידנית כדי לשקף את מבנה השמות המועדף עליך.
- **עדכונים שקטים**: משנה את שורת הכתובות מבלי להשפיע על עץ הרכיבים או על היסטוריית הניווט.
