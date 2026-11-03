---
createdAt: 2026-09-02
updatedAt: 2026-11-03
priority: 8
title: האם vue-i18n מיושנת ב-2026?
description: vue-i18n הייתה התקן עבור יישומי Vue ו-Nuxt במשך עשור. אך במבחני הביצועים שלנו, היא התגלתה כספריית ה-i18n הכבדה ביותר ברשת בזמן ריצה. הנה הסיבה.
keywords:
  - vue-i18n
  - Intlayer
  - בינאום
  - i18n
  - Vue
  - Nuxt
  - גודל bundle
  - בלוג
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# האם vue-i18n מיושנת ב-2026?

בקהילת Vue, מעטות הספריות שזכו לאימוץ רחב כל כך כמו `vue-i18n`. מתוחזקת על ידי Kazupon עוד מימי Vue 2, היא מניעה את `@nuxtjs/i18n` ומשמשת כבחירת ברירת המחדל עבור כמעט כל יישום Vue רב-לשוני.

עם זאת, במבחני הביצועים שלנו לשנת 2026 נתקלנו בממצא מפתיע: **`vue-i18n` הייתה ספריית ה-i18n הכבדה ביותר בזמן ריצה מבין כל סביבות הפרונטאנד שנבדקו.**

על גבי פרויקט בסיס נקי של Vite + Vue בגודל 31.5 KB, הוספת `vue-i18n` הקפיצה את ממוצע ה-JavaScript של הדף ל-**136.4 KB**, יותר מפי 4 מנפח הדף המקורי.

כיצד סביבת עבודה הידועה בקלילותה ובמהירותה הגיעה לחבילת בינאום כבדה כל כך? והאם מודל זמן הריצה הקלאסי שלה עדיין הגיוני כיום?

<TOC/>

## נקודות מפתח

**זמן הריצה הכבד ביותר שנבדק:**

במשקל של **24.3 KB מכווץ ב-gzip (או 83.2 KB לאחר minification)** עוד לפני הוספת תוכן כלשהו, `vue-i18n` כבדה בערך **פי 9** מזמן הריצה של `intlayer` (2.7 KB).

**קנס של 330% על נפח הדף:**

`vue-i18n` ניפחה דף Vue בסיסי מ-31.5 KB ל-136.4 KB. לעומתה, Intlayer יצרה דף של 59.3 KB, כלומר **נפח דף קטן ב-56%**.

**הקומפיילר הנסתר בזמן ריצה:**

כברירת מחדל, אלא אם מגדירים כינויי bundler מיוחדים, `vue-i18n` שולחת קומפיילר הודעות שלם לדפדפן כדי לנתח מחרוזות תוך כדי ריצה.

**קצב תחזוקה:**

במהלך השנה האחרונה, `vue-i18n` רשמה כ-259 commits, שהתמקדו בעיקר בתיקוני טלאי ותאימות לליבת Vue.

**היעדר כלי פיתוח מודרניים רשמיים:**

חסרה תמיכה רשמית בשרת שפה (LSP), שרתי MCP עבור AI, או תהליכי תרגום אוטומטיים ב-CLI.

## תחזוקה לעומת כלים מודרניים

| מאגר                  | כוכבים                                                                                                                                                 | סך כל ה-commits                                                                                                                                                     | Commits בשנה                                                                                                                                                       | Commit אחרון                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

פעילות ב-12 החודשים האחרונים:

- `intlify/vue-i18n`: **259 commits** (תיקונים שגרתיים ותחזוקת תלויות עבור Vue 3 / Nuxt).
- `aymericzip/intlayer`: **4,343 commits** (עבודה פעילה על אופטימיזציות קומפיילר, כלי LSP וסוכני AI).

[![תרשים היסטוריית כוכבים](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

<GithubCommits repositories="intlify/vue-i18n,aymericzip/intlayer" />

ספרייה בוגרת יכולה להיות שלמה. אולם סביבות פרונטאנד מודרניות מנצלות כיום טרנספורמציות AST בזמן build, הסרת קוד לא פעיל (dead-code elimination) ב-bundler, ותרגום המונע על ידי AI. ארכיטקטורה הכבולה לזמן ריצה מתקשה לאמץ פרדיגמות אלו.

> כדי להבין את מקורן של ספריות אלו, קראו על ההיסטוריה של בינאום ב-JavaScript.

- [ההיסטוריה של בינאום ב-JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/history_of_i18n.md)

## הורדות ב-npm

<NpmDownloads packages="vue-i18n,vue-intlayer" period="last-6-months" />

מספר ההורדות מתגמל את הפתרונות הוותיקים ביותר, ולא בהכרח את הטובים ביותר. ספרייה ששוחררה לפני שנים עדיין מותקנת על ידי כל פרויקט שבחר בה בעבר, על ידי כל הרצת CI ועל ידי כל חבילה שתלויה בה. הספירה משקפת אינרציה יותר מאשר בחירה מודעת ועדכנית.

עוזרי AI מגבירים את האפקט הזה. `next-intl`, `i18next` ו-`vue-i18n` מופיעות בכל מקום בקוד שעליו הם אומנו, ולכן הם ממליצים עליהן כברירת מחדל, ללא השוואה מעמיקה לחלופות. כל המלצה כזו מוסיפה הורדות, מה שמזין את ההמלצה הבאה. מומלץ להשוות לפי מבחני ביצועים (benchmarks) ולא לפי כמות ההורדות.

## מדידת ביצועים ב-Vite + Vue

ביצענו בדיקת ביצועים על יישום בעל 10 דפים ו-10 שפות שנבנה עם Vite ו-Vue 3:

<I18nBenchmark framework="vite-vue" packages="vue-i18n,@intlayer/vue-i18n,intlayer" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> נבדק בדפדפן אמיתי עם דחיסת gzip לייצור. נתונים מלאים ב-[תיעוד ביצועי Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md).

- [תיעוד ביצועי Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)

### תקורה של ספריית הבסיס

תקורה עוד לפני הוספת מחרוזות תרגום:

| ספרייה            | Gzipped    | Minified   |
| ----------------- | ---------- | ---------- |
| `vue-i18n@11.4.0` | 24.3 KB    | 83.2 KB    |
| `intlayer@8.7.12` | **2.7 KB** | **7.6 KB** |

זמן הריצה של `vue-i18n` בלבד שוקל **24.3 KB ב-gzip**, כמעט כמשקלה של ליבת Vue כולה. Intlayer מוסיפה **2.7 KB** בלבד.

### משקל הדף ודליפת תוכן

| הגדרה           | ממוצע JS לדף (gz) | דליפת שפה (Locale leak) | דליפת דפים אחרים | ממוצע לקומפוננטה (gz) |
| --------------- | ----------------- | ----------------------- | ---------------- | --------------------- |
| בסיס (ללא i18n) | 31.5 KB           | 0.0%                    | 90.0%            | 0.9 KB                |
| `vue-i18n`      | **136.4 KB**      | 50.2%                   | 90.0%            | 196.0 KB              |
| Intlayer        | **59.3 KB**       | 51.1%                   | **0.0%**         | **6.5 KB**            |

### ממצאים מרכזיים

**התנפחות משמעותית ביחס לבסיס:**

מכיוון שיישום בסיס ב-Vue הוא רזה מאוד (~31 KB), ‏`vue-i18n` מגדילה את נפח הדף יותר מפי 4.

**דליפת תוכן מדפים אחרים:**

כברירת מחדל, **90% מהטקסט המתורגם** שנשלח לנתיב שייך לדפים אחרים. Intlayer מסירה זאת לחלוטין ומגיעה ל-**0.0%**.

**משקל קומפוננטה מבודדת:**

קומפוננטות שקומפלו עם סקופ מקומי שקלו בממוצע 196 KB עם `vue-i18n` מכיוון שהקטלוגים שוכפלו בתוכן, לעומת **6.5 KB** עם Intlayer.

**כיצד הדליפה גדלה בהיקף רחב:**

מבחן הביצועים הוא נקודת מידע אחת. ביישום תיאורטי של 1 עד 10 דפים ב-1 עד 10 שפות (כ-30 KB של טקסט לדף), קטלוג מרכזי עם ייבוא סטטי צומח בשני הצירים. טעינה עצלה לפי שפה מסירה ציר אחד, הגדרת תוכן מקומית לכל קומפוננטה מסירה את הציר השני, ורק השילוב ביניהן שומר על נפח נמוך וקבוע.

![דליפת תוכן תיאורטית לפי ארכיטקטורה](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

## מדוע vue-i18n כבדה כל כך?

### קומפיילר AST הנשלח לדפדפן

`vue-i18n` מכילה קומפיילר פורמט הודעות משלה. כללי רבים והטמעות משתנים מנותחים לעצי תחביר מופשטים (AST) בזמן ריצה.

כדי להימנע מכך יש להגדיר כינויים ב-bundler עבור `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` ולקמפל מראש את הקטלוגים באמצעות `@intlify/unplugin-vue-i18n`. פרויקטים רבים מפספסים שלב זה, ובכך שולחים בשוגג קומפיילר שלם למשתמשי הקצה.

### חבילת תכונות מונוליטית

`vue-i18n` כוללת מנועים למספרים ותאריכים, מפענחי הודעות מקושרות, גשרי תאימות ל-Options API הישן (`$t`, `v-t`), ופרוקסי ריאקטיבי להודעות. גם אם אתם זקוקים רק לתרגומי מחרוזות פשוטים בתוך `<script setup>`, אתם משלמים בעומס של כל החבילה.

### מפתחות דינמיים פוגעים ב-Tree-Shaking

מכיוון ש-`"home.hero.title"` מפוענח בזמן ריצה, כלי ה-bundle אינם יכולים לוודא לאילו מפתחות יש גישה. מחרוזות שאינן בשימוש בקובצי ההודעות שלכם אינן יכולות להימחק ב-tree-shaking.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

ה-[קומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) עוקב אחר המאפיינים המדויקים ומסיר תוכן שאינו בשימוש לפני בניית ה-chunks של הלקוח. למידע נוסף ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md).

- [קומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)

## חוויית פיתוח (Developer Experience)

### קטלוגים מנותקים לעומת מיקום משותף (Co-Location)

ב-`vue-i18n`, הטקסטים שמורים בתיקיית `locales/` נפרדת. Intlayer מאפשרת למקם קובצי תוכן בעלי טיפוסים ישירות לצד הקומפוננטות:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/fr.json"
{
  "hero": {
    "title": "Livrez dans toutes les langues"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      fr: "Livrez dans toutes les langues",
      "he-IL": "שחררו בכל שפה",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

כאשר `Hero.vue` נמחקת או משתנה, קובץ התוכן שלה עובר או נמחק ביחד איתה.

### השלמה אוטומטית לעומת שלמות קפדנית

`DefineLocaleMessage` מספק השלמה אוטומטית ב-IDE על פי סכמת ברירת המחדל. עם זאת, הוא אינו מבטיח שלמות תרגום. השמטת מפתח מ-`fr.json` אינה גורמת לשגיאת TypeScript בזמן build.

עם Intlayer, המילונים מאומתים בקפדנות. הפעלת [`strictMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) הופכת תרגומים חסרים בכל שפה לשגיאות קומפילציה ברורות.

- [`strictMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

### כלים מודרניים עבור AI וסביבות פיתוח

| תכונה                          | `vue-i18n`           | Intlayer                                                                                                              |
| ------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **הרחבה ל-VS Code**            | צד שלישי (i18n Ally) | ✅ [הרחבה רשמית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)               |
| **שרת שפה (LSP)**              | ❌ אין               | ✅ [LSP משולב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)                               |
| **שרת MCP עבור AI**            | ❌ אין               | ✅ [שרת MCP מובנה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)                    |
| **כישורי סוכן (Agent Skills)** | ❌ אין               | ✅ [כישורים אוטונומיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)             |
| **CMS חזותי בהקשר הדף**        | ❌ אין               | ✅ [CMS חינמי ובקוד פתוח](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) |

## צינורות תרגום (Translation Pipelines)

`vue-i18n` אינה מציעה פקודת תרגום מקורית. צוותים בדרך כלל מייצאים JSON לפלטפורמות צד שלישי כמו Crowdin או Phrase.

Intlayer מספקת כלים מובנים:

**השלמה אוטומטית מקומית באמצעות AI ‏(`intlayer fill`):**

מתרגמת מפתחות חסרים באופן אוטומטי באמצעות מפתחות ה-API שלכם ב-OpenAI, ‏Anthropic, ‏Mistral או Gemini.

**CMS חזותי הניתן לאירוח עצמי:**

השתמשו ב-[Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) כדי לאפשר לאנשים שאינם מפתחים לערוך תוכן בעוד השינויים נשמרים ישירות ל-Git.

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

**רישיון קוד פתוח מתירני:**

כל ערכת הכלים מופצת תחת רישיון Apache 2.0.

## מתי vue-i18n היא עדיין הבחירה הנכונה

<AccordionGroup>
<Accordion header="יישומי Nuxt 2/3 גדולים וקיימים">

אם ארכיטקטורת הניתוב שלכם מקושרת עמוקות ל-`@nuxtjs/i18n` ופועלת ביציבות, ייתכן ששכתוב לא יספק החזר מיידי על ההשקעה.

</Accordion>
<Accordion header="עיצוב ICU מורכב">

אם אתם מסתמכים באופן נרחב על הודעות מקושרות, מעבדי תאריכים מורכבים או כללי רבים מותאמים אישית.

</Accordion>
<Accordion header="פרויקטי תחביב קטנים">

אם גודל ה-bundle אינו מהווה מגבלה עבורכם.

</Accordion>
</AccordionGroup>

## כיצד לשפר את מערך ה-vue-i18n הקיים?

Intlayer מציעה חבילות תאימות drop-in ששומרות על אותן חתימות פונקציה בדיוק של `vue-i18n` ושל `@nuxtjs/i18n` (כגון `useI18n`, `$t`, `<i18n-t>`). אינכם צריכים לשכתב את התבניות או ה-composables שלכם כדי להתחיל להרוויח מארכיטקטורה קלה ומונעת קומפיילר.

ההגדרה דורשת פקודה אחת:

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

ה-CLI האינטראקטיבי:

1. מתקין את חבילת התאימות `@intlayer/vue-i18n` או `@intlayer/nuxt-i18n`.
2. מגדיר כינויים ב-Vite או Nu bundler כך שהייבואים והשימושים הקיימים בתבניות ינותבו ישירות ל-Intlayer, מה שמאפשר להסיר את `vue-i18n` מ-`package.json`.
3. מפעיל מיידית אבחון שרת שפה (LSP), מסיר את מנתח ה-AST הכבד (24 KB) מה-bundle של הלקוח, ופותח תהליכי תרגום מבוססי AI מקומיים ללא צורך בשכתוב משמעותי.

להנחיות שלב אחר שלב, עיינו במדריכים הייעודיים שלנו:

- **תאימות Drop-in:** שמרו על התבניות הקיימות באמצעות [שכבת התאימות של `vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/vue-i18n.md) או [שכבת התאימות של `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/nuxtjs-i18n.md).
- **מדריכי הגירה אוטומטיים:** המירו קובצי JSON ישנים למילונים מובנים עם המדריכים שלנו: [מ-vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_vue-i18n_to_intlayer.md) או [מ-@nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_nuxtjs_i18n_to_intlayer.md).
- **מערך היברידי:** שמרו על `vue-i18n` בזמן ריצה בעת [שימוש ב-Intlayer לצד vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/intlayer_with_vue-i18n.md) לבטיחות טיפוסים מקומית ותרגום מבוסס AI.

סרקו את האתר החי שלכם למדידת נפח ודליפות תוכן בעזרת הכלי החינמי [סורק SEO ל-i18n](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## קריאה נוספת

- [Vue & Vite i18n Benchmark: ניתוח ביצועים מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/vue.md)
- [vue-i18n מול Intlayer: השוואה תכונה אחר תכונה](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/vue-i18n_vs_intlayer.md)
- [האם next-intl מיושנת ב-2026?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/is_next-intl_outdated.md)
- [בינאום מונחה קומפיילר מול בינאום הצהרתי](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he-IL/compiler_vs_declarative_i18n.md)
