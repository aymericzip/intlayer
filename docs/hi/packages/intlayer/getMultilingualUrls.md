# Documentation: `getMultilingualUrls` Function in `intlayer`

## Description:

`getMultilingualUrls` फ़ंक्शन बहुभाषी URL का मैप तैयार करता है, जो दिए गए URL को प्रत्येक समर्थित लोकल के साथ प्रीफिक्स करता है। यह पूर्ण और सापेक्ष दोनों URLs को संभाल सकता है, प्रदान की गई कॉन्फ़िगरेशन या डिफ़ॉल्ट के आधार पर उपयुक्त लोकल प्रीफिक्स लागू करता है।

---

## Parameters:

- `url: string`

  - **Description**: ओरिजिनल URL स्ट्रिंग जिसे लोकल के साथ प्रीफिक्स किया जाना है।
  - **Type**: `string`

- `locales: Locales[]`

  - **Description**: समर्थित लोकल का वैकल्पिक ऐरे। प्रोजेक्ट में कॉन्फ़िगर किए गए लोकल के रूप में डिफ़ॉल्ट होता है।
  - **Type**: `Locales[]`
  - **Default**: `localesDefault`

- `defaultLocale: Locales`

  - **Description**: एप्लिकेशन के लिए डिफ़ॉल्ट लोकल। प्रोजेक्ट में कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल के रूप में डिफ़ॉल्ट होता है।
  - **Type**: `Locales`
  - **Default**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Description**: क्या डिफ़ॉल्ट लोकल को प्रीफिक्स किया जाना चाहिए। प्रोजेक्ट में कॉन्फ़िगर किए गए मान के रूप में डिफ़ॉल्ट होता है।
  - **Type**: `boolean`
  - **Default**: `prefixDefaultDefault`

### Returns:

- **Type**: `IConfigLocales<string>`
- **Description**: प्रत्येक लोकल को उसके संबंधित बहुभाषी URL से मैप करने वाला एक ऑब्जेक्ट।

---

## Example Usage:

### Relative URLs:

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Output: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### Absolute URLs:

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Output: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Edge Cases:

- **No Locale Segment:**

  - फ़ंक्शन URL से पहले से मौजूद किसी भी लोकल खंड को हटा देता है, इससे पहले कि बहुभाषी मैपिंग उत्पन्न की जाए।

- **Default Locale:**

  - जब `prefixDefault` `false` होता है, फ़ंक्शन डिफ़ॉल्ट लोकल के लिए URL को प्रीफिक्स नहीं करता है।

- **Unsupported Locales:**
  - केवल `locales` ऐरे में दिए गए लोकल को URLs उत्पन्न करने के लिए विचारित किया जाता है।

---

## Usage in Applications:

एक बहुभाषी एप्लिकेशन में, `locales` और `defaultLocale` के साथ अंतर्राष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना सही भाषा प्रदर्शित करने के लिए महत्वपूर्ण है। नीचे एक उदाहरण है कि कैसे `getMultilingualUrls` को एक एप्लिकेशन सेटअप में उपयोग किया जा सकता है:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// समर्थित लोकल और डिफ़ॉल्ट लोकल के लिए कॉन्फ़िगरेशन
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाओं के रूप में पहचानता है और `ENGLISH` को फॉलबैक भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करके, `getMultilingualUrls` फ़ंक्शन एप्लिकेशन के समर्थित लोकल के आधार पर गतिशील रूप से बहुभाषी URL मैपिंग उत्पन्न कर सकता है:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Output:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Output:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

`getMultilingualUrls` को एकीकृत करके, डेवलपर्स कई भाषाओं में स्थिर URL संरचनाएँ बनाए रख सकते हैं, जो उपयोगकर्ता अनुभव और SEO दोनों को बढ़ावा देती हैं।
