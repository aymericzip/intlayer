---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: गायब अनुवादों का परीक्षण करें
description: अपने शब्दकोशों में गायब अनुवादों का परीक्षण और पहचान करना सीखें।
keywords:
  - परीक्षण
  - गायब अनुवाद
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# गायब अनुवादों का परीक्षण करें

```bash
npx intlayer content test
```

## उपनाम:

- `npx intlayer test`

यह कमांड आपके कंटेंट घोषणा फ़ाइलों का विश्लेषण करता है ताकि सभी कॉन्फ़िगर किए गए लोकल्स में गायब अनुवादों की पहचान की जा सके। यह एक व्यापक रिपोर्ट प्रदान करता है जो दिखाती है कि कौन से अनुवाद कुंजी किन लोकल्स के लिए गायब हैं, जिससे आप अपने बहुभाषी कंटेंट में स्थिरता बनाए रख सकते हैं।

## उदाहरण आउटपुट:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Required locales: en
Missing locales: pl, tr, es
Missing required locales: -
Total missing locales: 3
Total missing required locales: 0
```

## तर्क:

**कॉन्फ़िगरेशन विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file [envFile]`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें।

  > उदाहरण: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer build --no-cache`

**तैयारी विकल्प:**

- **`--build`**: पुश करने से पहले शब्दकोशों का निर्माण करें ताकि सामग्री अद्यतित रहे। True से निर्माण ज़बरदस्ती होगा, false से निर्माण छोड़ दिया जाएगा, undefined से निर्माण के कैश का उपयोग करने की अनुमति मिलेगी।

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें। (CLI का उपयोग करते समय डिफ़ॉल्ट रूप से true)

  > उदाहरण: `npx intlayer content test --verbose`

## उदाहरण:

```bash
npx intlayer content test --verbose
```

आउटपुट आपको जल्दी से यह पहचानने में मदद करता है कि किन अनुवादों को पूरा करने की आवश्यकता है ताकि आपका एप्लिकेशन सभी कॉन्फ़िगर किए गए लोकल्स में सही ढंग से काम करे।
