---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: शब्दकोश भरें
description: AI का उपयोग करके अपने शब्दकोशों को कैसे भरें, ऑडिट करें, और अनुवाद करें, यह जानें।
keywords:
  - भरें
  - ऑडिट
  - अनुवाद
  - शब्दकोश
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - fill
---

# शब्दकोश भरें / ऑडिट करें / अनुवाद करें

```bash
npx intlayer fill
```

यह कमांड आपकी सामग्री घोषणा फ़ाइलों का विश्लेषण संभावित समस्याओं के लिए करता है जैसे कि गायब अनुवाद, संरचनात्मक असंगतियां, या प्रकार असंगतताएं। यदि यह कोई समस्या पाता है, तो **intlayer fill** आपके शब्दकोशों को सुसंगत और पूर्ण बनाए रखने के लिए अपडेट प्रस्तावित या लागू करेगा।

## उपनाम:

- `npx intlayer dictionaries fill`
- `npx intlayer dictionary fill`
- `npx intlayer dic fill`

## तर्क:

**फ़ाइल सूची विकल्प:**

- **`-f, --file [files...]`**: ऑडिट करने के लिए विशिष्ट सामग्री घोषणा फ़ाइलों की सूची। यदि प्रदान नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन फ़ाइल सेटअप के आधार पर सभी खोजी गई `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` फ़ाइलों का ऑडिट किया जाएगा।

  > उदाहरण: `npx intlayer dictionary fill -f src/home/app.content.ts`

- **`-k, --keys [keys...]`**: कुंजियों के आधार पर शब्दकोशों को फ़िल्टर करें। यदि प्रदान नहीं किया गया है, तो सभी शब्दकोशों का ऑडिट किया जाएगा।

  > उदाहरण: `npx intlayer dictionary fill -k key1 key2`

- **`--key [keys...]`**: कुंजियों के आधार पर शब्दकोशों को फ़िल्टर करें (alias --keys के लिए)।

  > उदाहरण: `npx intlayer dictionary fill --key key1 key2`

- **`--excluded-keys [excludedKeys...]`**: कुंजियों के आधार पर शब्दकोशों को बाहर करें। यदि प्रदान नहीं किया गया है, तो सभी शब्दकोशों का ऑडिट किया जाएगा।

  > उदाहरण: `npx intlayer dictionary fill --excluded-keys key1 key2`

- **`--excluded-key [excludedKeys...]`**: कुंजियों के आधार पर शब्दकोशों को बाहर फ़िल्टर करें (alias --excluded-keys के लिए)।

  > उदाहरण: `npx intlayer dictionary fill --excluded-key key1 key2`

- **`--path-filter [pathFilters...]`**: फ़ाइल पथों के लिए ग्लोब पैटर्न के आधार पर शब्दकोशों को फ़िल्टर करें।

  > उदाहरण: `npx intlayer dictionary fill --path-filter "src/home/**"`

**एंट्री आउटपुट विकल्प:**

- **`--source-locale [sourceLocale]`**: स्रोत लोकल जिसे अनुवादित किया जाना है। यदि निर्दिष्ट नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन से डिफ़ॉल्ट लोकल का उपयोग किया जाएगा।

- **`--output-locales [outputLocales...]`**: लक्षित लोकल जिन्हें अनुवादित किया जाना है। यदि निर्दिष्ट नहीं किया गया है, तो आपकी कॉन्फ़िगरेशन से स्रोत लोकल को छोड़कर सभी लोकल का उपयोग किया जाएगा।

- **`--mode [mode]`**: अनुवाद मोड: `complete`, `review`। डिफ़ॉल्ट `complete` है। `complete` सभी गायब सामग्री को भर देगा, `review` गायब सामग्री को भरने के साथ-साथ मौजूदा कुंजियों की समीक्षा करेगा।

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
- **`--api-key [apiKey]`**: AI सेवा के लिए अपनी API कुंजी प्रदान करें।
- **`--custom-prompt [prompt]`**: अपने अनुवाद निर्देशों के लिए एक कस्टम प्रॉम्प्ट प्रदान करें।
- **`--application-context [applicationContext]`**: AI अनुवाद के लिए अतिरिक्त संदर्भ प्रदान करें।

  > उदाहरण: `npx intlayer fill --model gpt-3.5-turbo --provider openai --temperature 0.5 --api-key sk-1234567890 --application-context "My application is a cat store"`

  **पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file [envFile]`**: चर लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।

  > उदाहरण: `npx intlayer fill --env-file .env.production.local`

  > उदाहरण: `npx intlayer fill --env production`

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें।

  > उदाहरण: `npx intlayer fill --base-dir ./src`

- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer build --no-cache`

**तैयारी विकल्प:**

- **`--build`**: पुश करने से पहले डिक्शनरीज़ बनाएं ताकि सामग्री अद्यतित रहे। True से बिल्ड ज़बरदस्ती होगा, false से बिल्ड छोड़ दिया जाएगा, undefined से बिल्ड के कैश का उपयोग करने की अनुमति होगी।

- **`--skip-metadata`**: शब्दकोशों के लिए गायब मेटाडेटा (विवरण, शीर्षक, टैग) भरने से बचें।

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें। (CLI का उपयोग करते समय डिफ़ॉल्ट रूप से true)

## उदाहरण:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

यह कमांड GPT-3.5 टर्बो मॉडल का उपयोग करते हुए `src/home/` डायरेक्टरी में सभी कंटेंट घोषणा फ़ाइलों के लिए अंग्रेज़ी से फ्रेंच और स्पेनिश में सामग्री का अनुवाद करेगा।
