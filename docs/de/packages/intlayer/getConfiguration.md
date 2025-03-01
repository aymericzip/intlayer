# Dokumentation: `getConfiguration` Funktion in `intlayer`

## Beschreibung

Die Funktion `getConfiguration` ruft die gesamte Konfiguration für die `intlayer`-Anwendung ab, indem sie Umgebungsvariablen extrahiert. Diese Funktion bietet die Flexibilität, dieselbe Konfiguration sowohl auf der Client- als auch auf der Serverseite zu verwenden, um Konsistenz in der gesamten Anwendung zu gewährleisten.

---

## Parameter

Die Funktion nimmt keine Parameter entgegen. Stattdessen verwendet sie Umgebungsvariablen für die Konfiguration.

### Rückgabewerte

- **Typ**: `IntlayerConfig`
- **Beschreibung**: Ein Objekt, das die vollständige Konfiguration für `intlayer` enthält. Die Konfiguration umfasst die folgenden Abschnitte:

  - `internationalization`: Einstellungen zu Lokalisierungen und dem strikten Modus.
  - `middleware`: Einstellungen zu URL- und Cookie-Management.
  - `content`: Einstellungen zu Inhaltsdateien, Verzeichnissen und Mustern.
  - `editor`: Editor-spezifische Konfigurationen.

Siehe [Intlayer-Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für weitere Details.

---

## Beispielverwendung

### Abrufen der vollständigen Konfiguration

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

### Extrahieren von `availableLocales` und `defaultLocale`

Der Abschnitt `internationalization` der Konfiguration bietet lokalisierungsbezogene Einstellungen wie `locales` (verfügbare Lokalisierungen) und `defaultLocale` (Fallback-Sprache).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ausgabe Beispiel: ["en", "fr", "es"]
console.log(defaultLocale); // Ausgabe Beispiel: "en"
console.log(cookieName); // Ausgabe: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ausgabe Beispiel: ["en", "fr", "es"]
console.log(defaultLocale); // Ausgabe Beispiel: "en"
console.log(cookieName); // Ausgabe: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ausgabe Beispiel: ["en", "fr", "es"]
console.log(defaultLocale); // Ausgabe Beispiel: "en"
console.log(cookieName); // Ausgabe: "INTLAYER_LOCALE"
```

## Hinweise

- Stellen Sie sicher, dass alle erforderlichen Umgebungsvariablen korrekt gesetzt sind, bevor Sie diese Funktion aufrufen. Fehlende Variablen führen zu Fehlern während der Initialisierung.
- Diese Funktion kann sowohl auf der Client- als auch auf der Serverseite verwendet werden, was sie zu einem vielseitigen Werkzeug für die einheitliche Verwaltung von Konfigurationen macht.

## Verwendung in Anwendungen

Die Funktion `getConfiguration` ist ein grundlegendes Werkzeug zur Initialisierung und Verwaltung der Konfiguration einer `intlayer`-Anwendung. Durch den Zugriff auf Einstellungen wie Lokalisierungen, Middleware und Inhaltsverzeichnisse gewährleistet sie Konsistenz und Skalierbarkeit in mehrsprachigen und inhaltsgesteuerten Anwendungen.
