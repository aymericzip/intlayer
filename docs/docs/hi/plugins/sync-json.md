---
createdAt: 2025-03-13
updatedAt: 2026-06-21
title: सिंक JSON प्लगइन
description: Intlayer शब्दकोशों को तृतीय-पक्ष i18n JSON फ़ाइलों (i18next, next-intl, react-intl, vue-i18n, और अन्य) के साथ सिंक्रनाइज़ करें। अपने मौजूदा i18n को बनाए रखें जबकि Intlayer का उपयोग करके अपने संदेशों का प्रबंधन, अनुवाद और परीक्षण करें।
keywords:
  - Intlayer
  - सिंक JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - अनुवाद
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "splitKeys विकल्प जोड़ा गया (next-intl / react-intl एकल-फ़ाइल लेआउट के लिए प्रति शीर्ष-स्तरीय नेमस्पेस कुंजी एक शब्दकोश)"
  - version: 7.5.0
    date: 2025-12-13
    changes: "ICU और i18next प्रारूप समर्थन जोड़ा गया"
  - version: 6.1.6
    date: 2025-10-05
    changes: "प्रारंभिक सिंक JSON प्लगइन दस्तावेज़ीकरण"
author: aymericzip
---

# सिंक JSON (i18n ब्रिजेस) - ICU / i18next समर्थन के साथ सिंक JSON

<iframe title="Intlayer के साथ अपने JSON अनुवादों को सिंक में कैसे रखें" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

अपने मौजूदा i18n स्टैक में एक ऐड-ऑन के रूप में Intlayer का उपयोग करें। यह प्लगइन आपके JSON संदेशों को Intlayer शब्दकोशों के साथ सिंक्रनाइज़ रखता है ताकि आप:

- i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n आदि को बनाए रख सकें।
- अपने ऐप को पुनः संरचित किए बिना Intlayer (CLI, CI, प्रदाता, CMS) के साथ अपने संदेशों का प्रबंधन और अनुवाद कर सकें।
- प्रत्येक इकोसिस्टम को लक्षित करते हुए ट्यूटोरियल और SEO सामग्री वितरित करें, साथ ही JSON प्रबंधन परत के रूप में Intlayer का सुझाव दें।

नोट्स और वर्तमान दायरा:

- CMS के लिए बाहरीकरण अनुवादों और क्लासिक टेक्स्ट के लिए काम करता है।
- अभी तक सम्मिलन, बहुवचन/ICU, या अन्य लाइब्रेरी के उन्नत रनटाइम फीचर्स के लिए समर्थन नहीं है।
- तीसरे पक्ष के i18n आउटपुट के लिए विज़ुअल एडिटर अभी समर्थित नहीं है।

### इस प्लगइन का उपयोग कब करें

- आप पहले से ही एक i18n लाइब्रेरी का उपयोग करते हैं और संदेशों को JSON फ़ाइलों में संग्रहीत करते हैं।
- आप AI-सहायता प्राप्त भराई, CI में परीक्षण, और कंटेंट ऑप्स चाहते हैं बिना अपने रेंडरिंग रनटाइम को बदले।

## Installation

```bash
pnpm add -D @intlayer/sync-json-plugin
# या
npm i -D @intlayer/sync-json-plugin
```

## Plugins

This package provides two plugins:

- `loadJSON`: Load JSON files into Intlayer dictionaries.
  - This plugin is used to load JSON files from a source and will be loaded into Intlayer dictionaries. It can scan all the codebase and search for specific JSON files.
    This plugin can be used
    - if you use an i18n library that impose a specific location for your JSON to be loaded (ex: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), but you want to place your content declaration where you want in your code base.
    - It can also be used if you want to fetch your messages from a remote source (ex: a CMS, a API, etc.) and store your messages in JSON files.

  > Under the hood, this plugin will scan all the codebase and search for specific JSON files and load them into Intlayer dictionaries.
  > Note that this plugin will not write the output and translations back to the JSON files.

- `syncJSON`: Synchronize JSON files with Intlayer dictionaries.
  - This plugin is used to synchronize JSON files with Intlayer dictionaries. It can scan the given location and load the JSON that match the pattern for specific JSON files. This plugin is useful if you want to get the benefits of Intlayer while using another i18n library.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
      format: "intlayer", // Format of the JSON content
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

अपने `intlayer.config.ts` में प्लगइन जोड़ें और इसे अपनी मौजूदा JSON संरचना की ओर इंगित करें।

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // अपने वर्तमान JSON फ़ाइलों को Intlayer शब्दकोशों के साथ सिंक में रखें
  plugins: [
    syncJSON({
      // प्रति-लोकल, प्रति-नेमस्पेस लेआउट (जैसे, next-intl, i18next नेमस्पेस के साथ)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

वैकल्पिक: प्रति-लोकल एकल फ़ाइल (i18next/react-intl सेटअप में सामान्य):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### How it works

- पढ़ें: प्लगइन आपके `source` बिल्डर से JSON फ़ाइलों को खोजता है और उन्हें Intlayer शब्दकोश के रूप में लोड करता है।
- लिखें: बिल्ड और भराई के बाद, यह स्थानीयकृत JSON को उसी पथों पर वापस लिखता है (फॉर्मेटिंग समस्याओं से बचने के लिए अंतिम नई लाइन के साथ)।
- ऑटो-फिल: प्लगइन प्रत्येक शब्दकोश के लिए एक `autoFill` पथ घोषित करता है। डिफ़ॉल्ट रूप से, `intlayer fill` चलाने पर आपकी JSON फ़ाइलों में केवल गायब अनुवाद अपडेट होते हैं।

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // आवश्यक
  location?: string, // वैकल्पिक लेबल, डिफ़ॉल्ट: "plugin"
  priority?: number, // संघर्ष समाधान के लिए वैकल्पिक प्राथमिकता, डिफ़ॉल्ट: 0
  format?: 'intlayer' | 'icu' | 'i18next', // वैकल्पिक फ़ॉर्मेटर, Intlayer रनटाइम संगतता के लिए उपयोग किया जाता है
  splitKeys?: boolean, // वैकल्पिक, एक एकल फ़ाइल को प्रति शीर्ष-स्तरीय कुंजी एक शब्दकोश में विभाजित करें (स्वचालित रूप से पता लगाया गया)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

JSON फ़ाइलों को सिंक्रनाइज़ करते समय शब्दकोश सामग्री के लिए उपयोग किए जाने वाले फ़ॉर्मेटर को निर्दिष्ट करता है। यह Intlayer रनटाइम के साथ संगत विभिन्न संदेश फ़ॉर्मेटिंग सिंटैक्स का उपयोग करने की अनुमति देता है।

- `undefined`: कोई फ़ॉर्मेटर उपयोग नहीं किया जाएगा, JSON सामग्री जैसी है वैसी ही उपयोग की जाएगी।
- `'intlayer'`: डिफ़ॉल्ट Intlayer फ़ॉर्मेटर (डिफ़ॉल्ट)।
- `'icu'`: ICU संदेश फ़ॉर्मेटिंग का उपयोग करता है (react-intl, vue-i18n जैसी लाइब्रेरी के साथ संगत)।
- `'i18next'`: i18next संदेश फ़ॉर्मेटिंग का उपयोग करता है (i18next, next-i18next, Solid-i18next के साथ संगत)।

> ध्यान दें कि फ़ॉर्मेटर का उपयोग करने से आपकी JSON सामग्री इनपुट और आउटपुट में रूपांतरित हो जाएगी। ICU बहुवचन जैसे जटिल JSON नियमों के लिए, पार्सिंग इनपुट और आउटपुट के बीच 1 से 1 मैपिंग की गारंटी नहीं दे सकता।
> यदि आप Intlayer रनटाइम का उपयोग नहीं करते हैं, तो आप फ़ॉर्मेटर सेट न करना पसंद कर सकते हैं।

**उदाहरण:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // संगतता के लिए i18next फ़ॉर्मेटिंग का उपयोग करें
}),
```

#### `splitKeys` (बूलियन)

यह नियंत्रित करता है कि एक एकल JSON फ़ाइल जिसके **पहले-स्तर की कुंजियाँ नेमस्पेस हैं** उसे पूरी फ़ाइल को रखने वाले एक एकल शब्दकोश के बजाय, प्रति शीर्ष-स्तरीय कुंजी एक शब्दकोश बनना चाहिए या नहीं।

यह `next-intl` और `react-intl` जैसी लाइब्रेरी के नेमस्पेस मॉडल से मेल खाता है, जहाँ एक `messages/{locale}.json` फ़ाइल अपने पहले-स्तर की कुंजियों द्वारा कई नेमस्पेस को समूहित करती है, प्रत्येक को स्वतंत्र रूप से संबोधित किया जाता है (उदाहरण के लिए `useTranslations('Hero')` `Hero` शब्दकोश में हल होता है)।

- `undefined` (डिफ़ॉल्ट): **स्वचालित रूप से पता लगाया गया** — फ़ाइल तब विभाजित होती है जब `source` पैटर्न में कोई `{key}` खंड नहीं होता है (एक फ़ाइल हर नेमस्पेस को रखती है), और अन्यथा एक एकल शब्दकोश के रूप में रखा जाता है (प्रति कुंजी एक फ़ाइल)।
- `true`: हमेशा प्रत्येक शीर्ष-स्तरीय कुंजी को उसके अपने शब्दकोश में विभाजित करें।
- `false`: कभी विभाजित न करें; पूरी फ़ाइल एक एकल शब्दकोश बन जाती है।

एकल `messages/{locale}.json` फ़ाइल को देखते हुए:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // implied because the pattern has no `{key}` segment
}),
```

यह तीन शब्दकोश — `Hero`, `Nav`, और `About` — उत्पन्न करता है, ताकि `useTranslations('Hero')` (next-intl) सही ढंग से हल हो सके। वापस लिखने पर, सभी नेमस्पेस को उसी प्रति-लोकल फ़ाइल में फिर से इकट्ठा किया जाता है।

> जब आप अपने `source` में स्पष्ट `{key}` खंड रखते हैं (उदाहरण के लिए `./locales/${locale}/${key}.json`), तो प्रत्येक फ़ाइल पहले से ही एक नेमस्पेस होती है, इसलिए विभाजन डिफ़ॉल्ट रूप से अक्षम होता है।

### Multiple JSON sources and priority

आप विभिन्न JSON स्रोतों को सिंक्रनाइज़ करने के लिए कई `syncJSON` प्लगइन्स जोड़ सकते हैं। यह तब उपयोगी होता है जब आपके प्रोजेक्ट में कई i18n लाइब्रेरीज़ या विभिन्न JSON संरचनाएँ हों।

### प्राथमिकता प्रणाली

जब कई प्लगइन्स एक ही शब्दकोश कुंजी को लक्षित करते हैं, तो `priority` पैरामीटर यह निर्धारित करता है कि कौन सा प्लगइन प्राथमिकता प्राप्त करेगा:

- उच्च प्राथमिकता संख्या निम्न प्राथमिकता वाले पर जीतती है
- `.content` फ़ाइलों की डिफ़ॉल्ट प्राथमिकता `0` है
- प्लगइन्स की सामग्री फ़ाइलों की डिफ़ॉल्ट प्राथमिकता `-1` है
- समान प्राथमिकता वाले प्लगइन्स को कॉन्फ़िगरेशन में उनके प्रकट होने के क्रम में संसाधित किया जाता है

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // प्राथमिक JSON स्रोत (सबसे उच्च प्राथमिकता)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // फॉलबैक JSON स्रोत (कम प्राथमिकता)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // लेगेसी JSON स्रोत (सबसे कम प्राथमिकता)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON plugin

### Quick start

Add the plugin to your `intlayer.config.ts` to ingest existing JSON files as Intlayer dictionaries. This plugin is read‑only (no writes to disk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest JSON messages located anywhere in your source tree
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Load a single locale per plugin instance (defaults to the config defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative: per‑locale layout, still read‑only (only the selected locale is loaded):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Discover: builds a glob from your `source` builder and collects matching JSON files.
- Ingest: loads each JSON file as an Intlayer dictionary with the provided `locale`.
- Read‑only: does not write or format output files; use `syncJSON` if you need round‑trip sync.
- Auto‑fill ready: defines a `fill` pattern so `intlayer content fill` can populate missing keys.

### API

```ts
loadJSON({
  // Build paths to your JSON. `locale` is optional if your structure has no locale segment
  source: ({ key, locale }) => string,

  // Target locale for the dictionaries loaded by this plugin instance
  // Defaults to configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optional label to identify the source
  location?: string, // default: "plugin"

  // Priority used for conflict resolution against other sources
  priority?: number, // default: 0

  // Optional formatter for the JSON content
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // एक एकल फ़ाइल को प्रति शीर्ष-स्तरीय कुंजी एक शब्दकोश में विभाजित करें (स्वचालित रूप से पता लगाया गया)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Specifies the formatter to use for the dictionary content when loading JSON files. This allows using different message formatting syntaxes compatible with various i18n libraries.

- `'intlayer'`: The default Intlayer formatter (default).
- `'icu'`: Uses ICU message formatting (compatible with libraries like react-intl, vue-i18n).
- `'i18next'`: Uses i18next message formatting (compatible with i18next, next-i18next, Solid-i18next).

**Example:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Use ICU formatting for compatibility
}),
```

#### `splitKeys` (बूलियन)

[`syncJSON`](#splitkeys-boolean) के समान व्यवहार: जब एक एकल JSON फ़ाइल अपने पहले-स्तर की कुंजियों द्वारा कई नेमस्पेस को समूहित करती है, तो प्रत्येक शीर्ष-स्तरीय कुंजी अपना स्वयं का शब्दकोश बन जाती है।

- `undefined` (डिफ़ॉल्ट): **स्वचालित रूप से पता लगाया गया** — जब `source` पैटर्न में कोई `{key}` खंड नहीं होता है तो विभाजित करें, अन्यथा एकल शब्दकोश।
- `true` / `false`: विभाजन को लागू करें या अक्षम करें।

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … each become a dictionary
}),
```

### Behavior and conventions

- If your `source` mask includes a locale placeholder, only files for the selected `locale` are ingested.
- यदि आपके मास्क में कोई `{key}` खंड नहीं है, तो फ़ाइल की प्रत्येक शीर्ष-स्तरीय कुंजी डिफ़ॉल्ट रूप से अपना स्वयं का शब्दकोश बन जाती है (देखें [`splitKeys`](#splitkeys-boolean))। पूरी फ़ाइल को एक एकल `index` शब्दकोश के रूप में लोड करने के लिए `splitKeys: false` सेट करें।
- Keys are derived from file paths by substituting the `{key}` placeholder in your `source` builder.
- The plugin only uses discovered files and does not fabricate missing locales or keys.
- The `fill` path is inferred from your `source` and used to update missing values via CLI when you opt‑in.

## Conflict resolution

जब एक ही अनुवाद कुंजी कई JSON स्रोतों में मौजूद होती है:

1. सबसे उच्च प्राथमिकता वाला प्लगइन अंतिम मान निर्धारित करता है
2. कम प्राथमिकता वाले स्रोत गायब कुंजी के लिए फॉलबैक के रूप में उपयोग किए जाते हैं
3. यह आपको लेगेसी अनुवाद बनाए रखने की अनुमति देता है जबकि आप धीरे-धीरे नए संरचनाओं में माइग्रेट कर रहे होते हैं

## CLI

सिंक किए गए JSON फ़ाइलों को अन्य `.content` फ़ाइलों के रूप में माना जाएगा। इसका मतलब है कि सभी intlayer कमांड सिंक किए गए JSON फ़ाइलों के लिए उपलब्ध होंगे। जिनमें शामिल हैं:

- `intlayer content test` यह जांचने के लिए कि क्या कोई अनुवाद गायब है
- `intlayer content list` सिंक किए गए JSON फ़ाइलों की सूची बनाने के लिए
- `intlayer content fill` गायब अनुवाद भरने के लिए
- `intlayer content push` सिंक किए गए JSON फ़ाइलों को पुश करने के लिए
- `intlayer content pull` सिंक किए गए JSON फ़ाइलों को पुल करने के लिए

अधिक जानकारी के लिए [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।

## सीमाएँ (वर्तमान)

- तृतीय-पक्ष लाइब्रेरीज़ को लक्षित करते समय कोई सम्मिलन या बहुवचन/ICU समर्थन नहीं।
- गैर-Intlayer रनटाइम के लिए विज़ुअल एडिटर अभी उपलब्ध नहीं है।
- केवल JSON सिंक्रनाइज़ेशन; गैर-JSON कैटलॉग प्रारूप समर्थित नहीं हैं।

## यह क्यों महत्वपूर्ण है

- हम स्थापित i18n समाधानों की सिफारिश कर सकते हैं और Intlayer को एक ऐड-ऑन के रूप में स्थिति दे सकते हैं।
- हम उनके SEO/कीवर्ड का उपयोग ट्यूटोरियल के साथ करते हैं जो अंत में JSON प्रबंधन के लिए Intlayer सुझाते हैं।
- यह लक्षित दर्शकों का विस्तार करता है, "नए प्रोजेक्ट्स" से लेकर "कोई भी टीम जो पहले से i18n का उपयोग कर रही है" तक।
