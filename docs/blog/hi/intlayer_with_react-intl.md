---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Intlayer का उपयोग करके अपने react-intl JSON अनुवादों को स्वचालित कैसे करें
description: React एप्लिकेशन में बेहतर अंतरराष्ट्रीयकरण के लिए Intlayer और react-intl के साथ अपने JSON अनुवादों को स्वचालित करें।
keywords:
  - react-intl
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - ब्लॉग
  - i18n
  - जावास्क्रिप्ट
  - रिएक्ट
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON प्लगइन जोड़ें
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON प्लगइन में बदलाव
---

# Intlayer का उपयोग करके अपने react-intl JSON अनुवादों को स्वचालित कैसे करें

## सामग्री तालिका

<TOC/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण लाइब्रेरी है जिसे पारंपरिक i18n समाधानों की कमियों को दूर करने के लिए डिज़ाइन किया गया है। यह React एप्लिकेशन में सामग्री प्रबंधन के लिए एक आधुनिक दृष्टिकोण प्रदान करता है।

react-intl के साथ एक ठोस तुलना के लिए हमारे [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/react-i18next_vs_react-intl_vs_intlayer.md) ब्लॉग पोस्ट देखें।

## Intlayer को react-intl के साथ क्यों मिलाएं?

जबकि Intlayer एक उत्कृष्ट स्वतंत्र i18n समाधान प्रदान करता है (हमारे [React एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) देखें), आप इसे कई कारणों से react-intl के साथ मिलाना चाह सकते हैं:

1. **मौजूदा कोडबेस**: आपके पास एक स्थापित react-intl कार्यान्वयन है और आप धीरे-धीरे Intlayer के बेहतर डेवलपर अनुभव की ओर माइग्रेट करना चाहते हैं।
2. **पुराने आवश्यकताएँ**: आपके प्रोजेक्ट को मौजूदा react-intl प्लगइन्स या वर्कफ़्लोज़ के साथ संगतता की आवश्यकता है।
3. **टीम की परिचितता**: आपकी टीम react-intl के साथ सहज है लेकिन बेहतर सामग्री प्रबंधन चाहती है।
4. **Intlayer सुविधाओं का उपयोग**: आप Intlayer की सामग्री घोषणा, अनुवाद स्वचालन, अनुवाद परीक्षण, और अन्य सुविधाओं का उपयोग करना चाहते हैं।

**इसके लिए, Intlayer को react-intl के लिए एक एडेप्टर के रूप में लागू किया जा सकता है जो CLI या CI/CD पाइपलाइनों में आपके JSON अनुवादों को स्वचालित करने, आपके अनुवादों का परीक्षण करने, और अन्य कार्यों में मदद करता है।**

यह गाइड आपको दिखाता है कि कैसे Intlayer की श्रेष्ठ सामग्री घोषणा प्रणाली का लाभ उठाते हुए react-intl के साथ संगतता बनाए रखी जाए।

## विषय सूची

<TOC/>

## react-intl के साथ Intlayer सेटअप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: निर्भरताएँ स्थापित करें

आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**पैकेज विवरण:**

- **intlayer**: अंतरराष्ट्रीयकरण प्रबंधन, सामग्री घोषणा, और निर्माण के लिए मुख्य पुस्तकालय
- **@intlayer/sync-json-plugin**: Intlayer सामग्री घोषणाओं को react-intl संगत JSON प्रारूप में निर्यात करने के लिए प्लगइन

### चरण 2: JSON को रैप करने के लिए Intlayer प्लगइन लागू करें

अपने समर्थित लोकल्स को परिभाषित करने के लिए एक Intlayer कॉन्फ़िगरेशन फ़ाइल बनाएं:

**यदि आप react-intl के लिए JSON शब्दकोश भी निर्यात करना चाहते हैं**, तो `syncJSON` प्लगइन जोड़ें:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` प्लगइन स्वचालित रूप से JSON को रैप करेगा। यह JSON फ़ाइलों को पढ़ेगा और लिखेगा बिना सामग्री संरचना को बदले।

यदि आप JSON को intlayer सामग्री घोषणा फ़ाइलों (`.content` फ़ाइलें) के साथ सह-अस्तित्व में रखना चाहते हैं, तो Intlayer इस प्रकार कार्य करेगा:

    1. JSON और सामग्री घोषणा फ़ाइलों दोनों को लोड करेगा और उन्हें intlayer शब्दकोश में परिवर्तित करेगा।
    2. यदि JSON और सामग्री घोषणा फ़ाइलों के बीच कोई संघर्ष होता है, तो Intlayer उन सभी शब्दकोशों को मर्ज करने की प्रक्रिया करेगा। यह प्लगइन्स की प्राथमिकता और सामग्री घोषणा फ़ाइल की प्राथमिकता पर निर्भर करेगा (सभी कॉन्फ़िगर करने योग्य हैं)।

यदि CLI का उपयोग करके JSON का अनुवाद किया जाता है, या CMS का उपयोग करके परिवर्तन किए जाते हैं, तो Intlayer नई अनुवादों के साथ JSON फ़ाइल को अपडेट करेगा।

`syncJSON` प्लगइन के बारे में अधिक विवरण देखने के लिए, कृपया [syncJSON प्लगइन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) देखें।

### (वैकल्पिक) चरण 3: प्रति-कंपोनेंट JSON अनुवाद लागू करें

डिफ़ॉल्ट रूप से, Intlayer दोनों JSON और सामग्री घोषणा फ़ाइलों को लोड, मर्ज और सिंक्रनाइज़ करेगा। अधिक जानकारी के लिए [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें। लेकिन यदि आप चाहें, तो Intlayer प्लगइन का उपयोग करके, आप अपने कोडबेस में कहीं भी स्थानीयकृत JSON के प्रति-कंपोनेंट प्रबंधन को भी लागू कर सकते हैं।

इसके लिए, आप `loadJSON` प्लगइन का उपयोग कर सकते हैं।

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // अपने वर्तमान JSON फ़ाइलों को Intlayer शब्दकोशों के साथ सिंक्रनाइज़ रखें
  plugins: [
    /**
     * src में सभी JSON फ़ाइलों को लोड करेगा जो पैटर्न {key}.i18n.json से मेल खाती हैं
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // सुनिश्चित करता है कि ये JSON फ़ाइलें `./locales/en/${key}.json` में फ़ाइलों की तुलना में प्राथमिकता लें
    }),
    /**
     * स्थानीय निर्देशिका में JSON फ़ाइलों में आउटपुट और अनुवाद वापस लोड और लिखेगा
     */
    syncJSON({
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

यह `src` निर्देशिका में सभी JSON फ़ाइलों को लोड करेगा जो पैटर्न `{key}.i18n.json` से मेल खाती हैं और उन्हें Intlayer शब्दकोशों के रूप में लोड करेगा।

## Git कॉन्फ़िगरेशन

स्वचालित रूप से उत्पन्न Intlayer फ़ाइलों को अनदेखा करना अनुशंसित है:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

ये फ़ाइलें आपके निर्माण प्रक्रिया के दौरान पुनः उत्पन्न की जा सकती हैं और इन्हें संस्करण नियंत्रण में कमिट करने की आवश्यकता नहीं है।

### VS कोड एक्सटेंशन

बेहतर डेवलपर अनुभव के लिए, आधिकारिक **Intlayer VS Code एक्सटेंशन** इंस्टॉल करें:

[VS Code मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
