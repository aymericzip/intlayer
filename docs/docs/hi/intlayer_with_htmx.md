---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - अपने ऐप्लिकेशन को अनुवाद करने के लिए संपूर्ण गाइड"
description: "अब और i18next नहीं। 2026 की बहुभाषी (i18n) htmx ऐप्लिकेशन बनाने की गाइड। AI agents के साथ अनुवाद करें और bundle size, SEO और प्रदर्शन को अनुकूलित करें।"
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - htmx
  - Hypermedia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - htmx
history:
  - version: 9.4.1
    date: 2026-08-29
    changes: "Initial history"
author: aymericzip
---

# Intlayer का उपयोग करके अपने htmx ऐप्लिकेशन का अनुवाद करें | अंतर्राष्ट्रीयकरण (i18n)

htmx अपनी कोई सामग्री render नहीं करता है। हर लेबल जो कोई आगंतुक पढ़ता है, वह HTML है जो आपका server तैयार करता है, और हर swap एक अलग HTTP request है। इसलिए, htmx ऐप को internationalize करना एक server concern है: locale को हर request पर resolve करना होता है, और हर fragment को उस locale में render करना होता है।

Intlayer इसे अपने backend integrations के माध्यम से कवर करता है, जो हर request पर locale को detect करते हैं और आपकी घोषित content को उस handler के लिए expose करते हैं जो HTML बनाता है।

## विषय सूची

<TOC/>

## htmx ऐप में i18n के तीन नियम

<AccordionGroup>
<Accordion header="locale को हर request पर resolve करना होता है, सिर्फ पहले request पर नहीं">

एक भी पृष्ठ दर्जनों swaps को ट्रिगर कर सकता है। प्रत्येक एक ताज़ी request है जिसे उस पृष्ठ की कोई स्मृति नहीं है जो इसे जारी करता है। यदि locale प्रारंभिक render के दौरान सेट किए गए variable में रहता है, तो इसके बाद का प्रत्येक fragment डिफ़ॉल्ट भाषा में वापस आता है।

Intlayer middleware request से ही locale को resolve करता है, इसलिए मिनट दस पर दिया गया एक fragment उसी भाषा में उत्तर देता है जैसे मिनट शून्य पर दिया गया पृष्ठ।

</Accordion>

<Accordion header="locale को request के साथ travel करना चाहिए">

htmx के साथ दो carriers काम करते हैं। एक cookie (`INTLAYER_LOCALE`) को browser द्वारा स्वचालित रूप से हर request पर भेजा जाता है, जिसमें htmx भी शामिल हैं। एक header (`x-intlayer-locale`) को htmx requests के साथ `hx-headers` attribute के साथ attach किया जा सकता है। दोनों को डिफ़ॉल्ट रूप से पढ़ा जाता है।

</Accordion>

<Accordion header="स्वैप किया गया HTML अभी भी HTML है">

एक अनुवादित मान जो एक fragment में प्रक्षेपित किया गया है, markup है। इसे escape करें, बिल्कुल वैसे ही जैसे आप किसी अन्य dynamic value करेंगे, ताकि एक अनुवाद जिसमें `<` है, वह document को तोड़ न सके जिसमें इसे स्वैप किया जा रहा है।

</Accordion>
</AccordionGroup>

---

## Step-by-Step Guide

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer का उपयोग करके अपने application को internationalize कैसे करें"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

[एप्लिकेशन टेम्पलेट](https://github.com/aymericzip/intlayer-htmx-template) को GitHub पर देखें।

<Steps>

<Step number={1} title="निर्भरताएं स्थापित करें">

`intlayer` प्लस अपने सर्वर के लिए इंटीग्रेशन स्थापित करें।

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

> Express और Fastify अपने स्वयं के cookie parsers के माध्यम से locale cookie को पढ़ते हैं, इसलिए उन्हें साथ में install करना होगा। Hono और Elysia नेटिवली cookies को parse करते हैं।

htmx स्वयं एक एकल script tag है, जो step 4 में जोड़ा जाता है।

</Step>

<Step number={2} title="अपनी project का Configuration">

अपनी project root पर एक `intlayer.config.ts` बनाएं:

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

> पूर्ण विकल्पों की सूची के लिए, [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Step>

<Step number={3} title="अपनी सामग्री घोषित करें">

सभी लेबल घोषित करें जो सर्वर रेंडर करेगा, जिनमें वे भी शामिल हैं जो केवल एक fragment के अंदर दिखाई देते हैं:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    pageTitle: "Intlayer + htmx",

    localeLabel: t({
      hi: "भाषा",
      en: "Language",
      fr: "Langue",
      es: "Idioma",
      ar: "اللغة",
    }),

    cartSummary: insert(
      t({
        hi: "आपकी कार्ट में आइटम: {{count}}",
        en: "Items in your cart: {{count}}",
        fr: "Articles dans votre panier : {{count}}",
        es: "Artículos en tu carrito: {{count}}",
        ar: "المنتجات في سلتك: {{count}}",
      })
    ),

    addItem: t({
      hi: "एक आइटम जोड़ें",
      en: "Add an item",
      fr: "Ajouter un article",
      es: "Añadir un artículo",
      ar: "أضف منتجًا",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Content declarations `contentDir` के अंतर्गत किसी भी स्थान पर रह सकते हैं (डिफ़ॉल्ट रूप से `./src`) और `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}` से मेल खाते हैं। [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

</Step>

<Step number={4} title="Intlayer middleware को रजिस्टर करें">

middleware प्रत्येक request की locale को resolve करता है और इसे आपके handlers में expose करता है।

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// cookie parser को पहले चलना होगा: `express-intlayer` locale को
// `req.cookies` के माध्यम से पढ़ता है।
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

resolve की गई locale `res.locals.locale` पर है।

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

समाधानित locale `req.intlayer.locale` पर है।

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

समाधानित locale `c.get("locale")` है।

  </Tab>
  <Tab label="Elysia" value="elysia">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer());
```

The resolved locale is `intlayer!.locale` on the route context.

  </Tab>
</Tabs>

डिफ़ॉल्ट रूप से locale को `INTLAYER_LOCALE` cookie से लिया जाता है, फिर `x-intlayer-locale` header से, फिर `Accept-Language` negotiation से।

</Step>

<Step number={5} title="रिक्वेस्ट locale के साथ fragments को render करें">

अपने fragment renderers को एक locale के pure functions के रूप में लिखें, और middleware द्वारा resolve किए गए locale को पास करें। इसे explicitly पास करने से एक fragment उस request से जुड़ा रहता है जिसने इसे मांगा था, आप किसी भी server पर हों।

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** मार्कअप से बाहर न निकलने के लिए अनुवादित मान को एस्केप करता है। */
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

इसे एक route से serve करें:

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
app.post("/cart/items", (req, res) => {
  // itemCount को request body से प्राप्त करें, डिफ़ॉल्ट 0 है, फिर 1 जोड़ें
  const itemCount = Number(req.body?.itemCount ?? 0) + 1;

  // HTML प्रकार सेट करें और renderCart का परिणाम भेजें
  res.type("html").send(renderCart(res.locals.locale, itemCount));
});
```

  </Tab>
  <Tab label="Fastify" value="fastify">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
fastify.post("/cart/items", async (req, reply) => {
  // itemCount को request body से प्राप्त करें, डिफ़ॉल्ट 0 है, फिर 1 जोड़ें
  const itemCount =
    Number((req.body as { itemCount?: string })?.itemCount ?? 0) + 1;

  // text/html content-type के साथ renderCart का परिणाम भेजें
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

एक ही फ्रैगमेंट अब फ्रांसीसी में उत्तर देता है जिस विज़िटर का कुकी `fr` कहता है, और अरबी में जिसका कुकी `ar` कहता है, कॉलिंग मार्कअप में कोई बदलाव नहीं।

</Step>

<Step number={6} title="पहले पृष्ठ को सर्व करें">

`<body>` को अपने आप को रेंडर करें, ताकि चरण 7 में लोकेल स्विचर इसे पूरी तरह से स्वैप कर सके, फिर इसे उस दस्तावेज़ में लपेटें जो htmx लोड करता है:

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

`getHTMLTextDir` locale के लिए `ltr`, `rtl` या `auto` return करता है, जो अरबी और हिब्रू को सही तरीके से लेआउट करने के लिए आवश्यक है।

</Step>

<Step number={7} title="भाषा स्विच करें">

भाषा स्विच करना किसी अन्य request जैसे ही है। सर्वर middleware जो पढ़ता है उस cookie में चुनाव को स्टोर करता है, फिर नए locale में फिर से render किए गए पृष्ठ को return करता है।

`<select>` को रेंडर करें जो स्वयं को पोस्ट करे और पूरे `<body>` को स्वैप करे, ताकि आपके फ्रैगमेंट्स के चारों ओर स्थिर लेबल भी बदल जाएं:

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { getIntlayer, getLocaleName, type Locale, locales } from "intlayer";

const renderLocaleSwitcher = (locale: Locale): string => {
  // वर्तमान locale के लिए content प्राप्त करें
  const content = getIntlayer("app", locale);

  // सभी उपलब्ध locales के लिए विकल्प तैयार करें
  const options = locales
    .map(
      (availableLocale: Locale) =>
        `<option value="${availableLocale}"${availableLocale === locale ? " selected" : ""}>${escapeHtml(getLocaleName(availableLocale, locale))}</option>`
    )
    .join("");

  // locale switcher form को HTML के रूप में रिटर्न करें
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

> `getLocaleName(availableLocale, locale)` प्रत्येक भाषा को वर्तमान में प्रदर्शित भाषा में लिखता है। इसके बजाय प्रत्येक को अपनी भाषा में लिखने के लिए कोई दूसरा argument पास न करें।

post को handle करें value को validate करके, cookie सेट करके, और नया body return करके:

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

  // जांचें कि क्या locale घोषित है
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
  // अनुरोध बॉडी को पार्स करें
  const body = await c.req.parseBody();
  // अनुरोधित locale को स्ट्रिंग में कनवर्ट करें
  const requestedLocale = String(body["locale"]);

  // जांचें कि क्या locale घोषित है
  if (!isDeclaredLocale(requestedLocale)) {
    return c.text("Unknown locale", 400);
  }

  // INTLAYER_LOCALE कुकी सेट करें
  setCookie(c, "INTLAYER_LOCALE", requestedLocale, {
    sameSite: "Lax",
    path: "/",
  });
  // HTML रेंडर करके भेजें
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

> `isDeclaredLocale` आपकी कॉन्फ़िगर की गई locales में से एक को एक आर्बिट्रेरी string को narrow करता है, इसलिए एक अप्रत्याशित value कभी भी आपके renderers तक नहीं पहुंचता है।

</Step>

<Step number={8} title="swap के बाद lang और dir को सिंक में रखें" isOptional={true}>

एक swap `<body>` को replace कर सकता है, कभी भी इसके चारों ओर `<html>` को नहीं। Swapped body पर `lang` और `dir` को render करें और उन्हें head से एक बार root element पर वापस कॉपी करें:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

इसके बिना, अरबी में switch करने से body के अंदर दाएं से बाएं render होता है जबकि document अभी भी पिछली भाषा को assistive technology और crawlers को advertise करता है।

</Step>

<Step number={9} title="Cookie की जगह header के रूप में locale भेजें" isOptional={true}>

यदि कुकी आपके लिए उपयुक्त नहीं है, तो `hx-headers` के साथ एक ancestor element पर हर htmx request में locale को attach करें। Descendants इसे inherit करते हैं:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

Middleware डिफ़ॉल्ट रूप से `x-intlayer-locale` को पढ़ता है। आप अपने configuration में दोनों carriers को rename कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// अपने configuration के लिए constant
const config: IntlayerConfig = {
  // ... अन्य configuration विकल्प
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

### TypeScript को Configure करें

ऑटोजेनरेटेड टाइप्स को शामिल करें ताकि एक अघोषित कुंजी रनटाइम पर खाली स्ट्रिंग के बजाय एक compile error हो।

```json5 fileName="tsconfig.json"
{
  // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
  "include": [
    // ... आपके मौजूदा TypeScript कॉन्फ़िगरेशन
    ".intlayer/**/*.ts", // ऑटो-जेनरेटेड टाइप्स शामिल करें
  ],
}
```

### Git कॉन्फ़िगरेशन

Intlayer द्वारा जेनरेट की गई फाइलों को अनदेखा करना अनुशंसित है:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जेनरेट की गई फाइलों को अनदेखा करें
.intlayer
```

### VS Code Extension

Intlayer के साथ अपने development experience को बेहतर बनाने के लिए, आप official **Intlayer VS Code Extension** को install कर सकते हैं।

[VS Code Marketplace से Install करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

यह extension निम्नलिखित प्रदान करता है:

- **Autocompletion** अनुवाद keys के लिए।
- **Real-time error detection** लापता अनुवादों के लिए।
- **Inline previews** अनुवादित content का।
- **Quick actions** आसानी से अनुवाद बनाने और अपडेट करने के लिए।

Extension का उपयोग कैसे करें इसके बारे में अधिक विवरण के लिए, [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension) देखें।

---

### आगे बढ़ें

आगे बढ़ने के लिए, आप अपने content को [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) का उपयोग करके externalize कर सकते हैं, इसलिए अनुवादक deployment के बिना copy बदल सकते हैं।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="मेरा swapped fragment गलत भाषा में वापस क्यों आता है?">

क्योंकि फ्रैगमेंट रिक्वेस्ट में कोई लोकेल नहीं था। htmx रिक्वेस्ट उन पेज से स्वतंत्र हैं जिन्होंने उन्हें जारी किया, इसलिए लोकेल को प्रत्येक पर travel करना पड़ता है, `INTLAYER_LOCALE` cookie या `hx-headers` के साथ सेट किए गए `x-intlayer-locale` हेडर के माध्यम से। जांचें कि Express और Fastify पर Intlayer middleware से पहले cookie parser चलता है, अन्यथा cookie कभी नहीं पढ़ी जाती है और हर रिक्वेस्ट `Accept-Language` पर fallback हो जाती है।

</Question>

<Question title="क्या मुझे लोकेल को `getIntlayer` में पास करना चाहिए या रिक्वेस्ट context पर निर्भर करना चाहिए?">

इसे पास करें। integrations resolved locale को expose करते हैं (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), और इसे `getIntlayer` को hand करना प्रत्येक renderer को एक locale का pure function बनाता है। यह test करना आसान है, और यह आपके fragment renderers को portable रखता है यदि आप server बदलते हैं।

</Question>

<Question title="क्या मुझे htmx के साथ एक client side i18n library की आवश्यकता है?">

नहीं। सब कुछ जो एक visitor देखता है server द्वारा produced होता है, इसलिए browser में translate करने के लिए कुछ नहीं है। यह भी है कि क्यों एक htmx app में i18n की page weight cost लगभग zero है: कोई भी catalog कभी client को shipped नहीं होता है।

</Question>

<Question title="मैं SEO के लिए URL को भी कैसे localize करूं?">

अपने पृष्ठों को locale prefix के तहत परोसें (`/fr/cart`) और अपने route handler में path से locale को पढ़ें, बजाय cookie से, पूर्ण पृष्ठ render के लिए। Fragments cookie या header का उपयोग करते रह सकते हैं। Routing options के लिए [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) और [custom URL rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/custom_url_rewrites.md) देखें।

</Question>

<Question title="मैं दाएं से बाएं भाषाओं को कैसे संभालूं?">

`getHTMLTextDir(locale)` `ltr`, `rtl` या `auto` return करता है। इसे document पर initial render के लिए सेट करें, और swap के बाद इसे फिर से लागू करें जैसा कि step 8 दिखाता है। CSS logical properties का उपयोग करें (`margin-inline-start` बजाय `margin-left` के) ताकि आपका layout follow करे।

</Question>

<Question title="क्या मुझे अनुवादित मानों को एस्केप करना है?">

हां, किसी भी चीज़ के लिए जो आप एक template string में interpolate करते हैं, बिल्कुल किसी भी अन्य dynamic value की तरह। CMS से या translator से आने वाली content markup नहीं है जिसे आप नियंत्रित करते हैं। Step 5 एक minimal escaper दिखाता है।

</Question>

<Question title="क्या वही content मेरे API responses को भी serve कर सकता है?">

हाँ। backend integrations `t()` और `getIntlayer()` को किसी भी handler में expose करते हैं, इसलिए एक toast में दिखाया गया error message और एक fragment में rendered label एक ही declared content से आते हैं। [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_hono.md) और [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_elysia.md) guides देखें।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="मैं ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं, जो आपकी पसंद के LLM का उपयोग करके अपने स्वयं के प्रदाता और API कुंजी के साथ लापता अनुवाद भरता है। `--git-diff` जोड़ें ताकि केवल शाखा पर बदली गई सामग्री का अनुवाद किया जाए। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

</Question>

<Question title="क्या Intlayer gender, conditions और interpolated values को सपोर्ट करता है?">

हाँ: [लिंग-आधारित सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender.md), शर्तें, [enumerations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration.md), [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md) interpolated values के लिए, और [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/formatters.md) संख्याओं, तारीखों और मुद्राओं के लिए।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच parts, सभी optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: एक key से उस content file तक जाएं जो इसे घोषित करती है, एक file से content निकालें, और command palette से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: किसी भी editor में जो LSP बोलता है, go to definition, translated value के hover previews, keys की autocompletion, और एक warning के साथ जब एक key कहीं भी घोषित नहीं है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Intlayer documentation और CLI को Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT को expose करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: focused skills जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` hardcoded strings को flag करता है।

</Question>

<Question title="क्या Intlayer मुक्त और open source है?">

हां, Apache 2.0 license के तहत, commercial use सहित। hosted [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) एक optional paid service है जिसे [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>
