---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: t Function Documentation | adonis-intlayer
description: See how to use the t function for adonis-intlayer package
keywords:
  - t
  - translation
  - Intlayer
  - Internationalization
  - Documentation
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Initial documentation
---

# Documentation: `t` Function in `adonis-intlayer`

The `t` function in the `adonis-intlayer` package is the core utility for providing localized responses in your AdonisJS application. It simplifies internationalization (i18n) by dynamically selecting content based on the user's preferred language.

---

## Overview

The `t` function is used to define and retrieve translations for a given set of languages. It automatically determines the appropriate language to return based on the client's request settings, such as the `Accept-Language` header. If the preferred language is unavailable, it gracefully falls back to the default locale specified in your configuration.

---

## Key Features

- **Dynamic Localization**: Automatically selects the most appropriate translation for the client.
- **Fallback to Default Locale**: Falls back to a default locale if the client's preferred language isn't available, ensuring continuity in user experience.
- **Asynchronous Context**: Works seamlessly within the AdonisJS request lifecycle using Async Local Storage.
- **TypeScript Support**: Enforce type safety for your translations.

---

## Function Signature

```typescript
t(translations: Record<string, any>): any;
```

### Parameters

- `translations`: An object where the keys are locale codes (e.g., `en`, `fr`, `es`) and the values are the corresponding translated content.

### Returns

- The content representing the client's preferred language.

---

## Loading the Middleware

To ensure that the `t` function works correctly, you **must** register the `intlayer` middleware in your AdonisJS application.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Usage Examples

### Basic Example

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Usage in Controllers

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
      })
    );
  }
}
```

---

## Advanced Topics

### Fallback Mechanism

If a preferred locale is unavailable, the `t` function will fallback to the default locale defined in your `intlayer.config.ts`.

```typescript
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

### TypeScript Integration

The `t` function is type-safe when used with defined dictionaries. For more details, refer to the [TypeScript documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
