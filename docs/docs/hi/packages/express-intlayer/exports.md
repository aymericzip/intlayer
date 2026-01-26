---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: express-intlayer पैकेज दस्तावेज़
description: Intlayer के लिए Express middleware, जो अनुवाद फ़ंक्शन और locale का पता लगाने की सुविधा प्रदान करता है।
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी exports के लिए एकीकृत दस्तावेज़ीकरण
---

# express-intlayer पैकेज

`express-intlayer` पैकेज Express एप्लिकेशन के लिए एक middleware प्रदान करता है जो internationalization (i18n) को संभालता है। यह उपयोगकर्ता की locale का पता लगाता है और अनुवाद फ़ंक्शन प्रदान करता है।

## इंस्टॉलेशन

```bash
npm install express-intlayer
```

## एक्सपोर्ट्स

### मिडलवेयर

इम्पोर्ट:

```tsx
import "express-intlayer";
```

| फ़ंक्शन    | विवरण                                                                                                                                                                                                                                                                                         | संबंधित दस्तावेज़                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Express middleware जो उपयोगकर्ता की locale का पता लगाता है और `res.locals` को Intlayer डेटा से भरता है। यह कुकीज़/हेडरों से locale का पता लगाता है, `t`, `getIntlayer`, और `getDictionary` को `res.locals` में इंजेक्ट करता है, और request lifecycle एक्सेस के लिए CLS namespace सेट करता है। | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/express-intlayer/intlayer.md) |

### फ़ंक्शंस

इम्पोर्ट:

```tsx
import "express-intlayer";
```

| फ़ंक्शन         | विवरण                                                                                                                                                                                                                     | संबंधित दस्तावेज़                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | वर्तमान locale के लिए सामग्री प्राप्त करने वाला अनुवाद फ़ंक्शन। यह `intlayer` मिडलवेयर द्वारा प्रबंधित अनुरोध लाइफ़साइकल के भीतर काम करता है। अनुरोध संदर्भ तक पहुँचने के लिए CLS (Async Local Storage) का उपयोग करता है। | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md) |
| `getIntlayer`   | जनरेट की गई declaration से इसके key द्वारा एक dictionary प्राप्त करता है और निर्दिष्ट locale के लिए इसका content लौटाता है। `getDictionary` का optimized संस्करण। request context तक पहुँचने के लिए CLS का उपयोग करता है। | -                                                                                                      |
| `getDictionary` | dictionary objects को process करता है और निर्दिष्ट locale के लिए content लौटाता है। `t()` translations, enumerations, markdown, HTML आदि को process करता है। request context तक पहुँचने के लिए CLS का उपयोग करता है।      | -                                                                                                      |
