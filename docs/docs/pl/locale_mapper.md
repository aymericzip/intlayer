---
createdAt: 2025-07-27
updatedAt: 2025-07-27
title: Maper Lokalizacji
description: Odkryj, jak działa Maper Lokalizacji. Zobacz kroki używane przez Maper Lokalizacji w Twojej aplikacji. Zobacz, co robią różne pakiety.
keywords:
  - Maper Lokalizacji
  - Pierwsze kroki
  - Intlayer
  - Aplikacja
  - Pakiety
slugs:
  - doc
  - locale-mapper
history:
  - version: 5.7.2
    date: 2025-07-27
    changes: Dodano dokumentację mapera lokalizacji
---

# Maper Lokalizacji

Maper Lokalizacji to potężne narzędzie, które pomaga w pracy z danymi internacjonalizacyjnymi w Twojej aplikacji Intlayer. Udostępnia trzy główne funkcje do transformacji i organizacji danych specyficznych dla lokalizacji: `localeMap`, `localeFlatMap` oraz `localeRecord`.

## Jak działa Maper Lokalizacji

Maper Lokalizacji działa na obiekcie `LocaleData`, który zawiera wszystkie niezbędne informacje o lokalizacji:

```typescript
type LocaleData = {
  locale: LocalesValues; // Aktualny kod lokalizacji (np. 'en', 'fr')
  defaultLocale: LocalesValues; // Domyślny kod lokalizacji
  isDefault: boolean; // Czy jest to domyślna lokalizacja
  locales: LocalesValues[]; // Tablica wszystkich dostępnych lokalizacji
  urlPrefix: string; // Prefiks URL dla tej lokalizacji (np. '/fr' lub '')
};
```

Funkcje mapera automatycznie generują te dane dla każdej lokalizacji w Twojej konfiguracji, uwzględniając:

- Twoją skonfigurowaną listę lokalizacji
- Ustawienie domyślnej lokalizacji
- Czy domyślna lokalizacja powinna mieć prefiks w URL

## Główne funkcje

### `localeMap`

Przekształca każdą lokalizację w pojedynczy obiekt za pomocą funkcji mapującej.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Przykład: Tworzenie obiektów tras**

```typescript
import { localeMap } from "intlayer";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Wynik:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Podobne do `localeMap`, ale funkcja mapująca zwraca tablicę obiektów, która jest spłaszczana do pojedynczej tablicy.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Przykład: Tworzenie wielu tras dla każdej lokalizacji**

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

// Wynik:
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

Tworzy obiekt rekord, gdzie każdy locale jest kluczem mapującym do wartości przekształconej przez funkcję mapującą.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Przykład: Ładowanie plików tłumaczeń**

```typescript
import { localeRecord } from "intlayer";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Wynik:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Konfiguracja Locale Mapper

Locale Mapper automatycznie korzysta z Twojej konfiguracji Intlayer, ale możesz nadpisać domyślne ustawienia, przekazując parametry:

### Użycie domyślnej konfiguracji

```typescript
import { localeMap } from "intlayer";

// Korzysta z konfiguracji z intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Nadpisanie konfiguracji

```typescript
import { localeMap } from "intlayer";

// Nadpisanie locales i domyślnego locale
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Niestandardowe locales
  "en", // Niestandardowy domyślny locale
  true // Prefiksuj domyślny locale w URLach
);
```

## Zaawansowane przykłady użycia

### Tworzenie menu nawigacyjnych

```typescript
import { localeMap } from "intlayer";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Generowanie danych mapy witryny

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

### Dynamiczne ładowanie tłumaczeń

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

## Integracja konfiguracji

Locale Mapper bezproblemowo integruje się z Twoją konfiguracją Intlayer:

- **Locales**: Automatycznie używa `configuration.internationalization.locales`
- **Domyślny język**: Używa `configuration.internationalization.defaultLocale`
- **Prefiks URL**: Respektuje `configuration.middleware.prefixDefault`

Zapewnia to spójność w całej aplikacji i redukuje duplikację konfiguracji.
