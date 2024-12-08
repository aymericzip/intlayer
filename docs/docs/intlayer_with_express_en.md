# Getting Started internationalizing (i18n) with Intlayer and Express

`express-intlayer` is a powerful internationalization (i18n) middleware for Express applications, designed to make your backend services globally accessible by providing localized responses based on the client's preferences.

## Why Internationalize Your Backend?

Internationalizing your backend is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: When an error occurs, displaying messages in the user's native language improves understanding and reduces frustration. This is especially useful for dynamic error messages that might be shown in front-end components like toasts or modals.

- **Retrieving Multilingual Content**: For applications pulling content from a database, internationalization ensures that you can serve this content in multiple languages. This is crucial for platforms like e-commerce sites or content management systems that need to display product descriptions, articles, and other content in the language preferred by the user.

- **Sending Multilingual Emails**: Whether it's transactional emails, marketing campaigns, or notifications, sending emails in the recipient’s language can significantly increase engagement and effectiveness.

- **Multilingual Push Notifications**: For mobile applications, sending push notifications in a user's preferred language can enhance interaction and retention. This personal touch can make notifications feel more relevant and actionable.

- **Other Communications**: Any form of communication from the backend, such as SMS messages, system alerts, or user interface updates, benefits from being in the user's language, ensuring clarity and enhancing the overall user experience.

By internationalizing the backend, your application not only respects cultural differences but also aligns better with global market needs, making it a key step in scaling your services worldwide.

## Getting Started

### Installation

To begin using `express-intlayer`, install the package using npm:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### Setup

Configure the internationalization settings by creating an `intlayer.config.ts` in your project root:

```typescript
// intlayer.config.ts
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

### Express Application Setup

Setup your Express application to use `express-intlayer`:

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Load internationalization request handler
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

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Example of returned error content in English",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de contenido de error devuelto en español (México)",
    })
  );
});

// Start server
app.listen(3000, () => {
  console.info(`Listening on port 3000`);
});
```

### Compatibility

`express-intlayer` is fully compatible with:

- `react-intlayer` for React applications
- `next-intlayer` for Next.js applications

It also works seamlessly with any internationalization solution across various environments, including browsers and API requests. You can customize the middleware to detect locale through headers or cookies:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // Other configuration options
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

By default, `express-intlayer` will interpret the `Accept-Language` header to determine the client's preferred language.

> For more information on configuration and advanced topics, visit our [documentation](https://intlayer.org/doc/concept/configuration).

## Powered by TypeScript

`express-intlayer` leverages the robust capabilities of TypeScript to enhance the internationalization process. TypeScript's static typing ensures that every translation key is accounted for, reducing the risk of missing translations and improving maintainability.

> Ensure the generated types (by default at ./types/intlayer.d.ts) are included in your tsconfig.json file.
