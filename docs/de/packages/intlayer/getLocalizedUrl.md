# Dokumentation: `getLocalizedUrl` Funktion in `intlayer`

## Beschreibung:

Die `getLocalizedUrl` Funktion erzeugt eine lokalisierte URL, indem sie die angegebene URL mit der angegebenen Locale präfixiert. Sie behandelt sowohl absolute als auch relative URLs und stellt sicher, dass das richtige Locale-Präfix basierend auf der Konfiguration angewendet wird.

---

## Parameter:

- `url: string`

  - **Beschreibung**: Der ursprüngliche URL-String, der mit einer Locale präfixiert werden soll.
  - **Typ**: `string`

- `currentLocale: Locales`

  - **Beschreibung**: Die aktuelle Locale, für die die URL lokalisiert wird.
  - **Typ**: `Locales`

- `locales: Locales[]`

  - **Beschreibung**: Optionale Array von unterstützten Locales. Standardmäßig werden die konfigurierten Locales im Projekt bereitgestellt.
  - **Typ**: `Locales[]`
  - **Standard**: [`Projekkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Beschreibung**: Die Standardlocale für die Anwendung. Standardmäßig wird die konfigurierte Standardlocale im Projekt bereitgestellt.
  - **Typ**: `Locales`
  - **Standard**: [`Projekkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Beschreibung**: Ob die URL für die Standardlocale präfixiert werden soll. Standardmäßig wird der konfigurierte Wert im Projekt bereitgestellt.
  - **Typ**: `boolean`
  - **Standard**: [`Projekkonfiguration`](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md#middleware)

### Rückgabewert:

- **Typ**: `string`
- **Beschreibung**: Die lokalisierte URL für die angegebene Locale.

---

## Beispielverwendung:

### Relative URLs:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Ausgabe: "/fr/about" für die französische Locale
// Ausgabe: "/about" für die Standardlocale (Englisch)
```

### Absolute URLs:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standardlocale
  false // Standardlocale präfixieren
); // Ausgabe: "https://example.com/fr/about" für die Französische

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standardlocale
  false // Standardlocale präfixieren
); // Ausgabe: "https://example.com/about" für das Englische

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH, // Standardlocale
  true // Standardlocale präfixieren
); // Ausgabe: "https://example.com/en/about" für das Englische
```

### Nicht unterstützte Locale:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Aktuelle Locale
  [Locales.ENGLISH, Locales.FRENCH], // Unterstützte Locales
  Locales.ENGLISH // Standardlocale
); // Ausgabe: "/about" (kein Präfix für nicht unterstützte Locale angewendet)
```

---

## Randfälle:

- **Kein Locale-Segment:**

  - Wenn die URL kein Locale-Segment enthält, fügt die Funktion sicher das geeignete Locale-Präfix hinzu.

- **Standardlocale:**

  - Wenn `prefixDefault` `false` ist, fügt die Funktion der URL für die Standardlocale kein Präfix hinzu.

- **Nicht unterstützte Locales:**
  - Für Locales, die nicht in `locales` aufgeführt sind, fügt die Funktion kein Präfix hinzu.

---

## Verwendung in Anwendungen:

In einer mehrsprachigen Anwendung ist die Konfiguration der Internationalisierungseinstellungen mit `locales` und `defaultLocale` entscheidend, um sicherzustellen, dass die korrekte Sprache angezeigt wird. Nachfolgend ein Beispiel, wie `getLocalizedUrl` in einem Anwendungsszenario verwendet werden kann:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguration für unterstützte Locales und Standardlocale
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

Die obige Konfiguration stellt sicher, dass die Anwendung `ENGLISH`, `FRENCH` und `SPANISH` als unterstützte Sprachen erkennt und `ENGLISH` als fallback-Sprache verwendet.

Mit dieser Konfiguration kann die Funktion `getLocalizedUrl` dynamisch lokalisierte URLs basierend auf den Sprachpräferenzen des Benutzers generieren:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Ausgabe: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Ausgabe: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Ausgabe: "/about"
```

Durch die Integration von `getLocalizedUrl` können Entwickler konsistente URL-Strukturen in mehreren Sprachen aufrechterhalten, was sowohl die Benutzererfahrung als auch die SEO verbessert.
