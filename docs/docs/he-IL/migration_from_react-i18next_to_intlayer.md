---
createdAt: 2026-06-05
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-react-i18next ל-Intlayer"
description: "הגרו אפליקציית React או Next.js מ-react-i18next ל-Intlayer שלב אחר שלב, החל ממתאמי התאימות כך ששום דבר לא יישבר."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - הגירה
  - בינאום
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-react-i18next / i18next ל-Intlayer

## מדוע להגר מ-react-i18next / i18next ל-Intlayer?

<AccordionGroup>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייעת **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות (Maintainability)">

תיחום התוכן של האפליקציה שלכם **מקל על התחזוקה** באפליקציות בקנה מידה גדול. אתם יכולים לשכפל או למחוק תיקיית תכונה (feature) בודדת ללא הנטל המנטלי של סקירת כל בסיס קוד התוכן שלכם. בנוסף, Intlayer היא **בעלת טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

Intlayer היא גם הפתרון עם **הפיתוח הפעיל ביותר** באקוסיסטם של ה-i18n, בעיות נפתרות במהירות, מתאמים לסביבות עבודה חדשות נוספים באופן קבוע, וממשק ה-API המרכזי משתפר ברציפות בהתבסס על משוב מסביבות פרודקשן אמיתיות.

</Accordion>
<Accordion header="סוכני AI">

מיקום משותף (Co-location) של תוכן **מפחית את ההקשר (context) הנדרש** על ידי מודלי שפה גדולים (LLMs). Intlayer מגיעה גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**, ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה עוד יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה לתרגום בצינור ה-CI/CD שלכם באמצעות ה-LLM לבחירתכם בעלות ספק ה-AI שלכם. Intlayer מציעה גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, לצד [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON מסיביים לרכיבים עלול להוביל לבעיות ביצועים ותגובתיות. Intlayer מבצעת אופטימיזציה של טעינת התוכן בזמן ה-build.

</Accordion>
<Accordion header="הרחבה לעבודה עם אנשי צוות שאינם מפתחים">

מעבר להיותה פתרון i18n בלבד, Intlayer מספקת **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)

## אסטרטגיות הגירה

קיימות שתי אסטרטגיות משלימות להגירה מ-`react-i18next` / `i18next` ל-Intlayer:

1. **מתאם תאימות (מומלץ לאפליקציות קיימות)**: התקינו את `@intlayer/react-i18next` (עבור רכיבי React) ו/או את `@intlayer/i18next` (עבור מופע ה-`i18n` המרכזי). חבילות אלו חושפות את **אותו ה-API בדיוק** כמו `react-i18next` / `i18next`, אך מאצילות את כל עבודת התרגום ל-Intlayer מתחת למכסה המנוע. אתם שומרים על קריאות ה-`useTranslation`, `Trans`, `withTranslation`, `i18next.t()` הקיימות שלכם, והשינוי היחיד הוא נתיב הייבוא.

2. **הגירה מלאה**: החלפה הדרגתית של ממשקי ה-API של `react-i18next` ב-hooks הטבעיים של Intlayer (`useIntlayer`, `IntlayerProvider`) ומיקום משותף של תוכן בקובצי `.content.ts` לצד הרכיבים שלכם.

מדריך זה מכסה תחילה את **אסטרטגיה 1** (מתאם תאימות מיידי), ולאחר מכן עובר על ההגירה המלאה האופציונלית.

## תוכן עניינים

<TOC/>

## הגירה מהירה

השלבים הבאים הם המינימום הנדרש כדי להפעיל את אפליקציית ה-`react-i18next` הקיימת שלכם על Intlayer ללא שינויי קוד.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את חבילות הליבה של Intlayer ואת מתאמי התאימות:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> הדגל `--interactive` הוא אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכני AI.

> פקודה זו תזהה את הסביבה שלכם ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> אתם יכולים להשאיר את `react-i18next` ו-`i18next` מותקנות, מתאמי התאימות משתמשים בהן כ-`devDependencies` / `peerDependencies` אופציונליות עבור טיפוסי TypeScript. אינכם צריכים לשנות תלויות ב-`package.json`.

</Step>
<Step number={2} title="הגדרת Intlayer">

הפקודה `intlayer init` יוצרת קובץ `intlayer.config.ts` התחלתי. עדכנו אותו כך שיתאים לשפות הקיימות שלכם והפנו את התוסף `syncJSON` לקובצי ההודעות שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // הוסיפו את כל השפות הקיימות שלכם כאן
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // מתאים לתחביר ה-placeholders של react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** ממפה שפה לנתיב קובץ ה-JSON שלה. **`location`** מורה למנגנון המעקב של Intlayer על איזו תיקייה להשגיח לצורך זיהוי שינויים. האפשרות `format: 'i18next'` מבטיחה שמשתנים כמו `{{name}}` ינותחו בצורה נכונה.

</Step>
<Step number={3} title="הוספת תוסף Intlayer ל-Bundler">

עטפו את תצורת ה-bundler הקיימת שלכם בתוסף התאימות. הוא משלב את תוסף הליבה של Intlayer, מחבר מעקב אחר תוכן, ובאופן קריטי, **מזריק כינויי מודולים** כך שקריאות ה-`import … from 'react-i18next'` (ו-`'i18next'`) הקיימות שלכם מנותבות מחדש באופן שקוף ל-`@intlayer/react-i18next` / `@intlayer/i18next` בזמן ה-build. אין צורך בשינויי קובצי מקור.

**עבור Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` עוטף את התוסף `intlayer()` של `vite-intlayer` ומוסיף את הכינויים `react-i18next` / `i18next`. שימוש בתוסף `intlayer()` הפשוט מ-`vite-intlayer` מהדר מילונים אך **אינו** מוסיף כינויים אלו. במקרה כזה תצטרכו לשנות את שמות הייבואים ל-`@intlayer/*` ידנית (ראו שלב 4).

**עבור Next.js:**

אם אתם משתמשים ב-`next-i18next` (שילוב עם Pages Router), התקינו את `@intlayer/next-i18next` ואת `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

לאחר מכן הוסיפו את תוסף התאימות לקובץ `next.config.ts` שלכם (הוא מזריק את הכינויים עבור `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* האפשרויות שלכם */};

export default withIntlayer(nextConfig);
```

> **אינכם זקוקים יותר ל-`i18next.init()` או לאתחול ידני של provider.** Intlayer מהדרת את כל המילונים ב**זמן ה-build**, כך שאין שלב טעינה בזמן ריצה. ה-provider בעל הכינוי מטפל באתחול עבורכם.

</Step>

</Steps>

זה הכל עבור ההגירה המהירה. האפליקציה שלכם רצה כעת על Intlayer תוך שמירה על כל ייבוא וממשק API של `react-i18next` שלמים.

> **מפתחות תרגום בעלי טיפוסים, באופן אוטומטי.** ברגע ש-Intlayer מהדרת את המילונים שלכם, `useTranslation` ו-`getFixedT` מקבלים טיפוסים מול התוכן האמיתי שלכם. מפתחות מושלמים אוטומטית ב-IDE שלכם ונתיבים שגויים גורמים לשגיאות TypeScript בזמן ה-build, ללא צורך בהגדרה נוספת.
>
> ```tsx
> // 'about' הוא מפתח מילון רשום ← t() מקבלת רק נתיבי נקודה תקינים
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ השלמה אוטומטית
> t("does.not.exist"); // ✗ שגיאת TypeScript
>
> // בצד השרת (מופע i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ עם בדיקת טיפוסים
> ```

## הגירה מלאה

השלבים הבאים הם אופציונליים וניתן לבצע אותם בהדרגה. הם פותחים את מלוא סט התכונות של Intlayer: עורך ויזואלי, CMS, קובצי תוכן עם טיפוסים, תרגום מבוסס AI ועוד.

<Steps>
<Step number={4} title="שינוי שמות ייבוא מפורש (אופציונלי)" isOptional={true}>

תוספי Intlayer כבר מטפלים בכינויים ברמת ה-bundler. אם אתם מעדיפים להפוך את התלות למפורשת בקובצי המקור שלכם, תוכלו לשנות שמות ייבוא ידנית:

| לפני                                               | אחרי                                                         |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

עבור Next.js (`next-i18next`):

| לפני                                                                           | אחרי                                                              |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

</Step>
<Step number={5} title="הפעלת אוטומציית תרגום מבוססת AI" isOptional={true}>

לאחר ש-Intlayer מחוברת, השתמשו ב-CLI שלה כדי להשלים תרגומים חסרים באופן אוטומטי:

```bash packageManager="npm"
# בדיקת תרגומים חסרים (הוסיפו ל-CI)
npx intlayer test

# השלמת תרגומים חסרים באמצעות AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

הוסיפו את תצורת ה-AI לקובץ `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // ברירת מחדל
    // model: "gpt-5.6-terra",   // ברירת מחדל
  },
};

export default config;
```

> עיינו ב[תיעוד ה-CLI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md) עבור כל האפשרויות הזמינות.

- [תיעוד ה-CLI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)

</Step>

</Steps>

## מה ניתן למחוק לאחר ההגירה

לאחר שמתאמי התאימות פועלים, ניתן להסיר את קוד ה-boilerplate הבא של `react-i18next` / `i18next`:

| קובץ / דפוס                            | מדוע אין בו צורך יותר                                                                                                        |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| קריאות `i18next.init()`                | ה-provider של Intlayer מאתחל הכל אוטומטית; אין שלב טעינה בזמן ריצה.                                                          |
| `I18nextProvider` / `initReactI18next` | תוסף Intlayer מטפל בהזרקה ובאתחול מתחת למכסה המנוע.                                                                          |
| חבילות שפה ב-JSON (`locales/*.json`)   | חבילות JSON נחוצות רק אם אתם עדיין משתמשים בתוסף `syncJSON`. לאחר שתהגרו לקובצי `.content.ts`, תוכלו למחוק את תיקיית ה-JSON. |

כאשר תהיו מוכנים להתקדם עוד יותר, Intlayer **מגלה אוטומטית את כל קובצי `.content.ts` ו-`.content.json` בכל מקום בבסיס הקוד שלכם** (כברירת מחדל, בכל מקום בתוך `./src`). תוכלו למקם קובץ `my-component.content.ts` ישירות לצד `MyComponent.tsx` ו-Intlayer תזהה אותו בזמן ה-build ללא הגדרה נוספת, ללא ייבואים, ללא רישום וללא צורך בקובץ אינדקס מרכזי. הדבר הופך את המיקום המשותף של תרגומים עם דפים ורכיבים לחלק לחלוטין.

## הגדרת TypeScript

Intlayer משתמשת ב-module augmentation כדי לספק השלמה אוטומטית (intellisense) מלאה ב-TypeScript עבור מפתחות התרגום שלכם. ודאו שקובץ `tsconfig.json` שלכם כולל את הטיפוסים שנוצרו אוטומטית:

```json5 fileName="tsconfig.json"
{
  // ... תצורות ה-TypeScript הקיימות שלכם
  "include": [
    // ... תצורות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

## הגדרת Git

הוסיפו את התיקייה שנוצרה על ידי Intlayer לקובץ `.gitignore` שלכם:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

## להעמקה נוספת

- [עורך ויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [הרחבת VS Code עבור Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md)
- [Intlayer עם React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)
- [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)
