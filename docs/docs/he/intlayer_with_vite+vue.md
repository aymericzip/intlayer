---
createdAt: 2025-04-18
updatedAt: 2026-11-03
priority: 9
title: "Vite + Vue i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer באפליקציית Vite ו-Vue: תוכן מוקלד לפי רכיב עם composables, בורר שפות וניתוב מותאם לשפות."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Vite
  - Vue
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-vue
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vue-template
applicationShowcase: https://intlayer-vite-vue-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=IE3XWkZ6a5U
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.5.0
    date: 2026-03-24
    changes: "החלפת installIntlayer ב-use(intlayer)"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-Vite וה-Vue שלך באמצעות Intlayer

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `vue-i18n` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא ל-Vue">

Intlayer מותאם לפעול בצורה מושלמת עם Vue על ידי מתן **תחימת תוכן ברמת הרכיב (component-level content scoping)**, **תרגומים ריאקטיביים**, וכל התכונות הדרושות להרחבת בינאום (i18n).

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

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Vite ו-Vue

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="פתרון ה-i18n הטוב ביותר עבור Vite ו-Vue? גלו את Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/IE3XWkZ6a5U?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vue-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת CodeSandbox - כיצד לבצע בינאום באפליקציה שלך באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="הדגמה" value="demo">

<iframe
  src="https://intlayer-vite-vue-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמה - intlayer-vite-vue-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-vite-vue-template) ב-GitHub.

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
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer vue-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md), טרנספילציה ו[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

- **vue-intlayer**
  החבילה המשלבת את Intlayer באפליקציית Vue. היא מספקת ספקי הקשר (context providers) ו-composables עבור בינאום ב-Vue.

- **vite-intlayer**
  כולל את תוסף ה-Vite לשילוב Intlayer עם [הבאנדלר Vite](https://vite.dev/guide/why.html#why-bundle-for-production), וכן תוכנת ביניים (middleware) לזיהוי השפה המועדפת של המשתמש, ניהול עוגיות וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלך">

### ארכיטקטורה

בארכיטקטורה זו, `vue-intlayer` מספק את התוסף המותקן ב-`main.ts`. רכיבי Vue מצהירים וצורכים תרגומים באופן מקומי באמצעות composables, כאשר טעינה חמה מחדש (HMR) של Vite מטופלת על ידי `vite-intlayer`.

```bash
.
├── src
│   ├── app.content.ts
│   ├── App.vue                       # רכיב השורש
│   ├── components
│   │   ├── helloWorld
│   │   │   ├── helloWorld.content.ts
│   │   │   └── HelloWorld.vue
│   │   └── LocaleSwitcher.vue
│   ├── main.ts                       # נקודת כניסה המתקינה את תוסף vue-intlayer
│   └── style.css
├── index.html
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
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
<Step number={3} title="שילוב Intlayer בתצורת ה-Vite שלך">

הוסף את התוסף של intlayer לתצורה שלך.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), intlayer()],
});
```

> תוסף ה-Vite `intlayer()` משמש לשילוב Intlayer ב-Vite. הוא מבטיח את בניית קובצי הצהרת התוכן ומנטר אותם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={4} title="הצהרה על התוכן שלך">

צור ונהל את הצהרות התוכן שלך כדי לאחסן תרגומים:

```tsx fileName="src/helloWorld.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "helloworld",
  content: {
    count: t({
      he: "הספירה היא ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),
    edit: t({
      he: "ערוך את <code>components/HelloWorld.vue</code> ושמור כדי לבדוק HMR",
      en: "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
      fr: "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
      es: "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR",
    }),
    checkOut: t({
      he: "בדוק את ",
      en: "Check out ",
      fr: "Vérifiez ",
      es: "Compruebe ",
    }),
    officialStarter: t({
      he: ", תבנית ההתחלה הרשמית של Vue + Vite",
      en: ", the official Vue + Vite starter",
      fr: ", le starter officiel Vue + Vite",
      es: ", el starter oficial Vue + Vite",
    }),
    learnMore: t({
      he: "למד עוד על תמיכת IDE עבור Vue ב-",
      en: "Learn more about IDE Support for Vue in the ",
      fr: "En savoir plus sur le support IDE pour Vue dans le ",
      es: "Aprenda más sobre el soporte IDE para Vue en el ",
    }),
    vueDocs: t({
      he: "מדריך הרחבת התיעוד של Vue",
      en: "Vue Docs Scaling up Guide",
      fr: "Vue Docs Scaling up Guide",
      es: "Vue Docs Scaling up Guide",
    }),
    readTheDocs: t({
      he: "לחץ על הסמלים של Vite ו-Vue כדי ללמוד עוד",
      en: "Click on the Vite and Vue logos to learn more",
      fr: "Cliquez sur les logos Vite et Vue pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Vue para obtener más información",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="src/helloWorld.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "helloworld",
  "content": {
    "count": {
      "nodeType": "translation",
      "translation": {
        "he": "הספירה היא ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "he": "ערוך את <code>components/HelloWorld.vue</code> ושמור כדי לבדוק HMR",
        "en": "Edit <code>components/HelloWorld.vue</code> and save to test HMR",
        "fr": "Éditez <code>components/HelloWorld.vue</code> et enregistrez pour tester HMR",
        "es": "Edita <code>components/HelloWorld.vue</code> y guarda para probar HMR"
      }
    },
    "checkOut": {
      "nodeType": "translation",
      "translation": {
        "he": "בדוק את ",
        "en": "Check out ",
        "fr": "Vérifiez ",
        "es": "Compruebe "
      }
    },
    "officialStarter": {
      "nodeType": "translation",
      "translation": {
        "he": "תבנית ההתחלה הרשמית של Vue + Vite",
        "en": "the official Vue + Vite starter",
        "fr": "le starter officiel Vue + Vite",
        "es": "el starter oficial Vue + Vite"
      }
    },
    "learnMore": {
      "nodeType": "translation",
      "translation": {
        "he": "למד עוד על תמיכת IDE עבור Vue ב-",
        "en": "Learn more about IDE Support for Vue in the ",
        "fr": "En savoir plus sur le support IDE pour Vue dans le ",
        "es": "Aprenda más sobre el soporte IDE para Vue en el "
      }
    },
    "vueDocs": {
      "nodeType": "translation",
      "translation": {
        "he": "מדריך הרחבת התיעוד של Vue",
        "en": "Vue Docs Scaling up Guide",
        "fr": "Vue Docs Scaling up Guide",
        "es": "Vue Docs Scaling up Guide"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "he": "לחץ על הסמלים של Vite ו-Vue כדי ללמוד עוד",
        "en": "Click on the Vite and Vue logos to learn more",
        "fr": "Cliquez sur les logos Vite et Vue pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Vue para obtener más información"
      }
    }
  }
}
```

> הצהרות התוכן שלך יכולות להיות מוגדרות בכל מקום באפליקציה שלך, כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיין ב[תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

</Step>
<Step number={5} title="שימוש ב-Intlayer בקוד שלך">

כדי להשתמש בתכונות הבינאום של Intlayer ברחבי אפליקציית ה-Vue שלך, תחילה עליך לרשום את מופע ה-singleton של Intlayer בקובץ הראשי שלך. שלב זה חיוני מכיוון שהוא מספק את הקשר הבינאום לכל הרכיבים באפליקציה שלך, ומאפשר גישה לתרגומים בכל מקום בעץ הרכיבים.

```javascript fileName=main.js
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

// הזרקת ה-provider ברמה העליונה
app.use(intlayer);

// הרכבת האפליקציה
app.mount("#app");
```

> באפשרותך גם לקרוא ישירות לפונקציה `installIntlayer(app)` אם תעדיף:
>
> ```javascript
> import { intlayer } from "vue-intlayer";
> app.use(intlayer);
> ```

גש למילוני התוכן שלך ברחבי האפליקציה על ידי יצירת רכיב Vue ראשי ושימוש ב-composables של `useIntlayer`:

```vue fileName="src/HelloWord.vue"
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
  officialStarter,
  learnMore,
  vueDocs,
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
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
  <p class="read-the-docs">{{ readTheDocs }}</p>
</template>
```

> אם האפליקציה שלך כבר קיימת, תוכל להשתמש ב-[Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md), כמו גם ב[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md), כדי להמיר אלפי רכיבים בשניות.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)
- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

#### גישה לתוכן ב-Intlayer

Intlayer מציע ממשקי API שונים לגישה לתוכן שלך:

- **תחביר מבוסס רכיבים** (מומלץ):
  השתמש בתחביר `<myContent />`, או `<Component :is="myContent" />` כדי לרנדר תוכן כצומת Intlayer. ניתן גם להתאים אישית את הרינדור באמצעות השיטה `.use()`: `<Component :is="myContent.use({ b: (props) => h('strong', props) })" />`. הדבר משתלב בצורה חלקה עם [העורך החזותי (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) ו-[ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

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

צור רכיב למעבר בין שפות:

```vue fileName="src/components/LocaleSwitcher.vue"
<script setup lang="ts">
import { getLocaleName } from "intlayer";
import { ref, watch } from "vue";
import { useLocale } from "vue-intlayer";

// קבלת פרטי השפה ופונקציית setLocale
const { locale, availableLocales, setLocale } = useLocale();

// מעקב אחר השפה שנבחרה בעזרת ref
const selectedLocale = ref(locale.value);

// עדכון השפה כאשר הבחירה משתנה
const changeLocale = () => setLocale(selectedLocale.value);

// שמירה על סנכרון של selectedLocale עם השפה הגלובלית
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>

<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>
```

לאחר מכן, השתמש ברכיב זה ב-App.vue שלך:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
import HelloWorld from "@components/HelloWorld.vue";
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
import { ref, watch } from "vue";

const content = useIntlayer("app"); // יצירת קובץ הצהרת intlayer מתאים
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>
```

</Step>
<Step number={7} title="הוספת ניתוב מותאם לשפות (localized routing) לאפליקציה שלך" isOptional={true}>

הוספת ניתוב מותאם לשפות באפליקציית Vue כוללת בדרך כלל שימוש ב-Vue Router עם קידומות שפה (locale prefixes). הדבר יוצר נתיבים ייחודיים לכל שפה, דבר המועיל ל-SEO ולכתובות URL ידידותיות לקידום אתרים.

דוגמה:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

תחילה, התקן את Vue Router:

```bash packageManager="npm"
npm install vue-router
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add vue-router
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add vue-router
```

לאחר מכן, צור תצורת נתב המטפלת בניתוב מבוסס שפה:

```js fileName="src/router/index.ts"
import {
  localeFlatMap,
  type Locale,
} from 'intlayer';
import { createIntlayerClient } from "vue-intlayer";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/home/HomeView.vue';
import RootView from './views/root/Root.vue';

/**
 * הצהרת הנתיבים עם נתיבים ספציפיים לשפה ומטא-נתונים.
 */
const routes = localeFlatMap(({ urlPrefix, locale }) => [
  {
    path: `${urlPrefix}/`,
    name: `Root-${locale}`,
    component: RootView,
    meta: {
      locale,
    },
  },
  {
    path: `${urlPrefix}/home`,
    name: `Home-${locale}`,
    component: HomeView,
    meta: {
      locale,
    },
  },
]);

// יצירת מופע הנתב
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// הוספת guard ניווט לטיפול בשפה
router.beforeEach((to, _from, next) => {
  const client = createIntlayerClient();

  const metaLocale = to.meta.locale as Locale;

  // שימוש חוזר בשפה שהוגדרה ב-meta של הנתיב
  client.setLocale(metaLocale);
  next();
});
```

> השם משמש לזיהוי הנתיב בנתב. עליו להיות ייחודי בכל הנתיבים כדי למנוע התנגשויות ולהבטיח ניווט וקישור תקינים.

לאחר מכן, רשום את הנתב בקובץ ה-main.ts שלך:

```js fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./style.css";

const app = createApp(App);

// הוספת הנתב לאפליקציה
app.use(router);

// הרכבת האפליקציה
app.mount("#app");
```

לאחר מכן עדכן את קובץ ה-`App.vue` שלך כדי לרנדר את רכיב ה-RouterView. רכיב זה יציג את הרכיב המתאים עבור הנתיב הנוכחי.

```vue fileName="src/App.vue"
<script setup lang="ts">
import LocaleSwitcher from "@components/LocaleSwitcher.vue";
</script>

<template>
  <nav>
    <LocaleSwitcher />
  </nav>
  <RouterView />
</template>
```

במקביל, תוכל גם להשתמש ב-`intlayerProxy` כדי להוסיף ניתוב בצד השרת לאפליקציה שלך. תוסף זה יזהה אוטומטית את השפה הנוכחית על סמך כתובת ה-URL ויגדיר את קובץ ה-cookie המתאים לשפה. אם לא צוינה שפה, התוסף יקבע את השפה המתאימה ביותר על סמך העדפות שפת הדפדפן של המשתמש. אם לא זוהתה שפה, הוא יפנה לשפת ברירת המחדל.

> שים לב שכדי להשתמש ב-`intlayerProxy` בסביבת ייצור, עליך להעביר את החבילה `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מ-Intlayer v9, `intlayerProxy()` מצורף ישירות לתוסף `intlayer()` ומופעל כברירת מחדל דרך האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר עבור תאימות לאחור ועבור הגדרות הזקוקות לשליטה על סדר התוספים. הגדר `routing.enableProxy: false` כדי לבטל זאת. עיין ב[הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md).

- [הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={8} title="שינוי כתובת ה-URL כאשר השפה משתנה" isOptional={true}>

כדי לעדכן אוטומטית את כתובת ה-URL כאשר המשתמש משנה את השפה, תוכל לשנות את רכיב ה-`LocaleSwitcher` כדי להשתמש ב-Vue Router:

```vue fileName="src/components/LocaleSwitcher.vue"
<script setup lang="ts">
import { Locales, getLocaleName, getLocalizedUrl } from "intlayer";
import { ref, watch } from "vue";
import { useLocale } from "vue-intlayer";
import { useRouter } from "vue-router";

// קבלת Vue Router
const router = useRouter();

// קבלת מידע על השפה ופונקציית setLocale
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // קבלת הנתיב הנוכחי ויצירת URL מותאם לשפה
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // ניווט לנתיב המותאם לשפה מבלי לטעון מחדש את הדף
    router.push(localizedPath);
  },
});

// מעקב אחר השפה שנבחרה בעזרת ref
const selectedLocale = ref(locale.value);

// עדכון השפה כאשר הבחירה משתנה
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// שמירה על סנכרון של selectedLocale עם השפה הגלובלית
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>

<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>
```

טיפ: לשיפור ה-SEO והנגישות, השתמש בתגים כמו `<a href="/fr/home" hreflang="fr">` כדי לקשר לדפים מותאמים לשפה, כפי שמוצג בשלב 10. הדבר מאפשר למנועי חיפוש לגלות ולאנדקס כראוי כתובות URL ספציפיות לשפה. כדי לשמר את התנהגות ה-SPA, תוכל למנוע את הניווט המוגדר כברירת מחדל באמצעות @click.prevent, לשנות את השפה באמצעות useLocale, ולנווט באופן תכנותי בעזרת Vue Router.

```html
<ol>
  <li>
    <a
      hreflang="x-default"
      aria-label="Switch to English"
      target="_self"
      aria-current="page"
      href="/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="en">English</span>
        <span>English</span>
        <span>EN</span>
      </div>
    </a>
  </li>
  <li>
    <a
      hreflang="es"
      aria-label="Switch to Spanish"
      target="_self"
      href="/es/doc/get-started"
    >
      <div>
        <span dir="ltr" lang="es">Español</span>
        <span>Spanish</span>
        <span>ES</span>
      </div>
    </a>
  </li>
</ol>
```

</Step>
<Step number={9} title="החלפת מאפייני שפה וכיוון ב-HTML" isOptional={true}>

כאשר האפליקציה שלך תומכת במספר שפות, חיוני לעדכן את המאפיינים `lang` ו-`dir` של תגית ה-`<html>` כך שיתאימו לשפה הנוכחית. פעולה זו מבטיחה:

- **נגישות**: קוראי מסך וטכנולוגיות מסייעות מסתמכים על מאפיין ה-`lang` הנכון כדי להגות ולפרש את התוכן בצורה מדויקת.
- **רינדור טקסט**: מאפיין ה-`dir` (כיוון) מבטיח שהטקסט יוצג בסדר הנכון (למשל, משמאל לימין עבור אנגלית, ומימין לשמאל עבור עברית או ערבית), דבר החיוני לקריאות.
- **קידום אתרים (SEO)**: מנועי חיפוש משתמשים במאפיין ה-`lang` כדי לקבוע את שפת הדף שלך, מה שמסייע בהצגת התוכן המותאם הנכון בתוצאות החיפוש.

על ידי עדכון מאפיינים אלה באופן דינמי כאשר השפה משתנה, אתה מבטיח חוויה עקבית ונגישה למשתמשים בכל השפות הנתמכות.

```js fileName="src/composables/useI18nHTMLAttributes.ts"
import { watch } from "vue";
import { useLocale } from "vue-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Composable המעדכן את המאפיינים `lang` ו-`dir` של אלמנט ה-<html>
 * על סמך השפה הנוכחית.
 *
 * @example
 * // ב-App.vue שלך או ברכיב גלובלי
 * import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes'
 *
 * useI18nHTMLAttributes()
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  // עדכון מאפייני ה-HTML בכל פעם שהשפה משתנה
  watch(
    () => locale.value,
    (newLocale) => {
      if (!newLocale) return;

      // עדכון מאפיין השפה
      document.documentElement.lang = newLocale;

      // הגדרת כיוון הטקסט (ltr עבור רוב השפות, rtl עבור עברית, ערבית וכו')
      document.documentElement.dir = getHTMLTextDir(newLocale);
    },
    { immediate: true }
  );
};
```

השתמש ב-composable זה ב-`App.vue` שלך או ברכיב גלובלי:

```vue fileName="src/App.vue"
<script setup lang="ts">
import { useI18nHTMLAttributes } from "@composables/useI18nHTMLAttributes";

// החלת מאפייני ה-HTML בהתבסס על השפה הנוכחית
useI18nHTMLAttributes();
</script>

<template>
  <!-- תבנית האפליקציה שלך -->
</template>
```

</Step>
<Step number={10} title="יצירת רכיב קישור מותאם לשפה (Localized Link)" isOptional={true}>

כדי להבטיח שהניווט באפליקציה שלך יכבד את השפה הנוכחית, תוכל ליצור רכיב `Link` מותאם אישית. רכיב זה מוסיף אוטומטית קידומת של השפה הנוכחית לכתובות URL פנימיות. לדוגמה, כאשר משתמש דובר צרפתית לוחץ על קישור לדף "About", הוא מופנה אל `/fr/about` במקום אל `/about`.

התנהגות זו מועילה מכמה סיבות:

- **SEO וחוויית משתמש**: כתובות URL מותאמות לשפה מסייעות למנועי חיפוש לאנדקס נכון דפים ספציפיים לשפה ומספקות למשתמשים תוכן בשפתם המועדפת.
- **עקביות**: שימוש בקישור מותאם לשפה בכל רחבי האפליקציה מבטיח שהניווט יישאר בתוך השפה הנוכחית, ומונע מעברי שפה בלתי צפויים.
- **תחזוקתיות**: ריכוז לוגיקת הלוקליזציה ברכיב יחיד מפשט את ניהול כתובות ה-URL, והופך את בסיס הקוד לקל יותר לתחזוקה ולהרחבה ככל שהאפליקציה גדלה.

```vue fileName="src/components/Link.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { computed } from "vue";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});

const { locale } = useLocale();

// בדיקה אם הקישור חיצוני
const isExternalLink = computed(() => /^https?:\/\//.test(props.href || ""));

// יצירת href מותאם לשפה עבור קישורים פנימיים
const localizedHref = computed(() =>
  isExternalLink.value ? props.href : getLocalizedUrl(props.href, locale.value)
);
</script>

<template>
  <a :href="localizedHref" v-bind="$attrs">
    <slot />
  </a>
</template>
```

לשימוש עם Vue Router, צור גרסה ייעודית לנתב:

```vue fileName="src/components/RouterLink.vue"
<script setup lang="ts">
import { getLocalizedUrl } from "intlayer";
import { computed } from "vue";
import { useLocale } from "vue-intlayer";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});

const { locale } = useLocale();

// יצירת מאפיין to מותאם לשפה עבור router-link
const localizedTo = computed(() => {
  if (typeof props.to === "string") {
    return getLocalizedUrl(props.to, locale.value);
  } else {
    // אם 'to' הוא אובייקט, התאם את מאפיין ה-path לשפה
    return {
      ...props.to,
      path: getLocalizedUrl(props.to.path ?? "/", locale.value),
    };
  }
});
</script>

<template>
  <router-link :to="localizedTo" v-bind="$attrs">
    <slot />
  </router-link>
</template>
```

השתמש ברכיבים אלה באפליקציה שלך:

```vue fileName="src/App.vue"
<script setup lang="ts">
import Link from "@components/Link.vue";
import RouterLink from "@components/RouterLink.vue";
</script>

<template>
  <div>
    <!-- Vue router  -->
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <!-- קישורים אחרים -->
    <Link href="/">Root</Link>
    <Link href="/home">Home</Link>
  </div>
</template>
```

</Step>
<Step number={11} title="חילוץ התוכן של הרכיבים שלך" isOptional={true}>

אם יש לך בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציע [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md) כדי להמיר את הרכיבים שלך ולחלץ את התוכן.

- [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)
- [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

כדי להגדיר זאת, תוכל להוסיף סעיף `compiler` בקובץ ה-`intlayer.config.ts` שלך:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... שאר התצורה שלך
  compiler: {
    /**
     * מציין אם המהדר מופעל.
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * מציין אם יש לשמור את הרכיבים לאחר שהומרו.
     *
     * - אם `true`, המהדר ישכתב את קובץ הרכיב בדיסק. כך שההמרה תהיה קבועה, והמהדר ידלג על ההמרה בתהליך הבא. בדרך זו, המהדר יכול להמיר את האפליקציה, ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, המהדר יזריק את קריאת הפונקציה `useIntlayer()` לקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד ללא שינוי. ההמרה תבוצע רק בזיכרון.
     */
    saveComponents: false,

    /**
     * קידומת מפתח מילון
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

הפעל את פקודת החילוץ כדי להמיר את הרכיבים שלך ולחלץ את התוכן:

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

 <Tabs>
 <Tab value='intlayer >= 9'>

> החל מ-v9, ה-`intlayerCompiler` כלול בתוסף `intlayer`. לכן אין צורך להוסיפו באופן ידני.

 </Tab>
 <Tab value='intlayer < 9'>

עדכן את `vite.config.ts` שלך כדי לכלול את תוסף `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // הוספת תוסף המהדר
  ],
});
```

 </Tab>
 </Tabs>

בנה את האפליקציה שלך כדי להמיר את הרכיבים שלך ולחלץ את התוכן:

```bash packageManager="npm"
npm run build # או npm run dev
```

```bash packageManager="pnpm"
pnpm run build # או pnpm run dev
```

```bash packageManager="yarn"
yarn build # או yarn dev
```

```bash packageManager="bun"
bun run build # או bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

### (אופציונלי) Sitemap ו-robots.txt (בזמן בנייה)

Intlayer כולל מעצבים כגון `generateSitemap` ו-`getMultilingualUrls` המפיקים פלט `sitemap.xml` ו-`robots.txt` רב-לשוני המוכן לסורקים (crawlers), אותו תוכל לכתוב לתיקיית `public/` בפרויקט שלך. בפועל מריצים סקריפט Node קצר **לפני** Vite (למשל בהוקים של npm כגון `predev` / `prebuild`) כך שהקבצים הללו יתקיימו כאשר בונים או מגישים את האפליקציה.

#### Sitemap

מחולל מפת האתר של Intlayer מכבד את הגדרות השפה שלך וכולל את המטא-נתונים הרגילים עבור סורקים.

> מפת האתר שנוצרת תומכת במרחב השמות `xhtml:link` (הרחבות XML של hreflang). בניגוד למחוללים בסיסיים הפולטים רק כתובות URL שטוחות, Intlayer מחבר קישורים דו-כיווניים בין כל וריאנט מקומי של כל דף (למשל `/about`, `/fr/about`, או `/about?lang=fr`, בהתאם למצב הניתוב שלך), מה שעוזר למנועי חיפוש לקשר בין כתובות URL מתורגמות.

#### Robots.txt

השתמש ב-`getMultilingualUrls` כדי שרשומות `Disallow` יכסו כל איות מקומי של נתיבים רגישים.

#### 1. הוסף את `generate-seo.mjs` בשורש הפרויקט

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

יש להתקין את `intlayer` כדי שהסקריפט יוכל לייבא אותה. הגדר את `SITE_URL` בסביבה עבור ייצור (למשל ב-CI).

> עדיף להשתמש ב-`generate-seo.mjs` עבור Node ESM. אם אתה משתמש ב-`generate-seo.js` במקום זאת, ודא שמוגדר `"type": "module"` ב-`package.json`, או הפעל את Node עם ESM מופעל.

#### 2. הרץ את הסקריפט לפני Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

התאם אם אתה משתמש ב-pnpm או ב-yarn. תוכל גם להפעיל את אותו הסקריפט מ-CI או משלב אחר אם זה מתאים לתהליך העבודה שלך.

### הגדרת TypeScript

Intlayer משתמש בהרחבת מודולים (module augmentation) כדי ליהנות מהיתרונות של TypeScript ולהפוך את בסיס הקוד שלך לחזק יותר.

![השלמה אוטומטית](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![שגיאת תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

ודא שתצורת ה-TypeScript שלך כוללת את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  // ... תצורות ה-TypeScript הקיימות שלך
  "include": [
    // ... תצורות ה-TypeScript הקיימות שלך
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. זה מאפשר לך להימנע מביצוע commit שלהם למאגר ה-Git שלך.

כדי לעשות זאת, תוכל להוסיף את ההוראה הבאה לקובץ ה-`.gitignore` שלך:

```bash
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

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Vue?">

- **`vue-i18n`**: ספריית הייחוס, עם קטלוגי הודעות הרשומים גלובלית ועיצוב בסגנון ICU. אין לה דרך לבודד מרחבי שמות (namespace) להודעות, כך שכל דף טוען את כל הקטלוגים וגודל ה-bundle ממשיך לגדול ככל שמתווספים דפים לאפליקציה.
- **`Intlayer`**: הפתרון המתקדם ביותר. התוכן מוצהר בכל מקום בבסיס הקוד שלך ([לצד כל רכיב או מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומעובד על ידי תוסף ה-Vite בזמן הבנייה, עם טיפוסיות מלאה, תרגום באמצעות AI, עורך חזותי ו-CMS.

ההבדל המעשי הוא תחום והגדרת טיפוסים (scope and typing). `vue-i18n` פותר מפתחות כמחרוזות בזמן ריצה, כך שמפתח ששמו שונה נכשל בשקט, בעוד ש-Intlayer יוצר טיפוסים מההצהרות שלך ומשמיט תוכן שאף רכיב אינו משתמש בו. עיין ב[למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md) וב[השוואת ביצועים עבור Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)
- [השוואת ביצועים עבור Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md)

</Question>
<Question title="כמה תוספת בינאום מוסיפה לגודל ה-bundle שלי ב-Vue?">

הרבה פחות מהגדרה מבוססת מרחב שמות (namespaces), מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. המהדר בזמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שבהן הרכיב משתמש, כך שמפתחות שאינם בשימוש ושפות שאינן נדרשות מושמטים, ו[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל ה-bundle והדפים בעד 50%. עיין ב[אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/vue.md)

</Question>
<Question title="האם אוכל לעבור מ-`vue-i18n` מבלי לשכתב את הרכיבים שלי?">

כן, ויש שני נתיבים. תוכל להעביר את התוכן בהדרגה בעזרת [מדריך המעבר מ-vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_vue-i18n_to_intlayer.md). לחלופין, תוכל לשמור על ה-API הנוכחי שלך במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md) חושפים בדיוק את אותו ה-API כמו `vue-i18n`, אך מוגשים על ידי מילוני Intlayer, כך שרק הייבוא משתנה וקוד הרכיבים נשאר זהה.

- [מדריך מעבר מ-vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_vue-i18n_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md)

</Question>
<Question title="האם אוכל לשמור על קובצי התרגום הקיימים שלי בפורמט JSON?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלך כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לך לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הפעל את `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלך, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכל לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 11 במדריך זה מפרט שלב זה.

עבור צינור אוטומטי לחלוטין, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) מבצע את אותו הדבר בזמן הבנייה: הוא סורק את קוד המקור שלך ב-JSX, TSX, Vue ו-Svelte בכל שינוי, מייצר את המילונים ושומר אותם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין מפתחות לתחזק ידנית כלל.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

כדאי להכיר שתי מגבלות לפני הפעלת המהדר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כמו `className="active"` או קוד סטטוס, מה שדורש כמה הערות בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אותך בתהליך קבלת ההחלטות.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

</Question>
<Question title="אילו כלי עריכה וכלי סוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: מעבר ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל האזכורים (find all references), תצוגה מקדימה בריחוף מעל ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא פותר גם קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שמסייע בזמן המעבר.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית משיב מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת כישור לכל framework, המלמדים סוכן את הגדרות הניתוב שלך ואת סוגי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="האם Intlayer עובד עם Vue Composition API ועם script setup?">

כן. `useIntlayer` הוא composable המשמש בתוך `<script setup>` בדיוק כמו כל composable אחר, והתוכן המוחזר הוא ריאקטיבי, כך ששינוי השפה מרנדר מחדש את הרכיבים הקוראים אותו ללא טעינה מחדש של הדף.

</Question>
<Question title="כיצד אני מגדיר ניתוב מותאם לשפות ב-Vue SPA?">

שלבים 7 ו-8 במדריך זה מכסים את האינטגרציה עם Vue Router: מקטע שפה (locale segment) בעץ הנתיבים, ו-watcher המשכתב את כתובת ה-URL כאשר השפה משתנה. אם אינך מעוניין בשפה בנתיב, הגדר את `routing.mode` ל-`"no-prefix"` או ל-`"search-params"` והיא תיקבע במקום זאת מתוך עוגייה (cookie) או פרמטר שאילתה. עיין ב[מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Question>
<Question title="כיצד אני מגדיר את מאפייני lang ו-dir ב-HTML עבור שפות הנכתבות מימין לשמאל?">

שלב 9 מכסה זאת. `getHTMLTextDir` מחזיר `rtl` עבור שפות כגון עברית, ערבית, פרסית ואורדו, כך שתוכל לקשור את `lang` ו-`dir` באלמנט השורש מתוך השפה הפעילה ולתת למאפיינים הלוגיים של ה-CSS שלך לעשות את השאר.

</Question>
<Question title="כיצד אני מתרגם אפליקציית Vue באופן אוטומטי בעזרת AI?">

הפעל את `npx intlayer fill`, הממלא תרגומים חסרים באמצעות ה-LLM לבחירתך באמצעות הספק ומפתח ה-API שלך. הדגל `--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף הנוכחי. עיין ב[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) וב[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

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
