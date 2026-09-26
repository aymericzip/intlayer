---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "2026 में सही Vue i18n लाइब्रेरी कैसे चुनें"
description: Vue और Nuxt internationalization के लिए एक निर्णय गाइड। vue-i18n, @nuxtjs/i18n, fluent-vue, Paraglide और Intlayer की तुलना करने से पहले किन सवालों के जवाब देने चाहिए, और बंडल साइज़, टाइपिंग और SSR पेलोड में प्रत्येक विकल्प की क्या लागत आती है।
keywords:
  - vue i18n
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - i18n library comparison
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# सही Vue i18n लाइब्रेरी कैसे चुनें

"Vue i18n" एक सामान्य शब्द भी है और उस लाइब्रेरी का नाम भी जिसे लगभग हर कोई इंस्टॉल करता है। यह सुविधाजनक भी है और साथ ही भ्रामक भी: `vue-i18n` एक अच्छा डिफ़ॉल्ट है, लेकिन यह एकमात्र विकल्प नहीं है, और जो प्रश्न इस चुनाव को निर्धारित करने चाहिए (SSR है या नहीं, कितने पेज हैं, ट्रांसलेशन कौन लिखता है) वे शायद ही कभी `npm install` से पहले पूछे जाते हैं।

यह गाइड पहले उन सवालों को पूछती है, फिर उन उत्तरों को उपयुक्त लाइब्रेरीज़ के साथ मैप करती है, प्लेन Vite + Vue और Nuxt दोनों के लिए।

![Vue i18n लाइब्रेरी इकोसिस्टम](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## विषय सूची

<TOC/>

## लाइब्रेरीज़ की तुलना करने से पहले जवाब देने योग्य छह प्रश्न

1. **Vite SPA या Nuxt?** एक SPA में कैटलॉग की लागत JS बंडल की समस्या होती है। Nuxt में यह HTML पेलोड की भी समस्या है, क्योंकि मैसेज SSR स्टेट में सीरियलाइज़ होते हैं और हाइड्रेट होते हैं। इसी कारण से अधिकांश "vue-i18n धीमा है" की रिपोर्ट Nuxt ऐप्स से आती हैं।
2. **अनुवाद कौन लिखता है?** डेवलपर्स, एक TMS, ICU स्ट्रिंग्स डिलीवर करने वाली कोई एजेंसी, या एक AI पाइपलाइन। `vue-i18n` अपने स्वयं के पाइप-सेपरेटेड प्लूरल सिंटैक्स का उपयोग करता है, न कि ICU का। यदि स्ट्रिंग्स बाहर से आती हैं तो यह मायने रखता है।
3. **कितनी भाषाएँ (locales) और पेज हैं?** दो भाषाएँ और पाँच पेज सब कुछ एक साथ भेज सकते हैं। दस भाषाएँ और चालीस रूट्स ऐसा नहीं कर सकते, और लोडिंग रणनीति मुख्य लागत बन जाती है।
4. **क्या आपको कीज़ पर टाइप्स की आवश्यकता है?** `vue-i18n` में `t("cart.totl")` कंपाइल हो जाता है जब तक कि आप कोई मैसेज स्कीमा जेनेरिक पास न करें, और वह स्कीमा लेज़ी लोड होने वाले कैटलॉग के साथ संघर्ष करती है।
5. **कंटेंट में क्या शामिल है?** केवल UI लेबल्स, या मार्कडाउन, वाक्यों के अंदर लिंक्स, और प्रति-लोकेल ब्लॉक्स। रिच कंटेंट वह जगह है जहाँ स्ट्रिंग रिटर्न करने वाला `t()` असुविधाजनक हो जाता है।
6. **क्या CSP एक बाधा है?** डिफ़ॉल्ट `vue-i18n` बिल्ड ब्राउज़र में `new Function` के साथ मैसेजेस को कंपाइल करता है। रनटाइम-ओनली बिल्ड्स को बिल्ड टाइम पर प्रीकंपाइल करने के लिए `@intlify/unplugin-vue-i18n` की आवश्यकता होती है।

इन उत्तरों को लिख लें। नीचे दी गई हर बात इन्हीं पर आधारित है।

## परिदृश्य एक नज़र में

Vue इकोसिस्टम में React की तुलना में कम i18n लाइब्रेरीज़ हैं, और वे अलग-अलग आर्किटेक्चरल दौर से आती हैं।

![JavaScript i18n लाइब्रेरीज़ का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="रनटाइम डिक्शनरीज़ (2015 से 2019): vue-i18n, @nuxt/i18n">

`vue-i18n` 2015 में आया और तब से डिफ़ॉल्ट बना हुआ है। `@nuxt/i18n` इसे लोकेल रूटिंग, SEO टैग्स और प्रति-लोकेल लेज़ी लोडिंग के साथ रैप करता है। मैसेजेस को रेंडर फंक्शन्स में कंपाइल किया जाता है, यदि आप unplugin जोड़ते हैं तो बिल्ड टाइम पर, अन्यथा ब्राउज़र में।

</Accordion>
<Accordion header="वैकल्पिक फॉर्मेट्स (2020): fluent-vue">

Mozilla Fluent `.ftl` फ़ाइलें ग्रामर-अवेयर वेरिएंट्स के साथ अधिक अनुकूल मैसेज सिंटैक्स लेकर आईं। कोई की (key) टाइप्स नहीं हैं, और Vite प्लगइन हर लोकेल को हर पेज में लोड करता है।

</Accordion>
<Accordion header="कंपाइलर और कोलोकेटेड कंटेंट (2024 से 2026): Paraglide, Intlayer">

Paraglide प्रति मैसेज एक फंक्शन जेनरेट करता है और बंडलर को बाकी को ट्री-शेक (tree-shake) करने देता है। Intlayer `.content.ts` फ़ाइलों में प्रति कंपोनेंट कंटेंट घोषित करता है, टाइप्स जेनरेट करता है, और केवल वही भेजता है जो एक रूट रेंडर करता है।

</Accordion>
</AccordionGroup>

[JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md) प्रत्येक दौर को विस्तार से कवर करता है।

## सबसे महत्वपूर्ण निर्णय: कंटेंट कहाँ रहता है और कब लोड होता है

दो संरचनात्मक विकल्प सेटअप्स के बीच अधिकांश बंडल अंतर की व्याख्या करते हैं:

- **केंद्रीकृत या स्कोप्ड कंटेंट।** ऐप के लिए एक `locales/en.json`, या प्रति कंपोनेंट एक डिक्लेरेशन।
- **स्टैटिक या डायनामिक इम्पोर्ट।** स्टार्टअप पर सब कुछ, या सक्रिय लोकेल (और आदर्श रूप से सक्रिय रूट) को मांग पर फ़ेच करना।

यह ग्राफ 1 से 10 पेजों के एक सैद्धांतिक ऐप के लिए पेलोड का अनुमान लगाता है, जिसका 1 से 10 लोकेल्स में अनुवाद किया गया है, जिसमें प्रति पेज लगभग 30 KB टेक्स्ट है।

![आर्किटेक्चर द्वारा सैद्धांतिक कंटेंट लीकेज](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

`vue-i18n` डायनामिक एक्सिस का समर्थन करता है: `import()` के बाद `setLocaleMessage` का अर्थ है कि आप उन नौ लोकेल्स को भेजना बंद कर देते हैं जिन्हें कोई नहीं पढ़ता। जो यह आपको नहीं देता वह है पेज एक्सिस। एक लोकेल कैटलॉग एक ऑब्जेक्ट होता है, और इसे लोड करने से हर पेज की कॉपी लोड हो जाती है। SPA में कोई ध्यान नहीं देता। Nuxt में, `@nuxtjs/i18n` और दस से अधिक पेजों के साथ, हर रूट हर दूसरे रूट के स्ट्रिंग्स को दो बार ले जाता है: JS चंक में और SSR पेलोड में।

[Vue बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/vue.md) इसे "अन्य रूट्स से लीकेज" और "अन्य लोकेल्स से लीकेज" के रूप में मापता है। यदि प्रश्न 3 का आपका उत्तर "कई पेज" था, तो यह सेक्शन किसी भी API प्राथमिकता से अधिक महत्वपूर्ण है। [प्रति-कंपोनेंट बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md) पोस्ट इसी ट्रेड-ऑफ के मेंटेनेंस पक्ष को कवर करती है।

## उम्मीदवार लाइब्रेरीज़

लाइब्रेरी साइज़ [Vue बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/vue.md) से हैं: 10-पेज, 10-लोकेल ऐप पर बंडलिंग, ट्री-शेकिंग और मिनिफिकेशन के बाद एक खाली कंपोनेंट में प्लगइन और कंपोज़ेबल। कंटेंट को अलग से मापा जाता है।

| लाइब्रेरी      | कंटेंट मॉडल                                               | टाइप सुरक्षा                              | मैसेज फॉर्मेट                       | प्रति-रूट स्प्लिटिंग     | लाइब्रेरी साइज़                                  |
| :------------- | :-------------------------------------------------------- | :---------------------------------------- | :---------------------------------- | :----------------------- | :----------------------------------------------- |
| `vue-i18n`     | प्रति लोकेल सेंट्रल कैटलॉग, वैकल्पिक SFC `<i18n>` ब्लॉक्स | 2/5 — स्कीमा जेनेरिक के माध्यम से ऑप्ट-इन | स्वयं का (पाइप प्लूरल)              | नहीं                     | ~24.3 kB                                         |
| `@nuxtjs/i18n` | `vue-i18n` के समान, साथ ही रूटिंग और SEO टैग्स            | 2/5 — समान                                | समान                                | नहीं, केवल प्रति लोकेल   | ~24.3 kB                                         |
| `fluent-vue`   | `.ftl` फ़ाइलें (Mozilla Fluent)                           | 1/5 — कोई नहीं                            | Fluent                              | नहीं                     | ~29.7 kB                                         |
| Paraglide      | inlang प्रोजेक्ट, जेनरेटेड फंक्शन्स                       | 3.5/5 — जेनरेटेड                          | स्वयं का                            | ट्री-शेकिंग के माध्यम से | लगभग शून्य (कोडबेस में जनरेट किए गए कोड के कारण) |
| Intlayer       | प्रति कंपोनेंट एक `.content.ts`                           | 5/5 — जेनरेटेड, डिफ़ॉल्ट रूप से चालू      | Intlayer (+ ICU, i18next, vue-i18n) | हाँ, प्रति कंपोनेंट      | ~3.9 kB                                          |

> संख्याएँ बेंचमार्क के वर्ज़न्स का एक स्नैपशॉट हैं। केवल साइज़ के आधार पर निर्णय लेने से पहले इसे अपने ऐप पर चलाएं।
> टाइप सुरक्षा: 5/5 का अर्थ है कि URL फॉर्मेटर और हेल्पर्स सहित कुंजियाँ, पैरामीटर और हर लोकेल बिना किसी मैन्युअल सेटअप के जाँचे जाते हैं।

Paraglide का लगभग-शून्य लाइब्रेरी साइज़ बनावट के कारण है: रनटाइम आपके रिपॉजिटरी में जेनरेट होता है, जिसका अर्थ है हर पुश से पहले एक रीजेनरेशन स्टेप और जेनरेट की गई फ़ाइलों पर मर्ज कॉन्फ्लिक्ट्स। Intlayer को `vite-intlayer` (या Nuxt मॉड्यूल) की आवश्यकता होती है, इसलिए यह बिल्ड स्टेप के बिना नहीं चल सकता।

## अपने उत्तरों को एक लाइब्रेरी से मिलाएं

<AccordionGroup>
<Accordion header="Vite SPA, छोटी टीम, कुछ लोकेल्स">

Composition मोड (`legacy: false`) में `vue-i18n`, `@intlify/unplugin-vue-i18n` के साथ ताकि आप रनटाइम-ओनली बिल्ड शिप करें। `import()` के साथ लोकेल्स को लेज़ी-लोड करें। यह अधिकांश छोटे ऐप्स को कवर करता है और कम्युनिटी के जवाब हर जगह उपलब्ध हैं। SFC `<i18n>` ब्लॉक्स मैसेजेस को कंपोनेंट के साथ कोलोकेट करते हैं, जिससे मदद मिलती है, लेकिन उनके आसपास का एक्सट्रैक्शन और TMS टूलिंग JSON कैटलॉग की तुलना में कमज़ोर है, इसलिए जल्दी तय करें कि टीम किसका उपयोग करती है।

</Accordion>
<Accordion header="लोकेल रूटिंग, साइटमैप और hreflang के साथ Nuxt">

`@nuxtjs/i18n` आपको बिना किसी कोड के रूटिंग रणनीति, `hreflang` टैग्स और लोकेल डिटेक्शन प्रदान करता है, और केवल यही कुछ पेजों वाली कंटेंट साइटों के लिए इसे उचित ठहराता है। इसकी सीमा प्रति-लोकेल कैटलॉग है: लगभग दस पेजों के बाद SSR पेलोड हर रूट की कॉपी ले जाता है। यदि आपका मामला ऐसा है, तो या तो प्रति-रूट मैसेजेस के साथ `vue-i18n` को मैन्युअली वायर करें, या स्कोप्ड कंटेंट पर जाएँ। [Nuxt i18n पोस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/nuxt.md) पहले रूटिंग रणनीति के चुनाव के बारे में बताती है।

</Accordion>
<Accordion header="ट्रांसलेशन किसी TMS या ICU डिलीवर करने वाली एजेंसी से आते हैं">

`vue-i18n` का प्लूरल सिंटैक्स (`"no item | one item | {count} items"`) ICU नहीं है और पोर्टेबल नहीं है। अनुवादकों को इसके बारे में सूचित करना होगा, और एक TMS एक्सपोर्ट इसे प्रोड्यूस नहीं करेगा। या तो पहला कैटलॉग बनने से पहले फॉर्मेट पर सहमत हों, या ऐसी लाइब्रेरी चुनें जिसका फॉर्मेट आपके वेंडर से मेल खाता हो। Intlayer का ICU समर्थन आंशिक है, इसलिए यदि आपको आज ICU स्ट्रिंग्स प्राप्त होती हैं, तो इसे भी एक बाधा मानें।

</Accordion>
<Accordion header="बड़ा ऐप, कई रूट्स, बंडल या SSR पेलोड बजट">

बिल्ड टाइम पर कंपाइल किए गए स्कोप्ड कंटेंट को प्राथमिकता दें। Paraglide ट्री-शेकिंग के ज़रिए वहाँ पहुँचता है, जो Vite पर विज्ञापित रूप से काम करता है। Intlayer प्रति-कंपोनेंट घोषणाओं के ज़रिए वहाँ पहुँचता है और केवल वही भेजता है जो रूट रेंडर करता है। `vue-i18n` के साथ, आप मैसेजेस को रूट के अनुसार मैन्युअली विभाजित कर सकते हैं, लेकिन कोई भी इसे लागू नहीं करता है और एक ग्लोबल नेमस्पेस को इम्पोर्ट करने वाला शेयर्ड कंपोनेंट इसे चुपचाप पूर्ववत कर देता है।

</Accordion>
<Accordion header="टाइप सुरक्षा गैर-परक्राम्य है">

`vue-i18n` को `createI18n` में एक स्कीमा जेनेरिक पास करके टाइप किया जा सकता है। यह काम करता है, और जैसे ही कैटलॉग लेज़ी लोड होते हैं, यह टूट जाता है, क्योंकि स्कीमा उन मैसेजेस का वर्णन करती है जो शायद अभी तक वहाँ नहीं हैं। यदि आप इसे बनाए नहीं रखना चाहते हैं, तो ऐसी लाइब्रेरी चुनें जिसके टाइप्स कंटेंट से जेनरेट होते हैं: Paraglide या Intlayer। [लापता अनुवादों का पता लगाना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md) पोस्ट तुलना करती है कि प्रत्येक बिल्ड टाइम पर क्या पकड़ता है।

</Accordion>
<Accordion header="कंटेंट UI लेबल्स से अधिक है">

मार्कडाउन पेज, बीच में `<RouterLink>` वाले वाक्य, प्रति-लोकेल कंपोनेंट्स। `vue-i18n` में कंपोनेंट इंटरपोलेशन के लिए `<i18n-t>` है, जो काम करता है और वर्बोज़ है। Intlayer के कंटेंट नोड्स मार्कडाउन, HTML और नेस्टेड ऑब्जेक्ट्स को सीधे स्वीकार करते हैं, जो ऐप के कंटेंट-हैवी होने पर बेहतर फिट बैठता है।

</Accordion>
<Accordion header="अनुवाद AI द्वारा तैयार किए जाएंगे">

तब केंद्रीकृत JSON के पास इसे उचित ठहराने के लिए कोई कंज्यूमर नहीं बचता है। कोलोकेटेड कंटेंट और छूटे हुए लोकेल्स को भरने वाला एक CLI छोटा रास्ता है। Intlayer का `fill` कमांड आपकी अपनी API की (OpenAI, Anthropic, Mistral, Gemini) के विरुद्ध चलता है और केवल वही पुनः अनुवादित करता है जो बदला है।

</Accordion>
</AccordionGroup>

## प्रत्येक लाइब्रेरी कहाँ कम पड़ती है

- **`vue-i18n`**: इस सेट में सबसे भारी, खुद का प्लूरल फॉर्मेट, टाइप्स ऑप्ट-इन हैं और लेज़ी लोडिंग के साथ नाजुक हैं, कोई प्रति-रूट स्कोपिंग नहीं है, डेड कीज़ चुपचाप जमा होती रहती हैं। Vue 3 ऐप में `legacy: true` छोड़ने से Vue 2 कम्पैटिबिलिटी लेयर बनी रहती है और `useI18n()` टाइपिंग खो जाती है।
- **`@nuxtjs/i18n`**: ऊपर दी गई हर चीज़ को इनहेरिट करता है, और एक दर्जन से अधिक रूट्स होने पर SSR पेलोड हर पेज के स्ट्रिंग्स को ले जाता है।
- **`fluent-vue`**: अच्छा मैसेज सिंटैक्स, कोई की टाइप्स नहीं, और Vite प्लगइन सभी भाषाओं के सभी कंटेंट को हर पेज में लोड करता है। बेंचमार्क में सबसे भारी।
- **Paraglide**: जेनरेट की गई फ़ाइलें रेपो में कमिट की जाती हैं, हर पुश से पहले रीजेनरेशन, और लोकेल को रिएक्टिव स्टोर के बजाय प्रत्येक मैसेज कॉल पर कुकी या स्टोरेज से पढ़ा जाता है, जिससे लोकेल बदलने पर अतिरिक्त काम होता है।
- **Intlayer**: अनिवार्य बिल्ड प्लगइन, छोटा इकोसिस्टम, आंशिक ICU समर्थन, और डिज़ाइन द्वारा पूरे कोडबेस में फैला हुआ कंटेंट, इसलिए अनुवादक के लिए एक JSON एक्सपोर्ट करने के लिए टूलिंग की आवश्यकता होती है।

## प्रत्येक विकल्प कोड में कैसा दिखता है

वही कंपोनेंट, शीर्षक और प्लूरल के साथ एक कार्ट समरी, प्रत्येक उम्मीदवार के साथ लिखा गया है। दिलचस्प हिस्सा टेम्पलेट नहीं है, बल्कि यह है कि कंटेंट कहाँ रहता है और `vue-tsc` इसके बारे में क्या जानता है।

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="अंग्रेज़ी">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="फ़्रेंच">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="स्पेनिश">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

पाइप-सेपरेटेड प्लूरल्स vue-i18n का अपना फॉर्मेट है, ICU नहीं। `t` किसी भी स्ट्रिंग को स्वीकार करता है जब तक कि आप `createI18n` को एक मैसेज स्कीमा जेनेरिक पास न करें।

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="अंग्रेज़ी">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="फ़्रेंच">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="स्पेनिश">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

Fluent का सिंटैक्स प्लूरल्स और व्याकरणिक वेरिएंट्स को अच्छी तरह से संभालता है। मैसेज आईडी अनटाइप्ड स्ट्रिंग्स हैं, और Vite प्लगइन हर लोकेल को हर पेज में बंडल करता है।

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="अंग्रेज़ी">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="फ़्रेंच">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="स्पेनिश">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

प्रत्येक मैसेज एक जेनरेट किया गया, टाइप्ड फंक्शन है, इसलिए छूटी हुई की (missing key) एक इम्पोर्ट एरर बन जाती है। `paraglide/` फ़ोल्डर आपके रेपो में जेनरेट होता है और हर बदलाव पर रीजेनरेट होता है।

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

सभी लोकेल्स कंपोनेंट के बगल में एक ही फ़ाइल में। टाइप्स बिल्ड पर जेनरेट होते हैं, इसलिए `title` ऑटो-कम्प्लीट होता है और टाइपो होने पर `vue-tsc` फेल हो जाता है। `<title />` एक ऐसा नोड रेंडर करता है जिसे विज़ुअल एडिटर टारगेट कर सकता है; `{{ items(props.count) }}` प्लेन स्ट्रिंग देता है।

  </Tab>
</Tabs>

पहले से ही `vue-i18n` पर हैं? [`@intlayer/vue-i18n` कम्पैटिबिलिटी एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/vue-i18n.md) बंडलर स्तर पर पैकेज को उपनाम (alias) देता है, ताकि `useI18n()`, `$t`, पाइप प्लूरल्स और `v-t` काम करते रहें जबकि Intlayer कंटेंट सर्व करता है। [माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_vue-i18n_to_intlayer.md) बाद में एडेप्टर से हटने को कवर करती है, और एक [Nuxt-विशिष्ट गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_nuxtjs_i18n_to_intlayer.md) भी है।

## निर्णय लेने से पहले

एक फीचर टेबल आपको बताती है कि लाइब्रेरी आज क्या करती है। ये बिंदु आपको बताते हैं कि इसके साथ काम करना कैसा रहेगा।

**रिपॉजिटरी गतिविधि की जाँच करें।**

कमिट्स, इश्यू रिस्पॉन्स टाइम, और क्या पिछला माइनर रिलीज़ इसी साल हुआ था। बिना मेंटेनर के एक अच्छा डिज़ाइन भविष्य के माइग्रेशन का इंतज़ार है।

**npm डाउनलोड्स के आधार पर चयन न करें।**

सबसे अधिक इंस्टॉल की गई लाइब्रेरी वह है जो सबसे पहले आई थी, न कि वह जो 2026 के Vue कोडबेस के लिए उपयुक्त है। डाउनलोड्स इतिहास को मापते हैं, उपयुक्तता को नहीं।

![JavaScript i18n लाइब्रेरीज़ की टियर लिस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**पूछें कि मेंटेनर को कौन भुगतान करता है, और वे क्या बेचते हैं।**

`vue-i18n` को Crowdin द्वारा समर्थित किया गया है, जैसे `next-intl` और `svelte-i18n` को। `i18next` को Locize द्वारा समर्थन प्राप्त है। Tolgee, Paraglide (inlang) और Intlayer प्रत्येक अपना प्लेटफ़ॉर्म चलाते हैं। एक वेंडर जिसका राजस्व होस्टेड अनुवाद है, उसके पास आपके टूलचेन के अंदर अनुवाद को मुफ़्त बनाने का बहुत कम कारण है। Intlayer इस सेट में एकमात्र ऐसा है जो आपकी अपनी API की के साथ CLI के माध्यम से AI अनुवाद प्रदान करता है, और एक CMS जिसे आप स्वयं होस्ट कर सकते हैं।

**क्या यह AI-एजेंट के लिए तैयार है?**

एजेंट अभी भी i18n के साथ संघर्ष करते हैं: वे लोकेल्स भूल जाते हैं, मनगढ़ंत कीज़ बनाते हैं, और मैसेज सिंटैक्स मिला देते हैं। क्या लाइब्रेरी [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md) या एक [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md) प्रदान करती है ताकि एजेंट कंटेंट को लिस्ट, फ़िल और टेस्ट कर सके? और क्या कंटेंट लोडिंग डिफ़ॉल्ट रूप से अनुकूलित है, या किसी को हर तिमाही में नेमस्पेस और लेज़ी इम्पोर्ट्स की समीक्षा करनी होगी?

**आउट-ऑफ-द-बॉक्स टाइप सुरक्षा।**

"अतिरिक्त वायरिंग के साथ टाइप किया जा सकता है" ऐसा नहीं, बल्कि "एक गलत की पर फ्रेश इंस्टॉल पर `tsc` फेल हो जाता है"। जाँचें कि अस्तित्वहीन की के साथ क्या होता है, और ऐसे लोकेल के साथ क्या होता है जिसमें एक अनुवाद छूट गया है।

**अप्रयुक्त सामग्री (unused content) का पता लगाना।**

कैटलॉग केवल बढ़ते हैं। Intlayer का बिल्ड अप्रयुक्त फ़ील्ड्स को हटा देता है (purge) और उन्हें लॉग करता है (`build.purge`)। Paraglide आर्किटेक्चर के माध्यम से वहाँ पहुँचता है, क्योंकि एक अनकॉल्ड मैसेज फंक्शन ट्री-शेक हो जाता है। बाकी सब कुछ सफाई का काम आप पर छोड़ देते हैं।

**डेवलपर अनुभव (Developer experience)।**

पहले ट्रांसलेटेड स्ट्रिंग तक सेटअप का समय, एक [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md) या [VS Code एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) जो होवर पर अनुवाद दिखाता है और डिक्लेरेशन पर कूदता है, फ़िल, टेस्ट और पुश के लिए एक [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md), आपके कंपोनेंट्स से हार्ड-कोडेड स्ट्रिंग्स निकालने वाला एक [कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) या एक्सट्रैक्टर ताकि हर स्ट्रिंग को कुंजी-दर-कुंजी प्रबंधित न करना पड़े, और गैर-डेवलपर्स के लिए पुल रिक्वेस्ट के बिना कंटेंट को एडिट करने का एक तरीका ([विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) या [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md))।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या vue-i18n अभी भी 2026 में सही डिफ़ॉल्ट है?">

अधिकांश Vue ऐप्स के लिए, हाँ। इकोसिस्टम सबसे बड़ा है, दस्तावेज़ीकरण विस्तृत है, और लागतें अनुमानित हैं: एक भारी रनटाइम, एक कस्टम प्लूरल फॉर्मेट, और प्रति-रूट स्कोपिंग जिसे आपको स्वयं बनाना और प्रबंधित करना होगा।

</Question>

<Question title="क्या मुझे @nuxtjs/i18n का उपयोग करना चाहिए या Nuxt में मैन्युअली vue-i18n को वायर करना चाहिए?">

मॉड्यूल का उपयोग करें जब तक कि आपकी रूटिंग असामान्य न हो या आपके ऐप में बहुत कम पेज न हों। मैन्युअल रूप से वायरिंग करने का अर्थ है लोकेल रूट्स, मिडलवेयर, `hreflang` और साइटमैप को स्वयं फिर से बनाना, और वे जितने दिखते हैं उससे अधिक जटिल होते हैं।

</Question>

<Question title="क्या मुझे कंपाइलर-आधारित लाइब्रेरी की आवश्यकता है?">

केवल तभी जब बंडल साइज़, SSR पेलोड, जेनरेटेड टाइप्स या बिल्ड-टाइम मिसिंग-की चेक्स वास्तविक आवश्यकताएं हों। [कंपाइलर बनाम डिक्लेरेटिव i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md) पोस्ट बताती है कि कंपाइलर आपको क्या देते हैं और वे कहाँ गलत हो सकते हैं।

</Question>

<Question title="क्या लाइब्रेरी का चुनाव SEO को प्रभावित करता है?">

अप्रत्यक्ष रूप से। क्रॉलर्स रूटिंग, `hreflang`, `<html lang>` की परवाह करते हैं और क्या टेक्स्ट सर्वर-रेंडर किए गए HTML में मौजूद है। [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md) देखें।

</Question>

</FAQ>

## आगे पढ़ें

- [Vue i18n बेंचमार्क: बंडल साइज़, लीकेज और लोकेल-स्विच टाइमिंग्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/vue.md)
- [Vue i18n: vue-i18n कैसे काम करता है और कहाँ समस्या आती है](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/vue.md) और [Nuxt i18n पोस्ट](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/list_i18n_technologies/frameworks/nuxt.md)
- [vue-i18n बनाम Intlayer, फीचर दर फीचर](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/vue-i18n_vs_intlayer.md) और [vue-i18n बनाम Intlayer बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/vue-i18n_vs_intlayer_benchmark.md)
- [क्या vue-i18n पुराना हो चुका है?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/is_vue-i18n_outdated.md)
- [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)
- [कंपाइलर बनाम डिक्लेरेटिव i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)
- [प्रति-कंपोनेंट बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)
- [Vite + Vue ऐप में i18n सेट अप करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+vue.md) और एक [Nuxt ऐप में](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nuxt.md)
- यही गाइड [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_react_i18n_library.md), [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_svelte_i18n_library.md) और [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_solid_i18n_library.md) के लिए
