# Documentation: `getHTMLTextDir` Function in `intlayer`

## Description:

`getHTMLTextDir` फ़ंक्शन टेक्स्ट दिशा (`ltr`, `rtl`, या `auto`) का निर्धारण करता है जो दिए गए स्थानीय भाषा के आधार पर होता है। यह डेवलपर्स को HTML में उचित टेक्स्ट रेंडरिंग के लिए `dir` एट्रिब्यूट सेट करने में मदद करने के लिए डिज़ाइन किया गया है।

## Parameters:

- `locale?: Locales`

  - **Description**: स्थानीय भाषा स्ट्रिंग (जैसे, `Locales.ENGLISH`, `Locales.ARABIC`) जिसका उपयोग टेक्स्ट दिशा निर्धारित करने के लिए किया जाता है।
  - **Type**: `Locales` (वैकल्पिक)

## Returns:

- **Type**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Description**: स्थानीय भाषा के अनुसार टेक्स्ट दिशा:
  - `'ltr'` बाएं से दाएं भाषाओं के लिए।
  - `'rtl'` दाएं से बाएं भाषाओं के लिए।
  - `'auto'` यदि स्थानीय भाषा पहचानी नहीं गई।

## Example Usage:

### Determining Text Direction:

```typescript
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Output: "ltr"
getHTMLTextDir(Locales.FRENCH); // Output: "ltr"
getHTMLTextDir(Locales.ARABIC); // Output: "rtl"
```

## Edge Cases:

- **No Locale Provided:**

  - यदि `locale` `undefined` है, तो फ़ंक्शन `'auto'` लौटाता है।

- **Unrecognized Locale:**
  - पहचाने न जाने वाले स्थानीय भाषाओं के लिए, फ़ंक्शन `'auto'` पर डिफ़ॉल्ट कर देता है।

## Usage in Components:

`getHTMLTextDir` फ़ंक्शन का उपयोग HTML दस्तावेज़ में `dir` एट्रिब्यूट को गतिशील रूप से सेट करने के लिए किया जा सकता है ताकि स्थानीय भाषा के आधार पर उचित टेक्स्ट रेंडरिंग हो सके।

```tsx
import { getHTMLTextDir } from "intlayer";

export const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

उपरोक्त उदाहरण में, `dir` एट्रिब्यूट को स्थानीय भाषा के आधार पर गतिशील रूप से सेट किया गया है।
