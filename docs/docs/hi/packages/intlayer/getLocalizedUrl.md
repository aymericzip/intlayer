---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getLocalizedUrl फ़ंक्शन प्रलेखन | intlayer
description: intlayer पैकेज के लिए getLocalizedUrl फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getLocalizedUrl
  - अनुवाद
  - Intlayer
  - intlayer
  - अंतरराष्ट्रीयकरण
  - प्रलेखन
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# प्रलेखन: `intlayer` में `getLocalizedUrl` फ़ंक्शन

## विवरण

`getLocalizedUrl` फ़ंक्शन दिए गए URL को निर्दिष्ट locale के साथ उपसर्ग करके एक localized URL उत्पन्न करता है। यह absolute और relative दोनों URLs को हैंडल करता है, यह सुनिश्चित करता है कि सही locale prefix configuration के आधार पर लागू किया जाता है।

**मुख्य विशेषताएं:**

- केवल 2 parameters आवश्यक हैं: `url` और `currentLocale`
- `locales`, `defaultLocale`, और `mode` के साथ optional `options` object
- अपनी project की internationalization configuration को defaults के रूप में उपयोग करता है
- सरल cases के लिए minimal parameters के साथ या complex scenarios के लिए पूरी तरह से customized किया जा सकता है
- कई routing modes को support करता है: `prefix-no-default`, `prefix-all`, `no-prefix`, और `search-params`

---

## विवरण

`getLocalizedUrl` फ़ंक्शन निर्दिष्ट लोकल के साथ दिए गए URL के आगे लोकलाइज़्ड URL उत्पन्न करता है। यह पूर्ण (absolute) और सापेक्ष (relative) दोनों प्रकार के URL को संभालता है, यह सुनिश्चित करते हुए कि कॉन्फ़िगरेशन के आधार पर सही लोकल उपसर्ग लागू किया गया है।

---

## पैरामीटर

### आवश्यक पैरामीटर

- `url: string`
  - **Description**: मूल URL string जिसे locale के साथ prefix किया जाना है।
  - **Type**: `string`
  - **Required**: Yes

- `currentLocale: Locales`
  - **Description**: वर्तमान locale जिसके लिए URL को localize किया जा रहा है।
  - **Type**: `Locales`
  - **Required**: Yes

### Optional Parameters

- `options?: object`
  - **Description**: URL localization व्यवहार के लिए Configuration object।
  - **Type**: `object`
  - **Required**: No (Optional)

  - `options.locales?: Locales[]`
    - **Description**: समर्थित locales का Array। यदि प्रदान नहीं किया गया है, तो आपके project configuration से configured locales का उपयोग करता है।
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Application के लिए default locale। यदि प्रदान नहीं किया गया है, तो आपके project configuration से configured default locale का उपयोग करता है।
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Locale handling के लिए URL routing mode। यदि प्रदान नहीं किया गया है, तो आपके project configuration से configured mode का उपयोग करता है।
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Default locale के लिए कोई prefix नहीं, सभी अन्य के लिए prefix
      - `prefix-all`: Default सहित सभी locales के लिए prefix
      - `no-prefix`: URL में कोई locale prefix नहीं
      - `search-params`: Locale के लिए query parameters का उपयोग करें (उदाहरण के लिए, `?locale=fr`)

### रिटर्न्स

- **प्रकार**: `string`
- **विवरण**: निर्दिष्ट लोकल के लिए स्थानीयकृत URL।

---

## उदाहरण उपयोग

### बुनियादी उपयोग (केवल आवश्यक पैरामीटर)

जब आप अपनी परियोजना को अंतर्राष्ट्रीयकरण सेटिंग्स के साथ कॉन्फ़िगर कर लेते हैं, तो आप केवल आवश्यक पैरामीटर के साथ फ़ंक्शन का उपयोग कर सकते हैं:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// आपकी परियोजना की कॉन्फ़िगरेशन का उपयोग करता है locales, defaultLocale, और mode के लिए
getLocalizedUrl("/about", Locales.FRENCH);
// आउटपुट: "/fr/about" (मानते हुए कि फ्रेंच समर्थित है और mode 'prefix-no-default' है)

getLocalizedUrl("/about", Locales.ENGLISH);
// आउटपुट: "/about" या "/en/about" (आपकी mode सेटिंग के आधार पर)
```

### Advanced Usage (With Optional Parameters)

आप optional `options` parameter प्रदान करके default configuration को override कर सकते हैं:

### Relative URLs (All Options Specified)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getLocalizedUrl, Locales } from "intlayer";

// सभी optional parameters को स्पष्ट रूप से प्रदान करना
getLocalizedUrl("/about", Locales.FRENCH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "/fr/about" French locale के लिए

getLocalizedUrl("/about", Locales.ENGLISH, {
  locales: [Locales.ENGLISH, Locales.FRENCH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Output: "/about" डिफ़ॉल्ट (English) locale के लिए
```

### सापेक्ष URL

```typescript codeFormat={["typescript", "esm"]}
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// आउटपुट: फ्रेंच लोकल के लिए "/fr/about"
// आउटपुट: डिफ़ॉल्ट (अंग्रेज़ी) लोकल के लिए "/about"
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

// आउटपुट: फ्रेंच लोकल के लिए "/fr/about"
// आउटपुट: डिफ़ॉल्ट (अंग्रेज़ी) लोकल के लिए "/about"
```

### पूर्ण URL

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  false // डिफ़ॉल्ट लोकल के लिए प्रीफिक्स
); // आउटपुट: फ्रेंच के लिए "https://example.com/fr/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  false // डिफ़ॉल्ट लोकल के लिए प्रीफिक्स
); // आउटपुट: अंग्रेज़ी के लिए "https://example.com/about"

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH, // डिफ़ॉल्ट लोकल
  true // डिफ़ॉल्ट लोकल के लिए प्रीफिक्स
); // आउटपुट: अंग्रेज़ी के लिए "https://example.com/en/about"
```

### असमर्थित लोकल

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // वर्तमान लोकल
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित लोकल
  Locales.ENGLISH // डिफ़ॉल्ट लोकल
); // आउटपुट: "/about" (असमर्थित लोकल के लिए कोई प्रीफिक्स लागू नहीं किया गया)
```

---

## किनारे के मामले

- **कोई लोकल सेगमेंट नहीं:**
  - यदि URL में कोई लोकल सेगमेंट नहीं है, तो फ़ंक्शन सुरक्षित रूप से उपयुक्त लोकल को प्रीफिक्स करता है।

- **डिफ़ॉल्ट लोकल:**
  - जब `prefixDefault` `false` होता है, तो फ़ंक्शन डिफ़ॉल्ट लोकल के लिए URL को प्रीफिक्स नहीं करता।

- **असमर्थित लोकल:**
  - `locales` में सूचीबद्ध नहीं किए गए लोकल के लिए, फ़ंक्शन कोई प्रीफिक्स लागू नहीं करता।

- **राउटिंग मोड्स:**
  - `'prefix-no-default'`: डिफ़ॉल्ट लोकेल के पास कोई उपसर्ग नहीं है, अन्य के पास हैं (उदाहरण के लिए, `/about`, `/fr/about`)
  - `'prefix-all'`: सभी लोकेल्स के पास उपसर्ग हैं (उदाहरण के लिए, `/en/about`, `/fr/about`)
  - `'no-prefix'`: URLs में कोई लोकेल उपसर्ग नहीं (लोकेल कहीं और संभाला जाता है)
  - `'search-params'`: क्वेरी पैरामीटर के माध्यम से निर्दिष्ट लोकेल (उदाहरण के लिए, `/about?locale=fr`)

---

## अनुप्रयोगों में उपयोग

एक बहुभाषी अनुप्रयोग में, सही भाषा प्रदर्शित करने के लिए `locales` और `defaultLocale` के साथ अंतरराष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना महत्वपूर्ण है। नीचे एक उदाहरण दिया गया है कि कैसे `getLocalizedUrl` को एक अनुप्रयोग सेटअप में उपयोग किया जा सकता है:

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाओं के रूप में पहचानता है और `ENGLISH` को फॉलबैक भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करके, `getLocalizedUrl` फ़ंक्शन उपयोगकर्ता की भाषा प्राथमिकता के आधार पर गतिशील रूप से स्थानीयकृत URL उत्पन्न कर सकता है:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // आउटपुट: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // आउटपुट: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // आउटपुट: "/about"
```

`getLocalizedUrl` को एकीकृत करके, डेवलपर्स कई भाषाओं में सुसंगत URL संरचनाओं को बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO दोनों में सुधार होता है।
