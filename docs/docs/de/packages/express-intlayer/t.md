---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Dokumentation der Funktion t | express-intlayer
description: Siehe, wie die Funktion t im Paket express-intlayer verwendet wird
keywords:
  - t
  - Übersetzung
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Dokumentation: `t` Funktion in `express-intlayer`

Die `t`-Funktion im `express-intlayer`-Paket ist das zentrale Werkzeug zur Bereitstellung lokalisierter Antworten in Ihrer Express-Anwendung. Sie vereinfacht die Internationalisierung (i18n), indem sie Inhalte dynamisch basierend auf der bevorzugten Sprache des Benutzers auswählt.

---

## Übersicht

Die `t`-Funktion wird verwendet, um Übersetzungen für eine bestimmte Menge von Sprachen zu definieren und abzurufen. Sie bestimmt automatisch die passende Sprache, die zurückgegeben wird, basierend auf den Einstellungen der Client-Anfrage, wie zum Beispiel dem `Accept-Language`-Header. Wenn die bevorzugte Sprache nicht verfügbar ist, fällt sie elegant auf die in Ihrer Konfiguration angegebene Standardsprache zurück.

---

## Hauptfunktionen

- **Dynamische Lokalisierung**: Wählt automatisch die am besten geeignete Übersetzung für den Client aus.
- **Fallback zur Standardsprache**: Fällt auf eine Standardsprache zurück, wenn die bevorzugte Sprache des Clients nicht verfügbar ist, um eine durchgehende Benutzererfahrung zu gewährleisten.
- **Leichtgewichtig und Schnell**: Entwickelt für leistungsstarke Anwendungen mit minimalem Overhead.
- **Unterstützung für den Strict Mode**: Erzwingt die strikte Einhaltung der deklarierten Sprachen für zuverlässiges Verhalten.

---

## Funktionssignatur

```typescript
t(translations: Record<string, string>): string;
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Sprachcodes sind (z. B. `en`, `fr`, `es-MX`) und die Werte die entsprechenden übersetzten Zeichenketten.

### Rückgabewert

- Eine Zeichenkette, die den Inhalt in der bevorzugten Sprache des Clients darstellt.

---

## Laden des Internationalisierungs-Request-Handlers

Um sicherzustellen, dass die Internationalisierungsfunktionalität, die von `express-intlayer` bereitgestellt wird, korrekt funktioniert, **müssen** Sie die Internationalisierungs-Middleware zu Beginn Ihrer Express-Anwendung laden. Dies aktiviert die `t`-Funktion und gewährleistet eine ordnungsgemäße Handhabung der Spracherkennung und Übersetzung.

Platzieren Sie die Middleware `app.use(intlayer())` **vor allen Routen** in Ihrer Anwendung, damit alle Routen von der Internationalisierung profitieren:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Lade den Internationalisierungs-Request-Handler
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

// Lade den Internationalisierungs-Request-Handler
app.use(intlayer());

// Definiere deine Routen nach dem Laden der Middleware
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

// Lade den Internationalisierungs-Request-Handler
app.use(intlayer());

// Definiere deine Routen nach dem Laden der Middleware
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

### Warum dies erforderlich ist

- **Locale-Erkennung**: Die `intlayer`-Middleware verarbeitet eingehende Anfragen, um die bevorzugte Locale des Benutzers basierend auf Headern, Cookies oder anderen konfigurierten Methoden zu erkennen.
- **Übersetzungskontext**: Stellt den notwendigen Kontext für die Funktion `t` bereit, damit Übersetzungen in der korrekten Sprache zurückgegeben werden.
- **Fehlervermeidung**: Ohne diese Middleware führt die Verwendung der Funktion `t` zu Laufzeitfehlern, da die erforderlichen Locale-Informationen nicht verfügbar sind.

---

## Anwendungsbeispiele

### Einfaches Beispiel

Lokalisierten Inhalt in verschiedenen Sprachen bereitstellen:

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
- Ein Client mit `Accept-Language: de` erhält `Welcome!` (Standard-Sprache).

### Fehlerbehandlung

Stellen Sie Fehlermeldungen in mehreren Sprachen bereit:

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
// Fehlerbehandlung mit mehrsprachigen Fehlermeldungen
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

### Verwendung von Sprachvarianten

Geben Sie Übersetzungen für sprachspezifische Varianten an:

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
      "en-GB": "Hallo, Kumpel!",
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
      en: "Hallo!",
      "en-GB": "Hallo, Kumpel!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Fortgeschrittene Themen

### Fallback-Mechanismus

Wenn eine bevorzugte Locale nicht verfügbar ist, fällt die `t`-Funktion auf die in der Konfiguration definierte Standard-Locale zurück:

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

Zum Beispiel:

- Wenn `defaultLocale` auf `Locales.CHINESE` gesetzt ist und ein Client `Locales.DUTCH` anfragt, wird die zurückgegebene Übersetzung standardmäßig den Wert von `Locales.CHINESE` verwenden.
- Wenn `defaultLocale` nicht definiert ist, fällt die Funktion `t` auf den Wert von `Locales.ENGLISH` zurück.

---

### Durchsetzung des Strict-Modus

Konfigurieren Sie die Funktion `t`, um eine strikte Einhaltung der deklarierten Sprachen sicherzustellen:

| Modus       | Verhalten                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `strict`    | Für alle deklarierten Sprachen müssen Übersetzungen vorhanden sein. Fehlende Sprachen führen zu Fehlern.        |
| `inclusive` | Deklarierte Sprachen müssen Übersetzungen haben. Fehlende Sprachen lösen Warnungen aus, werden aber akzeptiert. |
| `loose`     | Jede vorhandene Sprache wird akzeptiert, auch wenn sie nicht deklariert ist.                                    |

Konfigurationsbeispiel:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ihre bestehende Konfiguration
  internationalization: {
    // ... Ihre bestehende Internationalisierungskonfiguration
    strictMode: "strict", // Erzwinge den strikten Modus
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
    strictMode: "strict", // Erzwinge den strikten Modus
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
    strictMode: "strict", // Erzwinge den strikten Modus
  },
};

module.exports = config;
```

---

### TypeScript-Integration

Die Funktion `t` ist typensicher bei Verwendung mit TypeScript. Definieren Sie ein typensicheres Übersetzungsobjekt:

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

### Häufige Fehler und Problemlösungen

| Problem                         | Ursache                                     | Lösung                                                                     |
| ------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| `t` Funktion funktioniert nicht | Middleware nicht geladen                    | Sicherstellen, dass `app.use(intlayer())` vor den Routen hinzugefügt wird. |
| Fehlende Übersetzungen Fehler   | Strikter Modus aktiviert ohne alle Sprachen | Alle erforderlichen Übersetzungen bereitstellen.                           |

---

## Tipps für eine effektive Nutzung

1. **Übersetzungen zentralisieren**: Verwenden Sie ein zentrales Modul oder JSON-Dateien zur Verwaltung der Übersetzungen, um die Wartbarkeit zu verbessern.
2. **Übersetzungen validieren**: Stellen Sie sicher, dass jede Sprachvariante eine entsprechende Übersetzung hat, um unnötiges Zurückfallen zu vermeiden.
3. **Mit Frontend-i18n kombinieren**: Synchronisieren Sie die Backend-Internationalisierung mit der Frontend-Internationalisierung für ein nahtloses Benutzererlebnis in der gesamten Anwendung.
4. **Leistung messen**: Testen Sie die Antwortzeiten Ihrer Anwendung beim Hinzufügen von Übersetzungen, um minimale Auswirkungen sicherzustellen.

---

## Fazit

Die `t`-Funktion ist ein leistungsstarkes Werkzeug für die Internationalisierung im Backend. Durch ihre effektive Nutzung können Sie eine inklusivere und benutzerfreundlichere Anwendung für ein globales Publikum erstellen. Für erweiterte Nutzungsmöglichkeiten und detaillierte Konfigurationsoptionen konsultieren Sie bitte die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).
