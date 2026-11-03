---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: כיצד לבנות מילונים?
description: "מתי Intlayer בונה מילונים באופן אוטומטי, כיצד להפעיל בנייה ידנית באמצעות ה-CLI, והיכן נשמרים הקבצים שנוצרו."
keywords:
  - build
  - בנייה
  - dictionaries
  - מילונים
  - intlayer
  - פקודה
  - watch
  - vscode
  - plugin
  - תוסף
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
author: aymericzip
---

# בניית מילונים (Build Dictionaries)

## כיצד לבנות מילונים

Intlayer מספקת כלי שורת פקודה לבניית מילונים.

```bash
npx intlayer dictionaries build
```

פקודה זו:

- סורקת את כל קובצי הצהרת התוכן (`.content.{ts,tsx,js,mjs,cjs,json,...}`) בפרויקט שלך.
- מייצרת מילונים ושומרת אותם בתיקיית `.intlayer/dictionary`.

### מצב מעקב (Watch Mode)

אם ברצונך לעדכן מילונים באופן אוטומטי בעת ביצוע שינויים בקובצי הצהרת תוכן, הרץ את הפקודה הבאה:

```bash
npx intlayer dictionaries build --watch
```

במצב זה, Intlayer תסרוק ותבנה מילונים בכל פעם שמתבצעים שינויים בקובצי הצהרת תוכן, ותעדכן אוטומטית את תיקיית `.intlayer/dictionary`.

### שימוש בתוסף ל-VSCode

תוכל גם להשתמש ב[תוסף VSCode של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md) כדי לשפר את חוויית העבודה עם Intlayer ב-VSCode.

### שימוש בתוסף עבור ה-Framework של האפליקציה שלך

אם אתה משתמש ב-framework כגון Next.js (Webpack / Turbopack), Vite, או React Native, Lynx וכו', Intlayer מספקת תוסף שבאמצעותו ניתן לשלב את Intlayer באפליקציה שלך.

Intlayer תבנה את המילונים לפני תהליך ה-build של האפליקציה שלך.
באותו אופן, במצב פיתוח (development mode), Intlayer תעקוב אחר שינויים בקובצי הצהרת התוכן ותבנה מחדש את המילונים באופן אוטומטי.

לכן, עיין בתיעוד הספציפי של ה-framework שלך כדי ללמוד כיצד לשלב את התוסף.
