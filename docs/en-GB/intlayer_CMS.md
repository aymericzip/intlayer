# Intlayer Content Management System (CMS) Documentation

The Intlayer CMS is an Application that allows you to externalise your content of an Intlayer project.

For that, Intlayer introduces the concept of 'distant dictionaries'.

## Understanding distant dictionaries

Intlayer makes a difference between 'local' and 'distant' dictionaries.

- A 'local' dictionary is a dictionary that is declared in your Intlayer project. Such as the declaration file of a button, or your navigation bar. Externalising your content does not make sense in this case because this content is not supposed to change often.

- A 'distant' dictionary is a dictionary that is managed through the Intlayer CMS. It could be useful to allow your team to manage your content directly on your website, and also aims to use A/B testing features and SEO automatic optimisation.

## Visual editor vs CMS

The [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_visual_editor.md) editor is a tool that allows you to manage your content in a visual editor for local dictionaries. Once a change is made, the content will be replaced in the code-base. That means that the application will be rebuilt and the page will be reloaded to display the new content.

In contrast, the Intlayer CMS is a tool that allows you to manage your content in a visual editor for distant dictionaries. Once a change is made, the content will **not** impact your code-base. And the website will automatically display the changed content.

## Integrating

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_create_react_app.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/intlayer_with_vite+react.md).

## Configuration

### 1. Enable the Editor in your intlayer.config.ts file

In your Intlayer configuration file, you can customise the editor settings:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    /**
     * Client ID and client secret are required to enable the editor.
     * They allow the identification of the user who is editing the content.
     * They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Optional
     * Default as `true`. If `false`, the editor is inactive and cannot be accessed.
     * Can be used to disable the editor for specific environments for security reasons, such as production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    /**
     * Client ID and client secret are required to enable the editor.
     * They allow the identification of the user who is editing the content.
     * They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,    /**
     * Optional
     * Default as `true`. If `false`, the editor is inactive and cannot be accessed.
     * Can be used to disable the editor for specific environments for security reasons, such as production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    /**
     * Client ID and client secret are required to enable the editor.
     * They allow the identification of the user who is editing the content.
     * They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://intlayer.org/dashboard/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    /**
     * Optional
     * Default as `true`. If `false`, the editor is inactive and cannot be accessed.
     * Can be used to disable the editor for specific environments for security reasons, such as production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
```

> If you don't have a client ID and client secret, you can obtain them by creating a new client in the [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md).

## Using the CMS

When the editor is installed, you can view each field indexed by Intlayer by hovering over your content with your cursor.

![Hovering over content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

If your content is outlined, you can long-press it to display the edit drawer.
