---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: t-Funktionsdokumentation | hono-intlayer
description: Sehen Sie, wie Sie die t-Funktion für das hono-intlayer-Paket verwenden
keywords:
  - t
  - Übersetzung
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Verlauf initialisiert
---

# Dokumentation: `t`-Funktion in `hono-intlayer`

Die `t`-Funktion im Paket `hono-intlayer` ist das zentrale Werkzeug zur Bereitstellung lokalisierter Antworten in Ihrer Hono-Anwendung. Sie vereinfacht die Internationalisierung (i18n), indem sie Inhalte dynamisch basierend auf der bevorzugten Sprache des Benutzers auswählt.

---

## Übersicht

Die `t`-Funktion wird verwendet, um Übersetzungen für einen bestimmten Satz von Sprachen zu definieren und abzurufen. Sie bestimmt automatisch die passende Sprache, die zurückgegeben werden soll, basierend auf den Anfrageeinstellungen des Clients, wie dem `Accept-Language`-Header. Wenn die bevorzugte Sprache nicht verfügbar ist, fällt sie elegant auf die in Ihrer Konfiguration angegebene Standardsprache zurück.

---

## Hauptmerkmale

- **Dynamische Lokalisierung**: Wählt automatisch die am besten geeignete Übersetzung für den Client aus.
- **Fallback zur Standardsprache**: Fällt auf eine Standardsprache zurück, wenn die bevorzugte Sprache des Clients nicht verfügbar ist, um die Kontinuität der Benutzererfahrung zu gewährleisten.
- **Leichtgewichtig und schnell**: Entwickelt für Hochleistungsanwendungen, um minimalen Overhead zu gewährleisten.
- **Unterstützung des strikten Modus**: Erzwingt die strikte Einhaltung deklarierter Locales für ein zuverlässiges Verhalten.

---

## Funktionssignatur

```typescript
t(translations: Record<string, string>): string;
```

### Parameter

- `translations`: Ein Objekt, bei dem die Schlüssel Locale-Codes (z. B. `en`, `fr`, `es-MX`) und die Werte die entsprechenden übersetzten Zeichenfolgen sind.

### Rückgabewert

- Eine Zeichenfolge, die den Inhalt in der bevorzugten Sprache des Clients darstellt.

---

## Laden des Internationalisierungs-Request-Handlers

Um sicherzustellen, dass die von `hono-intlayer` bereitgestellte Internationalisierungsfunktionalität ordnungsgemäß funktioniert, **müssen** Sie die Internationalisierungs-Middleware zu Beginn Ihrer Hono-Anwendung laden. Dies aktiviert die `t`-Funktion und gewährleistet eine ordnungsgemäße Handhabung der Locale-Erkennung und Übersetzung.

Platzieren Sie die `app.use("*", intlayer())`-Middleware **vor allen Routen** in Ihrer Anwendung, um sicherzustellen, dass alle Routen von der Internationalisierung profitieren:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Internationalisierungs-Request-Handler laden
app.use("*", intlayer());

// Definieren Sie Ihre Routen nach dem Laden der Middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Internationalisierungs-Request-Handler laden
app.use("*", intlayer());

// Definieren Sie Ihre Routen nach dem Laden der Middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Internationalisierungs-Request-Handler laden
app.use("*", intlayer());

// Definieren Sie Ihre Routen nach dem Laden der Middleware
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Warum dies erforderlich ist

- **Locale-Erkennung**: Die `intlayer`-Middleware verarbeitet eingehende Anfragen, um das bevorzugte Locale des Benutzers basierend auf Headern, Cookies oder anderen konfigurierten Methoden zu erkennen.
- **Übersetzungskontext**: Richtet den erforderlichen Kontext ein, damit die `t`-Funktion ordnungsgemäß funktioniert und sichergestellt wird, dass Übersetzungen in der richtigen Sprache zurückgegeben werden.
- **Fehlervermeidung**: Ohne diese Middleware führt die Verwendung der `t`-Funktion zu Laufzeitfehlern, da die erforderlichen Locale-Informationen nicht verfügbar sind.

---

## Nutzungsbeispiele

### Basispiel

Lokalisierte Inhalte in verschiedenen Sprachen bereitstellen:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (c) => {
  return c.text(
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
- Ein Client mit `Accept-Language: de` erhält `Welcome!` (Standard-Locale).

### Fehlerbehandlung

Fehlermeldungen in mehreren Sprachen bereitstellen:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    }),
    500
  );
});
```

---

### Verwendung von Locale-Varianten

Spezifizieren Sie Übersetzungen für länderspezifische Varianten:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
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

Wenn ein bevorzugtes Locale nicht verfügbar ist, fällt die `t`-Funktion auf das in der Konfiguration definierte Standard-Locale zurück:

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

---

### Erzwingen des strikten Modus

Konfigurieren Sie die `t`-Funktion so, dass die strikte Einhaltung deklarierter Locales erzwungen wird:

| Modus       | Verhalten                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `strict`    | Alle deklarierten Locales müssen Übersetzungen bereitstellen. Fehlende Locales führen zu Fehlern.             |
| `inclusive` | Deklarierte Locales müssen Übersetzungen haben. Fehlende Locales lösen Warnungen aus, werden aber akzeptiert. |
| `loose`     | Jedes vorhandene Locale wird akzeptiert, auch wenn es nicht deklariert ist.                                   |

---

### TypeScript-Integration

Die `t`-Funktion ist typsicher, wenn sie mit TypeScript verwendet wird. Definieren Sie ein typsicheres Übersetzungsobjekt:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Häufige Fehler und Fehlerbehebung

| Problem                            | Ursache                                    | Lösung                                                                               |
| ---------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------ |
| `t`-Funktion funktioniert nicht    | Middleware nicht geladen                   | Stellen Sie sicher, dass `app.use("*", intlayer())` vor den Routen hinzugefügt wird. |
| Fehler bei fehlenden Übersetzungen | Strikter Modus ohne alle Locales aktiviert | Stellen Sie alle erforderlichen Übersetzungen bereit.                                |

---

## Fazit

Die `t`-Funktion ist ein leistungsstarkes Werkzeug für die Backend-Internationalisierung. Durch ihren effektiven Einsatz können Sie eine inklusivere und benutzerfreundlichere Anwendung für ein globales Publikum erstellen. Weitere Informationen zur fortgeschrittenen Nutzung und detaillierte Konfigurationsoptionen finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
