---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - How to translate an AdonisJS app in 2026
description: Discover how to make your AdonisJS backend multilingual. Follow the documentation to internationalise (i18n) and translate it.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Init history
---

# Translate your AdonisJS backend website using Intlayer | Internationalisation (i18n)

`adonis-intlayer` is a powerful internationalisation (i18n) package for AdonisJS applications, designed to make your backend services globally accessible by providing localised responses based on the client's preferences.

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: When an error occurs, displaying messages in the user's native language improves understanding and reduces frustration. This is especially useful for dynamic error messages that might be shown in front-end components like toasts or modals.

- **Retrieving Multilingual Content**: For applications pulling content from a database, internationalisation ensures that you can serve this content in multiple languages. This is crucial for platforms like e-commerce sites or content management systems that need to display product descriptions, articles, and other content in the language preferred by the user.

- **Sending Multilingual Emails**: Whether it's transactional emails, marketing campaigns, or notifications, sending emails in the recipient’s language can significantly increase engagement and effectiveness.

- **Multilingual Push Notifications**: For mobile applications, sending push notifications in a user's preferred language can enhance interaction and retention. This personal touch can make notifications feel more relevant and actionable.

- **Other Communications**: Any form of communication from the backend, such as SMS messages, system alerts, or user interface updates, benefits from being in the user's language, ensuring clarity and enhancing the overall user experience.

By internationalising the backend, your application not only respects cultural differences but also aligns better with global market needs, making it a key step in scaling your services worldwide.

## Getting Started

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-adonisjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-adonisjs-template) on GitHub.

### Installation

To begin using `adonis-intlayer`, install the package using npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Declare Your Content

Create and manage your content declarations to store translations:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      "en-GB": "Example of returned content in English (UK)",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      "en-GB": "Example of returned content in English (UK)",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      "en-GB": "Example of returned content in English (UK)",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "en-GB": "Example of returned content in English (UK)",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Your content declarations can be defined anywhere in your application as soon as they are included into the `contentDir` directory (by default, `./src` or `./app`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> For more details, refer to the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

### AdonisJS Application Setup

Setup your AdonisJS application to use `adonis-intlayer`.

#### Register the middleware

First, you need to register the `intlayer` middleware in your application.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Define your routes

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    "en-GB": "Example of returned content in English (UK)",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Functions

`adonis-intlayer` exports several functions to handle internationalisation in your application:

- `t(content, locale?)`: Basic translation function.
- `getIntlayer(key, locale?)`: Retrieve content by key from your dictionaries.
- `getDictionary(dictionary, locale?)`: Retrieve content from a specific dictionary object.
- `getLocale()`: Retrieve the current locale from the request context.

#### Use in Controllers

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        "en-GB": "Hello from controller (UK)",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

### Compatibility

`adonis-intlayer` is fully compatible with:

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

By default, `adonis-intlayer` will interpret the `Accept-Language` header to determine the client's preferred language.

> For more information on configuration and advanced topics, visit our [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

### Configure TypeScript

`adonis-intlayer` leverages the robust capabilities of TypeScript to enhance the internationalisation process. TypeScript's static typing ensures that every translation key is accounted for, reducing the risk of missing translations and improving maintainability.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/en-GB/doc/vs-code-extension).

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```
