---
createdAt: 2026-03-23
updatedAt: 2026-11-03
priority: 9
title: "בינאום Vite + Vanilla JS (i18n): מדריך תרגום מלא"
description: "הגדירו את Intlayer באפליקציית Vite ללא framework: תרגמו את ה-DOM, החליפו שפות ושמרו על תוכן בעל טיפוסיות בקובצי .content."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - Vite
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vite-and-vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vite-vanilla-template
applicationShowcase: https://intlayer-vite-vanilla.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "עדכון השימוש ב-API של useIntlayer ב-Solid לגישה ישירה למאפיינים"
  - version: 8.4.10
    date: 2026-03-23
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אתר ה-Vite ו-Vanilla JS שלכם באמצעות Intlayer

<Tabs defaultTab="code">
  <Tab label="קוד" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="דמו" value="demo">

<iframe
  src="https://intlayer-vite-vanilla.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-vanilla-template"
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
<Accordion header="כיסוי מלא עבור Vite">

Intlayer מותאם לפעול בצורה מושלמת עם Vite על ידי הצעת **ניהול תוכן בלתי תלוי ב-framework**, **תמיכה ב-TypeScript**, וכל התכונות הנדרשות להרחבת הבינאום (i18n).

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

## מדריך שלב אחר שלב להגדרת Intlayer באפליקציית Vite ו-Vanilla JS

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
npm install intlayer vanilla-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer vanilla-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer vanilla-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer vanilla-intlayer
bun add vite-intlayer --dev
```

- **intlayer**
  חבילת הליבה המספקת כלי בינאום לניהול הגדרות, תרגום, [הצהרת תוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md), טרנספילציה ו-[פקודות CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/index.md).

- **vanilla-intlayer**
  החבילה שמשלבת את Intlayer עם אפליקציות JavaScript / TypeScript טהורות. היא מספקת singleton במודל pub/sub (`IntlayerClient`) ופונקציות עזר מבוססות callback (`useIntlayer`, `useLocale` וכו') כך שכל חלק באפליקציה שלכם יוכל להגיב לשינויי שפה מבלי להיות תלוי ב-framework ממשק משתמש.

- **vite-intlayer**
  כוללת את תוסף Vite לשילוב Intlayer עם [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), וכן middleware לזיהוי השפה המועדפת על המשתמש, ניהול קובצי cookie וטיפול בהפניות URL.

</Step>
<Step number={2} title="הגדרת הפרויקט שלכם">

### ארכיטקטורה

בארכיטקטורה זו, `vanilla-intlayer` או ליבת `intlayer` מספקות ממשקי JavaScript API לניהול תרגומים ועדכון דינמי של תוכן ה-DOM. הצהרות התוכן שוכנות ב-`src/`.

```bash
.
├── src
│   ├── app.content.ts
│   ├── counter.ts
│   ├── locale-switcher.ts
│   ├── main.ts                       # סקריפט ראשי המשתמש ב-vanilla-intlayer
│   └── style.css
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
};

export default config;
```

> באמצעות קובץ הגדרות זה, תוכלו להגדיר כתובות URL מותאמות לשפה, הפניות middleware, שמות קובצי cookie, את המיקום והסיומת של הצהרות התוכן שלכם, להשבית יומני רישום של Intlayer במסוף ועוד. לרשימה המלאה של הפרמטרים הזמינים, עיינו ב-[תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="שילוב Intlayer בהגדרות Vite שלכם">

הוסיפו את תוסף intlayer להגדרות שלכם.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> תוסף ה-Vite `intlayer()` משמש לשילוב Intlayer עם Vite. הוא מבטיח את בניית קובצי הצהרת התוכן ועוקב אחריהם במצב פיתוח. הוא מגדיר משתני סביבה של Intlayer בתוך אפליקציית Vite. בנוסף, הוא מספק כינויים (aliases) לשיפור הביצועים.

</Step>
<Step number={4} title="אתחול Intlayer בנקודת הכניסה שלכם">

קראו ל-`installIntlayer()` **לפני** שתוכן כלשהו מרונדר כדי שה-singleton הגלובלי של השפה יהיה מוכן.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer } from "vanilla-intlayer";

// יש לקרוא לזה לפני רינדור כל תוכן i18n.
installIntlayer();

// ייבוא והרצת מודולי האפליקציה שלכם.
import "./app.js";
```

אם אתם משתמשים גם בהצהרות תוכן עם `md()` (Markdown), התקינו בנוסף את מרנדר ה-markdown:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, installIntlayerMarkdown } from "vanilla-intlayer";

installIntlayer();
installIntlayerMarkdown();

import "./app.js";
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

`vanilla-intlayer` משקף את ה-API של `react-intlayer`: הפונקציה `useIntlayer(key, locale?)` מחזירה את התוכן המתורגם ישירות. שרשרו `.onChange()` על התוצאה כדי להירשם לשינויי שפה, המקבילה המפורשת לרינדור מחדש ב-React.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useIntlayer } from "vanilla-intlayer";

installIntlayer();

// קבלת התוכן הראשוני עבור השפה הנוכחית.
// שרשור .onChange() כדי לקבל התראה בכל פעם שהשפה משתנה.
const content = useIntlayer("app").onChange((newContent) => {
  // רינדור מחדש או עדכון נקודתי של צמתי ה-DOM המושפעים בלבד
  document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
    newContent.title
  );
  document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
    String(newContent.readTheDocs);
});

// רינדור ראשוני
document.querySelector<HTMLHeadingElement>("h1")!.textContent = String(
  content.title
);
document.querySelector<HTMLParagraphElement>(".read-the-docs")!.textContent =
  String(content.readTheDocs);
```

> גשו לערכי הקצה כמחרוזות על ידי עטיפתם ב-`String()`, הקורא למתודת `toString()` של הצומת ומחזיר את הטקסט המתורגם.
>
> כאשר אתם זקוקים לערך עבור מאפיין HTML טבעי (לדוגמה `alt`, `aria-label`), השתמשו ב-`.value` ישירות:
>
> ```typescript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>
<Step number={7} title="שינוי שפת התוכן שלכם" isOptional={true}>

כדי לשנות את שפת התוכן שלכם, השתמשו בפונקציה `setLocale` הנחשפת על ידי `useLocale`.

```typescript fileName="src/locale-switcher.ts" codeFormat="typescript"
import { getLocaleName } from "intlayer";
import { useLocale } from "vanilla-intlayer";

export function setupLocaleSwitcher(container: HTMLElement): () => void {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "שפה");

  const render = (currentLocale: string) => {
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

  select.addEventListener("change", () => setLocale(select.value as any));

  // שמירה על סנכרון התפריט כאשר השפה משתנה ממקום אחר
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>
<Step number={8} title="רינדור תוכן Markdown ו-HTML" isOptional={true}>

Intlayer תומך בהצהרות תוכן באמצעות `md()` ו-`html()`. ב-Vanilla JS, הפלט המקומפל מוזרק כ-HTML גולמי באמצעות `innerHTML`.

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
import { md, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    // ...
    editNote: md(
      t({
        en: "Edit `src/main.ts` and save to test **HMR**",
        fr: "Modifiez `src/main.ts` et enregistrez pour tester **HMR**",
        es: "Edite `src/main.ts` y guarde para probar **HMR**",
        he: "ערכו את `src/main.ts` ושמרו כדי לבדוק **HMR**",
      })
    ),
  },
} satisfies Dictionary;

export default appContent;
```

קימפול והזרקת ה-HTML:

```typescript fileName="src/main.ts" codeFormat="typescript"
import {
  compileMarkdown,
  installIntlayerMarkdown,
  useIntlayer,
} from "vanilla-intlayer";

installIntlayerMarkdown();

const content = useIntlayer("app").onChange((newContent) => {
  const el = document.querySelector<HTMLDivElement>(".edit-note")!;
  el.innerHTML = compileMarkdown(String(newContent.editNote));
});

document.querySelector<HTMLDivElement>(".edit-note")!.innerHTML =
  compileMarkdown(String(content.editNote));
```

> [!TIP]
> `String(content.editNote)` קורא ל-`toString()` על ה-`IntlayerNode`, המחזיר את מחרוזת ה-Markdown הגולמית. העבירו אותה ל-`compileMarkdown` כדי לקבל מחרוזת HTML, ואז הגדירו אותה דרך `innerHTML`.

> [!WARNING]
> השתמשו ב-`innerHTML` רק עם תוכן מהימן. אם ה-markdown מגיע מקלט משתמש, חטאו אותו תחילה (למשל באמצעות DOMPurify). תוכלו להתקין מרנדר מחטא בצורה דינמית:
>
> ```typescript
> import { installIntlayerMarkdownDynamic } from "vanilla-intlayer";
>
> await installIntlayerMarkdownDynamic(async () => {
>   const DOMPurify = await import("dompurify");
>   return (markdown) => DOMPurify.sanitize(compileMarkdown(markdown));
> });
> ```

</Step>
<Step number={9} title="הוספת ניתוב מותאם לשפה לאפליקציה שלכם" isOptional={true}>

כדי ליצור נתיבים ייחודיים לכל שפה (שימושי ל-SEO), תוכלו להשתמש ב-`intlayerProxy` בהגדרות Vite שלכם עבור זיהוי שפה בצד השרת.

תחילה, הוסיפו את `intlayerProxy` להגדרות ה-Vite שלכם:

> שימו לב שכדי להשתמש ב-`intlayerProxy` בייצור, עליכם להעביר את `vite-intlayer` מ-`devDependencies` ל-`dependencies`.

> החל מ-Intlayer גרסה 9, `intlayerProxy()` ארוז ישירות בתוך התוסף `intlayer()` ומופעל כברירת מחדל באמצעות האפשרות `routing.enableProxy` (`true` כברירת מחדל). רישומו בנפרד כפי שמוצג להלן הוא כעת אופציונלי. הוא נשמר עבור תאימות לאחור ולהגדרות הדורשות שליטה בסדר התוספים. הגדירו `routing.enableProxy: false` כדי לבטל זאת. ראו את [הערות השחרור של גרסה 9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md).

- [הערות השחרור של גרסה 9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={10} title="שינוי כתובת ה-URL כאשר השפה משתנה" isOptional={true}>

כדי לעדכן את כתובת ה-URL של הדפדפן כאשר השפה משתנה, קראו ל-`useRewriteURL()` לאחר התקנת Intlayer:

```typescript fileName="src/main.ts" codeFormat="typescript"
import { installIntlayer, useRewriteURL } from "vanilla-intlayer";

installIntlayer();

// משכתב את ה-URL באופן מיידי ובכל שינוי שפה עוקב.
// מחזיר פונקציית unsubscribe לניקוי.
const stopRewriteURL = useRewriteURL();
```

</Step>
<Step number={11} title="החלפת מאפייני השפה והכיווניות ב-HTML" isOptional={true}>

עדכנו את המאפיינים `lang` ו-`dir` של תגית `<html>` כדי שיתאימו לשפה הנוכחית לצורכי נגישות ו-SEO.

```typescript fileName="src/main.ts" codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";
import { installIntlayer, useLocale } from "vanilla-intlayer";

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

</Step>
<Step number={12} title="טעינה עצלה (Lazy-load) של מילונים לפי שפה" isOptional={true}>

עבור אפליקציות גדולות, ייתכן שתרצו לפצל את המילון של כל שפה ל-chunk משלו. השתמשו ב-`useDictionaryDynamic` לצד ה-`import()` הדינמי של Vite:

```typescript fileName="src/app.ts" codeFormat="typescript"
import { installIntlayer, useDictionaryDynamic } from "vanilla-intlayer";

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1")!.textContent = String(content.title);
});
```

> החבילה של כל שפה נטענת רק כאשר אותה שפה הופכת לפעילה והתוצאה נשמרת במטמון - מעברים עוקבים לאותה שפה הם מיידיים.

</Step>
<Step number={13} title="חילוץ התוכן של הרכיבים שלכם" isOptional={true}>

אם יש לכם בסיס קוד קיים, המרת אלפי קבצים עלולה לגזול זמן רב.

כדי להקל על תהליך זה, Intlayer מציעה [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) / [מחלץ (extractor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) כדי לשנות את הרכיבים שלכם ולחלץ את התוכן.

- [קומפיילר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)
- [מחלץ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

כדי להגדיר אותו, תוכלו להוסיף מקטע `compiler` בקובץ `intlayer.config.ts` שלכם:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

וודאו שהגדרות ה-TypeScript שלכם כוללות את הטיפוסים שנוצרו אוטומטית.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

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

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב-[תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### להעמיק עוד

כדי להעמיק עוד, תוכלו להטמיע את [העורך החזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md) או להעביר את התוכן שלכם לניהול חיצוני באמצעות [ה-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md).

- [עורך חזותי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מהם הפתרונות השונים הזמינים לבינאום אפליקציית Vite ו-Vanilla JS?">

ל-Vite אין דעה מוצקה לגבי i18n, ולכן הבחירה מגיעה מתוך האקו-סיסטם של Vanilla JS:

- **אובייקט מילון שנכתב ידנית** המיובא לנקודת הכניסה שלכם: ללא תלויות, אך ללא טיפוסיות, ללא חוקי רבים (plural rules), וללא שום כלי שיתריע על תרגום חסר.
- **`i18next`**: בוגר ובלתי תלוי ב-framework, אך הוא מוסיף זמן ריצה וטוען קטלוגים כקובצי JSON.
- **`Intlayer`**: הפתרון המתקדם ביותר. תוכן מוצהר בכל מקום בבסיס הקוד שלכם ([לצד כל רכיב או באופן מרוכז](https://github.com/aymericzip/intlayer/blob/main/docs/blog/he/per-component_vs_centralized_i18n.md)) ומקומפל על ידי תוסף Vite בזמן הבנייה, בעל טיפוסיות מלאה, עם תרגום באמצעות AI, עורך חזותי ו-CMS.

היתרון הייחודי ל-Vite הוא שתרגומים מפוענחים ועוברים tree-shaking בזמן ההידור במקום להיטען כ-JSON בזמן ריצה, כך שדף שולח רק את הרשומות שהוא מרנדר. ראו [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [למה Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/interest_of_intlayer.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="כמה משקל מוסיף i18n לגודל החבילה (bundle size) של Vite שלי?">

הרבה פחות מהגדרה המבוססת על namespaces, מכיוון שדף לעולם אינו מוריד קטלוג שהוא אינו מרנדר. הקומפיילר בזמן הבנייה מחליף קריאות `useIntlayer` ברשומות המילון המדויקות שהרכיב משתמש בהן, כך שמפתחות שאינם בשימוש ושפות שאינן בשימוש מושמטים, ו-[מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md) מפצלים את השאר לפי שפה. בהשוואה לחלופות הרגילות, Intlayer מפחית את גודל החבילה והדף בעד 50%. ראו [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md) ואת [מבחן הביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)
- [אופטימיזציית חבילה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/bundle_optimization.md)
- [מבחן ביצועים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/benchmark/index.md)

</Question>
<Question title="האם אוכל להגר מ-i18next מבלי לכתוב מחדש את המודולים שלי?">

במידה רבה, כן. עקבו אחר [מדריך ההגירה מ-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/migration_from_i18next_to_intlayer.md) כדי להעביר את התוכן. תוכלו גם להגר בהדרגה: [תוסף sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קטלוגי ה-JSON הקיימים שלכם כמקור האמת ומייצר מהם מילוני Intlayer, כך ששתי השכבות נשארות מסונכרנות בזמן שאתם מעבירים מודולים בזה אחר זה.

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

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את הרכיבים שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל אחד מהם, כך שתוכלו לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. שלב 13 במדריך זה מפרט זאת.

עבור צינור עבודה אוטומטי לחלוטין, [הקומפיילר של Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md) עושה את אותו הדבר בזמן הבנייה: הוא סורק את קוד המקור שלכם ב-JSX,‏ TSX,‏ Vue ו-Svelte בכל שינוי, מייצר את המילונים ושומר עליהם מסונכרנים באמצעות hot module replacement, כך שאין צורך לתחזק מפתחות ידנית כלל.

- [קומפיילר Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/compiler.md)

ישנן שתי מגבלות שכדאי להכיר לפני הפעלת הקומפיילר. הוא פועל באמצעות ניתוח סטטי, כך שמחרוזות שקיימות רק בזמן ריצה, כגון קודי שגיאה מ-API או שדות CMS, נשארות מחוץ להישג ידו. כמו כן, עליו להבדיל בין טקסט המוצג למשתמש לבין לוגיקת אפליקציה כגון `className="active"` או קוד סטטוס, מה שמצריך מעט הערות בבסיס קוד גדול. [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md) נמנעת משתיהן על ידי השארתכם בתהליך הבקרה.

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="אילו כלי עורך וסוכני בינה מלאכותית זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח `useIntlayer` לקובץ התוכן שמצהיר עליו, חילוץ תוכן מרכיב, והרצת build, fill, test, push ו-pull מלוח הפקודות (command palette) או מלשונית Intlayer ייעודית.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה מודעות בכל עורך התומך ב-LSP, עם מעבר להגדרה (go to definition), מציאת כל המופעים (find all references), תצוגה מקדימה בריחוף (hover) של ערך מתורגם, השלמה אוטומטית של מפתחות ושדות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום. הוא גם מפענח קריאות של `i18next`,‏ `react-i18next`,‏ `next-intl` ו-`use-intl`, מה שמסייע בזמן ההגירה.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer ל-Cursor,‏ VS Code,‏ Claude Desktop,‏ Claude Code ו-ChatGPT, כך שעוזר בינה מלאכותית עונה מתוך התיעוד העדכני במקום לנחש, ויכול להריץ פקודות כגון `intlayer fill` בעצמו.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: יכולות ממוקדות כגון `intlayer-config`,‏ `intlayer-cli` ו-`intlayer-content`, בתוספת יכולת לכל סביבת פיתוח, המלמדות סוכן בינה מלאכותית את מבנה הניתוב שלכם ואת סוגי צמתי התוכן.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות בקוד (hardcoded), עם כללים נוספים עבור מפתחות מילון סטטיים ותוכן שאינו בשימוש.

</Question>
<Question title="כיצד אוכל להשתמש בתוכן מתורגם ברכיב Vanilla JS?">

אתחלו את Intlayer בנקודת הכניסה שלכם כפי שמוצג בשלב 4, לאחר מכן קראו את התוכן באמצעות `useIntlayer` וכתבו אותו ל-DOM. אין כאן framework ואין DOM וירטואלי, לכן אתם מחליטים מתי לעדכן את הצמתים. שלב 8 מכסה רינדור תוכן Markdown ו-HTML.

</Question>
<Question title="האם Intlayer עובד עם שרת הפיתוח של Vite ו-hot reload?">

כן. תוסף ה-Vite `intlayer()` צופה בקובצי ה-`.content.ts` שלכם ובונה מחדש את המילונים המושפעים בעת שמירה, כך ששינויים מופיעים ללא צורך בהפעלה מחדש של שרת הפיתוח, והטיפוסים המיוצרים נוצרים מחדש באותו הזמן כך שההשלמה האוטומטית נשארת מסונכרנת.

</Question>
<Question title="כיצד להגדיר ניתוב מותאם לשפה?">

שלבים 9 ו-10 מכסים נתיבים מותאמים לשפה ושכתוב של כתובת ה-URL כאשר השפה משתנה. האפשרות `routing.mode` קובעת את מבנה ה-URL: `"prefix-no-default"` (ברירת המחדל, `/about` ו-`/fr/about`), `"prefix-all"`, `"no-prefix"` (מפוענח מקובץ cookie, מ-header או מדומיין) או `"search-params"` (`/about?locale=fr`). ראו את [מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [מדריך ההגדרות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Question>
<Question title="כיצד לתמוך בשפות הנכתבות מימין לשמאל כמו ערבית או עברית?">

שלב 11 מכסה זאת. הפונקציה `getHTMLTextDir` מחזירה `ltr`, `rtl` או `auto` עבור שפה נתונה, כך שתוכלו לקשור את `lang` ו-`dir` באלמנט השורש מהשפה הפעילה ולאפשר למאפיינים הלוגיים של ה-CSS שלכם לטפל בשאר.

</Question>
<Question title="כיצד לטפל במטא-נתוני SEO באפליקציית Vite המרונדרת בצד הלקוח?">

הגדירו את `lang` ו-`dir` באלמנט `html` מהשפה הפעילה, והפיקו חלופות `hreflang` עבור כל שפה שהוצהרה באמצעות `getMultilingualUrls`, כולל `x-default`. עבור דפים שחייבים להיסרק באופן אמין, העדיפו הגדרה של רינדור מוקדם (pre-rendered) או רינדור בצד השרת.

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
<Question title="האם אוכל לטעון רק את השפה שהמבקר זקוק לה?">

כן. שלב 12 מכסה טעינה עצלה של מילונים לכל שפה, כך שהמטען הראשוני נושא שפה אחת והאחרות נמשכות רק אם המבקר מחליף שפה. ראו [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md).

- [מילונים דינמיים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dynamic_dictionaries/index.md)

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
