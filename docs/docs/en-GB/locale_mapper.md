---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Locale Mapper
description: Discover how Locale Mapper works. See the steps used by Locale Mapper in your application. See what the different packages do.
keywords:
  - Locale Mapper
  - Get started
  - Intlayer
  - Application
  - Packages
slugs:
  - doc
  - locale-mapper
---

# Locale Mapper

The Locale Mapper is a powerful utility that helps you work with internationalisation data in your Intlayer application. It provides three main functions to transform and organise locale-specific data: `localeMap`, `localeFlatMap`, and `localeRecord`.

## How Locale Mapper Works

The Locale Mapper operates on a `LocaleData` object that contains all the necessary information about a locale:

```typescript
type LocaleData = {
  locale: LocalesValues; // Current locale code (e.g., 'en', 'fr')
  defaultLocale: LocalesValues; // Default locale code
  isDefault: boolean; // Whether this is the default locale
  locales: LocalesValues[]; // Array of all available locales
  urlPrefix: string; // URL prefix for this locale (e.g., '/fr' or '')
};
```

The mapper functions automatically generate this data for each locale in your configuration, taking into account:

- Your configured list of locales
- The default locale setting
- Whether the default locale should be prefixed in URLs

## Core Functions

### `localeMap`

Transforms each locale into a single object using a mapper function.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Example: Creating route objects**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Result:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Similar to `localeMap`, but the mapper function returns an array of objects that gets flattened into a single array.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Example: Creating multiple routes per locale**

```typescript
import { localeFlatMap } from "intlayer";

const routes = localeFlatMap((localizedData) => [
  {
    path: localizedData.urlPrefix,
    name: localizedData.locale,
    isDefault: localizedData.isDefault,
  },
  {
    path: `${localizedData.urlPrefix}/about`,
    name: `${localizedData.locale}-about`,
    isDefault: localizedData.isDefault,
  },
]);

// Result:
// [
//   { path: '/', name: 'en', isDefault: true },
//   { path: '/about', name: 'en-about', isDefault: true },
//   { path: '/fr', name: 'fr', isDefault: false },
//   { path: '/fr/about', name: 'fr-about', isDefault: false },
//   { path: '/es', name: 'es', isDefault: false },
//   { path: '/es/about', name: 'es-about', isDefault: false }
// ]
```

### `localeRecord`

Creates a record object where each locale is a key mapping to a value transformed by the mapper function.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Example: Loading translation files**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Result:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Setting Up Locale Mapper

The Locale Mapper automatically uses your Intlayer configuration, but you can override the defaults by passing parameters:

### Using Default Configuration

```typescript
import { localeMap } from "intlayer";

// Uses configuration from intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Overriding Configuration

```typescript
import { localeMap } from "intlayer";

// Override locales and default locale
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Custom locales
  "en", // Custom default locale
  true // Prefix default locale in URLs
);
```

## Advanced Usage Examples

### Creating Navigation Menus

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Generating Sitemap Data

```typescript
import { localeFlatMap } from "intlayer";

const sitemapUrls = localeFlatMap((data) => [
  {
    url: `${data.urlPrefix}/`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: data.isDefault ? 1.0 : 0.8,
  },
  {
    url: `${data.urlPrefix}/about`,
    lastmod: new Date().toISOString(),
    changefreq: "monthly",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Dynamic Translation Loading

```typescript
import { localeRecord } from "intlayer";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr",
  },
}));
```

## Configuration Integration

The Locale Mapper seamlessly integrates with your Intlayer configuration:

- **Locales**: Automatically uses `configuration.internationalization.locales`
- **Default Locale**: Uses `configuration.internationalization.defaultLocale`
- **URL Prefixing**: Respects `configuration.middleware.prefixDefault`

This ensures consistency across your application and reduces configuration duplication.

## Doc History

| Version | Date       | Changes                         |
| ------- | ---------- | ------------------------------- |
| 5.7.2   | 2025-07-27 | Add locale mapper documentation |
