# intlayer-editor: NPM-Paket zur Verwendung des visuellen Intlayer-Editors

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`intlayer-editor`**-Paket ist ein NPM-Paket, das den visuellen Intlayer-Editor in Ihr React-Projekt integriert.

## Wie der Intlayer-Editor funktioniert

Der Intlayer-Editor ermöglicht die Interaktion mit dem entfernten Intlayer-Wörterbuch. Er kann auf der Client-Seite installiert werden und Ihre Anwendung in einen CMS-ähnlichen Editor verwandeln, um den Inhalt Ihrer Website in allen konfigurierten Sprachen zu verwalten.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Konfiguration

In Ihrer Intlayer-Konfigurationsdatei können Sie die Editor-Einstellungen anpassen:

```typescript
const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Wenn false, ist der Editor inaktiv und kann nicht aufgerufen werden.
    // Client-ID und Client-Secret sind erforderlich, um den Editor zu aktivieren.
    // Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
    // Sie können durch das Erstellen eines neuen Clients im Intlayer-Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Wenn Sie keine Client-ID und kein Client-Secret haben, können Sie diese durch das Erstellen eines neuen Clients im [Intlayer-Dashboard - Projekte](https://intlayer.org/dashboard/projects) erhalten.

> Um alle verfügbaren Parameter zu sehen, lesen Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md)

Das `intlayer-editor`-Paket basiert auf Intlayer und ist für JavaScript-Anwendungen verfügbar, wie React (Create React App), Vite + React und Next.js.

Für weitere Details zur Installation des Pakets siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js lesen Sie den [Setup-Guide](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App lesen Sie den [Setup-Guide](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)

### Integration mit Vite + React

Für die Integration mit Vite + React lesen Sie den [Setup-Guide](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md)

### Beispiel für die Integration

Um den visuellen Intlayer-Editor in Ihr React-Projekt zu integrieren, folgen Sie diesen Schritten:

- Importieren Sie die Intlayer-Editor-Komponente in Ihre React-Anwendung:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* Ihr App-Inhalt hier */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Importieren Sie die Intlayer-Editor-Stile in Ihre Next.js-Anwendung:

  ```tsx fileName="src/app/[locale]/layout.jsx"
  import { IntlayerEditorStyles } from "intlayer-editor";

  export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    return (
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          <html lang={locale}>
            <body className={IntlayerEditorStyles}>{children}</body>
          </html>
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    );
  }
  ```

## Verwendung des Editors

Wenn der Editor installiert, aktiviert und gestartet ist, können Sie jedes von Intlayer indizierte Feld anzeigen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Wenn Ihr Inhalt umrandet ist, können Sie ihn lange drücken, um die Bearbeitungsleiste anzuzeigen.
