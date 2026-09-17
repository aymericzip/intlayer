---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "2026 में सही React i18n लाइब्रेरी कैसे चुनें"
description: "React internationalization के लिए एक निर्णय गाइड। react-i18next, react-intl, Lingui, use-intl, Paraglide और Intlayer की तुलना करने से पहले किन सवालों के जवाब देने चाहिए, और प्रत्येक विकल्प bundle size, typing और maintenance में क्या लागत लेता है।"
keywords:
  - react i18n
  - react internationalization
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - i18n लाइब्रेरी तुलना
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# सही React i18n लाइब्रेरी कैसे चुनें

React में कोई इन-बिल्ट i18n primitive नहीं आता है। पहले दिन आप जो लाइब्रेरी चुनते हैं, वह तय करती है कि अनुवाद कैसे स्टोर होंगे, वे बंडल तक कैसे पहुंचेंगे, और अगले कुछ वर्षों के लिए आपका कितना काम बढ़ जाएगा। अधिकांश टीमें लोकप्रियता के आधार पर चुनाव करती हैं, और फिर 2,000 कुंजियों पर पहुंचने के बाद उन्हें इसके नुकसानों का पता चलता है।

यह गाइड विपरीत दिशा में काम करता है: पहले अपने प्रोजेक्ट के बारे में कुछ सवालों के जवाब दें, और फिर उन जवाबों को उपयुक्त लाइब्रेरी से मिलाएँ। यह सादे React (Vite, React Router, TanStack Start) पर केंद्रित है। Next.js की अपनी बाधाएं हैं, जिन्हें [Next.js तुलना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md) में शामिल किया गया है।

![React i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## विषय सूची

<TOC/>

## लाइब्रेरीज़ की तुलना करने से पहले उत्तर देने योग्य छह प्रश्न

यह जाने बिना कि कौन सी पंक्तियाँ आपके लिए महत्वपूर्ण हैं, एक फीचर टेबल बेकार है। पहले इन्हें देखें।

1. **ऐप कैसे रेंडर होता है?** केवल SPA, हाइड्रेशन के साथ SSR, या React Server Components। Context-आधारित hooks SPA में हर जगह काम करते हैं। RSC के साथ, एक hook टेक्स्ट रेंडर करने वाले प्रत्येक घटक पर `"use client"` को बाध्य करता है, इसलिए आपको सर्वर-साइड API की भी आवश्यकता होगी।
2. **अनुवाद कौन लिखता है?** डेवलपर्स, TMS का उपयोग करने वाली एक इन-हाउस टीम, ICU फ़ाइलें देने वाली एक एजेंसी, या एक AI पाइपलाइन। यह किसी भी API विवरण से अधिक कैटलॉग प्रारूप को तय करता है।
3. **कितने लोकेल्स और पेज हैं?** दो लोकेल्स और पाँच पेज सब कुछ शिप करना वहन कर सकते हैं। दस लोकेल्स और पचास रूट्स ऐसा नहीं कर सकते, और लोडिंग रणनीति मुख्य लागत बन जाती है।
4. **क्या आपको कुंजियों पर प्रकारों (types) की आवश्यकता है?** `t("checkout.totl")` में एक टाइपो हर कुंजी-आधारित लाइब्रेरी में तब तक संकलित होता है जब तक कि आप स्वयं प्रकारों को वायर न करें। तय करें कि क्या यह स्वीकार्य है।
5. **स्ट्रिंग में क्या शामिल है?** सादा टेक्स्ट, बहुवचन (plurals), या बीच में `<Link>` वाले वाक्य। रिच सामग्री वह जगह है जहाँ अधिकांश API अजीब हो जाते हैं।
6. **प्रोजेक्ट कितने समय तक चलेगा?** तीन महीने के प्रोटोटाइप और पांच साल के उत्पाद को समान मात्रा में बिल्ड टूलिंग की आवश्यकता नहीं होती है।

उत्तर लिख लें। नीचे सब कुछ उनका संदर्भ देता है।

## एक तस्वीर में पूरा परिदृश्य

JavaScript i18n के पंद्रह वर्ष चार वास्तुकला तरंगों में फिट बैठते हैं, और जिन React लाइब्रेरीज़ की आप तुलना करेंगे वे विभिन्न तरंगों से आती हैं।

![History of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="रनटाइम डिक्शनरी (2011 से 2017): i18next, react-intl">

मेमोरी में लोड किए गए JSON कैटलॉग, रनटाइम पर देखा जाने वाला `t("a.b")`, ब्राउज़र में पार्स किया गया ICU या कस्टम सिंटैक्स। सबसे बड़े इकोसिस्टम, सबसे भारी रनटाइम, और प्रकार (types) वैकल्पिक हैं।

</Accordion>
<Accordion header="कंपाइल-टाइम मैक्रोज़ (2018 से 2021): Lingui, typesafe-i18n">

बिल्ड के समय निकाले गए संदेश, कॉम्पैक्ट कैटलॉग में संकलित, टाइप किए गए तर्क। छोटे बंडलों के बदले में एक अतिरिक्त बिल्ड स्टेप (`extract`, `compile`)।

</Accordion>
<Accordion header="सर्वर-फ़र्स्ट (2022 से 2024): use-intl / next-intl">

SSR और Server Components के आसपास डिज़ाइन किया गया। सर्वर पर रेंडर करें, केवल वही हाइड्रेट करें जो क्लाइंट को चाहिए। अभी भी कुंजी-आधारित और केंद्रीकृत।

</Accordion>
<Accordion header="कंपाइलर और कोलोकेटेड सामग्री (2024 से 2026): Paraglide, Intlayer, wuchale">

सामग्री को ट्री-शेकेबल फ़ंक्शनों या प्रति-घटक डिक्शनरी में संकलित किया जाता है। प्रकार उत्पन्न होते हैं, गायब अनुवाद बिल्ड को विफल कर देते हैं, और AI अनुवाद CLI से चलता है।

</Accordion>
</AccordionGroup>

[JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md) विस्तार से बताता है कि प्रत्येक तरंग ने पिछली समस्याओं का कैसे समाधान किया।

## वह निर्णय जो सबसे अधिक मायने रखता है: सामग्री कहाँ रहती है और कब लोड होती है

प्रत्येक React i18n लाइब्रेरी का आकार समान होता है: एक स्टोर, एक प्रोवाइडर, एक हुक। प्रोवाइडर जो कुछ भी प्राप्त करता है वह क्लाइंट बंडल में या हाइड्रेशन पेलोड में समाप्त होता है। इसलिए दो संरचनात्मक विकल्प हैं:

- **केंद्रीकृत या स्कोप्ड सामग्री।** ऐप के लिए एक `en.json`, या प्रति घटक (या प्रति नेमस्पेस) एक घोषणा।
- **स्थिर या गतिशील आयात।** स्टार्टअप पर सब कुछ बंडल किया गया, या सक्रिय लोकेल और रूट मांग पर प्राप्त किए गए।

नीचे दिया गया ग्राफ 1 से 10 पृष्ठों के एक सैद्धांतिक ऐप के लिए पेलोड का अनुमान लगाता है, जिसका अनुवाद 1 से 10 लोकेल्स में किया गया है, जिसमें प्रति पृष्ठ लगभग 30 KB टेक्स्ट है।

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

स्थिर आयातों के साथ केंद्रीकृत सामग्री दोनों अक्षों के साथ बढ़ती है: 10 पृष्ठ गुणा 10 लोकेल्स का अर्थ है प्रत्येक पृष्ठ पर 300 KB टेक्स्ट। गतिशील आयात लोकेल अक्ष को हटा देते हैं। स्कोपिंग पेज अक्ष को हटा देती है। केवल संयोजन ही स्थिर रहता है।

यह लाइब्रेरी का गुण नहीं है, यह अनुशासन का गुण है। `react-i18next` को नेमस्पेस और लेज़ी बैकएंड के साथ स्कोप किया जा सकता है। `use-intl` को प्रति रूट विभाजित किया जा सकता है। लेकिन कोई भी इसे लागू नहीं करता है, और एक साझा `<Button>` जो `t("common:cta")` तक पहुंचता है, चुपचाप `common` को प्रत्येक रूट की निर्भरता बना देता है। [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) इसे "अन्य रूट्स से रिसाव" और "अन्य लोकेल्स से रिसाव" के रूप में मापता है, और यहीं से लाइब्रेरीज़ के बीच अधिकांश अंतर आता है।

यदि प्रश्न 3 का आपका उत्तर "कई लोकेल्स, कई पेज" था, तो इस खंड को किसी भी API प्राथमिकता से अधिक महत्व दें। [प्रति-घटक बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md) पोस्ट उसी विकल्प के रखरखाव पक्ष पर गहराई से जाती है।

## उम्मीदवार

लाइब्रेरी के आकार [TanStack Start बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) से आते हैं: एक खाली घटक में प्रोवाइडर प्लस हुक, बंडलिंग, ट्री-शेकिंग और मिनिफिकेशन के बाद, 10 पेज और 10 लोकेल्स। सामग्री को अलग से मापा जाता है।

| लाइब्रेरी               | तरंग          | सामग्री मॉडल                         | कुंजियों पर प्रकार            | संदेश प्रारूप              | लाइब्रेरी का आकार |
| :---------------------- | :------------ | :----------------------------------- | :---------------------------- | :------------------------- | :---------------- |
| `react-i18next`         | रनटाइम        | केंद्रीय JSON, नेमस्पेस              | Opt-in (`CustomTypeOptions`)  | i18next (प्रत्यय बहुवचन)   | ~18.4 kB          |
| `react-intl` (FormatJS) | रनटाइम        | केंद्रीय JSON, ICU                   | Opt-in (निष्कर्षण + यूनियन)   | ICU                        | ~15.3 kB          |
| `use-intl`              | सर्वर-फ़र्स्ट | केंद्रीय JSON, ICU                   | Opt-in (घोषणा विलय)           | ICU                        | ~14.1 kB          |
| `@tolgee/react`         | रनटाइम        | केंद्रीय, इन-कॉन्टेक्स्ट संपादन      | नहीं                          | ICU                        | ~11.1 kB          |
| Lingui                  | मैक्रो        | कोड में स्रोत टेक्स्ट, संकलित कैटलॉग | अच्छा, कंपाइलर से             | मैक्रोज़ के माध्यम से ICU  | छोटा              |
| Paraglide               | कंपाइलर       | inlang प्रोजेक्ट, जनरेटेड फ़ंक्शंस   | जनरेटेड                       | स्वयं का                   | लगभग शून्य        |
| Intlayer                | कंपाइलर       | प्रति घटक `.content.ts`              | जनरेटेड, डिफ़ॉल्ट रूप से चालू | हेल्पर्स (`plural`, `enu`) | बेसलाइन           |

> संख्याएं बेंचमार्क के संस्करणों का एक स्नैपशॉट हैं और रिलीज के साथ बदलती हैं। केवल आकार पर निर्णय लेने से पहले अपने स्वयं के ऐप पर बेंचमार्क चलाएं।

तालिका दो चीजें नहीं दिखाती है। `Paraglide` लगभग कोई लाइब्रेरी शिप नहीं करता क्योंकि यह आपके रिपॉजिटरी में कोड जनरेट करता है, जिसका अर्थ है प्रत्येक कमिट से पहले एक पुनर्जनन चरण और जनरेटेड फ़ाइलों पर मर्ज टकराव। और `Intlayer` को एक बंडलर प्लगइन (`vite-intlayer` या समकक्ष) की आवश्यकता होती है, इसलिए यह नो-बिल्ड सेटअप में नहीं चल सकता।

## अपने उत्तरों को एक लाइब्रेरी से मिलाएँ

<AccordionGroup>
<Accordion header="प्रोटोटाइप, छोटी टीम, कम लोकेल्स">

सबसे सरल विकल्प चुनें जो काम करता है और ज़रूरत से ज़्यादा निवेश न करें। प्रति लोकेल एकल JSON के साथ `react-i18next` ठीक है, और एक दशक के Stack Overflow उत्तर आपका समय बचाएंगे। जब तक आपको उनकी आवश्यकता न हो तब तक नेमस्पेस छोड़ दें। यदि प्रोटोटाइप एक उत्पाद बन जाता है, तो स्कोप्ड सामग्री में माइग्रेशन का बजट बनाएं; [react-i18next कम्पैट एडॉप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/react-i18next.md) इसे वृद्धिशील बनाता है।

</Accordion>
<Accordion header="अनुवाद किसी एजेंसी या ICU बोलने वाले TMS से आते हैं">

आपका कैटलॉग प्रारूप आपके लिए तय किया गया है। `react-intl` ICU-मूल निवासी है और FormatJS निष्कर्षण टूलिंग उस पाइपलाइन के लिए बनाई गई है। `use-intl` भी ICU पढ़ता है। `react-i18next` को ICU प्लगइन और अन्यथा अपनी बहुवचन कुंजियों की आवश्यकता होती है। Intlayer का ICU समर्थन अभी भी आंशिक है, इसलिए यदि आप आज ICU स्ट्रिंग्स प्राप्त करते हैं, तो इसे तब तक अवरोधक के रूप में मानें जब तक कि यह पूरी तरह उपलब्ध न हो जाए।

</Accordion>
<Accordion header="बड़ा ऐप, कई रूट्स, बंडल बजट मायने रखता है">

डिफ़ॉल्ट रूप से स्कोप्ड सामग्री और गतिशील लोडिंग को प्राथमिकता दें, परिपाटी द्वारा नहीं। `Lingui` और `Paraglide` संकलन के माध्यम से वहां पहुंचते हैं। Intlayer प्रति-घटक घोषणाओं के माध्यम से वहां पहुंचता है, और कंपाइलर केवल वही भेजता है जो एक रूट रेंडर करता है। `react-i18next` या `use-intl` के साथ, पहले दिन नेमस्पेस और लेज़ी-लोडिंग रणनीति की योजना बनाएं और समीक्षा में इसे लागू करें, क्योंकि टूलिंग ऐसा नहीं करेगी।

</Accordion>
<Accordion header="प्रकार सुरक्षा (Type safety) गैर-परक्राम्य है">

प्रत्येक कुंजी-आधारित लाइब्रेरी को टाइप किया जा सकता है, और लगभग कोई भी डिफ़ॉल्ट रूप से टाइप नहीं होती है। यदि आप घोषणा विलय (declaration merging) को बनाए नहीं रखना चाहते हैं जिसे लेज़ी रूप से लोड किए गए नेमस्पेस में काम करना है, तो ऐसी लाइब्रेरी चुनें जहाँ प्रकार सामग्री से जनरेट होते हैं: `Lingui`, `Paraglide`, या Intlayer। [अनुपस्थित अनुवादों का पता लगाना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md) पोस्ट तुलना करती है कि प्रत्येक बिल्ड समय पर क्या पकड़ता है।

</Accordion>
<Accordion header="बहुत सारी रिच सामग्री: मार्कडाउन, वाक्यों के अंदर लिंक, प्रति-लोकेल घटक">

रिच नोड्स वे हैं जहाँ स्ट्रिंग लौटाने वाला `t()` विफल हो जाता है। `react-i18next` और `Lingui` में `<Trans>` है, `react-intl` में रिच टेक्स्ट टैग हैं, जो सभी सादे स्ट्रिंग मामले की तुलना में अधिक जटिल हैं। Intlayer के कंटेंट नोड्स सीधे JSX, मार्कडाउन और नेस्टेड ऑब्जेक्ट्स को स्वीकार करते हैं, जो बेहतर फिट है यदि सामग्री केवल UI लेबल से अधिक है।

</Accordion>
<Accordion header="अनुवाद AI द्वारा तैयार किए जाएंगे, डेवलपर्स द्वारा समीक्षा किए जाएंगे">

तब केंद्रीकृत JSON अब कोई आवश्यकता नहीं है, क्योंकि आयात करने के लिए कोई TMS नहीं है। कोलोकेटेड सामग्री और एक CLI जो गायब लोकेल्स को भरता है, छोटा रास्ता है। Intlayer का `fill` कमांड आपकी अपनी API कुंजी (OpenAI, Anthropic, Mistral, Gemini) के विरुद्ध चलता है और केवल वही अनुवाद करता है जो बदला है। Paraglide और Tolgee अपनी योजनाओं के साथ होस्ट किए गए समकक्ष प्रदान करते हैं।

</Accordion>
<Accordion header="आप बाद में Next.js App Router पर जा सकते हैं">

React context सर्वर/क्लाइंट सीमा को पार नहीं करता है। केवल एक क्लाइंट हुक पर निर्मित लाइब्रेरीज़ (`react-i18next`, `react-intl`) को जिस दिन आप RSC अपनाते हैं, उस दिन एक समानांतर सर्वर API की आवश्यकता होगी। `use-intl` (`next-intl` के रूप में) और Intlayer (`next-intlayer` के रूप में) में पहले से ही वह विभाजन है। एक पैटर्न को मानकीकृत करने से पहले [Next.js i18n पोस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/nextjs.md) पढ़ें।

</Accordion>
</AccordionGroup>

## प्रत्येक लाइब्रेरी कहाँ कम पड़ जाती है

ईमानदार सीमाएँ, क्योंकि हर विकल्प में वे होती हैं।

- **`react-i18next`**: सेट में सबसे भारी, इसका अपना बहुवचन प्रारूप, प्रकारों को बनाए रखने की ज़िम्मेदारी आपकी है, अप्रयुक्त कुंजियाँ चुपचाप जमा होती हैं।
- **`react-intl`**: विस्तृत DX (`useIntl()` फिर `formatMessage({ id })`), कई नोड्स से बंधा वैश्विक इंस्टेंस।
- **`use-intl`**: शुरू करने में सरल, अनुकूलित करने में कष्टदायी। नेमस्पेस, गतिशील लोडिंग और प्रकार एक साथ विकास को बहुत धीमा कर देते हैं।
- **`Lingui`**: अतिरिक्त `extract` / `compile` बिल्ड चरण, कई ओवरलैपिंग सिंटैक्स (`t()`, टैग किए गए टेम्पलेट, `i18n.t()`, `<Trans>`) जो मनुष्यों और AI सहायकों दोनों को भ्रमित करते हैं।
- **`Paraglide`**: रेपो में जनरेट की गई फाइलें, React बेंचमार्क में ट्री-शेकिंग प्रभावी नहीं हुई, और लोकेल को स्टोर के बजाय प्रत्येक नोड पर स्टोरेज से पढ़ा जाता है।
- **`Tolgee`**: कोई कुंजी प्रकार नहीं, कठिन ऑनबोर्डिंग, इन-कॉन्टेक्स्ट संपादन इसका मुख्य विक्रय बिंदु है।
- **`Intlayer`**: अनिवार्य बिल्ड प्लगइन, छोटा इकोसिस्टम, आंशिक ICU समर्थन, डिज़ाइन द्वारा पूरे कोडबेस में फैली सामग्री जिससे एक अनुवादक के लिए एक JSON निर्यात करने के लिए टूलिंग की आवश्यकता होती है।
- **`gt-react`, `lingo.dev`**: बेंचमार्क में अनुशंसित नहीं: बिल्ड पर कोटा त्रुटियां, वेंडर लॉक-इन, और प्रतिक्रियाशीलता समस्याएं जिनके लिए प्रोवाइडर री-रेंडर को बाध्य करना पड़ा।

## प्रत्येक विकल्प कोड में कैसा दिखता है

एक ही घटक, एक शीर्षक और बहुवचन के साथ एक कार्ट सारांश, प्रत्येक उम्मीदवार के साथ लिखा गया। दिलचस्प हिस्सा घटक नहीं है, यह है कि सामग्री कहाँ रहती है और टाइप चेकर इसके बारे में क्या जानता है।

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

बहुवचन प्रत्यय कुंजियाँ हैं जो `Intl.PluralRules` के माध्यम से हल होती हैं। `t` का प्रकार `(key: string) => string` है जब तक कि आप `CustomTypeOptions` घोषित नहीं करते, इसलिए `t("titel")` भी संकलित हो जाता है।

  </Tab>
  <Tab label="react-intl" value="react-intl">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

शुरुआत से अंत तक ICU, जो कि अधिकांश TMS प्लेटफॉर्म निर्यात करते हैं। `id` पर प्रकार `formatjs` निष्कर्षण चरण और एक जनरेट किए गए यूनियन से आते हैं, न कि आउट ऑफ द बॉक्स।

  </Tab>
  <Tab label="use-intl" value="use-intl">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

Next.js बाइंडिंग के बिना `next-intl` के समान आकार। संदेश प्रकार के साथ `AppConfig` को बढ़ाने के बाद कुंजियाँ टाइप की जाती हैं; नेमस्पेस को विभाजित करना आपका काम है।

  </Tab>
  <Tab label="Lingui" value="lingui">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

स्रोत भाषा घटक में रहती है; अन्य लोकेल्स `lingui extract` के बाद हैशेड आईडी के तहत `.po` फ़ाइलों में रहते हैं। `extract` या `compile` को भूल जाने पर चुपचाप अंग्रेज़ी पर वापस आ जाता है।

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

प्रत्येक संदेश एक जनरेटेड, टाइप किया गया फ़ंक्शन है, इसलिए एक गायब कुंजी एक आयात त्रुटि (import error) है। `paraglide/` फ़ोल्डर आपके रेपो में जनरेट होता है और प्रत्येक परिवर्तन पर पुनर्जीवित होता है।

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      hi: "आपकी कार्ट",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      hi: plural({ one: "{{count}} आइटम", other: "{{count}} आइटम" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

घटक के बगल में एक फ़ाइल में सभी लोकेल्स। बिल्ड के समय प्रकार जनरेट होते हैं, इसलिए `title` स्वतः पूर्ण (autocomplete) होता है और एक टाइपो बिना किसी घोषणा विलय के `tsc` को विफल कर देता है। फ़ोल्डर हटाने से स्ट्रिंग्स हट जाती हैं।

  </Tab>
</Tabs>

पहले से ही `react-i18next`, `react-intl` या `Lingui` पर हैं? कम्पैट एडॉप्टर ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/react-i18next.md), [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/react-intl.md), [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md)) बंडलर स्तर पर आयात को एलियास करते हैं ताकि मौजूदा API घटक दर घटक आगे बढ़ते समय काम करता रहे। [माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_react-i18next_to_intlayer.md) बाकी को कवर करता है।

## प्रतिबद्ध करने से पहले

एक फीचर टेबल आपको बताती है कि एक लाइब्रेरी आज क्या करती है। ये बिंदु आपको बताते हैं कि इसके साथ रहना कैसा होगा।

**रिपॉजिटरी गतिविधि की जाँच करें।**

कमिट, समस्या प्रतिक्रिया समय, और क्या अंतिम मामूली रिलीज इस वर्ष थी। बिना अनुरक्षक के एक ध्वनि डिजाइन प्रतीक्षा में एक माइग्रेशन है।

**npm डाउनलोड द्वारा चयन न करें।**

सबसे अधिक स्थापित लाइब्रेरी वह है जिसे पहले भेजा गया था, वह नहीं जो 2026 React कोडबेस में फिट बैठती है। डाउनलोड इतिहास को मापते हैं, उपयुक्तता को नहीं।

![Tier list of JavaScript i18n libraries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**पूछें कि अनुरक्षक को कौन भुगतान करता है, और वे क्या बेचते हैं।**

`i18next` को Locize द्वारा समर्थित किया गया है। `next-intl` / `use-intl`, `vue-i18n`, `svelte-i18n` और Lingui को Crowdin द्वारा समर्थित किया गया है। Tolgee, Paraglide (inlang) और Intlayer प्रत्येक अपना स्वयं का प्लेटफ़ॉर्म चलाते हैं। एक विक्रेता जिसका राजस्व होस्टेड अनुवाद है, उसके पास आपके टूलचेन के अंदर अनुवाद को मुफ़्त बनाने का बहुत कम कारण है। Intlayer इस सेट में एकमात्र ऐसा है जो आपकी अपनी API कुंजी के साथ CLI के माध्यम से AI अनुवाद प्रदान करता है, और एक CMS जिसे आप स्वयं होस्ट कर सकते हैं।

**क्या यह AI-एजेंट के लिए तैयार है?**

एजेंट अभी भी i18n के साथ संघर्ष करते हैं: वे लोकेल्स भूल जाते हैं, कुंजियों का आविष्कार करते हैं, और संदेश सिंटैक्स को मिलाते हैं। क्या लाइब्रेरी [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md) या एक [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md) भेजती है ताकि एजेंट सामग्री को सूचीबद्ध, भर और परीक्षण कर सके? और क्या सामग्री लोडिंग डिफ़ॉल्ट रूप से अनुकूलित है, या किसी को हर तिमाही में नेमस्पेस और लेज़ी आयातों की समीक्षा करनी होगी?

**आउट ऑफ द बॉक्स प्रकार सुरक्षा (Type safety)।**

"अतिरिक्त वायरिंग के साथ टाइप किया जा सकता है" नहीं बल्कि "एक गलत कुंजी एक नए इंस्टॉल पर `tsc` को विफल कर देती है"। जांचें कि उस कुंजी के साथ क्या होता है जो मौजूद नहीं है, और उस लोकेल के साथ जिसमें एक अनुवाद गायब है।

**अप्रयुक्त सामग्री का पता लगाना।**

कैटलॉग केवल बढ़ते हैं। Intlayer का बिल्ड अप्रयुक्त फ़ील्ड्स को हटा देता है और उन्हें लॉग करता है (`build.purge`)। Paraglide वास्तुकला द्वारा वहां पहुंचता है, क्योंकि एक अनकॉल संदेश फ़ंक्शन ट्री-शेक हो जाता है। बाकी सब कुछ सफाई को आप पर छोड़ देता है।

**डेवलपर अनुभव (Developer experience)।**

पहले अनुवादित स्ट्रिंग तक सेटअप का समय, एक [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md) या [VS Code एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) जो होवर पर अनुवाद दिखाता है और घोषणा पर कूदता है, भरने, परीक्षण करने और पुश करने के लिए एक [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md), और गैर-डेवलपर्स के लिए बिना किसी पुल अनुरोध के सामग्री को संपादित करने का एक तरीका ([विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md))।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या react-i18next अभी भी 2026 में एक अच्छा डिफ़ॉल्ट है?">

अधिकांश टीमों के लिए हाँ। इसके पास सबसे बड़ा इकोसिस्टम और ऑनलाइन सबसे अधिक उत्तर हैं। इसकी लागत वास्तविक लेकिन अनुमानित है: सबसे भारी रनटाइम, एक कस्टम बहुवचन प्रारूप, और प्रकार सुरक्षा प्लस स्कोपिंग जिसे आपको स्वयं सेट अप और डिफेंड करना होगा।

</Question>

<Question title="क्या मुझे कंपाइलर-आधारित लाइब्रेरी की आवश्यकता है?">

केवल तभी जब बंडल आकार, जनरेट किए गए प्रकार या बिल्ड-टाइम अनुपस्थित-कुंजी जांच आपकी आवश्यकताओं में शामिल हों। दो लोकेल्स वाले एक छोटे ऐप के लिए, एक रनटाइम लाइब्रेरी सरल है। [कंपाइलर बनाम घोषणात्मक i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md) पोस्ट बताती है कि कंपाइलर आपको क्या देते हैं और वे क्या गलत कर सकते हैं।

</Question>

<Question title="क्या मैं प्रत्येक घटक को फिर से लिखे बिना बाद में लाइब्रेरी बदल सकता हूँ?">

आंशिक रूप से। कुंजी-आधारित लाइब्रेरीज़ पर्याप्त आकार साझा करती हैं जिससे कि एक कम्पैट एडॉप्टर एक API को दूसरे के लिए एलियास कर सकता है, जो कि Intlayer एडॉप्टर कैसे काम करते हैं। संदेश प्रारूप (ICU बनाम i18next बनाम हेल्पर्स) स्वचालित रूप से परिवर्तित नहीं होते हैं, इसलिए बहुवचन और इंटरपोलेशन वह हिस्सा हैं जिसे आप स्पर्श करेंगे।

</Question>

<Question title="क्या लाइब्रेरी का चुनाव SEO को प्रभावित करता है?">

अप्रत्यक्ष रूप से। क्रॉलर्स जो देखते हैं वह रूटिंग, `hreflang`, `<html lang>` द्वारा तय किया जाता है और क्या टेक्स्ट सर्वर-रेंडर किए गए HTML में है। कुछ लाइब्रेरीज़ इसके लिए हेल्पर्स भेजती हैं, अधिकांश इसे आप पर छोड़ देती हैं। [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md) देखें।

</Question>

</FAQ>

## आगे पढ़ना

- [i18n लाइब्रेरी बेंचमार्क: बंडल आकार, रिसाव और लोकेल-स्विच समय](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) और [TanStack Start रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md)
- [React i18n: प्रोवाइडर मॉडल कैसे काम करता है और इसकी लागत क्या है](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/react.md)
- [react-i18next बनाम react-intl बनाम Intlayer, फीचर दर फीचर](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next बनाम next-intl बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md)
- [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)
- [कंपाइलर बनाम घोषणात्मक i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)
- [प्रति-घटक बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)
- [बिल्ड समय पर बंडल अनुकूलन कैसे काम करता है](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)
- [Vite + React ऐप में i18n सेट अप करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md)
- [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_vue_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_svelte_i18n_library.md) और [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_solid_i18n_library.md) के लिए समान गाइड
