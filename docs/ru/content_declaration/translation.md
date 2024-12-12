# Перевод

## Определение переводов

Функция `t` в `intlayer` позволяет вам объявлять содержимое на нескольких языках. Эта функция обеспечивает типовую безопасность, вызывая ошибку, если какие-либо переводы отсутствуют, что особенно полезно в средах TypeScript.

### Использование TypeScript

Вот пример того, как объявить содержимое с переводами в файле TypeScript:

```typescript
import { t, type DeclarationContent } from "intlayer";

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

### Использование ECMAScript модулей

Если вы используете ECMAScript модули, объявление выглядит следующим образом:

```javascript
import { t } from "intlayer";

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

### Использование CommonJS модулей

В настройке CommonJS вы можете объявить переводы следующим образом:

```javascript
const { t } = require("intlayer");

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

### Использование JSON

Для объявлений на основе JSON вы можете определить переводы следующим образом:

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

## Конфигурация локалей

Чтобы обеспечить правильную обработку переводов, вы можете настроить принятые локали в `intlayer.config.ts`. Эта конфигурация позволяет вам определить языки, которые поддерживает ваше приложение:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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

`intlayer` поддерживает пользовательские объекты контента для перевода, позволяя вам определять более сложные структуры, обеспечивая при этом типовую безопасность. Вот пример с пользовательским объектом:

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
