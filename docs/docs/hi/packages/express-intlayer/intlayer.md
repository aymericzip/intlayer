---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "intlayer Express मिडलवेयर दस्तावेज़ | express-intlayer"
description: "express-intlayer पैकेज के लिए intlayer मिडलवेयर का उपयोग कैसे करें।"
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "प्रारंभिक दस्तावेज़"
---

# intlayer Express मिडलवेयर दस्तावेज़

Express के लिए `intlayer` मिडलवेयर उपयोगकर्ता की locale का पता लगाता है और `res.locals` ऑब्जेक्ट के माध्यम से translation फ़ंक्शन प्रदान करता है। यह आपके request handlers में `t` और `getIntlayer` फ़ंक्शन्स के उपयोग को भी सक्षम बनाता है।

## उपयोग

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## विवरण

यह middleware निम्नलिखित कार्य करता है:

1. **लोकेल का पता लगाना**: यह उपयोगकर्ता की लोकेल निर्धारित करने के लिए कुकीज़, हेडर (जैसे `Accept-Language`), और URL पैरामीटर की जाँच करता है।
2. **कॉन्टेक्स्ट सेटअप**: यह `res.locals` को निम्नलिखित के साथ भरता है:
   - `locale`: पहचानी गई लोकेल।
   - `t`: पहचानी गई लोकेल से बंधा हुआ एक translation फ़ंक्शन।
   - `getIntlayer`: एक फ़ंक्शन जो पहचानी गई लोकेल से बंधी हुई डिक्शनरीज़ प्राप्त करता है।
3. **ऐसिंक लोकल स्टोरेज**: यह अनुरोध के प्रवाह के भीतर `express-intlayer` से आयातित वैश्विक `t` और `getIntlayer` फ़ंक्शनों के उपयोग की अनुमति देने के लिए एक संदर्भ सेट करता है।
