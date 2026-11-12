---
createdAt: 2026-06-05
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-next-intl ל-Intlayer"
description: "הגרו אפליקציית Next.js מ-next-intl ל-Intlayer שלב אחר שלב, החל ממתאם התאימות @intlayer/next-intl כך ששום דבר לא יישבר."
keywords:
  - next-intl
  - intlayer
  - הגירה
  - בינאום
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-next-intl ל-Intlayer

## מדוע להגר מ-next-intl ל-Intlayer?

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

## אסטרטגיית הגירה

הגישה המומלצת עבור אפליקציות קיימות היא **מתאם התאימות (compat adapter)**: התקינו את `@intlayer/next-intl`, החושף את **אותו ה-API בדיוק** כמו `next-intl`, אך מאציל את כל עבודת התרגום ל-Intlayer מתחת למכסה המנוע.

אתם שומרים על קריאות ה-`useTranslations`, `getTranslations`, `NextIntlClientProvider` וכדומה הקיימות שלכם, **והשינוי היחיד הוא נתיב הייבוא**. אין צורך בשכתוב חתימות קריאה, מבני props או מבנה רכיבים.

עם הזמן תוכלו להגר קבצים בודדים באופן אופציונלי לפורמט ה-`.content.ts` העשיר יותר של Intlayer כדי לפתוח את העורך הויזואלי, ה-CMS ותיחום התוכן לכל רכיב, אך שלב זה הוא אופציונלי לחלוטין וניתן לביצוע הדרגתי.

## תוכן עניינים

<TOC/>

## הגירה מהירה

השלבים הבאים הם המינימום הנדרש כדי להפעיל את אפליקציית ה-`next-intl` הקיימת שלכם על Intlayer ללא שינויי קוד.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את חבילות הליבה של Intlayer ואת מתאם התאימות `@intlayer/next-intl`:

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> השאירו את `next-intl` מותקנת. היא עדיין נדרשת עבור **ניתוב כתובות URL** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). מתאם התאימות **אינו** מחליף את שכבת הניתוב.

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
      // 'icu' מתאים לתחביר ה-placeholders של ICU ב-next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** ממפה שפה לנתיב קובץ ה-JSON שלה. **`location`** מורה למנגנון המעקב של Intlayer על איזו תיקייה להשגיח לצורך זיהוי שינויים. האפשרות `format: 'icu'` מבטיחה שמשתני ICU כגון `{name}` ו-`{count, plural, one {# item} other {# items}}` ינותחו בצורה נכונה.

> לרשימה המלאה של אפשרויות התצורה, ראו את [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="הוספת תוסף Intlayer ל-Next.js">

עטפו את תצורת ה-Next.js הקיימת שלכם ב-`createNextIntlPlugin` מתוך `@intlayer/next-intl/plugin`. עוטף זה משלב את `withIntlayer` **ורושם** את הכינויים `next-intl` → `@intlayer/next-intl` עבורכם:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* אפשרויות התצורה הקיימות שלכם */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` עוטף את `withIntlayer`, מזהה אוטומטית את **Webpack** או **Turbopack**, מחבר מעקב אחר תוכן, הידור מילונים, ובאופן קריטי, **מזריק כינויי מודולים** כך שקריאות ה-`import … from 'next-intl'` הקיימות שלכם מנותבות מחדש באופן שקוף ל-`@intlayer/next-intl` בזמן ה-build. נקודת הכניסה לניתוב `next-intl/routing` נשארת מופנית לחבילה האמיתית. אין צורך בשינויים בקובצי מקור.
>
> מעדיפים את `withIntlayer` הפשוט מ-`next-intlayer/server`? הוא יהדר את המילונים שלכם, אך **אינו** מוסיף את הכינויים של `next-intl`. במקרה כזה תצטרכו לשנות את שמות הייבואים ל-`@intlayer/next-intl` ידנית (ראו שלב 4).

> **אינכם צריכים עוד את `getRequestConfig` או `loadMessages`.** עם `next-intl`, נאלצתם לכתוב קובץ `src/i18n.ts` שטען חבילות הודעות JSON בכל בקשה באמצעות `getRequestConfig`. Intlayer מהדרת את כל המילונים ב**זמן ה-build**, כך שאין שלב טעינה בזמן ריצה. תוכלו למחוק קובץ זה לחלוטין (או לשמור רק את חלקי הניתוב אם אתם עדיין משתמשים ב-`createNavigation`).

</Step>

</Steps>

זה הכל עבור ההגירה המהירה. האפליקציה שלכם רצה כעת על Intlayer תוך שמירה על כל ייבוא וממשק API של `next-intl` ללא שינוי.

> **מפתחות תרגום בעלי טיפוסים, באופן אוטומטי.** ברגע ש-Intlayer מהדרת את המילונים שלכם, `useTranslations` ו-`getTranslations` מקבלים טיפוסים מול התוכן האמיתי שלכם. מפתחות מושלמים אוטומטית ב-IDE שלכם ונתיבים שגויים גורמים לשגיאות TypeScript בזמן ה-build, ללא צורך בהגדרה נוספת.
>
> ```tsx
> // רכיב Client, 'about' הוא מפתח מילון רשום
> const t = useTranslations("about");
> t("counter.label"); // ✓ השלמה אוטומטית
> t("does.not.exist"); // ✗ שגיאת TypeScript
>
> // רכיב Server
> const t = await getTranslations("about");
> t("counter.label"); // ✓ עם בדיקת טיפוסים
> ```

## הגירה מלאה

השלבים הבאים הם אופציונליים וניתן לבצע אותם בהדרגה. הם פותחים את מלוא סט התכונות של Intlayer: עורך ויזואלי, CMS, קובצי תוכן עם טיפוסים, תרגום מבוסס AI ועוד.

<Steps>
<Step number={4} title="שינוי שמות ייבוא מפורש (אופציונלי)" isOptional={true}>

העוטף `createNextIntlPlugin()` כבר מטפל בכינוי `next-intl` → `@intlayer/next-intl` ברמת ה-bundler. אם אתם מעדיפים להפוך את התלות למפורשת בקובצי המקור שלכם (ולהשתמש בתוסף `withIntlayer` הפשוט במקום זאת), תוכלו לשנות שמות ייבוא ידנית:

| לפני                                                 | אחרי                                                           |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> שמרו תמיד על ייבואי ניתוב מ-`next-intl` האמיתית, מתאם התאימות **אינו** מחליף את שכבת ניתוב ה-URL:
>
> ```ts
> // ✅ שמרו תמיד ייבואים אלו מ-'next-intl' המקורית
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> לחלופין, תוכלו להשתמש ב-`defineRouting` מתוך `@intlayer/next-intl/routing` אשר ממזג הגדרות שפה מ-`intlayer.config.ts` שלכם באופן אוטומטי.

</Step>
<Step number={5} title="הפעלת אוטומציית תרגום מבוססת AI" isOptional={true}>

לאחר ש-Intlayer מחוברת, תוכלו להשתמש ב-CLI שלה כדי להשלים תרגומים חסרים באופן אוטומטי באמצעות ה-LLM לבחירתכם:

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

הוסיפו `OPENAI_API_KEY` (או את מפתח הספק המועדף עליכם) לקובץ ה-`.env` שלכם, ולאחר מכן הרחיבו את `intlayer.config.ts`:

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
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

לאחר ש-`@intlayer/next-intl` פועלת, ניתן להסיר את קוד ה-boilerplate הבא של `next-intl`:

| קובץ / דפוס                                       | מדוע אין בו צורך יותר                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `src/i18n.ts` → ייצוא `getRequestConfig`          | Intlayer מהדרת מילונים בזמן build; אין טעינת הודעות לכל בקשה. שמרו את הקובץ רק אם הוא מייצא גם פונקציות ניתוב של `createNavigation`. |
| קריאת `loadMessages()` / `getMessages()` ב-layout | ה-`NextIntlClientProvider` מ-`@intlayer/next-intl` קורא מהפלט המהודר; אין צורך ב-prop של `messages`.                                 |
| ייבואי `locales/{locale}/*.json` ב-layout         | חבילות JSON נחוצות רק אם אתם עדיין משתמשים בתוסף `syncJSON`. לאחר שתהגרו לקובצי `.content.ts`, תוכלו למחוק את תיקיית ה-JSON.         |

כאשר תהיו מוכנים להתקדם עוד יותר, Intlayer **מגלה אוטומטית את כל קובצי `.content.ts` ו-`.content.json` בכל מקום בבסיס הקוד שלכם** (כברירת מחדל, בכל מקום בתוך `./src`). תוכלו למקם קובץ `about.content.ts` ישירות לצד `about/page.tsx` ו-Intlayer תזהה אותו בזמן ה-build ללא הגדרה נוספת, ללא ייבואים, ללא רישום וללא צורך בקובץ אינדקס מרכזי. הדבר הופך את המיקום המשותף של תרגומים עם דפים ורכיבים לחלק לחלוטין.

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
- [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md)
