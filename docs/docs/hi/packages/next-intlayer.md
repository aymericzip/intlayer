---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: next-intlayer पैकेज डॉक्यूमेंटेशन
description: Next.js-विशिष्ट Intlayer एकीकरण, App Router और Page Router के लिए middleware और providers प्रदान करता है।
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# next-intlayer पैकेज

`next-intlayer` पैकेज Next.js एप्लिकेशनों में Intlayer को एकीकृत करने के लिए आवश्यक टूल प्रदान करता है। यह `App Router` और `Page Router` दोनों का समर्थन करता है, और locale-आधारित रूटिंग के लिए `middleware` भी शामिल करता है।

## इंस्टॉलेशन

```bash
npm install next-intlayer
```

## एक्सपोर्ट्स

### मिडलवेयर

| फ़ंक्शन              | विवरण                                                                     |
| -------------------- | ------------------------------------------------------------------------- |
| `intlayerMiddleware` | Next.js middleware जो locale-आधारित रूटिंग और रीडायरेक्ट्स को संभालता है। |

### प्रोवाइडर्स

| कंपोनेंट                 | विवरण                                                            |
| ------------------------ | ---------------------------------------------------------------- |
| `IntlayerClientProvider` | Next.js में क्लाइंट-साइड कंपोनेंट्स के लिए प्रोवाइडर।            |
| `IntlayerServerProvider` | Next.js में सर्वर-साइड कंपोनेंट्स के लिए प्रोवाइडर (App Router)। |

### Hooks (क्लाइंट-साइड)

अधिकांश हुक्स को `react-intlayer` से री-एक्सपोर्ट करता है।

| हुक             | विवरण                                                        |
| --------------- | ------------------------------------------------------------ |
| `useIntlayer`   | कुंजी के द्वारा एक dictionary चुनता है और सामग्री लौटाता है। |
| `useDictionary` | कुंजी के द्वारा एक dictionary चुनता है और सामग्री लौटाता है। |
| `useLocale`     | वर्तमान locale और इसे सेट करने के लिए एक फ़ंक्शन लौटाता है।  |
| `useI18n`       | वर्तमान Intlayer context मान लौटाता है।                      |

### फ़ंक्शंस (सर्वर-साइड)

| फ़ंक्शन                | विवरण                                                            |
| ---------------------- | ---------------------------------------------------------------- |
| `t`                    | Next.js App Router के लिए अनुवाद फ़ंक्शन का सर्वर-साइड संस्करण।  |
| `generateStaticParams` | Next.js के डायनेमिक routes के लिए static पैरामीटर जनरेट करता है। |

### प्रकार

| प्रकार               | विवरण                                             |
| -------------------- | ------------------------------------------------- |
| `NextPageIntlayer`   | Intlayer सपोर्ट वाले Next.js पेजों के लिए टाइप।   |
| `NextLayoutIntlayer` | Intlayer सपोर्ट वाले Next.js लेआउट्स के लिए टाइप। |
