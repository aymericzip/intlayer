# अनुवाद

## अनुवाद परिभाषित करना

`intlayer` में `t` फ़ंक्शन आपको कई भाषाओं में सामग्री घोषित करने की अनुमति देता है। यह फ़ंक्शन प्रकार सुरक्षा सुनिश्चित करता है, और यदि कोई अनुवाद गायब है तो त्रुटि उत्पन्न करता है, जो विशेष रूप से TypeScript वातावरण में उपयोगी है।

### TypeScript का उपयोग करना

यहां दिखाया गया है कि अनुवादों के साथ सामग्री कैसे घोषित करें।

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
      hi: "हमारे एप्लिकेशन में आपका स्वागत है",
    }),
  },
} satisfies Dictionary<Content>;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
      hi: "हमारे एप्लिकेशन में आपका स्वागत है",
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
      hi: "हमारे एप्लिकेशन में आपका स्वागत है",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación",
        "hi": "हमारे एप्लिकेशन में आपका स्वागत है"
      }
    }
  }
}
```

## स्थानीय भाषाओं के लिए कॉन्फ़िगरेशन

सुनिश्चित करने के लिए कि अनुवाद सही तरीके से संभाले गए हैं, आप `intlayer.config.ts` में स्वीकृत भाषाओं को कॉन्फ़िगर कर सकते हैं। यह कॉन्फ़िगरेशन आपको उन भाषाओं को परिभाषित करने की अनुमति देता है जो आपका एप्लिकेशन समर्थन करता है:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.HINDI],
  },
};

module.exports = config;
```

## React घटकों में अनुवाद का उपयोग करना

`react-intlayer` के साथ, आप React घटकों में अनुवाद का उपयोग कर सकते हैं। यहां एक उदाहरण है:

```jsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
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

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

module.exports = MyComponent;
```

यह घटक आपके एप्लिकेशन में सेट वर्तमान भाषा के आधार पर संबंधित अनुवाद प्राप्त करता है।

## कस्टम सामग्री ऑब्जेक्ट्स

`intlayer` अनुवाद के लिए कस्टम सामग्री ऑब्जेक्ट्स का समर्थन करता है, जिससे आप अधिक जटिल संरचनाओं को परिभाषित कर सकते हैं और प्रकार सुरक्षा सुनिश्चित कर सकते हैं। यहां एक कस्टम ऑब्जेक्ट के साथ एक उदाहरण है:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
      hi: {
        title: "पृष्ठ शीर्षक",
        content: "पृष्ठ सामग्री",
      },
    }),
  },
} satisfies Dictionary;

export default customContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

export default {
  key: "custom_content",
  content: {
    profileText:
      t <
      ICustomContent >
      {
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
        hi: {
          title: "पृष्ठ शीर्षक",
          content: "पृष्ठ सामग्री",
        },
      },
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

module.exports = {
  key: "custom_content",
  content: {
    profileText:
      t <
      ICustomContent >
      {
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
        hi: {
          title: "पृष्ठ शीर्षक",
          content: "पृष्ठ सामग्री",
        },
      },
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "title": "Page Title",
          "content": "Page Content"
        },
        "fr": {
          "title": "Titre de la Page",
          "content": "Contenu de la Page"
        },
        "es": {
          "title": "Título de la Página",
          "content": "Contenido de la Página"
        },
        "hi": {
          "title": "पृष्ठ शीर्षक",
          "content": "पृष्ठ सामग्री"
        }
      }
    }
  }
}
```
