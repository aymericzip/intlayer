---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useIntlayer हुक प्रलेखन | astro-intlayer
description: स्थानीयकृत सामग्री तक पहुँचने के लिए Astro कंपोनेंट्स और क्लाइंट स्क्रिप्ट्स में useIntlayer हुक का उपयोग करने का तरीका देखें।
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "प्रारंभिक प्रलेखन"
author: aymericzip
---

# useIntlayer हुक प्रलेखन

`useIntlayer` हुक आपको Astro एप्लिकेशनों में कुंजी द्वारा स्थानीयकृत शब्दकोश सामग्री प्राप्त करने की अनुमति देता है।

इसे एक ही आयात पथ का उपयोग करके दो अलग-अलग संदर्भों में बुलाया जा सकता है:

1. **सर्वर / फ्रंटमैटर**: `.astro` फ़ाइलों के अंदर, यह `Astro.locals.intlayer` में संग्रहीत अनुरोध लोकेल का उपयोग करके सामग्री को स्वचालित रूप से हल करता है।
2. **ब्राउज़र / क्लाइंट `<script>`**: क्लाइंट स्क्रिप्ट्स या UI फ्रेमवर्क कंपोनेंट्स के अंदर, यह क्लाइंट-साइड स्टोर कार्यान्वयन (`vanilla-intlayer`) में हल होता है।

## उपयोग

### Astro कंपोनेंट फ्रंटमैटर में

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### क्लाइंट `<script>` ब्लॉक्स में

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## पैरामीटर

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: शब्दकोश की विशिष्ट कुंजी (जैसा कि आपकी `.content.ts` घोषणा फ़ाइलों में परिभाषित है)।
2. **`localeOrSelector`** (वैकल्पिक): एक विशिष्ट लोकेल या चयनकर्ता ऑब्जेक्ट (`{ item }`, `{ variant }`, वैकल्पिक रूप से `locale` के साथ)। प्रदान किए जाने पर, यह अनुरोध संदर्भ या क्लाइंट स्टोर से पता लगाए गए लोकेल को ओवरराइड करता है।

## विवरण

यह हुक निम्नलिखित कार्य करता है:

1. **लोकेल समाधान**:
   - सर्वर पर, `astro-intlayer/middleware` द्वारा आरंभ किए गए `AsyncLocalStorage` स्कोप के माध्यम से `Astro.locals.intlayer` से सक्रिय लोकेल को पढ़ता है।
   - ब्राउज़र में, क्लाइंट स्टोरेज/स्टोर से सक्रिय लोकेल को पढ़ता है।
2. **शब्दकोश पुनर्प्राप्ति**: निर्दिष्ट कुंजी से मेल खाने वाली शब्दकोश सामग्री को इंजेक्ट करता है।
3. **अनुवाद प्रसंस्करण**: अनुवादों (`t()`), गणनाओं, शर्तों, और मार्कडाउन को रेंडर करने के लिए तैयार सामग्री में हल करता है।

## संबंधित दस्तावेज़

- [`intlayer` एकीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/intlayer.md)
- [`useDictionary` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useDictionary.md)
- [`useLocale` हुक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/astro-intlayer/useLocale.md)
