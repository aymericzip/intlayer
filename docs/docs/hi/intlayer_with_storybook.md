---
createdAt: 2026-03-20
updatedAt: 2026-03-20
title: Storybook के साथ Intlayer कैसे सेटअप करें
description: सीखें कि Intlayer और Storybook का उपयोग करके अपने डिज़ाइन सिस्टम को बहुभाषी कैसे बनाया जाए — सामग्री घोषणाओं को संकलित करें, एक स्थानीय स्विचर जोड़ें और किसी भी भाषा में अपने घटकों का पूर्वावलोकन करें।
keywords:
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
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

# Storybook के साथ Intlayer

## विषय सूची

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। यह **घटक स्तर** (component level) पर काम करता है — प्रत्येक घटक की अपनी सामग्री घोषणाएँ होती हैं — जो अनुवादों को उसी कोड के साथ रखती हैं जो उनका उपयोग करता है।

Intlayer के साथ आप:

- **घोषणात्मक रूप से अनुवाद प्रबंधित करें** प्रति-घटक सामग्री फ़ाइलों के साथ।
- **पूर्ण TypeScript समर्थन प्राप्त करें** स्वतः उत्पन्न प्रकारों और IDE ऑटो-पूर्णता के माध्यम से।
- **रनटाइम पर स्थानीय भाषा बदलें** बिना पेज रीलोड किए।
- **स्वचालित रूप से अनुवाद करें** अंतर्निहित AI प्रदाता एकीकरण के साथ।

---

## Storybook के साथ Intlayer का उपयोग क्यों करें?

Storybook UI घटकों को अलग से विकसित करने और प्रलेखित करने के लिए उद्योग-मानक उपकरण है। इसे Intlayer के साथ जोड़ने से आपको ये सुविधाएं मिलती हैं:

- **प्रत्येक स्थानीय भाषा का पूर्वावलोकन करें** सीधे Storybook कैनवास के अंदर टूलबार स्विचर का उपयोग करके।
- **छूटे हुए अनुवादों को पकड़ें** उत्पादन (production) तक पहुँचने से पहले।
- **बहुभाषी घटकों को प्रलेखित करें** हार्ड-कोडेड स्ट्रिंग्स के बजाय वास्तविक, टाइप-सेफ सामग्री के साथ।

---

## चरण-दर-चरण सेटअप

<Tabs>
<Tab value="Vite Setup">

### चरण 1: निर्भरताएँ स्थापित करें

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

| पैकेज            | भूमिका                                                         |
| ---------------- | -------------------------------------------------------------- |
| `intlayer`       | कोर — कॉन्फ़िगरेशन, सामग्री संकलन, CLI                         |
| `react-intlayer` | React बाइंडिंग्स — `IntlayerProvider`, `useIntlayer` हुक       |
| `vite-intlayer`  | Vite प्लगइन — सामग्री घोषणा फ़ाइलों को देखता और संकलित करता है |

---

### चरण 2: Intlayer कॉन्फ़िगरेशन बनाएँ

अपने प्रोजेक्ट के रूट में (या अपने डिज़ाइन-सिस्टम पैकेज के अंदर) `intlayer.config.ts` बनाएँ:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आवश्यकतानुसार और स्थानीय भाषाएँ जोड़ें
    ],
    defaultLocale: Locales.ENGLISH,
  },
  content: {
    contentDir: ["./src"], // जहाँ आपकी *.content.ts फ़ाइलें रहती हैं
  },
};

export default config;
```

> विकल्पों की पूरी सूची के लिए [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

---

### चरण 3: Storybook में Vite प्लगइन जोड़ें

Storybook का `viteFinal` हुक आपको आंतरिक Vite कॉन्फ़िगरेशन को विस्तारित करने की अनुमति देता है। वहां `intlayer()` प्लगइन आयात करें और जोड़ें:

```typescript fileName=".storybook/main.ts" codeFormat="typescript"
import type { StorybookConfig } from "@storybook/react-vite";
import { defineConfig, mergeConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    // …अन्य ऐडऑन
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

`intlayer()` प्लगइन आपकी `*.content.ts` फ़ाइलों को देखता है और Storybook विकास के दौरान जब भी वे बदलते हैं, शब्दकोशों को स्वचालित रूप से फिर से बनाता है।

---

### चरण 4: `IntlayerProvider` डेकोरेटर और एक स्थानीय टूलबार जोड़ें

Storybook की `preview` फ़ाइल प्रत्येक कहानी (story) को `IntlayerProvider` के साथ लपेटने और टूलबार में एक स्थानीय स्विचर को उजागर करने के लिए सही जगह है:

```tsx fileName=".storybook/preview.tsx" codeFormat="typescript"
import type { Preview, StoryContext } from "@storybook/react";
import { IntlayerProvider } from "react-intlayer";

const preview: Preview = {
  // प्रत्येक कहानी को IntlayerProvider के अंदर लपेटें
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

  // Storybook टूलबार में एक स्थानीय स्विचर उजागर करें
  globalTypes: {
    locale: {
      description: "सक्रिय स्थानीय भाषा",
      defaultValue: "en",
      toolbar: {
        title: "स्थानीय भाषा",
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

> `locale` मान आपके `intlayer.config.ts` में घोषित स्थानीय भाषाओं के साथ मेल खाने चाहिए।

</Tab>
<Tab value="Webpack Setup">

### चरण 1: निर्भरताएँ स्थापित करें

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

### चरण 2: Intlayer कॉन्फ़िगरेशन बनाएँ

अपने प्रोजेक्ट के रूट में `intlayer.config.ts` बनाएँ:

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

### चरण 3: Storybook के Webpack को कॉन्फ़िगर करें

Webpack-आधारित Storybook सेटअप (जैसे `@storybook/react-webpack5`) के लिए, Intlayer उपनाम और लोडर जोड़ने के लिए `webpackFinal` के माध्यम से webpack कॉन्फ़िगरेशन का विस्तार करें:

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

### चरण 4: `IntlayerProvider` डेकोरेटर और एक स्थानीय टूलबार जोड़ें

Vite सेटअप के समान — `.storybook/preview.tsx` में डेकोरेटर और वैश्विक स्थानीय प्रकार जोड़ें:

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
      description: "सक्रिय स्थानीय भाषा",
      defaultValue: "en",
      toolbar: {
        title: "स्थानीय भाषा",
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

## सामग्री घोषित करना

प्रत्येक घटक के बगल में एक `*.content.ts` फ़ाइल बनाएँ। Intlayer संकलन के दौरान इसे स्वचालित रूप से चुन लेता है।

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

> अधिक सामग्री घोषणा प्रारूपों और सुविधाओं के लिए [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें।

---

## घटक में `useIntlayer` का उपयोग करना

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
      कॉपी करें
    </button>
  );
};
```

`useIntlayer` निकटतम `IntlayerProvider` द्वारा प्रदान की गई वर्तमान स्थानीय भाषा के लिए संकलित शब्दकोश लौटाता है। Storybook टूलबार में स्थानीय भाषा बदलने से कहानी स्वचालित रूप से अद्यतन अनुवादों के साथ फिर से रेंडर हो जाती है।

---

## अंतर्राष्ट्रीयकृत घटकों के लिए कहानियाँ (Stories) लिखना

`IntlayerProvider` डेकोरेटर के साथ, आपकी कहानियाँ पहले की तरह ही काम करती हैं। स्थानीय टूलबार पूरे कैनवास के लिए सक्रिय स्थानीय भाषा को नियंत्रित करता है:

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

/** डिफ़ॉल्ट कहानी — अनुवादों का पूर्वावलोकन करने के लिए टूलबार में स्थानीय भाषा बदलें। */
export const Default: Story = {
  args: {
    content: "npm install intlayer react-intlayer",
  },
};

/** एक कोड ब्लॉक के अंदर बटन को रेंडर करता है, जो वास्तविक दुनिया में एक सामान्य उपयोग का मामला है। */
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

> प्रत्येक कहानी टूलबार से `locale` ग्लोबल को इनहेरिट करती है, इसलिए आप किसी भी कहानी कोड को बदले बिना प्रत्येक स्थानीय भाषा को सत्यापित कर सकते हैं।

---

## कहानियों में अनुवाद का परीक्षण करना

यह सुनिश्चित करने के लिए Storybook के `play` फ़ंक्शंस का उपयोग करें कि किसी दिए गए स्थानीय भाषा के लिए सही अनुवादित पाठ रेंडर किया गया है:

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

    // सत्यापित करें कि बटन का एक गैर-रिक्त सुलभ नाम है
    await expect(button).toHaveAccessibleName();
    // सत्यापित करें कि बटन अक्षम नहीं है
    await expect(button).not.toBeDisabled();
    // कीबोर्ड पहुंच सत्यापित करें
    await expect(button).toHaveAttribute("tabindex", "0");
  },
};
```

---

## अतिरिक्त संसाधन

- [Intlayer कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [सामग्री घोषणा प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)
- [Intlayer CLI प्रलेखन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
- [Storybook प्रलेखन](https://storybook.js.org/docs)
