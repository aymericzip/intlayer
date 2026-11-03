---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: הצגת קובצי הצהרת תוכן
description: "הצג את כל קובצי הצהרת התוכן בפרויקט שלך באמצעות Intlayer CLI, כדי לבצע ביקורת על המקומות שבהם המילונים שלך מוצהרים."
keywords:
  - List
  - רשימה
  - Content Declaration
  - הצהרת תוכן
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: "הוספת אפשרות פלט נתיב מוחלט (absolute) לפקודת list"
  - version: 7.5.11
    date: 2026-01-06
    changes: "הוספת אפשרות פלט JSON לפקודת list"
author: aymericzip
---

# הצגת קובצי הצהרת תוכן (List content declaration files)

```bash packageManager="npm"
npx intlayer content list
```

```bash packageManager="yarn"
yarn intlayer content list
```

```bash packageManager="pnpm"
pnpm intlayer content list
```

```bash packageManager="bun"
bun x intlayer content list
```

## כינויים (Aliases):

- `npx intlayer list`

פקודה זו מציגה את כל קובצי הצהרת התוכן בפרויקט שלך, כולל מפתחות המילון שלהם ונתיבי הקבצים. היא שימושית לקבלת סקירה כללית של כל קובצי התוכן שלך ואימות שהם מתגלים כראוי על ידי Intlayer.

## ארגומנטים:

- **`--json`**: פלט התוצאות בפורמט JSON במקום טקסט מעוצב. שימושי עבור סקריפטים וגישה תכנותית.

  > דוגמה: `npx intlayer content list --json`

## דוגמאות:

### הצגת קובצי הצהרת תוכן:

```bash packageManager="npm"
npx intlayer content list
```

```bash packageManager="yarn"
yarn intlayer content list
```

```bash packageManager="pnpm"
pnpm intlayer content list
```

```bash packageManager="bun"
bun x intlayer content list
```

### פלט בפורמט JSON:

```bash packageManager="npm"
npx intlayer content list --json
```

```bash packageManager="yarn"
yarn intlayer content list --json
```

```bash packageManager="pnpm"
pnpm intlayer content list --json
```

```bash packageManager="bun"
bun x intlayer content list --json
```

### פלט כנתיבים מוחלטים:

```bash packageManager="npm"
npx intlayer content list --absolute
```

```bash packageManager="yarn"
yarn intlayer content list --absolute
```

```bash packageManager="pnpm"
pnpm intlayer content list --absolute
```

```bash packageManager="bun"
bun x intlayer content list --absolute
```

## דוגמה לפלט:

### פלט מעוצב:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total content declaration files: 3
```

### פלט JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

פקודה זו תפלוט:

- רשימה מעוצבת של כל קובצי הצהרת התוכן עם המפתחות ונתיבי הקבצים היחסיים שלהם
- המספר הכולל של קובצי הצהרת תוכן שנמצאו

הפלט מסייע לך לוודא שכל קובצי התוכן שלך מוגדרים כראוי וניתנים לגילוי על ידי מערכת Intlayer.
