---
createdAt: 2025-03-17
updatedAt: 2025-09-30
title: आधिकारिक VS कोड एक्सटेंशन
description: अपने विकास वर्कफ़्लो को बेहतर बनाने के लिए VS कोड में Intlayer एक्सटेंशन का उपयोग कैसे करें, यह जानें। स्थानीयकृत सामग्री के बीच तेजी से नेविगेट करें और अपनी शब्दकोशों का कुशलतापूर्वक प्रबंधन करें।
keywords:
  - VS कोड एक्सटेंशन
  - Intlayer
  - स्थानीयकरण
  - विकास उपकरण
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - doc
  - vs-code-extension
---

# आधिकारिक VS कोड एक्सटेंशन

## अवलोकन

[**Intlayer**](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension) **Intlayer** के लिए आधिकारिक विजुअल स्टूडियो कोड एक्सटेंशन है, जिसे आपके प्रोजेक्ट्स में स्थानीयकृत सामग्री के साथ काम करते समय डेवलपर अनुभव को बेहतर बनाने के लिए डिज़ाइन किया गया है।

![Intlayer VS कोड एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/assets/vs_code_extension_demo.gif)

एक्सटेंशन लिंक: [https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension](https://marketplace.visualstudio.com/items?itemName=Intlayer.intlayer-vs-code-extension)

## विशेषताएँ

![शब्दकोश भरें](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_fill_active_dictionary.gif?raw=true)

- **तत्काल नेविगेशन** – `useIntlayer` कुंजी पर क्लिक करने पर सही सामग्री फ़ाइल पर तेजी से जाएं।
- **शब्दकोश भरें** – अपने प्रोजेक्ट की सामग्री से शब्दकोश भरें।

![कमांड सूची](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_list_commands.gif?raw=true)

- **Intlayer कमांड्स तक आसान पहुँच** – सामग्री शब्दकोशों को आसानी से बनाएं, पुश करें, पुल करें, भरें, और परीक्षण करें।

![सामग्री फ़ाइल बनाएँ](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_create_content_file.gif?raw=true)

- **सामग्री घोषणा जनरेटर** – विभिन्न स्वरूपों (`.ts`, `.esm`, `.cjs`, `.json`) में शब्दकोश सामग्री फ़ाइलें बनाएं।

![शब्दकोशों का परीक्षण करें](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_test_missing_dictionary.gif?raw=true)

- **शब्दकोश परीक्षण** – लापता अनुवादों के लिए शब्दकोशों का परीक्षण करें।

![शब्दकोश पुनर्निर्माण करें](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_rebuild_dictionary.gif?raw=true)

- **अपने शब्दकोशों को अद्यतित रखें** – अपने प्रोजेक्ट की नवीनतम सामग्री के साथ अपने शब्दकोशों को अद्यतित रखें।

![Intlayer टैब (गतिविधि बार)](https://github.com/aymericzip/intlayer-vs-code-extension/blob/master/assets/vscode_extention_search_dictionary.gif?raw=true)

- **Intlayer टैब (गतिविधि बार)** – समर्पित साइड टैब से टूलबार और संदर्भ क्रियाओं (बिल्ड, पुल, पुश, फिल, रिफ्रेश, टेस्ट, फ़ाइल बनाएँ) के साथ शब्दकोश ब्राउज़ और खोजें।

## उपयोग

### त्वरित नेविगेशन

1. **react-intlayer** का उपयोग करके एक प्रोजेक्ट खोलें।
2. `useIntlayer()` कॉल खोजें, जैसे:

   ```tsx
   const content = useIntlayer("app");
   ```

3. कुंजी (जैसे, `"app"`) पर **कमांड-क्लिक** (`⌘+Click` macOS पर) या **Ctrl+Click** (Windows/Linux पर) करें।
4. VS Code स्वचालित रूप से संबंधित शब्दकोश फ़ाइल खोलेगा, जैसे `src/app.content.ts`।

### Intlayer टैब (गतिविधि बार)

शब्दकोशों को ब्राउज़ और प्रबंधित करने के लिए साइड टैब का उपयोग करें:

- गतिविधि बार में Intlayer आइकन खोलें।
- **Search** में, वास्तविक समय में शब्दकोशों और प्रविष्टियों को फ़िल्टर करने के लिए टाइप करें।
- **Dictionaries** में, पर्यावरण, शब्दकोश, और फ़ाइलों को ब्राउज़ करें। टूलबार का उपयोग करें जैसे Build, Pull, Push, Fill, Refresh, Test, और Create Dictionary File के लिए। संदर्भ क्रियाओं के लिए राइट-क्लिक करें (शब्दकोशों पर Pull/Push, फ़ाइलों पर Fill)। जब लागू हो, तो वर्तमान संपादक फ़ाइल स्वचालित रूप से पेड़ में प्रकट होती है।

### कमांड्स तक पहुँच

आप **Command Palette** से कमांड्स तक पहुँच सकते हैं।

```sh
Cmd + Shift + P (macOS) / Ctrl + Shift + P (Windows/Linux)
```

- **शब्दकोश बनाएं (Build Dictionaries)**
- **शब्दकोश पुश करें (Push Dictionaries)**
- **शब्दकोश पुल करें (Pull Dictionaries)**
- **शब्दकोश भरें (Fill Dictionaries)**
- **शब्दकोश परीक्षण करें (Test Dictionaries)**
- **शब्दकोश फ़ाइल बनाएँ (Create Dictionary File)**

### पर्यावरण चर लोड करना

Intlayer सुझाव देता है कि आप अपने AI API कुंजी, साथ ही Intlayer क्लाइंट ID और सीक्रेट को पर्यावरण चर में संग्रहीत करें।

एक्सटेंशन आपके वर्कस्पेस से पर्यावरण चर लोड कर सकता है ताकि Intlayer कमांड सही संदर्भ के साथ चल सकें।

- **लोड क्रम (प्राथमिकता के अनुसार)**: `.env.<env>.local` → `.env.<env>` → `.env.local` → `.env`
- **गैर-विनाशकारी**: मौजूदा `process.env` मानों को अधिलेखित नहीं किया जाता है।
- **स्कोप**: फ़ाइलें कॉन्फ़िगर किए गए बेस डायरेक्टरी से हल की जाती हैं (डिफ़ॉल्ट वर्कस्पेस रूट)।

#### सक्रिय पर्यावरण का चयन करना

- **कमांड पैलेट**: पैलेट खोलें और `Intlayer: Select Environment` चलाएं, फिर पर्यावरण चुनें (जैसे, `development`, `staging`, `production`)। एक्सटेंशन प्राथमिकता सूची में उपलब्ध पहली फ़ाइल लोड करने का प्रयास करेगा और “Loaded env from .env.<env>.local” जैसी सूचना दिखाएगा।
- **सेटिंग्स**: `Settings → Extensions → Intlayer` पर जाएं, और सेट करें:
  - **पर्यावरण**: वह पर्यावरण नाम जिसका उपयोग `.env.<env>*` फ़ाइलों को हल करने के लिए किया जाता है।
  - (वैकल्पिक) **Env फ़ाइल**: `.env` फ़ाइल का स्पष्ट पथ। जब प्रदान किया जाता है, तो यह अनुमानित सूची पर प्राथमिकता लेता है।

#### मोनोरिपोज़ और कस्टम निर्देशिकाएँ

यदि आपकी `.env` फ़ाइलें वर्कस्पेस रूट के बाहर स्थित हैं, तो `Settings → Extensions → Intlayer` में **Base Directory** सेट करें। लोडर उस निर्देशिका के सापेक्ष `.env` फ़ाइलों को खोजेगा।

## दस्तावेज़ इतिहास

| संस्करण | तिथि       | परिवर्तन                           |
| ------- | ---------- | ---------------------------------- |
| 6.1.5   | 2025-09-30 | डेमो GIF जोड़ा                     |
| 6.1.0   | 2025-09-24 | पर्यावरण चयन अनुभाग जोड़ा          |
| 6.0.0   | 2025-09-22 | Intlayer टैब / Fill & Test कमांड्स |
| 5.5.10  | 2025-06-29 | प्रारंभिक इतिहास                   |
