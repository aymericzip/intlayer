# Intlayer Editor Documentation

The Intlayer Editor is a tool that transforms your application into a visual editor. With Intlayer Editor, your teams can manage your site's content in all configured languages.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

The `intlayer-editor` package is based on Intlayer and is available for JavaScript applications, such as React (Create React App), Vite + React, and Next.js.

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_nextjs_en.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_create_react_app_en.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/intlayer_with_vite+react_en.md).

## How Intlayer Editor Works

Each time you make a change using Intlayer Editor, the server automatically inserts your changes into your [Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/content_declaration/get_started_en.md), wherever these files are declared in your project.

In this way, you don't have to worry about where the file is declared or about finding your key in your dictionary collection.

## Installation

Once Intlayer is configured in your project, simply install `intlayer-editor` as a development dependency:

```bash
npm install intlayer-editor
```

```bash
yarn add intlayer-editor
```

```bash
pnpm add intlayer-editor
```

## Configuration

### 1. Enable the Editor in your intlayer.config.ts file

In your Intlayer configuration file, you can customize the editor settings:

```typescript
const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // If false, the editor is inactive and cannot be accessed.
    // Client ID and client secret are required to enable the editor.
    // They allow the identify the user who is editing the content.
    // They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> If you don't have a client ID and client secret, you can obtain them by creating a new client in the [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/configuration_en.md).

### 2. Insert the Intlayer Editor Provider in your application

To enable the editor, you need to insert the Intlayer Editor Provider in your application.

Example for React JS or Vite + React applications:

```tsx
import { IntlayerProvider } from "react-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function App() {
  return (
    <IntlayerProvider>
      <IntlayerEditorProvider>{/* Your application */}</IntlayerEditorProvider>
    </IntlayerProvider>
  );
}
```

Example for Next.js applications:

```tsx
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerEditorProvider } from "intlayer-editor";

function Page() {
  return (
    <IntlayerServerProvider locale={locale}>
      <IntlayerClientProvider locale={locale}>
        <IntlayerEditorProvider>
          {/* Your application */}
        </IntlayerEditorProvider>
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
}
```

## Using the Editor

When the editor is installed, enabled, and started, you can view each field indexed by Intlayer by hovering over your content with your cursor.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

If your content is outlined, you can long-press it to display the edit drawer.
