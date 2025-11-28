---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Intlayer Compiler | i18n के लिए स्वचालित सामग्री निष्कर्षण
description: Intlayer Compiler के साथ अपने अंतरराष्ट्रीयकरण प्रक्रिया को स्वचालित करें। Vite, Next.js, और अन्य में तेज़, अधिक कुशल i18n के लिए सीधे अपने कंपोनेंट्स से सामग्री निकालें।
keywords:
  - Intlayer
  - Compiler
  - Internationalization
  - i18n
  - Automation
  - Extraction
  - Speed
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 7.3.1
    date: 2025-11-27
    changes: Release Compiler
---

# Intlayer Compiler | i18n के लिए स्वचालित सामग्री निष्कर्षण

## Intlayer Compiler क्या है?

**Intlayer Compiler** एक शक्तिशाली उपकरण है जिसे आपके एप्लिकेशन में अंतरराष्ट्रीयकरण (i18n) की प्रक्रिया को स्वचालित करने के लिए डिज़ाइन किया गया है। यह आपके स्रोत कोड (JSX, TSX, Vue, Svelte) में सामग्री घोषणाओं को स्कैन करता है, उन्हें निकालता है, और आवश्यक शब्दकोश फ़ाइलों को स्वचालित रूप से उत्पन्न करता है। यह आपको अपनी सामग्री को आपके कंपोनेंट्स के साथ सह-स्थित रखने की अनुमति देता है जबकि Intlayer आपके शब्दकोशों के प्रबंधन और समन्वय को संभालता है।

## Intlayer Compiler का उपयोग क्यों करें?

- **स्वचालन**: सामग्री को शब्दकोशों में मैन्युअल कॉपी-पेस्ट करने की आवश्यकता समाप्त करता है।
- **गति**: अनुकूलित सामग्री निष्कर्षण सुनिश्चित करता है कि आपका बिल्ड प्रक्रिया तेज़ बनी रहे।
- **डेवलपर अनुभव**: सामग्री घोषणाओं को वहीं रखें जहां उनका उपयोग होता है, जिससे रखरखाव में सुधार होता है।
- **लाइव अपडेट्स**: विकास के दौरान त्वरित प्रतिक्रिया के लिए Hot Module Replacement (HMR) का समर्थन करता है।

गहरे तुलना के लिए [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md) ब्लॉग पोस्ट देखें।

## Intlayer Compiler का उपयोग क्यों न करें?

हालांकि कंपाइलर एक उत्कृष्ट "बस काम करता है" अनुभव प्रदान करता है, यह कुछ समझौते भी पेश करता है जिनके बारे में आपको पता होना चाहिए:

- **हेयूरिस्टिक अस्पष्टता**: कंपाइलर को यह अनुमान लगाना होगा कि उपयोगकर्ता-सामना करने वाली सामग्री बनाम एप्लिकेशन लॉजिक क्या है (उदाहरण के लिए, `className="active"`, स्थिति कोड, उत्पाद ID)। जटिल कोडबेस में, यह गलत सकारात्मक या छूटी हुई स्ट्रिंग्स का कारण बन सकता है जिन्हें मैन्युअल एनोटेशन और अपवादों की आवश्यकता होती है।
- **केवल स्थैतिक निष्कर्षण**: कंपाइलर-आधारित निष्कर्षण स्थैतिक विश्लेषण पर निर्भर करता है। स्ट्रिंग्स जो केवल रनटाइम पर मौजूद होती हैं (API त्रुटि कोड, CMS फ़ील्ड, आदि) को कंपाइलर द्वारा अकेले खोजा या अनुवादित नहीं किया जा सकता है, इसलिए आपको अभी भी एक पूरक रनटाइम i18n रणनीति की आवश्यकता है।

गहरी वास्तुकला तुलना के लिए, [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/compiler_vs_declarative_i18n.md) ब्लॉग पोस्ट देखें।

वैकल्पिक रूप से, अपनी सामग्री पर पूर्ण नियंत्रण रखते हुए अपनी i18n प्रक्रिया को स्वचालित करने के लिए, Intlayer एक स्वचालित निष्कर्षण कमांड `intlayer transform` (देखें [CLI दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/transform.md)) या Intlayer VS Code एक्सटेंशन का `Intlayer: extract content to Dictionary` कमांड (देखें [VS Code एक्सटेंशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)) भी प्रदान करता है।

## उपयोग

### Vite

Vite-आधारित एप्लिकेशन (React, Vue, Svelte, आदि) के लिए, कंपाइलर का उपयोग करने का सबसे आसान तरीका `vite-intlayer` प्लगइन के माध्यम से है।

#### स्थापना

```bash
npm install vite-intlayer
```

#### कॉन्फ़िगरेशन

अपने `vite.config.ts` को अपडेट करें ताकि `intlayerCompiler` प्लगइन शामिल हो:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // कंपाइलर प्लगइन जोड़ता है
  ],
});
```

#### फ्रेमवर्क समर्थन

Vite प्लगइन स्वचालित रूप से विभिन्न फ़ाइल प्रकारों का पता लगाता है और उन्हें संभालता है:

- **React / JSX / TSX**: मूल रूप से संभाला जाता है।
- **Vue**: इसके लिए `@intlayer/vue-compiler` आवश्यक है।
- **Svelte**: इसके लिए `@intlayer/svelte-compiler` आवश्यक है।

सुनिश्चित करें कि आपने अपने फ्रेमवर्क के लिए उपयुक्त कंपाइलर पैकेज इंस्टॉल किया है:

```bash
# Vue के लिए
npm install @intlayer/vue-compiler

# Svelte के लिए
npm install @intlayer/svelte-compiler
```

### Next.js (Babel)

Next.js या अन्य Webpack-आधारित एप्लिकेशन जो Babel का उपयोग करते हैं, उनके लिए आप `@intlayer/babel` प्लगइन का उपयोग करके कंपाइलर को कॉन्फ़िगर कर सकते हैं।

#### स्थापना

```bash
npm install @intlayer/babel
```

#### कॉन्फ़िगरेशन

अपना `babel.config.js` (या `babel.config.json`) अपडेट करें ताकि extraction प्लगइन शामिल हो सके। हम एक हेल्पर `getExtractPluginOptions` प्रदान करते हैं जो आपके Intlayer कॉन्फ़िगरेशन को स्वचालित रूप से लोड करता है।

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

यह कॉन्फ़िगरेशन सुनिश्चित करता है कि आपके कंपोनेंट्स में घोषित सामग्री स्वचालित रूप से निकाली जाए और आपके बिल्ड प्रक्रिया के दौरान शब्दकोश बनाने के लिए उपयोग की जाए।
