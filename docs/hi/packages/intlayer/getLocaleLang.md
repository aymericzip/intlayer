# दस्तावेज़: `getLocaleLang` फ़ंक्शन `intlayer` में

## विवरण:

`getLocaleLang` फ़ंक्शन एक लोकेल स्ट्रिंग से भाषा कोड निकालता है। यह देश कोड के साथ या बिना लोकेल का समर्थन करता है। यदि कोई लोकेल प्रदान नहीं किया गया है, तो यह डिफ़ॉल्ट रूप से एक खाली स्ट्रिंग लौटाता है।

## पैरामीटर:

- `locale?: Locales`

  - **विवरण**: वह लोकेल स्ट्रिंग (जैसे, `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`) जिससे भाषा कोड निकाला जाता है।
  - **प्रकार**: `Locales` (वैकल्पिक)

## लौटाता है:

- **प्रकार**: `string`
- **विवरण**: लोकेल से निकाला गया भाषा कोड। यदि लोकेल प्रदान नहीं किया गया है, तो यह एक खाली स्ट्रिंग (`''`) लौटाता है।

## उदाहरण उपयोग:

### भाषा कोड निकालना:

```typescript
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // आउटपुट: "en"
getLocaleLang(Locales.ENGLISH); // आउटपुट: "en"
getLocaleLang(Locales.FRENCH_CANADA); // आउटपुट: "fr"
getLocaleLang(Locales.FRENCH); // आउटपुट: "fr"
```

## एज मामलों:

- **कोई लोकेल प्रदान नहीं किया गया:**

  - जब `locale` `undefined` होता है, फ़ंक्शन एक खाली स्ट्रिंग लौटाता है।

- **बिगड़ गए लोकेल स्ट्रिंग्स:**
  - यदि `locale` `language-country` प्रारूप का पालन नहीं करता है (जैसे, `Locales.ENGLISH-US`), तो फ़ंक्शन सुरक्षित रूप से `'-'` से पहले वाला भाग या यदि कोई `'-'` मौजूद नहीं है तो पूरा स्ट्रिंग लौटाता है।
