---
createdAt: 2025-06-18
updatedAt: 2026-05-31
title: "Expo + React Native i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Expo + React Native app. Translate with AI agents and optimize bundle size, SEO and performances."
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - React Native
  - Expo
  - JavaScript
slugs:
  - doc
  - environment
  - react-native-and-expo
applicationTemplate: https://github.com/aymericzip/intlayer-react-native-template
applicationShowcase: https://intlayer-react-native.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 6.1.6
    date: 2025-10-02
    changes: "Add debug section"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initial history"
---

# Translate your Expo and React Native app | Internationalization (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-175 md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `react-native-localize` or `i18next`, Intlayer is a solution that comes with integrated optimizations such as:

<AccordionGroup>

<Accordion header="Full React Native coverage">

Intlayer is optimized to work perfectly with React Native and Expo by offering **component-level content scoping**, **TypeScript support**, and all the features needed for scaling internationalization (i18n) in mobile apps.

</Accordion>

<Accordion header="Maintainability">

Scoping your application's content **facilitates maintenance** for large-scale applications. You can duplicate or delete a single feature folder without the mental burden of reviewing your entire content codebase. Additionally, Intlayer is **fully typed** to ensure your content's accuracy.

</Accordion>

<Accordion header="AI Agent">

Co-locating content **reduces the context needed** by Large Language Models (LLMs). Intlayer also comes with a suite of tools, such as a **CLI** to test for missing translations,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, and **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, to make the developer experience (DX) even smoother for AI agents.

</Accordion>

<Accordion header="Automation">

Use automation to translate in your CI/CD pipeline using the LLM of your choice at the cost of your AI provider. Intlayer also offers a **compiler** to automate content extraction, as well as a [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) to help **translate in the background**.

</Accordion>

<Accordion header="Performance">

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimizes your content loading at build time.

</Accordion>

<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and view sizes by up to 50%**.

</Accordion>
</AccordionGroup>

## Step 1: Install Dependencies

See [Application Template](https://github.com/aymericzip/intlayer-react-native-template) on GitHub.

From your React Native project, install the following packages:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install --save-dev react-native-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add --save-dev react-native-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add --save-dev react-native-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add --dev react-native-intlayer
bun x intlayer init
```

### Packages

- **intlayer**  
  The core i18n toolkit for configuration, dictionary content, types generation, and CLI commands.

- **react-intlayer**  
  React integration that provides the context providers and React hooks you’ll use in React Native for obtaining and switching locales.

- **react-native-intlayer**  
  React Native integration that provides the Metro plugin for integrating Intlayer with the React Native bundler.

---

## Step 2: Create an Intlayer Config

In your project root (or anywhere convenient), create an **Intlayer config** file. It might look like this:

```ts fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
/**
 * If Locales types is not available, try to set moduleResolution to "bundler" in your tsconfig.json
 */
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ... Add any other locales you need
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Within this config, you can:

- Configure your **list of supported locales**.
- Set a **default** locale.
- Later, you may add more advanced options (e.g., logs, custom content directories, etc.).
- See the [Intlayer configuration docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) for more.

## Step 3: Add the Metro plugin

Metro is a bundler for React Native. It is the default bundler for React Native projects created with the `react-native init` command. To use Intlayer with Metro, you need to add the plugin to your `metro.config.js` file:

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);

  return await configMetroIntlayer(defaultConfig);
})();
```

> Note: `configMetroIntlayer` is a promise function. Use `configMetroIntlayerSync` instead if you want to use it synchronously, or avoid IFFE (Immediately Invoked Function Expression).
> Note: `configMetroIntlayerSync` does not allow to build intlayer dictionaries on server start

## Step 4: Add the Intlayer provider

To keep synchronized the user language across your application, you need to wrap your root component with the `IntlayerProvider` component from `react-intlayer-native`.

> Make sure to use the provider from `react-native-intlayer` instead of `react-intlayer`. The export from `react-native-intlayer` includes polyfills for the web API.

Also, you need to add the `intlayerPolyfill` function to your `index.js` file to ensure that Intlayer can work properly.

```tsx fileName="app/_layout.tsx" codeFormat={["typescript", "esm"]}
import { Stack } from "expo-router";
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";
import { type FC } from "react";

const getDeviceLocale = () => getLocales()[0]?.languageTag;

const RootLayout: FC = () => {
  return (
    <IntlayerProvider defaultLocale={getDeviceLocale()}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </IntlayerProvider>
  );
};

export default RootLayout;
```

## Step 5: Declare Your Content

Create **content declaration** files anywhere in your project (commonly within `src/`), using any of the extension formats that Intlayer supports:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`
- etc.

Example (TypeScript with TSX nodes for React Native):

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

/**
 * Content dictionary for our "app" domain
 */
import { t, type Dictionary } from "intlayer";

const homeScreenContent = {
  key: "home-screen",
  content: {
    title: t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    }),
  },
} satisfies Dictionary;

export default homeScreenContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> For details on content declarations, see [Intlayer’s content docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

---

## Step 4: Use Intlayer in Your Components

Use the `useIntlayer` hook in child components to get localized content.

### Example

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-intlayer";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { type FC } from "react";

const HomeScreen = (): FC => {
  const { title, steps } = useIntlayer("home-screen");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> When using `content.someKey` in string-based props (e.g., a button’s `title` or a `Text` component’s `children`), **call `content.someKey.value`** to get the actual string.

> If your app already exists, you can use the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md), as well as the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md), to transform thousands of components in a second.

---

## (Optional) Step 5: Change the App Locale

To switch locales from within your components, you can use the `useLocale` hook’s `setLocale` method:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-intlayer";

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
});
```

This triggers a re-render of all components that use Intlayer content, now showing translations for the new locale.

> See [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) for more details.

## Configure TypeScript (if you use TypeScript)

Intlayer generates type definitions in a hidden folder (by default `.intlayer`) to improve autocompletion and catch translation errors:

```json5
// tsconfig.json
{
  // ... your existing TS config
  "include": [
    "src", // your source code
    ".intlayer/types/**/*.ts", // <-- ensure the auto-generated types are included
    // ... anything else you already include
  ],
}
```

This is what enables features like:

- **Autocompletion** for your dictionary keys.
- **Type checking** that warns if you access a non-existent key or mismatch the type.

---

## Git Configuration

To avoid committing auto-generated files by Intlayer, add the following to your `.gitignore`:

```bash
# Ignore the files generated by Intlayer
.intlayer
```

---

### VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

- **Visual Editor**: Use the [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md) to manage translations visually.
- **CMS Integration**: You can also externalize and fetch your dictionary content from a [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
- **CLI Commands**: Explore the [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for tasks like **extracting translations** or **checking missing keys**.

Enjoy building your **React Native** apps with fully powered i18n through **Intlayer**!

---

### Debug

React Native can be less stable than React Web, so pay extra attention to version alignment.

Intlayer primarily targets the Web Intl API; on React Native you must include the appropriate polyfills.

Checklist:

- Use the latest versions of `intlayer`, `react-intlayer`, and `react-native-intlayer`.
- Enable the Intlayer polyfill.
- If you use `getLocaleName` or other Intl-API-based utilities, import these polyfills early (for example in `index.js` or `App.tsx`):

```ts
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-displaynames/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/polyfill";
```

- Verify your Metro configuration (resolver aliases, asset plugins, `tsconfig` paths) if modules fail to resolve.

---
