---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: الترجمة
description: اكتشف كيفية إعلان واستخدام الترجمة في موقعك متعدد اللغات. اتبع الخطوات في هذا التوثيق عبر الإنترنت لإعداد مشروعك في دقائق قليلة.
keywords:
  - الترجمة
  - التدويل
  - التوثيق
  - Intlayer
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - doc
  - concept
  - content
  - translation
---

# الترجمة

## تعريف الترجمات

تسمح لك دالة `t` في `intlayer` بإعلان المحتوى بعدة لغات. تضمن هذه الدالة سلامة النوع، حيث ترفع خطأً إذا كانت هناك ترجمات مفقودة، وهو أمر مفيد بشكل خاص في بيئات TypeScript.

إليك مثالًا على كيفية إعلان المحتوى مع الترجمات.

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

## التهيئة للغات

لضمان التعامل الصحيح مع الترجمات، يمكنك تكوين اللغات المقبولة في `intlayer.config.ts`. يتيح لك هذا التكوين تحديد اللغات التي يدعمها تطبيقك:

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

## استخدام الترجمات في مكونات React

مع `react-intlayer`، يمكنك استخدام الترجمات في مكونات React. إليك مثالاً:

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

يقوم هذا المكون بجلب الترجمة المقابلة بناءً على اللغة الحالية المحددة في تطبيقك.

## كائنات المحتوى المخصصة

يدعم `intlayer` كائنات المحتوى المخصصة للترجمة، مما يتيح لك تعريف هياكل أكثر تعقيدًا مع ضمان سلامة الأنواع. إليك مثالًا مع كائن مخصص:

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
        title: "عنوان الصفحة",
        content: "محتوى الصفحة",
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
          title: "عنوان الصفحة",
          content: "محتوى الصفحة",
        },
        fr: {
          title: "عنوان الصفحة",
          content: "محتوى الصفحة",
        },
        es: {
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
          title: "عنوان الصفحة",
          content: "محتوى الصفحة",
        },
        fr: {
          title: "عنوان الصفحة",
          content: "محتوى الصفحة",
        },
        es: {
          title: "عنوان الصفحة",
          content: "محتوى الصفحة",
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
          "title": "عنوان الصفحة",
          "content": "محتوى الصفحة"
        },
        "fr": {
          "title": "عنوان الصفحة",
          "content": "محتوى الصفحة"
        },
        "es": {
          "title": "عنوان الصفحة",
          "content": "محتوى الصفحة"
        }
      }
    }
  }
}
```

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية السجل
