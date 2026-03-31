---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - आपकी बहुभाषी वेबसाइट के लिए सभी Intlayer CLI कमांड
description: अपनी बहुभाषी वेबसाइट को प्रबंधित करने के लिए Intlayer CLI का उपयोग करने का तरीका जानें। मिनटों में अपना प्रोजेक्ट सेट करने के लिए इस ऑनलाइन दस्तावेज़ीकरण के चरणों का पालन करें।
keywords:
  - CLI
  - कमांड लाइन इंटरफ़ेस
  - अंतर्राष्ट्रीयकरण
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "standalone कमांड जोड़ा गया"
  - version: 7.5.11
    date: 2026-01-06
    changes: "CI कमांड जोड़ा गया"
  - version: 7.5.11
    date: 2026-01-06
    changes: "list projects कमांड जोड़ा गया"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ा गया"
  - version: 7.2.3
    date: 2025-11-22
    changes: "extract कमांड जोड़ा गया"
  - version: 7.1.0
    date: 2025-11-05
    changes: "translate कमांड में skipIfExists विकल्प जोड़ा गया"
  - version: 6.1.4
    date: 2025-01-27
    changes: "CLI तर्कों और कमांड के लिए उपनाम जोड़े गए"
  - version: 6.1.3
    date: 2025-10-05
    changes: "कमांड में build विकल्प जोड़ा गया"
  - version: 6.1.2
    date: 2025-09-26
    changes: "version कमांड जोड़ा गया"
  - version: 6.1.0
    date: 2025-09-26
    changes: "CLI के माध्यम से verbose विकल्प को डिफ़ॉल्ट रूप से true पर सेट किया गया"
  - version: 6.1.0
    date: 2025-09-23
    changes: "watch कमांड और with विकल्प जोड़े गए"
  - version: 6.0.1
    date: 2025-09-23
    changes: "editor कमांड जोड़ा गया"
  - version: 6.0.0
    date: 2025-09-17
    changes: "content test और list कमांड जोड़े गए"
  - version: 5.5.11
    date: 2025-07-11
    changes: "CLI कमांड पैरामीटर दस्तावेज़ीकरण अपडेट किया गया"
  - version: 5.5.10
    date: 2025-06-29
    changes: "इतिहास प्रारंभ"
---

# Intlayer CLI - आपकी बहुभाषी वेबसाइट के लिए सभी Intlayer CLI कमांड

---

## विषय-सूची

<TOC/>

---

## पैकेज स्थापित करना

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> यदि `intlayer` पैकेज पहले से स्थापित है, तो CLI स्वचालित रूप से स्थापित हो जाता है। आप इस चरण को छोड़ सकते हैं।

## intlayer-cli पैकेज

`intlayer-cli` पैकेज आपकी [Intlayer घोषणाओं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/content_file.md) को शब्दकोशों में ट्रांसपाइल करने के लिए डिज़ाइन किया गया है।

यह पैकेज सभी Intlayer फ़ाइलों को ट्रांसपाइल करता है, जैसे `src/**/*.content.{ts|js|mjs|cjs|json}`. [अपनी Intlayer घोषणा फ़ाइलों को कैसे घोषित करें, देखें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

Intlayer शब्दकोशों की व्याख्या करने के लिए आप व्याख्याताओं (interpreters) का उपयोग कर सकते हैं, जैसे [react-intlayer](https://www.npmjs.com/package/react-intlayer) या [next-intlayer](https://www.npmjs.com/package/next-intlayer)।

## कॉन्फ़िगरेशन फ़ाइल समर्थन

Intlayer कई कॉन्फ़िगरेशन फ़ाइल प्रारूप स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

उपलब्ध भाषाओं या अन्य मापदंडों को कॉन्फ़िगर करने का तरीका जानने के लिए, [यहाँ कॉन्फ़िगरेशन दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## Intlayer कमांड निष्पादित करना

### प्रमाणीकरण (Authentication)

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/login.md)** - Intlayer CMS के साथ प्रमाणित हों और एक्सेस क्रेडेंशियल प्राप्त करें

### मुख्य कमांड (Core Commands)

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/build.md)** - अपनी सामग्री घोषणा फ़ाइलों से अपने शब्दकोश बनाएँ
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/watch.md)** - परिवर्तनों पर नज़र रखें और शब्दकोशों को स्वचालित रूप से फिर से बनाएँ
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/standalone.md)** - Intlayer और निर्दिष्ट पैकेजों वाला एक स्टैंडअलोन JavaScript बंडल बनाएँ
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/version.md)** - स्थापित Intlayer CLI संस्करण की जाँच करें
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/list_projects.md)** - एक निर्देशिका या git रिपॉजिटरी में सभी Intlayer प्रोजेक्ट्स सूचीबद्ध करें

### शब्दकोश प्रबंधन (Dictionary Management)

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/push.md)** - शब्दकोशों को Intlayer संपादक और CMS पर भेजें
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/pull.md)** - Intlayer संपादक और CMS से शब्दकोश प्राप्त करें
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill.md)** - AI का उपयोग करके शब्दकोशों को भरें, ऑडिट करें और अनुवाद करें
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/test.md)** - गुम अनुवादों का परीक्षण करें और उनकी पहचान करें
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/list.md)** - अपने प्रोजेक्ट की सभी सामग्री घोषणा फ़ाइलों को सूचीबद्ध करें

### घटक प्रबंधन (Component Management)

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract.md)** - घटकों से स्ट्रिंग्स को घटक के पास स्थित .content फ़ाइल में निकालें

### कॉन्फ़िगरेशन

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/init.md)** - स्वचालित कॉन्फ़िगरेशन के साथ अपने प्रोजेक्ट में Intlayer सेट करें
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/configuration.md)** - अपना Intlayer कॉन्फ़िगरेशन प्राप्त करें और इसे CMS पर भेजें

### दस्तावेज़ प्रबंधन (Doc Management)

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/doc-translate.md)** - AI का उपयोग करके दस्तावेज़ फ़ाइलों का स्वचालित रूप से अनुवाद करें
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/doc-review.md)** - गुणवत्ता और स्थिरता के लिए दस्तावेज़ फ़ाइलों की समीक्षा करें

### संपादक और लाइव सिंक (Editor and Live Sync)

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/editor.md)** - Intlayer संपादक कमांड का उपयोग करें
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/live.md)** - रनटाइम पर CMS से सामग्री परिवर्तनों को लागू करने के लिए लाइव सिंक का उपयोग करें

### CI/CD और स्वचालन

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/ci.md)** - CI/CD पाइपलाइनों के लिए स्वचालित रूप से इंजेक्ट किए गए क्रेडेंशियल के साथ Intlayer कमांड निष्पादित करें

### विकास उपकरण (Developer Tools)

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/sdk.md)** - अपने स्वयं के कोड में Intlayer CLI SDK का उपयोग करें
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/debug.md)** - Intlayer CLI के साथ समस्याओं को डीबग और हल करें

## अपनी `package.json` फ़ाइल में intlayer कमांड का उपयोग करें

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **नोट**: आप छोटे उपनामों का भी उपयोग कर सकते हैं:
>
> - `npx intlayer content list` के बजाय `npx intlayer list`
> - `npx intlayer content test` के बजाय `npx intlayer test`
> - `npx intlayer projects list` के बजाय `npx intlayer projects-list` या `npx intlayer pl`
