---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Locale Mapper
description: Découvrez comment fonctionne Locale Mapper. Voyez les étapes utilisées par Locale Mapper dans votre application. Découvrez ce que font les différents packages.
keywords:
  - Locale Mapper
  - Démarrer
  - Intlayer
  - Application
  - Packages
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Ajout de la documentation du mappage des locales
---

# Locale Mapper

Locale Mapper est un utilitaire puissant qui vous aide à travailler avec les données d'internationalisation dans votre application Intlayer. Il fournit trois fonctions principales pour transformer et organiser les données spécifiques à une locale : `localeMap`, `localeFlatMap` et `localeRecord`.

## Comment fonctionne Locale Mapper

Locale Mapper opère sur un objet `LocaleData` qui contient toutes les informations nécessaires sur une locale :

```typescript
type LocaleData = {
  locale: LocalesValues; // Code de la locale actuelle (ex. : 'en', 'fr')
  defaultLocale: LocalesValues; // Code de la locale par défaut
  isDefault: boolean; // Indique si c'est la locale par défaut
  locales: LocalesValues[]; // Tableau de toutes les locales disponibles
  urlPrefix: string; // Préfixe URL pour cette locale (ex. : '/fr' ou '')
};
```

Les fonctions du mapper génèrent automatiquement ces données pour chaque locale dans votre configuration, en tenant compte de :

- Votre liste de locales configurées
- La locale par défaut définie
- Si la locale par défaut doit être préfixée dans les URLs

## Fonctions principales

### `localeMap`

Transforme chaque locale en un objet unique en utilisant une fonction de mapping.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Exemple : Création d'objets de routes**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Résultat :
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Semblable à `localeMap`, mais la fonction de mappage retourne un tableau d'objets qui est aplati en un seul tableau.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Exemple : Création de plusieurs routes par locale**

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

// Résultat :
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

Crée un objet record où chaque locale est une clé mappée à une valeur transformée par la fonction de mappage.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Exemple : Chargement des fichiers de traduction**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Résultat :
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Configuration du Locale Mapper

Le Locale Mapper utilise automatiquement votre configuration Intlayer, mais vous pouvez remplacer les valeurs par défaut en passant des paramètres :

### Utilisation de la configuration par défaut

```typescript
import { localeMap } from "intlayer";

// Utilise la configuration de intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Surcharge de la configuration

```typescript
import { localeMap } from "intlayer";

// Remplace les locales et la locale par défaut
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Langues personnalisées
  "en", // Langue par défaut personnalisée
  true // Préfixer la langue par défaut dans les URLs
);
```

## Exemples d'utilisation avancée

### Création de menus de navigation

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Génération des données du sitemap

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
    changefreq: "mensuel",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Chargement dynamique des traductions

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

## Intégration à la configuration

Le Locale Mapper s'intègre parfaitement à votre configuration Intlayer :

- **Locales** : Utilise automatiquement `configuration.internationalization.locales`
- **Langue par défaut** : Utilise `configuration.internationalization.defaultLocale`
- **Préfixage des URLs** : Respecte `configuration.middleware.prefixDefault`

Cela garantit la cohérence dans toute votre application et réduit la duplication de la configuration.
