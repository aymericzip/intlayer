<p align="center">
  <a href="https://intlayer.org" rel="">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer Logo" />
  </a>
</p>

<h1 align="center">
  <strong>Per-component i18n</strong>
</h1>

<h2 align="center">
  <strong>AI-powered translation. Visual Editor. Multilingual CMS.</strong>
</h2>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content" rel="">Docs</a> •
  <a href="https://intlayer.org/doc/environment/nextjs" rel="">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react" rel="">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms" rel="">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk" rel="noopener noreferrer nofollow">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm version" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub Stars" height="24"/></a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="monthly downloads" height="24"/></a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="license"/></a>
  <a href="https://github.com/aymericzip/intlayer/commits/main" target="_blank" rel="noopener noreferrer nofollow"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000&cacheSeconds=86400" alt="last commit"/>
  </a>
</p>

**Intlayer** enhances your VS Code experience by enabling **Go to Definition** support for `useIntlayer` keys in React, Next.js, Vue and Svelte projects, as well as for keys used through the Intlayer compat packages for **i18next**, **react-i18next**, **next-i18next**, **next-intl**, **use-intl**, **react-intl**, **vue-i18n** and **Lingui**. With this extension, you can **command-click** (`Ctrl+Click` on Windows/Linux) on a `useIntlayer` key and instantly navigate to the corresponding content file.

## Overview

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) is the official Visual Studio Code extension for **Intlayer**, designed to improve the developer experience when working with localized content in your projects.

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif?raw=true)

Extension link: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## Features

![Extract content](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extention_extract_content.gif?raw=true)

- **Extract Content** – Extract content from your React / Vue / Svelte components

![Fill dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **Instant Navigation** – Quickly jump to the correct content file when clicking on a `useIntlayer` key.
- **Fill Dictionaries** – Fill dictionaries with content from your project.

![List commands](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extention_list_commands.gif?raw=true)

- **Easy access to Intlayer Commands** – Build, push, pull, fill, test content dictionaries with ease.

![Create content file](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extention_create_content_file.gif?raw=true)

- **Content Declaration Generator** – Create dictionary content files in various formats (`.ts`, `.esm`, `.cjs`, `.json`, `.md`, `.yaml`).

![Test dictionaties](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **Test Dictionaries** – Test dictionaries for missing translations.

![Rebuild dictionary](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **Keep your dictionaries up to date** – Keep your dictionaries up to date with the latest content from your project.

![Intlayer Tab (Activity Bar)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer Tab (Activity Bar)** – Browse and search dictionaries from a dedicated side tab with toolbar and context actions (Build, Pull, Push, Fill, Refresh, Test, Create File).

## Compatible i18n libraries

Already using another i18n library? Intlayer provides drop-in compat packages, and the extension understands their translation calls the same way it understands `useIntlayer`: navigation to the content file, hover previews and unused-key detection.

| Library                                                                     | Intlayer compat package   | Supported forms                                                             |
| --------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| [i18next](https://www.i18next.com)                                          | `@intlayer/i18next`       | `i18next.getFixedT(lng, 'ns')`, `t('key')`                                  |
| [react-i18next](https://react.i18next.com)                                  | `@intlayer/react-i18next` | `const { t } = useTranslation('ns')`, `t('key')`, `<Trans i18nKey="key" />` |
| [next-i18next](https://github.com/i18next/next-i18next)                     | `@intlayer/next-i18next`  | `const { t } = useTranslation('ns')`, `t('key')`, `<Trans i18nKey="key" />` |
| [next-intl](https://next-intl.dev)                                          | `@intlayer/next-intl`     | `useTranslations('ns')`, `await getTranslations('ns')`, `t('key')`          |
| [use-intl](https://github.com/amannn/next-intl/tree/main/packages/use-intl) | `@intlayer/use-intl`      | `useTranslations('ns')`, `createTranslator({ namespace })`, `t('key')`      |
| [react-intl (FormatJS)](https://formatjs.github.io)                         | `@intlayer/react-intl`    | `intl.formatMessage({ id })`, `<FormattedMessage id="key" />`               |
| [vue-i18n](https://vue-i18n.intlify.dev)                                    | `@intlayer/vue-i18n`      | `const { t } = useI18n()`, `t('key')`, `{{ t('key') }}` in templates        |
| [Lingui](https://lingui.dev)                                                | `@intlayer/lingui`        | `useLingui()`, `` t`…` ``, `i18n._('id')`, `<Trans id="key" />`             |

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
- In **Dictionaries**, browse environments, dictionaries, and files. Use the toolbar for Build, Pull, Push, Fill, Refresh, Test, and Create Dictionary File. Right‑click for context actions (Pull/Push on dictionaries, Fill on files). The current editor file auto‑reveals in the tree when applicable.

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

## Development & Contribution

Interested in improving the extension? Contributions are welcome! See [CONTRIBUTING.md](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) for more information.

## Feedback & Issues

If you encounter any issues or have feature requests, please open an issue on [GitHub](https://github.com/aymericzip/intlayer/issues).

## 📜 License

This extension is licensed under the **MIT License**.
