---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: אני מקבל שגיאה הקשורה לתת-חבילות של @intlayer/*
description: "תיקון שגיאות הנובעות מחוסר התאמה בין גרסאות של תת-חבילות @intlayer/*: סנכרון כל חבילות Intlayer לאותה גרסה וניקוי מטמון ה-lockfile."
keywords:
  - "@intlayer/*"
  - תת-חבילות
  - sub-packages
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
author: aymericzip
---

# אני מקבל שגיאה הקשורה לתת-חבילות של `@intlayer/*`

בעיה זו מתרחשת בדרך כלל לאחר עדכון של חבילות Intlayer.

דוגמה להודעת שגיאה:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## הסיבה

חבילות בסיס כגון `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` עושות שימוש חוזר באותן תת-חבילות כגון `@intlayer/config`, `@intlayer/core`, `@intlayer/types` כדי למנוע כפילות קוד.

בין גרסאות שונות, לא מובטח שהייצואים (exports) של תת-החבילות יישארו זהים. כדי להגביל בעיה זו, intlayer נועלת (pins) את גרסת תת-החבילות לגרסת החבילה הראשית.

> לדוגמה: `intlayer@1.0.0` משתמשת ב-`@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (למעט `@intlayer/swc`), תת-החבילות של `@intlayer/*` אינן מיועדות לשימוש ישיר. לכן אנו ממליצים שלא להתקין אותן ישירות.

## פתרון

1. ודא שגרסאות החבילה הראשית ותת-החבילות זהות.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // גרסה שגויה, היא צריכה להיות 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. נסה למחוק את ה-lockfile ואת תיקיית node_modules ולהתקין מחדש את התלויות.

לעתים מנהל החבילות שומר ב-lockfile גרסה ישנה של תת-החבילות במטמון (cache). כדי לתקן זאת, תוכל לנסות למחוק את ה-lockfile ואת תיקיית node_modules ולהתקין מחדש את התלויות.

```bash
rm -rf package-lock.json node_modules

npm install # או yarn install או pnpm install או bun pm install
```

3. בדוק גרסאות תלויות מקומיות

ייתכן שמנהל החבילות שלך שומר במטמון גרסה ישנה של תת-החבילות ב-lockfile.

לדוגמה: `intlayer@7.0.0` > `@intlayer/config@7.0.0` > `@intlayer/dictionary-entry@6.0.0`.

כדי לזהות אי-התאמה בין גרסאות התלויות המקומיות לבין גרסאות תת-החבילות, תוכל להשתמש בפקודה הבאה:

```bash
npm list --depth=3 | grep intlayer
```

```bash
yarn list --depth=3 | grep intlayer
```

```bash
pnpm list --depth=3 | grep intlayer
```

```bash
bun pm ls --depth=3 | grep intlayer
```

> ב-Windows, החלף את `| grep intlayer` ב-`| findstr intlayer` או השתמש ב-PowerShell עם `Select-String -Pattern "intlayer"`.

4. בדוק התקנה גלובלית

אנו ממליצים להתקין את `intlayer` או `intlayer-cli` באופן גלובלי כדי לגשת לפקודות ה-CLI. אם הגרסה הגלובלית שונה מהגרסה המקומית, מנהל החבילות עלול להתחשב בגרסה הלא נכונה.

**בדוק אם החבילה מותקנת גלובלית**

```bash
npm list -g --depth=3 | grep intlayer
```

```bash
yarn global list --depth=3 | grep intlayer
```

```bash
pnpm list -g --depth=3 | grep intlayer
```

```bash
bun pm ls -g --depth=3 | grep intlayer
```

> ב-Windows, החלף את `| grep intlayer` ב-`| findstr intlayer` או השתמש ב-PowerShell עם `Select-String -Pattern "intlayer"`.

**תקן התנגשויות תלויות גלובליות פוטנציאליות**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

```bash
bun pm rm -g intlayer intlayer-cli
```

5. נסה לנקות את המטמון (Cache)

בסביבות מסוימות כגון Docker, GitHub Actions, או פלטפורמות אחסון אתרים כמו Vercel, ייתכן שקיים מטמון. תוכל לנסות לנקות את המטמון ולנסות שוב את ההתקנה.

תוכל גם לנסות לנקות את המטמון של מנהל החבילות שלך באמצעות הפקודה המתאימה:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```

```bash
bun pm cache clean
```

6. נסה למחוק את תיקיית `.intlayer`

Intlayer שומרת במטמון גרסה ארוזה (bundled) של עצמה בתיקיית `.intlayer/cache`.

מטמון זה עלול להיפגם אם גרסת ה-intlayer הנוכחית אינה תואמת לגרסה שנשמרה במטמון.

תוכל לנסות למחוק את תיקיית `.intlayer` ולהריץ מחדש את ה-build.

```bash
rm -rf .intlayer
```
