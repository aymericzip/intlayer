---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Intlayer कमांड अपरिभाषित
description: जानें कि Intlayer कमांड अपरिभाषित त्रुटि को कैसे ठीक करें।
keywords:
  - intlayer
  - कमांड
  - अपरिभाषित
  - त्रुटि
  - vscode
  - एक्सटेंशन
  - प्लगइन
  - फ्रेमवर्क
  - next.js
  - vite
slugs:
  - doc
  - faq
  - intlayer-command-undefined
---

# Intlayer कमांड अपरिभाषित

## अवलोकन

Intlayer CLI आपके intlayer कंटेंट को नियंत्रित करने का एक सुविधाजनक तरीका प्रदान करता है, जिसमें शब्दकोश बनाना, अनुवाद भेजना, और भी बहुत कुछ शामिल है। हालांकि, यह आपके प्रोजेक्ट के काम करने के लिए आवश्यक नहीं है। यदि आप बंडलर प्लगइन (जैसे Next.js के लिए `withIntlayer()` या Vite के लिए `intlayerPlugin()`) का उपयोग कर रहे हैं, तो Intlayer ऐप बिल्ड या विकास सर्वर स्टार्टअप के दौरान स्वचालित रूप से शब्दकोश बनाएगा। विकास मोड में, यह परिवर्तनों पर भी नजर रखेगा और कंटेंट घोषणा फ़ाइलों को स्वचालित रूप से पुनर्निर्माण करेगा।

आप intlayer कमांड्स तक विभिन्न तरीकों से पहुँच सकते हैं:

- सीधे `intlayer` CLI कमांड का उपयोग करके
- [VSCode एक्सटेंशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/vs_code_extension.md) का उपयोग करके
- `@intlayer/cli` SDK का उपयोग करके

## समस्या

`intlayer` कमांड का उपयोग करने का प्रयास करते समय, आपको यह त्रुटि मिल सकती है:

```bash
'intlayer' को आंतरिक या बाहरी कमांड, संचालित प्रोग्राम या बैच फ़ाइल के रूप में पहचाना नहीं गया है।
```

## समाधान

इन समाधानों को क्रम में आज़माएँ:

1. **सुनिश्चित करें कि कमांड इंस्टॉल है**

```bash
npx intlayer -h
```

अपेक्षित आउटपुट:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            संस्करण संख्या प्रदर्शित करें
    -h, --help               कमांड के लिए सहायता दिखाएँ

Commands:
    dictionary|dictionaries  शब्दकोश संचालन
    configuration|config     कॉन्फ़िगरेशन संचालन
    help [command]           कमांड के लिए सहायता दिखाएँ
```

2. **intlayer-cli पैकेज को ग्लोबली इंस्टॉल करें**

```bash
npm install intlayer-cli -g -g
```

> यदि आपने पहले से `intlayer` पैकेज इंस्टॉल कर लिया है तो यह आवश्यक नहीं होना चाहिए

3. **पैकेज को ग्लोबली इंस्टॉल करें**

```bash
npm install intlayer -g
```

4. **अपने टर्मिनल को पुनः प्रारंभ करें**
   कभी-कभी नए कमांड्स को पहचानने के लिए टर्मिनल को पुनः प्रारंभ करना आवश्यक होता है।

5. **साफ़ करें और पुनः इंस्टॉल करें**
   यदि ऊपर दिए गए समाधान काम नहीं करते हैं:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **इंस्टॉलेशन फ़ाइलों की जाँच करें**
   यदि समस्या बनी रहती है, तो सुनिश्चित करें कि ये फ़ाइलें मौजूद हैं:

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (इसमें `bin` फ़ील्ड होना चाहिए जो `./dist/cjs/cli.cjs` को संदर्भित करता हो)

7. **PATH पर्यावरण चर की जाँच करें**
   सुनिश्चित करें कि npm ग्लोबल बिन डायरेक्टरी आपके PATH में है:

```bash
# Unix-आधारित सिस्टम (macOS/Linux) के लिए
echo $PATH
# इसमें कुछ ऐसा शामिल होना चाहिए जैसे /usr/local/bin या ~/.npm-global/bin

# विंडोज़ के लिए
echo %PATH%
# इसमें npm ग्लोबल बिन डायरेक्टरी शामिल होनी चाहिए
```

8. **पूर्ण पथ के साथ npx का उपयोग करें**
   यदि कमांड अभी भी नहीं मिल रहा है, तो पूर्ण पथ के साथ npx का उपयोग करने का प्रयास करें:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **संघर्षपूर्ण इंस्टॉलेशनों की जाँच करें**

```bash
# सभी ग्लोबली इंस्टॉल किए गए पैकेजों की सूची बनाएं
npm list -g --depth=0

# किसी भी संघर्षपूर्ण ग्लोबल इंस्टॉलेशन को हटाएं
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# फिर पुनः इंस्टॉल करें
npm install -g intlayer
```

10. **Node.js और npm संस्करणों की पुष्टि करें**
    सुनिश्चित करें कि आप संगत संस्करणों का उपयोग कर रहे हैं:

```bash
node --version
npm --version
```

    यदि आप पुराने संस्करण का उपयोग कर रहे हैं, तो Node.js और npm को अपडेट करने पर विचार करें।

11. **अनुमति समस्याओं की जाँच करें**
    यदि आपको अनुमति त्रुटियाँ मिल रही हैं:

    ```bash
    # यूनिक्स-आधारित सिस्टम के लिए
    sudo npm install -g intlayer

    # या npm की डिफ़ॉल्ट डायरेक्टरी बदलें
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # इसे अपनी ~/.profile या ~/.bashrc में जोड़ें:
    export PATH=~/.npm-global/bin:$PATH
    ```
