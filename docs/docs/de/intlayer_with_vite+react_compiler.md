---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite und React i18n - Eine bestehende App in eine mehrsprachige App umwandeln (i18n-Leitfaden 2026)
description: Erfahren Sie, wie Sie Ihre bestehende Vite- und React-Anwendung mit dem Intlayer-Compiler mehrsprachig machen. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und lassen Sie sie mit KI übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - React
  - Compiler
  - KI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
  - AI
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Erstveröffentlichung
---

# Wie man eine bestehende Vite- und React-Anwendung nachträglich mehrsprachig (i18n) macht (i18n-Leitfaden 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Die beste i18n-Lösung für Vite und React? Entdecken Sie Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - So internationalisieren Sie Ihre Anwendung mit Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-vite-react-template) auf GitHub.

## Inhaltsverzeichnis

<TOC/>

## Warum ist es schwierig, eine bestehende Anwendung zu internationalisieren?

Wenn Sie jemals versucht haben, mehrere Sprachen zu einer App hinzuzufügen, die nur für eine gebaut wurde, kennen Sie den Schmerz. Es ist nicht nur "schwer" – es ist mühsam. Sie müssen jede einzelne Datei durchforsten, jede Textzeichenfolge aufspüren und sie in separate Wörterbuchdateien verschieben.

Dann kommt der riskante Teil: das Ersetzen des gesamten Textes durch Code-Hooks, ohne Ihr Layout oder Ihre Logik zu beeinträchtigen. Es ist die Art von Arbeit, die die Entwicklung neuer Funktionen für Wochen zum Stillstand bringt und sich wie endloses Refactoring anfühlt.

## Was ist der Intlayer-Compiler?

Der **Intlayer-Compiler** wurde entwickelt, um diese manuelle Routinearbeit zu überspringen. Anstatt dass Sie Zeichenfolgen manuell extrahieren, erledigt der Compiler dies für Sie. Er scannt Ihren Code, findet den Text und verwendet KI, um die Wörterbücher im Hintergrund zu generieren.
Anschließend modifiziert er Ihren Code während des Builds, um die erforderlichen i18n-Hooks einzufügen. Im Grunde schreiben Sie Ihre App weiterhin so, als wäre sie einsprachig, und der Compiler übernimmt die mehrsprachige Transformation automatisch.

> Dokumentation Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md)

### Einschränkungen

Da der Compiler Codeanalysen und Transformationen (Einfügen von Hooks und Generieren von Wörterbüchern) zum **Zeitpunkt der Kompilierung** durchführt, kann er den **Build-Leistung** Ihrer Anwendung **verlangsamen**.

Um diese Auswirkungen während der Entwicklung abzumildern, können Sie den Compiler so konfigurieren, dass er im Modus [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) läuft, oder ihn deaktivieren, wenn er nicht benötigt wird.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und React-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  Das Kernpaket, das Internationalisierungswerkzeuge für die Konfigurationsverwaltung, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **react-intlayer**
  Das Paket, das Intlayer in die React-Anwendung integriert. Es bietet Kontextanbieter und Hooks für die React-Internationalisierung.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer in den [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung des bevorzugten Gebietsschemas des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Umleitungen.

### Schritt 2: Konfigurieren Sie Ihr Projekt

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.GERMAN],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    /**
     * Gibt an, ob der Compiler aktiviert werden soll.
     */
    enabled: true,

    /**
     * Ausgabeverzeichnis für die optimierten Wörterbücher.
     */
    outputDir: "compiler",

    /**
     * Wörterbuch-Schlüsselpräfix
     */
    dictionaryKeyPrefix: "", // Basispräfix entfernen

    /**
     * Gibt an, ob die Komponenten nach der Transformation gespeichert werden sollen.
     * Auf diese Weise kann der Compiler nur einmal ausgeführt werden, um die App zu transformieren, und kann dann entfernt werden.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Diese App ist eine Karten-App", // Hinweis: Sie können diese App-Beschreibung anpassen
  },
};

export default config;
```

> **Hinweis**: Stellen Sie sicher, dass Ihr `OPEN_AI_API_KEY` in Ihren Umgebungsvariablen gesetzt ist.

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Umleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Vite-Konfiguration integrieren

Fügen Sie das Intlayer-Plugin zu Ihrer Konfiguration hinzu.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> Das `intlayer()`-Vite-Plugin wird verwendet, um Intlayer in Vite zu integrieren. Es stellt die Erstellung von Inhaltsdeklarationsdateien sicher und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Darüber hinaus bietet es Aliase zur Leistungsoptimierung.

> Das `intlayerCompiler()`-Vite-Plugin wird verwendet, um Inhalte aus Komponenten zu extrahieren und `.content`-Dateien zu schreiben.

### Schritt 4: Kompilieren Sie Ihren Code

Schreiben Sie Ihre Komponenten einfach mit fest codierten Zeichenfolgen in Ihrem Standard-Gebietsschema. Der Compiler kümmert sich um den Rest.

Beispiel, wie Ihre Seite aussehen könnte:

<Tabs>
 <Tab value="Code">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Ausgabe">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      de: {
        viteLogo: "Vite Logo",
        reactLogo: "React Logo",
        title: "Vite + React",
        countButton: "Zähler ist",
        editMessage: "Bearbeite",
        hmrMessage: "und speichere, um HMR zu testen",
        readTheDocs: "Klicke auf die Vite- und React-Logos, um mehr zu erfahren",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** wird verwendet, um das Gebietsschema für verschachtelte Komponenten bereitzustellen.

### (Optional) Schritt 6: Die Sprache Ihres Inhalts ändern

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom Hook `useLocale` bereitgestellt wird. Mit dieser Funktion können Sie das Gebietsschema der Anwendung festlegen und den Inhalt entsprechend aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.GERMAN)}>
      Sprache auf Deutsch ändern
    </button>
  );
};
```

> Um mehr über den Hook `useLocale` zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

### (Optional) Schritt 7: Fehlende Übersetzungen ausfüllen

Intlayer bietet ein CLI-Tool an, mit dem Sie fehlende Übersetzungen ausfüllen können. Sie können den Befehl `intlayer` verwenden, um fehlende Übersetzungen in Ihrem Code zu testen und auszufüllen.

```bash
npx intlayer test         # Testen, ob Übersetzungen fehlen
```

```bash
npx intlayer fill         # Fehlende Übersetzungen ausfüllen
```

> Weitere Informationen finden Sie in der [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/ci.md)

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen zu vermeiden, sie in Ihr Git-Repository zu übertragen.

Dazu können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```plaintext fileName=".gitignore"
# Von Intlayer generierte Dateien ignorieren
.intlayer
```

### VS Code-Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code-Erweiterung** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Fehlererkennung in Echtzeit** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code-Erweiterung](https://intlayer.org/doc/vs-code-extension).

### Weiterführendes

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) extern verwalten.
