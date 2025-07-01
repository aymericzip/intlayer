---
docName: vscode_extension
url: https://intlayer.org/doc/vs-code-extension
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/vs_code_extension.md
createdAt: 2025-03-17
updatedAt: 2025-06-29
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
---

# Official VS Code Extension

## Overview

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) is the official Visual Studio Code extension for **Intlayer**, designed to enhance the developer experience when working with localised content in your projects.

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

Extension link: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Features

### Instant Navigation

**Go to Definition Support** – Use `Cmd+Click` (Mac) or `Ctrl+Click` (Windows/Linux) on a `useIntlayer` key to open the corresponding content file instantly.  
**Seamless Integration** – Works effortlessly with **react-intlayer** and **next-intlayer** projects.  
**Multi-language Support** – Supports localised content across different languages.  
**VS Code Integration** – Smoothly integrates with VS Code’s navigation and command palette.

### Dictionary Management Commands

Manage your content dictionaries directly from VS Code:

- **Build Dictionaries** (`extension.buildDictionaries`) – Generate content files based on your project structure.
- **Push Dictionaries** (`extension.pushDictionaries`) – Upload the latest dictionary content to your repository.
- **Pull Dictionaries** (`extension.pullDictionaries`) – Sync the latest dictionary content from your repository to your local environment.

### Content Declaration Generator

Easily generate structured dictionary files in different formats:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## Installation

You can install **Intlayer** directly from the VS Code Marketplace:

1. Open **VS Code**.
2. Go to the **Extensions Marketplace**.
3. Search for **"Intlayer"**.
4. Click **Install**.

Alternatively, install it via the command line:

```sh
code --install-extension intlayer
```

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

## Development & Contribution

Want to contribute? We welcome community contributions!

Repo URL: https://github.com/aymericzip/intlayer-vs-code-extension

### Getting Started

Clone the repository and install dependencies:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> Use the `npm` package manager for compatibility with the `vsce` package to build and publish the extension.

### Run in Development Mode

1. Open the project in **VS Code**.
2. Press `F5` to launch a new **Extension Development Host** window.

### Submit a Pull Request

If you improve the extension, submit a PR on [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension).

## Feedback & Issues

Found a bug or have a feature request? Open an issue on our **GitHub repository**:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## Licence

Intlayer is released under the **MIT Licence**.

## Doc History

- 5.5.10 - 2025-06-29: Init history
