---
createdAt: 2026-03-31
updatedAt: 2026-11-03
priority: 9
title: "בינאום (i18n) ב-Vanilla JS - מדריך מלא לתרגום האפליקציה שלכם"
description: "הגדירו את Intlayer ב-JavaScript טהור ללא framework: תרגמו דף HTML סטטי, החליפו שפות ושמרו על תוכן בעל טיפוסיות חזקה."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
applicationShowcase: https://intlayer-vanilla-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.4.10
    date: 2026-03-31
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-Vanilla JS שלכם באמצעות Intlayer

<Tabs defaultTab="code">
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## תוכן עניינים

<TOC/>

## למה לבחור ב-Intlayer על פני חלופות?

בהשוואה לפתרונות מובילים כמו `i18next` או `i18n.js`,‏ Intlayer הוא פתרון המגיע עם אופטימיזציות מובנות כגון:

<AccordionGroup>
<Accordion header="כיסוי מלא עבור Vanilla JS">

Intlayer מותאם לפעול בצורה מושלמת עם Vanilla JavaScript על ידי הצעת **ניהול תוכן בלתי תלוי ב-framework**, **תמיכה ב-TypeScript**, וכל התכונות הנדרשות להרחבת הבינאום (i18n).

</Accordion>
<Accordion header="גודל החבילה (Bundle size)">

במקום לטעון קובצי JSON עצומים לתוך הדפים שלכם, טענו רק את התוכן הנדרש. Intlayer מסייע **להפחית את גודל החבילה והדפים שלכם בעד 50%**.

</Accordion>
<Accordion header="תחזוקתיות (Maintainability)">

תיחום התוכן של האפליקציה שלכם **מקל על התחזוקה** באפליקציות רחבות היקף. תוכלו לשכפל או למחוק תיקיית פיצ'ר בודדת ללא הנטל המחשבתי של סקירת כל קוד התוכן שלכם. בנוסף, Intlayer בעל **טיפוסיות מלאה (fully typed)** כדי להבטיח את דיוק התוכן שלכם.

</Accordion>
<Accordion header="סוכני בינה מלאכותית (AI Agents)">

הצבת תוכן בסמיכות לקוד (co-locating) **מפחיתה את ההקשר (context) הנדרש** על ידי מודלי שפה גדולים (LLMs).‏ Intlayer מגיע גם עם חבילת כלים, כגון **CLI** לבדיקת תרגומים חסרים, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)** ו-**[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**, כדי להפוך את חוויית המפתח (DX) לחלקה אף יותר עבור סוכני AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)

</Accordion>
<Accordion header="אוטומציה">

השתמשו באוטומציה לתרגום ב-CI/CD pipeline שלכם באמצעות ה-LLM לבחירתכם בעלות של ספק ה-AI שלכם. Intlayer מציע גם **קומפיילר** לאוטומציה של חילוץ תוכן, וכן [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המסייעת **לתרגם ברקע**.

- [פלטפורמת ווב](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
<Accordion header="ביצועים">

חיבור קובצי JSON ענקיים לרכיבים עלול להוביל לבעיות ביצועים וריאקטיביות. Intlayer מבצע אופטימיזציה לטעינת התוכן שלכם בזמן הבנייה (build time).

</Accordion>
<Accordion header="סקלביליות עם אנשי צוות שאינם מפתחים">

יותר מסתם פתרון i18n,‏ Intlayer מספק **[עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) באחסון עצמי (self-hosted)** ו-**[CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)** שיעזרו לכם לנהל את התוכן הרב-לשוני שלכם ב**זמן אמת**, מה שהופך את שיתוף הפעולה עם מתרגמים, כותבי תוכן וחברי צוות אחרים לחלק ופשוט. ניתן לאחסן תוכן מקומית ו/או מרחוק.

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS מלא](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Vanilla JS

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את החבילות הנדרשות באמצעות npm:

```bash packageManager="npm"
# יצירת חבילת standalone של intlayer ו-vanilla-intlayer
# קובץ זה ייובא לתוך קובץ ה-HTML שלכם
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# אתחול intlayer עם קובץ הגדרות
npx intlayer init --no-gitignore

# בניית המילונים
npx intlayer build
```

```bash packageManager="pnpm"
# יצירת חבילת standalone של intlayer ו-vanilla-intlayer
# קובץ זה ייובא לתוך קובץ ה-HTML שלכם
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# אתחול intlayer עם קובץ הגדרות
pnpm intlayer init --no-gitignore

# בניית המילונים
pnpm intlayer build
```

```bash packageManager="yarn"
# יצירת חבילת standalone של intlayer ו-vanilla-intlayer
# קובץ זה ייובא לתוך קובץ ה-HTML שלכם
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# אתחול קובץ הגדרות intlayer, הגדרת TypeScript אם קיימת, משתני סביבה
yarn intlayer init --no-gitignore

# בניית המילונים
yarn intlayer build
```

```bash packageManager="bun"
# יצירת חבילת standalone של intlayer ו-vanilla-intlayer
# קובץ זה ייובא לתוך קובץ ה-HTML שלכם
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# אתחול intlayer עם קובץ הגדרות
bun x intlayer init --no-gitignore

# בניית המילונים
bun x intlayer build
```

- **intlayer**
  חבילת הליבה המספקת כלי בינאום לניהול הגדרות, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **vanilla-intlayer**
  החבילה שמשלבת את Intlayer עם אפליקציות JavaScript / TypeScript טהורות. היא מספקת singleton במודל pub/sub (`IntlayerClient`) ופונקציות עזר מבוססות callback (`useIntlayer`, `useLocale` וכו') כך שכל חלק באפליקציה שלכם יוכל להגיב לשינויי שפה מבלי להיות תלוי ב-framework ממשק משתמש.

> ייצוא החבילה של ה-CLI עם `intlayer standalone` מייצר build מותאם על ידי ניקוי קוד שאינו בשימוש (tree-shaking) מחבילות, שפות ולוגיקה שאינה חיונית (כמו הפניות או קידומות) המוגדרות בהגדרות שלכם.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

### ארכיטקטורה

בארכיטקטורה זו, ליבת `intlayer` מספקת ממשקי JavaScript API להצהרה וצריכה של מילונים בסביבות JavaScript או TypeScript סטנדרטיות ללא frontend framework.

```bash
.
├── src
│   ├── app.content.mjs
│   └── main.js
├── index.html
├── intlayer.config.mjs
└── package.json
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
};

export default config;
```

> באמצעות קובץ הגדרות זה, תוכלו להגדיר כתובות URL מותאמות לשפה, הפניות middleware, שמות קובצי cookie, את המיקום והסיומת של הצהרות התוכן שלכם, להשבית יומני רישום של Intlayer במסוף ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיינו ב-[תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="ייבוא החבילה ב-HTML שלכם">

לאחר שיצרתם את חבילת `intlayer.js`, תוכלו לייבא אותה בקובץ ה-HTML שלכם:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <!-- ייבוא החבילה -->
    <script src="./intlayer.js" defer></script>
    <!-- ייבוא הסקריפט הראשי שלכם -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

החבילה חושפת את `Intlayer` ו-`VanillaIntlayer` כאובייקטים גלובליים על גבי `window`.

</Step>
<Step number={4} title="אתחול Intlayer בנקודת הכניסה שלכם">

ב-`src/main.js` שלכם, קראו ל-`installIntlayer()` **לפני** שתוכן כלשהו מרונדר כדי שה-singleton הגלובלי של השפה יהיה מוכן.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// יש לקרוא לזה לפני רינדור כל תוכן i18n.
installIntlayer();
```

אם ברצונכם להשתמש גם במרנדר ה-markdown, קראו ל-`installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>
<Step number={5} title="הצהרת התוכן שלכם">

צרו ונהלו את הצהרות התוכן שלכם כדי לאחסן תרגומים:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      he: "לוגו Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
        he: "הספירה היא {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
      he: "לחצו על לוגו Vite כדי ללמוד עוד",
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
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "he": "לוגו Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}",
          "he": "הספירה היא {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información",
        "he": "לחצו על לוגו Vite כדי ללמוד עוד"
      }
    }
  }
}
```

> הצהרות התוכן שלכם יכולות להיות מוגדרות בכל מקום באפליקציה שלכם כל עוד הן כלולות בתיקיית `contentDir` (כברירת מחדל, `./src`), ותואמות לסיומת קובץ הצהרת התוכן (כברירת מחדל, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> לפרטים נוספים, עיינו ב-[תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={6} title="שימוש ב-Intlayer ב-JavaScript שלכם">

האובייקט `window.VanillaIntlayer` מספק פונקציות עזר של API: הפונקציה `useIntlayer(key, locale?)` מחזירה את התוכן המתורגם עבור מפתח נתון.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// קבלת התוכן הראשוני עבור השפה הנוכחית.
// שרשור .onChange() כדי לקבל התראה בכל פעם שהשפה משתנה.
const content = useIntlayer("app").onChange((newContent) => {
  // רינדור מחדש או עדכון נקודתי של צמתי ה-DOM המושפעים בלבד
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// רינדור ראשוני
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> גשו לערכי הקצה כמחרוזות על ידי עטיפתם ב-`String()`, הקורא למתודת `toString()` של הצומת ומחזיר את הטקסט המתורגם.
>
> כאשר אתם זקוקים לערך עבור מאפיין HTML טבעי (לדוגמה `alt`, `aria-label`), השתמשו ב-`.value` ישירות:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>
<Step number={7} title="שינוי שפת התוכן שלכם" isOptional={true}>

כדי לשנות את שפת התוכן שלכם, השתמשו בפונקציה `setLocale` הנחשפת על ידי `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "שפה");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // שמירה על סנכרון התפריט כאשר השפה משתנה ממקום אחר
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>
<Step number={8} title="החלפת מאפייני השפה והכיווניות ב-HTML" isOptional={true}>

עדכנו את המאפיינים `lang` ו-`dir` של תגית `<html>` כדי שיתאימו לשפה הנוכחית לצורכי נגישות ו-SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>
<Step number={9} title="טעינה עצלה (Lazy-load) של מילונים לפי שפה" isOptional={true}>

אם ברצונכם לטעון מילונים בטעינה עצלה לפי שפה, תוכלו להשתמש ב-`useDictionaryDynamic`. זה שימושי אם אינכם רוצים לכלול את כל התרגומים בקובץ `intlayer.js` הראשוני.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> הערה: `useDictionaryDynamic` דורש שהמילונים יהיו זמינים כקובצי ESM נפרדים. גישה זו משמשת בדרך כלל אם יש לכם שרת אינטרנט המגיש את המילונים.

</Step>

</Steps>

### הגדרת TypeScript

וודאו שהגדרות ה-TypeScript שלכם כוללות את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### תוסף ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **התוסף הרשמי של Intlayer ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

תוסף זה מספק:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטמעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון פשוטים של תרגומים.

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב-[תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### להעמיק עוד

כדי להעמיק עוד, תוכלו להטמיע את [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="האם אוכל להשתמש ב-Intlayer ללא כלי בנייה (bundler) או framework?">

כן. זה בדיוק מה שמדריך זה מכסה. אתם מייבאים את חבילת `vanilla-intlayer` ישירות ב-HTML שלכם כפי שמוצג בשלב 3, מאתחלים אותה בנקודת הכניסה וקוראים את התוכן שלכם באמצעות `useIntlayer`. אין צורך ב-Vite, ב-webpack או ב-pipeline בנייה כלשהו.

</Question>
<Question title="כמה משקל מוסיף i18n לדף שלי?">

הרבה פחות מקטלוג בזמן ריצה, מכיוון שדף לעולם אינו מוריד שפה שהוא אינו מרנדר. התוכן מפוענח מתוך מילונים המקומפלים מראש, וטעינה עצלה לכל שפה שומרת על השפות האחרות מחוץ למטען הראשוני עד שהמבקר מבצע החלפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל החבילה והדף בעד 50%. ראו [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md), [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="האם אוכל להגר מ-i18next מבלי לכתוב מחדש את הסקריפטים שלי?">

במידה רבה, כן. עקבו אחר [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md) כדי להעביר את התוכן. תוכלו גם להגר בהדרגה: [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים שלכם כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתם מעבירים סקריפטים בזה אחר זה.

- [מדריך הגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md)
- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` שלכם כמקור האמת ומייצר מהם מילוני Intlayer, בשני הכיוונים. [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו-[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לכם לפצל תוכן לפי שפה במקום לקבץ שפות בקובץ אחד.

- [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. ראו את [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

עבור צינור עבודה אוטומטי לחלוטין, [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) עושה את אותו הדבר בזמן הבנייה על קוד מקור של JSX,‏ TSX,‏ Vue ו-Svelte, כשהוא מייצר את המילונים בכל שינוי כך שאין צורך לתחזק מפתחות ידנית. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה נשארות מחוץ להישג יד, והוא זקוק למעט הערות כדי להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה.

- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

</Question>
<Question title="אילו כלי עורך וסוכני בינה מלאכותית זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות (command palette) או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל המופעים (find all references), תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שמסייע בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor,‏ VS Code,‏ Claude Desktop,‏ Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: יכולות ממוקדות כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת יכולת לכל סביבת פיתוח, המלמדות סוכן בינה מלאכותית את מבנה הניתוב שלכם ואת סוגי צמתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות בקוד (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="מהם הפתרונות השונים הזמינים לבינאום אתר JavaScript פשוט?">

- **אובייקט מילון שנכתב ידנית**, בדרך כלל קובץ JSON אחד לכל שפה הנטען באמצעות `fetch`: ללא תלויות, אך ללא טיפוסיות, ללא חוקי רבים (plural rules), וללא שום כלי שיתריע על תרגום חסר.
- **`i18next`** מ-CDN: פתרון בוגר ובלתי תלוי ב-framework, עם מערכת תוספים, אך הוא מוסיף זמן ריצה וטעינת קטלוגים משלו.
- **`Intlayer`**: תוכן מוצהר עם חוקי רבים ומגדר, זיהוי שפה, תמיכה מימין לשמאל (RTL) וטעינה עצלה לכל שפה, בתוספת CLI שמשלים תרגומים חסרים באמצעות AI ועורך חזותי למי שאינם מפתחים.

ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)

</Question>
<Question title="כיצד אוכל לקרוא תרגום ולהציב אותו ב-DOM?">

קראו ל-`useIntlayer` עם מפתח המילון שלכם וכתבו את הערך לתוך הצומת בעצמכם, כפי שמוצג בשלב 6. מכיוון שאין כאן framework, שום דבר אינו מתרנדר מחדש מעצמו: אתם מעדכנים את הצמתים כאשר השפה משתנה, כפי שמכוסה בשלב 7.

</Question>
<Question title="כיצד מזוהה שפת המבקר?">

מתוך המקורות המפורטים ב-`routing.storage`, בדרך כלל תחילה מקובץ cookie, לאחר מכן מכותרת ה-`Accept-Language`, עם חזרה לשפת ברירת המחדל שלכם כגיבוי. שפה שהמבקר בוחר במפורש נשמרת, כך שהיא נשארת בביקור הבא. ראו את [מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד לתמוך בשפות הנכתבות מימין לשמאל כמו ערבית או עברית?">

שלב 8 מכסה זאת. הפונקציה `getHTMLTextDir` מחזירה `ltr`, `rtl` או `auto` עבור שפה נתונה, כך שתוכלו להגדיר את `lang` ו-`dir` באלמנט `html` מהשפה הפעילה ולאפשר למאפיינים הלוגיים של ה-CSS שלכם לבצע את השאר.

</Question>
<Question title="האם מבקרים מורידים כל שפה?">

לא אם אינכם רוצים בכך. שלב 9 מכסה טעינה עצלה של מילונים לכל שפה, כך שהדף טוען שפה אחת ומושך שפה אחרת רק כאשר המבקר מבצע החלפה. ראו [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)

</Question>
<Question title="כיצד אוכל לתרגם את האפליקציה אוטומטית באמצעות AI?">

הריצו `npx intlayer fill`. הפקודה משלימה תרגומים חסרים באמצעות ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם, והדגל `--git-diff` מגביל את הריצה לתוכן שהשתנה בענף. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו-[שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [שילוב CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך בריבוי (plurals), מגדר וטקסט עשיר?">

כן: [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md), [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [החדרות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md) ו-[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [צורות רבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/plurial.md)
- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [החדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/markdown.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="כיצד מתרגמים יכולים לערוך את התוכן מבלי לגעת בקוד?">

באמצעות [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md), הפועל על גבי התשתית שלכם ומאפשר לכל אחד לערוך טקסט ישירות על גבי האפליקציה הפועלת, או [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), המוציא את התוכן החוצה כך שיוכל להשתנות ללא פריסה מחדש (deployment).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. ה-CMS המנוהל הוא שירות אופציונלי בתשלום שניתן גם [לאחסנו באופן עצמאי (self hosted)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [אחסון עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
