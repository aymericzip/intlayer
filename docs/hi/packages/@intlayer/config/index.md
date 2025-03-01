# @intlayer/config: Intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`@intlayer/config`** पैकेज एक NPM पैकेज है जो आपको Intlayer की कॉन्फ़िगरेशन प्राप्त करने और वर्तमान वातावरण से संबंधित पर्यावरण वेरिएबल्स को परिभाषित करने की अनुमति देता है।

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

### फाइल सिस्टम का उपयोग करके Intlayer की कॉन्फ़िगरेशन पढ़ें

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

### पर्यावरण वेरिएबल्स का उपयोग करके Intlayer की कॉन्फ़िगरेशन पढ़ें

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

> यदि पर्यावरण वेरिएबल्स परिभाषित नहीं हैं तो यह फ़ंक्शन कुछ भी वापस नहीं करेगा।

### पर्यावरण वेरिएबल्स को परिभाषित करें

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

> अधिक विवरण के लिए [Intlayer कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

2. पर्यावरण वेरिएबल्स को परिभाषित करें।

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// सभी कॉन्फ़िगरेशन मानों को पर्यावरण वेरिएबल्स के रूप में स्वरूपित करें
const env = formatEnvVariable();

// प्रत्येक स्वरूपित पर्यावरण वेरिएबल को process.env में सेट करें
Object.assign(process.env, env);
```

3. कॉन्फ़िगरेशन फ़ाइल आयात करें।

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
