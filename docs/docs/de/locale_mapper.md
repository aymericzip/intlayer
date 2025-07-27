---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Locale Mapper
description: Entdecken Sie, wie der Locale Mapper funktioniert. Sehen Sie die Schritte, die der Locale Mapper in Ihrer Anwendung verwendet. Erfahren Sie, was die verschiedenen Pakete tun.
keywords:
  - Locale Mapper
  - Erste Schritte
  - Intlayer
  - Anwendung
  - Pakete
slugs:
  - doc
  - locale-mapper
---

# Locale Mapper

Der Locale Mapper ist ein leistungsstarkes Werkzeug, das Ihnen hilft, mit Internationalisierungsdaten in Ihrer Intlayer-Anwendung zu arbeiten. Er bietet drei Hauptfunktionen, um locale-spezifische Daten zu transformieren und zu organisieren: `localeMap`, `localeFlatMap` und `localeRecord`.

## Wie der Locale Mapper funktioniert

Der Locale Mapper arbeitet mit einem `LocaleData`-Objekt, das alle notwendigen Informationen über eine Locale enthält:

```typescript
type LocaleData = {
  locale: LocalesValues; // Aktueller Locale-Code (z.B. 'en', 'fr')
  defaultLocale: LocalesValues; // Standard-Locale-Code
  isDefault: boolean; // Ob dies die Standard-Locale ist
  locales: LocalesValues[]; // Array aller verfügbaren Locales
  urlPrefix: string; // URL-Präfix für diese Locale (z.B. '/fr' oder '')
};
```

Die Mapper-Funktionen generieren diese Daten automatisch für jede Locale in Ihrer Konfiguration unter Berücksichtigung von:

- Ihrer konfigurierten Locales-Liste
- Der Einstellung der Standard-Locale
- Ob die Standard-Locale in URLs mit einem Präfix versehen werden soll

## Kernfunktionen

### `localeMap`

Transformiert jede Locale in ein einzelnes Objekt mithilfe einer Mapper-Funktion.

```typescript
localeMap<T>(
  mapper: (locale: LocaleData) => T,
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Beispiel: Erstellen von Routenobjekten**

```typescript
import { localeMap } from "@intlayer/core";

const routes = localeMap((localizedData) => ({
  path: localizedData.urlPrefix,
  name: localizedData.locale,
  isDefault: localizedData.isDefault,
  locales: localizedData.locales,
  defaultLocale: localizedData.defaultLocale,
}));

// Ergebnis:
// [
//   { path: '/', name: 'en', isDefault: true, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/fr', name: 'fr', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' },
//   { path: '/es', name: 'es', isDefault: false, locales: ['en', 'fr', 'es'], defaultLocale: 'en' }
// ]
```

### `localeFlatMap`

Ähnlich wie `localeMap`, aber die Mapper-Funktion gibt ein Array von Objekten zurück, das zu einem einzigen Array zusammengeführt wird.

```typescript
localeFlatMap<T>(
  mapper: (locale: LocaleData) => T[],
  locales?: LocalesValues[],
  defaultLocale?: LocalesValues,
  prefixDefault?: boolean
): T[]
```

**Beispiel: Erstellen mehrerer Routen pro Locale**

```typescript
import { localeFlatMap } from "@intlayer/core";

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

// Ergebnis:
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

Erstellt ein Record-Objekt, bei dem jede Locale ein Schlüssel ist, der auf einen durch die Mapper-Funktion transformierten Wert abbildet.

```typescript
localeRecord<T>(
  mapper: (locale: LocaleData) => T,
  locales?: Locales[],
  defaultLocale?: Locales,
  prefixDefault?: boolean
): Record<Locales, T>
```

**Beispiel: Laden von Übersetzungsdateien**

```typescript
import { localeRecord } from "@intlayer/core";

const translations = localeRecord(({ locale }) =>
  require(`./translations/${locale}.json`)
);

// Ergebnis:
// {
//   en: { welcome: 'Welcome', hello: 'Hello' },
//   fr: { welcome: 'Bienvenue', hello: 'Bonjour' },
//   es: { welcome: 'Bienvenido', hello: 'Hola' }
// }
```

## Einrichtung des Locale Mappers

Der Locale Mapper verwendet automatisch Ihre Intlayer-Konfiguration, aber Sie können die Standardwerte durch Übergabe von Parametern überschreiben:

### Verwendung der Standardkonfiguration

```typescript
import { localeMap } from "@intlayer/core";

// Verwendet die Konfiguration aus intlayer.config.ts
const routes = localeMap((data) => ({
  path: data.urlPrefix,
  locale: data.locale,
}));
```

### Überschreiben der Konfiguration

```typescript
import { localeMap } from "@intlayer/core";

// Überschreibt Locales und Standard-Locale
const customRoutes = localeMap(
  (data) => ({ path: data.urlPrefix, locale: data.locale }),
  ["en", "fr", "de"], // Benutzerdefinierte Sprachen
  "en", // Benutzerdefinierte Standardsprache
  true // Standard-Sprache in URLs voranstellen
);
```

## Erweiterte Anwendungsbeispiele

### Erstellen von Navigationsmenüs

```typescript
import { localeMap } from "@intlayer/core";

const navigationItems = localeMap((data) => ({
  label: data.locale.toUpperCase(),
  href: data.urlPrefix || "/",
  isActive: data.isDefault,
  flag: `/flags/${data.locale}.svg`,
}));
```

### Generieren von Sitemap-Daten

```typescript
import { localeFlatMap } from "@intlayer/core";

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
    changefreq: "monatlich",
    priority: data.isDefault ? 0.8 : 0.6,
  },
]);
```

### Dynamisches Laden von Übersetzungen

```typescript
import { localeRecord } from "@intlayer/core";

const translationModules = localeRecord(({ locale }) => ({
  messages: import(`./locales/${locale}/messages.json`),
  validation: import(`./locales/${locale}/validation.json`),
  metadata: {
    locale,
    direction: ["ar", "he", "fa"].includes(locale) ? "rtl" : "ltr", // Schreibrichtung: rechts-nach-links für bestimmte Sprachen
  },
}));
```

## Konfigurationsintegration

Der Locale Mapper integriert sich nahtlos in Ihre Intlayer-Konfiguration:

- **Locales**: Verwendet automatisch `configuration.internationalization.locales`
- **Standard-Sprache**: Verwendet `configuration.internationalization.defaultLocale`
- **URL-Präfixierung**: Berücksichtigt `configuration.middleware.prefixDefault`

Dies gewährleistet Konsistenz in Ihrer Anwendung und reduziert die Duplizierung von Konfigurationen.

## Dokumentationshistorie

| Version | Datum      | Änderungen                                     |
| ------- | ---------- | ---------------------------------------------- |
| 5.7.2   | 2025-07-27 | Hinzufügen der Dokumentation zum Locale Mapper |
