# दस्तावेज़: `getLocaleLang` फ़ंक्शन `intlayer` में

## विवरण:

`getLocaleLang` फ़ंक्शन एक स्थानीय प्रतिनिधित्व से भाषा कोड निकालता है। यह देश कोड के साथ या बिना स्थानीय प्रतिनिधित्व का समर्थन करता है। यदि कोई स्थानीय प्रतिनिधित्व प्रदान नहीं किया गया है, तो यह डिफ़ॉल्ट रूप से एक खाली स्ट्रिंग लौटाता है।

## पैरामीटर:

- `locale?: Locales`

  - **विवरण**: स्थानीय प्रतिनिधित्व स्ट्रिंग (जैसे, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) जिसमें से भाषा कोड निकाला जाता है।
  - **प्रकार**: `Locales` (वैकल्पिक)

## लौटाता है:

- **प्रकार**: `string`
- **विवरण**: स्थानीय प्रतिनिधित्व से निकाला गया भाषा कोड। यदि स्थानीय प्रतिनिधित्व प्रदान नहीं किया गया है, तो यह एक खाली स्ट्रिंग (`''`) लौटाता है।

## उदाहरण उपयोग:

### भाषा कोड निकालना:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // आउटपुट: "en"
getLocaleLang(Locales.ENGLISH); // आउटपुट: "en"
getLocaleLang(Locales.FRENCH_CANADA); // आउटपुट: "fr"
getLocaleLang(Locales.FRENCH); // आउटपुट: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // आउटपुट: "en"
getLocaleLang(Locales.ENGLISH); // आउटपुट: "en"
getLocaleLang(Locales.FRENCH_CANADA); // आउटपुट: "fr"
getLocaleLang(Locales.FRENCH); // आउटपुट: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // आउटपुट: "en"
getLocaleLang(Locales.ENGLISH); // आउटपुट: "en"
getLocaleLang(Locales.FRENCH_CANADA); // आउटपुट: "fr"
getLocaleLang(Locales.FRENCH); // आउटपुट: "fr"
```

## सीमाएं:

- **कोई स्थानीय प्रतिनिधित्व प्रदान नहीं किया गया:**

  - जब `locale` `undefined` होता है तो फ़ंक्शन एक खाली स्ट्रिंग लौटाता है।

- **अस्वच्छ स्थानीय प्रतिनिधित्व स्ट्रिंग:**
  - यदि `locale` `language-country` प्रारूप का पालन नहीं करता है (जैसे, `Locales.ENGLISH-US`), तो फ़ंक्शन सुरक्षित रूप से `'-'` से पहले का भाग या यदि कोई `'-'` नहीं है तो पूरा स्ट्रिंग लौटाता है।
