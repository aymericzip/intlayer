# आधिकारिक VS Code एक्सटेंशन

## अवलोकन

**Intlayer** **Intlayer** के लिए आधिकारिक Visual Studio Code एक्सटेंशन है, जिसे **React, Next.js, और JavaScript** प्रोजेक्ट्स में स्थानीयकृत सामग्री के साथ काम करते समय डेवलपर अनुभव को बेहतर बनाने के लिए डिज़ाइन किया गया है।

इस एक्सटेंशन के साथ, डेवलपर्स **तेजी से नेविगेट** कर सकते हैं अपनी सामग्री डिक्शनरीज़ तक, स्थानीयकरण फ़ाइलों का प्रबंधन कर सकते हैं, और शक्तिशाली स्वचालन कमांड्स के साथ अपने वर्कफ़्लो को सुव्यवस्थित कर सकते हैं।

![Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

एक्सटेंशन लिंक: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## विशेषताएँ

### त्वरित नेविगेशन

**डिफिनिशन पर जाएं समर्थन** – `useIntlayer` कुंजी पर `Cmd+Click` (Mac) या `Ctrl+Click` (Windows/Linux) का उपयोग करें और संबंधित सामग्री फ़ाइल को तुरंत खोलें।  
**सहज एकीकरण** – **react-intlayer** और **next-intlayer** प्रोजेक्ट्स के साथ बिना किसी परेशानी के काम करता है।  
**बहुभाषा समर्थन** – विभिन्न भाषाओं में स्थानीयकृत सामग्री का समर्थन करता है।  
**VS Code एकीकरण** – VS Code के नेविगेशन और कमांड पैलेट के साथ आसानी से एकीकृत होता है।

### डिक्शनरी प्रबंधन कमांड्स

VS Code से सीधे अपनी सामग्री डिक्शनरीज़ का प्रबंधन करें:

- **डिक्शनरी बनाएं** (`extension.buildDictionaries`) – अपने प्रोजेक्ट संरचना के आधार पर सामग्री फ़ाइलें उत्पन्न करें।
- **डिक्शनरी अपलोड करें** (`extension.pushDictionaries`) – नवीनतम डिक्शनरी सामग्री को अपने रिपॉजिटरी में अपलोड करें।
- **डिक्शनरी सिंक करें** (`extension.pullDictionaries`) – नवीनतम डिक्शनरी सामग्री को अपने स्थानीय वातावरण में सिंक करें।

### सामग्री घोषणा जनरेटर

विभिन्न प्रारूपों में संरचित डिक्शनरी फ़ाइलें आसानी से उत्पन्न करें:

- **TypeScript (`.ts`)** – `extension.createDictionaryFile.ts`
- **ES Module (`.esm`)** – `extension.createDictionaryFile.esm`
- **CommonJS (`.cjs`)** – `extension.createDictionaryFile.cjs`
- **JSON (`.json`)** – `extension.createDictionaryFile.json`

## स्थापना

आप **Intlayer** को सीधे VS Code मार्केटप्लेस से इंस्टॉल कर सकते हैं:

1. **VS Code** खोलें।
2. **Extensions Marketplace** पर जाएं।
3. **"Intlayer"** खोजें।
4. **Install** पर क्लिक करें।

वैकल्पिक रूप से, इसे कमांड लाइन के माध्यम से इंस्टॉल करें:

```sh
code --install-extension intlayer
```

## उपयोग

### त्वरित नेविगेशन

1. **react-intlayer** का उपयोग करते हुए एक प्रोजेक्ट खोलें।
2. `useIntlayer()` कॉल को ढूंढें, जैसे:

   ```tsx
   const content = useIntlayer("app");
   ```

3. कुंजी (जैसे, `"app"`) पर **Command-click** (`⌘+Click` macOS पर) या **Ctrl+Click** (Windows/Linux पर) करें।
4. VS Code स्वचालित रूप से संबंधित डिक्शनरी फ़ाइल खोलेगा, जैसे `src/app.content.ts`।

### सामग्री डिक्शनरी का प्रबंधन

#### डिक्शनरी बनाना

सभी डिक्शनरी सामग्री फ़ाइलें उत्पन्न करें:

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

**Build Dictionaries** खोजें और कमांड निष्पादित करें।

#### डिक्शनरी अपलोड करना

नवीनतम डिक्शनरी सामग्री अपलोड करें:

1. **Command Palette** खोलें।
2. **Push Dictionaries** खोजें।
3. अपलोड करने के लिए डिक्शनरीज़ का चयन करें और पुष्टि करें।

#### डिक्शनरी सिंक करना

नवीनतम डिक्शनरी सामग्री सिंक करें:

1. **Command Palette** खोलें।
2. **Pull Dictionaries** खोजें।
3. सिंक करने के लिए डिक्शनरीज़ का चयन करें।

### डिक्शनरी फ़ाइल पथ को अनुकूलित करना

डिफ़ॉल्ट रूप से, एक्सटेंशन मानक **Intlayer** प्रोजेक्ट संरचना का पालन करता है। हालाँकि, आप कस्टम पथ कॉन्फ़िगर कर सकते हैं:

1. **Settings (`Cmd + ,` macOS पर / `Ctrl + ,` Windows/Linux पर)** खोलें।
2. `Intlayer` खोजें।
3. सामग्री फ़ाइल पथ सेटिंग को समायोजित करें।

## विकास और योगदान

योगदान करना चाहते हैं? हम सामुदायिक योगदान का स्वागत करते हैं!

रेपो URL: https://github.com/aymericzip/intlayer-vs-code-extension

### आरंभ करना

रेपो को क्लोन करें और निर्भरताएँ इंस्टॉल करें:

```sh
git clone https://github.com/aymericzip/intlayer-vs-code-extension.git
cd intlayer-vs-code-extension
npm install
```

> `vsce` पैकेज के साथ संगतता के लिए `npm` पैकेज मैनेजर का उपयोग करें ताकि एक्सटेंशन को बनाएं और प्रकाशित करें।

### विकास मोड में चलाएं

1. **VS Code** में प्रोजेक्ट खोलें।
2. एक नया **Extension Development Host** विंडो लॉन्च करने के लिए `F5` दबाएं।

### एक पुल अनुरोध सबमिट करें

यदि आप एक्सटेंशन में सुधार करते हैं, तो [GitHub](https://github.com/aymericzip/intlayer-vs-code-extension) पर PR सबमिट करें।

## प्रतिक्रिया और समस्याएँ

कोई बग मिला या कोई फीचर अनुरोध है? हमारे **GitHub रिपॉजिटरी** पर एक समस्या खोलें:

[GitHub Issues](https://github.com/aymericzip/intlayer-vs-code-extension/issues)

## लाइसेंस

Intlayer **MIT लाइसेंस** के तहत जारी किया गया है।
