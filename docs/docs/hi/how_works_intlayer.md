---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Intlayer कैसे काम करता है
description: जानें कि Intlayer आंतरिक रूप से कैसे काम करता है। समझें कि Intlayer को शक्तिशाली बनाने वाली संरचना और घटक क्या हैं।
keywords:
  - Intlayer
  - यह कैसे काम करता है
  - आर्किटेक्चर
  - घटक
  - आंतरिक कार्यप्रणाली
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Intlayer कैसे काम करता है

## विषय सूची

<TOC/>

## अवलोकन

Intlayer के पीछे मुख्य विचार यह है कि प्रति-कंपोनेंट सामग्री प्रबंधन को अपनाया जाए। तो Intlayer का विचार यह है कि आपको अपनी सामग्री को अपनी कोडबेस में कहीं भी घोषित करने की अनुमति दी जाए, जैसे कि आपके कंपोनेंट के समान डायरेक्टरी में।

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

ऐसा करने के लिए, Intlayer की भूमिका आपके प्रोजेक्ट में मौजूद सभी विभिन्न प्रारूपों में आपकी `सामग्री घोषणा फ़ाइलों` को ढूंढना है, और फिर उनसे `डिक्शनरीज़` उत्पन्न करना है।

तो इसमें दो मुख्य चरण होते हैं:

- निर्माण चरण
- व्याख्या चरण

### डिक्शनरीज़ निर्माण चरण

निर्माण चरण तीन तरीकों से किया जा सकता है:

- CLI का उपयोग करके `npx intlayer build` के साथ
- [vscode एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) का उपयोग करके
- ऐप प्लगइन्स का उपयोग करके जैसे [`vite-intlayer` पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/index.md), या उनके [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/index.md) के लिए समकक्ष। जब आप इन प्लगइन्स में से किसी एक का उपयोग करते हैं, तो Intlayer स्वचालित रूप से आपके डिक्शनरीज़ का निर्माण करेगा जब आप अपना एप्लिकेशन शुरू (डेव) या निर्माण (प्रोड) करेंगे।

1. सामग्री फ़ाइलों की घोषणा
   - सामग्री फ़ाइलें विभिन्न प्रारूपों में परिभाषित की जा सकती हैं, जैसे TypeScript, ECMAScript, CommonJS, या JSON।
   - सामग्री फ़ाइलें प्रोजेक्ट में कहीं भी परिभाषित की जा सकती हैं, जो बेहतर रखरखाव और स्केलेबिलिटी की अनुमति देती हैं। सामग्री फ़ाइलों के लिए फ़ाइल एक्सटेंशन सम्मेलनों का पालन करना महत्वपूर्ण है। यह एक्सटेंशन डिफ़ॉल्ट रूप से `*.content.{js|cjs|mjs|ts|tsx|json}` है, लेकिन इसे [कॉन्फ़िगरेशन फ़ाइल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में संशोधित किया जा सकता है।

2. `डिक्शनरीज़` का निर्माण
   - डिक्शनरीज़ सामग्री फ़ाइलों से उत्पन्न होती हैं। डिफ़ॉल्ट रूप से, Intlayer डिक्शनरीज़ प्रोजेक्ट की `.intlayer/dictionaries` डायरेक्टरी में उत्पन्न होती हैं।
   - ये डिक्शनरीज़ विभिन्न प्रारूपों में उत्पन्न होती हैं ताकि सभी आवश्यकताओं को पूरा किया जा सके और एप्लिकेशन के प्रदर्शन को अनुकूलित किया जा सके।

3. शब्दकोश प्रकार की पीढ़ी

4. डिक्शनरी प्रकारों का निर्माण
   आपके `डिक्शनरीज़` के आधार पर, Intlayer प्रकार उत्पन्न करेगा ताकि उन्हें आपके एप्लिकेशन में उपयोग किया जा सके।

- डिक्शनरी प्रकार Intlayer `content declaration files` से उत्पन्न होते हैं। डिफ़ॉल्ट रूप से, Intlayer डिक्शनरी प्रकार प्रोजेक्ट की `.intlayer/types` डायरेक्टरी में उत्पन्न होते हैं।

- Intlayer [मॉड्यूल वृद्धि](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) एक TypeScript सुविधा है जो आपको Intlayer के लिए अतिरिक्त प्रकार परिभाषित करने की अनुमति देती है। यह विकास अनुभव को आसान बनाता है उपलब्ध तर्कों या आवश्यक तर्कों का सुझाव देकर।
  उत्पन्न प्रकारों में, Intlayer डिक्शनरी प्रकार या यहां तक कि भाषा कॉन्फ़िगरेशन प्रकार `types/intlayer.d.ts` फ़ाइल में जोड़े जाते हैं, और अन्य पैकेजों द्वारा उपयोग किए जाते हैं। ऐसा करने के लिए, यह आवश्यक है कि `tsconfig.json` फ़ाइल को प्रोजेक्ट की `types` डायरेक्टरी को शामिल करने के लिए कॉन्फ़िगर किया गया हो।

### डिक्शनरीज़ की व्याख्या चरण

Intlayer का उपयोग करके, आप अपने एप्लिकेशन में `useIntlayer` हुक का उपयोग करके अपनी सामग्री तक पहुंच सकते हैं।

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

यह हुक आपके लिए लोकेल का पता लगाने का प्रबंधन करेगा और वर्तमान लोकेल के लिए सामग्री लौटाएगा। इस हुक का उपयोग करके, आप मार्कडाउन की व्याख्या कर सकते हैं, बहुवचन प्रबंधन कर सकते हैं, और भी बहुत कुछ।

> Intlayer की सभी विशेषताओं को देखने के लिए, आप [डिक्शनरी दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) पढ़ सकते हैं।

## दूरस्थ सामग्री

Intlayer आपको सामग्री को स्थानीय रूप से घोषित करने और फिर उन्हें CMS में निर्यात करने की अनुमति देता है ताकि आपकी गैर-तकनीकी टीम द्वारा इसे संपादित किया जा सके।

इसलिए आप CMS से सामग्री को अपनी एप्लिकेशन में पुश और पुल कर सकेंगे, जैसे कि आप अपने कोड के लिए Git के साथ करते हैं।

CMS का उपयोग करके बाहरी डिक्शनरीज़ के लिए, Intlayer एक बुनियादी फ़ेच ऑपरेशन करता है ताकि दूरस्थ डिक्शनरीज़ को पुनः प्राप्त किया जा सके और उन्हें आपकी स्थानीय डिक्शनरीज़ के साथ मर्ज किया जा सके। यदि आपके प्रोजेक्ट पर कॉन्फ़िगर किया गया है, तो Intlayer स्वचालित रूप से एप्लिकेशन शुरू होने (डेव) / निर्माण (प्रोड) के समय CMS से सामग्री प्राप्त करने का प्रबंधन करेगा।

## दृश्य संपादक

Intlayer एक दृश्य संपादक भी प्रदान करता है जो आपको अपनी सामग्री को दृश्य तरीके से संपादित करने की अनुमति देता है। यह [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) बाहरी `intlayer-editor` पैकेज में उपलब्ध है।

![विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- सर्वर एक सरल Express एप्लीकेशन है जो क्लाइंट से अनुरोधों को सुनता है और आपकी एप्लीकेशन की सामग्री, जैसे `dictionaries` और कॉन्फ़िगरेशन को प्राप्त करता है ताकि इसे क्लाइंट साइड पर सुलभ बनाया जा सके।
- दूसरी ओर, क्लाइंट एक React एप्लीकेशन है जिसका उपयोग विजुअल इंटरफेस का उपयोग करके आपकी सामग्री के साथ इंटरैक्ट करने के लिए किया जाता है।

- सर्वर एक सरल Express एप्लिकेशन है जो क्लाइंट से अनुरोध सुनता है और आपकी एप्लिकेशन की सामग्री, जैसे कि `dictionaries` और कॉन्फ़िगरेशन, को पुनः प्राप्त करता है ताकि इसे क्लाइंट साइड पर सुलभ बनाया जा सके।
- दूसरी ओर, क्लाइंट एक React एप्लिकेशन है जिसका उपयोग दृश्य इंटरफ़ेस के माध्यम से आपकी सामग्री के साथ इंटरैक्ट करने के लिए किया जाता है।
  जब आप `useIntlayer` का उपयोग करके अपनी सामग्री को कॉल करते हैं और संपादक सक्षम होता है, तो यह स्वचालित रूप से आपकी स्ट्रिंग्स को `IntlayerNode` नामक एक Proxy ऑब्जेक्ट के साथ लपेट देता है। यह नोड `window.postMessage` का उपयोग करता है ताकि एक रैप्ड iframe के साथ संवाद किया जा सके जिसमें विज़ुअल एडिटर इंटरफ़ेस होता है।  
  संपादक की ओर, संपादक इन संदेशों को सुनता है और आपकी सामग्री के साथ वास्तविक इंटरैक्शन का अनुकरण करता है, जिससे आप सीधे अपने एप्लिकेशन के संदर्भ में टेक्स्ट संपादित कर सकते हैं।

## ऐप निर्माण अनुकूलन

आपके एप्लिकेशन के बंडल आकार को अनुकूलित करने के लिए, Intlayer दो प्लगइन्स प्रदान करता है: `@intlayer/babel` और `@intlayer/swc` प्लगइन्स।  
Babel और SWC प्लगइन्स आपके एप्लिकेशन के Abstract Syntax Tree (AST) का विश्लेषण करके Intlayer फ़ंक्शंस के कॉल्स को अनुकूलित कोड से बदलते हैं। यह प्रक्रिया उत्पादन में आपके अंतिम बंडल को हल्का बनाती है क्योंकि यह सुनिश्चित करती है कि केवल वे डिक्शनरीज़ आयात हों जो वास्तव में उपयोग की जा रही हैं, चंकिंग को अनुकूलित करती है और बंडल का आकार कम करती है।

Babel और SWC plugins आपके एप्लिकेशन के Abstract Syntax Tree (AST) का विश्लेषण करके Intlayer फ़ंक्शन की कॉल को अनुकूलित कोड से बदलते हैं। यह प्रक्रिया आपके अंतिम bundle को production में हल्का करती है, यह सुनिश्चित करके कि केवल वे dictionaries import की जाती हैं जो वास्तव में उपयोग की जाती हैं, chunking को अनुकूलित करती हैं और bundle size को कम करती हैं।

डेवलपमेंट मोड में, Intlayer डिक्शनरीज़ के लिए केंद्रीकृत स्थिर आयात का उपयोग करता है ताकि विकास अनुभव को सरल बनाया जा सके।

[कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में `importMode = "dynamic"` विकल्प को सक्रिय करके, Intlayer डिक्शनरीज़ को लोड करने के लिए डायनेमिक आयात का उपयोग करेगा। यह विकल्प डिफ़ॉल्ट रूप से अक्षम है ताकि एप्लिकेशन को रेंडर करते समय असिंक्रोनस प्रोसेसिंग से बचा जा सके।

> `@intlayer/babel` डिफ़ॉल्ट रूप से `vite-intlayer` पैकेज पर उपलब्ध है,

> `@intlayer/swc` डिफ़ॉल्ट रूप से `next-intlayer` पैकेज पर स्थापित नहीं है क्योंकि SWC प्लगइन्स अभी भी Next.js पर प्रयोगात्मक हैं।

अपने एप्लिकेशन के निर्माण को कॉन्फ़िगर करने का तरीका देखने के लिए, आप [कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) पढ़ सकते हैं।

## पैकेज

Intlayer कई पैकेजों से बना है, जिनमें से प्रत्येक का अनुवाद प्रक्रिया में एक विशिष्ट भूमिका है। यहां इस पैकेज की संरचना का एक ग्राफिकल प्रतिनिधित्व है:

![intlayer के पैकेज](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

`intlayer` पैकेज का उपयोग एप्लिकेशन में सामग्री फ़ाइलों में सामग्री घोषित करने के लिए किया जाता है।

### react-intlayer

`react-intlayer` पैकेज का उपयोग Intlayer डिक्शनरीज़ की व्याख्या करने और उन्हें React एप्लिकेशन में उपयोगी बनाने के लिए किया जाता है।

### next-intlayer

`next-intlayer` पैकेज का उपयोग `react-intlayer` के ऊपर एक लेयर के रूप में किया जाता है ताकि Intlayer डिक्शनरीज़ को Next.js एप्लिकेशन में उपयोगी बनाया जा सके। इसमें Next.js वातावरण में Intlayer को काम करने के लिए आवश्यक सुविधाएँ शामिल हैं, जैसे अनुवाद मिडलवेयर, रूटिंग, या `next.config.js` फ़ाइल कॉन्फ़िगरेशन।

### vue-intlayer

`vue-intlayer` पैकेज का उपयोग Intlayer डिक्शनरीज़ की व्याख्या करने और उन्हें Vue एप्लिकेशन में उपयोगी बनाने के लिए किया जाता है।

### nuxt-intlayer

`nuxt-intlayer` पैकेज Nuxt मॉड्यूल के रूप में है ताकि Intlayer डिक्शनरीज़ को Nuxt एप्लिकेशन में उपयोगी बनाया जा सके। यह Intlayer को Nuxt वातावरण में काम करने के लिए आवश्यक सुविधाओं को एकीकृत करता है, जैसे अनुवाद मिडलवेयर, रूटिंग, या `nuxt.config.js` फ़ाइल कॉन्फ़िगरेशन।

### svelte-intlayer (कार्य प्रगति पर)

`svelte-intlayer` पैकेज का उपयोग Intlayer डिक्शनरीज़ की व्याख्या करने और उन्हें Svelte एप्लिकेशन में उपयोगी बनाने के लिए किया जाता है।

### solid-intlayer (कार्य प्रगति पर)

`solid-intlayer` पैकेज का उपयोग Intlayer डिक्शनरीज़ की व्याख्या करने और उन्हें Solid.js एप्लिकेशन में उपयोगी बनाने के लिए किया जाता है।

### preact-intlayer

`preact-intlayer` पैकेज का उपयोग Intlayer डिक्शनरीज़ की व्याख्या करने और उन्हें Preact एप्लिकेशन में उपयोगी बनाने के लिए किया जाता है।

### angular-intlayer (कार्य प्रगति पर)

`angular-intlayer` पैकेज का उपयोग Intlayer डिक्शनरीज़ की व्याख्या करने और उन्हें Angular एप्लिकेशन में उपयोगी बनाने के लिए किया जाता है।

### express-intlayer

`express-intlayer` पैकेज का उपयोग Express.js बैकएंड पर Intlayer का उपयोग करने के लिए किया जाता है।

### react-native-intlayer

`react-native-intlayer` पैकेज Intlayer को Metro बंडलर के साथ काम करने के लिए प्लगइन्स को एकीकृत करने वाले उपकरण प्रदान करता है।

### lynx-intlayer

`lynx-intlayer` पैकेज Intlayer को Lynx बंडलर के साथ काम करने के लिए प्लगइन्स को एकीकृत करने वाले उपकरण प्रदान करता है।

### vite-intlayer

Intlayer को [Vite बंडलर](https://vite.dev/guide/why.html#why-bundle-for-production) के साथ एकीकृत करने के लिए Vite प्लगइन के साथ-साथ उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने, कुकीज़ प्रबंधन, और URL रीडायरेक्शन को संभालने के लिए मिडलवेयर शामिल करता है।

### react-scripts-intlayer

`react-scripts-intlayer` कमांड और प्लगइन्स शामिल करता है जो Create React App आधारित एप्लिकेशन के साथ Intlayer को एकीकृत करने के लिए हैं। ये प्लगइन्स [craco](https://craco.js.org/) पर आधारित हैं और [Webpack](https://webpack.js.org/) बंडलर के लिए अतिरिक्त कॉन्फ़िगरेशन शामिल करते हैं।

### intlayer-editor

`intlayer-editor` पैकेज का उपयोग विज़ुअल एडिटर का उपयोग करने की अनुमति देने के लिए किया जाता है। यह पैकेज, वैकल्पिक, एप्लिकेशनों में इंस्टॉल किया जा सकता है और इसे `react-intlayer` पैकेज द्वारा उपयोग किया जाएगा।  
यह दो भागों में विभाजित है: सर्वर और क्लाइंट।

क्लाइंट में UI तत्व शामिल हैं जो `react-intlayer` द्वारा उपयोग किए जाएंगे।

सर्वर, जो Express पर आधारित है, विज़ुअल एडिटर अनुरोधों को प्राप्त करने और सामग्री फ़ाइलों को प्रबंधित या संशोधित करने के लिए उपयोग किया जाता है।

### intlayer-cli

`intlayer-cli` पैकेज का उपयोग `npx intlayer dictionaries build` कमांड का उपयोग करके शब्दकोश उत्पन्न करने के लिए किया जा सकता है। यदि `intlayer` पहले से इंस्टॉल है, तो CLI स्वचालित रूप से इंस्टॉल हो जाता है और यह पैकेज आवश्यक नहीं है।

### @intlayer/core

`@intlayer/core` पैकेज मुख्य Intlayer पैकेज है। इसमें अनुवाद और शब्दकोश प्रबंधन कार्य शामिल हैं। `@intlayer/core` मल्टीप्लेटफॉर्म है और अन्य पैकेजों द्वारा शब्दकोशों की व्याख्या करने के लिए उपयोग किया जाता है।

### @intlayer/config

`@intlayer/config` पैकेज का उपयोग Intlayer सेटिंग्स को कॉन्फ़िगर करने के लिए किया जाता है, जैसे उपलब्ध भाषाएं, Next.js मिडलवेयर पैरामीटर, या एकीकृत संपादक सेटिंग्स।

### @intlayer/webpack

`@intlayer/webpack` पैकेज का उपयोग Webpack आधारित एप्लिकेशन को Intlayer के साथ काम करने के लिए Webpack कॉन्फ़िगरेशन प्रदान करने के लिए किया जाता है। यह पैकेज एक मौजूदा Webpack एप्लिकेशन में जोड़ने के लिए एक प्लगइन भी प्रदान करता है।

### @intlayer/cli

`@intlayer/cli` पैकेज एक NPM पैकेज है जिसका उपयोग Intlayer कमांड लाइन इंटरफेस से संबंधित स्क्रिप्ट्स को घोषित करने के लिए किया जाता है। यह सभी Intlayer CLI कमांड्स की एकरूपता सुनिश्चित करता है। यह पैकेज विशेष रूप से [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/hi/packages/intlayer-cli/index.md) और [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/hi/packages/intlayer/index.md) पैकेजों द्वारा उपयोग किया जाता है।

### @intlayer/mcp

`@intlayer/mcp` पैकेज एक MCP (मॉडल संदर्भ प्रोटोकॉल) सर्वर प्रदान करता है जो Intlayer इकोसिस्टम के लिए अनुकूलित AI-संचालित IDE सहायता प्रदान करता है। यह स्वचालित रूप से दस्तावेज़ीकरण लोड करता है और Intlayer CLI के साथ एकीकृत होता है।

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

`@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` और `@intlayer/dynamic-dictionaries-entry` पैकेज Intlayer शब्दकोशों का एंट्री पथ लौटाते हैं। चूंकि ब्राउज़र से फ़ाइल सिस्टम की खोज असंभव है, इसलिए Webpack या Rollup जैसे बंडलर्स का उपयोग करके शब्दकोशों का एंट्री पथ प्राप्त करना संभव नहीं है। ये पैकेज alias किए जाने के लिए डिज़ाइन किए गए हैं, जिससे Vite, Webpack, और Turbopack जैसे विभिन्न बंडलर्स में बंडलिंग अनुकूलन की अनुमति मिलती है।

### @intlayer/engine

`@intlayer/engine` पैकेज सामग्री फ़ाइलों की निगरानी के लिए उपयोग किया जाता है और प्रत्येक संशोधन पर संशोधित शब्दकोश को पुनः उत्पन्न करता है।

### @intlayer/editor

`@intlayer/editor` पैकेज शब्दकोश संपादक से संबंधित उपयोगिताएँ प्रदान करता है। इसमें विशेष रूप से Intlayer संपादक के साथ एक एप्लिकेशन को इंटरफेस करने के लिए API और शब्दकोशों को संचालित करने के लिए उपयोगिताएँ शामिल हैं। यह पैकेज क्रॉस-प्लेटफ़ॉर्म है।

### @intlayer/editor-react

`@intlayer/editor-react` पैकेज React एप्लिकेशन को Intlayer संपादक के साथ इंटरफेस करने के लिए स्टेट्स, कॉन्टेक्स्ट, हुक्स और कॉम्पोनेंट्स प्रदान करता है।

### @intlayer/babel

`@intlayer/babel` पैकेज Vite और Webpack आधारित एप्लिकेशनों के लिए शब्दकोशों की बंडलिंग को अनुकूलित करने वाले उपकरण प्रदान करता है।

### @intlayer/swc

`@intlayer/swc` पैकेज Next.js एप्लिकेशनों के लिए शब्दकोशों की बंडलिंग को अनुकूलित करने वाले उपकरण प्रदान करता है।

### @intlayer/api

`@intlayer/api` पैकेज बैकएंड के साथ इंटरैक्ट करने के लिए एक API SDK है।

### @intlayer/design-system

`@intlayer/design-system` पैकेज CMS और विज़ुअल एडिटर के बीच डिज़ाइन तत्वों को साझा करने के लिए उपयोग किया जाता है।

### @intlayer/backend

`@intlayer/backend` पैकेज बैकएंड प्रकारों को निर्यात करता है और भविष्य में बैकएंड को एक स्टैंडअलोन पैकेज के रूप में पेश करेगा।

## हमारी स्मार्ट डाक्यूमेंटेशन के साथ चैट करें

- [हमारी स्मार्ट डाक्यूमेंटेशन से अपने सवाल पूछें](https://intlayer.org/doc/chat)

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="शब्दकोश कब बनाए जाते हैं: बिल्ड समय पर या रनटाइम पर?">

बिल्ड समय पर। Intlayer प्लगइन `.content.ts` फ़ाइलों को स्कैन करता है, उन्हें अनुकूलित शब्दकोशों में संकलित करता है, और उन्हें `.intlayer` फ़ोल्डर में लिखता है। विकास परिवेश में, जब भी आप फ़ाइल सहेजते हैं तो यह प्रक्रिया स्वचालित रूप से चलती है।

</Question>

<Question title="i18n मेरे बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित सेटअपों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। सर्वर पर रेंडर किया गया मार्कअप सर्वर पर ही अपनी सामग्री को हल करता है, और बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक शब्दकोश प्रविष्टियों से बदल देता है, इसलिए अप्रयुक्त कुंजियों और भाषाओं को हटा दिया जाता है। [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं। पारंपरिक विकल्पों की तुलना में, Intlayer बंडल और पृष्ठ आकार को 50% तक कम करता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना i18next, next-intl या react-i18next से माइग्रेट कर सकता हूँ?">

हाँ, और इसके दो रास्ते हैं। आप [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) या [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) के साथ सामग्री को धीरे-धीरे स्थानांतरित कर सकते हैं। या आप अपने वर्तमान API को पूरी तरह से बनाए रख सकते हैं: [संगतता एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` और `Lingui` के समान API प्रदान करते हैं, लेकिन Intlayer शब्दकोशों द्वारा संचालित होते हैं, जिससे केवल आयात बदलते हैं और घटक कोड समान रहता है।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

पूरी तरह से स्वचालित वर्कफ़्लो के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) JSX, TSX, Vue और Svelte कोड पर निर्माण समय के दौरान भी यही करता है, प्रत्येक परिवर्तन पर शब्दकोश उत्पन्न करता है जिससे कुंजियों को मैन्युअल रूप से बनाए रखने की आवश्यकता समाप्त हो जाती है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title=".intlayer फ़ोल्डर क्या है और क्या मुझे इसे git में कमिट करना चाहिए?">

यह फ़ोल्डर जनरेट किया गया आउटपुट है: संकलित शब्दकोश और जनरेट किए गए TypeScript प्रकार। यह पूरी तरह से आपकी सामग्री फ़ाइलों से उत्पन्न होता है, इसलिए इसे `.gitignore` में जोड़ा जाना चाहिए और CI/CD में `intlayer build` कमांड के माध्यम से पुनः बनाया जाना चाहिए।

</Question>

<Question title="सक्रिय लोकेल कैसे निर्धारित किया जाता है?">

`routing.storage` में सूचीबद्ध स्रोतों से, क्रम में: URL उपसर्ग, कुकी, `Accept-Language` हेडर, और डिफ़ॉल्ट भाषा।

</Question>

<Question title="स्थानीय और दूरस्थ (remote) शब्दकोशों में क्या अंतर है?">

एक स्थानीय शब्दकोश आपके कोडबेस में घोषित किया जाता है और एप्लिकेशन के साथ संकलित किया जाता है। एक रिमोट शब्दकोश CMS में प्रबंधित किया जाता है और API के माध्यम से प्राप्त किया जाता है, जिससे एप्लिकेशन कोड को पुनः तैनात किए बिना टेक्स्ट अपडेट करने की अनुमति मिलती है।

</Question>

<Question title="क्या Intlayer TypeScript के बिना काम करता है?">

हाँ। सामग्री फ़ाइलें TypeScript, JavaScript, ESM, CommonJS, या JSON में लिखी जा सकती हैं। हालाँकि, TypeScript आपके संपादक में स्वचालित प्रकार-जांच और कुंजी पूर्णता के लाभों को अनलॉक करता है।

</Question>

<Question title="सर्वर रेंडरिंग और क्लाइंट रेंडरिंग समान सामग्री को कैसे साझा करते हैं?">

सर्वर सीधे सर्वर-रेंडर किए गए घटकों की सामग्री को हल करता है, इसलिए उन घटकों के लिए क्लाइंट को कोई शब्दकोश नहीं भेजा जाता है। क्लाइंट घटक केवल ब्राउज़र में अन्तरक्रियाशीलता के लिए आवश्यक शब्दकोश प्राप्त करते हैं।

</Question>

<Question title="Intlayer भाषा-संबंधी हाइड्रेशन बेमेल त्रुटियों (hydration mismatch) से कैसे बचता है?">

भाषा सर्वर पर एक बार तय की जाती है और क्लाइंट प्रदाता को दी जाती है, बजाय इसके कि इसे ब्राउज़र में फिर से खोजा जाए, जिससे सर्वर और क्लाइंट HTML आउटपुट पूरी तरह मेल खाते हैं।

</Question>

<Question title="अनुवाद जोड़ते समय क्या मुझे फिर से रीबिल्ड करने की आवश्यकता है?">

विकास परिवेश में नहीं: प्लगइन फ़ाइलों की निगरानी करता है और शब्दकोशों को तुरंत अपडेट करता है। उत्पादन में हाँ: स्थानीय शब्दकोश बिल्ड चरण के दौरान एप्लिकेशन बंडल में संकलित होते हैं।

</Question>

</FAQ>
