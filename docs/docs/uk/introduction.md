---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Вступ
description: Дізнайтеся, як працює Intlayer. Ознайомтеся з кроками, які Intlayer використовує у вашому додатку. Дізнайтеся, для чого призначені різні пакети.
keywords:
  - Вступ
  - Початок роботи
  - Intlayer
  - Додаток
  - Пакети
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Документація Intlayer

Ласкаво просимо до офіційної документації Intlayer! Тут ви знайдете все необхідне для інтеграції, налаштування та освоєння Intlayer для всіх ваших завдань з інтернаціоналізації (i18n), незалежно від того, чи працюєте ви з Next.js, React, Vite, Express або в іншому середовищі JavaScript.

## Вступ

### Що таке Intlayer?

**Intlayer** — це бібліотека інтернаціоналізації, розроблена спеціально для JavaScript-розробників. Вона дозволяє оголошувати ваш контент у будь-якому місці вашого коду. Вона перетворює оголошення багатомовного контенту на структуровані словники для легкої інтеграції у ваш код. Використання TypeScript робить **Intlayer** більш надійним та ефективним інструментом для вашої розробки.

Intlayer також надає опціональний візуальний редактор, який дозволяє легко редагувати та управляти вашим контентом. Цей редактор є особливо корисним для розробників, які віддають перевагу візуальному інтерфейсу для управління контентом, або для команд, які створюють контент без необхідності турбуватися про код.

### Приклад використання

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      uk: "Привіт, світе",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "uk": "Привіт, світе"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Чому Intlayer краще за альтернативи?

Порівняно з основними рішеннями, такими як `next-intl` або `i18next`, Intlayer — це рішення, у якому початково присутні інтегровані оптимізації, такі як:

<AccordionGroup>

<Accordion header="Розмір збірки (Bundle size)">

Замість того, щоб завантажувати масивні JSON-файли на свої сторінки, завантажуйте лише необхідний контент. Intlayer допомагає **скоротити розмір ваших збірок і сторінок до 50%**.

</Accordion>

<Accordion header="Простота обслуговування (Maintainability)">

Локалізація контенту поруч із компонентами вашого додатка **полегшує обслуговування** великомасштабних додатків. Ви можете дублювати або видалити папку окремої функції без необхідності перевіряти всю кодову базу контенту. Крім того, Intlayer є **повністю типізованим (fully typed)**, щоб гарантувати точність вашого контенту.

</Accordion>

<Accordion header="AI Agent (ШІ Агенти)">

Спільне розміщення контенту **скорочує контекст, необхідний** для великих мовних моделей (LLMs). Intlayer також постачається з набором інструментів, таких як **CLI** для перевірки відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[навички для агентів (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити процес розробки (DX) ще більш плавним для ШІ-агентів.

</Accordion>

<Accordion header="Автоматизація (Automation)">

Використовуйте автоматизацію для перекладу у вашому CI/CD конвеєрі за допомогою обраної вами LLM за вартістю вашого провайдера ШІ. Intlayer також пропонує **компілятор (compiler)** для автоматизації вилучення контенту, а також [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), щоб допомогти **перекладати у фоновому режимі**.

</Accordion>

<Accordion header="Продуктивність (Performance)">

Підключення масивних JSON-файлів до компонентів може призвести до проблем із продуктивністю та реактивністю. Intlayer оптимізує завантаження вашого контенту під час збірки (build time).

</Accordion>

<Accordion header="Масштабованість без участі розробників (Scaling with non-dev)">

Intlayer — це більше, ніж просто i18n-рішення. Він надає **[візуальний редактор (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)**, який можна розгорнути самостійно (self-hosted), та **[повноцінну CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)**, щоб допомогти вам управляти вашим багатомовним контентом у **реальному часі**, роблячи співпрацю з перекладачами, копірайтерами та іншими членами команди безшовною. Контент може зберігатися локально та/або віддалено.

</Accordion>
</AccordionGroup>

## Основні можливості

Intlayer пропонує безліч функцій, адаптованих до потреб сучасної веб-розробки. Нижче наведено ключові функції з посиланнями на детальну документацію для кожної з них:

- **Підтримка інтернаціоналізації**: Збільште глобальне охоплення вашого додатка за допомогою вбудованої підтримки інтернаціоналізації.
- **Візуальний редактор**: Покращуйте свій робочий процес розробки за допомогою плагінів редактора, створених для Intlayer. Ознайомтеся з [Посібником з візуального редактора](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).
- **Гнучкість налаштування**: Налаштуйте своє середовище за допомогою широких можливостей конфігурації, детально описаних у [Посібнику з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).
- **Просунуті інструменти CLI**: Ефективно керуйте своїми проектами за допомогою інтерфейсу командного рядка Intlayer. Досліджуйте можливості у [Документації з інструментів CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/index.md).

## Основні концепції

### Словник (Dictionary)

Організовуйте свій багатомовний контент поруч із кодом, щоб все було узгоджено та зручно для обслуговування.

- **[Початок роботи](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md)**  
  Вивчіть основи оголошення вашого контенту в Intlayer.

- **[Переклад (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md)**  
  Зрозумійте, як переклади генеруються, зберігаються та використовуються у вашому додатку.

- **[Перелік (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/enumeration.md)**  
  Легко керуйте повторюваними або фіксованими наборами даних різними мовами.

- **[Умова (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/condition.md)**  
  Дізнайтеся, як використовувати умовну логіку в Intlayer для створення динамічного контенту.

- **[Вставка (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/insertion.md)**  
  Дізнайтеся, як вставляти значення в рядок за допомогою плейсхолдерів (маркерів вставки).

- **[Отримання за допомогою функцій (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/function_fetching.md)**  
  Подивіться, як динамічно отримувати контент за допомогою користувацької логіки, щоб відповідати робочому процесу вашого проекту.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/markdown.md)**  
  Дізнайтеся, як використовувати Markdown у Intlayer для створення багатого контенту.

- **[Вбудовування файлів (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/file.md)**  
  Дізнайтеся, як вбудовувати зовнішні файли в Intlayer для їх використання в редакторі контенту.

- **[Вкладеність (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/nesting.md)**  
  Зрозумійте, як вкладати контент у Intlayer для створення складних структур.

### Середовища та інтеграції

Ми створили Intlayer з урахуванням гнучкості, забезпечивши безшовну інтеграцію у популярні фреймворки та інструменти збірки:

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
- **[Intlayer зі SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_svelte_kit.md)**
- **[Intlayer з Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_express.md)**
- **[Intlayer з NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nestjs.md)**
- **[Intlayer з Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_hono.md)**
- **[Intlayer з Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_angular_21.md)**

Кожен посібник з інтеграції містить найкращі практики використання функцій Intlayer, такі як **рендеринг на стороні сервера (SSR)**, **динамічна маршрутизація** або **рендеринг на стороні клієнта**, щоб ви могли підтримувати швидкий, SEO-дружній і високомасштабований додаток.

## Участь у розробці та відгуки

Ми цінуємо силу open-source та розробки, керованої спільнотою. Якщо ви хочете запропонувати покращення, додати новий посібник або виправити будь-які проблеми у нашій документації, сміливо надсилайте Pull Request або відкривайте Issue у нашому [репозиторії на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Готові перекладати свій додаток швидше та ефективніше?** Зануртеся в нашу документацію, щоб почати використовувати Intlayer вже сьогодні. Відчуйте надійний і оптимізований підхід до інтернаціоналізації, який забезпечує організованість вашого контенту та підвищує продуктивність вашої команди.
