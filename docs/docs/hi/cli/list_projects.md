---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Intlayer प्रोजेक्ट्स की सूची
description: जानें कि किसी डायरेक्टरी या git रिपोजिटरी में सभी Intlayer प्रोजेक्ट्स की सूची कैसे बनाएं।
keywords:
  - सूची
  - प्रोजेक्ट्स
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Intlayer प्रोजेक्ट्स की सूची

```bash
npx intlayer projects list
```

यह कमांड उन डायरेक्टरीज़ को खोजकर और सूचीबद्ध करके सभी Intlayer प्रोजेक्ट्स खोजता है जिनमें Intlayer कॉन्फ़िगरेशन फ़ाइलें मौजूद हों। यह monorepo, workspace, या git रिपोजिटरी में सभी Intlayer प्रोजेक्ट्स का पता लगाने के लिए उपयोगी है।

## उपनाम:

- `npx intlayer projects-list`
- `npx intlayer pl`

## आर्ग्यूमेंट्स:

- **`--base-dir [path]`**: खोज शुरू करने के लिए बेस डायरेक्टरी निर्दिष्ट करें। डिफ़ॉल्ट रूप से यह वर्तमान वर्किंग डायरेक्टरी होती है।

  > उदाहरण: `npx intlayer projects list --base-dir /path/to/workspace`

  > उदाहरण: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: बेस डायरेक्टरी की बजाय git रूट डायरेक्टरी से खोजें। यह monorepo या git रिपोजिटरी में सभी Intlayer प्रोजेक्ट्स खोजने के लिए उपयोगी है।

  > उदाहरण: `npx intlayer projects list --git-root`

- **`--json`**: परिणामों को स्वरूपित पाठ के बजाय JSON के रूप में आउटपुट करें। स्क्रिप्टिंग और प्रोग्रामेटिक पहुंच के लिए उपयोगी।

  > उदाहरण: `npx intlayer projects list --json`

## यह कैसे काम करता है:

यह कमांड निर्दिष्ट डायरेक्टरी (या `--git-root` का उपयोग करने पर git root) में Intlayer कॉन्फ़िगरेशन फ़ाइलों की खोज करता है। यह निम्न कॉन्फ़िगरेशन फ़ाइल पैटर्न ढूँढता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

इनमें से किसी एक फ़ाइल को रखने वाली प्रत्येक डायरेक्टरी को एक Intlayer प्रोजेक्ट माना जाता है और आउटपुट में सूचीबद्ध किया जाएगा।

## उदाहरण:

### वर्तमान डायरेक्टरी में प्रोजेक्ट्स की सूची:

```bash
npx intlayer projects list
```

### किसी विशिष्ट डायरेक्टरी में प्रोजेक्ट सूचीबद्ध करें:

```bash
npx intlayer projects list --base-dir ./packages
```

### git रिपोजिटरी में सभी प्रोजेक्ट सूचीबद्ध करें:

```bash
npx intlayer projects list --git-root
```

### शॉर्टकट एलियस का उपयोग:

```bash
npx intlayer pl --git-root
```

### JSON के रूप में आउटपुट:

```bash
npx intlayer projects list --json
```

## उदाहरण आउटपुट:

### स्वरूपित आउटपुट:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON आउटपुट:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## उपयोग के मामले:

- **Monorepo management**: Monorepo संरचना में सभी Intlayer प्रोजेक्ट्स खोजें
- **Project discovery**: किसी workspace में सभी Intlayer-सक्षम प्रोजेक्ट्स खोजें
- **CI/CD**: स्वचालित वर्कफ़्लोज़ में Intlayer प्रोजेक्ट्स सत्यापित करें
- **डॉक्यूमेंटेशन**: Intlayer का उपयोग करने वाले सभी प्रोजेक्ट्स की सूची बनाकर डॉक्यूमेंटेशन जनरेट करें

आउटपुट प्रत्येक प्रोजेक्ट डायरेक्टरी के पूर्ण पथ (absolute paths) प्रदान करता है, जिससे कई Intlayer प्रोजेक्ट्स पर नेविगेट करना या उन पर स्क्रिप्ट संचालन करना आसान हो जाता है।
