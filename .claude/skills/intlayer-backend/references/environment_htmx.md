---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "htmx i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) htmx app. Translate with AI agents and optimize bundle size, SEO and performances."
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

# Translate your htmx application using Intlayer | Internationalization (i18n)

htmx renders no content of its own. Every label a visitor reads is HTML your server produced, and every swap is a separate HTTP request. Internationalizing an htmx app is therefore a server concern: the locale has to be resolved on each request, and each fragment has to be rendered in that locale.

Intlayer covers this through its backend integrations, which detect the locale per request and expose your declared content to the handler that builds the HTML.

## Table of Contents

<TOC/>

## The three rules of i18n in an htmx app

<AccordionGroup>
<Accordion header="The locale must be resolved on every request, not just the first">

A single page can trigger dozens of swaps. Each one is a fresh request with no memory of the page that issued it. If the locale lives in a variable set during the initial render, every fragment after it falls back to the default language.

The Intlayer middleware resolves the locale from the request itself, so a fragment served at minute ten answers in the same language as the page served at minute zero.

</Accordion>
<Accordion header="The locale must travel with the request">

Two carriers work with htmx. A cookie (`INTLAYER_LOCALE`) is sent by the browser automatically on every request, including htmx ones. A header (`x-intlayer-locale`) can be attached to htmx requests with the `hx-headers` attribute. Both are read by default.

</Accordion>
<Accordion header="Swapped HTML is still HTML">

A translated value interpolated into a fragment is markup. Escape it, exactly as you would any other dynamic value, so a translation containing `<` cannot break the document it is swapped into.

</Accordion>
</AccordionGroup>

## Step-by-Step Guide

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-htmx-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-htmx-template) on GitHub.

<Steps>
<Step number={1} title="Install Dependencies">

Install `intlayer` plus the integration for your server.

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

> Express and Fastify read the locale cookie through their own cookie parsers, so those have to be installed alongside. Hono and Elysia parse cookies natively.

htmx itself is a single script tag, added in step 4.

</Step>
<Step number={2} title="Configuration of your project">

Create an `intlayer.config.ts` at your project root:

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

> For the full list of options, see the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>
<Step number={3} title="Declare Your Content">

Declare every label the server will render, including the ones that only ever appear inside a fragment:

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

> Content declarations can live anywhere under `contentDir` (by default `./src`) and match `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`. See the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

</Step>
<Step number={4} title="Register the Intlayer middleware">

The middleware resolves the locale of each request and exposes it to your handlers.

<Tabs group="backend" defaultTab="express">
  <Tab label="Express" value="express">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import cookieParser from "cookie-parser";
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// The cookie parser has to run first: `express-intlayer` reads the locale
// cookie through `req.cookies`.
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(intlayer());
```

The resolved locale is on `res.locals.locale`.

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

The resolved locale is on `req.intlayer.locale`.

  </Tab>
  <Tab label="Hono" value="hono">

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm"]}
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());
```

The resolved locale is `c.get("locale")`.

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

By default the locale is taken from the `INTLAYER_LOCALE` cookie, then the `x-intlayer-locale` header, then `Accept-Language` negotiation.

</Step>
<Step number={5} title="Render fragments with the request locale">

Write your fragment renderers as pure functions of a locale, and pass the locale the middleware resolved. Passing it explicitly keeps a fragment tied to the request that asked for it, whichever server you are on.

```typescript fileName="src/views.ts" codeFormat={["typescript", "esm"]}
import { currency, getIntlayer, type Locale } from "intlayer";

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes a translated value so it cannot break out of the markup. */
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

Serve it from a route:

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

The same fragment now answers in French for a visitor whose cookie says `fr`, and in Arabic for one whose cookie says `ar`, with no change to the calling markup.

</Step>
<Step number={6} title="Serve the first page">

Render the `<body>` on its own, so the locale switcher in step 7 can swap it whole, then wrap it in the document that loads htmx:

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

`getHTMLTextDir` returns `ltr`, `rtl` or `auto` for the locale, which is what makes Arabic and Hebrew lay out correctly.

</Step>
<Step number={7} title="Switch the language">

Switching language is a request like any other. The server stores the choice in the cookie the middleware reads, then returns the page re-rendered in the new locale.

Render the switcher as a `select` that posts itself and swaps the whole `<body>`, so the static labels around your fragments change too:

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

> `getLocaleName(availableLocale, locale)` writes each language in the language currently displayed. Pass no second argument to write each one in its own language instead.

Handle the post by validating the value, setting the cookie, and returning the new body:

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

> `isDeclaredLocale` narrows an arbitrary string to one of your configured locales, so an unexpected value never reaches your renderers.

</Step>
<Step number={8} title="Keep lang and dir in sync after a swap" isOptional={true}>

A swap can replace the `<body>`, never the `<html>` around it. Render `lang` and `dir` on the swapped body and copy them back onto the root element once, from the head:

```html fileName="src/views.ts"
<script>
  document.addEventListener("htmx:afterSwap", () => {
    document.documentElement.lang = document.body.lang;
    document.documentElement.dir = document.body.dir;
  });
</script>
```

Without this, a switch to Arabic renders right to left inside the body while the document still advertises the previous language to assistive technology and to crawlers.

</Step>
<Step number={9} title="Send the locale as a header instead of a cookie" isOptional={true}>

If a cookie does not suit you, attach the locale to every htmx request with `hx-headers` on an ancestor element. Descendants inherit it:

```html
<body hx-headers='{"x-intlayer-locale": "fr"}'>
  ...
</body>
```

The middleware reads `x-intlayer-locale` by default. You can rename both carriers in your configuration:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Other configuration options
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

### Configure TypeScript

Include the autogenerated types so an undeclared key is a compile error rather than an empty string at runtime.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Git Configuration

It is recommended to ignore the files generated by Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

### Go Further

To go further, you can externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), so translators change copy without a deployment.

## Frequently Asked Questions

<FAQ>

<Question title="Why does my swapped fragment come back in the wrong language?">

Because the fragment request carried no locale. htmx requests are independent of the page that issued them, so the locale has to travel on each one, through the `INTLAYER_LOCALE` cookie or an `x-intlayer-locale` header set with `hx-headers`. Check that the cookie parser runs before the Intlayer middleware on Express and Fastify, otherwise the cookie is never read and every request falls back to `Accept-Language`.

</Question>
<Question title="Should I pass the locale to `getIntlayer` or rely on the request context?">

Pass it. The integrations expose the resolved locale (`res.locals.locale`, `req.intlayer.locale`, `c.get("locale")`, `intlayer!.locale`), and handing it to `getIntlayer` makes each renderer a pure function of a locale. That is easier to test, and it keeps your fragment renderers portable if you change server.

</Question>
<Question title="Do I need a client side i18n library alongside htmx?">

No. Everything a visitor sees is produced by the server, so there is nothing to translate in the browser. That is also why the page weight cost of i18n in an htmx app is close to zero: no catalog is ever shipped to the client.

</Question>
<Question title="How do I localize the URL as well, for SEO?">

Serve your pages under a locale prefix (`/fr/cart`) and read the locale from the path in your route handler, rather than from the cookie, for the full page render. Fragments can keep using the cookie or the header. See [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) for the routing options and [custom URL rewrites](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

</Question>
<Question title="How do I handle right to left languages?">

`getHTMLTextDir(locale)` returns `ltr`, `rtl` or `auto`. Set it on the document for the initial render, and re-apply it after a swap as step 8 shows. Use CSS logical properties (`margin-inline-start` rather than `margin-left`) so your layout follows.

</Question>
<Question title="Do I have to escape translated values?">

Yes, for anything you interpolate into a template string, exactly as for any other dynamic value. Content coming from the CMS or from a translator is not markup you control. Step 5 shows a minimal escaper.

</Question>
<Question title="Can the same content serve my API responses too?">

Yes. The backend integrations expose `t()` and `getIntlayer()` to any handler, so an error message shown in a toast and a label rendered into a fragment come from the same declared content. See the [Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md), [Fastify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_fastify.md), [Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_hono.md) and [Elysia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_elysia.md) guides.

</Question>
<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your source files, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

</Question>
<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>
<Question title="How do I translate the app automatically with AI?">

Run `npx intlayer fill`, which fills missing translations with the LLM of your choice using your own provider and API key. Add `--git-diff` to translate only the content changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>
<Question title="Does Intlayer support gender, conditions and interpolated values?">

Yes: [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md), conditions, [enumerations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/enumeration.md), [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md) for interpolated values, and [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) for numbers, dates and currencies.

</Question>
<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a key to the content file that declares it, extract content from a file, and run build, fill, test, push and pull from the command palette.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, hover previews of a translated value, autocompletion of keys, and a warning when a key is not declared anywhere.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings.

</Question>
<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 license, commercial use included. The hosted [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
