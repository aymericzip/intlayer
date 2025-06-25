---
docName: intlayer_CMS
url: https://intlayer.org/doc/concept/cms
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_CMS.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Intlayer CMS | Externalize your content into the Intlayer CMS
description: Externalize your content into the Intlayer CMS to delegate the management of your content to your team.
keywords:
  - CMS
  - Visual Editor
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intlayer Content Management System (CMS) Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

The Intlayer CMS is an Application that allows you to externalise your content of an Intlayer project.

For that, Intlayer introduces the concept of 'distant dictionaries'.

![Intlayer CMS Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

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

In your Intlayer configuration file, you can customise the CMS settings:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    /**
     * Required
     *
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Required
     *
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
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the CMS.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the backend.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    /**
     * Required
     *
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Required
     *
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
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the CMS.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the backend.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
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
     * Required
     *
     * The URL of the application.
     * This is the URL targeted by the visual editor.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Required
     *
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
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the CMS.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Optional
     *
     * In the case you are self-hosting the Intlayer CMS, you can set the URL of the backend.
     *
     * The URL of the Intlayer CMS.
     * By default, it is set to https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> If you don't have a client ID and client secret, you can obtain them by creating a new client in the [Intlayer Dashboard - Projects](https://intlayer.org/dashboard/projects).

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/configuration.md).

## Using the CMS

### Push your configuration

To configure the Intlayer CMS, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en-GB/intlayer_cli.md) commands.

```bash
npx intlayer config push
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash
npx intlayer config push --env production
```

This command uploads your configuration to the Intlayer CMS.

### Push a dictionary

To transform your locale dictionaries into a distant dictionary, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en-GB/intlayer_cli.md) commands.

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

This command uploads your initial content dictionaries, making them available for asynchronous fetching and editing through the Intlayer platform.

### Edit the dictionary

Then you will be able to see and manage your dictionary in the [Intlayer CMS](https://intlayer.org/dashboard/content).

## Hot reloading

The Intlayer CMS is able to hot reload the dictionaries when a change is detected.

Without the hot reloading, a new build of the application will be needed to display the new content.

By activating the [`hotReload`](https://intlayer.org/doc/concept/configuration#editor-configuration) configuration, the application will automatically replace the updated content when it is detected.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    // ... other configuration settings

    /**
     * Indicates if the application should hot reload the locale configurations when a change is detected.
     * For example, when a new dictionary is added or updated, the application will update the content to display on the page.
     *
     * Because the hot reloading needs a continuous connection to the server, it is only available for clients of the `enterprise` plan
     *
     * Default: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    // ... other configuration settings

    /**
     * Indicates if the application should hot reload the locale configurations when a change is detected.
     * For example, when a new dictionary is added or updated, the application will update the content to display on the page.
     *
     * Because the hot reloading needs a continuous connection to the server, it is only available for clients of the `enterprise` plan
     *
     * Default: false
     */
    hotReload: true,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    // ... other configuration settings

    /**
     * Indicates if the application should hot reload the locale configurations when a change is detected.
     * For example, when a new dictionary is added or updated, the application will update the content to display on the page.
     *
     * Because the hot reloading needs a continuous connection to the server, it is only available for clients of the `enterprise` plan
     *
     * Default: false
     */
    hotReload: true,
  },
};

module.exports = config;
```

The hot reloading replaces the content on both server and client sides.

- On the server side, you should ensure that the application process has write access to the `.intlayer/dictionaries` directory.
- On the client side, the hot reloading allows the application to hot reload the content in the browser, without needing to reload the page. However, this feature is only available for client components.

> Because the hot reloading needs a continuous connection to the server using an `EventListener`, it is only available for clients of the `enterprise` plan.

## Debug

If you encounter any issues with the CMS, check the following:

- The application is running.

- The [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) configuration is correctly set in your Intlayer configuration file.

  - Required fields:
    - The application URL should match the one you set in the editor configuration (`applicationURL`).
    - The CMS URL

- Ensure that the project configuration was pushed to the Intlayer CMS.

- The visual editor uses an iframe to display your website. Ensure that the Content Security Policy (CSP) of your website allows the CMS URL as `frame-ancestors` ('https://intlayer.org' by default). Check the editor console for any errors.
