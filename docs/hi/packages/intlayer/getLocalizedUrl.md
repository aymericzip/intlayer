# दस्तावेज़: `getLocalizedUrl` फ़ंक्शन `intlayer` में

## विवरण:

`getLocalizedUrl` फ़ंक्शन दिए गए URL को निर्दिष्ट स्थानीयता के साथ प्रीफिक्स करके एक स्थानीय URL उत्पन्न करता है। यह पूर्ण और सापेक्ष दोनों URL को संभालता है, यह सुनिश्चित करते हुए कि कॉन्फ़िगरेशन के आधार पर सही स्थानीयता प्रीफिक्स लागू किया गया है।

---

## पैरामीटर:

- `url: string`

  - **विवरण**: मूल URL स्ट्रिंग जिसे एक स्थानीयता के साथ प्रीफिक्स किया जाना है।
  - **प्रकार**: `string`

- `currentLocale: Locales`

  - **विवरण**: वर्तमान स्थानीयता जिसके लिए URL को स्थानीयकृत किया जा रहा है।
  - **प्रकार**: `Locales`

- `locales: Locales[]`

  - **विवरण**: समर्थित स्थानीयताओं का वैकल्पिक सरणी। डिफ़ॉल्ट रूप से, प्रोजेक्ट में कॉन्फ़िगर की गई स्थानीयताएँ प्रदान की जाती हैं।
  - **प्रकार**: `Locales[]`
  - **डिफ़ॉल्ट**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#middleware)

- `defaultLocale: Locales`

  - **विवरण**: एप्लिकेशन के लिए डिफ़ॉल्ट स्थानीयता। डिफ़ॉल्ट रूप से, प्रोजेक्ट में कॉन्फ़िगर की गई डिफ़ॉल्ट स्थानीयता दी जाती है।
  - **प्रकार**: `Locales`
  - **डिफ़ॉल्ट**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#middleware)

- `prefixDefault: boolean`
  - **विवरण**: क्या डिफ़ॉल्ट स्थानीयता के लिए URL को प्रीफिक्स करना है। डिफ़ॉल्ट रूप से, प्रोजेक्ट में कॉन्फ़िगर किया गया मान प्रदान किया जाता है।
  - **प्रकार**: `boolean`
  - **डिफ़ॉल्ट**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md#middleware)

### लौटाता है:

- **प्रकार**: `string`
- **विवरण**: निर्दिष्ट स्थानीयता के लिए स्थानीय URL।

---

## उदाहरण उपयोग:

### सापेक्ष URLs:

```typescript
import { getLocalizedUrl, Locales } from "intlayer";

getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);

// आउटपुट: "/fr/about" फ़्रेंच स्थानीयता के लिए
// आउटपुट: "/about" डिफ़ॉल्ट (अंग्रेज़ी) स्थानीयता के लिए
```

### पूर्ण URLs:

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // वर्तमान स्थानीयता
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित स्थानीयताएँ
  Locales.ENGLISH, // डिफ़ॉल्ट स्थानीयता
  false // डिफ़ॉल्ट स्थानीयता को प्रीफिक्स करें
); // आउटपुट: "https://example.com/fr/about" फ़्रेंच के लिए

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान स्थानीयता
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित स्थानीयताएँ
  Locales.ENGLISH, // डिफ़ॉल्ट स्थानीयता
  false // डिफ़ॉल्ट स्थानीयता को प्रीफिक्स करें
); // आउटपुट: "https://example.com/about" अंग्रेज़ी के लिए

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // वर्तमान स्थानीयता
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित स्थानीयताएँ
  Locales.ENGLISH, // डिफ़ॉल्ट स्थानीयता
  true // डिफ़ॉल्ट स्थानीयता को प्रीफिक्स करें
); // आउटपुट: "https://example.com/en/about" अंग्रेज़ी के लिए
```

### Unsupported Locale:

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // वर्तमान स्थानीयता
  [Locales.ENGLISH, Locales.FRENCH], // समर्थित स्थानीयताएँ
  Locales.ENGLISH // डिफ़ॉल्ट स्थानीयता
); // आउटपुट: "/about" (समर्थित स्थानीयता के लिए कोई प्रीफिक्स लागू नहीं किया गया)
```

---

## किनारे के मामले:

- **कोई स्थानीयता खंड नहीं:**

  - यदि URL में कोई स्थानीयता खंड नहीं है, तो फ़ंक्शन उपयुक्त स्थानीयता को सुरक्षित रूप से प्रीफिक्स करता है।

- **डिफ़ॉल्ट स्थानीयता:**

  - जब `prefixDefault` `false` होता है, तो फ़ंक्शन डिफ़ॉल्ट स्थानीयता के लिए URL को प्रीफिक्स नहीं करता है।

- **समर्थित स्थानीयताएँ:**
  - उन स्थानीयताओं के लिए जो `locales` में सूचीबद्ध नहीं हैं, फ़ंक्शन कोई प्रीफिक्स लागू नहीं करता है।

---

## अनुप्रयोगों में उपयोग:

एक बहुभाषी एप्लिकेशन में, `locales` और `defaultLocale` के साथ अंतरराष्ट्रीयकरण सेटिंग्स को कॉन्फ़िगर करना सही भाषा प्रदर्शित करने के लिए महत्वपूर्ण है। नीचे एक उदाहरण है कि कैसे `getLocalizedUrl` का उपयोग एक एप्लिकेशन सेटअप में किया जा सकता है:

```tsx
import { Locales, type IntlayerConfig } from "intlayer";

// समर्थित स्थानीयताओं और डिफ़ॉल्ट स्थानीयता के लिए कॉन्फ़िगरेशन
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

उपरोक्त कॉन्फ़िगरेशन यह सुनिश्चित करता है कि एप्लिकेशन `ENGLISH`, `FRENCH`, और `SPANISH` को समर्थित भाषाओं के रूप में मान्यता देता है और `ENGLISH` को बैकअप भाषा के रूप में उपयोग करता है।

इस कॉन्फ़िगरेशन का उपयोग करते हुए, `getLocalizedUrl` फ़ंक्शन उपयोगकर्ता की भाषा प्राथमिकता के आधार पर गतिशील रूप से स्थानीयकृत URLs उत्पन्न कर सकता है:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // आउटपुट: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // आउटपुट: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // आउटपुट: "/about"
```

`getLocalizedUrl` को एकीकृत करके, डेवलपर्स कई भाषाओं में लगातार URL संरचनाएँ बनाए रख सकते हैं, जिससे उपयोगकर्ता अनुभव और SEO दोनों में सुधार होता है।
