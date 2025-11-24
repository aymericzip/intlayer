---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: शब्दकोश बनाएं
description: कंटेंट घोषणा फ़ाइलों से अपने Intlayer शब्दकोश बनाने का तरीका सीखें।
keywords:
  - बनाएं
  - शब्दकोश
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
---

# शब्दकोश बनाएं

अपने शब्दकोश बनाने के लिए, आप निम्नलिखित कमांड चला सकते हैं:

```bash
npx intlayer build
```

या वॉच मोड में

```bash
npx intlayer build --watch
```

यह कमांड डिफ़ॉल्ट रूप से आपकी घोषणा कंटेंट फ़ाइलों को `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` के रूप में खोजेगा। और `.intlayer` डायरेक्टरी में शब्दकोश बनाएगा।

## उपनाम:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## तर्क:

- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस डायरेक्टरी में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

  > उदाहरण: `npx intlayer build --base-dir ./src`

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)। यह उपयोगी होता है जब आप अपनी intlayer कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर (environment variables) का उपयोग करते हैं।

  > उदाहरण: `npx intlayer build --env production`

- **`--env-file`**: एक कस्टम पर्यावरण फ़ाइल प्रदान करें जिससे चर लोड किए जाएं। यह उपयोगी होता है जब आप अपनी intlayer कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर का उपयोग करते हैं।

  > उदाहरण: `npx intlayer build --env-file .env.production.local`

- **`--with`**: बिल्ड के साथ समानांतर में कमांड शुरू करें।

  > उदाहरण: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: prepare चरण को छोड़ें।

  > उदाहरण: `npx intlayer build --skip-prepare`

- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer build --no-cache`
