---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer pull: משיכת מילונים מה-CMS"
description: "הורד את המילונים שנערכו בעורך הוויזואלי או ב-CMS של Intlayer לתוך הפרויקט שלך, כך ששינויי תוכן מרוחקים יגיעו לבסיס הקוד שלך."
keywords:
  - Pull
  - משיכה
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
  - pull
author: aymericzip
---

# משיכת מילונים מרוחקים (Pull Distant Dictionaries)

```bash packageManager="npm"
npx intlayer pull
```

```bash packageManager="yarn"
yarn intlayer pull
```

```bash packageManager="pnpm"
pnpm intlayer pull
```

```bash packageManager="bun"
bun x intlayer pull
```

אם [עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) מותקן, תוכל גם למשוך מילונים מהעורך. בדרך זו תוכל לדרוס את תוכן המילונים שלך לצרכי האפליקציה שלך.

- [עורך Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)

## כינויים (Aliases):

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## ארגומנטים:

**אפשרויות מילון:**

- **`-d, --dictionaries`**: מזהי המילונים למשיכה. אם לא צוין, כל המילונים יימשכו.

  > דוגמה: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: מזהי המילונים למשיכה (כינוי עבור --dictionaries).

  > דוגמה: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**אפשרויות תצורה:**

- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט. כדי לאחזר את תצורת Intlayer, הפקודה תחפש את הקובץ `intlayer.config.{ts,js,json,cjs,mjs}` בספריית הבסיס.

  > דוגמה: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: השבתת המטמון.

  > דוגמה: `npx intlayer build --no-cache`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer pull --ci`

**אפשרויות משתני סביבה:**

- **`--env`**: ציון הסביבה (למשל, `development`, `production`).
- **`--env-file`**: קובץ סביבה מותאם אישית לטעינת משתנים ממנו.
- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט. כדי לאחזר את תצורת Intlayer, הפקודה תחפש את הקובץ `intlayer.config.{ts,js,json,cjs,mjs}` בספריית הבסיס.

  > דוגמה: `npx intlayer dictionary push --env-file .env.production.local`

  > דוגמה: `npx intlayer dictionary push --env production`

**אפשרויות פלט:**

- **`--new-dictionaries-path`**: נתיב לספרייה שבה יישמרו המילונים החדשים. אם לא צוין, המילונים החדשים יישמרו בספריית `./intlayer-dictionaries` של הפרויקט. אם מוגדר שדה `filePath` בתוכן המילון שלך, המילונים יתעלמו מארגומנט זה ויישמרו בספריית ה-`filePath` שצוינה.

**אפשרויות רישום (Log):**

- **`--verbose`**: הפעלת לוגים מפורטים לניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).

## דוגמה:

```bash packageManager="npm"
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

```bash packageManager="yarn"
yarn intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

```bash packageManager="pnpm"
pnpm intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

```bash packageManager="bun"
bun x intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
