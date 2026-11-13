---
createdAt: 2025-12-30
updatedAt: 2026-11-13
priority: 5
title: "intlayer init: הגדרת Intlayer בפרויקט שלך"
description: "הרץ את intlayer init כדי להוסיף את Intlayer לפרויקט קיים: הפקודה מזהה את הפריימוורק שלך, מתקינה חבילות וכותבת את קובצי התצורה."
keywords:
  - Initialize
  - אתחול
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "init רושם גם את תוספי ה-lint / Prettier; נוסף init ai; קובצי .content מתעלמים מהם בנתיבי TanStack"
  - version: 9.5.13
    date: 2026-09-29
    changes: "init מתקין כעת רק את החבילות ומגדיר את הפריימוורק, הוספת תת-פקודה ייעודית לכל שלב הגדרה, --interactive נכשל ללא טרמינל"
  - version: 9.5.6
    date: 2026-09-21
    changes: "הוספת תת-פקודת init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "הוספת אפשרות --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
author: aymericzip
---

# אתחול Intlayer (Initialize Intlayer)

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

הפקודה `init` מתקינה את חבילות Intlayer ומגדירה את הפריימוורק שלך (קובץ תצורה, TypeScript, תוסף לבאנדלר, middleware/proxy, ספקים). זוהי הדרך המומלצת להתחיל לעבוד עם Intlayer.

כל השאר (תהליכי עבודה של CI, מיומנויות AI, שרת MCP, כלי עורך, חוקי lint, CMS, תשתית) הוא לבחירתך: בחר בו מרשימת המשימות של `--interactive`, או הרץ את [תת-הפקודה הייעודית שלו](#הגדרה-שלב-אחר-שלב).

## כינויים (Aliases):

- `npx intlayer init`

## ארגומנטים:

- `--project-root [projectRoot]` - אופציונלי. ציון ספריית השורש של הפרויקט. אם לא סופק, הפקודה תחפש את שורש הפרויקט החל מספריית העבודה הנוכחית.
- `--no-gitignore` - אופציונלי. דילוג על העדכון האוטומטי של קובץ `.gitignore`. אם דגל זה מוגדר, `.intlayer` לא יתווסף ל-`.gitignore`.
- `--no-framework-setup` - אופציונלי. התקנת החבילות בלבד, מבלי לגעת בקובצי הפרויקט.
- `--no-eslint` - אופציונלי. לא מפעיל את כללי ה-lint של Intlayer.
- `--no-prettier` - אופציונלי. לא מוסיף את תוסף ה-Prettier של Intlayer.
- `--routing <routing>` - אופציונלי. ניתוב שפות: `prefix-no-default` (ברירת מחדל), `prefix-all`, `no-prefix`, `search-params` או `none`.
- `--content <layout>` - אופציונלי. כיצד מוגדר התוכן:
  - `multilingual` - `{fileName}.content.{ts,json}` לצד הרכיב, כל השפות בקובץ אחד (מגדיר את `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` לצד הרכיב (מגדיר את `compiler.output` ואת `dictionary.locale`).
  - `centralized` - קטלוג `/locales/{locale}.{json,po}` יחיד לכל שפה (מוסיף את התוסף `syncJSON` / `syncPO`).
  - `namespaces` - קטלוגי `/locales/{locale}/{namespace}.{json,po}` (מוסיף את התוסף `syncJSON` / `syncPO`).
- `--content-format <format>` - אופציונלי, עם `--content`. `ts` או `json` עבור `multilingual` / `per-locale`, `json` או `po` עבור `centralized` / `namespaces`. ברירת המחדל היא הראשון מביניהם.
- `--message-format <format>` - אופציונלי, עם `--content centralized` או `namespaces` ב-JSON. תחביר ההודעות של הקטלוגים: `icu` (ברירת מחדל), `i18next`, `vue-i18n` או `intlayer`.
- `-i, --interactive` - אופציונלי. בחירת שלבי ההגדרה מתוך רשימת תיוג (חבילות, CI, מיומנויות, MCP, VS Code, LSP, lint, CMS, תשתית, …) במקום הרצת ערכת ברירת המחדל. דורש טרמינל: ללא טרמינל (סוכן AI, CI), הפקודה תיכשל ותפרט את תת-הפקודות שיש להריץ במקום זאת.
- `--no-github-actions` - אופציונלי. עם `--interactive`, לעולם לא ייווצרו תבניות עבודה של GitHub Actions, גם אם נבחרו.

## מה הפקודה עושה:

הפקודה `init` מבצעת את משימות ההגדרה הבאות:

1. **אימות מבנה הפרויקט** - מוודאת שאתה נמצא בספריית פרויקט תקינה עם קובץ `package.json`.
2. **התקנת החבילות** - מתקינה את חבילות Intlayer החסרות עבור הסטאק שלך (למשל `react-intlayer`, `vite-intlayer`) ומשדרגת חבילות ישנות.
3. **עדכון `.gitignore`** - מוסיפה את `.intlayer` לקובץ ה-`.gitignore` שלך כדי להחריג קבצים שנוצרו מבקרת גרסאות (ניתן לדלג באמצעות `--no-gitignore`).
4. **הגדרת TypeScript** - מעדכנת את כל קובצי ה-`tsconfig.json` כדי לכלול הגדרות טיפוסים של Intlayer (`.intlayer/**/*.ts`).
5. **יצירת קובץ תצורה** - מייצרת `intlayer.config.ts` (עבור פרויקטי TypeScript) או `intlayer.config.mjs` (עבור פרויקטי JavaScript) עם הגדרות ברירת מחדל.
6. **עדכון תצורת הבאנדלר / הפריימוורק** - מוסיפה את תוסף Intlayer לתצורת Vite, Next.js, Nuxt, Astro ועוד, ומקימה את ה-middleware/proxy והספקים כאשר הפריימוורק תומך בכך. ב-TanStack Start / Router, מגדיר `routeFileIgnorePattern` כדי שקובצי `.content` בתוך `routes/` לא ייחשבו כנתיבים.
7. **תוספי lint ועיצוב** - כשהפרויקט משתמש ב-ESLint / oxlint או ב-Prettier, מתקין את `eslint-plugin-intlayer` / `prettier-plugin-intlayer` ורושם אותם ב-flat config של ESLint, ב-`.oxlintrc.json` ובהגדרות Prettier. הגדרה שלא ניתן לערוך בבטחה מקבלת במקום זאת קטע קוד להדבקה.

## הגדרה שלב אחר שלב

לכל שלב ברשימת המשימות של `--interactive` יש תת-פקודה משלו. הן לעולם אינן מציגות שאלות בטרמינל כאשר הערכים מועברים כדגלים, ולכן בטוח להריץ אותן מתוך סוכן AI או משימת CI.

| פקודה                                                                 | מה היא מגדירה                                                                    |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | מתקינה את חבילות Intlayer החסרות ומשדרגת חבילות ישנות                            |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | קובץ תצורה, TypeScript, תוסף באנדלר, middleware/proxy, ספקים ו-`.gitignore`      |
| `intlayer init github-actions`                                        | תהליכי העבודה של GitHub Actions עבור `fill` ו-`test`                             |
| `intlayer init vscode-extension`                                      | ממליצה על הרחבת Intlayer ב-`.vscode/extensions.json`                             |
| `intlayer init lsp`                                                   | שרת שפת Intlayer (LSP) ב-`.vscode/settings.json`                                 |
| `intlayer init ai [--provider <provider>] [--model <model>]`          | מתקין את ה-SDK של ספק ה-AI, מציג את המודלים שלו ושומר את מפתח ה-API בקובץ `.env` |
| `intlayer init eslint`                                                | כללי ה-lint של Intlayer (ESLint / oxlint), כאשר הפרויקט כבר משתמש ב-linter       |
| `intlayer init prettier`                                              | תוסף ה-Prettier של Intlayer, כשהפרויקט כבר מעוצב עם Prettier                     |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | תיעוד Intlayer כמיומנויות סוכן AI (skills)                                       |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | שרת ה-MCP של Intlayer                                                            |
| `intlayer init extension [--browser <chrome/firefox>]`                | פותחת את עמוד החנות של תוסף הדפדפן של Intlayer                                   |
| `intlayer init cms`                                                   | מתחברת ל-Intlayer CMS דרך הדפדפן שלך ושומרת את האישורים ב-`.env`                 |
| `intlayer init infra --mode <desktop/docker/compose>`                 | אפליקציית שולחן העבודה או סטאק באירוח עצמי                                       |

### מתוך סוכן AI או משימת CI

למעטפת של סוכן AI אין טרמינל אינטראקטיבי, ולכן לא ניתן לענות על שאלות. השתמש בפקודת ברירת המחדל, ולאחר מכן בתת-הפקודות הדרושות לך:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

ללא טרמינל:

- `init skills` מתקינה את המיומנויות התואמות לסטאק שלך אלא אם כן `--skills` מוגדר (למשל `--skills Usage Content React`).
- `init skills` ו-`init mcp` משתמשות בפלטפורמת ה-AI שזוהתה (Claude Code, Cursor, VS Code, Windsurf, …) אלא אם כן `--platform` מוגדר, ונכשלות עם רשימת הפלטפורמות כאשר אף אחת לא זוהתה.
- `init mcp` משתמשת בתעבורת `stdio` אלא אם כן `--transport` מוגדר.
- `init infra` דורשת את `--mode`, ו-`init extension` מדפיסה רק את הקישורים לחנות אלא אם כן `--browser` מוגדר.

שרת ה-MCP מוגדר תמיד בתוך הפרויקט (עבור Claude Code, ב-`.mcp.json`).

## דוגמאות:

### אתחול בסיסי:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

פקודה זו תאתחל את Intlayer בספרייה הנוכחית, תוך זיהוי אוטומטי של שורש הפרויקט.

### אתחול עם שורש פרויקט מותאם אישית:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

פקודה זו תאתחל את Intlayer בספרייה שצוינה.

### אתחול ללא עדכון .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

פעולה זו תגדיר את כל קובצי התצורה אך לא תשנה את ה-`.gitignore` שלך.

### הגדרת התשתית (אפליקציית שולחן עבודה או אירוח עצמי):

```bash
npx intlayer init infra
```

מורידה ומריצה את תוכנית ההתקנה המקוונת (`https://intlayer.org/install.sh`, או `install.ps1` ב-Windows), ששואלת כיצד תרצה להריץ את Intlayer:

- **Desktop app (אפליקציית שולחן עבודה)**: מתקינה את לוח הבקרה המקורי במחשב שלך, מחובר ל-Intlayer Cloud.
- **All-in-one Docker**: לוח בקרה + API + MongoDB + Redis + MinIO בקונטיינר יחיד.
- **Docker Compose**: קונטיינר אחד לכל שירות, לאירוח עצמי הניתן להרחבה.

דלג על התפריט באמצעות `--mode`:

```bash
npx intlayer init infra --mode compose
```

אותו שלב מוצע על ידי `npx intlayer init --interactive`. עיין ב[מדריך `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/infra.md) עבור הגדרות תוכנית ההתקנה, וב[מדריך האירוח העצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md) עבור מה שכל מצב מגדיר.

- [מדריך `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/infra.md)
- [מדריך אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

## דוגמה לפלט:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## הערות:

- הפקודה היא אידמפוטנטית (idempotent), ניתן להריץ אותה מספר פעמים בבטחה. היא תדלג על שלבים שכבר הוגדרו.
- אם קובץ תצורה כבר קיים, הוא לא יידרס.
- קובצי תצורת TypeScript ללא מערך `include` (למשל, תצורות בסגנון פתרון עם הפניות) מדולגים.
- הפקודה תסתיים עם שגיאה אם לא יימצא `package.json` בשורש הפרויקט.
