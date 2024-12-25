# Dokumentation: `getConfiguration` Funktion in `intlayer`

## Beschreibung:

Die `getConfiguration` Funktion ruft die gesamte Konfiguration für die `intlayer` Anwendung ab, indem Umgebungsvariablen extrahiert werden. Diese Funktion bietet die Flexibilität, dieselbe Konfiguration sowohl auf der Client- als auch auf der Serverseite zu verwenden, was die Konsistenz innerhalb der Anwendung gewährleistet.

---

## Parameter:

Die Funktion benötigt keine Parameter. Stattdessen verwendet sie Umgebungsvariablen für die Konfiguration.

### Rückgabewerte:

- **Typ**: `IntlayerConfig`
- **Beschreibung**: Ein Objekt, das die vollständige Konfiguration für `intlayer` enthält. Die Konfiguration umfasst die folgenden Abschnitte:

  - `internationalization`: Einstellungen, die sich auf lokale und den strengen Modus beziehen.
  - `middleware`: Einstellungen, die sich auf URL- und Cookie-Management beziehen.
  - `content`: Einstellungen, die sich auf Inhaltsdateien, Verzeichnisse und Muster beziehen.
  - `editor`: Editor-spezifische Konfigurationen.

Siehe [Intlayer Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für weitere Details.

---

## Beispielverwendung:

### Abgerufen der vollständigen Konfiguration:

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Ausgabe:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Ausgabe:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Ausgabe:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extrahieren von `availableLocales` und `defaultLocale`:

Der Abschnitt `internationalization` der Konfiguration bietet locale-bezogene Einstellungen wie `locales` (verfügbare locales) und `defaultLocale` (Fallback-Sprache).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Beispielausgabe: ["en", "fr", "es"]
console.log(defaultLocale); // Beispielausgabe: "en"
console.log(cookieName); // Ausgabe: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Beispielausgabe: ["en", "fr", "es"]
console.log(defaultLocale); // Beispielausgabe: "en"
console.log(cookieName); // Ausgabe: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Beispielausgabe: ["en", "fr", "es"]
console.log(defaultLocale); // Beispielausgabe: "en"
console.log(cookieName); // Ausgabe: "INTLAYER_LOCALE"
```

## Hinweise:

- Stellen Sie sicher, dass alle erforderlichen Umgebungsvariablen korrekt gesetzt sind, bevor Sie diese Funktion aufrufen. Fehlende Variablen führen zu Fehlern während der Initialisierung.
- Diese Funktion kann sowohl auf der Client- als auch auf der Serverseite verwendet werden, was sie zu einem vielseitigen Werkzeug für das Management von Konfigurationen in einheitlicher Weise macht.

## Verwendung in Anwendungen:

Die `getConfiguration` Funktion ist ein grundlegendes Hilfsmittel zur Initialisierung und Verwaltung der Konfiguration einer `intlayer` Anwendung. Durch den Zugang zu Einstellungen wie locales, middleware und Inhaltsverzeichnissen gewährleistet sie Konsistenz und Skalierbarkeit in mehrsprachigen und content-gesteuerten Anwendungen.
