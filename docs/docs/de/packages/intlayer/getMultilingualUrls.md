---
docName: package__intlayer__getMultilingualUrls
url: https://intlayer.org/doc/packages/intlayer/getMultilingualUrls
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getMultilingualUrls.md
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
---

# Dokumentation: `getMultilingualUrls` Funktion in `intlayer`

## Beschreibung

Die Funktion `getMultilingualUrls` erzeugt eine Zuordnung mehrsprachiger URLs, indem sie die gegebene URL mit jedem unterstützten Gebietsschema (Locale) voranstellt. Sie kann sowohl absolute als auch relative URLs verarbeiten und wendet das entsprechende Gebietsschema-Präfix basierend auf der bereitgestellten Konfiguration oder den Standardwerten an.

---

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

### Rückgabewert

- **Typ**: `IConfigLocales<string>`
- **Beschreibung**: Ein Objekt, das jedes Gebietsschema seiner entsprechenden mehrsprachigen URL zuordnet.

---

## Beispielhafte Verwendung

### Relative URLs

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

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

```tsx codeFormat="typescript"
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

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
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

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Historie initialisiert
