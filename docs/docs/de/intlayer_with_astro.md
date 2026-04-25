---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Astro i18n - Wie man eine Astro-Anwendung im Jahr 2026 übersetzt
description: Erfahren Sie, wie Sie mit Intlayer Internationalisierung (i18n) zu Ihrer Astro-Website hinzufügen. Folgen Sie dieser Anleitung, um Ihre Website mehrsprachig zu gestalten.
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
  - version: 7.5.9
    date: 2025-12-30
    changes: "init-Befehl hinzufügen"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Aktualisierung der Astro-Integration, Konfiguration und Verwendung"
---

# Übersetzen Sie Ihre Astro-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten**: Deklarative Wörterbücher auf Komponentenebene verwenden.
- **Metadaten, Routing und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen**: Mit automatisch generierten Typen für bessere Autovervollständigung und Fehlererkennung.
- **Von erweiterten Funktionen profitieren**: Wie dynamische Spracherkennung und Sprachwechsel.

---

## Schritt-für-Schritt-Anleitung zur Konfiguration von Intlayer in Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Sehen Sie sich das [Anwendungstemplate](https://github.com/aymericzip/intlayer-astro-template) auf GitHub an.

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Optional: Wenn Sie Unterstützung für React-Islands hinzufügen
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Optional: Wenn Sie Unterstützung für React-Islands hinzufügen
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# Optional: Wenn Sie Unterstützung für React-Islands hinzufügen
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Das Kernpaket, das i18n-Tools für Konfigurationsmanagement, Übersetzungen, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **astro-intlayer**
  Enthält das Astro-Integrations-Plugin, um Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) zu verbinden, sowie die Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

### Schritt 2: Konfigurieren Sie Ihr Projekt

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu definieren:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre anderen Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, Speicherort und Erweiterungen der Inhaltsdeklarationen konfigurieren, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Astro-Konfiguration

Fügen Sie das `intlayer`-Plugin zu Ihrer Astro-Konfiguration hinzu.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Das Integrations-Plugin `intlayer()` wird verwendet, um Intlayer in Astro zu integrieren. Es sorgt für die Generierung der Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Astro-Anwendung und stellt Aliase zur Optimierung der Leistung bereit.

### Schritt 4: Deklarieren Sie Ihren Inhalt

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
      de: "Hallo Welt",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir` (standardmäßig `./src`) enthalten sind und der Erweiterung der Inhaltsdeklarationsdateien (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`) entsprechen.

> Weitere Informationen finden Sie in der [Inhaltsdeklarations-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Schritt 5: Inhalt in Astro verwenden

Sie können die Wörterbücher direkt in Ihren `.astro`-Dateien verwenden, indem Sie die von `intlayer` exportierten Kern-Helfer nutzen.

```astro fileName="src/pages/index.astro"
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="de">
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

### Schritt 6: Lokalisiertes Routing

Erstellen Sie dynamische Pfadsegmente, um lokalisierte Seiten bereitzustellen (z. B. `src/pages/[locale]/index.astro`):

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Die Astro-Integration fügt eine Vite-Middleware hinzu, die beim sprachsensitiven Routing und bei den Umgebungsdefinitionen während der Entwicklung hilft. Sie können auch sprachübergreifende Links mit Ihrer eigenen Logik oder `intlayer`-Tools wie `getLocalizedUrl` erstellen.

### Schritt 7: Verwenden Sie weiterhin Ihre bevorzugten Frameworks

Bauen Sie Ihre Anwendung mit dem Framework Ihrer Wahl weiter auf.

- Intlayer + React: [Intlayer mit React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer mit Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer mit Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer mit Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer mit Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+preact.md)

### TypeScript-Konfiguration

Intlayer verwendet die Modulerweiterung (Module Augmentation), um TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehende TypeScript-Konfiguration
  "include": [
    // ... Ihre bestehende TypeScript-Konfiguration
    ".intlayer/**/*.ts", // Automatisch generierte Typen einbeziehen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, von Intlayer generierte Dateien zu ignorieren. Dies verhindert, dass sie in Ihr Git-Repository eingecheckt werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```bash
# Von Intlayer generierte Dateien ignorieren
.intlayer
```

### VS Code Erweiterung

Um Ihr Entwicklungserlebnis mit Intlayer zu verbessern, können Sie die **offizielle Intlayer VS Code Erweiterung** installieren.

[Installation über den VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschau** von übersetzten Inhalten.
- **Schnelle Aktionen** zum einfachen Erstellen und Aktualisieren von Übersetzungen.

Weitere Informationen zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

### Vertiefen Sie Ihr Wissen

Wenn Sie mehr erfahren möchten, können Sie auch den [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder das [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) verwenden, um Ihre Inhalte zu externalisieren.
