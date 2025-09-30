---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: Official VS Code Extension
description: Learn how to use the Intlayer extension in VS Code to enhance your development workflow. Quickly navigate between localised content and manage your dictionaries efficiently.
keywords:
  - VS Code Extension
  - Intlayer
  - Localisation
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

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) is the official Visual Studio Code extension for **Intlayer**, designed to improve the developer experience when working with localised content in your projects.

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Extension link: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Features

![Fill dictionaries](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Instant Navigation** – Quickly jump to the correct content file when clicking on a `useIntlayer` key.
- **Fill Dictionaries** – Populate dictionaries with content from your project.

![List commands](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Easy access to Intlayer Commands** – Build, push, pull, fill, test content dictionaries with ease.

![Create content file](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **Content Declaration Generator** – Create dictionary content files in various formats (`.ts`, `.esm`, `.cjs`, `.json`).

![Test dictionaties](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Test Dictionaries** – Test dictionaries for missing translations.

![Rebuild dictionary](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Keep your dictionaries up to date** – Keep your dictionaries up to date with the latest content from your project.

![Intlayer Tab (Activity Bar)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer Tab (Activity Bar)** – Browse and search dictionaries from a dedicated side tab with toolbar and context actions (Build, Pull, Push, Fill, Refresh, Test, Create File).

## Usage

### Quick Navigation

1. Open a project using **react-intlayer**.
2. Locate a call to `useIntlayer()`, such as:

   ```tsx
   const content = useIntlayer("app");
   ```

3. **Command-click** (`⌘+Click` on macOS) or **Ctrl+Click** (on Windows/Linux) on the key (e.g., `"app"`).
4. VS Code will automatically open the corresponding dictionary file, e.g., `src/app.content.ts`.

### Intlayer Tab (Activity Bar)

Use the side tab to browse and manage dictionaries:

- Open the Intlayer icon in the Activity Bar.
- In **Search**, type to filter dictionaries and entries in real time.
- In **Dictionaries**, browse environments, dictionaries, and files. Use the toolbar for Build, Pull, Push, Fill, Refresh, Test, and Create Dictionary File. Right-click for context actions (Pull/Push on dictionaries, Fill on files). The current editor file auto-reveals in the tree when applicable.

### Accessing the commands

You can access the commands from the **Command Palette**.

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **Build Dictionaries**
- **Push Dictionaries**
- **Pull Dictionaries**
- **Fill Dictionaries**
- **Test Dictionaries**
- **Create Dictionary File**

### Loading Environment Variables

Intlayer recommends storing your AI API keys, as well as the Intlayer client ID and secret, in environment variables.

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

If your `.env` files reside outside the workspace root, set the **Base Directory** in `Settings → Extensions → Intlayer`. The loader will search for `.env` files relative to that directory.

## Doc History

| Version | Date       | Changes                             |
| ------- | ---------- | ----------------------------------- |
| 6.1.5   | 2025-09-30 | Added demo gif                      |
| 6.1.0   | 2025-09-24 | Added environment selection section |
| 6.0.0   | 2025-09-22 | Intlayer Tab / Fill & Test commands |
| 5.5.10  | 2025-06-29 | Initial history                     |
