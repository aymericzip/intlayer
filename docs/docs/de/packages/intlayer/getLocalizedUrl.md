---
docName: package__intlayer__getLocalizedUrl
url: https://intlayer.org/doc/packages/intlayer/getLocalizedUrl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocalizedUrl Funktionsdokumentation | intlayer
description: Siehe, wie die Funktion getLocalizedUrl im intlayer-Paket verwendet wird
keywords:
  - getLocalizedUrl
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# Dokumentation: `getLocalizedUrl` Funktion in `intlayer`

## Beschreibung

Die Funktion `getLocalizedUrl` erzeugt eine lokalisierte URL, indem sie die angegebene URL mit dem spezifizierten Locale voranstellt. Sie verarbeitet sowohl absolute als auch relative URLs und stellt sicher, dass das korrekte Locale-Präfix basierend auf der Konfiguration angewendet wird.

---

## Parameter

- `url: string`

  - **Beschreibung**: Die ursprüngliche URL-Zeichenkette, die mit einem Locale-Präfix versehen werden soll.
  - **Typ**: `string`

- `currentLocale: Locales`

  - **Beschreibung**: Das aktuelle Locale, für das die URL lokalisiert wird.
  - **Typ**: `Locales`

- `locales: Locales[]`

  - **Beschreibung**: Optionales Array unterstützter Locales. Standardmäßig werden die im Projekt konfigurierten Locales verwendet.
  - **Typ**: `Locales[]`
  - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Beschreibung**: Das Standard-Locale für die Anwendung. Standardmäßig wird das konfigurierte Standard-Locale im Projekt verwendet.
  - **Typ**: `Locales`
  - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Beschreibung**: Ob die URL für das Standard-Locale mit einem Präfix versehen werden soll. Standardmäßig wird der konfigurierte Wert im Projekt verwendet.
  - **Typ**: `boolean`
  - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md#middleware)

### Rückgabewert

- **Typ**: `string`
- **Beschreibung**: Die lokalisierte URL für das angegebene Locale.

---

## Beispielhafte Verwendung

### Relative URLs

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Ausgabe: "/fr/about" für das französische Locale
// Ausgabe: "/about" für das Standard-Locale (Englisch)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Ausgabe: "/fr/about" für das französische Locale
// Ausgabe: "/about" für das Standard-Locale (Englisch)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Ausgabe: "/fr/about" für das französische Locale
// Ausgabe: "/about" für das Standard-Locale (Englisch)
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Ausgabe: "/fr/about" für das französische Locale
// Ausgabe: "/about" für das Standard-Locale (Englisch)
```

### Absolute URLs

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Aktuelles Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standard-Locale
  false // Standard-Locale voranstellen
); // Ausgabe: "https://example.com/fr/about" für das französische Locale

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktuelles Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standard-Locale
  false // Standard-Locale voranstellen
); // Ausgabe: "https://example.com/about" für das englische Locale

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktuelles Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standard-Locale
  true // Standard-Locale voranstellen
); // Ausgabe: "https://example.com/en/about" für das englische Locale
```

### Nicht unterstütztes Locale

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Aktuelles Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH // Standard-Locale
); // Ausgabe: "/about" (kein Präfix für nicht unterstütztes Locale angewendet)
```

---

## Randfälle

- **Kein Locale-Segment:**

  - Wenn die URL kein Locale-Segment enthält, fügt die Funktion sicher das passende Locale-Präfix hinzu.

- **Standard-Locale:**

  - Wenn `prefixDefault` auf `false` gesetzt ist, wird für das Standard-Locale kein Präfix vorangestellt.

- **Nicht unterstützte Locales:**
  - Für Locales, die nicht in `locales` aufgeführt sind, wird kein Präfix angewendet.

---

## Verwendung in Anwendungen

In einer mehrsprachigen Anwendung ist die Konfiguration der Internationalisierungseinstellungen mit `locales` und `defaultLocale` entscheidend, um sicherzustellen, dass die richtige Sprache angezeigt wird. Nachfolgend ein Beispiel, wie `getLocalizedUrl` in einer Anwendungs-Konfiguration verwendet werden kann:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguration für unterstützte Locales und Standard-Locale
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

Mit dieser Konfiguration kann die Funktion `getLocalizedUrl` dynamisch lokalisierte URLs basierend auf der Sprachpräferenz des Benutzers generieren:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Ausgabe: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Ausgabe: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Ausgabe: "/about"
```

Durch die Integration von `getLocalizedUrl` können Entwickler konsistente URL-Strukturen über mehrere Sprachen hinweg beibehalten, was sowohl die Benutzererfahrung als auch die SEO verbessert.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Historie initialisiert
