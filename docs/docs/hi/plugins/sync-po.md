---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Sync PO प्लगइन
description: Intlayer शब्दकोशों को Gettext PO फ़ाइलों के साथ सिंक करें। अपने संदेशों को प्रबंधित करने, अनुवाद करने और परीक्षण करने के लिए Intlayer का उपयोग करते हुए अपने मौजूदा i18n को बनाए रखें।
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - अनुवाद
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Sync PO प्लगइन का प्रारंभिक दस्तावेज़ीकरण"
---

# Sync PO (i18n ब्रिज) - ICU / i18next समर्थन के साथ Sync PO

अपने मौजूदा i18n स्टैक के ऐड-ऑन के रूप में Intlayer का उपयोग करें। यह प्लगइन आपके Gettext PO संदेशों को Intlayer शब्दकोशों के साथ सिंक में रखता है ताकि आप:

- अपने मौजूदा PO-आधारित अनुवाद वर्कफ़्लो को बनाए रख सकें।
- अपने ऐप को रिफैक्टर किए बिना Intlayer (CLI, CI, प्रदाता, CMS) के साथ अपने संदेशों को प्रबंधित और अनुवाद कर सकें।
- प्रत्येक पारिस्थितिकी तंत्र को लक्षित करते हुए ट्यूटोरियल और SEO सामग्री भेज सकें, जबकि Intlayer को PO प्रबंधन परत के रूप में सुझा सकें।

नोट्स और वर्तमान दायरा:

- CMS के लिए बाहरीकरण अनुवादों और क्लासिक टेक्स्ट के लिए काम करता है।
- PO प्रविष्टियों के भीतर प्रविष्टि, बहुवचन/ICU, या अन्य पुस्तकालयों की उन्नत रनटाइम सुविधाओं के लिए अभी तक कोई समर्थन नहीं है।
- विज़ुअल एडिटर अभी तक तृतीय-पक्ष i18n आउटपुट के लिए समर्थित नहीं है।

### इस प्लगइन का उपयोग कब करें

- आप पहले से ही अपने अनुवादों के लिए Gettext PO फ़ाइलों का उपयोग करते हैं।
- आप अपने रेंडरिंग रनटाइम को बदले बिना AI-सहायता प्राप्त फिल, CI में टेस्ट और कंटेंट ऑप्स चाहते हैं।

## इंस्टॉलेशन

```bash
pnpm add -D @intlayer/sync-po-plugin
# या
npm i -D @intlayer/sync-po-plugin
```

## प्लगइन्स

यह पैकेज दो प्लगइन्स प्रदान करता है:

- `loadPO`: Intlayer शब्दकोशों में PO फ़ाइलें लोड करें।
  - इस प्लगइन का उपयोग स्रोत से PO फ़ाइलों को लोड करने के लिए किया जाता है और इसे Intlayer शब्दकोशों में लोड किया जाएगा। यह पूरे कोडबेस को स्कैन कर सकता है और विशिष्ट PO फ़ाइलों को खोज सकता है।
    इस प्लगइन का उपयोग किया जा सकता है:
    - यदि आप एक i18n लाइब्रेरी का उपयोग करते हैं जो आपकी PO फ़ाइलों को लोड करने के लिए एक विशिष्ट स्थान लागू करती है, लेकिन आप अपनी सामग्री घोषणा को अपने कोड बेस में जहां चाहें वहां रखना चाहते हैं।
    - इसका उपयोग तब भी किया जा सकता है जब आप रिमोट स्रोत (जैसे: CMS, एक API, आदि) से अपने संदेश प्राप्त करना चाहते हैं और अपने संदेशों को PO फ़ाइलों में संग्रहीत करना चाहते हैं।

  > हुड के तहत, यह प्लगइन पूरे कोडबेस को स्कैन करेगा और विशिष्ट PO फ़ाइलों को खोजेगा और उन्हें Intlayer शब्दकोशों में लोड करेगा।
  > ध्यान दें कि यह प्लगइन आउटपुट और अनुवादों को वापस PO फ़ाइलों में नहीं लिखेगा।

- `syncPO`: Intlayer शब्दकोशों के साथ PO फ़ाइलों को सिंक्रनाइज़ करें।
  - इस प्लगइन का उपयोग Intlayer शब्दकोशों के साथ PO फ़ाइलों को सिंक्रनाइज़ करने के लिए किया जाता है। यह दिए गए स्थान को स्कैन कर सकता है और विशिष्ट PO फ़ाइलों के पैटर्न से मेल खाने वाले PO को लोड कर सकता है। यदि आप दूसरी i18n लाइब्रेरी का उपयोग करते हुए Intlayer के लाभ प्राप्त करना चाहते हैं तो यह प्लगइन उपयोगी है।

## दोनों प्लगइन्स का उपयोग करना

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // अपनी वर्तमान PO फ़ाइलों को Intlayer शब्दकोशों के साथ सिंक में रखें
  plugins: [
    /**
     * src में उन सभी PO फ़ाइलों को लोड करेगा जो {key}.i18n.po पैटर्न से मेल खाती हैं
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // यह सुनिश्चित करता है कि ये PO फ़ाइलें `./locales/en/${key}.po` की फ़ाइलों पर प्राथमिकता लें
    }),
    /**
     * लोड करेगा, और आउटपुट और अनुवादों को वापस locales निर्देशिका में PO फ़ाइलों में लिखेगा
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## `syncPO` प्लगइन

### त्वरित शुरुआत

प्लगइन को अपने `intlayer.config.ts` में जोड़ें और इसे अपनी मौजूदा PO संरचना पर इंगित करें।

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // अपनी वर्तमान PO फ़ाइलों को Intlayer शब्दकोशों के साथ सिंक में रखें
  plugins: [
    syncPO({
      // प्रति-लोकेल, प्रति-नेमस्पेस लेआउट
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

वैकल्पिक: प्रति लोकेल एकल फ़ाइल:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### यह कैसे काम करता है

- पढ़ें: प्लगइन आपके `source` बिल्डर से PO फ़ाइलों की खोज करता है और उन्हें Intlayer शब्दकोशों के रूप में लोड करता है।
- लिखें: बिल्ड और फिल के बाद, यह स्थानीयकृत PO को वापस उन्हीं पथों पर लिखता है (उचित Gettext हेडर के साथ)।
- ऑटो-फिल: प्लगइन प्रत्येक शब्दकोश के लिए एक `autoFill` पथ घोषित करता है। `intlayer fill` चलाने से डिफ़ॉल्ट रूप से आपकी PO फ़ाइलों में केवल गायब अनुवाद अपडेट होते हैं।

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // आवश्यक
  location?: string, // वैकल्पिक लेबल, डिफ़ॉल्ट: "sync-po::path/to/source"
  priority?: number, // संघर्ष समाधान के लिए वैकल्पिक प्राथमिकता, डिफ़ॉल्ट: 0
  format?: 'icu' | 'i18next' | 'vue-i18n', // वैकल्पिक, केवल तभी आवश्यक जब आपके msgstr मान एक विशिष्ट इंटरपोलेशन सिंटैक्स का उपयोग करते हैं
});
```

#### `format` ('icu' | 'i18next' | 'vue-i18n')

PO फ़ाइलें हमेशा Gettext Portable Object फ़ाइलें होती हैं — वह स्थिर है। यह विकल्प केवल `msgstr` मानों के भीतर उपयोग किए जाने वाले **इंटरपोलेशन सिंटैक्स** का वर्णन करता है, ताकि Intlayer उन्हें पार्स समय ( `formatDictionary` के माध्यम से) पर अपने स्वयं के प्रारूप में परिवर्तित कर सके और आउटपुट लिखते समय वापस परिवर्तित कर सके।

- `undefined` _(डिफ़ॉल्ट)_: `msgstr` मानों को सादे स्ट्रिंग्स के रूप में माना जाता है — कोई परिवर्तन नहीं। अधिकांश PO फ़ाइलों के लिए इसका उपयोग करें।
- `'icu'`: `msgstr` मान ICU संदेश सिंटैक्स का उपयोग करते हैं (जैसे `{count, plural, one {# item} other {# items}}`)।
- `'i18next'`: `msgstr` मान i18next इंटरपोलेशन सिंटैक्स का उपयोग करते हैं (जैसे `{{variable}}`)।
- `'vue-i18n'`: `msgstr` मान Vue I18n सिंटैक्स का उपयोग करते हैं।

> रूपांतरण लोड होने पर `@intlayer/chokidar` के `formatDictionary` द्वारा लागू किया जाता है, और लिखते समय `formatDictionaryOutput` के साथ उलट दिया जाता है। ICU बहुवचन जैसे जटिल नियमों के लिए, राउंड-ट्रिप निष्ठा की गारंटी नहीं है।

**उदाहरण — PO फ़ाइलों में i18next-शैली इंटरपोलेशन शामिल है:**

```ts
syncPO({
  source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
  format: "i18next",
}),
```

### एकाधिक PO स्रोत और प्राथमिकता

आप विभिन्न PO स्रोतों को सिंक्रनाइज़ करने के लिए एकाधिक `syncPO` प्लगइन्स जोड़ सकते हैं। यह तब उपयोगी होता है जब आपके प्रोजेक्ट में कई अनुवाद स्रोत या अलग-अलग PO संरचनाएं हों।

#### प्राथमिकता प्रणाली

जब कई प्लगइन्स एक ही शब्दकोश कुंजी को लक्षित करते हैं, तो `priority` पैरामीटर यह निर्धारित करता है कि कौन सा प्लगइन प्राथमिकता लेता है:

- उच्च प्राथमिकता संख्याएँ कम प्राथमिकता वाली संख्याओं पर जीतती हैं
- `.content` फ़ाइलों की डिफ़ॉल्ट प्राथमिकता `0` है
- प्लगइन्स की डिफ़ॉल्ट प्राथमिकता `0` है
- समान प्राथमिकता वाले प्लगइन्स को कॉन्फ़िगरेशन में दिखाई देने वाले क्रम में संसाधित किया जाता है

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // प्राथमिक PO स्रोत (उच्चतम प्राथमिकता)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // फॉलबैक PO स्रोत (कम प्राथमिकता)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // लीगेसी PO स्रोत (सबसे कम प्राथमिकता)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load PO प्लगइन

### त्वरित शुरुआत

मौजूदा PO फ़ाइलों को Intlayer शब्दकोशों के रूप में प्राप्त करने के लिए प्लगइन को अपने `intlayer.config.ts` में जोड़ें। यह प्लगइन केवल पढ़ने के लिए है (डिस्क पर कोई लेखन नहीं):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // अपने स्रोत ट्री में कहीं भी स्थित PO संदेशों को प्राप्त करें
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // प्रति प्लगइन इंस्टेंस एक एकल लोकेल लोड करें (कॉन्फ़िगरेशन defaultLocale के लिए डिफ़ॉल्ट)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

वैकल्पिक: प्रति-लोकेल लेआउट, अभी भी केवल-पढ़ने के लिए (केवल चयनित लोकेल लोड किया गया है):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // इस पैटर्न से केवल Locales.FRENCH के लिए फ़ाइलें प्राप्त की जाएंगी
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### यह कैसे काम करता है

- खोज: आपके `source` बिल्डर से एक ग्लब बनाता है और मिलान करने वाली PO फ़ाइलें एकत्र करता है।
- प्राप्ति: प्रत्येक PO फ़ाइल को प्रदान किए गए `locale` के साथ Intlayer शब्दकोश के रूप में लोड करता है।
- केवल-पढ़ने के लिए: आउटपुट फ़ाइलों को लिखता या प्रारूपित नहीं करता है; यदि आपको राउंड-ट्रिप सिंक की आवश्यकता है तो `syncPO` का उपयोग करें।
- ऑटो-फिल तैयार: एक `fill` पथ परिभाषित करता है ताकि `intlayer content fill` गायब कुंजियों को पॉप्युलेट कर सके।

### API

```ts
loadPO({
  // आपके PO के पथ बनाएं। `locale` वैकल्पिक है यदि आपकी संरचना में कोई लोकेल सेगमेंट नहीं है
  source: ({ key, locale }) => string,

  // इस प्लगइन इंस्टेंस द्वारा लोड किए गए शब्दकोशों के लिए लक्षित लोकेल
  // कॉन्फ़िगरेशन configuration.internationalization.defaultLocale के लिए डिफ़ॉल्ट
  locale?: Locale,

  // स्रोत की पहचान करने के लिए वैकल्पिक लेबल
  location?: string, // डिफ़ॉल्ट: "plugin"

  // अन्य स्रोतों के खिलाफ संघर्ष समाधान के लिए उपयोग की जाने वाली प्राथमिकता
  priority?: number, // डिफ़ॉल्ट: 0
});
```

### व्यवहार और परंपराएं

- यदि आपके `source` मास्क में लोकेल प्लेसहोल्डर शामिल है, तो केवल चयनित `locale` की फ़ाइलें प्राप्त की जाती हैं।
- यदि आपके मास्क में कोई `{key}` सेगमेंट नहीं है, तो डिक्शनरी कुंजी "index" है।
- कुंजियाँ आपके `source` बिल्डर में `{key}` प्लेसहोल्डर को प्रतिस्थापित करके फ़ाइल पथों से ली गई हैं।
- प्लगइन केवल खोजी गई फ़ाइलों का उपयोग करता है और गायब लोकेल या कुंजियों का निर्माण नहीं करता है।
- `fill` पथ आपके `source` से अनुमानित है और जब आप ऑप्ट-इन करते हैं तो CLI के माध्यम से गायब मानों को अपडेट करने के लिए उपयोग किया जाता है।

## संघर्ष समाधान

जब एक ही अनुवाद कुंजी कई PO स्रोतों में मौजूद होती है:

1. उच्चतम प्राथमिकता वाला प्लगइन अंतिम मान निर्धारित करता है
2. गायब कुंजियों के लिए निम्न प्राथमिकता स्रोतों का उपयोग फॉलबैक के रूप में किया जाता है
3. यह आपको नई संरचनाओं में धीरे-धीरे माइग्रेट करते हुए लीगेसी अनुवादों को बनाए रखने की अनुमति देता है

## CLI

सिंक्रनाइज़ की गई PO फ़ाइलों को अन्य `.content` फ़ाइलों की तरह माना जाएगा। इसका मतलब है, सिंक्रनाइज़ की गई PO फ़ाइलों के लिए सभी intlayer कमांड उपलब्ध होंगे। इसमें शामिल हैं:

- गायब अनुवाद हैं या नहीं, यह परीक्षण करने के लिए `intlayer content test`
- सिंक्रनाइज़ की गई PO फ़ाइलों को सूचीबद्ध करने के लिए `intlayer content list`
- गायब अनुवादों को भरने के लिए `intlayer content fill`
- सिंक्रनाइज़ की गई PO फ़ाइलों को पुश करने के लिए `intlayer content push`
- सिंक्रनाइज़ की गई PO फ़ाइलों को पुल करने के लिए `intlayer content pull`

अधिक जानकारी के लिए [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) देखें।

## सीमाएँ (वर्तमान)

- तृतीय-पक्ष पुस्तकालयों को लक्षित करते समय कोई प्रविष्टि या बहुवचन/ICU समर्थन नहीं।
- विज़ुअल एडिटर अभी तक गैर-Intlayer रनटाइम के लिए उपलब्ध नहीं है।
- केवल PO सिंक्रनाइज़ेशन; गैर-PO कैटलॉग प्रारूप समर्थित नहीं हैं।

## यह क्यों मायने रखता है

- हम स्थापित i18n समाधानों की सिफारिश कर सकते हैं और Intlayer को ऐड-ऑन के रूप में स्थान दे सकते हैं।
- हम उनके SEO/कीवर्ड्स का लाभ उठाते हैं ट्यूटोरियल्स के साथ जो PO को प्रबंधित करने के लिए Intlayer का सुझाव देते हुए समाप्त होते हैं।
- लक्षित दर्शकों को "नए प्रोजेक्ट" से "i18n का उपयोग करने वाली किसी भी टीम" तक विस्तारित करता है।
