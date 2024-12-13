# Intlayer: Ближе к переводу вашего приложения

**Intlayer** — это библиотека интернационализации, разработанная специально для разработчиков JavaScript. Она позволяет объявлять ваш контент везде в вашем коде. Она преобразует декларацию многоязычного контента в структурированные словари для легкой интеграции в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

## Пример использования

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## Почему стоит выбрать Intlayer?

- **Управление контентом на основе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная среда**: Используйте TypeScript, чтобы убедиться, что все ваши определения контента точны и безошибочны.
- **Интегрированные файлы контента**: Держите ваши переводы рядом с их соответствующими компонентами, что повышает удобство обслуживания и ясность.
- **Упрощенная настройка**: Быстро начните работу с минимальной конфигурацией, особенно оптимизированной для проектов Next.js.
- **Поддержка серверных компонентов**: Идеально подходит для серверных компонентов Next.js, обеспечивая плавную серверную отрисовку.
- **Улучшенная маршрутизация**: Полная поддержка маршрутизации приложений Next.js, без труда адаптируется к сложным структурам приложений.
- **Взаимодействие**: Позволяет взаимодействие с i18next. (бета)
