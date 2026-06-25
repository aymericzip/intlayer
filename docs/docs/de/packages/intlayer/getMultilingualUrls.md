---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getMultilingualUrls Funktionsdokumentation | intlayer
description: Siehe, wie die Funktion getMultilingualUrls für das intlayer-Paket verwendet wird
keywords:
  - getMultilingualUrls
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
author: aymericzip
---

# Dokumentation: `getMultilingualUrls` Funktion in `intlayer`

## Beschreibung

Die `getMultilingualUrls`-Funktion generiert eine Zuordnung mehrsprachiger URLs, indem sie die angegebene URL mit jedem unterstützten Locale voranstellt. Sie kann sowohl absolute als auch relative URLs verarbeiten und wendet das entsprechende Locale-Präfix basierend auf der bereitgestellten Konfiguration oder den Standardeinstellungen an.

**Wichtige Funktionen:**

- Nur 1 Parameter ist erforderlich: `url`
- Optionales `options`-Objekt mit `locales`, `defaultLocale` und `mode`
- Verwendet die Internationalisierungskonfiguration Ihres Projekts als Standardeinstellungen
- Unterstützt mehrere Routing-Modi: `prefix-no-default`, `prefix-all`, `no-prefix` und `search-params`
- Gibt ein Zuordnungsobjekt mit allen Locales als Schlüssel und ihren entsprechenden URLs als Werte zurück

---

## Beschreibung

Die Funktion `getMultilingualUrls` erzeugt eine Zuordnung mehrsprachiger URLs, indem sie die gegebene URL mit jedem unterstützten Gebietsschema (Locale) voranstellt. Sie kann sowohl absolute als auch relative URLs verarbeiten und wendet das entsprechende Gebietsschema-Präfix basierend auf der bereitgestellten Konfiguration oder den Standardwerten an.

---

## Parameter

## Parameter

- `url: string`
  - **Beschreibung**: Der ursprüngliche URL-String, der mit Gebietsschemata vorangestellt werden soll.
  - **Typ**: `string`

- `locales: Locales[]`
  - **Beschreibung**: Optionale Liste der unterstützten Gebietsschemata. Standardmäßig die im Projekt konfigurierten Gebietsschemata.
  - **Typ**: `Locales[]`
  - **Standard**: `localesDefault`

- `defaultLocale: Locales`
  - **Beschreibung**: Das Standardgebietsschema für die Anwendung. Standardmäßig das im Projekt konfigurierte Standardgebietsschema.
  - **Typ**: `Locales`
  - **Standard**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Beschreibung**: Ob das Standard-Gebietsschema vorangestellt werden soll. Standardmäßig der im Projekt konfigurierte Wert.
  - **Typ**: `boolean`
  - **Standard**: `prefixDefaultDefault`

### Optionale Parameter

- `options?: object`
  - **Description**: Konfigurationsobjekt für das URL-Lokalisierungsverhalten.
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.locales?: Locales[]`
    - **Description**: Array von unterstützten Locales. Falls nicht angegeben, werden die konfigurierten Locales aus Ihrer Projektkonfiguration verwendet.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Das Standard-Locale für die Anwendung. Falls nicht angegeben, wird das konfigurierte Standard-Locale aus Ihrer Projektkonfiguration verwendet.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Der URL-Routing-Modus für die Locale-Behandlung. Falls nicht angegeben, wird der konfigurierte Modus aus Ihrer Projektkonfiguration verwendet.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Kein Präfix für Standard-Locale, Präfix für alle anderen
      - `prefix-all`: Präfix für alle Locales einschließlich Standard
      - `no-prefix`: Kein Locale-Präfix in der URL
      - `search-params`: Abfrageparameter für Locale verwenden (z. B. `?locale=fr`)

### Rückgabewert

- **Typ**: `IConfigLocales<string>`
- **Beschreibung**: Ein Objekt, das jedes Gebietsschema seiner entsprechenden mehrsprachigen URL zuordnet.

---

## Beispielhafte Verwendung

### Grundlegende Verwendung (verwendet Projektkonfiguration)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Verwendet die Konfiguration Ihres Projekts für locales, defaultLocale und mode
getMultilingualUrls("/dashboard");
// Ausgabe (vorausgesetzt, die Projektkonfiguration hat en, fr mit mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Relative URLs

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Ausgabe: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Absolute URLs

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Ausgabe: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

### Verschiedene Routing-Modi

```typescript
// prefix-no-default: Kein Präfix für Standardsprache
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Ausgabe: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Präfix für alle Sprachen
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Ausgabe: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Kein Sprachpräfix in URLs
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Ausgabe: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Sprache als Query-Parameter
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Ausgabe: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
// }
```

---

## Randfälle

- **Kein Gebietsschema-Segment:**
  - Die Funktion entfernt jeglichen vorhandenen Sprachabschnitt aus der URL, bevor die mehrsprachigen Zuordnungen generiert werden.

- **Standard-Sprache:**
  - Wenn `prefixDefault` auf `false` gesetzt ist, wird die URL für die Standardsprache nicht mit einem Präfix versehen.

- **Nicht unterstützte Sprachen:**
  - Es werden nur die Sprachen berücksichtigt, die im `locales`-Array angegeben sind, um die URLs zu generieren.

---

## Verwendung in Anwendungen

In einer mehrsprachigen Anwendung ist die Konfiguration der Internationalisierungseinstellungen mit `locales` und `defaultLocale` entscheidend, um sicherzustellen, dass die richtige Sprache angezeigt wird. Nachfolgend ein Beispiel, wie `getMultilingualUrls` in einer Anwendungs-Konfiguration verwendet werden kann:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguration für unterstützte Sprachen und Standardsprache
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

Die obige Konfiguration stellt sicher, dass die Anwendung `ENGLISCH`, `FRANZÖSISCH` und `SPANISCH` als unterstützte Sprachen erkennt und `ENGLISCH` als Fallback-Sprache verwendet.

Mit dieser Konfiguration kann die Funktion `getMultilingualUrls` dynamisch mehrsprachige URL-Zuordnungen basierend auf den unterstützten Sprachen der Anwendung generieren:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Ausgabe:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Ausgabe:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Durch die Integration von `getMultilingualUrls` können Entwickler konsistente URL-Strukturen über mehrere Sprachen hinweg beibehalten, was sowohl die Benutzererfahrung als auch die SEO verbessert.
