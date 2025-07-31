---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Package Documentation | express-intlayer
description: See how to use the express-intlayer package
keywords:
  - Intlayer
  - express-intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
---

# express-intlayer: JavaScript Package to internationalise (i18n) an Express.js application

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, Next.js, and Express.js.

**The `express-intlayer` package** allows you to internationalise your Express.js application. It provides middleware to detect the user's preferred locale, and returns the appropriate dictionary for the user.

## Why Internationalise Your Backend?

Internationalising your backend is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: When an error occurs, displaying messages in the user's native language improves understanding and reduces frustration. This is especially useful for dynamic error messages that might be shown in front-end components like toasts or modals.

- **Retrieving Multilingual Content**: For applications pulling content from a database, internationalisation ensures that you can serve this content in multiple languages. This is crucial for platforms like e-commerce sites or content management systems that need to display product descriptions, articles, and other content in the language preferred by the user.

- **Sending Multilingual Emails**: Whether it is transactional emails, marketing campaigns, or notifications, sending emails in the recipient’s language can significantly increase engagement and effectiveness.

- **Multilingual Push Notifications**: For mobile applications, sending push notifications in a user's preferred language can enhance interaction and retention. This personal touch can make notifications feel more relevant and actionable.

- **Other Communications**: Any form of communication from the backend, such as SMS messages, system alerts, or user interface updates, benefits from being in the user's language, ensuring clarity and enhancing the overall user experience.

By internationalising the backend, your application not only respects cultural differences but also aligns better with global market needs, making it a key step in scaling your services worldwide.

## Why integrate Intlayer?

- **Type-Safe Environment**: Utilise TypeScript to ensure all your content definitions are precise and error-free.

## Installation

Install the necessary package using your preferred package manager:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Configure Intlayer

Intlayer provides a configuration file to set up your project. Place this file in the root of your project.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

## Example of usage

Set up your Express application to use `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Load internationalisation request handler
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Start server
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Load internationalisation request handler
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Start server
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Load internationalisation request handler
app.use(intlayer());

// Routes
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Start server
app.listen(3000, () => console.log(`Listening on port 3000`));
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Compatibility

`express-intlayer` is fully compatible with:

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

By default, `express-intlayer` will interpret the `Accept-Language` header to determine the client's preferred language.

## Functions provided by `express-intlayer` package

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/express-intlayer/t.md)

## Doc History

- 5.5.10 - 2025-06-29: Init history
