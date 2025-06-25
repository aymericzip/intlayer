---
docName: package__express-intlayer__t
url: https://intlayer.org/doc/packages/express-intlayer/t
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/express-intlayer/t.md
createdAt: 2024-12-02
updatedAt: 2024-12-02
title: Dokumentation der t-Funktion | express-intlayer
description: Erfahren Sie, wie Sie die t-Funktion für das express-intlayer-Paket verwenden
keywords:
  - t
  - Übersetzung
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Express
  - JavaScript
  - React
---

# Dokumentation: `t` Funktion in `express-intlayer`

Die `t`-Funktion im `express-intlayer`-Paket ist das Kernwerkzeug zur Bereitstellung lokalisierter Antworten in Ihrer Express-Anwendung. Sie vereinfacht die Internationalisierung (i18n), indem sie Inhalte dynamisch basierend auf der bevorzugten Sprache des Benutzers auswählt.

---

## Übersicht

Die `t`-Funktion wird verwendet, um Übersetzungen für eine gegebene Menge von Sprachen zu definieren und abzurufen. Sie bestimmt automatisch die geeignete Sprache basierend auf den Anfrageeinstellungen des Clients, wie dem `Accept-Language`-Header. Wenn die bevorzugte Sprache nicht verfügbar ist, wird elegant auf die in Ihrer Konfiguration angegebene Standardsprache zurückgegriffen.

---

## Hauptmerkmale

- **Dynamische Lokalisierung**: Wählt automatisch die passendste Übersetzung für den Client aus.
- **Fallback auf Standardsprache**: Fällt auf eine Standardsprache zurück, wenn die bevorzugte Sprache des Clients nicht verfügbar ist, um die Benutzererfahrung zu gewährleisten.
- **Leichtgewichtig und schnell**: Entwickelt für leistungsstarke Anwendungen mit minimalem Overhead.
- **Unterstützung des strikten Modus**: Erzwingt strikte Einhaltung der deklarierten Sprachen für zuverlässiges Verhalten.

---

## Funktionssignatur

```typescript
t(translations: Record<string, string>): string;
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Sprachcodes (z. B. `en`, `fr`, `es-MX`) und die Werte die entsprechenden übersetzten Zeichenketten sind.

### Rückgabewert

- Eine Zeichenkette, die den Inhalt in der bevorzugten Sprache des Clients darstellt.

---

## Laden des Internationalisierungs-Request-Handlers

Um sicherzustellen, dass die von `express-intlayer` bereitgestellte Internationalisierungsfunktionalität korrekt funktioniert, **müssen** Sie die Internationalisierungs-Middleware am Anfang Ihrer Express-Anwendung laden. Dies aktiviert die `t`-Funktion und stellt sicher, dass die Erkennung und Übersetzung von Sprachen ordnungsgemäß funktioniert.

Platzieren Sie die Middleware `app.use(intlayer())` **vor allen Routen** in Ihrer Anwendung, um sicherzustellen, dass alle Routen von der Internationalisierung profitieren:

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

### Warum dies erforderlich ist

- **Spracherkennung**: Die `intlayer`-Middleware verarbeitet eingehende Anfragen, um die bevorzugte Sprache des Benutzers basierend auf Headern, Cookies oder anderen konfigurierten Methoden zu erkennen.
- **Übersetzungskontext**: Richtet den notwendigen Kontext für die `t`-Funktion ein, um sicherzustellen, dass Übersetzungen in der richtigen Sprache zurückgegeben werden.
- **Fehlervermeidung**: Ohne diese Middleware führt die Verwendung der `t`-Funktion zu Laufzeitfehlern, da die notwendigen Sprachinformationen nicht verfügbar sind.

---

## Anwendungsbeispiele

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

### Verwendung von Sprachvarianten

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

### Fallback-Mechanismus

Wenn eine bevorzugte Sprache nicht verfügbar ist, fällt die `t`-Funktion auf die in der Konfiguration definierte Standardsprache zurück:

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

Beispiel:

- Wenn `defaultLocale` `Locales.CHINESE` ist und ein Client `Locales.DUTCH` anfordert, wird die Übersetzung auf den Wert von `Locales.CHINESE` zurückgesetzt.
- Wenn `defaultLocale` nicht definiert ist, fällt die `t`-Funktion auf den Wert von `Locales.ENGLISH` zurück.

---

### Strikter Modus

Konfigurieren Sie die `t`-Funktion, um die strikte Einhaltung der deklarierten Sprachen zu erzwingen:

| Modus       | Verhalten                                                                               |
| ----------- | --------------------------------------------------------------------------------------- |
| `strict`    | Alle deklarierten Sprachen müssen Übersetzungen haben. Fehlende Sprachen werfen Fehler. |
| `inclusive` | Deklarierte Sprachen müssen Übersetzungen haben. Fehlende Sprachen lösen Warnungen aus. |
| `loose`     | Jede vorhandene Sprache wird akzeptiert, auch wenn sie nicht deklariert ist.            |

Konfigurationsbeispiel:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Ihre bestehende Konfiguration
  internationalization: {
    // ... Ihre bestehende Internationalisierungskonfiguration
    strictMode: "strict", // Strikten Modus erzwingen
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
    strictMode: "strict", // Strikten Modus erzwingen
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
    strictMode: "strict", // Strikten Modus erzwingen
  },
};

module.exports = config;
```

---

### TypeScript-Integration

Die `t`-Funktion ist typsicher, wenn sie mit TypeScript verwendet wird. Definieren Sie ein typsicheres Übersetzungsobjekt:

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

### Häufige Fehler und Fehlerbehebung

| Problem                         | Ursache                                     | Lösung                                                                           |
| ------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------- |
| `t`-Funktion funktioniert nicht | Middleware nicht geladen                    | Stellen Sie sicher, dass `app.use(intlayer())` vor den Routen hinzugefügt wurde. |
| Fehlende Übersetzungen-Fehler   | Strikter Modus aktiviert ohne alle Sprachen | Stellen Sie alle erforderlichen Übersetzungen bereit.                            |

---

## Tipps für effektive Nutzung

1. **Zentralisieren Sie Übersetzungen**: Verwenden Sie ein zentrales Modul oder JSON-Dateien zur Verwaltung von Übersetzungen, um die Wartbarkeit zu verbessern.
2. **Validieren Sie Übersetzungen**: Stellen Sie sicher, dass jede Sprachvariante eine entsprechende Übersetzung hat, um unnötiges Zurückfallen zu vermeiden.
3. **Kombinieren Sie mit Frontend-i18n**: Synchronisieren Sie mit der Frontend-Internationalisierung für ein nahtloses Benutzererlebnis in der gesamten App.
4. **Benchmark-Leistung**: Testen Sie die Antwortzeiten Ihrer App beim Hinzufügen von Übersetzungen, um minimale Auswirkungen sicherzustellen.

---

## Fazit

Die `t`-Funktion ist ein leistungsstarkes Werkzeug für die Backend-Internationalisierung. Durch ihre effektive Nutzung können Sie eine inklusivere und benutzerfreundlichere Anwendung für ein globales Publikum erstellen. Für fortgeschrittene Nutzung und detaillierte Konfigurationsoptionen lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).
