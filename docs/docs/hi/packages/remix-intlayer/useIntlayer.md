---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: useIntlayer हुक प्रलेखन | remix-intlayer
description: Remix 3 एप्लिकेशनों में कुंजी द्वारा स्थानीयकृत सामग्री तक पहुँचने के लिए useIntlayer हुक का उपयोग करने का तरीका देखें।
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "useIntlayer हुक का प्रारंभिक प्रलेखन"
author: aymericzip
---

# useIntlayer हुक प्रलेखन

`useIntlayer` हुक आपको Remix 3 एप्लिकेशनों में कुंजी द्वारा Intlayer शब्दकोश से स्थानीयकृत सामग्री प्राप्त करने की अनुमति देता है।

यह स्वचालित रूप से वर्तमान अनुरोध संदर्भ (`AsyncLocalStorage` के माध्यम से) से सक्रिय लोकेल को पढ़ता है, इसलिए आपको रूट हैंडलर्स, व्यू टेम्प्लेट्स, या कंपोनेंट्स में लोकेल को पास करने की आवश्यकता नहीं होती है।

## उपयोग

### रूट हैंडलर्स में

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### व्यू टेम्प्लेट्स और कंपोनेंट्स में

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## पैरामीटर

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: शब्दकोश की विशिष्ट कुंजी (जैसा कि आपकी `.content.ts` घोषणा फ़ाइलों में परिभाषित है)।
2. **`localeOrSelector`** (वैकल्पिक): एक विशिष्ट लोकेल या चयनकर्ता ऑब्जेक्ट (`{ item }`, `{ variant }`, वैकल्पिक रूप से `locale` के साथ)। प्रदान किए जाने पर, यह अनुरोध संदर्भ से पता लगाए गए लोकेल को ओवरराइड करता है।

## विवरण

यह हुक निम्नलिखित कार्य करता है:

1. **संदर्भ लोकेल का पता लगाना**: `intlayer()` मिडलवेयर द्वारा स्थापित अनुरोध-बाध्य `AsyncLocalStorage` स्कोप से वर्तमान लोकेल का पता लगाता है।
2. **शब्दकोश पुनर्प्राप्ति**: प्रदान की गई कुंजी के अनुरूप पूर्व-संकलित शब्दकोश प्राप्त करता है।
3. **अनुवाद प्रसंस्करण**: हल किए गए लोकेल के लिए अनुवाद, गणना, मार्कडाउन और सशर्त सामग्री को हल करता है।
4. **फ़ॉलबैक प्रबंधन**: यदि सक्रिय HTTP अनुरोध संदर्भ के बाहर कॉल किया जाता है (उदा. बैकग्राउंड कार्य या बिना मिडलवेयर के यूनिट परीक्षण), तो यह सुरक्षित रूप से कॉन्फ़िगर किए गए `defaultLocale` पर वापस आ जाता है।

## संबंधित दस्तावेज़

- [`intlayer` मिडलवेयर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/intlayerMiddleware.md)
- [`useDictionary` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useDictionary.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/remix-intlayer/useLocale.md)
