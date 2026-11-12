---
createdAt: 2026-06-05
updatedAt: 2026-11-03
priority: 7
title: "הגירה מ-@nuxtjs/i18n ל-Intlayer"
description: "הגרו אפליקציית Nuxt מ-@nuxtjs/i18n ל-Intlayer שלב אחר שלב, החל ממתאם התאימות @intlayer/vue-i18n כך ששום דבר לא יישבר."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - הגירה
  - בינאום
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "אתחול היסטוריה"
author: aymericzip
---

# הגירה מ-@nuxtjs/i18n ל-Intlayer

## מדוע להגר מ-@nuxtjs/i18n ל-Intlayer?

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

מכיוון ש-`@nuxtjs/i18n` מופעלת על ידי `vue-i18n` מתחת למכסה המנוע, קיימות שתי אסטרטגיות משלימות להגירה ל-Intlayer:

1. **מתאם תאימות (מומלץ לאפליקציות קיימות)**: התקינו את `@intlayer/vue-i18n` ואת `nuxt-intlayer`. שילוב זה חושף את **אותו ה-API בדיוק** כמו `vue-i18n` אך מאציל את כל עבודת התרגום ל-Intlayer מתחת למכסה המנוע. אתם שומרים על `$t`, `useI18n()` ועל ניתוב ה-Nuxt הקיימים שלכם ללא שינוי, השינוי היחיד הוא האתחול.

2. **הגירה מלאה**: החלפה הדרגתית של ממשקי ה-API של `@nuxtjs/i18n` ב-hooks הטבעיים של Intlayer (`useIntlayer`) ומיקום משותף של תוכן בקובצי `.content.ts` לצד הרכיבים שלכם.

מדריך זה מכסה תחילה את **אסטרטגיה 1** (מתאם תאימות מיידי), ולאחר מכן עובר על ההגירה המלאה האופציונלית.

## תוכן עניינים

<TOC/>

## הגירה מהירה

השלבים הבאים הם המינימום הנדרש כדי להפעיל את אפליקציית ה-Nuxt הקיימת שלכם על Intlayer ללא שינויי קוד ברכיבים שלכם.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את חבילות הליבה של Intlayer ואת מתאם התאימות:

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
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> תוכלו להשאיר בבטחה את `@nuxtjs/i18n` מותקנת במהלך ההגירה, אם כי תסירו אותה מתצורת ה-Nuxt שלכם בקרוב.

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
      // מתאים לתחביר ה-placeholders של vue-i18n: {name}
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** ממפה שפה לנתיב קובץ ה-JSON שלה. **`location`** מורה למנגנון המעקב של Intlayer על איזו תיקייה להשגיח לצורך זיהוי שינויים. האפשרות `format: 'vue-i18n'` מבטיחה שמשתנים ינותחו בצורה נכונה עבור `vue-i18n`.

</Step>
<Step number={3} title="עדכון תצורת Nuxt">

החליפו את המודול `@nuxtjs/i18n` ב-`nuxt-intlayer` ב-`nuxt.config.ts` שלכם. תוסף Intlayer מזריק אוטומטית כינויי מודולים, כלומר קריאות ה-`import { useI18n } from 'vue-i18n'` הקיימות שלכם מנותבות מחדש באופן שקוף ל-`@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // הסירו את '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **אינכם צריכים עוד להגדיר אובייקטי תצורה של Nuxt i18n.** Intlayer מהדרת את כל המילונים ב**זמן ה-build**, ומטפלת בזיהוי שפה, ניתוב וטעינת מילונים בצורה חלקה.

</Step>

</Steps>

זה הכל עבור ההגירה המהירה. אפליקציית ה-Nuxt שלכם רצה כעת על Intlayer תוך שמירה על כל `$t` ו-`useI18n()` שלמים.

## הגירה מלאה

השלבים הבאים הם אופציונליים וניתן לבצע אותם בהדרגה. הם פותחים את מלוא סט התכונות של Intlayer: עורך ויזואלי, CMS, קובצי תוכן עם טיפוסים, תרגום מבוסס AI ועוד.

<Steps>
<Step number={4} title="שינוי שמות ייבוא מפורש (אופציונלי)" isOptional={true}>

תוספי Intlayer כבר מטפלים בכינויים ברמת ה-bundler. אם אתם מעדיפים להפוך את התלות למפורשת בקובצי המקור שלכם, תוכלו לשנות שמות ייבוא ידנית:

| לפני                                 | אחרי                                           |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

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
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

לאחר שמתאם התאימות פועל, ניתן להסיר את קוד ה-boilerplate הבא:

| קובץ / דפוס                          | מדוע אין בו צורך יותר                                                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| תצורות `i18n` ב-`nuxt.config.ts`     | Intlayer מטפלת בניתוב, טעינת מילונים ושפות ברירת מחדל באופן פנימי.                                                           |
| `@nuxtjs/i18n` מתוך `package.json`   | מוחלפת לחלוטין על ידי `nuxt-intlayer`.                                                                                       |
| חבילות שפה ב-JSON (`locales/*.json`) | חבילות JSON נחוצות רק אם אתם עדיין משתמשים בתוסף `syncJSON`. לאחר שתהגרו לקובצי `.content.ts`, תוכלו למחוק את תיקיית ה-JSON. |

כאשר תהיו מוכנים להתקדם עוד יותר, Intlayer **מגלה אוטומטית את כל קובצי `.content.ts` ו-`.content.json` בכל מקום בבסיס הקוד שלכם** (כברירת מחדל, בכל מקום בתוך `./src`). תוכלו למקם קובץ `my-component.content.ts` ישירות לצד `MyComponent.vue` ו-Intlayer תזהה אותו בזמן ה-build ללא הגדרה נוספת, ללא ייבואים, ללא רישום וללא צורך בקובץ אינדקס מרכזי. הדבר הופך את המיקום המשותף של תרגומים עם דפים ורכיבים לחלק לחלוטין.

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
- [Intlayer עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nuxt.md)
- [Intlayer עם Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+vue.md)
