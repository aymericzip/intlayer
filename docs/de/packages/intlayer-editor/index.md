# intlayer-editor: NPM-Paket zur Verwendung des Intlayer-Visual-Editors

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist mit Frameworks wie React, React und Express.js kompatibel.

Das **`intlayer-editor`**-Paket ist ein NPM-Paket, das den Intlayer-Visual-Editor in Ihr React-Projekt integriert.

## Wie der Intlayer-Editor funktioniert

Der Intlayer-Editor ermöglicht die Interaktion mit dem Intlayer-Fernwörterbuch. Es kann auf der Client-Seite installiert werden und verwandelt Ihre Anwendung in einen CMS-ähnlichen Editor, um die Inhalte Ihrer Webseite in allen konfigurierten Sprachen zu verwalten.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/de/assets/intlayer_editor_ui.png)

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

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
    enabled: process.env.INTLAYER_ENABLED === "true", // Wenn falsch, ist der Editor inaktiv und kann nicht zugegriffen werden.
    // Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
    // Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
    // Sie können erhalten werden, indem Sie einen neuen Client im Intlayer-Dashboard - Projekte erstellen (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Wenn Sie keine Client-ID und kein Client-Geheimnis haben, können Sie diese erhalten, indem Sie einen neuen Client im [Intlayer-Dashboard - Projekte](https://intlayer.org/dashboard/projects) erstellen.

> Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md)

Das `intlayer-editor`-Paket basiert auf Intlayer und ist für JavaScript-Anwendungen wie React (Create React App), Vite + React und Next.js verfügbar.

Für weitere Details zur Paketeinstallation siehe den relevanten Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)

### Integration mit Vite + React

Für die Integration mit Vite + React siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md)

### Beispiel für Integration

Um den Intlayer-Visual-Editor in Ihr React-Projekt zu integrieren, befolgen Sie diese Schritte:

- Importieren Sie die Intlayer-Editor-Komponente in Ihre React-Anwendung:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* Ihr Anwendungsinhalt hier */}</IntlayerEditor>
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

Wenn der Editor installiert, aktiviert und gestartet ist, können Sie jedes von Intlayer indizierte Feld sehen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/de/assets/intlayer_editor_hover_content.png)

Wenn Ihr Inhalt umrandet ist, können Sie längere Zeit darauf drücken, um die Bearbeitungsleiste anzuzeigen.
