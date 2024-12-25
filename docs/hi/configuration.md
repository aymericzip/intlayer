# Intlayer Configuration Documentation

## Overview

Intlayer कॉन्फ़िगरेशन फ़ाइलें प्लगइन के विभिन्न पहलुओं, जैसे अंतर्राष्ट्रीयकरण, मध्यवर्ती, और कंटेंट हैंडलिंग की अनुकूलन की अनुमति देती हैं। यह दस्तावेज़ कॉन्फ़िगरेशन में प्रत्येक प्रॉपर्टी का विस्तृत विवरण प्रदान करता है।

---

## Configuration File Support

Intlayer JSON, JS, MJS, और TS कॉन्फ़िगरेशन फ़ाइल स्वरूपों को स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

---

## Example config file

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
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

```json5 fileName=".intlayerrc" codeFormat="json"
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

नीचे दिए गए अनुभाग Intlayer के लिए उपलब्ध विभिन्न कॉन्फ़िगरेशन सेटिंग्स का वर्णन करते हैं।

---

### Internationalization Configuration

विभिन्न स्थानीयताओं और अनुप्रयोग के लिए डिफ़ॉल्ट स्थानीयता सहित अंतर्राष्ट्रीयकरण से संबंधित सेटिंग्स को परिभाषित करता है।

#### Properties

- **locales**:
  - _Type_: `string[]`
  - _Default_: `['en']`
  - _Description_: अनुप्रयोग में समर्थित स्थानीयताओं की सूची।
  - _Example_: `['en', 'fr', 'es']`
- **strictMode**:

  - _Type_: `string`
  - _Default_: `required_only`
  - _Description_: Typescript का उपयोग करते हुए अंतर्राष्ट्रीयकृत सामग्री के मजबूत कार्यान्वयन को सुनिश्चित करें।
  - _Note_: यदि "strict" पर सेट किया गया है, तो अनुवाद `t` फ़ंक्शन को प्रत्येक घोषित स्थानीयताओं को परिभाषित करना आवश्यक होगा। यदि एक स्थानीयता गायब है, या यदि कोई स्थानीयता आपकी कॉन्फ़िगरेशन में घोषित नहीं है, तो यह एक त्रुटि उत्पन्न करेगा।
  - _Note_: यदि "required_only" पर सेट किया गया है, तो अनुवाद `t` फ़ंक्शन को प्रत्येक घोषित स्थानीयताओं को परिभाषित करना आवश्यक होगा। यदि एक स्थानीयता गायब है, तो यह एक चेतावनी उत्पन्न करेगा। लेकिन यह स्वीकार करेगा यदि कोई स्थानीयता आपकी कॉन्फ़िगरेशन में घोषित नहीं है, लेकिन मौजूद है।
  - _Note_: यदि "loose" पर सेट किया गया है, तो अनुवाद `t` फ़ंक्शन किसी भी मौजूद स्थानीयता को स्वीकार करेगा।

- **defaultLocale**:
  - _Type_: `string`
  - _Default_: `'en'`
  - _Description_: डिफ़ॉल्ट स्थानीयता जिसका उपयोग तब किया जाएगा जब अनुरोधित स्थानीयता नहीं मिलती।
  - _Example_: `'en'`
  - _Note_: इसका उपयोग तब किया जाता है जब URL, कुकी, या हैडर में कोई स्थानीयता निर्दिष्ट नहीं की गई हो।

---

### Editor Configuration

संविधान संपादक से संबंधित सेटिंग्स को परिभाषित करता है, जिसमें सर्वर पोर्ट और सक्रिय स्थिति शामिल है।

#### Properties

- **backendURL**:

  - _Type_: `string`
  - _Default_: `https://back.intlayer.org`
  - _Description_: बैकेंड सर्वर का URL।
  - _Example_: `http://localhost:4000`

- **enabled**:

  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: इंगित करता है कि क्या संपादक सक्रिय है।
  - _Example_: `true`
  - _Note_: इसे NODE_ENV, या अन्य समर्पित env वैरिएबल का उपयोग करके सेट किया जा सकता है।

- **clientId**:

  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId और clientSecret इंटलेयर पैकेजों को बैकएंड के साथ oAuth2 प्रमाणीकरण का उपयोग करके प्रमाणित करने की अनुमति देते हैं। एक पहुँच टोकन उस उपयोगकर्ता को प्रमाणित करने के लिए उपयोग किया जाता है जो प्रोजेक्ट से संबंधित है। पहुँच टोकन प्राप्त करने के लिए, जाएँ https://back.intlayer.org/dashboard/project और एक खाता बनायें।
  - _Example_: `true`
  - _Note_: महत्वपूर्ण: clientId और clientSecret को गोपनीय रखा जाना चाहिए और सार्वजनिक रूप से साझा नहीं किया जाना चाहिए। कृपया सुनिश्चित करें कि इन्हें एक सुरक्षित स्थान पर रखा जाए, जैसे कि पर्यावरण चरों में।

- **clientSecret**:
  - _Type_: `string` | `undefined`
  - _Default_: `undefined`
  - _Description_: clientId और clientSecret इंटलेयर पैकेजों को बैकएंड के साथ oAuth2 प्रमाणीकरण का उपयोग करके प्रमाणित करने की अनुमति देते हैं। एक पहुँच टोकन उस उपयोगकर्ता को प्रमाणित करने के लिए उपयोग किया जाता है जो प्रोजेक्ट से संबंधित है। पहुँच टोकन प्राप्त करने के लिए, जाएँ https://back.intlayer.org/dashboard/project और एक खाता बनायें।
  - _Example_: `true`
  - _Note_: महत्वपूर्ण: clientId और clientSecret को गोपनीय रखा जाना चाहिए और सार्वजनिक रूप से साझा नहीं किया जाना चाहिए। कृपया सुनिश्चित करें कि इन्हें एक सुरक्षित स्थान पर रखा जाए, जैसे कि पर्यावरण चरों में।

### Middleware Configuration

सेटिंग्स जो मध्यवर्ती व्यवहार को नियंत्रित करती हैं, जिसमें यह शामिल है कि अनुप्रयोग कुकीज़, हैडर, और स्थानीयता प्रबंधन के लिए URL प्रीफिक्स को कैसे संभालता है।

#### Properties

- **headerName**:
  - _Type_: `string`
  - _Default_: `'x-intlayer-locale'`
  - _Description_: HTTP हैडर का नाम जिसका उपयोग स्थानीयता निर्धारित करने के लिए किया जाता है।
  - _Example_: `'x-custom-locale'`
  - _Note_: यह API-आधारित स्थानीयता निर्धारण के लिए उपयोगी है।
- **cookieName**:
  - _Type_: `string`
  - _Default_: `'intlayer-locale'`
  - _Description_: कुकी का नाम जिसका उपयोग स्थानीयता को संग्रहीत करने के लिए किया जाता है।
  - _Example_: `'custom-locale'`
  - _Note_: सत्रों के बीच स्थानीयता को बनाए रखने के लिए उपयोग किया जाता है।
- **prefixDefault**:
  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: यह निर्धारित करता है कि क्या URL में डिफ़ॉल्ट स्थानीयता को शामिल किया जाए।
  - _Example_: `false`
  - _Note_: यदि `false`, तो डिफ़ॉल्ट स्थानीयता के लिए URLs में कोई स्थानीयता प्रीफिक्स नहीं होगा।
- **basePath**:
  - _Type_: `string`
  - _Default_: `''`
  - _Description_: अनुप्रयोग URLs के लिए आधार पथ।
  - _Example_: `'/my-app'`
  - _Note_: यह अनुप्रयोग के लिए URLs को बनाने के तरीके को प्रभावित करता है।
- **serverSetCookie**:
  - _Type_: `string`
  - _Default_: `'always'`
  - _Description_: सर्वर पर स्थानीयता कुकी सेट करने के लिए नियम।
  - _Options_: `'always'`, `'never'`
  - _Example_: `'never'`
  - _Note_: नियंत्रित करता है कि क्या स्थानीयता कुकी को हर अनुरोध पर सेट किया गया है या कभी नहीं।
- **noPrefix**:
  - _Type_: `boolean`
  - _Default_: `false`
  - _Description_: यह निर्धारित करता है कि क्या URLs से स्थानीयता प्रीफिक्स को हटा दिया जाए।
  - _Example_: `true`
  - _Note_: यदि `true`, तो URLs में स्थानीयता की जानकारी नहीं होगी।

---

### Content Configuration

अनुप्रयोग के भीतर कंटेंट हैंडलिंग से संबंधित सेटिंग्स, जिसमें निर्देशिका के नाम, फ़ाइल एक्सटेंशन, और व्युत्पन्न कॉन्फ़िगरेशन शामिल हैं।

#### Properties

- **watch**:
  - _Type_: `boolean`
  - _Default_: `process.env.NODE_ENV === 'development'`
  - _Description_: इंगित करता है कि क्या Intlayer ऐप में सामग्री घोषणा फ़ाइलों में परिवर्तनों के लिए देखना चाहिए ताकि संबंधित शब्दकोशों का पुनर्निर्माण किया जा सके।
- **fileExtensions**:
  - _Type_: `string[]`
  - _Default_: `['.content.ts', '.content.js', '.content.cjs', '.content.mjs', '.content.json', '.content.tsx', '.content.jsx']`
  - _Description_: शब्दकोशों का निर्माण करते समय देखने के लिए फ़ाइल एक्सटेंशन।
  - _Example_: `['.data.ts', '.data.js', '.data.json']`
  - _Note_: फ़ाइल एक्सटेंशन को अनुकूलित करना संघर्षों से बचने में मदद कर सकता है।
- **baseDir**:
  - _Type_: `string`
  - _Default_: `process.cwd()`
  - _Description_: प्रोजेक्ट के लिए आधार निर्देशिका।
  - _Example_: `'/path/to/project'`
  - _Note_: इसका उपयोग सभी इंटलेयर-संबंधित निर्देशिकाओं को हल करने के लिए किया जाता है।
- **dictionaryOutput**:
  - _Type_: `string[]`
  - _Default_: `['intlayer']`
  - _Description_: उपयोग करने के लिए शब्दकोश आउटपुट का प्रकार, जैसे `'intlayer'` या `'i18next'`।
- **contentDirName**:
  - _Type_: `string`
  - _Default_: `'src'`
  - _Description_: उस निर्देशिका का नाम जहाँ सामग्री संग्रहीत है।
  - _Example_: `'data'`, `'content'`, `'locales'`
  - _Note_: यदि आधार निर्देशिका स्तर पर नहीं है, तो `contentDir` को अपडेट करें।
- **contentDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'contentDirName'`
  - _Description_: वह निर्देशिका पथ जहाँ सामग्री संग्रहीत है।

- **resultDirName**:
  - _Type_: `string`
  - _Default_: `'.intlayer'`
  - _Description_: वह निर्देशिका का नाम जहाँ परिणाम संग्रहीत होते हैं।
  - _Example_: `'outputOFIntlayer'`
  - _Note_: यदि यह निर्देशिका आधार स्तर पर नहीं है, तो `resultDir` को अपडेट करें।
- **resultDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'resultDirName'`
  - _Description_: वह निर्देशिका पथ जहाँ मध्यवर्ती या आउटपुट परिणाम संग्रहीत होते हैं।

- **moduleAugmentationDirName**:

  - _Type_: `string`
  - _Default_: `'types'`
  - _Description_: मॉड्यूल संवर्धन के लिए निर्देशिका, जो बेहतर IDE सुझावों और प्रकार की जाँच की अनुमति देती है।
  - _Example_: `'intlayer-types'`
  - _Note_: सुनिश्चित करें कि इसे `tsconfig.json` में शामिल किया गया है।

- **moduleAugmentationDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'baseDir'` / `'moduleAugmentationDirName'`
  - _Description_: मॉड्यूल संवर्धन और अतिरिक्त प्रकार परिभाषाओं के लिए पथ।

- **dictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'dictionary'`
  - _Description_: शब्दकोशों को संग्रहीत करने के लिए निर्देशिका।
  - _Example_: `'translations'`
  - _Note_: यदि यह परिणाम निर्देशिका स्तर पर नहीं है, तो `dictionariesDir` को अपडेट करें।
- **dictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'dictionariesDirName'`
  - _Description_: स्थानीयकरण शब्दकोशों को संग्रहीत करने के लिए निर्देशिका।

- **i18nDictionariesDirName**:
  - _Type_: `string`
  - _Default_: `'i18n_dictionary'`
  - _Description_: i18n शब्दकोशों को संग्रहीत करने के लिए निर्देशिका।
  - _Example_: `'translations'`
  - _Note_: यदि यह परिणाम निर्देशिका स्तर पर नहीं है, तो `i18nDictionariesDir` को अपडेट करें।
  - _Note_: सुनिश्चित करें कि i18n शब्दकोशों का आउटपुट i18next को शामिल करता है ताकि i18next के लिए शब्दकोश बनाए जा सकें।
- **i18nDictionariesDir**:

  - _Type_: `string`
  - _DerivedFrom_: `'resultDir'` / `'i18nDictionariesDirName'`
  - _Description_: i18n शब्दकोशों को संग्रहीत करने के लिए निर्देशिका।
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
  - _Description_: वह निर्देशिका जहाँ मुख्य एप्लिकेशन फ़ाइलें संग्रहीत होती हैं।
- **excludedPath**:
  - _Type_: `string[]`
  - _Default_: `['node_modules']`
  - _Description_: सामग्री खोज से बाहर रखी गई निर्देशिकाएँ।
  - _Note_: यह सेटिंग अभी तक उपयोग में नहीं है, लेकिन भविष्य में कार्यान्वयन के लिए योजना बनाई गई है।

### Logger Configuration

सेटिंग्स जो लॉगर को नियंत्रित करती हैं, जिसमें लॉगिंग का स्तर और उपयोग करने के लिए प्रीफिक्स शामिल हैं।

#### Properties

- **enabled**:
  - _Type_: `boolean`
  - _Default_: `true`
  - _Description_: इंगीत करता है कि क्या लॉगर सक्षम है।
  - _Example_: `true`
  - _Note_: इसे NODE_ENV, या अन्य समर्पित env वैरिएबल का उपयोग करके सेट किया जा सकता है।
- **level**:
  - _Type_: `'info' | 'warn' | 'debug' | 'log'`
  - _Default_: `'log'`
  - _Description_: लॉगर का स्तर।
  - _Example_: `'info'`
  - _Note_: लॉगर का स्तर। यह या तो 'log', 'info', 'warn', 'error', या 'debug' हो सकता है।
- **prefix**:
  - _Type_: `string`
  - _Default_: `'[intlayer] '`
  - _Description_: लॉगर का प्रीफिक्स।
  - _Example_: `'[my custom prefix] '`
  - _Note_: लॉगर का प्रीफिक्स।
