# Intlayer: Next-Level Content Management in JavaScript

**Intlayer** is an innovative Content Management System (CMS) designed specifically for JavaScript developers. It enables seamless transpilation of JavaScript content into structured dictionaries, making integration into your codebase straightforward and efficient.

## Why Choose Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.
- **Simplified Setup**: Get up and running quickly with minimal configuration, especially optimized for Next.js projects.
- **Server Component Support**: Perfectly suited for Next.js server components, ensuring smooth server-side rendering.
- **Enhanced Routing**: Full support for Next.js app routing, adapting seamlessly to complex application structures.

## Getting Started with Intlayer

Setting up Intlayer in a Next.js application is straightforward:

### Step 1: Install Dependencies

Install the necessary packages using npm:

```bash
npm install intlayer next-intlayer intlayer-cli
```

```bash
yarn install intlayer next-intlayer intlayer-cli
```

```bash
pnpm install intlayer next-intlayer intlayer-cli
```

### Step 2: Update Package Scripts

Modify your `package.json` to include scripts for building and watching your dictionaries:

```json
"scripts": {
  "build": "next build",
  "dev": "next dev",
  "start": "next start",
  "transpile": "npx intlayer transpile",
  "transpile:watch": "npx intlayer watch"
}
```

### Step 3: Integrate Intlayer in Your Next.js Configuration

Configure your Next.js setup to use Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

Set up middleware to detect the user's preferred locale:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from 'next-intlayer/middleware';

export const config = {
  matcher: '/((?!api|static|._\\.._|\_next).*),
};
```

### Step 5: Define Dynamic Locale Routes

Implement dynamic routing for localized content:

Change `src/app/page.ts` to `src/app/[locale]/page.ts`

### Step 6: Manage Your Content

Create and manage your content dictionaries:

```tsx
// src/app/[locale]/page.content.ts
import { t, type ContentModule } from "intlayer";

const pageContent: ContentModule = {
  id: "page",
  getStarted: {
    main: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    pageLink: "src/app/page.tsx",
  },
};

export default pageContent;
```

[See how to declare your Intlayer declaration files](https://github.com/aypineau/intlayer/blob/main/packages/intlayer/readme.md).

### Step 7: Utilize Content in Your Code

Access your content dictionaries throughout your application:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/components/ClientComponentExample";
import { LocaleSwitcher } from "@component/components/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/components/NestedServerComponentExample";
import { ServerComponentExample } from "@component/components/ServerComponentExample";
import {
  type NextPageIntlayer,
  LocaleClientContextProvider,
} from "next-intlayer";
import { LocaleServerContextProvider, useIntlayer } from "next-intlayer/server";

const Page: NextPageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   LocaleServerContextProvider is used to provide the locale to the server children
       *   Don't work if set in the layout
       */}
      <LocaleServerContextProvider locale={locale}>
        <ServerComponentExample />
      </LocaleServerContextProvider>
      {/**
       *   LocaleClientContextProvider is used to provide the locale to the client children
       *   Can be set in any parent component, including the layout
       */}
      <LocaleClientContextProvider locale={locale}>
        <ClientComponentExample />
      </LocaleClientContextProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

For more detailed usage of intlayer into Client, or Server component, see the [nextJS example here](https://github.com/aypineau/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

## Configuration of your project

Create a config file to configure the languages of your application:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

To see all available parameters, refer to the [configuration documentation here](https://github.com/aypineau/intlayer/blob/main/docs/configuration.md).

---

This version emphasizes ease of use, practical steps, and the professional application of Intlayer in a Next.js environment.
