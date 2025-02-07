# सशर्त सामग्री / Intlayer में स्थिति

## स्थिति कैसे काम करती है

Intlayer में, सशर्त सामग्री `cond` फ़ंक्शन के माध्यम से प्राप्त होती है, जो विशिष्ट स्थितियों (आमतौर पर बूलियन मान) को उनकी संबंधित सामग्री के साथ मानचित्रित करती है। यह दृष्टिकोण आपको दी गई स्थिति के आधार पर सामग्री को गतिशील रूप से चुनने में सक्षम बनाता है। React Intlayer या Next Intlayer के साथ एकीकृत होने पर, उपयुक्त सामग्री रनटाइम के दौरान प्रदान की गई स्थिति के अनुसार स्वचालित रूप से चुनी जाती है।

## सशर्त सामग्री सेट करना

अपने Intlayer प्रोजेक्ट में सशर्त सामग्री सेट करने के लिए, एक सामग्री मॉड्यूल बनाएं जिसमें आपकी सशर्त परिभाषाएँ शामिल हों। नीचे विभिन्न प्रारूपों में उदाहरण दिए गए हैं।

### टाइपस्क्रिप्ट (`.content.ts`)

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { cond, type Dictionary } from "intlayer";

const myConditionalContent = {
  key: "my_key",
  content: {
    myCondition: cond({
      true: "my content when it's true", // यह सुनिश्चित करता है कि स्थिति सत्य होने पर यह सामग्री प्रदर्शित होगी
      false: "my content when it's false", // यह सुनिश्चित करता है कि स्थिति असत्य होने पर यह सामग्री प्रदर्शित होगी
      fallback: "my content when the condition fails", // वैकल्पिक
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
      true: "my content when it's true", // यह सुनिश्चित करता है कि स्थिति सत्य होने पर यह सामग्री प्रदर्शित होगी
      false: "my content when it's false", // यह सुनिश्चित करता है कि स्थिति असत्य होने पर यह सामग्री प्रदर्शित होगी
      fallback: "my content when the condition fails", // वैकल्पिक
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
      true: "my content when it's true", // यह सुनिश्चित करता है कि स्थिति सत्य होने पर यह सामग्री प्रदर्शित होगी
      false: "my content when it's false", // यह सुनिश्चित करता है कि स्थिति असत्य होने पर यह सामग्री प्रदर्शित होगी
      fallback: "my content when the condition fails", // वैकल्पिक
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
        "true": "my content when it's true", // यह सुनिश्चित करता है कि स्थिति सत्य होने पर यह सामग्री प्रदर्शित होगी
        "false": "my content when it's false", // यह सुनिश्चित करता है कि स्थिति असत्य होने पर यह सामग्री प्रदर्शित होगी
        "fallback": "my content when the condition fails", // वैकल्पिक
      },
    },
  },
}
```

> यदि कोई फॉलबैक घोषित नहीं किया गया है, तो अंतिम कुंजी जो घोषित की गई है, उसे फॉलबैक के रूप में लिया जाएगा यदि स्थिति सत्यापित नहीं होती है।

## React Intlayer के साथ सशर्त सामग्री का उपयोग करना

React कंपोनेंट के भीतर सशर्त सामग्री का उपयोग करने के लिए, `react-intlayer` पैकेज से `useIntlayer` हुक आयात करें और इसका उपयोग करें। यह हुक निर्दिष्ट कुंजी के लिए सामग्री लाता है और उपयुक्त आउटपुट का चयन करने के लिए आपको स्थिति प्रदान करने की अनुमति देता है।

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ConditionalComponent: FC = () => {
  const { myCondition } = useIntlayer("my_key");

  return (
    <div>
      <p>
        {
          /* स्थिति सत्य होने पर आउटपुट */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* स्थिति असत्य होने पर आउटपुट */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* स्थिति विफल होने पर आउटपुट */
          myCondition("")
        }
      </p>
      <p>
        {
          /* स्थिति विफल होने पर आउटपुट */
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
          /* स्थिति सत्य होने पर आउटपुट */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* स्थिति असत्य होने पर आउटपुट */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* स्थिति विफल होने पर आउटपुट */
          myCondition("")
        }
      </p>
      <p>
        {
          /* स्थिति विफल होने पर आउटपुट */
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
          /* स्थिति सत्य होने पर आउटपुट */
          myCondition(true)
        }
      </p>
      <p>
        {
          /* स्थिति असत्य होने पर आउटपुट */
          myCondition(false)
        }
      </p>
      <p>
        {
          /* स्थिति विफल होने पर आउटपुट */
          myCondition("")
        }
      </p>
      <p>
        {
          /* स्थिति विफल होने पर आउटपुट */
          myCondition(undefined)
        }
      </p>
    </div>
  );
};

module.exports = ConditionalComponent;
```

## अतिरिक्त संसाधन

कन्फिगरेशन और उपयोग के बारे में अधिक विस्तृत जानकारी के लिए निम्नलिखित संसाधनों का संदर्भ लें:

- [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_cli.md)
- [React Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_create_react_app.md)
- [Next Intlayer दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md)

ये संसाधन विभिन्न वातावरणों और फ्रेमवर्क में Intlayer के सेटअप और उपयोग के बारे में अधिक जानकारी प्रदान करते हैं।
