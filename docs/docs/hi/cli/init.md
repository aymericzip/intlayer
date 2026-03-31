---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Intlayer प्रारंभ करें (Initialize Intlayer)
description: अपने प्रोजेक्ट में Intlayer को प्रारंभ करने का तरीका जानें।
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "--no-gitignore विकल्प जोड़ा गया"
  - version: 7.5.9
    date: 2025-12-30
    changes: "init कमांड जोड़ा गया"
---

# Intlayer प्रारंभ करें (Initialize Intlayer)

```bash
npx intlayer init
```

`init` कमांड आवश्यक फ़ाइलें और सेटिंग्स बनाकर आपके प्रोजेक्ट में Intlayer को स्वचालित रूप से कॉन्फ़िगर करता है। यह Intlayer के साथ शुरुआत करने का अनुशंसित तरीका है।

## उपनाम (Aliases):

- `npx intlayer init`

## तर्क (Arguments):

- `--project-root [projectRoot]` - वैकल्पिक। प्रोजेक्ट रूट निर्देशिका निर्दिष्ट करें। यदि प्रदान नहीं किया जाता है, तो कमांड वर्तमान कार्य निर्देशिका से शुरू होकर प्रोजेक्ट रूट की खोज करेगा।
- `--no-gitignore` - वैकल्पिक। `.gitignore` फ़ाइल के स्वचालित अपडेट को छोड़ देता है। यदि यह फ़्लैग सेट है, तो `.intlayer` को `.gitignore` में नहीं जोड़ा जाएगा।

## यह क्या करता है:

`init` कमांड निम्नलिखित सेटअप कार्य करता है:

1. **प्रोजेक्ट संरचना सत्यापित करना** - सुनिश्चित करता है कि आप `package.json` फ़ाइल वाली वैध प्रोजेक्ट निर्देशिका में हैं।
2. **`.gitignore` अपडेट करना** - जनरेट की गई फ़ाइलों को संस्करण नियंत्रण से बाहर करने के लिए आपकी `.gitignore` फ़ाइल में `.intlayer` जोड़ता है (`--no-gitignore` के साथ छोड़ा जा सकता है)।
3. **TypeScript कॉन्फ़िगर करना** - Intlayer प्रकार परिभाषाओं (`.intlayer/**/*.ts`) को शामिल करने के लिए किसी भी `tsconfig.json` फ़ाइलों को अपडेट करता है।
4. **कॉन्फ़िगरेशन फ़ाइल बनाना** - डिफ़ॉल्ट सेटिंग्स के साथ `intlayer.config.ts` (TypeScript प्रोजेक्ट्स के लिए) या `intlayer.config.mjs` (JavaScript प्रोजेक्ट्स के लिए) जनरेट करता है।
5. **Vite कॉन्फ़िगरेशन अपडेट करना** - यदि Vite कॉन्फ़िगरेशन फ़ाइल पाई जाती है, तो `vite-intlayer` प्लगइन के लिए आयात जोड़ता है।
6. **Next.js कॉन्फ़िगरेशन अपडेट करना** - यदि Next.js कॉन्फ़िगरेशन फ़ाइल पाई जाती है, तो `next-intlayer` प्लगइन के लिए आयात जोड़ता है।

## उदाहरण:

### बुनियादी प्रारंभ:

```bash
npx intlayer init
```

यह वर्तमान निर्देशिका में Intlayer को प्रारंभ करता है, प्रोजेक्ट रूट को स्वचालित रूप से खोजता है।

### कस्टम प्रोजेक्ट रूट के साथ प्रारंभ:

```bash
npx intlayer init --project-root ./my-project
```

यह निर्दिष्ट निर्देशिका में Intlayer को प्रारंभ करता है।

### .gitignore अपडेट किए बिना प्रारंभ:

```bash
npx intlayer init --no-gitignore
```

यह सभी कॉन्फ़िगरेशन फ़ाइलें सेट करेगा लेकिन आपके `.gitignore` को संशोधित नहीं करेगा।

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

- कमांड इडेम्पोटेंट (idempotent) है—आप इसे सुरक्षित रूप से कई बार चला सकते हैं। पहले से कॉन्फ़िगर किए गए चरणों को छोड़ दिया जाएगा।
- यदि कॉन्फ़िगरेशन फ़ाइल पहले से मौजूद है, तो इसे अधिलेखित (overwrite) नहीं किया जाएगा।
- बिना `include` सरणी वाले TypeScript कॉन्फ़िगरेशन (उदा: संदर्भों के साथ समाधान-शैली कॉन्फ़िगरेशन) छोड़ दिए जाते हैं।
- यदि प्रोजेक्ट रूट में `package.json` नहीं मिलता है, तो कमांड त्रुटि के साथ बंद हो जाएगा।
