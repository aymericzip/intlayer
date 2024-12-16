# Intlayer CLI

## पैकेज स्थापित करें

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

```bash
npm install intlayer-cli
```

```bash
yarn add intlayer-cli
```

```bash
pnpm add intlayer-cli
```

> नोट: यदि `intlayer` पैकेज पहले से ही स्थापित है, तो cli अपनेआप स्थापित हो जाता है। आप इस चरण को छोड़ सकते हैं।

## intlayer-cli पैकेज

`intlayer-cli` पैकेज आपकी [intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md) घोषणाओं को शब्दकोशों में ट्रांसपाइल करने का इरादा रखता है।

यह पैकेज सभी intlayer फ़ाइलों को ट्रांसपाइल करेगा, जैसे `src/**/*.content.{ts|js|mjs|cjs|json}`। [यहां अपने Intlayer घोषणा फ़ाइलों को घोषित करने का तरीका देखें](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md)।

intlayer शब्दकोशों को व्याख्यायित करने के लिए आप व्याख्याकों का उपयोग कर सकते हैं, जैसे [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/react-intlayer/README.md), या [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/next-intlayer/README.md)

## कॉन्फ़िगरेशन फ़ाइल समर्थन

Intlayer कई कॉन्फ़िगरेशन फ़ाइल फ़ॉर्मेट को स्वीकार करता है:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

उपलब्ध लोकल्स या अन्य पैरामीटर कॉन्फ़िगर करने के लिए, [यहां कॉन्फ़िगरेशन दस्तावेज़ देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md)।

## intlayer कमांड चलाएँ

### शब्दकोश बनाना

अपने शब्दकोशों का निर्माण करने के लिए, आप कमांड चला सकते हैं:

```bash
npx intlayer build
```

या वॉच मोड में

```bash
npx intlayer build --watch
```

यह कमांड आपके घोषणा सामग्री फ़ाइलों को डिफ़ॉल्ट रूप से `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` के रूप में खोजेगा। और शब्दकोशों को `.intlayer` डायरेक्टरी में बनाएगा।

### शब्दकोश धकेलना

```bash
npx intlayer push
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) स्थापित है, तो आप संपादक को भी शब्दकोश धकेल सकते हैं। यह कमांड संपादक में [https://intlayer.org/dashboard/content](https://intlayer.org/dashboard/content) पर शब्दकोशों को उपलब्ध कराने की अनुमति देगा। इस तरह, आप अपने शब्दकोशों को अपनी टीम के साथ साझा कर सकते हैं और अपने सामग्री को बिना अपने अनुप्रयोग के कोड को संपादित किए संपादित कर सकते हैं।

##### तर्क:

- `-d`, `--dictionaries`: धकेलने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोशों को धकेल दिया जाएगा।
  > उदाहरण: `npx intlayer push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: सवाल छोड़ें कि क्या शब्दकोश धकेलने के बाद स्थानीय डायरेक्टरी को हटाना है और उन्हें हटा दें। डिफ़ॉल्ट रूप से, यदि स्थानीय रूप से शब्दकोश परिभाषित है, तो यह दूर के शब्दकोशों की सामग्री को ओवरराइट कर देगा।
  > उदाहरण: `npx intlayer push -r`
- `-k`, `--keepLocaleDictionary`: सवाल छोड़ें कि क्या शब्दकोश धकेलने के बाद स्थानीय डायरेक्टरी को हटाना है और उन्हें बनाए रखें। डिफ़ॉल्ट रूप से, यदि स्थानीय रूप से शब्दकोश परिभाषित है, तो यह दूर के शब्दकोशों की सामग्री को ओवरराइट कर देगा।
  > उदाहरण: `npx intlayer push -k`

### दूर से शब्दकोश खींचें

```bash
npx intlayer pull
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_editor.md) स्थापित है, तो आप संपादक से भी शब्दकोश खींच सकते हैं। इस तरह, आप अपने अनुप्रयोग की आवश्यकता के लिए अपने शब्दकोशों की सामग्री को ओवरराइट कर सकते हैं।

##### तर्क:

- `-d, --dictionaries`: खींचने के लिए शब्दकोशों के आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोशों को खींचा जाएगा।
  > उदाहरण: `npx intlayer pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath` : उस डायरेक्टरी का पथ जहां नए शब्दकोशों को बचाया जाएगा। यदि निर्दिष्ट नहीं किया गया है, तो समाचार शब्दकोशों को परियोजना की `./intlayer-dictionaries` डायरेक्टरी में बचाया जाएगा। यदि आपके शब्दकोश सामग्री में `filePath` फ़ील्ड निर्दिष्ट है, तो शब्दकोश इस तर्क पर विचार नहीं करेंगे और निर्दिष्ट `filePath` डायरेक्टरी में बचाए जाएंगे।
  > उदाहरण: `npx intlayer pull --newDictionariesPath ./my-dictionaries`

## अपने `package.json` में intlayer कमांड का उपयोग करें:

```json
"scripts": {
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull"
}
```
