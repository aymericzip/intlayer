---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: angular-intlayer पैकेज दस्तावेज़
description: Intlayer के लिए Angular-विशिष्ट एकीकरण, Angular अनुप्रयोगों के लिए providers और services प्रदान करता है।
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी exports के लिए एकीकृत दस्तावेज़
---

# angular-intlayer पैकेज

`angular-intlayer` पैकेज Angular अनुप्रयोगों में Intlayer को एकीकृत करने के लिए आवश्यक टूल प्रदान करता है। यह बहुभाषी सामग्री को संभालने के लिए providers और services शामिल करता है।

## इंस्टॉलेशन

```bash
npm install angular-intlayer
```

## एक्सपोर्ट्स

### सेटअप

| फ़ंक्शन           | विवरण                                                       |
| ----------------- | ----------------------------------------------------------- |
| `provideIntlayer` | आपके Angular एप्लिकेशन में Intlayer प्रदान करने का फ़ंक्शन। |

### सेवाएँ

| सेवा              | विवरण                                                                          |
| ----------------- | ------------------------------------------------------------------------------ |
| `IntlayerService` | कुंजी के आधार पर किसी डिक्शनरी को चुनकर उसकी सामग्री लौटाने वाली सेवा।         |
| `LocaleService`   | वर्तमान locale लौटाने और उसे सेट करने के लिए एक फ़ंक्शन प्रदान करने वाली सेवा। |

### कम्पोनेंट्स

| कम्पोनेंट                   | विवरण                                                   |
| --------------------------- | ------------------------------------------------------- |
| `IntlayerMarkdownComponent` | Angular component जो Markdown सामग्री को रेंडर करता है। |
