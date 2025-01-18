# Documentation: `getLocalizedUrl` Function in `intlayer`

## Description

`getLocalizedUrl` फ़ंक्शन दिए गए URL के साथ निर्दिष्ट लोकल को प्रीफिक्स करके एक स्थानीय URL उत्पन्न करता है। यह पूर्ण और सापेक्ष URLs दोनों को संभालता है, यह सुनिश्चित करते हुए कि कॉन्फ़िगरेशन के आधार पर सही लोकल प्रीफ़िक्स लागू किया गया है।

---

## Parameters

- `url: string`

  - **Description**: मूल URL स्ट्रिंग जिसे लोकल के साथ प्रीफ़िक्स किया जाएगा।
  - **Type**: `string`

- `currentLocale: Locales`

  - **Description**: वर्तमान लोकल जिसके लिए URL को स्थानीयकृत किया जा रहा है।
  - **Type**: `Locales`

- `locales: Locales[]`

  - **Description**: समर्थित लोकल का वैकल्पिक ऐरे। डिफ़ॉल्ट रूप से, परियोजना में कॉन्फ़िगर किए गए लोकल प्रदान किए जाते हैं।
  - **Type**: `Locales[]`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#middleware)

- `defaultLocale: Locales`

  - **Description**: एप्लिकेशन के लिए डिफ़ॉल्ट लोकल। डिफ़ॉल्ट रूप से, परियोजना में कॉन्फ़िगर किए गए डिफ़ॉल्ट लोकल प्रदान किए जाते हैं।
  - **Type**: `Locales`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#middleware)

- `prefixDefault: boolean`
  - **Description**: क्या डिफ़ॉल्ट लोकल के लिए URL को प्रीफ़िक्स किया जाना चाहिए। डिफ़ॉल्ट रूप से, परियोजना में कॉन्फ़िगर किए गए मान प्रदान किए जाते हैं।
  - **Type**: `boolean`
  - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#middleware)

### Returns

- **Type**: `string`
- **Description**: निर्दिष्ट लोकल के लिए स्थानीयकृत URL।

---

## Example Usage

### Relative URLs

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// Output: "/fr/about" for the French locale
// Output: "/about" for the default (English) locale
```

### Absolute URLs

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  false // डिफ़ॉल्ट लोकल को प्रीफ़िक्स करें
); // Output: "https://example.com/fr/about" for the French

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  false // डिफ़ॉल्ट लोकल को प्रीफ़िक्स करें
); // Output: "https://example.com/about" for the English

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  true // डिफ़ॉल्ट लोकल को प्रीफ़िक्स करें
); // Output: "https://example.com/en/about" for the English
```

### Unsupported Locale

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH // डिफ़ॉल्ट लोकल
); // Output: "/about" (कोई प्रीफ़िक्स लागू नहीं किया गया)
```

---

## Edge Cases

- **कोई लोकल खंड नहीं:**

  - यदि URL में कोई लोकल खंड नहीं है, तो फ़ंक्शन सही लोकल को प्रीफ़िक्स करता है।

- **डिफ़ॉल्ट लोकल:**

  - जब `prefixDefault` `false` है, तो फ़ंक्शन डिफ़ॉल्ट लोकल के लिए URL को प्रीफ़िक्स नहीं करता है।

- **असमर्थित लोकल:**
  - `locales` में सूचीबद्ध नहीं किए गए लोकल के लिए, फ़ंक्शन कोई प्रीफ़िक्स नहीं लागू करता है।

---

## Usage in Applications

एक बहुभाषी एप्लिकेशन में, `locales` और `defaultLocale` के साथ अंतर्राष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना सही भाषा प्रदर्शित करने के लिए महत्वपूर्ण है। नीचे एक उदाहरण है कि कैसे `getLocalizedUrl` को एप्लिकेशन सेटअप में उपयोग किया जा सकता है:

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

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थन भाषाओं के रूप में पहचानता है और `ENGLISH` का उपयोग फ़ॉलबैक भाषा के रूप में करता है।

इस कॉन्फ़िगरेशन का उपयोग करके, `getLocalizedUrl` फ़ंक्शन उपयोगकर्ता की भाषा प्राथमिकता के आधार पर स्थानीयकृत URLs उत्पन्न कर सकता है:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

`getLocalizedUrl` को एकीकृत करके, डेवलपर्स कई भाषाओं में समान URL संरचनाओं को बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO दोनों में सुधार होता है।
