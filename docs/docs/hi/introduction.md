---
createdAt: 2025-08-23
updatedAt: 2026-09-05
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
author: aymericzip
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
- **[Next.js (URL में लोकेल के बिना) के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_no_locale_path.md)**
- **[Next.js (Intlayer Compiler) के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_compiler.md)**
- **[Tanstack Start के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)**
- **[Tanstack Start + Solid के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack+solid.md)**
- **[Vite + React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)**
- **[Vite + React (Intlayer Compiler) के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react_compiler.md)**
- **[React Router v7 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_router_v7.md)**
- **[React Router v7 (fs-routes) के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_router_v7_fs_routes.md)**
- **[React CRA के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)**
- **[React Native और Expo के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_react_native+expo.md)**
- **[Lynx और React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_lynx+react.md)**
- **[Astro के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro.md)**
- **[Astro + React के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_react.md)**
- **[Astro + Vue के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_vue.md)**
- **[Astro + Svelte के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_svelte.md)**
- **[Astro + Solid के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_solid.md)**
- **[Astro + Preact के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_preact.md)**
- **[Astro + Lit के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_lit.md)**
- **[Astro + Vanilla JS के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_astro_vanilla.md)**
- **[Vite + Vue के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vue.md)**
- **[Nuxt के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nuxt.md)**
- **[Vite + Svelte के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+svelte.md)**
- **[SvelteKit के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_svelte_kit.md)**
- **[Vite + Solid के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+solid.md)**
- **[SolidStart के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_solid_start.md)**
- **[Vite + Preact के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+preact.md)**
- **[Angular 22 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_21.md)**
- **[Angular 19 के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_angular_19.md)**
- **[Analog के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_analog.md)**
- **[Vite + Lit के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+lit.md)**
- **[Vite + Vanilla JS के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vanilla.md)**
- **[Vanilla JS के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vanilla.md)**
- **[htmx के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_htmx.md)**
- **[Express के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_express.md)**
- **[NestJS के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nestjs.md)**
- **[Fastify के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_fastify.md)**
- **[Hono के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_hono.md)**
- **[AdonisJS के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_adonisjs.md)**
- **[Elysia के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_elysia.md)**
- **[Storybook के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_storybook.md)**
- **[next-intl के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_next-intl.md)**
- **[next-i18next के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_next-i18next.md)**

प्रत्येक एकीकरण गाइड में Intlayer की सुविधाओं का उपयोग करने के सर्वोत्तम अभ्यास (best practices) शामिल हैं, जैसे **सर्वर-साइड रेंडरिंग (SSR)**, **डायनामिक रूटिंग**, या **क्लाइंट-साइड रेंडरिंग**, ताकि आप एक तेज़, SEO-अनुकूल और उच्च स्केलेबल एप्लिकेशन बनाए रख सकें।

## योगदान और प्रतिक्रिया

हम ओपन-सोर्स और समुदाय-संचालित (community-driven) विकास की शक्ति को महत्व देते हैं। यदि आप सुधारों का प्रस्ताव देना चाहते हैं, एक नई गाइड जोड़ना चाहते हैं, या हमारे दस्तावेज़ों में किसी भी समस्या को ठीक करना चाहते हैं, तो बेझिझक पुल अनुरोध (Pull Request) सबमिट करें या हमारे [GitHub रिपॉजिटरी](https://github.com/aymericzip/intlayer/blob/main/docs/docs) पर एक समस्या (Issue) खोलें।

**क्या आप अपने एप्लिकेशन का तेज़ी से और अधिक कुशलता से अनुवाद करने के लिए तैयार हैं?** आज ही Intlayer का उपयोग शुरू करने के लिए हमारे दस्तावेज़ों में गोता लगाएँ। अंतर्राष्ट्रीयकरण के लिए एक मजबूत, सुव्यवस्थित दृष्टिकोण का अनुभव करें जो आपके कंटेंट को व्यवस्थित रखता है और आपकी टीम को अधिक उत्पादक बनाता है।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="Intlayer का उपयोग किस लिए किया जाता है?">

Intlayer JavaScript और TypeScript अनुप्रयोगों के लिए एक अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है। आप घटक की सामग्री को `.content.ts` फ़ाइल में ठीक घटक के बगल में घोषित करते हैं, Intlayer उन घोषणाओं को बिल्ड समय पर टाइप किए गए शब्दकोशों में संकलित करता है, और आपके घटक उन्हें `useIntlayer` जैसे हुक के माध्यम से पढ़ते हैं। इसमें अनुवाद, बहुवचन नियम, लिंग, Markdown, लोकेल-जागरूक रूटिंग, SEO मेटाडेटा, AI-सहायता प्राप्त अनुवाद और गैर-डेवलपर्स के लिए विज़ुअल एडिटर शामिल हैं।

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

<Question title="JavaScript अनुप्रयोगों के अंतर्राष्ट्रीयकरण के लिए कौन से विभिन्न समाधान उपलब्ध हैं?">

यह क्षेत्र तीन पीढ़ियों में विभाजित है:

- **रनटाइम कैटलॉग लाइब्रेरी**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`। संदेश JSON नेमस्पेस में संग्रहीत होते हैं जो रनटाइम पर लोड होते हैं। परिपक्व और फ्रेमवर्क-अज्ञेयवादी, लेकिन स्थिर प्रकार की कमी होती है और क्लाइंट को संपूर्ण कैटलॉग भेजा जाता है।
- **कंपाइल-टाइम संदेश लाइब्रेरी**: `Lingui`, `Paraglide`, `react-intl`, और निष्कर्षण चरण के साथ `next-intl`। बेहतर बंडल व्यवहार और आंशिक प्रकार, लेकिन अभी भी केंद्रीकृत कैटलॉग पर निर्भर।
- **कंटेंट लेयर लाइब्रेरी (Content layer)**: `Intlayer`। सामग्री घटक-दर-घटक घोषित की जाती है और घटक-दर-घटक संकलित की जाती है; सत्य के एक ही स्रोत में टाइपिंग, ट्री-शेकिंग, डेवलपर टूलिंग और संपादन को जोड़ती है।

[Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="Intlayer किन फ्रेमवर्क का समर्थन करता है?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, किसी भी आइलैंड घटक के साथ Astro, Expo के साथ React Native, Lynx, और बैकएंड पर Express, Fastify, NestJS, Hono, Elysia, और AdonisJS। वातावरण अनुभाग में प्रत्येक के लिए एक समर्पित गाइड है।

</Question>

<Question title="केंद्रीकृत JSON फ़ाइल के बजाय घटक के बगल में सामग्री क्यों घोषित करें?">

इसके तीन कारण हैं: पहला, पृष्ठ संपूर्ण नेमस्पेस के बजाय केवल उन्हीं प्रविष्टियों को भेजता है जिन्हें उसके घटक वास्तव में प्रस्तुत करते हैं, जिससे बंडल का आकार कम हो जाता है। दूसरा, खोई हुई कुंजियों की खोज किए बिना फ़ीचर फ़ोल्डर को स्वतंत्र रूप से स्थानांतरित या हटाया जा सकता है। तीसरा, घटक का संपादन करने वाले LLM या AI एजेंट अपनी सामग्री को उसी फ़ोल्डर में देखते हैं, जिससे उच्च सटीकता मिलती है। [Intlayer कैसे काम करता है](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/how_works_intlayer.md) देखें।

</Question>

<Question title="मैं अपने ऐप को AI के साथ स्वचालित रूप से कैसे अनुवाद करूँ?">

`npx intlayer fill` चलाएं। CLI लापता अनुवादों का पता लगाता है और आपके अपने प्रदाता और API कुंजी का उपयोग करके आपके चुने हुए LLM के साथ उन्हें भरता है। `--git-diff` ध्वज वर्तमान शाखा पर बदली गई सामग्री तक संचालन को सीमित करता है। [fill command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md) और [CI/CD integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md) देखें।

</Question>

<Question title="लापता अनुवाद कैसे खोजें?">

`npx intlayer test` चलाएं। यदि किसी घोषित लोकेल में सामग्री गायब है तो यह आदेश विफल हो जाता है, जिससे यह सुनिश्चित होता है कि कोई भी अप्रकाशित स्ट्रिंग उत्पादन तक न पहुंचे। VS Code एक्सटेंशन सीधे संपादक में इन त्रुटियों को चिह्नित करता है, और ESLint प्लगइन बिना रैप किए गए स्ट्रिंग्स को फ़्लैग करता है। [सामग्री परीक्षण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md) देखें।

</Question>

<Question title="क्या मुझे URL में लोकेल शामिल करना अनिवार्य है?">

नहीं। `routing.mode` मान `"prefix-no-default"` (डिफ़ॉल्ट: `/about` और `/hi/about`), `"prefix-all"`, `"no-prefix"`, और `"search-params"` स्वीकार करता है, और `routing.domains` लोकेल को अपने डोमेन पर मैप करता है। चुनी गई योजना के बावजूद, `getMultilingualUrls` मेटाडेटा और साइटमैप के लिए वैकल्पिक `hreflang` लिंक उत्पन्न करता है। [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

</Question>

<Question title="अनुवादक और सामग्री संपादक कोड को छुए बिना कैसे काम कर सकते हैं?">

विज़ुअल एडिटर आपके अपने बुनियादी ढांचे पर चलता है और किसी को भी इसे संपादित करने के लिए चल रही साइट पर टेक्स्ट पर क्लिक करने की अनुमति देता है, परिवर्तनों को वापस कोडबेस में सहेजता है। CMS सामग्री को अलग करता है ताकि इसे बिना रीडिप्लॉय के अपडेट किया जा सके। [विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) और [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) देखें।

</Question>

<Question title="क्या Intlayer मुफ्त और ओपन सोर्स है?">

हाँ। Intlayer Apache 2.0 लाइसेंस के तहत ओपन सोर्स है; लाइब्रेरी, CLI, कंपाइलर और विज़ुअल एडिटर व्यावसायिक उपयोग के लिए पूरी तरह से मुफ़्त हैं। क्लाउड CMS एक वैकल्पिक सशुल्क सेवा है जिसे [स्वयं होस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) भी किया जा सकता है।

</Question>

</FAQ>
