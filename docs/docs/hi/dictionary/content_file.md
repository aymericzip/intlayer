---
createdAt: 2025-02-07
updatedAt: 2025-09-20
title: कंटेंट फ़ाइल
description: अपनी कंटेंट घोषणा फ़ाइलों के एक्सटेंशनों को कस्टमाइज़ करना सीखें। अपने प्रोजेक्ट में शर्तों को कुशलतापूर्वक लागू करने के लिए इस दस्तावेज़ का पालन करें।
keywords:
  - कंटेंट फ़ाइल
  - दस्तावेज़ीकरण
  - Intlayer
slugs:
  - doc
  - concept
  - content
---

# कंटेंट फ़ाइल

<iframe title="i18n, Markdown, JSON… सब कुछ प्रबंधित करने के लिए एकल समाधान | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## कंटेंट फ़ाइल क्या है?

Intlayer में एक कंटेंट फ़ाइल वह फ़ाइल होती है जिसमें शब्दकोश परिभाषाएँ होती हैं।  
ये फ़ाइलें आपके एप्लिकेशन की टेक्स्ट सामग्री, अनुवाद, और संसाधनों की घोषणा करती हैं।  
कंटेंट फ़ाइलों को Intlayer द्वारा संसाधित किया जाता है ताकि शब्दकोश बनाए जा सकें।

शब्दकोश अंतिम परिणाम होंगे जिन्हें आपका एप्लिकेशन `useIntlayer` हुक का उपयोग करके इम्पोर्ट करेगा।

### मुख्य अवधारणाएँ

#### शब्दकोश

शब्दकोश कुंजियों द्वारा व्यवस्थित सामग्री का एक संरचित संग्रह है। प्रत्येक शब्दकोश में शामिल हैं:

- **कुंजी**: शब्दकोश के लिए एक अद्वितीय पहचानकर्ता
- **सामग्री**: वास्तविक सामग्री मान (टेक्स्ट, संख्याएँ, ऑब्जेक्ट्स, आदि)
- **मेटाडेटा**: अतिरिक्त जानकारी जैसे शीर्षक, विवरण, टैग्स, आदि

#### कंटेंट फ़ाइल

कंटेंट फ़ाइल का उदाहरण:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      hi: "अंग्रेज़ी सामग्री",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
    conditionalContent: cond({
      true: "सत्यापन सक्षम है",
      false: "सत्यापन अक्षम है",
    }),
    insertionContent: insert("नमस्ते {{name}}!"),
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए शब्दकोश की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# मार्कडाउन उदाहरण"),

    /*
     * केवल `react-intlayer` या `next-intlayer` का उपयोग करते समय उपलब्ध
     */
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
} satisfies Dictionary<Content>; // [वैकल्पिक] Dictionary सामान्य है और आपको अपने शब्दकोश के स्वरूपण को मजबूत करने की अनुमति देता है
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
    conditionalContent: cond({
      true: "मान्यता सक्षम है",
      false: "मान्यता अक्षम है",
    }),
    insertionContent: insert("नमस्ते {{name}}!"),
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए शब्दकोश की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    markdownContent: md("# मार्कडाउन उदाहरण"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // केवल `react-intlayer` या `next-intlayer` का उपयोग करते समय उपलब्ध
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
      imbricatedArray: [1, 2, 3],
    },
    multilingualContent: t({
      hi: "अंग्रेज़ी सामग्री",
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "माइनस एक से कम कार",
      "-1": "माइनस एक कार",
      "0": "कोई कार नहीं",
      "1": "एक कार",
      ">5": "कुछ कारें",
      ">19": "कई कारें",
    }),
    conditionalContent: cond({
      true: "सत्यापन सक्षम है",
      false: "सत्यापन अक्षम है",
    }),
    insertionContent: insert("नमस्ते {{name}}!"),
    nestedContent: nest(
      "navbar", // नेस्ट करने के लिए शब्दकोश की कुंजी
      "login.button" // [वैकल्पिक] नेस्ट करने के लिए सामग्री का पथ
    ),
    markdownContent: md("# मार्कडाउन उदाहरण"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // केवल `react-intlayer` या `next-intlayer` का उपयोग करते समय उपलब्ध
    jsxContent: <h1>मेरा शीर्षक</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "नमस्ते दुनिया",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "कोई कार नहीं",
        "1": "एक कार",
        "<-1": "माइनस एक से कम कार",
        "-1": "माइनस एक कार",
        ">5": "कुछ कारें",
        ">19": "कई कारें",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "सत्यापन सक्षम है",
        "false": "सत्यापन अक्षम है",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "नमस्ते {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# मार्कडाउन उदाहरण",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["मेरा शीर्षक"],
      },
    },
  },
}
```

#### कंटेंट नोड्स

कंटेंट नोड्स शब्दकोश सामग्री के निर्माण खंड होते हैं। ये हो सकते हैं:

- **प्रिमिटिव मान**: स्ट्रिंग्स, संख्याएँ, बूलियन, नल, अपरिभाषित
- **टाइप्ड नोड्स**: विशेष सामग्री प्रकार जैसे अनुवाद, शर्तें, मार्कडाउन, आदि
- **फंक्शन्स**: गतिशील सामग्री जिसे रनटाइम पर मूल्यांकन किया जा सकता है [देखें फंक्शन फेचिंग](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/function_fetching.md)
- **नेस्टेड कंटेंट**: अन्य शब्दकोशों के संदर्भ

#### कंटेंट प्रकार

Intlayer टाइप्ड नोड्स के माध्यम से विभिन्न कंटेंट प्रकारों का समर्थन करता है:

- **अनुवाद सामग्री**: बहुभाषी पाठ जिसमें स्थानीय-विशिष्ट मान होते हैं [देखें अनुवाद सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation_content.md)
- **शर्त सामग्री**: बूलियन अभिव्यक्तियों पर आधारित सशर्त सामग्री [देखें शर्त सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/condition_content.md)
- **सूची सामग्री**: सामग्री जो सूचीबद्ध मानों के आधार पर भिन्न होती है [देखें सूची सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/enumeration_content.md)
- **प्रविष्टि सामग्री**: ऐसी सामग्री जिसे अन्य सामग्री में डाला जा सकता है [देखें प्रविष्टि सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/insertion_content.md)
- **मार्कडाउन सामग्री**: मार्कडाउन प्रारूप में समृद्ध पाठ सामग्री [देखें मार्कडाउन सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown_content.md)
- **नेस्टेड सामग्री**: अन्य शब्दकोशों के संदर्भ [देखें नेस्टेड सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/nested_content.md)
- **लिंग सामग्री**: लिंग के आधार पर भिन्न सामग्री [देखें लिंग सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/gender_content.md)
- **फ़ाइल सामग्री**: बाहरी फ़ाइलों के संदर्भ [देखें फ़ाइल सामग्री](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/file_content.md)

## शब्दकोश संरचना

Intlayer में एक शब्दकोश `Dictionary` प्रकार द्वारा परिभाषित किया जाता है और इसमें कई गुण होते हैं जो इसके व्यवहार को नियंत्रित करते हैं:

### आवश्यक गुण

#### `key` (string)

शब्दकोश के लिए पहचानकर्ता। यदि कई शब्दकोशों की एक ही कुंजी होती है, तो Intlayer उन्हें स्वचालित रूप से मर्ज कर देगा।

> kebab-case नामकरण कन्वेंशन का उपयोग करें (जैसे, `"about-page-meta"`)।

#### Content (string | number | boolean | object | array | function)

`content` गुण में वास्तविक शब्दकोश डेटा होता है और यह निम्नलिखित का समर्थन करता है:

- **प्राथमिक मान**: स्ट्रिंग, संख्या, बूलियन, null, undefined
- **टाइप किए गए नोड्स**: Intlayer के सहायक फ़ंक्शंस का उपयोग करके विशेष सामग्री प्रकार
- **नेस्टेड ऑब्जेक्ट्स**: जटिल डेटा संरचनाएं
- **ऐरे**: सामग्री के संग्रह
- **फ़ंक्शंस**: गतिशील सामग्री मूल्यांकन

### वैकल्पिक गुण

#### `title` (string)

शब्दकोश के लिए मानव-पठनीय शीर्षक जो इसे संपादकों और CMS सिस्टम में पहचानने में मदद करता है। यह विशेष रूप से तब उपयोगी होता है जब बड़ी संख्या में शब्दकोशों का प्रबंधन किया जा रहा हो या जब कंटेंट प्रबंधन इंटरफेस के साथ काम किया जा रहा हो।

**उदाहरण:**

```typescript
{
  key: "about-page-meta",
  title: "About Page Metadata",
  content: { /* ... */ }
}
```

#### `description` (string)

विस्तृत विवरण जो शब्दकोश के उद्देश्य, उपयोग दिशानिर्देशों, और किसी भी विशेष विचारों को समझाता है। यह विवरण AI-संचालित अनुवाद निर्माण के संदर्भ के रूप में भी उपयोग किया जाता है, जिससे अनुवाद की गुणवत्ता और स्थिरता बनाए रखना संभव होता है।

**उदाहरण:**

```typescript
{
  key: "about-page-meta",
  description: [
    "This dictionary manages the metadata of the About Page",
    "SEO के लिए अच्छी प्रथाओं पर विचार करें:",
    "- शीर्षक 50 से 60 अक्षरों के बीच होना चाहिए",
    "- विवरण 150 से 160 अक्षरों के बीच होना चाहिए",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

शब्दकोशों को वर्गीकृत और व्यवस्थित करने के लिए स्ट्रिंग्स की एक सूची। टैग अतिरिक्त संदर्भ प्रदान करते हैं और इन्हें संपादकों और CMS सिस्टम में फ़िल्टरिंग, खोजने, या शब्दकोशों को व्यवस्थित करने के लिए उपयोग किया जा सकता है।

**उदाहरण:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `locale` (LocalesValues)

शब्दकोश को प्रति-स्थानिक शब्दकोश में परिवर्तित करता है जहाँ सामग्री में घोषित प्रत्येक फ़ील्ड स्वचालित रूप से एक अनुवाद नोड में परिवर्तित हो जाएगा। जब यह गुण सेट किया जाता है:

- शब्दकोश को एकल-स्थान शब्दकोश के रूप में माना जाता है
- प्रत्येक फ़ील्ड उस विशिष्ट स्थान के लिए एक अनुवाद नोड बन जाती है
- इस संपत्ति का उपयोग करते समय आपको सामग्री में अनुवाद नोड्स (`t()`) का उपयोग नहीं करना चाहिए
- यदि यह गायब है, तो शब्दकोश को बहुभाषी शब्दकोश माना जाएगा

> अधिक जानकारी के लिए [Intlayer में प्रति-स्थान सामग्री घोषणा](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) देखें।

**उदाहरण:**

```json
// प्रति-स्थान शब्दकोश
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // यह 'en' के लिए एक अनुवाद नोड बन जाता है
    "description": "Learn more about our company"
  }
}
```

#### `autoFill` (AutoFill)

बाहरी स्रोतों से शब्दकोश सामग्री को स्वचालित रूप से भरने के निर्देश। इसे वैश्विक रूप से `intlayer.config.ts` में या प्रति-शब्दकोश कॉन्फ़िगर किया जा सकता है। यह कई प्रारूपों का समर्थन करता है:

- **`true`**: सभी स्थानों के लिए ऑटो-फिल सक्षम करें
- **`string`**: एकल फ़ाइल या वेरिएबल्स के साथ टेम्पलेट का पथ
- **`object`**: प्रति-स्थान फ़ाइल पथ

**उदाहरण:**

```json
// सभी स्थानों के लिए सक्षम करें
{
  "autoFill": true
}
// एकल फ़ाइल
{
  "autoFill": "./translations/aboutPage.content.json"
}
// वेरिएबल्स के साथ टेम्पलेट
{
  "autoFill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// प्रति-स्थान विस्तृत कॉन्फ़िगरेशन
{
  "autoFill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
    "es": "./translations/es/aboutPage.content.json"
  }
}
```

**उपलब्ध वेरिएबल्स:**

- `{{locale}}` – स्थान कोड (जैसे `fr`, `es`)
- `{{fileName}}` – फ़ाइल नाम (जैसे `example`)
- `{{key}}` – शब्दकोश कुंजी (जैसे `example`)

> अधिक जानकारी के लिए देखें [Intlayer में ऑटो-फिल कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md)।

##### `priority` (संख्या)

संघर्ष समाधान के लिए शब्दकोश की प्राथमिकता को दर्शाता है। जब कई शब्दकोशों में समान कुंजी होती है, तो सबसे उच्च प्राथमिकता संख्या वाला शब्दकोश अन्य को ओवरराइड कर देगा। यह सामग्री पदानुक्रम और ओवरराइड प्रबंधन के लिए उपयोगी है।

**उदाहरण:**

```typescript
// मूल शब्दकोश
{
  key: "welcome-message",
  priority: 1,
  content: { message: "स्वागत है!" }
}

// ओवरराइड शब्दकोश
{
  key: "welcome-message",
  priority: 10,
  content: { message: "हमारी प्रीमियम सेवा में आपका स्वागत है!" }
}
// यह मूल शब्दकोश को ओवरराइड करेगा
```

### CMS गुण

##### `version` (स्ट्रिंग)

रिमोट शब्दकोशों के लिए संस्करण पहचानकर्ता। यह ट्रैक करने में मदद करता है कि वर्तमान में कौन सा संस्करण उपयोग में है, विशेष रूप से रिमोट कंटेंट मैनेजमेंट सिस्टम के साथ काम करते समय उपयोगी।

##### `live` (बूलियन)

रिमोट शब्दकोशों के लिए, यह दर्शाता है कि क्या शब्दकोश को रनटाइम पर लाइव फेच किया जाना चाहिए। जब सक्षम हो:

- `intlayer.config.ts` में `importMode` को "live" पर सेट करने की आवश्यकता होती है
- एक लाइव सर्वर चल रहा होना चाहिए
- शब्दकोश रनटाइम पर लाइव सिंक API का उपयोग करके फेच किया जाएगा
- यदि लाइव है लेकिन फेच विफल हो जाता है, तो डायनामिक वैल्यू पर वापस चला जाता है
- यदि लाइव नहीं है, तो बेहतर प्रदर्शन के लिए बिल्ड समय पर शब्दकोश को ट्रांसफॉर्म किया जाता है

### सिस्टम गुण (स्वचालित रूप से उत्पन्न)

ये गुण Intlayer द्वारा स्वचालित रूप से उत्पन्न किए जाते हैं और इन्हें मैन्युअल रूप से संशोधित नहीं किया जाना चाहिए:

##### `$schema` (स्ट्रिंग)

डिक्शनरी संरचना के सत्यापन के लिए उपयोग किया जाने वाला JSON स्कीमा। डिक्शनरी की अखंडता सुनिश्चित करने के लिए Intlayer द्वारा स्वचालित रूप से जोड़ा गया।

##### `id` (स्ट्रिंग)

रिमोट डिक्शनरीज़ के लिए, यह रिमोट सर्वर में डिक्शनरी का अद्वितीय पहचानकर्ता है। रिमोट कंटेंट को फेच और प्रबंधित करने के लिए उपयोग किया जाता है।

##### `localId` (LocalDictionaryId)

स्थानीय डिक्शनरीज़ के लिए अद्वितीय पहचानकर्ता। डिक्शनरी की पहचान करने और यह निर्धारित करने में मदद करने के लिए Intlayer द्वारा स्वचालित रूप से उत्पन्न किया गया कि यह स्थानीय है या रिमोट, साथ ही इसकी स्थिति।

##### `localIds` (LocalDictionaryId[])

मर्ज किए गए शब्दकोशों के लिए, यह एरे उन सभी शब्दकोशों के आईडीज़ को शामिल करता है जिन्हें एक साथ मर्ज किया गया था। मर्ज किए गए कंटेंट के स्रोत को ट्रैक करने में उपयोगी।

##### `filePath` (स्ट्रिंग)

स्थानीय शब्दकोश का फ़ाइल पथ, जो यह दर्शाता है कि शब्दकोश किस `.content` फ़ाइल से उत्पन्न हुआ था। डिबगिंग और स्रोत ट्रैकिंग में मदद करता है।

##### `availableVersions` (स्ट्रिंग[])

रिमोट शब्दकोशों के लिए, यह एरे शब्दकोश के सभी उपलब्ध संस्करणों को शामिल करता है। यह ट्रैक करने में मदद करता है कि कौन से संस्करण उपयोग के लिए उपलब्ध हैं।

##### `autoFilled` (true)

यह दर्शाता है कि क्या शब्दकोश बाहरी स्रोतों से स्वचालित रूप से भरा गया है। संघर्ष की स्थिति में, बेस शब्दकोश स्वचालित रूप से भरे गए शब्दकोशों को ओवरराइड करेंगे।

##### `location` ('distant' | 'locale')

शब्दकोश के स्थान को दर्शाता है:

- `'locale'`: स्थानीय शब्दकोश (सामग्री फ़ाइलों से)
- `'distant'`: दूरस्थ शब्दकोश (बाहरी स्रोत से)

## कंटेंट नोड प्रकार

Intlayer कई विशेषीकृत कंटेंट नोड प्रकार प्रदान करता है जो बुनियादी प्रिमिटिव मानों का विस्तार करते हैं:

### अनुवाद सामग्री (`t`)

बहुभाषी सामग्री जो स्थानीय भाषा के अनुसार भिन्न होती है:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### शर्त सामग्री (`cond`)

सामग्री जो बूलियन शर्तों के आधार पर बदलती है:

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "User is logged in",
  false: "Please log in to continue",
});
```

### गणना सामग्री (`enu`)

सूचीबद्ध मानों के आधार पर भिन्न सामग्री:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "आपका अनुरोध लंबित है",
  approved: "आपका अनुरोध स्वीकृत हो गया है",
  rejected: "आपका अनुरोध अस्वीकृत कर दिया गया है",
});
```

### सम्मिलन सामग्री (`insert`)

सामग्री जिसे अन्य सामग्री में सम्मिलित किया जा सकता है:

```typescript
import { insert } from "intlayer";

insertionContent: insert("यह पाठ कहीं भी सम्मिलित किया जा सकता है");
```

### नेस्टेड सामग्री (`nest`)

अन्य शब्दकोशों के संदर्भ:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### मार्कडाउन सामग्री (`md`)

मार्कडाउन प्रारूप में समृद्ध पाठ सामग्री:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# स्वागत\n\nयह **बोल्ड** टेक्स्ट है जिसमें [लिंक](https://example.com) शामिल हैं"
);
```

### जेंडर सामग्री (`gender`)

लिंग के आधार पर भिन्न सामग्री:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "वह एक डेवलपर है",
  female: "वह एक डेवलपर है",
  other: "वे एक डेवलपर हैं",
});
```

### फ़ाइल सामग्री (`file`)

बाहरी फ़ाइलों के संदर्भ:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## सामग्री फ़ाइलें बनाना

### बुनियादी सामग्री फ़ाइल संरचना

एक सामग्री फ़ाइल एक डिफ़ॉल्ट ऑब्जेक्ट निर्यात करती है जो `Dictionary` प्रकार को संतुष्ट करता है:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "स्वागत पृष्ठ सामग्री",
  description:
    "मुख्य स्वागत पृष्ठ के लिए सामग्री जिसमें हीरो सेक्शन और फीचर्स शामिल हैं",
  tags: ["पृष्ठ", "स्वागत", "मुख्यपृष्ठ"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "सभी कौशल स्तरों के लिए सहज इंटरफ़ेस",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### JSON सामग्री फ़ाइल

आप JSON प्रारूप में सामग्री फ़ाइलें भी बना सकते हैं:

```json
{
  "key": "welcome-page",
  "title": "स्वागत पृष्ठ सामग्री",
  "description": "मुख्य स्वागत पृष्ठ के लिए सामग्री",
  "tags": ["पृष्ठ", "स्वागत"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "हमारे प्लेटफ़ॉर्म में आपका स्वागत है",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "आसानी से अद्भुत एप्लिकेशन बनाएं",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### प्रति-स्थान सामग्री फ़ाइलें

प्रति-स्थान शब्दकोशों के लिए, `locale` गुण निर्दिष्ट करें:

```typescript
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "हमारे प्लेटफ़ॉर्म में आपका स्वागत है",
      subtitle: "आसानी से अद्भुत एप्लिकेशन बनाएं",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Notre Plateforme में आपका स्वागत है",
      subtitle: "आसानी से अद्भुत एप्लिकेशन बनाएं",
    },
  },
} satisfies Dictionary;
```

## सामग्री फ़ाइल एक्सटेंशन

Intlayer आपको अपनी सामग्री घोषणा फ़ाइलों के एक्सटेंशनों को अनुकूलित करने की अनुमति देता है। यह अनुकूलन बड़े पैमाने पर परियोजनाओं के प्रबंधन में लचीलापन प्रदान करता है और अन्य मॉड्यूल के साथ संघर्ष से बचने में मदद करता है।

### डिफ़ॉल्ट एक्सटेंशन

डिफ़ॉल्ट रूप से, Intlayer निम्नलिखित एक्सटेंशनों वाली सभी फ़ाइलों को सामग्री घोषणाओं के लिए देखता है:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

ये डिफ़ॉल्ट एक्सटेंशन अधिकांश अनुप्रयोगों के लिए उपयुक्त हैं। हालांकि, जब आपकी विशिष्ट आवश्यकताएँ होती हैं, तो आप कस्टम एक्सटेंशन परिभाषित कर सकते हैं ताकि बिल्ड प्रक्रिया को सुव्यवस्थित किया जा सके और अन्य घटकों के साथ संघर्ष के जोखिम को कम किया जा सके।

> सामग्री घोषणा फ़ाइलों की पहचान के लिए Intlayer द्वारा उपयोग किए जाने वाले फ़ाइल एक्सटेंशन को अनुकूलित करने के लिए, आप उन्हें Intlayer कॉन्फ़िगरेशन फ़ाइल में निर्दिष्ट कर सकते हैं। यह तरीका बड़े पैमाने पर परियोजनाओं के लिए लाभकारी है जहाँ वॉच प्रक्रिया के दायरे को सीमित करने से बिल्ड प्रदर्शन में सुधार होता है।

## उन्नत अवधारणाएँ

### शब्दकोश मर्जिंग

जब कई शब्दकोशों की एक ही कुंजी होती है, तो Intlayer उन्हें स्वचालित रूप से मर्ज करता है। मर्जिंग व्यवहार कई कारकों पर निर्भर करता है:

- **प्राथमिकता**: उच्च `priority` मान वाले शब्दकोश निम्न मान वाले शब्दकोशों को ओवरराइड करते हैं
- **ऑटो-फिल बनाम बेस**: बेस शब्दकोश ऑटो-फिल किए गए शब्दकोशों को ओवरराइड करते हैं
- **स्थान**: स्थानीय शब्दकोश दूरस्थ शब्दकोशों को ओवरराइड करते हैं (जब प्राथमिकताएँ समान हों)

### टाइप सुरक्षा

Intlayer सामग्री फ़ाइलों के लिए पूर्ण TypeScript समर्थन प्रदान करता है:

```typescript
// अपनी सामग्री प्रकार परिभाषित करें
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// इसे अपने शब्दकोश में उपयोग करें
export default {
  key: "welcome-page",
  content: {
    // TypeScript ऑटोकंप्लीट और टाइप जांच प्रदान करेगा
    hero: {
      title: "Welcome",
      subtitle: "Build amazing apps",
      cta: "Get Started",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### नोड इम्ब्रिकेशन

आप बिना किसी समस्या के एक फ़ंक्शन को दूसरे फ़ंक्शन के अंदर इम्ब्रिकेट कर सकते हैं।

उदाहरण :

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` लौटाता है `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // संयोजित सामग्री जिसमें condition, enumeration, और बहुभाषी सामग्री इम्ब्रिकेट की गई है
    // `getIntlayer('page','en').advancedContent(true)(10)` लौटाता है 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "एक आइटम मिला",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "कई आइटम मिले",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "कोई मान्य डेटा उपलब्ध नहीं है",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` लौटाता है `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // संयोजित सामग्री जिसमें शर्त, गणना, और बहुभाषी सामग्री शामिल है
    // `getIntlayer('page','en').advancedContent(true)(10)` लौटाता है 'कई आइटम मिले'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` लौटाता है `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // संयोजित सामग्री जो शर्त, गणना, और बहुभाषी सामग्री को जोड़ती है
    // `getIntlayer('page','en').advancedContent(true)(10)` लौटाता है 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Hi",
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                "en": "कोई आइटम नहीं मिला",
                "fr": "Aucun article trouvé",
                "es": "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                "en": "एक आइटम मिला",
                "fr": "Un article trouvé",
                "es": "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "कई आइटम मिले",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "कोई मान्य डेटा उपलब्ध नहीं है",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### सर्वोत्तम प्रथाएँ

1. **नामकरण सम्मेलन**:
   - शब्दकोश कुंजियों के लिए kebab-case का उपयोग करें (`"about-page-meta"`)
   - संबंधित सामग्री को एक ही कुंजी उपसर्ग के तहत समूहित करें

2. **सामग्री संगठन**:
   - संबंधित सामग्री को एक ही शब्दकोश में एक साथ रखें
   - जटिल सामग्री संरचनाओं को व्यवस्थित करने के लिए नेस्टेड ऑब्जेक्ट्स का उपयोग करें
   - वर्गीकरण के लिए टैग का उपयोग करें
   - गायब अनुवादों को स्वचालित रूप से भरने के लिए `autoFill` का उपयोग करें

3. **प्रदर्शन**:
   - देखे गए फ़ाइलों के दायरे को सीमित करने के लिए सामग्री कॉन्फ़िगरेशन को समायोजित करें
   - केवल तब लाइव शब्दकोश का उपयोग करें जब वास्तविक समय अपडेट आवश्यक हों, (जैसे A/B परीक्षण, आदि)
   - सुनिश्चित करें कि बिल्ड ट्रांसफ़ॉर्मेशन प्लगइन (`@intlayer/swc`, या `@intlayer/babel`) सक्षम है ताकि बिल्ड समय पर शब्दकोश का अनुकूलन किया जा सके

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                     |
| ------- | ---------- | ---------------------------- |
| 6.0.0   | 2025-09-20 | फ़ील्ड्स दस्तावेज़ीकरण जोड़ा |
| 5.5.10  | 2025-06-29 | इतिहास प्रारंभ किया          |
