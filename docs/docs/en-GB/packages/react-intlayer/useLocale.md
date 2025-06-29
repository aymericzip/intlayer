---
docName: package__react-intlayer__useLocale
url: https://intlayer.org/doc/packages/react-intlayer/useLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: useLocale Hook Documentation | react-intlayer
description: See how to use the useLocale hook for react-intlayer package
keywords:
  - useLocale
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
---

# React Integration: `useLocale` Hook Documentation

This section provides comprehensive details on the `useLocale` hook from the `react-intlayer` library, designed for handling locale management in React applications.

## Importing `useLocale` in React

To integrate the `useLocale` hook into your React application, import it from its respective package:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Used in React components for locale management
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Used in React components for locale management
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Used in React components for locale management
```

## Overview

The `useLocale` hook offers an easy way to access and manipulate the locale settings within React components. It provides access to the current locale, the default locale, all available locales, and functions to update the locale settings.

## Usage

Here’s how you can use the `useLocale` hook within a React component:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Current Locale: {locale}</h1>
      <p>Default Locale: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Parameters and Return Values

When you invoke the `useLocale` hook, it returns an object containing the following properties:

- **`locale`**: The current locale as set in the React context.
- **`defaultLocale`**: The primary locale defined in the configuration.
- **`availableLocales`**: A list of all locales available as defined in the configuration.
- **`setLocale`**: A function to update the current locale within the application's context.

## Example

This example shows a component that uses the `useLocale` hook to render a locale switcher, allowing users to dynamically change the locale of the application:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Conclusion

The `useLocale` hook from `react-intlayer` is an essential tool for managing locales in your React applications, providing the functionality needed to adapt your application to various international audiences effectively.
