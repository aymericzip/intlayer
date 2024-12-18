# दस्तावेज़: `getTranslationContent` फ़ंक्शन `intlayer` में

## विवरण:

`getTranslationContent` फ़ंक्शन एक सेट से प्रशंस्कृत भाषा सामग्री के अनुसार एक विशेष स्थानीय लिए सामग्री पुनर्प्राप्त करता है। यदि निर्दिष्ट स्थानीय नहीं मिलता है, तो यह परियोजना में कॉन्फ़िगर की गई डिफ़ॉल्ट स्थानीय के लिए सामग्री लौटाने के लिए डिफ़ॉल्ट रूप से लौटता है।

## पैरामीटर:

- `languageContent: CustomizableLanguageContent<Content>`

  - **विवरण**: विभिन्न स्थानीय के लिए अनुवादों वाली एक वस्तु। प्रत्येक कुंजी एक स्थानीय का प्रतिनिधित्व करती है, और इसका मान संबंधित सामग्री है।
  - **प्रकार**: `CustomizableLanguageContent<Content>`
    - `Content` कोई भी प्रकार हो सकता है, डिफ़ॉल्ट रूप से `string`।

- `locale: Locales`

  - **विवरण**: वह स्थानीय जिसके लिए सामग्री को पुनर्प्राप्त किया जाना है।
  - **प्रकार**: `Locales`

## लौटाता है:

- **प्रकार**: `Content`
- **विवरण**: निर्दिष्ट स्थानीय के लिए संबंधित सामग्री। यदि स्थानीय नहीं मिलती है, तो डिफ़ॉल्ट स्थानीय की सामग्री लौटाई जाती है।

## उदाहरण उपयोग:

### मूल उपयोग:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // आउटपुट: "Bonjour"
```

### गायब स्थानीय:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // आउटपुट: "Hello" (डिफ़ॉल्ट स्थानीय सामग्री)
```

### कस्टम सामग्री प्रकारों का उपयोग करना:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // आउटपुट: "Bonjour"
```

## किनारे के मामले:

- **स्थानीय नहीं मिला:**
  - जब `locale` `languageContent` में नहीं मिलता है, तो फ़ंक्शन डिफ़ॉल्ट स्थानीय के लिए सामग्री लौटाता है।
- **अपूर्ण भाषा सामग्री:**

  - यदि एक स्थानीय आंशिक रूप से परिभाषित है, तो फ़ंक्शन सामग्री को मिलाता नहीं है। यह विशेष रूप से निर्दिष्ट स्थानीय का मान पुनर्प्राप्त करता है या डिफ़ॉल्ट पर वापस लौटता है।

- **TypeScript प्रवर्तन:**
  - यदि `languageContent` में स्थानीय परियोजना कॉन्फ़िगरेशन से मेल नहीं खाती, तो TypeScript सभी आवश्यक स्थानीय की परिभाषा लागू करेगा, यह सुनिश्चित करते हुए कि सामग्री पूरी और प्रकार-सुरक्षित है।
