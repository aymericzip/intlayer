---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer live: סנכרון תוכן CMS בזמן ריצה"
description: "השתמש ב-Intlayer Live Sync כדי להעביר שינויי תוכן שבוצעו ב-CMS ישירות לאפליקציה הרצה שלך ללא צורך בבנייה מחדש או פריסה מחדש."
keywords:
  - Live Sync
  - סנכרון חי
  - CMS
  - Runtime
  - זמן ריצה
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
author: aymericzip
---

# פקודות סנכרון חי (Live Sync commands)

סנכרון חי (Live Sync) מאפשר לאפליקציה שלך לשקף שינויי תוכן מה-CMS בזמן ריצה. אין צורך בבנייה מחדש (rebuild) או פריסה מחדש (redeploy). כאשר התכונה מופעלת, העדכונים מוזרמים לשרת Live Sync שמרענן את המילונים שהאפליקציה שלך קוראת. ראה [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) לפרטים נוספים.

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## ארגומנטים:

**אפשרויות תצורה:**

- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט. כדי לאחזר את תצורת Intlayer, הפקודה תחפש את הקובץ `intlayer.config.{ts,js,json,cjs,mjs}` בספריית הבסיס.

- **`--no-cache`**: השבתת המטמון (cache).

  > דוגמה: `npx intlayer dictionary push --env-file .env.production.local`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer live --ci`

**אפשרויות רישום (Log):**

- **`--verbose`**: הפעלת לוגים מפורטים לניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).
