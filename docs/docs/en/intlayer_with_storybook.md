---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: How to set up Intlayer with Storybook
description: Learn how to make your design system multilingual using Intlayer with Storybook — compile content declarations, add a locale switcher, and preview your components in any language.
keywords:
  - Internationalization
  - Documentation
  - Intlayer
  - Storybook
  - React
  - i18n
  - TypeScript
  - Vite
  - Webpack
slugs:
  - doc
  - storybook
history:
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
---

# Intlayer with Storybook

## Table of Contents

<TOC/>

## What is Intlayer?

**Intlayer** is an innovative, open-source internationalization (i18n) library designed to simplify multilingual support in modern web applications. It works at the **component level** — each component owns its content declarations — keeping translations co-located with the code that uses them.

With Intlayer you can:

- **Manage translations declaratively** with per-component content files.
- **Get full TypeScript support** through auto-generated types and IDE autocompletion.
- **Switch locales at runtime** without a page reload.
- **Translate automatically** with built-in AI provider integrations.

---

## Why use Intlayer with Storybook?

Storybook is the industry-standard tool for developing and documenting UI components in isolation. Combining it with Intlayer lets you:

- **Preview every locale** directly inside the Storybook canvas using a toolbar switcher.
- **Catch missing translations** before they reach production.
- **Document multilingual components** with real, type-safe content rather than hard-coded strings.

---

## Step-by-Step Setup

<Tabs>
<Tab value="Vite Setup">

### Step 1: Install Dependencies

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

| Package          | Role                                                         |
| ---------------- | ------------------------------------------------------------ |
| `intlayer`       | Core — config, content compilation, CLI                      |
| `react-intlayer` | React bindings — `IntlayerProvider`, `useIntlayer` hook      |
| `vite-intlayer`  | Vite plugin — watches and compiles content declaration files |

---

### Step 2: Create an Intlayer Configuration

Create `intlayer.config.ts` at the root of your project (or inside your design-system package):

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // add more locales as needed
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // where your *.content.ts files live
  },
};

export default config;
```

> For the full list of options see the [configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).

---

### Step 3: Add the Vite Plugin to Storybook

Storybook's `viteFinal` hook lets you extend the internal Vite config. Import and add the `intlayer()` plugin there:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …other addons
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(baseConfig, { configType }) {
    const env = {
      command: configType === "DEVELOPMENT" ? "serve" : "build",
      mode: configType === "DEVELOPMENT" ? "development" : "production",
    } as const;

    const viteConfig = defineConfig(() => ({
      plugins: [intlayer()],
    }));

    return mergeConfig(baseConfig, viteConfig(env));
  },
};

export default config;
```

The `intlayer()` plugin watches your `*.content.ts` files and rebuilds dictionaries automatically whenever they change during Storybook development.

---

### Step 4: Add the `IntlayerProvider` Decorator and a Locale Toolbar

Storybook's `preview` file is the right place to wrap every story with the `IntlayerProvider` and expose a locale switcher in the toolbar:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // Wrap every story inside the IntlayerProvider
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  // Expose a locale switcher in the Storybook toolbar
  globalTypes: {
    locale: {
      description: "Active locale",
      defaultValue: "en",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

> The `locale` values must match the locales declared in your `intlayer.config.ts`.

</Tab>
<Tab value="Webpack Setup">

### Step 1: Install Dependencies

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install @intlayer/webpack --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add @intlayer/webpack --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add @intlayer/webpack --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add @intlayer/webpack --dev
```

---

### Step 2: Create an Intlayer Configuration

Create `intlayer.config.ts` at the root of your project:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"],
  },
};

export default config;
```

---

### Step 3: Configure Storybook's Webpack

For Webpack-based Storybook setups (e.g. `@storybook/react-webpack5`), extend the webpack config via `webpackFinal` to add the Intlayer aliases and loader:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerWebpackPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [
      ...(baseConfig.plugins ?? []),
      new IntlayerWebpackPlugin(),
    ];
    return baseConfig;
  },
};

export default config;
```

---

### Step 4: Add the `IntlayerProvider` Decorator and a Locale Toolbar

Same as the Vite setup — add the decorator and global locale type in `.storybook/preview.tsx`:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const locale = context.globals.locale ?? "en";
      return (
        <IntlayerProvider locale={locale}>
          <Story />
        </IntlayerProvider>
      );
    },
  ],

  globalTypes: {
    locale: {
      description: "Active locale",
      defaultValue: "en",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "es", title: "Español" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
```

</Tab>
</Tabs>

---

## Declaring Content

Create a `*.content.ts` file next to each component. Intlayer picks it up automatically during compilation.

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat="typescript"
import { type Dictionary, t } from "intlayer";

const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
} satisfies Dictionary;

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

export default copyButtonContent;
```

```javascript fileName="src/components/CopyButton/CopyButton.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const copyButtonContent = {
  key: "copy-button",
  content: {
    label: t({
      en: "Copy content",
      fr: "Copier le contenu",
      es: "Copiar contenido",
    }),
  },
};

module.exports = copyButtonContent;
```

> For more content declaration formats and features see the [content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md).

---

## Using `useIntlayer` in a Component

```tsx fileName="src/components/CopyButton/index.tsx" codeFormat="typescript"
"use client";

import { type FC } from "react";
import { useIntlayer } from "react-intlayer";

type CopyButtonProps = {
  content: string;
};

export const CopyButton: FC<CopyButtonProps> = ({ content }) => {
  const { label } = useIntlayer("copy-button");

  return (
    <button
      onClick={() => navigator.clipboard.writeText(content)}
      aria-label={label.value}
      title={label.value}
    >
      Copy
    </button>
  );
};
```

`useIntlayer` returns the compiled dictionary for the current locale provided by the nearest `IntlayerProvider`. Switching the locale in the Storybook toolbar automatically re-renders the story with updated translations.

---

## Writing Stories for Internationalized Components

With the `IntlayerProvider` decorator in place, your stories work exactly as before. The locale toolbar controls the active locale for the entire canvas:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

/** Default story — switch the locale in the toolbar to preview translations. */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** Renders the button inside a code block, a common real-world use case. */
export const InsideCodeBlock: Story = {
  render: (args) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <pre style={{ background: "#1e1e1e", color: "#fff", padding: "1rem" }}>
        <code>{args.content}</code>
      </pre>
      <CopyButton
        content={args.content}
        style={{ position: "absolute", top: 8, right: 8 }}
      />
    </div>
  ),
  args: {
    content: "npx intlayer init",
  },
};
```

> Each story inherits the `locale` global from the toolbar, so you can verify every locale without changing any story code.

---

## Testing Translations in Stories

Use Storybook's `play` functions to assert that the correct translated text is rendered for a given locale:

```tsx fileName="src/components/CopyButton/CopyButton.stories.tsx" codeFormat="typescript"
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { CopyButton } from ".";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const AccessibleLabel: Story = {
  args: { content: "Hello World" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Verify the button has a non-empty accessible name
    await expect(button).toHaveAccessibleName();
    // Verify the button is not disabled
    await expect(button).not.toBeDisabled();
    // Verify keyboard accessibility
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## Additional Resources

- [Intlayer configuration reference](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)
- [Content declaration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/content_file.md)
- [Intlayer CLI documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md)
- [Storybook documentation](https://storybook.js.org/docs)
