---
createdAt: 2025-04-18
updatedAt: 2026-11-03
priority: 9
title: "בינאום Vite + Preact (i18n) - מדריך מלא לתרגום האפליקציה שלכם"
description: "הגדירו את Intlayer באפליקציית Vite ו-Preact: תוכן מוקלד לפי רכיב, בורר שפות, נתיבים מותאמים לשפה וחבילות קטנות."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
applicationShowcase: https://intlayer-vite-preact-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 7.0.0
    date: 2025-10-28
    changes: "עדכון רכיב LocaleRouter לשימוש בהגדרות הנתיב החדשות"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-Vite ו-Preact שלכם באמצעות Intlayer

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `preact-i18n` או `i18next`,‏ Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור Preact">

Intlayer מותאם לפעול בצורה מושלמת עם Preact על ידי הצעת **תיחום תוכן ברמת הרכיב**, **תרגומים בטעינה עצלה (lazy-loaded)**, וכל התכונות הנדרשות להרחבת הבינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייע **להפחית את גודל החבילה והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות (Maintainability)">

תיחום התוכן של האפליקציה שלכם **מקל על התחזוקה** באפליקציות רחבות היקף. תוכלו לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המחשבתי של סקירת כל קוד התוכן שלכם. בנוסף, Intlayer בעל **טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכני בינה מלאכותית (AI Agents)">

הצבת תוכן בסמיכות לקוד (co-locating) **מפחיתה את ההקשר (context) הנדרש** על ידי מודלי שפה גדולים (LLMs).‏ Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה לתרגום ב-CI/CD pipeline שלכם באמצעות ה-LLM לבחירתכם בעלות של ספק ה-AI שלכם. Intlayer מציע גם **קומפיילר** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול להוביל לבעיות ביצועים וריאקטיביות. Intlayer מבצע אופטימיזציה לטעינת התוכן שלכם בזמן הבנייה (build time).

</Accordion>
<Accordion header="סקלביליות עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n,‏ Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) באחסון עצמי (self-hosted)** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק ופשוט. ניתן לאחסן תוכן מקומית ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Vite ו-Preact

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="הפתרון הטוב ביותר ל-i18n עבור Vite ו-Preact? גלו את Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-preact-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-vite-preact-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-preact-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

ראו את [תבנית האפליקציה (Application Template)](https://github.com/aymericzip/intlayer-vite-preact-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות באמצעות npm:

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

> הדגל `--interactive` הוא אופציונלי. השתמשו ב-`intlayer-cli init` אם אתם סוכן AI.

> פקודה זו תזהה את הסביבה שלכם ותתקין את החבילות הנדרשות. לדוגמה:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול הגדרות, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/index.md).

- **preact-intlayer**
  החבילה שמשלבת את Intlayer עם אפליקציית Preact. היא מספקת context providers ו-hooks עבור בינאום ב-Preact.

- **vite-intlayer**
  כוללת את תוסף Vite לשילוב Intlayer עם [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), וכן middleware לזיהוי השפה המועדפת על המשתמש, ניהול קובצי cookie וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

### ארכיטקטורה

בארכיטקטורה זו, `preact-intlayer` מספקת את ה-`IntlayerProvider` המורכב ב-`main.tsx` כדי לעטוף את עץ ה-Preact. הצהרות התוכן שוכנות ב-`src/` לצד הרכיבים.

```bash
.
├── src
│   ├── app.content.tsx
│   ├── app.css
│   ├── app.tsx                       # רכיב האפליקציה הראשי של Preact
│   ├── components
│   │   ├── LocaleSwitcher.content.ts
│   │   └── LocaleSwitcher.tsx
│   ├── main.tsx                      # נקודת כניסה עם IntlayerProvider
│   └── vite-env.d.ts
├── index.html
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### הגדרות

צרו קובץ הגדרות כדי להגדיר את השפות של האפליקציה שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // שפות נוספות שלכם
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // ברירת מחדל: קידומת לכל השפות מלבד שפת ברירת המחדל
    storage: ["cookie", "header"], // ברירת מחדל: שמירת השפה ב-cookie וזיהוי מ-header
  },
};

export default config;
```

> באמצעות קובץ הגדרות זה, תוכלו להגדיר כתובות URL מותאמות לשפה, מצבי ניתוב, אפשרויות אחסון, שמות קובצי cookie, את המיקום והסיומת של הצהרות התוכן שלכם, להשבית יומני רישום של Intlayer במסוף ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיינו ב-[תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בהגדרות Vite שלכם">

הוסיפו את תוסף intlayer להגדרות שלכם.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

> תוסף ה-Vite `intlayer()` משמש לשילוב Intlayer עם Vite. הוא מבטיח את בניית קובצי הצהרת התוכן ועוקב אחריהם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={4} title="הצהרת התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      he: "לוגו Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
      he: "לוגו Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      he: "הספירה היא ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
      he: (
        <>
          ערכו את <code>src/app.tsx</code> ושמרו כדי לבדוק HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      he: "לחצו על סמלי הלוגו של Vite ו-Preact כדי ללמוד עוד",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "he": "לוגו Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "he": "לוגו Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "he": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "he": "הספירה היא "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "he": "ערכו את src/app.tsx ושמרו כדי לבדוק HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite et Preact para obtener más información",
        "he": "לחצו על סמלי הלוגו של Vite ו-Preact כדי ללמוד עוד"
      }
    }
  }
}
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה שלכם כל עוד הן כלולות בתיקיית `contentDir` (כברירת מחדל, `./src`), ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב-[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/content_file.md)

> אם קובץ התוכן שלכם כולל קוד TSX, ייתכן שתצטרכו לייבא `import { h } from "preact";` או לוודא שה-JSX pragma מוגדר כהלכה עבור Preact.

</Step>
<Step number={5} title="שימוש ב-Intlayer בקוד שלכם">

גשו למילוני התוכן שלכם בכל רחבי האפליקציה:

```tsx {6,10} fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // בהנחה שיש לכם preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // בהנחה שקובץ ה-CSS שלכם נקרא app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      {/* תוכן Markdown */}
      <div>{content.myMarkdownContent}</div>

      {/* תוכן HTML */}
      <div>{content.myHtmlContent}</div>

      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> אם ברצונכם להשתמש בתוכן שלכם במאפיין מסוג `string`, כגון `alt`, `title`, `href`, `aria-label` וכו', תוכלו להשתמש בערך של הפונקציה, כך:

> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> הערה: ב-Preact, מאפיין ה-`className` נכתב בדרך כלל כ-`class`.

> למידע נוסף על ה-hook של `useIntlayer`, עיינו ב-[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useIntlayer.md) (ה-API דומה עבור `preact-intlayer`).

- [תיעוד useIntlayer Hook | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useIntlayer.md)

> אם האפליקציה שלכם כבר קיימת, תוכלו להשתמש ב-[קומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md), וכן ב-[פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md), כדי להמיר אלפי רכיבים בשניות.

- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)
- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

</Step>
<Step number={6} title="שינוי שפת התוכן שלכם" isOptional={true}>

כדי לשנות את שפת התוכן שלכם, תוכלו להשתמש בפונקציה `setLocale` המסופקת על ידי ה-hook‏ `useLocale`. פונקציה זו מאפשרת לכם להגדיר את שפת האפליקציה ולעדכן את התוכן בהתאם.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Change Language to English
    </button>
  );
};

export default LocaleSwitcher;
```

> למידע נוסף על ה-hook של `useLocale`, עיינו ב-[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useLocale.md) (ה-API דומה עבור `preact-intlayer`).

- [תיעוד useLocale Hook | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useLocale.md)

</Step>
<Step number={7} title="הוספת ניתוב מותאם לשפה לאפליקציה שלכם" isOptional={true}>

המטרה של שלב זה היא ליצור נתיבים ייחודיים לכל שפה. זה שימושי ל-SEO ולכתובות URL ידידותיות לקידום אתרים.
דוגמה:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> כברירת מחדל, הנתיבים אינם כוללים קידומת עבור שפת ברירת המחדל. אם ברצונכם להוסיף קידומת גם לשפת ברירת המחדל, תוכלו להגדיר את האפשרות `routing.mode` ל-`"prefix-all"` בהגדרות שלכם. ראו את [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md) למידע נוסף.

- [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

כדי להוסיף ניתוב מותאם לשפה לאפליקציה שלכם, תוכלו ליצור רכיב `LocaleRouter` שעוטף את נתיבי האפליקציה ומטפל בניתוב מבוסס שפה. להלן דוגמה המשתמשת ב-[preact-iso](https://github.com/preactjs/preact-iso):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * רכיב נתב שמגדיר נתיבים ספציפיים לשפה.
 * הוא משתמש ב-preact-iso כדי לנהל ניווט ולרנדר רכיבים מותאמים לשפה.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

לאחר מכן, תוכלו להשתמש ברכיב `LocaleRouter` באפליקציה שלכם:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... רכיב ה-AppContent שלכם

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

במקביל, תוכלו גם להשתמש ב-`intlayerProxy` כדי להוסיף ניתוב צד-שרת לאפליקציה שלכם. תוסף זה יזהה אוטומטית את השפה הנוכחית על סמך כתובת ה-URL ויגדיר את קובץ ה-cookie המתאים של השפה. אם לא צוינה שפה, התוסף יקבע את השפה המתאימה ביותר על סמך העדפות השפה של הדפדפן של המשתמש. אם לא זוהתה שפה, הוא יפנה לשפת ברירת המחדל.

> שימו לב שכדי להשתמש ב-`intlayerProxy` בייצור, עליכם להעביר את החבילה `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מ-Intlayer גרסה 9, `intlayerProxy()` ארוז ישירות בתוך התוסף `intlayer()` ומופעל כברירת מחדל באמצעות האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר עבור תאימות לאחור ולהגדרות הדורשות שליטה בסדר התוספים. הגדירו `routing.enableProxy: false` כדי לבטל זאת. ראו את [הערות השחרור של גרסה 9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md).

- [הערות השחרור של גרסה 9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
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

כדי לשנות את כתובת ה-URL כאשר השפה משתנה, תוכלו להשתמש ב-prop‏ `onLocaleChange` המסופק על ידי ה-hook‏ `useLocale`. במקביל, תוכלו להשתמש במתודת `route` מ-`useLocation` של `preact-iso` כדי לעדכן את נתיב ה-URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // הרכבת כתובת ה-URL עם השפה המעודכנת
      // דוגמה: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // עדכון נתיב ה-URL
      route(pathWithLocale, true); // true להחלפה (replace)
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // ניווט פרוגרמטי לאחר הגדרת השפה יטופל על ידי onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* שפה - למשל FR */}
              {localeItem}
            </span>
            <span>
              {/* השפה בשפת המקור שלה - למשל Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* השפה בשפה הנוכחית - למשל Francés כאשר השפה הנוכחית מוגדרת ל-Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* השפה באנגלית - למשל French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

> מקורות תיעוד:
>
> - [ה-hook‏ `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/react-intlayer/useLocale.md) (ה-API דומה עבור `preact-intlayer`)
> - [הפונקציה `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocaleName.md)
> - [הפונקציה `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getLocalizedUrl.md)
> - [הפונקציה `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/packages/intlayer/getHTMLTextDir.md)
> - [המאפיין `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [המאפיין `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [המאפיין `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [המאפיין `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

</Step>
<Step number={9} title="החלפת מאפייני השפה והכיווניות ב-HTML" isOptional={true}>

כאשר האפליקציה שלכם תומכת במספר שפות, חיוני לעדכן את המאפיינים `lang` ו-`dir` של תגית `<html>` כדי שיתאימו לשפה הנוכחית. פעולה זו מבטיחה:

- **נגישות**: קוראי מסך וטכנולוגיות מסייעות מסתמכים על המאפיין `lang` הנכון כדי להגות ולפרש את התוכן במדויק.
- **רינדור טקסט**: המאפיין `dir` (כיוון) מבטיח שהטקסט ירונדר בסדר הנכון (למשל משמאל לימין עבור אנגלית, ומימין לשמאל עבור ערבית או עברית), דבר החיוני לקריאות.
- **SEO**: מנועי חיפוש משתמשים במאפיין `lang` כדי לקבוע את שפת הדף שלכם, מה שמסייע בהגשת התוכן המותאם הנכון בתוצאות החיפוש.

על ידי עדכון דינמי של מאפיינים אלה כאשר השפה משתנה, אתם מבטיחים חוויה עקבית ונגישה למשתמשים בכל השפות הנתמכות.

#### מימוש ה-Hook

צרו hook מותאם אישית לניהול מאפייני ה-HTML. ה-hook מאזין לשינויי שפה ומעדכן את המאפיינים בהתאם:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * מעדכן את המאפיינים `lang` ו-`dir` של אלמנט ה-HTML <html> על סמך השפה הנוכחית.
 * - `lang`: מיידע דפדפנים ומנועי חיפוש על שפת הדף.
 * - `dir`: מבטיח את סדר הקריאה הנכון (למשל 'ltr' עבור אנגלית, 'rtl' עבור ערבית ועברית).
 *
 * עדכון דינמי זה חיוני לרינדור טקסט תקין, נגישות ו-SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // עדכון מאפיין השפה לשפה הנוכחית.
    document.documentElement.lang = locale;

    // הגדרת כיוון הטקסט על סמך השפה הנוכחית.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### שימוש ב-Hook באפליקציה שלכם

שלבו את ה-hook ברכיב הראשי שלכם כדי שמאפייני ה-HTML יתעדכנו בכל פעם שהשפה משתנה:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// הגדרת AppContent משלב 5

const AppWithHooks: FunctionalComponent = () => {
  // החלת ה-hook כדי לעדכן את מאפייני lang ו-dir של תגית <html> על סמך השפה.
  useI18nHTMLAttributes();

  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

על ידי יישום שינויים אלה, האפליקציה שלכם תבצע:

- הבטחה שמאפיין ה**שפה** (`lang`) משקף במדויק את השפה הנוכחית, דבר החשוב ל-SEO ולהתנהגות הדפדפן.
- התאמת **כיוון הטקסט** (`dir`) בהתאם לשפה, שיפור הקריאות וחוויית השימוש עבור שפות בעלות כיווני קריאה שונים.
- מתן חוויה **נגישה** יותר, שכן טכנולוגיות מסייעות תלויות במאפיינים אלה כדי לפעול באופן מיטבי.

</Step>
<Step number={10} title="יצירת רכיב קישור מותאם לשפה (Localized Link)" isOptional={true}>

כדי להבטיח שהניווט באפליקציה שלכם יכבד את השפה הנוכחית, תוכלו ליצור רכיב `Link` מותאם אישית. רכיב זה מוסיף אוטומטית קידומת של השפה הנוכחית לכתובות URL פנימיות.

התנהגות זו שימושית מכמה סיבות:

- **SEO וחוויית משתמש**: כתובות URL מותאמות לשפה עוזרות למנועי חיפוש לאנדקס כראוי דפים ספציפיים לשפה ומספקות למשתמשים תוכן בשפה המועדפת עליהם.
- **עקביות**: שימוש בקישור מותאם לשפה בכל רחבי האפליקציה שלכם מבטיח שהניווט יישאר בהקשר של השפה הנוכחית, ומונע מעברי שפה בלתי צפויים.
- **תחזוקתיות**: ריכוז לוגיקת הלוקליזציה ברכיב בודד מפשט את ניהול כתובות ה-URL.

להלן המימוש של רכיב `Link` מותאם לשפה ב-Preact:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * פונקציית עזר לבדיקה האם כתובת URL נתונה היא חיצונית.
 * אם ה-URL מתחיל ב-http:// או https://, הוא נחשב חיצוני.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * רכיב Link מותאם אישית המתאים את מאפיין ה-href על סמך השפה הנוכחית.
 * עבור קישורים פנימיים, הוא משתמש ב-`getLocalizedUrl` כדי להוסיף קידומת שפה ל-URL (למשל /fr/about).
 * הדבר מבטיח שהניווט יישאר בתוך אותו הקשר שפה.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // אם הקישור פנימי וסופק href תקין, קבלו את ה-URL המותאם לשפה.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

#### כיצד זה עובד

- **זיהוי קישורים חיצוניים**:  
  פונקציית העזר `checkIsExternalLink` קובעת האם כתובת URL היא חיצונית. קישורים חיצוניים נותרים ללא שינוי מכיוון שאינם דורשים לוקליזציה.
- **אחזור השפה הנוכחית**:  
  ה-hook‏ `useLocale` מספק את השפה הנוכחית (למשל `fr` עבור צרפתית).
- **לוקליזציה של ה-URL**:  
  עבור קישורים פנימיים (כלומר שאינם חיצוניים), נעשה שימוש ב-`getLocalizedUrl` כדי להוסיף אוטומטית את קידומת השפה הנוכחית ל-URL. המשמעות היא שאם המשתמש שלכם בצרפתית, העברת `/about` כ-`href` תהפוך אותו ל-`/fr/about`.
- **החזרת הקישור**:  
  הרכיב מחזיר אלמנט `<a>` עם כתובת ה-URL המותאמת לשפה, ומבטיח שהניווט יישאר עקבי עם השפה שנבחרה.

</Step>
<Step number={11} title="רינדור Markdown ו-HTML" isOptional={true}>

Intlayer תומך ברינדור תוכן Markdown ו-HTML ב-Preact.

תוכלו להתאים אישית את רינדור תוכן ה-Markdown וה-HTML באמצעות המתודה `.use()`. מתודה זו מאפשרת לכם לדרוס את הרינדור של תגיות ספציפיות כברירת מחדל.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* רינדור בסיסי */}
    {myMarkdownContent}

    {/* רינדור מותאם אישית עבור Markdown */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* רינדור בסיסי עבור HTML */}
    {myHtmlContent}

    {/* רינדור מותאם אישית עבור HTML */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

</Step>
<Step number={12} title="חילוץ התוכן של הרכיבים שלכם" isOptional={true}>

אם יש לכם בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציעה [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md) כדי לשנות את הרכיבים שלכם ולחלץ את התוכן.

- [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)
- [מחלץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

כדי להגדיר אותו, תוכלו להוסיף מקטע `compiler` בקובץ `intlayer.config.ts` שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... שאר ההגדרות שלכם
  compiler: {
    /**
     * מציין אם יש להפעיל את הקומפיילר.
     */
    enabled: true,

    /**
     * מגדיר את נתיב קובצי הפלט
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * מציין אם יש לשמור את הרכיבים לאחר שעברו טרנספורמציה.
     *
     * - אם `true`, הקומפיילר יכתוב מחדש את קובץ הרכיב בדיסק. הטרנספורמציה תהיה קבועה, והקומפיילר ידלג על הטרנספורמציה בפעם הבאה. בדרך זו, הקומפיילר יכול לשנות את האפליקציה, ולאחר מכן ניתן להסירו.
     *
     * - אם `false`, הקומפיילר יזריק את קריאת הפונקציה `useIntlayer()` לתוך הקוד בפלט הבנייה בלבד, וישמור על בסיס הקוד המקורי ללא שינוי. הטרנספורמציה תיעשה בזיכרון בלבד.
     */
    saveComponents: false,

    /**
     * קידומת מפתח המילון
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='פקודת Extract'>

הריצו את ה-extractor כדי להמיר את הרכיבים שלכם ולחלץ את התוכן

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

> החל מגרסה 9, ה-`intlayerCompiler` כלול בתוך התוסף `intlayer`. לכן אין צורך להוסיף אותו ידנית.

 </Tab>
 <Tab value='intlayer < 9'>

עדכנו את `vite.config.ts` שלכם כדי לכלול את התוסף `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // הוספת תוסף הקומפיילר
  ],
});
```

 </Tab>
 </Tabs>

בנו את האפליקציה שלכם כדי להמיר את הרכיבים ולחלץ את התוכן

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

### (אופציונלי) מפת אתר (Sitemap) ו-robots.txt (בזמן בנייה)

Intlayer כולל מעצבים כגון `generateSitemap` ו-`getMultilingualUrls` המפיקים פלט רב-לשוני של `sitemap.xml` ו-`robots.txt` המוכן לסורקי מנועי חיפוש, אותו תוכלו לכתוב לתיקיית `public/` של הפרויקט שלכם. בפועל, אתם מריצים סקריפט Node קטן **לפני** Vite (למשל hooks של `predev` / `prebuild` ב-npm) כך שקבצים אלה יהיו קיימים כאשר אתם בונים או מגישים את האפליקציה.

#### מפת אתר (Sitemap)

מחולל מפת האתר של Intlayer מכבד את הגדרות השפה שלכם וכולל את המטא-נתונים המקובלים עבור סורקים.

> מפת האתר שנוצרת תומכת ב-namespace של `xhtml:link` (הרחבות XML של hreflang). בניגוד למחוללים בסיסיים שפולטים רק כתובות URL שטוחות, Intlayer מחבר קישורים דו-כיווניים בין כל גרסה מותאמת שפה של כל דף (לדוגמה `/about`, `/fr/about` או `/about?lang=fr`, בהתאם למצב הניתוב שלכם), מה שעוזר למנועי חיפוש לקשר בין כתובות URL מותאמות לשפה.

#### Robots.txt

השתמשו ב-`getMultilingualUrls` כך שרשומות `Disallow` יכסו כל איות מותאם שפה של נתיבים רגישים.

#### 1. הוסיפו את `generate-seo.mjs` בשורש הפרויקט

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

יש לוודא ש-`intlayer` מותקן כדי שהסקריפט יוכל לייבא אותו. הגדירו את `SITE_URL` בסביבה עבור ייצור (למשל ב-CI).

> העדיפו את `generate-seo.mjs` עבור Node ESM. אם אתם משתמשים ב-`generate-seo.js` במקום זאת, וודאו שמוגדר `"type": "module"` ב-`package.json`, או הריצו את Node עם תמיכת ESM מופעלת.

#### 2. הריצו את הסקריפט לפני Vite

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

התאימו זאת אם אתם משתמשים ב-pnpm או ב-yarn. תוכלו גם להפעיל את אותו הסקריפט מ-CI או משלב אחר אם זה מתאים לזרימת העבודה שלכם.

### הגדרת TypeScript

Intlayer משתמש ב-module augmentation כדי להפיק תועלת מ-TypeScript ולהפוך את בסיס הקוד שלכם לחזק יותר.

![השלמה אוטומטית](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![שגיאת תרגום](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

וודאו שהגדרות ה-TypeScript שלכם כוללות את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  // ... הגדרות ה-TypeScript הקיימות שלכם
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // מומלץ עבור Preact 10+
    // ...
  },
  "include": [
    // ... ה-includes הקיימים שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

> וודאו שקובץ ה-`tsconfig.json` שלכם מוגדר עבור Preact, במיוחד `jsx` ו-`jsxImportSource` או `jsxFactory`/`jsxFragmentFactory` עבור גרסאות Preact ישנות יותר אם אינכם משתמשים בהגדרות ברירת המחדל של `preset-vite`.

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer. הדבר מאפשר לכם להימנע מביצוע commit שלהם למאגר ה-Git שלכם.

לשם כך, תוכלו להוסיף את ההוראות הבאות לקובץ ה-`.gitignore` שלכם:

```bash
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

### תוסף ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **התוסף הרשמי של Intlayer ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

תוסף זה מספק:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון פשוטים של תרגומים.

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב-[תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md).

- [תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)

### להעמיק עוד

כדי להעמיק עוד, תוכלו להטמיע את [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Vite ו-Preact?">

ל-Vite אין דעה מוצקה לגבי i18n, ולכן הבחירה מגיעה מתוך האקו-סיסטם של Preact:

- **`preact-i18n`**: ספרייה קטנה ייעודית ל-Preact עם מילון JSON.
- **`react-i18next`** באמצעות `preact/compat`: בוגר, אך מושך את שכבת התאימות של React לתוך החבילה שלכם.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומקומפל על ידי תוסף Vite בזמן הבנייה, בעל טיפוסיות מלאה, עם תרגום באמצעות AI, עורך חזותי ו-CMS.

היתרון הייחודי ל-Vite הוא שתרגומים מפוענחים ועוברים tree-shaking בזמן ההידור במקום להיטען כ-JSON בזמן ריצה, כך שדף שולח רק את הרשומות שהוא מרנדר. ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/interest_of_intlayer.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md)

</Question>
<Question title="כמה משקל מוסיף i18n לגודל החבילה (bundle size) של Preact שלי?">

הרבה פחות מהגדרה המבוססת על namespaces, מכיוון שדף לעולם אינו מוריד קטלוג שהוא אינו מרנדר. הקומפיילר בזמן הבנייה מחליף קריאות `useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן בשימוש מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל החבילה והדף בעד 50%. ראו [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dynamic_dictionaries/index.md)
- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/benchmark/index.md)

</Question>
<Question title="האם אוכל להגר מ-preact-i18n או react-i18next מבלי לכתוב מחדש את הרכיבים שלי?">

כן, ויש שני נתיבים. תוכלו להגר את התוכן בהדרגה באמצעות [מדריך ההגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_react-i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הנוכחי שלכם לחלוטין: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md) חושפים בדיוק את אותו ה-API של `react-i18next` ו-`react-intl`, אך מוגשים על ידי מילוני Intlayer, כך שהייבואים משתנים וקוד הרכיבים נשאר זהה.

- [מדריך הגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/migration_from_react-i18next_to_intlayer.md)
- [מתאמי תאימות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compat/index.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ שפות בקובץ אחד.

- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-json.md)
- [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 12 במדריך זה מפרט זאת.

עבור צינור עבודה אוטומטי לחלוטין, [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md) עושה את אותו הדבר בזמן הבנייה: הוא סורק את קוד המקור שלכם ב-JSX,‏ TSX,‏ Vue ו-Svelte בכל שינוי, מייצר את המילונים ושומר עליהם מסונכרנים באמצעות hot module replacement, כך שאין צורך לתחזק מפתחות ידנית כלל.

- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/compiler.md)

ישנן שתי מגבלות שכדאי להכיר לפני הפעלת הקומפיילר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן, עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כגון `className="active"` או קוד סטטוס, מה שמצריך מעט הערות בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md) נמנעת משתיהן על ידי השארתכם בתהליך הבקרה.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/extract.md)

</Question>
<Question title="אילו כלי עורך וסוכני בינה מלאכותית זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות (command palette) או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל המופעים (find all references), תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שמסייע בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor,‏ VS Code,‏ Claude Desktop,‏ Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/agent_skills.md)**: יכולות ממוקדות כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת יכולת לכל סביבת פיתוח, המלמדות סוכן בינה מלאכותית את מבנה הניתוב שלכם ואת סוגי צמתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות בקוד (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="כיצד אוכל להשתמש בתוכן מתורגם ברכיב Preact?">

קראו ל-`useIntlayer` ברכיב שלכם, בדיוק כפי שהייתם עושים ב-React. החבילה `preact-intlayer` היא קישור טבעי ל-Preact, כך שאינכם צריכים להשתמש ב-`preact/compat` עבורה. שלב 5 מציג את השימוש ושלב 11 מכסה תוכן Markdown ו-HTML.

</Question>
<Question title="האם Intlayer עובד עם שרת הפיתוח של Vite ו-hot reload?">

כן. תוסף ה-Vite `intlayer()` צופה בקובצי ה-`.content.ts` שלכם ובונה מחדש את המילונים המושפעים בעת שמירה, כך ששינויים מופיעים ללא צורך בהפעלה מחדש של שרת הפיתוח, והטיפוסים המיוצרים נוצרים מחדש באותו הזמן כך שההשלמה האוטומטית נשארת מסונכרנת.

</Question>
<Question title="כיצד להגדיר ניתוב מותאם לשפה?">

שלבים 7 ו-8 מכסים נתיבים מותאמים לשפה ושכתוב של כתובת ה-URL כאשר השפה משתנה, ושלב 10 מוסיף רכיב קישור מותאם לשפה. האפשרות `routing.mode` קובעת את מבנה ה-URL: `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`), `"prefix-all"`, `"no-prefix"` (מפוענח מקובץ cookie, מ-header או מדומיין) או `"search-params"` (`/about?locale=fr`). ראו את [מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md).

- [מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/configuration.md)

</Question>
<Question title="כיצד לתמוך בשפות הנכתבות מימין לשמאל כמו ערבית או עברית?">

שלב 9 מכסה זאת. הפונקציה `getHTMLTextDir` מחזירה `ltr`, `rtl` או `auto` עבור שפה נתונה, כך שתוכלו לקשור את `lang` ו-`dir` באלמנט השורש מהשפה הפעילה ולאפשר למאפיינים הלוגיים של ה-CSS שלכם לטפל בשאר.

</Question>
<Question title="כיצד לטפל במטא-נתוני SEO באפליקציית Vite המרונדרת בצד הלקוח?">

הגדירו את `lang` ו-`dir` באלמנט `html` מהשפה הפעילה, והפיקו חלופות `hreflang` עבור כל שפה שהוצהרה באמצעות `getMultilingualUrls`, כולל `x-default`. עבור דפים שחייבים להיסרק באופן אמין, העדיפו הגדרה של רינדור מוקדם (pre-rendered) או רינדור בצד השרת.

</Question>
<Question title="כיצד אוכל לתרגם את האפליקציה אוטומטית באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את הריצה לתוכן שהשתנה בענף. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md) ו-[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md), תנאים, [החדרות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/gender.md)
- [החדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md), הפועל על גבי התשתית שלכם ומאפשר לכל אחד לערוך טקסט ישירות על גבי האפליקציה הפועלת, או [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md), המוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחדש (deployment).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_CMS.md)

</Question>
<Question title="מהי העלות של העורך החזותי? האם הוא מיותר אם אינני זקוק לו?">

ל-[עורך החזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md) יש **אפס עלות ביצועים** על האפליקציה שלכם אם אינו מוגדר. הלוגיקה הנוספת נטענת רק אם היא מופעלת ונדרשת במפורש.

- [עורך חזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/intlayer_visual_editor.md)

אם הוא מופעל, המשקל קל ביותר (+5 KB, נטען דינמית רק בעת הפעלה) מכיוון שהלוגיקה העיקרית מנוהלת על ידי עורך השרת ב-[app.intlayer.org](https://app.intlayer.org) או באמצעות החבילה `intlayer-editor`. אם אתם זקוקים רק להגדרת תרגום פשוטה ללא עריכה חזותית, Intlayer אינו מוסיף כל תקורה לאפליקציה שלכם.

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל הוא שירות אופציונלי בתשלום שניתן גם [לאחסנו באופן עצמאי (self hosted)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md).

- [אחסון עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he/self_hosting.md)

</Question>

</FAQ>
