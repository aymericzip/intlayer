---
createdAt: 2025-06-07
updatedAt: 2025-07-11
title: MCP सर्वर दस्तावेज़ीकरण
description: अपने सर्वर प्रबंधन और संचालन को अनुकूलित करने के लिए MCP सर्वर की विशेषताओं और सेटअप का अन्वेषण करें।
keywords:
  - MCP सर्वर
  - सर्वर प्रबंधन
  - अनुकूलन
  - Intlayer
  - दस्तावेज़ीकरण
  - सेटअप
  - विशेषताएँ
slugs:
  - doc
  - mcp-server
---

# Intlayer MCP सर्वर

**Intlayer MCP (मॉडल संदर्भ प्रोटोकॉल) सर्वर** Intlayer इकोसिस्टम के लिए अनुकूलित AI-संचालित IDE सहायता प्रदान करता है।

## मैं इसे कहाँ उपयोग कर सकता हूँ?

- आधुनिक डेवलपर वातावरण जैसे **Cursor**, **VS Code**, और कोई भी IDE जो MCP प्रोटोकॉल का समर्थन करता हो।
- अपने पसंदीदा AI सहायक जैसे **Claude Desktop**, **Gemini**, **ChatGPT**, आदि पर।

## Intlayer MCP सर्वर का उपयोग क्यों करें?

Intlayer MCP सर्वर को अपने IDE में सक्षम करके, आप निम्नलिखित सुविधाएँ प्राप्त करते हैं:

- **संदर्भ-सचेत दस्तावेज़ीकरण**
  MCP सर्वर Intlayer के दस्तावेज़ को लोड करता है और प्रदर्शित करता है। यह आपके सेटअप, माइग्रेशन आदि को तेज़ करने में मदद करता है।
  यह सुनिश्चित करता है कि कोड सुझाव, कमांड विकल्प, और व्याख्याएँ हमेशा अद्यतित और प्रासंगिक हों।

- **स्मार्ट CLI एकीकरण**
  Intlayer CLI कमांड्स को सीधे अपने IDE इंटरफ़ेस से एक्सेस करें और चलाएं। MCP सर्वर का उपयोग करके, आप अपने AI सहायक को `intlayer dictionaries build` जैसे कमांड चलाने दे सकते हैं ताकि आपके शब्दकोश अपडेट हों, या `intlayer dictionaries fill` चलाकर अपनी गायब अनुवादों को भर सकें।

  > कमांड्स और विकल्पों की पूरी सूची देखने के लिए [Intlayer CLI दस्तावेज़ीकरण](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md) देखें।

## लोकल सर्वर (stdio) बनाम रिमोट सर्वर (SSE)

MCP सर्वर का उपयोग दो तरीकों से किया जा सकता है:

- लोकल सर्वर (stdio)
- रिमोट सर्वर (SSE)

### लोकल सर्वर (stdio) (सिफारिश की गई)

Intlayer एक NPM पैकेज प्रदान करता है जिसे आपकी मशीन पर लोकली इंस्टॉल किया जा सकता है। इसे आपके पसंदीदा IDE, जैसे VS Code, Cursor, और आपके लोकल असिस्टेंट एप्लिकेशन, जैसे ChatGPT, Claude Desktop, आदि में इंस्टॉल किया जा सकता है।

यह सर्वर MCP सर्वर का उपयोग करने का सिफारिश किया गया तरीका है। क्योंकि यह MCP सर्वर की सभी सुविधाओं को एकीकृत करता है, जिसमें CLI टूल्स भी शामिल हैं।

### रिमोट सर्वर (SSE)

MCP सर्वर को दूरस्थ रूप से भी उपयोग किया जा सकता है, SSE ट्रांसपोर्ट विधि का उपयोग करके। यह सर्वर Intlayer द्वारा होस्ट किया जाता है, और https://mcp.intlayer.org पर उपलब्ध है। इस सर्वर तक सार्वजनिक रूप से, बिना किसी प्रमाणीकरण के पहुंचा जा सकता है, और यह उपयोग के लिए मुफ्त है।

ध्यान दें कि रिमोट सर्वर CLI टूल्स, AI ऑटोकम्प्लीशन आदि को एकीकृत नहीं करता है। दूरस्थ सर्वर केवल दस्तावेज़ीकरण के साथ इंटरैक्शन के लिए है ताकि आपका AI असिस्टेंट Intlayer इकोसिस्टम में मदद कर सके।

> सर्वर होस्टिंग लागतों के कारण, रिमोट सर्वर की उपलब्धता की गारंटी नहीं दी जा सकती। हम एक साथ कनेक्शनों की संख्या सीमित करते हैं। सबसे विश्वसनीय अनुभव के लिए हम लोकल सर्वर (stdio) ट्रांसपोर्ट विधि का उपयोग करने की सलाह देते हैं।

---

## Cursor में सेटअप

Cursor में MCP सर्वर को कॉन्फ़िगर करने के लिए [आधिकारिक दस्तावेज़](https://docs.cursor.com/context/mcp) का पालन करें।

अपने प्रोजेक्ट रूट में निम्नलिखित `.cursor/mcp.json` कॉन्फ़िगरेशन फ़ाइल जोड़ें:

### लोकल सर्वर (stdio) (सिफारिश की गई)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### रिमोट सर्वर (SSE)

रिमोट Intlayer MCP सर्वर से Server-Sent Events (SSE) का उपयोग करके कनेक्ट करने के लिए, आप अपने MCP क्लाइंट को होस्टेड सेवा से कनेक्ट करने के लिए कॉन्फ़िगर कर सकते हैं।

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

यह आपके IDE को `npx` का उपयोग करके Intlayer MCP सर्वर लॉन्च करने के लिए बताता है, जिससे यह सुनिश्चित होता है कि जब तक आप इसे पिन न करें, यह हमेशा नवीनतम उपलब्ध संस्करण का उपयोग करता है।

---

## VS Code में सेटअप

VS Code में MCP सर्वर को कॉन्फ़िगर करने के लिए [आधिकारिक दस्तावेज़](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) का पालन करें।

VS Code के साथ Intlayer MCP सर्वर का उपयोग करने के लिए, आपको इसे अपने वर्कस्पेस या उपयोगकर्ता सेटिंग्स में कॉन्फ़िगर करना होगा।

### लोकल सर्वर (stdio) (अनुशंसित)

अपने प्रोजेक्ट रूट में `.vscode/mcp.json` फ़ाइल बनाएं:

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### रिमोट सर्वर (SSE)

रिमोट Intlayer MCP सर्वर से Server-Sent Events (SSE) का उपयोग करके कनेक्ट करने के लिए, आप अपने MCP क्लाइंट को होस्टेड सेवा से कनेक्ट करने के लिए कॉन्फ़िगर कर सकते हैं।

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## ChatGPT में सेटअप

### रिमोट सर्वर (SSE)

ChatGPT में MCP सर्वर को कॉन्फ़िगर करने के लिए [आधिकारिक दस्तावेज़](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) का पालन करें।

1. Go to the [prompt dashboard](https://platform.openai.com/prompts)
2. Click on `+ Create`
3. Click on `Tools (Create or +)`
4. Select `MCP Server`
5. Click on `Add new`
6. Fill in the following fields:

   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. Click on "Save"

---

## Claude Desktop में सेट अप करें

Claude Desktop में MCP सर्वर कॉन्फ़िगर करने के लिए [आधिकारिक दस्तावेज़](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) का पालन करें।

कॉन्फ़िग फ़ाइल का पथ:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### लोकल सर्वर (stdio) (अनुशंसित)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## CLI के माध्यम से MCP सर्वर का उपयोग करना

आप परीक्षण, डिबगिंग, या अन्य टूल्स के साथ एकीकरण के लिए कमांड लाइन से सीधे Intlayer MCP सर्वर भी चला सकते हैं।

```bash
# ग्लोबली इंस्टॉल करें
npm install -g @intlayer/mcp

# या सीधे npx के साथ उपयोग करें (अनुशंसित)
npx @intlayer/mcp
```

---

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                              |
| ------- | ---------- | ------------------------------------- |
| 5.5.12  | 2025-07-11 | ChatGPT सेट अप जोड़ा                  |
| 5.5.12  | 2025-07-10 | Claude Desktop सेट अप जोड़ा           |
| 5.5.12  | 2025-07-10 | SSE ट्रांसपोर्ट और दूरस्थ सर्वर जोड़ा |
| 5.5.10  | 2025-06-29 | इतिहास प्रारंभ करें                   |
