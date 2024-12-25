# Intlayer CLI

## पैकेज स्थापित करें

आवश्यक पैकेजों को npm का उपयोग करके स्थापित करें:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> यदि `intlayer` पैकेज पहले से स्थापित है, तो cli स्वचालित रूप से स्थापित हो जाता है। आप इस चरण को छोड़ सकते हैं।

## intlayer-cli पैकेज

`intlayer-cli` पैकेज आपके [intlayer घोषणाओं](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) को शब्दकोशों में बदलने का इरादा रखता है।

यह पैकेज सभी intlayer फ़ाइलों का परिवर्णन करेगा, जैसे कि `src/**/*.content.{ts|js|mjs|cjs|json}`। [आपकी Intlayer घोषणा फ़ाइलों को घोषित करने का तरीका देखें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

intlayer शब्दकोशों को समझने के लिए आप व्याख्याकारों का उपयोग कर सकते हैं, जैसे कि [react-intlayer](https://www.npmjs.com/package/react-intlayer), या [next-intlayer](https://www.npmjs.com/package/next-intlayer)

## कॉन्फ़िगरेशन फ़ाइल समर्थन

Intlayer कई कॉन्फ़िगरेशन फ़ाइल स्वरूपों को स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

उपलब्ध स्थानीयताओं या अन्य पैरामीटर को कॉन्फ़िगर करने के तरीके के लिए, [यहाँ कॉन्फ़िगरेशन दस्तावेज़ देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md)。

## intlayer कमांड चलाएँ

### शब्दकोश बनाना

अपने शब्दकोश बनाने के लिए, आप निम्नलिखित कमांड चला सकते हैं:

```bash
npx intlayer build
```

या वॉच मोड में

```bash
npx intlayer build --watch
```

यह कमांड आपके उद्घोषणा सामग्री फ़ाइलों को डिफ़ॉल्ट रूप से `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` के रूप में खोजेगा। और `.intlayer` निर्देशिका में शब्दकोश बनाएगा।

### शब्दकोश भेजना

```bash
npx intlayer push
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) स्थापित है, तो आप संपादक को शब्दकोश भी भेज सकते हैं। यह कमांड शब्दकोशों को [संपादक](https://intlayer.org/dashboard) के लिए उपलब्ध कराने की अनुमति देगा। इस तरह, आप अपने शब्दकोशों को अपनी टीम के साथ साझा कर सकते हैं और बिना अपने अनुप्रयोग के कोड को संपादित किए अपनी सामग्री को संपादित कर सकते हैं।

##### तर्क:

- `-d`, `--dictionaries`: खींचने के लिए शब्दकोश के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश भेजे जाएंगे।
  > उदाहरण: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: एक प्रश्न को छोड़ें जो शब्दकोश भेजे जाने के बाद स्थानीय निर्देशिकाओं को हटाने के लिए पूछता है। डिफ़ॉल्ट के रूप में, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह दूरस्थ शब्दकोश सामग्री को अधिलेखित करेगा।
  > उदाहरण: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: एक प्रश्न को छोड़ें जो शब्दकोश भेजे जाने के बाद स्थानीय निर्देशिकाओं को हटाने के लिए पूछता है। डिफ़ॉल्ट के रूप में, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह दूरस्थ शब्दकोश सामग्री को अधिलेखित करेगा।
  > उदाहरण: `npx intlayer push -k`

### दूरस्थ शब्दकोश खींचना

```bash
npx intlayer pull
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) स्थापित है, तो आप संपादक से शब्दकोश भी खींच सकते हैं। इस तरह, आप अपने अनुप्रयोग की आवश्यकताओं के लिए अपने शब्दकोशों की सामग्री को अधिलेखित कर सकते हैं।

##### तर्क:

- `-d, --dictionaries`: खींचने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश खींचे जाएंगे।
  > उदाहरण: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: उस निर्देशिका का पथ जहाँ नए शब्दकोश सहेजे जाएंगे। यदि निर्दिष्ट नहीं किया गया है, तो समाचार शब्दकोश परियोजना के `./intlayer-dictionaries` निर्देशिका में सहेजे जाएंगे। यदि आपकी शब्दकोश सामग्री में `filePath` फ़ील्ड निर्दिष्ट है, तो शब्दकोश इस तर्क पर विचार नहीं करेंगे और निर्दिष्ट `filePath` निर्देशिका में सहेजे जाएंगे।

##### उदाहरण:

```bash
npx intlayer pull --newDictionariesPath ./my-dictionaries-dir/
```

### शब्दकोशों का ऑडिट करना

```bash
npx intlayer audit
```

यह कमांड आपके सामग्री उद्घोषणा फ़ाइलों का विश्लेषण करता है संभावित मुद्दों के लिए जैसे कि अनुवाद गायब होना, संरचनात्मक असंगतताएँ, या प्रकार असंगतताएँ। यदि यह कोई समस्या पाता है, तो **intlayer audit** आपके शब्दकोशों को स्थिर और पूर्ण रखने के लिए अपडेट का प्रस्ताव या लागू करेगा।

##### तर्क:

- **`-f, --files [files...]`**  
  ऑडिट करने के लिए विशिष्ट सामग्री उद्घोषणा फ़ाइलों की एक सूची। यदि प्रदान नहीं किया गया है, तो सभी खोजे गए `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` फ़ाइलों की ऑडिट की जाएगी।

- **`--exclude [excludedGlobs...]`**  
  ऑडिट से बाहर करने के लिए ग्लोब पैटर्न (जैसे `--exclude "src/test/**"`).

- **`-m, --model [model]`**  
  ऑडिट के लिए उपयोग करने के लिए ChatGPT मॉडल (जैसे, `gpt-3.5-turbo`).

- **`-p, --custom-prompt [prompt]`**  
  आपके ऑडिट निर्देशों के लिए एक कस्टम प्रॉम्प्ट प्रदान करें।

- **`-l, --async-limit [asyncLimit]`**  
  अधिकतम संख्या फ़ाइलें जो समवर्ती रूप से संसाधित की जाएंगी।

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  OAuth2 प्रमाणीकरण को बाईपास करने के लिए अपना OpenAI API कुंजी प्रदान करें।

##### उदाहरण:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

यह कमांड `tests/**` के तहत किसी भी फ़ाइलों की अनदेखी करेगा और खोजी गई सामग्री उद्घोषणा फ़ाइलों का ऑडिट करने के लिए `gpt-3.5-turbo` मॉडल का उपयोग करेगा। यदि कोई समस्याएँ पाई जाती हैं—जैसे कि अनुवाद गायब होना—तो इन्हें मूल फ़ाइल संरचना को बनाए रखते हुए स्थान पर ठीक किया जाएगा।

## अपने `package.json` में intlayer कमांड का उपयोग करें

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:audit": "npx intlayer audit"
}
```
