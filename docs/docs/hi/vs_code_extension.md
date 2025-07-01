---
docName: vscode_extension
url: https://intlayer.org/doc/vs-code-extension
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md
createdAt: 2025-03-17
updatedAt: 2025-06-29
title: आधिकारिक VS कोड एक्सटेंशन
description: अपने विकास वर्कफ़्लो को बेहतर बनाने के लिए VS कोड में Intlayer एक्सटेंशन का उपयोग कैसे करें सीखें। स्थानीयकृत सामग्री के बीच तेजी से नेविगेट करें और अपनी शब्दकोशों को कुशलतापूर्वक प्रबंधित करें।
keywords:
  - VS कोड एक्सटेंशन
  - Intlayer
  - स्थानीयकरण
  - विकास उपकरण
  - React
  - Next.js
  - JavaScript
  - TypeScript
---

# आधिकारिक VS कोड एक्सटेंशन

## अवलोकन

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) **Intlayer** के लिए आधिकारिक Visual Studio Code एक्सटेंशन है, जिसे आपके प्रोजेक्ट्स में स्थानीयकृत सामग्री के साथ काम करते समय डेवलपर अनुभव को बेहतर बनाने के लिए डिज़ाइन किया गया है।

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

एक्सटेंशन लिंक: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## विशेषताएँ

### त्वरित नेविगेशन

**परिभाषा पर जाएं समर्थन** – `useIntlayer` कुंजी पर `Cmd+Click` (Mac) या `Ctrl+Click` (Windows/Linux) का उपयोग करके संबंधित सामग्री फ़ाइल तुरंत खोलें।  
**सुगम एकीकरण** – **react-intlayer** और **next-intlayer** प्रोजेक्ट्स के साथ बिना किसी परेशानी के काम करता है।  
**बहुभाषी समर्थन** – विभिन्न भाषाओं में स्थानीयकृत सामग्री का समर्थन करता है।  
**VS कोड एकीकरण** – VS कोड के नेविगेशन और कमांड पैलेट के साथ सहजता से एकीकृत होता है।

### शब्दकोश प्रबंधन कमांड

अपने कंटेंट शब्दकोशों का सीधे VS कोड से प्रबंधन करें:

- **शब्दकोश बनाएं** (`extension.buildDictionaries`) – आपके प्रोजेक्ट संरचना के आधार पर सामग्री फ़ाइलें उत्पन्न करें।
- **शब्दकोश पुश करें** (`extension.pushDictionaries`) – नवीनतम शब्दकोश सामग्री को आपके रिपॉजिटरी में अपलोड करें।
- **शब्दकोश पुल करें** (`extension.pullDictionaries`) – आपके रिपॉजिटरी से नवीनतम शब्दकोश सामग्री को आपके स्थानीय वातावरण में सिंक करें।

### सामग्री घोषणा जनरेटर

आसानी से विभिन्न प्रारूपों में संरचित शब्दकोश फ़ाइलें उत्पन्न करें:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES मॉड्यूल (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## स्थापना

आप **Intlayer** को सीधे VS कोड मार्केटप्लेस से इंस्टॉल कर सकते हैं:

1. **VS कोड** खोलें।
2. **एक्सटेंशंस मार्केटप्लेस** पर जाएं।
3. **"Intlayer"** खोजें।
4. **इंस्टॉल** पर क्लिक करें।

वैकल्पिक रूप से, इसे कमांड लाइन के माध्यम से इंस्टॉल करें:

```sh
code --install-extension intlayer
```

## उपयोग

### त्वरित नेविगेशन

1. **react-intlayer** का उपयोग करके एक प्रोजेक्ट खोलें।
2. `useIntlayer()` कॉल खोजें, जैसे:

   ```tsx
   const content = useIntlayer("app");
   ```

3. कुंजी (जैसे, `"app"`) पर **कमांड-क्लिक** (`⌘+Click` macOS पर) या **Ctrl+क्लिक** (Windows/Linux पर) करें।
4. VS कोड स्वचालित रूप से संबंधित शब्दकोश फ़ाइल खोलेगा, जैसे `src/app.content.ts`।

### सामग्री शब्दकोश प्रबंधन

#### शब्दकोश बनाना

सभी शब्दकोश सामग्री फ़ाइलें उत्पन्न करें:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries** खोजें और कमांड चलाएं।

#### शब्दकोश पुश करना

नवीनतम शब्दकोश सामग्री अपलोड करें:

1. **कमांड पैलेट** खोलें।
2. **Push Dictionaries** खोजें।
3. पुश करने के लिए शब्दकोश चुनें और पुष्टि करें।

#### शब्दकोश पुल करना

नवीनतम शब्दकोश सामग्री सिंक करें:

1. **कमांड पैलेट** खोलें।
2. **Pull Dictionaries** खोजें।
3. पुल करने के लिए शब्दकोश चुनें।

## विकास और योगदान

योगदान देना चाहते हैं? हम समुदाय के योगदान का स्वागत करते हैं!

रिपॉ URL: https://github.com/aymericzip/intlayer-vs-code-extension

### शुरूआत कैसे करें

रिपॉ क्लोन करें और निर्भरताएँ स्थापित करें:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> एक्सटेंशन को बिल्ड और प्रकाशित करने के लिए `vsce` पैकेज के साथ संगतता के लिए `npm` पैकेज मैनेजर का उपयोग करें।

### विकास मोड में चलाएं

1. प्रोजेक्ट को **VS Code** में खोलें।
2. एक नया **Extension Development Host** विंडो लॉन्च करने के लिए `F5` दबाएं।

### पुल अनुरोध सबमिट करें

यदि आप एक्सटेंशन में सुधार करते हैं, तो [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) पर PR सबमिट करें।

## प्रतिक्रिया और समस्याएं

क्या आपको कोई बग मिला है या कोई फीचर रिक्वेस्ट है? हमारे **GitHub रिपॉजिटरी** पर एक इश्यू खोलें:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## लाइसेंस

Intlayer को **MIT लाइसेंस** के तहत जारी किया गया है।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
