# TanStack Start with Intlayer Integration

A modern, production-ready full-stack React application using TanStack Start with internationalization support via [Intlayer](https://intlayer.org).

This repository demonstrates how to integrate Intlayer for seamless i18n in TanStack Start projects.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🌍 Internationalization with Intlayer
- 🔧 ESLint rules for locale-aware development
- 📖 [TanStack Start docs](https://tanstack.com/start)
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

Your application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
npm run build
```

Build Intlayer dictionaries:

```bash
npm run intlayer:build
```

## Current Implementation Status

This repository contains a working implementation of Intlayer with TanStack Start that includes:

### ✅ Implemented Features

- **Intlayer Configuration**: Basic setup with English, French, and Spanish locales
- **Vite Integration**: Intlayer plugin configured in `vite.config.ts`
- **Content Dictionaries**:
  - `src/contents/app.content.ts` - Main app content
  - `src/contents/about.content.ts` - About page content
  - `src/contents/ls.content.ts` - Locale switcher content
- **Custom Components**:
  - `LocalizedLink` - Locale-aware navigation links
  - `LocaleSwitcher` - Language selection dropdown
- **Custom Hooks**:
  - `useLocalizedNavigate` - Programmatic locale-aware navigation
  - `useI18nHTMLAttributes` - HTML lang/dir attribute management
- **Routes**: Localized routes using `{-locale}` syntax
- **ESLint Configuration**: Ignores `.intlayer/**` and restricts direct imports

### Prerequisites

- TanStack Start
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
import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

### 3. Configure Routes

TanStack Start uses file-based routing. Create routes in the `src/routes/` directory:

```
src/routes/
├── __root.tsx          # Root layout
├── route.tsx           # Layout
├── {-locale}/
│   ├── index.tsx       # Localized home page
│   └── about/
│       └── index.tsx   # Localized about page
```

Note: The current implementation uses `{-locale}` syntax for dynamic route parameters in TanStack Router.

### 4. Add Intlayer Provider to Root Layout

Wrap your application with `IntlayerProvider` in the layout route:

```tsx
// src/routes/{-locale}/route.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { configuration } from 'intlayer';
import { IntlayerProvider } from 'react-intlayer';

export const Route = createFileRoute('/{-$locale}')({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider
      locale={locale ?? configuration.internationalization.defaultLocale}
    >
      <Outlet />
    </IntlayerProvider>
  );
}
```

### 5. Use Intlayer in Pages

Access translations/content using the `useIntlayer` hook and use `LocalizedLink` for locale-aware navigation:

```tsx
// src/routes/{-locale}/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useIntlayer } from 'react-intlayer';

import LocaleSwitcher from '@/components/locale-switcher';
import { LocalizedLink } from '@/components/localized-link';

export const Route = createFileRoute('/{-locale}/')({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer('app');

  return (
    <div>
      <h1>{content.title}</h1>
      <LocalizedLink to="/about">About</LocalizedLink>
      <LocaleSwitcher />
    </div>
  );
}
```

### 6. Configure Vite Plugins

Add Intlayer plugins to your Vite config:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { intlayerPlugin } from 'vite-intlayer';
// ... other imports

export default defineConfig({
  plugins: [
    intlayerPlugin(),
    // ... other plugins
  ],
});
```

### 7. Add Content Files

Create content files in `src/contents/` directory:

```ts
// src/contents/app.content.ts
import { type Dictionary, t } from 'intlayer';

const appContent = {
  content: {
    title: t({
      en: 'Welcome to Intlayer + TanStack Router',
      fr: 'Bienvenue à Intlayer + TanStack Router',
      es: 'Bienvenido a Intlayer + TanStack Router',
    }),
    links: {
      home: t({
        en: 'Home',
        fr: 'Accueil',
        es: 'Inicio',
      }),
      about: t({
        en: 'About',
        fr: 'À propos',
        es: 'Acerca de',
      }),
    },
    meta: {
      description: t({
        en: 'This is an example of using Intlayer with TanStack Router',
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
        es: 'Este es un ejemplo de uso de Intlayer con TanStack Router',
      }),
    },
  },
  key: 'app',
} satisfies Dictionary;

export default appContent;
```

### 8. Use LocalizedLink and useLocalizedNavigate for Navigation

To ensure all links are locale-aware, use the provided `LocalizedLink` component:

```tsx
// src/components/localized-link.tsx
import { Link, type LinkProps } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'react-intlayer';

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, 'to'>;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps['to']} />;
}
```

For programmatic navigation, create and use the `useLocalizedNavigate` hook:

```tsx
// src/hooks/useLocalizedNavigate.ts
import { NavigateOptions, useNavigate } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'react-intlayer';

type LocalizedNavigateOptions = {
  to: string;
} & Omit<NavigateOptions, 'to'>;

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const localizedNavigate = (options: LocalizedNavigateOptions) => {
    const to = isExternal(options.to)
      ? options.to
      : getLocalizedUrl(options.to, locale);

    navigate({ ...options, to: to as NavigateOptions['to'] });
  };

  return localizedNavigate;
};
```

### Example: Using `useLocalizedNavigate`

Here's how to use the `useLocalizedNavigate` hook for locale-aware navigation in your components:

```tsx
import { useLocalizedNavigate } from '@/hooks/useLocalizedNavigate';

function MyComponent() {
  const navigate = useLocalizedNavigate();

  const handleClick = () => {
    navigate({ to: '/about' });
  };

  return <button onClick={handleClick}>Go to About Page</button>;
}
```

This ensures navigation respects the current locale and updates the URL accordingly.

### 9. Create Locale Switcher Component

```tsx
// src/components/locale-switcher.tsx
import { useLocation } from '@tanstack/react-router';
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  Locales,
} from 'intlayer';
import { useIntlayer, useLocale } from 'react-intlayer';

export default function LocaleSwitcher() {
  const { pathname, searchStr } = useLocation();
  const content = useIntlayer('locale-switcher');

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname + searchStr, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <select
      aria-label={content.label.toString()}
      onChange={(e) => setLocale(e.target.value)}
      value={locale}
    >
      {availableLocales.map((localeItem) => (
        <option
          dir={getHTMLTextDir(localeItem)}
          key={localeItem}
          lang={localeItem}
          value={localeItem}
        >
          {getLocaleName(localeItem, locale)} (
          {getLocaleName(localeItem, Locales.ENGLISH)})
        </option>
      ))}
    </select>
  );
}
```

### 10. Type Safety

To enable type safety for your Intlayer dictionaries and content, ensure your `tsconfig.json` includes the Intlayer types. The Intlayer plugin should handle this automatically.

### 11. Current Route Structure

The current implementation uses TanStack Router's dynamic route syntax with `{-locale}` for locale parameters. Here's the actual route structure:

- `/{-locale}/` - Localized home page (e.g., `/en/`, `/fr/`)
- `/{-locale}/about/` - Localized about page (e.g., `/en/about/`, `/fr/about/`)

### 12. Run and Build

- Start development: `npm run dev`
- Build for production: `npm run build`
- Build Intlayer dictionaries: `npm run intlayer:build`

### 13. References

- [TanStack Start Documentation](https://tanstack.com/start)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Intlayer Documentation](https://intlayer.org)
- [Complete Example Repository](https://github.com/AydinTheFirst/tanstack-start-intlayer)

---

Built with ❤️ using TanStack Start and Intlayer.
