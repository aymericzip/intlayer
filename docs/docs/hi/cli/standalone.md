---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: स्टैंडअलोन बंडल (Standalone Bundle)
description: एप्लिकेशन सामग्री का स्टैंडअलोन JavaScript बंडल बनाने का तरीका जानें।
keywords:
  - Standalone
  - बंडल
  - CLI
  - Intlayer
  - संपादक
  - CMS
slugs:
  - doc
  - concept
  - cli
  - standalone
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "स्टैंडअलोन कमांड दस्तावेज़ीकरण प्रारंभ"
---

# स्टैंडअलोन बंडल (Standalone Bundle)

`standalone` कमांड आपको Intlayer और किसी भी अन्य निर्दिष्ट पैकेज वाले स्टैंडअलोन JavaScript बंडल को बनाने की अनुमति देता है। यह बिना पैकेज मैनेजर या बंडलर वाले वातावरण में Intlayer का उपयोग करने के लिए विशेष रूप से उपयोगी है, जैसे सरल HTML/JS ऐप।

बंडल [esbuild](https://esbuild.github.io/) का उपयोग करके अनुरोधित पैकेज और उनके निर्भरता को एक एकल फ़ाइल में मिलाता है जिसे किसी भी वेब प्रोजेक्ट में आसानी से आयात किया जा सकता है।

## उपयोग

```bash
npx intlayer standalone --packages [पैकेज...] [विकल्प]
```

## विकल्प

- `-o, --outfile [outfile]` - वैकल्पिक। आउटपुट फ़ाइल का नाम। डिफ़ॉल्ट: `intlayer-bundle.js`।
- `--packages [पैकेज...]` - अनिवार्य। बंडल में शामिल किए जाने वाले पैकेजों की सूची (उदा: `intlayer`, `vanilla-intlayer`)।
- `--version [version]` - वैकल्पिक। बंडल किए जाने वाले पैकेजों का संस्करण। यदि निर्दिष्ट नहीं है, तो डिफ़ॉल्ट रूप से Intlayer CLI संस्करण का उपयोग किया जाता है।
- `--minify` - वैकल्पिक। आउटपुट को छोटा (minify) करना है या नहीं। डिफ़ॉल्ट: `true`।
- `--platform [platform]` - वैकल्पिक। बंडल के लिए लक्षित प्लेटफ़ॉर्म (उदा: `browser`, `node`)। डिफ़ॉल्ट: `browser`।
- `--format [format]` - वैकल्पिक। बंडल के लिए आउटपुट प्रारूप (उदा: `esm`, `cjs`, `iife`)। डिफ़ॉल्ट: `esm`।

## सामान्य विकल्प

- `--env-file [envFile]` - पर्यावरण फ़ाइल।
- `-e, --env [env]` - पर्यावरण।
- `--base-dir [baseDir]` - आधार निर्देशिका।
- `--no-cache` - कैश अक्षम करें।
- `--verbose` - विस्तृत आउटपुट।

## उदाहरण:

### Vanilla JS के लिए बंडल बनाना:

```bash
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js
```

यह `intlayer` और `vanilla-intlayer` दोनों पैकेजों वाला एक `intlayer.js` फ़ाइल बनाएगा, जो छोटा होगा और ESM प्रारूप में होगा, जिसे `<script>` टैग के माध्यम से ब्राउज़र में उपयोग के लिए तैयार किया जाएगा।

### विशिष्ट संस्करण बंडल करना:

```bash
npx intlayer standalone --packages intlayer --version 8.6.4
```

### अलग प्रारूप में बंडल करना:

```bash
npx intlayer standalone --packages intlayer --format iife
```

## यह क्या करता है:

1. **अस्थायी वातावरण बनाना** - निर्भरताओं को प्रबंधित करने के लिए एक अस्थायी निर्देशिका स्थापित करता है।
2. **पैकेज स्थापित करना** - अनुरोधित पैकेज और उनके निर्भरता को स्थापित करने के लिए `npm` या `bun` (यदि उपलब्ध हो) का उपयोग करता है।
3. **प्रवेश बिंदु जनरेट करना** - एक अस्थायी प्रवेश बिंदु फ़ाइल बनाता है जो सभी अनुरोधित पैकेजों को निर्यात करती है और ब्राउज़र में चलने पर उन्हें वैश्विक चर के रूप में उजागर करती है।
4. **esbuild के साथ बंडल करना** - अनुरोध के अनुसार मिनीफिकेशन और फॉर्मेटिंग लागू करते हुए सब कुछ एक फ़ाइल में संयोजित करने के लिए esbuild का उपयोग करता है।
5. **फ़ाइल जनरेट करना** - परिणामी बंडल को निर्दिष्ट आउटपुट पथ पर लिखता है।

## वैश्विक चर (Global Variables)

जब बंडल ब्राउज़र में लोड होता है, तो यह अनुरोधित पैकेजों को `window` ऑब्जेक्ट पर वैश्विक चर के रूप में उजागर करता है। चर नाम पैकेज नामों से प्राप्त होते हैं (उदा: `intlayer`, `Intlayer` बन जाता है; `vanilla-intlayer`, `VanillaIntlayer` बन जाता है)।

```javascript
// बंडल से Intlayer एक्सेस करना
const { getLocaleName } = window.Intlayer;
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;
```
