---
docName: package__intlayer-editor
url: https://intlayer.org/doc/package/intlayer-editor
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer-editor/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-editor - Visual Translation Editor Package
description: Visual editor package for Intlayer providing an intuitive interface for managing translations and collaborative content editing with AI assistance.
keywords:
  - intlayer
  - editor
  - visual
  - translation
  - collaborative
  - AI
  - NPM
  - interface
---

# intlayer-editor: NPM Package to use the Intlayer visual editor

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, React, and Express.js.

The **`intlayer-editor`** package is an NPM package that integrates the Intlayer visual editor into your React project.

## How Intlayer Editor Works

The Intlayer editor allows interaction with the Intlayer remote dictionary. It can be installed on the client side and transform your application into a CMS-like editor to manage your site's content in all configured languages.

![Intlayer Editor Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_ui.png)

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install intlayer-editor
```

```bash packageManager="pnpm"
pnpm add intlayer-editor
```

```bash packageManager="yarn"
yarn add intlayer-editor
```

### Configuration

In your Intlayer configuration file, you can customise the editor settings:

```typescript
const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    enabled: process.env.INTLAYER_ENABLED === "true", // If false, the editor is inactive and cannot be accessed.
    // Client ID and client secret are required to enable the editor.
    // They allow the identification of the user who is editing the content.
    // They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
};
```

> If you don't have a client ID and client secret, you can obtain them by creating a new client in the [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md)

The `intlayer-editor` package is based on Intlayer and is available for JavaScript applications, such as React (Create React App), Vite + React, and Next.js.

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_create_react_app.md)

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md)

### Example of integration

To integrate the Intlayer visual editor into your React project, follow these steps:

- Import the Intlayer editor component into your React application:

  ```tsx fileName="src/App.jsx"
  import { IntlayerEditorProvider } from "intlayer-editor";
  import { IntlayerProvider } from "react-intlayer";

  export default function App() {
    return (
      <IntlayerProvider>
        <IntlayerEditorProvider>
          <IntlayerEditor>{/* Your App content here */}</IntlayerEditor>
        </IntlayerEditorProvider>
      </IntlayerProvider>
    );
  }
  ```

- Import the Intlayer editor styles into your Next.js application:

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

## Using the Editor

When the editor is installed, enabled, and started, you can view each field indexed by Intlayer by hovering over your content with your cursor.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

If your content is outlined, you can long-press it to display the edit drawer.

## Doc History

- 5.5.10 - 2025-06-29: Initial history
