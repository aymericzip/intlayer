---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "i18next बनाम @intlayer/i18next: समान API, पूरी तरह भिन्न बंडल"
description: "क्या बदलता है जब एक React या Next.js ऐप अपने i18next, react-i18next और next-i18next कॉल्स को बरकरार रखता है लेकिन उन्हें @intlayer/i18next एडेप्टर के माध्यम से प्रस्तुत करता है। समान कोड पर मापा गया प्रति-पेज JavaScript आकार, घटक आकार, सामग्री लीकेज और हाइड्रेशन।"
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - अनुकूलता एडेप्टर
  - माइग्रेशन
  - अंतर्राष्ट्रीयकरण
  - i18n
  - बेंचमार्क
  - बंडल आकार
  - ब्लॉग
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next बनाम @intlayer/i18next | समान API, पूरी तरह भिन्न बंडल

`@intlayer/i18next`, `@intlayer/react-i18next` और `@intlayer/next-i18next` अनुकूलता (compat) एडेप्टर हैं। वे उसी `i18next` API को प्रदर्शित करते हैं जिसका उपयोग आपका कोड पहले से कर रहा है (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) और इसे Intlayer द्वारा संकलित शब्दकोशों से प्रस्तुत करते हैं। घटक नहीं बदलते; केवल उनके नीचे का रनटाइम बदलता है।

यह लेख एक ही Next.js एप्लिकेशन पर उस प्रतिस्थापन को मापता है, जिसे एक बार `next-i18next` के साथ और एक बार `@intlayer/next-i18next` के साथ बनाया गया है। आंकड़े [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) से लिए गए हैं। लाइब्रेरी के रूप में `i18next` और Intlayer की तुलना के लिए, [i18next बनाम Intlayer](https://intlayer.org/hi/blog/i18next-vs-intlayer) पढ़ें। यह लेख इस बात पर केंद्रित है कि जब आप अपने कोड को वैसे ही रखते हैं जैसा वह है, तो एडेप्टर क्या बदलता है।

<TOC/>

> **संक्षेप में (tl;dr)**: उसी Next.js ऐप पर, `next-i18next` को `@intlayer/next-i18next` से बदलने पर प्रति-पेज JavaScript का आकार gzip में **218.5 KB से घटकर 150.7 KB** हो गया (प्राथमिक सेटअप में) और इसने पूरी तरह से अनुकूलित `next-i18next` सेटअप (163.4 KB) को **12.7 KB** से पीछे छोड़ दिया। औसत घटक **78.5 KB से घटकर 9.7 KB** हो गया, बाहरी-पेज स्ट्रिंग लीकेज **~90% से घटकर 0%** हो गया, हाइड्रेशन का समय **15.6 ms से घटकर 11.3 ms** हो गया, और रनटाइम **19.7 KB से घटकर 9.4 KB** हो गया। किसी भी घटक को संपादित नहीं किया गया; केवल एक प्रोवाइडर फ़ाइल बदली गई। `i18next` प्लगइन्स (बैकएंड, भाषा संसूचक) स्वीकार किए जाते हैं लेकिन वे कुछ नहीं करते, क्योंकि रनटाइम पर लोड करने या पता लगाने के लिए कुछ नहीं बचता है।

## `@intlayer/i18next` क्या है

`i18next` एक रनटाइम है। `i18n.init({ resources })` या कोई बैकएंड प्लगइन `locales/{lng}/{ns}.json` को एक ग्लोबल इंस्टेंस में लोड करता है; `useTranslation("about")` घटक को इससे जोड़ता है; `t("title")` रेंडर समय पर कुंजी की खोज करता है। नेमस्पेस, लेज़ी लोडिंग, प्रति-पेज नेमस्पेस सूचियाँ और टाइप सुरक्षा को कॉन्फ़िगर और प्रबंधित करना आपकी ज़िम्मेदारी होती है।

एडेप्टर API को बनाए रखते हैं और ग्लोबल इंस्टेंस को प्रतिस्थापित करते हैं:

1. **आयात उपनामकरण (Import aliasing)।** `@intlayer/next-i18next/plugin` का `createNextI18nPlugin()` (या `withI18next`) `withIntlayer` को लपेटता है और Webpack / Turbopack उपनाम जोड़ता है ताकि `next-i18next`, `react-i18next` और `i18next` अपने समकक्ष `@intlayer/*` पैकेजों पर हल हो सकें। Vite पर, `@intlayer/react-i18next/plugin` से `reactI18nextVitePlugin()` यही कार्य करता है। किसी भी आयात का नाम बदलने की आवश्यकता नहीं होती।
2. **JSON एकमात्र सत्य स्रोत के रूप में।** `syncJSON` प्लगइन आपकी मौजूदा `locales/{lng}/{ns}.json` फ़ाइलों को `format: "i18next"` के साथ पढ़ता है (ताकि `{{name}}`, `$t()` नेस्टिंग, `_one` / `_other` और संदर्भ प्रत्यय ठीक से पार्स हों) और जब CLI या CMS उन्हें अपडेट करता है तो अनुवाद वापस लिखता है।
3. **कॉल-साइट बाइंडिंग।** Intlayer अनुकूलन पास `useTranslation("about")` को एक ऐसे कॉल में फिर से लिखता है जो सीधे सक्रिय लोकेल में `about` शब्दकोश प्राप्त करता है। घटक ग्लोबल स्टोर तक पहुंचना बंद कर देता है।

```tsx fileName="components/About.tsx"
// आपका कोड, अपरिवर्तित
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="कंपाइलर क्या उत्सर्जित करता है (सरलीकृत)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

यह पुनर्लेखन ही नीचे दिए गए घटक-आकार और पेज-लीकेज स्तंभों को बेहतर बनाता है।

## एडेप्टर क्या रखते हैं, क्या अनदेखा करते हैं और क्या प्रतिस्थापित नहीं कर सकते

| `i18next` API                                                                   | `@intlayer/*` के साथ                                                                                                           |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ बरकरार। बिल्ड समय पर `ns` शब्दकोश से बाध्य; आपकी सामग्री के अनुसार टाइप किया गया                                            |
| `t("key", { name })`, `{{interpolation}}`, `$t(key)` नेस्टिंग                   | ✅ बरकरार                                                                                                                      |
| `key_one` / `key_other` बहुवचन, `key_male` संदर्भ, `returnObjects`              | ✅ बरकरार। बहुवचनों का मूल्यांकन `Intl.PluralRules` से किया जाता है                                                            |
| `components`, क्रमांकित टैग `<1>...</1>`, `values` के साथ `<Trans>`             | ✅ बरकरार                                                                                                                      |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ बरकरार                                                                                                                      |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ बरकरार। `changeLanguage` Intlayer के लोकेल को चलाता है                                                                      |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ बरकरार                                                                                                                      |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` प्लगइन के `init` को कॉल करता है और समाप्त होता है; बैकएंड और डिटेक्टरों के पास लोड करने या खोजने के लिए कुछ नहीं है |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` को देव चेतावनी के साथ **अनदेखा** किया जाता है; बंडल लाभ प्राप्त करने के लिए JSON आयात हटाएं                     |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ एक `IntlayerProvider` प्रस्तुत करता है; `i18n` प्रॉप को अनदेखा किया जाता है। App Router पर, लोकेल पास करें (नीचे देखें)     |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ अपेक्षित आकार लौटाता है और कुछ भी लोड नहीं करता है। रखना सुरक्षित, हटाना सुरक्षित                                           |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ बरकरार                                                                                                                      |
| `next-i18next.config.js`                                                        | ⚠️ पढ़ा नहीं जाता। लोकेल `intlayer.config.ts` से आते हैं                                                                       |
| बिना नेमस्पेस के `useTranslation()`                                             | ✅ पूरी फ़ाइल के `translation` शब्दकोश के विरुद्ध काम करता है (`splitKeys: false`)                                             |

## बेंचमार्क

### क्या मापा गया था

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) सुइट प्रत्येक सेटअप के साथ **समान एप्लिकेशन** बनाता है: **10 पेज** (होम, अबाउट, ब्लॉग, करियर, संपर्क, एफएक्यू, मूल्य निर्धारण, उत्पाद, सेटिंग्स, टीम), **10 लोकेल** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), समान घटक और समान सामग्री। पेजों को `en` और `fr` में मापा जाता है।

`next-i18next` को चार लोडिंग रणनीतियों में बनाया गया था, प्रत्येक लोकेल के JSON को `resources` में आयात करने (`static`) से लेकर प्रति रूट एक नेमस्पेस तक, जिसे बैकएंड के माध्यम से लोड किया गया था (`scoped-dynamic`)। एडेप्टर को **प्राथमिक सेटअप के समान घटकों** पर बनाया गया था, जिसमें केवल `next.config.ts`, `intlayer.config.ts` और प्रोवाइडर फ़ाइल बदली गई थी। इसमें कोई मैन्युअल "scoped" संस्करण नहीं है: कंपाइलर प्रति घटक सामग्री को स्वचालित रूप से सीमित करता है।

प्रत्येक बिल्ड के लिए, परीक्षण रिकॉर्ड करता है:

- **लाइब्रेरी आकार**: एक खाली घटक का gzip आकार जो केवल i18n लाइब्रेरी आयात करता है।
- **पेज JS**: सभी पेजों और लोकेलों में औसत रूप से प्रति पेज डाउनलोड किया गया gzip जावास्क्रिप्ट।
- **लोकेल लीकेज %**: डाउनलोड किए गए JS में अनुवादित स्ट्रिंग्स का हिस्सा जो उस लोकेल से संबंधित है जिसे उपयोगकर्ता **नहीं** देख रहा है।
- **पेज लीकेज %**: डाउनलोड किए गए JS में अनुवादित स्ट्रिंग्स का हिस्सा जो उस पेज से संबंधित है जिस पर उपयोगकर्ता **नहीं** है।
- **घटक औसत**: अलगाव में संकलित प्रत्येक घटक का औसत gzip आकार।
- **E2E प्रतिक्रियाशीलता**: एक नया लोकेल चुनने और DOM में `html[lang]` अपडेट होने के बीच का वास्तविक समय (Playwright, 5 पुनरावृत्तियां)।
- **हाइड्रेशन**: React हाइड्रेशन चरण की अवधि।

> नीचे दिए गए आंकड़े **12-09-2026** के परीक्षण से आते हैं, जिसमें `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) और `@intlayer/next-i18next` 9.5.1 शामिल हैं। परीक्षण एप्लिकेशन जानबूझकर छोटा रखा गया है, इसलिए लीकेज प्रतिशत एक **पैटर्न** का वर्णन करते हैं: वे आपकी सामग्री के साथ बढ़ते हैं जबकि रनटाइम लागत स्थिर रहती है।

### Next.js पर परिणाम

| सेटअप                        | रणनीति         | लाइब्रेरी आकार (gz) | पेज JS औसत (gz) | लोकेल लीकेज | पेज लीकेज | घटक औसत (gz) | E2E प्रतिक्रियाशीलता |   हाइड्रेशन |
| ---------------------------- | -------------- | ------------------: | --------------: | ----------: | --------: | -----------: | -------------------: | ----------: |
| **base** (बिना i18n)         | -              |              0.0 KB |        141.0 KB |        0.0% |      0.0% |       0.9 KB |              13.4 ms |     11.8 ms |
| `next-i18next`               | static         |             19.7 KB |        218.5 KB |        0.0% |     89.8% |      78.5 KB |              16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |             19.7 KB |        169.5 KB |       50.0% |     89.8% |      26.1 KB |              15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |             19.7 KB |        220.1 KB |        0.0% |     89.8% |      78.9 KB |              16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |             19.7 KB |        163.4 KB |        0.0% |      0.0% |      27.1 KB |              15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |          **9.4 KB** |    **150.7 KB** |    **0.0%** |  **0.0%** |   **9.7 KB** |          **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |          **9.4 KB** |    **150.7 KB** |    **0.0%** |  **0.0%** |   **9.7 KB** |          **11.9 ms** | **10.6 ms** |
| `next-intlayer` (मूल)        | static         |              5.5 KB |        141.3 KB |        0.0% |      0.0% |       8.5 KB |              15.5 ms |     16.9 ms |
| `next-intlayer` (मूल)        | dynamic        |              5.5 KB |        141.3 KB |        0.0% |      0.0% |       6.9 KB |              15.3 ms |     15.9 ms |

**इसे कैसे समझें**

- **प्राथमिक सेटअप से प्रति पेज 68 KB कम।** `resources: { en, fr, ... }` हर पेज पर हर लोकेल और हर नेमस्पेस भेजता है: **218.5 KB**। समान घटकों का एडेप्टर बिल्ड **150.7 KB** पर आता है। यह `next-i18next` के सर्वश्रेष्ठ कॉन्फ़िगरेशन (163.4 KB) को भी 12.7 KB से हराता है, क्योंकि अकेले `i18next` रनटाइम का वजन 19.7 KB है जबकि एडेप्टर का केवल 9.4 KB है।
- **बिना किसी घटक को छुए लीकेज 0% हो जाता है।** पूरी तरह से विभाजित सेटअप को छोड़कर प्रत्येक `next-i18next` सेटअप बाहरी पेजों की लगभग 90% स्ट्रिंग्स भेजता है। `dynamic` पंक्ति वास्तव में दिखती स्थिति से बदतर है: यह पेज लीकेज को कहीं भी कम नहीं करती और **50% लोकेल लीकेज** जोड़ती है, क्योंकि प्रति-लोकेल बैकएंड अभी भी संपूर्ण `translation` नेमस्पेस को खींचता है। एडेप्टर मूल कोड से 0% / 0% तक पहुंचता है।
- **घटक: 8 गुना छोटे।** अलगाव में संकलित एक `useTranslation()` घटक इनलाइन `resources` के साथ औसत **78.5 KB** और बैकएंड के साथ **26-27 KB** होता है, क्योंकि `t` ग्लोबल स्टोर से बंधा होता है। एडेप्टर के साथ यह औसतन **9.7 KB** हो जाता है।
- **तेज़ हाइड्रेशन और भाषा बदलना।** हाइड्रेशन 15.6 ms से घटकर **11.3 ms** हो जाता है (और `dynamic` सेटअप में 27.7 ms से, जहाँ बैकएंड फ़ेच महत्वपूर्ण पथ पर स्थित होता है)। लोकेल बदलना 15-16 ms से घटकर **11-12 ms** हो जाता है।
- **एडेप्टर मूल रनटाइम नहीं है।** `next-intlayer` बेस ऐप से केवल +0.3 KB अधिक यानी **141.3 KB** पर पहुंचता है। एडेप्टर Intlayer के कोर के ऊपर `i18next` API सतह (इंटरपोलेशन, बहुवचन और संदर्भ प्रत्यय समाधान, `<Trans>` टैग पार्सिंग) रखता है: 9.4 KB और मूल की तुलना में प्रति पेज +9.4 KB। यह एक पुल है, अंतिम गंतव्य नहीं।

> Vite / TanStack Start पर `react-i18next` एडेप्टर इस परीक्षण का हिस्सा नहीं था। TanStack Start पर `react-i18next` बेसलाइन [i18next बनाम Intlayer](https://intlayer.org/hi/blog/i18next-vs-intlayer) में देखी जा सकती है।

## संख्याएँ क्यों बदलती हैं

`components/` में कुछ भी नहीं बदला, इसलिए लाभ इस बात से आता है कि `useTranslation` किससे बंधा है।

**`i18next` के साथ**, बाइंडिंग ग्लोबल इंस्टेंस होती है। इसमें जो कुछ भी लोड किया गया था (`static` में सभी लोकेल, `dynamic` में सक्रिय लोकेल का पूरा नेमस्पेस) वह `useTranslation()` को कॉल करने वाले प्रत्येक घटक से सुलभ होता है। बंडलर इंस्टेंस में रखी गई सीमा से नीचे कोड को विभाजित नहीं कर सकता है, और रनटाइम यह नहीं जान सकता कि कोई घटक किन कुंजियों की मांग करेगा।

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # प्रत्येक पेज की स्ट्रिंग्स
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

**`@intlayer/next-i18next` के साथ**, बाइंडिंग सीधे शब्दकोश होती है। `syncJSON` प्रत्येक नेमस्पेस फ़ाइल को एक शब्दकोश में बदल देता है; अनुकूलन पास घटक को वह शब्दकोश सौंपता है जिसे वह निर्दिष्ट करता है, एक ऐसे आयात के रूप में जिसे बंडलर ट्रैक कर सकता है और प्रति पेज और प्रति लोकेल विभाजित कर सकता है।

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # अपरिवर्तित, अभी भी सत्य का स्रोत
│   └── fr/translation.json
├── .intlayer/                        # जनरेट किया गया: प्रति नेमस्पेस, प्रति लोकेल एक शब्दकोश
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← अपरिवर्तित
```

`i18n/i18n.ts` और इसका `resources` आयात बेकार कोड बन जाते हैं। यही 68 KB की बचत है।

## तीन चरणों में माइग्रेशन

<Steps>
<Step number={1} title="इंस्टॉल करें">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

कमांड `i18next` / `react-i18next` / `next-i18next` का पता लगाता है, `intlayer`, फ्रेमवर्क पैकेज (`next-intlayer` या `react-intlayer`), मेल खाने वाला `@intlayer/*` एडेप्टर और `@intlayer/sync-json-plugin` स्थापित करता है, और `intlayer.config.ts` को प्री-फ़िल करता है। मूल पैकेजों को स्थापित रखें: वे पीयर निर्भरता के रूप में कार्य करते हैं और प्रकार प्रदान करते हैं।

</Step>
<Step number={2} title="Intlayer को अपनी लोकेल फ़ाइलों पर निर्देशित करें">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // i18next बोली: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // प्रति नेमस्पेस एक फ़ाइल: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

यदि आपके पास प्रति लोकेल केवल एक `translation.json` है (i18next का डिफ़ॉल्ट नेमस्पेस), तो `splitKeys: false` सेट करें ताकि पूरी फ़ाइल एक शब्दकोश बनी रहे और सामान्य `useTranslation()` काम करता रहे।

</Step>
<Step number={3} title="प्लगइन जोड़ें">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

App Router पर, क्लाइंट घटक `[locale]` सेगमेंट से अपना लोकेल प्राप्त करते हैं। एडेप्टर का `I18nextProvider` कोई लोकेल नहीं लेता है, इसलिए इसे अपनी प्रोवाइडर फ़ाइल में एक बार बदलें:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

इसके नीचे का प्रत्येक घटक अभी भी सामान्य रूप से `useTranslation()` को कॉल करता है।

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` `vite-intlayer` को लपेटता है और `react-i18next` तथा `i18next` को उपनाम देता है। गैर-React प्रोजेक्ट के लिए, `@intlayer/i18next/plugin` से `i18nextVitePlugin()` अकेले `i18next` को उपनाम देता है।

</Tab>
</Tabs>

</Step>
</Steps>

### इसके बाद आप क्या हटा सकते हैं

| फ़ाइल / पैटर्न                                         | क्यों                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| `resources: { en, fr, ... }` और JSON आयात              | एडेप्टर द्वारा अनदेखा किया गया। यहीं पर 68 KB की बचत थी                |
| `i18next-http-backend`, `i18next-resources-to-backend` | रनटाइम पर लाने के लिए कुछ नहीं बचा                                     |
| `i18next-browser-languagedetector`                     | लोकेल का पता लगाना Intlayer के रूटिंग कॉन्फ़िगरेशन द्वारा किया जाता है |
| `getStaticProps` में `serverSideTranslations()`        | एक खाली संरचना लौटाता है; रखना हानिरहित, हटाना सुरक्षित                |
| `next-i18next.config.js`                               | पढ़ा नहीं जाता। लोकेल `intlayer.config.ts` में रहते हैं                |
| प्रति-पेज `ns: [...]` सूचियाँ                          | कंपाइलर प्रति घटक नेमस्पेस चुनता है                                    |

### बाइट्स से परे आपको क्या लाभ मिलते हैं

- **टाइप की गई कुंजियाँ।** `useTranslation("about")` को संकलित `about` शब्दकोश के विरुद्ध टाइप किया गया है; `t("does.not.exist")` एक स्ट्रिंग लौटाने के बजाय एक TypeScript त्रुटि देता है।
- **`npx intlayer test`** किसी भी लोकेल में गायब कुंजी पर CI को रोक देता है। **`npx intlayer fill`** आपकी अपनी प्रदाता कुंजी (OpenAI, Anthropic, Mistral, Gemini...) के साथ गायब कुंजियों का अनुवाद करता है और उन्हें `locales/{lng}/{ns}.json` में वापस लिखता है।
- **विजुअल एडिटर और CMS** उसी JSON पर काम करते हैं, इसलिए अनुवादक UI के माध्यम से संपादन करते हैं और फ़ाइलें Git में अपडेट हो जाती हैं।
- **`.content.ts` में क्रमिक स्थानांतरण।** कोई भी घटक एक समर्पित सामग्री फ़ाइल के साथ `useTranslation("about")` से `useIntlayer("about")` पर स्विच कर सकता है। JSON और `.content.ts` शब्दकोश एक साथ शांतिपूर्वक काम करते हैं।

## शुरू करने से पहले जानने योग्य सीमाएँ

- **बैकएंड और डिटेक्टर निष्क्रिय हैं।** `i18n.use(HttpBackend)` केवल प्लगइन के `init` को कॉल करता है और कुछ नहीं। यदि आपका ऐप अनुरोध के समय CMS से अनुवाद प्राप्त करने पर निर्भर करता था, तो वह प्रवाह चला गया है; इसके बजाय Intlayer के CMS या `intlayer pull` / `push` कमांड का उपयोग करें।
- **`resources` को अनदेखा किया जाता है, मर्ज नहीं किया जाता।** कुछ अन्य एडेप्टर के विपरीत, `@intlayer/i18next` इनलाइन `resources` का उपयोग फ़ॉलबैक के रूप में नहीं करता है। प्रत्येक कुंजी सिंक किए गए शब्दकोशों में मौजूद होनी चाहिए, जिसे `intlayer test` सत्यापित करता है।
- **App Router को प्रोवाइडर संपादन की आवश्यकता है।** केवल एक फ़ाइल, जैसा कि ऊपर दिखाया गया है। `appWithTranslation` वाले Pages Router को किसी चीज़ की आवश्यकता नहीं है।
- **`next-i18next.config.js` पढ़ा नहीं जाता है।** `localePath`, `fallbackLng`, `reloadOnPrerender` का कोई प्रभाव नहीं पड़ता; लोकेल और फ़ॉलबैक `intlayer.config.ts` से आते हैं।
- **एडेप्टर मुफ़्त नहीं है।** `next-intlayer` की तुलना में 9.4 KB रनटाइम और प्रति पेज +9.4 KB अतिरिक्त लगता है। जब प्रत्येक घटक `useIntlayer` पर चला जाए, तो इसे हटा दें।

## कब किसका उपयोग करें?

- **`i18next` पर बने रहें** यदि आपका ऐप रनटाइम बैकएंड (अनुरोध के समय CMS द्वारा दिए जाने वाले अनुवाद), प्लगइन पारिस्थितिकी तंत्र, या गैर-React लक्ष्य पर निर्भर करता है जिसे एडेप्टर कवर नहीं करते हैं।
- **`@intlayer/*` का उपयोग करें** यदि आप `react-i18next` / `next-i18next` पर हैं और बिना किसी पुनर्लेखन के 68 KB की बचत, 8 गुना छोटे घटक, 0% लीकेज, टाइप की गई कुंजियाँ और CI जाँच चाहते हैं। यह मौजूदा `i18next` कोडबेस के लिए सबसे उत्तम प्रवेश बिंदु है।
- **मूल रनटाइम (`next-intlayer` / `react-intlayer`) पर जाएँ** नई परियोजनाओं के लिए, या जब एडेप्टर अपना काम पूरा कर ले। यह तीनों में सबसे हल्का है (5.5 KB, प्रति पेज +0.3 KB) और सिंक्रोनस सर्वर घटकों और प्रति-घटक `.content.ts` फ़ाइलों का समर्थन करता है।

## संबंधित तुलनाएं

- [i18next बनाम Intlayer](https://intlayer.org/hi/blog/i18next-vs-intlayer) (लाइब्रेरी तुलना, समान बेंचमार्क)
- [next-intl बनाम @intlayer/next-intl](https://intlayer.org/hi/blog/next-intl-vs-intlayer-next-intl) (समान एडेप्टर श्रृंखला)
- [Lingui बनाम @intlayer/lingui](https://intlayer.org/hi/blog/lingui-vs-intlayer-lingui) (समान एडेप्टर श्रृंखला)
- [vue-i18n बनाम @intlayer/vue-i18n](https://intlayer.org/hi/blog/vue-i18n-vs-intlayer-vue-i18n) (समान एडेप्टर श्रृंखला)
- माइग्रेशन गाइड: [i18next](https://intlayer.org/hi/doc/migration/i18next), [react-i18next](https://intlayer.org/hi/doc/migration/react-i18next), [next-i18next](https://intlayer.org/hi/doc/migration/next-i18next)
- अनुकूलता एडेप्टर संदर्भ: [i18next](https://intlayer.org/hi/doc/compatibility/i18next), [react-i18next](https://intlayer.org/hi/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/hi/doc/compatibility/next-i18next)

## निष्कर्ष

`i18next` इस बेंचमार्क में सबसे भारी रनटाइम है, और एडेप्टर आपको इसके API को छोड़ने के लिए कहे बिना इसके अधिकांश भार को हटा देते हैं। उसी Next.js ऐप पर जो प्राथमिक सेटअप की तुलना में **प्रति पेज 68 KB कम**, हाथ से अनुकूलित सर्वोत्तम सेटअप से **12.7 KB कम**, **8 गुना छोटे घटक**, **0% लीकेज** और **4 ms तेज़ हाइड्रेशन** प्रदान करता है, वह भी केवल एक कॉन्फ़िग फ़ाइल, एक प्लगइन लाइन और एक प्रोवाइडर संपादन के साथ।

सभी परीक्षण डेटा, ऐप और स्क्रिप्ट [Benchmark Bloom रिपॉजिटरी](https://github.com/intlayer-org/benchmark-bloom) में उपलब्ध हैं।

अधिक जानकारी के लिए [Intlayer क्यों?](https://intlayer.org/hi/doc/why) दस्तावेज़ देखें।
