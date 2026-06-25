---
createdAt: 2025-06-18
updatedAt: 2026-06-25
title: "Expo + React Native i18n - Complete guide to translate your app"
description: "No more i18next. The 2026 guide to building a multilingual (i18n) Expo + React Native app. Translate with AI agents and optimise bundle size, SEO and performances."
keywords:
  - Internationalisation
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Import providers and hooks directly from react-native-intlayer; react-intlayer is no longer needed as a direct dependency"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Update Solid useIntlayer API usage to direct property access"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Add init command"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initial history"
author: aymericzip
---

# Translate your Expo and React Native app | Internationalisation (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalise your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-native.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-native-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Table of Contents

<TOC/>

## Why Intlayer over alternatives?

Compared to main solutions like `react-native-localize` or `i18next`, Intlayer is a solution that comes with integrated optimisations such as:

<AccordionGroup>

<Accordion header="Full React Native coverage">

Intlayer is optimised to work perfectly with React Native and Expo by offering **component-level content scoping**, **TypeScript support**, and all the features needed for scaling internationalisation (i18n) in mobile apps.

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

Connecting massive JSON files to components can lead to performance and reactivity issues. Intlayer optimises your content loading at build time.

</Accordion>

<Accordion header="Scaling with none-dev">

More than just an i18n solution, Intlayer provides an **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** and a **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** to help you manage your multilingual content in **real-time**, making collaboration with translators, copywriters, and other team members seamless. Content can be stored locally and/or remotely.

</Accordion>

<Accordion header="Bundle size">

Instead of loading massive JSON files into your pages, load only the necessary content. Intlayer helps **reduce your bundle and view sizes by up to 50%**.

</Accordion>
</AccordionGroup>

<Steps>

<Step number={1} title="Install Dependencies">

See [Application Template](https://github.com/aymericzip/intlayer-react-native-template) on GitHub.

From your React Native project, install the following packages:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> the `--interactive` flag is optional. Use `intlayer-cli init` if you're an AI agent.

> This command will detect your environment and install the required packages. For example:

```bash packageManager="npm"
npm install intlayer react-native-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-native-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-native-intlayer
```

```bash packageManager="bun"
bun add intlayer react-native-intlayer
```

### Packages

- **intlayer**  
  The core i18n toolkit for configuration, dictionary content, types generation, and CLI commands.

- **react-native-intlayer**  
  React Native integration that provides the context providers and React hooks you'll use to obtain and switch locales, the React Native polyfills, and the Metro plugin for integrating Intlayer with the React Native bundler. It re-exports everything from `react-intlayer`, so you only need this single package in a React Native app.

---

</Step>

<Step number={2} title="Create an Intlayer Config">

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
- See the [Intlayer configuration docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md) for more.

</Step>

<Step number={3} title="Add the Metro plugin">

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
> Note: `configMetroIntlayerSync` does not allow building intlayer dictionaries on server start.

</Step>

<Step number={4} title="Add the Intlayer provider">

To keep the user language synchronised across your application, you need to wrap your root component with the `IntlayerProvider` component from `react-native-intlayer`.

> Always import from `react-native-intlayer`. Its `IntlayerProvider` includes polyfills for the web API used by Intlayer, and the package re-exports all the hooks and utilities from `react-intlayer`.

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

</Step>

<Step number={5} title="Declare Your Content">

Create **content declaration** files anywhere in your project (commonly within `src/`), using any of the extension formats that Intlayer supports:

- `.content.json`
- `.content.jsonc`
- `.content.json5`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.md`
- `.content.mdx`
- `.content.yaml`
- `.content.yml`
- etc.

> **Expo Router (web): keep `.content.*` files out of the `app/` directory.** Expo Router treats every JavaScript/TypeScript file inside `app/` as a route. On web, its route discovery scans the filesystem directly and does **not** honour Metro's `resolver.blockList`, so a co-located `*.content.ts` is registered as a route. A file such as `app/(tabs)/_layout.content.ts` is even parsed as a layout (the `.content` part is read as a platform suffix), which collides with the real `_layout.tsx` and throws:
>
> ```
> The layouts "./(tabs)/_layout.content.ts" and "./(tabs)/_layout.tsx" conflict on the route "/(tabs)/_layout.content". Remove or rename one of these files.
> ```
>
> Place your declarations in a directory outside `app/` (for example `content/` or `src/content/`). Intlayer discovers `.content.*` files anywhere in the project and dictionaries are referenced by their `key`, so no import changes are needed. On native this is not required (Metro's `blockList` already hides them), but using a non-`app/` directory keeps both platforms working.

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
      "en-GB": "Welcome!",
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
        "en-GB": "Welcome!",
        "fr": "Bienvenue!",
        "es": "¡Bienvenido!"
      }
    }
  }
}
```

> For details on content declarations, see [Intlayer's content docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/dictionary/content_file.md).

---

</Step>

<Step number={6} title="Use Intlayer in Your Components">

Use the `useIntlayer` hook in child components to obtain localised content.

### Example

```tsx fileName="app/(tabs)/index.tsx" codeFormat={["typescript", "esm"]}
import { Image, StyleSheet, Platform } from "react-native";
import { useIntlayer } from "react-native-intlayer";
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
    alignItems: "centre",
    gap: 8,
  },
});

export default HomeScreen;
```

> When using `content.someKey` in string-based props (e.g., a button's `title` or a `Text` component's `children`), **call `content.someKey.value`** to obtain the actual string.

> If your app already exists, you can use the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/compiler.md), as well as the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/cli/extract.md), to transform thousands of components in a second.

---

</Step>

<Step number={7} title="Change the App Locale" isOptional={true}>

To switch locales from within your components, you can use the `useLocale` hook's `setLocale` method:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
import { type FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getLocaleName } from "intlayer";
import { useLocale } from "react-native-intlayer";

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
    colour: "#333",
  },
});
```

This triggers a re-render of all components that use Intlayer content, now showing translations for the new locale.

> See [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/useLocale.md) for more details.

</Step>

</Steps>

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

This enables features such as:

- **Autocompletion** for your dictionary keys.
- **Type checking** that warns if you access a non-existent key or have a type mismatch.

---

## Git Configuration

To prevent committing auto-generated files by Intlayer, add the following to your `.gitignore`:

```bash
# Ignore the files generated by Intlayer
.intlayer
```

---

### VS Code Extension

To enhance your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Go Further

- **Visual Editor**: Use the [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/intlayer_visual_editor.md) to manage translations visually.
- **CMS Integration**: You can also externalise and fetch your dictionary content from a [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md).
- **CLI Commands**: Explore the [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) for tasks like **extracting translations** or **checking missing keys**.

Enjoy building your **React Native** apps with fully powered i18n through **Intlayer**!

---

### Debug

React Native can be less stable than React Web, so pay extra attention to version alignment.

Intlayer primarily targets the Web Intl API; on React Native you must include the appropriate polyfills.

Checklist:

- Use the latest versions of `intlayer` and `react-native-intlayer`.
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
