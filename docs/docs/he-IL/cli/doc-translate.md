---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer doc translate: תרגום מסמכי Markdown"
description: למד כיצד לתרגם קובצי תיעוד באופן אוטומטי באמצעות שירותי תרגום מבוססי AI.
keywords:
  - Translate
  - תרגום
  - Document
  - מסמך
  - Documentation
  - תיעוד
  - AI
  - בינה מלאכותית
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
author: aymericzip
---

# תרגום מסמך (Translate Document)

הפקודה `doc translate` מתרגמת באופן אוטומטי קובצי תיעוד משפת בסיס לשפות יעד באמצעות שירותי תרגום מבוססי AI.

## נקודות מפתח:

- פיצול קובצי markdown גדולים למקטעים (chunks) כדי להישאר בתוך גבולות חלון ההקשר (context window) של מודל ה-AI.
- ניסיון חוזר של התרגום אם פורמט הפלט שגוי.
- שילוב הקשר ספציפי של האפליקציה והקובץ לדיוק תרגום משופר.
- שימור תרגומים קיימים על ידי הימנעות מדריסתם.
- עיבוד קבצים, מקטעים ושפות במקביל באמצעות מערכת תורים להגברת המהירות.

```bash packageManager="npm"
npx intlayer doc translate
```

```bash packageManager="yarn"
yarn intlayer doc translate
```

```bash packageManager="pnpm"
pnpm intlayer doc translate
```

```bash packageManager="bun"
bun x intlayer doc translate
```

## ארגומנטים:

**אפשרויות רשימת קבצים:**

- **`--doc-pattern [docPattern...]`**: תבניות גלוב (glob) להתאמת קובצי תיעוד לתרגום.

  > דוגמה: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: תבניות גלוב להחרגה מתרגום.

  > דוגמה: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: דילוג על הקובץ אם שונה לפני הזמן שצוין.
  - יכול להיות זמן מוחלט כמו "2025-12-05" (מחרוזת או Date)
  - יכול להיות זמן יחסי במילי-שניות `1 * 60 * 60 * 1000` (שעה אחת)
  - אפשרות זו בודקת את זמן העדכון של הקובץ באמצעות שיטת `fs.stat`. לכן היא עשויה להיות מושפעת מ-Git או מכלים אחרים שמשנים את הקובץ.

  > דוגמה: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: דילוג על הקובץ אם שונה לאחר הזמן שצוין.
  - יכול להיות זמן מוחלט כמו "2025-12-05" (מחרוזת או Date)
  - יכול להיות זמן יחסי במילי-שניות `1 * 60 * 60 * 1000` (שעה אחת)
  - אפשרות זו בודקת את זמן העדכון של הקובץ באמצעות שיטת `fs.stat`. לכן היא עשויה להיות מושפעת מ-Git או מכלים אחרים שמשנים את הקובץ.

  > דוגמה: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: דילוג על הקובץ אם הוא כבר קיים.

  > דוגמה: `npx intlayer doc translate --skip-if-exists`

**אפשרויות שפות קלט ופלט:**

- **`--locales [locales...]`**: שפות יעד לתרגום התיעוד אליהן.

  > דוגמה: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: שפת מקור לתרגום ממנה.

  > דוגמה: `npx intlayer doc translate --base-locale en`

**אפשרויות עיבוד קבצים:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: מספר קבצים לעיבוד בו-זמני עבור תרגום.

  > דוגמה: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**אפשרויות בינה מלאכותית (AI):**

- **`--model [model]`**: מודל ה-AI לשימוש עבור תרגום (למשל, `gpt-3.5-turbo`).
- **`--provider [provider]`**: ספק ה-AI לשימוש עבור תרגום.
- **`--temperature [temperature]`**: הגדרת טמפרטורה עבור מודל ה-AI.
- **`--api-key [apiKey]`**: מפתח API מותאם אישית עבור שירות ה-AI.
- **`--application-context [applicationContext]`**: הקשר נוסף עבור תרגום ה-AI.
- **`--data-serialization [dataSerialization]`**: פורמט סריאליזציית הנתונים לשימוש בתכונות ה-AI של Intlayer. אפשרויות: `json` (סטנדרטי, אמין), `toon` (פחות אסימונים, פחות עקבי).
- **`--custom-prompt [prompt]`**: התאמה אישית של הפרומפט הבסיסי המשמש לתרגום. (הערה: עבור רוב מקרי השימוש, מומלץ להשתמש באפשרות `--custom-instructions` במקום זאת, כיוון שהיא מספקת שליטה טובה יותר על אופן התרגום).

  > דוגמה: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**אפשרויות משתני סביבה:**

- **`--env`**: ציון הסביבה (למשל, `development`, `production`).
- **`--env-file [envFile]`**: קובץ סביבה מותאם אישית לטעינת משתנים ממנו.
- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט.
- **`--no-cache`**: השבתת המטמון.

  > דוגמה: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer doc translate --ci`

**אפשרויות רישום (Log):**

- **`--verbose`**: הפעלת לוגים מפורטים לניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).

  > דוגמה: `npx intlayer doc translate --verbose`

**אפשרויות הנחיות מותאמות אישית (Custom instructions):**

- **`--custom-instructions [customInstructions]`**: הנחיות מותאמות אישית שנוספות לפרומפט. שימושי להחלת כללים ספציפיים לגבי עיצוב, תרגום קישורים וכדומה.
  - יכול להיות זמן מוחלט כמו "2025-12-05" (מחרוזת או Date)
  - יכול להיות זמן יחסי במילי-שניות `1 * 60 * 60 * 1000` (שעה אחת)
  - אפשרות זו בודקת את זמן העדכון של הקובץ באמצעות שיטת `fs.stat`. לכן היא עשויה להיות מושפעת מ-Git או מכלים אחרים שמשנים את הקובץ.

  > דוגמה: `npx intlayer doc translate --custom-instructions "Avoid translating urls, and keep the markdown format"`

  > דוגמה: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**אפשרויות Git:**

- **`--git-diff`**: הרצה רק על מילונים הכוללים שינויים מגרסת הבסיס (ברירת מחדל `origin/main`) לענף הנוכחי (ברירת מחדל: `HEAD`).
- **`--git-diff-base`**: הפניית בסיס להשוואת git diff (ברירת מחדל `origin/main`).
- **`--git-diff-current`**: הפנייה נוכחית להשוואת git diff (ברירת מחדל: `HEAD`).
- **`--uncommitted`**: הכללת שינויים שטרם בוצע להם commit.
- **`--unpushed`**: הכללת שינויים שטרם נדחפו (unpushed).
- **`--untracked`**: הכללת קבצים שאינם במעקב (untracked).

  > דוגמה: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > דוגמה: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> שים לב שנתיב קובץ הפלט ייקבע על ידי החלפת התבניות הבאות:
>
> - `/{{baseLocale}}/` ב-`/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` ב-`\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` ב-`_{{locale}}.`
> - `{{baseLocale}}_` ב-`{{locale}}_`
> - `.{{baseLocaleName}}.` ב-`.{{localeName}}.`
>
> אם התבנית לא נמצאה, קובץ הפלט יוסיף את `.{{locale}}` לסיומת הקובץ. הקובץ `./my/file.md` יתורגם ל-`./my/file.fr.md` עבור השפה הצרפתית.
