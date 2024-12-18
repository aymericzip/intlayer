# Documentation: `getLocaleName` Function in `intlayer`

## Description:

`getLocaleName` फ़ंक्शन एक दिए गए लोकल (`targetLocale`) का स्थानीयकृत नाम `displayLocale` में लौटाता है। यदि कोई `targetLocale` प्रदान नहीं किया गया है, तो यह `displayLocale` का अपना नाम उसी भाषा में लौटाता है।

## Parameters:

- `displayLocale: Locales`

  - **Description**: उस लोकल में जिसमें लक्षित लोकल का नाम प्रदर्शित किया जाएगा।
  - **Type**: मान्य लोकल का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

- `targetLocale?: Locales`
  - **Description**: वह लोकल जिसका नाम स्थानीयकृत किया जाना है।
  - **Type**: वैकल्पिक। मान्य लोकल का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

## Returns:

- **Type**: `string`
- **Description**: `displayLocale` में `targetLocale` का स्थानीयकृत नाम, या यदि `targetLocale` प्रदान नहीं किया गया है तो `displayLocale` का अपना नाम। यदि कोई अनुवाद नहीं मिलता है, तो यह `"Unknown locale"` लौटाता है।

## Example Usage:

```typescript
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

## Edge Cases:

- **कोई `targetLocale` प्रदान नहीं किया गया:**
  - फ़ंक्शन `displayLocale` के अपने नाम को लौटाने में डिफ़ॉल्ट करता है।
- **अनुवाद गायब हैं:**
  - यदि `localeNameTranslations` में `targetLocale` या विशिष्ट `displayLocale` के लिए कोई प्रविष्टि नहीं है, तो फ़ंक्शन `ownLocalesName` पर वापस लौटता है या `"Unknown locale"` लौटाता है।
