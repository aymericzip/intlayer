# Documentation: `getTranslationContent` Function in `intlayer`

## Description:

`getTranslationContent` फ़ंक्शन एक सेट के अनुकूलनशील भाषा सामग्री से एक विशिष्ट स्थानीय भाषा के लिए सामग्री को लाता है। यदि निर्दिष्ट लोकल नहीं मिलती है, तो यह परियोजना में कॉन्फ़िगर की गई डिफ़ॉल्ट लोकल की सामग्री लौटाने के लिए डिफ़ॉल्ट करती है।

## Parameters:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Description**: विभिन्न लोकल के लिए अनुवादों को शामिल करने वाला एक ऑब्जेक्ट। प्रत्येक कुंजी एक लोकल का प्रतिनिधित्व करती है, और इसकी वैल्यू संबंधित सामग्री है।
  - **Type**: `CustomizableLanguageContent<Content>`
    - `Content` किसी भी प्रकार की हो सकती है, जो कि डिफ़ॉल्ट रूप से `string` होती है।

- `locale: Locales`

  - **Description**: वह लोकल जिसके लिए सामग्री प्राप्त की जानी है।
  - **Type**: `Locales`

## Returns:

- **Type**: `Content`
- **Description**: निर्दिष्ट लोकल के लिए संबंधित सामग्री। यदि लोकल नहीं मिलती है, तो डिफ़ॉल्ट लोकल की सामग्री लौटाई जाती है।

## Example Usage:

### Basic Usage:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Missing Locale:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (डिफ़ॉल्ट लोकल की सामग्री)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (डिफ़ॉल्ट लोकल की सामग्री)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (डिफ़ॉल्ट लोकल की सामग्री)
```

### Using Custom Content Types:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Edge Cases:

- **Locale Not Found:**
  - जब `locale` `languageContent` में नहीं मिलती है, तो फ़ंक्शन डिफ़ॉल्ट लोकल की सामग्री लौटाता है।
- **Incomplete Language Content:**

  - यदि एक लोकल आंशिक रूप से परिभाषित है, तो फ़ंक्शन सामग्री को नहीं मिलाता है। यह सख्ती से निर्दिष्ट लोकल का मान प्राप्त करता है या डिफ़ॉल्ट पर वापस जाता है।

- **TypeScript Enforcement:**
  - यदि `languageContent` में लोकल परियोजना कॉन्फ़िगरेशन से मेल नहीं खाती हैं, तो TypeScript सभी आवश्यक लोकल को परिभाषित करने के लिए बाध्य करेगा, यह सुनिश्चित करते हुए कि सामग्री पूरी और प्रकार-सुरक्षित है।
