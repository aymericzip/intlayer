---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionary फ़ंक्शन डॉक्यूमेंटेशन | intlayer
description: intlayer पैकेज के लिए getDictionary फ़ंक्शन का उपयोग कैसे करें देखें
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: `getDictionary` Function in `intlayer`

## विवरण

`getDictionary` फ़ंक्शन एक dictionary **object को interpret करता है जिसे आप स्वयं pass करते हैं** और दिए गए locale के लिए इसकी resolved content को return करता है। यह content को एक single pass में walk करता है और आवश्यकतानुसार प्रत्येक interpreter plugin को apply करता है, `t()` translations, enumerations, conditions, insertions, nesting, markdown, HTML और file nodes को resolve करते हुए।

[`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayer.md) के विपरीत, जो generated registry में key के आधार पर dictionary को look up करता है, `getDictionary` स्वयं dictionary को लेता है। यह इसे runtime पर built content, किसी API या CMS से fetched, या test में declared inline के लिए सही tool बनाता है।

**मुख्य विशेषताएँ:**

- Dictionary structure (`{ key, content }`) को follow करने वाले किसी भी object के साथ काम करता है
- Qualified dictionary group (collections, variants) को एक selector के साथ भी accept करता है
- पूरी तरह typed: returned object आपके द्वारा pass किए गए `content` को reflect करता है
- Custom interpreter plugins को accept करता है

---

## फ़ंक्शन सिग्नेचर

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // आवश्यक
  localeOrSelector?: LocalesValues | DictionarySelector, // वैकल्पिक
  plugins?: Plugins[]                                // वैकल्पिक
): DeepTransformContent<...>
```

---

## पैरामीटर

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **विवरण**: व्याख्या करने के लिए dictionary (या qualified dictionary group)।
  - **प्रकार**: `Dictionary | QualifiedDictionaryGroup`
  - **आवश्यक**: हाँ

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **विवरण**: content की व्याख्या करने के लिए locale, या एक selector object (`{ item }`, `{ variant }`, वैकल्पिक रूप से `locale` के साथ)। [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) देखें।
  - **प्रकार**: `LocalesValues | DictionarySelector`
  - **आवश्यक**: नहीं (Optional) — configured `defaultLocale` को default करता है।

- `plugins: Plugins[]`
  - **विवरण**: node transformers की एक array जो परिभाषित करता है कि कैसे recognized nodes की व्याख्या की जाती है। यदि छोड़ दिया जाता है, तो default set of interpreter plugins का उपयोग किया जाता है।
  - **प्रकार**: `Plugins[]`
  - **आवश्यक**: नहीं (Optional)

### रिटर्न्स

- **Type**: डिक्शनरी की व्याख्या की गई सामग्री।
- **Description**: आपके द्वारा पास की गई `content`, अनुरोधित लोकेल के लिए प्रत्येक Intlayer नोड को हल किया गया। एक संग्रह समूह के लिए जिसमें कोई `item` चयनकर्ता नहीं है, व्याख्या किए गए प्रविष्टियों का एक क्रमबद्ध array रिटर्न किया जाता है; `null` तब रिटर्न किया जाता है जब चयनकर्ता कुछ भी लक्षित नहीं करता है।

---

## उदाहरण उपयोग

### मूल उपयोग

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### रनटाइम पर लाई गई सामग्री की व्याख्या करना

```typescript
import { getDictionary, type Dictionary } from "intlayer";

// रिमोट डिक्शनरी को फेच करें
const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

// दिए गए डिक्शनरी से फ्रेंच भाषा की सामग्री प्राप्त करें
const banner = getDictionary(remoteDictionary, "fr");
```

### एक selector के साथ

```typescript
import { getDictionary } from "intlayer";

// एक qualified dictionary group एक single entry में resolve होता है…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …या एक ordered array में जब कोई `item` नहीं दिया गया हो
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## संबंधित फ़ंक्शन

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getIntlayer.md): समान interpretation, लेकिन dictionary को generated registry में key के आधार पर देखा जाता है।
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getDictionaryAsync.md): per-locale loader maps के लिए counterpart।
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useDictionary.md): React hook equivalent, जो provider से locale को पढ़ता है।

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
