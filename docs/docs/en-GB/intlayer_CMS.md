---
createdAt: 2025-08-23
updatedAt: 2026-07-08
title: Intlayer CMS | Externalise your content into the Intlayer CMS
description: Externalise your content into the Intlayer CMS to delegate the management of your content to your team.
keywords:
  - CMS
  - Visual Editor
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Move Live Sync section to its own page (live-sync.md), keep a short intro + link here"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Add Self-Hosting section"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Add live sync documentation"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Replace `hotReload` field with `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialise history"
author: aymericzip
---

# Intlayer Content Management System (CMS) Documentation

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

The Intlayer CMS is an application that allows you to externalise the content of an Intlayer project.

For this, Intlayer introduces the concept of 'remote dictionaries'.

![Intlayer CMS Interface](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Table of Contents

<TOC/>

---

## Understanding remote dictionaries

Intlayer distinguishes between 'local' and 'remote' dictionaries.

- A 'local' dictionary is a dictionary that is declared in your Intlayer project. Such as the declaration file of a button, or your navigation bar. Externalising your content does not make sense in this case because this content is not supposed to change often.

- A 'remote' dictionary is a dictionary that is managed through the Intlayer CMS. It could be useful to allow your team to manage your content directly on your website, and also aims to use A/B testing features and SEO automatic optimisation.

## Visual editor vs CMS

The [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) editor is a tool that allows you to manage your content in a visual editor for local dictionaries. Once a change is made, the content will be replaced in the code-base. This means that the application will be rebuilt and the page will be reloaded to display the new content.

In contrast, the Intlayer CMS is a tool that allows you to manage your content in a visual editor for remote dictionaries. Once a change is made, the content will **not** impact your code-base. The website will automatically display the updated content.

## Integrating

For more details on how to install the package, see the relevant section below:

### Integrating with Next.js

For integration with Next.js, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_nextjs_15.md).

### Integrating with Create React App

For integration with Create React App, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_create_react_app.md).

### Integrating with Vite + React

For integration with Vite + React, refer to the [setup guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_with_vite+react.md).

## Configuration

Run the following command to login to the Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

This will open your default browser to complete the authentication process and receive the necessary credentials (Client ID and Client Secret) to use Intlayer services.

In your Intlayer configuration file, you can customise the CMS settings:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
     * They can be obtained by creating a new client in the Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
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

> If you do not have a client ID and client secret, you can obtain them by creating a new client in the [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> To see all available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

## Using the CMS

### Push your configuration

To configure the Intlayer CMS, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en-GB/cli/index.md) commands.

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

This command uploads your configuration to the Intlayer CMS.

### Push a dictionary

To transform your locale dictionaries into a remote dictionary, you can use the [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/en-GB/cli/index.md) commands.

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> If you use environment variables in your `intlayer.config.ts` configuration file, you can specify the desired environment using the `--env` argument:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

This command uploads your initial content dictionaries, making them available for asynchronous fetching and editing through the Intlayer platform.

### Edit the dictionary

You will then be able to view and manage your dictionary in the [Intlayer CMS](https://app.intlayer.org/content).

## Live sync

Live Sync allows your app to reflect CMS content changes at runtime. No rebuild or redeploy is required. When enabled, updates are streamed to a Live Sync server that refreshes the dictionaries your application reads.

For the full setup guide (configuration, starting the Live Sync server, the local development workflow, and constraints), see the [Live Sync documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/live-sync.md).

## Self-Hosting

Intlayer can run entirely on your own infrastructure. A one-liner bootstraps the full stack (dashboard, API, database, object storage, and email) with Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

For the complete setup guide, environment variable reference, upgrade instructions, and backup/restore procedures, see the [Self-Hosting Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/self_hosting.md).

---

## Debug

If you encounter any issues with the CMS, check the following:

- The application is running.

- The [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) configuration is correctly set in your Intlayer configuration file.
  - Required fields:
    - The application URL should match the one you set in the editor configuration (`applicationURL`).
    - The CMS URL

- Ensure that the project configuration was pushed to the Intlayer CMS.

- The visual editor uses an iframe to display your website. Ensure that the Content Security Policy (CSP) of your website allows the CMS URL as `frame-ancestors` ('https://app.intlayer.org' by default). Check the editor console for any errors.
