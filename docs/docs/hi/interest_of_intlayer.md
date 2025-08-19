---
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Intlayer का महत्व
description: अपने प्रोजेक्ट्स में Intlayer का उपयोग करने के लाभ और फायदे जानें। समझें कि Intlayer अन्य फ्रेमवर्क्स में क्यों अलग और बेहतर है।
keywords:
  - लाभ
  - फायदे
  - Intlayer
  - फ्रेमवर्क
  - तुलना
slugs:
  - doc
  - why
---

# आपको Intlayer पर क्यों विचार करना चाहिए?

## Intlayer क्या है?

**Intlayer** एक अंतरराष्ट्रीयकरण लाइब्रेरी है जो विशेष रूप से जावास्क्रिप्ट डेवलपर्स के लिए डिज़ाइन की गई है। यह आपके कोड में कहीं भी आपकी सामग्री की घोषणा करने की अनुमति देता है। यह बहुभाषी सामग्री की घोषणाओं को संरचित शब्दकोशों में परिवर्तित करता है ताकि इसे आपके कोड में आसानी से एकीकृत किया जा सके। TypeScript का उपयोग करते हुए, **Intlayer** आपके विकास को मजबूत और अधिक कुशल बनाता है।

## Intlayer क्यों बनाया गया था?

Intlayer को एक सामान्य समस्या को हल करने के लिए बनाया गया था जो सभी सामान्य i18n लाइब्रेरीज़ जैसे `next-intl`, `react-i18next`, `react-intl`, `next-i18next`, `react-intl`, `vue-i18n` में पाई जाती है।

ये सभी समाधान आपकी सामग्री को सूचीबद्ध और प्रबंधित करने के लिए एक केंद्रीकृत तरीका अपनाते हैं। उदाहरण के लिए:

```bash
.
├── locales
│   └── en.json
│   └── fr.json
│   └── es.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            ├── index.content.ts
            └── index.tsx
```

या यहाँ namespaces का उपयोग करते हुए:

```bash
.
├── locales
│   ├── en
│   │  └── navbar.json
│   │  └── footer.json
│   ├── fr
│   │  └── navbar.json
│   │  └── footer.json
│   └── es
│      └── navbar.json
│      └── footer.json
├── i18n.ts
└── src
    └── components
        └── MyComponent
            ├── index.content.ts
            └── index.tsx
```

इस प्रकार की वास्तुकला विकास प्रक्रिया को धीमा कर देती है और कई कारणों से कोडबेस को बनाए रखना अधिक जटिल बना देती है:

- किसी भी नए घटक (component) के लिए आपको करना होगा
  - `locales` फ़ोल्डर में नया संसाधन / namespace बनाना
  - अपने पृष्ठ में नए namespace को आयात करने के बारे में सोचना
  - अपनी सामग्री का अनुवाद करना (अक्सर AI प्रदाता से कॉपी/पेस्ट करके मैन्युअल रूप से किया जाता है)
- अपने घटकों में किए गए किसी भी परिवर्तन के लिए, आपको करना होगा
  - संबंधित संसाधन / namespace खोजें (जो घटक से दूर होता है)
  - अपनी सामग्री का अनुवाद करें
  - सुनिश्चित करें कि आपकी सामग्री किसी भी locale के लिए अद्यतित है
  - आपका namespace अप्रयुक्त कुंजी/मान शामिल न करे
  - आपकी JSON फ़ाइल की संरचना सभी locales के लिए समान हो

पेशेवर परियोजनाओं में, इस समाधान का उपयोग करते हुए, अक्सर आपकी सामग्री के अनुवाद को प्रबंधित करने में मदद के लिए स्थानीयकरण प्लेटफ़ॉर्म का उपयोग किया जाता है। लेकिन बड़े परियोजनाओं के लिए यह जल्दी महंगा हो सकता है।

इस समस्या को हल करने के लिए, Intlayer एक ऐसा दृष्टिकोण अपनाता है जिसमें आपकी सामग्री को प्रति-घटक (per-component) स्कोप करने पर विचार किया जाता है, और आपकी सामग्री को आपके घटक के करीब रखा जाता है, जैसा कि हम अक्सर CSS (`styled-components`), दस्तावेज़ (`storybook`), या यूनिट परीक्षण (`jest`) के साथ करते हैं।

```bash codeFormat="typescript"
.
└── components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="./components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react.intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

यह तरीका अनुमति देता है:

- विकास की गति बढ़ाने के लिए
  - `.content` फाइलें VSCode एक्सटेंशन का उपयोग करके बनाई जा सकती हैं
  - आपके IDE में ऑटोकंप्लीशन AI टूल्स (जैसे GitHub Copilot) आपकी सामग्री घोषित करने में मदद कर सकते हैं, जिससे कॉपी/पेस्ट कम हो जाता है
- आपके कोडबेस की जटिलता को कम करने के लिए
- अपने कोडबेस की रखरखाव क्षमता बढ़ाएं
- अपने कॉम्पोनेंट्स और उनके संबंधित कंटेंट को अधिक आसानी से डुप्लिकेट करें (उदाहरण: लॉगिन / रजिस्टर कॉम्पोनेंट्स, आदि)
  - अन्य कॉम्पोनेंट्स के कंटेंट को प्रभावित करने के जोखिम को सीमित करके
  - बिना बाहरी निर्भरताओं के एक एप्लिकेशन से दूसरे में अपने कंटेंट को कॉपी/पेस्ट करके
- अप्रयुक्त कॉम्पोनेंट्स के लिए अप्रयुक्त कुंजियों/मूल्यों के साथ अपने कोडबेस को प्रदूषित होने से बचाएं
  - यदि आप किसी कॉम्पोनेंट का उपयोग नहीं करते हैं, तो आपको उसके कंटेंट को इम्पोर्ट करने की आवश्यकता नहीं है
  - यदि आप किसी कॉम्पोनेंट को हटा देते हैं, तो उसके संबंधित कंटेंट को हटाने के बारे में अधिक आसानी से सोचेंगे क्योंकि वह उसी फ़ोल्डर में मौजूद होगा
- अपने बहुभाषी कंटेंट को घोषित करने के लिए IA एजेंट्स की तर्क लागत कम करें
  - AI एजेंट को यह जानने के लिए आपके पूरे कोडबेस को सूचीबद्ध करने की आवश्यकता नहीं होगी कि आपका कंटेंट कहाँ लागू करना है
  - अनुवाद आसानी से आपके IDE में ऑटोकम्प्लीशन AI टूल्स द्वारा किया जा सकता है (जैसे GitHub Copilot)
- लोडिंग प्रदर्शन को अनुकूलित करें
  - यदि कोई कॉम्पोनेंट लेज़ी लोड होता है, तो उसका संबंधित कंटेंट भी उसी समय लोड होगा

## Intlayer की अतिरिक्त विशेषताएँ

| विशेषता                                                                                                                   | विवरण                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ------------------------------------------------------------------------------------------------------------------------- | **क्रॉस-फ्रेमवर्क समर्थन**<br><br>Intlayer सभी प्रमुख फ्रेमवर्क और लाइब्रेरी के साथ संगत है, जिनमें Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, और अन्य शामिल हैं।                                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true)       | **जावास्क्रिप्ट-समर्थित सामग्री प्रबंधन**<br><br>अपने कंटेंट को प्रभावी ढंग से परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का उपयोग करें। <br><br> - [सामग्री घोषणा](https://intlayer.org/doc/concept/content)                                                                                                                                                                                |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true) | **प्रति-स्थान सामग्री घोषणा फ़ाइल**<br><br>स्वचालित जनरेशन से पहले अपनी सामग्री को एक बार घोषित करके अपने विकास को तेज़ करें।<br><br> - [प्रति-स्थान सामग्री घोषणा फ़ाइल](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)                      | **टाइप-सेफ वातावरण**<br><br>TypeScript का उपयोग करें ताकि आपकी सामग्री परिभाषाएँ और कोड त्रुटि-मुक्त हों, साथ ही IDE ऑटोकंप्लीशन का लाभ भी प्राप्त करें।<br><br> - [TypeScript कॉन्फ़िगरेशन](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                      |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true)                         | **सरल सेटअप**<br><br>कम से कम कॉन्फ़िगरेशन के साथ जल्दी से शुरू करें। अंतरराष्ट्रीयकरण, रूटिंग, AI, बिल्ड, और कंटेंट हैंडलिंग के लिए सेटिंग्स को आसानी से समायोजित करें। <br><br> - [Next.js एकीकरण का अन्वेषण करें](https://intlayer.org/doc/environment/nextjs)                                                                                                                                           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true)                   | **सरल सामग्री पुनःप्राप्ति**<br><br>प्रत्येक सामग्री के लिए अपनी `t` फ़ंक्शन को कॉल करने की आवश्यकता नहीं है। अपनी सभी सामग्री को सीधे एक ही हुक का उपयोग करके पुनःप्राप्त करें।<br><br> - [React एकीकरण](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                            |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true)                    | **सुसंगत सर्वर कंपोनेंट कार्यान्वयन**<br><br>Next.js सर्वर कंपोनेंट्स के लिए पूरी तरह उपयुक्त, क्लाइंट और सर्वर दोनों कंपोनेंट्स के लिए एक ही कार्यान्वयन का उपयोग करें, प्रत्येक सर्वर कंपोनेंट में अपनी `t` फ़ंक्शन पास करने की आवश्यकता नहीं है। <br><br> - [सर्वर कंपोनेंट्स](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true)                           | **संगठित कोडबेस**<br><br>अपने कोडबेस को अधिक संगठित रखें: 1 कंपोनेंट = उसी फ़ोल्डर में 1 शब्दकोश। अनुवाद उनके संबंधित कंपोनेंट के करीब, रखरखाव और स्पष्टता को बढ़ाते हैं। <br><br> - [Intlayer कैसे काम करता है](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                                       |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true)                         | **सुधारित रूटिंग**<br><br>ऐप रूटिंग का पूर्ण समर्थन, जटिल एप्लिकेशन संरचनाओं के लिए सहजता से अनुकूलित, Next.js, React, Vite, Vue.js आदि के लिए।<br><br> - [Next.js एकीकरण का अन्वेषण करें](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                     |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true)                            | **मार्कडाउन समर्थन**<br><br>लोकल फाइलों और रिमोट मार्कडाउन को आयात और व्याख्या करें, बहुभाषी सामग्री जैसे गोपनीयता नीतियाँ, दस्तावेज़ आदि के लिए। मार्कडाउन मेटाडेटा को व्याख्यायित करें और इसे अपने कोड में सुलभ बनाएं।<br><br> - [सामग्री फाइलें](https://intlayer.org/doc/concept/content/file)                                                                                                          |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true)                       | **मुफ़्त विज़ुअल एडिटर और CMS**<br><br>सामग्री लेखकों के लिए एक मुफ्त विज़ुअल एडिटर और CMS उपलब्ध है, जो स्थानीयकरण प्लेटफ़ॉर्म की आवश्यकता को समाप्त करता है। Git का उपयोग करके अपनी सामग्री को सिंक्रनाइज़ रखें, या CMS के साथ इसे पूरी तरह या आंशिक रूप से बाहरी बनाएं।<br><br> - [Intlayer संपादक](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true)                              | **ट्री-शेकेबल कंटेंट**<br><br>ट्री-शेकेबल कंटेंट, जो अंतिम बंडल के आकार को कम करता है। प्रत्येक कंपोनेंट के लिए कंटेंट लोड करता है, आपके बंडल से किसी भी अप्रयुक्त कंटेंट को बाहर रखता है। ऐप लोडिंग दक्षता बढ़ाने के लिए लेज़ी लोडिंग का समर्थन करता है। <br><br> - [ऐप बिल्ड ऑप्टिमाइज़ेशन](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                   |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true)                    | **स्थैतिक रेंडरिंग**<br><br>स्थैतिक रेंडरिंग को अवरुद्ध नहीं करता। <br><br> - [Next.js एकीकरण](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true)                      | **एआई-संचालित अनुवाद**<br><br>अपने वेबसाइट को केवल एक क्लिक में 231 भाषाओं में बदलें, Intlayer के उन्नत एआई-संचालित अनुवाद उपकरणों का उपयोग करके अपने स्वयं के एआई प्रदाता / एपीआई कुंजी के साथ। <br><br> - [CI/CD एकीकरण](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [स्वचालित भराई](https://intlayer.org/doc/concept/auto-fill)           |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true)                                 | **एमसीपी सर्वर एकीकरण**<br><br>IDE स्वचालन के लिए एक MCP (मॉडल संदर्भ प्रोटोकॉल) सर्वर प्रदान करता है, जो आपके विकास वातावरण के भीतर सीधे सहज सामग्री प्रबंधन और i18n वर्कफ़्लोज़ को सक्षम बनाता है। <br><br> - [एमसीपी सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)                                                                                                 |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true)                    | **VSCode एक्सटेंशन**<br><br>Intlayer एक VSCode एक्सटेंशन प्रदान करता है जो आपकी सामग्री और अनुवादों का प्रबंधन करने में मदद करता है, आपकी शब्दकोश बनाना, आपकी सामग्री का अनुवाद करना, और भी बहुत कुछ। <br><br> - [VSCode एक्सटेंशन](https://intlayer.org/doc/vs-code-extension)                                                                                                                             |
| ![Feature](https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true)                    | **इंटरऑपरेबिलिटी**<br><br>react-i18next, next-i18next, next-intl, और react-intl के साथ इंटरऑपरेबिलिटी की अनुमति देता है। <br><br> - [Intlayer और react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer और next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer और next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                  |

## Intlayer की अन्य समाधानों के साथ तुलना

| फीचर                                            | Intlayer                                                                                                                                                      | React-i18next / i18next                                                         | React-Intl (FormatJS)                                    | LinguiJS                                                 | next-intl                                                | next-i18next                                             | vue-i18n                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| Translations Near Components                    | हाँ, प्रत्येक घटक के साथ सामग्री सह-स्थित                                                                                                                     | नहीं                                                                            | नहीं                                                     | नहीं                                                     | नहीं                                                     | नहीं                                                     | हाँ - `सिंगल फाइल कंपोनेंट्स` (SFCs) का उपयोग करते हुए                     |
| TypeScript एकीकरण                               | उन्नत, स्वचालित रूप से उत्पन्न सख्त प्रकार                                                                                                                    | बुनियादी; सुरक्षा के लिए अतिरिक्त कॉन्फ़िगरेशन                                  | अच्छा, लेकिन कम सख्त                                     | टाइपिंग्स, कॉन्फ़िगरेशन की आवश्यकता                      | अच्छा                                                    | बुनियादी                                                 | अच्छा (प्रकार उपलब्ध; कुंजी-सुरक्षा के लिए सेटअप आवश्यक)                   |
| अनुवाद की कमी का पता लगाना                      | निर्माण-समय त्रुटि/चेतावनी                                                                                                                                    | अधिकांशतः रनटाइम पर फॉलबैक स्ट्रिंग्स                                           | फॉलबैक स्ट्रिंग्स                                        | अतिरिक्त कॉन्फ़िगरेशन की आवश्यकता                        | रनटाइम फॉलबैक                                            | रनटाइम फॉलबैक                                            | रनटाइम फॉलबैक/चेतावनियाँ (कॉन्फ़िगर करने योग्य)                            |
| समृद्ध सामग्री (JSX/Markdown/कंपोनेंट्स)        | सीधे समर्थन, यहाँ तक कि React नोड्स भी                                                                                                                        | सीमित / केवल इंटरपोलेशन                                                         | ICU सिंटैक्स, वास्तविक JSX नहीं                          | सीमित                                                    | समृद्ध नोड्स के लिए डिज़ाइन नहीं किया गया                | सीमित                                                    | सीमित (कंपोनेंट्स `<i18n-t>` के माध्यम से, Markdown प्लगइन्स के माध्यम से) |
| एआई-संचालित अनुवाद                              | हाँ, कई एआई प्रदाताओं का समर्थन करता है। अपने स्वयं के API कुंजी का उपयोग करके उपयोग किया जा सकता है। अपने एप्लिकेशन के संदर्भ, सामग्री की सीमा पर विचार करें | नहीं                                                                            | नहीं                                                     | नहीं                                                     | नहीं                                                     | नहीं                                                     | नहीं                                                                       |
| विज़ुअल एडिटर                                   | हाँ, स्थानीय विज़ुअल एडिटर + वैकल्पिक CMS; कोडबेस सामग्री को बाहरी रूप से प्रबंधित कर सकता है; एम्बेड करने योग्य                                              | नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध                        | नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध | नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध | नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध | नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध | नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध                   |
| स्थानीयकृत रूटिंग                               | अंतर्निर्मित, मिडलवेयर समर्थन                                                                                                                                 | प्लगइन्स या मैनुअल कॉन्फ़िगरेशन                                                 | अंतर्निर्मित नहीं                                        | प्लगइन/मैनुअल कॉन्फ़िगरेशन                               | अंतर्निर्मित                                             | अंतर्निर्मित                                             | मैनुअल विया Vue राउटर (Nuxt i18n इसे संभालता है)                           |
| डायनामिक रूट जनरेशन                             | हाँ                                                                                                                                                           | प्लगइन/इकोसिस्टम या मैनुअल सेटअप                                                | प्रदान नहीं किया गया                                     | प्लगइन/मैनुअल                                            | हाँ                                                      | हाँ                                                      | प्रदान नहीं किया गया (Nuxt i18n प्रदान करता है)                            |
| **बहुवचन**                                      | सूची-आधारित पैटर्न; दस्तावेज़ देखें                                                                                                                           | कॉन्फ़िगर करने योग्य (i18next-icu जैसे प्लगइन्स)                                | उन्नत (ICU)                                              | उन्नत (ICU/messageformat)                                | अच्छा                                                    | अच्छा                                                    | उन्नत (बिल्ट-इन बहुवचन नियम)                                               |
| **फ़ॉर्मेटिंग (तिथियाँ, संख्याएँ, मुद्राएँ)**   | अनुकूलित फ़ॉर्मेटर्स (अंदर से Intl)                                                                                                                           | प्लगइन्स या कस्टम Intl उपयोग के माध्यम से                                       | उन्नत ICU फ़ॉर्मेटर्स                                    | ICU/CLI सहायक                                            | अच्छा (Intl सहायक)                                       | अच्छा (Intl सहायक)                                       | अंतर्निर्मित तिथि/संख्या फ़ॉर्मेटर्स (Intl)                                |
| सामग्री प्रारूप                                 | .tsx, .ts, .js, .json, .md, .txt                                                                                                                              | .json                                                                           | .json, .js                                               | .po, .json                                               | .json, .js, .ts                                          | .json                                                    | .json, .js                                                                 |
| ICU समर्थन                                      | WIP (मूलभूत ICU)                                                                                                                                              | प्लगइन के माध्यम से (i18next-icu)                                               | हाँ                                                      | हाँ                                                      | हाँ                                                      | प्लगइन के माध्यम से (i18next-icu)                        | कस्टम फॉर्मेटर/कंपाइलर के माध्यम से                                        |
| SEO सहायक (hreflang, साइटमैप)                   | अंतर्निर्मित उपकरण: साइटमैप, **robots.txt**, मेटाडेटा के लिए सहायक                                                                                            | समुदाय प्लगइन्स/मैनुअल                                                          | मुख्य नहीं                                               | मुख्य नहीं                                               | अच्छा                                                    | अच्छा                                                    | मुख्य नहीं (Nuxt i18n सहायक प्रदान करता है)                                |
| इकोसिस्टम / समुदाय                              | छोटा लेकिन तेजी से बढ़ रहा और प्रतिक्रियाशील                                                                                                                  | सबसे बड़ा और सबसे परिपक्व                                                       | बड़ा, उद्यम स्तर                                         | बढ़ रहा है, छोटा                                         | मध्यम आकार, Next.js-केंद्रित                             | मध्यम आकार, Next.js-केंद्रित                             | Vue इकोसिस्टम में बड़ा                                                     |
| सर्वर-साइड रेंडरिंग और सर्वर कंपोनेंट्स         | हाँ, SSR / React सर्वर कंपोनेंट्स के लिए सुव्यवस्थित                                                                                                          | समर्थित, कुछ कॉन्फ़िगरेशन आवश्यक                                                | Next.js में समर्थित                                      | समर्थित                                                  | पूर्ण समर्थन                                             | पूर्ण समर्थन                                             | Nuxt/Vue SSR के माध्यम से SSR (कोई RSC नहीं)                               |
| ट्री-शेकिंग (केवल उपयोग की गई सामग्री लोड करें) | हाँ, प्रति-कंपोनेंट बिल्ड समय पर Babel/SWC प्लगइन्स के माध्यम से                                                                                              | आमतौर पर सभी लोड करता है (नेमस्पेस/कोड-स्प्लिटिंग के साथ सुधार किया जा सकता है) | आमतौर पर सभी लोड करता है                                 | डिफ़ॉल्ट नहीं                                            | आंशिक                                                    | आंशिक                                                    | आंशिक (कोड-स्प्लिटिंग/मैनुअल सेटअप के साथ)                                 |
| लेज़ी लोडिंग                                    | हाँ, प्रति-भाषा/प्रति-कंपोनेंट                                                                                                                                | हाँ (जैसे, मांग पर बैकएंड/नेमस्पेस)                                             | हाँ (भाषा बंडलों को विभाजित करना)                        | हाँ (डायनामिक कैटलॉग इम्पोर्ट्स)                         | हाँ (प्रति-रूट/प्रति-भाषा)                               | हाँ (प्रति-रूट/प्रति-भाषा)                               | हाँ (असिंक्रोनस भाषा संदेश)                                                |
| बड़े प्रोजेक्ट्स का प्रबंधन                     | मॉड्यूलर को प्रोत्साहित करता है, डिज़ाइन-सिस्टम के लिए उपयुक्त                                                                                                | अच्छी फ़ाइल अनुशासन की आवश्यकता होती है                                         | केंद्रीय कैटलॉग बड़े हो सकते हैं                         | जटिल हो सकता है                                          | सेटअप के साथ मॉड्यूलर                                    | सेटअप के साथ मॉड्यूलर                                    | Vue Router/Nuxt i18n सेटअप के साथ मॉड्यूलर                                 |

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                    |
| ------- | ---------- | --------------------------- |
| 5.8.0   | 2025-08-19 | तुलनात्मक तालिका अपडेट करें |
| 5.5.10  | 2025-06-29 | इतिहास प्रारंभ करें         |
