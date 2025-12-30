---
createdAt: 2024-12-24
updatedAt: 2025-11-01
title: Intlayer का उपयोग करके अपने i18next JSON अनुवादों को स्वचालित कैसे करें
description: JavaScript अनुप्रयोगों में बेहतर अंतरराष्ट्रीयकरण के लिए Intlayer और i18next के साथ अपने JSON अनुवादों को स्वचालित करें।
keywords:
  - Intlayer
  - i18next
  - अंतरराष्ट्रीयकरण
  - i18n
  - स्थानीयकरण
  - अनुवाद
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - माइग्रेशन
  - एकीकरण
slugs:
  - blog
  - intlayer-with-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON प्लगइन जोड़ें
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON प्लगइन में बदलाव
---

# Intlayer का उपयोग करके अपने i18next JSON अनुवादों को स्वचालित कैसे करें

<iframe title="Intlayer का उपयोग करके अपने i18next JSON अनुवादों को स्वचालित कैसे करें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण लाइब्रेरी है जिसे पारंपरिक i18n समाधानों की कमियों को दूर करने के लिए डिज़ाइन किया गया है। यह JavaScript अनुप्रयोगों में सामग्री प्रबंधन के लिए एक आधुनिक दृष्टिकोण प्रदान करता है।

हमारे [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md) ब्लॉग पोस्ट में i18next के साथ एक ठोस तुलना देखें।

## Intlayer को i18next के साथ क्यों मिलाएं?

जबकि Intlayer एक उत्कृष्ट स्वतंत्र i18n समाधान प्रदान करता है (हमारे [Next.js एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) देखें), आप इसे कई कारणों से i18next के साथ मिलाना चाह सकते हैं:

1. **मौजूदा कोडबेस**: आपके पास एक स्थापित i18next कार्यान्वयन है और आप धीरे-धीरे Intlayer के बेहतर डेवलपर अनुभव की ओर माइग्रेट करना चाहते हैं।
2. **पुराने आवश्यकताएँ**: आपके प्रोजेक्ट को मौजूदा i18next प्लगइन्स या वर्कफ़्लोज़ के साथ संगतता की आवश्यकता है।
3. **टीम की परिचितता**: आपकी टीम i18next के साथ सहज है लेकिन बेहतर सामग्री प्रबंधन चाहती है।
4. **Intlayer की विशेषताओं का उपयोग**: आप Intlayer की विशेषताएँ जैसे सामग्री घोषणा, अनुवाद कुंजी प्रबंधन, अनुवाद स्थिति, और अधिक का उपयोग करना चाहते हैं।

**इसके लिए, Intlayer को i18next के लिए एक एडेप्टर के रूप में लागू किया जा सकता है ताकि CLI या CI/CD पाइपलाइनों में आपके JSON अनुवादों को स्वचालित करने, आपके अनुवादों का परीक्षण करने, और अन्य कार्यों में मदद मिल सके।**

यह गाइड आपको दिखाता है कि कैसे Intlayer की श्रेष्ठ सामग्री घोषणा प्रणाली का लाभ उठाते हुए i18next के साथ संगतता बनाए रखी जाए।

## सामग्री सूची

<TOC/>

## i18next के साथ Intlayer सेट अप करने के लिए चरण-दर-चरण मार्गदर्शिका

### चरण 1: आवश्यक पैकेज इंस्टॉल करें

आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**पैकेज विवरण:**

- **intlayer**: अंतर्राष्ट्रीयकरण प्रबंधन, सामग्री घोषणा, और निर्माण के लिए मुख्य पुस्तकालय
- **@intlayer/sync-json-plugin**: Intlayer सामग्री घोषणाओं को i18next संगत JSON प्रारूप में निर्यात करने के लिए प्लगइन

### चरण 2: JSON को रैप करने के लिए Intlayer प्लगइन लागू करें

अपने समर्थित लोकल्स को परिभाषित करने के लिए एक Intlayer कॉन्फ़िगरेशन फ़ाइल बनाएं:

**यदि आप i18next के लिए JSON शब्दकोश भी निर्यात करना चाहते हैं**, तो `syncJSON` प्लगइन जोड़ें:

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
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` प्लगइन स्वचालित रूप से JSON को रैप कर देगा। यह JSON फ़ाइलों को पढ़ेगा और लिखेगा बिना सामग्री संरचना को बदले।

यदि आप उस JSON को intlayer सामग्री घोषणा फ़ाइलों (`.content` फ़ाइलें) के साथ सह-अस्तित्व में रखना चाहते हैं, तो Intlayer इस प्रकार आगे बढ़ेगा:

1. JSON और सामग्री घोषणा फ़ाइलों दोनों को लोड करेगा और उन्हें intlayer शब्दकोश में परिवर्तित करेगा।
2. यदि JSON और सामग्री घोषणा फ़ाइलों के बीच संघर्ष होता है, तो Intlayer उन सभी शब्दकोशों को मर्ज करने की प्रक्रिया करेगा। यह प्लगइन्स की प्राथमिकता और सामग्री घोषणा फ़ाइल की प्राथमिकता पर निर्भर करेगा (सभी कॉन्फ़िगर करने योग्य हैं)।

यदि CLI का उपयोग करके JSON का अनुवाद किया जाता है, या CMS का उपयोग किया जाता है, तो Intlayer नई अनुवादों के साथ JSON फ़ाइल को अपडेट करेगा।

`syncJSON` प्लगइन के बारे में अधिक विवरण देखने के लिए, कृपया [syncJSON प्लगइन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) देखें।

### (वैकल्पिक) चरण 3: प्रति-कॉम्पोनेंट JSON अनुवाद लागू करें

डिफ़ॉल्ट रूप से, Intlayer दोनों JSON और सामग्री घोषणा फ़ाइलों को लोड, मर्ज और सिंक्रनाइज़ करेगा। अधिक विवरण के लिए [सामग्री घोषणा दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) देखें। लेकिन यदि आप चाहें, तो Intlayer प्लगइन का उपयोग करके, आप अपने कोडबेस में कहीं भी स्थानीयकृत JSON के प्रति-कॉम्पोनेंट प्रबंधन को भी लागू कर सकते हैं।

इसके लिए, आप `loadJSON` प्लगइन का उपयोग कर सकते हैं।

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // अपने वर्तमान JSON फ़ाइलों को Intlayer शब्दकोशों के साथ सिंक में रखें
  plugins: [
    /**
     * src में सभी JSON फ़ाइलों को लोड करेगा जो पैटर्न {key}.i18n.json से मेल खाती हैं
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // सुनिश्चित करता है कि ये JSON फ़ाइलें `./locales/en/${key}.json` में फ़ाइलों से प्राथमिकता लें
    }),
    /**
     * स्थानीय निर्देशिका में JSON फ़ाइलों में आउटपुट और अनुवाद वापस लिखेगा और लोड करेगा
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

यह `src` निर्देशिका में सभी JSON फ़ाइलों को लोड करेगा जो पैटर्न `{key}.i18n.json` से मेल खाती हैं और उन्हें Intlayer शब्दकोशों के रूप में लोड करेगा।

---

## Git कॉन्फ़िगरेशन

स्वचालित रूप से उत्पन्न Intlayer फ़ाइलों को अनदेखा करने की सलाह दी जाती है:

```plaintext fileName=".gitignore"
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```

ये फ़ाइलें आपके बिल्ड प्रक्रिया के दौरान पुनः उत्पन्न की जा सकती हैं और इन्हें संस्करण नियंत्रण में कमिट करने की आवश्यकता नहीं है।

### VS कोड एक्सटेंशन

बेहतर डेवलपर अनुभव के लिए, आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल करें:

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
