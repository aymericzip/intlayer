<p align="center">
  <a href="https://intlayer.org">
    <img src="https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/cover.png" width="60%" alt="Intlayer लोगो" />
  </a>
</p>

<h1 align="center">
  <strong> Intlayer : एक ओपन-सोर्स, लचीला i18n टूलकिट AI-संचालित अनुवाद और CMS के साथ।</strong>
</h1>

<br />

<p align="center">
  <a href="https://intlayer.org/doc/concept/content">डॉक्स</a> •
  <a href="https://intlayer.org/doc/environment/nextjs">Next.js</a> •
  <a href="https://intlayer.org/doc/environment/vite-and-react">React + Vite</a> •
  <a href="https://intlayer.org/doc/concept/cms">CMS</a> •
  <a href="https://discord.gg/7uxamYVeCk">Discord</a>
</p>
<p align="center" style="margin-top:15px;">
  <a href="https://www.npmjs.com/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/v/intlayer?style=for-the-badge&labelColor=FFFFFF&color=000000&logoColor=FFFFFF" alt="npm संस्करण" height="24"/>
  </a>
    <a href="https://github.com/aymericzip/intlayer/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logo=github&logoColor=FFD700" alt="GitHub सितारे" height="24"/>
  </a>
  <a href="https://www.npmjs.org/package/intlayer" target="_blank"><img src="https://img.shields.io/npm/dm/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="मासिक डाउनलोड" height="24"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/blob/main/LICENSE"><img src="https://img.shields.io/github/license/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="लाइसेंस"/>
  </a>
  <a href="https://github.com/aymericzip/intlayer/commits/main"><img src="https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge&labelColor=000000&color=FFFFFF&logoColor=000000" alt="अंतिम कमिट"/>
  </a>
</p>

![वीडियो देखें](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo_video.gif)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/शुरू_करें-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## Intlayer क्या है?

अधिकांश i18n लाइब्रेरी या तो बहुत जटिल होती हैं, बहुत कठोर होती हैं, या आधुनिक फ्रेमवर्क के लिए नहीं बनाई गई हैं।

Intlayer एक **आधुनिक i18n समाधान** है वेब और मोबाइल ऐप्स के लिए।  
यह फ्रेमवर्क-स्वतंत्र है, **AI-संचालित** है, और एक मुफ्त **CMS और विज़ुअल एडिटर** शामिल करता है।

**प्रति-स्थानीय सामग्री फ़ाइलों**, **TypeScript ऑटोकम्प्लीशन**, **ट्री-शेकेबल शब्दकोशों**, और **CI/CD एकीकरण** के साथ, Intlayer अंतरराष्ट्रीयकरण को **तेज़, साफ़ और स्मार्ट** बनाता है।

## Intlayer के मुख्य लाभ:

| विशेषता                                                                                                                                             | विवरण                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/frameworks.png?raw=true" alt="Feature" width="700">                          | **क्रॉस-फ्रेमवर्क समर्थन**<br><br>Intlayer सभी प्रमुख फ्रेमवर्क और लाइब्रेरी के साथ संगत है, जिनमें Next.js, React, Vite, Vue.js, Nuxt, Preact, Express, और अन्य शामिल हैं।                                                                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/javascript_content_management.png?raw=true" alt="Feature" width="700">       | **जावास्क्रिप्ट-संचालित सामग्री प्रबंधन**<br><br>अपने कंटेंट को प्रभावी ढंग से परिभाषित और प्रबंधित करने के लिए जावास्क्रिप्ट की लचीलापन का उपयोग करें। <br><br> - [सामग्री घोषणा](https://intlayer.org/doc/concept/content)                                                                                                                                                                                   |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/per_locale_content_declaration_file.png?raw=true" alt="Feature" width="700"> | **प्रति-स्थान सामग्री घोषणा फ़ाइल**<br><br>स्वचालित जनरेशन से पहले अपनी सामग्री को एक बार घोषित करके अपने विकास को तेज़ करें।<br><br> - [प्रति-स्थान सामग्री घोषणा फ़ाइल](https://intlayer.org/doc/concept/per-locale-file)                                                                                                                                                                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true" alt="Feature" width="700">                      | **टाइप-सेफ वातावरण**<br><br>TypeScript का उपयोग करें ताकि आपकी सामग्री परिभाषाएँ और कोड त्रुटि-मुक्त हों, साथ ही IDE ऑटोकम्प्लीशन का लाभ भी प्राप्त करें।<br><br> - [TypeScript कॉन्फ़िगरेशन](https://intlayer.org/doc/environment/vite-and-react#configure-typescript)                                                                                                                                        |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/config_file.png?raw=true" alt="Feature" width="700">                         | **सरल सेटअप**<br><br>न्यूनतम कॉन्फ़िगरेशन के साथ जल्दी से शुरू करें। अंतरराष्ट्रीयकरण, रूटिंग, AI, बिल्ड, और सामग्री प्रबंधन के लिए सेटिंग्स को आसानी से समायोजित करें। <br><br> - [Next.js एकीकरण का अन्वेषण करें](https://intlayer.org/doc/environment/nextjs)                                                                                                                                               |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/content_retrieval.png?raw=true" alt="Feature" width="700">                   | **सरल सामग्री पुनःप्राप्ति**<br><br>प्रत्येक सामग्री के लिए अपनी `t` फ़ंक्शन को कॉल करने की आवश्यकता नहीं है। एक ही हुक का उपयोग करके अपनी सभी सामग्री सीधे पुनःप्राप्त करें।<br><br> - [React एकीकरण](https://intlayer.org/doc/environment/create-react-app)                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/server_component.png?raw=true" alt="Feature" width="700">                    | **सुसंगत सर्वर कंपोनेंट कार्यान्वयन**<br><br>Next.js सर्वर कंपोनेंट्स के लिए पूरी तरह उपयुक्त, क्लाइंट और सर्वर दोनों कंपोनेंट्स के लिए एक ही कार्यान्वयन का उपयोग करें, प्रत्येक सर्वर कंपोनेंट के बीच अपनी `t` फ़ंक्शन पास करने की आवश्यकता नहीं है। <br><br> - [सर्वर कंपोनेंट्स](https://intlayer.org/doc/environment/nextjs#step-7-utilize-content-in-your-code)                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/file_tree.png?raw=true" alt="Feature" width="700">                           | **संगठित कोडबेस**<br><br>अपने कोडबेस को अधिक संगठित रखें: 1 कंपोनेंट = उसी फ़ोल्डर में 1 शब्दकोश। अनुवाद उनके संबंधित कंपोनेंट्स के करीब, जिससे रखरखाव और स्पष्टता में सुधार होता है। <br><br> - [Intlayer कैसे काम करता है](https://intlayer.org/doc/concept/how-works-intlayer)                                                                                                                              |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/url_routing.png?raw=true" alt="Feature" width="700">                         | **सशक्त रूटिंग**<br><br>ऐप रूटिंग का पूर्ण समर्थन, जटिल एप्लिकेशन संरचनाओं के साथ सहजता से अनुकूलित, Next.js, React, Vite, Vue.js आदि के लिए।<br><br> - [Next.js एकीकरण का अन्वेषण करें](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                          |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/markdown.png?raw=true" alt="Feature" width="700">                            | **मार्कडाउन समर्थन**<br><br>बहुभाषी सामग्री जैसे गोपनीयता नीतियाँ, दस्तावेज़ आदि के लिए स्थानीय फ़ाइलों और रिमोट मार्कडाउन को आयात और व्याख्या करें। मार्कडाउन मेटाडेटा को व्याख्यायित करें और इसे अपने कोड में सुलभ बनाएं।<br><br> - [सामग्री फ़ाइलें](https://intlayer.org/doc/concept/content/file)                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.png?raw=true" alt="Feature" width="700">                       | **मुफ्त विज़ुअल एडिटर और CMS**<br><br>सामग्री लेखकों के लिए एक मुफ्त विज़ुअल एडिटर और CMS उपलब्ध है, जिससे स्थानीयकरण प्लेटफ़ॉर्म की आवश्यकता समाप्त हो जाती है। Git का उपयोग करके अपनी सामग्री को सिंक्रनाइज़ रखें, या CMS के साथ इसे पूरी तरह या आंशिक रूप से बाहरीकृत करें।<br><br> - [Intlayer एडिटर](https://intlayer.org/doc/concept/editor) <br> - [Intlayer CMS](https://intlayer.org/doc/concept/cms) |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true" alt="Feature" width="700">                              | **ट्री-शेकेबल कंटेंट**<br><br>ट्री-शेकेबल कंटेंट, जो अंतिम बंडल के आकार को कम करता है। प्रत्येक कॉम्पोनेंट के लिए कंटेंट लोड करता है, आपके बंडल से किसी भी अप्रयुक्त कंटेंट को बाहर रखता है। ऐप लोडिंग दक्षता बढ़ाने के लिए लेज़ी लोडिंग का समर्थन करता है। <br><br> - [ऐप बिल्ड ऑप्टिमाइज़ेशन](https://intlayer.org/doc/concept/how-works-intlayer#app-build-optimization)                                    |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/static_rendering.png?raw=true" alt="Feature" width="700">                    | **स्टैटिक रेंडरिंग**<br><br>स्टैटिक रेंडरिंग को ब्लॉक नहीं करता। <br><br> - [Next.js इंटीग्रेशन](https://intlayer.org/doc/environment/nextjs)                                                                                                                                                                                                                                                                  |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/AI_translation.png?raw=true" alt="Feature" width="700">                      | **एआई-संचालित अनुवाद**<br><br>अपने वेबसाइट को केवल एक क्लिक में 231 भाषाओं में बदलें, Intlayer के उन्नत एआई-संचालित अनुवाद उपकरणों का उपयोग करके अपने स्वयं के एआई प्रदाता / एपीआई कुंजी के साथ। <br><br> - [CI/CD इंटीग्रेशन](https://intlayer.org/doc/concept/ci-cd) <br> - [Intlayer CLI](https://intlayer.org/doc/concept/cli) <br> - [ऑटो फिल](https://intlayer.org/doc/concept/auto-fill)                |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/mcp.png?raw=true" alt="Feature" width="700">                                 | **एमसीपी सर्वर इंटीग्रेशन**<br><br>IDE ऑटोमेशन के लिए एक MCP (मॉडल संदर्भ प्रोटोकॉल) सर्वर प्रदान करता है, जो आपके विकास वातावरण के भीतर सीधे सहज सामग्री प्रबंधन और i18n वर्कफ़्लो सक्षम करता है। <br><br> - [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)                                                                                                         |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/vscode_extension.png?raw=true" alt="Feature" width="700">                    | **VSCode एक्सटेंशन**<br><br>Intlayer एक VSCode एक्सटेंशन प्रदान करता है जो आपकी सामग्री और अनुवादों का प्रबंधन करने में मदद करता है, आपके शब्दकोश बनाने, आपकी सामग्री का अनुवाद करने, और भी बहुत कुछ। <br><br> - [VSCode एक्सटेंशन](https://intlayer.org/doc/hi/vs-code-extension)                                                                                                                             |
| <img src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/interoperability.png?raw=true" alt="Feature" width="700">                    | **इंटरऑपरेबिलिटी**<br><br>react-i18next, next-i18next, next-intl, और react-intl के साथ इंटरऑपरेबिलिटी की अनुमति दें। <br><br> - [Intlayer और react-intl](https://intlayer.org/blog/intlayer-with-react-intl) <br> - [Intlayer और next-intl](https://intlayer.org/blog/intlayer-with-next-intl) <br> - [Intlayer और next-i18next](https://intlayer.org/blog/intlayer-with-next-i18next)                         |

---

## 📦 स्थापना

आज ही Intlayer के साथ अपनी यात्रा शुरू करें और अंतरराष्ट्रीयकरण के लिए एक अधिक सहज, अधिक शक्तिशाली दृष्टिकोण का अनुभव करें।

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

```bash
npm install intlayer react-intlayer
```

⚡ त्वरित प्रारंभ (Next.js)

```ts
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx
// app/page.tsx
import { useIntlayer } from "react-intlayer";

const Component = () => {
  const { title } = useIntlayer("home");

  return <h1>{title}</h1>;
};
```

<a href="https://intlayer.org/doc/environment/nextjs"> पूरा मार्गदर्शिका प्राप्त करें → </a>

## 🎥 YouTube पर लाइव ट्यूटोरियल

[![Intlayer का उपयोग करके अपने एप्लिकेशन को अंतरराष्ट्रीयकृत कैसे करें](https://i.ytimg.com/vi/e_PPG7PTqGU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtyJ4uYotEjl12nZ_gZKZ_kjEgOQ)](https://youtu.be/e_PPG7PTqGU?si=GyU_KpVhr61razRw)

<a href="https://intlayer.org/doc/concept/content">
  <img src="https://img.shields.io/badge/Get_Started-FFFFFF?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

## विषय सूची

Intlayer के साथ शुरुआत करने और इसे अपने प्रोजेक्ट्स में एकीकृत करने के लिए हमारी व्यापक दस्तावेज़ीकरण का अन्वेषण करें।

<details open>
<summary style="font-size:16px; font-weight:bold;">📘 शुरुआत करें</summary>
<ul>
  <li><a href="https://intlayer.org/doc/why">Intlayer क्यों?</a></li>
  <li><a href="https://intlayer.org/doc">परिचय</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">⚙️ अवधारणा</summary>
<ul>
  <li><a href="https://intlayer.org/doc/concept/how-works-intlayer">Intlayer कैसे काम करता है</a></li>
  <li><a href="https://intlayer.org/doc/concept/configuration">कॉन्फ़िगरेशन</a></li>
  <li><a href="https://intlayer.org/doc/concept/ai">एआई प्रदाता</a></li>
  <li><a href="https://intlayer.org/doc/concept/cli">Intlayer CLI</a></li>
  <li><a href="https://intlayer.org/doc/concept/editor">Intlayer संपादक</a></li>
  <li><a href="https://intlayer.org/doc/concept/cms">Intlayer CMS</a></li>
  <li><a href="https://intlayer.org/doc/concept/content">शब्दकोश</a>
    <ul>
      <li><a href="https://intlayer.org/doc/concept/content/per-locale-file">प्रति-स्थान सामग्री घोषणा फ़ाइल</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/translation">अनुवाद</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/enumeration">सूचीकरण</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/condition">शर्त</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/nesting">नेस्टिंग</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/markdown">मार्कडाउन</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/function-fetching">फ़ंक्शन फ़ेचिंग</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/insertion">सम्मिलन</a></li>
      <li><a href="https://intlayer.org/doc/concept/content/file">फ़ाइल</a></li>
    </ul>
  </li>
</ul>
</details>

<details open>
<summary style="font-size:16px; font-weight:bold;">🌐 पर्यावरण</summary>
<ul>
  <li><a href="https://intlayer.org/doc/environment/nextjs">Next.js 15 के साथ Intlayer</a>
    <ul>
      <li><a href="https://intlayer.org/doc/environment/nextjs/14">Next.js 14 (ऐप राउटर)</a></li>
      <li><a href="https://intlayer.org/doc/environment/nextjs/next-with-Page-Router">Next.js पेज राउटर</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/create-react-app">React CRA</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-react">Vite + React</a>
     <ul>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/react-router-v7">React-router-v7</a></li>
      <li><a href="https://intlayer.org/doc/environment/vite-and-react/tanstack-start">टैनस्टैक स्टार्ट</a></li>
    </ul>
  </li>
  <li><a href="https://intlayer.org/doc/environment/react-native-and-expo">रिएक्ट नेटिव</a></li>
  <li><a href="https://intlayer.org/doc/environment/lynx-and-react">लिंक्‍स + रिएक्ट</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-svelte">वाइट + स्वेल्ट</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-preact">वाइट + प्रीऐक्ट</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-vue">वाइट + व्यू</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-nuxt">वाइट + नक्स्ट</a></li>
  <li><a href="https://intlayer.org/doc/environment/vite-and-solid">वाइट + सॉलिड</a></li>
  <li><a href="https://intlayer.org/doc/environment/angular">एंगुलर</a></li>
  <li><a href="https://intlayer.org/doc/environment/express">एक्सप्रेस</a></li>
  <li><a href="https://intlayer.org/doc/environment/nest">नेस्टजेएस</a></li>
</ul>
</details>

<details>
<summary style="font-size:16px; font-weight:bold;">📰 ब्लॉग</summary>
<ul>
  <li><a href="https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/what_is_internationalization.md">i18n क्या है</a></li>
  <li><a href="https://intlayer.org/blog/SEO-and-i18n">i18n और SEO</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-i18next">इंटलेयर और i18next</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-react-i18next">इंटलेयर और react-intl</a></li>
  <li><a href="https://intlayer.org/blog/intlayer-with-next-intl">इंटलेयर और next-intl</a></li>
</ul>
</details>

## 🌐 अन्य भाषाओं में रीडमी

[अंग्रेज़ी](https://github.com/aymericzip/intlayer/blob/main/readme.md) •
[简体中文](https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md) •
[Русский](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/readme.md) •
[日本語](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ja/readme.md) •
[फ्रेंच](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md) •
[कोरियाई](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ko/readme.md) •
[स्पेनिश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/readme.md) •
[जर्मन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/readme.md) •
[अरबी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/readme.md) •
[इतालवी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/readme.md) •
[अंग्रेज़ी (यूके)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/readme.md) •
[पुर्तगाली](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/readme.md) •
[हिन्दी](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/readme.md)
[तुर्की](https://github.com/aymericzip/intlayer/blob/main/docs/docs/tr/readme.md)

## 🤝 समुदाय

इंटलेयर समुदाय के लिए और समुदाय के साथ बनाया गया है और हमें आपकी प्रतिक्रिया का इंतजार है!

- कोई सुझाव है? [एक इश्यू खोलें](https://github.com/aymericzip/intlayer/issues)
- कोई बग या सुधार मिला? [एक PR सबमिट करें](https://github.com/aymericzip/intlayer/pulls)
- मदद चाहिए या जुड़ना चाहते हैं? [हमारे डिस्कॉर्ड से जुड़ें](https://discord.gg/7uxamYVeCk)

आप हमें निम्नलिखित पर भी फॉलो कर सकते हैं:

  <div>
    <br/>
    <p align="center">
      <a href="https://discord.gg/528mBV4N" target="blank"><img align="center"
         src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"
         alt="Intlayer Discord" height="30"/></a>
      <a href="https://www.linkedin.com/company/intlayerorg" target="blank"><img align="center"
         src="https://img.shields.io/badge/linkedin-%231DA1F2.svg?style=for-the-badge&logo=linkedin&logoColor=white"
         alt="Intlayer LinkedIn" height="30"/></a>
      <a href="https://www.facebook.com/intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/facebook-4267B2.svg?style=for-the-badge&logo=facebook&logoColor=white"
         alt="Intlayer फेसबुक" height="30"/></a>
      <a href="https://www.instagram.com/intlayer/" target="blank"><img align="center"
         src="https://img.shields.io/badge/instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white"
         alt="Intlayer इंस्टाग्राम" height="30"/></a>
      <a href="https://x.com/Intlayer183096" target="blank"><img align="center"
         src="https://img.shields.io/badge/x-1DA1F2.svg?style=for-the-badge&logo=x&logoColor=white"
         alt="Intlayer एक्स" height="30"/></a>
      <a href="https://www.youtube.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/youtube-FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white"
         alt="Intlayer यूट्यूब" height="30"/></a>
      <a href="https://www.tiktok.com/@intlayer" target="blank"><img align="center"
         src="https://img.shields.io/badge/tiktok-000000.svg?style=for-the-badge&logo=tiktok&logoColor=white"
         alt="Intlayer टिकटॉक" height="30"/></a>
      <br>
    </p>
</div>

### योगदान

इस परियोजना में योगदान देने के लिए अधिक विस्तृत दिशानिर्देशों के लिए, कृपया [`CONTRIBUTING.md`](https://github.com/aymericzip/intlayer/blob/main/CONTRIBUTING.md) फ़ाइल देखें। इसमें हमारे विकास प्रक्रिया, कमिट संदेश कन्वेंशन्स, और रिलीज़ प्रक्रियाओं के बारे में आवश्यक जानकारी शामिल है। आपका योगदान हमारे लिए मूल्यवान है, और हम इस परियोजना को बेहतर बनाने में आपके प्रयासों की सराहना करते हैं!

### समर्थन के लिए धन्यवाद

यदि आपको Intlayer पसंद है, तो हमें GitHub पर ⭐ दें। इससे अन्य लोग इस परियोजना को खोज पाते हैं!

[![Star History Chart](https://api.star-history.com/svg?repos=aymericzip/intlayer&type=Date)](https://star-history.com/#aymericzip/intlayer&Date)
