# Translation

## Defining Translations

`intlayer` में `t` फ़ंक्शन आपको कई भाषाओं में सामग्री घोषित करने की अनुमति देता है। यह फ़ंक्शन प्रकार सुरक्षा सुनिश्चित करता है, यदि कोई अनुवाद गायब है तो एक त्रुटि उठाता है, जो विशेष रूप से TypeScript वातावरण में उपयोगी है।

### Using TypeScript

यहाँ एक उदाहरण है कि TypeScript फ़ाइल में अनुवाद के साथ सामग्री कैसे घोषित की जाए:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Using ECMAScript Modules

यदि आप ECMAScript मॉड्यूल का उपयोग कर रहे हैं, तो घोषणा इस प्रकार दिखेगी:

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Using CommonJS Modules

एक CommonJS सेटअप में, आप अनुवाद इस प्रकार घोषित कर सकते हैं:

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### Using JSON

JSON-आधारित घोषणाओं के लिए, आप अनुवाद को निम्नलिखित प्रकार से परिभाषित कर सकते हैं:

```json
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Configuration for Locales

सही अनुवाद प्रबंधन सुनिश्चित करने के लिए, आप `intlayer.config.ts` में स्वीकृत भाषाओं को कॉन्फ़िगर कर सकते हैं। यह कॉन्फ़िगरेशन आपको उन भाषाओं को परिभाषित करने की अनुमति देता है जिन्हें आपका आवेदन समर्थन करता है:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Using Translations in React Components

`react-intlayer` के साथ, आप React घटकों में अनुवाद का उपयोग कर सकते हैं। यहाँ एक उदाहरण है:

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

यह घटक आपके आवेदन में वर्तमान सेट की गई भाषा के आधार पर संबंधित अनुवाद प्राप्त करता है।

## Custom Content Objects

`intlayer` अनुवाद के लिए कस्टम सामग्री वस्तुओं का समर्थन करता है, जिससे आपको प्रकार सुरक्षा सुनिश्चित करते हुए अधिक जटिल संरचनाएँ परिभाषित करने की अनुमति मिलती है। यहाँ एक कस्टम वस्तु के साथ एक उदाहरण है:

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
      en: {
        title: "Page Title",
        content: "Page Content",
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
