---
docName: dictionary__condition
url: https://intlayer.org/doc/concept/content/condition
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/condition.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: शर्तों के साथ सामग्री
description: Intlayer में शर्तीय सामग्री का उपयोग करके विशिष्ट शर्तों के आधार पर सामग्री को गतिशील रूप से प्रदर्शित करने का तरीका जानें। इस दस्तावेज़ का पालन करें और अपने प्रोजेक्ट में शर्तों को कुशलतापूर्वक लागू करें।
keywords:
  - शर्तों के साथ सामग्री
  - गतिशील रेंडरिंग
  - प्रलेखन
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Conditional Content / Condition in Intlayer

## शर्त कैसे काम करती है

Intlayer में, सशर्त सामग्री `cond` फ़ंक्शन के माध्यम से प्राप्त की जाती है, जो विशिष्ट शर्तों (आमतौर पर बूलियन मान) को उनकी संबंधित सामग्री से मैप करता है। यह दृष्टिकोण आपको दी गई शर्त के आधार पर सामग्री को गतिशील रूप से चुनने में सक्षम बनाता है। जब React Intlayer या Next Intlayer के साथ एकीकृत किया जाता है, तो रनटाइम पर प्रदान की गई शर्त के अनुसार उपयुक्त सामग्री स्वचालित रूप से चुनी जाती है।

## सशर्त सामग्री सेट करना

अपने Intlayer प्रोजेक्ट में सशर्त सामग्री सेट करने के लिए, एक सामग्री मॉड्यूल बनाएं जिसमें आपकी सशर्त परिभाषाएँ शामिल हों। नीचे विभिन्न प्रारूपों में उदाहरण दिए गए हैं।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "मेरी सामग्री जब यह सत्य है",
      false: "मेरी सामग्री जब यह असत्य है",
      fallback: "मेरी सामग्री जब शर्त विफल होती है", // वैकल्पिक
    }),
  },
} satisfies Dictionary;

export default myConditionalContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { cond } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "मेरी सामग्री जब यह सत्य है",
      false: "मेरी सामग्री जब यह असत्य है",
      fallback: "मेरी सामग्री जब शर्त विफल होती है", // वैकल्पिक
    }),
  },
};

export default myConditionalContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { cond } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "मेरी सामग्री जब यह सत्य है",
      false: "मेरी सामग्री जब यह असत्य है",
      fallback: "मेरी सामग्री जब शर्त विफल होती है", // वैकल्पिक
    }),
  },
};

module.exports = myConditionalContent;
```

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myCondition": {
      "nodeType": "condition",
      "condition": {
        "true": "मेरी सामग्री जब यह सत्य है",
        "false": "मेरी सामग्री जब यह असत्य है",
        "fallback": "मेरी सामग्री जब शर्त विफल होती है", // वैकल्पिक
      },
    },
  },
}
```

> यदि कोई फॉलबैक घोषित नहीं किया गया है, तो यदि शर्त मान्य नहीं है, तो अंतिम घोषित कुंजी को फॉलबैक के रूप में लिया जाएगा।

## React Intlayer के साथ सशर्त सामग्री का उपयोग करना

React घटक के भीतर सशर्त सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक आयात करें और उपयोग करें। यह हुक निर्दिष्ट कुंजी के लिए सामग्री प्राप्त करता है और आपको उपयुक्त आउटपुट चुनने के लिए एक शर्त पास करने की अनुमति देता है।

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब यह सत्य है */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब यह असत्य है */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब शर्त विफल होती है */
          myCondition("")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब शर्त विफल होती है */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब यह सत्य है */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब यह असत्य है */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब शर्त विफल होती है */
          myCondition("")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब शर्त विफल होती है */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

export default ConditionalComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ConditionalComponent = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब यह सत्य है */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब यह असत्य है */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब शर्त विफल होती है */
          myCondition("")
        }
      </p>
      <p>
        {
          /* आउटपुट: मेरी सामग्री जब शर्त विफल होती है */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## अतिरिक्त संसाधन

कॉन्फ़िगरेशन और उपयोग पर अधिक विस्तृत जानकारी के लिए, निम्नलिखित संसाधनों का संदर्भ लें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और फ्रेमवर्क्स में Intlayer की सेटअप और उपयोग पर और अधिक जानकारी प्रदान करते हैं।
