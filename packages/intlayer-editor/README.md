<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/572ae9c9acafb74307b81530c1931a8e98990aef/docs/assets/logo.png" width="500" alt="intlayer" />
  </a>
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/intlayer">
    <img alt="npm" src="https://img.shields.io/npm/v/intlayer.svg?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="downloads" src="https://badgen.net/npm/dm/intlayer?labelColor=49516F&color=8994BC" />
  </a>
  <a href="https://npmjs.org/package/intlayer">
    <img alt="types included" src="https://badgen.net/npm/types/intlayer?labelColor=49516F&color=8994BC" 
  />
  </a>
</div>

# Intlayer Editor Documentation

The Intlayer Editor is a tool that transforms your application into a visual editor. With Intlayer Editor, your teams can manage your site's content in all configured languages.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

The `intlayer-editor` package is based on Intlayer and is available for JavaScript applications, such as React (Create React App), Vite + React, and Next.js.

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_create_react_app.md)

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_vite+react.md)

## How Intlayer Editor Works

Each time you make a change using Intlayer Editor, the server automatically inserts your changes into your [Intlayer declaration files](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md) wherever these files are declared in your project.

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

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md)

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
