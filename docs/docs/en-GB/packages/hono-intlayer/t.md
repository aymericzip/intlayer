---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t Function Documentation | hono-intlayer
description: See how to use the t function for hono-intlayer package
keywords:
  - t
  - translation
  - Intlayer
  - Internationalization
  - Documentation
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Documentation: `t` Function in `hono-intlayer`

The `t` function in the `hono-intlayer` package is the core utility for providing localized responses in your Hono application. It simplifies internationalization (i18n) by dynamically selecting content based on the user's preferred language.

---

## Overview

The `t` function is used to define and retrieve translations for a given set of languages. It automatically determines the appropriate language to return based on the client's request settings, such as the `Accept-Language` header. If the preferred language is unavailable, it gracefully falls back to the default locale specified in your configuration.

---

## Key Features

- **Dynamic Localization**: Automatically selects the most appropriate translation for the client.
- **Fallback to Default Locale**: Falls back to a default locale if the client's preferred language isn't available, ensuring continuity in user experience.
- **Lightweight and Fast**: Designed for high-performance applications, ensuring minimal overhead.
- **Strict Mode Support**: Enforce strict adherence to declared locales for reliable behavior.

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

## Loading the Internationalization Request Handler

To ensure that the internationalization functionality provided by `hono-intlayer` works correctly, you **must** load the internationalization middleware at the beginning of your Hono application. This enables the `t` function and ensures proper handling of locale detection and translation.

Place the `app.use("*", intlayer())` middleware **before any routes** in your application to ensure that all routes benefit from internationalization:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Load internationalization request handler
app.use("*", intlayer());

// Define your routes after loading the middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Load internationalization request handler
app.use("*", intlayer());

// Define your routes after loading the middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Load internationalization request handler
app.use("*", intlayer());

// Define your routes after loading the middleware
app.get("/", (c) => {
  return c.text(
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

Serve localized content in different languages:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (c) => {
  return c.text(
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
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

---

### Using Locale Variants

Specify translations for locale-specific variants:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
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
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Strict Mode Enforcement

Configure the `t` function to enforce strict adherence to declared locales:

| Mode        | Behavior                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------- |
| `strict`    | All declared locales must have translations provided. Missing locales will throw errors.    |
| `inclusive` | Declared locales must have translations. Missing locales trigger warnings but are accepted. |
| `loose`     | Any existing locale is accepted, even if not declared.                                      |

---

### TypeScript Integration

The `t` function is type-safe when used with TypeScript. Define a type-safe translations object:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Common Errors and Troubleshooting

| Issue                      | Cause                                   | Solution                                                  |
| -------------------------- | --------------------------------------- | --------------------------------------------------------- |
| `t` function not working   | Middleware not loaded                   | Ensure `app.use("*", intlayer())` is added before routes. |
| Missing translations error | Strict mode enabled without all locales | Provide all required translations.                        |

---

## Conclusion

The `t` function is a powerful tool for backend internationalization. By using it effectively, you can create a more inclusive and user-friendly application for a global audience. For advanced usage and detailed configuration options, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
