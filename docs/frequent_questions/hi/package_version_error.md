---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: मुझे सब-पैकेजेस @intlayer/* से संबंधित त्रुटि मिलती है
description: सब-पैकेजेस @intlayer/* से संबंधित त्रुटि को ठीक करें।
keywords:
  - @intlayer/*
  - सब-पैकेजेस
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# मुझे सब-पैकेजेस `@intlayer/*` से संबंधित त्रुटि मिलती है

यह समस्या आमतौर पर Intlayer पैकेजेस के अपडेट के बाद होती है।

त्रुटि संदेश का उदाहरण:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## कारण

बेस पैकेज जैसे `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` कोड डुप्लिकेशन से बचने के लिए वही सब-पैकेजेस जैसे `@intlayer/config`, `@intlayer/core`, `@intlayer/types` का पुनः उपयोग कर रहे हैं।

दो संस्करणों के बीच, सब-पैकेजेस के एक्सपोर्ट्स समान होने की गारंटी नहीं होती है। इस समस्या को सीमित करने के लिए, intlayer मुख्य पैकेज के संस्करण के अनुसार सब-पैकेजेस के संस्करण को पिन करता है।

> उदाहरण: `intlayer@1.0.0` उपयोग करता है `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (`@intlayer/swc` को छोड़कर), `@intlayer/*` सब-पैकेजेस को सीधे उपयोग करने के लिए नहीं बनाया गया है। इसलिए हम सुझाव देते हैं कि इन्हें सीधे इंस्टॉल न करें।

## समाधान

1. सुनिश्चित करें कि मुख्य पैकेज और सब-पैकेजेस के संस्करण समान हों।

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // गलत संस्करण, इसे 7.0.1 होना चाहिए
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. लॉकफाइल और node_modules फ़ोल्डर को हटाने और निर्भरताओं को पुनः इंस्टॉल करने का प्रयास करें।

कभी-कभी, पैकेज मैनेजर लॉकफाइल में सब-पैकेजेस के पुराने संस्करण को कैश में रखता है। इसे ठीक करने के लिए, आप लॉकफाइल और node_modules फ़ोल्डर को हटाने और निर्भरताओं को पुनः इंस्टॉल करने का प्रयास कर सकते हैं।

```bash
rm -rf package-lock.json node_modules
npm install
```

3. वैश्विक इंस्टॉलेशन की जांच करें

CLI कमांड्स तक पहुँचने के लिए हम सुझाव देते हैं कि `intlayer` या `intlayer-cli` को वैश्विक रूप से इंस्टॉल करें। यदि वैश्विक संस्करण स्थानीय संस्करण के समान नहीं है, तो पैकेज मैनेजर गलत संस्करण मान सकता है।

**जांचें कि कोई पैकेज वैश्विक रूप से इंस्टॉल है या नहीं**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**संभावित वैश्विक निर्भरता संघर्षों को ठीक करें**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. कैश साफ़ करने का प्रयास करें

कुछ वातावरणों जैसे docker, github actions, या वेब होस्टिंग प्लेटफ़ॉर्म जैसे Vercel में कैश मौजूद हो सकता है। आप कैश को साफ़ करने और पुनः इंस्टॉलेशन का प्रयास कर सकते हैं।

आप निम्नलिखित कमांड के साथ अपने पैकेज मैनेजर का कैश भी साफ़ करने का प्रयास कर सकते हैं:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
