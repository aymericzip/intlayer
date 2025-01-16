# @intlayer/chokidar: NPM पैकेज जो Intlayer घोषणा फ़ाइलों को शब्दकोश में स्कैन और बनाएगा

**Intlayer** एक पैकेज सूट है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे ढांचों के साथ संगत है।

**`@intlayer/chokidar`** पैकेज का उपयोग Intlayer घोषणा फ़ाइलों को शब्दकोश में स्कैन और बनाने के लिए [chokidar](https://github.com/paulmillr/chokidar) का उपयोग करके किया जाता है और यह [Intlayer कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) के अनुसार होता है।

## उपयोग

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Intlayer शब्दकोश बनाएँ

// या

watch({ persistent: true }); // निगरानी मोड
```

## स्थापना

आवश्यक पैकेज को अपने पसंदीदा पैकेज प्रबंधन प्रणाली का उपयोग करके स्थापित करें:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
