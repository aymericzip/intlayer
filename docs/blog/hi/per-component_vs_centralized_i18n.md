---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: प्रति-कम्पोनेंट बनाम केंद्रीकृत i18n: Intlayer के साथ एक नया दृष्टिकोण
description: React में internationalization रणनीतियों का गहन विश्लेषण — centralized, per-key और per-component approaches की तुलना, तथा Intlayer का परिचय।
keywords:
  - i18n
  - React
  - Internationalization
  - Intlayer
  - Optimization
  - Bundle Size
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# प्रति-कम्पोनेंट बनाम केंद्रीकृत i18n

प्रति-कम्पोनेंट दृष्टिकोण एक नया अवधारणा नहीं है। उदाहरण के लिए, Vue इकोसिस्टम में, `vue-i18n` [SFC i18n (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html) का समर्थन करता है। Nuxt भी [प्रति-कम्पोनेंट अनुवाद](https://i18n.nuxtjs.org/docs/guide/per-component-translations) प्रदान करता है, और Angular अपने [Feature Modules](https://v17.angular.io/guide/feature-modules) के माध्यम से एक समान पैटर्न का उपयोग करता है।

यहाँ तक कि एक Flutter एप में भी, हम अक्सर इस पैटर्न को पा सकते हैं:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- अनुवाद यहीं रहते हैं
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

हालाँकि, React दुनिया में, हम मुख्य रूप से विभिन्न दृष्टिकोण देखते हैं, जिन्हें मैं तीन श्रेणियों में समूहीकृत करूँगा:

<Columns>
  <Column>

**केंद्रित दृष्टिकोण** (i18next, next-intl, react-intl, lingui)

- (namespace के बिना) सामग्री प्राप्त करने के लिए एकल स्रोत मानता है। डिफ़ॉल्ट रूप से, जब आपका ऐप लोड होता है तो आप सभी पृष्ठों से सामग्री लोड कर लेते हैं।

  </Column>
  <Column>

**ग्रैन्युलर अप्रोच** (intlayer, inlang)

- सामग्री पुनःप्राप्ति को प्रति-कुंजी या प्रति-कॉम्पोनेंट के स्तर पर फाइन-ग्रेन करें।

  </Column>
</Columns>

> इस ब्लॉग में, मैं compiler-based समाधानों पर ध्यान नहीं दूँगा, जिन्हें मैंने पहले यहाँ कवर किया है: [Compiler vs Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md).
> ध्यान दें कि compiler-based i18n (उदा., Lingui) केवल सामग्री के extraction और loading को स्वचालित करता है। आंतरिक रूप से, इनके पास अक्सर अन्य approaches की जैसी ही सीमाएँ होती हैं।

> ध्यान दें कि जितना अधिक आप अपनी सामग्री को फाइन-ग्रेन तरीके से पुनःप्राप्त करते हैं, उतना ही अधिक आप अपने कॉम्पोनेंट्स में अतिरिक्त state और logic जोड़ने का जोखिम उठाते हैं।

ग्रैन्युलर approaches केंद्रीकृत (centralized) approaches की तुलना में अधिक लचीली होती हैं, लेकिन अक्सर यह एक tradeoff होता है। भले ही उन लाइब्रेरीज़ द्वारा "tree shaking" का दावा किया जाता हो, व्यवहार में अक्सर आप हर भाषा में एक पेज लोड करते हुए ही समाप्त होते हैं।

तो, मोटे तौर पर, निर्णय इस तरह टूटता है:

- यदि आपके एप्लिकेशन में भाषाओं की तुलना में पेज अधिक हैं, तो आपको granular approach को प्राथमिकता देनी चाहिए।
- यदि आपके पास पृष्ठों की तुलना में भाषाएँ अधिक हैं, तो आपको centralized approach की ओर झुकना चाहिए।

बेशक, लाइब्रेरी के लेखक इन सीमाओं से अवगत हैं और वर्कअराउंड प्रदान करते हैं।
इनमें से कुछ: namespaces में विभाजन, डायनामिक रूप से JSON फाइलें लोड करना (`await import()`), या बिल्ड टाइम पर कंटेंट को purge करना।

साथ ही, आपको यह जानना चाहिए कि जब आप अपना कंटेंट डायनामिक रूप से लोड करते हैं, तो आप अपने सर्वर पर अतिरिक्त अनुरोध जोड़ देते हैं। हर अतिरिक्त `useState` या hook का मतलब एक अतिरिक्त सर्वर अनुरोध होता है।

> इस बिंदु को ठीक करने के लिए, Intlayer सुझाव देता है कि कई कंटेंट परिभाषाओं को एक ही key के तहत समूहित किया जाए; Intlayer तब उन कंटेंट्स को मर्ज कर देगा।

लेकिन इन सभी समाधानों से स्पष्ट है कि सबसे लोकप्रिय तरीका केंद्रीकृत (centralized) ही है।

### तो केंद्रीकृत दृष्टिकोण इतना लोकप्रिय क्यों है?

- सबसे पहले, i18next वह पहला समाधान था जो व्यापक रूप से अपनाया गया, एक दर्शन का पालन करते हुए जो PHP और Java आर्किटेक्चर (MVC) से प्रेरित था और कड़े separation of concerns (content को code से अलग रखने) पर निर्भर करता है। यह 2011 में आया और Component-Based Architectures (जैसे React) की ओर बड़े बदलाव से पहले ही अपने मानक स्थापित कर चुका था।
- फिर, एक बार कोई लाइब्रेरी व्यापक रूप से अपनाई जाने के बाद, इकोसिस्टम को अन्य पैटर्न की ओर शिफ्ट करना मुश्किल हो जाता है।
- केंद्रीयकृत दृष्टिकोण का उपयोग Translation Management Systems जैसे Crowdin, Phrase, या Localized में चीज़ों को भी आसान बनाता है।
- per-component approach के पीछे की logic केंद्रीय दृष्टिकोण की तुलना में अधिक जटिल है और विकसित करने में अतिरिक्त समय लेती है, खासकर जब आपको यह पहचानने जैसी समस्याओं को हल करना हो कि content कहाँ स्थित है।

### ठीक है, लेकिन सिर्फ़ Centralized दृष्टिकोण पर क्यों न रहें?

Let me tell you why it can be problematic for your app:

- **अप्रयुक्त डेटा (Unused Data):**
  जब कोई पेज लोड होता है, तो अक्सर आप सभी अन्य पेजों की सामग्री भी लोड कर लेते हैं। (एक 10-पेज ऐप में, इसका मतलब है कि 90% सामग्री अनुपयोगी रूप से लोड होती है)। क्या आप किसी modal को lazy load करते हैं? i18n लाइब्रेरी के लिए फर्क नहीं पड़ता — वह पहले ही strings लोड कर लेती है।
- **प्रदर्शन (Performance):**
  हर re-render के लिए, आपके हर एक component को एक भारी JSON payload से hydrate किया जाता है, जो जैसे-जैसे आपका ऐप बढ़ता है उसकी प्रतिक्रियाशीलता (reactivity) को प्रभावित करता है।
- **रखरखाव (Maintenance):**
  बड़े JSON फाइलों का रखरखाव कष्टदायक है। किसी अनुवाद को जोड़ने के लिए आपको फाइलों के बीच कूदना पड़ता है, यह सुनिश्चित करते हुए कि कोई अनुवाद गायब न हो और कोई **orphan keys** पीछे न रह जाएँ।
- **डिज़ाइन-सिस्टम (Design-system):**
  यह design systems के साथ असंगति पैदा करता है (उदा., एक `LoginForm` कंपोनेंट) और विभिन्न apps में कॉम्पोनेंट के डुप्लिकेशन को सीमित कर देता है।

**"लेकिन हमने Namespaces का आविष्कार किया!"**

बिल्कुल, और यह एक बड़ा कदम आगे है। आइए Vite + React + React Router v7 + Intlayer सेटअप के मेन बंडल साइज की तुलना देखें। हमने एक 20-पेज एप्लिकेशन का सिमुलेशन किया।

पहला उदाहरण प्रति-लोकल lazy-loaded अनुवाद शामिल नहीं करता है और namespace splitting नहीं है। दूसरा content purging + dynamic loading के साथ अनुवाद दिखाता है।

| ऑप्टिमाइज़्ड बंडल                                                                                                                | अनऑप्टिमाइज़्ड बंडल                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![अनुकूलित नहीं किया गया बंडल](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![अनुकूलित बंडल](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Namespaces के कारण, हम इस संरचना से नीचे दी गई संरचना में आ गए:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

To this one:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

अब आपको बारीकी से यह प्रबंधित करना होगा कि आपके ऐप का कौन सा कंटेंट कब और कहाँ लोड किया जाना चाहिए। नतीजा, जटिलता के कारण अधिकांश प्रोजेक्ट इस हिस्से को छोड़ देते हैं (उदाहरण के लिए चुनौतियाँ देखने के लिए [next-i18next गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-i18next.md) देखें — जो सिर्फ़ अच्छी प्रथाओं का पालन करने से उत्पन्न होती हैं)।
परिणामस्वरूप, वे प्रोजेक्ट पहले बताई गई भारी JSON लोडिंग समस्या का सामना कर लेते हैं।

> ध्यान दें कि यह समस्या केवल i18next तक सीमित नहीं है, बल्कि ऊपर सूचीबद्ध सभी केंद्रीकृत approaches पर लागू होती है।

हालाँकि, मैं आपको यह याद दिलाना चाहता हूँ कि सभी granular approaches इसे हल नहीं करतीं। उदाहरण के लिए, `vue-i18n SFC` या `inlang` approaches स्वाभाविक रूप से प्रति-लोकैल के अनुसार translations को lazy load नहीं करतीं, इसलिए आप केवल bundle size की समस्या को किसी और समस्या से बदल देते हैं।

इसके अलावा, proper separation of concerns के बिना, translators के लिए अपने translations को निकालना और review के लिए प्रदान करना काफी मुश्किल हो जाता है।

### Intlayer का per-component approach इसे कैसे हल करता है

Intlayer कई चरणों में आगे बढ़ता है:

1. **Declaration:** अपनी सामग्री को अपने codebase में कहीं भी `*.content.{ts|jsx|cjs|json|json5|...}` फ़ाइलों का उपयोग करके Declare करें। इससे separation of concerns सुनिश्चित होती है जबकि content को colocated रखा जाता है। एक content फ़ाइल per-locale हो सकती है या multilingual।
2. **प्रोसेसिंग:** Intlayer एक बिल्ड स्टेप चलाता है ताकि JS लॉजिक को प्रोसेस किया जा सके, अनुपस्थित अनुवाद fallback को संभाला जा सके, TypeScript टाइप्स जनरेट किए जा सकें, डुप्लिकेट कंटेंट का प्रबंधन किया जा सके, आपके CMS से कंटेंट फ़ेच किया जा सके, और भी बहुत कुछ।
3. **पर्जिंग:** जब आपकी ऐप बिल्ड होती है, Intlayer अनयूज़्ड कंटेंट को पर्ज करता है (थोड़ा वैसा ही जैसे Tailwind आपके क्लासेज़ को मैनेज करता है) और कंटेंट को निम्नानुसार बदल देता है:

**घोषणा:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    hi: { title: "मेरा शीर्षक" },
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**प्रोसेसिंग:** Intlayer `.content` फ़ाइल के आधार पर डिक्शनरी बनाता है और जेनरेट करता है:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json
{
  "key": "my-key",
  "content": { "title": "My title" },
}
```

**प्रतिस्थापन:** Intlayer आपके एप्लिकेशन बिल्ड के दौरान आपके कंपोनेंट को रूपांतरित करता है।

**- स्टैटिक इम्पोर्ट मोड:**

```tsx
// JSX जैसी सिंटैक्स में कंपोनेंट का प्रतिनिधित्व
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        hi: { title: "मेरा शीर्षक" },
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- डायनामिक इम्पोर्ट मोड:**

```tsx
// JSX जैसी सिंटैक्स में कंपोनेंट का प्रतिनिधित्व
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // अन्य भाषाओं के लिए भी समान
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` एक Suspense-जैसी मैकेनिज़्म का उपयोग करता है ताकि स्थानीयकृत JSON केवल आवश्यकता पड़ने पर लोड हो।

**इस प्रति-कॉम्पोनेंट दृष्टिकोण के प्रमुख लाभ:**

- अपनी content घोषणा को अपने components के पास रखकर मेंटेनबिलिटी बेहतर होती है (उदा. किसी component को किसी अन्य app या design system में लेकर जाना)। Component फ़ोल्डर हटाने पर संबंधित content भी हट जाता है, जैसा कि आप शायद अपने `.test`, `.stories` के साथ पहले से करते हैं)

- प्रति-कम्पोनेंट दृष्टिकोण AI एजेंटों को आपकी सभी अलग-अलग फ़ाइलों में उछलने की आवश्यकता से बचाता है। यह सभी अनुवादों को एक ही स्थान पर रखता है, जिससे कार्य की जटिलता और उपयोग किए जाने वाले टोकन्स की मात्रा सीमित रहती है।

### सीमाएँ

बेशक, इस दृष्टिकोण के साथ कुछ समझौते आते हैं:

- अन्य l10n सिस्टम्स और अतिरिक्त टूलिंग से कनेक्ट करना कठिन हो जाता है।
- आप लॉक-इन हो जाते हैं (जो कि मूलतः किसी भी i18n समाधान के साथ पहले से ही होता है उनके विशिष्ट सिंटैक्स के कारण)।

यही कारण है कि Intlayer i18n के लिए एक संपूर्ण टूलसेट प्रदान करने का प्रयास करता है (100% फ्री और OSS), जिसमें आपके अपने AI Provider और API keys का उपयोग करके AI अनुवाद शामिल है। Intlayer यह भी टूलिंग प्रदान करता है ताकि आपका JSON सिंक्रोनाइज़ हो सके, जो ICU / vue-i18n / i18next संदेश फॉर्मेटर्स की तरह कार्य करता है ताकि सामग्री को उनके विशिष्ट फॉर्मैट्स में मैप किया जा सके।
