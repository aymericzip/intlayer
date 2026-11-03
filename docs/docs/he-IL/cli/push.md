---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer push: העלאת מילונים ל-CMS"
description: "העלה את מילוני ה-Intlayer המקומיים שלך לעורך הוויזואלי ול-CMS כדי שמתרגמים ומנהלי תוכן יוכלו לערוך אותם."
keywords:
  - Push
  - העלאה
  - Dictionaries
  - מילונים
  - CLI
  - Intlayer
  - Editor
  - עורך
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
author: aymericzip
---

# העלאת מילונים (Push Dictionaries)

```bash packageManager="npm"
npx intlayer dictionary push
```

```bash packageManager="yarn"
yarn intlayer dictionary push
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push
```

```bash packageManager="bun"
bun x intlayer dictionary push
```

אם [עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) מותקן, תוכל גם להעלות מילונים לעורך. פקודה זו תאפשר להפוך את המילונים לזמינים ב[עורך](https://app.intlayer.org/). בדרך זו תוכל לשתף את המילונים שלך עם הצוות שלך ולערוך את התוכן ללא צורך בעריכת קוד האפליקציה.

- [עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

## כינויים (Aliases):

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## ארגומנטים:

**אפשרויות מילון:**

- **`-d`, `--dictionaries`**: מזהי המילונים להעלאה. אם לא צוין, כל המילונים יועלו.

  > דוגמה: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: מזהי המילונים להעלאה (כינוי עבור --dictionaries).

  > דוגמה: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**אפשרויות תצורה:**

- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט. כדי לאחזר את תצורת Intlayer, הפקודה תחפש את הקובץ `intlayer.config.{ts,js,json,cjs,mjs}` בספריית הבסיס.

  > דוגמה: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: השבתת המטמון.

  > דוגמה: `npx intlayer build --no-cache`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer push --ci`

**אפשרויות משתני סביבה:**

- **`--env`**: ציון הסביבה (למשל, `development`, `production`). שימושי במקרה שבו אתה משתמש במשתני סביבה בקובץ תצורת ה-Intlayer שלך.
- **`--env-file`**: קובץ סביבה מותאם אישית לטעינת משתנים ממנו. שימושי במקרה שבו אתה משתמש במשתני סביבה בקובץ תצורת ה-Intlayer שלך.

  > דוגמה: `npx intlayer dictionary push --env-file .env.production.local`

  > דוגמה: `npx intlayer dictionary push --env production`

**אפשרויות פלט:**

- **`-r`, `--delete-locale-dictionary`**: דילוג על השאלה המבקשת למחוק את ספריות השפות לאחר העלאת המילונים, ומחיקתן. כברירת מחדל, אם המילון מוגדר מקומית, הוא ידרוס את תוכן המילונים המרוחקים.

  > דוגמה: `npx intlayer dictionary push -r`

  > דוגמה: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: דילוג על השאלה המבקשת למחוק את ספריות השפות לאחר העלאת המילונים, ושמירתן. כברירת מחדל, אם המילון מוגדר מקומית, הוא ידרוס את תוכן המילונים המרוחקים.

  > דוגמה: `npx intlayer dictionary push -k`

  > דוגמה: `npx intlayer dictionary push --keep-locale-dictionary`

**אפשרויות הכנה (Preparation):**

- **`--build`**: בניית המילונים לפני ההעלאה כדי לוודא שהתוכן מעודכן. True יכפה בנייה, false ידלג על בנייה, undefined יאפשר שימוש במטמון של הבנייה.

**אפשרויות רישום (Log):**

- **`--verbose`**: הפעלת לוגים מפורטים לניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).

**אפשרויות Git:**

- **`--git-diff`**: הרצה רק על מילונים הכוללים שינויים מגרסת הבסיס (ברירת מחדל `origin/main`) לענף הנוכחי (ברירת מחדל: `HEAD`).
- **`--git-diff-base`**: הפניית בסיס להשוואת git diff (ברירת מחדל `origin/main`).
- **`--git-diff-current`**: הפנייה נוכחית להשוואת git diff (ברירת מחדל: `HEAD`).
- **`--uncommitted`**: הכללת שינויים שטרם בוצע להם commit.
- **`--unpushed`**: הכללת שינויים שטרם נדחפו (unpushed).
- **`--untracked`**: הכללת קבצים שאינם במעקב (untracked).

  > דוגמה: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > דוגמה: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
