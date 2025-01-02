# Intlayer: Более близкий способ перевода вашего приложения

**Intlayer** — это библиотека интернационализации, разработанная специально для разработчиков на JavaScript. Она позволяет объявлять ваш контент везде в вашем коде. Она преобразует декларацию многоязычного контента в структурированные словари для легкой интеграции в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

## Пример использования

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
       ├── index.content.ts
       └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
       ├── index.content.cjs
       └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
       ├── index.content.mjs
       └── index.js
```

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Почему стоит выбрать Intlayer?

- **Управление контентом на базе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная среда**: Используйте TypeScript, чтобы убедиться, что все ваши определения контента точны и безошибочны.
- **Интегрированные файлы контента**: Держите свои переводы рядом с соответствующими компонентами, что улучшает поддерживаемость и ясность.
- **Упрощенная настройка**: Начните быстро и легко с минимальной конфигурацией, особенно оптимизированной для проектов Next.js.
- **Поддержка серверных компонентов**: Идеально подходит для серверных компонентов Next.js, обеспечивая плавный серверный рендеринг.
- **Улучшенный маршрутизация**: Полная поддержка маршрутизации приложений Next.js, адаптируясь плавно к сложным структурам приложений.
- **Взаимодействие**: Обеспечить совместимость с i18next. (бета)
