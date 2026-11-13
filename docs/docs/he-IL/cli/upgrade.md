---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
title: CLI, שדרוג חבילות Intlayer
description: למד כיצד להשתמש בפקודת upgrade של Intlayer CLI כדי להציג את כל חבילות Intlayer בפרויקט או במונוריפו שלך ולשדרג אותן לגרסה העדכנית ביותר.
keywords:
  - CLI
  - Upgrade
  - שדרוג
  - Update
  - עדכון
  - Packages
  - חבילות
  - Monorepo
  - מונוריפו
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "התקנה ורישום של תוספי lint / Prettier, רענון רשומות שרת ה-MCP"
  - version: 9.5.8
    date: 2026-09-23
    changes: "הוספת פקודת upgrade"
author: aymericzip
---

# שדרוג חבילות Intlayer (Upgrade Intlayer Packages)

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

הפקודה `upgrade` מציגה את חבילות Intlayer המוצהרות בכל `package.json` בפרויקט, כולל workspaces של monorepo, ומשדרגת אותן לגרסה האחרונה שפורסמה: אינטגרציות framework, `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`, `@intlayer/mcp` וכל שאר חבילות `@intlayer/*`. לאחר מכן היא מעדכנת את הכלים הקשורים.

## ארגומנטים:

- `--project-root [projectRoot]` - אופציונלי. ספריית השורש של הפרויקט. כברירת מחדל, הפקודה מתחילה מה-`package.json` הקרוב ביותר מעל ספריית העבודה הנוכחית.
- `--dry-run` - אופציונלי. מציגה את החבילות ואת גרסת היעד שלהן מבלי לשנות קבצים.
- `--tag <tag>` - אופציונלי. תגית ה-dist-tag של npm לשדרוג אליה (למשל `canary`). ברירת המחדל היא `latest`.
- `--no-eslint` - אופציונלי. לא מתקין ולא רושם את כללי ה-lint של Intlayer.
- `--no-prettier` - אופציונלי. לא מתקין ולא רושם את תוסף ה-Prettier של Intlayer.

## מה הפקודה עושה:

1. **מציגה את חבילות Intlayer** - סורקת כל `package.json` בפרויקט (מדלגת על `node_modules` ותוצרי בנייה) עבור תלויות ותלויות פיתוח מסוג `intlayer`, `@intlayer/*`, `*-intlayer` ו-`intlayer-*`.
2. **מאחזרת את גרסת היעד** - קוראת ממאגר npm את הגרסה של תגית ה-dist-tag שנבחרה (`latest` כברירת מחדל) עבור כל חבילה.
3. **משכתבת את טווחי הגרסאות** - מעדכנת כל טווח גרסאות מיושן ישירות בקובץ, תוך שמירה על האופרטור שלו (`^`, `~` או ללא) ועל ההזחה (indentation) של הקובץ.
4. **מתקינה בפעם אחת** - מריצה התקנה יחידה משורש סביבת העבודה (הספרייה הקרובה ביותר עם קובץ נעילה lockfile), באמצעות מנהל החבילות שמחזיק בקובץ הנעילה:

| קובץ נעילה                       | פקודה          |
| -------------------------------- | -------------- |
| `bun.lock` / `bun.lockb`         | `bun install`  |
| `pnpm-lock.yaml`                 | `pnpm install` |
| `yarn.lock`                      | `yarn install` |
| `package-lock.json` או ללא מנעול | `npm install`  |

אם אין קובץ נעילה, שדה `packageManager` ב-`package.json` (למשל `"bun@1.2.0"`) ייבדק לפני נסיגה ל-npm.

טווחים שאינם מצביעים על ה-registry, כגון `workspace:*`, `file:`, `link:`, `catalog:` או כתובות URL של git, לעולם אינם משתנים.

5. **תוספי lint ו-Prettier** - כשהפרויקט משתמש ב-ESLint / oxlint או ב-Prettier, מתקין את `eslint-plugin-intlayer` / `prettier-plugin-intlayer` אם הם חסרים ורושם אותם: `...intlayer.configs.recommended` ב-flat config של ESLint, הכללים ב-`.oxlintrc.json` והתוסף בהגדרות Prettier (JSON, YAML, JavaScript או TypeScript). הגדרה שלא ניתן לערוך בבטחה מקבלת במקום זאת קטע קוד להדבקה.
6. **שרת MCP** - מפנה את רשומות ה-MCP מסוג stdio של Intlayer בפרויקט (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`…) אל `@intlayer/mcp@<tag>`, כך ש-`npx` יפעיל את השרת המשודרג במקום עותק מהמטמון.

## דוגמאות:

### הצגת השדרוגים הזמינים ללא החלתם:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### שדרוג לגרסת canary:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## דוגמה לפלט:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## הערות:

- הרץ את הפקודה משורש המאגר שלך כדי לשדרג כל סביבת עבודה. הרץ אותה מתוך סביבת עבודה כדי לשדרג את אותה סביבה בלבד.
- חבילות שלא ניתן לאחזר את גרסתן (מצב לא מקוון, חבילה פרטית או שטרם פורסמה) יירשמו ויישארו ללא שינוי.
- אם ההתקנה נכשלת, טווחי הגרסאות המשודרגים נשמרים ב-`package.json`. הרץ את פקודת ההתקנה של מנהל החבילות שלך באופן ידני.
