# दस्तावेज़: `getPathWithoutLocale` फ़ंक्शन `intlayer` में

## विवरण

दिए गए URL या पथनाम से स्थानीय खंड को हटा देता है यदि वह मौजूद हो। यह पूर्ण URLs और सापेक्ष पथनाम दोनों के साथ काम करता है।

## पैरामीटर

- `inputUrl: string`

  - **विवरण**: प्रक्रिया के लिए पूर्ण URL स्ट्रिंग या पथनाम।
  - **प्रकार**: `string`

- `locales: Locales[]`
  - **विवरण**: समर्थित स्थानीयताओं की वैकल्पिक सूची। प्रोजेक्ट में कॉन्फ़िगर की गई स्थानीयताओं को डिफ़ॉल्ट करता है।
  - **प्रकार**: `Locales[]`

## रिटर्न्स

- **प्रकार**: `string`
- **विवरण**: स्थानीय खंड के बिना URL स्ट्रिंग या पथनाम।

## उदाहरण उपयोग

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // आउटपुट: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // आउटपुट: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // आउटपुट: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // आउटपुट: "https://example.com/dashboard"
```
