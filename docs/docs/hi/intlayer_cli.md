---
createdAt: 2024-08-11
updatedAt: 2025-07-11
title: CLI
description: Intlayer CLI का उपयोग करके अपनी बहुभाषी वेबसाइट का प्रबंधन कैसे करें यह जानें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपना प्रोजेक्ट सेटअप करें।
keywords:
  - CLI
  - कमांड लाइन इंटरफ़ेस
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
---

# Intlayer CLI

## पैकेज इंस्टॉल करें

npm का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

> यदि `intlayer` पैकेज पहले से इंस्टॉल है, तो CLI अपने आप इंस्टॉल हो जाएगा। आप इस चरण को छोड़ सकते हैं।

## intlayer-cli पैकेज

`intlayer-cli` पैकेज आपके [intlayer घोषणाओं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/get_started.md) को शब्दकोशों में ट्रांसपाइल करने का उद्देश्य रखता है।

यह पैकेज सभी intlayer फाइलों को ट्रांसपाइल करेगा, जैसे कि `src/**/*.content.{ts|js|mjs|cjs|json}`। [देखें कि अपने Intlayer घोषणा फाइलों को कैसे घोषित करें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

intlayer शब्दकोशों को इंटरप्रेट करने के लिए आप इंटरप्रेटर का उपयोग कर सकते हैं, जैसे कि [react-intlayer](https://www.npmjs.com/package/react-intlayer), या [next-intlayer](https://www.npmjs.com/package/next-intlayer)।

## कॉन्फ़िगरेशन फ़ाइल समर्थन

Intlayer कई कॉन्फ़िगरेशन फ़ाइल प्रारूप स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

उपलब्ध लोकल्स या अन्य पैरामीटर को कॉन्फ़िगर करने के लिए, कृपया [यहाँ कॉन्फ़िगरेशन दस्तावेज़ देखें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)।

## intlayer कमांड चलाएँ

### शब्दकोश बनाएं

अपने शब्दकोश बनाने के लिए, आप निम्न कमांड चला सकते हैं:

```bash
npx intlayer build
```

या वॉच मोड में

```bash
npx intlayer build --watch
```

यह कमांड डिफ़ॉल्ट रूप से आपकी घोषणा सामग्री फ़ाइलों को `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` के रूप में खोजेगा। और `.intlayer` डायरेक्टरी में शब्दकोश बनाएगा।

##### उपनाम:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### शब्दकोश पुश करें

```bash
bash
npx intlayer dictionary push
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) स्थापित है, तो आप शब्दकोशों को संपादक में भी पुश कर सकते हैं। यह कमांड शब्दकोशों को [संपादक](https://intlayer.org/dashboard) के लिए उपलब्ध कराएगा। इस तरह, आप अपने शब्दकोशों को अपनी टीम के साथ साझा कर सकते हैं और अपने एप्लिकेशन के कोड को संपादित किए बिना अपनी सामग्री को संपादित कर सकते हैं।

##### उपनाम:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### तर्क:

**शब्दकोश विकल्प:**

- **`-d`, `--dictionaries`**: पुल करने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश पुश किए जाएंगे।

  > उदाहरण: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: परियोजना के लिए बेस डायरेक्टरी निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस डायरेक्टरी में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)। यह उपयोगी होता है जब आप अपनी intlayer कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर का उपयोग करते हैं।
- **`--env-file`**: चर लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें। यह उपयोगी होता है जब आप अपनी intlayer कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर का उपयोग करते हैं।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`
  > उदाहरण: `npx intlayer dictionary push --env production`

**आउटपुट विकल्प:**

- **`-r`, `--delete-locale-dictionary`**: जब डिक्शनरी पुश हो जाएं, तो लोकल डायरेक्टरीज़ को हटाने के लिए पूछे जाने वाले प्रश्न को छोड़ दें, और उन्हें हटा दें। डिफ़ॉल्ट रूप से, यदि डिक्शनरी स्थानीय रूप से परिभाषित है, तो यह दूरस्थ डिक्शनरी की सामग्री को ओवरराइट कर देगा।

  > उदाहरण: `npx intlayer dictionary push -r`
  > उदाहरण: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: जब डिक्शनरी पुश हो जाएं, तो लोकल डायरेक्टरीज़ को हटाने के लिए पूछे जाने वाले प्रश्न को छोड़ दें, और उन्हें बनाए रखें। डिफ़ॉल्ट रूप से, यदि डिक्शनरी स्थानीय रूप से परिभाषित है, तो यह दूरस्थ डिक्शनरी की सामग्री को ओवरराइट कर देगा।

  > उदाहरण: `npx intlayer dictionary push -k`
  > उदाहरण: `npx intlayer dictionary push --keep-locale-dictionary`

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

**गिट विकल्प:**

- **`--git-diff`**: केवल उन डिक्शनरीज़ पर चलाएं जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान ब्रांच (डिफ़ॉल्ट: `HEAD`) तक परिवर्तन शामिल हैं।
- **`--git-diff-base`**: गिट डिफ़ के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।
- **`--git-diff-current`**: गिट डिफ़ के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट: `HEAD`)।
- **`--uncommitted`**: बिना कमिट किए गए परिवर्तनों को शामिल करें।
- **`--unpushed`**: बिना पुश किए गए परिवर्तनों को शामिल करें।
- **`--untracked`**: बिना ट्रैक किए गए फाइलों को शामिल करें।

  > उदाहरण: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > उदाहरण: `npx intlayer dictionary push --uncommitted --unpushed --untracked`

### दूरस्थ डिक्शनरी खींचें

```bash
npx intlayer pull
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) स्थापित है, तो आप संपादक से भी डिक्शनरी खींच सकते हैं। इस तरह, आप अपनी एप्लिकेशन की आवश्यकता के लिए अपनी डिक्शनरी की सामग्री को अधिलेखित कर सकते हैं।

##### उपनाम:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### तर्क:

**डिक्शनरी विकल्प:**

- **`-d, --dictionaries`**: खींचने के लिए डिक्शनरी के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी डिक्शनरी खींची जाएंगी।
  > उदाहरण: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस निर्देशिका में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file`**: वेरिएबल लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस निर्देशिका में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`
  > उदाहरण: `npx intlayer dictionary push --env production`

**आउटपुट विकल्प:**

- **`--new-dictionaries-path`**: उस निर्देशिका का पथ जहाँ नए शब्दकोश सहेजे जाएंगे। यदि निर्दिष्ट नहीं किया गया है, तो नए शब्दकोश परियोजना की `./intlayer-dictionaries` निर्देशिका में सहेजे जाएंगे। यदि आपके शब्दकोश सामग्री में `filePath` फ़ील्ड निर्दिष्ट है, तो शब्दकोश इस तर्क को ध्यान में नहीं रखेंगे और निर्दिष्ट `filePath` निर्देशिका में सहेजे जाएंगे।

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

##### उदाहरण:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### शब्दकोश भरें / ऑडिट करें / अनुवाद करें

```bash
npx intlayer fill
```

यह कमांड आपकी सामग्री घोषणा फ़ाइलों का विश्लेषण संभावित समस्याओं के लिए करता है जैसे कि अनुवाद की कमी, संरचनात्मक असंगतियाँ, या प्रकार में असंगतताएँ। यदि यह कोई समस्या पाता है, तो **intlayer fill** आपके शब्दकोशों को सुसंगत और पूर्ण बनाए रखने के लिए अपडेट प्रस्तावित या लागू करेगा।

##### उपनाम:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### तर्क:

**फ़ाइल सूची विकल्प:**

- **`-f, --file [files...]`**: ऑडिट करने के लिए विशिष्ट सामग्री घोषणा फ़ाइलों की सूची। यदि प्रदान नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन फ़ाइल सेटअप के आधार पर सभी खोजे गए `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` ऑडिट किए जाएंगे।

  > उदाहरण: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: कुंजियों के आधार पर शब्दकोशों को फ़िल्टर करें। यदि प्रदान नहीं किया गया है, तो सभी शब्दकोशों का ऑडिट किया जाएगा।

  > उदाहरण: `npx intlayer dictionary fill -k key1 key2`

- **`--excluded-keys [excludedKeys...]`**: कुंजियों के आधार पर शब्दकोशों को बाहर करें। यदि प्रदान नहीं किया गया है, तो सभी शब्दकोशों का ऑडिट किया जाएगा।

  > उदाहरण: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--path-filter [pathFilters...]`**: फ़ाइल पथों के लिए ग्लोब पैटर्न के आधार पर शब्दकोशों को फ़िल्टर करें।

  > उदाहरण: `npx intlayer dictionary fill --path-filter "src/home/**"`

**प्रविष्टि आउटपुट विकल्प:**

- **`--source-locale [sourceLocale]`**: अनुवाद के लिए स्रोत लोकल। यदि निर्दिष्ट नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन से डिफ़ॉल्ट लोकल का उपयोग किया जाएगा।

- **`--output-locales [outputLocales...]`**: लक्षित लोकल जिन्हें अनुवादित किया जाना है। यदि निर्दिष्ट नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन से सभी लोकल का उपयोग किया जाएगा सिवाय स्रोत लोकल के।

- **`--mode [mode]`**: अनुवाद मोड: 'complete' (पूर्ण), 'review' (समीक्षा), या 'missing-only' (केवल अनुपस्थित)। डिफ़ॉल्ट 'missing-only' है।

**Git विकल्प:**

- **`--git-diff`**: केवल उन शब्दकोशों पर चलाएं जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान शाखा (डिफ़ॉल्ट: `HEAD`) तक परिवर्तन शामिल हैं।
- **`--git-diff-base`**: git diff के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।
- **`--git-diff-current`**: git diff के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट: `HEAD`)।
- **`--uncommitted`**: बिना कमिट किए गए परिवर्तनों को शामिल करें।
- **`--unpushed`**: बिना पुश किए गए परिवर्तनों को शामिल करें।
- **`--untracked`**: बिना ट्रैक किए गए फ़ाइलों को शामिल करें।

  > उदाहरण: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > उदाहरण: `npx intlayer doc translate --uncommitted --unpushed --untracked`

**AI विकल्प:**

- **`--model [model]`**: अनुवाद के लिए उपयोग किया जाने वाला AI मॉडल (जैसे, `gpt-3.5-turbo`)।
- **`--provider [provider]`**: अनुवाद के लिए उपयोग किया जाने वाला AI प्रदाता।
- **`--temperature [temperature]`**: AI मॉडल के लिए तापमान सेटिंग।
- **`--api-key [apiKey]`**: AI सेवा के लिए अपना API कुंजी प्रदान करें।
- **`--custom-prompt [prompt]`**: अपने अनुवाद निर्देशों के लिए एक कस्टम प्रॉम्प्ट प्रदान करें।
- **`--application-context [applicationContext]`**: AI अनुवाद के लिए अतिरिक्त संदर्भ प्रदान करें।

  > उदाहरण: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "मेरी एप्लिकेशन एक बिल्ली की दुकान है"`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file [envFile]`**: चर लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।

  > उदाहरण: `npx intlayer fill --env-file .env.production.local`
  > उदाहरण: `npx intlayer fill --env production`

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें।

  > उदाहरण: `npx intlayer fill --base-dir ./src`

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

##### उदाहरण:

```bash
bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

यह कमांड `src/home/` निर्देशिका में सभी कंटेंट घोषणा फ़ाइलों के लिए अंग्रेज़ी से फ्रेंच और स्पेनिश में सामग्री का अनुवाद GPT-3.5 टर्बो मॉडल का उपयोग करके करेगा।

### कॉन्फ़िगरेशन प्रबंधित करें

#### कॉन्फ़िगरेशन प्राप्त करें

`configuration get` कमांड Intlayer के लिए वर्तमान कॉन्फ़िगरेशन प्राप्त करता है, विशेष रूप से लोकल सेटिंग्स। यह आपकी सेटअप की पुष्टि करने के लिए उपयोगी है।

```bash
npx intlayer configuration get
```

##### उपनाम:

- `npx intlayer config get`
- `npx intlayer conf get`

##### तर्क:

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file`**: चर लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: परियोजना के लिए बेस डायरेक्टरी निर्दिष्ट करें।
- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

#### कॉन्फ़िगरेशन पुश करें

`configuration push` कमांड आपकी कॉन्फ़िगरेशन को Intlayer CMS और एडिटर पर अपलोड करता है। यह कदम Intlayer विज़ुअल एडिटर में दूरस्थ शब्दकोशों के उपयोग को सक्षम करने के लिए आवश्यक है।

```bash
npx intlayer configuration push
```

##### उपनाम:

- `npx intlayer config push`
- `npx intlayer conf push`

##### तर्क:

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: परियोजना के लिए बेस डायरेक्टरी निर्दिष्ट करें।
- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

कॉन्फ़िगरेशन को पुश करने से, आपकी परियोजना पूरी तरह से Intlayer CMS के साथ एकीकृत हो जाती है, जो टीमों के बीच निर्बाध शब्दकोश प्रबंधन को सक्षम बनाती है।

### दस्तावेज़ प्रबंधन

`doc` कमांड कई स्थानीय भाषाओं में दस्तावेज़ फ़ाइलों के प्रबंधन और अनुवाद के लिए उपकरण प्रदान करते हैं।

#### दस्तावेज़ अनुवाद करें

`doc translate` कमांड AI अनुवाद सेवाओं का उपयोग करके दस्तावेज़ फ़ाइलों को एक मूल स्थानीय भाषा से लक्षित स्थानीय भाषाओं में स्वचालित रूप से अनुवादित करता है।

```bash
npx intlayer doc translate
```

##### तर्क:

**फ़ाइल सूची विकल्प:**

- **`--doc-pattern [docPattern...]`**: दस्तावेज़ फ़ाइलों से मेल खाने के लिए ग्लोब पैटर्न जिन्हें अनुवादित किया जाना है।

  > उदाहरण: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`

- **`--excluded-glob-pattern [excludedGlobPattern...]`**: अनुवाद से बाहर करने के लिए ग्लोब पैटर्न।

  > उदाहरण: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`

- **`--skip-if-modified-before [skipIfModifiedBefore]`**: यदि फ़ाइल दिए गए समय से पहले संशोधित की गई है तो उसे छोड़ दें।

  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (स्ट्रिंग या Date)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य टूल्स से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc translate --skip-if-modified-before "2025-12-05"`

- **`--skip-if-modified-after [skipIfModifiedAfter]`**: यदि फ़ाइल दिए गए समय के भीतर संशोधित की गई है तो उसे छोड़ दें।

  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (स्ट्रिंग या Date)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य उपकरणों से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc translate --skip-if-modified-after "2025-12-05"`

**एंट्री आउटपुट विकल्प:**

- **`--locales [locales...]`**: दस्तावेज़ीकरण को अनुवादित करने के लिए लक्षित स्थानीय भाषाएँ।

  > उदाहरण: `npx intlayer doc translate --locales fr es de`

- **`--base-locale [baseLocale]`**: स्रोत स्थानीय भाषा जिससे अनुवाद किया जाएगा।

  > उदाहरण: `npx intlayer doc translate --base-locale en`

**फ़ाइल प्रोसेसिंग विकल्प:**

- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: अनुवाद के लिए एक साथ संसाधित की जाने वाली फ़ाइलों की संख्या।

  > उदाहरण: `npx intlayer doc translate --nb-simultaneous-file-processed 5`

**एआई विकल्प:**

- **`--model [model]`**: अनुवाद के लिए उपयोग किया जाने वाला एआई मॉडल (जैसे, `gpt-3.5-turbo`)।
- **`--provider [provider]`**: अनुवाद के लिए उपयोग किया जाने वाला एआई प्रदाता।
- **`--temperature [temperature]`**: एआई मॉडल के लिए तापमान सेटिंग।
- **`--api-key [apiKey]`**: एआई सेवा के लिए अपनी खुद की API कुंजी प्रदान करें।
- **`--application-context [applicationContext]`**: एआई अनुवाद के लिए अतिरिक्त संदर्भ प्रदान करें।
- **`--custom-prompt [prompt]`**: अनुवाद के लिए उपयोग किए जाने वाले बेस प्रॉम्प्ट को कस्टमाइज़ करें। (नोट: अधिकांश उपयोग मामलों के लिए, `--custom-instructions` विकल्प की सिफारिश की जाती है क्योंकि यह अनुवाद व्यवहार पर बेहतर नियंत्रण प्रदान करता है।)

  > उदाहरण: `npx intlayer doc translate --model deepseek-chat --provider deepseek --temperature 0.5 --api-key sk-1234567890 --application-context "मेरी एप्लिकेशन एक बिल्ली की दुकान है"`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file [envFile]`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें।

  > उदाहरण: `npx intlayer doc translate --base-dir ./docs --env-file .env.production.local`

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

  > उदाहरण: `npx intlayer doc translate --verbose`

**कस्टम निर्देश विकल्प:**

- **`--custom-instructions [customInstructions]`**: प्रॉम्प्ट में जोड़े गए कस्टम निर्देश। फॉर्मेटिंग, URL अनुवाद आदि के संबंध में विशिष्ट नियम लागू करने के लिए उपयोगी।

  - यह एक निश्चित समय हो सकता है जैसे "2025-12-05" (स्ट्रिंग या डेट)
  - यह एक सापेक्ष समय हो सकता है मिलीसेकंड में `1 * 60 * 60 * 1000` (1 घंटा)
  - यह विकल्प `fs.stat` मेथड का उपयोग करके फ़ाइल के अपडेट समय की जांच करता है। इसलिए यह Git या अन्य टूल्स से प्रभावित हो सकता है जो फ़ाइल को संशोधित करते हैं।

  > उदाहरण: `npx intlayer doc translate --custom-instructions "URLs का अनुवाद न करें, और मार्कडाउन फॉर्मेट बनाए रखें"`
  > उदाहरण: `npx intlayer doc translate --custom-instructions "$(cat ./instructions.md)"`

**गिट विकल्प:**

- **`--git-diff`**: केवल उन शब्दकोशों पर चलाएं जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान शाखा (डिफ़ॉल्ट: `HEAD`) तक परिवर्तन शामिल हैं।
- **`--git-diff-base`**: गिट डिफ़ के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।
- **`--git-diff-current`**: गिट डिफ़ के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट: `HEAD`)।
- **`--uncommitted`**: बिना कमिट किए गए परिवर्तनों को शामिल करें।
- **`--unpushed`**: बिना पुश किए गए परिवर्तनों को शामिल करें।
- **`--untracked`**: बिना ट्रैक किए गए फाइलों को शामिल करें।

  > उदाहरण: `npx intlayer doc translate --git-diff --git-diff-base origin/main --git-diff-current HEAD`
  > उदाहरण: `npx intlayer doc translate --uncommitted --unpushed --untracked`

> ध्यान दें कि आउटपुट फ़ाइल पथ निम्नलिखित पैटर्न को बदलकर निर्धारित किया जाएगा
>
> - `/{{baseLocale}}/` को `/{{locale}}/` से बदलें (Unix)
> - `\{{baseLocale}}\` को `\{{locale}}\` से बदलें (Windows)
> - `_{{baseLocale}}.` को `_{{locale}}.` से बदलें
> - `{{baseLocale}}_` को `{{locale}}_` से बदलें
> - `.{{baseLocaleName}}.` को `.{{localeName}}.` से बदलें
>
> यदि पैटर्न नहीं मिला, तो आउटपुट फ़ाइल फ़ाइल के एक्सटेंशन में `.{{locale}}` जोड़ देगी। उदाहरण के लिए, `./my/file.md` फ्रेंच लोकल के लिए `./my/file.fr.md` में अनुवादित होगा।

#### दस्तावेज़ समीक्षा

`doc review` कमांड विभिन्न लोकल्स में गुणवत्ता, सुसंगतता, और पूर्णता के लिए दस्तावेज़ फ़ाइलों का विश्लेषण करता है।

```bash
npx intlayer doc review
```

यह उन फ़ाइलों की समीक्षा करने के लिए उपयोग किया जा सकता है जो पहले से अनुवादित हैं, और यह जांचने के लिए कि अनुवाद सही है या नहीं।

अधिकांश उपयोग मामलों के लिए,

- जब इस फ़ाइल का अनुवादित संस्करण उपलब्ध न हो तो `doc translate` का उपयोग करना बेहतर होता है।
- जब इस फ़ाइल का अनुवादित संस्करण पहले से मौजूद हो तो `doc review` का उपयोग करना बेहतर होता है।

> ध्यान दें कि समीक्षा प्रक्रिया पूरी फ़ाइल की समीक्षा के लिए अनुवाद प्रक्रिया की तुलना में अधिक एंट्री टोकन का उपयोग करती है। हालांकि, समीक्षा प्रक्रिया समीक्षा के लिए चंक्स को अनुकूलित करेगी, और उन हिस्सों को छोड़ देगी जो बदले नहीं गए हैं।

##### तर्क:

`doc review` कमांड `doc translate` के समान तर्क स्वीकार करता है, जिससे आप विशिष्ट दस्तावेज़ फ़ाइलों की समीक्षा कर सकते हैं और गुणवत्ता जांच लागू कर सकते हैं।

यदि आपने गिट विकल्पों में से किसी एक को सक्रिय किया है, तो कमांड केवल उन फ़ाइलों के हिस्से की समीक्षा करेगा जो बदले जा रहे हैं। स्क्रिप्ट फ़ाइल को टुकड़ों में विभाजित करके प्रत्येक टुकड़े की समीक्षा करेगी। यदि किसी टुकड़े में कोई बदलाव नहीं है, तो स्क्रिप्ट समीक्षा प्रक्रिया को तेज़ करने और AI प्रदाता API लागत को सीमित करने के लिए उसे छोड़ देगी।

## अपने `package.json` में intlayer कमांड का उपयोग करें

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

## CLI SDK

CLI SDK एक लाइब्रेरी है जो आपको अपने कोड में Intlayer CLI का उपयोग करने की अनुमति देती है।

```bash packageManager="npm"
npm install @intlayer/cli --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/cli --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli --save-dev
```

उपयोग का उदाहरण:

```ts
import {
  push,
  pull,
  fill,
  build,
  docTranslate,
  docReview,
} from "@intlayer/cli";

push();
// ...
pull();
// ...
fill();
// ...
build();
// ...
docTranslate();
// ...
docReview();
// ...
```

## intlayer कमांड डिबग करें

### 1. **सुनिश्चित करें कि आप नवीनतम संस्करण का उपयोग कर रहे हैं**

चलाएँ:

```bash
npx intlayer --version                  # वर्तमान स्थानीय intlayer संस्करण
npx intlayer@latest --version           # वर्तमान नवीनतम intlayer संस्करण
```

### 2. **जांचें कि कमांड पंजीकृत है या नहीं**

आप निम्नलिखित से जांच सकते हैं:

```bash
npx intlayer --help                     # उपलब्ध कमांड और उपयोग जानकारी की सूची दिखाता है
npx intlayer dictionary build --help    # किसी कमांड के लिए उपलब्ध विकल्पों की सूची दिखाता है
```

### 3. **अपने टर्मिनल को पुनः प्रारंभ करें**

कभी-कभी नए कमांड को पहचानने के लिए टर्मिनल को पुनः प्रारंभ करना आवश्यक होता है।

### 4. **npx कैश साफ़ करें (यदि आप पुराने संस्करण में फंसे हुए हैं)**

```bash
npx clear-npx-cache
```

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                                    |
| ------- | ---------- | ------------------------------------------- |
| 5.5.11  | 2025-07-11 | CLI कमांड पैरामीटर दस्तावेज़ीकरण अपडेट करें |
| 5.5.10  | 2025-06-29 | इतिहास प्रारंभ करें                         |
