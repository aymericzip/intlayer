---
docName: package__express-intlayer__t
url: https://intlayer.org/doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: t Function Documentation | express-intlayer
description: See how to use the t function for express-intlayer package
keywords:
  - t
  - translation
  - Intlayer
  - Internationalization
  - Documentation
  - Express
  - JavaScript
  - React
---

# Documentation: `t` Function in `express-intlayer`

The `t` function in the `express-intlayer` package is the core utility for providing localised responses in your Express application. It simplifies internationalisation (i18n) by dynamically selecting content based on the user's preferred language.

---

## Overview

The `t` function is used to define and retrieve translations for a given set of languages. It automatically determines the appropriate language to return based on the client's request settings, such as the `Accept-Language` header. If the preferred language is unavailable, it gracefully falls back to the default locale specified in your configuration.

---

## Key Features

- **Dynamic Localisation**: Automatically selects the most appropriate translation for the client.
- **Fallback to Default Locale**: Falls back to a default locale if the client's preferred language isn't available, ensuring continuity in user experience.
- **Lightweight and Fast**: Designed for high-performance applications, ensuring minimal overhead.
- **Strict Mode Support**: Enforce strict adherence to declared locales for reliable behaviour.

---

## Function Signature

```typescript
t(translations: Record<string, string>): string;
```

### Parameters

- `translations`: An object where the keys are locale codes (e.g., `en`, `fr`, `es-MX`) and the values are the corresponding translated strings.

### Returns

- A string representing the content in the client's preferred language.

---

## Loading the Internationalisation Request Handler

To ensure that the internationalisation functionality provided by `express-intlayer` works correctly, you **must** load the internationalisation middleware at the beginning of your Express application. This enables the `t` function and ensures proper handling of locale detection and translation.

Place the `app.use(intlayer())` middleware **before any routes** in your application to ensure that all routes benefit from internationalisation:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Load internationalisation request handler
app.use(intlayer());

// Define your routes after loading the middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Load internationalisation request handler
app.use(intlayer());

// Define your routes after loading the middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Load internationalisation request handler
app.use(intlayer());

// Define your routes after loading the middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Why This is Required

- **Locale Detection**: The `intlayer` middleware processes incoming requests to detect the user's preferred locale based on headers, cookies, or other configured methods.
- **Translation Context**: Sets up the necessary context for the `t` function to operate correctly, ensuring that translations are returned in the correct language.
- **Error Prevention**: Without this middleware, using the `t` function will result in runtime errors because the necessary locale information won't be available.

---

## Usage Examples

### Basic Example

Serve localised content in different languages:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Client Requests:**

- A client with `Accept-Language: fr` will receive `Bienvenue!`.
- A client with `Accept-Language: es` will receive `¡Bienvenido!`.
- A client with `Accept-Language: de` will receive `Welcome!` (default locale).

### Handling Errors

Provide error messages in multiple languages:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Using Locale Variants

Specify translations for locale-specific variants:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Advanced Topics

### Fallback Mechanism

If a preferred locale is unavailable, the `t` function will fallback to the default locale defined in the configuration:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalisation: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalisation: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

For example:

- If `defaultLocale` is `Locales.CHINESE` and a client requests `Locales.DUTCH`, the returned translation will default to the `Locales.CHINESE` value.
- If `defaultLocale` is not defined, the `t` function will fallback to the `Locales.ENGLISH` value.

---

### Strict Mode Enforcement

Configure the `t` function to enforce strict adherence to declared locales:

| Mode        | Behaviour                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------- |
| `strict`    | All declared locales must have translations provided. Missing locales will throw errors.    |
| `inclusive` | Declared locales must have translations. Missing locales trigger warnings but are accepted. |
| `loose`     | Any existing locale is accepted, even if not declared.                                      |

Configuration Example:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Your existing configuration
  internationalisation: {
    // ... Your existing internationalisation configuration
    strictMode: "strict", // Enforce strict mode
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Your existing configuration
  internationalisation: {
    // ... Your existing internationalisation configuration
    strictMode: "strict", // Enforce strict mode
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Your existing configuration
  internationalisation: {
    // ... Your existing internationalisation configuration
    strictMode: "strict", // Enforce strict mode
  },
};

module.exports = config;
```

---

### TypeScript Integration

The `t` function is type-safe when used with TypeScript. Define a type-safe translations object:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Common Errors and Troubleshooting

| Issue                      | Cause                                   | Solution                                             |
| -------------------------- | --------------------------------------- | ---------------------------------------------------- |
| `t` function not working   | Middleware not loaded                   | Ensure `app.use(intlayer())` is added before routes. |
| Missing translations error | Strict mode enabled without all locales | Provide all required translations.                   |

---

## Tips for Effective Usage

1. **Centralise Translations**: Use a centralised module or JSON files for managing translations to improve maintainability.
2. **Validate Translations**: Ensure every language variant has a corresponding translation to prevent falling back unnecessarily.
3. **Combine with Frontend i18n**: Synchronise with frontend internationalisation for a seamless user experience across the app.
4. **Benchmark Performance**: Test your app's response times when adding translations to ensure minimal impact.

---

## Conclusion

The `t` function is a powerful tool for backend internationalisation. By using it effectively, you can create a more inclusive and user-friendly application for a global audience. For advanced usage and detailed configuration options, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).
