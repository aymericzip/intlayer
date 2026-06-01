---
createdAt: 2026-03-31
updatedAt: 2026-05-31
title: Vanilla JS i18n - Complete guide to translate Vanilla JS
description: Best solution for bundle size, SEO, performances & maintainability. Make your Vanilla JS website multilingual in 2026, LLM translation, Agent Skills & MCP.
keywords:
  - Internationalisation
  - Documentation
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
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 8.4.10
    date: 2026-03-31
    changes: "Initial history"
---

# Translate your Vanilla JS website using Intlayer | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vanilla-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vanilla-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vanilla-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `i18next` or `i18n.js`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>
<Accordion header="Full Vanilla JS coverage">

Intlayer is optimized to work perfectly with Vanilla JavaScript by offering **framework-agnostic content management**, **TypeScript support**, and all the features needed for scaling internationalization (i18n).

</Accordion>
<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>
<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>
<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>
<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>
<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>
<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>
</AccordionGroup>

---

## Step-by-Step Guide to Set Up Intlayer in a Vanilla JS Application

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using npm:

```bash packageManager="npm"
# Generate a standalone bundle of intlayer and vanilla-intlayer
# This file will be imported in to your HTML file
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialise intlayer with config file
npx intlayer init --no-gitignore

# Build the dictionaries
npx intlayer build
```

```bash packageManager="pnpm"
# Generate a standalone bundle of intlayer and vanilla-intlayer
# This file will be imported in to your HTML file
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialise intlayer with config file
pnpm intlayer init --no-gitignore

# Build the dictionaries
pnpm intlayer build
```

```bash packageManager="yarn"
# Generate a standalone bundle of intlayer and vanilla-intlayer
# This file will be imported in to your HTML file
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialise intlayer config file, TypeScript if set up, env var
yarn intlayer init --no-gitignore

# Build the dictionaries
yarn intlayer build
```

```bash packageManager="bun"
# Generate a standalone bundle of intlayer and vanilla-intlayer
# This file will be imported in to your HTML file
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialise intlayer with config file
bun x intlayer init --no-gitignore

# Build the dictionaries
bun x intlayer build
```

- **intlayer**
  The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **vanilla-intlayer**
  The package that integrates Intlayer with plain JavaScript / TypeScript applications. It provides a pub/sub singleton (`IntlayerClient`) and callback-based helpers (`useIntlayer`, `useLocale`, etc.) so any part of your app can react to locale changes without depending on a UI framework.

> The `intlayer standalone` CLI's bundling export creates an optimised build through tree-shaking for unused packages, locales, and non-essential logic (like redirects or prefixes) specific to your configuration.

</Step>

<Step number={2} title="Configuration of your project">

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Through this configuration file, you can set up localised URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Step>

<Step number={3} title="Import the bundle in your HTML">

Once you have generated the `intlayer.js` bundle, you can import it in your HTML file:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="en-GB">
  <head>
    <meta charset="UTF-8" />

    <!-- Import the bundle -->
    <script src="./intlayer.js" defer></script>
    <!-- Import your main script -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

The bundle exposes `Intlayer` and `VanillaIntlayer` as global objects on the `window`.

</Step>

<Step number={4} title="Bootstrap Intlayer in your entry point">

In your `src/main.js`, call `installIntlayer()` **before** any content is rendered so that the global locale singleton is ready.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Must be called before rendering any i18n content.
installIntlayer();
```

If you also want to use the markdown renderer, call `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

</Step>

<Step number={5} title="Declare Your Content">

Create and manage your content declarations to store translations:

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
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic en el logotipo de Vite para obtener más información",
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
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic en el logotipo de Vite para obtener más información"
      }
    }
  }
}
```

> Your content declarations can be defined anywhere in your application as soon as they are included in the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

</Step>

<Step number={6} title="Use Intlayer in Your JavaScript">

The `window.VanillaIntlayer` object provides API helpers: `useIntlayer(key, locale?)` returns the translated content for a given key.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Get the initial content for the current locale.
// Chain .onChange() to be notified whenever the locale changes.
const content = useIntlayer("app").onChange((newContent) => {
  // Re-render or patch only the affected DOM nodes
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Initial render
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Access leaf values as strings by wrapping them in `String()`, which calls the node's `toString()` method and returns the translated text.
>
> When you need the value for a native HTML attribute (e.g. `alt`, `aria-label`), use `.value` directly:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

</Step>

<Step number={7} title="Change the language of your content" isOptional={true}>

To change the language of your content, use the `setLocale` function exposed by `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Language");

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

  // Keep the dropdown in sync when locale changes from elsewhere
  return subscribe((newLocale) => render(newLocale));
}
```

</Step>

<Step number={8} title="Switch the HTML Language and Direction Attributes" isOptional={true}>

Update the `<html>` tag's `lang` and `dir` attributes to match the current locale for accessibility and SEO.

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

<Step number={9} title="Lazy-load dictionaries per locale" isOptional={true}>

If you want to lazy-load dictionaries per locale, you can use `useDictionaryDynamic`. This is useful if you don't want to bundle all translations in the initial `intlayer.js` file.

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

> Note: `useDictionaryDynamic` requires the dictionaries to be available as separate ESM files. This approach is typically used if you have a web server serving the dictionaries.
> </Step>

</Steps>

### Configure TypeScript

Ensure your TypeScript configuration includes the autogenerated types.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
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

---

### Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or externalise your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).
