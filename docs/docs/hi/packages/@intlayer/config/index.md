---
docName: package__@intlayer_config
url: https://intlayer.org/doc/package/@intlayer_config
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/@intlayer/config/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Intlayer के लिए कॉन्फ़िगरेशन प्रबंधन
description: विभिन्न वातावरणों में अंतरराष्ट्रीयकरण सेटिंग्स के लिए Intlayer कॉन्फ़िगरेशन प्राप्त करने और पर्यावरण चर परिभाषित करने के लिए NPM पैकेज।
keywords:
  - intlayer
  - configuration
  - environment
  - settings
  - i18n
  - JavaScript
  - NPM
  - variables
---

# @intlayer/config: Intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`@intlayer/config`** पैकेज एक NPM पैकेज है जो आपको Intlayer की कॉन्फ़िगरेशन प्राप्त करने और वर्तमान वातावरण से संबंधित पर्यावरण चर परिभाषित करने की अनुमति देता है।

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## उपयोग

### फ़ाइल सिस्टम का उपयोग करके Intlayer की कॉन्फ़िगरेशन पढ़ें

उदाहरण:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// आउटपुट:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> यह फ़ंक्शन `fs` पैकेज का उपयोग करता है और केवल सर्वर साइड पर काम करेगा।

### पर्यावरण चर का उपयोग करके Intlayer की कॉन्फ़िगरेशन पढ़ें

उदाहरण:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// आउटपुट:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> यदि पर्यावरण चर परिभाषित नहीं हैं तो यह फ़ंक्शन कुछ भी वापस नहीं करेगा।

### पर्यावरण चर परिभाषित करें

1. एक कॉन्फ़िगरेशन फ़ाइल बनाएं।

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> अधिक जानकारी के लिए [Intlayer कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

2. पर्यावरण चर परिभाषित करें।

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// सभी कॉन्फ़िगरेशन मानों को पर्यावरण चर के रूप में स्वरूपित करें
const env = formatEnvVariable();

// प्रत्येक स्वरूपित पर्यावरण चर को process.env में सेट करें
Object.assign(process.env, env);
```

3. कॉन्फ़िगरेशन फ़ाइल आयात करें।

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
