# Перевод

## Определение переводов

Функция `t` в `intlayer` позволяет объявлять контент на нескольких языках. Эта функция гарантирует безопасность типов, вызывая ошибку, если какие-либо переводы отсутствуют, что особенно полезно в средах TypeScript.

### Использование TypeScript

Вот пример того, как объявить контент с переводами.

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
      ru: "Добро пожаловать в наше приложение",
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
      ru: "Добро пожаловать в наше приложение",
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
      ru: "Добро пожаловать в наше приложение",
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
        "ru": "Добро пожаловать в наше приложение"
      }
    }
  }
}
```

## Конфигурация для локалей

Чтобы обеспечить правильную обработку переводов, вы можете настроить принимаемые локали в `intlayer.config.ts`. Эта конфигурация позволяет вам определить языки, которые поддерживает ваше приложение:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.RUSSIAN,
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.RUSSIAN,
    ],
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.RUSSIAN,
    ],
  },
};

module.exports = config;
```

## Использование переводов в React компонентах

С помощью `react-intlayer` вы можете использовать переводы в React компонентах. Вот пример:

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

Этот компонент получает соответствующий перевод в зависимости от текущей локали, установленной в вашем приложении.

## Пользовательские объекты контента

`intlayer` поддерживает пользовательские объекты контента для перевода, позволяя вам определять более сложные структуры, обеспечивая при этом безопасность типов. Вот пример с пользовательским объектом:

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
      ru: {
        title: "Название страницы",
        content: "Содержание страницы",
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
        ru: {
          title: "Название страницы",
          content: "Содержание страницы",
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
        ru: {
          title: "Название страницы",
          content: "Содержание страницы",
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
        "ru": {
          "title": "Название страницы",
          "content": "Содержание страницы"
        }
      }
    }
  }
}
```
