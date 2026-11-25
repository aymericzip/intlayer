---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Schema से डिक्शनरी वैलिडेट करें (Zod)"
description: "intlayer.config.ts में Zod schema घोषित करें और उन्हें अपनी डिक्शनरी से जोड़ें, ताकि build के समय हर locale वैलिडेट हो और एडिटर में कंटेंट को टाइप मिले।"
keywords:
  - Schema
  - Zod
  - वैलिडेशन
  - डिक्शनरी
  - कंटेंट घोषणा
  - टाइप सेफ्टी
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "डॉक्यूमेंटेशन की शुरुआत"
author: aymericzip
---

# Schema से डिक्शनरी वैलिडेट करें

Schema किसी डिक्शनरी के कंटेंट की अपेक्षित संरचना बताता है। आप इसे `intlayer.config.ts` में एक बार घोषित करते हैं, इसे एक नाम देते हैं, और फिर `schema` फ़ील्ड के ज़रिए वह नाम किसी भी डिक्शनरी से जोड़ देते हैं।

इसके बाद Intlayer:

- डिक्शनरी build करते समय हर locale के लिए डिक्शनरी को **वैलिडेट** करता है, और हर समस्या को उसके locale और फ़ील्ड path के साथ रिपोर्ट करता है।
- आपके एडिटर में डिक्शनरी कंटेंट को **टाइप** करता है, ताकि कोई गायब या गलत टाइप वाला फ़ील्ड build से पहले ही पकड़ में आ जाए।

Schema तब उपयोगी होते हैं जब कई डिक्शनरी को एक ही संरचना साझा करनी हो (SEO मेटाडेटा, प्रोडक्ट कार्ड, CMS जैसी एंट्री), या जब कंटेंट को ऐसी सीमाओं का पालन करना हो जिन्हें TypeScript व्यक्त नहीं कर सकता, जैसे हर अनुवाद की अधिकतम लंबाई।

<Steps>
<Step number={1} title="कॉन्फ़िगरेशन में schema घोषित करें">

[Zod](https://zod.dev) इंस्टॉल करें:

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

फिर अपने schema को `schemas` key के अंदर घोषित करें। हर key वह नाम है जिसे आप अपनी डिक्शनरी से रेफ़र करेंगे।

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="डिक्शनरी से schema जोड़ें">

डिक्शनरी के `schema` फ़ील्ड में कॉन्फ़िगरेशन में घोषित नामों में से कोई एक सेट करें।

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

एक ही schema को जितनी चाहें उतनी डिक्शनरी से जोड़ा जा सकता है।

</Step>
<Step number={3} title="Build चलाएँ और रिपोर्ट पढ़ें">

वैलिडेशन हर बार चलता है जब Intlayer डिक्शनरी build करता है: `npx intlayer build` के साथ, या dev और build मोड में आपके bundler plugin के ज़रिए। अगर कोई अनुवाद schema को तोड़ता है, तो Intlayer locale, फ़ील्ड path और Zod संदेश लॉग करता है:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

एक बार चलाया गया `intlayer build` तब विफल होता है जब schema का नाम अज्ञात हो या सत्यापन विफल हो जाए। watch मोड में, Intlayer अमान्य डिक्शनरी को तब तक बिल्ड से बाहर रखता है जब तक उसकी सामग्री ठीक नहीं हो जाती।

</Step>
</Steps>

## Schema से कंटेंट को टाइप करें

`Dictionary` के generic पैरामीटर तय करते हैं कि TypeScript किसी डिक्शनरी को कितनी सख़्ती से जाँचता है:

| घोषणा                                                   | `schema` फ़ील्ड                          | `content` फ़ील्ड                         |
| ------------------------------------------------------- | -------------------------------------- | -------------------------------------- |
| `satisfies Dictionary`                                  | ऑटोकम्प्लीट होता है, अज्ञात नाम एक error है | TypeScript द्वारा जाँचा नहीं जाता         |
| `satisfies Dictionary<undefined, "seo-metadata">`       | `"seo-metadata"` होना चाहिए            | Schema से टाइप किया गया                 |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | `"seo-metadata"` होना चाहिए            | Schema और आपके अपने टाइप से टाइप किया गया |

टाइप किए गए schema के साथ, हर फ़ील्ड या तो सामान्य वैल्यू स्वीकार करता है या ऐसा कंटेंट नोड जो वह वैल्यू बनाता है, इसलिए `t()` का उपयोग जारी रहता है:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer हर बार डिक्शनरी build करते समय आपके Zod schema से ये टाइप `.intlayer/types` में जेनरेट करता है। केवल संरचना टाइप होती है: `.min()`, `.max()` या `.regex()` जैसी सीमाएँ build के समय जाँची जाती हैं।

## क्या वैलिडेट होता है

`internationalization.locales` में सूचीबद्ध हर locale के लिए, Intlayer उस locale का डिक्शनरी कंटेंट resolve करता है, फिर परिणाम को वैलिडेट करता है। इसलिए schema फ़ील्ड की अंतिम वैल्यू (`title: string`) बताता है, न कि उस `t()` नोड को जिसमें अनुवाद रखे होते हैं।

- **गायब अनुवाद**: डिफ़ॉल्ट `strictMode` में, गायब अनुवाद वैलिडेशन से पहले डिफ़ॉल्ट locale पर fallback करता है। `strictMode: "strict"` में, गायब अनुवाद के कारण आवश्यक फ़ील्ड fail हो जाता है।
- **अन्य कंटेंट नोड**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` और `insert()` फ़ंक्शन में resolve होते हैं, और `md()` या `html()` नोड में। ऐसे फ़ील्ड को `z.any()` से घोषित करें, और सीमाएँ उन फ़ील्ड पर रखें जो सामान्य वैल्यू में resolve होते हैं।
- **वैलिडेट नहीं होता**: किसी फ़ंक्शन या Promise द्वारा दिया गया कंटेंट ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/function_fetching.md)), और [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) से लाई गई डिक्शनरी।

## कोई दूसरी वैलिडेशन लाइब्रेरी इस्तेमाल करें

`schemas` की एंट्री Zod से बंधी नहीं हैं। Zod के अनुकूल `safeParse(data)` मेथड वाला कोई भी ऑब्जेक्ट काम करता है, बशर्ते वह `{ success: true }` या `{ success: false, error: { issues } }` लौटाए, जहाँ हर issue में एक `path` array और एक `message` हो। कंटेंट टाइपिंग केवल Zod schema से जेनरेट होती है: किसी दूसरी लाइब्रेरी के साथ, जुड़ी हुई डिक्शनरी का कंटेंट `any` टाइप होता है।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या schema error मेरा build रोक देता है?">

एक बार चलाया गया `intlayer build` तब विफल होता है जब डिक्शनरी अपने schema के अनुरूप नहीं होती। watch मोड में, Intlayer त्रुटियाँ दर्ज करता है और डिक्शनरी को तब तक बाहर रखता है जब तक आप उसे ठीक करके सहेज नहीं लेते।

</Question>
<Question title="क्या कई डिक्शनरी एक ही schema साझा कर सकती हैं?">

हाँ। Schema को नाम से रेफ़र किया जाता है, इसलिए कितनी भी डिक्शनरी उसकी ओर इशारा कर सकती हैं। यही मुख्य उपयोग है: हर पेज मेटाडेटा, प्रोडक्ट एंट्री या ईमेल टेम्पलेट पर एक ही संरचना लागू करना।

</Question>
<Question title="अगर schema का नाम मौजूद न हो तो क्या होता है?">

जैसे ही कम से कम एक schema घोषित होता है, TypeScript इसे रिपोर्ट करता है, क्योंकि `schema` फ़ील्ड केवल घोषित नाम स्वीकार करता है। JSON फ़ाइल में अज्ञात schema नाम मिलने पर Intlayer बिल्ड के दौरान त्रुटि की सूचना देता है और डिक्शनरी को अस्वीकार कर देता है।

</Question>
<Question title="क्या हर locale वैलिडेट होता है, या सिर्फ़ डिफ़ॉल्ट वाला?">

`internationalization.locales` में सूचीबद्ध हर locale। रिपोर्ट fail होने वाले locale का नाम बताती है, इसलिए केवल जर्मन में बहुत लंबा अनुवाद आसानी से पकड़ा जा सकता है।

</Question>

</FAQ>

## संबंधित

- [कंटेंट घोषणा फ़ाइलें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md)
- [कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md)
