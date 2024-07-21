<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img src="docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/intlayer?labelColor=49516F&color=8994BC" 
  />
  </a>
</div>

# Intlayer: Next-Level Content Management in JavaScript

**Intlayer** is an innovative Content Management System (CMS) designed specifically for JavaScript developers. It enables seamless transpilation of JavaScript content into structured dictionaries, making integration into your codebase straightforward and efficient.

## Why Choose Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Leverage TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.
- **Simplified Setup**: Get up and running quickly with minimal configuration, especially optimized for Next.js projects.
- **Server Component Support**: Perfectly suited for Next.js server components, ensuring smooth server-side rendering.
- **Enhanced Routing**: Full support for Next.js app routing, adapting seamlessly to complex application structures.

# Getting Started with Intlayer and Next.js

Setting up Intlayer in a Next.js application is straightforward:

## Step 1: Install Dependencies

Install the necessary packages using npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn install intlayer next-intlayer
```

```bash
pnpm install intlayer next-intlayer
```

## Step 2: Configure Your Project

Create a config file to configure the languages of your application:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

To see all available parameters, refer to the [configuration documentation here](https://github.com/aypineau/intlayer/blob/main/docs/docs/configuration_en.md).

## Step 3: Integrate Intlayer in Your Next.js Configuration

Configure your Next.js setup to use Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

## Step 4: Configure Middleware for Locale Detection

Set up middleware to detect the user's preferred locale:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

## Step 5: Define Dynamic Locale Routes

Implement dynamic routing for localized content:

Change `src/app/page.ts` to `src/app/[locale]/page.ts`

Then, implement the generateStaticParams function in your application Layout.

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // Line to insert

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

Then add a new layout in your `[locale]` directory:

```tsx
// src/app/[locale]/layout.tsx

import { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = ({ children, params: { locale } }) => (
  <html lang={locale}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

## Step 6: Declare Your Content

Create and manage your content dictionaries:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent: DeclarationContent = {
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

> Note: If your content file includes TSX code, you should consider importing `import React from "react";` in your content file.

[See how to declare your Intlayer declaration files](https://github.com/aypineau/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md).

## Step 7: Utilize Content in Your Code

Access your content dictionaries throughout your application:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/components/ClientComponentExample";
import { LocaleSwitcher } from "@component/components/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/components/NestedServerComponentExample";
import { ServerComponentExample } from "@component/components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: NextPageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider is used to provide the locale to the server children
       *   Don't work if set in the layout
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider is used to provide the locale to the client children
       *   Can be set in any parent component, including the layout
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
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

> Note: If you want to use your content in a `string` attribute, such as `alt`, `title`, `href`, `aria-label`, etc., you must call the value of the function, like:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

For more detailed usage of intlayer into Client, or Server component, see the [nextJS example here](https://github.com/aypineau/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx).

## (Optional) Step 8: Internationalization of your metadata

In the case you want to internationalize your metadata, such as the title of your page, you can use the `generateMetadata` function provided by NextJS. Inside the function use the `getTranslationContent` function to translate your metadata.

```typescript
// src/app/[locale]/metadata.ts

import { type IConfigLocales, getTranslationContent } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams } from 'next-intlayer';

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  return {
    title: t<string>({
      en: 'My title',
      fr: 'Mon titre',
      es: 'Mi título',
    }),
    description: t({
      en: 'My description',
      fr: 'Ma description',
      es: 'Mi descripción',
    }),

};
```

## Configure TypeScript

Intlayer use module augmentation to get benefits of TypeScript and make your codebase stronger.

![alt text](https://github.com/aypineau/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aypineau/intlayer/blob/main/docs/assets/translation_error.png)

Ensure your TypeScript configuration includes the autogenerated types.

```json5
// tsconfig.json

{
  // your custom config
  include: [
    "src",
    "types", // <- Include the auto generated types
  ],
}
```
