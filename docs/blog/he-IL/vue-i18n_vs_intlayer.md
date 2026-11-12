---
createdAt: 2024-08-11
updatedAt: 2026-11-03
priority: 8
title: "vue-i18n מול Intlayer: מבחן ביצועים והשוואה לשנת 2026"
description: "מדידת vue-i18n ו-Intlayer באותה אפליקציית Vite + Vue 3: גודל ספרייה, JavaScript לכל דף, דליפת נתונים, גודל רכיבים ותגובתיות בהחלפת שפה."
keywords:
  - vue-i18n
  - Intlayer
  - בינאום
  - Internationalization
  - i18n
  - ביצועים
  - Benchmark
  - גודל חבילה
  - Bundle size
  - בלוג
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n מול Intlayer

`vue-i18n` היא ספריית ה-i18n המקובלת בעולם ה-Vue. לעומתה, Intlayer היא חלופה מבוססת קומפיילר עם תיחום לפי-רכיב ואינטגרציה ייעודית ל-Vue (`vue-intlayer`). מאמר זה בוחן מה כל אחת עולה לחבילה לאחר בניית האפליקציה.

הנתונים לקוחים מתוך [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), סוויטת קוד פתוח הבונה את אותה אפליקציה בדיוק בכל אחת מהספריות ומודדת מה הדפדפן מוריד ומבצע בפועל.

<TOC/>

> **בקצרה**: באותה אפליקציית Vite + Vue 3, ספריית `vue-i18n` שולחת **134.9 KB** של JavaScript ב-gzip לכל דף, לעומת **41.3 KB** לאפליקציה ללא i18n. לעומתה, Intlayer שולחת **57.1 KB**. זמן הריצה (runtime) של `vue-i18n` בלבד שוקל **24.3 KB ב-gzip** (פי 6 מ-3.9 KB של Intlayer), כל דף נושא **90% מחרוזות מדפים זרים**, ורכיב שקומפל בנפרד גורר **196 KB** מכיוון שהוא קשור לעץ ההודעות הגלובלי. מתאם `@intlayer/vue-i18n` שומר על ה-API של `vue-i18n` והגיע ל-**47.0 KB** לכל דף.

## בקצרה

- **vue-i18n**: ספריית ה-i18n הסטנדרטית עבור Vue 2 / Vue 3 והליבה של `@nuxtjs/i18n`. הודעות בסגנון ICU, בלוקי `<i18n>` ב-SFC, הוראת `v-t`, מעצבי `d()` ו-`n()`, ואקוסיסטם עצום. הודעות נרשמות על גבי מופע גלובלי ב-`createI18n()`; טעינה עצלה לכל שפה מתבצעת ידנית באמצעות `setLocaleMessage()`, ופיצול לפי נתיב מוטל כולו על המפתח.
- **Intlayer**: מודל תוכן ממוקד-רכיבים. מילוני `.content.ts` יושבים בצמוד לרכיב שהם משרתים, קומפיילר בזמן בנייה (`vite-intlayer`) מבצע tree-shaking וטעינה עצלה לפי רכיב ולפי שפה, טיפוסי TypeScript קפדניים נוצרים ישירות מתוך התוכן, ותרגומים חסרים מכשילים את הבנייה. כוללת כלי עזר לניתוב ול-SEO, עורך ויזואלי / CMS מובנה ותרגום בסיוע AI.

| ספרייה                | כוכבי GitHub                                                                                                                                                                   | סך Commits                                                                                                                                                                         | Commit אחרון                                                                                                                                        | גרסה ראשונה | גרסת NPM                                                                                                    | הורדות NPM                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | אפריל 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | דצמבר 2016  | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> התגים מתעדכנים באופן אוטומטי. הנתונים עשויים להשתנות לאורך הזמן.

## השוואת תכונות ראש בראש

| תכונה                                         | `vue-intlayer` (Intlayer)                                         | `vue-i18n`                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **תרגומים בצמוד לרכיבים**                     | ✅ כן, `.content.ts` ממוקם לצד כל רכיב                            | ✅ באמצעות בלוקי SFC `<i18n>` (אופציונלי); קטלוגים גלובליים הם הנפוצים ביותר |
| **אינטגרציה עם TypeScript**                   | ✅ טיפוסים קפדניים שנוצרים אוטומטית מתוך התוכן                    | ✅ טיפוסים סבירים; בטיחות מפתחות קפדנית דורשת הגדרת סכמה ומשמעת              |
| **זיהוי תרגומים חסרים**                       | ✅ שגיאות TypeScript + שגיאות/אזהרות בזמן בנייה                   | ⚠️ נסיגה בזמן ריצה + אזהרת console                                           |
| **תוכן עשיר (רכיבים / Markdown)**             | ✅ תמיכה ישירה                                                    | ⚠️ אינטרפולציית רכיבים עם `<i18n-t>`; Markdown דורש תוספים חיצוניים          |
| **תמיכה ב-ICU**                               | ⚠️ בפיתוח                                                         | ✅ כן                                                                        |
| **עיצוב (תאריכים, מספרים, מטבעות)**           | ✅ מעצבים מבוססי Intl                                             | ✅ `d()` ו-`n()` עם `datetimeFormats` ו-`numberFormats`                      |
| **ניתוב מתורגם (Localized routing)**          | ✅ כלי עזר עבור Vue Router / Nuxt, פונקציית `getMultilingualUrls` | ⚠️ אינו בליבה (`@nuxtjs/i18n` או הגדרת ראוטר ידנית)                          |
| **כלי עזר ל-SEO (hreflang, sitemap, robots)** | ✅ כלי עזר מובנים                                                 | ❌ אינו בליבה                                                                |
| **Tree-shaking (שליחת תוכן נחוץ בלבד)**       | ✅ לפי רכיב ולפי שפה, אוטומטי לחלוטין על ידי הקומפיילר            | ⚠️ ידני: פיצול קטלוגים, `setLocaleMessage()` לפי נתיב                        |
| **טעינה עצלה (Lazy loading)**                 | ✅ `importMode: 'dynamic'` (שורה אחת בקונפיגורציה)                | ✅ `import()` ידני + `setLocaleMessage()`                                    |
| **ניקוי תוכן שאינו בשימוש (Purge)**           | ✅ מילונים שאינם בשימוש מושמטים בזמן הבנייה                       | ❌ אינו מובנה                                                                |
| **בדיקת תרגומים חסרים (CLI / CI)**            | ✅ `npx intlayer content test`                                    | ⚠️ כלים חיצוניים (`vue-i18n-extract`)                                        |
| **תרגום מבוסס AI**                            | ✅ מובנה, שימוש במפתחות הספק שלכם                                 | ❌ לא                                                                        |
| **עורך ויזואלי / CMS**                        | ✅ עורך ויזואלי חינמי + CMS אופציונלי                             | ❌ לא (פלטפורמות לוקליזציה חיצוניות)                                         |
| **שרת MCP וכישורי סוכן AI**                   | ✅ כן                                                             | ❌ לא                                                                        |
| **אקוסיסטם / קהילה**                          | ⚠️ קטנה יותר אך צומחת במהירות                                     | ✅ גדולה ובוגרת מאוד באקוסיסטם של Vue                                        |

## מבחן הביצועים (Benchmark)

### מה נמדד

סוויטת [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) בונה **את אותה אפליקציית Vite + Vue 3** בכל אחת מהספריות: **10 דפים** (בית, אודות, בלוג, קריירה, צור קשר, שאלות נפוצות, תמחור, מוצרים, הגדרות, צוות), **10 שפות** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), עם רכיבים ותוכן זהים. הדפים נמדדים ב-`en` וב-`fr`.

שתי הספריות נבדקו בתצורת **static**, התצורה הנפוצה ביותר: עבור `vue-i18n`, קובצי ה-JSON של כל השפות מיובאים ומועברים ל-`createI18n({ messages })`; עבור Intlayer, מצב ברירת המחדל `importMode: 'static'`. במצב זה Intlayer אורזת גם היא את כל השפות, אך הקומפיילר עדיין תוחם את התוכן **לפי רכיב**, כך שדף מסוים נושא אך ורק את המילונים של הרכיבים שהוא מרנדר בפועל.

עבור כל בנייה, הסוויטה מתעדת:

- **Lib size**: משקל ב-gzip של רכיב ריק המייבא אך ורק את ספריית ה-i18n. העלות הקבועה של זמן הריצה.
- **Page JS**: גודל ממוצע ב-gzip של JavaScript המורד בכל דף, בממוצע על פני כל הדפים והשפות.
- **Locale leak %**: אחוז מחרוזות התרגום ב-JS שהורד השייכות לשפה שהמשתמש **אינו** צופה בה (נבדק על `en` ו-`fr`, כך ש-50% מעיד על כך שהשפה השנייה שנמדדה נוכחת במלואה; כאשר אורזים 10 שפות, הבזבוז האמיתי גבוה בהרבה).
- **Page leak %**: אחוז מחרוזות התרגום ב-JS שהורד השייכות לדף שהמשתמש **אינו** נמצא בו כרגע.
- **Component avg**: גודל ממוצע ב-gzip של כל רכיב שקומפל בנפרד. מראה כמה זמן ריצה ומילון גורר עמו רכיב יחיד.
- **E2E reactivity**: הזמן שנמדד בין בחירת שפה חדשה לעדכון תגית `html[lang]` ב-DOM (Playwright, ממוצע 5 איטרציות).
- **Page load**: משך `PerformanceNavigationTiming.duration`.

> הנתונים להלן מגיעים מהרצה מ-**2026-09-12** עם `vue-i18n` 11.4.0 ו-`intlayer` 9.5.0 / 9.5.1. אפליקציית הבדיקה קטנה במכוון (כמה עשרות מחרוזות לשפה), כך שאחוזי הדליפה מתארים **דפוס**: הם צומחים ביחס ישיר לגדילת התוכן, בעוד שעלות ה-runtime נשארת קבועה.

### תוצאות ב-Vite + Vue 3

בחרו את המדדים והספריות שמעניינים אתכם:

<I18nBenchmark framework="vite-vue" packages="vue-i18n,@intlayer/vue-i18n,intlayer" vertical/>

| ספרייה                        | אסטרטגיה | משקל ספרייה (gz) | משקל ספרייה (min) | ממוצע JS לדף (gz) | דליפת שפה | דליפת דף | ממוצע לרכיב (gz) | תגובתיות E2E | טעינת דף |
| ----------------------------- | -------- | ---------------: | ----------------: | ----------------: | --------: | -------: | ---------------: | -----------: | -------: |
| **base** (ללא i18n)           | -        |           0.0 KB |            0.0 KB |           41.3 KB |      0.0% |        - |           1.1 KB |       1.8 ms |  10.8 ms |
| `vue-i18n`                    | static   |          24.3 KB |           83.2 KB |          134.9 KB |     50.0% |    90.0% |         196.0 KB |       2.8 ms |  13.6 ms |
| **`vue-intlayer`**            | static   |       **3.9 KB** |       **11.1 KB** |       **57.1 KB** |     56.8% | **0.0%** |       **7.7 KB** |   **4.5 ms** |  13.8 ms |
| `@intlayer/vue-i18n` (compat) | static   |           7.9 KB |           23.2 KB |           47.0 KB |     15.0% |     0.0% |           8.4 KB |       1.5 ms |   9.3 ms |

> עמודת דליפת הדפים של אפליקציית הבסיס הושארה ריקה: ללא ספריית i18n, הבדיקה מזהה מחרוזות מקודדות ב-chunks משותפים והמספר חסר משמעות.

**כיצד לקרוא את הנתונים**

- **עלות זמן הריצה (Runtime).** `vue-i18n` היא אחת מספריות ה-runtime הכבדות ביותר במבחן כולו: **24.3 KB ב-gzip / 83.2 KB מכווץ** עבור רכיב ריק שמייבא אותה בלבד. לעומתה, `vue-intlayer` עולה 3.9 KB בלבד ב-gzip. פער זה משולם בכל דף ודף ללא קשר לכמות המחרוזות באפליקציה.
- **JavaScript לכל דף.** האפליקציה ללא i18n שוקלת 41.3 KB. `vue-i18n` יותר ממשלשת את המשקל ל-**134.9 KB**; Intlayer מתייצבת על **57.1 KB** (+15.8 KB בלבד), כאשר רוב התוספת נובע מעשר השפות שנארזו יחד.
- **דליפה (Leakage).** עם `createI18n({ messages: { en, fr, ... } })`, כל דף נושא את כל השפות ואת כל המחרוזות של כל שאר הדפים: **50% דליפת שפה** ו-**90% דליפת דף**. מצב `static` של Intlayer אורז גם הוא את כל השפות (ומכאן נתון דליפת שפה דומה) אך שומר על **0% דליפת דף**: דף מסוים מושך אך ורק את המילונים של הרכיבים שהוא מציג. מעבר ל-`importMode: 'dynamic'` מבטל גם את דליפת השפה לחלוטין.
- **גודל הרכיבים מדגים את ההבדל הארכיטקטוני.** רכיב הקורא ל-`useI18n()` מתקמפל בממוצע ל-**196 KB**, מכיוון ש-`t()` קשורה למופע הגלובלי המחזיק כל הודעה בכל שפה. אותו רכיב בדיוק עם `useIntlayer()` מתקמפל ל-**7.7 KB** בלבד: הוא ניגש רק למילון העצמאי שלו.
- **תגובתיות** מעולה בשתיהן (2-5 ms). מערכת הראקטיביות של Vue הופכת החלפת שפה למהירה ביותר ברגע שההודעות נטענו לזיכרון.
- **`@intlayer/vue-i18n`**, מתאם התאימות הישיר, שומר על ה-API המוכר של `vue-i18n` ומשיג **47.0 KB לכל דף** ו-**8.4 KB לכל רכיב**, מבלי לגעת בקוד הרכיבים כלל.

> לשם השוואה, באותה הרצה נמדדה ספריית `fluent-vue` ב-171.8 KB לדף, 29.7 KB של runtime ו-217 KB לכל רכיב.

<ClickToOpenIframe
  src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
  width="100%"
  height="600px"
  style="border:none;"
/>

> הטבלה המלאה מופיעה ב-[דוח השוואת ביצועים עבור Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md).

- [דוח השוואת ביצועים עבור Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)

## מה מקור הפער? מופע גלובלי מול מילונים מקומפלים

`vue-i18n` היא ספריית runtime. הקריאה `createI18n()` בונה מופע גלובלי שמחזיק עץ הודעות לכל שפה; `useI18n()` קושרת כל רכיב אליו; ו-`t("footer.github")` מחפשת את המפתח בזמן רינדור. זה מה שמאפשר בלוקי `<i18n>` ב-SFC, שימוש ב-`v-t` וטעינת הודעות דינמית, אך זו גם הסיבה שגרף התלויות של כל רכיב כולל את כל העץ:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # קובץ אחד לכל שפה, כל הדפים בפנים
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

ביצוע אופטימיזציה דורש ש**אתם** תפצלו את `en.json` לקבצים לפי נתיב, ש**אתם** תקראו ל-`setLocaleMessage()` ב-guard של הראוטר, וש**אתם** תוודאו שהמיפוי בין נתיבים לקבצים נשאר מדויק כאשר רכיבים משתנים. מנוע ה-runtime אינו יכול לבצע זאת עבורכם כי אינו יודע אילו מפתחות רכיב מסוים יבקש.

Intlayer מעבירה את הידע הזה לשלב הבנייה. התוכן מוצהר לצד הרכיב, והתוסף `vite-intlayer` מפענח איזה רכיב מייבא איזה מילון:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

הקומפיילר מייצר, לכל מילון ולכל שפה, בדיוק את ה-JSON שאותו רכיב צריך, ומשמיט מילונים שאינם מיובאים. תיחום לפי נתיב נובע באופן טבעי מתיחום לפי רכיב, ללא כל צורך בהגדרה ידנית.

> כדי להסיר בנוסף שפות שאינן בשימוש, הגדירו `dictionary.importMode: 'dynamic'` ב-`intlayer.config.ts`. ראו [מדריך אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md).

- [מדריך אופטימיזציית חבילות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

## חוויית מפתח (DX)

### התקנה והגדרה

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.HEBREW, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### שימוש ברכיב

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

הביטוי `t('counter.label')` הוא מחרוזת פשוטה עד שתגדירו סכמת טיפוסים ידנית; שגיאת כתיב תגרום להצגת המפתח כטקסט בממשק.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({
      "he-IL": "מונה",
      en: "Counter",
      fr: "Compteur",
    }),
    increment: t({
      "he-IL": "הגדל",
      en: "Increment",
      fr: "Incrémenter",
    }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

השדות `label` ו-`increment` מוגדרים עם טיפוסים מלאים; שגיאת הקלדה היא שגיאת TypeScript, ותרגום חסר הוא שגיאה מיידית בזמן הבנייה.

### טעינה עצלה לכל שפה

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

לאחר מכן יש לקרוא ל-`loadLocaleMessages()` מתוך router guard, ולפצל ידנית את `locales/{locale}.json` לפי נתיב אם מעוניינים בתיחום לכל דף.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## שמירה על ה-API של vue-i18n עם היתרונות של Intlayer

`@intlayer/vue-i18n` הוא מתאם תאימות ישיר: `useI18n()`, `t()`, `d()`, `n()`, אינטרפולציית `{name}` ו-`{0}`, ריבוי עם צינור (`"car | cars"`), הוראת `v-t` ו-`i18n.global.locale` ממשיכים לפעול כרגיל, ומוגשים מתוך מילוני Intlayer שקומפלו על ידי `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

במבחן הביצועים, בניית התאימות של אותה אפליקציה ירדה מ-**134.9 KB ל-47.0 KB** לכל דף ומ-**196 KB ל-8.4 KB** לכל רכיב, מבלי לגעת ברכיבים עצמם כלל. קובצי ה-`locales/{locale}.json` הקיימים שלכם יכולים להמשיך לשמש כמקור האמת באמצעות פלאגין סנכרון ה-JSON.

עיינו ב-[מדריך הגירה מ-vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_vue-i18n_to_intlayer.md) וב-[תיעוד תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md). למשתמשי Nuxt קיים מסלול מקביל דרך [תאימות `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md).

- [מדריך הגירה מ-vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_vue-i18n_to_intlayer.md)
- [תיעוד תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md)
- [תאימות `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md)

## מתי לבחור בכל אחת?

- **בחרו ב-vue-i18n** אם אתם מעוניינים בגישה הסטנדרטית של Vue, אתם תלויים בהודעות ICU או בבלוקי SFC `<i18n>`, אתם כבר משתמשים ב-`@nuxtjs/i18n`, או שפלטפורמת התרגום שלכם מחייבת JSON מרוכז. קחו בחשבון את הזמן הדרוש לפיצול קטלוגים וטעינה עצלה לפי נתיב אם גודל החבילה קריטי לכם.
- **בחרו ב-Intlayer** אם אתם רוצים **תוכן מתוחם לפי-רכיב**, **TypeScript קפדני**, **שגיאות בזמן בנייה על מפתחות חסרים**, **tree-shaking וטעינה עצלה ללא מאמץ**, וכלי עריכה מובנים (עורך ויזואלי, CMS, תרגום AI, שרת MCP). רלוונטית במיוחד עבור בסיסי קוד גדולים ומודולריים של Vue / Nuxt ומערכות עיצוב (design systems).
- **בחרו ב-`@intlayer/vue-i18n`** אם אתם כבר משתמשים ב-`vue-i18n` ומעוניינים ביתרונות גודל החבילה ללא צורך בשכתוב קוד.

## שאלות נפוצות (FAQ)

<FAQ>

<Question title="האם Intlayer מחליפה את vue-i18n או מהווה שכבה מעליה?">

שתיהן, תלוי באופן שבו אתם מאמצים אותה. `vue-intlayer` היא ספריית runtime טבעית עם composable משלה בשם `useIntlayer()`. לעומתה, `@intlayer/vue-i18n` היא מתאם תאימות ששומר על ה-API של `vue-i18n` ומחליף את המקור שאליו הוא קשור, כך שתוכלו להגר מבלי לגעת ברכיבים ולהתקדם קובץ אחר קובץ לאחר מכן.

</Question>

<Question title="מה קורה לבלוקי ה-<i18n> שלי בתוך SFC?">

המתאם אינו קורא אותם. יש להעביר הודעות אלו לקובצי ה-JSON של השפות, או לקובצי `.content.ts` לצד הרכיב, המייצגים את אותו רעיון עם טיפוסים מובנים. זוהי התכונה היחידה של `vue-i18n` שאינה עוברת במתאם.

</Question>

<Question title="האם Intlayer עובדת עם Nuxt?">

כן. [Intlayer עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nuxt.md) מכסה ניתוב רב-לשוני, middleware לזיהוי שפה ויצירת מפות אתר (sitemap). אם אתם משתמשים ב-`@nuxtjs/i18n`, [מתאם תאימות Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md) הוא מסלול ההגירה המומלץ.

- [Intlayer עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nuxt.md)
- [מתאם תאימות Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md)

</Question>

<Question title="האם אוכל לשמור על locales/{locale}.json כמקור האמת?">

כן. [פלאגין סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md) קורא אותם בתחביר של `vue-i18n` (אינטרפולציית `{name}`, `{0}`, וריבוי `"car | cars"`) וכותב תרגומים בחזרה כאשר ה-CLI או ה-CMS מעדכנים אותם.

- [פלאגין סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md)

</Question>

<Question title="האם תחביר ICU עובד עם Intlayer ב-Vue?">

תמיכה מובנית ב-ICU נמצאת כעת בפיתוח. המתאם `@intlayer/vue-i18n` מפענח את תחביר ההודעות של `vue-i18n`, כולל ריבוי ואינטרפולציה של שמות ורשימות. עבור מודל הריבוי של Intlayer, עיינו ב-[תוכן ספירה (enumeration content)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/enumeration.md).

- [תוכן ספירה (enumeration content)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/enumeration.md)

</Question>

</FAQ>

## השוואות קשורות

- [next-intl מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer.md)
- [i18next מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer.md)
- [Lingui מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer.md)
- [האם vue-i18n מיושנת?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_vue-i18n_outdated.md)

תיעוד מקושר:

- [מתאם תאימות: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md)
- [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md)
- [מדריך הגירה: מ-vue-i18n ל-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_vue-i18n_to_intlayer.md)
- [אופטימיזציית חבילה (Bundle optimization)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

דוחות השוואת ביצועים:

- [סקירת ביצועי i18n כללית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/svelte.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## כוכבים ב-GitHub

כוכבי GitHub הם אינדיקטור מובהק לפופולריות של פרויקט, אמון הקהילה ורלוונטיות ארוכת טווח. למרות שאינם מדד ישיר לאיכות טכנית, הם משקפים כמה מפתחים מוצאים את הפרויקט מועיל ועוקבים אחר התקדמותו.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## פעילות Commits

כוכבים מעידים על פופולריות. Commits מראים כמה עבודה מושקעת בפועל בפרויקט. נכון לעת כתיבת שורות אלו, Intlayer מונה כ-7,500 commits, יותר מרוב הספריות המושוות כאן, ובערך פי 5 יותר מ-`next-intl` או `next-i18next`.

<GithubCommits repositories="intlify/vue-i18n,aymericzip/intlayer" />

> Intlayer היא monorepo, כך שהספירה שלה כוללת את כל חבילות הפריימוורקים, ה-CLI והתיעוד. יש להתייחס ל-commits כסימן לפעילות מתמדת ולא כמדד בלעדי לאיכות.

## הורדות ב-npm

<NpmDownloads packages="vue-i18n,vue-intlayer" period="last-6-months" />

הורדות מתגמלות את הפתרונות הוותיקים ביותר, ולאו דווקא את הטובים ביותר. ספרייה שיצאה לפני שנים ממשיכה להיות מותקנת על ידי כל פרויקט שבחר בה בעבר, בכל הרצת CI ועל ידי כל חבילה שתלויה בה. הספירה מודדת אינרציה יותר מאשר בחירה עדכנית.

עוזרי AI מעצימים השפעה זו. `next-intl`, `i18next` ו-`vue-i18n` מופיעות בכל מקום בקוד שעליו הם אומנו, ולכן הם מציעים אותן כברירת מחדל מבלי להשוות חלופות. כל המלצה כזו מוסיפה הורדות, מה שמזין את ההמלצה הבאה. מומלץ להשוות על פי מבחני ביצועים אמיתיים ולא על פי ספירת הורדות בלבד.

## סיכום

`vue-i18n` היא ספרייה בוגרת, גמישה ומשולבת היטב ב-Vue. מבחן הביצועים מדגים מה עולה תכנון ה-runtime-first שלה על גבי בניית Vite: **משקל runtime של 24 KB ב-gzip**, **134.9 KB לכל דף** עבור אפליקציה השוקלת 41 KB ללא i18n, **90% תוכן מדפים זרים** בכל דף, ורכיבים שכל אחד מהם מגיע ל-**196 KB** מכיוון שהם תלויים בעץ ההודעות הגלובלי.

Intlayer מעבירה את העבודה לקומפיילר. מילונים לפי-רכיב וניקוי תוכן מת הם תוצרי בנייה, ולא מוסכמות עבודה ידניות. באותה אפליקציה: **runtime של 3.9 KB**, **57.1 KB לכל דף**, **0% דליפת דפים**, ורכיבים **קטנים פי 25**. ואם שכתוב אינו עומד על הפרק, `@intlayer/vue-i18n` משיגה את רוב היתרונות הללו כאשר קוד הרכיבים נותר ללא שום שינוי.

כל הנתונים הגולמיים, אפליקציות הבדיקה והסקריפטים זמינים ב-[מאגר Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). הריצו אותם בעצמכם.

עיינו במסמך ['למה Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) לפרטים נוספים.

- [למה Intlayer? יתרונות על פני ספריות i18n אחרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
