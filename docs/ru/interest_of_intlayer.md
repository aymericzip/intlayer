# Intlayer: Более близкий способ перевода вашего приложения

**Intlayer** — это библиотека интернационализации, специально разработанная для разработчиков JavaScript. Она позволяет объявлять ваш контент в любом месте вашего кода. Она преобразует объявления многоязычного контента в структурированные словари для легкой интеграции в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

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
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
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

## Почему выбрать Intlayer?

- **Управление контентом на основе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Безопасная среда с типами**: Используйте TypeScript, чтобы гарантировать точность и отсутствие ошибок в определениях контента.
- **Интегрированные файлы контента**: Держите переводы рядом с их соответствующими компонентами, улучшая удобство сопровождения и ясность.
- **Упрощенная настройка**: Быстро начните работу с минимальной конфигурацией, особенно оптимизированной для проектов Next.js.
- **Поддержка серверных компонентов**: Идеально подходит для серверных компонентов Next.js, обеспечивая плавный рендеринг на стороне сервера.
- **Улучшенная маршрутизация**: Полная поддержка маршрутизации приложений Next.js, адаптируясь к сложным структурам приложений.
- **Совместимость**: Обеспечивает совместимость с [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_next-intl.md) и [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_react-intl.md).
