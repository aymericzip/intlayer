---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: शब्दकोश खींचें
description: जानें कि Intlayer संपादक और CMS से शब्दकोश कैसे खींचें।
keywords:
  - खींचें
  - शब्दकोश
  - CLI
  - Intlayer
  - संपादक
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# दूरस्थ शब्दकोश खींचें

```bash
npx intlayer pull
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) स्थापित है, तो आप संपादक से भी शब्दकोश खींच सकते हैं। इस तरह, आप अपनी एप्लिकेशन की आवश्यकता के लिए अपने शब्दकोश की सामग्री को अधिलेखित कर सकते हैं।

## उपनाम:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## तर्क:

**शब्दकोश विकल्प:**

- **`-d, --dictionaries`**: खींचने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश खींचे जाएंगे।

  > उदाहरण: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: खींचने के लिए शब्दकोशों के आईडी (alias --dictionaries के लिए)।

  > उदाहरण: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस डायरेक्टरी में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer build --no-cache`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस डायरेक्टरी में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`

  > उदाहरण: `npx intlayer dictionary push --env production`

**आउटपुट विकल्प:**

- **`--new-dictionaries-path`** : उस डायरेक्टरी का पथ जहाँ नए शब्दकोश सहेजे जाएंगे। यदि निर्दिष्ट नहीं किया गया है, तो नए शब्दकोश प्रोजेक्ट की `./intlayer-dictionaries` डायरेक्टरी में सहेजे जाएंगे। यदि आपके शब्दकोश सामग्री में `filePath` फ़ील्ड निर्दिष्ट है, तो शब्दकोश इस तर्क को ध्यान में नहीं रखेंगे और निर्दिष्ट `filePath` डायरेक्टरी में सहेजे जाएंगे।

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें। (CLI का उपयोग करते समय डिफ़ॉल्ट रूप से true)

## उदाहरण:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
