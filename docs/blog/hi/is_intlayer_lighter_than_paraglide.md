---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: क्या Intlayer, Paraglide से हल्का है?
description: Paraglide i18n बेंचमार्क में लगभग शून्य भार वाला प्रतीत होता है क्योंकि इसका कोड सीधे आपके रिपॉजिटरी में जेनरेट होता है। जानिए यह वजन वास्तव में कहाँ जाता है, प्रति-नोड लोकेल पढ़ना प्रदर्शन को कैसे प्रभावित करता है, और Intlayer का डायनामिक लोडिंग सभी के बजाय केवल एक लोकेल कैसे लोड करता है।
keywords:
  - Paraglide
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# क्या Intlayer, Paraglide से हल्का है?

हाँ।

`Paraglide` सबसे हल्के i18n समाधान के रूप में जाना जाता है, और पहली नज़र में [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) भी इससे सहमत दिखता है: इसका लाइब्रेरी साइज शून्य के करीब है। लेकिन शून्य लाइब्रेरी साइज का मतलब यह नहीं है कि ब्राउज़र को शून्य बाइट भेजे गए हैं। इसका सीधा सा मतलब है कि बाइट्स ऐसी जगह मौजूद हैं जहाँ यह मेट्रिक ध्यान नहीं देती।

<TOC/>

## मुख्य निष्कर्ष

**लाइब्रेरी का आकार छिपा हुआ है, समाप्त नहीं हुआ:**

Paraglide अपने रनटाइम और मैसेज फ़ंक्शंस को सीधे आपके कोडबेस में जेनरेट करता है। वह कोड ब्राउज़र में भेजा जाता है, लेकिन उसे लाइब्रेरी के कोड के बजाय _आपके_ कोड के रूप में गिना जाता है।

**बिना प्रोवाइडर के होना मुफ्त का लाभ नहीं है:**

प्रत्येक `m.my_key()` कॉल लोकेल को अपने दम पर हल करता है, संदर्भ (context) से एक बार पढ़ने के बजाय रेंडर किए गए प्रत्येक नोड के लिए कुकी या स्टोरेज को पढ़ता है।

**कोई डायनामिक लोडिंग नहीं:**

Paraglide किसी मैसेज के सभी लोकेल्स को आपके क्लाइंट बंडल में इम्पोर्ट करता है। जबकि Intlayer `importMode: 'dynamic'` या `'fetch'` के साथ केवल उसी लोकेल को लोड करता है जो रेंडर हो रहा है।

**Tree shaking की गारंटी नहीं है:**

हमारे कुछ बेंचमार्क में, Paraglide का विज्ञापित Tree shaking काम नहीं कर सका। अपने स्वयं के बंडल की जाँच अवश्य करें।

## Paraglide का वजन वास्तव में कहाँ जाता है?

बेंचमार्क रिपोर्ट में, "लाइब्रेरी साइज" मेट्रिक किसी भी सामग्री को जोड़ने से पहले, खाली कंपोनेंट में प्रत्येक i18n लाइब्रेरी के प्रोवाइडर और हुक्स को मापती है।

| लाइब्रेरी (TanStack Start)    | लाइब्रेरी साइज (gz) | लाइब्रेरी साइज (min) |
| ----------------------------- | ------------------- | -------------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB              | 4.5 KB               |
| `react-intlayer@9.5.1`        | 5.0 KB              | 15.2 KB              |

अलग से देखने पर Paraglide जीतता हुआ दिखता है। लेकिन Paraglide एक कंपाइलर है: यह आपकी `messages/*.json` फ़ाइलों को पढ़ता है और आपके रिपॉजिटरी में एक `paraglide/` फ़ोल्डर लिखता है, जिसमें एक `runtime.js` (लोकेल डिटेक्शन, कुकी और स्टोरेज रणनीतियाँ, URL स्थानीयकरण) और प्रति मैसेज एक जावास्क्रिप्ट फ़ंक्शन शामिल होता है।

```bash
src/paraglide/
├── runtime.js      # लोकेल डिटेक्शन, रणनीतियाँ, URL हेल्पर्स
├── server.js
├── messages.js     # सभी संदेशों को पुनः निर्यात करता है
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

चूँकि यह कोड आपके `src/` फ़ोल्डर में रहता है और आप इसे रिलेटिव पाथ से इम्पोर्ट करते हैं, इसलिए बंडलर इसे `node_modules` पैकेज के बजाय आपके एप्लिकेशन का हिस्सा मानता है। लाइब्रेरी साइज कॉलम में लगभग कुछ भी दिखाई नहीं देता, जबकि वही लॉजिक आपके पेज बंडल में भेजा जाता है।

कोड जेनरेट करना अपने आप में कोई बुरा विचार नहीं है: जेनरेट किया गया रनटाइम केवल वही लॉजिक शामिल करता है जिसकी आपके कॉन्फ़िगरेशन को आवश्यकता होती है (प्रीफ़िक्स रणनीति, कुकी बनाम लोकल स्टोरेज, आदि)। Intlayer बिल्ड समय पर एनवायरनमेंट वेरिएबल्स इंजेक्ट करके अलग तरीके से यही परिणाम प्राप्त करता है, जिससे बंडलर उन शाखाओं को हटा देता है जिनका आपका कॉन्फ़िगरेशन उपयोग नहीं करता है। दोनों ही दृष्टिकोण `i18next` या `next-intl` की तुलना में 3 से 10 गुना हल्के साबित होते हैं।

इसलिए निष्पक्ष तुलना लाइब्रेरी साइज की नहीं है। यह **प्रति पेज वास्तव में भेजे गए जावास्क्रिप्ट** की है।

## मापा गया पेज वजन

TanStack Start ऐप, 10 पेज, `en` और `fr` रूट्स पर मापा गया, gzip संपीड़न:

| सेटअप                              | पेज JS औसत (gz) | बेस से अधिक | लोकेल लीकेज | अन्य पेज लीकेज |
| ---------------------------------- | --------------- | ----------- | ----------- | -------------- |
| बेस (कोई i18n नहीं)                | 111.0 KB        | -           | 0.0%        | 0.0%           |
| `paraglide` (कोई भी रणनीति)        | 125.1 KB        | +14.1 KB    | 49.7%       | 0.0%           |
| `intlayer` (`importMode: static`)  | 125.8 KB        | +14.8 KB    | 50.0%       | 0.0%           |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**    | **+7.6 KB** | **0.0%**    | **0.0%**       |

Next.js 16 App Router, समान ऐप:

| सेटअप               | पेज JS औसत (gz) | बेस से अधिक |
| ------------------- | --------------- | ----------- |
| बेस (कोई i18n नहीं) | 141.0 KB        | -           |
| `paraglide-next`    | 155.3 KB        | +14.3 KB    |
| `next-intlayer`     | **141.3 KB**    | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> संपूर्ण डेटा [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) और [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) में उपलब्ध है। प्रत्येक बंडल का निरीक्षण [बेंचमार्क रिपॉजिटरी](https://github.com/intlayer-org/benchmark-i18n) में किया जा सकता है।

दो बातें स्पष्ट रूप से सामने आती हैं:

- `static` मोड में, Intlayer व्यावहारिक रूप से Paraglide के समान ही सामग्री भेजता है (125.8 KB बनाम 125.1 KB)। यह अपेक्षित है: दोनों में उस पेज द्वारा उपयोग किए जाने वाले संदेशों के सभी लोकेल शामिल होते हैं।
- Paraglide किसी भी रणनीति में 125.1 KB पर बना रहता है, क्योंकि इसमें कोई डायनामिक मोड नहीं है। ऊपर दी गई तालिका की प्रत्येक पंक्ति इसके स्थिर मोड का प्रतिनिधित्व करती है।

## कोई प्रोवाइडर नहीं: एक विचार जो अच्छा दिखता है पर है नहीं

Paraglide को किसी प्रोवाइडर की आवश्यकता नहीं होती। आप सीधे मैसेज इम्पोर्ट करते हैं और कॉल करते हैं:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

कोई संदर्भ नहीं, कोई रैपर नहीं, कोई हुक नहीं। यह सरल दिखता है। लेकिन लोकेल की जानकारी कहीं से तो आनी ही चाहिए। प्रत्येक जेनरेट किया गया मैसेज फ़ंक्शन लगभग ऐसा दिखता है (सरलीकृत):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // प्रत्येक कॉल पर हल किया जाता है

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...प्रत्येक लोकेल के लिए एक ब्रांच
};
```

और `getLocale()` वर्तमान लोकेल खोजने के लिए कॉन्फ़िगर की गई रणनीतियों (कुकी, लोकल स्टोरेज, URL, बेस लोकेल) को स्कैन करता है। इसलिए आपके द्वारा रेंडर किया जाने वाला प्रत्येक टेक्स्ट नोड (`<>{m.my_key()}</>`) अपना स्वयं का लोकेल रिज़ॉल्यूशन चलाता है, जिसमें ब्राउज़र में `document.cookie` पढ़ना भी शामिल है। 200 अनुवादित स्ट्रिंग्स वाला एक पेज प्रति रेंडर 200 बार लोकेल हल करता है, और प्रत्येक री-रेंडर पर इसे दोहराता है।

एक प्रोवाइडर-आधारित लाइब्रेरी लोकेल को **केवल एक बार** पढ़ती है, इसे एक संदर्भ (या सिग्नल, या स्टोर) में संग्रहीत करती है, और प्रत्येक नोड मेमोरी में पहले से मौजूद मान को पढ़ता है। प्रोवाइडर का आकार कुछ सौ बाइट्स का होता है। इसे छोड़ने पर प्रत्येक रेंडर में सीपीयू की खपत होती है, जो बेंचमार्क में स्पष्ट दिखाई देता है: TanStack Start पर Paraglide का पेज लोड और भाषा बदलने का समय Intlayer से लगातार पीछे रहता है (पेज लोड में 22.1 ms बनाम 14.6 ms, E2E प्रतिक्रिया में 4.3 ms बनाम 3.2 ms)।

## डेवलपर अनुभव (DX)

Paraglide का सोर्स ऑफ ट्रुथ JSON है, लेकिन आप सीधे JSON को कभी इम्पोर्ट नहीं करते हैं। आप कंपाइलर द्वारा जेनरेट की गई `.js` फ़ाइल को इम्पोर्ट करते हैं:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/hi.json"
{
  "hero_title": "अपने ऐप को हर भाषा में प्रकाशित करें"
}
```

```tsx fileName="Hero.tsx"
// कंपाइलर द्वारा JSON से पुनः उत्पन्न किए जाने के बाद ही मौजूद होता है
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      hi: "अपने ऐप को हर भाषा में प्रकाशित करें",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

इस कार्यप्रणाली की अपनी कमियां हैं:

- JSON फ़ाइल में प्रत्येक परिवर्तन के लिए इम्पोर्ट के रिज़ॉल्व होने या प्रकारों के अपडेट होने से पहले पुनः जेनरेशन की आवश्यकता होती है।
- जेनरेट किया गया `paraglide/` फ़ोल्डर या तो गिट में कमिट किया जाना चाहिए (जिससे टेक्स्ट बदलने वाले प्रत्येक पीआर में जेनरेट की गई फ़ाइलों पर मर्ज टकराव होता है), या इसे अनदेखा किया जाना चाहिए (जिसके लिए प्रत्येक टाइप चेक, टेस्ट और सीआई जॉब से पहले एक जेनरेशन चरण की आवश्यकता होती है)।
- प्रत्येक स्ट्रिंग एक फ़ंक्शन कॉल बन जाती है। स्थिरांक हर जगह `m.key()` में बदल जाते हैं, यहाँ तक कि उन स्थानों पर भी जहाँ एक साधारण स्ट्रिंग मान पर्याप्त होता।

## Tree Shaking: अपना बंडल जांचें

Paraglide का मुख्य वादा यह है कि अप्रयुक्त संदेशों को Tree shaking द्वारा हटा दिया जाता है, क्योंकि प्रत्येक संदेश अपना स्वयं का निर्यात होता है। Svelte + Vite बेंचमार्क में, यह विज्ञापनों के अनुसार काम करता है।

अन्य सेटअपों में ऐसा नहीं हुआ। हमारे [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) परीक्षण में, Paraglide के पेज बेस ऐप से 14 KB अधिक भारी थे, जबकि `next-intlayer` ने केवल 0.3 KB जोड़ा। TanStack Start पर पहले के परीक्षणों से यह भी पता चला कि अन्य पेजों के संदेश भी वर्तमान रूट बंडल में शामिल हो रहे थे।

Tree shaking आपके बंडलर (Turbopack, Rolldown, Rollup), संदेशों को आयात करने के तरीके (`import { m }` बनाम `import * as m`) और साइड-इफेक्ट विश्लेषण पर निर्भर करता है। यदि आप इसके आकार के कारण Paraglide चुनते हैं, तो अपने बंडल विज़ुअलाइज़र को खोलें और सत्यापित करें कि यह आपके ऐप में सही काम कर रहा है या नहीं।

## कोई डायनामिक लोडिंग नहीं

यह संरचनात्मक सीमा है। Paraglide के पास एक समय में एक लोकेल लोड करने का कोई साधन नहीं है: प्रत्येक संदेश फ़ंक्शन प्रत्येक भाषा के कार्यान्वयन को स्थैतिक रूप से आयात करता है, इसलिए सभी भाषाएं आपके क्लाइंट बंडल में समाप्त हो जाती हैं।

2 भाषाओं के साथ, आपका आधा अनुवाद पेलोड बर्बाद हो जाता है, जो ऊपर मापे गए ~50% लोकेल रिसाव से मेल खाता है। 10 भाषाओं के साथ, 90% पेलोड बर्बाद होता है। 30 भाषाओं के साथ, 97%।

डायनामिक लोडिंग पर स्विच करने से भी इसका समाधान नहीं होगा: प्रति संदेश एक फ़ंक्शन होने के कारण, प्रत्येक फ़ंक्शन को लेज़ी-लोड करने का अर्थ हजारों नेटवर्क अनुरोध होगा।

Intlayer आपको विश्व स्तर पर या प्रति डिक्शनरी चुनने की सुविधा देता है:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | क्लाइंट को क्या भेजा जाता है                           | Paraglide की तुलना में             |
| ------------ | ------------------------------------------------------ | ---------------------------------- |
| `static`     | पेज द्वारा उपयोग की जाने वाली डिक्शनरी के सभी लोकेल्स  | सैद्धांतिक रूप से समान सामग्री     |
| `dynamic`    | केवल वर्तमान लोकेल, प्रति डिक्शनरी लेज़ी-लोड किया गया  | N भाषाओं में **N गुना अधिक हल्का** |
| `fetch`      | केवल वर्तमान लोकेल, Live Sync API के माध्यम से प्राप्त | N भाषाओं में **N गुना अधिक हल्का** |

[बिल्ड ट्रांसफ़ॉर्मेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और `importMode: 'static'` के साथ, Intlayer सैद्धांतिक रूप से Paraglide के समान ही सामग्री लोड करता है। `'dynamic'` या `'fetch'` के साथ, यह केवल वही लोड करता है जिसकी वर्तमान लोकेल को आवश्यकता होती है: N भाषाओं वाले ऐप के लिए, अनुवाद पेलोड Paraglide की तुलना में N गुना छोटा होता है।

## Paraglide कहाँ अभी भी उपयुक्त है

<AccordionGroup>
<Accordion header="कम भाषाओं के साथ Svelte + Vite">

यदि आपका स्टैक Vite के साथ Svelte है और आप दो या तीन भाषाओं का समर्थन करते हैं, तो Tree shaking विज्ञापनों के अनुसार काम करता है और लोकेल का ओवरहेड छोटा रहता है।

</Accordion>
<Accordion header="मौजूदा inlang वर्कफ़्लो">

यदि आपकी टीम पहले से ही inlang पारिस्थितिकी तंत्र (Fink, Sherlock, मैसेज फॉर्मेट प्लगइन्स) का उपयोग करती है, तो Paraglide इसके साथ मूल रूप से एकीकृत होता है।

</Accordion>
</AccordionGroup>

## अपने ऐप पर इसे आज़माएं

मुफ़्त [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) के साथ अपने लाइव एप्लिकेशन के पेलोड और लोकेल लीकेज की जाँच करें:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Intlayer सेट अप करने के लिए:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

## अतिरिक्त संदर्भ

- [TanStack Start i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md)
- [Next.js i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md)
- [बंडल अनुकूलन और `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)
- [React i18n लाइब्रेरी कैसे चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/how_to_pick_react_i18n_library.md)
- [कंपाइलर-संचालित अंतर्राष्ट्रीयकरण के पक्ष और विपक्ष](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)
