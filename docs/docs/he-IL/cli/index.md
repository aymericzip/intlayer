---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 8
title: "Intlayer CLI: כל הפקודות עבור אפליקציות רב-לשוניות"
description: גלה כיצד להשתמש ב-Intlayer CLI כדי לנהל את אתר האינטרנט הרב-לשוני שלך. עקוב אחר השלבים בתיעוד מקוון זה כדי להגדיר את הפרויקט שלך תוך מספר דקות.
keywords:
  - CLI
  - ממשק שורת פקודה
  - בינאום
  - תיעוד
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "הוספת פקודת upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "הוספת פקודת init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "החלפת פקודת `ci` בדגל `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "הוספת פקודת scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "הוספת פקודת standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "הוספת פקודת CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "הוספת פקודת רשימת פרויקטים (projects list)"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "הוספת פקודת extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "הוספת אפשרות skipIfExists לפקודת translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "הוספת כינויים (aliases) עבור ארגומנטים ופקודות CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "הוספת אפשרות build לפקודות"
  - version: 6.1.2
    date: 2025-09-26
    changes: "הוספת פקודת version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "הגדרת אפשרות verbose לברירת מחדל true בשימוש ב-CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "הוספת פקודת watch ואפשרות with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "הוספת פקודת editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "הוספת פקודות בדיקת תוכן ורשימת תוכן (content test ו-list)"
  - version: 5.5.11
    date: 2025-07-11
    changes: "עדכון תיעוד פרמטרי פקודות CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "אתחול היסטוריה"
author: aymericzip
---

# Intlayer CLI, כל פקודות Intlayer CLI עבור האתר הרב-לשוני שלך

## תוכן העניינים

<TOC/>

## התקנת החבילה

התקן את החבילות הנדרשות באמצעות npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> אם חבילת `intlayer` כבר מותקנת, ה-CLI מותקן אוטומטית. תוכל לדלג על שלב זה.

## חבילת intlayer-cli

חבילת `intlayer-cli` נועדה לבצע טרנספילציה (transpile) של [הצהרות ה-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md) שלך למילונים.

- [הצהרות Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

חבילה זו תבצע טרנספילציה לכל קובצי Intlayer, כגון `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [ראה כיצד להצהיר על קובצי הצהרת Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

כדי לפרש מילוני Intlayer תוכל להשתמש במפענחים, כגון [react-intlayer](https://www.npmjs.com/package/react-intlayer), או [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## תמיכה בקובצי תצורה

Intlayer תומך במספר פורמטים של קובצי תצורה:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

כדי לראות כיצד להגדיר שפות זמינות או פרמטרים נוספים, עיין ב[תיעוד התצורה כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה כאן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

## הרצת פקודות intlayer

### אימות (Authentication)

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/login.md)**, התחבר ל-Intlayer CMS וקבל הרשאות גישה

> `intlayer login` מנפיק **מפתח גישה** (`clientId` / `clientSecret`) שכל פקודה הדורשת הרשאות משתמשת בו. הסוד הוא אישור בצד השרת ולעולם אינו מגיע לבאנדל צד-הלקוח שלך. ראה [שמירה על בטיחות מפתח הגישה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/login.md#keeping-the-access-key-safe).

- [שמירה על בטיחות מפתח הגישה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/login.md#keeping-the-access-key-safe)

### פקודות ליבה

- [Build Dictionaries (בניית מילונים)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/build.md)
- [Watch Dictionaries (האזנה למילונים)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/watch.md)
- [Create Standalone Bundle (יצירת באנדל עצמאי)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/standalone.md)
- [Check CLI Version (בדיקת גרסת CLI)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/version.md)
- [List Projects (הצגת רשימת פרויקטים)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/list_projects.md)

### ניהול מילונים

- [Push Dictionaries (העלאת מילונים)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/push.md)
- [Pull Dictionaries (משיכת מילונים)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/pull.md)
- [Fill Dictionaries (השלמת מילונים)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [Test Missing Translations (בדיקת תרגומים חסרים)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/test.md)
- [List Content Declaration Files (הצגת קובצי הצהרת תוכן)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/list.md)

### ניהול רכיבים

- **[Extract Strings (חילוץ מחרוזות)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)**, חלץ מחרוזות מרכיבים לתוך קובץ .content סמוך לרכיב

### תצורה

- [Initialize Intlayer (אתחול Intlayer)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/init.md)
- [Set Up Infrastructure (הגדרת תשתית)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/infra.md)
- [Upgrade Intlayer Packages (שדרוג חבילות Intlayer)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/upgrade.md)
- [Manage Configuration (ניהול תצורה)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/configuration.md)

### ניהול תיעוד

- [Translate Document (תרגום מסמך)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/doc-translate.md)
- [Review Document (סקירת מסמך)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/doc-review.md)

### עורך וסנכרון בזמן אמת (Editor & Live Sync)

- [Editor Commands (פקודות עורך)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/editor.md)
- [Live Sync Commands (פקודות סנכרון חי)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/live.md)

### ביקורת ואבחון

- **[Scan Website (סריקת אתר)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/scan.md)**, מדידת גודל עמוד וביקורת תקינות i18n/SEO של כל כתובת URL ציבורית

### כלי פיתוח

- [CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/sdk.md)
- [Debug Intlayer Command (ניפוי שגיאות בפקודת Intlayer)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/debug.md)

## שימוש בפקודות intlayer ב-`package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **הערה**: ניתן גם להשתמש בכינויים (aliases) קצרים יותר:
>
> - `npx intlayer list` במקום `npx intlayer content list`
> - `npx intlayer test` במקום `npx intlayer content test`
> - `npx intlayer projects-list` או `npx intlayer pl` במקום `npx intlayer projects list`
