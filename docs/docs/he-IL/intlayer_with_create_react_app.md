---
createdAt: 2025-08-23
updatedAt: 2026-11-03
priority: 3
title: "בינאום (i18n) ב-Create React App: מדריך תרגום מלא"
description: "הגדרת Intlayer בפרויקט Create React App: תוכן מוגדר טיפוסית לצד הרכיבים, בורר שפות ותרגומים הנטענים לפי שפה."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
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

# תרגום אתר Create React App באמצעות Intlayer

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-cra-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

ראו את [תבנית האפליקציה](https://github.com/aymericzip/intlayer-react-cra-template) ב-GitHub.

## מדוע לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות המובילים כמו `react-i18next` או `i18next`,‏ Intlayer מגיעה עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור React">

Intlayer מותאמת לפעול בצורה מושלמת עם React על ידי מתן **הגדרת תוכן ברמת הרכיב (component-level scoping)**, **טעינת תרגומים עצלה (lazy-loading)** וכל היכולות הדרושות להרחבת בינאום (i18n) בקנה מידה רחב.

</Accordion>
<Accordion header="גודל ה-Bundle">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנחוץ. Intlayer מסייעת **להפחית את גודל ה-bundle והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות">

הגדרת תחום התוכן ברמת הרכיב **מפשטת את התחזוקה** באפליקציות גדולות. ניתן לשכפל או למחוק תיקיית פיצ'ר בודדת מבלי לשאת בעומס המנטלי של סקירת כל בסיס קוד התוכן שלכם. בנוסף, Intlayer מספקת **טיפוסיות מלאה (fully typed)** כדי להבטיח את תקינות התוכן.

</Accordion>
<Accordion header="סוכני AI">

מיקום התוכן לצד הרכיבים **מצמצם את ההקשר הנדרש** עבור מודלי שפה גדולים (LLMs). Intlayer מספקת גם חבילת כלים כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית הפיתוח לחלקה עוד יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה לתרגום בצינור ה-CI/CD שלכם באמצעות ה-LLM שבחרתם, בעלות ספק ה-AI שלכם. Intlayer מציעה בנוסף **מהדר (compiler)** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המאפשרת **תרגום ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON גדולים לרכיבים עלול לגרום לבעיות ביצועים ותגובתיות. Intlayer מבצעת אופטימיזציה של טעינת התוכן בזמן הבנייה.

</Accordion>
<Accordion header="התרחבות בשיתוף צוותים ללא רקע בפיתוח">

מעבר להיותה פתרון i18n,‏ Intlayer מספקת **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי** ו-**[מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** המסייעים לנהל תוכן רב-לשוני ב**זמן אמת**, ומאפשרים שיתוף פעולה חלק עם מתרגמים, כותבי תוכן וחברי צוות נוספים. ניתן לאחסן תוכן באופן מקומי ו/או מרוחק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [מערכת CMS מלאה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית React

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
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  חבילת הליבה המספקת כלי בינאום לניהול תצורה, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **react-intlayer**

  החבילה המשלבת את Intlayer באפליקציית React. היא מספקת ספקי הקשר (context providers) ו-hooks עבור בינאום ב-React.

- **react-scripts-intlayer**

  כוללת את הפקודות והתוספים של `react-scripts-intlayer` לשילוב Intlayer באפליקציות מבוססות Create React App. תוספים אלה מבוססים על [craco](https://craco.js.org/) וכוללים תצורה נוספת עבור הבאנדלר [Webpack](https://webpack.js.org/).

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

צרו קובץ הגדרות כדי להגדיר את שפות האפליקציה:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // שאר השפות שלכם
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> באמצעות קובץ תצורה זה, תוכלו להגדיר כתובות URL מקומיות, הפניות middleware, שמות עוגיות, מיקום וסיומות של קובצי הצהרת התוכן, ביטול לוגים של Intlayer במסוף ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיינו ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בהגדרות ה-CRA שלכם">

שנו את הסקריפטים שלכם לשימוש ב-react-intlayer:

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> הסקריפטים של `react-scripts-intlayer` מבוססים על [CRACO](https://craco.js.org/). תוכלו גם לממש הגדרה מותאמת אישית המבוססת על תוסף ה-craco של intlayer. [ראו דוגמה כאן](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

</Step>
<Step number={4} title="הצהרה על התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם לאחסון התרגומים:

```tsx fileName="src/app.content.tsx" codeFormat={["typescript", "esm"]}
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      he: (
        <>
          ערכו את <code>src/App.tsx</code> ושמרו כדי לטעון מחדש
        </>
      ),
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        he: "למדו React",
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה, כל עוד הן כלולות בספריית `contentDir` (כברירת מחדל, `./src`) ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> לפרטים נוספים, עיינו ב[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

> אם קובץ התוכן שלכם כולל קוד TSX, מומלץ לייבא `import React from "react";` בקובץ התוכן.

</Step>
<Step number={5} title="שימוש ב-Intlayer בקוד שלכם">

גשו למילוני התוכן שלכם בכל רחבי האפליקציה:

```tsx {4,7} fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

> הערה: אם ברצונכם להשתמש בתוכן שלכם במאפיין מחרוזתי (`string`), כגון `alt`, `title`, `href`, `aria-label` וכדומה, תוכלו להשתמש בערך של הפונקציה, כגון:

> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> למידע נוסף על ה-hook בשם `useIntlayer`, עיינו ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md).

- [תיעוד ה-Hook useIntlayer | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useIntlayer.md)

</Step>
<Step number={6} title="שינוי שפת התוכן שלכם" isOptional={true}>

כדי לשנות את שפת התוכן, תוכלו להשתמש בפונקציה `setLocale` המסופקת על ידי ה-hook בשם `useLocale`. פונקציה זו מאפשרת לקבוע את שפת האפליקציה ולעדכן את התוכן בהתאם.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> למידע נוסף על ה-hook בשם `useLocale`, עיינו ב[תיעוד](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md).

- [תיעוד ה-Hook useLocale | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)

</Step>
<Step number={7} title="הוספת ניתוב מותאם שפה לאפליקציה שלכם" isOptional={true}>

מטרת שלב זה היא ליצור נתיבים ייחודיים לכל שפה. הדבר שימושי עבור SEO וכתובות URL מותאמות למנועי חיפוש.
דוגמה:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> כברירת מחדל, הנתיבים אינם כוללים קידומת עבור שפת ברירת המחדל. אם ברצונכם להוסיף קידומת לשפת ברירת המחדל, תוכלו להגדיר את האפשרות `middleware.prefixDefault` ל-`true` בהגדרות שלכם. ראו את [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) למידע נוסף.

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

כדי להוסיף ניתוב מותאם שפה לאפליקציה שלכם, תוכלו ליצור רכיב `LocaleRouter` שעוטף את נתיבי האפליקציה ומנהל ניתוב מבוסס שפה. הנה דוגמה באמצעות [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
// ייבוא תלויות ופונקציות נדרשות
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // פונקציות עזר וטיפוסים מ-intlayer
import type { FC, PropsWithChildren } from "react"; // טיפוסי React עבור רכיבים פונקציונליים ו-props
import { IntlayerProvider } from "react-intlayer"; // Provider עבור הקשר בינאום
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // רכיבי Router לניהול ניווט

// חילוץ הגדרות מ-Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * רכיב המטפל בלוקליזציה ועוטף רכיבי ילד עם הקשר השפה המתאים.
 * הוא מנהל זיהוי ואימות שפה על בסיס כתובת ה-URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // קבלת נתיב ה-URL הנוכחי

  // קביעת השפה הנוכחית, עם חזרה לשפת ברירת המחדל אם לא סופקה
  const currentLocale = locale ?? defaultLocale;

  // הסרת קידומת השפה מהנתיב לבניית נתיב בסיס
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // נתיב ה-URL הנוכחי
  );

  /**
   * אם middleware.prefixDefault הוא true, שפת ברירת המחדל תמיד צריכה להיות עם קידומת.
   */
  if (middleware.prefixDefault) {
    // אימות השפה
    if (!locale || !locales.includes(locale)) {
      // ניתוב מחדש לשפת ברירת המחדל עם הנתיב המעודכן
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // החלפת רשומת ההיסטוריה הנוכחית בחדשה
        />
      );
    }

    // עטיפת הילדים ב-IntlayerProvider והגדרת השפה הנוכחית
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * כאשר middleware.prefixDefault הוא false, שפת ברירת המחדל אינה מקבלת קידומת.
     * יש לוודא שהשפה הנוכחית תקפה ואינה שפת ברירת המחדל.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // אי הכללת שפת ברירת המחדל
        )
        .includes(currentLocale) // בדיקה אם השפה הנוכחית מופיעה ברשימת השפות התקפות
    ) {
      // הפניה מחדש לנתיב ללא קידומת שפה
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // עטיפת הילדים ב-IntlayerProvider והגדרת השפה הנוכחית
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * רכיב ראוטר המגדיר נתיבים ספציפיים לכל שפה.
 * הוא משתמש ב-React Router כדי לנהל ניווט ולרנדר רכיבים מותאמים לשפה.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // תבנית נתיב ללכידת השפה (למשל /en/, /fr/) והתאמה לכל הנתיבים שאחריה
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // עטיפת הילדים בניהול שפה
          />
        ))}

      {
        // אם קידומת עבור שפת ברירת המחדל מבוטלת, רנדר את הילדים ישירות בנתיב השורש
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // עטיפת הילדים בניהול שפה
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

לאחר מכן, תוכלו להשתמש ברכיב `LocaleRouter` באפליקציה שלכם:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... רכיב ה-AppContent שלכם

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

</Step>
<Step number={8} title="שינוי ה-URL בעת שינוי שפה" isOptional={true}>

כדי לשנות את ה-URL כאשר השפה משתנה, תוכלו להשתמש ב-prop בשם `onLocaleChange` המסופק על ידי ה-hook בשם `useLocale`. במקביל, ניתן להשתמש ב-hooks בשם `useLocation` ו-`useNavigate` מ-`react-router-dom` כדי לעדכן את נתיב ה-URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // קבלת נתיב ה-URL הנוכחי. לדוגמה: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // בניית כתובת ה-URL עם השפה המעודכנת
      // לדוגמה: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // עדכון נתיב ה-URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* השפה - למשל FR */}
              {localeItem}
            </span>
            <span>
              {/* שם השפה בשפה עצמה - למשל Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* שם השפה בשפה הנוכחית - למשל Francés כשהשפה הנוכחית מוגדרת כ-Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* שם השפה באנגלית - למשל French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> הפניות לתיעוד:
>
> - [ה-Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)
> - [הפונקציה `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocaleName.md)
> - [הפונקציה `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)
> - [הפונקציה `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getHTMLTextDir.md)
> - [המאפיין `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [המאפיין `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [המאפיין `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [המאפיין `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

- [ה-Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/react-intlayer/useLocale.md)
- [הפונקציה `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocaleName.md)
- [הפונקציה `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getLocalizedUrl.md)
- [הפונקציה `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={9} title="עדכון מאפייני שפה וכיוון ב-HTML" isOptional={true}>

כאשר האפליקציה שלכם תומכת במספר שפות, חיוני לעדכן את המאפיינים `lang` ו-`dir` בתגית `<html>` כדי שיתאימו לשפה הנוכחית. פעולה זו מבטיחה:

- **נגישות (Accessibility)**: קוראי מסך וטכנולוגיות מסייעות מסתמכים על המאפיין `lang` הנכון כדי להגות ולפרש את התוכן במדויק.
- **רינדור טקסט**: המאפיין `dir` (כיוון) מבטיח שהטקסט ירונדר בסדר הנכון (למשל משמאל לימין באנגלית, ומימין לשמאל בעברית או בערבית), מה שחיוני לקריאות.
- **SEO**: מנועי חיפוש משתמשים במאפיין `lang` כדי לקבוע את שפת הדף, מה שעוזר להציג את התוכן המותאם הנכון בתוצאות החיפוש.

באמצעות עדכון דינמי של מאפיינים אלה בעת שינוי שפה, אתם מבטיחים חוויה עקבית ונגישה למשתמשים בכל השפות הנתמכות.

### מימוש ה-Hook

צרו hook מותאם אישית לניהול מאפייני ה-HTML. ה-hook מאזין לשינויי שפה ומעדכן את המאפיינים בהתאם:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * מעדכן את מאפייני `lang` ו-`dir` של אלמנט ה-<html> ב-HTML בהתאם לשפה הנוכחית.
 * - `lang`: מיידע דפדפנים ומנועי חיפוש לגבי שפת הדף.
 * - `dir`: מבטיח כיוון קריאה נכון (למשל 'ltr' לאנגלית, 'rtl' לעברית ולערבית).
 *
 * עדכון דינמי זה חיוני לרינדור טקסט תקין, נגישות ו-SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // עדכון מאפיין השפה לשפה הנוכחית.
    document.documentElement.lang = locale;

    // הגדרת כיוון הטקסט בהתאם לשפה הנוכחית.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

### שימוש ב-Hook באפליקציה שלכם

שלבו את ה-hook ברכיב הראשי שלכם כך שמאפייני ה-HTML יתעדכנו בכל שינוי שפה:

```tsx fileName="src/App.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // הפעלת ה-hook לעדכון מאפייני lang ו-dir בתגית <html> בהתאם לשפה.
  useI18nHTMLAttributes();

  // ... שאר הרכיב שלכם
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

באמצעות החלת שינויים אלה, האפליקציה שלכם:

- תבטיח שמאפיין **השפה** (`lang`) משקף כראוי את השפה הנוכחית, דבר החשוב ל-SEO ולהתנהגות הדפדפן.
- תתאים את **כיוון הטקסט** (`dir`) בהתאם לשפה, ותשפר את הקריאות והשימושיות עבור שפות בעלות כיווני קריאה שונים.
- תספק חוויה **נגישה** יותר, שכן טכנולוגיות מסייעות תלויות במאפיינים אלה כדי לפעול בצורה מיטבית.
</Step>

</Steps>

### הגדרת TypeScript

Intlayer משתמשת בהרחבת מודולים (module augmentation) כדי ליהנות מיתרונות TypeScript ולהפוך את בסיס הקוד שלכם לחזק יותר.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

ודאו שהגדרות ה-TypeScript שלכם כוללות את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  // ... הגדרות ה-TypeScript הקיימות שלכם
  "include": [
    // ... הגדרות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרו על ידי Intlayer כדי למנוע את שמירתם במאגר ה-Git שלכם.

לשם כך, הוסיפו את ההוראה הבאה לקובץ `.gitignore`:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

### הרחבת VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **הרחבת Intlayer הרשמית ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

הרחבה זו מספקת:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון פשוטים של תרגומים.

לפרטים נוספים על השימוש בהרחבה, עיינו ב[תיעוד הרחבת ה-VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד הרחבת ה-VS Code של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### להעמיק עוד

כדי להעמיק עוד, תוכלו להטמיע את [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להוציא את ניהול התוכן שלכם החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום פרויקט Create React App?">

- **`react-i18next` / `i18next`**: הנפוצים ביותר, עם מרחבי שמות (namespaces) של JSON הנטענים בזמן ריצה.
- **`react-intl`** ו-**`Lingui`**: פורמט הודעות ICU, מבוססי חילוץ (extraction).
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)) ומקומפל בזמן הבנייה באמצעות `react-scripts-intlayer`, בעל טיפוסיות מלאה, עם תרגום ב-AI, עורך חזותי ו-CMS.

חבילת Create React App עוטפת תצורת webpack משלה, ולכן השילוב מתבצע באמצעות תחליף תואם `react-scripts-intlayer` במקום `react-scripts`, ולא באמצעות תוסף שאתם רושמים בעצמכם. ראו [מדוע Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) ואת [מבחן הביצועים (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [מדוע Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [מבחן ביצועים (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="בכמה מוסיף ה-i18n לגודל ה-Bundle שלי ב-React?">

הרבה פחות מהגדרה מבוססת מרחבי שמות (namespaces), מכיוון שדף אינו מוריד לעולם קטלוג שאינו מרנדר. המהדר בזמן הבנייה מחליף קריאות `useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן בשימוש מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות המקובלות, Intlayer מפחיתה את גודל ה-bundle והדף בעד 50%. ראו [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="האם ניתן להגר מ-react-i18next או מ-react-intl מבלי לכתוב מחדש את הרכיבים שלי?">

כן, וישנם שני מסלולים. תוכלו להגר את התוכן בהדרגה באמצעות [מדריך ההגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md) או [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md). לחלופין, תוכלו לשמור על ה-API הקיים שלכם במלואו: [מתאמי התאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md) חושפים בדיוק את אותו ה-API של `react-i18next`, `react-intl` ו-`i18next`, אך מוגשים באמצעות מילוני Intlayer, כך שהייבואים משתנים וקוד הרכיב נשאר בעינו.

- [מדריך הגירה מ-react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_react-i18next_to_intlayer.md)
- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [מתאמי תאימות (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compat/index.md)

</Question>
<Question title="האם ניתן לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי `/messages/{locale}/{namespace}.json` כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לפצל תוכן לפי שפה במקום לקבץ שפות בקובץ יחיד.

- [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer תקרא את הרכיבים שלכם, תחלץ את המחרוזות המוצגות למשתמש ותכתוב קובץ `.content` לצד כל רכיב, כך שתסקרו diff במקום להעתיק מחרוזות לקטלוג אחת אחת.

עבור תהליך אוטומטי לחלוטין, [המהדר של Intlayer (Intlayer Compiler)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) מבצע את אותה פעולה בזמן הבנייה: הוא סורק את קוד המקור של ה-JSX, TSX, Vue ו-Svelte שלכם בכל שינוי, מייצר את המילונים ושומר עליהם מסונכרנים באמצעות החלפת מודולים חמה (HMR), כך שאין צורך לתחזק מפתחות ידנית כלל.

- [המהדר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

שתי מגבלות שכדאי להכיר לפני הפעלת המהדר: הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות מ-CMS, אינן נגישות לו. בנוסף, עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כמו `className="active"` או קוד סטטוס, מה שדורש כמה ביאורים (annotations) בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן בכך שהיא משאירה אתכם בתהליך הבקרה.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עריכה וכלי סוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[הרחבת VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), חיפוש כל ההפניות, תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, והתראה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות `i18next`, `react-i18next`, `next-intl` ו-`use-intl`, מה שמסייע בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT, כך שעוזר יענה מתוך תיעוד עדכני במקום לנחש, ויוכל להריץ פקודות כמו `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: מיומנויות ממוקדות כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`, בתוספת מיומנות ייעודית לכל framework, המלמדות סוכן על מערך הניתוב וטיפוסי צמתי התוכן שלכם.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מתריע על מחרוזות מובנות בקוד (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="Create React App כבר אינה מתוחזקת. האם כדאי לי לעבור קודם ל-Vite?">

אם אתם כבר מתכננים את המעבר, מומלץ לבצע אותו תחילה ולפעול לפי [המדריך ל-Vite ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md): תוסף ה-Vite נתמך טוב יותר ומספק בנייה חוזרת מהירה יותר. אם אינכם מוכנים לכך עדיין, מדריך זה ממשיך לעבוד, והצהרות התוכן אינן משתנות בין שני המערכים, כך שהגירת סביבת הבנייה בהמשך לא תדרוש שכתוב של ה-i18n שלכם.

- [מדריך ל-Vite ו-React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_vite+react.md)

</Question>
<Question title="כיצד מגדירים ניתוב מותאם שפה בפרויקט Create React App?">

שלבים 7 ו-8 עוסקים בנתיבים מותאמי שפה ובשכתוב ה-URL כאשר השפה משתנה. אם אינכם מעוניינים בשפה בנתיב, הגדירו את `routing.mode` ל-`"no-prefix"` או ל-`"search-params"`, והשפה תיפתר מעוגייה או מפרמטר שאילתה במקום זאת. ראו את [הפניית התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [הפניית התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד מטפלים במטא-דאטה עבור SEO באפליקציית React המרונדרת בצד הלקוח?">

הגדירו את `lang` ו-`dir` באלמנט ה-`html` בהתאם לשפה הפעילה, כפי שמוצג בשלב 9, והפיקו חלופות `hreflang` עבור כל שפה מוצהרת באמצעות `getMultilingualUrls`, כולל `x-default`. מכיוון ש-Create React App מספקת מעטפת לקוח יחידה, עדיף להשתמש במערך המרונדר מראש (pre-rendered) או ברינדור שרת כגון [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md) או [React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_react_router_v7.md) עבור דפים שחייבים להיסרק באופן אמין על ידי מנועי חיפוש.

- [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_tanstack.md)
- [React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_react_router_v7.md)

</Question>
<Question title="כיצד תומכים בשפות הנכתבות מימין לשמאל כמו עברית או ערבית?">

שלב 9 מכסה זאת. הפונקציה `getHTMLTextDir` מחזירה `ltr`, `rtl` או `auto` עבור שפה נתונה, כך שקושרים את `lang` ו-`dir` באלמנט השורש לפי השפה הפעילה ומאפשרים למאפיינים הלוגיים של ה-CSS לטפל בכל השאר.

</Question>
<Question title="כיצד מתרגמים את האפליקציה באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה ממלאת תרגומים חסרים באמצעות ה-LLM לפי בחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את ההרצה רק לתוכן שהשתנה בענף הנוכחי. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ואת [האינטגרציה ל-CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [אינטגרציה ל-CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומכת בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים (plural forms)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [שיבוצים (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [שיבוצים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך תוכן מבלי לגעת בקוד?">

באמצעות [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על התשתית שלכם ומאפשר לכל אדם לערוך טקסט במקום באפליקציה הפועלת, או באמצעות [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), שמוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחדש.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer היא חינמית ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המתארח הוא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
