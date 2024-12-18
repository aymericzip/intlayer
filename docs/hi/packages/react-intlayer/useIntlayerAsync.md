# React Integration: `useIntlayerAsync` Hook Documentation

`useIntlayerAsync` हुक `useIntlayer` की कार्यक्षमता को बढ़ाता है और न केवल प्री-रेंडर्ड शब्दकोष लौटाता है बल्कि असynchronously अपडेट भी लाता है, जिससे यह उन अनुप्रयोगों के लिए आदर्श है जो प्रारंभिक रेंडर के बाद अपने स्थानीयकृत सामग्री को अक्सर अपडेट करते हैं।

## Overview

- **असिंक्रोनस शब्दकोष लोडिंग:**  
  प्रारंभिक माउंट पर, `useIntlayerAsync` पहले किसी प्री-फेच्ड या स्थैतिक बंडल किए गए स्थानीयकृत शब्दकोष को लौटाता है (जैसे कि `useIntlayer` करेगा) और फिर असynchronously नई उपलब्ध दूरस्थ शब्दकोष को लाने और मर्ज करने का कार्य करता है।
- **प्रगति स्थिति प्रबंधन:**  
  हुक एक `isLoading` स्थिति भी प्रदान करता है, जो यह इंगीत करता है कि दूरस्थ शब्दकोष लाया जा रहा है। इससे डेवलपर्स को लोडिंग संकेतक या कंकाली स्थितियों को प्रदर्शित करने की अनुमति मिलती है, जिससे उपयोगकर्ता अनुभव में सुधार होता है।

## Environment Setup

Intlayer एक हेडलेस कंटेंट सोर्स मैनेजमेंट (CSM) प्रणाली प्रदान करता है जो गैर-डेवलपर्स को अनुप्रयोग सामग्री को सहजता से प्रबंधित और अपडेट करने में सक्षम बनाता है। Intlayer की सहज डैशबोर्ड का उपयोग करके, आपकी टीम बिना सीधे कोड को संशोधित किए अपने स्थानीयकृत पाठ, छवियों और अन्य संसाधनों को संपादित कर सकती है। यह सामग्री प्रबंधन प्रक्रिया को सरल बनाता है, सहयोग को बढ़ावा देता है, और सुनिश्चित करता है कि अपडेट तेजी से और आसानी से किए जा सकें।

Intlayer के साथ शुरू करने के लिए:

1. **एक्सेस टोकन प्राप्त करें** [https://intlayer.org/dashboard](https://intlayer.org/dashboard) पर।
2. **अपने कॉन्फ़िगरेशन फ़ाइल में क्रेडेंशियल जोड़ें:**  
   अपने React प्रोजेक्ट में, अपने क्रेडेंशियल के साथ Intlayer क्लाइंट को कॉन्फ़िगर करें:

   ```typescript
   import { type IntlayerConfig } from 'intlayer';

   export default {
     ...
     editor: {
       clientId: process.env.INTLAYER_CLIENT_ID,
       clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     },
   } satisfies  IntlayerConfig
   ```

3. **Intlayer पर एक नया स्थानीयकृत शब्दकोष पुश करें:**

   ```bash
   npm intlayer push -d my-first-dictionary-key
   ```

   यह कमांड आपके प्रारंभिक सामग्री शब्दकोष को अपलोड करता है, जिससे यह Intlayer प्लेटफ़ॉर्म के माध्यम से असynchronously लाने और संपादित करने के लिए उपलब्ध हो जाता है।

## Importing `useIntlayerAsync` in React

अपने React घटकों में, `useIntlayerAsync` आयात करें:

```tsx
import { useIntlayerAsync } from "react-intlayer";
```

## Parameters

1. **`key`**:  
   **Type**: `DictionaryKeys`  
   शब्दकोष कुंजी जो स्थानीयकृत सामग्री ब्लॉक की पहचान के लिए उपयोग की जाती है। यह कुंजी आपके सामग्री घोषणा फ़ाइलों में परिभाषित की जानी चाहिए।

2. **`locale`** (वैकल्पिक):  
   **Type**: `Locales`  
   वह विशिष्ट स्थानीयकृत जिसे आप लक्षित करना चाहते हैं। यदि omit किया गया है, तो हुक वर्तमान Intlayer संदर्भ से स्थानीयकृत का उपयोग करता है।

3. **`isRenderEditor`** (वैकल्पिक, डिफ़ॉल्ट `true` पर):  
   **Type**: `boolean`  
   यह निर्धारित करता है कि सामग्री Intlayer संपादक ओवरले के साथ रेंडर करने के लिए तैयार होनी चाहिए या नहीं। यदि `false` पर सेट किया गया है, तो लौटाए गए शब्दकोष डेटा में संपादक-विशिष्ट विशेषताएँ शामिल नहीं होंगी।

## Return Value

यह हुक एक शब्दकोष वस्तु लौटाता है जिसमें `key` और `locale` द्वारा कुंजीबद्ध स्थानीयकृत सामग्री होती है। इसमें एक `isLoading` बूलियन भी शामिल है जो इंगीत करता है कि वर्तमान में दूरस्थ शब्दकोष लाया जा रहा है या नहीं।

## Example Usage in a React Component

```tsx
import { useEffect } from "react";
import { useIntlayerAsync } from "react-intlayer";

export const AsyncClientComponentExample = () => {
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
          <p>कृपया प्रतीक्षा करें जब तक सामग्री अपडेट होती है।</p>
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

**Key Points:**

- प्रारंभिक रेंडर पर, `title` और `description` प्री-फेच्ड या स्थैतिक रूप से एम्बेडेड स्थानीयकृत शब्दकोष से आते हैं।
- जब `isLoading` `true` है, तो एक बैकग्राउंड अनुरोध एक अपडेटेड शब्दकोष लाता है।
- जब लाने की प्रक्रिया पूरी होती है, तो `title` और `description` को नवीनतम सामग्री के साथ अपडेट किया जाता है, और `isLoading` `false` पर वापस लौटता है।

## Handling Attribute Localization

आप विभिन्न HTML गुणों (जैसे, `alt`, `title`, `aria-label`) के लिए स्थानीयकृत एट्रिब्यूट वैल्यूज भी प्राप्त कर सकते हैं:

```tsx
<img src={title.image.src.value} alt={title.image.alt.value} />
```

## Content Declaration Files

सभी सामग्री कुंजी को आपके सामग्री घोषणा फ़ाइलों में परिभाषित किया जाना चाहिए ताकि प्रकार सुरक्षा सुनिश्चित हो सके और रन टाइम त्रुटियों से बचा जा सके। ये फ़ाइलें TypeScript मान्यता सक्षम करती हैं, यह सुनिश्चित करते हुए कि आप हमेशा मौजूदा कुंजी और स्थानीयकृत को संदर्भित करते हैं।

सामग्री घोषणा फ़ाइलों को सेटअप करने के निर्देश [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) उपलब्ध हैं।

## Further Information

- **Intlayer दृश्य संपাদক:**  
  UI से सीधे सामग्री को प्रबंधित और संपादित करने के लिए Intlayer दृश्य संपादक के साथ एकीकृत करें। अधिक विवरण [यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md)।

---

**संक्षेप में**, `useIntlayerAsync` एक शक्तिशाली React हुक है जिसे उपयोगकर्ता अनुभव को बढ़ाने और प्री-रेंडर्ड या प्री-फेच्ड शब्दकोषों के साथ असंकलित शब्दकोष अपडेट को मर्ज करके सामग्री की ताजगी बनाए रखने के लिए डिज़ाइन किया गया है। `isLoading` और TypeScript-आधारित सामग्री की घोषणाओं का उपयोग करके, आप अपने React अनुप्रयोगों में गतिशील, स्थानीयकृत सामग्री को सहजता से एकीकृत कर सकते हैं।
