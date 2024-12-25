# ترجمة

## تعريف الترجمة

تتيح لك وظيفة `t` في `intlayer` الإشارة إلى المحتوى بعدة لغات. تضمن هذه الوظيفة أمان النوع، مما يؤدي إلى رفع خطأ إذا كانت أي ترجمات مفقودة، وهو أمر مفيد بشكل خاص في بيئات TypeScript.

### استخدام TypeScript

إليك مثال على كيفية إعلانات المحتوى مع الترجمة.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
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
      ar: "مرحبًا بكم في تطبيقنا",
    }),
  },
} satisfies DeclarationContent<Content>;
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
      ar: "مرحبًا بكم في تطبيقنا",
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
      ar: "مرحبًا بكم في تطبيقنا",
    }),
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación",
        "ar": "مرحبًا بكم في تطبيقنا"
      }
    }
  }
}
```

## إعداد اللغات

لضمان التعامل الصحيح مع الترجمات، يمكنك ضبط اللغات المقبولة في `intlayer.config.ts`. يتيح لك هذا التكوين تحديد اللغات التي تدعمها تطبيقك:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH, Locales.ARABIC],
  },
};

module.exports = config;
```

## استخدام الترجمات في مكونات React

مع `react-intlayer`، يمكنك استخدام الترجمات في مكونات React. إليك مثال:

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

تقوم هذه المكونة بجلب الترجمة المناسبة بناءً على اللغة الحالية المحددة في التطبيق الخاص بك.

## كائنات المحتوى المخصصة

يدعم `intlayer` كائنات المحتوى المخصصة للترجمة، مما يتيح لك تعريف هياكل أكثر تعقيدًا مع ضمان أمان النوع. إليك مثال على كائن مخصص:

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
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
      ar: {
        title: "عنوان الصفحة",
        content: "محتوى الصفحة",
      },
    }),
  },
} satisfies DeclarationContent;

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
        ar: {
          title: "عنوان الصفحة",
          content: "محتوى الصفحة",
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
        ar: {
          title: "عنوان الصفحة",
          content: "محتوى الصفحة",
        },
      },
  },
};
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
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
        "ar": {
          "title": "عنوان الصفحة",
          "content": "محتوى الصفحة"
        }
      }
    }
  }
}
```
