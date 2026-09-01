---
createdAt: 2026-03-31
updatedAt: 2026-08-29
title: "Vanilla JS i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Vanilla JS app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
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
author: aymericzip
---

# Translate your Vanilla JS website using Intlayer | Internationalization (i18n)

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

# Initialize intlayer with config file
npx intlayer init --no-gitignore

# Build the dictionaries
npx intlayer build
```

```bash packageManager="pnpm"
# Generate a standalone bundle of intlayer and vanilla-intlayer
# This file will be imported in to your HTML file
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialize intlayer with config file
pnpm intlayer init --no-gitignore

# Build the dictionaries
pnpm intlayer build
```

```bash packageManager="yarn"
# Generate a standalone bundle of intlayer and vanilla-intlayer
# This file will be imported in to your HTML file
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialize intlayer config file, TypeScript if set up, env var
yarn intlayer init --no-gitignore

# Build the dictionaries
yarn intlayer build
```

```bash packageManager="bun"
# Generate a standalone bundle of intlayer and vanilla-intlayer
# This file will be imported in to your HTML file
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Initialize intlayer with config file
bun x intlayer init --no-gitignore

# Build the dictionaries
bun x intlayer build
```

- **intlayer**
  The core package that provides internationalization tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **vanilla-intlayer**
  The package that integrates Intlayer with plain JavaScript / TypeScript applications. It provides a pub/sub singleton (`IntlayerClient`) and callback-based helpers (`useIntlayer`, `useLocale`, etc.) so any part of your app can react to locale changes without depending on a UI framework.

> The `intlayer standalone` CLI's bundling export produces an optimized build by tree-shaking unused packages, locales, and non-essential logic (such as redirection or prefixes) specific to your configuration.

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

> Through this configuration file, you can set up localized URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Step>

<Step number={3} title="Import the bundle in your HTML">

Once you have generated the `intlayer.js` bundle, you can import it in your HTML file:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="en">
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

> Your content declarations can be defined anywhere in your application as soon as they are included in the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).
>
> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

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

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalize your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).

## Frequently Asked Questions

<FAQ>

<Question title="Can I use Intlayer without a bundler or a framework?">

Yes. That is what this guide covers. You import the `vanilla-intlayer` bundle directly in your HTML as step 3 shows, bootstrap it in your entry point, and read your content with `useIntlayer`. No Vite, no webpack and no build pipeline is required.

</Question>

<Question title="How much does i18n add to my page weight?">

Much less than a runtime catalog, because a page never downloads a language it does not render. Content is resolved from dictionaries compiled ahead of time, and lazy loading per locale keeps the other languages out of the initial payload until the visitor switches. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md), [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md).

</Question>

<Question title="Can I migrate from `i18next` without rewriting my scripts?">

Largely. Follow the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md) to move the content over. You can also migrate gradually: the [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your existing JSON catalogs as the source of truth and generates Intlayer dictionaries from them, so both layers stay in sync while you move scripts across one at a time.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your source files, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) does the same at build time on JSX, TSX, Vue and Svelte source, generating the dictionaries on every change so there are no keys to maintain by hand. It works by static analysis, so strings that only exist at runtime stay out of reach, and it needs a few annotations to tell user facing text apart from application logic.

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="What are the different solutions available to internationalize a plain JavaScript site?">

- **A hand written dictionary object**, usually one JSON file per language loaded with `fetch`: no dependency, but no typing, no plural rules, and nothing that tells you a translation is missing.
- **`i18next`** from a CDN: mature and framework agnostic, with a plugin ecosystem, but it adds a runtime and its own catalog loading.
- **`Intlayer`**: declared content with plural and gender rules, locale detection, right to left support and lazy loading per locale, plus a CLI that fills missing translations with AI and a visual editor for non developers.

See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md).

</Question>

<Question title="How do I read a translation and put it in the DOM?">

Call `useIntlayer` with your dictionary key and write the value into the node yourself, as step 6 shows. Because there is no framework, nothing re-renders on its own: you update the nodes when the locale changes, which step 7 covers.

</Question>

<Question title="How is the visitor's language detected?">

From the sources listed in `routing.storage`, typically a cookie first, then the `Accept-Language` header, falling back to your default locale. A language the visitor picks explicitly is persisted, so it survives the next visit. See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Question>

<Question title="How do I support right to left languages such as Arabic or Hebrew?">

Step 8 covers it. `getHTMLTextDir` returns `ltr`, `rtl` or `auto` for a locale, so you set `lang` and `dir` on the `html` element from the active locale and let your CSS logical properties do the rest.

</Question>

<Question title="Do visitors download every language?">

Not if you do not want them to. Step 9 covers lazy loading dictionaries per locale, so the page loads one language and fetches another only when the visitor switches. See [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md).

</Question>

<Question title="How do I translate the app automatically with AI?">

Run `npx intlayer fill`. It fills missing translations with the LLM of your choice, using your own provider and API key, and `--git-diff` limits the run to the content changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>

<Question title="Does Intlayer support plurals, gender and rich text?">

Yes: [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md) and [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) for numbers, dates and currencies.

</Question>

<Question title="How can translators edit the content without touching the code?">

Through the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md), which runs on your own infrastructure and lets anyone edit text in place on the running app, or the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), which externalizes content so it can change without a deployment.

</Question>

<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 license, commercial use included. The hosted CMS is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
