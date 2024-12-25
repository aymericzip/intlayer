# Intlayer Editor Dokumentation

Der Intlayer Editor ist ein Tool, das Ihre Anwendung in einen visuellen Editor verwandelt. Mit dem Intlayer Editor können Ihre Teams die Inhalte Ihrer Website in allen konfigurierten Sprachen verwalten.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Das `intlayer-editor`-Paket basiert auf Intlayer und ist für JavaScript-Anwendungen wie React (Create React App), Vite + React und Next.js verfügbar.

## Integration

Für weitere Details zur Installation des Pakets siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js siehe die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App siehe die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React siehe die [Einrichtungsanleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md).

## Wie der Intlayer Editor funktioniert

Jedes Mal, wenn Sie mit dem Intlayer Editor eine Änderung vornehmen, fügt der Server Ihre Änderungen automatisch in Ihre [Intlayer-Deklarationsdateien](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md) ein, wo immer diese Dateien in Ihrem Projekt deklariert sind.

Auf diese Weise müssen Sie sich keine Gedanken darüber machen, wo die Datei deklariert ist oder wie Sie Ihren Schlüssel in Ihrer Wörterbuchsammlung finden.

## Installation

Sobald Intlayer in Ihrem Projekt konfiguriert ist, installieren Sie einfach `intlayer-editor` als Entwicklungsabhängigkeit:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

## Konfiguration

### 1. Aktivieren Sie den Editor in Ihrer intlayer.config.ts-Datei

In Ihrer Intlayer-Konfigurationsdatei können Sie die Editor-Einstellungen anpassen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Wenn false, ist der Editor inaktiv und kann nicht zugegriffen werden.
    // Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
    // Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
    // Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... andere Konfigurationseinstellungen
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Wenn false, ist der Editor inaktiv und kann nicht zugegriffen werden.
    // Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
    // Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
    // Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { type IntlayerConfig } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... andere Konfigurationseinstellungen
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Wenn false, ist der Editor inaktiv und kann nicht zugegriffen werden.
    // Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
    // Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
    // Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};

module.exports = config;
```

> Wenn Sie keine Client-ID und kein Client-Geheimnis haben, können Sie diese durch das Erstellen eines neuen Clients im [Intlayer Dashboard - Projekte](https://intlayer.org/dashboard/projects) erhalten.

> Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### 2. Fügen Sie den Intlayer Editor Provider in Ihre Anwendung ein

Um den Editor zu aktivieren, müssen Sie den Intlayer Editor Provider in Ihre Anwendung einfügen.

Beispiel für React JS oder Vite + React-Anwendungen:

```tsx {3,6,8} fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App: FC = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.mjx" codeFormat="esm"
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

```jsx {2,5,7} fileName="App.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerEditorProvider } = require("intlayer-editor");

const App = () => (
  <IntlayerProvider>
    <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
  </IntlayerProvider>
);
```

Beispiel für Next.js-Anwendungen:

```tsx {3,11,13} fileName="src/app/page.tsx" codeFormat="typescript"
import { IntlayerClientProvider, type NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";
import { IntlayerEditorProvider } from "intlayer-editor";

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

export default Page;
```

```jsx {3,11,13} fileName="src/app/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider } = require("next-intlayer/server");
const { IntlayerEditorProvider } = require("intlayer-editor");

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>
      <IntlayerServerProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
      </IntlayerServerProvider>
    </IntlayerClientProvider>
  );
};

module.exports = Page;
```

## 3. Fügen Sie die Stylesheets zu Ihrer Anwendung hinzu

Um die Editor-Styles anzuzeigen, müssen Sie die Stylesheets zu Ihrer Anwendung hinzufügen.

Falls Tailwind verwendet wird, können Sie die Stylesheets zu Ihrer `tailwind.config.js`-Datei hinzufügen:

```js fileName="tailwind.config.js"
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... Rest Ihrer Inhalte
  ],
  // ...
};
```

Andernfalls können Sie die Stylesheets in Ihrer Anwendung importieren:

```tsx fileName="app.tsx"
import "intlayer-editor/css";
```

Oder

```css fileName="app.css"
@import "intlayer-editor/css";
```

## Verwendung des Editors

Wenn der Editor installiert, aktiviert und gestartet ist, können Sie jedes Feld, das von Intlayer indexiert ist, sehen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Wenn Ihr Inhalt umrissen ist, können Sie ihn lang drücken, um die Bearbeitungsleiste anzuzeigen.
