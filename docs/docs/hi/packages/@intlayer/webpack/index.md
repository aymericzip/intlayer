# @intlayer/webpack: आपके एप्लिकेशन में Intlayer Webpack प्लगइन का उपयोग करने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क्स के साथ संगत है।

**`@intlayer/webpack`** पैकेज का उपयोग Intlayer के साथ एक Webpack आधारित एप्लिकेशन को काम करने के लिए एक Webpack कॉन्फ़िगरेशन प्रदान करने के लिए किया जाता है। यह पैकेज एक प्लगइन भी प्रदान करता है जिसे मौजूदा Webpack एप्लिकेशन में जोड़ा जा सकता है।

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

## इंस्टॉलेशन

अपने पसंदीदा पैकेज प्रबंधक का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```
