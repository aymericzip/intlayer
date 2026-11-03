---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד ההוק useRewriteURL | react-intlayer"
description: "השתמש ב-useRewriteURL ב-React כדי לשכתב את כתובת ה-URL של הדפדפן לגרסה המותאמת לשפה, בהתאם לכללי שכתוב ה-URL המותאמים אישית של התצורה שלך."
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
author: aymericzip
---

# הוק useRewriteURL

ההוק `useRewriteURL` מיועד לניהול שכתוב כתובות URL מותאמות לשפה בצד הלקוח. הוא מזהה אוטומטית אם יש לתקן את ה-URL הנוכחי לגרסה מקומית "יפה" (pretty URL) בהתבסס על שפת המשתמש וכללי השכתוב שהוגדרו ב-`intlayer.config.ts`.

בשונה מניווט רגיל, הוק זה משתמש ב-`window.history.replaceState` כדי לעדכן את ה-URL בשורת הכתובות מבלי לגרום לטעינה מחדש של הדף ומבלי להפעיל מחזור ניווט של הנתב.

## שימוש

פשוט קרא להוק ברכיב צד-לקוח.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // מתקן אוטומטית את /fr/tests ל-/fr/essais בשורת הכתובות אם קיים כלל שכתוב
  useRewriteURL();

  return <div>My Component</div>;
};
```

## כיצד זה עובד

1. **זיהוי**: ההוק עוקב אחר `window.location.pathname` הנוכחי ושפת המשתמש (`locale`).
2. **התאמה**: הוא משתמש במנוע הפנימי של Intlayer כדי לבדוק אם הנתיב הנוכחי תואם לנתיב קנוני (canonical route) שיש לו כינוי מקומי יפה יותר עבור השפה הנוכחית.
3. **תיקון ה-URL**: אם נמצא כינוי מתאים יותר (והוא שונה מהנתיב הנוכחי), ההוק קורא ל-`window.history.replaceState` כדי לעדכן את כתובת ה-URL בדפדפן תוך שמירה על אותו תוכן קנוני ומצב קיים.

## מדוע להשתמש בו?

- **קידום אתרים (SEO)**: מבטיח שמשתמשים תמיד יגיעו לכתובת ה-URL הרשמית והיפה עבור שפה נתונה.
- **עקביות**: מונע חוסר עקביות שבו משתמש עלול להקליד ידנית נתיב קנוני (כמו `/fr/privacy-notice`) במקום הגרסה המתורגמת (`/fr/politique-de-confidentialite`).
- **ביצועים**: מעדכן את שורת הכתובות מבלי לגרום לתופעות לוואי בלתי רצויות של הנתב או לרינדור מחדש (re-mount) של הרכיב.
