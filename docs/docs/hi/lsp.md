---
createdAt: 2025-06-07
updatedAt: 2026-08-10
title: Intlayer LSP सर्वर
description: जानें कि Intlayer लैंग्वेज सर्वर आपके IDE और AI एजेंट में परिभाषा पर जाना, संदर्भ खोजना, होवर पूर्वावलोकन, कुंजी ऑटोकम्प्लीशन और डायग्नोस्टिक्स कैसे लाता है।
keywords:
  - LSP
  - लैंग्वेज सर्वर
  - Go to Definition
  - ऑटोकम्प्लीशन
  - डायग्नोस्टिक्स
  - IDE
  - Intlayer
  - VS Code
  - Neovim
  - TypeScript
slugs:
  - doc
  - lsp
history:
  - version: 9.1.3
    date: 2026-08-10
    changes: "संदर्भ खोज, होवर, ऑटोकम्प्लीशन और डायग्नोस्टिक्स जोड़े गए"
  - version: 8.12.0
    date: 2026-06-01
    changes: "Release LSP"
author: aymericzip
---

# Intlayer LSP सर्वर

**Intlayer लैंग्वेज सर्वर** [Language Server Protocol (LSP)](https://microsoft.github.io/language-server-protocol/) का एक कार्यान्वयन है जो आपके IDE — और आपके AI एजेंट — को Intlayer के प्रति सजग बनाता है। यह `useIntlayer("home")` जैसे कॉल को उस `.content.ts` फ़ाइल से जोड़ता है जो उसे घोषित करती है, दोनों दिशाओं में।

---

## विशेषताएँ

| विशेषता              | शॉर्टकट             | यह क्या करता है                                                                                |
| -------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| **परिभाषा पर जाएँ**  | `F12` / `Cmd+क्लिक` | किसी डिक्शनरी कुंजी या फ़ील्ड के उपयोग से कंटेंट फ़ाइल में उसकी घोषणा पर पहुँचें               |
| **सभी संदर्भ खोजें** | `Shift+F12`         | किसी कंटेंट फ़ाइल से, उस कुंजी या फ़ील्ड का उपयोग करने वाले हर कॉल स्थान की सूची दें           |
| **होवर**             | कर्सर ले जाएँ       | फ़ाइल छोड़े बिना किसी डिक्शनरी के फ़ील्ड, या किसी फ़ील्ड का अनूदित मान देखें                   |
| **ऑटोकम्प्लीशन**     | `"` `'` `` ` `` `.` | गेटर के भीतर घोषित डिक्शनरी कुंजियाँ, और `.` के बाद या डीस्ट्रक्चरिंग में कंटेंट फ़ील्ड सुझाएँ |
| **डायग्नोस्टिक्स**   | स्वतः               | चेतावनी दें जब कोई कुंजी किसी भी कंटेंट फ़ाइल में घोषित न हो                                   |

दो अतिरिक्त व्यवहार जानने योग्य हैं:

- **मर्ज की गई डिक्शनरियाँ** — कई कंटेंट फ़ाइलों में बँटी कुंजी हर फ़ाइल के लिए एक परिणाम लौटाती है, जिससे आप हर घोषणा तक जा सकते हैं।
- **मोनोरेपो-अनुकूल** — सर्वर हर फ़ाइल के _निकटतम_ `intlayer.config.*` को हल करता है, जिससे एक ही वर्कस्पेस के कई प्रोजेक्ट्स को अपनी-अपनी डिक्शनरियाँ मिलती हैं।

### समर्थित कॉल

कुंजी या तो स्थिति-आधारित स्ट्रिंग आर्ग्युमेंट से पढ़ी जाती है, या विकल्प ऑब्जेक्ट (`{ namespace }`, `{ id }`) से।

| लाइब्रेरी                   | कॉल                                                      |
| --------------------------- | -------------------------------------------------------- |
| **Intlayer**                | `useIntlayer`, `getIntlayer`                             |
| **i18next / react-i18next** | `useTranslation`, `getFixedT`, `t`, `Trans`              |
| **next-intl / use-intl**    | `useTranslations`, `getTranslations`, `createTranslator` |
| **react-intl**              | `formatMessage`, `FormattedMessage`                      |
| **Lingui**                  | `useLingui`, `t`, `Trans`, `_`                           |
| **vue-i18n**                | `useI18n`                                                |

यह हर `*-intlayer` पैकेज (`next-intlayer`, `react-intlayer`, `vue-intlayer`, `svelte-intlayer`, `solid-intlayer`, `preact-intlayer`, `angular-intlayer`, `lit-intlayer`, `express-intlayer`, `hono-intlayer`, `fastify-intlayer`, `intlayer`) के लिए काम करता है, और उन compat अडैप्टर पैकेजों के लिए भी जो आपको अपना मौजूदा i18n सिंटैक्स बनाए रखने देते हैं।

> डिक्शनरियाँ बिल्ड आउटपुट से पढ़ी जाती हैं, इसलिए `npx intlayer build` चलाएँ — या अपना डेव सर्वर चालू रखें — ताकि सर्वर के पास हल करने को कुछ हो।

---

## इंस्टॉलेशन

सर्वर `@intlayer/lsp` में `intlayer-lsp` बाइनरी के रूप में वितरित होता है:

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

यदि आपके एडिटर को `PATH` में `intlayer-lsp` चाहिए तो इसके बजाय इसे ग्लोबली इंस्टॉल करें (`npm install -g @intlayer/lsp`) — Claude Code प्लगइन और नीचे दिए हर उस कॉन्फ़िगरेशन के लिए यही स्थिति है जो बाइनरी को सीधे कॉल करता है।

---

## सेटअप

<Tabs defaultTab="vscode">
  <Tab label="VS Code" value="vscode">

[Intlayer VS Code एक्सटेंशन](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) इंस्टॉल करें। लैंग्वेज सर्वर v8.12.0 से इसमें शामिल है और स्वतः शुरू होता है — **किसी कॉन्फ़िगरेशन की ज़रूरत नहीं**।

अन्य सुविधाओं के लिए [VS Code एक्सटेंशन दस्तावेज़](https://intlayer.org/doc/vs-code-extension) देखें।

  </Tab>
  <Tab label="Cursor / Windsurf" value="cursor">

[Cursor](https://www.cursor.com/) और [Windsurf](https://windsurf.com/) VS Code के फ़ोर्क हैं और उसी एक्सटेंशन इकोसिस्टम का उपयोग करते हैं। [Intlayer VS Code एक्सटेंशन](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) एक बार इंस्टॉल करें और सर्वर स्वतः सक्रिय हो जाता है — **किसी कॉन्फ़िगरेशन की ज़रूरत नहीं**।

  </Tab>
  <Tab label="Claude Code" value="claude-code">

Intlayer एक **Claude Code प्लगइन** देता है जो Intlayer रिपॉज़िटरी में होस्ट है। यह Claude Code को `grep` पर लौटने के बजाय आपकी डिक्शनरी कुंजियों के लिए वास्तविक सिंबल रिज़ॉल्यूशन देता है।

बाइनरी को अपने `PATH` में रखें, फिर marketplace रजिस्टर करें और प्लगइन इंस्टॉल करें:

```bash
npm install -g @intlayer/lsp

claude plugin marketplace add intlayer@github:aymericzip/intlayer
claude plugin install intlayer-lsp@intlayer
```

`install` प्लगइन को सक्षम भी कर देता है। **Claude Code पुनः आरंभ करें** — लैंग्वेज सर्वर स्टार्टअप पर लोड होते हैं, इसलिए तब तक प्लगइन का कोई असर नहीं होता।

इसके बाद Claude Code `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.astro` और `.svelte` फ़ाइलों पर सर्वर शुरू करता है, और आपके कोड में नेविगेट करते समय `goToDefinition`, `findReferences` और `hover` का उपयोग करता है।

यदि परिभाषा पर जाना अब भी काम नहीं करता, तो संभव है कि आपका Claude Code संस्करण LSP टूल को किसी फ़्लैग के पीछे रखता हो:

```json fileName="~/.claude/settings.json"
{
  "env": {
    "ENABLE_LSP_TOOL": "1"
  }
}
```

  </Tab>
  <Tab label="Zed" value="zed">

Zed में LSP का मूल समर्थन है। सर्वर को अपनी यूज़र सेटिंग्स में जोड़ें:

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
    "TypeScript": { "language_servers": ["intlayer-lsp", "..."] },
    "TSX": { "language_servers": ["intlayer-lsp", "..."] },
    "JavaScript": { "language_servers": ["intlayer-lsp", "..."] },
    "Vue.js": { "language_servers": ["intlayer-lsp", "..."] },
    "Svelte": { "language_servers": ["intlayer-lsp", "..."] }
  }
}
```

`"..."` प्लेसहोल्डर Zed के डिफ़ॉल्ट लैंग्वेज सर्वरों को Intlayer वाले के साथ बनाए रखता है।

  </Tab>
  <Tab label="Neovim" value="neovim">

[nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) का उपयोग करते हुए, एक कस्टम सर्वर कॉन्फ़िगरेशन रजिस्टर करें:

```lua fileName="~/.config/nvim/init.lua"
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.intlayer_lsp then
  configs.intlayer_lsp = {
    default_config = {
      -- सर्वर को npx से चलाएँ ताकि ग्लोबल इंस्टॉल की ज़रूरत न पड़े
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

Neovim पुनः आरंभ करने के बाद, किसी डिक्शनरी कुंजी पर `gd` परिभाषा पर जाएँ चलाता है और `gr` संदर्भ खोजें चलाता है।

  </Tab>
  <Tab label="coc.nvim" value="coc">

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

  </Tab>
  <Tab label="Helix" value="helix">

```toml fileName="~/.config/helix/languages.toml"
[language-server.intlayer-lsp]
command = "npx"
args = ["@intlayer/lsp"]

[[language]]
name = "typescript"
language-servers = ["intlayer-lsp", "typescript-language-server"]

[[language]]
name = "tsx"
language-servers = ["intlayer-lsp", "typescript-language-server"]
```

  </Tab>
  <Tab label="अन्य एडिटर" value="other">

LSP सक्षम कोई भी एडिटर `@intlayer/lsp` चला सकता है। उसे यह बताएँ:

- **एक्ज़ीक्यूटेबल** — `npx @intlayer/lsp`, या `intlayer-lsp` बाइनरी
- **ट्रांसपोर्ट** — stdio (मानक)
- **क्षमताएँ** — `definitionProvider`, `referencesProvider`, `hoverProvider`, `completionProvider` (ट्रिगर वर्ण `"` `'` `` ` `` `.`), पुश डायग्नोस्टिक्स, `textDocumentSync: Incremental`
- **रूट पैटर्न** — `intlayer.config.ts`, `intlayer.config.js`, `package.json`

सटीक कॉन्फ़िगरेशन प्रारूप के लिए अपने एडिटर का LSP दस्तावेज़ देखें।

  </Tab>
</Tabs>

---

## टर्मिनल AI एजेंट्स पर टिप्पणी

**Claude Code** एक वास्तविक LSP क्लाइंट की तरह काम करता है — ऊपर का टैब देखें।

**OpenAI Codex** और अधिकांश अन्य टर्मिनल टूल LSP क्लाइंट नहीं हैं: वे फ़ाइलें सीधे पढ़ते और लिखते हैं। सर्वर को अकेले चलाने से उन्हें मदद नहीं मिलती; लाभ तब मिलता है जब वह किसी सहयोगी एडिटर में सक्रिय हो जिसका इंडेक्स एजेंट क्वेरी कर सके (Cursor Composer, Windsurf Cascade, Copilot Chat)।

---

## यह कैसे काम करता है

हर फ़ाइल के लिए सर्वर निकटतम `intlayer.config.*` खोजता है और उस प्रोजेक्ट का कॉन्फ़िगरेशन लोड करके संकलित डिक्शनरियाँ ढूँढता है। कॉन्फ़िगरेशन, डिक्शनरियाँ और स्रोत-फ़ाइल सूची छोटे TTL के साथ कैश होती हैं, और किसी निगरानी-अधीन कंटेंट फ़ाइल के बदलते ही अमान्य कर दी जाती हैं।

अनुरोध पर, सर्वर दस्तावेज़ को ([oxc](https://oxc.rs/) के ज़रिए) पार्स करता है और कर्सर की स्थिति जाँचता है:

1. **किसी कुंजी स्ट्रिंग पर** (`useIntlayer("home")`) → उस कुंजी को घोषित करने वाली हर कंटेंट फ़ाइल लौटाता है, उसकी `key:` पंक्ति पर स्थित।
2. **किसी फ़ील्ड उपयोग पर** (`content.title`, कोई डीस्ट्रक्चर की गई प्रॉपर्टी, `t('path.to.field')`, `<Trans>`, …) → वेरिएबल को उसकी डिक्शनरी तक पीछे हल करता है और कंटेंट फ़ाइलों में संगत फ़ील्ड लौटाता है।
3. **किसी कंटेंट फ़ाइल से** → उलटी खोज चलाता है, और उस कुंजी या फ़ील्ड के कॉल स्थानों के लिए प्रोजेक्ट स्रोतों को स्कैन करता है।

---

## समस्या-निवारण

| लक्षण                                       | संभावित कारण                     | समाधान                                                                      |
| ------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| कुछ भी नहीं होता                            | सर्वर नहीं चल रहा                | जाँचें कि `@intlayer/lsp` इंस्टॉल है और आपका एडिटर उसे शुरू करता है         |
| एडिटर में काम करता है, Claude Code में नहीं | सत्र के बीच प्लगइन इंस्टॉल किया  | Claude Code पुनः आरंभ करें — लैंग्वेज सर्वर स्टार्टअप पर लोड होते हैं       |
| किसी कुंजी की परिभाषा नहीं मिलती            | डिक्शनरियाँ बिल्ड नहीं हुईं      | `npx intlayer build` चलाएँ, या अपना डेव सर्वर शुरू करें                     |
| हर कुंजी अघोषित बताई जाती है                | कॉन्फ़िगरेशन हल नहीं हुआ         | सत्यापित करें कि प्रोजेक्ट रूट में `intlayer.config.ts` (या `.js`) मौजूद है |
| मोनोरेपो में ग़लत प्रोजेक्ट उपयोग हुआ       | प्रति-पैकेज कॉन्फ़िगरेशन नहीं है | अपना कंटेंट घोषित करने वाले हर पैकेज में `intlayer.config.*` जोड़ें         |
| शुरू होते ही सर्वर क्रैश हो जाता है         | Node.js संस्करण बहुत पुराना      | Node.js ≥ 14.18 आवश्यक है                                                   |

VS Code में सर्वर **View → Output → "Intlayer LSP"** में लॉग लिखता है — यह पुष्टि करने में उपयोगी कि कौन-सा कॉन्फ़िगरेशन हल हुआ और कितनी डिक्शनरियाँ मिलीं।
