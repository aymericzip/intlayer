---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 5
title: "תיעוד ההוק useRewriteURL | solid-intlayer"
description: "השתמש ב-useRewriteURL ב-SolidJS כדי לשכתב את כתובת ה-URL של הדפדפן לגרסה המותאמת לשפה, בהתאם לשכתובים המותאמים אישית של התצורה שלך."
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - בינאום
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
author: aymericzip
---

# הוק useRewriteURL

ההוק `useRewriteURL` עבור SolidJS מיועד לניהול שכתוב כתובות URL מותאמות לשפה בצד הלקוח. הוא מתקן אוטומטית את כתובת ה-URL בדפדפן לגרסה המקומית ה"יפה" (pretty URL) בהתבסס על השפה הנוכחית והתצורה ב-`intlayer.config.ts`.

באמצעות שימוש ב-`window.history.replaceState`, הוא נמנע מניווטים מיותרים ב-Solid Router.

## שימוש

קרא להוק בתוך רכיב המהווה חלק מהיישום שלך.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // מתקן אוטומטית את /fr/tests ל-/fr/essais בשורת הכתובות אם קיים כלל שכתוב
  useRewriteURL();

  return <>{props.children}</>;
};
```

## כיצד זה עובד

1. **זיהוי**: ההוק משתמש ב-`createEffect` כדי לעקוב אחר שינויים ב-`locale()` התגובתי.
2. **התאמה**: הוא מזהה האם ה-`window.location.pathname` הנוכחי תואם לנתיב קנוני (canonical route) שיש לו כינוי מקומי יפה יותר עבור השפה הנוכחית.
3. **תיקון ה-URL**: אם נמצא כינוי יפה יותר, ההוק קורא ל-`window.history.replaceState` כדי לעדכן את שורת הכתובות מבלי להשפיע על מצב הניווט הפנימי או לגרום לרינדור מחדש של רכיבים.

## מדוע להשתמש בו?

- **כתובות URL רשמיות**: אוכף כתובת URL יחידה עבור כל גרסה מותאמת שפה של התוכן שלך, דבר הקריטי ל-SEO.
- **נוחות למפתחים**: מאפשר לך לשמור על הגדרות הנתיבים הפנימיים שלך כקנוניים תוך חשיפת נתיבים ידידותיים למשתמש ומותאמים מקומית לעולם החיצון.
- **עקביות**: מתקן כתובות URL כאשר משתמשים מקלידים ידנית נתיב שאינו עוקב אחר כללי ההתאמה הלשונית המועדפים עליך.
