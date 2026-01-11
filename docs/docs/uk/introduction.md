---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Вступ
description: Дізнайтеся, як працює Intlayer. Перегляньте кроки, які Intlayer виконує у вашому застосунку. Дізнайтеся, що роблять різні пакети.
keywords:
  - Вступ
  - Початок роботи
  - Intlayer
  - Застосунок
  - Пакети
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Документація Intlayer

Ласкаво просимо до офіційної документації Intlayer! Тут ви знайдете все, що потрібно для інтеграції, конфігурації та опанування Intlayer для всіх ваших потреб з інтернаціоналізації (i18n), незалежно від того, працюєте ви з Next.js, React, Vite, Express або іншим JavaScript-середовищем.

## Вступ

### Що таке Intlayer?

**Intlayer** — бібліотека інтернаціоналізації (i18n), розроблена спеціально для JavaScript-розробників. Вона дозволяє оголошувати ваш контент у будь-якому місці коду. Intlayer перетворює оголошення багатомовного контенту на структуровані словники, щоб їх було легко інтегрувати у ваш код. Використовуючи TypeScript, **Intlayer** робить розробку більш надійною та ефективною.

Intlayer також надає необов'язковий візуальний редактор, який дозволяє легко редагувати та керувати контентом. Цей редактор особливо корисний для розробників, які віддають перевагу візуальному інтерфейсу для управління контентом, або для команд, що генерують контент без необхідності працювати з кодом.

### Приклад використання

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      uk: "Привіт, світ",
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      uk: "Привіт, світ",
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Тип: import('intlayer').Dictionary
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      uk: "Привіт, світ",
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "uk": "Привіт, світ",
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Основні можливості

Intlayer пропонує низку можливостей, адаптованих під потреби сучасної веб-розробки. Нижче наведено ключові функції з посиланнями на докладну документацію для кожної:

- **Підтримка інтернаціоналізації**: Розширюйте глобальне охоплення вашого застосунку за допомогою вбудованої підтримки інтернаціоналізації.
- **Візуальний редактор**: Покращуйте свій робочий процес розробки за допомогою плагінів для редактора, створених для Intlayer. Перегляньте [Посібник із візуального редактора](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).
- **Гнучкість конфігурації**: Налаштуйте ваше середовище за допомогою широких опцій конфігурації, детально описаних у [Довіднику з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).
- **Розширені інструменти CLI**: Ефективно керуйте своїми проєктами за допомогою командного інтерфейсу Intlayer. Дослідіть можливості в [Документації інструментів CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

## Основні поняття

### Словник

Організуйте ваш багатомовний контент поруч із кодом, щоб усе залишалося узгодженим і простим у підтримці.

- **[Початок роботи](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)**  
  Дізнайтеся основи декларування вашого контенту в Intlayer.

- **[Переклад](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md)**  
  Дізнайтеся, як переклади генеруються, зберігаються та використовуються у вашому застосунку.

- **[Перелічення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration.md)**  
  Легко керуйте повторюваними або фіксованими наборами даних для різних мов.

- **[Умова](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/conditional.md)**  
  Дізнайтеся, як використовувати умовну логіку в Intlayer для створення динамічного контенту.

- **[Вставлення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md)**
  Дізнайтеся, як вставляти значення в рядок за допомогою плейсхолдерів вставки.

- **[Отримання за допомогою функцій](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/function_fetching.md)**  
  Дізнайтеся, як динамічно отримувати контент за допомогою кастомної логіки, щоб відповідати робочому процесу вашого проєкту.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md)**  
  Дізнайтеся, як використовувати Markdown в Intlayer для створення насиченого контенту.

- **[Вбудовування файлів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/file_embeddings.md)**  
  Дізнайтеся, як вбудовувати зовнішні файли в Intlayer для використання їх у редакторі контенту.

- **[Вкладення](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/nesting.md)**  
  Дізнайтеся, як вкладати контент в Intlayer для створення складних структур.

### Середовища та інтеграції

Intlayer створено з урахуванням гнучкості, забезпечуючи безшовну інтеграцію з популярними фреймворками та інструментами збірки:

- **[Intlayer з Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_16.md)**
- **[Intlayer з Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md)**
- **[Intlayer з Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_14.md)**
- **[Intlayer з Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_page_router.md)**
- **[Intlayer з React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md)**
- **[Intlayer з Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md)**
- **[Intlayer з React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_react_router_v7.md)**
- **[Intlayer з Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_tanstack.md)**
- **[Intlayer з React Native та Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_react_native+expo.md)**
- **[Intlayer з Lynx та React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_lynx+react.md)**
- **[Intlayer з Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+preact.md)**
- **[Intlayer з Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+vue.md)**
- **[Intlayer з Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nuxt.md)**
- **[Intlayer з Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+svelte.md)**
- **[Intlayer з SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_svelte_kit.md)**
- **[Intlayer з Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_express.md)**
- **[Intlayer з NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nestjs.md)**
- **[Intlayer з Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular.md)**

Кожен посібник з інтеграції містить найкращі практики використання можливостей Intlayer, таких як **server-side rendering**, **dynamic routing** або **client-side rendering**, щоб ви могли підтримувати швидкий, SEO-дружній та високо масштабований застосунок.

## Внесок і відгуки

Ми цінуємо силу open-source та розробку, що керується спільнотою. Якщо ви хочете запропонувати покращення, додати новий посібник або виправити будь-які помилки в нашій документації, не соромтеся надіслати Pull Request або відкрити issue у нашому [репозиторії на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Готові перекласти ваш додаток швидше та ефективніше?** Ознайомтеся з нашою документацією, щоб почати використовувати Intlayer вже сьогодні. Відчуйте надійний, оптимізований підхід до інтернаціоналізації, який зберігає ваш контент впорядкованим і підвищує продуктивність вашої команди.

---
