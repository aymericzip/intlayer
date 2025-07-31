---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - Visuelles Übersetzungseditor-Paket
description: Visuelles Editor-Paket für Intlayer, das eine intuitive Schnittstelle zur Verwaltung von Übersetzungen und kollaborativen Inhaltsbearbeitung mit KI-Unterstützung bietet.
keywords:
  - intlayer
  - editor
  - visuell
  - übersetzung
  - kollaborativ
  - KI
  - NPM
  - schnittstelle
slugs:
  - doc
  - package
  - intlayer-editor
---

# intlayer-editor: NPM-Paket zur Nutzung des Intlayer visuellen Editors

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, React und Express.js.

Das **`intlayer-editor`** Paket ist ein NPM-Paket, das den Intlayer visuellen Editor in Ihr React-Projekt integriert.

## Funktionsweise des Intlayer Editors

Der Intlayer Editor ermöglicht die Interaktion mit dem entfernten Intlayer-Wörterbuch. Er kann auf der Client-Seite installiert werden und verwandelt Ihre Anwendung in einen CMS-ähnlichen Editor, um die Inhalte Ihrer Website in allen konfigurierten Sprachen zu verwalten.

![Intlayer Editor Oberfläche](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

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
    enabled: process.env.INTLAYER_ENABLED === "true", // Wenn false, ist der Editor inaktiv und kann nicht aufgerufen werden.
    // Client-ID und Client-Secret sind erforderlich, um den Editor zu aktivieren.
    // Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
    // Sie können durch das Erstellen eines neuen Clients im Intlayer Dashboard - Projekte (https://intlayer.org/dashboard/projects) erhalten werden.
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Wenn Sie keine Client-ID und kein Client-Secret haben, können Sie diese durch das Erstellen eines neuen Clients im [Intlayer Dashboard - Projekte](https://intlayer.org/dashboard/projects) erhalten.

> Um alle verfügbaren Parameter zu sehen, konsultieren Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Das `intlayer-editor`-Paket basiert auf Intlayer und ist für JavaScript-Anwendungen wie React (Create React App), Vite + React und Next.js verfügbar.

Für weitere Details zur Installation des Pakets siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React siehe die [Setup-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md).

### Beispiel für die Integration

Um den Intlayer Visual Editor in Ihr React-Projekt zu integrieren, folgen Sie diesen Schritten:

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

Wenn der Editor installiert, aktiviert und gestartet ist, können Sie jedes von Intlayer indexierte Feld anzeigen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

![Über den Inhalt fahren](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Wenn Ihr Inhalt umrandet ist, können Sie ihn lange drücken, um die Bearbeitungsleiste anzuzeigen.

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Historie initialisiert
