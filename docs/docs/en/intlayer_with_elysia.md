---
createdAt: 2026-08-23
updatedAt: 2026-08-24
title: "Elysia i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Elysia app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Elysia
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - elysia
applicationTemplate: https://github.com/aymericzip/intlayer-elysia-template
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Align the guide with the Elysia template (context typing, Bun setup, scripts)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "init Elysia plugin"
author: aymericzip
---

# Translate your Elysia backend website using Intlayer | Internationalization (i18n)

`elysia-intlayer` is a powerful internationalization (i18n) plugin for Elysia applications, designed to make your backend services globally accessible by providing localized responses based on the client's preferences.

> See package implementation on GitHub: https://github.com/aymericzip/intlayer/tree/main/packages/elysia-intlayer

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: When an error occurs, displaying messages in the user's native language improves understanding and reduces frustration. This is especially useful for dynamic error messages that might be shown in front-end components like toasts or modals.
- **Retrieving Multilingual Content**: For applications pulling content from a database, internationalization ensures that you can serve this content in multiple languages. This is crucial for platforms like e-commerce sites or content management systems that need to display product descriptions, articles, and other content in the language preferred by the user.
- **Sending Multilingual Emails**: Whether it's transactional emails, marketing campaigns, or notifications, sending emails in the recipient's language can significantly increase engagement and effectiveness.
- **Multilingual Push Notifications**: For mobile applications, sending push notifications in a user's preferred language can enhance interaction and retention. This personal touch can make notifications feel more relevant and actionable.
- **Other Communications**: Any form of communication from the backend, such as SMS messages, system alerts, or user interface updates, benefits from being in the user's language, ensuring clarity and enhancing the overall user experience.

By internationalizing the backend, your application not only respects cultural differences but also aligns better with global market needs, making it a key step in scaling your services worldwide.

## Getting Started

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-elysia-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-elysia-template) on GitHub.

### Installation

To begin using `elysia-intlayer`, install the package using your package manager:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> Elysia targets the **Bun** runtime. `elysia-intlayer` relies on `AsyncLocalStorage` (instead of the `cls-hooked` library used by the Node-based Intlayer plugins) precisely because Bun does not implement `async_hooks.createHook`.

### Setup

Configure the internationalization settings by creating an `intlayer.config.ts` in your project root:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    /**
     * Default locale used as a fallback if the requested locale is not found.
     */
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
      es: "Ejemplo de contenido devuelto en español",
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
        "es": "Ejemplo de contenido devuelto en español"
      }
    }
  }
}
```

> Your content declarations can be defined anywhere in your application as soon as they are included into the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

### Elysia Application Setup

Register the plugin with `.use(intlayer())`. It injects an `intlayer` object into every route context, exposing the negotiated locale and the translation helpers:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia()
  // Load the internationalization plugin
  .use(intlayer())
  // Routes
  .get("/", ({ intlayer }) => ({
    // Locale used for this request, `Accept-Language` negotiated or read from storage
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> The plugin registers its context through a **global** `derive`, which Elysia types as `Partial<{ intlayer: IntlayerContext }>`. The value is always present at runtime for routes registered after `.use(intlayer())`, so use the non-null assertion (`intlayer!.locale`) — or optional chaining — to satisfy TypeScript in `strict` mode.

The route context exposes:

| Property          | Description                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `locale`          | The locale to use for this request. `locale_storage` takes precedence over `locale_detected`. |
| `locale_storage`  | The locale explicitly set by the client through a cookie or a header. `undefined` if none.    |
| `locale_detected` | The locale negotiated from the `Accept-Language` header, falling back to `defaultLocale`.     |
| `defaultLocale`   | The locale configured as fallback in `intlayer.config.ts`.                                    |
| `t`               | Translates an inline locale map.                                                              |
| `getIntlayer`     | Reads a dictionary by key, defaulting to the request locale.                                  |
| `getDictionary`   | Reads an imported dictionary, defaulting to the request locale.                               |

The same helpers are also exported standalone. They resolve the current request through `AsyncLocalStorage`, so you can call them without destructuring the context:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Elysia } from "elysia";
import { intlayer, t, getDictionary, getIntlayer } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  .use(intlayer())
  .get("/t_example", () =>
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);
```

> The request context is released once the response is mapped, so the standalone helpers never resolve against an already terminated request. Called outside of a request handled by the plugin, they fall back to the configured default locale.

### Run Your Application

Add the Intlayer scripts to your `package.json`. `intlayer build` compiles your content declarations into the `.intlayer` directory and generates the TypeScript types:

```json fileName="package.json"
{
  "scripts": {
    "dev": "intlayer build && bun run --watch src/index.ts",
    "build": "intlayer build",
    "start": "bun run src/index.ts",
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Then start the server:

```bash
bun run dev
```

Test the locale negotiation with `Accept-Language`:

```bash
curl -H "Accept-Language: fr" http://localhost:3000/
# {"locale":"fr","greeting":"Bonjour","content":"Exemple de contenu renvoyé en français"}

curl -H "Accept-Language: es" http://localhost:3000/
# {"locale":"es","greeting":"Hola","content":"Ejemplo de contenido devuelto en español"}
```

> `intlayer build` is not strictly required before `bun run src/index.ts`: the plugin also prepares the dictionaries when the Elysia app boots. Running it upfront keeps the generated types in sync for your editor and avoids the build cost on the first request.

### Compatibility

`elysia-intlayer` is fully compatible with:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/index.md) for React applications
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md) for Next.js applications
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/vite-intlayer/index.md) for Vite applications

It also works seamlessly with any internationalization solution across various environments, including browsers and API requests.

By default, the plugin resolves the locale in this order:

1. The `INTLAYER_LOCALE` cookie.
2. The `x-intlayer-locale` header.
3. The `Accept-Language` header negotiation.

You can customize the cookie and header used for locale detection:

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

> For more information on configuration and advanced topics, visit our [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Configure TypeScript

`elysia-intlayer` leverages the robust capabilities of TypeScript to enhance the internationalization process. TypeScript's static typing ensures that every translation key is accounted for, reducing the risk of missing translations and improving maintainability.

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
