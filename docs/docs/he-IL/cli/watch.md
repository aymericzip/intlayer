---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer watch: בנייה מחדש של מילונים בעת שינוי"
description: למד כיצד להאזין לשינויים בקובצי הצהרת התוכן שלך ולבנות מילונים באופן אוטומטי.
keywords:
  - Watch
  - האזנה
  - Dictionaries
  - מילונים
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# האזנה למילונים (Watch Dictionaries)

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

פקודה זו תאזין לשינויים בקובצי הצהרת התוכן שלך ותבנה את המילונים בתוך תיקיית `.intlayer`.
פקודה זו שוות ערך ל-`npx intlayer build --watch --skip-prepare`.

## כינויים (Aliases):

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## ארגומנטים:

- **`--with`**: הפעלת פקודה במקביל להאזנה.

  > דוגמה: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer watch --ci`
