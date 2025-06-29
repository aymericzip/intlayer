---
docName: dictionary__file
url: https://intlayer.org/doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: फ़ाइल
description: जानें कि Intlayer के `file` फ़ंक्शन का उपयोग करके बाहरी फ़ाइलों को अपनी सामग्री शब्दकोश में कैसे एम्बेड करें। यह दस्तावेज़ बताता है कि Intlayer फ़ाइल सामग्री को गतिशील रूप से कैसे प्रबंधित करता है।
keywords:
  - फ़ाइल
  - अंतर्राष्ट्रीयकरण
  - डॉक्यूमेंटेशन
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# फ़ाइल सामग्री / फ़ाइल एम्बेडिंग कैसे काम करता है

## फ़ाइल एम्बेडिंग कैसे काम करती है

Intlayer में, `file` फ़ंक्शन बाहरी फ़ाइल सामग्री को एक डिक्शनरी में एम्बेड करने की अनुमति देता है। यह दृष्टिकोण सुनिश्चित करता है कि Intlayer स्रोत फ़ाइल को पहचानता है, जिससे Intlayer विज़ुअल एडिटर और CMS के साथ सहज एकीकरण सक्षम होता है। सीधे `import`, `require`, या `fs` फ़ाइल पढ़ने के तरीकों के विपरीत, `file` का उपयोग फ़ाइल को डिक्शनरी से जोड़ता है, जिससे Intlayer को फ़ाइल संपादित होने पर सामग्री को गतिशील रूप से ट्रैक और अपडेट करने की अनुमति मिलती है।

## फ़ाइल सामग्री सेट करना

अपने Intlayer प्रोजेक्ट में फ़ाइल सामग्री एम्बेड करने के लिए, सामग्री मॉड्यूल में `file` फ़ंक्शन का उपयोग करें। नीचे विभिन्न कार्यान्वयन प्रदर्शित करने वाले उदाहरण दिए गए हैं।

### TypeScript कार्यान्वयन

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

### ECMAScript Module (ESM) कार्यान्वयन

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

### CommonJS कार्यान्वयन

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

### JSON कॉन्फ़िगरेशन

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

React घटक में एम्बेड की गई फ़ाइल सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक आयात करें और उपयोग करें। यह निर्दिष्ट कुंजी से सामग्री को पुनः प्राप्त करता है और इसे गतिशील रूप से प्रदर्शित करने की अनुमति देता है।

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

## बहुभाषी Markdown उदाहरण

संपादन योग्य बहुभाषी Markdown फ़ाइलों का समर्थन करने के लिए, आप Markdown सामग्री फ़ाइल के विभिन्न भाषा संस्करणों को परिभाषित करने के लिए `file` को `t()` और `md()` के साथ उपयोग कर सकते हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        hi: file("src/components/test.hi.md"),
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
        hi: file("src/components/test.hi.md"),
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
        hi: file("src/components/test.hi.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

यह सेटअप उपयोगकर्ता की भाषा प्राथमिकता के आधार पर सामग्री को गतिशील रूप से पुनः प्राप्त करने की अनुमति देता है। जब Intlayer विज़ुअल एडिटर या CMS में उपयोग किया जाता है, तो सिस्टम पहचान करेगा कि सामग्री निर्दिष्ट Markdown फ़ाइलों से आती है और सुनिश्चित करेगा कि वे संपादन योग्य बनी रहें।

## Intlayer फ़ाइल सामग्री को कैसे संभालता है

`file` फ़ंक्शन Node.js के `fs` मॉड्यूल पर आधारित है, जो निर्दिष्ट फ़ाइल की सामग्री को पढ़ता है और इसे डिक्शनरी में सम्मिलित करता है। जब Intlayer विज़ुअल एडिटर या CMS के साथ उपयोग किया जाता है, तो Intlayer डिक्शनरी और फ़ाइल के बीच संबंध को ट्रैक कर सकता है। यह Intlayer को सक्षम बनाता है:

- पहचानने के लिए कि सामग्री किसी विशिष्ट फ़ाइल से उत्पन्न होती है।
- लिंक की गई फ़ाइल संपादित होने पर डिक्शनरी सामग्री को स्वचालित रूप से अपडेट करने के लिए।
- फ़ाइल और डिक्शनरी के बीच समन्वय सुनिश्चित करने के लिए, सामग्री की अखंडता को बनाए रखते हुए।

## अतिरिक्त संसाधन

Intlayer में फ़ाइल एम्बेडिंग को कॉन्फ़िगर और उपयोग करने पर अधिक विवरण के लिए, निम्नलिखित संसाधनों का संदर्भ लें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)
- [Markdown सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/markdown.md)
- [अनुवाद सामग्री दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md)

ये संसाधन फ़ाइल एम्बेडिंग, सामग्री प्रबंधन, और विभिन्न फ्रेमवर्क के साथ Intlayer के एकीकरण में और अंतर्दृष्टि प्रदान करते हैं।
