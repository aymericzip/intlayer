---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Intlayer वीज़ुअल एडिटर | विज़ुअल एडिटर का उपयोग करके अपनी सामग्री संपादित करें
description: Intlayer एडिटर का उपयोग करके अपनी बहुभाषी वेबसाइट को प्रबंधित करने का तरीका जानें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके अपने प्रोजेक्ट को कुछ ही मिनटों में सेट करें।
keywords:
  - संपादक
  - अंतर्राष्ट्रीयकरण
  - प्रलेखन
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# Intlayer विज़ुअल एडिटर दस्तावेज़ीकरण

<iframe title="Visual Editor + CMS for Your Web App: Intlayer Explained" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer विजुअल एडिटर एक उपकरण है जो आपके वेबसाइट को विजुअल एडिटर का उपयोग करके आपकी सामग्री घोषणा फ़ाइलों के साथ इंटरैक्ट करने के लिए रैप करेगा।

![Intlayer विजुअल एडिटर इंटरफ़ेस](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

`intlayer-editor` पैकेज Intlayer पर आधारित है और यह जावास्क्रिप्ट एप्लिकेशन जैसे React (Create React App), Vite + React, और Next.js के लिए उपलब्ध है।

## विजुअल एडिटर बनाम CMS

Intlayer विजुअल एडिटर एक उपकरण है जो आपको स्थानीय शब्दकोशों के लिए विजुअल एडिटर में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री को कोड-बेस में प्रतिस्थापित किया जाएगा। इसका मतलब है कि एप्लिकेशन को फिर से बनाया जाएगा और पृष्ठ को नई सामग्री प्रदर्शित करने के लिए पुनः लोड किया जाएगा।

इसके विपरीत, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) एक उपकरण है जो आपको दूरस्थ शब्दकोशों के लिए विजुअल एडिटर में अपनी सामग्री प्रबंधित करने की अनुमति देता है। एक बार परिवर्तन करने के बाद, सामग्री आपके कोड-बेस को प्रभावित नहीं करेगी। और वेबसाइट स्वचालित रूप से बदली गई सामग्री प्रदर्शित करेगी।

## अपने एप्लिकेशन में Intlayer को एकीकृत करें

Intlayer को एकीकृत करने के तरीके के बारे में अधिक जानकारी के लिए, नीचे दिए गए संबंधित अनुभाग को देखें:

### Next.js के साथ एकीकरण

Next.js के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md) देखें।

### Create React App के साथ एकीकरण

Create React App के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md) देखें।

### Vite + React के साथ एकीकरण

Vite + React के साथ एकीकरण के लिए, [सेटअप गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_vite+react.md) देखें।

## Intlayer एडिटर कैसे काम करता है

विजुअल एडिटर में दो चीजें शामिल होती हैं:

- एक फ्रंटएंड एप्लिकेशन जो आपके वेबसाइट को एक iframe में प्रदर्शित करेगा। यदि आपका वेबसाइट Intlayer का उपयोग करता है, तो विजुअल एडिटर स्वचालित रूप से आपकी सामग्री का पता लगाएगा और आपको इसके साथ इंटरैक्ट करने की अनुमति देगा। एक बार संशोधन करने के बाद, आप अपने परिवर्तनों को डाउनलोड कर सकते हैं।

- एक बार जब आप डाउनलोड बटन पर क्लिक करते हैं, तो विजुअल एडिटर सर्वर को एक अनुरोध भेजेगा ताकि आपकी सामग्री घोषणा फ़ाइलों को नई सामग्री के साथ प्रतिस्थापित किया जा सके (जहां भी ये फ़ाइलें आपके प्रोजेक्ट में घोषित की गई हैं)।

> ध्यान दें कि फिलहाल, Intlayer एडिटर आपकी सामग्री घोषणा फ़ाइलों को JSON फ़ाइलों के रूप में लिखेगा।

## स्थापना

एक बार Intlayer आपके प्रोजेक्ट में कॉन्फ़िगर हो जाने के बाद, `intlayer-editor` को एक विकास निर्भरता के रूप में स्थापित करें:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

`--with` flag के साथ, आप editor को किसी दूसरी command के साथ समानांतर में शुरू कर सकते हैं:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## कॉन्फ़िगरेशन

अपने Intlayer कॉन्फ़िगरेशन फ़ाइल में, आप एडिटर सेटिंग्स को अनुकूलित कर सकते हैं:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... अन्य कॉन्फ़िगरेशन सेटिंग्स
  editor: {
    /**
     * आवश्यक
     * एप्लिकेशन का URL।
     * यह वह URL है जिसे विजुअल एडिटर लक्षित करता है।
     * उदाहरण: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `true`। यदि `false`, तो एडिटर निष्क्रिय है और इसे एक्सेस नहीं किया जा सकता।
     * इसे सुरक्षा कारणों से, जैसे उत्पादन के लिए, विशिष्ट वातावरण के लिए एडिटर को अक्षम करने के लिए उपयोग किया जा सकता है।
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से `8000`।
     * एडिटर सर्वर का पोर्ट।
     */
    port: process.env.INTLAYER_PORT,
    /**
     * वैकल्पिक
     * डिफ़ॉल्ट रूप से "http://localhost:8000"
     * एडिटर सर्वर का URL।
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## एडिटर का उपयोग करना

1. जब एडिटर स्थापित हो जाए, तो निम्नलिखित कमांड का उपयोग करके एडिटर शुरू करें:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **ध्यान दें कि आपको अपने एप्लिकेशन को समानांतर में चलाना चाहिए।** एप्लिकेशन URL को एडिटर कॉन्फ़िगरेशन (`applicationURL`) में सेट किए गए URL से मेल खाना चाहिए।

   > **ध्यान दें कि कमांड `intlayer` पैकेज द्वारा पुनः निर्यात किया जाता है। आप इसके बजाय `npx intlayer editor start` का उपयोग कर सकते हैं।**

2. फिर, प्रदान किए गए URL को खोलें। डिफ़ॉल्ट रूप से `http://localhost:8000`।

   आप अपने कर्सर के साथ अपनी सामग्री पर होवर करके Intlayer द्वारा इंडेक्स किए गए प्रत्येक फ़ील्ड को देख सकते हैं।

   ![सामग्री पर होवर करना](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. यदि आपकी सामग्री को रेखांकित किया गया है, तो आप इसे संपादन ड्रॉअर प्रदर्शित करने के लिए लंबे समय तक दबा सकते हैं।

## पर्यावरण कॉन्फ़िगरेशन

एडिटर को एक विशिष्ट पर्यावरण फ़ाइल का उपयोग करने के लिए कॉन्फ़िगर किया जा सकता है। यह तब उपयोगी होता है जब आप विकास और उत्पादन दोनों के लिए एक ही कॉन्फ़िगरेशन फ़ाइल का उपयोग करना चाहते हैं।

एक विशिष्ट पर्यावरण फ़ाइल का उपयोग करने के लिए, आप एडिटर शुरू करते समय `--env-file` या `-f` फ़्लैग का उपयोग कर सकते हैं:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> ध्यान दें कि पर्यावरण फ़ाइल आपके प्रोजेक्ट की रूट डायरेक्टरी में होनी चाहिए।

या आप पर्यावरण निर्दिष्ट करने के लिए `--env` या `-e` फ़्लैग का उपयोग कर सकते हैं:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## डिबग

यदि आपको विजुअल एडिटर के साथ कोई समस्या हो रही है, तो निम्नलिखित की जांच करें:

- विजुअल एडिटर और एप्लिकेशन चल रहे हैं।

- Intlayer कॉन्फ़िगरेशन फ़ाइल में [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) कॉन्फ़िगरेशन सही ढंग से सेट हैं।
  - आवश्यक फ़ील्ड:
    - एप्लिकेशन URL को एडिटर कॉन्फ़िगरेशन (`applicationURL`) में सेट किए गए URL से मेल खाना चाहिए।

- विज़ुअल एडिटर आपके वेबसाइट को प्रदर्शित करने के लिए एक iframe का उपयोग करता है। सुनिश्चित करें कि आपकी वेबसाइट की कंटेंट सिक्योरिटी पॉलिसी (CSP) CMS URL को `frame-ancestors` के रूप में अनुमति देती है (डिफ़ॉल्ट रूप से 'http://localhost:8000')। किसी भी त्रुटि के लिए एडिटर कंसोल की जांच करें।

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="विज़ुअल एडिटर और CMS में क्या अंतर है?">

विज़ुअल एडिटर स्थानीय शब्दकोशों को संपादित करता है और परिवर्तनों को सीधे आपकी स्रोत कोड फ़ाइलों में सहेजता है, इसलिए यह मानक Git समीक्षा प्रक्रिया से गुजरता है। CMS बिना रीबिल्ड के त्वरित प्रकाशन के लिए दूरस्थ सर्वर पर सामग्री संग्रहीत करता है।

</Question>

<Question title="i18n मेरे बंडल आकार को कितना बढ़ाता है?">

नेमस्पेस-आधारित सेटअपों की तुलना में बहुत कम, क्योंकि एक पृष्ठ कभी भी उस कैटलॉग को डाउनलोड नहीं करता है जिसे वह रेंडर नहीं करता है। सर्वर पर रेंडर किया गया मार्कअप सर्वर पर ही अपनी सामग्री को हल करता है, और बिल्ड-टाइम कंपाइलर `useIntlayer` कॉल को घटक द्वारा उपयोग की जाने वाली सटीक शब्दकोश प्रविष्टियों से बदल देता है, इसलिए अप्रयुक्त कुंजियों और भाषाओं को हटा दिया जाता है। [गतिशील शब्दकोश](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) शेष को प्रति लोकेल विभाजित करते हैं। पारंपरिक विकल्पों की तुलना में, Intlayer बंडल और पृष्ठ आकार को 50% तक कम करता है। [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) देखें।

</Question>

<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना i18next, next-intl या react-i18next से माइग्रेट कर सकता हूँ?">

हाँ, और इसके दो रास्ते हैं। आप [i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md) या [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) के साथ सामग्री को धीरे-धीरे स्थानांतरित कर सकते हैं। या आप अपने वर्तमान API को पूरी तरह से बनाए रख सकते हैं: [संगतता एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` और `Lingui` के समान API प्रदान करते हैं, लेकिन Intlayer शब्दकोशों द्वारा संचालित होते हैं, जिससे केवल आयात बदलते हैं और घटक कोड समान रहता है।

</Question>

<Question title="क्या मैं अपनी मौजूदा JSON translation files को रख सकता हूं?">

हाँ। [sync JSON plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) आपकी `/messages/{locale}/{namespace}.json` फ़ाइलों को सत्य का स्रोत बनाए रखता है और दोनों दिशाओं में उनसे Intlayer dictionaries बनाता है। [sync PO plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) gettext catalogs के लिए भी ऐसा ही करता है, और [per locale files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/per_locale_file.md) आपको locales को एक फ़ाइल में समूहीकृत करने के बजाय भाषा के अनुसार content को विभाजित करने देते हैं।

</Question>

<Question title="क्या मुझे अपनी content को key by key move करना होगा?">

नहीं। `npx intlayer extract` चलाएं और Intlayer आपकी source files को पढ़ता है, user facing strings को निकालता है और प्रत्येक के बगल में एक `.content` file लिखता है, इसलिए आप strings को एक catalog में एक-एक करके कॉपी करने के बजाय एक diff की समीक्षा करते हैं। [extract command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md) देखें।

पूरी तरह से स्वचालित वर्कफ़्लो के लिए, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) JSX, TSX, Vue और Svelte कोड पर निर्माण समय के दौरान भी यही करता है, प्रत्येक परिवर्तन पर शब्दकोश उत्पन्न करता है जिससे कुंजियों को मैन्युअल रूप से बनाए रखने की आवश्यकता समाप्त हो जाती है।

</Question>

<Question title="कौन से editor और AI agent tooling उपलब्ध हैं?">

पाँच उपकरण, सभी वैकल्पिक:

- **[VS Code extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md)**: `useIntlayer` कुंजी से उसे घोषित करने वाली सामग्री फ़ाइल पर जाएं, घटकों से सामग्री निकालें, और कमांड पैलेट या Intlayer टैब से build, fill, test, push और pull चलाएं।
- **[LSP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md)**: LSP का समर्थन करने वाले किसी भी संपादक में समान सुविधा, परिभाषा पर जाएं, अनुवादित मान का पूर्वावलोकन देखें, और कुंजी पूर्णता प्राप्त करें। `i18next`, `react-i18next`, `next-intl` और `use-intl` कॉल का भी समर्थन करता है।
- **[MCP server](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)**: Cursor, VS Code, Claude Desktop, Claude Code और ChatGPT के लिए Intlayer दस्तावेज़ और CLI प्रदान करता है।
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md)**: केंद्रित कौशल जैसे `intlayer-config`, `intlayer-cli` और `intlayer-content`।
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md)**: `no-raw-text` नियम हार्डकोडेड स्ट्रिंग्स को चिह्नित करता है।

</Question>

<Question title="विज़ुअल एडिटर कहाँ चलता है?">

आपके अपने बुनियादी ढांचे पर। एडिटर आपके एप्लिकेशन को एक iframe के अंदर लोड करता है और स्थानीय एडिटर सर्वर से संचार करता है, इसलिए सामग्री कभी बाहर नहीं भेजी जाती है।

</Question>

<Question title="क्या संपादकों को कोड करना जानने की आवश्यकता है?">

नहीं। वे वेबसाइट खोलते हैं, सीधे टेक्स्ट तत्व पर क्लिक करते हैं और उसे मौके पर ही संपादित करते हैं। संपादक स्वचालित रूप से संबंधित शब्दकोश प्रविष्टि का पता लगा लेता है।

</Question>

<Question title="क्या विज़ुअल एडिटर के माध्यम से संपादन मेरी स्रोत फ़ाइलों को बदलता है?">

हाँ, इसे इसी तरह डिज़ाइन किया गया है। परिवर्तन आपके कोडबेस में सामग्री घोषणा फ़ाइल में लिखा जाता है और git diff में एक सामान्य संशोधन के रूप में दिखाई देता है।

</Question>

<Question title="एडिटर खाली पृष्ठ दिखाता है या साइट लोड करने से मना करता है। क्या जांचें?">

एडिटर एप्लिकेशन को iframe में प्रदर्शित करता है, इसलिए आपकी Content Security Policy (CSP) को `frame-ancestors` निर्देश में एडिटर के मूल की अनुमति देनी चाहिए। यह भी सत्यापित करें कि ऐप सर्वर और एडिटर सर्वर दोनों चल रहे हैं।

</Question>

<Question title="क्या मैं उत्पादन में विज़ुअल एडिटर का उपयोग कर सकता हूँ?">

यह विकास और स्टेजिंग परिवेशों के लिए डिज़ाइन किया गया है, जहाँ संपादन के बाद रीबिल्ड स्वीकार्य है। लाइव प्रोडक्शन साइट पर सामग्री संपादित करने के लिए, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) की सिफारिश की जाती है।

</Question>

<Question title="क्या विज़ुअल एडिटर मुफ़्त है?">

हाँ। विज़ुअल एडिटर Apache 2.0 लाइसेंस के तहत ओपन सोर्स प्रोजेक्ट का हिस्सा है, जिसमें व्यावसायिक उपयोग भी शामिल है।

</Question>

</FAQ>
