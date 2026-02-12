---
createdAt: 2026-02-09
updatedAt: 2026-02-09
title: एजेंट स्किल्स
description: जानें कि Intlayer एजेंट स्किल्स का उपयोग करके अपने AI एजेंट की आपके प्रोजेक्ट की समझ कैसे बेहतर करें।
keywords:
  - Intlayer
  - एजेंट स्किल्स
  - AI एजेंट
  - Internationalization
  - डॉक्यूमेंटेशन
slugs:
  - doc
  - agent_skills
history:
  - version: 8.0.4
    date: 2026-02-09
    changes: प्रारंभिक इतिहास
---

## `intlayer init skills` कमांड

`intlayer init skills` कमांड आपके प्रोजेक्ट में एजेंट स्किल्स सेटअप करने का सबसे आसान तरीका है। यह आपके वातावरण का पता लगाता है और आपके पसंदीदा प्लेटफ़ॉर्म के लिए आवश्यक कॉन्फ़िगरेशन फ़ाइलें इंस्टॉल करता है।

```bash
npx intlayer init skills
```

जब आप यह कमांड चलाते हैं, तो यह:

1.  आप किस framework का उपयोग कर रहे हैं इसका पता लगाना (उदा., Next.js, React, Vite).
2.  आपसे पूछा जाएगा कि आप किन प्लेटफ़ॉर्म्स पर skills इंस्टॉल करना चाहते हैं (Cursor, VS Code, OpenCode, Claude Code, आदि)।
3.  आवश्यक कॉन्फ़िगरेशन फ़ाइलें जनरेट करेगा (जैसे `.cursor/mcp.json`, `.vscode/mcp.json`, या `.intlayer/skills/*.md`)।

## Supported Platforms

Intlayer निम्नलिखित प्लेटफ़ॉर्म्स के साथ इंटीग्रेशन का समर्थन करता है:

### 1. Cursor

Cursor MCP (Model Context Protocol) सर्वरों का समर्थन करता है। `intlayer init skills` चलाने पर `.cursor/mcp.json` फ़ाइल बनेगी जो Cursor को Intlayer MCP सर्वर के साथ संवाद करने की अनुमति देती है।

### 2. VS Code

VS Code उपयोगकर्ताओं के लिए, विशेष रूप से जो GitHub Copilot या अन्य MCP-समर्थित एक्सटेंशन्स का उपयोग करते हैं, यह कमांड `.vscode/mcp.json` कॉन्फ़िगरेशन बनाता है।

### 3. OpenCode

OpenCode एक interactive CLI एजेंट है जो सॉफ़्टवेयर इंजीनियरिंग कार्यों के लिए डिज़ाइन किया गया है। Intlayer OpenCode को internationalization कार्यों में सहायता करने के लिए विशिष्ट skills प्रदान करता है।

### 4. Claude Code

Claude Code को इसकी desktop या CLI settings में उत्पन्न की गई configurations जोड़कर Intlayer skills के उपयोग के लिए कॉन्फ़िगर किया जा सकता है।
