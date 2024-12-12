# Intlayer Configuration Documentation

## Overview

Intlayer configuración फ़ाइलों को प्लगइन के विभिन्न पहलुओं जैसे अंतर्राष्ट्रीयकरण, मिडलवेयर और सामग्री प्रबंधन को अनुकूलित करने की अनुमति देती है। इस दस्तावेज़ में कॉन्फ़िगरेशन में प्रत्येक प्रॉपर्टी का विस्तृत विवरण दिया गया है।

---

## Configuration File Support

Intlayer JSON, JS, MJS, और TS कॉन्फ़िगरेशन फ़ाइल प्रारूपों को स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Example config file

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

export default config;
```

```javascript
// intlayer.config.cjs

const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH],
  },
  content: {
    typesDir: "content/types",
  },
  middleware: {
    noPrefix: false,
  },
};

module.exports = config;
```

```json5
// .intlayerrc

{
  "internationalization": {
    "locales": ["en"],
  },
  "content": {
    "typesDir": "content/types",
  },
  "middleware": {
    "noPrefix": false,
  },
}
```

---

## Configuration Reference

निम्नलिखित अनुभागों में Intlayer के लिए उपलब्ध विभिन्न कॉन्फ़िगरेशन सेटिंग्स का वर्णन किया गया है।

---

### Internationalization Configuration

अंतर्राष्ट्रीयकरण से संबंधित सेटिंग्स को परिभाषित करता है, जिसमें उपलब्ध स्थानीयताएँ और अनुप्रयोग के लिए डिफ़ॉल्ट स्थानीयता शामिल हैं।

#### Properties

- **locales**:
  - _Type_: `string[]`
  - _Default_: `['en']`
  - _Description_: आवेदन में समर्थित स्थानीयताओं की सूची।
  - _Example_: `['en', 'fr', 'es']`
- **strictMode**:

  - _Type_: `string`
  - _Default_: `required_only`
  - _Description_: टाइपस्क्रिप्ट का उपयोग करके अंतर्राष्ट्रीयकरण की गई सामग्री के मजबूत कार्यान्वयन को सुनिश्चित करें।
  - _Note_: यदि "strict" पर सेट किया गया है, तो अनुवाद `t` फ़ंक्शन को प्रत्येक घोषित स्थानीयताओं को परिभाषित करने की आवश्यकता होगी। यदि कोई स्थानीयता गायब है, या यदि आपकी कॉन्फ़िगरेशन में कोई स्थानीयता घोषित नहीं है, तो यह एक त्रुटि फेंक देगा।
  - _Note_: यदि "required_only" पर सेट किया गया है, तो अनुवाद `t` फ़ंक्शन को प्रत्येक घोषित स्थानीयताओं को परिभाषित करने की आवश्यकता होगी। यदि कोई स्थानीयता गायब है, तो यह एक चेतावनी फेंक देगा। लेकिन यदि कोई स्थानीयता आपकी कॉन्फ़िगरेशन में घोषित नहीं है, लेकिन मौजूद है, तो इसे स्वीकार कर लिया जाएगा।
  - _Note_: यदि "loose" पर सेट किया गया है, तो अनुवाद `t` फ़ंक्शन किसी भी मौजूदा स्थानीयता को स्वीकार करेगा।

- **defaultLocale**:
  - _Type_: `string`
  - _Default_: `'en'`
  - _Description_: वह डिफ़ॉल्ट स्थानीयता जो फ़ॉलबैक के रूप में उपयोग की जाती है यदि अनुरोधित स्थानीयता नहीं मिली।
  - _Example_: `'en'`
  - _Note_: इसका उपयोग तब किया जाता है जब URL, कुकी, या हेडर में कोई स्थानीयता निर्दिष्ट नहीं की गई हो।

---

### Editor Configuration

एकीकृत संपादक से संबंधित सेटिंग्स को परिभाषित करता है, जिसमें सर्वर पोर्ट और सक्रिय स्थिति शामिल है।

#### Properties

- **backendURL**:

  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_: बैकएंड सर्वर का URL।
  - _Example_: `http://localhost:4000`

- **enabled**:

  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: यह दर्शाता है कि संपादक सक्रिय है या नहीं।
  - _Example_: `true`
  - _Note_: इसे NODE_ENV या अन्य समर्पित वातावरण चर का उपयोग करके सेट किया जा सकता है।

- **clientId**:

  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId और clientSecret इंटलेयर पैकेजों को ओAuth2 प्रमाणीकरण का उपयोग करके बैकएंड के साथ प्रमाणीकरण करने की अनुमति देते हैं। एक एक्सेस टोकन उस उपयोगकर्ता को प्रमाणित करने के लिए उपयोग किया जाता है जो परियोजना से संबंधित है। एक्सेस टोकन प्राप्त करने के लिए, पर जाएं https://back.intlayer.org/dashboard/project और एक खाता बनाएं।
  - _Example_: `true`
  - _Note_: महत्वपूर्ण: clientId और clientSecret को गुप्त रखा जाना चाहिए और सार्वजनिक रूप से साझा नहीं किया जाना चाहिए। कृपया सुनिश्चित करें कि इन्हें एक सुरक्षित स्थान, जैसे कि वातावरण बदलने वालों में रखा गया है।

- **clientSecret**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId और clientSecret इंटलेयर पैकेजों को ओAuth2 प्रमाणीकरण का उपयोग करके बैकएंड के साथ प्रमाणीकरण करने की अनुमति देते हैं। एक एक्सेस टोकन उस उपयोगकर्ता को प्रमाणित करने के लिए उपयोग किया जाता है जो परियोजना से संबंधित है। एक्सेस टोकन प्राप्त करने के लिए, पर जाएं https://back.intlayer.org/dashboard/project और एक खाता बनाएं।
  - _Example_: `true`
  - _Note_: महत्वपूर्ण: clientId और clientSecret को गुप्त रखा जाना चाहिए और सार्वजनिक रूप से साझा नहीं किया जाना चाहिए। कृपया सुनिश्चित करें कि इन्हें एक सुरक्षित स्थान, जैसे कि वातावरण बदलने वालों में रखा गया है।

### Middleware Configuration

मिडलवेयर व्यवहार को नियंत्रित करने वाली सेटिंग्स, जिसमें एप्लिकेशन कुकी, हेडर और स्थानीय प्रबंधन के लिए URL प्रीफिक्स कैसे संभालता है शामिल हैं।

#### Properties

- **headerName**:
  - _Type_: `string`
  - _Default_: `'x-intlayer-locale'`
  - _Description_: उस HTTP हेडर का नाम जिसका उपयोग स्थानीयता निर्धारित करने के लिए किया जाता है।
  - _Example_: `'x-custom-locale'`
  - _Note_: यह API-आधारित स्थानीयता निर्धारण के लिए उपयोगी है।
- **cookieName**:
  - _Type_: `string`
  - _Default_: `'intlayer-locale'`
  - _Description_: वह कुकी का नाम जिसका उपयोग स्थानीयता को संरक्षित करने के लिए किया जाता है।
  - _Example_: `'custom-locale'`
  - _Note_: सत्रों के बीच स्थानीयता को बनाए रखने के लिए इसका उपयोग किया जाता है।
- **prefixDefault**:
  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: क्या URL में डिफ़ॉल्ट स्थानीयता को शामिल करना है।
  - _Example_: `false`
  - _Note_: यदि `false`, तो डिफ़ॉल्ट स्थानीयता के लिए URLs में कोई स्थानीयता प्रीफिक्स नहीं होगा।
- **basePath**:
  - _Type_: `string`
  - _Default_: `''`
  - _Description_: एप्लिकेशन URLs के लिए मूल पथ।
  - _Example_: `'/my-app'`
  - _Note_: इससे एप्लिकेशन के लिए URLs का निर्माण कैसे होता है प्रभावित होता है।
- **serverSetCookie**:
  - _Type_: `string`
  - _Default_: `'always'`
  - _Description_: सर्वर पर स्थानीयता कुकी सेट करने का नियम।
  - _Options_: `'always'`, `'never'`
  - _Example_: `'never'`
  - _Note_: नियंत्रित करता है कि क्या हर अनुरोध पर स्थानीयता कुकी सेट की जाती है या नहीं।
- **noPrefix**:
  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: क्या URLs से स्थानीयता प्रीफिक्स को हटाना है।
  - _Example_: `true`
  - _Note_: यदि `true`, तो URLs स्थानीयता जानकारी नहीं रखेंगे।

---

### Content Configuration

ऐप्लिकेशन में सामग्री प्रबंधन से संबंधित सेटिंग्स, जिसमें निर्देशिका नाम, फ़ाइल एक्सटेंशन, और व्युत्पन्न कॉन्फ़िगरेशन शामिल हैं।

#### Properties

- **watch**:
  - _Type_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'development'`
  - _Description_: क्या Intlayer को ऐप में सामग्री घोषणा फ़ाइलों में परिवर्तनों के लिए देखना चाहिए।
- **fileExtensions**:
  - _Type_: `string[]`
  - _Default_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_: शब्दकोश बनाने के लिए खोजने के लिए फ़ाइल एक्सटेंशन।
  - _Example_: `['.data.ts', '.data.js', '.data.json']`
  - _Note_: फ़ाइल एक्सटेंशन को अनुकूलित करना संघर्ष से बचने में मदद कर सकता है।
- **baseDir**:
  - _Type_: `string`
  - _Default_: `process.cwd()`
  - _Description_: परियोजना के लिए मूल निर्देशिका।
  - _Example_: `'/path/to/project'`
  - _Note_: इसका उपयोग सभी Intlayer-संबंधित निर्देशिकाओं को हल करने के लिए किया जाता है।
- **dictionaryOutput**:
  - _Type_: `string[]`
  - _Default_: `['intlayer']`
  - _Description_: उपयोग करने के लिए शब्दकोश आउटपुट का प्रकार, जैसे कि `'intlayer'` या `'i18next'`।
- **contentDirName**:
  - _Type_: `string`
  - _Default_: `'src'`
  - _Description_: वह निर्देशिका जिसका नाम सामग्री संग्रहीत है।
  - _Example_: `'data'`, `'content'`, `'locales'`
  - _Note_: यदि यह मूल निर्देशिका स्तर पर नहीं है, तो `contentDir` को अपडेट करें।
- **contentDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Description_: वह निर्देशिका पथ जहां सामग्री संग्रहीत है।

- **resultDirName**:
  - _Type_: `string`
  - _Default_: `'.intlayer'`
  - _Description_: वह निर्देशिका जिसका नाम परिणाम संग्रहीत होते हैं।
  - _Example_: `'outputOFIntlayer'`
  - _Note_: यदि यह निर्देशिका आधार स्तर पर नहीं है, तो `resultDir` को अपडेट करें।
- **resultDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Description_: मध्यवर्ती या आउटपुट परिणामों के संग्रहीत करने के लिए निर्देशिका पथ।

- **moduleAugmentationDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: मॉड्यूल संवर्धन के लिए निर्देशिका, जो बेहतर IDE सुझाव और प्रकार जांच की अनुमति देती है।
  - _Example_: `'intlayer-types'`
  - _Note_: सुनिश्चित करें कि इसे `tsconfig.json` में शामिल किया गया है।

- **moduleAugmentationDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Description_: संवर्धन मॉड्यूल और अतिरिक्त प्रकार परिभाषाओं के लिए पथ।

- **dictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'dictionary'`
  - _Description_: शब्दकोश संग्रहीत करने के लिए निर्देशिका।
  - _Example_: `'translations'`
  - _Note_: यदि यह परिणाम निर्देशिका स्तर पर नहीं है, तो `dictionariesDir` को अपडेट करें।
- **dictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Description_: स्थानीयकरण शब्दकोशों के लिए निर्देशिका।

- **i18nDictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'i18n_dictionary'`
  - _Description_: i18n शब्दकोश संग्रहीत करने के लिए निर्देशिका।
  - _Example_: `'translations'`
  - _Note_: यदि यह परिणाम निर्देशिका स्तर पर नहीं है, तो `i18nDictionariesDir` को अपडेट करें।
  - _Note_: सुनिश्चित करें कि i18n शब्दकोशों का आउटपुट i18next को शामिल करता है ताकि i18next के लिए शब्दकोश बनाए जा सकें।
- **i18nDictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Description_: i18n शब्दकोश को संग्रहीत करने के लिए निर्देशिका।
  - _Note_: सुनिश्चित करें कि यह निर्देशिका i18next आउटपुट प्रकार के लिए कॉन्फ़िगर की गई है।

- **typeDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: शब्दकोश प्रकारों को संग्रहीत करने के लिए निर्देशिका।
  - _Example_: `'intlayer-types'`
  - _Note_: यदि यह परिणाम निर्देशिका स्तर पर नहीं है, तो `typesDir` को अपडेट करें।

- **typesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'typeDirName'`
  - _Description_: शब्दकोश प्रकारों को संग्रहीत करने के लिए निर्देशिका।

- **mainDirName**:
  - _Type_: `string`
  - _Default_: `'main'`
  - _Description_: मुख्य फ़ाइलों को संग्रहीत करने के लिए निर्देशिका।
  - _Example_: `'intlayer-main'`
  - _Note_: यदि यह परिणाम निर्देशिका स्तर पर नहीं है, तो `mainDir` को अपडेट करें।
- **mainDir**:
  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'mainDirName'`
  - _Description_: वह निर्देशिका जहां मुख्य अनुप्रयोग फ़ाइलें संग्रहीत हैं।
- **excludedPath**:
  - _Type_: `string[]`
  - _Default_: `['node_modules']`
  - _Description_: सामग्री खोज से बहिष्कृत निर्देशिकाएँ।
  - _Note_: यह सेटिंग अभी तक उपयोग में नहीं है, लेकिन भविष्य के कार्यान्वयन के लिए योजना बनाई गई है।
