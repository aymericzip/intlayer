---
createdAt: 2025-06-07
updatedAt: 2026-05-31
title: Intlayer LSP सर्वर
description: जानें कि कैसे Intlayer लैंग्वेज सर्वर सभी समर्थित एडिटर्स में useIntlayer, getIntlayer और संबंधित कॉल्स के लिए परिभाषा पर जाएं (Go-to-Definition) और अन्य IDE सुविधाएँ प्रदान करता है।
keywords:
  - LSP
  - लैंग्वेज सर्वर
  - परिभाषा पर जाएं
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP सर्वर

**Intlayer लैंग्वेज सर्वर (LSP)** एक [लैंग्वेज सर्वर प्रोटोकॉल (LSP)](https://microsoft.github.io/language-server-protocol/) कार्यान्वयन है जो Intlayer-सचेत बुद्धिमत्ता के साथ आपके IDE को बेहतर बनाता है। यह वर्तमान में डिक्शनरी कुंजी कॉल्स के लिए **परिभाषा पर जाएं (Go to Definition)** की सुविधा प्रदान करता है, जिससे आप अपने कंपोनेंट में `useIntlayer("my-key")` से सीधे उस `.content.ts` फ़ाइल पर जा सकते हैं जो इसे घोषित करती है।

---

## LSP का उपयोग क्यों करें?

जब आप Intlayer का उपयोग करते हैं, तो `useIntlayer("homepage")` जैसे कॉल और `src/homepage.content.ts` में इसकी घोषणा के बीच संबंध अंतर्निहित होता है। बिना टूल्स के, आपको मैन्युअल रूप से फ़ाइल खोजनी होगी। LSP उस लिंक को स्पष्ट बनाता है:

**AI एजेंट जागरूकता**

AI कोडिंग एजेंट (Cursor, Windsurf, GitHub Copilot, Claude Code, Codex) प्रतीकों को हल करने और फ़ाइल-क्रॉस संबंधों को समझने के लिए लैंग्वेज सर्वर पर निर्भर करते हैं। Intlayer LSP चलने के साथ, एजेंट `useIntlayer("key")` का उसकी घोषणा तक पीछा कर सकते हैं, जिससे उन्हें उपलब्ध कंटेंट कुंजियों, प्रत्येक डिक्शनरी के आकार और किन फ़ाइलों को पढ़ना या संपादित करना है, इसके बारे में सटीक संदर्भ मिलता है।

**परिभाषा पर जाएं**

किसी भी समर्थित गेटर कॉल के अंदर किसी डिक्शनरी कुंजी स्ट्रिंग पर अपना कर्सर रखें और `F12` (या `Cmd/Ctrl+Click`) दबाएं। एडिटर कंटेंट घोषणा फ़ाइल खोलता है और कर्सर को `key:` लाइन पर रखता है।

**मर्ज की गई डिक्शनरी का समर्थन**

एक कुंजी को कई कंटेंट फ़ाइलों में विभाजित किया जा सकता है (Intlayer उन्हें मर्ज करता है)। सर्वर प्रति स्रोत फ़ाइल एक स्थान (`Location`) लौटाता है ताकि आप प्रत्येक घोषणा पर जा सकें।

**हर जगह काम करता है**

सभी `*-intlayer` पैकेजों का समर्थन करता है (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `adonis-intlayer`, `intlayer`)।

### समर्थित गेटर कॉल्स

सर्वर निम्नलिखित फ़ंक्शन कॉल्स का पता लगाता है और पहले स्ट्रिंग-लिटरल तर्क को डिक्शनरी कुंजी के रूप में निकालता है:

| फ़ंक्शन       | उदाहरण                        |
| ------------- | ----------------------------- |
| `useIntlayer` | `useIntlayer("hero")`         |
| `getIntlayer` | `getIntlayer("hero", locale)` |

TypeScript जेनिरिक्स और अतिरिक्त तर्कों को अनदेखा कर दिया जाता है — केवल कुंजी स्ट्रिंग मायने रखती है।

> `useDictionary` और `getDictionary` एक स्ट्रिंग कुंजी के बजाय पहले तर्क के रूप में पहले से इम्पोर्टेड `Dictionary` ऑब्जेक्ट लेते हैं, इसलिए वे परिभाषा पर जाएं सुविधा से लाभान्वित नहीं होते हैं और सर्वर द्वारा ट्रैक नहीं किए जाते हैं।

---

## इंस्टॉलेशन

LSP सर्वर `@intlayer/lsp` के हिस्से के रूप में वितरित किया जाता है:

```bash packageManager="npm"
npm install --save-dev @intlayer/lsp
```

```bash packageManager="yarn"
yarn add --dev @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add --save-dev @intlayer/lsp
```

```bash packageManager="bun"
bun add --dev @intlayer/lsp
```

यह पैकेज `intlayer-lsp` बाइनरी को उजागर करता है, जिसे एडिटर्स सर्वर एक्ज़ीक्यूटेबल के रूप में उपयोग करते हैं।

---

## Claude Code प्लगइन के रूप में सेटअप करें

Intlayer LSP सीधे Intlayer GitHub रिपॉजिटरी में होस्ट किए गए **Claude Code प्लगइन** के रूप में उपलब्ध है। इसे इंस्टॉल करने से Claude Code को आपके सभी `useIntlayer` / `getIntlayer` कॉल्स के लिए मूल परिभाषा पर जाएं (Go-to-Definition) की जागरूकता मिलती है।

### 1. लैंग्वेज सर्वर बाइनरी इंस्टॉल करें

```bash packageManager="npm"
npm install -g @intlayer/lsp
```

```bash packageManager="yarn"
yarn global add @intlayer/lsp
```

```bash packageManager="pnpm"
pnpm add -g @intlayer/lsp
```

यह `intlayer-lsp` बाइनरी को आपके PATH पर रखता है, जिसे प्लगइन की `lspServers` प्रविष्टि कॉल करती है।

### 2. Intlayer मार्केटप्लेस पंजीकृत करें और प्लगइन इंस्टॉल करें

```bash
claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
claude plugin enable intlayer-lsp@intlayer
```

Claude Code आपके `enabledPlugins` में `"intlayer-lsp@intlayer": true` जोड़ देगा और समर्थित फ़ाइल प्रकारों (`.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`) पर स्वचालित रूप से लैंग्वेज सर्वर शुरू कर देगा।

### 3. LSP टूल सक्षम करें (यदि पहले से सक्रिय नहीं है)

कुछ Claude Code संस्करणों को LSP फ़ीचर फ़्लैग सेट करने की आवश्यकता होती है। यदि इंस्टॉलेशन के बाद परिभाषा पर जाएं काम नहीं कर रहा है, तो अपनी `~/.claude/settings.json` में निम्नलिखित जोड़ें:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

Claude Code को पुनरारंभ करें — यह अब Intlayer कोडबेस को नेविगेट करते समय `grep` पर वापस जाने के बजाय `goToDefinition`, `findReferences` और अन्य LSP ऑपरेशन्स का उपयोग करेगा।

---

## VS Code में सेटअप (एक्सटेंशन के माध्यम से — अनुशंसित)

यदि आपके पास [Intlayer VS Code एक्सटेंशन](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) इंस्टॉल है, तो लैंग्वेज सर्वर स्वचालित रूप से शुरू हो जाता है। किसी अतिरिक्त कॉन्फ़िगरेशन की आवश्यकता नहीं है। LSP को v8.12.0 के बाद से सीधे VSCode एक्सटेंशन में एकीकृत किया गया है।

> इंस्टॉलेशन और अन्य सुविधाओं के लिए [VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

---

## VS Code में मैन्युअल सेटअप

यदि आप Intlayer एक्सटेंशन का उपयोग नहीं कर रहे हैं, तो आप [**vscode-glspc**](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter) जैसे सामान्य LSP क्लाइंट एक्सटेंशन का उपयोग करके या अपना खुद का छोटा एक्सटेंशन लिखकर मैन्युअल रूप से लैंग्वेज सर्वर को कनेक्ट कर सकते हैं। अनुशंसित तरीका Intlayer एक्सटेंशन का उपयोग करना है।

संदर्भ के लिए, सर्वर stdio पर `intlayer-lsp` बाइनरी के माध्यम से लॉन्च होता है:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

Intlayer एक्सटेंशन सर्वर लॉन्च करने के लिए इन सेटिंग्स को पढ़ता है। यदि आप पूरी तरह से एक्सटेंशन पर निर्भर हैं, तो किसी मैन्युअल सेटिंग्स की आवश्यकता नहीं है।

---

## Cursor में सेटअप

[Cursor](https://www.cursor.com/) अंतर्निहित AI सुविधाओं वाला एक VS Code फ़ोर्क है। यह समान एक्सटेंशन पारिस्थितिकी तंत्र का उपयोग करता है, इसलिए **Intlayer VS Code एक्सटेंशन** बिना किसी अतिरिक्त कॉन्फ़िगरेशन के काम करता है — इसे एक बार इंस्टॉल करें और Cursor इसे स्वचालित रूप से चुन लेता है।

यदि आप मैन्युअल कॉन्फ़िगरेशन पसंद करते हैं, तो Cursor वर्कस्पेस रूट से `.vscode/settings.json` भी पढ़ता है, इसलिए उपरोक्त VS Code स्निपेट सीधे लागू होता है।

---

## Windsurf में सेटअप

[Windsurf](https://windsurf.com/) (Codeium द्वारा) एक अन्य VS Code-आधारित एडिटर है। VS Code मार्केटप्लेस से Intlayer एक्सटेंशन इंस्टॉल करें और लैंग्वेज सर्वर स्वचालित रूप से सक्रिय हो जाता है, ठीक वैसे ही जैसे VS Code और Cursor में होता है।

मैन्युअल कॉन्फ़िगरेशन के लिए, प्रोजेक्ट रूट पर `.vscode/settings.json` बनाएं:

```json fileName=".vscode/settings.json"
{
  "intlayer.languageServer.command": "npx",
  "intlayer.languageServer.args": ["@intlayer/lsp"]
}
```

---

## Zed में सेटअप

[Zed](https://zed.dev/) में इसकी भाषा सेटिंग्स के माध्यम से मूल LSP समर्थन है। अपने Zed उपयोगकर्ता सेटिंग्स (`~/.config/zed/settings.json`) में एक प्रविष्टि जोड़ें:

```json fileName="~/.config/zed/settings.json"
{
  "lsp": {
    "intlayer-lsp": {
      "binary": {
        "path": "npx",
        "arguments": ["--yes", "@intlayer/lsp"]
      }
    }
  },
  "languages": {
    "TypeScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "TSX": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "JavaScript": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Vue.js": {
      "language_servers": ["intlayer-lsp", "..."]
    },
    "Svelte": {
      "language_servers": ["intlayer-lsp", "..."]
    }
  }
}
```

`"..."` प्लेसहोल्डर Zed को Intlayer वाले के साथ अपने डिफ़ॉल्ट लैंग्वेज सर्वर्स को रखने के लिए कहता है।

---

## AI एजेंट CLI (Claude Code, Codex, आदि) के लिए सेटअप

**Claude Code** में प्रथम श्रेणी का LSP प्लगइन समर्थन है — सीधे अपने टर्मिनल सत्रों में परिभाषा पर जाने का पूर्ण अनुभव प्राप्त करने के लिए उपरोक्त [Claude Code प्लगइन सेटअप](#claude-code-प्लगइन-के-रूप-में-सेटअप-करें) का पालन करें।

**OpenAI Codex** और अन्य टर्मिनल-आधारित उपकरण अभी तक LSP क्लाइंट के रूप में कार्य नहीं करते हैं — वे लगातार लैंग्वेज सर्वर सत्र बनाए रखने के बजाय सीधे फ़ाइलों को पढ़ते और लिखते हैं। उन उपकरणों के लिए, LSP चलने का मूल्य अप्रत्यक्ष रूप से आता है: जब सर्वर एक साथी एडिटर (VS Code, Cursor, Windsurf, ...) में सक्रिय होता है, तो एडिटर का लाइव इंडेक्स किसी भी AI एजेंट के लिए उपलब्ध होता है जो एडिटर द्वारा प्रदान किए गए संदर्भ (जैसे, Cursor Composer, Windsurf Cascade, GitHub Copilot Chat) के माध्यम से इसे क्वेरी कर सकता है।

यदि आप बिना एडिटर खोले विशुद्ध रूप से टर्मिनल में काम कर रहे हैं, तो आप बैकग्राउंड में लैंग्वेज सर्वर शुरू कर सकते हैं ताकि यह किसी भी एडिटर के लिए तैयार रहे जो बाद में उसी वर्कस्पेस से जुड़ता है:

```bash
# सर्वर को बैकग्राउंड में चालू रखें
npx @intlayer/lsp &
```

---

## Neovim में मैन्युअल सेटअप

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) का उपयोग करके, एक कस्टम सर्वर कॉन्फ़िगरेशन पंजीकृत करें:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- npx के साथ सर्वर लॉन्च करें ताकि आपको वैश्विक इंस्टॉलेशन की आवश्यकता न हो
      cmd = { 'npx', '--yes', '@intlayer/lsp' },
      filetypes = {
        'typescript',
        'typescriptreact',
        'javascript',
        'javascriptreact',
        'vue',
        'svelte',
      },
      root_dir = lspconfig.util.root_pattern(
        'intlayer.config.ts',
        'intlayer.config.js',
        'package.json'
      ),
    },
  }
end

lspconfig.intlayer_lsp.setup({})
```

Neovim को पुनरारंभ करने के बाद, Intlayer कुंजी पर `gd` दबाने से परिभाषा पर जाएं कॉल होगा।

---

## अन्य एडिटर्स में मैन्युअल सेटअप

कोई भी एडिटर जो लैंग्वेज सर्वर प्रोटोकॉल का समर्थन करता है, `@intlayer/lsp` का उपयोग कर सकता है। सर्वर:

- **ट्रांसपोर्ट** – Node.js IPC / stdio (मानक)
- **एक्ज़ीक्यूटेबल** – `npx @intlayer/lsp` (या स्थानीय रूप से स्थापित `intlayer-lsp` बाइनरी)
- **क्षमताएं** – `definitionProvider: true`, `textDocumentSync: Incremental`

सटीक कॉन्फ़िगरेशन प्रारूप के लिए अपने एडिटर के LSP दस्तावेज़ों से परामर्श लें (उदाहरण के लिए, [coc.nvim](https://github.com/neoclide/coc.nvim) के लिए `languageserver.json`, या [Helix](https://helix-editor.com) में LSP क्लाइंट सेटिंग्स)।

### उदाहरण: coc.nvim

```json fileName="~/.config/nvim/coc-settings.json"
{
  "languageserver": {
    "intlayer": {
      "command": "npx",
      "args": ["@intlayer/lsp"],
      "filetypes": [
        "typescript",
        "typescriptreact",
        "javascript",
        "javascriptreact",
        "vue",
        "svelte"
      ],
      "rootPatterns": [
        "intlayer.config.ts",
        "intlayer.config.js",
        "package.json"
      ]
    }
  }
}
```

### उदाहरण: Helix

```toml fileName="~/.config/helix/languages.toml"
[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]
```

---

## यह कैसे काम करता है

जब सर्वर शुरू होता है, तो यह `getConfiguration()` का उपयोग करके वर्कस्पेस रूट से Intlayer कॉन्फ़िगरेशन को हल करता है। यह इसे संकलित डिक्शनरी खोजने के लिए आवश्यक `build` और `system` पथ देता है।

प्रत्येक **परिभाषा पर जाएं** अनुरोध पर:

1. सर्वर खुली हुई दस्तावेज़ का पूरा टेक्स्ट पढ़ता.
2. यह एक नियमित अभिव्यक्ति का उपयोग करके गेटर कॉल्स (`useIntlayer`, `getIntlayer` आदि) को स्कैन करता है।
3. यह जांचता है कि क्या कर्सर की स्थिति उन कॉल्स में से किसी एक के अंदर आती है।
4. यदि ऐसा होता है, तो यह डिक्शनरी कुंजी (रेगेक्स का कैप्चर समूह 3) निकालता है और उस कुंजी को घोषित करने वाली प्रत्येक कंटेंट फ़ाइल का पता लगाने के लिए `getUnmergedDictionaries()` को कॉल करता है।
5. यह प्रत्येक मिलान वाली फ़ाइल को पढ़ता है और कर्सर को सटीक रूप से स्थान देने के लिए `key: "<key>"` वाली सटीक लाइन ढूंढता है।
6. यह `Location` ऑब्जेक्ट्स का एक सरणी लौटाता है — प्रति स्रोत फ़ाइल एक।

कॉन्फ़िगरेशन को सुस्ती से हल किया जाता है और प्रति सत्र कैश किया जाता है; यह प्रत्येक `initialize` अनुरोध पर रीसेट होता है (उदाहरण के लिए, जब आप एक नया वर्कस्पेस फ़ोल्डर खोलते हैं)।

---

## समस्या निवारण

| लक्षण                                  | संभावित कारण                   | समाधान                                                                        |
| -------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------- |
| परिभाषा पर जाएं कुछ नहीं करता          | सर्वर नहीं चल रहा है           | जांचें कि क्या `@intlayer/lsp` इंस्टॉल है और एडिटर इसे लॉन्च कर रहा है        |
| गलत वर्कस्पेस रूट का पता चला           | एकाधिक वर्कस्पेस फ़ोल्डर       | सुनिश्चित करें कि `intlayer.config.ts` वाली फ़ोल्डर पहली वर्कस्पेस फ़ोल्डर है |
| किसी कुंजी के लिए परिभाषाएँ नहीं मिलीं | कॉन्फ़िगरेशन हल नहीं हुआ       | सत्यापित करें कि वर्कस्पेस रूट पर `intlayer.config.ts` (या `.js`) मौजूद है    |
| सर्वर स्टार्टअप पर क्रैश हो जाता है    | Node.js संस्करण बहुत पुराना है | Node.js ≥ 14.18 की आवश्यकता है                                                |
