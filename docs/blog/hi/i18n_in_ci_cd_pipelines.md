---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "खराब कॉपी भेजे बिना CI/CD में अनुवादों को स्वचालित करना"
description: i18n को स्वचालित करने के तीन स्थान, pre-push, pull request और runtime। कवरेज पर बिल्ड को कैसे रोकें, सुरक्षित रूप से ऑटो-फिल कैसे करें, और हमेशा के लिए कमिट करने वाले CI लूप से कैसे बचें।
keywords:
  - अनुवाद स्वचालित करें ci
  - i18n ci cd
  - github actions अनुवाद
  - husky pre-push
  - निरंतर स्थानीयकरण
  - अनुवाद पाइपलाइन
slugs:
  - blog
  - i18n-in-ci-cd-pipelines
author: aymericzip
---

# खराब कॉपी भेजे बिना CI/CD में अनुवादों को स्वचालित करना

मैन्युअल अनुवाद रिलीज़ की तेज़ गति के सामने टिक नहीं पाता। कोई शुक्रवार को एक स्ट्रिंग जोड़ता है, निर्यात अगले स्प्रिंट में होता है, और तब तक तीन और भाषाएँ पीछे छूट जाती हैं। इसे स्वचालित करना सीधा है। बिना समीक्षा किए मशीन आउटपुट को चुपचाप उपयोगकर्ताओं तक पहुंचाए बिना इसे स्वचालित करना ही विचारणीय विषय है।

## विषय सूची

<TOC/>

## स्वचालित करने के लिए आपको माइग्रेट करने की आवश्यकता नहीं है

नीचे दिए गए पाइपलाइन आकार लाइब्रेरी-अज्ञेयवादी हैं, और टूलिंग भी वैसी ही है। यदि आपके संदेश i18next, next-intl, react-intl, vue-i18n या next-translate के लिए JSON कैटलॉग हैं, तो [Sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) उन फ़ाइलों को सीधे पढ़ता और लिखता है:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // या next-intl / react-intl के लिए "icu"
    }),
  ],
};

export default config;
```

आपका ऐप वही आयात करता रहता है जो वह आयात करता है। फिर नीचे दिए गए CI जॉब्स आपके मौजूदा कैटलॉग को भरते हैं और जांचते हैं, और एक समीक्षक जो डिफ देखता है वह `locales/fr/checkout.json` में बदलाव है, न कि कोई माइग्रेशन। gettext वर्कफ़्लो के लिए एक [Sync PO प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) है, और यदि आप रनटाइम API को अपरिवर्तित रखना चाहते हैं तो [कम्पैट एडॉप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) भी उपलब्ध हैं।

## गेट (Gate) को भराव (Fill) से अलग करें

दो अलग-अलग कार्यों को लगातार मिला दिया जाता है।

एक **गेट (Gate)** एक ऐसी जांच है जो विफल हो जाती है। यह कहता है कि इस बिल्ड को शिप नहीं किया जाना चाहिए क्योंकि आवश्यक लोकेल गायब हैं। यह कुछ भी नहीं लिखता है।

एक **फिल (Fill)** एक म्यूटेशन है। यह गायब अनुवाद उत्पन्न करता है और उन्हें कमिट करता है। यह कभी भी बिल्ड को विफल नहीं करता है।

केवल फिल चलाने का मतलब है कि कुछ भी कभी ब्लॉक नहीं होता है, और मशीन आउटपुट बिना समीक्षा के उत्पादन में चला जाता है। केवल गेट चलाने का मतलब है कि बिल्ड लाल हो जाता है और हर बार किसी इंसान को इसे अनब्लॉक करना पड़ता है। अधिकांश टीमें दोनों चाहती हैं, जो अलग-अलग ट्रिगर्स से जुड़ी हों: पुल अनुरोध पर फिल, रिलीज़ शाखा में मर्ज पर गेट।

## स्वचालन कहाँ रह सकता है

| चरण          | ट्रिगर   | किसके लिए अच्छा है                            | लागत                                        |
| :----------- | :------- | :-------------------------------------------- | :------------------------------------------ |
| Pre-push हुक | लोकल गिट | त्वरित प्रतिक्रिया, कोई CI मिनट नहीं          | डेवलपर की मशीन और उनकी API कुंजी पर चलता है |
| Pull request | CI जॉब   | मर्ज से पहले समीक्षा, रहस्यों के लिए एक स्थान | CI मिनट और प्रति PR मॉडल कॉल                |
| रिलीज़ शाखा  | CI जॉब   | कवरेज पर कड़ा गेट                             | सस्ता, कोई मॉडल कॉल नहीं                    |
| रनटाइम       | CMS      | बिना पुनर्निर्माण के सामग्री परिवर्तन         | होस्ट की गई निर्भरता                        |

## Pre-push: सबसे तेज़ लूप

Husky कोड के मशीन छोड़ने से पहले फिल चलाता है, इसलिए अनुवाद उसी पुश में आते हैं जिसमें उन स्ट्रिंग्स की आवश्यकता थी।

```bash fileName=".husky/pre-push"
npx intlayer build
npx intlayer fill --unpushed --mode complete
```

`--unpushed` कार्य को उस सामग्री तक सीमित करता है जिसे अभी तक पुश नहीं किया गया है, जो इसे हर पुश पर एक मिनट लेने से रोकता है। `--mode complete` जो गायब है उसे बिना उन प्रविष्टियों को दोबारा लिखे भरता है जिनके पास पहले से ही एक मान है, इसलिए एक समीक्षित अनुवाद कभी भी चुपचाप प्रतिस्थापित नहीं होता है।

एक मोनोरेपो के लिए, प्रत्येक ऐप का दायरा तय करें:

```bash fileName=".husky/pre-push"
npx intlayer build --base-dir ./app1
npx intlayer fill --base-dir ./app1 --unpushed --mode complete
npx intlayer build --base-dir ./app2
npx intlayer fill --base-dir ./app2 --unpushed --mode complete
```

नुकसान वास्तविक है: प्रत्येक डेवलपर को एक API कुंजी की आवश्यकता होती है, और लागत उस व्यक्ति पर आती है जो पुश करता है। यही कारण है कि अधिकांश टीमें कुछ से अधिक होने पर इसे CI में ले जाती हैं।

## Pull request: जहाँ समीक्षा है वहाँ भरें

GitHub Actions में वही काम, डिफ तक सीमित:

```yaml fileName=".github/workflows/intlayer-translate.yml"
name: Intlayer Auto-Fill
on:
  pull_request:
    branches: ["main"]

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: "autofill-${{ github.ref }}"
  cancel-in-progress: true

jobs:
  autofill:
    runs-on: ubuntu-latest
    env:
      AI_PROVIDER: openai
      AI_MODEL: gpt-5-mini
      AI_API_KEY: ${{ secrets.AI_API_KEY }}
    steps:
      - uses: actions/checkout@v4
        with:
          persist-credentials: true
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx intlayer build
      - run: npx intlayer fill --git-diff --mode complete --provider $AI_PROVIDER --model $AI_MODEL --api-key $AI_API_KEY
      - name: Commit
        run: |
          if [ -n "$(git status --porcelain)" ]; then
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "chore: auto-fill missing translations [skip ci]"
            git push origin HEAD:${{ github.head_ref }}
          fi
```

वहाँ चार विवरण लोड-असर वाले हैं:

- **`fetch-depth: 0`** `--git-diff` के काम करने के लिए आवश्यक है। एक उथले क्लोन के पास डिफ करने के लिए कोई आधार नहीं होता है, और फिल चुपचाप कुछ भी कवर नहीं करता है।
- **कमिट संदेश में `[skip ci]`** वर्कफ़्लो को खुद को फिर से चालू करने से रोकता है। इसके बिना जॉब कमिट करता है, जो एक रन खोलता है, जो फिर से कमिट करता है। रातों-रात CI बजट जलाने का यह क्लासिक तरीका है।
- **`cancel-in-progress` के साथ `concurrency`** दो पुश को एक ही फ़ाइल लिखने से रोकता है।
- **`--git-diff`** फिल को PR में बदले गए हिस्से तक सीमित करता है। इसे छोड़ दें और आप हर रन पर पूरे कैटलॉग का फिर से अनुवाद करते हैं।

अनुवाद PR शाखा पर एक कमिट के रूप में आते हैं, जिसका अर्थ है कि एक समीक्षक उन्हें डिफ में देखता है। मर्ज के बाद के बजाय इसे यहाँ करने का पूरा बिंदु यही है।

## रिलीज़ शाखा: गेट

गेट को किसी मॉडल एक्सेस की आवश्यकता नहीं होती है और इसे तेज़ होना चाहिए।

```yaml fileName=".github/workflows/ci.yml"
- run: npm run test:i18n
```

CLI रिपोर्ट के बजाय कवरेज का दावा करने वाले परीक्षण द्वारा समर्थित:

```ts fileName="i18n.test.ts"
import { listMissingTranslations } from "intlayer/cli";

test("has no missing required locales", async () => {
  const result = await listMissingTranslations();
  if (result.missingRequiredLocales.length > 0) {
    console.log(result.missingTranslations);
  }
  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

`npx intlayer content test` एक रिपोर्ट प्रिंट करता है लेकिन शून्य से बाहर निकलता है, इसलिए यह सूचित करता है और रोकता नहीं है। इसे स्थानीय रूप से उपयोग करें; CI में असर्शन का उपयोग करें। [अनुपस्थित अनुवादों का पता लगाना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md) में अंतर पर अधिक जानकारी है।

## `requiredLocales` वह है जो गेट को जीवित रखने योग्य बनाता है

सभी अठारह लोकेल की मांग करने वाला एक गेट सबसे धीमी भाषा के आने तक हर रिलीज़ को रोकता है, और एक महीने के भीतर अक्षम हो जाता है।

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

आपके द्वारा सेवा प्रदान किए जाने वाले लोकेल घोषित करें, उन लोकेल की आवश्यकता रखें जो रिलीज़ को रोकते हैं। बाकी एसिंक्रोनस रूप से भरे जाते हैं और कभी भी परिनियोजन में देरी नहीं करते हैं।

## अनुवादों को पूरी तरह से रेपो से बाहर निकालना

दूसरा मॉडल कोड में एक लोकेल घोषित करना और बाकी को लाइव सिंक के साथ CMS के माध्यम से दूरस्थ रूप से प्रबंधित करना है। तब सामग्री परिवर्तनों के लिए बिल्कुल भी पुनर्निर्माण की आवश्यकता नहीं होती है, जो कॉपी गति को डिप्लॉय गति से अलग करता है।

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.SPANISH, Locales.FRENCH],
    requiredLocales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  editor: {
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    liveSync: true,
  },
};

export default config;
```

यह उन टीमों के लिए उपयुक्त है जहाँ गैर-डेवलपर्स कॉपी के मालिक हैं। यह एक व्यापार है, अपग्रेड नहीं: आप संपादक स्वायत्तता प्राप्त करते हैं और संपत्ति खो देते हैं कि एक गिट चेकआउट पूरी तरह से वर्णन करता है कि ऐप क्या रेंडर करता है। [CMS दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) में विवरण।

ध्यान दें कि `clientSecret` एक सर्वर-साइड क्रेडेंशियल है। यह CI रहस्यों और आपके सर्वर वातावरण में रहता है, कभी भी किसी ऐसी चीज़ में नहीं जो क्लाइंट बंडल तक पहुँचती है।

## ईमानदार सीमा

ऊपर सब कुछ _कवरेज_ को स्वचालित करता है, _गुणवत्ता_ को नहीं। एक मशीन भराव एक दृश्यमान अंतर को एक अदृश्य अंतर में बदल देता है: ऑडिट हरा हो जाता है क्योंकि कुंजी का अब एक मान है, और किसी ने इसे पढ़ा नहीं है।

यह एक आंतरिक उपकरण, एक चेंजलॉग या एक बीटा लोकेल के लिए स्वीकार्य है। यह मूल्य निर्धारण, कानूनी प्रतिलिपि, भुगतान विफल होने वाले त्रुटि संदेशों, या किसी भी चीज़ के लिए स्वीकार्य नहीं है जिसे ग्राहक तय करने से पहले पढ़ता है। उन्हें एक मानव के माध्यम से रूट करें, और हर जगह `--mode complete` का उपयोग करें ताकि एक समीक्षित स्ट्रिंग कभी भी बाद के रन द्वारा अधिलेखित न हो।

मॉडल को संदर्भ दें ताकि इसका आउटपुट कम से कम सुसंगत हो:

```ts
ai: {
  applicationContext: "B2B इनवॉइसिंग ऐप। औपचारिक रजिस्टर। उत्पाद के नाम का कभी अनुवाद न करें।",
}
```

## सामान्य गलतियाँ

- **ऑटो-कमिट पर कोई `[skip ci]` नहीं।** काम एक लूप में खुद को फिर से शुरू करता है।
- **`--git-diff` के साथ उथला क्लोन।** डिफ करने के लिए कोई आधार नहीं है, इसलिए कुछ भी भरा नहीं गया है और कुछ भी शिकायत नहीं करता है।
- **हर रन पर पूरे कैटलॉग को भरना।** `--git-diff` या `--unpushed` के साथ स्कोप करें या बिल देखें।
- **गेट के रूप में CLI रिपोर्ट का उपयोग करना।** यह शून्य से बाहर निकलता है।
- **प्रत्येक लोकेल की आवश्यकता।** पहली बार जब यह रिलीज़ को रोकता है तो गेट हटा दिया जाता है।
- **बिना गेट वाला फिल जॉब।** कुछ भी कभी विफल नहीं होता है, इसलिए मशीन कॉपी बिना समीक्षा के उत्पादन तक पहुँचती है।
- **रेपो में मॉडल API कुंजियाँ।** वे CI रहस्यों से संबंधित हैं, जैसे `clientSecret`।

## आगे पढ़ें

- [CI/CD: Husky, GitHub Actions और CMS के साथ अनुवादों को स्वतः उत्पन्न करना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/CI_CD.md)
- [अपनी सामग्री का परीक्षण करना और कवरेज पर एक बिल्ड को रोकना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md)
- [autoFill: प्रति-लोकेल घोषणा फ़ाइलें उत्पन्न करना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md)
- [कॉन्फ़िगरेशन संदर्भ: `locales`, `requiredLocales`, `editor`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [फ्रेमवर्क में बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md)
- [ड्रॉप-इन i18next कम्पैट एडॉप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/i18next.md)
- [अनुपस्थित अनुवादों को कैसे खोजें](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/detecting_missing_translations.md)
- [नाजुक परीक्षणों के बिना अनुवादों का परीक्षण कैसे करें](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_testing_strategies.md)
