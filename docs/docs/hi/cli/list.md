---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: सामग्री घोषणा फ़ाइलों की सूची बनाएं
description: अपने प्रोजेक्ट में सभी सामग्री घोषणा फ़ाइलों की सूची कैसे बनाएं, जानें।
keywords:
  - सूची
  - सामग्री घोषणा
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: सूची कमांड में JSON आउटपुट विकल्प जोड़ा गया
---

# सामग्री घोषणा फ़ाइलों की सूची बनाएं

```bash
npx intlayer content list
```

## उपनाम:

- `npx intlayer list`

यह कमांड आपके प्रोजेक्ट में सभी सामग्री घोषणा फ़ाइलों को प्रदर्शित करता है, उनके शब्दकोश कुंजी और फ़ाइल पथ दिखाता है। यह आपकी सभी सामग्री फ़ाइलों का अवलोकन प्राप्त करने और यह सत्यापित करने के लिए उपयोगी है कि वे Intlayer द्वारा सही ढंग से खोजी गई हैं।

## तर्क:

- **`--json`**: परिणामों को स्वरूपित पाठ के बजाय JSON के रूप में आउटपुट करें। स्क्रिप्टिंग और प्रोग्रामेटिक पहुंच के लिए उपयोगी।

  > उदाहरण: `npx intlayer content list --json`

## उदाहरण:

### सामग्री घोषणा फ़ाइलों की सूची बनाएं:

```bash
npx intlayer content list
```

### JSON के रूप में आउटपुट:

```bash
npx intlayer content list --json
```

## उदाहरण आउटपुट:

### स्वरूपित आउटपुट:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

कुल सामग्री घोषणा फ़ाइलें: 3
```

### JSON आउटपुट:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

यह कमांड आउटपुट करेगा:

- सभी सामग्री घोषणा फ़ाइलों की एक स्वरूपित सूची उनके कुंजी और सापेक्ष फ़ाइल पथ के साथ
- मिली हुई कुल सामग्री घोषणा फ़ाइलों की संख्या

यह आउटपुट आपको यह सत्यापित करने में मदद करता है कि आपकी सभी सामग्री फ़ाइलें सही ढंग से कॉन्फ़िगर की गई हैं और Intlayer सिस्टम द्वारा खोजी जा सकती हैं।
