---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: CLI
description: अपने बहुभाषी वेबसाइट को प्रबंधित करने के लिए Intlayer CLI का उपयोग कैसे करें, यह जानें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपने प्रोजेक्ट को सेट अप करें।
keywords:
  - CLI
  - कमांड लाइन इंटरफ़ेस
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - जावास्क्रिप्ट
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

> यदि `intlayer` पैकेज पहले से इंस्टॉल है, तो CLI स्वचालित रूप से इंस्टॉल हो जाता है। आप इस चरण को छोड़ सकते हैं।

## intlayer-cli पैकेज

`intlayer-cli` पैकेज आपके [intlayer घोषणाओं](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/get_started.md) को शब्दकोशों में ट्रांसपाइल करने के लिए बनाया गया है।

यह पैकेज सभी intlayer फाइलों को ट्रांसपाइल करेगा, जैसे कि `src/**/*.content.{ts|js|mjs|cjs|json}`। [देखें कि आप अपने Intlayer घोषणा फाइलों को कैसे घोषित करें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

intlayer शब्दकोशों को इंटरप्रेट करने के लिए आप इंटरप्रेटर का उपयोग कर सकते हैं, जैसे कि [react-intlayer](https://www.npmjs.com/package/react-intlayer), या [next-intlayer](https://www.npmjs.com/package/next-intlayer)।

## कॉन्फ़िगरेशन फ़ाइल समर्थन

Intlayer कई कॉन्फ़िगरेशन फ़ाइल प्रारूप स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

उपलब्ध भाषाओं या अन्य पैरामीटर को कॉन्फ़िगर करने के लिए, [कॉन्फ़िगरेशन दस्तावेज़ यहाँ देखें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)।

## CLI SDK

CLI SDK एक लाइब्रेरी है जो आपको अपने कोड में Intlayer CLI का उपयोग करने की अनुमति देती है।

```bash packageManager="npm"
npm install @intlayer/cli -D
```

```bash packageManager="yarn"
yarn add @intlayer/cli -D
```

```bash packageManager="pnpm"
pnpm add @intlayer/cli -D
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

## intlayer कमांड चलाएँ

### शब्दकोश बनाएं

अपने शब्दकोश बनाने के लिए, आप निम्नलिखित कमांड चला सकते हैं:

```bash
npx intlayer build
```

या वॉच मोड में

```bash
npx intlayer build --watch
```

यह कमांड डिफ़ॉल्ट रूप से आपकी घोषणा सामग्री फ़ाइलों को `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` के रूप में खोजेगा। और `.intlayer` निर्देशिका में शब्दकोश बनाएगा।

##### उपनाम (Aliases):

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

### शब्दकोश पुश करें

```bash
npx intlayer dictionary push
```

यदि [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) इंस्टॉल है, तो आप शब्दकोशों को संपादक में भी पुश कर सकते हैं। यह कमांड शब्दकोशों को [संपादक](https://intlayer.org/dashboard) के लिए उपलब्ध कराएगा। इस तरह, आप अपने शब्दकोशों को अपनी टीम के साथ साझा कर सकते हैं और अपने एप्लिकेशन के कोड को संपादित किए बिना अपनी सामग्री को संपादित कर सकते हैं।

##### उपनाम (Aliases):

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

##### तर्क (Arguments):

- `-d`, `--dictionaries`: पुल करने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश पुश किए जाएंगे।
  > उदाहरण: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: शब्दकोशों को पुश करने के बाद लोकल डिरेक्टरीज़ को हटाने के लिए पूछे जाने वाले प्रश्न को छोड़ दें, और उन्हें हटा दें। डिफ़ॉल्ट रूप से, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह दूरस्थ शब्दकोशों की सामग्री को ओवरराइट करेगा।
  > उदाहरण: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: शब्दकोशों को पुश करने के बाद लोकल डिरेक्टरीज़ को हटाने के लिए पूछे जाने वाले प्रश्न को छोड़ दें, और उन्हें बनाए रखें। डिफ़ॉल्ट रूप से, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह दूरस्थ शब्दकोशों की सामग्री को ओवरराइट करेगा।
  > उदाहरण: `npx intlayer dictionary push -k`
- `--env`: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- `--env-file`: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- `--base-dir`: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें।
- `--verbose`: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।
- `--git-diff`: केवल उन शब्दकोशों पर चलाएं जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान शाखा (डिफ़ॉल्ट: `HEAD`) तक के परिवर्तन शामिल हैं।
- `--git-diff-base`: git diff के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।
- `--git-diff-current`: git diff के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट: `HEAD`)।
- `--uncommitted`: बिना कमिट किए गए परिवर्तनों को शामिल करें।
- `--unpushed`: बिना पुश किए गए परिवर्तनों को शामिल करें।
- `--untracked`: बिना ट्रैक किए गए फाइलों को शामिल करें।

### दूरस्थ शब्दकोश खींचें

```bash
npx intlayer pull
```

यदि [intlayer editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) इंस्टॉल है, तो आप संपादक से भी शब्दकोश खींच सकते हैं। इस तरीके से, आप अपने एप्लिकेशन की आवश्यकता के लिए अपने शब्दकोश की सामग्री को अधिलेखित कर सकते हैं।

##### उपनाम:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

##### तर्क:

- `-d, --dictionaries`: खींचने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश खींचे जाएंगे।
  > उदाहरण: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : उस निर्देशिका का पथ जहाँ नए शब्दकोश सहेजे जाएंगे। यदि निर्दिष्ट नहीं किया गया है, तो नए शब्दकोश परियोजना की `./intlayer-dictionaries` निर्देशिका में सहेजे जाएंगे। यदि आपके शब्दकोश सामग्री में `filePath` फ़ील्ड निर्दिष्ट है, तो शब्दकोश इस तर्क को ध्यान में नहीं रखेंगे और निर्दिष्ट `filePath` निर्देशिका में सहेजे जाएंगे।
- `--env`: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- `--env-file`: चर लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- `--base-dir`: परियोजना के लिए आधार निर्देशिका निर्दिष्ट करें।
- `--verbose`: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

##### उदाहरण:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### शब्दकोश भरें / ऑडिट करें / अनुवाद करें

```bash
npx intlayer fill
```

यह कमांड आपकी सामग्री घोषणा फ़ाइलों का विश्लेषण संभावित समस्याओं के लिए करता है जैसे कि अनुवाद की कमी, संरचनात्मक असंगतताएँ, या प्रकार मेल न खाना। यदि यह कोई समस्या पाता है, तो **intlayer fill** आपके शब्दकोशों को सुसंगत और पूर्ण बनाए रखने के लिए अपडेट प्रस्तावित या लागू करेगा।

##### उपनाम:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

##### तर्क:

- `-f, --file [files...]`
  विशिष्ट सामग्री घोषणा फ़ाइलों की सूची जिन्हें ऑडिट किया जाना है। यदि प्रदान नहीं किया गया है, तो सभी खोजे गए `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` फ़ाइलों का ऑडिट किया जाएगा।

- `--exclude [excludedGlobs...]`
  ऑडिट से बाहर करने के लिए ग्लोब पैटर्न (जैसे `--exclude "src/test/**"`).

- `--source-locale [sourceLocale]`
- अनुवाद के लिए स्रोत लोकल। यदि निर्दिष्ट नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन से डिफ़ॉल्ट लोकल का उपयोग किया जाएगा।

- `--output-locales [outputLocales...]`
  लक्षित लोकल जिन्हें अनुवादित किया जाना है। यदि निर्दिष्ट नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन से सभी लोकल का उपयोग किया जाएगा सिवाय स्रोत लोकल के।

- `--mode [mode]`
  अनुवाद मोड: 'complete', 'review', या 'missing-only'। डिफ़ॉल्ट 'missing-only' है।

- `--git-diff`
  उन शब्दकोशों को फ़िल्टर करता है जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान शाखा (डिफ़ॉल्ट: `HEAD`) तक के परिवर्तन शामिल हैं।

- `--git-diff-base`
  git diff के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।

- `--git-diff-current`
  git diff के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `HEAD`)।

- `--uncommitted`
  उन शब्दकोशों को फ़िल्टर करता है जिनमें बिना कमिट किए गए परिवर्तन शामिल हैं।

- `--unpushed`
- उन शब्दकोशों को फ़िल्टर करता है जिनमें अनपुश किए गए परिवर्तन शामिल हैं।

- `--untracked`
  उन शब्दकोशों को फ़िल्टर करता है जिनमें अनट्रैक्ड फाइलें शामिल हैं।

- `--keys [keys...]`
  निर्दिष्ट कुंजियों के आधार पर शब्दकोशों को फ़िल्टर करें।

- `--excluded-keys [excludedKeys...]`
  निर्दिष्ट कुंजियों के आधार पर शब्दकोशों को बाहर करें।

- `--path-filter [pathFilters...]`
  फ़ाइल पथों के लिए ग्लोब पैटर्न के आधार पर शब्दकोशों को फ़िल्टर करें।

- `--model [model]`
  अनुवाद के लिए उपयोग किए जाने वाला AI मॉडल (जैसे, `gpt-3.5-turbo`)।

- `--provider [provider]`
  अनुवाद के लिए उपयोग किए जाने वाला AI प्रदाता।

- `--temperature [temperature]`
  AI मॉडल के लिए तापमान सेटिंग।

- `--api-key [apiKey]`
  AI सेवा के लिए अपनी स्वयं की API कुंजी प्रदान करें।

- `--custom-prompt [prompt]`
  अपने अनुवाद निर्देशों के लिए एक कस्टम प्रॉम्प्ट प्रदान करें।
- `--application-context [applicationContext]`
  AI अनुवाद के लिए अतिरिक्त संदर्भ प्रदान करें।

- `--env`
  पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।

- `--env-file [envFile]`
  वेरिएबल लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।

- `--base-dir`
  परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें।

- `--verbose`
  डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

##### उदाहरण:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

यह कमांड `src/home/` निर्देशिका में सभी सामग्री घोषणा फ़ाइलों के लिए अंग्रेज़ी से फ्रेंच और स्पेनिश में सामग्री का अनुवाद GPT-3.5 टर्बो मॉडल का उपयोग करके करेगा।

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
- **`--env-file`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें।
- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

#### कॉन्फ़िगरेशन पुश करें

`configuration push` कमांड आपकी कॉन्फ़िगरेशन को Intlayer CMS और संपादक में अपलोड करता है। यह कदम Intlayer विजुअल एडिटर में दूरस्थ शब्दकोशों के उपयोग को सक्षम करने के लिए आवश्यक है।

```bash
npx intlayer configuration push
```

##### उपनाम:

- `npx intlayer config push`
- `npx intlayer conf push`

##### तर्क:

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें।
- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

कॉन्फ़िगरेशन को पुश करने से, आपका प्रोजेक्ट पूरी तरह से Intlayer CMS के साथ एकीकृत हो जाता है, जिससे टीमों के बीच सहज शब्दकोश प्रबंधन सक्षम होता है।

### दस्तावेज़ प्रबंधन

`doc` कमांड कई लोकल्स में दस्तावेज़ फ़ाइलों का प्रबंधन और अनुवाद करने के लिए उपकरण प्रदान करते हैं।

#### दस्तावेज़ अनुवाद करें

`doc translate` कमांड स्वचालित रूप से दस्तावेज़ीकरण फ़ाइलों का अनुवाद एक मूल लोकल से लक्षित लोकल में AI अनुवाद सेवाओं का उपयोग करके करता है।

```bash
npx intlayer doc translate
```

##### तर्क:

- **`--doc-pattern [docPattern...]`**: दस्तावेज़ीकरण फ़ाइलों से मेल खाने वाले ग्लोब पैटर्न जिन्हें अनुवादित किया जाना है।
  > उदाहरण: `npx intlayer doc translate --doc-pattern "docs/**/*.md" "src/**/*.mdx"`
- **`--excluded-glob-pattern [excludedGlobPattern...]`**: अनुवाद से बाहर रखने वाले ग्लोब पैटर्न।
  > उदाहरण: `npx intlayer doc translate --excluded-glob-pattern "docs/internal/**"`
- **`--nb-simultaneous-file-processed [nbSimultaneousFileProcessed]`**: एक साथ अनुवाद के लिए संसाधित की जाने वाली फ़ाइलों की संख्या।
  > उदाहरण: `npx intlayer doc translate --nb-simultaneous-file-processed 5`
- **`--locales [locales...]`**: दस्तावेज़ीकरण का अनुवाद करने के लिए लक्षित भाषाएँ।
  > उदाहरण: `npx intlayer doc translate --locales fr es de`
- **`--base-locale [baseLocale]`**: स्रोत भाषा जिससे अनुवाद किया जाना है।
  > उदाहरण: `npx intlayer doc translate --base-locale en`
- **`--model [model]`**: अनुवाद के लिए उपयोग किया जाने वाला AI मॉडल (जैसे, `gpt-3.5-turbo`)।
- **`--provider [provider]`**: अनुवाद के लिए उपयोग किया जाने वाला AI प्रदाता।
- **`--temperature [temperature]`**: AI मॉडल के लिए तापमान सेटिंग।
- **`--api-key [apiKey]`**: AI सेवा के लिए अपनी API कुंजी प्रदान करें।
- **`--custom-prompt [prompt]`**: अनुवाद निर्देशों के लिए कस्टम प्रॉम्प्ट प्रदान करें।
- **`--application-context [applicationContext]`**: AI अनुवाद के लिए अतिरिक्त संदर्भ प्रदान करें।
- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file [envFile]`**: वेरिएबल्स लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--base-dir`**: परियोजना के लिए बेस निर्देशिका निर्दिष्ट करें।
- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।
- **`--custom-instructions [customInstructions]`**: प्रॉम्प्ट में जोड़े गए कस्टम निर्देश। फॉर्मेटिंग, URL अनुवाद आदि से संबंधित विशिष्ट नियम लागू करने के लिए उपयोगी।

##### उदाहरण:

```bash
npx intlayer doc translate
  --doc-pattern "docs/en/**/*.md"
  --base-locale en --locales fr es
  --model chatgpt-4o-latest
  --custom-instructions "$(cat ./instructions.md)"
```

> ध्यान दें कि आउटपुट फ़ाइल पथ निम्नलिखित पैटर्न को बदलकर निर्धारित किया जाएगा
>
> - `/{{baseLocale}}/` को `/{{locale}}/` से (Unix)
> - `\{{baseLocale}}\` को `\{{locale}}\` से बदलें (Windows)
> - `_{{baseLocale}}.` को `_{{locale}}.` से बदलें
> - `{{baseLocale}}_` को `{{locale}}_` से बदलें
> - `.{{baseLocaleName}}.` को `.{{localeName}}.` से बदलें
>
> यदि पैटर्न नहीं मिलता है, तो आउटपुट फ़ाइल में फ़ाइल के एक्सटेंशन के अंत में `.{{locale}}` जोड़ा जाएगा। उदाहरण के लिए `./my/file.md` फ्रेंच लोकल के लिए `./my/file.fr.md` में अनुवादित होगा।

#### दस्तावेज़ समीक्षा करें

`doc review` कमांड विभिन्न लोकलों में गुणवत्ता, संगति, और पूर्णता के लिए दस्तावेज़ फ़ाइलों का विश्लेषण करता है।

```bash
npx intlayer doc review
```

##### तर्क:

`doc review` कमांड `doc translate` के समान तर्क स्वीकार करता है, जिससे आप विशिष्ट दस्तावेज़ फ़ाइलों की समीक्षा कर सकते हैं और गुणवत्ता जांच लागू कर सकते हैं।

##### उदाहरण:

```bash
npx intlayer doc review
 --doc-pattern "docs/hi/**/*.md"
 --locales fr es de
 --model chatgpt-4o-latest
 --custom-instructions "$(cat ./instructions.md)"
```

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

## intlayer कमांड को डिबग करें

### 1. **सुनिश्चित करें कि आप नवीनतम संस्करण का उपयोग कर रहे हैं**

चलाएँ:

```bash
npx intlayer --version                  # वर्तमान लोकल intlayer संस्करण
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

### 4. **npx कैश साफ़ करें (यदि आप पुराने संस्करण में फंसे हैं)**

```bash
npx clear-npx-cache
```

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
