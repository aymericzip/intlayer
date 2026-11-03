---
createdAt: 2026-08-29
updatedAt: 2026-11-03
priority: 9
title: "htmx i18n - מדריך מלא לתרגום האפליקציה שלך"
description: "הגדירו את Intlayer עם htmx: רנדרו מקטעי (fragments) של HTML מתורגמים בשרת, זהו את השפה לכל בקשה והחליפו שפות ללא צורך ב-SPA."
keywords:
  - בינאום
  - תיעוד
  - Intlayer
  - htmx
  - Hypermedia
  - JavaScript
  - צד שרת
slugs:
  - doc
  - environment
  - htmx
history:
  - version: 9.4.1
    date: 2026-08-29
    changes: "היסטוריה ראשונית"
author: aymericzip
---

# תרגום אפליקציית htmx באמצעות Intlayer

htmx אינו מרנדר תוכן משל עצמו. כל תווית שגולש קורא היא HTML שהשרת שלכם ייצר, וכל החלפה (swap) היא בקשת HTTP נפרדת. לכן, בינאום אפליקציית htmx הוא משימה של צד השרת: יש לפענח את השפה (locale) בכל בקשה, ויש לרנדר כל מקטע (fragment) באותה שפה.

Intlayer מטפל בכך באמצעות האינטגרציות שלו לצד-השרת, אשר מזהות את השפה לכל בקשה וחושפות את התוכן המוצהר שלכם בפני ה-handler שבונה את ה-HTML.

## תוכן עניינים

<TOC/>

## שלושת חוקי ה-i18n באפליקציית htmx

<AccordionGroup>
<Accordion header="יש לפענח את השפה בכל בקשה ובקשה, לא רק בראשונה">

דף יחיד יכול להפעיל עשרות החלפות (swaps). כל אחת מהן היא בקשה חדשה ללא זיכרון של הדף שהנפיק אותה. אם השפה מאוחסנת במשתנה שנקבע במהלך הרינדור הראשוני, כל מקטע (fragment) שלאחריו יחזור לשפת ברירת המחדל.

ה-middleware של Intlayer מפענח את השפה מתוך הבקשה עצמה, כך שמקטע שמוגש בדקה העשירית יענה באותה שפה כמו הדף שהוגש בדקה הראשונה.

</Accordion>
<Accordion header="השפה חייבת לעבור יחד עם הבקשה">

שני נשאים עובדים עם htmx: עוגייה (`INTLAYER_LOCALE`) נשלחת על ידי הדפדפן אוטומטית בכל בקשה, כולל בקשות htmx. כותרת (`x-intlayer-locale`) ניתנת להצמדה לבקשות htmx באמצעות המאפיין `hx-headers`. שתי האפשרויות נקראות כברירת מחדל.

</Accordion>
<Accordion header="HTML שמוחלף הוא עדיין HTML">

ערך מתורגם שמוטמע לתוך מקטע הוא קוד markup. בצעו לו escape (קידוד תווים מיוחדים), בדיוק כפי שהייתם עושים לכל ערך דינמי אחר, כך שתרגום המכיל `<` לא ישבור את המסמך שלתוכו הוא מוחלף.

</Accordion>
</AccordionGroup>

## מדריך שלב אחר שלב

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

ראו [תבנית אפליקציה](https://github.com/aymericzip/intlayer-htmx-template) ב-GitHub.

<Steps>
<Step number={1} title="התקנת תלויות">

התקינו את `intlayer` יחד עם האינטגרציה עבור השרת שלכם.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```bash packageManager="npm"
npm install intlayer express-intlayer cookie-parser
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer cookie-parser
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer cookie-parser
```

```bash packageManager="bun"
bun add intlayer express-intlayer cookie-parser
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```bash packageManager="npm"
npm install intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer @fastify/cookie @fastify/formbody
```

  </Tab>
  <Tab label="Hono" value="hono">

```bash packageManager="npm"
npm install intlayer hono-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash
bun add intlayer elysia-intlayer
```

  </Tab>
</Tabs>

> Express ו-Fastify קוראות את עוגיית השפה באמצעות מפענחי העוגיות שלהן, ולכן יש להתקין אותם לצידן. Hono ו-Elysia מפענחות עוגיות באופן טבעי.

htmx עצמה היא תגית סקריפט בודדת, שמתווספת בשלב 4.

</Step>
<Step number={2} title="הגדרת תצורת הפרויקט שלכם">

צרו קובץ `intlayer.config.ts` בתיקיית השורש של הפרויקט שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> לרשימת האפשרויות המלאה, עיינו ב[תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md).

- [תיעוד התצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)

</Step>
<Step number={3} title="הצהרת התוכן שלכם">

הצהירו על כל תווית שהשרת ירנדר, כולל אלו שמופיעות אך ורק בתוך מקטע (fragment):

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> הצהרות תוכן יכולות להימצא בכל מקום תחת `contentDir` (כברירת מחדל `./src`) ולהתאים לסיומת `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. ראו את [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md).

- [תיעוד הצהרת התוכן](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/content_file.md)

</Step>
<Step number={4} title="רישום ה-Middleware של Intlayer">

ה-middleware מפענח את השפה של כל בקשה וחושף אותה ל-handlers שלכם.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// מפענח העוגיות חייב לפעול קודם: `express-intlayer` קורא את עוגיית השפה
// דרך `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

השפה שפוענחה זמינה ב-`res.locals.locale`.

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookie from "@fastify/cookie";
import formbody from "@fastify/formbody";
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

await fastify.register(cookie);
await fastify.register(formbody);
await fastify.register(intlayer);
```

השפה שפוענחה זמינה ב-`req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

השפה שפוענחה זמינה ב-`c.get("locale")`.

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

השפה שפוענחה זמינה ב-`intlayer!.locale` בהקשר הנתיב.

  </Tab>
</Tabs>

כברירת מחדל, השפה נלקחת מעוגיית `INTLAYER_LOCALE`, לאחר מכן מכותרת `x-intlayer-locale`, ולבסוף ממשא ומתן דרך `Accept-Language`.

</Step>
<Step number={5} title="רינדור מקטעים (fragments) עם שפת הבקשה">

כתבו את פונקציות הרינדור של המקטעים שלכם כפונקציות טהורות של שפה (locale), והעבירו את השפה שה-middleware פענח. העברתה במפורש שומרת על המקטע קשור לבקשה שביקשה אותו, ללא תלות בסוג השרת שלכם.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** מבצע escape לערך מתורגם כדי שלא יוכל לפרוץ מתוך קוד ה-HTML. */
const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (character) => HTML_ENTITIES[character] ?? character
  );

export const renderCart = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<section id="cart">
  <p>${escapeHtml(String(content.cartSummary({ count: itemCount })))}</p>
  <p>${escapeHtml(currency(itemCount * 12.5, { locale, currency: "EUR" }))}</p>
  <button
    hx-post="/cart/items"
    hx-vals='{"itemCount": ${itemCount}}'
    hx-target="#cart"
    hx-swap="outerHTML"
  >${escapeHtml(String(content.addItem))}</button>
</section>`;
};
```

הגישו אותו מתוך נתיב:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  return reply
    .type("text/html")
    .send(renderCart(req.intlayer.locale, itemCount));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", async (c) => {
  const body = await c.req.parseBody();
  const itemCount = Number(body["itemCount"] ?? 0) + 1;

  return c.html(renderCart(c.get("locale"), itemCount));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", ({ body, intlayer }) => {
  const itemCount =
    Number((body as { itemCount?: string })?.itemCount ?? 0) + 1;

  return new Response(renderCart(intlayer!.locale, itemCount), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

אותו מקטע יענה כעת בצרפתית עבור גולש שהעוגייה שלו מכילה `fr`, ובערבית עבור מי שהעוגייה שלו מכילה `ar`, ללא כל שינוי בקוד הקורא.

</Step>
<Step number={6} title="הגשת הדף הראשון">

רנדרו את ה-`<body>` בנפרד, כדי שבורר השפות בשלב 7 יוכל להחליף אותו במלואו, ולאחר מכן עטפו אותו במסמך שטוען את htmx:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir, getIntlayer, type Locale } from "intlayer";

export const renderBody = (locale: Locale, itemCount: number): string => {
  const content = getIntlayer("app", locale);

  return `<body lang="${locale}" dir="${getHTMLTextDir(locale)}">
  <main>
    <h1>${escapeHtml(String(content.pageTitle))}</h1>
    ${renderLocaleSwitcher(locale)}
    ${renderCart(locale, itemCount)}
  </main>
</body>`;
};

export const renderPage = (locale: Locale, itemCount: number): string =>
  `<!doctype html>
<html lang="${locale}" dir="${getHTMLTextDir(locale)}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(String(getIntlayer("app", locale).pageTitle))}</title>
  <script src="https://unpkg.com/htmx.org@2.0.4"></script>
</head>
${renderBody(locale, itemCount)}
</html>`;
```

`getHTMLTextDir` מחזירה `ltr`, `rtl` או `auto` עבור השפה, מה שמאפשר לערבית ולעברית להסתדר בכיווניות הנכונה.

</Step>
<Step number={7} title="החלפת השפה">

החלפת שפה היא בקשה כמו כל בקשה אחרת. השרת שומר את הבחירה בעוגייה שה-middleware קורא, ולאחר מכן מחזיר את הדף מרונדר מחדש בשפה החדשה.

רנדרו את הבורר בתור `select` שמבצע post לעצמו ומחליף את כל ה-`<body>`, כך שגם התוויות הסטטיות סביב המקטעים שלכם ישתנו:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  const content = getIntlayer("app", locale);

  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? " selected" : ""}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join("");

  return `<form>
  <label for="locale">${escapeHtml(String(content.localeLabel))}</label>
  <select
    id="locale"
    name="locale"
    hx-post="/locale"
    hx-trigger="change"
    hx-target="body"
    hx-swap="outerHTML"
  >${options}</select>
</form>`;
};
```

> `getLocaleName(availableLocale, locale)` כותבת כל שפה בשפה המוצגת כעת. אל תעבירו ארגומנט שני אם ברצונכם להציג כל שפה בשמה המקורי.

טפלו בבקשת ה-post על ידי אימות הערך, הגדרת העוגייה והחזרת גוף המסמך החדש:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", (req, res) => {
  const requestedLocale = String(req.body?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    res.status(400).send("Unknown locale");
    return;
  }

  res.cookie("INTLAYER_LOCALE", requestedLocale, {
    sameSite: "lax",
    path: "/",
  });
  res.type("html").send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

fastify.post("/locale", async (req, reply) => {
  const requestedLocale = String((req.body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return reply.status(400).send("Unknown locale");
  }

  return reply
    .setCookie("INTLAYER_LOCALE", requestedLocale, {
      sameSite: "lax",
      path: "/",
    })
    .type("text/html")
    .send(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { setCookie } from "hono/cookie";
import { isDeclaredLocale } from "intlayer";

app.post("/locale", async (c) => {
  const body = await c.req.parseBody();
  const requestedLocale = String(body["locale"]);

  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  return c.html(renderBody(requestedLocale, 0));
});
```

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { isDeclaredLocale } from "intlayer";

app.post("/locale", ({ body, cookie, status }) => {
  const requestedLocale = String((body as { locale?: string })?.locale);

  if (!isDeclaredLocale(requestedLocale)) {
    return status(400, "Unknown locale");
  }

  cookie["INTLAYER_LOCALE"]!.set({
    value: requestedLocale,
    sameSite: "lax",
    path: "/",
  });

  return new Response(renderBody(requestedLocale, 0), {
    headers: { "content-type": "text/html" },
  });
});
```

  </Tab>
</Tabs>

> `isDeclaredLocale` מצמצמת מחרוזת שרירותית לאחת מהשפות שהוגדרו אצלכם, כך שערך לא צפוי לעולם לא יגיע לפונקציות הרינדור.

</Step>
<Step number={8} title="שמירה על סנכרון של lang ו-dir לאחר החלפה (swap)" isOptional={true}>

פעולת swap יכולה להחליף את ה-`<body>`, אך לעולם לא את ה-`<html>` שעוטף אותו. רנדרו את `lang` ו-`dir` על ה-body המוחלף והעתיקו אותם בחזרה לרכיב השורש פעם אחת, מתוך ה-head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

ללא שלב זה, מעבר לשפה הנכתבת מימין לשמאל (כמו עברית או ערבית) ירונדר מימין לשמאל בתוך גוף הדף, בעוד המסמך כולו עדיין יצהיר על השפה הקודמת בפני טכנולוגיות מסייעות ומנועי חיפוש.

</Step>
<Step number={9} title="שליחת השפה ככותרת (header) במקום עוגייה" isOptional={true}>

אם עוגייה אינה מתאימה לכם, הצמידו את השפה לכל בקשת htmx באמצעות `hx-headers` על גבי אלמנט אב. כל האלמנטים הצאצאים יירשו זאת:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

ה-middleware קורא את `x-intlayer-locale` כברירת מחדל. תוכלו לשנות את שמות שני הנשאים בתצורה שלכם:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... אפשרויות תצורה נוספות
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

</Step>

</Steps>

### הגדרת TypeScript

כללו את הטיפוסים שנוצרו אוטומטית כדי שמפתח שאינו מוצהר יהיה שגיאת קומפילציה במקום מחרוזת ריקה בזמן ריצה.

```json5 fileName="tsconfig.json"
{
  // ... תצורות ה-TypeScript הקיימות שלכם
  "include": [
    // ... תצורות ה-TypeScript הקיימות שלכם
    ".intlayer/**/*.ts", // הכללת הטיפוסים שנוצרו אוטומטית
  ],
}
```

### הגדרת Git

מומלץ להתעלם מהקבצים שנוצרים על ידי Intlayer:

```plaintext fileName=".gitignore"
# התעלמות מקבצים שנוצרו על ידי Intlayer
.intlayer
```

### תוסף ל-VS Code

כדי לשפר את חוויית הפיתוח שלכם עם Intlayer, תוכלו להתקין את **התוסף הרשמי של Intlayer ל-VS Code**.

- [התקנה מ-VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

תוסף זה מספק:

- **השלמה אוטומטית (Autocompletion)** עבור מפתחות תרגום.
- **זיהוי שגיאות בזמן אמת** עבור תרגומים חסרים.
- **תצוגה מקדימה מוטבעת (Inline previews)** של תוכן מתורגם.
- **פעולות מהירות (Quick actions)** ליצירה ועדכון קלים של תרגומים.

לפרטים נוספים על אופן השימוש בתוסף, עיינו ב[תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md).

- [תיעוד התוסף של Intlayer ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)

### הרחבה נוספת

להרחבה נוספת, תוכלו להוציא את התוכן שלכם החוצה באמצעות ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md), כך שמתרגמים יוכלו לעדכן טקסטים ללא צורך בפריסה מחודשת (deployment).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)

## שאלות נפוצות

<FAQ>

<Question title="מדוע המקטע (fragment) המוחלף חוזר בשפה הלא נכונה?">

מכיוון שבקשת המקטע לא כללה הגדרת שפה. בקשות htmx אינן תלויות בדף שהנפיק אותן, ולכן השפה חייבת לעבור בכל אחת מהן, דרך עוגיית `INTLAYER_LOCALE` או כותרת `x-intlayer-locale` המוגדרת באמצעות `hx-headers`. ודאו שמפענח העוגיות פועל לפני ה-middleware של Intlayer ב-Express וב-Fastify, אחרת העוגייה לא תיקרא לעולם וכל בקשה תחזור ל-`Accept-Language`.

</Question>
<Question title="האם כדאי להעביר את השפה ל-`getIntlayer` או להסתמך על הקשר הבקשה?">

העבירו אותה. האינטגרציות חושפות את השפה שפוענחה (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), והעברתה ל-`getIntlayer` הופכת כל פונקציית רינדור לפונקציה טהורה של שפה. קל יותר לבדוק זאת בטסטים, וזה שומר על פונקציות הרינדור שלכם ניידות אם תחליטו להחליף שרת.

</Question>
<Question title="האם דרושה ספריית i18n בצד הלקוח לצד htmx?">

לא. כל מה שהגולש רואה מיוצר על ידי השרת, כך שאין מה לתרגם בדפדפן. זו גם הסיבה שתוספת המשקל לדף בעקבות i18n באפליקציית htmx היא אפסית: שום קטלוג תרגומים לא נשלח ללקוח.

</Question>
<Question title="כיצד ניתן לבצע לוקליזציה גם לכתובת ה-URL, עבור SEO?">

הגישו את הדפים שלכם תחת קידומת שפה (לדוגמה `/he/cart` או `/fr/cart`) וקראו את השפה מתוך הנתיב ב-route handler שלכם, ולא מתוך העוגייה, עבור רינדור הדף המלא. מקטעים (fragments) יכולים להמשיך להשתמש בעוגייה או בכותרת. ראו [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md) עבור אפשרויות ניתוב ו[שכתוב כתובות URL מותאם אישית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/custom_url_rewrites.md).

- [תצורה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/configuration.md)
- [שכתוב כתובות URL מותאם אישית](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/custom_url_rewrites.md)

</Question>
<Question title="כיצד מטפלים בשפות הנכתבות מימין לשמאל (RTL)?">

`getHTMLTextDir(locale)` מחזירה `ltr`, `rtl` או `auto`. הגדירו אותה במסמך עבור הרינדור הראשוני, והחילו אותה מחדש לאחר החלפה (swap) כפי שמוצג בשלב 8. השתמשו במאפיינים לוגיים של CSS (כגון `margin-inline-start` במקום `margin-left`) כדי שהעיצוב יתאים את עצמו אוטומטית.

</Question>
<Question title="האם עליי לבצע escape לערכים מתורגמים?">

כן, עבור כל מה שאתם מטמיעים במחרוזת תבנית (template string), בדיוק כמו עבור כל ערך דינמי אחר. תוכן שמגיע ממערכת ה-CMS או ממתרגם אינו קוד HTML שבשליטתכם. שלב 5 מציג פונקציית escape מינימלית.

</Question>
<Question title="האם אותו התוכן יכול לשרת גם את תגובות ה-API שלי?">

כן. האינטגרציות לצד-השרת חושפות את `t()` ואת `getIntlayer()` לכל handler, כך שהודעת שגיאה המוצגת ב-toast ותווית המרונדרת לתוך מקטע מגיעות מאותו תוכן מוצהר. ראו את המדריכים עבור [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_hono.md) ו-[Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_elysia.md).

- [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_express.md)
- [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_fastify.md)
- [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_hono.md)
- [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_elysia.md)

</Question>
<Question title="האם עליי להעביר את התוכן שלי מפתח אחר מפתח?">

לא. הריצו `npx intlayer extract` ו-Intlayer יקרא את קובצי המקור שלכם, ישלוף את המחרוזות המוצגות למשתמש ויכתוב קובץ `.content` לצד כל קובץ מקור, כך שתוכלו לסקור diff במקום להעתיק מחרוזות לקטלוג אחת אחת. ראו את [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md).

- [פקודת extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/extract.md)

</Question>
<Question title="האם אוכל לשמור על קובצי תרגום ה-JSON הקיימים שלי?">

כן. [תוסף סנכרון ה-JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md) שומר על קובצי ה-`/messages/{locale}/{namespace}.json` כמקור האמת ומייצר מהם מילוני Intlayer בשני הכיוונים. [תוסף סנכרון ה-PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md) עושה את אותו הדבר עבור קטלוגי gettext, ו[קבצים לפי שפה (per locale files)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md) מאפשרים לפצל תוכן לפי שפה במקום לקבץ את כל השפות בקובץ אחד.

- [תוסף סנכרון JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-json.md)
- [תוסף סנכרון PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/plugins/sync-po.md)
- [קבצים לפי שפה](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/per_locale_file.md)

</Question>
<Question title="כיצד מתרגמים את האפליקציה באופן אוטומטי באמצעות AI?">

הריצו `npx intlayer fill`, אשר ממלא תרגומים חסרים בעזרת מודל ה-LLM לבחירתכם, תוך שימוש בספק ובמפתח ה-API שלכם. הוסיפו את הדגל `--git-diff` כדי לתרגם רק את התוכן שהשתנה בענף הנוכחי. ראו את [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md) ו[אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md).

- [פקודת fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/cli/fill.md)
- [אינטגרציית CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/CI_CD.md)

</Question>
<Question title="האם Intlayer תומך במגדר, תנאים וערכים מוטמעים?">

כן: [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md), תנאים, [ספירות (enumerations)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/enumeration.md), [הטמעות (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md) עבור ערכים משתנים, ו[מעצבים (formatters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md) עבור מספרים, תאריכים ומטבעות.

- [תוכן מבוסס מגדר](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/gender.md)
- [ספירות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/enumeration.md)
- [הטמעות](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/dictionary/insertion.md)
- [מעצבים](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/formatters.md)

</Question>
<Question title="אילו כלי עריכה וסוכני AI זמינים?">

חמישה כלים, כולם אופציונליים:

- **[תוסף ל-VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/vs_code_extension.md)**: קפיצה ממפתח אל קובץ התוכן שמצהיר עליו, חילוץ תוכן מקובץ, והרצת build, fill, test, push ו-pull מלוח הפקודות.
- **[שרת LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/lsp.md)**: אותה רמת מודעות בכל עורך שתומך ב-LSP, עם מעבר להגדרה (go to definition), תצוגה מקדימה בריחוף עכבר של ערך מתורגם, השלמה אוטומטית של מפתחות, ואזהרה כאשר מפתח אינו מוצהר בשום מקום.
- **[שרת MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/mcp_server.md)**: חושף את התיעוד וה-CLI של Intlayer עבור Cursor, VS Code, Claude Desktop, Claude Code ו-ChatGPT.
- **[כישורי סוכנים (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/agent_skills.md)**: כישורים ממוקדים כגון `intlayer-config`, `intlayer-cli` ו-`intlayer-content`.
- **[תוסף ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/eslint.md)**: הכלל `no-raw-text` מסמן מחרוזות מקודדות (hardcoded).

</Question>
<Question title="האם Intlayer חינמי ובקוד פתוח?">

כן, תחת רישיון Apache 2.0, כולל שימוש מסחרי. מערכת ה-[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md) המאוחסנת היא שירות אופציונלי בתשלום שניתן גם [לארח עצמאית (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_CMS.md)
- [אירוח עצמי](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/self_hosting.md)

</Question>

</FAQ>
