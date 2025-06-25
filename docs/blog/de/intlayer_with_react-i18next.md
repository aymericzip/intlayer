---
blogName: intlayer_with_react-i18next
url: https://intlayer.org/blog/intlayer-with-react-i18next
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_react-i18next.md
createdAt: 2025-01-02
updatedAt: 2025-01-02
title: Intlayer und react-i18next
description: Vergleichen Sie Intlayer mit react-i18next für eine React-App
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# React Internationalisierung (i18n) mit react-i18next und Intlayer

## Übersicht

- **Intlayer** hilft Ihnen, Übersetzungen über **komponentenbasierte** Inhaltsdeklarationsdateien zu verwalten.
- **react-i18next** ist eine beliebte React-Integration für **i18next**, die Hooks wie `useTranslation` bereitstellt, um lokalisierte Strings in Ihren Komponenten abzurufen.

In Kombination kann Intlayer **Wörterbücher** im **i18next-kompatiblen JSON** exportieren, sodass react-i18next sie zur Laufzeit **verbrauchen** kann.

## Warum Intlayer mit react-i18next verwenden?

Die Inhaltsdeklarationsdateien von **Intlayer** bieten ein besseres Entwicklererlebnis, da sie:

1. **Flexibel in der Dateiplatzierung sind**  
   Platzieren Sie jede Inhaltsdeklarationsdatei direkt neben der Komponente, die sie benötigt. Diese Struktur ermöglicht es Ihnen, Übersetzungen lokal zusammenzuhalten und verhindert verwaiste Übersetzungen, wenn Komponenten verschoben oder gelöscht werden.

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Inhaltsdeklarationsdatei
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Inhaltsdeklarationsdatei
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Inhaltsdeklarationsdatei
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Inhaltsdeklarationsdatei
               └── index.jsx
   ```

2. **Zentralisierte Übersetzungen**  
   Eine einzelne Inhaltsdeklarationsdatei sammelt alle notwendigen Übersetzungen für eine Komponente, was fehlende Übersetzungen leichter erkennbar macht.  
   Mit TypeScript erhalten Sie sogar zur Kompilierzeit Fehler, wenn Übersetzungen fehlen.

## Installation

In einem Create React App-Projekt installieren Sie diese Abhängigkeiten:

```bash
# Mit npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Mit yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Mit pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### Was sind diese Pakete?

- **intlayer** – Die CLI und Kernbibliothek zur Verwaltung von i18n-Konfigurationen, Inhaltsdeklarationen und zum Erstellen von Wörterbuchausgaben.
- **react-intlayer** – React-spezifische Integration für Intlayer, die einige Skripte zur Automatisierung des Aufbaus von Wörterbüchern bereitstellt.
- **react-i18next** – React-spezifische Integrationsbibliothek für i18next, einschließlich des `useTranslation`-Hooks.
- **i18next** – Das zugrunde liegende Framework für die Übersetzungsbearbeitung.
- **i18next-resources-to-backend** – Ein i18next-Backend, das JSON-Ressourcen dynamisch importiert.

## Intlayer zur Ausgabe von i18next-Wörterbüchern konfigurieren

Erstellen (oder aktualisieren) Sie Ihre `intlayer.config.ts` im Root Ihres Projekts:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Fügen Sie so viele Sprachen hinzu, wie Sie möchten
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Sagen Sie Intlayer, dass es i18next-kompatibles JSON erstellen soll
    dictionaryOutput: ["i18next"],

    // Wählen Sie ein Ausgabeverzeichnis für die generierten Ressourcen
    // Dieses Verzeichnis wird erstellt, wenn es noch nicht existiert.
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

> **Hinweis**: Wenn Sie kein TypeScript verwenden, können Sie diese Konfigurationsdatei als `.cjs`, `.mjs` oder `.js` erstellen (siehe die [Intlayer-Dokumentation](https://intlayer.org/en/doc/concept/configuration) für Details).

## Erstellen der i18next-Ressourcen

Sobald Ihre Inhaltsdeklarationen an Ort und Stelle sind (nächster Abschnitt), führen Sie den **Intlayer-Befehl zum Erstellen** aus:

```bash
# Mit npm
npx run intlayer build
```

```bash
# Mit yarn
yarn intlayer build
```

```bash
# Mit pnpm
pnpm intlayer build
```

> Dies wird standardmäßig Ihre i18next-Ressourcen im Verzeichnis `./i18next/resources` generieren.

Eine typische Ausgabe könnte folgendermaßen aussehen:

```bash
.
└── i18next
    └── resources
       ├── de
       │   └── my-content.json
       ├── fr
       │   └── my-content.json
       └── es
           └── my-content.json
```

Wo jeder **Intlayer**-Schlüssel als **i18next-Namensraum** verwendet wird (z.B. `my-content.json`).

## Wörterbücher in Ihre react-i18next-Konfiguration importieren

Um diese Ressourcen zur Laufzeit dynamisch zu laden, verwenden Sie [`i18next-resources-to-backend`](https://www.npmjs.com/package/i18next-resources-to-backend). Erstellen Sie beispielsweise eine Datei `i18n.ts` (oder `.js`) in Ihrem Projekt:

```typescript title="i18n.ts"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // react-i18next-Plugin
  .use(initReactI18next)
  // Ressourcen dynamisch laden
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Passen Sie den Importpfad zu Ihrem Ressourcenverzeichnis an
      return import(`../i18next/resources/${language}/${namespace}.json`);
    })
  )
  // Initialize i18next
  .init({
    // Fallback-Sprache
    fallbackLng: "de",

    // Sie können hier andere i18next-Konfigurationsoptionen hinzufügen, siehe:
    // https://www.i18next.com/overview/configuration-options
  });

export default i18next;
```

```javascript title="i18n.js"
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/resources/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: "de",
  });

export default i18next;
```

Dann importieren Sie in Ihrer **Haupt**- oder **Index**-Datei (z.B. `src/index.tsx`) diese `i18n`-Einrichtung **vor** dem Rendern der `App`:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
// Initialisieren Sie i18n vor allem anderen
import "./i18n";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Erstellen und Verwalten Ihrer Inhaltsdeklarationen

Intlayer extrahiert Übersetzungen aus „Inhaltsdeklarationsdateien“, die sich überall unter `./src` (standardmäßig) befinden.  
Hier ist ein minimales Beispiel in TypeScript:

```typescript title="src/components/MyComponent/MyComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // Der "key" wird Ihr i18next-Namensraum sein (z.B. "my-component")
  key: "my-component",
  content: {
    // Jeder "t"-Aufruf ist ein separater Übersetzungs-Knoten
    heading: t({
      de: "Hallo Welt",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      de: "Mein i18n Beschreibungstext...",
      fr: "Ma description en i18n...",
      es: "Mi descripción en i18n...",
    }),
  },
} satisfies Dictionary;

export default content;
```

Wenn Sie JSON, `.cjs` oder `.mjs` bevorzugen, siehe die [Intlayer-Dokumentation](https://intlayer.org/en/doc/concept/content).

> Standardmäßig entsprechen gültige Inhaltsdeklarationen dem Dateiendungsmuster:

> `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}`

## Verwendung der Übersetzungen in React-Komponenten

Nachdem Sie Ihre Intlayer-Ressourcen **gebaut** und react-i18next konfiguriert haben, können Sie direkt den `useTranslation`-Hook von **react-i18next** verwenden.  
Zum Beispiel:

```tsx title="src/components/MyComponent/MyComponent.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * Der i18next "Namensraum" ist der Intlayer `key` aus "MyComponent.content.ts"
 * also übergeben wir "my-component" an useTranslation().
 */
const MyComponent: FC = () => {
  const { t } = useTranslation("my-component");

  return (
    <div>
      <h1>{t("heading")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default MyComponent;
```

> Beachten Sie, dass die `t`-Funktion **Schlüssel** innerhalb Ihres generierten JSON referenziert. Für einen Intlayer-Inhaltseintragsnamen `heading` verwenden Sie `t("heading")`.

## Optional: Integration mit Create React App-Skripten (CRACO)

**react-intlayer** bietet einen CRACO-basierten Ansatz für benutzerdefinierte Builds und DEV-Serverkonfiguration. Wenn Sie den Build-Schritt von Intlayer nahtlos integrieren möchten, können Sie:

1. **react-intlayer installieren** (falls Sie dies noch nicht getan haben):
   ```bash
   npm install react-intlayer --save-dev
   ```
2. **Passen Sie Ihre `package.json`-Skripte** an, um `react-intlayer`-Skripte zu verwenden:

   ```jsonc
   "scripts": {
     "start": "react-intlayer start",
     "build": "react-intlayer build",
     "transpile": "intlayer build"
   }
   ```

   > Die `react-intlayer`-Skripte basieren auf [CRACO](https://craco.js.org/). Sie können auch Ihr eigenes Setup basierend auf dem Intlayer-CRACO-Plugin implementieren. [Siehe Beispiel hier](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

Nun löst das Ausführen von `npm run build`, `yarn build` oder `pnpm build` sowohl die Intlayer- als auch die CRA-Bauten aus.

## TypeScript-Konfiguration

**Intlayer** bietet **automatisch generierte Typdefinitionen** für Ihren Inhalt. Um sicherzustellen, dass TypeScript sie erfasst, fügen Sie **`types`** (oder `types`, wenn Sie es anders konfiguriert haben) zu Ihrem `tsconfig.json` **include**-Array hinzu:

```json5 title="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

> Dies ermöglicht es TypeScript, die Struktur Ihrer Übersetzungen für bessere Autovervollständigung und Fehlererkennung abzuleiten.

## Git-Konfiguration

Es wird empfohlen, automatisch generierte Dateien und Ordner von Intlayer zu **ignorieren**. Fügen Sie diese Zeile zu Ihrer `.gitignore` hinzu:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
i18next
```

Sie sollten diese Ressourcen oder `.intlayer`-interne Build-Artefakte normalerweise **nicht** einchecken, da sie bei jedem Build regeneriert werden können.
