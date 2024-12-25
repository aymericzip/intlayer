# Documentation: `getHTMLTextDir` फ़ंक्शन in `intlayer`

## विवरण:

`getHTMLTextDir` फ़ंक्शन प्रदान किए गए स्थानीयकृत के आधार पर पाठ दिशा (`ltr`, `rtl`, या `auto`) निर्धारित करता है। इसे डेवलपर्स को HTML में उचित पाठ रेंडरिंग के लिए `dir` विशेषता सेट करने में मदद करने के लिए डिज़ाइन किया गया है।

## पैरामीटर:

- `locale?: Locales`

  - **विवरण**: स्थानीयकृत स्ट्रिंग (जैसे, `Locales.ENGLISH`, `Locales.ARABIC`) जो पाठ दिशा निर्धारित करने के लिए उपयोग की जाती है।
  - **प्रकार**: `Locales` (वैकल्पिक)

## लौटाता है:

- **प्रकार**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **विवरण**: स्थानीयकृत के अनुरूप पाठ दिशा:
  - `'ltr'` बाईं से दाईं ओर भाषाओं के लिए।
  - `'rtl'` दाईं से बाईं ओर भाषाओं के लिए।
  - `'auto'` यदि स्थानीयकृत मान्यता प्राप्त नहीं है।

## उदाहरण उपयोग:

### पाठ दिशा निर्धारित करना:

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.FRENCH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.ARABIC); // आउटपुट: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.FRENCH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.ARABIC); // आउटपुट: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.FRENCH); // आउटपुट: "ltr"
getHTMLTextDir(Locales.ARABIC); // आउटपुट: "rtl"
```

## बेजोड़ मामले:

- **कोई स्थानीयकृत प्रदान नहीं किया गया:**

  - जब `locale` `undefined` होता है, तो फ़ंक्शन `'auto'` लौटाता है।

- **अन्यथा स्थानीयकृत:**
  - अनपेक्षित स्थानीयकृत के लिए, फ़ंक्शन `'auto'` पर डिफ़ॉल्ट करता है।

## घटकों में उपयोग:

`getHTMLTextDir` फ़ंक्शन को स्थानीयकृत के आधार पर HTML दस्तावेज़ में उचित पाठ रेंडरिंग के लिए `dir` विशेषता को गतिशील रूप से सेट करने के लिए उपयोग किया जा सकता है।

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

उदाहरण में, `dir` विशेषता स्थानीयकृत के आधार पर गतिशील रूप से सेट की गई है।
