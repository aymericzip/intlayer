---
createdAt: 2025-04-18
updatedAt: 2026-11-03
priority: 9
title: "Vite + Solid i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדרת Intlayer באפליקציית Vite ו-Solid: תוכן מתורגם ריאקטיבי, בורר שפות, נתיבים מותאמים לשפה ומילונים מוקלדים."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Vite
  - Solid
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-solid
applicationTemplate: https://github.com/aymericzip/intlayer-vite-solid-template
applicationShowcase: https://intlayer-vite-solid.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 7.5.9
    date: 2025-12-30
    changes: "הוספת פקודת init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-Vite וה-Solid שלך באמצעות Intlayer

<Tabs defaultTab="video">
  <Tab label="וידאו" value="video">

<iframe title="פתרון ה-i18n הטוב ביותר עבור Vite ו-Solid? גלו את Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת CodeSandbox - כיצד לבצע בינאום באפליקציה שלך באמצעות Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="הדגמה" value="demo">

<iframe
  src="https://intlayer-vite-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="הדגמת תבנית Intlayer Vite + Solid"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות עיקריים כמו `@solid-primitives/i18n` או `i18next`, Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא ל-Solid">

Intlayer מותאם לפעול בצורה מושלמת עם Solid על ידי מתן **תחימת תוכן ברמת הרכיב (component-level content scoping)**, **תרגומים ריאקטיביים**, וכל התכונות הדרושות להרחבת בינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלך, טען רק את התוכן הדרוש. Intlayer מסייע **להפחית את גודל ה-bundle והדפים שלך בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

תיחום התוכן של האפליקציה שלך **מקל על התחזוקה** של אפליקציות בקנה מידה גדול. באפשרותך לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המנטלי של סקירת כל קוד התוכן שלך. בנוסף, Intlayer הוא **בעל טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלך.

</Accordion>
<Accordion header="סוכני AI (AI Agents)">

מיקום משותף של תוכן (Co-locating) **מפחית את ההקשר הדרוש** למודלי שפה גדולים (LLMs). Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו**[כישורי סוכן (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמש באוטומציה כדי לתרגם בצינור ה-CI/CD שלך בעזרת ה-LLM לבחירתך בעלות ספק ה-AI שלך. Intlayer מציע גם **מהדר (compiler)** לאוטומציה של חילוץ תוכן, כמו גם [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) כדי לסייע **בתרגום ברקע**.

- [פלטפורמת אינטרנט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול לגרום לבעיות ביצועים וריאקטיביות. Intlayer מבצע אופטימיזציה לטעינת התוכן בזמן הבנייה.

</Accordion>
<Accordion header="הרחבה עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n, Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי** ו**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** שיעזרו לך לנהל את התוכן הרב-לשוני שלך **בזמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, קופירייטרים וחברי צוות אחרים לחלק. ניתן לאחסן תוכן באופן מקומי ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Vite ו-Solid

## תוכן עניינים

<TOC/>

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
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **solid-intlayer**
  החבילה המשלבת את Intlayer באפליקציית Solid. היא מספקת ספקי הקשר (context providers) והוקים עבור בינאום ב-Solid.

- **vite-intlayer**
  כולל את תוסף ה-Vite לשילוב Intlayer עם [הבאנדלר Vite](https://vite.dev/guide/why.html#why-bundle-for-production), וכן תוכנת ביניים (middleware) לזיהוי השפה המועדפת של המשתמש, ניהול עוגיות וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלך">

### ארכיטקטורה

בארכיטקטורה זו, `solid-intlayer` מספק את ה-`IntlayerProvider` המורכב ב-`index.tsx` כדי לעטוף את עץ הרכיבים של Solid. הצהרות התוכן ממוקמות ב-`src/` לצד הרכיבים.

```bash
.
├── src
│   ├── app.content.ts
│   ├── App.css
│   ├── App.tsx                       # רכיב Solid ראשי
│   ├── index.css
│   ├── index.tsx                     # נקודת כניסה עם IntlayerProvider
│   └── vite-env.d.ts
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

> באמצעות קובץ תצורה זה, תוכל להגדיר כתובות URL מותאמות לשפה, הפניות של middleware, שמות של קובצי cookie, מיקום וסיומות של הצהרות התוכן שלך, להשבית יומני Intlayer במסוף, ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיין ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בתצורת ה-Vite שלך">

הוסף את התוסף של intlayer לתצורה שלך.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid(), intlayer()],
});
```

> תוסף ה-Vite `intlayer()` משמש לשילוב Intlayer ב-Vite. הוא מבטיח את בניית קובצי הצהרת התוכן ומנטר אותם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={4} title="הצהרה על התוכן שלך">

צור ונהל את הצהרות התוכן שלך כדי לאחסן תרגומים:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      he: "סמל Vite",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    solidLogo: t({
      he: "סמל Solid",
      en: "Solid logo",
      fr: "Logo Solid",
      es: "Logo Solid",
    }),
    title: "Vite + Solid",
    count: t({
      he: "הספירה היא {{count}}",
      en: "count is {{count}}",
      fr: "le compte est {{count}}",
      es: "el recuento es {{count}}",
    }),
    edit: t({
      he: "ערוך את src/App.tsx ושמור כדי לבדוק HMR",
      en: "Edit src/App.tsx and save to test HMR",
      fr: "Éditez src/App.tsx et enregistrez pour tester HMR",
      es: "Edita src/App.tsx y guarda para probar HMR",
    }),
    readTheDocs: t({
      he: "לחץ על הסמלים של Vite ו-Solid כדי ללמוד עוד",
      en: "Click on the Vite and Solid logos to learn more",
      fr: "Cliquez sur les logos Vite et Solid pour en savoir plus",
      es: "Haga clic en los logotipos de Vite and Solid para obtener más información",
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
        "he": "סמל Vite",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "solidLogo": {
      "nodeType": "translation",
      "translation": {
        "he": "סמל Solid",
        "en": "Solid logo",
        "fr": "Logo Solid",
        "es": "Logo Solid"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "he": "Vite + Solid",
        "en": "Vite + Solid",
        "fr": "Vite + Solid",
        "es": "Vite + Solid"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "he": "הספירה היא {{count}}",
        "en": "count is {{count}}",
        "fr": "le compte est {{count}}",
        "es": "el recuento es {{count}}"
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "he": "ערוך את src/App.tsx ושמור כדי לבדוק HMR",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "he": "לחץ על הסמלים של Vite ו-Solid כדי ללמוד עוד",
        "en": "Click on the Vite and Solid logos to learn more",
        "fr": "Cliquez sur les logos Vite and Solid pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite and Solid para obtener más información"
      }
    }
  }
}
```

> הצהרות התוכן שלך יכולות להיות מוגדרות בכל מקום באפליקציה שלך, כל עוד הן נכללות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> לפרטים נוספים, עיין ב[תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={5} title="שימוש ב-Intlayer בקוד שלך">

גש למילוני התוכן שלך בכל רחבי האפליקציה:

```tsx {1,11} fileName="src/App.tsx" codeFormat="typescript"
import { createSignal, type Component } from "solid-js";
import solidLogo from "./assets/solid.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "solid-intlayer";

const AppContent: Component = () => {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://www.solidjs.com/" target="_blank">
          <img
            src={solidLogo}
            class="logo solid"
            alt={content.solidLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count({ count: count() })}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: Component = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> ב-Solid, הפונקציה `useIntlayer` מחזירה תוכן ריאקטיבי (למשל, `content`). ניתן לגשת למאפיינים שלו ישירות.

> אם ברצונך להשתמש בתוכן שלך במאפיין מחרוזת (`string`), כגון `alt`, `title`, `href`, `aria-label` וכדומה, תוכל להשתמש בערך של הפונקציה, כגון:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

</Step>
<Step number={6} title="שינוי שפת התוכן שלך" isOptional={true}>

כדי לשנות את שפת התוכן שלך, תוכל להשתמש בפונקציה `setLocale` המסופקת על ידי ההוק `useLocale`. פונקציה זו מאפשרת לך להגדיר את שפת האפליקציה ולעדכן את התוכן בהתאם.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { Locales } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as Locales)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

</Step>
<Step number={7} title="הוספת ניתוב מותאם לשפות (localized routing) לאפליקציה שלך" isOptional={true}>

מטרת שלב זה היא ליצור נתיבים ייחודיים לכל שפה. הדבר מועיל עבור SEO וכתובות URL ידידותיות לקידום אתרים.
דוגמה:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

כדי להוסיף ניתוב מותאם לשפות לאפליקציה שלך, תוכל להשתמש ב-`@solidjs/router`.

תחילה, התקן את התלויות הדרושות:

```bash packageManager="npm"
npm install @solidjs/router
```

לאחר מכן, עטוף את האפליקציה שלך עם ה-`Router` והגדר את הנתיבים שלך באמצעות `localeMap`:

```tsx fileName="src/index.tsx"  codeFormat="typescript"
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
```

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { type Component } from "solid-js";
import { Route } from "@solidjs/router";
import { localeMap } from "intlayer";
import { IntlayerProvider } from "solid-intlayer";
import Home from "./pages/Home";
import About from "./pages/About";

const App: Component = () => (
  <IntlayerProvider>
    {localeMap(({ locale, urlPrefix }) => (
      <Route
        path={urlPrefix || "/"}
        component={(props: any) => (
          <IntlayerProvider locale={locale}>{props.children}</IntlayerProvider>
        )}
      >
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Route>
    ))}
  </IntlayerProvider>
);

export default App;
```

</Step>
<Step number={8} title="שינוי כתובת ה-URL כאשר השפה משתנה" isOptional={true}>

כדי לשנות את כתובת ה-URL כאשר השפה משתנה, תוכל להשתמש ב-prop של `onLocaleChange` המסופק על ידי ההוק `useLocale`. תוכל להשתמש בהוקים `useNavigate` ו-`useLocation` מ-`@solidjs/router` כדי לעדכן את נתיב ה-URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { type Component, For } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

const LocaleSwitcher: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (loc) => {
      const pathWithLocale = getLocalizedUrl(location.pathname, loc);
      navigate(pathWithLocale);
    },
  });

  return (
    <select
      value={locale()}
      onChange={(e) => setLocale(e.currentTarget.value as any)}
    >
      <For each={availableLocales}>
        {(loc) => (
          <option value={loc} selected={loc === locale()}>
            {loc}
          </option>
        )}
      </For>
    </select>
  );
};
```

</Step>
<Step number={9} title="החלפת מאפייני שפה וכיוון ב-HTML" isOptional={true}>

עדכן את המאפיינים `lang` ו-`dir` של תגית ה-`<html>` כדי שיתאימו לשפה הנוכחית עבור נגישות ו-SEO.

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { createEffect, type Component } from "solid-js";
import { useLocale } from "solid-intlayer";
import { getHTMLTextDir } from "intlayer";

const AppContent: Component = () => {
  const { locale } = useLocale();

  createEffect(() => {
    document.documentElement.lang = locale();
    document.documentElement.dir = getHTMLTextDir(locale());
  });

  return (
    // ... תוכן האפליקציה שלך
  );
};
```

</Step>
<Step number={10} title="יצירת רכיב קישור מותאם לשפה (Localized Link)" isOptional={true}>

צור רכיב `Link` מותאם אישית המוסיף אוטומטית קידומת של השפה הנוכחית לכתובות URL פנימיות.

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { type ParentComponent } from "solid-js";
import { A, type AnchorProps } from "@solidjs/router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const Link: ParentComponent<AnchorProps> = (props) => {
  const { locale } = useLocale();

  const isExternal = () => props.href.startsWith("http");
  const localizedHref = () =>
    isExternal() ? props.href : getLocalizedUrl(props.href, locale());

  return <A {...props} href={localizedHref()} />;
};
```

במקביל, תוכל גם להשתמש ב-`intlayerProxy` כדי להוסיף ניתוב בצד השרת לאפליקציה שלך. תוסף זה יזהה אוטומטית את השפה הנוכחית על סמך כתובת ה-URL ויגדיר את קובץ ה-cookie המתאים לשפה. אם לא צוינה שפה, התוסף יקבע את השפה המתאימה ביותר על סמך העדפות שפת הדפדפן של המשתמש. אם לא זוהתה שפה, הוא יפנה לשפת ברירת המחדל.

> שים לב שכדי להשתמש ב-`intlayerProxy` בסביבת ייצור, עליך להעביר את החבילה `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מ-Intlayer v9, `intlayerProxy()` מצורף ישירות לתוסף `intlayer()` ומופעל כברירת מחדל דרך האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר עבור תאימות לאחור ועבור הגדרות הזקוקות לשליטה על סדר התוספים. הגדר `routing.enableProxy: false` כדי לבטל זאת. עיין ב[הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות גרסה v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solid(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={11} title="חילוץ התוכן של הרכיבים שלך" isOptional={true}>

אם יש לך בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציע [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) כדי להמיר את הרכיבים שלך ולחלץ את התוכן.

- [מהדר (compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

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

ודא שתצורת ה-TypeScript שלך כוללת את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
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

לפרטים נוספים על אופן השימוש בהרחבה, עיין ב[תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### להתקדם הלאה

כדי להתקדם הלאה, תוכל להטמיע את ה[עורך החזותי (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלך החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Vite ו-Solid?">

ל-Vite אין דעה לגבי i18n, ולכן הבחירה מגיעה מהאקוסיסטם של Solid:

- **`@solid-primitives/i18n`**: הפרימיטיב הקהילתי, מילון שטוח שאתה מרכיב וטוען בעצמך.
- **`i18next`** עם עטיפת Solid: קטלוגים בוגרים, אך ללא פתרון ריאקטיביות משלו.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלך ([לצד כל רכיב או מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומעובד על ידי תוסף ה-Vite בזמן הבנייה, בעל טיפוסיות מלאה, עם תרגום AI, עורך חזותי ו-CMS.

היתרון הספציפי ל-Vite הוא שתרגומים נפתרים ועוברים tree shaking בזמן הידור במקום להיאחזר כ-JSON בזמן ריצה, כך שדף שולח רק את הרשומות שהוא מרנדר. עיין ב[למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="כמה תוספת בינאום מוסיפה לגודל ה-bundle שלי ב-Solid?">

הרבה פחות מהגדרה מבוססת מרחב שמות, מכיוון שדף לעולם אינו מוריד קטלוג שאינו מרנדר. המהדר בזמן הבנייה מחליף קריאות ל-`useIntlayer` ברשומות המילון המדויקות שבהן הרכיב משתמש, כך שמפתחות ושפות שאינם בשימוש מושמטים, ו[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל ה-bundle והדפים בעד 50%. עיין ב[אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) וב[השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [השוואת ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/solid.md)

</Question>
<Question title="האם אוכל לעבור מ-`@solid-primitives/i18n` או `i18next` מבלי לשכתב את הרכיבים שלי?">

במידה רבה כן. עקוב אחר [מדריך המעבר מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md) כדי להעביר את התוכן. ניתן גם להעביר בהדרגה: [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתה מעביר רכיבים בזה אחר זה.

- [מדריך מעבר מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי התרגום הקיימים שלי בפורמט JSON?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלך כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per-locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לך לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הפעל את `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלך, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכל לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 11 במדריך זה מפרט זאת.

עבור צינור אוטומטי לחלוטין, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) מבצע את אותו הדבר בזמן הבנייה: הוא סורק את קוד המקור שלך ב-JSX, TSX, Vue ו-Svelte בכל שינוי, מייצר את המילונים ושומר אותם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין מפתחות לתחזק ידנית כלל.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

כדאי להכיר שתי מגבלות לפני הפעלת המהדר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כמו `className="active"` או קוד סטטוס, מה שדורש כמה הערות בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אותך בתהליך קבלת ההחלטות.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עריכה וכלי סוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: מעבר ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל האזכורים (find all references), תצוגה מקדימה בריחוף מעל ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא פותר גם קריאות של `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שמסייע בזמן המעבר.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית משיב מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[כישורי סוכן (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת כישור לכל framework, המלמדים סוכן את הגדרות הניתוב שלך ואת סוגי צומתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="כיצד אני משתמש בתוכן מתורגם ברכיב Solid?">

קרא ל-`useIntlayer` ברכיב שלך וגש לערכים ישירות. התוכן מגובה על ידי signal של Solid, כך ששינוי השפה מעדכן רק את חלקי ה-DOM שקוראים אותו, ללא רינדור מחדש של הרכיב. שלב 5 מציג את השימוש.

</Question>
<Question title="האם Intlayer עובד עם שרת הפיתוח של Vite וטעינה חמה (hot reload)?">

כן. תוסף ה-Vite `intlayer()` מנטר את קובצי ה-`.content.ts` שלך ובונה מחדש את המילונים המושפעים בעת שמירה, כך שהעריכות מופיעות ללא צורך בהפעלת שרת הפיתוח מחדש, והטיפוסים שנוצרו נוצרים מחדש בו זמנית כך שההשלמה האוטומטית נשארת מסונכרנת.

</Question>
<Question title="כיצד אני מגדיר ניתוב מותאם לשפות?">

שלבים 7 ו-8 מכסים את הנתיבים המותאמים לשפה ואת שכתוב ה-URL כאשר השפה משתנה, ושלב 10 מוסיף רכיב קישור מותאם לשפה. `routing.mode` קובע את מבנה ה-URL: `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`), `"prefix-all"`, `"no-prefix"` (נקבע מתוך עוגייה, כותרת או דומיין) או `"search-params"` (`/about?locale=fr`). עיין ב[מדריך התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד אני תומך בשפות הנכתבות מימין לשמאל כמו ערבית או עברית?">

שלב 9 מכסה זאת. `getHTMLTextDir` מחזיר `ltr`, `rtl` או `auto` עבור שפה, כך שתוכל לקשור את `lang` ו-`dir` באלמנט השורש מתוך השפה הפעילה ולתת למאפיינים הלוגיים של ה-CSS שלך לטפל בשאר.

</Question>
<Question title="כיצד אני מטפל במטא-נתונים של SEO באפליקציית Vite המרונדרת בצד הלקוח?">

הגדר את `lang` ו-`dir` באלמנט ה-`html` מתוך השפה הפעילה, ופלוט חלופות `hreflang` עבור כל שפה מוצהרת בעזרת `getMultilingualUrls`, כולל `x-default`. עבור דפים שחייבים להיסרק באופן אמין, העדף הגדרה עם רינדור מוקדם או רינדור בצד השרת.

</Question>
<Question title="כיצד אני מתרגם את האפליקציה באופן אוטומטי בעזרת AI?">

הפעל את `npx intlayer fill`. הפקודה ממלאת תרגומים חסרים באמצעות ה-LLM לבחירתך, תוך שימוש בספק ובמפתח ה-API שלך, ו-`--git-diff` מגביל את ההרצה לתוכן שהשתנה בענף. עיין ב[פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) וב[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו[מעצבי פורמט (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבי פורמט](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות ה[עורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על התשתית שלך ומאפשר לכל אחד לערוך טקסט במקום באפליקציה הפועלת, או ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), המוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחודשת (deployment).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="מה העלות של העורך החזותי? האם זה מיותר אם איני זקוק לו?">

ל[עורך החזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) יש **אפס עלות** באפליקציה שלך אם אינו מוגדר. הלוגיקה הנוספת נטענת רק אם הופעלה ונדרשת במפורש.

- [עורך חזותי של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)

אם מופעל, העלות קלה ביותר (+5 KB, נטען דינמית רק בעת הפעלה) מכיוון שהלוגיקה הראשית מנוהלת על ידי עורך השרת ב-[app.intlayer.org](https://app.intlayer.org) או באמצעות החבילה `intlayer-editor`. אם אתה זקוק רק להגדרת תרגום פשוטה ללא עריכה חזותית, Intlayer אינו מוסיף שום תקורה לאפליקציה שלך.

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמאי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
