---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: vite-intlayer पैकेज प्रलेखन
description: Intlayer के लिए Vite प्लगइन, जो शब्दकोश उपनाम और वॉचर्स प्रदान करता है।
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "निर्यात अनुक्रमणिका अपडेट की गई - प्रॉक्सी और कंपाइलर अब intlayer() में बंडल किए गए हैं; intlayerProxy, intlayerCompiler, intlayerMinify दस्तावेज़ जोड़े गए"
  - version: 8.0.0
    date: 2026-01-21
    changes: "सभी एक्स्पोर्ट्स के लिए एकीकृत प्रलेखन"
author: aymericzip
---

# vite-intlayer पैकेज

`vite-intlayer` पैकेज आपके Vite-आधारित एप्लिकेशन में Intlayer को इंटीग्रेट करने के लिए एक Vite प्लगइन प्रदान करता है।

## इंस्टॉलेशन

```bash
npm install vite-intlayer
```

## एक्सपोर्ट्स

### प्लगइन

इम्पोर्ट:

```tsx
import "vite-intlayer";
```

| फ़ंक्शन                    | विवरण                                                                                                                                                       | संबंधित दस्तावेज                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | मुख्य Vite प्लगइन। शब्दकोश तैयार करता है, उपनाम कॉन्फ़िगर करता है, देव-सर्वर वॉचर्स प्रारंभ करता है, और (v9 से) प्रॉक्सी और कंपाइलर को बंडल करता है।        | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**पदावनत**) `intlayer` के लिए उपनाम।                                                                                                                       | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**पदावनत**) `intlayer` के लिए उपनाम।                                                                                                                       | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | लोकेल-रूटिंग मिडलवेयर प्लगइन (पहचान, पुनर्निर्देशन, पुनर्लेखन)। v9 से यह `intlayer()` के अंदर बंडल किया गया है - केवल आवश्यकता होने पर अलग से पंजीकृत करें। | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**पदावनत**) `intlayerProxy` के लिए उपनाम।                                                                                                                  | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**पदावनत**) `intlayerProxy` के लिए उपनाम।                                                                                                                  | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | घटकों से इनलाइन सामग्री घोषणाओं को निकालता है और उन्हें शब्दकोशों में लिखता है। v9 से यह `intlayer()` के अंदर बंडल किया गया है।                             | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | उत्पादन बंडल से अप्रयुक्त शब्दकोश फ़ील्ड को ट्री-शेक करता है।                                                                                               | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | संकलित शब्दकोश JSON फ़ाइलों को छोटा करता है और वैकल्पिक रूप से फ़ील्ड नामों को बदलता है।                                                                    | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerMinify.md)     |

### उपयोगिताएँ

| Export                       | Description                                                                                                | Related Doc                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | एक framework-agnostic Node.js `(req, res, next)` middleware को locale-routing logic के साथ return करता है। | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayerProxy.md) |

### Types

| Export                       | Description                                                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | `intlayer()` द्वारा स्वीकृत विकल्प। `GetConfigurationOptions` को `compatCallers` और `proxy` के साथ विस्तारित करता है। |
| `IntlayerProxyPluginOptions` | `intlayerProxy()` और `createIntlayerProxyHandler()` द्वारा स्वीकृत विकल्प। `ignore` और `configOptions` शामिल हैं।     |
| `IntlayerCompilerOptions`    | `intlayerCompiler()` द्वारा स्वीकृत विकल्प। `configOptions` और `compilerConfig` शामिल हैं।                            |
| `CompatCallerConfig`         | `@intlayer/babel` से पुनः निर्यात। फ़ील्ड-उपयोग विश्लेषण के लिए एक compat-adapter caller पैटर्न का वर्णन करता है।     |
