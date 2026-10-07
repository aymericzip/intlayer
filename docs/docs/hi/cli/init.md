---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: प्रोजेक्ट में Intlayer सेट करें"
description: "मौजूदा प्रोजेक्ट में Intlayer जोड़ने के लिए intlayer init चलाएँ: यह फ़्रेमवर्क पहचानता है, पैकेज इंस्टॉल करता है और कॉन्फ़िगरेशन लिखता है।"
keywords:
  - प्रारंभ
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 9.5.13
    date: 2026-09-29
    changes: "init अब केवल पैकेज इंस्टॉल करता है और फ़्रेमवर्क सेट करता है; हर चरण के लिए अलग सब-कमांड; टर्मिनल के बिना --interactive विफल होता है"
  - version: 9.5.6
    date: 2026-09-21
    changes: "init infra सब-कमांड जोड़ें"
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore विकल्प जोड़ा गया"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ा गया"
author: aymericzip
---

# Intlayer प्रारंभ करें (Initialize Intlayer)

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

`init` कमांड Intlayer पैकेज इंस्टॉल करता है और आपका फ़्रेमवर्क सेट करता है (कॉन्फ़िगरेशन फ़ाइल, TypeScript, बंडलर प्लगइन, middleware/proxy, प्रोवाइडर)। Intlayer शुरू करने का यही अनुशंसित तरीका है।

बाकी सब कुछ (CI वर्कफ़्लो, AI स्किल्स, MCP सर्वर, एडिटर टूल, lint नियम, CMS, इन्फ्रास्ट्रक्चर) वैकल्पिक है: इसे `--interactive` चेकलिस्ट से चुनें, या इसका समर्पित सब-कमांड चलाएँ (नीचे देखें)।

## उपनाम (Aliases):

- `npx intlayer init`

## तर्क (Arguments):

- `--project-root [projectRoot]` - वैकल्पिक। प्रोजेक्ट रूट निर्देशिका निर्दिष्ट करें। यदि प्रदान नहीं किया जाता है, तो कमांड वर्तमान कार्य निर्देशिका से शुरू होकर प्रोजेक्ट रूट की खोज करेगा।
- `--no-gitignore` - वैकल्पिक। `.gitignore` फ़ाइल के स्वचालित अपडेट को छोड़ देता है। यदि यह फ़्लैग सेट है, तो `.intlayer` को `.gitignore` में नहीं जोड़ा जाएगा।
- `--no-framework-setup` - वैकल्पिक। प्रोजेक्ट फ़ाइलों को छुए बिना केवल पैकेज इंस्टॉल करता है।
- `--routing <routing>` - वैकल्पिक। लोकेल रूटिंग: `prefix-no-default` (डिफ़ॉल्ट), `prefix-all`, `no-prefix`, `search-params` या `none`।
- `--content <layout>` - वैकल्पिक। सामग्री कैसे घोषित की जाती है:
  - `multilingual` - `{fileName}.content.{ts,json}` कम्पोनेंट के बगल में, प्रत्येक लोकेल एक ही फ़ाइल में (`compiler.output` सेट करता है)।
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` कम्पोनेंट के बगल में (`compiler.output` और `dictionary.locale` सेट करता है)।
  - `centralized` - प्रति लोकेल एक `/locales/{locale}.{json,po}` कैटलॉग (`syncJSON` / `syncPO` प्लगइन जोड़ता है)।
  - `namespaces` - `/locales/{locale}/{namespace}.{json,po}` कैटलॉग (`syncJSON` / `syncPO` प्लगइन जोड़ता है)।
- `--content-format <format>` - वैकल्पिक, `--content` के साथ। `multilingual` / `per-locale` के लिए `ts` या `json`, `centralized` / `namespaces` के लिए `json` या `po`। पहले वाला डिफ़ॉल्ट है।
- `-i, --interactive` - वैकल्पिक। डिफ़ॉल्ट सेट के बजाय एक चेकलिस्ट (पैकेज, CI, स्किल्स, MCP, VS Code, LSP, lint, CMS, इन्फ्रास्ट्रक्चर, …) से सेटअप चरण चुनें। टर्मिनल ज़रूरी है: टर्मिनल न होने पर (AI एजेंट, CI) कमांड विफल होता है और उसकी जगह चलाने के लिए सब-कमांड की सूची दिखाता है।
- `--no-github-actions` - वैकल्पिक। `--interactive` के साथ, चुने जाने पर भी GitHub Actions वर्कफ़्लो कभी नहीं बनाता।

## यह क्या करता है:

`init` कमांड निम्नलिखित सेटअप कार्य करता है:

1. **प्रोजेक्ट संरचना सत्यापित करना** - सुनिश्चित करता है कि आप `package.json` फ़ाइल वाली वैध प्रोजेक्ट निर्देशिका में हैं।
2. **पैकेज इंस्टॉल करता है** - आपके स्टैक के लिए ग़ायब Intlayer पैकेज (जैसे `react-intlayer`, `vite-intlayer`) इंस्टॉल करता है और पुराने पैकेज अपग्रेड करता है।
3. **`.gitignore` अपडेट करना** - जनरेट की गई फ़ाइलों को संस्करण नियंत्रण से बाहर करने के लिए आपकी `.gitignore` फ़ाइल में `.intlayer` जोड़ता है (`--no-gitignore` के साथ छोड़ा जा सकता है)।
4. **TypeScript कॉन्फ़िगर करना** - Intlayer प्रकार परिभाषाओं (`.intlayer/**/*.ts`) को शामिल करने के लिए किसी भी `tsconfig.json` फ़ाइलों को अपडेट करता है।
5. **कॉन्फ़िगरेशन फ़ाइल बनाना** - डिफ़ॉल्ट सेटिंग्स के साथ `intlayer.config.ts` (TypeScript प्रोजेक्ट्स के लिए) या `intlayer.config.mjs` (JavaScript प्रोजेक्ट्स के लिए) जनरेट करता है।
6. **बंडलर / फ़्रेमवर्क कॉन्फ़िग अपडेट करता है** - आपके Vite, Next.js, Nuxt, Astro, … कॉन्फ़िगरेशन में Intlayer प्लगइन जोड़ता है, और फ़्रेमवर्क के समर्थन करने पर middleware/proxy और प्रोवाइडर बनाता है।

## एक-एक चरण सेट करें

`--interactive` चेकलिस्ट के हर चरण का अपना सब-कमांड है। जब मान फ़्लैग के रूप में दिए जाते हैं तो ये कोई सवाल नहीं पूछते, इसलिए इन्हें AI एजेंट या CI जॉब से सुरक्षित रूप से चलाया जा सकता है।

| कमांड                                                                 | क्या सेट करता है                                                                          |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | ग़ायब Intlayer पैकेज इंस्टॉल करता है और पुराने अपग्रेड करता है                            |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | कॉन्फ़िगरेशन फ़ाइल, TypeScript, बंडलर प्लगइन, middleware/proxy, प्रोवाइडर और `.gitignore` |
| `intlayer init github-actions`                                        | `fill` और `test` GitHub Actions वर्कफ़्लो                                                 |
| `intlayer init vscode-extension`                                      | `.vscode/extensions.json` में Intlayer एक्सटेंशन की सिफ़ारिश करता है                      |
| `intlayer init lsp`                                                   | `.vscode/settings.json` में Intlayer लैंग्वेज सर्वर                                       |
| `intlayer init eslint`                                                | प्रोजेक्ट पहले से lint करता हो तो Intlayer lint नियम (ESLint / oxlint)                    |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | AI एजेंट स्किल्स के रूप में Intlayer दस्तावेज़                                            |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | Intlayer MCP सर्वर                                                                        |
| `intlayer init extension [--browser <chrome/firefox>]`                | Intlayer ब्राउज़र एक्सटेंशन का स्टोर पेज खोलता है                                         |
| `intlayer init cms`                                                   | ब्राउज़र से Intlayer CMS में लॉग इन करता है और क्रेडेंशियल `.env` में सहेजता है           |
| `intlayer init infra --mode <desktop/docker/compose>`                 | डेस्कटॉप ऐप या सेल्फ़-होस्टेड स्टैक                                                       |

### AI एजेंट या CI जॉब से

AI एजेंट के शेल में टर्मिनल नहीं होता, इसलिए किसी सवाल का जवाब नहीं दिया जा सकता। डिफ़ॉल्ट कमांड चलाएँ, फिर अपनी ज़रूरत के सब-कमांड:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

टर्मिनल के बिना:

- `init skills` आपके स्टैक से मेल खाने वाली स्किल्स इंस्टॉल करता है, जब तक `--skills` सेट न हो (जैसे `--skills Usage Content React`)।
- `init skills` और `init mcp` पहचाने गए AI प्लेटफ़ॉर्म (Claude Code, Cursor, VS Code, Windsurf, …) का उपयोग करते हैं, जब तक `--platform` सेट न हो, और कोई प्लेटफ़ॉर्म न मिलने पर प्लेटफ़ॉर्म की सूची के साथ विफल होते हैं।
- `init mcp` `stdio` ट्रांसपोर्ट का उपयोग करता है, जब तक `--transport` सेट न हो।
- `init infra` के लिए `--mode` ज़रूरी है, और `init extension` केवल स्टोर लिंक दिखाता है, जब तक `--browser` सेट न हो।

MCP सर्वर हमेशा प्रोजेक्ट के अंदर कॉन्फ़िगर होता है (Claude Code के लिए `.mcp.json` में)।

## उदाहरण:

### बुनियादी प्रारंभ:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

यह वर्तमान निर्देशिका में Intlayer को प्रारंभ करता है, प्रोजेक्ट रूट को स्वचालित रूप से खोजता है।

### कस्टम प्रोजेक्ट रूट के साथ प्रारंभ:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

यह निर्दिष्ट निर्देशिका में Intlayer को प्रारंभ करता है।

### .gitignore अपडेट किए बिना प्रारंभ:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

यह सभी कॉन्फ़िगरेशन फ़ाइलें सेट करेगा लेकिन आपके `.gitignore` को संशोधित नहीं करेगा।

### इन्फ्रास्ट्रक्चर सेट करें (डेस्कटॉप ऐप या सेल्फ-होस्टिंग):

```bash
npx intlayer init infra
```

होस्ट किए गए इंस्टॉलर (`https://intlayer.org/install.sh`, या Windows पर `install.ps1`) को डाउनलोड और रन करता है, जो पूछता है कि आप Intlayer को कैसे चलाना चाहते हैं:

- **डेस्कटॉप ऐप** - Intlayer Cloud से जुड़े आपके कंप्यूटर पर नेटिव डैशबोर्ड इंस्टॉल करता है।
- **ऑल-इन-वन Docker** - एक ही कंटेनर में डैशबोर्ड + API + MongoDB + Redis + MinIO।
- **Docker Compose** - स्केलेबल सेल्फ-होस्टिंग के लिए प्रति सेवा एक कंटेनर।

`--mode` के साथ मेनू छोड़ें:

```bash
npx intlayer init infra --mode compose
```

वही चरण `npx intlayer init --interactive` द्वारा भी पेश किया जाता है। इंस्टॉलर सेटिंग्स के लिए [`init infra` संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/infra.md) देखें, और प्रत्येक मोड क्या सेट करता है इसके लिए [सेल्फ-होस्टिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md) देखें।

- [`init infra` संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/infra.md)
- [सेल्फ-होस्टिंग गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md)

## आउटपुट उदाहरण:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## टिप्पणियाँ:

- कमांड इडेम्पोटेंट (idempotent) है-आप इसे सुरक्षित रूप से कई बार चला सकते हैं। पहले से कॉन्फ़िगर किए गए चरणों को छोड़ दिया जाएगा।
- यदि कॉन्फ़िगरेशन फ़ाइल पहले से मौजूद है, तो इसे अधिलेखित (overwrite) नहीं किया जाएगा।
- बिना `include` सरणी वाले TypeScript कॉन्फ़िगरेशन (उदा: संदर्भों के साथ समाधान-शैली कॉन्फ़िगरेशन) छोड़ दिए जाते हैं।
- यदि प्रोजेक्ट रूट में `package.json` नहीं मिलता है, तो कमांड त्रुटि के साथ बंद हो जाएगा।
