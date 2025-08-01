# useI18n Hook

The `useI18n` hook provides a familiar translation function interface similar to other i18n libraries like i18next, next-intl, and vue-i18n.

## Installation

```bash
npm install react-intlayer
# or
pnpm add react-intlayer
# or
yarn add react-intlayer
```

## Usage

### Basic Usage

```tsx
import React from "react";
import { useI18n } from "react-intlayer";

// Assuming you have a dictionary file like:
// src/app.content.ts
export default {
  key: "app",
  content: {
    title: {
      en: "Welcome to My App",
      fr: "Bienvenue dans mon application",
      es: "Bienvenido a mi aplicación",
    },
    navigation: {
      home: {
        en: "Home",
        fr: "Accueil",
        es: "Inicio",
      },
      about: {
        en: "About",
        fr: "À propos",
        es: "Acerca de",
      },
    },
  },
} as const;

const MyComponent = () => {
  const t = useI18n("app");

  return (
    <div>
      <h1>{t("title")}</h1>
      <nav>
        <a href="/">{t("navigation.home")}</a>
        <a href="/about">{t("navigation.about")}</a>
      </nav>
    </div>
  );
};
```

### With Locale Override

```tsx
import React from "react";
import { useI18n } from "react-intlayer";

const MyComponent = () => {
  // Force French locale for this component
  const t = useI18n("app", "fr");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Will always display French */}
    </div>
  );
};
```

## Comparison with useIntlayer

The `useI18n` hook provides a more familiar API compared to `useIntlayer`:

### Before (useIntlayer)

```tsx
const content = useIntlayer('app');
<h1>{content.title}</h1>
<a href="/">{content.navigation.home}</a>
```

### After (useI18n)

```tsx
const t = useI18n('app');
<h1>{t('title')}</h1>
<a href="/">{t('navigation.home')}</a>
```

## Type Safety

The `useI18n` hook provides full type safety and autocomplete for dictionary keys:

```tsx
const t = useI18n("app");

// ✅ Valid - TypeScript will autocomplete these
t("title");
t("navigation.home");
t("navigation.about");

// ❌ TypeScript error - invalid key
t("invalid.key");
```

## API Reference

### `useI18n(namespace, locale?)`

**Parameters:**

- `namespace`: The dictionary key to scope translations to
- `locale?`: Optional locale override. If not provided, uses the current context locale

**Returns:**

- `t(key)`: Translation function that accepts dot-notation paths to access nested content

### Translation Function `t(key)`

**Parameters:**

- `key`: Dot-notation string path to the desired content (e.g., 'navigation.home')

**Returns:**

- The translated content for the given key and current locale

## Integration with Intlayer Editor

The `useI18n` hook seamlessly integrates with the Intlayer Editor, allowing for live editing of translations in development mode.

## Server-Side Rendering

The `useI18n` hook works with server-side rendering and will use the locale from the Intlayer context.
