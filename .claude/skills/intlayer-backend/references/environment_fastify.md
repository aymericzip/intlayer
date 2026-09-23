---
createdAt: 2025-12-30
updatedAt: 2026-08-29
title: "Fastify i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Fastify app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Add init command"
  - version: 7.6.0
    date: 2025-12-31
    changes: "Initial history"
author: aymericzip
---

# Translate your Fastify backend website using Intlayer | Internationalization (i18n)

`fastify-intlayer` is a powerful internationalization (i18n) plugin for Fastify applications, designed to make your backend services globally accessible by providing localized responses based on the client's preferences.

> See package [implementation on GitHub](https://github.com/aymericzip/intlayer/tree/main/packages/fastify-intlayer).

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: When an error occurs, displaying messages in the user's native language improves understanding and reduces frustration. This is especially useful for dynamic error messages that might be shown in front-end components like toasts or modals.
- **Retrieving Multilingual Content**: For applications pulling content from a database, internationalization ensures that you can serve this content in multiple languages. This is crucial for platforms like e-commerce sites or content management systems that need to display product descriptions, articles, and other content in the language preferred by the user.
- **Sending Multilingual Emails**: Whether it's transactional emails, marketing campaigns, or notifications, sending emails in the recipient’s language can significantly increase engagement and effectiveness.
- **Multilingual Push Notifications**: For mobile applications, sending push notifications in a user's preferred language can enhance interaction and retention. This personal touch can make notifications feel more relevant and actionable.
- **Other Communications**: Any form of communication from the backend, such as SMS messages, system alerts, or user interface updates, benefits from being in the user's language, ensuring clarity and enhancing the overall user experience.

By internationalizing the backend, your application not only respects cultural differences but also aligns better with global market needs, making it a key step in scaling your services worldwide.

## Getting Started

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-fastify-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-fastify-template) on GitHub.

### Installation

To begin using `fastify-intlayer`, install the package using npm:

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

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
```

### Setup

Configure the internationalization settings by creating an `intlayer.config.ts` in your project root:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Declare Your Content

Create and manage your content declarations to store translations:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Your content declarations can be defined anywhere in your application as soon as they are included into the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Fastify Application Setup

Setup your Fastify application to use `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Load internationalization plugin
await fastify.register(intlayer);

// Routes
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Compatibility

`fastify-intlayer` is fully compatible with:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md)>) for React applications
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md)>) for Next.js applications
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md)>) for Vite applications

It also works seamlessly with any internationalization solution across various environments, including browsers and API requests. You can customize the middleware to detect locale through headers or cookies:

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

By default, `fastify-intlayer` will interpret the `Accept-Language` header to determine the client's preferred language.

> For more information on configuration and advanced topics, visit our [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Configure TypeScript

`fastify-intlayer` leverages the robust capabilities of TypeScript to enhance the internationalization process. TypeScript's static typing ensures that every translation key is accounted for, reducing the risk of missing translations and improving maintainability.

Ensure the autogenerated types (by default at ./types/intlayer.d.ts) are included in your tsconfig.json file.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
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

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

## Frequently Asked Questions

<FAQ>

<Question title="What are the different solutions available to internationalize a Fastify backend?">

The generic option is `i18next` with `fastify-i18next` or a hand written hook, which loads JSON catalogs per namespace and stores the locale on the request. The alternative is `Intlayer` through `fastify-intlayer`, which registers the plugin for you, resolves the locale per request, and shares the same typed content as your frontend.

The reason to internationalize the backend at all is that a large part of the text a user reads never passes through the frontend: API error messages, transactional emails, push notifications, SMS and PDF exports. Those need the recipient's language, resolved per request rather than per session.

See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md).

</Question>
<Question title="How much does i18n add to my Fastify server bundle size?">

Very little. Dictionaries are compiled ahead of time and only the locales you declare are included, so there is no catalog loading at boot and no file reads on the request path. That matters most on serverless and edge deployments, where the bundle size drives cold start time. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md).

</Question>
<Question title="Can I migrate from `i18next` without rewriting my handlers?">

Yes, and there are two paths. You can migrate the content progressively with the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) expose the exact same API as `i18next`, but served by Intlayer dictionaries, so imports change and handler code does not.

</Question>
<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>
<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your source files, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

On the frontend side of the same project, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) goes further and generates the dictionaries at build time from your JSX, TSX, Vue or Svelte source, so the two halves of the app share one content layer with no keys maintained by hand.

</Question>
<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>
<Question title="How does Intlayer know which language to answer in?">

By default `fastify-intlayer` reads the `Accept-Language` header of the incoming request and picks the closest declared locale, falling back to your default locale. You can change the source with `routing.storage`, for example a custom header or a cookie set by your frontend, so the API answers in the language the user actually selected rather than the one their browser advertises. See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

</Question>
<Question title="Is the locale isolated per request?">

Yes. The plugin scopes the active locale to the request, so two concurrent requests in different languages never read each other's locale. That is what makes `t()` and `getIntlayer()` safe to call from a service without threading a locale argument through every function.

</Question>
<Question title="How do I send transactional emails in the recipient's language?">

Declare the email content in a content file like any other content, then resolve it with `getIntlayer` for the recipient's stored locale instead of the request locale. This matters for jobs and queues, where the language belongs to the user record and there is no incoming request to read a header from.

</Question>
<Question title="How do I localize API error messages?">

Wrap the message in `t()` at the point where the error is built. The active request locale resolves it, so the client receives a message it can display directly, and your frontend does not need a parallel catalog of error codes.

</Question>
<Question title="Does it work with the Fastify plugin lifecycle and encapsulation?">

Yes. `fastify-intlayer` registers as a standard Fastify plugin, so it follows the usual encapsulation rules. Register it at the root, or inside the scope that needs it, before the routes that read content.

</Question>
<Question title="How do I translate the backend content automatically with AI?">

Run `npx intlayer fill`, which fills missing translations with the LLM of your choice using your own provider and API key. Add `--git-diff` to translate only the content changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>
<Question title="Does Intlayer support plurals, gender and interpolated values on the server?">

Yes: [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md) for interpolated values, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md) for email bodies, and [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) for numbers, dates and currencies.

</Question>
<Question title="Do I get TypeScript autocompletion on the server?">

Yes. Intlayer generates the types of your dictionaries into `./types/intlayer.d.ts`, so a key that does not exist is a compile error rather than an empty string at runtime. Run `npx intlayer test` in CI to fail the build when a declared locale is missing content.

</Question>
<Question title="Can the frontend and the backend share the same content?">

Yes, and that is the usual setup. `fastify-intlayer` works alongside `react-intlayer`, `next-intlayer` and `vite-intlayer` on the same declared content, so a label used both in an API response and in a page is declared once. See [how Intlayer works](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/how_works_intlayer.md).

</Question>
<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 license, commercial use included. The hosted [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
