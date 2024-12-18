# Dokumentation: `getConfiguration` Funktion in `intlayer`

## Beschreibung:

Die `getConfiguration`-Funktion ruft die gesamte Konfiguration für die `intlayer`-Anwendung ab, indem sie Umgebungsvariablen extrahiert. Diese Funktion bietet die Flexibilität, dieselbe Konfiguration sowohl auf der Client- als auch auf der Serverseite zu verwenden, um Konsistenz in der Anwendung zu gewährleisten.

---

## Parameter:

Die Funktion akzeptiert keine Parameter. Stattdessen verwendet sie Umgebungsvariablen zur Konfiguration.

### Rückgabewerte:

- **Typ**: `IntlayerConfig`
- **Beschreibung**: Ein Objekt, das die vollständige Konfiguration für `intlayer` enthält. Die Konfiguration umfasst die folgenden Abschnitte:

  - `internationalization`: Einstellungen zu Locales und dem strengen Modus.
  - `middleware`: Einstellungen zur URL- und Cookie-Verwaltung.
  - `content`: Einstellungen zu Inhaltdateien, Verzeichnissen und Mustern.
  - `editor`: Editor-spezifische Konfigurationen.

Siehe [Intlayer Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für weitere Details.

---

## Beispielverwendung:

### Abrufen der vollständigen Konfiguration:

```typescript
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

### Extrahieren von `availableLocales` und `defaultLocale`:

Der Abschnitt `internationalization` der Konfiguration bietet locale-bezogene Einstellungen wie `locales` (verfügbare Locales) und `defaultLocale` (Fallback-Sprache).

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Ausgabe Beispiel: ["en", "fr", "es"]
console.log(defaultLocale); // Ausgabe Beispiel: "en"
console.log(cookieName); // Ausgabe: "INTLAYER_LOCALE"
```

## Hinweise:

- Stellen Sie sicher, dass alle erforderlichen Umgebungsvariablen korrekt gesetzt sind, bevor Sie diese Funktion aufrufen. Fehlende Variablen verursachen Fehler während der Initialisierung.
- Diese Funktion kann sowohl auf der Client- als auch auf der Serverseite verwendet werden, was sie zu einem vielseitigen Werkzeug für die Verwaltung von Konfigurationen in einheitlicher Weise macht.

## Verwendung in Anwendungen:

Die `getConfiguration`-Funktion ist ein grundlegendes Hilfsprogramm zum Initialisieren und Verwalten der Konfiguration einer `intlayer`-Anwendung. Durch den Zugriff auf Einstellungen wie Locales, Middleware und Inhaltsverzeichnisse gewährleistet sie Konsistenz und Skalierbarkeit in mehrsprachigen und inhaltsgetriebenen Anwendungen.
