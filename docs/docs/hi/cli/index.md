---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Intlayer CLI का उपयोग करके अपनी बहुभाषी वेबसाइट का प्रबंधन कैसे करें, यह जानें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपना प्रोजेक्ट सेटअप करें।
keywords:
  - CLI
  - कमांड लाइन इंटरफेस
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 7.2.3
    date: 2025-11-22
    changes: ट्रांसफॉर्म कमांड जोड़ें
  - version: 7.1.0
    date: 2025-11-05
    changes: translate कमांड में skipIfExists विकल्प जोड़ें
  - version: 6.1.4
    date: 2025-01-27
    changes: CLI आर्गुमेंट्स और कमांड्स के लिए उपनाम जोड़ें
  - version: 6.1.3
    date: 2025-10-05
    changes: कमांड्स में build विकल्प जोड़ें
  - version: 6.1.2
    date: 2025-09-26
    changes: संस्करण कमांड जोड़ें
  - version: 6.1.0
    date: 2025-09-26
    changes: CLI का उपयोग करके verbose विकल्प को डिफ़ॉल्ट रूप से true पर सेट करें
  - version: 6.1.0
    date: 2025-09-23
    changes: watch कमांड और with विकल्प जोड़ें
  - version: 6.0.1
    date: 2025-09-23
    changes: editor कमांड जोड़ें
  - version: 6.0.0
    date: 2025-09-17
    changes: content test और list कमांड जोड़ें
  - version: 5.5.11
    date: 2025-07-11
    changes: CLI कमांड पैरामीटर दस्तावेज़ीकरण अपडेट करें
  - version: 5.5.10
    date: 2025-06-29
    changes: इतिहास प्रारंभ करें
---

# Intlayer CLI

---

## सामग्री तालिका

<TOC/>

---

## पैकेज इंस्टॉल करें

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> यदि `intlayer` पैकेज पहले से इंस्टॉल है, तो cli स्वचालित रूप से इंस्टॉल हो जाता है। आप इस चरण को छोड़ सकते हैं।

## intlayer-cli पैकेज

`intlayer-cli` पैकेज आपके [intlayer घोषणाओं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) को शब्दकोशों में ट्रांसपाइल करने का उद्देश्य रखता है।

यह पैकेज सभी intlayer फाइलों को ट्रांसपाइल करेगा, जैसे कि `src/**/*.content.{ts|js|mjs|cjs|json}`। [देखें कि अपने Intlayer घोषणा फाइलों को कैसे घोषित करें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

intlayer शब्दकोशों की व्याख्या करने के लिए आप इंटरप्रेटर का उपयोग कर सकते हैं, जैसे कि [react-intlayer](https://www.npmjs.com/package/react-intlayer), या [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## कॉन्फ़िगरेशन फ़ाइल समर्थन

Intlayer कई कॉन्फ़िगरेशन फ़ाइल प्रारूप स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

उपलब्ध लोकल्स या अन्य पैरामीटर कैसे कॉन्फ़िगर करें, यह देखने के लिए, [यहाँ कॉन्फ़िगरेशन दस्तावेज़ देखें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)।

## intlayer कमांड चलाएँ

### प्रमाणीकरण

- **[लॉगिन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/login.md)** - Intlayer CMS के साथ प्रमाणित करें और पहुंच क्रेडेंशियल प्राप्त करें

### मुख्य कमांड्स

- **[शब्दकोश बनाएं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/build.md)** - कंटेंट घोषणा फ़ाइलों से अपने शब्दकोश बनाएं
- **[शब्दकोश देखें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/watch.md)** - परिवर्तनों पर नजर रखें और स्वचालित रूप से शब्दकोश बनाएं
- **[CLI संस्करण जांचें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/version.md)** - इंस्टॉल किए गए Intlayer CLI संस्करण की जांच करें

### शब्दकोश प्रबंधन

- **[शब्दकोश पुश करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/push.md)** - शब्दकोशों को Intlayer संपादक और CMS में पुश करें
- **[शब्दकोश पुल करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/pull.md)** - Intlayer संपादक और CMS से शब्दकोश खींचें
- **[शब्दकोश भरें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md)** - AI का उपयोग करके शब्दकोश भरें, ऑडिट करें, और अनुवाद करें
- **[गुम हुए अनुवादों का परीक्षण करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/test.md)** - गुम हुए अनुवादों का परीक्षण करें और पहचानें
- **[सामग्री घोषणा फ़ाइलों की सूची बनाएं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/list.md)** - अपने प्रोजेक्ट में सभी सामग्री घोषणा फ़ाइलों की सूची बनाएं

### घटक प्रबंधन

- **[कंपोनेंट्स को ट्रांसफॉर्म करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/transform.md)** - मौजूदा कंपोनेंट्स को Intlayer का उपयोग करने के लिए ट्रांसफॉर्म करें

### कॉन्फ़िगरेशन

- **[कॉन्फ़िगरेशन प्रबंधित करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/configuration.md)** - अपनी Intlayer कॉन्फ़िगरेशन को CMS से प्राप्त करें और पुश करें

### दस्तावेज़ प्रबंधन

- **[दस्तावेज़ अनुवाद करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/doc-translate.md)** - AI का उपयोग करके दस्तावेज़ फ़ाइलों का स्वचालित अनुवाद करें
- **[दस्तावेज़ समीक्षा करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/doc-review.md)** - गुणवत्ता और संगति के लिए दस्तावेज़ फ़ाइलों की समीक्षा करें

### संपादक और लाइव सिंक

- **[एडिटर कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/editor.md)** - Intlayer एडिटर कमांड्स का उपयोग करें
- **[लाइव सिंक कमांड्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/live.md)** - रनटाइम पर CMS कंटेंट परिवर्तनों को प्रतिबिंबित करने के लिए लाइव सिंक का उपयोग करें

### विकास उपकरण

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/sdk.md)** - अपने कोड में Intlayer CLI SDK का उपयोग करें
- **[Intlayer कमांड डिबग करें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/debug.md)** - Intlayer CLI समस्याओं का डिबग और ट्रबलशूट करें

## अपने `package.json` में intlayer कमांड्स का उपयोग करें

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **नोट**: आप छोटे उपनाम भी उपयोग कर सकते हैं:
>
> - `npx intlayer list` का उपयोग `npx intlayer content list` के बजाय करें
> - `npx intlayer test` का उपयोग `npx intlayer content test` के बजाय करें
