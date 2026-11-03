---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: "תיקון שגיאת 'Unknown Command' ב-Intlayer"
description: "תיקון שגיאת 'unknown command' ב-CLI של Intlayer: בדוק את שם הפקודה, את גרסת ה-CLI ואת אופן הקריאה לקובץ הבינארי."
keywords:
  - unknown
  - לא ידוע
  - command
  - פקודה
  - error
  - שגיאה
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - restart
  - local
slugs:
  - frequent-questions
  - unknown-command
author: aymericzip
---

# שגיאה: unknown command fill / build / וכו'

אם `npx intlayer fill --verbose` מחזיר:

```
error: unknown command 'fill'
```

אך אתה בטוח שהפקודה `fill` _אמורה_ להתקיים, להלן השלבים לפתרון הבעיה:

## 1. **ודא שאתה משתמש בגרסה העדכנית ביותר**

הרץ:

```bash
npx intlayer --version                  # גרסת ה-intlayer המקומית הנוכחית
npx intlayer@latest --version           # גרסת ה-intlayer העדכנית ביותר
```

פעולה זו מאלצת את `npx` למשוך את הגרסה העדכנית ביותר. לאחר מכן נסה שוב:

```bash
npx intlayer@latest build --verbose
```

## 2. **בדוק האם הפקודה רשומה**

תוכל לבדוק זאת באמצעות:

```bash
npx intlayer --help                     # מספק מידע לגבי הפקודות הזמינות
```

בדוק האם הפקודה מופיעה ברשימת הפקודות.

היכנס למאגר (repo) וודא שהפקודה שלך מיוצאת ורשומה בנקודת הכניסה (entry point) של ה-CLI. Intlayer משתמש ב-`commander` כספריית תשתית.

קוד ה-CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **הפעל מחדש את הטרמינל**

לעתים נדרשת הפעלה מחדש של הטרמינל כדי לזהות פקודות חדשות.

## 5. **אם אתה מפתח את `intlayer`, בנה וקשר אותו מחדש**

אם אתה מפתח את `intlayer` באופן מקומי:

```bash
# בתיקיית intlayer
npm install
npm run build
npm link
```

לאחר מכן בטרמינל נפרד:

```bash
intlayer fill --verbose
```

פקודה זו תשתמש בגרסה המקומית שעליה אתה עובד.

## 6. **נקה את מטמון ה-npx (אם אתה תקוע עם גרסה ישנה)**

```bash
npx clear-npx-cache
```

או מחק ידנית חבילות intlayer שנשמרו במטמון:

```bash
rm -rf ~/.npm/_npx
```

בדוק את הפקודה המקבילה אם אתה משתמש ב-pnpm, yarn, bun או מנהל חבילות אחר.
