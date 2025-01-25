# Dokumentation: `t` Funktion in `express-intlayer`

Die `t` Funktion im `express-intlayer` Paket ist das zentrale Werkzeug, um lokalisierte Antworten in Ihrer Express-Anwendung bereitzustellen. Sie vereinfacht die Internationalisierung (i18n), indem sie dynamisch Inhalte basierend auf der bevorzugten Sprache des Benutzers auswählt.

---

## Übersicht

Die `t` Funktion wird verwendet, um Übersetzungen für eine gegebene Reihe von Sprachen zu definieren und abzurufen. Sie bestimmt automatisch die passende Sprache, die zurückgegeben werden soll, basierend auf den Anfrageeinstellungen des Clients, wie dem `Accept-Language` Header. Wenn die bevorzugte Sprache nicht verfügbar ist, wird elegant auf die standardmäßige Sprache zurückgegriffen, die in Ihrer Konfiguration angegeben ist.

---

## Hauptmerkmale

- **Dynamische Lokalisierung**: Wählt automatisch die passendste Übersetzung für den Client aus.
- **Rückfall auf die Standardsprache**: Fällt auf eine Standardsprache zurück, falls die bevorzugte Sprache des Clients nicht verfügbar ist, um die Benutzererfahrung aufrechtzuerhalten.
- **Leichtgewichtig und Schnell**: Entwickelt für leistungsstarke Anwendungen, um minimalen Overhead sicherzustellen.
- **Unterstützung des strikten Modus**: Durchsetzung einer strikten Einhaltung der deklarierten Sprachen für zuverlässiges Verhalten.

---

## Funktionssignatur

```typescript
t(translations: Record<string, string>): string;
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Sprachcodes sind (z. B. `en`, `fr`, `es-MX`) und die Werte die entsprechenden übersetzten Strings sind.

### Rückgabewert

- Ein String, der den Inhalt in der bevorzugten Sprache des Clients darstellt.

---

## Laden des Internationalisierungs-Request-Handlers

Um sicherzustellen, dass die Internationalisierungsfunktionalität von `express-intlayer` korrekt funktioniert, **müssen** Sie die Internationalisierungs-Middleware zu Beginn Ihrer Express-Anwendung laden. Dies aktiviert die `t` Funktion und gewährleistet die ordnungsgemäße Behandlung der Sprachenerkennung und Übersetzung.

Platzieren Sie die `app.use(intlayer())` Middleware **vor allen Routen** in Ihrer Anwendung, um sicherzustellen, dass alle Routen von der Internationalisierung profitieren:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Internationalisierungs-Request-Handler laden
app.use(intlayer());

// Definieren Sie Ihre Routen nach dem Laden der Middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Internationalisierungs-Request-Handler laden
app.use(intlayer());

// Definieren Sie Ihre Routen nach dem Laden der Middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Internationalisierungs-Request-Handler laden
app.use(intlayer());

// Definieren Sie Ihre Routen nach dem Laden der Middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Warum ist dies erforderlich?

- **Sprachenerkennung**: Die `intlayer` Middleware verarbeitet eingehende Anfragen, um die bevorzugte Sprache des Benutzers basierend auf Headern, Cookies oder anderen konfigurierten Methoden zu erkennen.
- **Übersetzungskontext**: Stellt den erforderlichen Kontext für die `t` Funktion bereit, damit diese korrekt arbeitet und die Übersetzungen in der richtigen Sprache zurückgegeben werden.
- **Fehlerverhinderung**: Ohne diese Middleware führt die Verwendung der `t` Funktion zu Laufzeitfehlern, da die erforderlichen Sprachinformationen nicht verfügbar sein werden.

---

## Nutzung Beispiele

### Einfaches Beispiel

Lokalisierte Inhalte in verschiedenen Sprachen bereitstellen:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Client-Anfragen:**

- Ein Client mit `Accept-Language: fr` erhält `Bienvenue!`.
- Ein Client mit `Accept-Language: es` erhält `¡Bienvenido!`.
- Ein Client mit `Accept-Language: de` erhält `Welcome!` (Standardsprache).

### Fehlerbehandlung

Fehlermeldungen in mehreren Sprachen bereitstellen:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Verwendung von Locale-Varianten

Übersetzungen für sprachspezifische Varianten angeben:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Fortgeschrittene Themen

### Rückfallmechanismus

Wenn eine bevorzugte Sprache nicht verfügbar ist, wird die `t` Funktion auf die standardmäßige Sprache zurückgreifen, die in der Konfiguration definiert ist:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
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

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
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

Beispielsweise:

- Wenn `defaultLocale` `Locales.CHINESE` ist und ein Client `Locales.DUTCH` anfordert, wird die zurückgegebene Übersetzung auf den Wert von `Locales.CHINESE` zurückfallen.
- Wenn `defaultLocale` nicht definiert ist, wird die `t` Funktion auf den Wert von `Locales.ENGLISH` zurückfallen.

---

### Durchsetzung des strikten Modus

Konfigurieren Sie die `t` Funktion, um eine strikte Einhaltung der deklarierten Sprachen durchzusetzen:

| Modus           | Verhalten                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| `strict`        | Alle deklarierten Sprachen müssen Übersetzungen bereitstellen. Fehlende Sprachen verursachen Fehler.            |
| `required_only` | Deklarierte Sprachen müssen Übersetzungen haben. Fehlende Sprachen lösen Warnungen aus, werden aber akzeptiert. |
| `loose`         | Jede vorhandene Sprache wird akzeptiert, auch wenn sie nicht deklariert ist.                                    |

Konfigurationsbeispiel:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ihre bestehende Konfiguration
  internationalization: {
    // ... Ihre bestehende Internationalisierungskonfiguration
    strictMode: "strict", // Strikten Modus durchsetzen
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ihre bestehende Konfiguration
  internationalization: {
    // ... Ihre bestehende Internationalisierungskonfiguration
    strictMode: "strict", // Strikten Modus durchsetzen
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Ihre bestehende Konfiguration
  internationalization: {
    // ... Ihre bestehende Internationalisierungskonfiguration
    strictMode: "strict", // Strikten Modus durchsetzen
  },
};

module.exports = config;
```

---

### TypeScript-Integration

Die `t` Funktion ist typensicher, wenn sie mit TypeScript verwendet wird. Definieren Sie ein typensicheres Übersetzungsobjekt:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Häufige Fehler und Fehlersuche

| Problem                         | Ursache                                     | Lösung                                                                           |
| ------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------- |
| `t` Funktion funktioniert nicht | Middleware nicht geladen                    | Stellen Sie sicher, dass `app.use(intlayer())` vor den Routen hinzugefügt wurde. |
| Fehlende Übersetzungen-Fehler   | Strikter Modus aktiviert ohne alle Sprachen | Stellen Sie alle erforderlichen Übersetzungen bereit.                            |

---

## Tipps für eine effektive Nutzung

1. **Übersetzungen zentralisieren**: Verwenden Sie ein zentrales Modul oder JSON-Dateien zur Verwaltung von Übersetzungen, um die Wartbarkeit zu verbessern.
2. **Übersetzungen validieren**: Stellen Sie sicher, dass jede Sprachvariante eine entsprechende Übersetzung hat, um unnötiges Zurückfallen zu vermeiden.
3. **Kombinieren mit Frontend-i18n**: Synchronisieren Sie mit der Internationalisierung des Frontends für eine nahtlose Benutzererfahrung in der gesamten App.
4. **Leistungsbewertung**: Testen Sie die Antwortzeiten Ihrer App, wenn Sie Übersetzungen hinzufügen, um einen minimalen Einfluss zu gewährleisten.

---

## Fazit

Die `t` Funktion ist ein leistungsstarkes Tool für die Backend-Internationalisierung. Durch ihre effektive Nutzung können Sie eine inklusivere und benutzerfreundlichere Anwendung für ein globales Publikum erstellen. Für fortgeschrittene Nutzung und detaillierte Konfigurationsoptionen verweisen Sie auf die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).
