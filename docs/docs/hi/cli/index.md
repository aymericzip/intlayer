---
createdAt: 2024-08-11
updatedAt: 2026-09-23
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgrade कमांड जोड़ें"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra कमांड जोड़ें"
  - version: 9.5.2
    date: 2026-09-12
    changes: "`ci` कमांड को `--ci` फ़्लैग से बदला गया"
  - version: 9.0.0
    date: 2026-06-11
    changes: "scan कमांड जोड़ा गया"
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
author: aymericzip
---

# Intlayer CLI - आपकी बहुभाषी वेबसाइट के लिए सभी Intlayer CLI कमांड

## विषय-सूची

<TOC/>

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

यह पैकेज सभी Intlayer फ़ाइलों को ट्रांसपाइल करता है, जैसे `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [अपनी Intlayer घोषणा फ़ाइलों को कैसे घोषित करें, देखें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/login" />
</TechGrid>

> `intlayer login` एक **access key** (`clientId` / `clientSecret`) जारी करता है जिसका उपयोग हर credentialed command करता है। secret एक server-side credential है और कभी भी आपके client bundle तक नहीं पहुंचता — [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/login.md#keeping-the-access-key-safe) देखें।

### मुख्य कमांड (Core Commands)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/list_projects" />
</TechGrid>

### शब्दकोश प्रबंधन (Dictionary Management)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/list" />
</TechGrid>

### घटक प्रबंधन (Component Management)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/extract" />
</TechGrid>

### कॉन्फ़िगरेशन

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/configuration" />
</TechGrid>

### दस्तावेज़ प्रबंधन (Doc Management)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/doc-review" />
</TechGrid>

### संपादक और लाइव सिंक (Editor and Live Sync)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/live" />
</TechGrid>

### ऑडिटिंग और डायग्नोस्टिक्स

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/scan" />
</TechGrid>

### विकास उपकरण (Developer Tools)

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/debug" />
</TechGrid>

## अपनी `package.json` फ़ाइल में intlayer कमांड का उपयोग करें

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **नोट**: आप छोटे उपनामों का भी उपयोग कर सकते हैं:
>
> - `npx intlayer content list` के बजाय `npx intlayer list`
> - `npx intlayer content test` के बजाय `npx intlayer test`
> - `npx intlayer projects list` के बजाय `npx intlayer projects-list` या `npx intlayer pl`
