---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: How to translate your Fastify back end – i18n guide 2026
description: Discover how to make your Fastify back end multilingual. Follow the documentation to internationalise (i18n) and translate it.
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
  - version: 7.6.0
    date: 2025-12-31
    changes: Add init command
  - version: 7.6.0
    date: 2025-12-31
    changes: Init history
---

# Translate your Fastify back end site using Intlayer | Internationalisation (i18n)

`fastify-intlayer` is a powerful internationalisation (i18n) plugin for Fastify applications, designed to make your back end services globally accessible by providing localised responses based on the client's preferences.

### Practical Use Cases

- **Displaying back end errors in the user's language**: When an error occurs, displaying messages in the user's native language improves understanding and reduces frustration. This is especially useful for dynamic error messages that might be shown in front end components like toasts or modals.
- **Retrieving multilingual content**: For applications pulling content from a database, internationalisation ensures that you can serve this content in multiple languages. This is crucial for platforms such as e-commerce sites or content management systems that need to display product descriptions, articles, and other content in the language preferred by the user.
- **Sending multilingual emails**: Whether it's transactional emails, marketing campaigns, or notifications, sending emails in the recipient's language can significantly increase engagement and effectiveness.
- **Multilingual push notifications**: For mobile applications, sending push notifications in a user's preferred language can enhance interaction and retention. This personal touch can make notifications feel more relevant and actionable.
- **Other communications**: Any form of communication from the backend, such as SMS messages, system alerts, or user interface updates, benefits from being in the user's language, ensuring clarity and improving the overall user experience.

By internationalising the backend, your application not only respects cultural differences but also better aligns with global market needs, making it a key step in scaling your services worldwide.

## Getting Started

### Installation

To begin using `fastify-intlayer`, install the package using npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Setup

Configure the internationalisation settings by creating an `intlayer.config.ts` in your project root:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
```

### Declare Your Content

Create and manage your content declarations to store translations:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      "en-GB": "Example of returned content in English",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      "en-GB": "Example of returned content in English",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      "en-GB": "Example of returned content in English",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en-GB": "Example of returned content in English",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Your content declarations can be placed anywhere in your application provided they are included in the `contentDir` directory (by default, `./src`) and match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

### Fastify application setup

Set up your Fastify application to use `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Load internationalisation plugin
await fastify.register(intlayer);

// Routes
fastify.get("/t_example", async (_req, reply) => {
  return t({
    "en-GB": "Example of returned content in English",
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

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Load internationalisation plugin
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

// Start the server
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

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Start the server wrapper for async/await
const start = async () => {
  try {
    // Load internationalisation plugin
    await fastify.register(intlayer);

    // Routes
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        "en-GB": "Example of returned content in English",
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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/index.md) for React applications
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/index.md) for Next.js applications
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/vite-intlayer/index.md) for Vite applications

It also works seamlessly with any internationalisation solution across various environments, including browsers and API requests. You can customise the middleware to detect locale through headers or cookies:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Other configuration options
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Other configuration options
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Other configuration options
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

By default, `fastify-intlayer` will interpret the `Accept-Language` header to determine the client's preferred language.

> For more information on configuration and advanced topics, visit our [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

### Configure TypeScript

`fastify-intlayer` leverages the robust capabilities of TypeScript to enhance the internationalisation process. TypeScript's static typing ensures that every translation key is accounted for, reducing the risk of missing translations and improving maintainability.

Ensure the auto-generated types (by default at ./types/intlayer.d.ts) are included in your tsconfig.json file.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configuration
  "include": [
    // ... Your existing TypeScript configuration
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Auto-completion** for translation keys.
- **Real-time error detection** of missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

### Git Configuration

It is recommended to ignore files generated by Intlayer. This prevents them from being committed to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer

```
