---
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
slugs:
  - doc
  - packages
  - next-intlayer
  - useLocale
description: Documentation for the useLocale hook in the next-intlayer package
createdAt: 2024-08-11
updatedAt: 2026-01-26
title: useLocale Hook Documentation | next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-26
    changes: Default `onLocaleChange` to `replace`
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Next.js Integration: `useLocale` Hook Documentation for `next-intlayer`

This section offers detailed documentation on the `useLocale` hook tailored for Next.js applications within the `next-intlayer` library. It is designed to handle locale changes and routing efficiently.

## Importing `useLocale` in Next.js

To utilise the `useLocale` hook in your Next.js application, import it as shown below:

```javascript
import { useLocale } from "next-intlayer"; // Used for managing locales and routing in Next.js
```

## Usage

Here’s how to implement the `useLocale` hook within a Next.js component:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

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
```

## Parameters

The `useLocale` hook accepts the following parameters:

- **`onLocaleChange`**: A string that determines how the URL should be updated when the locale changes. It can be `"replace"`, `"push"` or `"none"`.

  > Let's take an example:
  >
  > 1. You are on `/fr/home`
  > 2. You navigate to `/fr/about`
  > 3. You change the locale to `/es/about`
  > 4. You click the browser's "back" button
  >
  > The behaviour will differ based on the `onLocaleChange` value:
  >
  > - `"replace"` (default): Replaces the current URL with the new localised URL, and set the cookie.
  >   -> The "back" button will go to `/es/home`
  > - `"push"`: Adds the new localised URL to browser history, and set the cookie.
  >   -> The "back" button will go to `/fr/about`
  > - `"none"`: Only updates the locale in the client context, and set the cookie, without changing the URL.
  >   -> The "back" button will go to `/fr/home`
  > - `(locale) => void`: Set the cookie and trigger a custom function that will be called when the locale changes.
  >
  >   The `undefined` option is the default behaviour as we recommend to use the `Link` component to navigate to the new locale.
  >   Example:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     About
  >   </Link>
  >   ```

## Return Values

- **`locale`**: The current locale as set in the React context.
- **`defaultLocale`**: The primary locale defined in the configuration.
- **`availableLocales`**: A list of all locales available as defined in the configuration.
- **`setLocale`**: A function to change the application's locale and update the URL accordingly. It manages prefix rules, deciding whether to add the locale to the path or not based on the configuration. Utilises `useRouter` from `next/navigation` for navigation functions such as `push` and `refresh`.
- **`pathWithoutLocale`**: A computed property that returns the path without the locale. It is useful for comparing URLs. For example, if the current locale is `fr`, and the URL is `fr/my_path`, the path without the locale is `/my_path`. Utilises `usePathname` from `next/navigation` to obtain the current path.

## Conclusion

The `useLocale` hook from `next-intlayer` is an essential tool for managing locales in Next.js applications. It provides an integrated approach to adapting your application for multiple locales by seamlessly handling locale storage, state management, and URL modifications.
