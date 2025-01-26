# Documentation: `t` Function in `next-intlayer`

The `t` function in the `next-intlayer` package is a fundamental tool for inline internationalization within your Next.js application. It allows you to define translations directly within your components, making it simple to display localized content based on the current locale.

---

## Overview

The `t` function is used to provide translations for different locales directly in your components. By passing an object containing translations for each supported locale, `t` returns the appropriate translation based on the current locale context in your Next.js application.

---

## Key Features

- **Inline Translations**: Ideal for quick, inline text that doesn't require a separate content declaration.
- **Automatic Locale Selection**: Returns the translation corresponding to the current locale automatically.
- **TypeScript Support**: Provides type safety and autocompletion when used with TypeScript.
- **Easy Integration**: Works seamlessly within both client and server components in Next.js.

---

## Function Signature

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parameters

- `translations`: An object where keys are locale codes (e.g., `en`, `fr`, `es`) and values are the corresponding translated strings.

### Returns

- A string representing the translated content for the current locale.

---

## Usage Examples

### Using `t` in a Client Component

Ensure you include the `'use client';` directive at the top of your component file when using `t` in a client-side component.

```tsx codeFormat="typescript"
"use client";

import type { FC } from "react";
import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer";

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer");

const ClientComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es le contenido d un ejemplo de componente cliente",
    })}
  </p>
);
```

### Using `t` in a Server Component

```tsx codeFormat="typescript"
import type { FC } from "react";
import { t } from "next-intlayer/server";

export const ServerComponentExample: FC = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="esm"
import { t } from "next-intlayer/server";

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

```javascript codeFormat="commonjs"
const { t } = require("next-intlayer/server");

const ServerComponentExample = () => (
  <p>
    {t({
      en: "This is the content of a server component example",
      fr: "Ceci est le contenu d'un exemple de composant serveur",
      es: "Este es el contenido de un ejemplo de componente servidor",
    })}
  </p>
);
```

### Inline Translations in Attributes

The `t` function is particularly useful for inline translations in JSX attributes.
When localizing attributes like `alt`, `title`, `href`, or `aria-label`, you can use `t` directly within the attribute.

```jsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Advanced Topics

### TypeScript Integration

The `t` function is type-safe when used with TypeScript, ensuring that all required locales are provided.

```typescript codeFormat="typescript"
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="esm"
import { t, type IConfigLocales } from "next-intlayer";

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Locale Detection and Context

In `next-intlayer`, the current locale is managed through context providers: `IntlayerClientProvider` and `IntlayerServerProvider`. Ensure these providers wrap your components and the `locale` prop is correctly passed.

#### Example:

```tsx codeFormat="typescript"
import type { FC } from "react";
import type { Locales } from "intlayer";
import { IntlayerClientProvider } from "next-intlayer";

const Page: FC<{ locale: Locales }> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Your components here */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Your components here */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

```javascript codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Your components here */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Common Errors and Troubleshooting

### `t` Returns Undefined or Incorrect Translation

- **Cause**: The current locale is not properly set, or the translation for the current locale is missing.
- **Solution**:
  - Verify that the `IntlayerClientProvider` or `IntlayerServerProvider` is correctly set up with the appropriate `locale`.
  - Ensure that your translations object includes all the necessary locales.

### Missing Translations in TypeScript

- **Cause**: Translations object doesn't satisfy the required locales, leading to TypeScript errors.
- **Solution**: Use the `IConfigLocales` type to enforce completeness of your translations.

```typescript codeFormat="typescript"
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Missing 'es' will cause a TypeScript error [!code error]
};

const text = t(translations);
```

```javascript codeFormat="esm"
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Missing 'es' will cause a TypeScript error [!code error]
};

const text = t(translations);
```

```javascript codeFormat="commonjs"
const { t, type IConfigLocales } = require("next-intlayer");

/** @type {import('next-intlayer').IConfigLocales<string>} */
const translations = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Missing 'es' will cause a TypeScript error [!code error]
};

const text = t(translations);
```

---

## Tips for Effective Usage

1. **Use `t` for Simple Inline Translations**: Ideal for translating small pieces of text directly within your components.
2. **Prefer `useIntlayer` for Structured Content**: For more complex translations and content reuse, define content in declaration files and use `useIntlayer`.
3. **Consistent Locale Provision**: Ensure that your locale is consistently provided across your application through the appropriate providers.
4. **Leverage TypeScript**: Use TypeScript types to catch missing translations and ensure type safety.

---

## Conclusion

The `t` function in `next-intlayer` is a powerful and convenient tool for managing inline translations in your Next.js applications. By integrating it effectively, you enhance the internationalization capabilities of your app, providing a better experience for users worldwide.

For more detailed usage and advanced features, refer to the [next-intlayer documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_visual_editor.md).

---

**Note**: Remember to set up your `IntlayerClientProvider` and `IntlayerServerProvider` properly to ensure that the current locale is correctly passed down to your components. This is crucial for the `t` function to return the correct translations.
