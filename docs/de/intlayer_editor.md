# Intlayer Editor Dokumentation

Der Intlayer Editor ist ein Werkzeug, das Ihre Anwendung in einen visuellen Editor verwandelt. Mit dem Intlayer Editor können Ihre Teams die Inhalte Ihrer Website in allen konfigurierten Sprachen verwalten.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

Das `intlayer-editor`-Paket basiert auf Intlayer und ist für JavaScript-Anwendungen wie React (Create React App), Vite + React und Next.js verfügbar.

## Integration

Für weitere Informationen zur Installation des Pakets siehe den entsprechenden Abschnitt unten:

### Integration mit Next.js

Für die Integration mit Next.js siehe den [Einrichtungsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md).

### Integration mit Create React App

Für die Integration mit Create React App siehe den [Einrichtungsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md).

### Integration mit Vite + React

Für die Integration mit Vite + React siehe den [Einrichtungsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md).

## Wie der Intlayer Editor funktioniert

Jedes Mal, wenn Sie eine Änderung mit dem Intlayer Editor vornehmen, fügt der Server Ihre Änderungen automatisch in Ihre [Intlayer-Deklarationsdateien](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md) ein, wo immer diese Dateien in Ihrem Projekt deklariert sind.

So müssen Sie sich keine Sorgen machen, wo die Datei deklariert ist oder wie Sie Ihren Schlüssel in Ihrer Wörterbuchsammlung finden.

## Installation

Sobald Intlayer in Ihrem Projekt konfiguriert ist, installieren Sie einfach `intlayer-editor` als Entwicklungsabhängigkeit:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Konfiguration

### 1. Aktivieren Sie den Editor in Ihrer intlayer.config.ts-Datei

In Ihrer Intlayer-Konfigurationsdatei können Sie die Editor-Einstellungen anpassen:

```typescript
const config: IntlayerConfig = {
  // ... andere Konfigurationseinstellungen
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // Wenn false, ist der Editor inaktiv und kann nicht zugegriffen werden.
    // Client-ID und Client-Geheimnis sind erforderlich, um den Editor zu aktivieren.
    // Sie ermöglichen die Identifizierung des Benutzers, der den Inhalt bearbeitet.
    // Diese können erhalten werden, indem ein neuer Client im Intlayer Dashboard - Projekte erstellt wird (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> Wenn Sie keine Client-ID und kein Client-Geheimnis haben, können Sie diese erhalten, indem Sie einen neuen Client im [Intlayer Dashboard - Projekte](https://intlayer.org/dashboard/projects) erstellen.

> Um alle verfügbaren Parameter zu sehen, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### 2. Fügen Sie den Intlayer Editor Provider in Ihrer Anwendung ein

Um den Editor zu aktivieren, müssen Sie den Intlayer Editor Provider in Ihrer Anwendung einfügen.

Beispiel für React JS oder Vite + React-Anwendungen:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Beispiel für Next.js-Anwendungen:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>{/* Ihre Anwendung */}</IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## 3. Fügen Sie die Stylesheets zu Ihrer Anwendung hinzu

Um die Editor-Stile anzuzeigen, müssen Sie die Stylesheets zu Ihrer Anwendung hinzufügen.

Wenn Tailwind verwendet wird, können Sie die Stylesheets zu Ihrer `tailwind.config.js`-Datei hinzufügen:

```js
// tailwind.config.js
import tailwindConfig, { tailwindPresetConfig } from "intlayer-editor/tailwind";

module.exports = {
  presets: [tailwindPresetConfig],
  content: [
    ...tailwindConfig.content,
    // ... der Rest Ihres Inhalts
  ],
  // ...
};
```

Andernfalls können Sie die Stylesheets in Ihrer Anwendung importieren:

```tsx
// app.tsx
import "intlayer-editor/css";
```

Oder

```css
/* app.css */
@import "intlayer-editor/css";
```

## Verwendung des Editors

Wenn der Editor installiert, aktiviert und gestartet ist, können Sie jedes Feld, das von Intlayer indiziert ist, sehen, indem Sie mit dem Cursor über Ihren Inhalt fahren.

![Über den Inhalt fahren](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

Wenn Ihr Inhalt umrandet ist, können Sie ihn lange drücken, um das Bearbeitungsfeld anzuzeigen.
