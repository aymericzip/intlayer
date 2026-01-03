---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: शब्दकोश पुश करें
description: जानें कि अपने शब्दकोशों को Intlayer संपादक और CMS में कैसे पुश करें।
keywords:
  - पुश
  - शब्दकोश
  - CLI
  - Intlayer
  - संपादक
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# शब्दकोश पुश करें

```bash
npx intlayer dictionary push
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) स्थापित है, तो आप शब्दकोशों को संपादक में भी पुश कर सकते हैं। यह कमांड शब्दकोशों को [संपादक](https://app.intlayer.org/) के लिए उपलब्ध कराएगा। इस तरह, आप अपने शब्दकोशों को अपनी टीम के साथ साझा कर सकते हैं और अपने एप्लिकेशन के कोड को संपादित किए बिना अपनी सामग्री को संपादित कर सकते हैं।

## उपनाम:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## तर्क:

**शब्दकोश विकल्प:**

- **`-d`, `--dictionaries`**: पुल करने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश पुश किए जाएंगे।

  > उदाहरण: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: पुल करने के लिए शब्दकोशों के आईडी (alias --dictionaries के लिए)।

  > उदाहरण: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**कॉन्फ़िगरेशन विकल्प:**

- **`--base-dir`**: प्रोजेक्ट के लिए बेस डायरेक्टरी निर्दिष्ट करें। intlayer कॉन्फ़िगरेशन प्राप्त करने के लिए, कमांड बेस डायरेक्टरी में `intlayer.config.{ts,js,json,cjs,mjs}` फ़ाइल खोजेगा।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: कैश को अक्षम करें।

  > उदाहरण: `npx intlayer build --no-cache`

**पर्यावरण चर विकल्प:**

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)। यह उपयोगी है जब आप अपनी intlayer कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर का उपयोग करते हैं।
- **`--env-file`**: चर लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें। यह उपयोगी है जब आप अपनी intlayer कॉन्फ़िगरेशन फ़ाइल में पर्यावरण चर का उपयोग करते हैं।

  > उदाहरण: `npx intlayer dictionary push --env-file .env.production.local`

  > उदाहरण: `npx intlayer dictionary push --env production`

**आउटपुट विकल्प:**

- **`-r`, `--delete-locale-dictionary`**: प्रश्न को छोड़ दें जो पूछता है कि डिक्शनरी पुश करने के बाद लोकल डायरेक्टरीज़ को हटाना है या नहीं, और उन्हें हटा दें। डिफ़ॉल्ट रूप से, यदि डिक्शनरी स्थानीय रूप से परिभाषित है, तो यह दूरस्थ डिक्शनरी सामग्री को ओवरराइट कर देगा।

  > उदाहरण: `npx intlayer dictionary push -r`

  > उदाहरण: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: प्रश्न को छोड़ दें जो पूछता है कि डिक्शनरी पुश करने के बाद लोकल डायरेक्टरीज़ को हटाना है या नहीं, और उन्हें बनाए रखें। डिफ़ॉल्ट रूप से, यदि डिक्शनरी स्थानीय रूप से परिभाषित है, तो यह दूरस्थ डिक्शनरी सामग्री को ओवरराइट कर देगा।

  > उदाहरण: `npx intlayer dictionary push -k`

  > उदाहरण: `npx intlayer dictionary push --keep-locale-dictionary`

**तैयारी विकल्प:**

- **`--build`**: पुश करने से पहले डिक्शनरीज़ को बिल्ड करें ताकि सामग्री अपडेटेड रहे। True बिल्ड को मजबूर करेगा, false बिल्ड को छोड़ देगा, undefined बिल्ड के कैश का उपयोग करने की अनुमति देगा।

**लॉग विकल्प:**

- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें। (CLI का उपयोग करते समय डिफ़ॉल्ट रूप से true)

**Git विकल्प:**

- **`--git-diff`**: केवल उन डिक्शनरीज़ पर चलाएं जिनमें बेस (डिफ़ॉल्ट `origin/main`) से वर्तमान ब्रांच (डिफ़ॉल्ट: `HEAD`) तक परिवर्तन शामिल हैं।
- **`--git-diff-base`**: git diff के लिए बेस संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट `origin/main`)।
- **`--git-diff-current`**: git diff के लिए वर्तमान संदर्भ निर्दिष्ट करें (डिफ़ॉल्ट: `HEAD`)।
- **`--uncommitted`**: अनकमिटेड परिवर्तनों को शामिल करें।
- **`--unpushed`**: अनपुश्ड परिवर्तनों को शामिल करें।
- **`--untracked`**: अनट्रैक्ड फाइलों को शामिल करें।

  > उदाहरण: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > उदाहरण: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
