# الترجمة

## تعريف الترجمات

تسمح لك وظيفة `t` في `intlayer` بإعلان المحتوى بعدة لغات. تضمن هذه الوظيفة أمان النوع، مما يثير خطأ إذا كانت أي ترجمات مفقودة، وهو ما يكون مفيدًا بشكل خاص في بيئات TypeScript.

### استخدام TypeScript

إليك مثال على كيفية إعلان المحتوى مع الترجمات في ملف TypeScript:

```typescript
import { t, type DeclarationContent } from "intlayer";

// تعريف محتوى متعدد اللغات
const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### استخدام وحدات ECMAScript

إذا كنت تستخدم وحدات ECMAScript، فإن الإعلان يبدو هكذا:

```javascript
import { t } from "intlayer";

// محتوى متعدد اللغات
const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### استخدام وحدات CommonJS

في إعداد CommonJS، يمكنك إعلان الترجمات على النحو التالي:

```javascript
const { t } = require("intlayer");

// محتوى متعدد اللغات
const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Welcome to our application",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### استخدام JSON

لإعلانات القائمة على JSON، يمكنك تعريف الترجمات كما يلي:

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "Welcome to our application",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## التكوين للغات

لضمان التعامل الصحيح مع الترجمات، يمكنك تكوين اللغات المقبولة في `intlayer.config.ts`. يسمح لك هذا التكوين بتحديد اللغات التي يدعمها تطبيقك:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

// تكوين اللغة
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
  // استرجاع المحتوى
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

هذا المكون يسترجع الترجمة المناسبة بناءً على اللغة الحالية المحددة في تطبيقك.

## كائنات المحتوى المخصصة

تدعم `intlayer` كائنات محتوى مخصصة للترجمة، مما يسمح لك بتعريف هياكل أكثر تعقيدًا مع ضمان أمان النوع. إليك مثال مع كائن مخصص:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

// محتوى مخصص
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
