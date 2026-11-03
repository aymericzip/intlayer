---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 10
title: "מדריך התחלה עם Intlayer: בינאום (i18n) עבור כל Framework"
description: גלו כיצד Intlayer פועל. ראו את השלבים ש-Intlayer מבצע באפליקציה שלכם ומה תפקידן של החבילות השונות.
keywords:
  - מבוא
  - תחילת עבודה
  - Intlayer
  - אפליקציה
  - חבילות
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריית גרסאות ראשונית"
author: aymericzip
---

# תיעוד Intlayer

ברוכים הבאים לתיעוד הרשמי של Intlayer! כאן תמצאו את כל מה שדרוש כדי לשלב, להגדיר ולשלוט ב-Intlayer עבור כל צורכי הבינאום (i18n) שלכם, בין אם אתם עובדים עם Next.js, React, Vite, Express או כל סביבת JavaScript אחרת.

## מבוא

### מה זה Intlayer?

**Intlayer** היא ספריית בינאום (internationalization) שתוכננה במיוחד עבור מפתחי JavaScript. היא מאפשרת להגדיר את התוכן שלכם ישירות בכל מקום בקוד. היא ממירה הצהרות תוכן רב-לשוני למילונים מובנים המשתלבים בקלות בקוד שלכם. באמצעות TypeScript, **Intlayer** הופכת את הפיתוח שלכם לבטוח, חזק ויעיל יותר.

Intlayer מספקת בנוסף עורך חזותי אופציונלי המאפשר לערוך ולנהל את התוכן שלכם בקלות. עורך זה שימושי במיוחד עבור מפתחים המעדיפים ממשק ויזואלי לניהול תוכן, או עבור צוותים המייצרים תוכן מבלי לדאוג לקוד.

### דוגמת שימוש

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      he: "שלום עולם",
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "he": "שלום עולם",
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `next-intl` או `i18next`, ‏Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="גודל ה-Bundle">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנחוץ. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

הגבלת היקף התוכן (scoping) ברמת הרכיב **מפשטת את התחזוקה** באפליקציות בקנה מידה גדול. ניתן לשכפל או למחוק תיקיית פיצ'ר אחת מבלי הנטל המנטלי של סקירת כל בסיס קוד התוכן שלכם. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את תקינות התוכן שלכם.

</Accordion>
<Accordion header="סוכני AI">

מיקום תוכן בסמוך לקוד (co-location) **מפחית את ההקשר הדרוש** למודלי שפה גדולים (LLMs). Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**, ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה כדי לתרגם בתוך תהליך ה-CI/CD שלכם באמצעות ה-LLM המועדף עליכם בעלות ישירה מול ספק ה-AI שלכם. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON עצומים לרכיבים עלול להוביל לבעיות ביצועים ותגובתיות (reactivity). Intlayer מבצע אופטימיזציה לטעינת התוכן שלכם בזמן הבנייה (build time).

</Accordion>
<Accordion header="הרחבת העבודה לאנשי תוכן שאינם מפתחים">

יותר מסתם פתרון i18n,‏ Intlayer מספק **[עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באירוח עצמי (self-hosted)** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק ופשוט. ניתן לשמור תוכן מקומית ו/או מרחוק.

- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## תכונות מרכזיות

Intlayer מציע מגוון תכונות המותאמות לצרכים של פיתוח ווב מודרני. להלן התכונות העיקריות, לצד קישורים לתיעוד מפורט עבור כל אחת מהן:

- **תמיכה בבינאום**: הרחיבו את התפוצה הגלובלית של האפליקציה שלכם עם תמיכה מובנית בבינאום.
- **עורך ויזואלי**: שפרו את זרימת העבודה של הפיתוח עם תוספי עורך ייעודיים עבור Intlayer. עיינו ב[מדריך לעורך הוויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md).
- **גמישות בהגדרות**: התאימו אישית את ההגדרות שלכם עם אפשרויות קונפיגורציה נרחבות המפורטות ב[מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).
- **כלי CLI מתקדמים**: נהלו את הפרויקטים שלכם ביעילות באמצעות ממשק שורת הפקודה של Intlayer. חקרו את היכולות ב[תיעוד כלי ה-CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

## מושגי ליבה

### מילון (Dictionary)

ארגנו את התוכן הרב-לשוני שלכם בסמוך לקוד כדי לשמור על עקביות ותחזוקתיות קלה.

- **[מדריך התחלה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)**  
  למדו את היסודות להגדרת התוכן שלכם ב-Intlayer.

- **[תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/translation.md)**  
  הבינו כיצד תרגומים נוצרים, נשמרים ומשמשים באפליקציה שלכם.

- **[ספירה (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/enumeration.md)**  
  נהלו בקלות סטים קבועים או חוזרים של נתונים בשפות שונות (למשל צורות רבים).

- **[תנאי (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/condition.md)**  
  למדו כיצד להשתמש בלוגיקה מותנית ב-Intlayer ליצירת תוכן דינמי.

- **[הטמעה (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)**  
  גלו כיצד להטמיע ערכים בתוך מחרוזות באמצעות מצייני מיקום (placeholders).

- **[שליפת פונקציה (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/function_fetching.md)**  
  ראו כיצד לשלוף תוכן באופן דינמי עם לוגיקה מותאמת אישית שתואמת את זרימת העבודה של הפרויקט שלכם.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)**  
  למדו כיצד להשתמש ב-Markdown ב-Intlayer כדי ליצור תוכן עשיר.

- **[הטמעת קבצים (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/file.md)**  
  גלו כיצד להטמיע קבצים חיצוניים ב-Intlayer כדי להשתמש בהם בעורך התוכן.

- **[קינון (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/nesting.md)**  
  הבינו כיצד לקנן תוכן ב-Intlayer כדי ליצור מבנים מורכבים.

### סביבות ואינטגרציות

בנינו את Intlayer מתוך מחשבה על גמישות, והוא מציע אינטגרציה חלקה עם ספריות ו-frameworks מובילים וכלי build פופולריים:

- [Intlayer עם Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_16.md)
- [Intlayer עם Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_15.md)
- [Intlayer עם Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_14.md)
- [Intlayer עם Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nextjs_page_router.md)
- [Intlayer עם Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_tanstack.md)
- [Intlayer עם Tanstack Start + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_tanstack+solid.md)
- [Intlayer עם Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+react.md)
- [Intlayer עם React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_react_router_v7.md)
- [Intlayer עם Remix 3](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_remix_3.md)
- [Intlayer עם React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_create_react_app.md)
- [Intlayer עם React Native ו-Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_react_native+expo.md)
- [Intlayer עם Lynx ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_lynx+react.md)
- [Intlayer עם Astro](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_astro.md)
- [Intlayer עם Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_astro_react.md)
- [Intlayer עם Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_astro_vue.md)
- [Intlayer עם Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_astro_svelte.md)
- [Intlayer עם Astro + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_astro_solid.md)
- [Intlayer עם Astro + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_astro_preact.md)
- [Intlayer עם Astro + Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_astro_lit.md)
- [Intlayer עם Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+vue.md)
- [Intlayer עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nuxt.md)
- [Intlayer עם Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+svelte.md)
- [Intlayer עם SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_svelte_kit.md)
- [Intlayer עם Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+solid.md)
- [Intlayer עם SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_solid_start.md)
- [Intlayer עם Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+preact.md)
- [Intlayer עם Angular 22](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_angular_21.md)
- [Intlayer עם Angular 19](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_angular_19.md)
- [Intlayer עם Analog](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_analog.md)
- [Intlayer עם Vite + Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+lit.md)
- [Intlayer עם Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vite+vanilla.md)
- [Intlayer עם Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_vanilla.md)
- [Intlayer עם htmx](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_htmx.md)
- [Intlayer עם Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_express.md)
- [Intlayer עם NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_nestjs.md)
- [Intlayer עם Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_fastify.md)
- [Intlayer עם Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_hono.md)
- [Intlayer עם AdonisJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_adonisjs.md)
- [Intlayer עם Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_elysia.md)
- [Intlayer עם Storybook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_with_storybook.md)
- [Intlayer עם next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/intlayer_with_next-intl.md)
- [Intlayer עם next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/intlayer_with_next-i18next.md)

כל מדריך אינטגרציה כולל שיטות עבודה מומלצות (best practices) לשימוש בתכונות של Intlayer, כמו **server-side rendering**, **dynamic routing**, או **client-side rendering**, כך שתוכלו לשמור על אפליקציה מהירה, מותאמת ל-SEO ובעלת יכולת גדילה גבוהה.

## תרומה ומשוב

אנו מעריכים את כוחם של קוד פתוח ופיתוח מונע-קהילה. אם תרצו להציע שיפורים, להוסיף מדריך חדש או לתקן בעיות כלשהן בתיעוד שלנו, אתם מוזמנים להגיש Pull Request או לפתוח issue ב-[מאגר ה-GitHub שלנו](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**מוכנים לתרגם את האפליקציה שלכם מהר יותר וביעילות רבה יותר?** צללו לתוך התיעוד שלנו והתחילו להשתמש ב-Intlayer עוד היום. התנסו בגישה חזקה וממוקדת לבינאום ששומרת על התוכן שלכם מאורגן ועל הצוות שלכם פרודוקטיבי יותר.

## שאלות נפוצות

<FAQ>

<Question title="למה משמש Intlayer?">

Intlayer היא ספריית בינאום (i18n) עבור אפליקציות JavaScript ו-TypeScript. אתם מגדירים את תוכן הרכיב בצמוד לאותו רכיב בקובץ `.content.ts`,‏ Intlayer מהדר את ההצהרות הללו למילונים בעלי טיפוסיות (typed) בזמן הבנייה, והרכיבים שלכם קוראים אותם דרך hook כגון `useIntlayer`. הספרייה מכסה תרגום, חוקי רבים (plural), מגדר, Markdown, ניתוב מודע לשפה, מטא-דאטה עבור SEO, תרגום בסיוע AI ועורך ויזואלי עבור מי שאינם מפתחים.

</Question>
<Question title="כמה i18n מוסיף לגודל ה-bundle שלי?">

הרבה פחות מאשר הגדרה המבוססת על namespaces, מכיוון שדף אינו מוריד לעולם קטלוג שאינו מרונדר בו. תוכן מרונדר בצד שרת (SSR) פותר את התוכן שלו בשרת, והמהדר בזמן הבנייה מחליף קריאות `useIntlayer` בערכי המילון המדויקים שבהם הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש מושמטים. [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה (locale). בהשוואה לחלופות המקובלות, Intlayer מפחית את גודל ה-bundle וגודל הדף בעד 50%. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) ואת ה-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md)

</Question>
<Question title="האם ניתן להגר מ-`i18next`,‏ `next-intl` או `react-i18next` מבלי לשכתב את הרכיבים שלי?">

כן, וישנם שני מסלולים. ניתן להגר את התוכן באופן הדרגתי באמצעות [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md) או [מדריך ההגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הנוכחי שלכם לחלוטין: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md) חושפים בדיוק את אותו ה-API כמו `i18next`,‏ `react-i18next`,‏ `next-intl`,‏ `next-i18next`,‏ `react-intl`,‏ `use-intl`,‏ `vue-i18n` ו-`Lingui`, אך מופעלים על ידי מילוני Intlayer, כך שרק ה-imports משתנים וקוד הרכיב נשאר ללא שינוי.

- [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_i18next_to_intlayer.md)
- [מדריך ההגירה מ-next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_next-intl_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md)

</Question>
<Question title="האם ניתן לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. ה-[תוסף לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלכם כמקור האמת (source of truth) ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ יחיד.

- [תוסף לסנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף לסנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, ישלוף את המחרוזות הפונות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לבדוק diff במקום להעתיק מחרוזות לקטלוג אחת אחת. עיינו ב[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

עבור צינור אוטומטי לחלוטין, ה-[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) מבצע את אותה פעולה בזמן הבנייה על קוד מקור של JSX, TSX, Vue ו-Svelte, ומייצר את המילונים בכל שינוי כך שאין מפתחות לתחזק ידנית. הוא פועל באמצעות ניתוח סטטי (static analysis), ולכן מחרוזות שקיימות רק בזמן ריצה נותרות מחוץ להישג ידו, והוא דורש מעט הערות (annotations) כדי להבדיל בין טקסט הפונה למשתמש לבין לוגיקת אפליקציה.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

</Question>
<Question title="אילו כלי עורך וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: קפיצה ישירה ממפתח ב-`useIntlayer` אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות (command palette) או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם go to definition, חיפוש כל ההפניות (find all references), תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, והתרעה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שמסייע בזמן תהליך ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer עבור Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר יכול לענות מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: מיומנויות ממוקדות כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת מיומנות ייעודית לכל framework, המלמדות סוכן על תצורת הניתוב שלכם ועל סוגי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: כלל `no-raw-text` מתריע על מחרוזות מוטמעות בקוד (hardcoded), עם כללים נוספים למפתחות מילון סטטיים ולתוכן שאינו בשימוש.

</Question>
<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית JavaScript?">

התחום נחלק לשלושה דורות:

- **ספריות קטלוג בזמן ריצה (Runtime catalog libraries)**: `i18next`,‏ `react-i18next`,‏ `next-i18next`,‏ `vue-i18n`,‏ `ngx-translate`. הודעות שמורות ב-namespaces של JSON הנטענים בזמן ריצה. פתרונות בוגרים ובלתי תלויים ב-framework, אך חסרי טיפוסיות ונשלחים במלואם ללקוח.
- **ספריות הודעות בזמן הידור (Compile time message libraries)**: `Lingui`,‏ `Paraglide`,‏ `react-intl` ו-`next-intl` עם שלב חילוץ (extraction). התנהגות bundle טובה יותר ומידה מסוימת של טיפוסיות, אך עדיין קטלוגים מרוכזים.
- **ספריות שכבת תוכן (Content layer libraries)**: `Intlayer`. התוכן מוגדר לפי רכיב ומהודר לפי רכיב, כך שטיפוסיות (typing), ניפוי קוד מת (tree shaking), כלים ועריכה מגיעים כולם מאותו המקור.

ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md) להשוואה מפורטת, ואת ה-[benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md) עבור נתוני גודל bundle וביצועים מדודים.

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)
- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md)

</Question>
<Question title="באילו frameworks תומך Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Remix, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro עם כל ארכיטקטורת איים (islands),‏ React Native עם Expo, Lynx, ובצד השרת Express, Fastify, NestJS, Hono, Elysia ו-AdonisJS. לכל אחד מהם יש מדריך ייעודי תחת [סביבות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/introduction.md).

- [סביבות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/introduction.md)

</Question>
<Question title="מדוע להגדיר תוכן לצד הרכיב במקום בקובץ JSON מרכזי?">

שלוש סיבות. דף שולח רק את הערכים שהרכיבים שלו מרנדרים, במקום namespace שלם, וזה מה שמפחית את גודל ה-bundle. ניתן להעתיק או למחוק תיקיית פיצ'ר כיחידה אחת, מבלי לחפש מפתחות יתומים בקטלוג משותף. בנוסף, מודל שפה (LLM) או סוכן העורך רכיב רואה את התוכן שלו באותה התיקייה, וזו הסיבה שמיקום משותף (co-location) הופך עבודה בסיוע AI לאמינה במיוחד. ראו [כיצד Intlayer עובד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/how_works_intlayer.md).

- [כיצד Intlayer עובד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/how_works_intlayer.md)

</Question>
<Question title="כיצד אוכל לתרגם את האפליקציה שלי באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`. ה-CLI מזהה תרגומים חסרים וממלא אותם באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, כך שאתם משלמים ישירות לספק ה-AI. הדגל `--git-diff` מגביל את הריצה לתוכן שהשתנה בענף, מה ששומר על עלויות נמוכות ב-CI. עיינו ב[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) וב[שילוב ב-CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [שילוב ב-CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="כיצד אוכל למצוא תרגומים חסרים?">

הריצו `npx intlayer test`. הפקודה נכשלת כאשר חסר תוכן עבור שפה מוצהרת, וכך מחרוזת לא מתורגמת לעולם לא תגיע לסביבת הייצור (production). ה-[תוסף ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md) מציג את אותן השגיאות ישירות בקוד, וה-[תוסף ל-ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md) מסמן מחרוזות מקודדות (hardcoded) בעזרת כלל `no-raw-text`. ראו [בדיקת התוכן שלכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/testing.md).

- [תוסף ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)
- [תוסף ל-ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)
- [בדיקת התוכן שלכם](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/testing.md)

</Question>
<Question title="האם עליי לכלול את השפה (locale) בתוך ה-URL?">

לא. האפשרות `routing.mode` מקבלת `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`),‏ `"prefix-all"`,‏ `"no-prefix"` ו-`"search-params"`, וההגדרה `routing.domains` ממפה כל שפה לדומיין משלה. לא משנה באיזו תצורה תבחרו, הפונקציה `getMultilingualUrls` בונה את חלופות ה-`hreflang` עבור המטא-דאטה ומפת האתר (sitemap) שלכם. עיינו ב[מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Question>
<Question title="כיצד מתרגמים ועורכי תוכן יכולים לעבוד מבלי לגעת בקוד?">

ה-[עורך הוויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) רץ על התשתית שלכם ומאפשר לכל אחד ללחוץ על הטקסט באפליקציה הפועלת כדי לערוך אותו, תוך כתיבת השינוי ישירות בחזרה לבסיס הקוד. ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) מוציא את התוכן החוצה כך שיוכל להשתנות ללא צורך ב-deployment, כאשר [סנכרון חי (live sync)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/live.md) מחיל את העדכונים בזמן ריצה.

- [עורך הוויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)
- [סנכרון חי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/live.md)

</Question>
<Question title="האם Intlayer הוא חינמי ובקוד פתוח?">

כן. Intlayer הוא פרויקט קוד פתוח תחת רישיון Apache 2.0, והספרייה, ה-CLI, המהדר והעורך הוויזואלי חופשיים לשימוש, כולל בפרויקטים מסחריים. ה-CMS המנוהל (hosted) הוא שירות אופציונלי בתשלום, וניתן גם [לארח אותו עצמאית (self-hosted)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)

</Question>

</FAQ>
