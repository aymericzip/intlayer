---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
title: CLI - Intlayer पैकेज अपग्रेड करें
description: अपने प्रोजेक्ट या मोनोरेपो के प्रत्येक Intlayer पैकेज को सूचीबद्ध करने और उन्हें नवीनतम संस्करण में अपग्रेड करने के लिए Intlayer CLI upgrade कमांड का उपयोग करना सीखें।
keywords:
  - CLI
  - Upgrade
  - अपग्रेड
  - Packages
  - Monorepo
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "lint / Prettier प्लगइन इंस्टॉल और रजिस्टर करता है, MCP सर्वर एंट्री अपडेट करता है"
  - version: 9.5.8
    date: 2026-09-23
    changes: "upgrade कमांड जोड़ें"
author: aymericzip
---

# Intlayer पैकेज अपग्रेड करें

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

`upgrade` कमांड आपके प्रोजेक्ट के हर `package.json` में घोषित Intlayer पैकेज दिखाता है, monorepo workspaces सहित, और उन्हें नवीनतम प्रकाशित संस्करण पर अपग्रेड करता है: framework इंटीग्रेशन, `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`, `@intlayer/mcp` और बाकी सभी `@intlayer/*` पैकेज। इसके बाद यह उनसे जुड़े टूल्स को अपडेट करता है।

## तर्क:

- `--project-root [projectRoot]` - वैकल्पिक। प्रोजेक्ट रूट डायरेक्टरी। डिफ़ॉल्ट रूप से, कमांड वर्तमान कार्यशील डायरेक्टरी के ऊपर निकटतम `package.json` से शुरू होता है।
- `--dry-run` - वैकल्पिक। किसी भी फ़ाइल को संशोधित किए बिना पैकेजों और उनके लक्षित संस्करण को सूचीबद्ध करता है।
- `--tag <tag>` - वैकल्पिक। अपग्रेड करने के लिए npm dist-tag (उदाहरण के लिए `canary`)। डिफ़ॉल्ट `latest` है।
- `--no-eslint` - वैकल्पिक। Intlayer lint नियम न इंस्टॉल करता है, न रजिस्टर करता है।
- `--no-prettier` - वैकल्पिक। Intlayer Prettier प्लगइन न इंस्टॉल करता है, न रजिस्टर करता है।

## यह क्या करता है:

1. **Intlayer पैकेजों को सूचीबद्ध करता है** - `intlayer`, `@intlayer/*`, `*-intlayer` और `intlayer-*` निर्भरताओं और devDependencies के लिए प्रोजेक्ट की प्रत्येक `package.json` (`node_modules` और बिल्ड आउटपुट को छोड़कर) को स्कैन करता है।
2. **लक्षित संस्करण प्राप्त करता है** - npm रजिस्ट्री से प्रत्येक पैकेज के चयनित dist-tag (डिफ़ॉल्ट रूप से `latest`) का संस्करण पढ़ता है।
3. **रेंज को फिर से लिखता है** - इसके ऑपरेटर (`^`, `~` या कोई नहीं) और फ़ाइल इंडेंटेशन को बनाए रखते हुए प्रत्येक पुराने रेंज को सीधे फ़ाइल में अपडेट करता है।
4. **एक बार इंस्टॉल करता है** - लॉक फ़ाइल के स्वामी पैकेज मैनेजर का उपयोग करके वर्कस्पेस रूट (लॉक फ़ाइल वाली निकटतम डायरेक्टरी) से एकल इंस्टॉलेशन चलाता है:

| लॉक फ़ाइल                       | कमांड           |
| ------------------------------ | -------------- |
| `bun.lock` / `bun.lockb`       | `bun install`  |
| `pnpm-lock.yaml`               | `pnpm install` |
| `yarn.lock`                    | `yarn install` |
| `package-lock.json` या कोई नहीं | `npm install`  |

यदि कोई लॉक फ़ाइल नहीं है, तो npm पर वापस जाने से पहले `package.json` के `packageManager` फ़ील्ड (उदाहरण के लिए `"bun@1.2.0"`) का उपयोग किया जाता है।

वे रेंज जो रजिस्ट्री की ओर इंगित नहीं करते हैं, जैसे `workspace:*`, `file:`, `link:`, `catalog:` या git URL, कभी भी संशोधित नहीं होते हैं।

5. **Lint और Prettier प्लगइन** - जब प्रोजेक्ट ESLint / oxlint या Prettier इस्तेमाल करता है, तो मौजूद न होने पर `eslint-plugin-intlayer` / `prettier-plugin-intlayer` इंस्टॉल करता है और उन्हें रजिस्टर करता है: ESLint flat config में `...intlayer.configs.recommended`, `.oxlintrc.json` में नियम, और Prettier config (JSON, YAML, JavaScript या TypeScript) में प्लगइन। जिस config को सुरक्षित रूप से नहीं बदला जा सकता, उसके लिए पेस्ट करने वाला स्निपेट दिखाया जाता है।
6. **MCP सर्वर** - प्रोजेक्ट की stdio Intlayer MCP एंट्री (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`…) को `@intlayer/mcp@<tag>` पर पॉइंट करता है, ताकि `npx` कैश की गई कॉपी की जगह अपग्रेड किया गया सर्वर चलाए।

## उदाहरण:

### लागू किए बिना उपलब्ध अपग्रेड की सूची बनाएं:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### canary रिलीज़ में अपग्रेड करें:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## आउटपुट उदाहरण:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## नोट्स:

- प्रत्येक वर्कस्पेस को अपग्रेड करने के लिए अपने रिपॉजिटरी के रूट से कमांड चलाएं। केवल उस वर्कस्पेस को अपग्रेड करने के लिए किसी विशिष्ट वर्कस्पेस से इसे चलाएं।
- जिन पैकेजों का संस्करण प्राप्त नहीं किया जा सकता (ऑफ़लाइन, निजी या अप्रकाशित पैकेज) उन्हें सूचीबद्ध किया जाता है और अपरिवर्तित छोड़ दिया जाता है।
- यदि इंस्टॉलेशन विफल हो जाता है, तो अपग्रेड की गई रेंज `package.json` में रखी जाती हैं। अपने पैकेज मैनेजर के इंस्टॉल कमांड को मैन्युअल रूप से चलाएं।
