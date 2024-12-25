# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description:

दिए गए URL या पथ नाम से स्थानीय खंड को हटा देता है यदि उपस्थित हो। यह पूर्ण URLs और सापेक्ष पथ नामों दोनों के साथ काम करता है।

## Parameters:

- `inputUrl: string`

  - **Description**: प्रक्रिया में लेने के लिए पूरा URL स्ट्रिंग या पथ नाम।
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: समर्थित स्थानीयताओं का वैकल्पिक ऐरे। परियोजना में कॉन्फ़िगर की गई स्थानीयताओं को डिफ़ॉल्ट के रूप में सेट किया गया है।
  - **Type**: `Locales[]`

## Returns:

- **Type**: `string`
- **Description**: बिना स्थानीय खंड के URL स्ट्रिंग या पथ नाम।

## Example Usage:

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Output: "https://example.com/dashboard"
```
