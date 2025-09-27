---
createdAt: 2025-03-17
updatedAt: 2025-09-22
title: Official VS Code Extension
description: Learn how to use the Intlayer extension in VS Code to enhance your development workflow. Quickly navigate between localized content and manage your dictionaries efficiently.
keywords:
  - VS Code Extension
  - Intlayer
  - Localization
  - Development Tools
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# Official VS Code Extension

## Overview

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) is the official Visual Studio Code extension for **Intlayer**, designed to improve the developer experience when working with localized content in your projects.

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Extension link: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Features

### Instant Navigation

**Go to Definition Support** – Use `⌘ + Click` (Mac) or `Ctrl + Click` (Windows/Linux) on a `useIntlayer` key to open the corresponding content file instantly.  
**Seamless Integration** – Works effortlessly with **react-intlayer** and **next-intlayer** projects.  
**Multi-language Support** – Supports localized content across different languages.  
**VS Code Integration** – Smoothly integrates with VS Code’s navigation and command palette.

### Dictionary Management Commands

Manage your content dictionaries directly from VS Code:

- **Build Dictionaries** – Generate content files based on your project structure.
- **Push Dictionaries** – Upload the latest dictionary content to your repository.
- **Pull Dictionaries** – Sync the latest dictionary content from your repository to your local environment.
- **Fill Dictionaries** – Populate dictionaries with content from your project.
- **Test Dictionaries** – Identify missing or incomplete translations.

### Content Declaration Generator

Easily generate structured dictionary files in different formats:

If you're currently working on a component, it will generate the `.content.{ts,tsx,js,jsx,mjs,cjs,json}` file for you.

Example of component:

```tsx fileName="src/components/MyComponent/index.tsx"
const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("my-component");

  return <span>{myTranslatedContent}</span>;
};
```

Generated file in TypeScript format:

```tsx fileName="src/components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "my-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

Available formats:

- **TypeScript (`.ts`)**
- **ES Module (`.esm`)**
- **CommonJS (`.cjs`)**
- **JSON (`.json`)**

### Intlayer Tab (Activity Bar)

Open the Intlayer tab by clicking the Intlayer icon in the VS Code Activity Bar. It contains two views:

- **Search**: A live search bar to quickly filter dictionaries and their content. Typing updates the results instantly.
- **Dictionaries**: A tree view of your environments/projects, dictionary keys, and the files contributing entries. You can:
  - Click a file to open it in the editor.
  - Use the toolbar to run actions: Build, Pull, Push, Fill, Refresh, Test, and Create Dictionary File.
  - Use the context menu for item‑specific actions:
    - On a dictionary: Pull or Push
    - On a file: Fill Dictionary
  - When you switch editors, the tree will reveal the matching file if it belongs to a dictionary.

## Installation

You can install **Intlayer** directly from the VS Code Marketplace:

1. Open **VS Code**.
2. Go to the **Extensions Marketplace**.
3. Search for **"Intlayer"**.
4. Click **Install**.

## Usage

### Quick Navigation

1. Open a project using **react-intlayer**.
2. Locate a call to `useIntlayer()`, such as:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` on macOS) or **Ctrl+Click** (on Windows/Linux) on the key (e.g., `"app"`).
4. VS Code will automatically open the corresponding dictionary file, e.g., `src/app.content.ts`.

### Managing Content Dictionaries

### Intlayer Tab (Activity Bar)

Use the side tab to browse and manage dictionaries:

- Open the Intlayer icon in the Activity Bar.
- In **Search**, type to filter dictionaries and entries in real time.
- In **Dictionaries**, browse environments, dictionaries, and files. Use the toolbar for Build, Pull, Push, Fill, Refresh, Test, and Create Dictionary File. Right‑click for context actions (Pull/Push on dictionaries, Fill on files). The current editor file auto‑reveals in the tree when applicable.

#### Building Dictionaries

Generate all dictionary content files with:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

Search for **Build Dictionaries** and execute the command.

#### Pushing Dictionaries

Upload the latest dictionary content:

1. Open the **Command Palette**.
2. Search for **Push Dictionaries**.
3. Select the dictionaries to push and confirm.

#### Pulling Dictionaries

Sync the latest dictionary content:

1. Open the **Command Palette**.
2. Search for **Pull Dictionaries**.
3. Choose the dictionaries to pull.

#### Filling Dictionaries

Fill dictionaries with content from your project:

1. Open the **Command Palette**.
2. Search for **Fill Dictionaries**.
3. Run the command to populate dictionaries.

#### Testing Dictionaries

Validate dictionaries and find missing translations:

1. Open the **Command Palette**.
2. Search for **Test Dictionaries**.
3. Review the reported issues and fix as needed.

### Loading Environment Variables

Intlayer recommand to store your AI API keys, as well as Intlayer client ID and secret in environment variables.

The extension can load environment variables from your workspace to run Intlayer commands with the correct context.

- **Load order (by priority)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **Non-destructive**: existing `process.env` values are not overridden.
- **Scope**: files are resolved from the configured base directory (defaults to the workspace root).

#### Selecting the active environment

- **Command Palette**: open the palette and run `Intlayer: Select Environment`, then choose the environment (e.g., `development`, `staging`, `production`). The extension will attempt to load the first available file in the priority list above and show a notification like “Loaded env from .env.<env>.local”.
- **Settings**: go to `Settings → Extensions → Intlayer`, and set:
  - **Environment**: the environment name used to resolve `.env.<env>*` files.
  - (Optional) **Env File**: an explicit path to a `.env` file. When provided, it takes precedence over the inferred list.

#### Monorepos and custom directories

If your `.env` files live outside the workspace root, set the **Base Directory** in `Settings → Extensions → Intlayer`. The loader will look for `.env` files relative to that directory.

#### Notes

- The extension loads the first matching file and keeps any existing variables intact.
- You’ll see an info message each time a file is successfully loaded.
- If no candidate file is found, commands still run with your current environment variables.

## Doc History

| Version | Date       | Changes                             |
| ------- | ---------- | ----------------------------------- |
| 6.1.0   | 2025-09-24 | Added environment selection section |
| 6.0.0   | 2025-09-22 | Intlayer Tab / Fill & Test commands |
| 5.5.10  | 2025-06-29 | Init history                        |
