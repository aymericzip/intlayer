---
createdAt: 2025-08-23
updatedAt: 2025-10-09
title: useLocale Hook Documentation | next-intlayer
description: See how to use the useLocale hook for next-intlayer package
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
history:
  - version: 6.2.0
    date: 2025-10-09
    changes: Added docs for `useLocale` hook with `onLocaleChange` option
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Next.js Integration: `useLocale` Hook Documentation for `next-intlayer`

This section offers detailed documentation on the `useLocale` hook tailored for Next.js applications within the `next-intlayer` library. It is designed to handle locale changes and routing efficiently.

## Importing `useLocale` in Next.js

To utilize the `useLocale` hook in your Next.js application, import it as shown below:

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
  > 3. You switch to `/es/about`
  > 4. You click the browser's "back" button
  >
  > The behavior will differ based on the `onLocaleChange` value:
  >
  > - `undefined`: (default) Only updates the locale in the client context, and set the cookie, without changing the URL.
  >   -> The "back" button will go to `/fr/home`
  > - `"replace"`: Replaces the current URL with the new localized URL, and set the cookie.
  >   -> The "back" button will go to `/es/home`
  > - `"push"`: Adds the new localized URL to browser history, and set the cookie.
  >   -> The "back" button will go to `/fr/about`
  > - `(locale) => void`: Set the cookie and trigger a custom function that will be called when the locale changes.
  >
  >   The `undefined` option is the default behavior as we recommend to use the `Link` component to navigate to the new locale.
  >   Example:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     About
  >   </Link>
  >   ```

## Return Values

When you invoke the `useLocale` hook, it returns an object containing the following properties:

- **`locale`**: The current locale as set in the React context.
- **`defaultLocale`**: The primary locale defined in the configuration.
- **`availableLocales`**: A list of all locales available as defined in the configuration.
- **`setLocale`**: A function to change the application's locale and update the URL accordingly. It takes care of prefix rules, whether to add the locale to the path or not based on configuration. Utilizes `useRouter` from `next/navigation` for navigation functions like `push` and `refresh`.
- **`pathWithoutLocale`**: A computed property that returns the path without the locale. It is useful for comparing URLs. For example, if the current locale is `fr`, and the url `fr/my_path`, the path without locale is `/my_path`. Utilizes `usePathname` from `next/navigation` to get the current path.

## Conclusion

The `useLocale` hook from `next-intlayer` is a crucial tool for managing locales in Next.js applications. It offers an integrated approach to adapt your application for multiple locales by handling locale storage, state management, and URL modifications seamlessly.
