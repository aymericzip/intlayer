# अंतर्राष्ट्रीयकरण Intlayer और i18next के साथ

i18next एक ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) ढांचा है जो जावास्क्रिप्ट अनुप्रयोगों के लिए डिज़ाइन किया गया है। इसका व्यापक रूप से सॉफ़्टवेयर परियोजनाओं में अनुवाद, स्थानीयकरण और भाषा स्विचिंग को प्रबंधित करने के लिए उपयोग किया जाता है। हालाँकि, इसमें कुछ सीमाएँ हैं जो बढ़ने और विकास को जटिल बना सकती हैं।

Intlayer एक अन्य अंतर्राष्ट्रीयकरण ढांचा है जो इन सीमाओं का समाधान करता है, सामग्री स्पष्टता और प्रबंधन के लिए अधिक लचीला दृष्टिकोण प्रदान करता है। चलिए हम i18next और Intlayer के बीच कुछ प्रमुख अंतरों का पता लगाते हैं, और अंतर्राष्ट्रीयकरण के लिए दोनों को कैसे कॉन्फ़िगर करें।

## Intlayer बनाम i18next: प्रमुख अंतर

### 1. सामग्री की घोषणा

i18next के साथ, अनुवाद शब्दकोष को एक विशिष्ट फ़ोल्डर में घोषित किया जाना चाहिए, जिससे अनुप्रयोग की स्केलेबिलिटी जटिल हो सकती है। इसके विपरीत, Intlayer आपकी संकुल के समान निर्देशिका में सामग्री की घोषणा करने की अनुमति देता है। इसके कई फायदे हैं:

- **सरल सामग्री संपादन**: उपयोगकर्ताओं को संपादित करने के लिए सही शब्दकोश खोजने की आवश्यकता नहीं होती, जिससे त्रुटियों की संभावना कम होती है।
- **स्वचालित अनुकूलन**: यदि कोई संकुल स्थानांतरित होता है या हटा दिया जाता है, तो Intlayer स्वचालित रूप से पता लगाता है और अनुकूलित करता है।

### 2. कॉन्फ़िगरेशन जटिलता

i18next को कॉन्फ़िगर करना जटिल हो सकता है, विशेष रूप से सर्वर-साइड संकुलों के साथ या Next.js जैसे फ़्रेमवर्क के लिए मिडलवेयर कॉन्फ़िगर करते समय। Intlayer इस प्रक्रिया को सरल बनाता है, और अधिक सरल कॉन्फ़िगरेशन प्रदान करता है।

### 3. अनुवाद शब्दकोष की स्थिरता

विभिन्न भाषाओं में अनुवाद शब्दकोषों की स्थिरता सुनिश्चित करना i18next के साथ चुनौतीपूर्ण हो सकता है। अगर इसे ठीक से नहीं संभाला गया तो यह अनुप्रयोग को क्रैश कर सकता है। Intlayer इस समस्या का समाधान करके अनुवादित सामग्री पर बाधाएँ लागू करता है, सुनिश्चित करता है कि कोई अनुवाद छूटा नहीं है और अनुवादित सामग्री सटीक है।

### 4. TypeScript एकीकरण

Intlayer को TypeScript के साथ बेहतर एकीकरण प्रदान करता है, जो आपके कोड में सामग्री के स्वचालित सुझावों की अनुमति देता है, जिससे विकास की दक्षता बढ़ती है।

### 5. अनुप्रयोगों में सामग्री साझा करना

Intlayer कई अनुप्रयोगों और साझा पुस्तकालयों के बीच सामग्री घोषणा फ़ाइलों को साझा करने की सुविधा देता है। यह सुविधा बड़े कोडबेस में सुसंगत अनुवाद बनाए रखना सरल बनाती है।

## Intlayer के साथ i18next शब्दकोष कैसे उत्पन्न करें

### Intlayer को i18next शब्दकोष निर्यात करने के लिए कॉन्फ़िगर करना

> महत्वपूर्ण नोट्स

> i18next शब्दकोषों का निर्यात वर्तमान में बीटा में है और अन्य ढांचों के साथ 1: 1 संगतता सुनिश्चित नहीं करता है। मुद्दों को न्यूनतम करने के लिए Intlayer आधारित कॉन्फ़िगरेशन पर बनाए रखना अनुशंसित है।

i18next शब्दकोष निर्यात करने के लिए, आपको Intlayer को उपयुक्त रूप से कॉन्फ़िगर करना होगा। नीचे दिए गए उदाहरण में दिखाया गया है कि Intlayer को कैसे सेटअप करें ताकि यह Intlayer और i18next दोनों शब्दकोषों को निर्यात करे।

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Intlayer को यह बताना कि वह Intlayer और i18next दोनों शब्दकोषों को निर्यात करेगा
    dictionaryOutput: ["intlayer", "i18next"],
    // प्रोजेक्ट रूट से उस निर्देशिका के सापेक्ष पथ जहां i18n शब्दकोष निर्यात किए जाएंगे
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Intlayer को यह बताना कि वह Intlayer और i18next दोनों शब्दकोषों को निर्यात करेगा
    dictionaryOutput: ["intlayer", "i18next"],
    // प्रोजेक्ट रूट से उस निर्देशिका के सापेक्ष पथ जहां i18n शब्दकोष निर्यात किए जाएंगे
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Intlayer को यह बताना कि वह Intlayer और i18next दोनों शब्दकोषों को निर्यात करेगा
    dictionaryOutput: ["intlayer", "i18next"],
    // प्रोजेक्ट रूट से उस निर्देशिका के सापेक्ष पथ जहां i18n शब्दकोष निर्यात किए जाएंगे
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

module.exports = config;
```

कॉन्फ़िगरेशन में 'i18next' को शामिल करके, Intlayer i18next शब्दकोषों के साथ-साथ Intlayer शब्दकोष भी उत्पन्न करता है। ध्यान दें कि कॉन्फ़िगरेशन से 'intlayer' को हटाने से React-Intlayer या Next-Intlayer के साथ संगतता टूट सकती है।

### अपने i18next कॉन्फ़िगरेशन में शब्दकोष आयात करना

आप अपने i18next कॉन्फ़िगरेशन में उत्पन्न शब्दकोष को आयात करने के लिए 'i18next-resources-to-backend' का उपयोग कर सकते हैं। यहां दिए गए उदाहरण में दिखाया गया है कि आप अपने i18next शब्दकोष को कैसे आयात कर सकते हैं:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // आपका i18next कॉन्फ़िगरेशन
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // आपका i18next कॉन्फ़िगरेशन
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // आपका i18next कॉन्फ़िगरेशन
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```
