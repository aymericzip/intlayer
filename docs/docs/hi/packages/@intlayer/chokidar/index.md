# @intlayer/chokidar: Intlayer घोषणा फ़ाइलों को स्कैन और डिक्शनरी में बनाने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`@intlayer/chokidar`** पैकेज का उपयोग [chokidar](https://github.com/paulmillr/chokidar) और [Intlayer कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) के अनुसार Intlayer घोषणा फ़ाइलों को स्कैन और डिक्शनरी में बनाने के लिए किया जाता है।

## उपयोग

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer डिक्शनरी बनाएं

watch({ persistent: true }); // कॉन्फ़िगरेशन फ़ाइलों में बदलावों को देखें
```

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
