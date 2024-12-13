# अनुवाद

## अनुवादों को परिभाषित करना

`intlayer` में `t` फ़ंक्शन आपको कई भाषाओं में सामग्री घोषित करने की अनुमति देता है। यह फ़ंक्शन प्रकार सुरक्षा सुनिश्चित करता है, यदि कोई अनुवाद गायब है तो त्रुटि उठाता है, जो कि विशेष रूप से TypeScript वातावरण में उपयोगी है।

### TypeScript का उपयोग करना

TypeScript फ़ाइल में अनुवादों के साथ सामग्री कैसे घोषित की जाए, इसका एक उदाहरण:

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      hi: "हमारे एप्लिकेशन में आपका स्वागत है",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### ECMAScript मॉड्यूल का उपयोग करना

यदि आप ECMAScript मॉड्यूल का उपयोग कर रहे हैं, तो घोषणा इस तरह दिखेगी:

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    hi: "हमारे एप्लिकेशन में आपका स्वागत है",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### CommonJS मॉड्यूल का उपयोग करना

एक CommonJS सेटअप में, आप अनुवाद इस तरह घोषित कर सकते हैं:

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    hi: "हमारे एप्लिकेशन में आपका स्वागत है",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### JSON का उपयोग करना

JSON-आधारित घोषणाओं के लिए, आप अनुवाद इस प्रकार परिभाषित कर सकते हैं:

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "hi": "हमारे एप्लिकेशन में आपका स्वागत है",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## लोकेल्स के लिए कॉन्फ़िगरेशन

सही अनुवाद संभालने के लिए, आप `intlayer.config.ts` में अनुमत्यांकित स्थानीय विकल्पों को कॉन्फ़िगर कर सकते हैं। यह कॉन्फ़िगरेशन आपको उन भाषाओं को परिभाषित करने की अनुमति देता है जिनका आपका एप्लिकेशन समर्थन करता है:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.HINDI, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## React घटकों में अनुवादों का उपयोग करना

`react-intlayer` के साथ, आप React घटकों में अनुवादों का उपयोग कर सकते हैं। यहाँ एक उदाहरण है:

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

यह घटक आपके एप्लिकेशन में सेट की गई वर्तमान स्थानीयता के आधार पर संबंधित अनुवाद लाता है।

## कस्टम सामग्री वस्तुएं

`intlayer` अनुवाद के लिए कस्टम सामग्री वस्तुओं का समर्थन करता है, जिससे आप अधिक जटिल संरचनाएँ परिभाषित कर सकते हैं जबकि प्रकार सुरक्षा सुनिश्चित कर सकते हैं। यहाँ एक कस्टम वस्तु के साथ एक उदाहरण है:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      hi: {
        title: "पृष्ठ शीर्षक",
        content: "पृष्ठ सामग्री",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
