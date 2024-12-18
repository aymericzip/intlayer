# Dokumentation: `getMultilingualUrls` Funktion in `intlayer`

## Beschreibung:

Die `getMultilingualUrls` Funktion erzeugt eine Zuordnung von mehrsprachigen URLs, indem sie die gegebene URL mit jedem unterstützten Locale präfixiert. Sie kann sowohl absolute als auch relative URLs verarbeiten und wendet das entsprechende Locale-Präfix basierend auf der bereitgestellten Konfiguration oder den Standards an.

---

## Parameter:

- `url: string`

  - **Beschreibung**: Der ursprüngliche URL-String, der mit den Locales präfixiert werden soll.
  - **Typ**: `string`

- `locales: Locales[]`

  - **Beschreibung**: optionale Array von unterstützten Locales. Standardmäßig werden die im Projekt konfigurierten Locales verwendet.
  - **Typ**: `Locales[]`
  - **Standard**: `localesDefault`

- `defaultLocale: Locales`

  - **Beschreibung**: Das Standard-Locale für die Anwendung. Standardmäßig wird das im Projekt konfigurierte Standard-Locale verwendet.
  - **Typ**: `Locales`
  - **Standard**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Beschreibung**: Ob das Standard-Locale präfixiert werden soll. Standardmäßig wird der konfigurierte Wert im Projekt verwendet.
  - **Typ**: `boolean`
  - **Standard**: `prefixDefaultDefault`

### Gibt zurück:

- **Typ**: `IConfigLocales<string>`
- **Beschreibung**: Ein Objekt, das jedes Locale seiner entsprechenden mehrsprachigen URL zuordnet.

---

## Beispielverwendung:

### Relative URLs:

```typescript
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

  - Die Funktion entfernt jedes vorhandene Locale-Segment aus der URL, bevor die mehrsprachigen Zuordnungen generiert werden.

- **Standard-Locale:**

  - Wenn `prefixDefault` `false` ist, wird die URL für das Standard-Locale nicht präfixiert.

- **Nicht unterstützte Locales:**
  - Nur die im `locales` Array bereitgestellten Locales werden zur Generierung der URLs berücksichtigt.

---

## Verwendung in Anwendungen:

In einer mehrsprachigen Anwendung ist die Konfiguration der Internationalisierungseinstellungen mit `locales` und `defaultLocale` entscheidend, um sicherzustellen, dass die richtige Sprache angezeigt wird. Nachfolgend ein Beispiel, wie `getMultilingualUrls` in einer Anwendungs-Setup verwendet werden kann:

```tsx
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
