# React Router v7 with Intlayer Integration

A modern, production-ready template for building full-stack React applications using React Router v7 with internationalization support via [Intlayer](https://intlayer.org).

This repository demonstrates how to integrate Intlayer for seamless i18n in React Router v7 projects with simplified routing.

## Key Features of This Implementation

- **Simplified Routing**: Uses optional locale parameters (`/:locale?`) instead of dynamic segments
- **Unified Content Structure**: Content files are organized in the main routes directory
- **Streamlined Components**: Simplified `LocalizedLink` and `useLocalizedNavigate` implementations
- **Clean Architecture**: Reduced complexity while maintaining full internationalization support

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🌍 Internationalization with Intlayer
- 🔧 ESLint rules for locale-aware development
- 📖 [React Router docs](https://reactrouter.com/)
- 🏷️ [Intlayer docs](https://intlayer.org)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
# or
pnpm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
# or
pnpm dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

This section explains how to add [Intlayer](https://intlayer.org) internationalization to a React Router v7 project with simplified routing, using the [react-router-app](https://github.com/aymericzip/intlayer/tree/main/examples/react-router-app) example as a reference.

### Prerequisites

- React Router v7
- React 19+
- Node.js (v20+ recommended)
- Package manager (npm, pnpm, or yarn)

### 1. Install Dependencies

```bash
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

### 2. Configure Intlayer

Create an `intlayer.config.ts` file:

```ts
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.TURKISH],
  },
};

export default config;
```

### 3. Configure Routes

Edit `routes.ts` file for simplified route configuration:

```ts
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:locale?", "routes/page.tsx"),
    route("/:locale?/about", "routes/about/page.tsx"),
  ]),
] satisfies RouteConfig;
```

### 4. Add Intlayer Provider to Layout

For locale-aware routing, wrap your localized content with `IntlayerProvider` in the root layout:

```tsx
// app/routes/layout.tsx
import { configuration } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import type { Route } from "./+types/layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  return (
    <IntlayerProvider
      locale={params.locale ?? configuration.internationalization.defaultLocale}
    >
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 5. Use Intlayer in Pages

Access translations/content using the `useIntlayer` hook and use `LocalizedLink` for locale-aware navigation:

```tsx
// app/routes/page.tsx
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "~/components/locale-switcher";
import LocalizedLink from "~/components/localized-link";
import { useLocalizedNavigate } from "~/hooks/useLocalizedNavigate";

import type { Route } from "./+types/page";

export const meta: Route.MetaFunction = ({ params }) => {
  const content = getIntlayer("page-meta", params.locale); // Fetch meta content based on locale
  return [
    { title: content.title },
    { content: content.description, name: "description" },
  ];
};

export default function Page() {
  const content = useIntlayer("page");
  const navigate = useLocalizedNavigate();

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-3xl font-bold underline">{content.greeting}</h1>
        <LocaleSwitcher />
        <div className="flex gap-2">
          <a href="/">Index</a>
          <LocalizedLink to="/">{content.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.about}</LocalizedLink>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("/")}>
            {content.home} (navigate)
          </button>
          <button onClick={() => navigate("/about")}>
            {content.about} (navigate)
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 6. Configure Vite Plugins

Add Intlayer plugins to your Vite config:

```ts
// vite.config.ts
import { intlayerMiddleware, intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerMiddleware(), // Optional. Use if you need middleware support.
    // ...other plugins
  ],
});
```

### 7. Add Content Files

Create content files for each page/component in the routes directory, e.g.:

```ts
// app/routes/page.content.ts
import { type Dictionary, t } from "intlayer";

const pageContent = {
  content: {
    about: t({
      en: "About",
      tr: "Hakkında",
    }),
    greeting: t({
      en: "Hello World",
      tr: "Merhaba Dünya",
    }),
    home: t({
      en: "Home",
      tr: "Ana Sayfa",
    }),
  },
  key: "page",
} satisfies Dictionary;

export default pageContent;
```

```ts
// app/routes/meta.content.ts
import { type Dictionary, t } from "intlayer";

const metaContent = {
  content: {
    description: t({
      en: "This is the home page description.",
      tr: "Bu, ana sayfanın açıklamasıdır.",
    }),
    title: t({
      en: "Home",
      tr: "Ana Sayfa",
    }),
  },
  key: "page-meta",
} satisfies Dictionary;

export default metaContent;
```

### 8. Use LocalizedLink and useLocalizedNavigate for Navigation

To ensure all links are locale-aware, use the provided `LocalizedLink` component instead of React Router's `Link`:

```tsx
// app/components/localized-link.tsx
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from "react-router";

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, "to">;

export default function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps["to"]} />;
}
```

Usage:

```tsx
import LocalizedLink from "~/components/localized-link";

// This will automatically prefix with the current locale, e.g., /en/about
<LocalizedLink to="/about">About</LocalizedLink>;
```

For programmatic navigation, create and use the `useLocalizedNavigate` hook:

```tsx
// app/hooks/useLocalizedNavigate.ts
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
// eslint-disable-next-line no-restricted-imports
import { type NavigateOptions, useNavigate } from "react-router";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (to: string, options?: NavigateOptions) => {
    const localedTo = isExternal(to) ? to : getLocalizedUrl(to, locale);
    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

```tsx
// Usage in components:
import { useLocalizedNavigate } from "~/hooks/useLocalizedNavigate";

function MyComponent() {
  const navigate = useLocalizedNavigate();

  const handleClick = () => {
    navigate("/about"); // Will navigate to /en/about or /tr/about based on current locale
  };

  return <button onClick={handleClick}>Go to About</button>;
}
```

Note: ESLint is configured to prevent direct imports from `react-router` to encourage using localized wrappers.

### 9. Type Safety

To enable type safety for your Intlayer dictionaries and content, ensure your `tsconfig.json` includes the Intlayer types. Add the following to your configuration:

```json
{
  "include": [
    ".intlayer/types/**/*"
    // ...other includes
  ]
}
```

This will provide autocompletion and type checking for your translation keys and content files throughout your project.

### 10. Run and Build

- Start development: `npm run dev`
- Build for production: `npm run build`
- Build Intlayer dictionaries: `npm run intlayer:build`

### 11. References

- [react-router-app example](https://github.com/aymericzip/intlayer/tree/main/examples/react-router-app) - Official Intlayer example
- [Intlayer with Vite and React](https://intlayer.org/doc/environment/vite-and-react) - Setup guide for Vite + React
- [Intlayer Documentation](https://intlayer.org)
- [React Router Documentation](https://reactrouter.com/)

---

Built with ❤️ using React Router and Intlayer. See the [official react-router-app example](https://github.com/aymericzip/intlayer/tree/main/examples/react-router-app) for more details.
