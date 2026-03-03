---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: एजेंट स्किल्स
description: जानें कि Intlayer एजेंट स्किल्स का उपयोग करके अपने AI एजेंट की आपके प्रोजेक्ट की समझ कैसे बेहतर करें, जिसमें मेटाडेटा, साइटमैप और सर्वर क्रियाओं के लिए व्यापक सेटअप गाइड शामिल हैं।
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
  - version: 8.1.0
    date: 2026-02-09
    changes: प्रारंभिक इतिहास
---

# एजेंट स्किल्स

## `intlayer init skills` कमांड

`intlayer init skills` कमांड आपके प्रोजेक्ट में एजेंट स्किल्स सेटअप करने का सबसे आसान तरीका है। यह आपके वातावरण का पता लगाता है और आपके पसंदीदा प्लेटफ़ॉर्म के लिए आवश्यक कॉन्फ़िगरेशन फ़ाइलें इंस्टॉल करता है।

```bash
npx intlayer init skills
```

या Vercel Skill SDK का उपयोग करके

```bash
npx skills add aymericzip/intlayer-skills
```

जब आप यह कमांड चलाते हैं, तो यह:

1.  आप किस framework का उपयोग कर रहे हैं इसका पता लगाना (उदा., Next.js, React, Vite).
2.  आपसे पूछा जाएगा कि आप किन प्लेटफ़ॉर्म्स पर skills इंस्टॉल करना चाहते हैं (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, आदि)।
3.  आवश्यक कॉन्फ़िगरेशन फ़ाइलें जनरेट करेगा (जैसे `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json`, आदि)।

## Supported Platforms

Intlayer फ्रेमवर्क-विशिष्ट डॉक्यूमेंटेशन (सेटअप, उपयोग, मेटाडेटा, साइटमैप, सर्वर क्रियाएं, आदि) प्रदान करता है ताकि AI एजेंट को यह समझने में मदद मिल सके कि आपके विशिष्ट प्रोजेक्ट में Intlayer के साथ कैसे काम करना है। ये स्किल्स एजेंट को अंतरराष्ट्रीयकरण की जटिलताओं के माध्यम से मार्गदर्शन करने के लिए डिज़ाइन किए गए हैं, यह सुनिश्चित करते हुए कि यह सही पैटर्न और सर्वोत्तम प्रथाओं का पालन करता है।
