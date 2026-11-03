---
createdAt: 2026-08-12
updatedAt: 2026-11-03
priority: 6
title: "תוסף ESLint | כללי Lint עבור Intlayer"
description: "תפוס מחרוזות מקודדות (hardcoded), קריאות דינמיות שהמהדר של Intlayer אינו יכול לבצע להן אופטימיזציה ותוכן שאינו בשימוש באמצעות eslint-plugin-intlayer, עבור ESLint ו-oxlint."
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - בינאום
  - no-raw-text
  - מחרוזות מקודדות
  - תרגומים שאינם בשימוש
  - תוכן מת
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "אתחול היסטוריה"
author: aymericzip
---

# תוסף ESLint ו-OXLint

התוסף `eslint-plugin-intlayer` תופס את סוגי שגיאות ה-i18n ש-TypeScript אינו יכול לזהות:

1. **טקסט מקודד (Hardcoded text)** שלעולם לא נכנס למילון.
2. **קריאות דינמיות** שעוברות בדיקת טיפוסים ורצות בהצלחה, אך מהדר ה-Intlayer אינו יכול לבצע להן אופטימיזציה.
3. **תוכן מת (Dead content)**: מילונים ושדות שאף רכיב בפרויקט אינו קורא (בהפעלה יזומה).

מפתחות מילון לא ידועים, נתיבי שדות לא ידועים ושפות חסרות כבר מוגדרים כשגיאות הידור, ולכן התוסף אינו חוזר עליהם.

## התקנה

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev eslint-plugin-intlayer
```

דורש ESLint 9 ומעלה (flat config). ישנה תמיכה ב-ESLint 10.

## שימוש

התוסף פועל הן ב-ESLint והן ב-[oxlint](https://oxc.rs), עם אותם הכללים ואותן האפשרויות.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

או פרוס תצורה והגדר את רמות החומרה בעצמך:

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

שתי הסתייגויות: תמיכת התוספים ב-JS של oxlint עדיין בשלב אלפא, ו-oxlint אינו תומך במפענחים מותאמים אישית (custom parsers), כך שתבניות `.vue`, `.svelte`, `.astro` ו-Angular אינן נבדקות שם. הרץ את oxlint על קובצי ה-JS/TS/JSX שלך ושמור את ESLint עבור השאר.

הכלל `no-unused-content` הושמט למעלה בכוונה: הוא זקוק לספריית העבודה ולנתיב הקובץ הנבדק מתוך הקשר הכלל, מה שגשר תוספי ה-JS בשלב האלפא אינו מבטיח. הרץ אותו תחת ESLint.

  </Tab>
</Tabs>

### תצורות (Configs)

| תצורה           | `no-raw-text`              | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                       | error                   | error                     | off                      | off                 |
| `strict`        | error (+ non-JSX literals) | error                   | error                     | error                    | off                 |
| `contract-only` | off                        | error                   | error                     | off                      | off                 |

`recommended` שומר על `no-raw-text` ברמת `warn` בכוונה: הפעלתו על בסיס קוד קיים מציפה את כל המחרוזות הלא מתורגמות בבת אחת, מה שלא אמור לשבור את תהליך הבנייה שלך ביום הראשון.

`enforce-adapter-import` כבוי כברירת מחדל. הפעל אותו במפורש אם תרצה בכך.

`no-unused-content` כבוי בכל התצורות, כולל `strict`. זהו הכלל היחיד שקורא את תצורת ה-Intlayer שלך וסורק את קובצי המקור מהדיסק, ולכן הפעלתו צריכה להיות בחירה מכוונת ולא ברירת מחדל של ערכה מוכנה.

## כללים (Rules)

### `no-raw-text`

מדווח על טקסט הפונה למשתמש שאינו מוצהר במילון. הכלל משתמש באותו מנגנון זיהוי כמו `intlayer extract`, כך ששמות מותגים, מחלקות CSS ומזהים טכניים אינם נלקחים בחשבון.

```jsx
// ✗ מדווח
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ תקין
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

קובצי הצהרת תולק (`*.content.ts`, …) מדולגים.

כדי לתקן קובץ שלם בבת אחת, הרץ את `npx intlayer extract` ואפשר למהדר להעביר את המחרוזות לתוך מילון עבורך.

**אפשרויות**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // מאפיינים שערכם הוא טקסט המוצג למשתמש.
      // ברירת מחדל: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // אלמנטים שתוכנם לעולם אינו טקסט המוצג למשתמש.
      // ברירת מחדל: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // ביטויים רגולריים לטקסט שלעולם אין לדווח עליו.
      ignorePatterns: ["^Powered by"],

      // דיווח גם על ליטרלים של מחרוזות מחוץ ל-markup. ברירת מחדל: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

דורש שמפתח המילון יהיה מחרוזת ליטרלית (string literal).

המהדר יכול לטעון מראש מילון רק כאשר הוא יכול לקרוא את המפתח ישירות במקום הקריאה בקוד. עם מפתח מחושב הוא מדלג בשקט על האופטימיזציה ומאגד את כל המילונים במקום זאת.

```typescript
// ✗ מדווח
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ משתנה עדיין אינו ליטרל
const key = "home";
useIntlayer(key);

// ✓ תקין
useIntlayer("home");
getTranslations({ namespace: "home" });
```

כלל זה חל על `useIntlayer`, `getIntlayer` וכל מתאם תאימות (compat adapter) כגון `useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>` ועוד.

### `no-dynamic-field-access`

דורש שהשדה שאתה קורא מתוך מילון יהיה ידוע באופן סטטי.

המהדר מסיר שדות שאינו רואה בהם שימוש. גישה מחושבת היא בלתי נראית עבורו, ולכן הקריאה עלולה להחזיר `undefined` בזמן ריצה.

```typescript
// ✗ מדווח
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ תקין
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

מעדיף את מתאם התאימות של `@intlayer/*` על פני החבילה המקורית. המקורית מתפענחת ל-Intlayer רק כאשר כינוי הבאנדלר (alias) מוגדר; המתאם תמיד עושה זאת. ניתן לתיקון אוטומטי עם `--fix`.

```typescript
// ✗ מדווח
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ תקין
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**כבוי כברירת מחדל.** מדווח על תוכן שאף רכיב בפרויקט אינו קורא, וכן על מפתחות מילון שהוצהרו ביותר ממקום אחד.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ מדווח כאשר אף גורם קורא אינו מבקש את "home"
  content: {
    title: t({ en: "Title" }),

    // ✗ מדווח כאשר שום דבר אינו קורא את `hero`
    hero: {
      subtitle: t({ en: "Subtitle" }),
    },
  },
};
```

בניגוד לכללים האחרים, כלל זה אינו יכול לתת תשובה מתוך הקובץ הבודד המוצג לפניו, שכן שדה נחשב כלא-בשימוש רק ביחס לכלל הפרויקט. בהצהרת התוכן הראשונה בריצת lint הוא טוען את תצורת Intlayer שלך, מאתר באמצעות glob את קובצי המקור שהתצורה מגדירה (`build.traversePattern`, `compiler.transformPattern`) ומריץ את אותו מנתח שימוש שמפעיל את `@intlayer/lsp` ואת קו המחיקה על תוכן שאינו בשימוש בהרחבת VS Code. התוצאה נשמרת במטמון למשך `cacheTtl` מילי-שניות, כך שהסריקה מתבצעת פעם אחת לכל ריצה ולא פעם אחת לכל קובץ.

**אפשרויות**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // דיווח על מפתחות מילון ששום דבר אינו מתייחס אליהם. ברירת מחדל: true
      reportUnusedDictionaries: true,

      // דיווח על שדות תוכן ששום דבר אינו קורא. ברירת מחדל: true
      reportUnusedFields: true,

      // דיווח על מפתחות שהוצהרו ביותר ממקום אחד. ברירת מחדל: true
      reportDuplicateKeys: true,

      // ביטויים רגולריים לנתיבי שדות שלעולם אין לדווח עליהם.
      ignoreFields: ["^meta"],

      // שורש הפרויקט שממנו מתחילה הסריקה. ברירת מחדל: ספריית העבודה של ESLint
      baseDir: process.cwd(),

      // משך הזמן שבו סריקת פרויקט נשמרת לשימוש חוזר, במילי-שניות. ברירת מחדל: 30000
      cacheTtl: 30000,
    },
  ],
}
```

הפחת את `cacheTtl` כאשר אתה מריץ lint מתוך שרת עורך קבוע (long-lived) ורוצה שהעריכות ישתקפו מהר יותר; הגדר את `baseDir` כאשר ריצת lint יחידה מתפרסת על פני מספר פרויקטי Intlayer במונוריפו.

> **הכלל נוטה לשתיקה (silence).** דיווח חיובי שגוי (false positive) כאן עלול לגרום למחיקת תרגום, ולכן דבר אינו מדווח כאשר נעשה שימוש במילון באופן שהניתוח אינו יכול לעקוב אחריו: העברת אובייקט התוכן בשלמותו, פונקציית תרגום הקשורה אליו (`const t = useTranslations("home")`), הצהרה שנצרכת דרך ייבוא ישיר (`useDictionary(myDictionary)`), שימוש ב-`nest()` ממילון אחר, או רשימת שדות שהפכה ללא ממצה בגלל אופרטור spread. רכיבים בקובץ יחיד (`.vue`, `.svelte`, `.astro`) נחשבים כמשתמשים בכל שדה של המילונים שהם מציינים, מכיוון שבלוקי הסקריפט שלהם אינם מפוענחים כאן.

הבדיקה `reportDuplicateKeys` קוראת את המילונים הלא ממוזגים שהבנייה כותבת תחת `.intlayer/`, ולכן היא שותקת עד שהפרויקט נבנה לפחות פעם אחת. שתי הצהרות החולקות מפתח ממוזגות יחד, דבר המהווה דפוס לגיטימי, והדיווח קיים משום ששדה המוגדר בשני הצדדים ישמור בשקט רק את אחד משני הערכים.

המנתח נטען מתוך `@intlayer/lsp`, המופץ כ-ESM. לכן הכלל זקוק לגרסת Node המסוגלת לבצע `require()` למודול ES, כגון Node 20.19+ או 22.12+. בכל גרסה ישנה יותר הוא לא ידווח דבר במקום להכשיל את ריצת ה-lint.

## פריימוורקים

כל כלל עובד בכל שילובי Intlayer, כולל בתוך תבניות של Vue, Svelte ו-Angular. אתה רק צריך להגדיר ל-ESLint איזה מפענח (parser) קורא כל סוג קובץ.

| פריימוורק                 | קבצים             | מפענח (Parser)                    |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| תבניות Angular            | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

התקן רק את המפענחים שהפרויקט שלך זקוק להם.

> **מגבלה ידועה.** בתבניות Vue ו-Angular, ביטוי כמו `{{ content[key] }}` אינו נבדק על ידי `no-dynamic-field-access`. קריאות דינמיות שנכתבות בתוך בלוק הסקריפט נתפסות כרגיל.
