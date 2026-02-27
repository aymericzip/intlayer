---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Vite + React i18n - Transform an existing app into a multilingual app (i18n guide 2026)
description: Discover how to make your existing Vite and React application multilingual using Intlayer Compiler. Follow the documentation to internationalise (i18n) and translate it with AI.
keywords:
  - Internationalisation
  - Documentation
  - Intlayer
  - Vite
  - React
  - Compiler
  - AI
slugs:
  - doc
  - environment
  - vite-and-react
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Initial release
---

# How to make multilingual (i18n) an existing Vite and React application afterward (i18n guide 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalise your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-vite-react-template) on GitHub.

## Table of Contents

<TOC/>

## Why is it hard to internationalise an existing application?

If you've ever tried to add multiple languages to an app that was built for just one, you know the pain. It's not just "hard"—it's tedious. You have to comb through every single file, hunt down every string of text, and move them into separate dictionary files.

Then comes the risky part: replacing all that text with code hooks without breaking your layout or logic. It's the kind of work that halts new feature development for weeks and feels like endless refactoring.

## What is the Intlayer Compiler?

The **Intlayer Compiler** was built to skip that manual grunt work. Instead of you manually extracting strings, the compiler does it for you. It scans your code, finds the text, and uses AI to generate the dictionaries behind the scenes.
Then, it modifies your code during the build to inject the necessary i18n hooks. Basically, you keep writing your app as if it's single-language, and the compiler handles the multilingual transformation automatically.

> Doc Compiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md)

### Limitations

Because the compiler performs code analysis and transformation (inserting hooks and generating dictionaries) at **compile time**, it can **slow down the build process** of your application.

To mitigate this impact during development, you can configure the compiler to run in [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) mode or disable it when not needed.

---

## Step-by-Step Guide to Set Up Intlayer in a Vite and React Application

### Step 1: Install Dependencies

Install the necessary packages using npm:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**
  The core package that provides internationalisation tools for configuration management, translation, [content declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md), transpilation, and [CLI commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md).

- **react-intlayer**
  The package that integrates Intlayer with React application. It provides context providers and hooks for React internationalisation.

- **vite-intlayer**
  Includes the Vite plugin for integrating Intlayer with the [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), as well as middleware for detecting the user's preferred locale, managing cookies, and handling URL redirection.

### Step 2: Configure Your Project

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  compiler: {
    enabled: true, // Can be set to 'build-only' to limit impact on dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // No prefix comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "This app is a map app", // Note: you can customise this app description
  },
};

export default config;
```

> **Note**: Ensure you have your `OPEN_AI_API_KEY` set in your environment variables.

> Through this configuration file, you can set up localised URLs, middleware redirection, cookie names, the location and extension of your content declarations, disable Intlayer logs in the console, and more. For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

### Step 3: Integrate Intlayer in Your Vite Configuration

Add the intlayer plugin into your configuration.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerCompiler } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerCompiler()],
});
```

> The `intlayer()` Vite plugin is used to integrate Intlayer with Vite. It ensures the building of content declaration files and monitors them in development mode. It defines Intlayer environment variables within the Vite application. Additionally, it provides aliases to optimise performance.

> The `intlayerCompiler()` Vite plugin is used to extract content from component and write `.content` files.

### Step 4: Compile your code

Just write your components with hardcoded strings in your default locale. The compiler handles the rest.

Example of how your page might look:

<Tabs>
 <Tab value="Code">

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
 <Tab value="Output">

```ts fileName="i18n/app-content.content.json"
{
  key: "app-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        viteLogo: "Vite logo",
        reactLogo: "React logo",
        title: "Vite + React",
        countButton: "count is",
        editMessage: "Edit",
        hmrMessage: "and save to test HMR",
        readTheDocs: "Click on the Vite and React logos to learn more",
      },
      fr: {
        viteLogo: "Logo Vite",
        reactLogo: "Logo React",
        title: "Vite + React",
        countButton: "compte est",
        editMessage: "Modifier",
        hmrMessage: "et enregistrer pour tester HMR",
        readTheDocs: "Cliquez sur les logos Vite et React pour en savoir plus",
      },
    }
  }
}
```

```tsx fileName="src/App.tsx"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app-content");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.countButton} {count}
        </button>
        <p>
          {content.editMessage} <code>src/App.tsx</code> {content.hmrMessage}
        </p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

 </Tab>
</Tabs>

- **`IntlayerProvider`** is used to provide the locale to nested components.

### (Optional) Step 6: Change the language of your content

To change the language of your content, you can use the `setLocale` function provided by the `useLocale` hook. This function allows you to set the locale of the application and update the content accordingly.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

> To learn more about the `useLocale` hook, refer to the [documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

### (Optional) Step 7: Fill missing translations

Intlayer provides a CLI tool to help you fill missing translations. You can use the `intlayer` command to test and fill missing translations from your code.

```bash
npx intlayer test         # Test if there are missing translations
```

```bash
npx intlayer fill         # Fill missing translations
```

> For more details, refer to the [CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/ci.md)

### Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

### Go Further

To go further, you can implement the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) or externalise your content using the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
