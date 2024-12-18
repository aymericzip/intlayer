# Перевод

## Определение переводов

Функция `t` в `intlayer` позволяет вам объявлять контент на нескольких языках. Эта функция обеспечивает безопасность типов, вызывая ошибку, если какие-либо переводы отсутствуют, что особенно полезно в средах TypeScript.

### Использование TypeScript

Вот пример того, как объявить контент с переводами в файле TypeScript:

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
      ru: "Добро пожаловать в наше приложение",
    }),
  },
} satisfies DeclarationContent<Content>;
```

### Использование ECMAScript Модулей

Если вы используете модули ECMAScript, декларация выглядит так:

```javascript
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

### Использование CommonJS Модулей

В настройке CommonJS вы можете объявить переводы следующим образом:

```javascript
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

### Использование JSON

Для деклараций, основанных на JSON, вы можете определить переводы следующим образом:

```json
{
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

Чтобы обеспечить правильную обработку переводов, вы можете настроить принятые локали в `intlayer.config.ts`. Эта конфигурация позволяет вам определить языки, которые поддерживает ваше приложение:

```typescript
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

## Использование переводов в компонентах React

С помощью `react-intlayer` вы можете использовать переводы в компонентах React. Вот пример:

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

Этот компонент получает соответствующий перевод в зависимости от текущей локали, установленной в вашем приложении.

## Пользовательские объекты контента

`intlayer` поддерживает пользовательские объекты контента для перевода, что позволяет вам определять более сложные структуры, при этом обеспечивая безопасность типов. Вот пример с пользовательским объектом:

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
      ru: {
        title: "Название страницы",
        content: "Содержимое страницы",
      },
    }),
  },
} satisfies DeclarationContent;

export default customContent;
```
