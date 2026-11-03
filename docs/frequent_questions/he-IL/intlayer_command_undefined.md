---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: פקודת intlayer אינה מוגדרת (undefined)
description: "פתרון השגיאה 'intlayer: command not found': התקן את ה-CLI, הרץ אותו דרך מנהל החבילות שלך ובדוק את משתנה הסביבה PATH."
keywords:
  - intlayer
  - פקודה
  - command
  - undefined
  - שגיאה
  - vscode
  - הרחבה
  - פלאגין
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - intlayer-command-undefined
author: aymericzip
---

# פקודת intlayer אינה מוגדרת (undefined)

## סקירה כללית

ה-CLI של Intlayer מספק דרך נוחה לשלוט בתוכן ה-intlayer שלך, כולל בניית מילונים (dictionaries), דחיפת תרגומים ועוד. עם זאת, הוא אינו הכרחי כדי שהפרויקט שלך יפעל. אם אתה משתמש בתוסף הבנדלר (כמו `withIntlayer()` עבור Next.js או `intlayer()` עבור Vite), Intlayer יבנה באופן אוטומטי מילונים במהלך ה-build של האפליקציה או בעת הפעלת שרת הפיתוח. במצב פיתוח (development mode), הוא גם יאזין לשינויים ויבנה מחדש את קובצי הצהרת התוכן באופן אוטומטי.

ניתן לגשת לפקודות intlayer בדרכים שונות:

- שימוש ישיר בפקודת ה-cli‏ `intlayer`
- שימוש ב-[הרחבת VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)
- שימוש ב-SDK‏ `@intlayer/cli`

## הבעיה

בעת ניסיון להשתמש בפקודה `intlayer`, ייתכן שתיתקל בשגיאה הבאה:

```bash
'intlayer' is not recognized as an internal or external command,
operable program or batch file.
```

## פתרונות

נסה את הפתרונות הבאים לפי הסדר:

1. **ודא שהפקודה מותקנת**

```bash
npx intlayer -h
```

פלט צפוי:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            output the version number
    -h, --help               display help for command

Commands:
    dictionary|dictionaries  Dictionaries operations
    configuration|config     Configuration operations
    help [command]           display help for command
```

2. **התקן את החבילה intlayer-cli באופן גלובלי**

```bash
npm install intlayer-cli -g
```

> פעולה זו אינה אמורה להיות נחוצה אם כבר התקנת את החבילה `intlayer`.

3. **התקן את החבילה באופן גלובלי**

```bash
npm install intlayer -g
```

4. **הפעל מחדש את הטרמינל**
   לעתים נדרשת הפעלה מחדש של הטרמינל כדי לזהות פקודות חדשות.

5. **ניקוי והתקנה מחדש**
   אם הפתרונות שלעיל לא פתרו את הבעיה:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **אימות קובצי ההתקנה**
   אם הבעיה נמשכת, ודא שהקבצים הבאים קיימים:
   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (אמור להכיל שדה `bin` המפנה ל-`./dist/cjs/cli.cjs`)

7. **בדוק את משתנה הסביבה PATH**
   ודא שספריית ה-bin הגלובלית של npm נמצאת ב-PATH שלך:

```bash
# עבור מערכות מבוססות Unix (macOS/Linux)
echo $PATH
# אמור לכלול נתיב כגון /usr/local/bin או ~/.npm-global/bin

# עבור Windows
echo %PATH%
# אמור לכלול את ספריית ה-bin הגלובלית של npm
```

8. **השתמש ב-npx עם נתיב מלא**
   אם הפקודה עדיין לא נמצאה, נסה להשתמש ב-npx עם הנתיב המלא:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **בדוק האם קיימות התקנות מתנגשות**

```bash
# הצג את כל החבילות המותקנות גלובלית
npm list -g --depth=0

# הסר התקנות גלובליות שעלולות להתנגש
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# לאחר מכן התקן מחדש
npm install -g intlayer
```

10. **אמת את גרסאות Node.js ו-npm**
    ודא שאתה משתמש בגרסאות תואמות:

```bash
node --version
npm --version
```

    אם אתה משתמש בגרסה ישנה, שקול לעדכן את Node.js ואת npm.

11. **בדוק בעיות הרשאות**
אם אתה מקבל שגיאות הרשאה (permission errors):

    ```bash
    # עבור מערכות מבוססות Unix
    sudo npm install -g intlayer

    # או שנה את ספריית ברירת המחדל של npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # הוסף לקובץ ה-~/.profile או ~/.bashrc שלך:
    export PATH=~/.npm-global/bin:$PATH
    ```
