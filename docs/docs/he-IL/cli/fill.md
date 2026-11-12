---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 5
title: "intlayer fill: תרגום מילונים באמצעות AI"
description: "השלם תרגומים חסרים, בצע ביקורת על תרגומים קיימים ותרגם את מילוני ה-Intlayer שלך באמצעות AI משורת הפקודה, באופן מקומי או ב-CI."
keywords:
  - Fill
  - השלמה
  - Audit
  - ביקורת
  - Translate
  - תרגום
  - Dictionaries
  - מילונים
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
author: aymericzip
---

# השלמת / ביקורת / תרגום מילונים (Fill / audit / translate dictionaries)

```bash packageManager="npm"
npx intlayer fill
```

```bash packageManager="yarn"
yarn intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer fill
```

```bash packageManager="bun"
bun x intlayer fill
```

פקודה זו מנתחת את קובצי הצהרת התוכן שלך עבור בעיות פוטנציאליות כגון תרגומים חסרים, חוסר עקביות מבנית או אי-התאמות של טיפוסים. אם היא מוצאת בעיות כלשהן, **intlayer fill** תציע או תחיל עדכונים כדי לשמור על המילונים שלך עקביים ומלאים.

## נקודות מפתח:

- פיצול קובצי JSON גדולים למקטעים (chunks) כדי להישאר בתוך גבולות חלון ההקשר (context window) של מודל ה-AI.
- ניסיון חוזר של התרגום אם פורמט הפלט שגוי.
- שילוב הקשר ספציפי של האפליקציה והקובץ לדיוק תרגום משופר.
- שימור תרגומים קיימים על ידי הימנעות מדריסתם.
- עיבוד קבצים, מקטעים ושפות במקביל באמצעות מערכת תורים להגברת המהירות.

## כינויים (Aliases):

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## דוגמה לפלט:

```bash
npx intlayer fill

Preparing Intlayer (v7.5.14)
Done 76ms
@intlayer/ai found - Run process locally
Provider: (default) - Model: (default) - API Key: ✓
Affected dictionary keys for processing: app, comp-test, hello-world, lang-switcher
 - [comp-test]      No locales to fill, Skipping comp-test.content.json
 - [app]            Processing app.content.tsx
 - [app]            Filling missing metadata for app.content.tsx
 - [hello-world]    Processing test.content.ts
 - [hello-world]   [French (fr)]      Preparing test.content.ts
 - [hello-world]   [Spanish (es)]     Preparing test.content.ts
 - [lang-switcher]  Processing langSwitcher.content.ts
 - [lang-switcher]  Filling missing metadata for langSwitcher.content.ts
 - [hello-world]    Translation completed successfully for test.content.ts
 - [lang-switcher] [Spanish (es)]     Preparing langSwitcher.content.ts
 - [app]           [French (fr)]      Preparing app.content.tsx
 - [app]           [Spanish (es)]     Preparing app.content.tsx
 - [hello-world]    Content declaration written to test.content.ts
 - [app]            Translation completed successfully for app.content.tsx
 - [app]            Content declaration written to app.content.tsx
 - [lang-switcher]  Translation completed successfully for langSwitcher.content.ts
 - [lang-switcher]  Content declaration written to langSwitcher.content.ts
```

## ארגומנטים:

**אפשרויות רשימת קבצים:**

- **`-f, --file [files...]`**: רשימה של קובצי הצהרת תוכן ספציפיים לביקורת. אם לא סופקה, כל קובצי `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` שהתגלו בהתאם לתצורת הקובץ שלך ייבדקו.

  > דוגמה: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: סינון מילונים לפי מפתחות. אם לא סופק, כל המילונים ייבדקו.

  > דוגמה: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: סינון מילונים לפי מפתחות (כינוי עבור --keys).

  > דוגמה: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: החרגת מילונים לפי מפתחות. אם לא סופק, כל המילונים ייבדקו.

  > דוגמה: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: החרגת מילונים לפי מפתחות (כינוי עבור --excluded-keys).

  > דוגמה: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: סינון מילונים לפי תבנית glob של נתיבי קבצים.

  > דוגמה: `npx intlayer dictionary fill --path-filter "src/home/**"`

**אפשרויות שפות קלט ופלט:**

- **`--source-locale [sourceLocale]`**: שפת המקור לתרגום ממנה. אם לא צוינה, שפת ברירת המחדל מהתצורה שלך תהיה בשימוש.

- **`--output-locales [outputLocales...]`**: שפות יעד לתרגום אליהן. אם לא צוינו, כל השפות מהתצורה שלך ייכללו מלבד שפת המקור.

- **`--mode [mode]`**: מצב תרגום: `complete`, `review`. ברירת המחדל היא `complete`. המצב `complete` ישלים את כל התוכן החסר, ואילו `review` ישלים תוכן חסר ויבצע סקירה של מפתחות קיימים.

**אפשרויות Git:**

- **`--git-diff`**: הרצה רק על מילונים הכוללים שינויים מגרסת הבסיס (ברירת מחדל `origin/main`) לענף הנוכחי (ברירת מחדל: `HEAD`).
- **`--git-diff-base`**: הפניית בסיס להשוואת git diff (ברירת מחדל `origin/main`).
- **`--git-diff-current`**: הפנייה נוכחית להשוואת git diff (ברירת מחדל: `HEAD`).
- **`--uncommitted`**: הכללת שינויים שטרם בוצע להם commit.
- **`--unpushed`**: הכללת שינויים שטרם נדחפו (unpushed).
- **`--untracked`**: הכללת קבצים שאינם במעקב (untracked).

  > דוגמה: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > דוגמה: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**אפשרויות בינה מלאכותית (AI):**

- **`--model [model]`**: מודל ה-AI לשימוש עבור התרגום (למשל, `gpt-3.5-turbo`).
- **`--provider [provider]`**: ספק ה-AI לשימוש עבור התרגום.
- **`--temperature [temperature]`**: הגדרת טמפרטורה עבור מודל ה-AI.
- **`--api-key [apiKey]`**: מפתח API מותאם אישית עבור שירות ה-AI.
- **`--custom-prompt [prompt]`**: פרומפט מותאם אישית עבור הוראות התרגום.
- **`--application-context [applicationContext]`**: הקשר נוסף עבור תרגום ה-AI.
- **`--data-serialization [dataSerialization]`**: פורמט סריאליזציית הנתונים לשימוש בתכונות ה-AI של Intlayer. אפשרויות: `json` (סטנדרטי, אמין), `toon` (פחות אסימונים, פחות עקבי).

  > דוגמה: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**אפשרויות משתני סביבה:**

- **`--env`**: ציון הסביבה (למשל, `development`, `production`).
- **`--env-file [envFile]`**: קובץ סביבה מותאם אישית לטעינת משתנים ממנו.

  > דוגמה: `npx intlayer fill --env-file .env.production.local`

  > דוגמה: `npx intlayer fill --env production`

**אפשרויות תצורה:**

- **`--base-dir`**: ציון ספריית הבסיס של הפרויקט.

  > דוגמה: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: השבתת המטמון.

  > דוגמה: `npx intlayer build --no-cache`

- **`--ci`**: הרצת הפקודה בכל פרויקט Intlayer במונוריפו (או רק בנוכחי בהרצה מתוך תיקיית פרויקט). ניתן להזריק אישורים דרך `INTLAYER_PROJECT_CREDENTIALS`, מפת JSON של נתיב פרויקט ל-`{ "clientId", "clientSecret" }`.

  > דוגמה: `npx intlayer fill --ci`

**אפשרויות הכנה (Preparation):**

- **`--build`**: בניית המילונים לפני ההעלאה כדי לוודא שהתוכן מעודכן. True יכפה בנייה, false ידלג על בנייה, undefined יאפשר שימוש במטמון של הבנייה.

- **`--skip-metadata`**: דילוג על מילוי מטא-דאטה חסרה (description, title, tags) עבור מילונים.

**אפשרויות רישום (Log):**

- **`--verbose`**: הפעלת לוגים מפורטים לניפוי שגיאות (ברירת מחדל true בשימוש ב-CLI).

## דוגמה:

```bash packageManager="npm"
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

```bash packageManager="yarn"
yarn intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

```bash packageManager="pnpm"
pnpm intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

```bash packageManager="bun"
bun x intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

פקודה זו תתרגם תוכן מאנגלית לצרפתית וספרדית עבור כל קובצי הצהרת התוכן בתיקיית `src/home/` באמצעות מודל GPT-3.5 Turbo.
