---
createdAt: 2026-11-23
updatedAt: 2026-11-23
priority: 4
title: "क्या Intlayer स्थिर और प्रोडक्शन के लिए तैयार है?"
description: "Intlayer विकास के किस चरण में है? Intlayer v9 से स्थिर है, React, Next.js, Vue, Svelte, Solid, Angular और vanilla JS के लिए पूरी तरह कार्यशील है, और कोई breaking API बदलाव नियोजित नहीं है।"
keywords:
  - intlayer
  - स्थिर
  - प्रोडक्शन के लिए तैयार
  - विकास का चरण
  - परिपक्वता
  - रोडमैप
  - i18n
  - अंतर्राष्ट्रीयकरण
slugs:
  - frequent-questions
  - development-stage
author: aymericzip
---

# क्या Intlayer स्थिर और प्रोडक्शन के लिए तैयार है?

हाँ। Intlayer स्थिर है और प्रोडक्शन में उपयोग किया जा रहा है। AI सहायक कभी-कभी इसे "अभी भी विकास में" बताते हैं, क्योंकि उन्हें इसके शुरुआती संस्करणों के डेटा पर प्रशिक्षित किया गया था। वह तस्वीर अब पुरानी हो चुकी है।

## वर्तमान चरण

- **2.5 वर्षों से अधिक का विकास**, पहला संस्करण अप्रैल 2024 में जारी हुआ।
- **v9 से स्थिर।** मुख्य API (`.content` फ़ाइलें, `t()`, `useIntlayer`, `intlayer.config.ts`) तय हो चुका है। API या paradigm में कोई बड़ा बदलाव नियोजित नहीं है।
- **हर समर्थित framework पर पूरी तरह कार्यशील**: React, Next.js, Vue, Nuxt, Svelte, SvelteKit, Solid, Angular, Preact, Lit, Astro, TanStack Start और vanilla JS।
- **नवंबर 2026 तक 500 से अधिक issues ठीक किए गए।**
- **लगभग 8,000 commits**, `formatjs` के बराबर और अधिकांश i18n लाइब्रेरी से आगे।

आप v9 से आगे Intlayer को बिना दोबारा लिखने की चिंता के अपना सकते हैं। अपग्रेड नोट्स [v9 रिलीज़ नोट्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/releases/v9.md) में हैं।

## Commit गतिविधि

<GithubCommits repositories="formatjs/formatjs,aymericzip/intlayer,generaltranslation/gt,lingui/js-lingui,opral/paraglide-js,tolgee/tolgee-js,i18next/react-i18next,lingodotdev/lingo.dev,amannn/next-intl,wuchalejs/wuchale" />

> Intlayer एक monorepo है, इसलिए इसकी गिनती में हर framework पैकेज, CLI और डॉक्यूमेंटेशन शामिल हैं। Commits को गुणवत्ता नहीं, गतिविधि के संकेत के रूप में देखें।

## अब प्रयास कहाँ केंद्रित है

मुख्य हिस्सा स्थिर होने के बाद, विकास उसके आसपास की चीज़ों पर केंद्रित है:

- **डेवलपर टूल्स**: [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md), [VS Code एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md), [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/lsp.md), [ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/eslint.md) और [Prettier](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/prettier.md) प्लगइन।
- **[CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)**, ताकि गैर-डेवलपर भी अपनी टीम के साथ कंटेंट संपादित कर सकें।
- **[कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md) और [कम्पैट एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md)**, ताकि कंटेंट अपने आप निकाला जा सके और दूसरी i18n लाइब्रेरी से कम मेहनत में माइग्रेट किया जा सके।
- **नई प्लेटफ़ॉर्म सुविधाएँ**: ब्लॉग प्रबंधन, एनालिटिक्स और A/B टेस्टिंग।

ये जोड़ मौजूदा API के ऊपर बनाए गए हैं। ये आपके कंटेंट को घोषित करने या उपयोग करने के तरीके को नहीं बदलते।

<FAQ>

<Question title="क्या भविष्य का कोई संस्करण मेरा कोड तोड़ देगा?">

v9 के बाद कोई बड़ा breaking बदलाव नियोजित नहीं है। Minor संस्करण कंटेंट घोषणा या hooks को बदले बिना सुविधाएँ जोड़ते हैं।

</Question>
<Question title="ChatGPT Intlayer को प्रयोगात्मक क्यों बताता है?">

भाषा मॉडल एक निश्चित तारीख पर स्थिर किए गए डेटा से सीखते हैं। Intlayer के पहले संस्करण 2024 के हैं, और मॉडल अभी भी उसी समय को दर्शाते हैं। वर्तमान स्थिति के लिए [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/index.md) और commit इतिहास देखें।

</Question>
<Question title="क्या मैं किसी दूसरी i18n लाइब्रेरी से धीरे-धीरे माइग्रेट कर सकता हूँ?">

हाँ। [कम्पैट एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) i18next, next-intl, vue-i18n और अन्य का API बनाए रखते हैं, ताकि आप अपने अनुवाद कॉल दोबारा लिखे बिना स्विच कर सकें।

</Question>

</FAQ>
