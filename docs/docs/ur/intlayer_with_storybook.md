---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Storybook کے ساتھ Intlayer کو کیسے ترتیب دیں
description: براہ کرم سیکھیں کہ Storybook کے ساتھ Intlayer کا استعمال کرتے ہوئے اپنے ڈیزائن سسٹم کو کثیر لسانی کیسے بنایا جائے — مواد کے اعلانات کو مرتب کریں، زبان منتخب کرنے والا بٹن شامل کریں، اور کسی بھی زبان میں اپنے اجزاء کا پیش نظارہ کریں۔
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
    changes: "دستاویزات کا آغاز"
---

# Storybook کے ساتھ Intlayer

## فہرست مواد

<TOC/>

## Intlayer کیا ہے؟

**Intlayer** ایک جدید، اوپن سورس بین الاقوامی سازی (i18n) لائبریری ہے جو جدید ویب ایپلی کیشنز میں کثیر لسانی تعاون کو آسان بنانے کے لیے ڈیزائن کی گئی ہے۔ یہ **جزوی سطح (component level)** پر کام کرتی ہے — ہر جزو اپنے مواد کے اعلانات کا مالک ہوتا ہے — جس سے ترجمے اس کوڈ کے ساتھ رہتے ہیں جہاں وہ استعمال ہوتے ہیں۔

Intlayer کے ساتھ آپ یہ کر سکتے ہیں:

- **اعلانیہ طور پر ترجمہ منظم کریں** ہر جزو کے لیے الگ مواد کی فائلوں کے استعمال کے ذریعے۔
- **مکمل TypeScript سپورٹ حاصل کریں** خود بخود تیار کردہ اقسام (types) اور IDE آٹو مکمل کے ذریعے۔
- **رن ٹائم پر زبان تبدیل کریں** صفحہ دوبارہ لوڈ کیے بغیر۔
- **خود بخود ترجمہ کریں** بلٹ ان AI فراہم کنندگان کے انٹیگریشن کے ذریعے۔

---

## Storybook کے ساتھ Intlayer کیوں استعمال کریں؟

Storybook تنہائی میں UI اجزاء کی تیاری اور دستاویز سازی کے لیے صنعت کا معیاری آلہ ہے۔ اسے Intlayer کے ساتھ ملانے سے آپ کو یہ سہولت ملتی ہے:

- **ہر مقام (locale) کا پیش نظارہ کریں** براہ راست Storybook کینوس کے اندر ٹول بار سوئچر کا استعمال کرتے ہوئے ۔
- **ترجمہ کی کمی کو تلاش کریں** اس سے پہلے کہ وہ پروڈکشن تک پہنچیں۔
- **کثیر لسانی اجزاء کو دستاویزی بنائیں** ہارڈ کوڈڈ سٹرنگز کے بجائے حقیقی، ٹائپ سیف مواد کے ساتھ۔

---

## مرحلہ وار ترتیب

<Tabs>
<Tab value="Vite Setup">

### مرحلہ 1: انحصارات (Dependencies) انسٹال کریں

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

| پیکیج            | کردار                                                             |
| ---------------- | ----------------------------------------------------------------- |
| `intlayer`       | کور — کنفیگ، مواد کی ترتیب، CLI                                   |
| `react-intlayer` | ری ایکٹ بائنڈنگز — `IntlayerProvider`, `useIntlayer` ہک           |
| `vite-intlayer`  | Vite پلگ ان — مواد کے اعلان کی فائلوں کی نگرانی اور ترتیب کرتا ہے |

---

### مرحلہ 2: Intlayer کنفیگریشن فائل بنائیں

اپنے پروجیکٹ کی جڑ (root) میں (یا اپنے ڈیزائن سسٹم پیکیج کے اندر) `intlayer.config.ts` بنائیں:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // ضرورت کے مطابق مزید زبانیں شامل کریں
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // جہاں آپ کی *.content.ts فائلیں موجود ہیں
  },
};

export default config;
```

> اختیارات کی مکمل فہرست کے لیے [کنفیگریشن حوالہ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md) دیکھیں۔

---

### مرحلہ 3: Storybook میں Vite پلگ ان شامل کریں

Storybook کا `viteFinal` ہک آپ کو اندرونی Vite کنفیگریشن بڑھانے کی اجازت دیتا ہے۔ وہاں `intlayer()` پلگ ان درآمد کریں اور شامل کریں:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …دیگر ایڈ آنز
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

`intlayer()` پلگ ان آپ کی `*.content.ts` فائلوں کی نگرانی کرتا ہے اور Storybook کی تیاری کے دوران جب بھی وہ تبدیل ہوتی ہیں تو خود بخود ڈکشنریوں کو دوبارہ تیار کرتا ہے۔

---

### مرحلہ 4: `IntlayerProvider` ڈیکوریٹر اور لوکل ٹول بار شامل کریں

Storybook کی `preview` فائل ہر سٹوری کو `IntlayerProvider` کے اندر لپیٹنے اور ٹول بار میں زبان منتخب کرنے والا بٹن دکھانے کے لیے موزوں جگہ ہے:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // ہر سٹوری کو IntlayerProvider کے اندر لپیٹیں
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

  // Storybook ٹول بار میں زبان منتخب کرنے والا بٹن دکھائیں
  globalTypes: {
    locale: {
      description: "فعال زبان",
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

> `locale` کی قدریں آپ کے `intlayer.config.ts` میں اعلان کردہ زبانوں سے مماثل ہونی چاہئیں۔

</Tab>
<Tab value="Webpack Setup">

### مرحلہ 1: انحصارات انسٹال کریں

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

### مرحلہ 2: Intlayer کنفیگریشن فائل بنائیں

اپنے پروجیکٹ کی جڑ میں `intlayer.config.ts` بنائیں:

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

### مرحلہ 3: Storybook کے Webpack کو کنفیگر کریں

Webpack پر مبنی Storybook سیٹ اپس کے لیے (مثلاً `@storybook/react-webpack5`) ، `webpackFinal` کے ذریعے ویب پیک کنفیگریشن کو بڑھائیں تاکہ Intlayer ایلیئسز اور لوڈر شامل کیا جا سکے:

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

### مرحلہ 4: `IntlayerProvider` ڈیکوریٹر اور لوکل ٹول بار شامل کریں

وہی جو Vite سیٹ اپ کے لیے ہے — `.storybook/preview.tsx` میں ڈیکوریٹر اور عالمی لوکل ٹائپ شامل کریں:

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
      description: "فعال زبان",
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

## مواد کا اعلان کرنا (Declaring Content)

ہر جزو کے ساتھ ایک `*.content.ts` فائل بنائیں۔ Intlayer ترتیب کے دوران اسے خود بخود اٹھا لیتا ہے۔

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

> مزید مواد کے اعلان کی فارمیٹس اور خصوصیات کے لیے [مواد کے اعلان کی دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md) دیکھیں۔

---

## کسی جزو میں `useIntlayer` استعمال کرنا

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

`useIntlayer` موجودہ زبان کے لیے مرتب شدہ ڈکشنری واپس کرتا ہے جس کا قریب ترین `IntlayerProvider` فراہم کرتا ہے۔ Storybook ٹول بار میں زبان تبدیل کرنا خود بخود سٹوری کو اپ ڈیٹ شدہ ترجمہ کے ساتھ دوبارہ رینڈر کرتا ہے۔

---

## بین الاقوامی اجزاء کے لیے سٹوریز لکھنا

`IntlayerProvider` ڈیکوریٹر کے موجود ہونے کے ساتھ، آپ کی سٹوریز بالکل پہلے کی طرح کام کرتی ہیں۔ لوکل ٹول بار پورے کینوس کے لیے فعال زبان کو کنٹرول کرتا ہے:

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

/** ڈیفالٹ سٹوری — ترجمہ کا پیش نظارہ کرنے کے لیے ٹول بار میں زبان تبدیل کریں۔ */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** بٹن کو کوڈ بلاک کے اندر رینڈر کرتا ہے، جو کہ ایک عام حقیقی دنیا کا کیس ہے۔ */
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

> ہر سٹوری ٹول بار سے `locale` عالمی متغیر کو وراثت میں لیتی ہے، اس لیے آپ کسی بھی سٹوری کوڈ کو تبدیل کیے بغیر ہر زبان کی تصدیق کر سکتے ہیں۔

---

## سٹوریز میں ترجمے کی جانچ کرنا

Storybook کے `play` فنکشنز کا استعمال کرتے ہوئے یہ یقینی بنائیں کہ دی گئی زبان کے لیے صحیح ترجمہ شدہ متن رینڈر ہو رہا ہے:

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
  args: { content: "ہیلو ورلڈ" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // تصدیق کریں کہ بٹن کا ایک غیر خالی قابل رسائی نام ہے
    await expect(button).toHaveAccessibleName();
    // تصدیق کریں کہ بٹن غیر فعال نہیں ہے
    await expect(button).not.toBeDisabled();
    // کی بورڈ قابل رسائی کی تصدیق کریں
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## اضافی وسائل

- [Intlayer کنفیگریشن حوالہ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/configuration.md)
- [مواد کے اعلان کی دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/dictionary/content_file.md)
- [Intlayer CLI دستاویزات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ur/cli/index.md)
- [Storybook دستاویزات](https://storybook.js.org/docs)
