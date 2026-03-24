---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: স্টোরিবুকের সাথে Intlayer কীভাবে সেট আপ করবেন
description: স্টোরিবুকের সাথে Intlayer ব্যবহার করে আপনার ডিজাইন সিস্টেমকে কীভাবে বহুভাষিক করবেন তা শিখুন — কন্টেন্ট ডিক্লারেশন কম্পাইল করুন, একটি ল্যাঙ্গুয়েজ সুইচার যোগ করুন এবং যেকোনো ভাষায় আপনার কম্পোনেন্টগুলি প্রিভিউ করুন।
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
    changes: "ডকুমেন্টেশন শুরু করা হয়েছে"
---

# স্টোরিবুকের সাথে Intlayer (Intlayer with Storybook)

## সূচিপত্র

<TOC/>

## Intlayer কী?

**Intlayer** হলো একটি উদ্ভাবনী, ওপেন-সোর্স আন্তর্জাতিকীকরণ (i18n) লাইব্রেরি যা আধুনিক ওয়েব অ্যাপ্লিকেশনগুলিতে বহুভাষিক সমর্থন সহজতর করার জন্য ডিজাইন করা হয়েছে। এটি **কম্পোনেন্ট লেভেলে** কাজ করে — প্রতিটি কম্পোনেন্টের নিজস্ব কন্টেন্ট ডিক্লারেশন থাকে — যা অনুবাদগুলিকে সংশ্লিষ্ট কোডের সাথেই রাখার সুবিধা দেয়।

Intlayer এর মাধ্যমে আপনি যা করতে পারেন:

- **ডিক্লারেটিভ উপায়ে অনুবাদ পরিচালনা করা** প্রতিটি কম্পোনেন্টের জন্য আলাদা কন্টেন্ট ফাইল ব্যবহারের মাধ্যমে।
- **সম্পূর্ণ TypeScript সমর্থন পাওয়া** অটো-জেনারেটেড টাইপ এবং IDE অটোকম্পলিট এর মাধ্যমে।
- **রানটাইমে ল্যাঙ্গুয়েজ পরিবর্তন করা** কোনো পেজ রিলোড ছাড়াই।
- **স্বয়ংক্রিয়ভাবে অনুবাদ করা** বিল্ট-ইন AI প্রোভাইডার ইন্টিগ্রেশনের মাধ্যমে।

---

## কেন স্টোরিবুকের সাথে Intlayer ব্যবহার করবেন?

স্টোরিবুক হলো আইসোলেটেড অবস্থায় UI কম্পোনেন্ট তৈরি এবং ডকুমেন্ট করার অন্যতম জনপ্রিয় টুল। Intlayer এর সাথে একে যুক্ত করলে আপনি যা করতে পারবেন:

- **প্রতিটি ল্যাঙ্গুয়েজ প্রিভিউ করা** স্টোরিবুক টুলবারে একটি সুইচার ব্যবহার করে সরাসরি স্টোরিবুক ক্যানভাসের ভেতরে।
- **অনুপস্থিত অনুবাদ শনাক্ত করা** প্রোডাকশনে যাওয়ার আগেই।
- **বহুভাষিক কম্পোনেন্ট ডকুমেন্ট করা** হার্ড-কোডেড স্ট্রিংয়ের বদলে প্রকৃত, টাইপ-সেফ কন্টেন্ট ব্যবহার করে।

---

## ধাপে ধাপে সেটআপ

<Tabs>
<Tab value="Vite Setup">

### ধাপ ১: ডিপেন্ডেন্সি ইনস্টল করা

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

| প্যাকেজ          | ভূমিকা                                                            |
| ---------------- | ----------------------------------------------------------------- |
| `intlayer`       | কোর — কনফিগ, কন্টেন্ট কম্পাইলেশন, CLI                             |
| `react-intlayer` | রিঅ্যাক্ট বাইন্ডিংস — `IntlayerProvider`, `useIntlayer` হুক       |
| `vite-intlayer`  | ভাইট প্লাগইন — কন্টেন্ট ডিক্লারেশন ফাইলগুলি মনিটর এবং কম্পাইল করে |

---

### ধাপ ২: Intlayer কনফিগারেশন তৈরি করা

আপনার প্রোজেক্টের রুটে (অথবা আপনার ডিজাইন-সিস্টেম প্যাকেজের ভেতরে) একটি `intlayer.config.ts` তৈরি করুন:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // প্রয়োজন অনুযায়ী আরও ল্যাঙ্গুয়েজ যোগ করুন
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // যেখানে আপনার *.content.ts ফাইলগুলো রয়েছে
  },
};

export default config;
```

> বিস্তারিত অপশনগুলির জন্য [কনফিগারেশন রেফারেন্স](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md) দেখুন।

---

### ধাপ ৩: স্টোরিবুকে ভাইট প্লাগইন যোগ করা

স্টোরিবুকের `viteFinal` হুকের মাধ্যমে ইন্টারনাল ভাইট কনফিগ বাড়ানো যায়। সেখানে `intlayer()` প্লাগইনটি ইম্পোর্ট করে যোগ করুন:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …অন্যান্য অ্যাডঅন
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

স্টোরিবুক ডেভেলপমেন্টের সময় যখনই আপনার `*.content.ts` ফাইলগুলি পরিবর্তিত হয়, `intlayer()` প্লাগইনটি স্বয়ংক্রিয়ভাবে ডিকশনারিগুলি পুনরায় তৈরি করে।

---

### ধাপ ৪: `IntlayerProvider` ডেকোরেটর এবং একটি লোকাল টুলবার যোগ করা

প্রতিটি স্টোরিকে `IntlayerProvider` দিয়ে র‍্যাপ করার এবং টুলবারে একটি ল্যাঙ্গুয়েজ সুইচার দেখানোর জন্য স্টোরিবুকের `preview` ফাইলটি উপযুক্ত জায়গা:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // প্রতিটি স্টোরিকে IntlayerProvider এর ভেতরে র‍্যাপ করুন
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

  // স্টোরিবুক টুলবারে একটি ল্যাঙ্গুয়েজ সুইচার দেখান
  globalTypes: {
    locale: {
      description: "সক্রিয় ল্যাঙ্গুয়েজ",
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

> `locale` এর ভ্যালু অবশ্যই আপনার `intlayer.config.ts`-এ ঘোষিত ল্যাঙ্গুয়েজগুলোর সাথে মিলতে হবে।

</Tab>
<Tab value="Webpack Setup">

### ধাপ ১: ডিপেন্ডেন্সি ইনস্টল করা

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

### ধাপ ২: Intlayer কনফিগারেশন তৈরি করা

আপনার প্রোজেক্টের রুটে একটি `intlayer.config.ts` তৈরি করুন:

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

### ধাপ ৩: স্টোরিবুকের ওয়েবপ্যাক কনফিগার করা

ওয়েবপ্যাক-ভিত্তিক স্টোরিবুক সেটআপের জন্য (যেমন- `@storybook/react-webpack5`), স্রেফ `webpackFinal`-এর মাধ্যমে ওয়েবপ্যাক কনফিগ বাড়িয়ে Intlayer প্লাগইন এবং লোডার যোগ করুন:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-webpack5";
import { IntlayerPlugin } from "@intlayer/webpack";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (baseConfig) => {
    baseConfig.plugins = [...(baseConfig.plugins ?? []), new IntlayerPlugin()];
    return baseConfig;
  },
};

export default config;
```

---

### ধাপ ৪: `IntlayerProvider` ডেকোরেটর এবং একটি লোকাল টুলবার যোগ করা

ভাইট সেটআপের মতোই — `.storybook/preview.tsx` ফাইলে ডেকোরেটর and গ্লোবাল লোকাল টাইপ যোগ করুন:

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
      description: "সক্রিয় ল্যাঙ্গুয়েজ",
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

## কন্টেন্ট ডিক্লেয়ার করা

প্রতিটি কম্পোনেন্টের পাশে একটি `*.content.ts` ফাইল তৈরি করুন। কম্পাইলেশনের সময় Intlayer স্বয়ংক্রিয়ভাবে এটি সংগ্রহ করবে।

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

> আরও কন্টেন্ট ডিক্লারেশন ফরম্যাট এবং ফিচারের জন্য [কন্টেন্ট ডিক্লারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md) দেখুন।

---

## কম্পোনেন্টে `useIntlayer` ব্যবহার করা

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

`useIntlayer` বর্তমান লোকেলের জন্য কম্পাইল করা ডিকশনারি প্রদান করে যা নিকটতম `IntlayerProvider` থেকে আসে। স্টোরিবুক টুলবারে ল্যাঙ্গুয়েজ পরিবর্তন করলে স্বয়ংক্রিয়ভাবে স্টোরিটি আপডেট হওয়া অনুবাদসহ পুনরায় রেন্ডার হবে।

---

## আন্তর্জাতিকীকরণ কম্পোনেন্টের জন্য স্টোরি লেখা

`IntlayerProvider` ডেকোরেটর সেট করার পর, আপনার স্টোরিগুলো আগের মতোই কাজ করবে। লোকাল টুলবার পুরো ক্যানভাসে সক্রিয় ভাষা নিয়ন্ত্রণ করে:

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

/** ডিফল্ট স্টোরি — অনুবাদ প্রিভিউ করতে টুলবারে ভাষা পরিবর্তন করুন। */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** একটি কোড ব্লকের ভেতরে বাটনটি দেখায়, যা একটি বাস্তব জীবনের ব্যবহারের উদাহরণ। */
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

> প্রতিটি স্টোরি টুলবার থেকে `locale` গ্লোবালটি ব্যবহার করে, তাই আপনি কোনো স্টোরি কোড পরিবর্তন না করেই প্রতিটি ল্যাঙ্গুয়েজ যাচাই করতে পারেন।

---

## স্টোরিতে অনুবাদ পরীক্ষা করা (Testing)

লোকাল অনুযায়ী সঠিক অনুবাদ রেন্ডার হচ্ছে কি না তা নিশ্চিত করতে স্টোরিবুকের `play` ফাংশন ব্যবহার করুন:

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

    // বাটনটির একটি সঠিক নাম আছে কি না যাচাই করুন
    await expect(button).toHaveAccessibleName();
    // বাটনটি ডিসেবল করা নেই কি না যাচাই করুন
    await expect(button).not.toBeDisabled();
    // কীবোর্ড অ্যাক্সেসিবিলিটি যাচাই করুন
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## অতিরিক্ত রিসোর্স

- [Intlayer কনফিগারেশন রেফারেন্স](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/configuration.md)
- [কন্টেন্ট ডিক্লারেশন ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/dictionary/content_file.md)
- [Intlayer CLI ডকুমেন্টেশন](https://github.com/aymericzip/intlayer/blob/main/docs/docs/bn/cli/index.md)
- [স্টোরিবুক ডকুমেন্টেশন](https://storybook.js.org/docs)
