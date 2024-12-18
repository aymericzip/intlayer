# Documentation: `getPathWithoutLocale` Functions in `intlayer`

## Description:

दी गई यूआरएल या पथ से स्थानीयकृत खंड को हटा देता है यदि उपस्थित हो। यह पूर्ण यूआरएल और सापेक्ष पथ दोनों के साथ काम करता है।

## Parameters:

- `inputUrl: string`

  - **Description**: प्रक्रिया के लिए पूर्ण यूआरएल स्ट्रिंग या पथ।
  - **Type**: `string`

- `locales: Locales[]`
  - **Description**: समर्थित स्थानीय भाषाओं का वैकल्पिक सरणी। परियोजना में कॉन्फ़िगर की गई स्थानीय भाषाओं पर डिफ़ॉल्ट।
  - **Type**: `Locales[]`

## Returns:

- **Type**: `string`
- **Description**: बिना स्थानीयकृत खंड के यूआरएल स्ट्रिंग या पथ।

## Example Usage:

```typescript
import { getPathWithoutLocale } from "intlayer";

// इनपुट पथ से स्थानीयकृत खंड हटाएँ
console.log(getPathWithoutLocale("/dashboard")); // Output: "/dashboard"
// '/en/dashboard' से स्थानीयकृत खंड हटाएँ
console.log(getPathWithoutLocale("/en/dashboard")); // Output: "/dashboard"
// '/fr/dashboard' से स्थानीयकृत खंड हटाएँ
console.log(getPathWithoutLocale("/fr/dashboard")); // Output: "/dashboard"
// पूर्ण यूआरएल से स्थानीयकृत खंड हटाएँ
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Output: "https://example.com/dashboard"
```
