---
createdAt: 2024-03-07
updatedAt: 2025-10-03
title: Wie Sie Ihre Astro übersetzen – i18n-Leitfaden 2025
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Astro-Website mit Intlayer hinzufügen. Folgen Sie dieser Anleitung, um Ihre Website mehrsprachig zu machen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 6.2.0
    date: 2025-10-03
    changes: Aktualisierung für Astro-Integration, Konfiguration, Nutzung
---

# Übersetzen Sie Ihre Astro mit Intlayer | Internationalisierung (i18n)

Siehe [Application Template](https://github.com/aymericzip/intlayer-astro-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** durch automatisch generierte Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Spracherkennung und -umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in Astro

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit Ihrem Paketmanager:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Optional: React Island-Unterstützung hinzufügen
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Optional: React Island-Unterstützung hinzufügen
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Optional: React Island-Unterstützung hinzufügen
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **astro-intlayer**
  Beinhaltet das Astro-Integrationsplugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Protokolle in der Konsole deaktivieren und mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integration von Intlayer in Ihre Astro-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Das `intlayer()` Astro-Integrations-Plugin wird verwendet, um Intlayer mit Astro zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Astro-Anwendung. Zusätzlich stellt es Aliase zur Optimierung der Leistung bereit.

### Schritt 4: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir`-Verzeichnis enthalten sind (standardmäßig `./src`). Und die Dateiendung der Inhaltsdeklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

### Schritt 5: Verwenden Sie Ihre Inhalte in Astro

Sie können Wörterbücher direkt in `.astro`-Dateien mit den von `intlayer` exportierten Kern-Hilfsfunktionen verwenden.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Schritt 6: Lokalisierte Routen

Erstellen Sie ein dynamisches Routensegment, um lokalisierte Seiten bereitzustellen, zum Beispiel `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Die Astro-Integration fügt während der Entwicklung eine Vite-Middleware hinzu, die bei der lokalisierungsbewussten Routenführung und Umgebungsdefinitionen hilft. Sie können weiterhin zwischen den Sprachen mit Ihrer eigenen Logik oder Hilfsfunktionen wie `getLocalizedUrl` von `intlayer` verlinken.

### Schritt 7: Verwenden Sie weiterhin Ihr bevorzugtes Framework

Fahren Sie fort, Ihr Lieblings-Framework zum Erstellen Ihrer Anwendung zu verwenden.

- Intlayer + React: [Intlayer mit React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer mit Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer mit Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer mit Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer mit Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+preact.md)

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Codebestand robuster zu machen.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einschließen der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Um dies zu tun, können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Nutzung der Erweiterung, siehe die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---
