---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: दस्तावेज़ अनुवाद करें
description: AI अनुवाद सेवाओं का उपयोग करके दस्तावेज़ फ़ाइलों को स्वचालित रूप से अनुवाद करना सीखें।
keywords:
  - अनुवाद
  - दस्तावेज़
  - प्रलेखन
  - AI
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-translate
---

# दस्तावेज़ अनुवाद करें

`doc translate` कमांड AI अनुवाद सेवाओं का उपयोग करके दस्तावेज़ फ़ाइलों को एक मूल locale से लक्षित locale में स्वचालित रूप से अनुवाद करता है।

## मुख्य बिंदु:

- AI मॉडल की संदर्भ विंडो सीमा के भीतर रहने के लिए बड़ी markdown फ़ाइलों को चंक्स में विभाजित करता है।
- यदि आउटपुट प्रारूप गलत है तो अनुवाद को पुनः प्रयास करता है।
- अनुवाद सटीकता में सुधार के लिए एप्लिकेशन और फ़ाइल-विशिष्ट संदर्भ को शामिल करता है।
- मौजूदा अनुवादों को अधिलेखित न करके उन्हें संरक्षित करता है।
- गति बढ़ाने के लिए कतार प्रणाली का उपयोग करके फ़ाइलों, चंक्स और लोकेल्स को समानांतर में संसाधित करता है।

```bash
npx intlayer doc translate
```

## तर्क:

**फ़ाइल सूची विकल्प:**

- **`--doc-pattern [docPattern...]`**: दस्तावेज़ फ़ाइलों से मेल खाने के लिए ग्लोब पैटर्न जिन्हें अनुवादित किया जाना है।

  > उदाहरण: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: अनुवाद से बाहर रखने के लिए ग्लोब पैटर्न।

  > उदाहरण: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: यदि फ़ाइल दिए गए समय से पहले संशोधित की गई है तो उसे छोड़ दें।
  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (string या Date)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य टूल्स से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: यदि फ़ाइल दिए गए समय के भीतर संशोधित की गई है तो उसे छोड़ दें।
  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (string या Date)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य टूल्स से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: यदि फ़ाइल पहले से मौजूद है तो उसे छोड़ दें।

  > उदाहरण: `npx intlayer doc translate --skip-if-exists`

**एंट्री आउटपुट विकल्प:**

- **`--locales [locales...]`**: दस्तावेज़ीकरण का अनुवाद करने के लिए लक्षित स्थानीय भाषाएँ।

  > उदाहरण: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: स्रोत स्थानीय भाषा जिससे अनुवाद किया जाएगा।

  > उदाहरण: `npx intlayer doc translate --base-locale en`

**फ़ाइल प्रोसेसिंग विकल्प:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: अनुवाद के लिए एक साथ संसाधित की जाने वाली फ़ाइलों की संख्या।

  > उदाहरण: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**AI विकल्प:**

- **`--model [model]`**: अनुवाद के लिए उपयोग किया जाने वाला AI मॉडल (जैसे, `gpt-3.5-turbo`)।
- **`--provider [provider]`**: अनुवाद के लिए उपयोग किया जाने वाला AI प्रदाता।
- **`--temperature [temperature]`**: AI मॉडल के लिए तापमान सेटिंग।
- **`--api-key [apiKey]`**: AI सेवा के लिए अपनी स्वयं की API कुंजी प्रदान करें।
- **`--application-context [applicationContext]`**: AI अनुवाद के लिए अतिरिक्त संदर्भ प्रदान करें।
- **`--custom-prompt [prompt]`**: अनुवाद के लिए उपयोग किए जाने वाले बेस प्रॉम्प्ट को कस्टमाइज़ करें। (ध्यान दें: अधिकांश उपयोग मामलों के लिए, `--custom-instructions` विकल्प की सिफारिश की जाती है क्योंकि यह अनुवाद व्यवहार पर बेहतर नियंत्रण प्रदान करता है।)

  > उदाहरण: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file [envFile]`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें।
- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें। (CLI का उपयोग करते समय डिफ़ॉल्ट रूप से true)

  > उदाहरण: `npx intlayer doc translate --verbose`

**कस्टम निर्देश विकल्प:**

- **`--custom-instructions [customInstructions]`**: प्रॉम्प्ट में जोड़े गए कस्टम निर्देश। फॉर्मेटिंग, URL अनुवाद आदि के संबंध में विशिष्ट नियम लागू करने के लिए उपयोगी।
  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (string या Date)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य टूल्स से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc translate --custom-instructions "URLs का अनुवाद न करें, और मार्कडाउन फॉर्मेट बनाए रखें"`

  > उदाहरण: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**Git विकल्प:**

- **`--git-diff`**: केवल उन शब्दकोशों पर चलाएं जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान ब्रांच (डिफ़ॉल्ट: `HEAD`) तक परिवर्तन शामिल हैं।
- **`--git-diff-base`**: git diff के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।
- **`--git-diff-current`**: git diff के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `HEAD`)।
- **`--uncommitted`**: बिना कमिट किए गए परिवर्तनों को शामिल करें।
- **`--unpushed`**: बिना पुश किए गए परिवर्तनों को शामिल करें।
- **`--untracked`**: बिना ट्रैक किए गए फाइलों को शामिल करें।

  > उदाहरण: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > उदाहरण: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> ध्यान दें कि आउटपुट फ़ाइल पथ निम्नलिखित पैटर्न को बदलकर निर्धारित किया जाएगा
>
> - `/{{baseLocale}}/` को `/{{locale}}/` से (Unix)
> - `\{{baseLocale}}\` को `\{{locale}}\` से (Windows)
> - `_{{baseLocale}}.` को `_{{locale}}.` से
> - `{{baseLocale}}_` को `{{locale}}_` से
> - `.{{baseLocaleName}}.` को `.{{localeName}}.` से
>
> यदि पैटर्न नहीं मिलता है, तो आउटपुट फ़ाइल फ़ाइल के एक्सटेंशन में `.{{locale}}` जोड़ देगी। उदाहरण के लिए `./my/file.md` फ्रेंच लोकल के लिए `./my/file.fr.md` में अनुवादित होगा।
