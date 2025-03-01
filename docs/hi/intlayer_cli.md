# Intlayer CLI

## पैकेज इंस्टॉल करें

आवश्यक पैकेजों को npm का उपयोग करके इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

> यदि `intlayer` पैकेज पहले से इंस्टॉल है, तो CLI स्वचालित रूप से इंस्टॉल हो जाता है। आप इस चरण को छोड़ सकते हैं।

## intlayer-cli पैकेज

`intlayer-cli` पैकेज आपके [intlayer घोषणाओं](https://github.com/aymericzip/intlayer/blob/main/docs/hi/dictionary/get_started.md) को शब्दकोशों में ट्रांसपाइल करने का उद्देश्य रखता है।

यह पैकेज सभी intlayer फाइलों को ट्रांसपाइल करेगा, जैसे `src/**/*.content.{ts|js|mjs|cjs|json}`। [देखें कि अपने Intlayer घोषणा फाइलों को कैसे घोषित करें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

intlayer शब्दकोशों को इंटरप्रेट करने के लिए आप इंटरप्रेटर्स का उपयोग कर सकते हैं, जैसे [react-intlayer](https://www.npmjs.com/package/react-intlayer), या [next-intlayer](https://www.npmjs.com/package/next-intlayer)।

## कॉन्फ़िगरेशन फ़ाइल समर्थन

Intlayer कई कॉन्फ़िगरेशन फ़ाइल प्रारूपों को स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

उपलब्ध स्थानीयताओं या अन्य पैरामीटरों को कैसे कॉन्फ़िगर करें, यह देखने के लिए [यहां कॉन्फ़िगरेशन दस्तावेज़ देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md)।

## intlayer कमांड चलाएं

### शब्दकोश बनाएं

अपने शब्दकोश बनाने के लिए, आप निम्नलिखित कमांड चला सकते हैं:

```bash
npx intlayer build
```

या वॉच मोड में

```bash
npx intlayer build --watch
```

यह कमांड आपकी घोषणा सामग्री फाइलों को डिफ़ॉल्ट रूप से `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` के रूप में खोजेगा। और `.intlayer` डायरेक्टरी में शब्दकोश बनाएगा।

### शब्दकोश पुश करें

```bash
npx intlayer dictionary push
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) इंस्टॉल है, तो आप शब्दकोशों को संपादक में भी पुश कर सकते हैं। यह कमांड शब्दकोशों को [संपादक](https://intlayer.org/dashboard) में उपलब्ध कराएगा। इस तरह, आप अपनी टीम के साथ अपने शब्दकोश साझा कर सकते हैं और अपनी सामग्री को अपनी एप्लिकेशन के कोड को संपादित किए बिना संपादित कर सकते हैं।

##### तर्क:

- `-d`, `--dictionaries`: पुश करने के लिए शब्दकोशों की आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश पुश किए जाएंगे।
  > उदाहरण: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: जब शब्दकोश पुश किए जाते हैं, तो स्थानीय निर्देशिकाओं को हटाने के लिए पूछने वाले प्रश्न को छोड़ें, और उन्हें हटा दें। डिफ़ॉल्ट रूप से, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह दूरस्थ शब्दकोश सामग्री को ओवरराइट करेगा।
  > उदाहरण: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: जब शब्दकोश पुश किए जाते हैं, तो स्थानीय निर्देशिकाओं को हटाने के लिए पूछने वाले प्रश्न को छोड़ें, और उन्हें बनाए रखें। डिफ़ॉल्ट रूप से, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह दूरस्थ शब्दकोश सामग्री को ओवरराइट करेगा।
  > उदाहरण: `npx intlayer dictionary push -k`

### दूरस्थ शब्दकोश खींचें

```bash
npx intlayer dictionary pull
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) इंस्टॉल है, तो आप संपादक से शब्दकोश खींच सकते हैं। इस तरह, आप अपनी एप्लिकेशन की आवश्यकता के लिए अपने शब्दकोशों की सामग्री को ओवरराइट कर सकते हैं।

##### तर्क:

- `-d, --dictionaries`: खींचने के लिए शब्दकोशों की आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश खींचे जाएंगे।
  > उदाहरण: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : नई शब्दकोशों को सहेजने के लिए डायरेक्टरी का पथ। यदि निर्दिष्ट नहीं किया गया है, तो नई शब्दकोशें प्रोजेक्ट की `./intlayer-dictionaries` डायरेक्टरी में सहेजी जाएंगी। यदि आपकी शब्दकोश सामग्री में `filePath` फ़ील्ड निर्दिष्ट है, तो शब्दकोश इस तर्क पर विचार नहीं करेंगे और निर्दिष्ट `filePath` डायरेक्टरी में सहेजे जाएंगे।

##### उदाहरण:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```

### शब्दकोश ऑडिट करें

```bash
npx intlayer audit
```

यह कमांड आपकी सामग्री घोषणा फाइलों का विश्लेषण संभावित समस्याओं के लिए करता है जैसे कि गायब अनुवाद, संरचनात्मक असंगतियां, या प्रकार बेमेल। यदि यह कोई समस्या पाता है, तो **intlayer audit** आपके शब्दकोशों को सुसंगत और पूर्ण रखने के लिए अपडेट का प्रस्ताव करेगा या लागू करेगा।

##### तर्क:

- **`-f, --files [files...]`**  
  ऑडिट करने के लिए विशिष्ट सामग्री घोषणा फाइलों की सूची। यदि प्रदान नहीं किया गया है, तो सभी खोजे गए `*.content.{ts,js,mjs,cjs,tsx,jsx,json}` फाइलों का ऑडिट किया जाएगा।

- **`--exclude [excludedGlobs...]`**  
  ऑडिट से बाहर निकालने के लिए ग्लोब पैटर्न (जैसे `--exclude "src/test/**"`)।

- **`-m, --model [model]`**  
  ऑडिट के लिए उपयोग करने के लिए ChatGPT मॉडल (जैसे, `gpt-3.5-turbo`)।

- **`-p, --custom-prompt [prompt]`**  
  अपने ऑडिट निर्देशों के लिए एक कस्टम प्रॉम्प्ट प्रदान करें।

- **`-l, --async-limit [asyncLimit]`**  
  एक साथ संसाधित की जाने वाली फाइलों की अधिकतम संख्या।

- **`-k, --open-ai-api-key [openAiApiKey]`**  
  OAuth2 प्रमाणीकरण को बायपास करने के लिए अपनी OpenAI API कुंजी प्रदान करें।

##### उदाहरण:

```bash
npx intlayer audit --exclude "tests/**" --model gpt-3.5-turbo
```

यह कमांड `tests/**` के तहत किसी भी फाइल को अनदेखा करेगा और खोजी गई सामग्री घोषणा फाइलों का ऑडिट करने के लिए `gpt-3.5-turbo` मॉडल का उपयोग करेगा। यदि कोई समस्या पाई जाती है—जैसे गायब अनुवाद—तो उन्हें मूल फाइल संरचना को बनाए रखते हुए इन-प्लेस सही किया जाएगा।

### कॉन्फ़िगरेशन प्रबंधित करें

#### कॉन्फ़िगरेशन प्राप्त करें

`get configuration` कमांड Intlayer के लिए वर्तमान कॉन्फ़िगरेशन को पुनः प्राप्त करता है, विशेष रूप से स्थानीय सेटिंग्स। यह आपके सेटअप को सत्यापित करने के लिए उपयोगी है।

```bash
npx intlayer config get
```

##### तर्क:

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file`**: वेरिएबल्स को लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--verbose`**: डिबगिंग के लिए विस्तृत लॉगिंग सक्षम करें।

#### कॉन्फ़िगरेशन पुश करें

`push configuration` कमांड आपके कॉन्फ़िगरेशन को Intlayer CMS और संपादक में अपलोड करता है। यह चरण Intlayer विज़ुअल एडिटर में दूरस्थ शब्दकोशों के उपयोग को सक्षम करने के लिए आवश्यक है।

```bash
npx intlayer config push
```

##### तर्क:

- **`--env`**: पर्यावरण निर्दिष्ट करें (जैसे, `development`, `production`)।
- **`--env-file`**: वेरिएबल्स को लोड करने के लिए एक कस्टम पर्यावरण फ़ाइल प्रदान करें।
- **`--verbose`**: डिबगging के लिए विस्तृत लॉगिंग सक्षम करें।

कॉन्फ़िगरेशन को पुश करके, आपका प्रोजेक्ट Intlayer CMS के साथ पूरी तरह से एकीकृत हो जाता है, जिससे टीमों के बीच सहज शब्दकोश प्रबंधन सक्षम होता है।

## अपने `package.json` में intlayer कमांड का उपयोग करें

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```
