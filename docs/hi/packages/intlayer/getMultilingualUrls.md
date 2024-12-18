# Documentation: `getMultilingualUrls` Function in `intlayer`

## Description:

`getMultilingualUrls` फ़ंक्शन विभिन्न भाषाओं के URLs का एक मैप उत्पन्न करता है, जो दिए गए URL को हर समर्थित भाषा के साथ प्रारंभ करके तैयार किया जाता है। यह पूर्ण और सापेक्ष दोनों प्रकार के URLs को संभाल सकता है, निर्धारित कॉन्फ़िगरेशन या डिफ़ॉल्ट के आधार पर उपयुक्त भाषा उपसर्ग लागू करता है।

---

## Parameters:

- `url: string`

  - **Description**: मूल URL स्ट्रिंग जिसे भाषाओं के साथ प्रारंभ किया जाएगा।
  - **Type**: `string`

- `locales: Locales[]`

  - **Description**: समर्थित भाषाओं का वैकल्पिक तालिका। परियोजना में कॉन्फ़िगर की गई भाषाओं पर डिफ़ॉल्ट।
  - **Type**: `Locales[]`
  - **Default**: `localesDefault`

- `defaultLocale: Locales`

  - **Description**: एप्लिकेशन के लिए डिफ़ॉल्ट भाषा। परियोजना में कॉन्फ़िगर की गई डिफ़ॉल्ट भाषा पर डिफ़ॉल्ट।
  - **Type**: `Locales`
  - **Default**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Description**: क्या डिफ़ॉल्ट भाषा को उपसर्ग के रूप में जोड़ना है। परियोजना में कॉन्फ़िगर की गई मान पर डिफ़ॉल्ट।
  - **Type**: `boolean`
  - **Default**: `prefixDefaultDefault`

### Returns:

- **Type**: `IConfigLocales<string>`
- **Description**: एक वस्तु जो प्रत्येक भाषा को उसके संबंधित बहुभाषीय URL से जोड़ती है।

---

## Example Usage:

### Relative URLs:

```typescript
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

  - फ़ंक्शन बहुभाषीय मैपिंग उत्पन्न करने से पहले URL से किसी भी मौजूदा भाषा खंड को हटा देता है।

- **Default Locale:**

  - जब `prefixDefault` `false` होता है, तो फ़ंक्शन डिफ़ॉल्ट भाषा के लिए URL को उपसर्ग के रूप में नहीं जोड़ता।

- **Unsupported Locales:**
  - केवल `locales` तालिका में प्रदान की गई भाषाएँ URLs उत्पन्न करने के लिए ध्यान में रखी जाती हैं।

---

## Usage in Applications:

एक बहुभाषीय एप्लिकेशन में, `locales` और `defaultLocale` के साथ अंतरराष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना सही भाषा के प्रदर्शन को सुनिश्चित करने के लिए आवश्यक है। नीचे उदाहरण दिया गया है कि `getMultilingualUrls` को एप्लिकेशन सेटअप में कैसे उपयोग किया जा सकता है:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// समर्थित भाषाओं और डिफ़ॉल्ट भाषा के लिए कॉन्फ़िगरेशन
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाएँ के रूप में पहचानता है और `ENGLISH` को बैकअप भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करके, `getMultilingualUrls` फ़ंक्शन एप्लिकेशन की समर्थित भाषाओं के आधार पर स्वतः बहुभाषीय URL मैपिंग उत्पन्न कर सकता है:

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

`getMultilingualUrls` का एकीकरण करके, डेवलपर्स कई भाषाओं में संगत URL संरचनाओं को बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO में सुधार होता है।
