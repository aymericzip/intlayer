---
createdAt: 2026-03-20
updatedAt: 2026-05-31
title: "Storybook i18n - अपने ऐप को अनुवाद करने का पूर्ण गाइड"
description: "अब i18next की जरूरत नहीं। 2026 में Storybook ऐप को बहुभाषी (i18n) बनाने का गाइड। AI एजेंट्स से अनुवाद करें और बंडल साइज़, SEO और परफॉर्मेंस ऑप्टिमाइज़ करें।"
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
  - version: 8.9.0
    date: 2026-05-04
    changes: "सॉलिड useIntlayer API उपयोग को सीधे प्रॉपर्टी एक्सेस में अपडेट करें"
  - version: 8.4.5
    date: 2026-03-20
    changes: "Init doc"
author: aymericzip
---

# Storybook के साथ Intlayer

## विषय सूची

<TOC/>

## विकल्पों पर इन्टलेयर क्यों?

`स्टोरीबुक-रिएक्ट-आई18नेक्स्ट` या `आई18नेक्स्ट` जैसे मुख्य समाधानों की तुलना में, इंटलेयर एक ऐसा समाधान है जो एकीकृत अनुकूलन के साथ आता है जैसे:

**पूर्ण स्टोरीबुक कवरेज**

इंटरलेयर को **बहुभाषी स्टोरी डेकोरेटर**, **लोकेल स्विचिंग**, और आपके डिज़ाइन सिस्टम में अंतर्राष्ट्रीयकरण (i18n) को बढ़ाने के लिए आवश्यक सभी सुविधाओं की पेशकश करके स्टोरीबुक के साथ पूरी तरह से काम करने के लिए अनुकूलित किया गया है।

**बंडल का आकार**

अपने पृष्ठों में विशाल JSON फ़ाइलें लोड करने के बजाय, केवल आवश्यक सामग्री लोड करें। इंटलेयर आपके बंडल और पृष्ठ आकार को 50% तक कम करने में मदद करता है।

**रखरखाव**

आपके एप्लिकेशन की सामग्री का दायरा बड़े पैमाने के अनुप्रयोगों के लिए **रखरखाव की सुविधा प्रदान करता है**। आप अपने संपूर्ण सामग्री कोडबेस की समीक्षा करने के मानसिक बोझ के बिना किसी एक फीचर फ़ोल्डर की नकल कर सकते हैं या उसे हटा सकते हैं। इसके अतिरिक्त, आपकी सामग्री की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप किया गया** है।

**एआई एजेंट**

सामग्री का सह-स्थानीकरण **बड़े भाषा मॉडल (एलएलएम) द्वारा आवश्यक संदर्भ को कम करता है**। इंटलेयर टूल के एक सूट के साथ भी आता है, जैसे **CLI** ताकि लापता अनुवादों का परीक्षण किया जा सके,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, और **[एजेंट कौशल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी आसान बनाने के लिए।

**स्वचालन**

अपने एआई प्रदाता की कीमत पर अपनी पसंद के एलएलएम का उपयोग करके अपने सीआई/सीडी पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। इंटलेयर सामग्री निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर** के साथ-साथ **पृष्ठभूमि में अनुवाद** में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) भी प्रदान करता है।

**प्रदर्शन**

बड़े पैमाने पर JSON फ़ाइलों को घटकों से जोड़ने से प्रदर्शन और प्रतिक्रियाशीलता संबंधी समस्याएं हो सकती हैं। इंटलेयर बिल्ड समय पर आपकी सामग्री लोडिंग को अनुकूलित करता है।

**किसी भी देव के साथ स्केलिंग**

सिर्फ एक i18n समाधान से अधिक, Intlayer एक **स्व-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** और एक **[पूर्ण] प्रदान करता है सीएमएस](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** आपकी बहुभाषी सामग्री को **वास्तविक समय** में प्रबंधित करने में मदद करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहयोग सहज हो जाता है। सामग्री को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

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

<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

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
| `intlayer`       | कोर - कॉन्फ़िगरेशन, सामग्री संकलन, CLI                         |
| `react-intlayer` | React बाइंडिंग्स - `IntlayerProvider`, `useIntlayer` हुक       |
| `vite-intlayer`  | Vite प्लगइन - सामग्री घोषणा फ़ाइलों को देखता और संकलित करता है |

---

</Step>

<Step number={2} title="Intlayer कॉन्फ़िगरेशन बनाएँ">

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

</Step>

<Step number={3} title="Storybook में Vite प्लगइन जोड़ें">

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

</Step>

<Step number={4} title="`IntlayerProvider` डेकोरेटर और एक स्थानीय टूलबार जोड़ें">

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

</Step>
</Steps>
</Tab>
<Tab value="Webpack Setup">
<Steps>

<Step number={1} title="निर्भरताएँ स्थापित करें">

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

</Step>

<Step number={2} title="Intlayer कॉन्फ़िगरेशन बनाएँ">

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

</Step>

<Step number={3} title="Storybook के Webpack को कॉन्फ़िगर करें">

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

</Step>

<Step number={4} title="`IntlayerProvider` डेकोरेटर और एक स्थानीय टूलबार जोड़ें">

Vite सेटअप के समान - `.storybook/preview.tsx` में डेकोरेटर और वैश्विक स्थानीय प्रकार जोड़ें:

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

</Step>
</Steps>
</Tab>
</Tabs>

## सामग्री घोषित करना

प्रत्येक घटक के बगल में एक `*.content.ts` फ़ाइल बनाएँ। Intlayer संकलन के दौरान इसे स्वचालित रूप से चुन लेता है।

```typescript fileName="src/components/CopyButton/CopyButton.content.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

/** डिफ़ॉल्ट कहानी - अनुवादों का पूर्वावलोकन करने के लिए टूलबार में स्थानीय भाषा बदलें। */
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
