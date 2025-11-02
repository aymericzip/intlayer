---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: How to configure domain-based routing?
description: Learn how to configure domain-based routing.
keywords:
  - domain
  - routing
  - intlayer
  - configuration
  - middleware
  - react-router
  - vue-router
  - next.js
  - vite
  - framework
slugs:
  - frequent-questions
  - domain-routing
---

# How do I configure **domain‑based routing** with Intlayer instead of `/[locale]/` paths?

## Short answer

Domain-based routing is simpler than path-based routing (`example.com/[locale]/`) because you can skip all the middleware and routing configuration. Just deploy your app to each language domain and set one environment variable per domain.

## Step‑by‑step

1. **Deploy once per domain** (`example.com`, `exemple.fr`, `ejemplo.es`, …).
2. For every deployment, set `LOCALE` (and the usual Intlayer env vars) to the locale that domain should serve.
3. Reference that variable as `defaultLocale` in your `intlayer.config.[ts|js]`.

```ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: process.env.LOCALE, // 👈 domain decides the locale
  },
  // ... rest of your config
};

export default config;
```

That's all-works the same for **Next.js**, **Vite + React**, **Vite + Vue**, etc.

## What if every domain hits the **same** deployment?

If all domains point to the same application bundle, you'll need to detect the host at runtime and pass the locale manually through the provider.

### For Next.js

```tsx
// src/IntlayerProvider.tsx
import {
  IntlayerClientProvider,
  type IntlayerClientProviderProps,
} from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import type { FC } from "react";

export const IntlayerProvider: FC<IntlayerClientProviderProps> = ({
  children,
  locale,
}) => {
  const resolvedLocale = locale ?? getLocaleFromHostname(); // 👈 resolve locale from hostname if not provided
  return (
    <IntlayerServerProvider locale={resolvedLocale}>
      <IntlayerClientProvider locale={resolvedLocale}>
        {children}
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

### For Vue

```ts
import { createApp } from "vue";
import { installIntlayer } from "vue-intlayer";
import App from "./App.vue";
import { router } from "./routes";

const app = createApp(App);
app.use(router);
installIntlayer(app, getLocaleFromHostname()); // 👈 replace with your own lookup logic
app.mount("#app");
```

Replace `getLocaleFromHostname()` with your own lookup logic.

## Update your locale switcher

When using domain-based routing, changing languages means navigating to another domain:

```ts
const { locale } = useLocale();

function changeLanguage(target: Locale) {
  window.location.href = domainForLocale[target];
}
```

## Benefits of domain-based routing

1. **Simpler configuration**: No need to configure `intlayerMiddleware`, `generateStaticParams`, `react-router`, or `vue-router`
2. **Better SEO**: Each language has its own domain
3. **Cleaner URLs**: No locale prefix in the path
4. **Easier maintenance**: Each language deployment is independent
