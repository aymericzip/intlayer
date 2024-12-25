# Документация Intlayer

Добро пожаловать в документацию Intlayer. Этот гид предоставляет обзор Intlayer, его основных функций и того, как эффективно использовать эти документы для улучшения вашего опыта разработки.

## Введение

### Что такое Intlayer?

**Intlayer** — это библиотека интернационализации, специально созданная для разработчиков на JavaScript. Она позволяет декларацию вашего контента везде в вашем коде. Она преобразует декларацию многоязычного контента в структурированные словари, которые легко интегрировать в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

Intlayer также предоставляет необязательный визуальный редактор, который позволяет вам легко редактировать и управлять вашим контентом. Этот редактор особенно полезен для разработчиков, которые предпочитают визуальный интерфейс для управления контентом, или для команд, создающих контент, не беспокоясь о коде.

## Пример использования

```bash codeFormat="typescript"
.
└── Components
    └── myComponent
       ├── index.content.ts
       └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── myComponent
       ├── index.content.cjs
       └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── myComponent
       ├── index.content.mjs
       └── index.js
```

```tsx fileName="src/components/myComponent/myComponent.content.ts" contentDeclarationFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="src/components/myComponent/myComponent.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
// Мы объявляем содержимое компонента
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/myComponent/myComponent.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
// Мы объявляем содержимое компонента
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/myComponent/myComponent.content.json" contentDeclarationFormat="json"
{
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/myComponent/MyComponent.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>; // Отображаем переведенный контент
};
```

```jsx fileName="src/components/myComponent/MyComponent.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>; // Отображаем переведенный контент
};
```

```jsx fileName="src/components/myComponent/MyComponent.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>; // Отображаем переведенный контент
};
```

### Основные функции

Intlayer предлагает разнообразные функции, адаптированные для удовлетворения потребностей современного веб-разработки. Ниже приведены ключевые функции с ссылками на подробную документацию по каждой из них:

- **Поддержка интернационализации**: Расширьте глобальное присутствие вашего приложения с помощью встроенной поддержки интернационализации.
- **Визуальный редактор**: Улучшите свой рабочий процесс разработки с помощью плагинов редактора, предназначенных для Intlayer. Ознакомьтесь с [Руководством по визуальному редактору](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).
- **Гибкость конфигурации**: Настройте свою конфигурацию с обширными параметрами, подробно описанными в [Руководстве по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).
- **Расширенные инструменты CLI**: Эффективно управляйте своими проектами, используя интерфейс командной строки Intlayer. Изучите возможности в [Документации по инструментам CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).
- **Совместимость с i18n**: Intlayer без проблем работает с другими библиотеками интернационализации. Ознакомьтесь с [Руководством по i18n](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_i18next.md) для получения дополнительной информации.

### Поддерживаемые платформы

Intlayer разработан для безпроблемной работы с приложениями Next.js и React. Он также поддерживает Vite и Create React App.

- **Интеграция с Next.js**: Используйте возможности Next.js вместе с Intlayer для серверного рендеринга и генерации статических сайтов. Подробности доступны в нашем [Руководстве по интеграции с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).
- **Интеграция с Vite и React**: Используйте Vite вместе с Intlayer для серверного рендеринга и генерации статических сайтов. Подробности доступны в нашем [Руководстве по интеграции с Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md).
- **Интеграция с Create React App**: Используйте возможности Create React App вместе с Intlayer для серверного рендеринга и генерации статических сайтов. Подробности доступны в нашем [Руководстве по интеграции с Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md).

### Как использовать эти документы

Чтобы извлечь максимум из этой документации:

1. **Перейдите к соответствующим разделам**: Используйте ссылки, приведенные выше, чтобы перейти непосредственно к тем разделам, которые соответствуют вашим потребностям.
2. **Интерактивные примеры**: Где это возможно, используйте интерактивные примеры, чтобы увидеть, как функции работают в реальном времени.
3. **Обратная связь и вклад**: Ваша обратная связь важна. Если у вас есть предложения или исправления, пожалуйста, подумайте о возможности поправить документацию.
