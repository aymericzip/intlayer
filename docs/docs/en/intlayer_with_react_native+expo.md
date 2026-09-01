---
createdAt: 2025-06-18
updatedAt: 2026-08-29
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
  - version: 9.0.0
    date: 2026-06-25
    changes: "Import providers and hooks directly from react-native-intlayer; react-intlayer is no longer needed as a direct dependency"
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
author: aymericzip
---

# Translate your Expo and React Native app | Internationalization (i18n)

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
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

<Steps>

<Step number={1} title="Install Dependencies">

See [Application Template](https://github.com/aymericzip/intlayer-react-native-template) on GitHub.

From your React Native project, install the following packages:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
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
- See the [Intlayer configuration docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md) for more.

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
> Note: `configMetroIntlayerSync` does not allow to build intlayer dictionaries on server start

</Step>

<Step number={4} title="Add the Intlayer provider">

To keep synchronized the user language across your application, you need to wrap your root component with the `IntlayerProvider` component from `react-native-intlayer`.

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

> **Expo Router (web): keep `.content.*` files out of the `app/` directory.** Expo Router treats every JavaScript/TypeScript file inside `app/` as a route. On web, its route discovery scans the filesystem directly and does **not** honor Metro's `resolver.blockList`, so a co-located `*.content.ts` is registered as a route. A file such as `app/(tabs)/_layout.content.ts` is even parsed as a layout (the `.content` part is read as a platform suffix), which collides with the real `_layout.tsx` and throws:
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

</Step>

<Step number={6} title="Use Intlayer in Your Components">

Use the `useIntlayer` hook in child components to get localized content.

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
    alignItems: "center",
    gap: 8,
  },
});

export default HomeScreen;
```

> When using `content.someKey` in string-based props (e.g., a button’s `title` or a `Text` component’s `children`), **call `content.someKey.value`** to get the actual string.

> If your app already exists, you can use the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md), as well as the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md), to transform thousands of components in a second.

</Step>

<Step number={7} title="Change the App Locale" isOptional={true}>

To switch locales from within your components, you can use the `useLocale` hook’s `setLocale` method:

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
    color: "#333",
  },
});
```

This triggers a re-render of all components that use Intlayer content, now showing translations for the new locale.

> See [`useLocale` docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md) for more details.

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

## Frequently Asked Questions

<FAQ>

<Question title="What are the different solutions available to internationalize a React Native or Expo app?">

- **`i18n-js`** paired with `expo-localization`: the historical pairing, a plain object of messages with no typing.
- **`react-i18next`**: the React ecosystem standard, with JSON namespaces loaded at runtime.
- **`Intlayer`**: the most advanced solution. Content declared anywhere in your codebase ([next to each component or centralized](https://intlayer.org/blog/per-component-vs-centralized-i18n)) and compiled by the Metro plugin at build time, fully typed, with AI translation, a visual editor and a CMS.

On mobile the size argument is stronger than on the web, because everything is bundled into the app rather than fetched per page. Compiling content per component keeps unused languages and unused keys out of the bundle. See [why Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md).

</Question>

<Question title="How much does i18n add to my app bundle size?">

Much less than a runtime catalog, which matters more on mobile than on the web because everything is bundled into the app rather than fetched per page. The Metro plugin resolves `useIntlayer` calls to the exact entries a component uses, so unused keys and unused languages never reach the binary. Measured against the usual alternatives, Intlayer reduces bundle size by up to 50%. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md).

</Question>

<Question title="Can I migrate from `i18n-js` or `react-i18next` without rewriting my components?">

Yes, and there are two paths. You can migrate the content progressively with the [i18n-js migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18n-js.md) or the [react-i18next migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_react-i18next_to_intlayer.md). Or you can keep your current API entirely: the [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/index.md) expose the exact same API as `react-i18next` and `react-intl`, but served by Intlayer dictionaries, so imports change and component code does not.

</Question>

<Question title="Can I keep my existing JSON translation files?">

Yes. The [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-json.md) keeps your `/messages/{locale}/{namespace}.json` files as the source of truth and generates Intlayer dictionaries from them, in both directions. A [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/plugins/sync-po.md) does the same for gettext catalogs, and [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/per_locale_file.md) let you split content by language instead of grouping locales in one file.

</Question>

<Question title="Do I have to move my content key by key?">

No. Run `npx intlayer extract` and Intlayer reads your source files, pulls the user facing strings out and writes a `.content` file next to each one, so you review a diff instead of copying strings into a catalog one at a time. See the [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/extract.md).

For a fully automated pipeline, the [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compiler.md) does the same at build time on JSX, TSX, Vue and Svelte source, generating the dictionaries on every change so there are no keys to maintain by hand. It works by static analysis, so strings that only exist at runtime stay out of reach, and it needs a few annotations to tell user facing text apart from application logic.

</Question>

<Question title="What editor and AI agent tooling is available?">

Five pieces, all optional:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/vs_code_extension.md)**: jump from a `useIntlayer` key to the content file that declares it, extract content from a component, and run build, fill, test, push and pull from the command palette or a dedicated Intlayer tab.
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**: the same awareness in any editor that speaks LSP, with go to definition, find all references, hover previews of a translated value, autocompletion of keys and fields, and a warning when a key is not declared anywhere. It also resolves `i18next`, `react-i18next`, `next-intl` and `use-intl` calls, which helps while you migrate.
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**: exposes the Intlayer documentation and CLI to Cursor, VS Code, Claude Desktop, Claude Code and ChatGPT, so an assistant answers from current docs instead of guessing, and can run commands such as `intlayer fill` itself.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**: focused skills such as `intlayer-config`, `intlayer-cli` and `intlayer-content`, plus one per framework, that teach an agent your routing setup and the content node types.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/eslint.md)**: `no-raw-text` flags hardcoded strings, with further rules for static dictionary keys and unused content.

</Question>

<Question title="Does Intlayer work with Expo and the Metro bundler?">

Yes. Step 3 adds the Metro plugin, which compiles your `.content.ts` files and regenerates the types on save, so Fast Refresh picks up content edits like any other source change. It works in both Expo Go and development builds.

</Question>

<Question title="How do I detect the device language?">

Read it from `expo-localization` and pass it to the Intlayer provider as the initial locale, then persist the user's explicit choice. Intlayer falls back to your default locale when the device language is not among the declared ones, so the app never renders an empty string.

</Question>

<Question title="How do I change the app language at runtime?">

Step 7 covers it. `useLocale` exposes the active locale, the declared locales and a setter, and the components reading content re-render immediately, so the language changes without restarting the app.

</Question>

<Question title="How do I support right to left languages such as Arabic or Hebrew?">

Use `getHTMLTextDir` to know whether the active locale is right to left, and apply it through the React Native `I18nManager`. Keep in mind that React Native requires a reload for a full RTL layout flip, so most apps prompt the user once when they select an RTL language.

</Question>

<Question title="How do I translate the app automatically with AI?">

Run `npx intlayer fill`, which fills missing translations with the LLM of your choice using your own provider and API key, and `--git-diff` restricts the run to the content changed on the branch. See the [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/fill.md) and [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/CI_CD.md).

</Question>

<Question title="Does Intlayer support plurals, gender and rich text?">

Yes: [plural forms](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/plurial.md), [gender based content](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/gender.md), conditions, [insertions](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md) and [formatters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/formatters.md) for numbers, dates and currencies.

</Question>

<Question title="How can translators edit the content without touching the code?">

Through the [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md), which runs on your own infrastructure and lets anyone edit text in place on the running app, or the [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), which externalizes content so it can change without a deployment.

</Question>

<Question title="Is Intlayer free and open source?">

Yes, under the Apache 2.0 license, commercial use included. The hosted CMS is an optional paid service that can also be [self hosted](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/self_hosting.md).

</Question>

</FAQ>
