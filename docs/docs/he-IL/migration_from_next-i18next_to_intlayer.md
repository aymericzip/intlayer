---
createdAt: 2026-06-05
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-next-i18next ל-Intlayer"
description: "הגרו אפליקציית Next.js מ-next-i18next ל-Intlayer שלב אחר שלב, החל ממתאם התאימות @intlayer/next-i18next כך ששום דבר לא יישבר."
keywords:
  - next-i18next
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
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-next-i18next ל-Intlayer

## מדוע להגר מ-next-i18next ל-Intlayer?

<AccordionGroup>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייעת **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות (Maintainability)">

תיחום התוכן של האפליקציה שלכם **מקל על התחזוקה** באפליקציות בקנה מידה גדול. אתם יכולים לשכפל או למחוק תיקיית תכונה (feature) בודדת ללא הנטל המנטלי של סקירת כל בסיס קוד התוכן שלכם. בנוסף, Intlayer היא **בעלת טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

Intlayer היא גם הפתרון עם **הפיתוח הפעיל ביותר** באקוסיסטם של ה-i18n, בעיות נפתרות במהירות, מתאמים לסביבות עבודה חדשות נוספים באופן קבוע, וממשק ה-API המרכזי משתפר ברציפות בהתבסס על משוב מסביבות פרודקשן אמיתיות.

</Accordion>
<Accordion header="סוכני AI">

מיקום משותף (Co-location) של תוכן **מפחית את ההקשר (context) הנדרש** על ידי מודלי שפה גדולים (LLMs). Intlayer מגיעה גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**, ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה עוד יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה לתרגום בצינור ה-CI/CD שלכם באמצעות ה-LLM לבחירתכם בעלות ספק ה-AI שלכם. Intlayer מציעה גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, לצד [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON מסיביים לרכיבים עלול להוביל לבעיות ביצועים ותגובתיות. Intlayer מבצעת אופטימיזציה של טעינת התוכן בזמן ה-build.

</Accordion>
<Accordion header="הרחבה לעבודה עם אנשי צוות שאינם מפתחים">

מעבר להיותה פתרון i18n בלבד, Intlayer מספקת **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באחסון עצמי** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

> כדי להבין מהיכן הגיעו הספריות הללו, קראו את ההיסטוריה של JavaScript i18n.

- [ההיסטוריה של JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/history_of_i18n.md)

## אסטרטגיות הגירה

מכיוון ש-`next-i18next` עוטפת את `react-i18next` ואת `i18next` מתחת למכסה המנוע, ישנן שתי אסטרטגיות משלימות להגירה ל-Intlayer:

1. **מתאם תאימות (מומלץ לאפליקציות קיימות)**: התקינו את `@intlayer/next-i18next`, `@intlayer/react-i18next` ואת `@intlayer/i18next`. חבילות אלו חושפות את **אותו ה-API בדיוק** כמו מקבילותיהן, אך מאצילות את כל עבודת התרגום ל-Intlayer מתחת למכסה המנוע. אתם שומרים על קריאות ה-`useTranslation`, `appWithTranslation`, `serverSideTranslations` הקיימות שלכם, ועל ניתוב ה-Pages ב-Next.js ללא שינוי, השינוי היחיד הוא האתחול.

2. **הגירה מלאה**: החלפה הדרגתית של ממשקי ה-API של `next-i18next` ב-hooks הטבעיים של Intlayer (`useIntlayer`) ומיקום משותף של תוכן בקובצי `.content.ts` לצד הרכיבים שלכם.

מדריך זה מכסה תחילה את **אסטרטגיה 1** (מתאם תאימות מיידי), ולאחר מכן עובר על ההגירה המלאה האופציונלית.

## תוכן עניינים

<TOC/>

## הגירה מהירה

השלבים הבאים הם המינימום הנדרש כדי להפעיל את אפליקציית ال-Pages Router הקיימת שלכם ב-Next.js על Intlayer ללא שינויי קוד בדפים וברכיבים שלכם.

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
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> תוכלו להשאיר בבטחה את `next-i18next`, `react-i18next` ו-`i18next` מותקנות במהלך ההגירה, אם כי תוכלו להסיר אותן לאחר הגדרת הכינויים.

</Step>
<Step number={2} title="הגדרת Intlayer">

הפקודה `intlayer init` יוצרת קובץ `intlayer.config.ts` התחלתי. עדכנו אותו כך שיתאים לשפות הקיימות שלכם והפנו את התוסף `syncJSON` לקובצי ההודעות של `next-i18next` (בדרך כלל בתוך `public/locales`):

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
      // תואם לתחביר ה-placeholders של i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** ממפה שפה ומרחב שמות (`key`) לנתיב קובץ ה-JSON שלו. **`location`** מורה למנגנון המעקב של Intlayer על איזו תיקייה להשגיח לצורך זיהוי שינויים. האפשרות `format: 'i18next'` מבטיחה שמשתנים ינותחו בצורה נכונה עבור `next-i18next`.

</Step>
<Step number={3} title="עדכון תצורת Next.js">

עטפו את קובץ `next.config.ts` (או `.js`) הקיים שלכם ב-`createNextI18nPlugin` מתוך `@intlayer/next-i18next/plugin`. עוטף זה משלב את `withIntlayer` **ומזריק** את הכינויים `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, כך שקריאות ה-`import { useTranslation } from 'next-i18next'` הקיימות שלכם מנותבות מחדש באופן שקוף בזמן ה-build. אין צורך בשינויי קובצי מקור.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// ניתן להסיר את תצורת ה-i18n שיובאה מ-next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer מנהלת את ניתוב ה-i18n של Next.js מתחת למכסה המנוע,
  // כך שאין צורך להעביר את אובייקט ה-i18n לכאן יותר.
};

export default withIntlayer(nextConfig);
```

> **אינכם זקוקים עוד ל-`next-i18next.config.js`.** Intlayer מהדרת את כל המילונים ב**זמן build**, ומטפלת בזיהוי שפה, ניתוב וטעינת מילונים בצורה חלקה.
>
> מעדיפים את `withIntlayer` הפשוט מ-`next-intlayer/server`? הוא מהדר את המילונים שלכם אך **אינו** מוסיף את הכינויים עבור `next-i18next` / `react-i18next` / `i18next`. במקרה כזה תצטרכו לשנות את שמות הייבואים ל-`@intlayer/*` ידנית (ראו שלב 4).

</Step>

</Steps>

זה הכל עבור ההגירה המהירה. אפליקציית ה-Next.js שלכם רצה כעת על Intlayer תוך שמירה על כל קריאות ה-`useTranslation`, `serverSideTranslations` ו-`appWithTranslation` שלמות.

> **מפתחות תרגום בעלי טיפוסים, באופן אוטומטי.** ברגע ש-Intlayer מהדרת את המילונים שלכם, `useTranslation` ו-`getFixedT` מקבלים טיפוסים מול התוכן האמיתי שלכם. מפתחות מושלמים אוטומטית ב-IDE שלכם ונתיבים שגויים גורמים לשגיאות TypeScript בזמן ה-build, ללא צורך בהגדרה נוספת.
>
> ```tsx
> // Pages Router, 'about' הוא מפתח מילון רשום
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ השלמה אוטומטית
> t("does.not.exist"); // ✗ שגיאת TypeScript
>
> // getStaticProps / getServerSideProps (מופע i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ עם בדיקת טיפוסים
> ```

## הגירה מלאה

השלבים הבאים הם אופציונליים וניתן לבצע אותם בהדרגה. הם פותחים את מלוא סט התכונות של Intlayer: עורך ויזואלי, CMS, קובצי תוכן עם טיפוסים, תרגום מבוסס AI ועוד.

<Steps>
<Step number={4} title="שינוי שמות ייבוא מפורש (אופציונלי)" isOptional={true}>

תוסף Intlayer כבר מטפל בכינויים ברמת ה-bundler. אם אתם מעדיפים להפוך את התלות למפורשת בקובצי המקור שלכם, תוכלו לשנות את שמות הייבוא ידנית:

| לפני                                                                           | אחרי                                                              |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

אלו הם **תחליפים ישירים**, אין צורך בשינויים בחתימות הקריאה, בארגומנטים או בטיפוסי ההחזרה.

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

> עיינו ב[תיעוד ה-CLI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md) עבור כל האפשרויות הזמינות.

- [תיעוד ה-CLI של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)

</Step>

</Steps>

## מה ניתן למחוק לאחר ההגירה

לאחר שמתאם התאימות פועל, ניתן להסיר את קוד ה-boilerplate הבא של `next-i18next`:

| קובץ / דפוס                                 | מדוע אין בו צורך יותר                                                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                    | Intlayer מטפלת בניתוב, טעינת מילונים ושפות ברירת מחדל באופן פנימי בהתבסס על `intlayer.config.ts`.                            |
| `next-i18next` מתוך `package.json`          | מוחלפת לחלוטין על ידי `@intlayer/next-i18next` והכינויים.                                                                    |
| חבילות שפה ב-JSON (`public/locales/*.json`) | חבילות JSON נחוצות רק אם אתם עדיין משתמשים בתוסף `syncJSON`. לאחר שתהגרו לקובצי `.content.ts`, תוכלו למחוק את תיקיית ה-JSON. |

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

- [עורך ויזואלי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)
- [הרחבת VS Code עבור Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md)
- [Intlayer עם Next.js (Pages Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_page_router.md)
