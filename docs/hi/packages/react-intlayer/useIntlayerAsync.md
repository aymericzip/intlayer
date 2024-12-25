# React Integration: `useIntlayerAsync` Hook Documentation

`useIntlayerAsync` हुक `useIntlayer` की कार्यक्षमता को बढ़ाता है, न केवल पूर्व-रैण्डर्ड शब्दकोश को लौटाकर बल्कि असिंक्रोनस रूप से अपडेट को भी लाकर, जिससे यह उन अनुप्रयोगों के लिए आदर्श बनता है जो प्रारंभिक रेंडर के बाद अक्सर अपने स्थानीयकृत सामग्री को अपडेट करते हैं।

## ओवरव्यू

- **असिंक्रोनस शब्दकोश लोडिंग:**  
  प्रारंभिक माउंट पर, `useIntlayerAsync` पहले कोई पूर्व-फेच या स्थिर रूप से बंडल किए गए लोकल शब्दकोश (जैसे `useIntlayer` करेगा) लौटाता है और फिर असिंक्रोनस रूप से नए उपलब्ध दूरस्थ शब्दकोशों को लाने और मर्ज करने के लिए।
- **प्रगति स्थिति प्रबंधन:**  
  हुक एक `isLoading` स्थिति भी प्रदान करता है, जो यह संकेत करता है कि एक दूरस्थ शब्दकोश लाया जा रहा है। यह डेवलपर्स को लोडिंग संकेतक या कंकाल राज्यों को प्रदर्शित करने की अनुमति देता है जिससे उपयोगकर्ता अनुभव बेहतर होता है।

## वातावरण सेटअप

Intlayer एक हेडलेस सामग्री स्रोत प्रबंधन (CSM) प्रणाली प्रदान करता है जो गैर-डेवलपर्स को अनुप्रयोग सामग्री को सुचारू रूप से प्रबंधित और अपडेट करने में सक्षम बनाता है। Intlayer के सहज डैशबोर्ड का उपयोग करके, आपकी टीम स्थानीयकृत टेक्स्ट, छवियों और अन्य संसाधनों को सीधे कोड में परिवर्तन किए बिना संपादित कर सकती है। यह सामग्री प्रबंधन प्रक्रिया को सरल बनाता है, सहयोग को बढ़ावा देता है और यह सुनिश्चित करता है कि अपडेट जल्दी और आसानी से किए जा सकें।

Intlayer के साथ शुरू करने के लिए:

1. **एक्सेस टोकन के लिए पंजीकरण करें और प्राप्त करें** [https://intlayer.org/dashboard](https://intlayer.org/dashboard)।
2. **अपने कॉन्फ़िगरेशन फ़ाइल में क्रेडेंशियल्स जोड़ें:**  
   अपने React प्रोजेक्ट में, अपने क्रेडेंशियल्स के साथ Intlayer क्लाइंट को कॉन्फ़िगर करें:

   ```typescript fileName="intlayer.config.ts" codeFormat="typescript"
   import type { IntlayerConfig } from "intlayer";

   export default {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies IntlayerConfig;
   ```

   ```javascript fileName="intlayer.config.mjs" codeFormat="esm"
   import { type IntlayerConfig } from "intlayer";

   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   };

   export default config;
   ```

   ```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
   const { type IntlayerConfig } = require("intlayer");

   /** @type {import('intlayer').IntlayerConfig} */
   const config = {
     // ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   };

   module.exports = config;
   ```

3. **Intlayer पर एक नया स्थानीयकृत शब्दकोश पुश करें:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   यह कमांड आपकी प्रारंभिक सामग्री शब्दकोशों को अपलोड करता है, जिससे वे Intlayer प्लेटफ़ॉर्म के माध्यम से असिंक्रोनस रूप से लाने और संपादित करने के लिए उपलब्ध होते हैं।

## React में `useIntlayerAsync` आयात करना

अपने React घटकों में, `useIntlayerAsync` को आयात करें:

```ts codeFormat="typescript"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="esm"
import { useIntlayerAsync } from "react-intlayer";
```

```js codeFormat="commonjs"
const { useIntlayerAsync } = require("react-intlayer");
```

## पैरामीटर

1. **`key`**:  
   **प्रकार**: `DictionaryKeys`  
   स्थानीयकृत सामग्री ब्लॉक की पहचान के लिए उपयोग किया जाने वाला शब्दकोश कुंजी। यह कुंजी आपके सामग्री घोषणा फ़ाइलों में परिभाषित होनी चाहिए।

2. **`locale`** (वैकल्पिक):  
   **प्रकार**: `Locales`  
   विशिष्ट स्थानीयकरण जिसे आप लक्षित करना चाहते हैं। यदि छोड़ा गया, तो हुक वर्तमान Intlayer संदर्भ से स्थानीयकरण का उपयोग करता है।

3. **`isRenderEditor`** (वैकल्पिक, डिफ़ॉल्ट `true`):  
   **प्रकार**: `boolean`  
   निर्धारित करता है कि सामग्री को Intlayer संपादक ओवरले के साथ रेंडरिंग के लिए तैयार होना चाहिए या नहीं। यदि `false` पर सेट किया गया है, तो लौटाया गया शब्दकोश डेटा संपादक-विशिष्ट कार्यों को बाहर करेगा।

## परिणाम मूल्य

हुक एक शब्दकोश वस्तु लौटाता है जिसमें स्थानीयकृत सामग्री होती है जो `key` और `locale` द्वारा कुंजीबद्ध होती है। इसमें एक `isLoading` बूलियन भी शामिल है जो यह संकेत करता है कि क्या कोई दूरस्थ शब्दकोश वर्तमान में लाया जा रहा है।

## React घटक में उदाहरण उपयोग

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import { useEffect, type FC } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const ComponentExample: FC = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>लोड हो रहा है…</h1>
          <p>कृपया रुकें जबकि सामग्री अपडेट हो रही है।</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>लोड हो रहा है…</h1>
          <p>कृपया रुकें जबकि सामग्री अपडेट हो रही है।</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useIntlayerAsync } = require("react-intlayer");

const ComponentExample = () => {
  const { title, description, isLoading } = useIntlayerAsync("async-component");

  useEffect(() => {
    if (isLoading) {
      console.log("सामग्री लोड हो रही है...");
    }
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>लोड हो रहा है…</h1>
          <p>कृपया रुकें जबकि सामग्री अपडेट हो रही है।</p>
        </div>
      ) : (
        <div>
          <h1>{title.value}</h1>
          <p>{description.value}</p>
        </div>
      )}
    </div>
  );
};
```

**मुख्य बिंदु:**

- प्रारंभिक रेंडर पर, `title` और `description` पूर्व-फेच या स्थिर रूप से एम्बेडेड लोकल शब्दकोश से आते हैं।
- जब तक `isLoading` `true` है, एक बैकग्राउंड अनुरोध एक अपडेट किया गया शब्दकोश लाता है।
- जैसे ही फेच पूरा होता है, `title` और `description` नवीनतम सामग्री के साथ अपडेट होते हैं, और `isLoading` `false` पर लौटता है।

## विशेषता स्थानीयकरण प्रबंधन

आप विभिन्न HTML गुणों (जैसे `alt`, `title`, `aria-label`) के लिए स्थानीयकृत विशेषता मान भी प्राप्त कर सकते हैं:

```jsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## सामग्री घोषणा फ़ाइलें

सभी सामग्री कुंजियों को आपके सामग्री घोषणा फ़ाइलों में परिभाषित किया जाना चाहिए जिससे टाइप सुरक्षा सुनिश्चित होती है और रनटाइम त्रुटियों को रोका जा सके। ये फ़ाइलें TypeScript प्रमाणीकरण सक्षम करती हैं, यह सुनिश्चित करते हुए कि आप हमेशा मौजूदा कुंजियों और स्थानीयकरणों का संदर्भ लेते हैं।

सामग्री घोषणा फ़ाइलें सेट करने के लिए निर्देश उपलब्ध हैं [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md)。

## आगे की जानकारी

- **Intlayer विजुअल संपादक:**  
  UI से सीधे सामग्री को प्रबंधित और संपादित करने के लिए Intlayer विजुअल संपादक के साथ एकीकृत करें। अधिक जानकारी [यहां](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md)।

---

**संक्षेप में**, `useIntlayerAsync` एक शक्तिशाली React हुक है जिसे उपयोगकर्ता अनुभव को बढ़ाने और सामाग्री ताजगी बनाए रखने के लिए डिज़ाइन किया गया है, जो पूर्व-रैण्डर्ड या पूर्व-फेच किए गए शब्दकोशों को असिंक्रोनस शब्दकोश अपडेट के साथ मर्ज करता है। `isLoading` और TypeScript आधारित सामग्री घोषणाओं का लाभ उठाते हुए, आप अपने React अनुप्रयोगों में गतिशील, स्थानीयकृत सामग्री का सहजता से समावेश कर सकते हैं।
