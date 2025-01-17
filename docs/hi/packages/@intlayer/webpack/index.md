# @intlayer/webpack: NPM पैकेज जिसे आप अपने एप्लिकेशन में Intlayer Webpack Plugin का उपयोग करने के लिए

**Intlayer** पैकेजों का एक सेट है जिसे विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन किया गया है। यह React, React, और Express.js जैसे ढांचों के साथ संगत है।

**`@intlayer/webpack`** पैकेज का उपयोग Intlayer के साथ Webpack-आधारित एप्लिकेशन को काम करना आसान बनाने के लिए Webpack कॉन्फ़िगरेशन प्रदान करने के लिए किया जाता है। यह पैकेज एक प्लगइन भी प्रदान करता है जिसे एक मौजूदा Webpack एप्लिकेशन में जोड़ा जा सकता है।

## उपयोग

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // विकल्प
    }),
  ],
};
```

## स्थापना

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
