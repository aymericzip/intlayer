---
createdAt: 2025-09-04
updatedAt: 2026-08-30
title: "React Router v7 i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) React Router v7 app. Translate with AI agents and optimise bundle size, SEO and performances."
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Locale Routing
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 6.1.5
    date: 2025-10-03
    changes: "Update documentation"
  - version: 5.8.2
    date: 2025-09-04
    changes: "Added for React Router v7"
author: aymericzip
---

# Getting Started Internationalising (i18n) with Intlayer and React Router v7

This guide demonstrates how to integrate **Intlayer** for seamless internationalisation in React Router v7 projects with locale-aware routing, TypeScript support, and modern development practices.

For client-side routing, refer to the [Intlayer with React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_react_router_v7.md) guide.

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `react-i18next` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>
<Accordion header="Full React Router coverage">

Intlayer is optimized to work perfectly with React Router by offering **locale-aware routing**, **middleware for locale detection**, and all the features needed for scaling internationalization (i18n).

</Accordion>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and page sizes by up to 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>

<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>
</AccordionGroup>

---

## Step-by-Step Guide to Set Up Intlayer in a React Router v7 Application

<Steps>

<Step number={1} title="Install Dependencies">

Install the necessary packages using your preferred package manager:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

Install the necessary packages using your preferred package manager:

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/index.md).

- **react-intlayer**
  The package that integrates Intlayer with a React application. It provides context providers and hooks for React internationalisation.

- **vite-intlayer**
  Includes the Vite plugin for integrating Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), as well as middleware for detecting the user's preferred locale, managing cookies, and handling URL redirection.

- **@react-router/fs-routes**
  The package that enables file-system based routing for React Router v7.

</Step>

<Step number={2} title="Configuration of your project">

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Through this configuration file, you can set up localized URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Step>

<Step number={3} title="Integrate Intlayer in Your Vite Configuration">

Add the intlayer plugin into your configuration:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> The `intlayer()` Vite plugin is used to integrate Intlayer with Vite. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the Vite application. Additionally, it provides aliases to optimise performance.

</Step>

<Step number={4} title="Configure React Router v7 File-System Routes">

Set up your routing configuration to use file-system based routes with `flatRoutes`:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // Ignore content declaration files from being treated as routes
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> The `flatRoutes` function from `@react-router/fs-routes` enables file-system based routing, where the file structure in the `routes/` directory determines your application's routes. The `ignoredRouteFiles` option ensures that Intlayer content declaration files (`.content.ts`, etc.) are not treated as route files.

</Step>

<Step number={5} title="Create Layout Components">

With file-system routing, you use a flat naming convention where dots (`.`) represent path segments and parentheses `()` denote optional segments.

Create the following files in your `app/routes/` directory:

#### File Structure

```bash
app/
├── root.tsx                         # Layout wrapper for locale routes
└──routes/
    ├── ($locale)._index.tsx         # Home page (/, /es, etc.)
    ├── ($locale)._index.content.ts  # Home page content
    ├── ($locale).about.tsx          # About page (/about, /es/about, etc.)
    └── ($locale).about.content.ts   # About page content
```

The naming conventions:

- `($locale)` - Optional dynamic segment for the locale parameter
- `_layout` - Layout route that wraps child routes
- `_index` - Index route (renders at the parent path)
- `.` (dot) - Separates path segments (e.g., `($locale).about` → `/:locale?/about`)

#### Layout Component

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// ... Unchanged App, links and ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### Root Layout

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

#### Localised Home Page

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Step>

<Step number={6} title="Declare Your Content">

Create and manage your content declarations to store translations. Place content files alongside your route files:

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      "en-GB": "Welcome to React Router v7 + Intlayer",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      "en-GB":
        "Build multilingual applications with ease using React Router v7 and Intlayer.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      "en-GB": "Learn About Us",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      "en-GB": "About Us",
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      "en-GB": "This is the about page content.",
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      "en-GB": "Home",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> Your content declarations can be defined anywhere in your application as soon as they are included into the `contentDir` directory (by default, `./app`). And match the content declaration file extension (by default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> To learn more about the `useIntlayer` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useIntlayer.md).

> If your app already exists, you can use the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md), as well as the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md), to transform thousands of components in a second.

</Step>

<Step number={7} title="Create Locale-Aware Components">

Create a `LocalizedLink` component for locale-aware navigation:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

In the case you want to navigate to the localised routes, you can use the `useLocalizedNavigate` hook:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Create a Locale Switcher Component">

Create a component to allow users to change languages:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> To learn more about the `useLocale` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="Add HTML Attributes Management">

Create a hook to manage HTML lang and dir attributes:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Then use it in your root component:

</Step>

<Step number={11} title="Add middleware">

You can also use the `intlayerProxy` to add server-side routing to your application. This plugin will automatically detect the current locale based on the URL and set the appropriate locale cookie. If no locale is specified, the plugin will determine the most appropriate locale based on the user's browser language preferences. If no locale is detected, it will redirect to the default locale.

> Note that to use the `intlayerProxy` in production, you need to switch the `vite-intlayer` package from `devDependencies` to `dependencies`.

> Since Intlayer v9, `intlayerProxy()` is bundled directly into the `intlayer()` plugin and enabled by default through the `routing.enableProxy` option (`true` by default). Registering it separately as shown below is now optional — it is kept for backward compatibility and for setups that need to control plugin order. Set `routing.enableProxy: false` to opt out. See the [v9 release notes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    reactRouter(),

    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={11} title="Extract the content of your components" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

To ease this process, Intlayer propose a [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) to transform your components and extract the content.

To set it up, you can add a `compiler` section in your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Indicates if the components should be saved after being transformed.
     *
     * - If `true`, the compiler will rewrite the component file in the disk. So the transformation will be permanent, and the compiler will skip the transformation for the next process. That way, the compiler can transform the app, and then it can be removed.
     *
     * - If `false`, the compiler will inject the `useIntlayer()` function call into the code in the build output only, and keep the base codebase intact. The transformation will be done only in memory.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Run the extractor to transform your components and extract the content

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Update your `vite.config.ts` to include the `intlayerCompiler` plugin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Or npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to benefit from TypeScript and strengthen your codebase.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This prevents you from committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## VS Code Extension

To enhance your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) or externalise your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md).

---

## Documentation References

- [Intlayer Documentation](https://intlayer.org)
- [React Router v7 Documentation](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md)
- [Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

This comprehensive guide provides everything you need to integrate Intlayer with React Router v7 for a fully internationalised application with locale-aware routing and TypeScript support.

## Frequently Asked Questions

<FAQ>

<Question title="What are the different solutions available to internationalize a React Router v7 app?">

- **`react-i18next` / `i18next`**: JSON namespaces loaded at runtime, with a separate locale detector wired into the router by hand.
- **`react-intl`** and **`Lingui`**: ICU messages with an extraction step.
- **`Intlayer`**: the most advanced solution. Content declared anywhere in your codebase ([next to each component or centralized](https://intlayer.org/blog/per-component-vs-centralized-i18n)) and compiled at build time, typed end to end, with locale aware routing helpers, AI translation, a visual editor and a CMS.

See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/interest_of_intlayer.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md).

</Question>

<Question title="How much does i18n add to my React Router bundle size?">

Much less than a namespace based setup, because a page never downloads a catalogue it does not render. Server rendered markup resolves its content on the server, and the build time compiler replaces `useIntlayer` calls with the exact dictionary entries a component uses, so unused keys and unused languages are dropped, and [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dynamic_dictionaries/index.md) split the rest per locale. Measured against the usual alternatives, Intlayer reduces bundle and page size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/bundle_optimization.md) and the [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/benchmark/index.md).

</Question>

<Question title="Can I migrate from `react-i18next` or `react-intl` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [react-i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_react-i18next_to_intlayer.md) or the [i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/migration_from_i18next_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compat/index.md) expose the exact same API as `react-i18next`, `react-intl` and `i18next`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/plugins/sync-po.md) does the same for gettext catalogues, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your components, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalogue one at a time. Step 11 of this guide walks through it.

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md) does the same at build time: it scans your JSX, TSX, Vue and Svelte source on every change, generates the dictionaries and keeps them in sync through hot module replacement, so there are no keys to maintain by hand at all.

Two limits are worth knowing before you turn the compiler on. It works by static analysis, so strings that only exist at runtime, such as API error codes or CMS fields, stay out of reach. And it has to tell user facing text apart from application logic like `className="active"` or a status code, which needs a few annotations in a large codebase. The [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md) avoids both by keeping you in the loop.

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="What is the difference between this guide and the config based React Router guide?">

Only how the routes are declared. This guide uses the file system route conventions, where the locale segment comes from the file names, while the [config based guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_react_router_v7.md) declares the same tree in `routes.ts`. The content declarations, the hooks and the configuration are identical in both, so you can switch conventions without touching your i18n.

</Question>

<Question title="How do I add a locale segment with file system routes?">

Steps 4 and 5 cover it: the locale becomes a dynamic segment in the route file names, so every page under it receives the active locale. `validatePrefix` tells you whether that segment is a declared locale, so `/xx/about` returns a real 404 instead of rendering a duplicate page, and `getLocalizedUrl` rewrites any path into the target language.

</Question>

<Question title="Do I have to put the locale in the URL?">

No. `routing.mode` accepts `"prefix-no-default"` (the default), `"prefix-all"`, `"no-prefix"` and `"search-params"`, and `routing.domains` maps each locale to its own domain. See the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

</Question>

<Question title="How do I add hreflang tags for SEO?">

Build the alternates map with `getMultilingualUrls` and emit it from your route `meta` or `links` export, including an `x-default` entry. The same helper feeds a localized `sitemap.xml`.

</Question>

<Question title="How do I build a language switcher that stays on the current page?">

Step 8 shows the component. `useLocale` exposes the active locale, the declared locales and a setter that persists the choice, while `getLocalizedUrl` rewrites the current path into the target language, so the reader stays on the same route instead of being sent to the home page.

</Question>

<Question title="How do I translate the app automatically with AI?">

Run `npx intlayer fill`. It fills missing translations with the LLM of your choice, using your own provider and API key, and `--git-diff` limits the run to the content changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/CI_CD.md).

</Question>

<Question title="Does Intlayer support plurals, gender and rich text?">

Yes: [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/markdown.md) and [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/formatters.md) for numbers, dates and currencies.

</Question>

<Question title="How can translators edit the content without touching the code?">

Through the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md), which runs on your own infrastructure and lets anyone edit text in place on the running app, or the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_CMS.md), which externalizes content so it can change without a deployment.

</Question>

<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 licence, commercial use included. The hosted CMS is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md).

</Question>

</FAQ>
