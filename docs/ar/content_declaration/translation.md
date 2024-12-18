# الترجمة

## تعريف الترجمات

دالة `t` في `intlayer` تتيح لك الإعلان عن المحتوى بلغات متعددة. تضمن هذه الدالة سلامة النوع، مما يؤدي إلى رفع خطأ إذا كانت أي ترجمات مفقودة، وهو أمر مفيد بشكل خاص في بيئات TypeScript.

### استخدام TypeScript

إليك مثالًا على كيفية إعلان المحتوى مع الترجمات في ملف TypeScript:

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

### استخدام وحدات ECMAScript

إذا كنت تستخدم وحدات ECMAScript، فسيبدو الإعلان كالتالي:

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

### استخدام وحدات CommonJS

في إعداد CommonJS، يمكنك إعلان الترجمات بهذه الطريقة:

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

### استخدام JSON

بالنسبة للإعلانات المعتمدة على JSON، يمكنك تعريف الترجمات كما يلي:

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

## التكوين للغات

لضمان معالجة الترجمة بشكل صحيح، يمكنك تكوين اللغات المقبولة في `intlayer.config.ts`. يسمح لك هذا التكوين بتحديد اللغات التي تدعمها تطبيقك:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## استخدام الترجمات في مكونات React

مع `react-intlayer`، يمكنك استخدام الترجمات في مكونات React. إليك مثال:

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

هذا المكون يسترجع الترجمة المقابلة بناءً على اللغة الحالية المحددة في تطبيقك.

## كائنات المحتوى المخصصة

يدعم `intlayer` كائنات محتوى مخصصة للترجمة، مما يتيح لك تعريف هياكل أكثر تعقيدًا مع ضمان سلامة النوع. إليك مثال مع كائن مخصص:

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
