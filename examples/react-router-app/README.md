# React Router v7 with Intlayer Integration

A modern, production-ready template for building full-stack React applications using React Router v7 with internationalization support via [Intlayer](https://intlayer.org).

This repository demonstrates how to integrate Intlayer for seamless i18n in React Router v7 projects.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- �🔒 TypeScript by default
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

Build Intlayer dictionaries:

```bash
npm run intlayer:build
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

## Integrating Intlayer with React Router v7

This section explains how to add [Intlayer](https://intlayer.org) internationalization to a React Router v7 project, using the [react-router-app](https://github.com/aymericzip/intlayer/tree/main/examples/react-router-app) example as a reference.

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

Create a `routes.ts` file for route configuration:

```ts
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/page.tsx"), // Home page with redirect
    route("/:lang", "routes/[lang]/page.tsx"), // Localized home
    route("/:lang/about", "routes/[lang]/about/page.tsx"), // About page
  ]),
] satisfies RouteConfig;
```

### 4. Add Intlayer Provider to Layout

For locale-aware routing, wrap your localized content with `IntlayerProvider` in the language-specific layout:

```tsx
// app/routes/layout.tsx
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes";

export default function RootLayout() {
  useI18nHTMLAttributes(); // Set HTML lang attribute

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 5. Use Intlayer in Pages

Access translations/content using the `useIntlayer` hook and use `LocalizedLink` for locale-aware navigation:

```tsx
// app/routes/[lang]/page.tsx
import { useIntlayer } from "react-intlayer";
import LocalizedLink from "~/components/localized-link";

export default function Page() {
  const content = useIntlayer("page");
  return (
    <div>
      <h1>{content.greeting}</h1>
      <LocalizedLink to="/about">About</LocalizedLink>
    </div>
  );
}
```

### 5. Configure Vite Plugins

Add Intlayer plugins to your Vite config:

```ts
// vite.config.ts
import { intlayerMiddlewarePlugin, intlayerPlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerPlugin(),
    intlayerMiddlewarePlugin(), // Optional. Use if you need middleware support.
    // ...other plugins
  ],
});
```

### 6. Add Content Files

Create content files for each page/component, e.g.:

```ts
// app/routes/[lang]/page.content.ts
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

### 7. Use LocalizedLink and useLocalizedNavigate for Navigation

To ensure all links are locale-aware, use the provided `LocalizedLink` component instead of React Router's `Link`:

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
import { useNavigate, type NavigateOptions } from "react-router";

export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  return (to: string, options?: NavigateOptions) => {
    const final = to.startsWith("/") ? getLocalizedUrl(to, locale) : to;
    navigate(final, options);
  };
}

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

### 8. Type Safety

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

### 9. Run and Build

- Start development: `npm run dev`
- Build for production: `npm run build`
- Build Intlayer dictionaries: `npm run intlayer:build`

### 10. References

- [react-router-app example](https://github.com/aymericzip/intlayer/tree/main/examples/react-router-app) - Official Intlayer example
- [Intlayer with Vite and React](https://intlayer.org/doc/environment/vite-and-react) - Setup guide for Vite + React
- [Intlayer Documentation](https://intlayer.org)
- [React Router Documentation](https://reactrouter.com/)

---

Built with ❤️ using React Router and Intlayer. See the [official react-router-app example](https://github.com/aymericzip/intlayer/tree/main/examples/react-router-app) for more details.
