---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Translate your Nest backend (i18n)
description: Discover how to make your vite backend multilingual. Follow the documentation to internationalise (i18n) and translate it.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
---

# Getting Started internationalising (i18n) with Intlayer and NestJS

`express-intlayer` is a powerful internationalisation (i18n) middleware for Express applications, designed to make your backend services globally accessible by providing localised responses based on the client's preferences. Since NestJS is built on top of Express, you can seamlessly integrate `express-intlayer` into your NestJS applications to handle multilingual content effectively.

## Why Internationalise Your Backend?

Internationalising your backend is essential for serving a global audience effectively. It allows your application to deliver content and messages in the preferred language of each user. This capability enhances user experience and broadens your application's reach by making it more accessible and relevant to people from different linguistic backgrounds.

### Practical Use Cases

- **Displaying Backend Errors in User's Language**: When an error occurs, displaying messages in the user's native language improves understanding and reduces frustration. This is especially useful for dynamic error messages that might be shown in front-end components like toasts or modals.

- **Retrieving Multilingual Content**: For applications pulling content from a database, internationalisation ensures that you can serve this content in multiple languages. This is crucial for platforms like e-commerce sites or content management systems that need to display product descriptions, articles, and other content in the language preferred by the user.

- **Sending Multilingual Emails**: Whether it is transactional emails, marketing campaigns, or notifications, sending emails in the recipient’s language can significantly increase engagement and effectiveness.

- **Multilingual Push Notifications**: For mobile applications, sending push notifications in a user's preferred language can enhance interaction and retention. This personal touch can make notifications feel more relevant and actionable.

- **Other Communications**: Any form of communication from the backend, such as SMS messages, system alerts, or user interface updates, benefits from being in the user's language, ensuring clarity and enhancing the overall user experience.

By internationalising the backend, your application not only respects cultural differences but also aligns better with global market needs, making it a key step in scaling your services worldwide.

## Getting Started

### Create a new NestJS Project

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Installation

To begin using `express-intlayer`, install the package using npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Configure tsconfig.json

In order to use Intlayer with TypeScript, ensure your `tsconfig.json` is set up to support ES modules. You can do this by setting the `module` and `moduleResolution` options to `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... other options
  },
}
```

### Setup

Configure the internationalisation settings by creating an `intlayer.config.ts` in your project root:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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

### Declare Your Content

Create and manage your content declarations to store translations:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Your content declarations can be defined anywhere in your application as long as they are included in the `contentDir` directory (by default, `./src`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> For more details, refer to the [content declaration documentation](/doc/concept/content).

### Express Middleware Setup

Integrate the `express-intlayer` middleware into your NestJS application to handle internationalisation:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Apply to all routes
  }
}
```

### Use Translations in Your Services or Controllers

You can now use the `getIntlayer` function to access translations in your services or controllers:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### Compatibility

`express-intlayer` is fully compatible with:

- [`react-intlayer`](/doc/packages/react-intlayer) for React applications
- [`next-intlayer`](/doc/packages/next-intlayer) for Next.js applications
- [`vite-intlayer`](/doc/packages/vite-intlayer) for Vite applications

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

By default, `express-intlayer` will interpret the `Accept-Language` header to determine the client's preferred language.

> For more information on configuration and advanced topics, visit our [documentation](/doc/concept/configuration).

### Configure TypeScript

`express-intlayer` leverages the robust capabilities of TypeScript to enhance the internationalisation process. TypeScript's static typing ensures that every translation key is accounted for, reducing the risk of missing translations and improving maintainability.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Ensure the autogenerated types (by default at ./types/intlayer.d.ts) are included in your tsconfig.json file.

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  include: [
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

## Doc History

| Version | Date       | Changes     |
| ------- | ---------- | ----------- |
| 5.8.0   | 2025-09-09 | Initial doc |
