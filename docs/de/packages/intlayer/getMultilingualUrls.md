# Dokumentation: `getMultilingualUrls` Funktion in `intlayer`

## Beschreibung:

Die `getMultilingualUrls` Funktion erstellt eine Zuordnung von mehrsprachigen URLs, indem sie die gegebene URL mit jedem unterstützten Locale präfixiert. Sie kann sowohl absolute als auch relative URLs verarbeiten und wendet das entsprechende Locale-Präfix basierend auf der bereitgestellten Konfiguration oder den Standards an.

---

## Parameter:

- `url: string`

  - **Beschreibung**: Die originale URL-Zeichenfolge, die mit Locales präfixiert werden soll.
  - **Typ**: `string`

- `locales: Locales[]`

  - **Beschreibung**: Optionale Array von unterstützten Locales. Standardmäßig auf die konfigurierten Locales im Projekt eingestellt.
  - **Typ**: `Locales[]`
  - **Standard**: `localesDefault`

- `defaultLocale: Locales`

  - **Beschreibung**: Das Standard-Locale für die Anwendung. Standardmäßig auf das konfigurierte Standard-Locale im Projekt eingestellt.
  - **Typ**: `Locales`
  - **Standard**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Beschreibung**: Ob das Standard-Locale präfixiert werden soll. Standardmäßig auf den konfigurierten Wert im Projekt eingestellt.
  - **Typ**: `boolean`
  - **Standard**: `prefixDefaultDefault`

### Gibt zurück:

- **Typ**: `IConfigLocales<string>`
- **Beschreibung**: Ein Objekt, das jedem Locale die entsprechende mehrsprachige URL zuordnet.

---

## Beispiel Verwendung:

### Relative URLs:

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

### Absolute URLs:

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

## Randfälle:

- **Kein Locale-Segment:**

  - Die Funktion entfernt vorhandene Locale-Segmente aus der URL, bevor sie die mehrsprachigen Zuordnungen generiert.

- **Standard-Locale:**

  - Wenn `prefixDefault` auf `false` gesetzt ist, präfixiert die Funktion die URL für das Standard-Locale nicht.

- **Unterstützte Locales:**
  - Nur die im `locales` Array bereitgestellten Locales werden zur Generierung der URLs berücksichtigt.

---

## Verwendung in Anwendungen:

In einer mehrsprachigen Anwendung ist die Konfiguration der Internationalisierungseinstellungen mit `locales` und `defaultLocale` entscheidend, um sicherzustellen, dass die korrekte Sprache angezeigt wird. Unten finden Sie ein Beispiel, wie `getMultilingualUrls` in einer Anwendungseinrichtung verwendet werden kann:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguration für unterstützte Locales und das Standard-Locale
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

Mit dieser Konfiguration kann die Funktion `getMultilingualUrls` dynamisch mehrsprachige URL-Zuordnungen basierend auf den unterstützten Locales der Anwendung generieren:

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

Durch die Integration von `getMultilingualUrls` können Entwickler konsistente URL-Strukturen über mehrere Sprachen hinweg aufrechterhalten, was sowohl die Benutzererfahrung als auch die SEO verbessert.
