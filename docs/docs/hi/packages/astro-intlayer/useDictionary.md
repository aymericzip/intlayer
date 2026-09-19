---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useDictionary हुक प्रलेखन | astro-intlayer
description: शब्दकोश ऑब्जेक्ट्स को हल करने के लिए Astro कंपोनेंट्स और स्क्रिप्ट्स में useDictionary हुक का उपयोग करने का तरीका देखें।
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "प्रारंभिक प्रलेखन"
author: aymericzip
---

# useDictionary हुक प्रलेखन

`useDictionary` हुक एक इम्पोर्ट किए गए या इनलाइन शब्दकोश ऑब्जेक्ट को हल करता है और Astro एप्लिकेशनों में वर्तमान लोकेल के लिए इसकी सामग्री लौटाता है।

`useIntlayer` के विपरीत, जो वैश्विक शब्दकोश रजिस्ट्री से कुंजी द्वारा शब्दकोशों को पुनः प्राप्त करता है, `useDictionary` सीधे एक शब्दकोश ऑब्जेक्ट के साथ काम करता है।

## उपयोग

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

आप `t()` के साथ परिभाषित इनलाइन शब्दकोश भी पास कर सकते हैं:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      hi: "सर्वाधिकार सुरक्षित।",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
      es: "Todos los derechos reservados.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## पैरामीटर

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: एक शब्दकोश ऑब्जेक्ट या योग्य शब्दकोश समूह।
2. **`localeOrSelector`** (वैकल्पिक): एक विशिष्ट लोकेल या चयनकर्ता ऑब्जेक्ट (`{ item }`, `{ variant }`, वैकल्पिक रूप से `locale` के साथ)।

## विवरण

यह हुक निम्नलिखित कार्य करता है:

1. **लोकेल का पता लगाना**: सर्वर पर, यह `Astro.locals.intlayer` से लोकेल प्राप्त करता है। ब्राउज़र में, यह क्लाइंट-साइड स्टोर लोकेल का उपयोग करता है।
2. **सामग्री प्रसंस्करण**: हल किए गए लोकेल के अनुसार अनुवाद (`t()`), गणना, शर्तें, और नेस्टेड संरचनाओं को हल करता है।
3. **चयनकर्ता**: तर्कों में प्रदान किए गए किसी भी आइटम या संस्करण चयनकर्ता को लागू करता है।

## संबंधित दस्तावेज़

- [`intlayer` एकीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/intlayer.md)
- [`useIntlayer` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useIntlayer.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useLocale.md)
