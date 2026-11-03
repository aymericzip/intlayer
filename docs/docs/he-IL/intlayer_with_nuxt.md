---
createdAt: 2025-06-18
updatedAt: 2026-11-03
priority: 9
title: "Nuxt i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer ב-Nuxt: תוכן מוקלד לפי רכיב, ניתוב וזיהוי שפות, מטא SEO מותאם אישית ומפת אתר רב-לשונית."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - nuxt-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-nuxt-4-template
applicationShowcase: https://intlayer-nuxt-4-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=nhUcUAVQ6eQ
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 7.3.13
    date: 2025-12-08
    changes: "תצורת TypeScript שאינה בשימוש"
  - version: 7.3.11
    date: 2025-12-07
    changes: "עדכון LocaleSwitcher, SEO, מטא-נתונים"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-Nuxt וה-Vue שלך באמצעות Intlayer

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `@nuxtjs/i18n` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא ל-Nuxt">

Intlayer מותאם לפעול בצורה מושלמת עם Nuxt על ידי אספקת **ניתוב רב-לשוני**, **middleware לזיהוי שפה**, **מפת אתר (sitemap)**, וכל התכונות הדרושות להרחבת בינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלך, טען רק את התוכן הדרוש. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלך בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

תיחום התוכן של האפליקציה שלך **מקל על התחזוקה** של אפליקציות בקנה מידה גדול. באפשרותך לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המנטלי של סקירת כל קוד התוכן שלך. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלך.

</Accordion>
<Accordion header="סוכני AI (AI Agents)">

מיקום משותף של תוכן (Co-locating) **מפחית את ההקשר הדרוש** למודלי שפה גדולים (LLMs). Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)** ו**[כישורי סוכן (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמש באוטומציה כדי לתרגם בצינור ה-CI/CD שלך בעזרת ה-LLM לבחירתך בעלות ספק ה-AI שלך. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, כמו גם [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) כדי לסייע **בתרגום ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול לגרום לבעיות ביצועים וריאקטיביות. Intlayer מבצע אופטימיזציה לטעינת התוכן בזמן הבנייה.

</Accordion>
<Accordion header="הרחבה עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n, Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באחסון עצמי** ו**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** שיעזרו לך לנהל את התוכן הרב-לשוני שלך **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, קופירייטרים וחברי צוות אחרים לחלק. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Nuxt

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="כיצד לתרגם אפליקציית Nuxt ו-Vue באמצעות Intlayer? גלו את Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/nhUcUAVQ6eQ?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-nuxt-4-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת CodeSandbox - כיצד לבצע בינאום באפליקציה שלך באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="הדגמה" value="demo">

<iframe
  src="https://intlayer-nuxt-4-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמה - intlayer-nuxt-4-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-nuxt-4-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקן את החבילות הדרושות באמצעות npm:

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

> הדגל `--interactive` הוא אופציונלי. השתמש ב-`intlayer-cli init` אם אתה סוכן AI.

> פקודה זו תזהה את הסביבה שלך ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer vue-intlayer
npm install --save-dev nuxt-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add --save-dev nuxt-intlayer
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add --save-dev nuxt-intlayer
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add --dev nuxt-intlayer
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md), טרנספילציה ו[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

- **vue-intlayer**
  החבילה המשלבת את Intlayer באפליקציית Vue. היא מספקת את ה-composables עבור רכיבי Vue.

- **nuxt-intlayer**
  מודול ה-Nuxt המשלב את Intlayer באפליקציות Nuxt. הוא מספק הגדרה אוטומטית, middleware לזיהוי שפה, ניהול עוגיות והפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלך">

### ארכיטקטורה

בארכיטקטורה זו, נתיבי הדפים ב-`pages/` מותאמים אוטומטית לשפות על ידי המודול `nuxt-intlayer`. דפים, תבניות פריסה (layouts) ורכיבים צורכים הצהרות תוכן מותאמות שהוגדרו בספריית `content/`.

```bash
.
├── app.vue                           # רכיב השורש
├── components
│   ├── Links.vue
│   └── LocaleSwitcher.vue
├── composables
│   └── useI18nHTMLAttributes.ts
├── content
│   ├── about-page.content.ts
│   └── home-page.content.ts
├── layouts
│   └── default.vue
├── pages
│   ├── about.vue
│   └── index.vue
├── intlayer.config.ts
├── nuxt.config.ts
├── package.json
└── tsconfig.json
```

### תצורה

צור קובץ תצורה כדי להגדיר את השפות של האפליקציה שלך:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // השפות הנוספות שלך
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> באמצעות קובץ תצורה זה, תוכל להגדיר כתובות URL מותאמות לשפה, הפניות של middleware, שמות של קובצי cookie, מיקום וסיומות של הצהרות התוכן שלך, להשבית יומני Intlayer במסוף, ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיין ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בתצורת ה-Nuxt שלך">

הוסף את מודול ה-intlayer לתצורת ה-Nuxt שלך:

```typescript fileName="nuxt.config.ts"
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // ... תצורת ה-Nuxt הקיימת שלך
  modules: ["nuxt-intlayer"],
});
```

> המודול `nuxt-intlayer` מטפל אוטומטית בשילוב Intlayer עם Nuxt. הוא מגדיר את בניית הצהרות התוכן, מנטר קבצים במצב פיתוח, מספק middleware לזיהוי שפה ומנהל ניתוב מותאם לשפות.

</Step>
<Step number={4} title="הצהרה על התוכן שלך">

צור ונהל את הצהרות התוכן שלך כדי לאחסן תרגומים:

```tsx fileName="content/home-page.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { type Dictionary, t } from "intlayer";

const content = {
  key: "home-page",
  content: {
    title: t({
      he: "שלום עולם",
      en: "Hello world",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
    metaTitle: t({
      he: "ברוכים הבאים | האפליקציה שלי",
      en: "Welcome | My Application",
      fr: "Bienvenue | Mon Application",
      es: "Bienvenido | Mi Aplicación",
    }),
    metaDescription: t({
      he: "גלו את דף הבית הרב-לשוני של אפליקציית ה-Nuxt שלכם המופעלת על ידי Intlayer.",
      en: "Discover your multilingual Nuxt app homepage powered by Intlayer.",
      fr: "Découvrez la page d'accueil multilingue de votre application Nuxt propulsée par Intlayer.",
      es: "Descubre la página de inicio multilingüe de tu aplicación Nuxt impulsada por Intlayer.",
    }),
  },
} satisfies Dictionary;

export default content;
```

> הצהרות התוכן שלך יכולות להיות מוגדרות בכל מקום באפליקציה שלך, כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיין ב[תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

</Step>
<Step number={5} title="שימוש ב-Intlayer בקוד שלך">

גש למילוני התוכן שלך ברחבי אפליקציית ה-Nuxt שלך באמצעות ה-composable של `useIntlayer`:

```vue fileName="components/HelloWorld.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

defineProps({
  msg: String,
});

const {
  count,
  edit,
  checkOut,
  nuxtIntlayer,
  learnMore,
  nuxtDocs,
  readTheDocs,
} = useIntlayer("helloworld");
const countRef = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <p>
    <checkOut />
    <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank"
      >Nuxt</a
    >, <nuxtIntlayer />
  </p>
  <p>
    <learnMore />
    <a href="https://nuxt.com" target="_blank"><nuxtDocs /></a>.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

#### גישה לתוכן ב-Intlayer

Intlayer מציע ממשקי API שונים לגישה לתוכן שלך:

- **תחביר מבוסס רכיבים** (מומלץ):
  השתמש בתחביר `<myContent />`, או `<Component :is="myContent" />` כדי לרנדר תוכן כצומת Intlayer. הדבר משתלב בצורה חלקה עם [העורך החזותי (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) ו-[ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

- **תחביר מבוסס מחרוזת**:
  השתמש ב-`{{ myContent }}` כדי לרנדר את התוכן כטקסט פשוט, ללא תמיכה בעורך החזותי.

- **תחביר HTML גולמי**:
  השתמש ב-`<div v-html="myContent" />` כדי לרנדר את התוכן כ-HTML גולמי, ללא תמיכה בעורך החזותי.

- **תחביר פירוק (Destructuring)**:
  ה-composable של `useIntlayer` מחזיר Proxy עם התוכן. ניתן לפרק Proxy זה כדי לגשת לתוכן תוך שמירה על הריאקטיביות.
  - השתמש ב-`const content = useIntlayer("myContent");` ו-`{{ content.myContent }}` / `<content.myContent />`.
  - או השתמש ב-`const { myContent } = useIntlayer("myContent");` ו-`{{ myContent}}` / `<myContent/>` כדי לפרק את התוכן.

</Step>
<Step number={6} title="שינוי שפת התוכן שלך" isOptional={true}>

כדי לשנות את שפת התוכן שלך, תוכל להשתמש בפונקציה `setLocale` המסופקת על ידי ה-composable `useLocale`. פונקציה זו מאפשרת לך להגדיר את שפת האפליקציה ולעדכן את התוכן בהתאם.

צור רכיב להחלפה בין שפות באמצעות `NuxtLink`. **שימוש בקישורים במקום כפתורים עבור החלפת שפה הוא שיטה מומלצת עבור SEO וגילוי דפים**, מכיוון שהוא מאפשר למנועי חיפוש לסרוק ולאנדקס את כל הגרסאות המותאמות לשפה של הדפים שלך:

```vue fileName="components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

// Nuxt מייבא אוטומטית את useRoute
const route = useRoute();
const { locale, availableLocales, setLocale } = useLocale();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeEl in availableLocales"
      :key="localeEl"
      :to="getLocalizedUrl(route.fullPath, localeEl)"
      class="locale-link"
      :class="{ 'active-locale': localeEl === locale }"
      @click="setLocale(localeEl)"
    >
      {{ getLocaleName(localeEl) }}
    </NuxtLink>
  </nav>
</template>
```

> שימוש ב-`NuxtLink` עם מאפייני `href` תקינים (באמצעות `getLocalizedUrl`) מבטיח שמנועי חיפוש יוכלו לגלות את כל גרסאות השפה של הדפים שלך. זה עדיף על החלפת שפה מבוססת JavaScript בלבד, שמנועי חיפוש עשויים שלא לעקוב אחריה.

לאחר מכן, הגדר את `app.vue` שלך לשימוש בפריסות (layouts):

```vue fileName="app.vue"
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

</Step>
<Step number={7} title="הוספת ניתוב מותאם לשפות (localized routing) לאפליקציה שלך" isOptional={true}>

Nuxt מטפל אוטומטית בניתוב מותאם לשפות בעת שימוש במודול `nuxt-intlayer`. הדבר יוצר נתיבים עבור כל שפה באופן אוטומטי בהתבסס על מבנה ספריית ה-pages שלך.

דוגמה:

```plaintext
pages/
├── index.vue          → /, /fr, /es
├── about.vue          → /about, /fr/about, /es/about
└── contact/
    └── index.vue      → /contact, /fr/contact, /es/contact
```

כדי ליצור דפים מותאמים לשפה, פשוט צור את קובצי ה-Vue שלך בספריית `pages/`. הנה שני דפים לדוגמה:

**דף הבית (`pages/index.vue`):**

```vue fileName="pages/index.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("home-page");

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

**דף אודות (`pages/about.vue`):**

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // שימוש ב-.raw לגישה למחרוזת פרימיטיבית
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // שימוש ב-.raw לגישה למחרוזת פרימיטיבית
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> הערה: `useHead` מיובא אוטומטית ב-Nuxt. תוכל לגשת לערכי תוכן באמצעות `.value` (ריאקטיבי) או `.raw` (מחרוזת פרימיטיבית) בהתאם לצרכים שלך.

המודול `nuxt-intlayer` יבצע אוטומטית:

- זיהוי השפה המועדפת על המשתמש
- טיפול בהחלפת שפה דרך כתובת ה-URL
- הגדרת המאפיין המתאים של `<html lang="">`
- ניהול עוגיות שפה
- הפניית משתמשים לכתובת ה-URL המותאמת לשפה המתאימה

</Step>
<Step number={8} title="יצירת רכיב קישור מותאם לשפה (Localized Link)" isOptional={true}>

כדי להבטיח שהניווט באפליקציה שלך יכבד את השפה הנוכחית, תוכל ליצור רכיב `Links` מותאם אישית. רכיב זה מוסיף אוטומטית קידומת של השפה הנוכחית לכתובות URL פנימיות, דבר החיוני עבור **SEO וגילוי דפים**.

```vue fileName="components/Links.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "vue-intlayer";

interface Props {
  href: string;
  locale?: string;
}

const props = defineProps<Props>();

const { locale: currentLocale } = useLocale();

// חישוב הנתיב הסופי
const finalPath = computed(() => {
  // 1. בדיקה אם הקישור חיצוני
  const isExternal = /^https?:\/\//.test(props.href || "");

  // 2. אם חיצוני, החזר כפי שהוא (NuxtLink מטפל ביצירת תגית ה-<a>)
  if (isExternal) return props.href;

  // 3. אם פנימי, התאם את כתובת ה-URL לשפה
  const targetLocale = props.locale || currentLocale.value;
  return getLocalizedUrl(props.href, targetLocale);
});
</script>

<template>
  <NuxtLink :to="finalPath" v-bind="$attrs">
    <slot />
  </NuxtLink>
</template>
```

לאחר מכן השתמש ברכיב זה ברחבי האפליקציה שלך:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>
```

> שימוש ב-`NuxtLink` עם נתיבים מותאמים לשפה מבטיח כי:
>
> - מנועי חיפוש יוכלו לסרוק ולאנדקס את כל גרסאות השפה של הדפים שלך
> - משתמשים יוכלו לשתף ישירות כתובות URL מותאמות לשפה
> - היסטוריית הדפדפן תפעל כהלכה עם כתובות URL בעלות קידומת שפה

</Step>
<Step number={9} title="טיפול במטא-נתונים וב-SEO" isOptional={true}>

Nuxt מספק יכולות SEO מצוינות באמצעות ה-composable של `useHead` (מיובא אוטומטית). תוכל להשתמש ב-Intlayer לטיפול במטא-נתונים מותאמים לשפה באמצעות הגישה דרך `.raw` או `.value` כדי לקבל את ערך המחרוזת הפרימיטיבי:

```vue fileName="pages/about.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

// useHead מיובא אוטומטית ב-Nuxt
const content = useIntlayer("about-page");

useHead({
  title: content.metaTitle.raw, // שימוש ב-.raw לגישה למחרוזת פרימיטיבית
  meta: [
    {
      name: "description",
      content: content.metaDescription.raw, // שימוש ב-.raw לגישה למחרוזת פרימיטיבית
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
```

> לחלופין, תוכל להשתמש בפונקציה `import { getIntlayer } from "intlayer"` כדי לקבל את התוכן ללא הריאקטיביות של Vue.

> **גישה לערכי תוכן:**
>
> - השתמש ב-`.raw` כדי לקבל את ערך המחרוזת הפרימיטיבי (לא ריאקטיבי)
> - השתמש ב-`.value` כדי לקבל את הערך הריאקטיבי
> - השתמש בתחביר הרכיב `<content.key />` עבור תמיכה בעורך החזותי

צור את הצהרת התוכן המתאימה:

```ts fileName="pages/about-page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    metaTitle: t({
      he: "אודותינו - החברה שלי",
      en: "About Us - My Company",
      fr: "À Propos - Ma Société",
      es: "Acerca de Nosotros - Mi Empresa",
    }),
    metaDescription: t({
      he: "למדו עוד על החברה שלנו והחזון שלנו",
      en: "Learn more about our company and our mission",
      fr: "En savoir plus sur notre société et notre mission",
      es: "Conozca más sobre nuestra empresa y nuestra misión",
    }),
    title: t({
      he: "אודותינו",
      en: "About Us",
      fr: "À Propos",
      es: "Acerca de Nosotros",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
```

```json fileName="pages/about-page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-page",
  "content": {
    "metaTitle": {
      "nodeType": "translation",
      "translation": {
        "he": "אודותינו - החברה שלי",
        "en": "About Us - My Company",
        "fr": "À Propos - Ma Société",
        "es": "Acerca de Nosotros - Mi Empresa"
      }
    },
    "metaDescription": {
      "nodeType": "translation",
      "translation": {
        "he": "למדו עוד על החברה שלנו והחזון שלנו",
        "en": "Learn more about our company and our mission",
        "fr": "En savoir plus sur notre société et notre mission",
        "es": "Conozca más sobre nuestra empresa y nuestra misión"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "he": "אודותינו",
        "en": "About Us",
        "fr": "À Propos",
        "es": "Acerca de Nosotros"
      }
    }
  }
}
```

</Step>
<Step number="6b" title="יצירת פריסה (Layout) עם ניווט" isOptional={true}>

פריסות Nuxt מאפשרות לך להגדיר מבנה משותף לדפים שלך. צור פריסת ברירת מחדל הכוללת את בורר השפות והניווט:

```vue fileName="layouts/default.vue"
<script setup lang="ts">
import Links from "~/components/Links.vue";
import LocaleSwitcher from "~/components/LocaleSwitcher.vue";
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>
```

רכיב ה-`Links` (המוצג למטה) מבטיח שקישורי הניווט הפנימיים יותאמו אוטומטית לשפה הנבחרת.

</Step>

</Steps>

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. זה מאפשר לך להימנע מביצוע commit שלהם למאגר ה-Git שלך.

כדי לעשות זאת, תוכל להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלך:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### הרחבת VS Code

כדי לשפר את חוויית הפיתוח שלך עם Intlayer, תוכל להתקין את **הרחבת Intlayer הרשמית ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטבעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בהרחבה, עיין ב[תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md).

- [תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)

### Vue Devtools

`vue-intlayer` רושם פאנל **Intlayer** ב-[Vue Devtools](https://devtools.vuejs.org/) היישר מהקופסה. פתח את לשונית ה-**Vue** בכלי הפיתוח של הדפדפן ובחר ב-**Intlayer** בסרגל הצד כדי לבדוק את המילונים שלך ואת התרגומים שלהם לפי שפה, או כדי להחליף את השפה הנוכחית של האפליקציה.

כאשר ה[עורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) מוגדר, ניתן לערוך תרגומי טקסט פשוט ישירות מתוך הפאנל: השינויים נכתבים בחזרה לקובצי הצהרת התוכן שלך ונטענים מחדש באפליקציה (hot-reloaded).

### להתקדם הלאה

כדי להתקדם הלאה, תוכל להטמיע את ה[עורך החזותי (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) או להעביר את התוכן שלך החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Nuxt?">

שתי אפשרויות מעשיות:

- **`@nuxtjs/i18n`**: המודול המבוסס הוותיק, הבנוי על `vue-i18n`, עם קובצי שפה הנטענים לכל דף ומשטח תצורה רחב. ל-`vue-i18n` אין דרך לבודד מרחבי שמות להודעות, כך שכל דף מאגד את ההודעות של כל דף אחר, וחבילה זו ממשיכה לגדול ככל שמתווספים דפים לאפליקציה.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלך ([לצד כל רכיב או מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומעובד בזמן הבנייה, בעל טיפוסיות מלאה, עם ניתוב מודע לשפה, תרגום AI, עורך חזותי ו-CMS.

ההבדל הוא היכן התוכן חי. `@nuxtjs/i18n` מרכז אותו בקובצי `locales/*.json`, בעוד ש-Intlayer ממקם אותו לצד הרכיב שמרנדר אותו, כך שדף שולח רק את הרשומות שבהן הוא משתמש, וניתן להעביר או למחוק תיקיית פיצ'ר כיחידה אחת. עיין ב[למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md) וב[השוואת ביצועים עבור Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)
- [השוואת ביצועים עבור Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md)

</Question>
<Question title="כמה תוספת בינאום מוסיפה לגודל ה-bundle שלי ב-Nuxt?">

הרבה פחות מהגדרה מבוססת מרחב שמות, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. תוכן המרונדר בשרת (SSR) נפתר בשרת, והמהדר בזמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שבהן הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש מושמטים, ו[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל ה-bundle והדפים בעד 50%. עיין ב[אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md)

</Question>
<Question title="האם אוכל לעבור מ-`@nuxtjs/i18n` או `vue-i18n` מבלי לשכתב את הרכיבים שלי?">

כן, ויש שני נתיבים. תוכל להעביר את התוכן בהדרגה בעזרת [מדריך המעבר מ-@nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_nuxtjs_i18n_to_intlayer.md). לחלופין, תוכל לשמור על ה-API הנוכחי שלך במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md) חושפים בדיוק את אותו ה-API כמו `vue-i18n`, אך מוגשים על ידי מילוני Intlayer, כך שרק הייבוא משתנה וקוד הרכיבים נשאר זהה.

- [מדריך מעבר מ-@nuxtjs/i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_nuxtjs_i18n_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md)

</Question>
<Question title="האם אוכל לשמור על קובצי התרגום הקיימים שלי בפורמט JSON?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלך כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לך לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הפעל את `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלך, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכל לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. עיין ב[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

עבור צינור אוטומטי לחלוטין, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) מבצע את אותו הדבר בזמן הבנייה על קוד מקור של JSX, TSX, Vue ו-Svelte, ומייצר את המילונים בכל שינוי כך שאין מפתחות לתחזק ידנית. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה נשארות מחוץ להישג יד, והוא זקוק לכמה הערות כדי להבדיל בין טקסט המוצג למשתמש לבין לוגיקת האפליקציה.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

</Question>
<Question title="אילו כלי עריכה וכלי סוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: מעבר ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל האזכורים (find all references), תצוגה מקדימה בריחוף מעל ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא פותר גם קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שמסייע בזמן המעבר.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית משיב מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת כישור לכל framework, המלמדים סוכן את הגדרות הניתוב שלך ואת סוגי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם Intlayer עובד עם רינדור צד שרת (SSR) ויצירה סטטית ב-Nuxt?">

כן. תוכן נפתר במהלך SSR ובמהלך `nuxt generate`, כך שדפים שעברו רינדור מוקדם מכילים את ה-markup המתורגם במקום לאחזר קטלוג בצד הלקוח. המודול `nuxt-intlayer` מחבר את ה-provider ואת זיהוי השפה עבורך.

</Question>
<Question title="האם חובה לשים את השפה בכתובת ה-URL?">

לא. `routing.mode` מקבל `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`), `"prefix-all"`, `"no-prefix"` ו-`"search-params"`, ו-`routing.domains` ממפה כל שפה לדומיין משלה. עיין ב[מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Question>
<Question title="כיצד אני מטפל במטא-נתונים של SEO ובתגיות hreflang ב-Nuxt?">

שלב 9 במדריך זה מכסה זאת. מטא-נתונים מותאמים אישית של `useHead` מגיעים מהמילונים שלך, ו-`getMultilingualUrls` בונה את החלופות של `hreflang` עבור כל שפה מוצהרת, כולל `x-default`, שזהו גם מה שמזין מפת אתר מותאמת לשפות.

</Question>
<Question title="כיצד אני בונה בורר שפות ששומר על הדף הנוכחי?">

השתמש ב-`useLocale` עבור השפה הפעילה והשפות הזמינות, וברכיב הקישור המותאם משלב 8 כדי שהניווט יישאר בשפה הנוכחית. `getLocalizedUrl` משכתב את הנתיב הנוכחי לשפת היעד, כך שהחלפת שפה שומרת את הקורא באותו הנתיב.

</Question>
<Question title="כיצד אני מתרגם אפליקציית Nuxt באופן אוטומטי בעזרת AI?">

הפעל את `npx intlayer fill`. תרגומים חסרים ממולאים בעזרת ה-LLM לבחירתך באמצעות הספק ומפתח ה-API שלך, ו-`--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף. עיין ב[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) וב[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר בתבניות Vue?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md), תנאים, [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md) ו[מעצבי פורמט (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)
- [מעצבי פורמט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות ה[עורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md), הפועל על התשתית שלך ומאפשר לכל אחד לערוך טקסט במקום באפליקציה הפועלת, או ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md), המוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחודשת (deployment).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md).

- [אירוח עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)

</Question>

</FAQ>
