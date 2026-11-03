---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Prettier प्लगइन | Intlayer अनुवाद क्रमबद्ध करें
description: "prettier-plugin-intlayer के साथ t() के लोकेल, plural() की श्रेणियां, enu() की शर्तें, select() के केस और अपनी सामग्री घोषणाओं की कुंजियों को क्रमबद्ध करें।"
keywords:
  - Intlayer
  - Prettier
  - स्वरूपण
  - अनुवाद क्रमबद्ध करें
  - लोकेल क्रमबद्ध करें
  - i18n
  - अंतर्राष्ट्रीयकरण
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Prettier प्लगइन

`prettier-plugin-intlayer` हर बार जब Prettier किसी फ़ाइल को फ़ॉर्मेट करता है, तो आपके अनुवादों की कुंजियों को एक निश्चित क्रम में रखता है। इससे diffs छोटे रहते हैं, मर्ज विरोध (merge conflicts) दुर्लभ हो जाते हैं और किसी छूटे हुए लोकेल को पहचानना आसान हो जाता है।

```ts
// पहले
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// बाद में
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## स्थापना (Installation)

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

इसके लिए Prettier 3 या बाद के संस्करण की आवश्यकता है।

यदि आपका प्रोजेक्ट पहले से ही Prettier का उपयोग करता है, तो `intlayer init prettier` प्लगइन इंस्टॉल करता है और इसे आपके कॉन्फ़िगरेशन में जोड़ता है।

## उपयोग (Usage)

अपने Prettier कॉन्फ़िगरेशन में प्लगइन जोड़ें:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

इसे केवल अपनी सामग्री घोषणाओं पर लागू करने के लिए, override का उपयोग करें:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

## क्या क्रमबद्ध होता है

### `t()`: लोकेल्स

पिन किए गए लोकेल्स सबसे पहले आते हैं (डिफ़ॉल्ट रूप से `en`)। अन्य लोकेल्स वर्णमाला क्रम में आते हैं।

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: CLDR क्रम

श्रेणियां सबसे छोटी मात्रा से फ़ॉलबैक तक जाती हैं: `zero`, `one`, `two`, `few`, `many`, `other`।

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: आरोही सीमाएँ

शर्तों को उनकी संख्या के आधार पर और फिर ऑपरेटर (`<1`, `<=1`, `1`, `>=1`, `>1`) द्वारा क्रमबद्ध किया जाता है। `fallback` अंत में आता है।

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

रनटाइम पर, पहली मेल खाने वाली शर्त जीतती है। प्लगइन केवल तभी नया क्रम लागू करता है जब प्रत्येक मात्रा अभी भी उसी सामग्री पर हल होती है। जब क्रम परिणाम तय करता है, तो ऑब्जेक्ट को जैसा लिखा गया है वैसा ही छोड़ दिया जाता है। उदाहरण के लिए, `{ '<1': …, '<=-2.3': … }` में `'<1'` कुंजी प्रत्येक ऋणात्मक संख्या को पकड़ती है।

### `select()`: वर्णमाला क्रम

केस वर्णानुक्रम में क्रमबद्ध होते हैं और `fallback` अंत में आता है।

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

बिना `fallback` या `other` कुंजी के, अंतिम केस को फ़ॉलबैक के रूप में उपयोग किया जाता है। वह केस अंत में रहता है और केवल उससे पहले के केस क्रमबद्ध होते हैं।

### `.content.json` फ़ाइलें

क्रमबद्ध रूप को उसी तरह से व्यवस्थित किया जाता है: `{ "nodeType": "translation", "translation": { … } }`, साथ ही `plural`, `enumeration` और `select` नोड्स।

### सामग्री कुंजियाँ (ऑप्ट-इन)

`intlayerSortContentKeys: true` के साथ, प्लगइन हर नेस्टिंग स्तर पर डिक्शनरी `content` की कुंजियों को भी वर्णमाला क्रम में क्रमबद्ध करता है। यह केवल `*.content.*` फ़ाइलों पर लागू होता है।

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

क्रमबद्धता प्रत्येक हेल्पर (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) के माध्यम से उनके अंदर की वस्तुओं तक पहुँचती है। प्रत्येक हेल्पर का अपना कुंजी मानचित्र अपना क्रम बनाए रखता है। `cond()` और `gender()` को दी गई कुंजियों को कभी भी पुन: व्यवस्थित नहीं किया जाता है, क्योंकि उनकी अंतिम कुंजी फ़ॉलबैक होती है। `content` के साथ वाले फ़ील्ड (`key`, `title`, `locale`…) जैसे हैं वैसे ही रहते हैं।

## विकल्प

| विकल्प                    | डिफ़ॉल्ट | विवरण                                                                                                       |
| ------------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]` | `t()` में सबसे पहले रखे जाने वाले लोकेल्स, इसी क्रम में। सभी लोकेल्स को क्रमबद्ध करने के लिए `[]` पास करें। |
| `intlayerSortContentKeys` | `false`  | `*.content.*` फ़ाइलों में, डिक्शनरी सामग्री कुंजियों और नेस्टेड ऑब्जेक्ट्स को भी क्रमबद्ध करें।             |

## क्या अछूता रहता है

- स्प्रेड (`...base`), परिकलित कुंजी (`[key]`), विधि या डुप्लिकेट कुंजी रखने वाले ऑब्जेक्ट।
- `plural()` मानचित्र जिनकी कुंजी CLDR श्रेणी नहीं है।
- `enu()` मानचित्र जिनका नया क्रम हल की गई सामग्री को बदल देगा।
- किसी अन्य फ़ंक्शन के लिए कॉल जिसे हेल्पर जैसा नाम दिया गया है लेकिन गैर-ऑब्जेक्ट तर्क दिया गया है।

टिप्पणियाँ उस कुंजी के साथ चलती हैं जिससे वे संबंधित हैं।

## समर्थित पार्सर

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5` और `jsonc`। Vue, Svelte और Astro फ़ाइलों के `<script>` ब्लॉक इन पार्सर के साथ स्वरूपित किए जाते हैं।

> **ज्ञात सीमा।** Prettier प्रति पार्सर केवल एक प्लगइन चलाता है। यदि कोई अन्य प्लगइन जावास्क्रिप्ट/टाइपस्क्रिप्ट पार्सर को भी बदल देता है (उदाहरण के लिए `prettier-plugin-tailwindcss`), तो उन फ़ाइलों पर केवल अंतिम सूचीबद्ध प्लगइन ही लागू होता है। विरोध से बचने के लिए override के साथ `prettier-plugin-intlayer` को `*.content.*` फ़ाइलों तक सीमित करें।
