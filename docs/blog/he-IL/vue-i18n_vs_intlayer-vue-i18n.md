---
createdAt: 2026-09-13
updatedAt: 2026-11-03
priority: 8
title: "vue-i18n מול @intlayer/vue-i18n: אותו API, חבילה שונה לחלוטין"
description: "אפליקציית Vue 3 שומרת על קריאות ה-vue-i18n שלה, המוגשות דרך מתאם @intlayer/vue-i18n. מדידת גודל JavaScript לכל דף, משקל בזמן ריצה, גודל רכיבים ודליפת מחרוזות."
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - מתאם תאימות
  - Compat adapter
  - הגירה
  - Migration
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
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n מול @intlayer/vue-i18n: אותו API, חבילה שונה לחלוטין

`@intlayer/vue-i18n` הוא מתאם תאימות (compat adapter): הוא חושף במדויק את ה-API של `vue-i18n` (כגון `createI18n`, `useI18n`, `t()`, `d()`, `n()`, `$t`, `v-t`, `i18n.global.locale`...) ומגיש אותו מתוך מילונים שקומפלו על ידי Intlayer. קובצי ה-`.vue` שלכם אינם משתנים. מה שאליו קשורה הקריאה `t("footer.github")` משתנה מהיסוד.

מאמר זה מודד את ההחלפה הזו על אותה אפליקציית Vite + Vue 3 בדיוק, שנבנתה פעם אחת עם `vue-i18n` ופעם שנייה עם המתאם. המספרים מגיעים מתוך [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). להשוואה מלאה בין ספריות `vue-i18n` ו-Intlayer, קראו את [vue-i18n מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/vue-i18n_vs_intlayer.md). מאמר זה מתמקד במה שהמתאם משנה כאשר אתם שומרים על הרכיבים הקיימים שלכם בדיוק כפי שהם.

- [vue-i18n מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/vue-i18n_vs_intlayer.md)

<TOC/>

> **בקצרה**: באותה אפליקציית Vite + Vue 3, החלפת `vue-i18n` ב-`@intlayer/vue-i18n` הפחיתה את ה-JavaScript לכל דף מ-**134.9 KB ל-47.0 KB** ב-gzip (האפליקציה ללא i18n שוקלת 41.3 KB), הקטינה את ה-runtime מ-**24.3 KB ל-7.9 KB**, הורידה את הגודל הממוצע של רכיב מ-**196 KB ל-8.4 KB**, וביטלה דליפת מחרוזות מדפים זרים מ-**90% ל-0%**, מבלי לערוך אפילו קובץ `.vue` אחד. `createI18n({ messages })` ממשיך לתפקד כנסיגה (fallback); הסרת ייבוא ה-JSON תביא להשגת המספרים המרשימים שצוינו. בלוקי `<i18n>` ב-SFC והפונקציה `setLocaleMessage()` בזמן ריצה הם שני הפיצ'רים היחידים שאינם נתמכים במעבר זה.

## מהו בעצם `@intlayer/vue-i18n`

`vue-i18n` היא ספריית runtime. הקריאה `createI18n({ messages: { en, fr, ... } })` יוצרת מופע גלובלי המחזיק כל הודעה בכל שפה; `useI18n()` קושרת כל רכיב למופע זה; ו-`t("footer.github")` סורקת את העץ בזמן הרינדור. תכנון זה מאפשר אמנם בלוקי `<i18n>` ב-SFC ושימוש ב-`setLocaleMessage()`, אך זו גם הסיבה שגרף התלויות של כל רכיב כולל את העץ המלא של כל האפליקציה.

`@intlayer/vue-i18n` שומרת על ה-API ומחליפה את העץ:

1. **כינויי ייבוא (Import Aliasing):** הפלאגין `vueI18nVitePlugin()` מתוך `@intlayer/vue-i18n/plugin` עוטף את `vite-intlayer` ומוסיף `resolve.alias` כך שכל ייבוא מ-`vue-i18n` מנותב אל `@intlayer/vue-i18n`. אין צורך לשנות שום ייבוא בקוד.
2. **JSON כמקור האמת:** הפלאגין `syncJSON` קורא את קובצי `locales/{locale}.json` הקיימים שלכם עם `format: "vue-i18n"` (כך שאינטרפולציית `{name}`, רשימות `{0}` וריבוי באמצעות צינור `"car | cars"` מנותחים בצורה מדויקת) וכותב תרגומים בחזרה כאשר ה-CLI או ה-CMS מעדכנים אותם.
3. **קשירה מדויקת באתר הקריאה (Call-site Binding):** שלב האופטימיזציה של Intlayer משכתב את מקומות הקריאה ל-`useI18n()`, כך שהרכיב מקבל רק את המילונים שהמפתחות שלו מזכירים, בשפה הפעילה, כייבוא שה-bundler יכול לעקוב אחריו ולפצל.

```vue fileName="src/components/Footer.vue"
<!-- הקוד שלכם, ללא שום שינוי -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="מה שהקומפיילר מפיק (בפישוט)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

הרכיב אינו ניגש יותר לעץ ההודעות הגלובלי. הוא ניגש אך ורק ל-`footer`. זו הסיבה שגודל הרכיב הממוצע בטבלה להלן צונח מ-196 KB ל-8 KB בלבד.

## מה המתאם משמר, ממה הוא מתעלם ומה אינו מוחלף

| API של `vue-i18n`                                                   | עם `@intlayer/vue-i18n`                                                                                                             |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `useI18n()` ← `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ נשמר. מפתחות `t` מקבלים טיפוסיות מול המילונים שלכם                                                                               |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ נשמר. אינטרפולציית `{name}`, `{0}` וריבוי עם קו מפריד נפתרים כבעבר                                                               |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ נשמר. הגדרות `datetimeFormats` ו-`numberFormats` מ-`createI18n()` מכובדות, מגובות ב-`Intl` מובנה                                 |
| `i18n.global.locale.value = "fr"`                                   | ✅ נשמר. `WritableComputedRef` המגובה בלקוח של Intlayer; הראקטיביות מתנהגת כבעבר                                                    |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ נשמר. נרשם על גבי `app.config.globalProperties` באמצעות `app.use(i18n)`                                                          |
| הוראת `v-t`                                                         | ✅ נשמרת                                                                                                                            |
| `legacy: true`                                                      | ✅ נתמך                                                                                                                             |
| `createI18n({ messages })`                                          | ⚠️ הערך `messages` משמש כ**נסיגה בזמן ריצה (runtime fallback)** עם אזהרת פיתוח. הסירו את ייבוא ה-JSON כדי להרוויח את יתרונות החבילה |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ מציג אזהרה ואינו עושה דבר. טעינת הודעות בזמן ריצה מוחלפת במילונים בזמן בנייה                                                     |
| בלוקי `<i18n>` מותאמים אישית ב-SFC                                  | ❌ אינם נקראים. יש להעביר הודעות אלו לקובצי ה-JSON של השפות (או לקובץ `.content.ts` לצד הרכיב)                                      |
| `@nuxtjs/i18n`                                                      | ⚠️ מתאם נפרד, ראו [תיעוד תאימות Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md)       |

## מבחן הביצועים (Benchmark)

### מה נמדד

סוויטת [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) בונה **את אותה אפליקציית Vite + Vue 3** בכל הגדרה: **10 דפים** (בית, אודות, בלוג, קריירה, צור קשר, שאלות נפוצות, תמחור, מוצרים, הגדרות, צוות), **10 שפות** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), עם רכיבים זהים ותוכן זהה לחלוטין. הדפים נמדדים ב-`en` וב-`fr`.

שתי התצורות נבנו במצב **static**, התצורה הנפוצה ביותר ברוב פרויקטי Vue: עבור `vue-i18n`, קובצי ה-JSON של כל השפות יובאו והועברו ל-`createI18n({ messages })`; עבור המתאם, אותם רכיבים עם שינויים ב-`vite.config.ts` וב-`intlayer.config.ts`, וללא ייבוא של `messages`. התוצאות של `vue-intlayer` הנייטיבית מצורפות כנקודת ייחוס.

עבור כל בנייה, הסוויטה מודדת:

- **Lib size**: משקל ב-gzip (ומכווץ) של רכיב ריק המייבא אך ורק את ספריית ה-i18n.
- **Page JS**: משקל ה-JavaScript הממוצע ב-gzip המורד בכל דף, מחושב על פני כל הדפים והשפות.
- **Locale leak %**: אחוז מחרוזות התרגום ב-JS שהורד השייכות לשפות שהמשתמש **אינו** צופה בהן כעת.
- **Page leak %**: אחוז מחרוזות התרגום ב-JS שהורד השייכות לדפים שהמשתמש **אינו** נמצא בהם כעת.
- **Component avg**: גודל ממוצע ב-gzip של כל רכיב שקומפל בנפרד.
- **E2E reactivity**: הזמן שנמדד בין בחירת שפה חדשה לעדכון תגית `html[lang]` ב-DOM (נבדק באמצעות Playwright, ממוצע של 5 איטרציות).
- **Page load**: משך `PerformanceNavigationTiming.duration`.

> הנתונים להלן מגיעים מהרצה מתאריך **2026-09-12** עם `vue-i18n` 11.4.0 ו-`@intlayer/vue-i18n` 9.5.1. אפליקציית הבדיקה קטנה במכוון (כמה עשרות מחרוזות לכל שפה), כך שאחוזי הדליפה מתארים **דפוס**: הם צומחים ככל שהתוכן גדל, בעוד שעלות ה-runtime נשארת קבועה.

### תוצאות ב-Vite + Vue 3

בחרו את המדדים ואת הספריות שמעניינות אתכם:

<I18nBenchmark framework="vite-vue" packages="vue-i18n,@intlayer/vue-i18n,intlayer" vertical/>

| תצורה                    | אסטרטגיה | משקל ספרייה (gz) | משקל ספרייה (min) | ממוצע JS לדף (gz) | דליפת שפה | דליפת דף | ממוצע לרכיב (gz) | תגובתיות E2E |   טעינת דף |
| ------------------------ | -------- | ---------------: | ----------------: | ----------------: | --------: | -------: | ---------------: | -----------: | ---------: |
| **base** (ללא i18n)      | -        |           0.0 KB |            0.0 KB |           41.3 KB |      0.0% |        - |           1.1 KB |       1.8 ms |    10.8 ms |
| `vue-i18n`               | static   |          24.3 KB |           83.2 KB |          134.9 KB |     50.0% |    90.0% |         196.0 KB |       2.8 ms |    13.6 ms |
| **`@intlayer/vue-i18n`** | static   |       **7.9 KB** |       **23.2 KB** |       **47.0 KB** | **15.0%** | **0.0%** |       **8.4 KB** |   **1.5 ms** | **9.3 ms** |
| `vue-intlayer` (native)  | static   |           3.9 KB |           11.1 KB |           57.1 KB |     56.8% |     0.0% |           7.7 KB |       4.5 ms |    13.8 ms |
| `vue-intlayer` (native)  | dynamic  |           3.9 KB |           11.1 KB |           59.8 KB |     50.0% |     0.0% |           6.5 KB |       4.0 ms |    15.8 ms |

> עמודת דליפת הדפים של אפליקציית הבסיס הושארה ריקה: ללא ספריית i18n, הזיהוי נתקל במחרוזות מקודדות ב-chunks משותפים והמספר אינו בעל משמעות.

**כיצד לקרוא את הנתונים**

- **88 KB פחות לכל דף, עם אותם רכיבים.** `vue-i18n` מעלה את משקל האפליקציה מ-41.3 KB ל-**134.9 KB**. בניית אותם רכיבים באמצעות המתאם מגיעה ל-**47.0 KB** בלבד, תוספת של 5.7 KB בלבד מעל אפליקציית הבסיס. רוב ההבדל נובע מ-74.9 KB של תיקיית `src/locales`, ש-`createI18n({ messages })` מושכת לכל דף בעוד שהמתאם אינו אורז אותה כגוש אחד לעולם.
- **זמן הריצה מתכווץ פי 3.** רכיב ריק שמייבא רק את `vue-i18n` שוקל **24.3 KB ב-gzip / 83.2 KB מכווץ**: `@intlify/core-base`, קומפיילר ההודעות וה-runtime. המתאם שוקל **7.9 KB / 23.2 KB**, כאשר רובו מורכב מליבת Intlayer בתוספת מעטפת ה-API של `vue-i18n`.
- **רכיבים: קטנים פי 23.** רכיב `useI18n()` שקומפל בנפרד שוקל בממוצע **196 KB**, מכיוון ש-`t` קשורה למופע המחזיק כל הודעה בכל שפה. עם המתאם, אותו רכיב שוקל בממוצע **8.4 KB**: הוא ניגש אך ורק למילון שלו.
- **דליפה (Leakage).** `vue-i18n` שולחת את המחרוזות של כל השפות וכל הדפים בכל דף: 50% דליפת שפה (על שתי השפות שנבדקו; עם עשר שפות הבזבוז בפועל גבוה בהרבה), ו-90% דליפת דף. המתאם מוריד את דליפת הדפים ל-**0%**, מכיוון שכל רכיב מייבא רק את המילונים שלו. דליפת השפה עומדת על 15% בהרצת `static` זו; הגדרת `importMode: 'dynamic'` מבטלת אותה לחלוטין.
- **תגובתיות וטעינת דף.** החלפת שפה מהירה מאוד בשתיהן (1.5-2.8 ms); מערכת הראקטיביות של Vue מאפשרת זאת ברגע שההודעות בזיכרון. זמן טעינת הדף יורד מ-13.6 ms ל-**9.3 ms**, בהתאמה להפחתה של 88 KB ב-JavaScript שדורש ניתוח (parse).
- **לגבי שורות ה-native.** `vue-intlayer` בהרצה זו ארזה את כל השפות במצב `static` והגיעה ל-57.1 KB עם runtime של 3.9 KB; המילונים המסונכרנים של המתאם נשאו פחות מחרוזות שפה זרות, ומכאן הנתון הנמוך יותר לדף. ספריית ה-native נשארת הקלה מבין השלוש, ומודל ה-`.content.ts` שלה הוא המקום שבו בלוקי `<i18n>` מוצאים את המקבילה המודרנית שלהם.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> הטבלה המלאה מופיעה ב-[דוח השוואת ביצועים עבור Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md).

- [דוח השוואת ביצועים עבור Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)

## מדוע המספרים משתנים

![קומפיילר Intlayer מחלץ תוכן מתוך רכיבים](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

שום דבר בתיקיית `src/components/` לא השתנה, ולכן כל הרווח מגיע ממה ש-`useI18n` קשור אליו.

**עם `vue-i18n`**, הקשירה נעשית למופע הגלובלי. הקריאה `createI18n({ messages: { en, fr, ... } })` היא ייבוא בודד שמחזיק הכל; כל רכיב שקורא ל-`useI18n()` יכול לגשת לכל התוכן, כך שה-bundler אינו יכול לפצל ברמה נמוכה יותר מהמופע עצמו. אופטימיזציה דורשת ש_אתם_ תפצלו את `en.json` לפי נתיב, תקראו ל-`setLocaleMessage()` ב-guard של הראוטר ותתחזקו את המיפוי בין נתיבים לקבצים כשרכיבים זזים. הבזבוז גדל בשני צירים במקביל, דפים ושפות:

![דליפת תוכן תיאורטית לפי ארכיטקטורה](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── locales
│   ├── en.json                    # מחרוזות של כל הדפים
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**עם `@intlayer/vue-i18n`**, הקשירה נעשית למילון ספציפי. `syncJSON` הופך כל מפתח עליון ב-`en.json` למילון נפרד; שלב האופטימיזציה מגיש לרכיב בדיוק את המילונים שהמפתחות שלו מציינים, כייבוא שה-bundler מזהה ומפצל לפי דף.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # ללא שינוי, עדיין מקור האמת
│   └── fr.json
├── .intlayer/                     # נוצר אוטומטית: מילון אחד לכל מפתח עליון, לכל שפה
└── src
    ├── i18n.ts                    # createI18n({})   ← ייבוא messages הוסר
    ├── main.ts                    # app.use(i18n)    ← ללא שינוי
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← ללא שינוי
```

ייבוא `messages` ב-`i18n.ts` הוא השורה הבודדת שיש למחוק. זוהי בדיוק ההפחתה של 88 KB.

## הגירה בשלושה שלבים

<Steps>
<Step number={1} title="התקנה">

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

הפקודה מזהה את `vue-i18n`, מתקינה את `intlayer`, `vue-intlayer`, `@intlayer/vue-i18n` ו-`@intlayer/sync-json-plugin`, ומאכלסת מראש את `intlayer.config.ts`. השאירו את `vue-i18n` מותקנת: היא משמשת כ-peer dependency ומספקת את הטיפוסים.

</Step>
<Step number={2} title="הגדירו ל-Intlayer את מיקום קובצי השפה שלכם">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.HEBREW, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" אורז כל שפה; "dynamic" טוען את השפה הפעילה לפי דרישה
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // תחביר vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

הקובץ `locales/{locale}.json` נשאר בדיוק במקומו. כל מפתח עליון (`footer`, `hero`...) הופך למילון עצמאי.

</Step>
<Step number={3} title="הוסיפו את הפלאגין והסירו את ייבוא ה-messages">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// לפני: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

הפלאגין `vueI18nVitePlugin()` עוטף את `vite-intlayer` (מעקב אחר תוכן, קומפילציית מילונים ושלב האופטימיזציה) ומפנה את `vue-i18n` למתאם. הסרת ייבוא ה-`messages` היא הפעולה שמפחיתה את ה-88 KB; השארתה תשאיר את האפליקציה עובדת אך תשלח את שני המנגנונים לחבילה.

</Step>
</Steps>

### מה ניתן למחוק לאחר מכן

| קובץ / תבנית                                | סיבה                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `import en from "./locales/en.json"` ודומיו | משמש רק כנסיגה (fallback) על ידי המתאם. כאן שכנו ה-88 KB                 |
| `setLocaleMessage()` ב-guards של הראוטר     | מיותר (No-op). טעינה לפי נתיב היא תפקידו של הקומפיילר כעת                |
| `@intlify/unplugin-vue-i18n`                | אינו נחוץ: הוא מבצע קומפילציה מוקדמת להודעות ובלוקי SFC שהמתאם אינו קורא |
| בלוקי `<i18n>` ב-SFC                        | אינם נקראים; העבירו אותם ל-JSON השפות או לקובץ `.content.ts` לכל רכיב    |

### מה מרוויחים מעבר לחסכון בבתים

- **מפתחות עם טיפוסים (Typed keys):** `t("footer.github")` מקבל טיפוסיות אל מול מילון ה-`footer` שקומפל; נתיב שגוי גורם לשגיאת TypeScript במקום להציג את המפתח כטקסט בממשק.
- **`npx intlayer test`** מכשיל את ה-CI אם חסר מפתח בשפה כלשהי. **`npx intlayer fill`** מתרגם את המפתחות החסרים באמצעות מפתח הספק שלכם (OpenAI, Anthropic, Mistral, Gemini...) וכותב אותם בחזרה לתוך `locales/{locale}.json`.
- **עורך ויזואלי ו-CMS** פועלים על גבי אותו ה-JSON, כך שאנשי תוכן שאינם מפתחים עורכים דרך ממשק משתמש והקבצים מתעדכנים.
- **מעבר הדרגתי ל-`.content.ts`:** כל רכיב יכול לעבור באופן עצמאי מ-`useI18n()` ל-`useIntlayer("footer")` עם קובץ תוכן צמוד. מילוני JSON ו-`.content.ts` מתקיימים יחד ומתמזגים.

## מגבלות שחשוב להכיר לפני שמתחילים

<AccordionGroup>
<Accordion header="בלוקי <i18n> ב-SFC אינם נקראים">

אם ההודעות שלכם נמצאות בתוך הרכיבים, יש להעביר אותן לקובצי השפות, או לקובצי `.content.ts`, המהווים את אותו רעיון עם טיפוסים שנוצרים אוטומטית.

</Accordion>
<Accordion header="טעינת הודעות בזמן ריצה אינה נתמכת">

`setLocaleMessage()` ו-`mergeLocaleMessage()` מציגות אזהרה ואינן פועלות. עבור תרגומים הנשלפים מ-CMS בזמן ריצה, יש להשתמש ב-[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), או בפקודות `intlayer pull` ו-`push`.

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="messages משמש כנסיגה, אינו חינמי">

השארת ייבוא ה-JSON ב-`createI18n()` תשאיר 75 KB בחבילה. מחקו אותם ברגע ש-`intlayer test` עובר בהצלחה.

</Accordion>
<Accordion header="המתאם אינו ה-runtime הטבעי">

7.9 KB לעומת 3.9 KB עבור `vue-intlayer`. ברגע שכל הרכיבים עברו ל-`useIntlayer`, ניתן להסירו לחלוטין.

</Accordion>
</AccordionGroup>

## מתי להשתמש בכל אפשרות?

<AccordionGroup>
<Accordion header="הישארות עם vue-i18n">

האפליקציה שלכם תלויה בבלוקי `<i18n>` בתוך SFC, בתהליכי `setLocaleMessage()` בזמן ריצה, או ש-90 KB נוספים לכל דף אינם מהווים דאגה עבור קהל היעד שלכם.

</Accordion>
<Accordion header="שימוש ב-@intlayer/vue-i18n">

אתם עובדים עם `vue-i18n` ורוצים לחסוך 88 KB, לקבל רכיבים קטנים פי 23, 0% דליפת דפים, מפתחות עם טיפוסיות ובדיקות ב-CI מבלי לערוך קובץ `.vue` בודד. זוהי נקודת הכניסה האידיאלית לבסיס קוד קיים של `vue-i18n`.

</Accordion>
<Accordion header="מעבר מלא ל-vue-intlayer (Native)">

עבור פרויקטים חדשים, או לאחר שהמתאם סיים את תפקידו. לגרסה זו ה-runtime הקל ביותר (3.9 KB) ומודל `.content.ts` לכל רכיב המחליף בלוקי `<i18n>` בתוכן בעל טיפוסים קפדניים. התחילו עם [Intlayer עם Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+vue.md) או [עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nuxt.md).

- [Intlayer עם Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+vue.md)
- [Intlayer עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nuxt.md)

</Accordion>
</AccordionGroup>

## שאלות נפוצות (FAQ)

<FAQ>

<Question title="האם עליי לערוך את קובצי ה-.vue שלי?">

לא. הבנייה במבחן הביצועים שינתה רק את `vite.config.ts`, `intlayer.config.ts` ושורה בודדת ב-`src/i18n.ts` (ייבוא ה-`messages`). כל קריאה ל-`useI18n()`, `$t`, `v-t` ו-Options API נשארה בדיוק כפי שהייתה.

</Question>

<Question title="מדוע גודל הרכיבים קטן פי 23?">

מכיוון ש-`useI18n()` אינו ניגש עוד למופע הגלובלי. `createI18n({ messages })` מחזיק כל הודעה בכל שפה, ולכן רכיב שקומפל בנפרד גרר עמו 196 KB. עם המתאם הוא ניגש רק למילון שלו: 8.4 KB.

</Question>

<Question title="מה לגבי עיצוב תאריכים ומספרים עם d() ו-n()?">

נשמר לחלוטין. הגדרות `datetimeFormats` ו-`numberFormats` המועברות ל-`createI18n()` מכובדות ומגובות ב-`Intl` מובנה. ראו [עיצוב תאריך, שעה ומספרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/date_time_number_formatting_locales.md).

- [עיצוב תאריך, שעה ומספרים](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/date_time_number_formatting_locales.md)

</Question>

<Question title="האם זה עובד עם Nuxt?">

`@intlayer/vue-i18n` מיועד ל-Vite + Vue. עבור `@nuxtjs/i18n`, השתמשו ב-[מתאם תאימות Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md), ועיינו ב-[Intlayer עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nuxt.md) להגדרה ישירה.

- [מתאם תאימות Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md)
- [Intlayer עם Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nuxt.md)

</Question>

<Question title="האם ניתן להגר רכיב אחר רכיב בהדרגה?">

כן. כל רכיב יכול לעבור באופן עצמאי מ-`useI18n()` ל-`useIntlayer("footer")` עם קובץ תוכן צמוד. מילוני JSON ו-`.content.ts` מתקיימים זה לצד זה ומתמזגים באופן חלק.

</Question>

</FAQ>

## השוואות קשורות

![אקוסיסטם ספריות i18n של Vue](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

סדרת מתאמים דומים:

- [next-intl מול @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/next-intl_vs_intlayer-next-intl.md)
- [i18next מול @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/i18next_vs_intlayer-i18next.md)
- [Lingui מול @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/lingui_vs_intlayer-lingui.md)

השוואות ראש בראש בין ספריות:

- [vue-i18n מול Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/vue-i18n_vs_intlayer.md)
- [האם vue-i18n מיושנת?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_vue-i18n_outdated.md)
- [כיצד לבחור ספריית i18n עבור Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/how_to_pick_vue_i18n_library.md)

תיעוד רלוונטי:

- [מתאם תאימות: vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md)
- [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md)
- [מדריך הגירה: מ-vue-i18n ל-Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_vue-i18n_to_intlayer.md)
- [אופטימיזציית חבילה (Bundle optimization)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [עורך ויזואלי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [תרגום באמצעות AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/autoFill.md)

דוחות השוואת ביצועים:

- [סקירת ביצועי i18n כללית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)
- [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/nextjs.md)
- [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/tanstack.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)
- [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md)
- [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/svelte.md)

> כדי להבין מהיכן הגיעו ספריות אלו, קראו על ההיסטוריה של i18n ב-JavaScript.

- [ההיסטוריה של i18n ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## סיכום

`@intlayer/vue-i18n` משנה את הגורם שאליו `useI18n()` נקשר: ממופע גלובלי המחזיק כל הודעה בכל שפה, למילון ייעודי שקומפל עבור אותו רכיב. באותה אפליקציית Vite + Vue 3, הדבר מתבטא ב-**88 KB פחות לכל דף**, **זמן ריצה קטן פי 3**, **רכיבים קטנים פי 23** ו-**0% דליפת דפים**, בעבור קובץ קונפיגורציה, שורת פלאגין ומחיקת שורת ייבוא בודדת. בלוקי `<i18n>` ב-SFC וטעינת הודעות בזמן ריצה הם שני הדברים היחידים שאינם נתמכים, וזמן הריצה הטבעי של `vue-intlayer` נותר במחצית מגודלו של המתאם.

כל הנתונים הגולמיים, אפליקציות הבדיקה והסקריפטים זמינים ב-[מאגר Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). הריצו אותם בעצמכם.

עיינו במסמך ['למה Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) לפרטים נוספים.

- [למה Intlayer? יתרונות על פני ספריות i18n אחרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
