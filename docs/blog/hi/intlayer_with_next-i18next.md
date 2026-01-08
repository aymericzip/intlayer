---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer और next-i18next
description: एक व्यापक Next.js अंतरराष्ट्रीयकरण समाधान के लिए Intlayer को next-i18next के साथ एकीकृत करें
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - ब्लॉग
  - Next.js
  - जावास्क्रिप्ट
  - रिएक्ट
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: loadJSON प्लगइन जोड़ा गया
  - version: 7.0.0
    date: 2025-10-29
    changes: syncJSON प्लगइन में बदलाव और व्यापक पुनर्लेखन
---

# next-i18next और Intlayer के साथ Next.js अंतरराष्ट्रीयकरण (i18n)

<iframe title="Intlayer का उपयोग करके अपने next-i18next JSON अनुवादों को स्वचालित कैसे करें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## सामग्री सूची

<TOC/>

## next-i18next क्या है?

**next-i18next** Next.js अनुप्रयोगों के लिए सबसे लोकप्रिय अंतरराष्ट्रीयकरण (i18n) फ्रेमवर्क में से एक है। शक्तिशाली **i18next** इकोसिस्टम के ऊपर निर्मित, यह Next.js परियोजनाओं में अनुवाद, स्थानीयकरण, और भाषा स्विचिंग प्रबंधन के लिए एक व्यापक समाधान प्रदान करता है।

हालांकि, next-i18next के साथ कुछ चुनौतियाँ भी हैं:

- **जटिल कॉन्फ़िगरेशन**: next-i18next को सेटअप करने के लिए कई कॉन्फ़िगरेशन फ़ाइलों और सर्वर-साइड तथा क्लाइंट-साइड i18n इंस्टेंस की सावधानीपूर्वक सेटअप की आवश्यकता होती है।
- **विखरे हुए अनुवाद**: अनुवाद फ़ाइलें आमतौर पर कंपोनेंट्स से अलग निर्देशिकाओं में संग्रहीत होती हैं, जिससे संगति बनाए रखना कठिन हो जाता है।
- **मैनुअल नेमस्पेस प्रबंधन**: डेवलपर्स को नेमस्पेस को मैन्युअली प्रबंधित करना होता है और अनुवाद संसाधनों के सही लोडिंग को सुनिश्चित करना होता है।
- **सीमित टाइप सुरक्षा**: TypeScript समर्थन के लिए अतिरिक्त कॉन्फ़िगरेशन की आवश्यकता होती है और यह अनुवादों के लिए स्वचालित टाइप जनरेशन प्रदान नहीं करता है।

## Intlayer क्या है?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतरराष्ट्रीयकरण लाइब्रेरी है जिसे पारंपरिक i18n समाधानों की कमियों को दूर करने के लिए डिज़ाइन किया गया है। यह Next.js अनुप्रयोगों में सामग्री प्रबंधन के लिए एक आधुनिक दृष्टिकोण प्रदान करता है।

हमारे [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-intl_vs_intlayer.md) ब्लॉग पोस्ट में next-intl के साथ एक ठोस तुलना देखें।

## Intlayer को next-i18next के साथ क्यों संयोजित करें?

जबकि Intlayer एक उत्कृष्ट स्वतंत्र i18n समाधान प्रदान करता है (हमारे [Next.js एकीकरण गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) को देखें), आप इसे कई कारणों से next-i18next के साथ संयोजित करना चाह सकते हैं:

1. **मौजूदा कोडबेस**: आपके पास एक स्थापित next-i18next कार्यान्वयन है और आप धीरे-धीरे Intlayer के बेहतर डेवलपर अनुभव की ओर माइग्रेट करना चाहते हैं।
2. **पुरानी आवश्यकताएँ**: आपके प्रोजेक्ट को मौजूदा i18next प्लगइन्स या वर्कफ़्लोज़ के साथ संगतता की आवश्यकता है।
3. **टीम की परिचितता**: आपकी टीम next-i18next के साथ सहज है लेकिन बेहतर सामग्री प्रबंधन चाहती है।

**इसके लिए, Intlayer को next-i18next के लिए एक एडाप्टर के रूप में लागू किया जा सकता है जो CLI या CI/CD पाइपलाइनों में आपके JSON अनुवादों को स्वचालित करने, आपके अनुवादों का परीक्षण करने, और भी बहुत कुछ करने में मदद करता है।**

यह गाइड आपको दिखाता है कि कैसे Intlayer की श्रेष्ठ सामग्री घोषणा प्रणाली का लाभ उठाते हुए next-i18next के साथ संगतता बनाए रखी जाए।

---

## next-i18next के साथ Intlayer सेटअप करने के लिए चरण-दर-चरण गाइड

### चरण 1: निर्भरताएँ स्थापित करें

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

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

**पैकेज व्याख्याएँ:**

- **intlayer**: सामग्री घोषणा और प्रबंधन के लिए कोर लाइब्रेरी
- **@intlayer/sync-json-plugin**: Intlayer सामग्री घोषणाओं को i18next JSON प्रारूप में सिंक करने के लिए प्लगइन

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
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`syncJSON` प्लगइन JSON को स्वचालित रूप से रैप करेगा। यह JSON फ़ाइलों को पढ़ेगा और लिखेगा बिना सामग्री संरचना को बदले।

यदि आप JSON को intlayer सामग्री घोषणा फ़ाइलों (`.content` फ़ाइलें) के साथ सह-अस्तित्व में रखना चाहते हैं, तो Intlayer इस प्रकार कार्य करेगा:

    1. JSON और सामग्री घोषणा दोनों फ़ाइलों को लोड करेगा और उन्हें intlayer शब्दकोश में परिवर्तित करेगा।
    2. यदि JSON और सामग्री घोषणा फ़ाइलों के बीच कोई संघर्ष होता है, तो Intlayer उन सभी शब्दकोशों को मर्ज करने की प्रक्रिया करेगा। यह प्लगइन्स की प्राथमिकता और सामग्री घोषणा फ़ाइल की प्राथमिकता पर निर्भर करेगा (सभी कॉन्फ़िगर करने योग्य हैं)।

यदि JSON का अनुवाद करने के लिए CLI का उपयोग करके या CMS का उपयोग करके परिवर्तन किए जाते हैं, तो Intlayer नई अनुवादों के साथ JSON फ़ाइल को अपडेट करेगा।

`syncJSON` प्लगइन के बारे में अधिक विवरण देखने के लिए, कृपया [syncJSON प्लगइन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) देखें।

---

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

  // अपने वर्तमान JSON फ़ाइलों को Intlayer शब्दकोशों के साथ सिंक में रखें
  plugins: [
    /**
     * src में सभी JSON फ़ाइलों को लोड करेगा जो पैटर्न {key}.i18n.json से मेल खाती हैं
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // सुनिश्चित करता है कि ये JSON फ़ाइलें `./public/locales/en/${key}.json` में फ़ाइलों से प्राथमिकता लें
    }),
    /**
     * स्थानीय निर्देशिका में JSON फ़ाइलों में आउटपुट और अनुवाद वापस लिखेगा और लोड करेगा
     */
    syncJSON({
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

यह `src` निर्देशिका में सभी JSON फ़ाइलों को लोड करेगा जो पैटर्न `{key}.i18n.json` से मेल खाती हैं और उन्हें Intlayer शब्दकोशों के रूप में लोड करेगा।

---

## Git कॉन्फ़िगरेशन

जनरेट की गई फ़ाइलों को संस्करण नियंत्रण से बाहर करें:

```plaintext fileName=".gitignore"
# Intlayer द्वारा जनरेट की गई फ़ाइलों को अनदेखा करें
.intlayer
```

ये फ़ाइलें बिल्ड प्रक्रिया के दौरान स्वचालित रूप से पुनः उत्पन्न होती हैं और इन्हें आपके रिपॉजिटरी में कमिट करने की आवश्यकता नहीं है।

### VS कोड एक्सटेंशन

बेहतर डेवलपर अनुभव के लिए, आधिकारिक **Intlayer VS कोड एक्सटेंशन** इंस्टॉल करें:

[VS कोड मार्केटप्लेस से इंस्टॉल करें](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
