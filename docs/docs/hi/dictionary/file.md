---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: फ़ाइल
description: जानें कि कैसे `file` फ़ंक्शन का उपयोग करके बाहरी फ़ाइलों को अपनी सामग्री शब्दकोश में एम्बेड किया जाए। यह दस्तावेज़ बताता है कि Intlayer फ़ाइल सामग्री को कैसे लिंक और गतिशील रूप से प्रबंधित करता है।
keywords:
  - फ़ाइल
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
---

# फ़ाइल सामग्री / Intlayer में फ़ाइलें एम्बेड करना

## फ़ाइल एम्बेडिंग कैसे काम करता है

Intlayer में, `file` फ़ंक्शन बाहरी फ़ाइल सामग्री को एक शब्दकोश में एम्बेड करने की अनुमति देता है। यह तरीका सुनिश्चित करता है कि Intlayer स्रोत फ़ाइल को पहचानता है, जिससे Intlayer विज़ुअल एडिटर और CMS के साथ सहज एकीकरण संभव होता है। सीधे `import`, `require`, या `fs` फ़ाइल पढ़ने के तरीकों के विपरीत, `file` का उपयोग फ़ाइल को शब्दकोश के साथ जोड़ता है, जिससे Intlayer फ़ाइल संपादित होने पर सामग्री को गतिशील रूप से ट्रैक और अपडेट कर सकता है।

## फ़ाइल सामग्री सेटअप करना

अपने Intlayer प्रोजेक्ट में फ़ाइल सामग्री एम्बेड करने के लिए, सामग्री मॉड्यूल में `file` फ़ंक्शन का उपयोग करें। नीचे विभिन्न कार्यान्वयन दिखाने वाले उदाहरण दिए गए हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## React Intlayer में फ़ाइल सामग्री का उपयोग करना

React कंपोनेंट में एम्बेडेड फ़ाइल सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक को इम्पोर्ट करें और उपयोग करें। यह निर्दिष्ट कुंजी से सामग्री प्राप्त करता है और इसे गतिशील रूप से प्रदर्शित करने की अनुमति देता है।

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## बहुभाषी मार्कडाउन उदाहरण

बहुभाषी संपादन योग्य मार्कडाउन फ़ाइलों का समर्थन करने के लिए, आप `file` को `t()` और `md()` के संयोजन में उपयोग कर सकते हैं ताकि मार्कडाउन सामग्री फ़ाइल के विभिन्न भाषा संस्करणों को परिभाषित किया जा सके।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

यह सेटअप उपयोगकर्ता की भाषा प्राथमिकता के आधार पर सामग्री को गतिशील रूप से पुनः प्राप्त करने की अनुमति देता है। जब इसे Intlayer विज़ुअल एडिटर या CMS में उपयोग किया जाता है, तो सिस्टम यह पहचान लेगा कि सामग्री निर्दिष्ट Markdown फ़ाइलों से आती है और सुनिश्चित करेगा कि वे संपादन योग्य बनी रहें।

## Intlayer फ़ाइल सामग्री को कैसे संभालता है

`file` फ़ंक्शन Node.js के `fs` मॉड्यूल पर आधारित है जो निर्दिष्ट फ़ाइल की सामग्री को पढ़ता है और इसे शब्दकोश में सम्मिलित करता है। जब इसे Intlayer विज़ुअल एडिटर या CMS के साथ संयोजन में उपयोग किया जाता है, तो Intlayer शब्दकोश और फ़ाइल के बीच संबंध को ट्रैक कर सकता है। इससे Intlayer को निम्नलिखित करने की अनुमति मिलती है:

- पहचानना कि सामग्री किसी विशिष्ट फ़ाइल से उत्पन्न होती है।
- जब लिंक की गई फ़ाइल संपादित की जाती है तो स्वचालित रूप से शब्दकोश की सामग्री को अपडेट करना।
- फ़ाइल और शब्दकोश के बीच समन्वय सुनिश्चित करें, जिससे सामग्री की अखंडता बनी रहे।

## अतिरिक्त संसाधन

Intlayer में फ़ाइल एम्बेडिंग को कॉन्फ़िगर करने और उपयोग करने के बारे में अधिक विवरण के लिए, निम्नलिखित संसाधनों को देखें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)
- [Markdown सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)
- [अनुवाद सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md)

ये संसाधन फ़ाइल एम्बेडिंग, सामग्री प्रबंधन, और Intlayer के विभिन्न फ्रेमवर्क के साथ एकीकरण के बारे में और अधिक जानकारी प्रदान करते हैं।

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
