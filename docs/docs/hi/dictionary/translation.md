---
docName: dictionary__translation
url: https://intlayer.org/doc/concept/content/translation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dictionary/translation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: अनुवाद
description: अपनी बहुभाषी वेबसाइट में अनुवाद कैसे घोषित करें और उपयोग करें यह जानें। इस ऑनलाइन दस्तावेज़ में दिए गए चरणों का पालन करके कुछ ही मिनटों में अपने प्रोजेक्ट को सेटअप करें।
keywords:
  - अनुवाद
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# अनुवाद

## अनुवाद परिभाषित करना

`intlayer` में `t` फ़ंक्शन आपको कई भाषाओं में सामग्री घोषित करने की अनुमति देता है। यह फ़ंक्शन टाइप सुरक्षा सुनिश्चित करता है, यदि कोई अनुवाद गायब हो तो त्रुटि उत्पन्न करता है, जो विशेष रूप से TypeScript वातावरण में उपयोगी होता है।

यहाँ अनुवादों के साथ सामग्री घोषित करने का एक उदाहरण दिया गया है।

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
    }),
  },
};
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// मॉड्यूल निर्यात करता है जिसमें बहुभाषी स्वागत संदेश होता है
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
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## स्थानीय सेटिंग्स के लिए कॉन्फ़िगरेशन

सही अनुवाद प्रबंधन सुनिश्चित करने के लिए, आप `intlayer.config.ts` में स्वीकार किए गए स्थानीय सेटिंग्स को कॉन्फ़िगर कर सकते हैं। यह कॉन्फ़िगरेशन आपको उन भाषाओं को परिभाषित करने की अनुमति देता है जिन्हें आपका एप्लिकेशन सपोर्ट करता है:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

module.exports = config;
```

## React कंपोनेंट्स में अनुवाद का उपयोग करना

`react-intlayer` के साथ, आप React कंपोनेंट्स में अनुवादों का उपयोग कर सकते हैं। यहाँ एक उदाहरण है:

```jsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

javascript fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p> {/* वर्तमान भाषा के अनुसार स्वागत संदेश दिखाता है */}
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
      <p>{content.welcomeMessage}</p>{" "}
      {/* वर्तमान भाषा के अनुसार स्वागत संदेश दिखाता है */}
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
      <p>{content.welcomeMessage}</p>{" "}
      {/* वर्तमान भाषा के अनुसार स्वागत संदेश दिखाता है */}
    </div>
  );
};

module.exports = MyComponent;
```

यह कॉम्पोनेंट आपके एप्लिकेशन में सेट वर्तमान लोकल के आधार पर संबंधित अनुवाद प्राप्त करता है।

## कस्टम कंटेंट ऑब्जेक्ट्स

`intlayer` अनुवाद के लिए कस्टम कंटेंट ऑब्जेक्ट्स का समर्थन करता है, जिससे आप अधिक जटिल संरचनाओं को परिभाषित कर सकते हैं और टाइप सुरक्षा सुनिश्चित कर सकते हैं। यहाँ एक कस्टम ऑब्जेक्ट के साथ उदाहरण दिया गया है:

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
          "content": "पृष्ठ सामग्री"
        },
        "fr": {
          "title": "पृष्ठ का शीर्षक",
          "content": "पृष्ठ की सामग्री"
        },
        "es": {
          "title": "पृष्ठ का शीर्षक",
          "content": "पृष्ठ की सामग्री"
        }
      }
    }
  }
}
```

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
