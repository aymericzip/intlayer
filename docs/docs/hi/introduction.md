---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: परिचय
description: जानें कि Intlayer कैसे काम करता है। देखें कि Intlayer आपके एप्लिकेशन में किन चरणों का उपयोग करता है। खोजें कि विभिन्न पैकेजों का क्या कार्य है।
keywords:
  - परिचय
  - शुरुआत
  - Intlayer
  - एप्लिकेशन
  - पैकेज
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
---

# Intlayer दस्तावेज़ीकरण

आधिकारिक Intlayer दस्तावेज़ीकरण में आपका स्वागत है! यहाँ, आपको अपने सभी अंतर्राष्ट्रीयकरण (i18n) आवश्यकताओं के लिए Intlayer को एकीकृत (integrate), कॉन्फ़िगर और मास्टर करने के लिए आवश्यक सब कुछ मिलेगा, चाहे आप Next.js, React, Vite, Express, या किसी अन्य JavaScript वातावरण के साथ काम कर रहे हों।

## परिचय

### Intlayer क्या है?

**Intlayer** एक अंतर्राष्ट्रीयकरण (internationalization) लाइब्रेरी है जिसे विशेष रूप से JavaScript डेवलपर्स के लिए डिज़ाइन किया गया है। यह आपके कोड में कहीं भी आपके कंटेंट को डिक्लेयर करने की अनुमति देता है। यह बहुभाषी कंटेंट के डिक्लेरेशन को आपके कोड में आसानी से एकीकृत करने के लिए संरचित शब्दकोशों (structured dictionaries) में परिवर्तित करता है। TypeScript का उपयोग करके, **Intlayer** आपके विकास को मजबूत और अधिक कुशल बनाता है।

Intlayer एक वैकल्पिक विज़ुअल एडिटर भी प्रदान करता है जो आपको आसानी से अपने कंटेंट को संपादित और प्रबंधित करने की अनुमति देता है। यह एडिटर विशेष रूप से उन डेवलपर्स के लिए उपयोगी है जो कंटेंट प्रबंधन के लिए विज़ुअल इंटरफ़ेस पसंद करते हैं, या उन टीमों के लिए जो कोड के बारे में चिंता किए बिना कंटेंट उत्पन्न करते हैं।

### उपयोग का उदाहरण

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      hi: "नमस्ते दुनिया",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "hi": "नमस्ते दुनिया"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### विकल्पों के स्थान पर Intlayer क्यों?

`next-intl` या `i18next` जैसे मुख्य समाधानों की तुलना में, Intlayer एक ऐसा समाधान है जो एकीकृत अनुकूलन (optimizations) के साथ आता है जैसे:

<AccordionGroup>

<Accordion header="बंडल आकार (Bundle size)">

अपने पृष्ठों में बड़े JSON फ़ाइलों को लोड करने के बजाय, केवल आवश्यक कंटेंट को लोड करें। Intlayer आपके **बंडल और पृष्ठ के आकार को 50% तक कम करने** में मदद करता है।

</Accordion>

<Accordion header="बनाए रखने की क्षमता (Maintainability)">

अपने एप्लिकेशन के कंटेंट को स्कोप करना बड़े पैमाने के एप्लिकेशनों के लिए **रखरखाव को आसान बनाता है**। आप अपने संपूर्ण कंटेंट कोडबेस की समीक्षा करने के मानसिक बोझ के बिना एक सिंगल फीचर फ़ोल्डर को डुप्लिकेट या हटा सकते हैं। इसके अतिरिक्त, आपके कंटेंट की सटीकता सुनिश्चित करने के लिए Intlayer **पूरी तरह से टाइप (fully typed)** किया गया है।

</Accordion>

<Accordion header="AI एजेंट (AI Agent)">

कंटेंट का सह-स्थान (Co-locating) बड़े भाषा मॉडल (LLMs) द्वारा **आवश्यक संदर्भ को कम करता है**। Intlayer AI एजेंटों के लिए डेवलपर अनुभव (DX) को और भी सुगम बनाने के लिए लापता अनुवादों का परीक्षण करने के लिए **CLI**, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)** और **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)** जैसे उपकरणों के एक सूट के साथ आता है।

</Accordion>

<Accordion header="स्वचालन (Automation)">

अपने AI प्रदाता की लागत पर अपनी पसंद के LLM का उपयोग करके अपने CI/CD पाइपलाइन में अनुवाद करने के लिए स्वचालन का उपयोग करें। Intlayer कंटेंट निष्कर्षण को स्वचालित करने के लिए एक **कंपाइलर (compiler)** और **पृष्ठभूमि में अनुवाद** करने में मदद करने के लिए एक [वेब प्लेटफ़ॉर्म](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) भी प्रदान करता है।

</Accordion>

<Accordion header="प्रदर्शन (Performance)">

विशाल JSON फ़ाइलों को घटकों (components) से जोड़ने से प्रदर्शन और प्रतिक्रिया (reactivity) संबंधी समस्याएं हो सकती हैं। Intlayer निर्माण के समय (build time) आपके कंटेंट के लोडिंग को अनुकूलित करता है।

</Accordion>

<Accordion header="गैर-डेवलपर्स के साथ स्केलिंग (Scaling with non-dev)">

केवल एक i18n समाधान से अधिक, Intlayer आपके बहुभाषी कंटेंट को **रीयल-टाइम** में प्रबंधित करने में मदद करने के लिए एक **सेल्फ-होस्टेड [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)** और एक **[पूर्ण CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)** प्रदान करता है, जिससे अनुवादकों, कॉपीराइटरों और टीम के अन्य सदस्यों के साथ सहज सहयोग संभव हो जाता है। कंटेंट को स्थानीय और/या दूरस्थ रूप से संग्रहीत किया जा सकता है।

</Accordion>
</AccordionGroup>

## मुख्य विशेषताएँ

Intlayer आधुनिक वेब विकास की आवश्यकताओं को पूरा करने के लिए तैयार की गई विभिन्न सुविधाएँ प्रदान करता है। नीचे विस्तृत दस्तावेज़ीकरण के लिंक के साथ प्रमुख सुविधाएँ दी गई हैं:

- **अंतर्राष्ट्रीयकरण समर्थन**: अंतर्राष्ट्रीयकरण के लिए अंतर्निहित समर्थन के साथ अपने एप्लिकेशन की वैश्विक पहुँच को बढ़ाएँ।
- **विज़ुअल एडिटर**: Intlayer के लिए डिज़ाइन किए गए एडिटर प्लगइन्स के साथ अपने विकास वर्कफ़्लो में सुधार करें। [विज़ुअल एडिटर गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) देखें।
- **कॉन्फ़िगरेशन का लचीलापन**: [कॉन्फ़िगरेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) में विस्तृत रूप से कॉन्फ़िगरेशन विकल्पों के साथ अपने सेटअप को अनुकूलित करें।
- **उन्नत CLI उपकरण**: Intlayer के कमांड लाइन इंटरफ़ेस का उपयोग करके अपने प्रोजेक्ट्स को कुशलतापूर्वक प्रबंधित करें। [CLI उपकरण दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) में क्षमताओं का अन्वेषण करें।

## मुख्य अवधारणाएँ

### शब्दकोश (Dictionary)

हर चीज़ को सुसंगत और बनाए रखने योग्य रखने के लिए अपने बहुभाषी कंटेंट को अपने कोड के करीब व्यवस्थित करें।

- **[शुरुआत (Get Started)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)**  
  Intlayer में अपने कंटेंट की घोषणा करने की मूल बातें सीखें।

- **[अनुवाद (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md)**  
  समझें कि आपके एप्लिकेशन में अनुवाद कैसे उत्पन्न, संग्रहीत और उपयोग किए जाते हैं।

- **[गणना (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration.md)**  
  विभिन्न भाषाओं में दोहराए गए या निश्चित डेटासेट को आसानी से प्रबंधित करें।

- **[स्थिति (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/condition.md)**  
  गतिशील कंटेंट बनाने के लिए Intlayer में सशर्त तर्क का उपयोग करना सीखें।

- **[सम्मिलन (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion.md)**  
  सम्मिलन प्लेसहोल्डर का उपयोग करके स्ट्रिंग में मान डालने का तरीका खोजें।

- **[फ़ंक्शन प्राप्त करना (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/function_fetching.md)**  
  देखें कि अपने प्रोजेक्ट के वर्कफ़्लो से मेल खाने के लिए कस्टम तर्क के साथ कंटेंट को गतिशील रूप से कैसे प्राप्त करें।

- **[मार्कडाउन (Markdown)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)**  
  समृद्ध कंटेंट बनाने के लिए Intlayer में मार्कडाउन का उपयोग करना सीखें।

- **[फ़ाइल एम्बेडिंग (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/file.md)**  
  खोजें कि कंटेंट एडिटर में उनका उपयोग करने के लिए Intlayer में बाहरी फ़ाइलों को कैसे एम्बेड करें।

- **[नेस्टिंग (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/nesting.md)**  
  जटिल संरचनाएं बनाने के लिए Intlayer में कंटेंट को नेस्ट करना समझें।

### वातावरण और एकीकरण

हमने लचीलेपन को ध्यान में रखते हुए Intlayer का निर्माण किया है, जो लोकप्रिय फ्रेमवर्क और बिल्ड टूल्स में सहज एकीकरण की पेशकश करता है:

- **[Next.js 16 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)**
- **[Next.js 15 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)**
- **[Next.js 14 (App Router) के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_14.md)**
- **[Next.js Page Router के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_page_router.md)**
- **[React CRA के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)**
- **[Vite + React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)**
- **[React Router v7 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_router_v7.md)**
- **[Tanstack Start के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)**
- **[React Native और Expo के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_native+expo.md)**
- **[Lynx और React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_lynx+react.md)**
- **[Vite + Preact के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+preact.md)**
- **[Vite + Vue के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vue.md)**
- **[Nuxt के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nuxt.md)**
- **[Vite + Svelte के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+svelte.md)**
- **[SvelteKit के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_svelte_kit.md)**
- **[Express के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_express.md)**
- **[NestJS के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nestjs.md)**
- **[Hono के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_hono.md)**
- **[Angular के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_21.md)**

प्रत्येक एकीकरण गाइड में Intlayer की सुविधाओं का उपयोग करने के सर्वोत्तम अभ्यास (best practices) शामिल हैं, जैसे **सर्वर-साइड रेंडरिंग (SSR)**, **डायनामिक रूटिंग**, या **क्लाइंट-साइड रेंडरिंग**, ताकि आप एक तेज़, SEO-अनुकूल और उच्च स्केलेबल एप्लिकेशन बनाए रख सकें।

## योगदान और प्रतिक्रिया

हम ओपन-सोर्स और समुदाय-संचालित (community-driven) विकास की शक्ति को महत्व देते हैं। यदि आप सुधारों का प्रस्ताव देना चाहते हैं, एक नई गाइड जोड़ना चाहते हैं, या हमारे दस्तावेज़ों में किसी भी समस्या को ठीक करना चाहते हैं, तो बेझिझक पुल अनुरोध (Pull Request) सबमिट करें या हमारे [GitHub रिपॉजिटरी](https://github.com/aymericzip/intlayer/blob/main/docs/docs) पर एक समस्या (Issue) खोलें।

**क्या आप अपने एप्लिकेशन का तेज़ी से और अधिक कुशलता से अनुवाद करने के लिए तैयार हैं?** आज ही Intlayer का उपयोग शुरू करने के लिए हमारे दस्तावेज़ों में गोता लगाएँ। अंतर्राष्ट्रीयकरण के लिए एक मजबूत, सुव्यवस्थित दृष्टिकोण का अनुभव करें जो आपके कंटेंट को व्यवस्थित रखता है और आपकी टीम को अधिक उत्पादक बनाता है।
