# Dokumentation: `getLocalizedUrl` Funktion in `intlayer`

## Beschreibung:

Die `getLocalizedUrl` Funktion generiert eine lokalisierte URL, indem sie die gegebene URL mit der angegebenen Locale präfixiert. Sie behandelt sowohl absolute als auch relative URLs und stellt sicher, dass das korrekte Locale-Präfix basierend auf der Konfiguration angewendet wird.

---

## Parameter:

- `url: string`

  - **Beschreibung**: Die originale URL-Zeichenfolge, die mit einer Locale präfixiert werden soll.
  - **Typ**: `string`

- `currentLocale: Locales`

  - **Beschreibung**: Die aktuelle Locale, für die die URL lokalisiert wird.
  - **Typ**: `Locales`

- `locales: Locales[]`

  - **Beschreibung**: Optionale Array von unterstützten Locales. Standardmäßig werden die konfigurierten Locales im Projekt bereitgestellt.
  - **Typ**: `Locales[]`
  - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Beschreibung**: Die Standard-Locale für die Anwendung. Standardmäßig wird die konfigurierte Standard-Locale im Projekt bereitgestellt.
  - **Typ**: `Locales`
  - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Beschreibung**: Ob die URL für die Standard-Locale präfixiert werden soll. Standardmäßig wird der konfigurierte Wert im Projekt bereitgestellt.
  - **Typ**: `boolean`
  - **Standard**: [`Projektkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#middleware)

### Gibt zurück:

- **Typ**: `string`
- **Beschreibung**: Die lokalisierte URL für die angegebene Locale.

---

## Beispielverwendung:

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

// Ausgabe: "/fr/about" für die französische Locale
// Ausgabe: "/about" für die Standard (englische) Locale
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

// Ausgabe: "/fr/about" für die französische Locale
// Ausgabe: "/about" für die Standard (englische) Locale
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

// Ausgabe: "/fr/about" für die französische Locale
// Ausgabe: "/about" für die Standard (englische) Locale
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

// Ausgabe: "/fr/about" für die französische Locale
// Ausgabe: "/about" für die Standard (englische) Locale
```

### Absolute URLs

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standard Locale
  false // Präfix Standard Locale
); // Ausgabe: "https://example.com/fr/about" für die französische

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standard Locale
  false // Präfix Standard Locale
); // Ausgabe: "https://example.com/about" für die englische

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standard Locale
  true // Präfix Standard Locale
); // Ausgabe: "https://example.com/en/about" für die englische
```

### Nicht unterstützte Locale:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH // Standard Locale
); // Ausgabe: "/about" (kein Präfix für nicht unterstützte Locale angewendet)
```

---

## Edge-Cases:

- **Kein Locale-Segment:**

  - Wenn die URL kein Locale-Segment enthält, präfixiert die Funktion sicher die geeignete Locale.

- **Standard-Locale:**

  - Wenn `prefixDefault` auf `false` eingestellt ist, fügt die Funktion der URL für die Standard-Locale kein Präfix hinzu.

- **Nicht unterstützte Locales:**
  - Für Locales, die nicht in `locales` aufgeführt sind, wendet die Funktion kein Präfix an.

---

## Verwendung in Anwendungen:

In einer mehrsprachigen Anwendung ist die Konfiguration der Internationalisierungseinstellungen mit `locales` und `defaultLocale` entscheidend, um sicherzustellen, dass die korrekte Sprache angezeigt wird. Unten ist ein Beispiel, wie `getLocalizedUrl` in einer Anwendungsanpassung verwendet werden kann:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguration für unterstützte Locales und Standard Locale
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

Die obige Konfiguration stellt sicher, dass die Anwendung `ENGLISH`, `FRENCH` und `SPANISH` als unterstützte Sprachen erkennt und `ENGLISH` als Fallback-Sprache verwendet.

Mit dieser Konfiguration kann die Funktion `getLocalizedUrl` dynamisch lokalisierte URLs basierend auf den Sprachpräferenzen des Benutzers generieren:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Ausgabe: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Ausgabe: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Ausgabe: "/about"
```

Durch die Integration von `getLocalizedUrl` können Entwickler konsistente URL-Strukturen in mehreren Sprachen aufrechterhalten, was sowohl die Benutzererfahrung als auch SEO verbessert.
