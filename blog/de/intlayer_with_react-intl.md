---
blogName: intlayer_with_react-intl
url: /blog/intlayer-with-react-intl
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/intlayer_with_react-intl.md
createdAt: 2025-01-02
updatedAt: 2025-01-02
title: Intlayer und react-intl
description: Integrieren Sie Intlayer mit react-intl für eine React-App
keywords:
  - react-intl
  - Intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# React Internationalisierung (i18n) mit **react-intl** und Intlayer

Diese Anleitung zeigt, wie Sie **Intlayer** mit **react-intl** integrieren, um Übersetzungen in einer React-Anwendung zu verwalten. Sie erklären Ihren übersetzbaren Inhalt mit Intlayer und konsumieren dann diese Nachrichten mit **react-intl**, einer beliebten Bibliothek aus dem [FormatJS](https://formatjs.io/docs/react-intl) Ecosystem.

## Übersicht

- **Intlayer** ermöglicht es Ihnen, Übersetzungen in **komponentenbezogenen** Inhaltsdeklarationsdateien (JSON, JS, TS usw.) innerhalb Ihres Projekts zu speichern.
- **react-intl** bietet React-Komponenten und Hooks (wie `<FormattedMessage>` und `useIntl()`), um lokalisierte Strings anzuzeigen.

Indem Sie Intlayer so konfigurieren, dass Übersetzungen im **react-intl-kompatiblen** Format **exportiert** werden, können Sie automatisch die Nachrichten-Dateien **generieren** und **aktualisieren**, die `<IntlProvider>` (aus react-intl) benötigt.

---

## Warum Intlayer mit react-intl verwenden?

1. **Pro-Komponente Inhaltsdeklarationen**  
   Intlayer-Inhaltsdeklarationsdateien können neben Ihren React-Komponenten leben, um „verwaiste“ Übersetzungen zu verhindern, wenn Komponenten verschoben oder entfernt werden. Zum Beispiel:

   ```bash
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts   # Intlayer Inhaltsdeklaration
               └── index.tsx          # React-Komponente
   ```

2. **Zentralisierte Übersetzungen**  
   Jede Inhaltsdeklarationsdatei sammelt alle Übersetzungen, die eine Komponente benötigt. Dies ist besonders hilfreich in TypeScript-Projekten: Fehlende Übersetzungen können zur **Kompilierungszeit** gefangen werden.

3. **Automatischer Build und Regenerierung**  
   Immer wenn Sie Übersetzungen hinzufügen oder aktualisieren, regeneriert Intlayer die Nachrichten-JSON-Dateien. Diese können Sie dann in react-intl's `<IntlProvider>` übergeben.

---

## Installation

In einem typischen React-Projekt installieren Sie Folgendes:

```bash
# mit npm
npm install intlayer react-intl

# mit yarn
yarn add intlayer react-intl

# mit pnpm
pnpm add intlayer react-intl
```

### Warum diese Pakete?

- **intlayer**: Core-CLI und Bibliothek, die nach Inhaltsdeklarationen sucht, diese zusammenführt und Wörterbuchausgaben erstellt.
- **react-intl**: Die Hauptbibliothek von FormatJS, die `<IntlProvider>`, `<FormattedMessage>`, `useIntl()` und andere Internationalisierungsprimitive bereitstellt.

> Wenn Sie React selbst noch nicht installiert haben, benötigen Sie es auch (`react` und `react-dom`).

## Intlayer konfigurieren, um react-intl Nachrichten zu exportieren

Erstellen Sie in Ihrem Projektstamm **`intlayer.config.ts`** (oder `.js`, `.mjs`, `.cjs`) wie folgt:

```typescript title="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    // Fügen Sie so viele lokale Sprachen hinzu, wie Sie möchten
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    // Gibt Intlayer Anweisung zur Generierung von Nachrichten-Dateien für react-intl
    dictionaryOutput: ["react-intl"],

    // Das Verzeichnis, in das Intlayer Ihre Nachrichten-JSON-Dateien schreiben wird
    reactIntlMessagesDir: "./react-intl/messages",
  },
};

export default config;
```

> **Hinweis**: Für andere Dateierweiterungen (`.mjs`, `.cjs`, `.js`) siehe die [Intlayer-Dokumentation](https://intlayer.org/de/doc/concept/configuration) für Nutzungsdetails.

---

## Erstellen Sie Ihre Intlayer Inhaltsdeklarationen

Intlayer scannt Ihren Code (standardmäßig unter `./src`) nach Dateien, die `*.content.{ts,tsx,js,jsx,mjs,mjx,cjs,cjx,json}` entsprechen.  
Hier ist ein **TypeScript** Beispiel:

```typescript title="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const content = {
  // "key" wird der obere Schlüssel der Nachricht in Ihrer react-intl JSON-Datei
  key: "my-component",

  content: {
    // Jeder Aufruf von t() erklärt ein übersetzbares Feld
    helloWorld: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    description: t({
      en: "This is a description",
      fr: "Ceci est une description",
      es: "Esta es una descripción",
    }),
  },
} satisfies Dictionary;

export default content;
```

Wenn Sie JSON oder verschiedene JS-Varianten (`.cjs`, `.mjs`) bevorzugen, bleibt die Struktur weitgehend gleich – siehe [Intlayer-Dokumentation zur Inhaltsdeklaration](https://intlayer.org/de/doc/concept/content).

---

## Erstellen der react-intl Nachrichten

Um die tatsächlichen Nachrichten-JSON-Dateien für **react-intl** zu generieren, führen Sie aus:

```bash
# mit npm
npx intlayer dictionaries build

# mit yarn
yarn intlayer build

# mit pnpm
pnpm intlayer build
```

Dies scannt alle `*.content.*` Dateien, kompiliert diese und schreibt die Ergebnisse in das Verzeichnis, das in Ihrer **`intlayer.config.ts`** angegeben ist – in diesem Beispiel `./react-intl/messages`.  
Eine typische Ausgabe könnte wie folgt aussehen:

```bash
.
└── react-intl
    └── messages
        ├── en.json
        ├── fr.json
        └── es.json
```

Jede Datei ist ein JSON-Objekt, dessen **oberste Schlüssel** den jeweiligen **`content.key`** aus Ihren Deklarationen entsprechen. Die **Unter-Schlüssel** (wie `helloWorld`) spiegeln die innerhalb dieses Inhaltselements erklärten Übersetzungen wider.

Zum Beispiel könnte die **en.json** so aussehen:

```json fileName="react-intl/messages/en/my-component.json"
{
  "helloWorld": "Hello World",
  "description": "This is a description"
}
```

---

## Initialisieren von react-intl in Ihrer React-App

### 1. Laden Sie die generierten Nachrichten

Wo Sie die Wurzelkomponente Ihrer App konfigurieren (z.B. `src/main.tsx` oder `src/index.tsx`), müssen Sie:

1. **Importieren** Sie die generierten Nachrichten-Dateien (entweder statisch oder dynamisch).
2. **Bereitstellen** Sie sie an `<IntlProvider>` von `react-intl`.

Ein einfacher Ansatz ist, sie **statisch** zu importieren:

```typescript title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";

// Importieren der JSON-Dateien aus der Build-Ausgabe.
// Alternativ können Sie sie dynamisch basierend auf der vom Benutzer gewählten Sprache importieren.
import en from "../react-intl/messages/en.json";
import fr from "../react-intl/messages/fr.json";
import es from "../react-intl/messages/es.json";

// Wenn Sie einen Mechanismus haben, um die Sprache des Benutzers zu erkennen, setzen Sie sie hier.
// Zur Vereinfachung wählen wir Englisch.
const locale = "en";

// Nachrichten in einem Objekt zusammenfassen (oder sie dynamisch auswählen)
const messagesRecord: Record<string, Record<string, any>> = {
  en,
  fr,
  es,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={messagesRecord[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
```

> **Tipp**: Für reale Projekte könnten Sie:
>
> - Die JSON-Nachrichten zur Laufzeit dynamisch laden.
> - Umweltbasierte, browserbasierte oder benutzerkontobasierte Lokalisierungserkennung verwenden.

### 2. Verwenden von `<FormattedMessage>` oder `useIntl()`

Sobald Ihre Nachrichten in `<IntlProvider>` geladen sind, kann jede Kindkomponente react-intl verwenden, um auf lokalisierte Strings zuzugreifen. Es gibt zwei Hauptansätze:

- **`<FormattedMessage>`** Komponente
- **`useIntl()`** Hook

---

## Verwendung von Übersetzungen in React-Komponenten

### Ansatz A: `<FormattedMessage>`

Für eine schnelle Inline-Nutzung:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { FormattedMessage } from "react-intl";

export default function MyComponent() {
  return (
    <div>
      <h1>
        {/* “my-component.helloWorld” verweist auf den Schlüssel aus en.json, fr.json usw. */}
        <FormattedMessage id="my-component.helloWorld" />
      </h1>

      <p>
        <FormattedMessage id="my-component.description" />
      </p>
    </div>
  );
}
```

> Die **`id`**-Eigenschaft in `<FormattedMessage>` muss mit dem **obersten Schlüssel** (`my-component`) plus allen Unter-Schlüsseln (`helloWorld`) übereinstimmen.

### Ansatz B: `useIntl()`

Für dynamischere Nutzung:

```tsx title="src/components/MyComponent/index.tsx"
import React from "react";
import { useIntl } from "react-intl";

export default function MyComponent() {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage({ id: "my-component.helloWorld" })}</h1>
      <p>{intl.formatMessage({ id: "my-component.description" })}</p>
    </div>
  );
}
```

Beide Ansätze sind gültig – wählen Sie den Stil, der am besten zu Ihrer App passt.

---

## Aktualisieren oder Hinzufügen neuer Übersetzungen

1. **Fügen Sie Inhalt in jede `*.content.*` Datei hinzu oder ändern Sie ihn.**
2. Führen Sie `intlayer build` erneut aus, um die JSON-Dateien im Verzeichnis `./react-intl/messages` zu regenerieren.
3. React (und react-intl) werden die Updates beim nächsten Mal, wenn Sie Ihre Anwendung neu erstellen oder neu laden, erkennen.

---

## TypeScript-Integration (Optional)

Wenn Sie TypeScript verwenden, kann Intlayer **Typdefinitionen** für Ihre Übersetzungen **generieren**.

- Stellen Sie sicher, dass `tsconfig.json` Ihren `types`-Ordner (oder welchen Ausgabeverzeichnis Intlayer generiert) im `"include"`-Array enthält.

```json5
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", "types"],
}
```

Die generierten Typen können dabei helfen, fehlende Übersetzungen oder ungültige Schlüssel in Ihren React-Komponenten zur Kompilierungszeit zu erkennen.

---

## Git-Konfiguration

Es ist üblich, die internen Build-Artefakte von Intlayer aus der Versionskontrolle **auszuschließen**. Fügen Sie in Ihrer `.gitignore` Folgendes hinzu:

```plaintext
# Ignoriere intlayer-Build-Artefakte
.intlayer
react-intl
```

Je nach Ihrem Workflow möchten Sie möglicherweise auch die endgültigen Wörterbücher in `./react-intl/messages` ignorieren oder committen. Wenn Ihre CI/CD-Pipeline sie regeneriert, können Sie sie sicher ignorieren; andernfalls committen Sie sie, wenn Sie sie für Produktionsbereitstellungen benötigen.
