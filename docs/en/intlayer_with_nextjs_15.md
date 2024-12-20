# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization (i18n) library designed to simplify multilingual support in modern web applications. Intlayer seamlessly integrates with the latest **Next.js 15** framework, including its powerful **App Router**. It is optimized to work with **Server Components** for efficient rendering and is fully compatible with [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

With Intlayer, you can:

- **Easily manage translations** using declarative dictionaries at the component level.
- **Dynamically localize metadata**, routes, and content.
- **Access translations in both client-side and server-side components**.
- **Ensure TypeScript support** with autogenerated types, improving autocompletion and error detection.
- **Benefit from advanced features**, like dynamic locale detection and switching.

> Note: Intlayer is compatible with Next.js 12, 13, 14, and 15. If you are using Next.js Page Router, you can refer to this [guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_page_router.md). For Next.js 12, 13, 14 with App Router, refer to this [guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_14.md).

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

Install the necessary packages using npm:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Step 2: Configure Your Project

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

To see all available parameters, refer to the [configuration documentation here](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md).

### Step 3: Integrate Intlayer in Your Next.js Configuration

Configure your Next.js setup to use Intlayer:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

Set up middleware to detect the user's preferred locale:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

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

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

### Step 6: Declare Your Content

Create and manage your content dictionaries:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[See how to declare your Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md).

### Step 7: Utilize Content in Your Code

Access your content dictionaries throughout your application:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider is used to provide the locale to the server children
       *   Doesn't work if set in the layout
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
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

For more detailed usage of intlayer into Client, or Server component, see the [Next.js example here](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app).

### (Optional) Step 8: Internationalization of your metadata

In the case you want to internationalize your metadata, such as the title of your page, you can use the `generateMetadata` function provided by Next.js. Inside the function use the `getTranslationContent` function to translate your metadata.

````typescript
// src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... Rest of the code
````

> Learn more about the metadata optimization [on the official Next.js documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Optional) Step 9: Internationalization of your sitemap.xml and robots.txt

To internationalize your `sitemap.xml` and `robots.txt`, you can use the `getMultilingualUrls` function provided by Intlayer. This function allows you to generate multilingual URLs for your sitemap.

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> Learn more about the sitemap optimization [on the official Next.js documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Learn more about the robots.txt optimization [on the official Next.js documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Optional) Step 10: Change the language of your content

To change the language of your content, you can use the `setLocale` function provided by the `useLocale` hook. This function allows you to set the locale of the application and update the content accordingly.

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Change Language</button>
  );
};
```

### Configure TypeScript

Intlayer use module augmentation to get benefits of TypeScript and make your codebase stronger.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```gitignore
# Ignore the files generated by Intlayer
.intlayer
```
