---
createdAt: 2025-12-30
updatedAt: 2026-11-03
priority: 5
title: "intlayer projects list: איתור פרויקטי Intlayer"
description: למד כיצד להציג את כל פרויקטי ה-Intlayer בספרייה או במאגר git.
keywords:
  - List
  - רשימה
  - Projects
  - פרויקטים
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: "הוספת אפשרות פלט נתיב מוחלט (absolute) לפקודת list projects"
author: aymericzip
---

# הצגת פרויקטי Intlayer (List Intlayer Projects)

```bash packageManager="npm"
npx intlayer projects list
```

```bash packageManager="yarn"
yarn intlayer projects list
```

```bash packageManager="pnpm"
pnpm intlayer projects list
```

```bash packageManager="bun"
bun x intlayer projects list
```

פקודה זו מחפשת ומציגה את כל פרויקטי ה-Intlayer על ידי איתור ספריות המכילות קובצי תצורה של Intlayer. היא שימושית לגילוי כל פרויקטי ה-Intlayer במונוריפו, סביבת עבודה (workspace) או מאגר git.

## כינויים (Aliases):

- `npx intlayer projects-list`
- `npx intlayer pl`

## ארגומנטים:

- **`--base-dir [path]`**: ציון ספריית הבסיס שממנה יתבצע החיפוש. ברירת המחדל היא ספריית העבודה הנוכחית.

  > דוגמה: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: חיפוש מספריית השורש של ה-git במקום מספריית הבסיס. זה שימושי למציאת כל פרויקטי ה-Intlayer במונוריפו או במאגר git.

  > דוגמה: `npx intlayer projects list --git-root`

- **`--json`**: פלט התוצאות בפורמט JSON במקום טקסט מעוצב. שימושי עבור סקריפטים וגישה תכנותית.

  > דוגמה: `npx intlayer projects list --json`

- **`--absolute`**: פלט התוצאות כנתיבים מוחלטים במקום נתיבים יחסיים.

  > דוגמה: `npx intlayer projects list --absolute`

## כיצד זה עובד:

הפקודה מחפשת קובצי תצורה של Intlayer בספרייה שצוינה (או בשורש ה-git אם נעשה שימוש ב-`--git-root`). היא מחפשת לפי תבניות קובצי התצורה הבאות:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

כל ספרייה המכילה את אחד הקבצים הללו נחשבת לפרויקט Intlayer ותוצג בפלט.

## דוגמאות:

### הצגת פרויקטים בספרייה הנוכחית:

```bash packageManager="npm"
npx intlayer projects list
```

```bash packageManager="yarn"
yarn intlayer projects list
```

```bash packageManager="pnpm"
pnpm intlayer projects list
```

```bash packageManager="bun"
bun x intlayer projects list
```

### הצגת פרויקטים בספרייה ספציפית:

```bash packageManager="npm"
npx intlayer projects list --base-dir ./packages
```

```bash packageManager="yarn"
yarn intlayer projects list --base-dir ./packages
```

```bash packageManager="pnpm"
pnpm intlayer projects list --base-dir ./packages
```

```bash packageManager="bun"
bun x intlayer projects list --base-dir ./packages
```

### הצגת כל הפרויקטים במאגר ה-git:

```bash packageManager="npm"
npx intlayer projects list --git-root
```

```bash packageManager="yarn"
yarn intlayer projects list --git-root
```

```bash packageManager="pnpm"
pnpm intlayer projects list --git-root
```

```bash packageManager="bun"
bun x intlayer projects list --git-root
```

### שימוש בכינוי מקוצר:

```bash packageManager="npm"
npx intlayer pl --git-root
```

```bash packageManager="yarn"
yarn intlayer pl --git-root
```

```bash packageManager="pnpm"
pnpm intlayer pl --git-root
```

```bash packageManager="bun"
bun x intlayer pl --git-root
```

### פלט כ-JSON:

```bash packageManager="npm"
npx intlayer projects list --json
```

```bash packageManager="yarn"
yarn intlayer projects list --json
```

```bash packageManager="pnpm"
pnpm intlayer projects list --json
```

```bash packageManager="bun"
bun x intlayer projects list --json
```

## דוגמה לפלט:

### פלט מעוצב:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### פלט JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## מקרי שימוש:

- **ניהול מונוריפו**: איתור כל פרויקטי ה-Intlayer במבנה מונוריפו
- **גילוי פרויקטים**: מציאת כל הפרויקטים שמופעל בהם Intlayer בסביבת עבודה
- **CI/CD**: אימות פרויקטי Intlayer בתהליכי עבודה אוטומטיים
- **תיעוד**: הפקת תיעוד המפרט את כל הפרויקטים המשתמשים ב-Intlayer

הפלט מספק נתיבים מוחלטים לכל ספריית פרויקט, מה שמקל על ניווט או כתיבת סקריפטים לפעולות על גבי פרויקטי Intlayer מרובים.
