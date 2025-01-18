# Documentation: `getLocaleName` Function in `intlayer`

## Description

`getLocaleName` फ़ंक्शन एक दिए गए लोकल (`targetLocale`) का लोकल भाषा का नाम `displayLocale` में लौटाता है। यदि कोई `targetLocale` प्रदान नहीं किया गया है, तो यह `displayLocale` का नाम उसकी अपनी भाषा में लौटाता है।

## Parameters

- `displayLocale: Locales`

  - **Description**: वह लोकल जिसमें लक्ष्य लोकल का नाम प्रदर्शित किया जाएगा।
  - **Type**: मान्य लोकलों का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

- `targetLocale?: Locales`
  - **Description**: वह लोकल जिसका नाम स्थानीयकृत किया जाना है।
  - **Type**: वैकल्पिक। मान्य लोकलों का प्रतिनिधित्व करने वाला Enum या स्ट्रिंग।

## Returns

- **Type**: `string`
- **Description**: `displayLocale` में `targetLocale` का स्थानीयकृत नाम, या `targetLocale` प्रदान नहीं किया गया है तो `displayLocale` का अपना नाम। यदि कोई अनुवाद नहीं मिला, तो यह `"Unknown locale"` लौटाता है।

## Example Usage

```typescript codeFormat="typescript"
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

```javascript codeFormat="esm"
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

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

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

## Edge Cases

- **No `targetLocale` provided:**
  - फ़ंक्शन डिफ़ॉल्ट रूप से `displayLocale` का अपना नाम लौटाता है।
- **Missing translations:**
  - यदि `localeNameTranslations` में `targetLocale` या विशेष `displayLocale` के लिए कोई प्रविष्टि नहीं है, तो फ़ंक्शन `ownLocalesName` पर वापस लौटता है या `"Unknown locale"` लौटाता है।
