# @intlayer/config: NPM पैकेज Intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए

**Intlayer** एक पैकेज का सेट है जिसे विशेष रूप से जावास्क्रिप्ट विकासकर्ताओं के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`@intlayer/config`** पैकेज एक NPM पैकेज है जो आपको Intlayer का कॉन्फ़िगरेशन प्राप्त करने और वर्तमान पर्यावरण से संबंधित पर्यावरण चर को परिभाषित करने की अनुमति देता है।

## इंस्टॉलेशन

आपके पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

### फ़ाइल प्रणाली का उपयोग करके Intlayer की कॉन्फ़िगरेशन पढ़ें

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

> यदि पर्यावरण चर परिभाषित नहीं हैं, तो यह फ़ंक्शन कुछ भी नहीं लौटाएगा।

### पर्यावरण चर को परिभाषित करें

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

> अधिक विवरण के लिए [Intlayer कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

2. पर्यावरण चर को परिभाषित करें।

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// सभी कॉन्फ़िगरेशन मानों को पर्यावरण चर के रूप में फॉर्मेट करें
const env = formatEnvVariable();

// process.env में प्रत्येक फॉर्मेटेड पर्यावरण चर सेट करें
Object.assign(process.env, env);
```

3. कॉन्फ़िगरेशन फ़ाइल आयात करें।

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```
