# Dokumentation: `getMultilingualUrls` Funktion in `intlayer`

## Beschreibung

Die Funktion `getMultilingualUrls` generiert eine Zuordnung von mehrsprachigen URLs, indem sie die gegebene URL mit jedem unterstützten Gebietsschema (Locale) präfixiert. Sie kann sowohl absolute als auch relative URLs verarbeiten und wendet das entsprechende Gebietsschema-Präfix basierend auf der bereitgestellten Konfiguration oder den Standardwerten an.

---

## Parameter

- `url: string`

  - **Beschreibung**: Die ursprüngliche URL-Zeichenkette, die mit Gebietsschemata präfixiert werden soll.
  - **Typ**: `string`

- `locales: Locales[]`

  - **Beschreibung**: Optionale Liste der unterstützten Gebietsschemata. Standardmäßig werden die im Projekt konfigurierten Gebietsschemata verwendet.
  - **Typ**: `Locales[]`
  - **Standard**: `localesDefault`

- `defaultLocale: Locales`

  - **Beschreibung**: Das Standard-Gebietsschema für die Anwendung. Standardmäßig wird das im Projekt konfigurierte Standard-Gebietsschema verwendet.
  - **Typ**: `Locales`
  - **Standard**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Beschreibung**: Gibt an, ob das Standard-Gebietsschema präfixiert werden soll. Standardmäßig wird der im Projekt konfigurierte Wert verwendet.
  - **Typ**: `boolean`
  - **Standard**: `prefixDefaultDefault`

### Rückgabewerte

- **Typ**: `IConfigLocales<string>`
- **Beschreibung**: Ein Objekt, das jedes Gebietsschema seiner entsprechenden mehrsprachigen URL zuordnet.

---

## Beispielverwendung

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

  - Die Funktion entfernt vorhandene Gebietsschema-Segmente aus der URL, bevor die mehrsprachigen Zuordnungen generiert werden.

- **Standard-Gebietsschema:**

  - Wenn `prefixDefault` auf `false` gesetzt ist, wird die URL für das Standard-Gebietsschema nicht präfixiert.

- **Nicht unterstützte Gebietsschemata:**
  - Es werden nur die Gebietsschemata berücksichtigt, die im Array `locales` bereitgestellt werden.

---

## Verwendung in Anwendungen

In einer mehrsprachigen Anwendung ist die Konfiguration der Internationalisierungseinstellungen mit `locales` und `defaultLocale` entscheidend, um sicherzustellen, dass die richtige Sprache angezeigt wird. Unten finden Sie ein Beispiel, wie `getMultilingualUrls` in einer Anwendungskonfiguration verwendet werden kann:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguration für unterstützte Gebietsschemata und Standard-Gebietsschema
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

Mit dieser Konfiguration kann die Funktion `getMultilingualUrls` dynamisch mehrsprachige URL-Zuordnungen basierend auf den unterstützten Gebietsschemata der Anwendung generieren:

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
