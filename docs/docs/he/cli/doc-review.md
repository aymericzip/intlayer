---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer doc review: סקירת מסמכים מתורגמים"
description: למד כיצד לסקור קובצי תיעוד עבור איכות, עקביות ושלמות בין שפות שונות.
keywords:
  - Review
  - סקירה
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
  - doc-review
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "הוספת דגל `--ci`"
  - version: 9.0.0
    date: 2026-08-06
    changes: "החלפת --log ב---mode ורישום סיכום בסיום הריצה"
  - version: 9.0.0
    date: 2026-06-17
    changes: "הוספת אפשרות --log"
author: aymericzip
---

# סקירת מסמך (Review Document)

הפקודה `doc review` מנתחת קובצי תיעוד עבור איכות, עקביות ושלמות בין שפות (locales) שונות.

## נקודות מפתח:

- פיצול קובצי markdown גדולים למקטעים (chunks) כדי להישאר בתוך גבולות חלון ההקשר (context window) של מודל ה-AI.
- אופטימיזציה של המקטעים לסקירה, ודילוג על החלקים שכבר מתורגמים ולא השתנו.
- עיבוד קבצים, מקטעים ושפות במקביל באמצעות מערכת תורים להגברת המהירות.

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

ניתן להשתמש בפקודה זו כדי לסקור קבצים שכבר מתורגמים, ולבדוק אם התרגום תקין.

עבור מרבית מקרי השימוש:

- העדף להשתמש ב-`doc translate` כאשר הגרסה המתורגמת של קובץ זה אינה קיימת עדיין.
- העדף להשתמש ב-`doc review` כאשר הגרסה המתורגמת של קובץ זה כבר קיימת.

> שים לב שתהליך הסקירה צורך יותר אסימוני קלט (input tokens) מאשר תהליך התרגום לצורך סקירת אותו קובץ במלואו. עם זאת, תהליך הסקירה יבצע אופטימיזציה של המקטעים לסקירה, וידלג על חלקים שלא השתנו.

## ארגומנטים:

**אפשרויות רשימת קבצים:**

- **`--doc-pattern [docPattern...]`**: תבניות גלוב (glob) להתאמת קובצי תיעוד לסקירה.

  > דוגמה: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: תבניות גלוב להחרגה מהסקירה.

  > דוגמה: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: דילוג על הקובץ אם שונה לפני הזמן שצוין.
  - יכול להיות זמן מוחלט כמו "2025-12-05" (מחרוזת או Date)
  - יכול להיות זמן יחסי במילי-שניות `1 * 60 * 60 * 1000` (שעה אחת)
  - אפשרות זו בודקת את זמן העדכון של הקובץ באמצעות שיטת `fs.stat`. לכן היא עשויה להיות מושפעת מ-Git או מכלים אחרים שמשנים את הקובץ.

  > דוגמה: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: דילוג על הקובץ אם שונה לאחר הזמן שצוין.
  - יכול להיות זמן מוחלט כמו "2025-12-05" (מחרוזת או Date)
  - יכול להיות זמן יחסי במילי-שניות `1 * 60 * 60 * 1000` (שעה אחת)
  - אפשרות זו בודקת את זמן העדכון של הקובץ באמצעות שיטת `fs.stat`. לכן היא עשויה להיות מושפעת מ-Git או מכלים אחרים שמשנים את הקובץ.

  > דוגמה: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: דילוג על הקובץ אם הוא כבר קיים.

  > דוגמה: `npx intlayer doc review --skip-if-exists`

**אפשרויות מצב סקירה (Review mode):**

- **`--mode [mode]`**: אופן הרצת הסקירה. ברירת המחדל היא `apply`.

  - `apply`: תרגום הבלוקים השונים באמצעות AI וכתיבת הקבצים.
  - `report`: אינו מפעיל AI כלל; רושם ליומן (logs) את הבלוקים הדורשים תשומת לב (עם מספרי שורות ותוכן) עבור שפת הבסיס ושפות היעד, כדי לעזור לסוכן אחר לייצר את התרגומים.
  - `synthesis`: אינו מפעיל AI כלל ומדלג על פלט פר-בלוק; מציג רק סיכום סופי של המסמכים המעודכנים ואלו שיש בהם בלוקים לעריכה.

  > דוגמה: `npx intlayer doc review --mode report`

  > דוגמה: `npx intlayer doc review --mode synthesis`

בכל מצב שייבחר, הריצה מסתיימת בסיכום המפרט את המסמכים המתואמים עם מסמך הבסיס שלהם ואת אלו שעדיין כוללים בלוקים לעריכה.

**אפשרויות שפות קלט ופלט:**

- **`--locales [locales...]`**: שפות יעד שעבורן תבוצע סקירת התיעוד.

  > דוגמה: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: שפת מקור (מסמך בסיס) להשוואה מולה.

  > דוגמה: `npx intlayer doc review --base-locale en`

**אפשרויות עיבוד קבצים:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: מספר קבצים לעיבוד בו-זמני לצורך סקירה.

  > דוגמה: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**אפשרויות בינה מלאכותית (AI):**

- **`--model [model]`**: מודל ה-AI לשימוש עבור הסקירה (למשל, `gpt-3.5-turbo`).
- **`--provider [provider]`**: ספק ה-AI לשימוש עבור הסקירה.
- **`--temperature [temperature]`**: הגדרת טמפרטורה עבור מודל ה-AI.
- **`--api-key [apiKey]`**: מפתח API מותאם אישית עבור שירות ה-AI.
- **`--application-context [applicationContext]`**: הקשר נוסף עבור סקירת ה-AI.
- **`--data-serialization [dataSerialization]`**: פורמט סריאליזציית הנתונים עבור תכונות ה-AI של Intlayer. אפשרויות: `json` (סטנדרטי, אמין), `toon` (פחות אסימונים, פחות עקבי).
- **`--custom-prompt [prompt]`**: התאמה אישית של הפרומפט הבסיסי לסקירה. (הערה: עבור רוב מקרי השימוש, מומלץ להשתמש באפשרות `--custom-instructions` במקום זאת).

  > דוגמה: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**אפשרויות משתני סביבה:**

- **`--env`**: ציון הסביבה (למשל, `development`, `production`).
- **`--env-file [envFile]`**: קובץ סביבה מותאם אישית לטעינת משתנים.
- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט.
- **`--no-cache`**: השבתת המטמון.

  > דוגמה: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer doc review --ci`

**אפשרויות רישום (Log):**

- **`--verbose`**: הפעלת לוגים מפורטים לניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).

  > דוגמה: `npx intlayer doc review --verbose`

**אפשרויות הנחיות מותאמות אישית (Custom instructions):**

- **`--custom-instructions [customInstructions]`**: הנחיות מותאמות אישית שנוספות לפרומפט. שימושי להחלת כללים ספציפיים לגבי עיצוב, תרגום קישורים וכדומה.

  > דוגמה: `npx intlayer doc review --custom-instructions "Avoid translating urls, and keep the markdown format"`

  > דוגמה: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**אפשרויות Git:**

- **`--git-diff`**: הרצה רק על קבצים הכוללים שינויים מגרסת הבסיס (ברירת מחדל `origin/main`) לענף הנוכחי (ברירת מחדל: `HEAD`).
- **`--git-diff-base`**: הפניית בסיס להשוואת git diff (ברירת מחדל `origin/main`).
- **`--git-diff-current`**: הפנייה נוכחית להשוואת git diff (ברירת מחדל: `HEAD`).
- **`--uncommitted`**: הכללת שינויים שטרם בוצע להם commit.
- **`--unpushed`**: הכללת שינויים שטרם נדחפו (unpushed).
- **`--untracked`**: הכללת קבצים שאינם במעקב (untracked).

  > דוגמה: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > דוגמה: `npx intlayer doc review --uncommitted --unpushed --untracked`

> שים לב שנתיב קובץ הפלט ייקבע על ידי החלפת התבניות הבאות:
>
> - `/{{baseLocale}}/` ב-`/{{locale}}/` (Unix)
> - `\{{baseLocale}}\` ב-`\{{locale}}\` (Windows)
> - `_{{baseLocale}}.` ב-`_{{locale}}.`
> - `{{baseLocale}}_` ב-`{{locale}}_`
> - `.{{baseLocaleName}}.` ב-`.{{localeName}}.`
>
> אם התבנית לא נמצאה, קובץ הפלט יוסיף את `.{{locale}}` לסיומת הקובץ. הקובץ `./my/file.md` ייסקר ויעודכן ל-`./my/file.fr.md` עבור השפה הצרפתית.
