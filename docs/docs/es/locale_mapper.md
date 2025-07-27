---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Mapeador de Locales
description: Descubre cómo funciona el Mapeador de Locales. Ve los pasos que utiliza el Mapeador de Locales en tu aplicación. Descubre qué hacen los diferentes paquetes.
keywords:
  - Mapeador de Locales
  - Comenzar
  - Intlayer
  - Aplicación
  - Paquetes
slugs:
  - doc
  - mapeador-locales
---

# Mapeador de Locales

El Mapeador de Locales es una utilidad poderosa que te ayuda a trabajar con datos de internacionalización en tu aplicación Intlayer. Proporciona tres funciones principales para transformar y organizar datos específicos de cada locale: `localeMap`, `localeFlatMap` y `localeRecord`.

## Cómo Funciona el Mapeador de Locales

El Mapeador de Locales opera sobre un objeto `LocaleData` que contiene toda la información necesaria sobre un locale:

```typescript
type LocaleData = {
  locale: LocalesValues; // Código del locale actual (por ejemplo, 'en', 'fr')
  defaultLocale: LocalesValues; // Código del locale por defecto
  isDefault: boolean; // Indica si este es el locale por defecto
  locales: LocalesValues[]; // Array de todos los locales disponibles
  urlPrefix: string; // Prefijo de URL para este locale (por ejemplo, '/fr' o '')
};
```

Las funciones del mapeador generan automáticamente estos datos para cada locale en tu configuración, teniendo en cuenta:

- La lista de locales configurados
- La configuración del locale por defecto
- Si el locale por defecto debe tener prefijo en las URLs

## Funciones Principales

### `localeMap`

Transforma cada locale en un único objeto usando una función mapeadora.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Ejemplo: Creando objetos de rutas**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Resultado:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Similar a `localeMap`, pero la función mapper devuelve un arreglo de objetos que se aplanan en un solo arreglo.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Ejemplo: Creando múltiples rutas por cada locale**

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

// Resultado:
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

Crea un objeto tipo registro donde cada locale es una clave que mapea a un valor transformado por la función mapper.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Ejemplo: Cargando archivos de traducción**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

/// Resultado:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Configuración del Locale Mapper

El Locale Mapper utiliza automáticamente la configuración de Intlayer, pero puedes sobrescribir los valores predeterminados pasando parámetros:

### Usando la Configuración Predeterminada

```typescript
import { localeMap } from "intlayer";

// Usa la configuración de intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Sobrescribiendo la Configuración

```typescript
import { localeMap } from "intlayer";

// Sobrescribe locales y locale predeterminado
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Locales personalizadas
  "en", // Locale predeterminada personalizada
  true // Prefijar locale predeterminada en las URLs
);
```

## Ejemplos de Uso Avanzado

### Creación de Menús de Navegación

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Generación de Datos para Sitemap

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

### Carga Dinámica de Traducciones

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

## Integración de Configuración

El Locale Mapper se integra perfectamente con la configuración de Intlayer:

- **Locales**: Utiliza automáticamente `configuration.internationalization.locales`
- **Locale Predeterminada**: Usa `configuration.internationalization.defaultLocale`
- **Prefijo en URL**: Respeta `configuration.middleware.prefixDefault`

Esto garantiza la coherencia en toda su aplicación y reduce la duplicación de configuraciones.

## Historial de Documentación

| Versión | Fecha      | Cambios                                       |
| ------- | ---------- | --------------------------------------------- |
| 5.7.2   | 2025-07-27 | Añadida documentación del mapeador de locales |
