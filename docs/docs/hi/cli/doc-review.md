---
createdAt: 2024-08-11
updatedAt: 2026-06-17
title: दस्तावेज़ समीक्षा
description: विभिन्न लोकलों में गुणवत्ता, संगति, और पूर्णता के लिए दस्तावेज़ फ़ाइलों की समीक्षा कैसे करें, यह जानें।
keywords:
  - समीक्षा
  - दस्तावेज़
  - दस्तावेज़ीकरण
  - एआई
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
history:
  - version: 9.0.0
    date: 2026-06-17
    changes: "--log विकल्प जोड़ें"
author: aymericzip
---

# दस्तावेज़ समीक्षा

`doc review` कमांड विभिन्न लोकलों में दस्तावेज़ फ़ाइलों की गुणवत्ता, संगति, और पूर्णता का विश्लेषण करता है।

## मुख्य बिंदु:

- AI मॉडल की संदर्भ विंडो सीमा के भीतर रहने के लिए बड़ी markdown फ़ाइलों को चंक्स में विभाजित करता है।
- समीक्षा करने के लिए चंक्स को अनुकूलित करता है और पहले से अनुवादित और अपरिवर्तित भागों को छोड़ देता है।
- गति बढ़ाने के लिए कतार प्रणाली का उपयोग करके फ़ाइलों, चंक्स और लोकेल्स को समानांतर में संसाधित करता है।

```bash packageManager="npm"
npx intlayer doc review
```

```bash packageManager="yarn"
yarn intlayer doc review
```

```bash packageManager="pnpm"
pnpm intlayer doc review
```

```bash packageManager="bun"
bun x intlayer doc review
```

इसका उपयोग उन फ़ाइलों की समीक्षा करने के लिए किया जा सकता है जो पहले से अनुवादित हैं, और यह जांचने के लिए कि अनुवाद सही है या नहीं।

अधिकांश उपयोग मामलों के लिए,

- जब इस फ़ाइल का अनुवादित संस्करण उपलब्ध न हो तो `doc translate` का उपयोग करना प्राथमिकता दें।
- जब इस फ़ाइल का अनुवादित संस्करण पहले से मौजूद हो तो `doc review` का उपयोग करना प्राथमिकता दें।

> ध्यान दें कि समीक्षा प्रक्रिया पूरी फ़ाइल की समीक्षा के लिए अनुवाद प्रक्रिया की तुलना में अधिक एंट्री टोकन का उपयोग करती है। हालांकि, समीक्षा प्रक्रिया समीक्षा के लिए चंक्स को अनुकूलित करेगी, और उन भागों को छोड़ देगी जो बदले नहीं गए हैं।

## तर्क:

**फ़ाइल सूची विकल्प:**

- **`--doc-pattern [docPattern...]`**: दस्तावेज़ फ़ाइलों से मेल खाने के लिए ग्लोब पैटर्न जिन्हें समीक्षा किया जाना है।

  > उदाहरण: `npx intlayer doc review --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: समीक्षा से बाहर रखने के लिए ग्लोब पैटर्न।

  > उदाहरण: `npx intlayer doc review --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: यदि फ़ाइल दिए गए समय से पहले संशोधित की गई है तो उसे छोड़ दें।
  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (string या Date)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य टूल्स से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc review --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: यदि फ़ाइल दिए गए समय के भीतर संशोधित की गई है तो उसे छोड़ दें।
  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (string या Date)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य टूल्स से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc review --skip-if-modified-after "2025-12-05"`

- **`--skip-if-exists`**: यदि फ़ाइल पहले से मौजूद है तो उसे छोड़ दें।

  > उदाहरण: `npx intlayer doc review --skip-if-exists`

**समीक्षा मोड विकल्प:**

- **`--log`**: केवल-लॉग मोड। AI के साथ अनुवाद न करें; इसके बजाय उन ब्लॉक्स को लॉग करें जिन्हें ध्यान देने की आवश्यकता है (लाइन नंबर और कंटेंट के साथ) मूल और लक्षित लोकेल्स के लिए, ताकि अन्य एजेंट को अनुवाद उत्पन्न करने में मदद मिल सके।

  > उदाहरण: `npx intlayer doc review --log`

**एंट्री आउटपुट विकल्प:**

- **`--locales [locales...]`**: दस्तावेज़ीकरण की समीक्षा करने के लिए लक्षित स्थानीय भाषाएँ।

  > उदाहरण: `npx intlayer doc review --locales fr es de`

- **`--base-locale [baseLocale]`**: स्रोत स्थानीय भाषा (मूल दस्तावेज़) जिससे तुलना की जाएगी।

  > उदाहरण: `npx intlayer doc review --base-locale en`

**फ़ाइल प्रोसेसिंग विकल्प:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: समीक्षा के लिए एक साथ संसाधित की जाने वाली फ़ाइलों की संख्या।

  > उदाहरण: `npx intlayer doc review --nb-simultaneous-file-processed 5`

**AI विकल्प:**

- **`--model [model]`**: समीक्षा के लिए उपयोग किया जाने वाला AI मॉडल (जैसे, `gpt-3.5-turbo`)।
- **`--provider [provider]`**: समीक्षा के लिए उपयोग किया जाने वाला AI प्रदाता।
- **`--temperature [temperature]`**: AI मॉडल के लिए तापमान सेटिंग।
- **`--api-key [apiKey]`**: AI सेवा के लिए अपनी स्वयं की API कुंजी प्रदान करें।
- **`--application-context [applicationContext]`**: AI समीक्षा के लिए अतिरिक्त संदर्भ प्रदान करें।
- **`--data-serialization [dataSerialization]`**: Intlayer की AI सुविधाओं के लिए उपयोग किया जाने वाला डेटा सीरियलाइजेशन प्रारूप। विकल्प: `json` (मानक, विश्वसनीय), `toon` (कम टोकन, कम सुसंगत)।
- **`--custom-prompt [prompt]`**: समीक्षा के लिए उपयोग किए जाने वाले बेस प्रॉम्प्ट को कस्टमाइज़ करें। (ध्यान दें: अधिकांश उपयोग मामलों के लिए, `--custom-instructions` विकल्प की सिफारिश की जाती है क्योंकि यह बेहतर नियंत्रण प्रदान करता है।)

  > उदाहरण: `npx intlayer doc review --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file [envFile]`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें।
- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer doc review --base-dir ./docs --env-file .env.production.local`

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें। (CLI का उपयोग करते समय डिफ़ॉल्ट रूप से true)

  > उदाहरण: `npx intlayer doc review --verbose`

**कस्टम निर्देश विकल्प:**

- **`--custom-instructions [customInstructions]`**: प्रॉम्प्ट में जोड़े गए कस्टम निर्देश। फॉर्मेटिंग, URL अनुवाद आदि के संबंध में विशिष्ट नियम लागू करने के लिए उपयोगी।

  > उदाहरण: `npx intlayer doc review --custom-instructions "URLs का अनुवाद न करें, और मार्कडाउन फॉर्मेट बनाए रखें"`

  > उदाहरण: `npx intlayer doc review --custom-instructions "$(cat ./instructions.md)"`

**Git विकल्प:**

- **`--git-diff`**: केवल उन फ़ाइलों पर चलाएं जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान ब्रांच (डिफ़ॉल्ट: `HEAD`) तक परिवर्तन शामिल हैं।
- **`--git-diff-base`**: git diff के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।
- **`--git-diff-current`**: git diff के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `HEAD`)।
- **`--uncommitted`**: बिना कमिट किए गए परिवर्तनों को शामिल करें।
- **`--unpushed`**: बिना पुश किए गए परिवर्तनों को शामिल करें।
- **`--untracked`**: बिना ट्रैक किए गए फाइलों को शामिल करें।

  > उदाहरण: `npx intlayer doc review --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > उदाहरण: `npx intlayer doc review --uncommitted --unpushed --untracked`

> ध्यान दें कि आउटपुट फ़ाइल पथ निम्नलिखित पैटर्न को बदलकर निर्धारित किया जाएगा:
>
> - `/{{baseLocale}}/` को `/{{locale}}/` से (Unix)
> - `\{{baseLocale}}\` को `\{{locale}}\` से (Windows)
> - `_{{baseLocale}}.` को `_{{locale}}.` से
> - `{{baseLocale}}_` को `{{locale}}_` से
> - `.{{baseLocaleName}}.` को `.{{localeName}}.` से
>
> यदि पैटर्न नहीं मिलता है, तो आउटपुट फ़ाइल फ़ाइल के एक्सटेंशन में `.{{locale}}` जोड़ देगी। उदाहरण के लिए `./my/file.md` समीक्षा की जाएगी और फ्रेंच लोकल के लिए `./my/file.fr.md` में अपडेट होगी।
