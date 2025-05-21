# Intlayer CLI

## पैकेज इंस्टॉल करें

आवश्यक पैकेजों को npm का उपयोग करके इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
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
npx intlayer dictionaries build
```

या वॉच मोड में

```bash
npx intlayer dictionaries build --watch
```

यह कमांड आपकी घोषणा सामग्री फाइलों को डिफ़ॉल्ट रूप से `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}` के रूप में खोजेगा। और `.intlayer` डायरेक्टरी में शब्दकोश बनाएगा।

### शब्दकोश पुश करें

```bash
npx intlayer dictionary push
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) इंस्टॉल है, तो आप शब्दकोशों को संपादक में भी पुश कर सकते हैं। यह कमांड शब्दकोशों को [संपादक](https://intlayer.org/dashboard) में उपलब्ध कराएगा। इस तरह, आप अपनी टीम के साथ अपने शब्दकोश साझा कर सकते हैं और अपनी सामग्री को अपनी एप्लिकेशन के कोड को संपादित किए बिना संपादित कर सकते हैं।

##### तर्क:

- `-d`, `--dictionaries`: पुश करने के लिए शब्दकोशों के ID। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश पुश किए जाएंगे।
  > उदाहरण: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`
- `-r`, `--deleteLocaleDictionary`: शब्दकोश पुश करने के बाद लोकेल डायरेक्टरी को हटाने के प्रश्न को छोड़ देता है और हटा देता है। डिफ़ॉल्ट रूप से, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह रिमोट शब्दकोश की सामग्री को ओवरराइड करता है।
  > उदाहरण: `npx intlayer dictionary push -r`
- `-k`, `--keepLocaleDictionary`: शब्दकोश पुश करने के बाद लोकेल डायरेक्टरी को हटाने के प्रश्न को छोड़ देता है और रखता है। डिफ़ॉल्ट रूप से, यदि शब्दकोश स्थानीय रूप से परिभाषित है, तो यह रिमोट शब्दकोश की सामग्री को ओवरराइड करता है।
  > उदाहरण: `npx intlayer dictionary push -k`
- `--env`: पर्यावरण निर्दिष्ट करता है (उदाहरण: `development`, `production`)।
- `--env-file`: वेरिएबल्स लोड करने के लिए कस्टम पर्यावरण फ़ाइल प्रदान करता है।
- `--base-dir`: प्रोजेक्ट की बेस डायरेक्टरी निर्दिष्ट करता है।
- `--verbose`: डीबगिंग के लिए विस्तृत लॉगिंग सक्षम करता है।
- `--git-diff`: केवल git रिपॉजिटरी में अनपुश्ड परिवर्तनों वाले शब्दकोशों को निष्पादित करता है।
- `--git-diff-base`: git diff के लिए बेस रेफरेंस निर्दिष्ट करता है।
- `--git-diff-current`: git diff के लिए वर्तमान रेफरेंस निर्दिष्ट करता है।
- `--uncommitted`: अनकमिटेड परिवर्तनों को शामिल करता है।
- `--unpushed`: अनपुश्ड परिवर्तनों को शामिल करता है।
- `--untracked`: अनट्रैक्ड फ़ाइलों को शामिल करता है।

### दूरस्थ शब्दकोश खींचें

```bash
npx intlayer dictionary pull
```

यदि [intlayer संपादक](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_visual_editor.md) इंस्टॉल है, तो आप संपादक से शब्दकोश खींच सकते हैं। इस तरह, आप अपनी एप्लिकेशन की आवश्यकता के लिए अपने शब्दकोशों की सामग्री को ओवरराइट कर सकते हैं।

##### तर्क:

- `-d, --dictionaries`: खींचने के लिए शब्दकोशों की आईडी। यदि निर्दिष्ट नहीं किया गया है, तो सभी शब्दकोश खींचे जाएंगे।
  > उदाहरण: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`
- `--newDictionariesPath`: नई शब्दकोशों को सहेजने के लिए डायरेक्टरी का पथ। यदि निर्दिष्ट नहीं किया गया है, तो नई शब्दकोशें प्रोजेक्ट की `./intlayer-dictionaries` डायरेक्टरी में सहेजी जाएंगी। यदि आपकी शब्दकोश सामग्री में `filePath` फ़ील्ड निर्दिष्ट है, तो शब्दकोश इस तर्क पर विचार नहीं करेंगे और निर्दिष्ट `filePath` डायरेक्टरी में सहेजे जाएंगे।
- `--env`: पर्यावरण निर्दिष्ट करता है (उदाहरण: `development`, `production`)।
- `--env-file`: वेरिएबल्स लोड करने के लिए कस्टम पर्यावरण फ़ाइल प्रदान करता है।
- `--base-dir`: प्रोजेक्ट की बेस डायरेक्टरी निर्दिष्ट करता है।
- `--verbose`: डीबगिंग के लिए विस्तृत लॉगिंग सक्षम करता है।

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

- **`--source-locale [sourceLocale]`**  
  अनुवाद के लिए स्रोत लोकेल। यदि निर्दिष्ट नहीं किया गया है, तो कॉन्फ़िगरेशन से डिफ़ॉल्ट लोकेल का उपयोग किया जाएगा।

- **`--output-locales [outputLocales...]`**  
  अनुवाद के लिए लक्ष्य लोकेल। यदि निर्दिष्ट नहीं किया गया है, तो स्रोत लोकेल को छोड़कर कॉन्फ़िगरेशन से सभी लोकेल का उपयोग किया जाएगा।

- **`--mode [mode]`**  
  अनुवाद मोड: 'complete', 'review', या 'missing-only'। डिफ़ॉल्ट 'missing-only' है।

- **`--git-diff`**  
  केवल git रिपॉजिटरी में अनपुश्ड परिवर्तनों वाले शब्दकोशों को निष्पादित करता है।

- **`--git-diff-base`**  
  git diff के लिए बेस रेफरेंस निर्दिष्ट करता है।

- **`--git-diff-current`**  
  git diff के लिए वर्तमान रेफरेंस निर्दिष्ट करता है।

- **`--uncommitted`**  
  अनकमिटेड परिवर्तनों को शामिल करता है।

- **`--unpushed`**  
  अनपुश्ड परिवर्तनों को शामिल करता है।

- **`--untracked`**  
  अनट्रैक्ड फ़ाइलों को शामिल करता है।

- **`--keys [keys...]`**  
  निर्दिष्ट कीज़ के आधार पर शब्दकोशों को फ़िल्टर करता है।

- **`--excluded-keys [excludedKeys...]`**  
  निर्दिष्ट कीज़ के आधार पर शब्दकोशों को बाहर करता है।

- **`--path-filter [pathFilters...]`**  
  फ़ाइल पथ के glob पैटर्न के आधार पर शब्दकोशों को फ़िल्टर करता है।

- **`--model [model]`**  
  अनुवाद के लिए उपयोग करने के लिए AI मॉडल (उदाहरण: `gpt-3.5-turbo`)।

- **`--provider [provider]`**  
  अनुवाद के लिए उपयोग करने के लिए AI प्रदाता।

- **`--temperature [temperature]`**  
  AI मॉडल के लिए तापमान सेटिंग।

- **`--api-key [apiKey]`**  
  AI सेवा के लिए अपनी खुद की API कुंजी प्रदान करता है।

- **`--custom-prompt [prompt]`**  
  अनुवाद निर्देशों के लिए कस्टम प्रॉम्प्ट प्रदान करता है।

- **`--application-context [applicationContext]`**  
  AI अनुवाद के लिए अतिरिक्त संदर्भ प्रदान करता है।

- **`--env`**  
  पर्यावरण निर्दिष्ट करता है (उदाहरण: `development`, `production`)।

- **`--env-file [envFile]`**  
  वेरिएबल्स लोड करने के लिए कस्टम पर्यावरण फ़ाइल प्रदान करता है।

- **`--base-dir`**  
  प्रोजेक्ट की बेस डायरेक्टरी निर्दिष्ट करता है।

- **`--verbose`**  
  डीबगिंग के लिए विस्तृत लॉगिंग सक्षम करता है।

##### उदाहरण:

```bash
npx intlayer fill --file src/home/*.content.ts --source-locale en --output-locales fr es --model gpt-3.5-turbo
```

यह कमांड GPT-3.5 Turbo मॉडल का उपयोग करके `src/home/` डायरेक्टरी में सभी कंटेंट डिक्लेरेशन फ़ाइलों की सामग्री को अंग्रेजी से फ्रेंच और स्पेनिश में अनुवादित करती है।

### कॉन्फ़िगरेशन प्रबंधित करें

#### कॉन्फ़िगरेशन प्राप्त करें

`get configuration` कमांड Intlayer की वर्तमान कॉन्फ़िगरेशन प्राप्त करती है, विशेष रूप से लोकेल सेटिंग्स। यह कॉन्फ़िगरेशन की जांच के लिए उपयोगी है।

```bash
npx intlayer config get
```

##### तर्क:

- **`--env`**: पर्यावरण निर्दिष्ट करता है (उदाहरण: `development`, `production`)।
- **`--env-file`**: वेरिएबल्स लोड करने के लिए कस्टम पर्यावरण फ़ाइल प्रदान करता है।
- **`--base-dir`**: प्रोजेक्ट की बेस डायरेक्टरी निर्दिष्ट करता है।
- **`--verbose`**: डीबगिंग के लिए विस्तृत लॉगिंग सक्षम करता है।

#### कॉन्फ़िगरेशन पुश करें

`push configuration` कमांड कॉन्फ़िगरेशन को Intlayer CMS और एडिटर में अपलोड करती है। यह कदम Intlayer विज़ुअल एडिटर में रिमोट शब्दकोशों का उपयोग करने के लिए आवश्यक है।

```bash
npx intlayer config push
```

##### तर्क:

- **`--env`**: पर्यावरण निर्दिष्ट करता है (उदाहरण: `development`, `production`)।
- **`--env-file`**: वेरिएबल्स लोड करने के लिए कस्टम पर्यावरण फ़ाइल प्रदान करता है।
- **`--base-dir`**: प्रोजेक्ट की बेस डायरेक्टरी निर्दिष्ट करता है।
- **`--verbose`**: डीबगिंग के लिए विस्तृत लॉगिंग सक्षम करता है।

कॉन्फ़िगरेशन पुश करने पर, आपका प्रोजेक्ट पूरी तरह से Intlayer CMS में एकीकृत हो जाता है, जिससे टीमों के बीच निर्बाध शब्दकोश प्रबंधन संभव होता है।

## अपने `package.json` में intlayer कमांड का उपयोग करें

```json fileName="package.json"
"scripts": {
  "intlayer:build": "npx intlayer dictionaries build",
  "intlayer:watch": "npx intlayer dictionaries build --watch",
  "intlayer:push": "npx intlayer dictionary push",
  "intlayer:pull": "npx intlayer dictionary pull",
  "intlayer:audit": "npx intlayer audit"
}
```

## intlayer कमांड को डीबग करें

### 1. **सुनिश्चित करें कि आप नवीनतम संस्करण का उपयोग कर रहे हैं**

चलाएँ:

```bash
npx intlayer --version                  # वर्तमान स्थानीय intlayer संस्करण
npx intlayer@latest --version          # नवीनतम intlayer संस्करण
```

### 2. **जांचें कि कमांड पंजीकृत है या नहीं**

आप इससे जांच सकते हैं:

```bash
npx intlayer --help      # उपलब्ध कमांड और उपयोग जानकारी की सूची दिखाता है
man npx intlayer         # कमांड के लिए मैनुअल पेज दिखाता है (यदि उपलब्ध है)
```

### 3. **अपने टर्मिनल को पुनरारंभ करें**

कभी-कभी नए कमांड को पहचानने के लिए टर्मिनल को पुनरारंभ करना आवश्यक होता है।

### 4. **npx कैश को साफ़ करें (यदि आप पुराने संस्करण में फंसे हैं)**

```bash
npx clear-npx-cache
```
