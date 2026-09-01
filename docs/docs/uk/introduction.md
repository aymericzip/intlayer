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
author: aymericzip
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

Спільне розміщення контенту **скорочує контекст, необхідний** для великих мовних моделей (LLMs). Intlayer також постачається з набором інструментів, таких як **CLI** для перевірки відсутніх перекладів, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)** та **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**, щоб зробити процес розробки (DX) ще більш плавним для ШІ-агентів.

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

## Часто задавані запитання

<FAQ>

<Question title="Для чого використовується Intlayer?">

Intlayer - це бібліотека інтернаціоналізації (i18n) для додатків на JavaScript та TypeScript. Ви оголошуєте вміст поруч із компонентом у файлі `.content.ts`, Intlayer компілює ці оголошення в типізовані словники під час збирання, а ваші компоненти читають їх через хук на зразок `useIntlayer`. Вона охоплює переклад, правила множини, стать, Markdown, маршрутизацію з урахуванням локалі, метадані SEO, переклад за допомогою штучного інтелекту та візуальний редактор для нетехнічних користувачів.

</Question>

<Question title="Скільки i18n додає до розміру бандла?">

Значно менше, ніж рішення на основі просторів імен (namespaces), оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Розмітка, що рендериться на сервері, отримує свій контент безпосередньо на сервері, а компілятор під час збирання замінює виклики `useIntlayer` точними записами словника, які використовує компонент, тому невикористані ключі та мови видаляються. [Динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за окремими локалями. У порівнянні зі звичними альтернативами Intlayer зменшує розмір бандла та сторінки до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Чи можу я мігрувати з i18next, next-intl або react-i18next без переписування моїх компонентів?">

Так, і для цього є два шляхи. Ви можете переносити контент поступово, користуючись [посібником з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md) або [посібником з міграції з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md). Або ви можете повністю зберегти свій поточний API: [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) надають абсолютно той самий інтерфейс, що й `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` та `Lingui`, але дані беруться зі словників Intlayer, завдяки чому змінюються лише імпорти, а код компонентів залишається незмінним.

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

Для повністю автоматизованого робочого процесу [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання у коді JSX, TSX, Vue та Svelte, генеруючи словники під час кожної зміни, тому вручну підтримувати ключі не потрібно. Оскільки він працює через статичний аналіз, динамічні рядки середовища виконання залишаються поза його досяжністю.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Які є різні рішення для інтернаціоналізації додатків JavaScript?">

Ця галузь поділяється на три покоління:

- **Бібліотеки каталогів часу виконання (runtime)**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Повідомлення зберігаються у просторах імен JSON, що завантажуються під час виконання. Зрілі та незалежні від фреймворку, але позбавлені статичної типізації та надсилають клієнту весь каталог цілком.
- **Бібліотеки повідомлень часу компіляції**: `Lingui`, `Paraglide`, `react-intl` та `next-intl` з етапом екстракції. Краща поведінка бандла та часткова типізація, але все ще прив'язані до централізованих каталогів.
- **Бібліотеки з шаром контенту (Content layer)**: `Intlayer`. Вміст оголошується та компілюється на рівні окремих компонентів; поєднує типізацію, tree-shaking, інструменти розробника та редагування в єдиному джерелі істини.

Див. [чому Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/interest_of_intlayer.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Які фреймворки підтримує Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro з будь-якими острівними компонентами, React Native з Expo, Lynx, а на бекенді - Express, Fastify, NestJS, Hono, Elysia та AdonisJS. Кожен має окремий посібник у розділі середовищ.

</Question>

<Question title="Чому варто оголошувати контент поруч із компонентом, а не в центральному файлі JSON?">

З трьох причин: по-перше, сторінка постачає лише ті записи, які реально відображають її компоненти, замість усього простору імен, що суттєво зменшує бандл. По-друге, теку функції можна переміщувати чи видаляти автономно без пошуку втрачених ключів. По-третє, моделі LLM або агенти AI, редагуючи компонент, бачать його контент у тій самій теці, що забезпечує значно вищу точність. Див. [як працює Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/how_works_intlayer.md).

</Question>

<Question title="Як автоматично перекласти додаток за допомогою AI?">

Запустіть `npx intlayer fill`. Утиліта CLI знаходить відсутні переклади та заповнює їх за допомогою обраної LLM з використанням вашого власного провайдера та ключа API. Прапорець `--git-diff` обмежує операцію вмістом, зміненим у поточній гілці. Див. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md) та [інтеграцію CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/CI_CD.md).

</Question>

<Question title="Як знайти відсутні переклади?">

Запустіть `npx intlayer test`. Команда повертає помилку, якщо в оголошеній локалі відсутній контент, завдяки чому неперекладений рядок ніколи не потрапить у продакшн. Розширення VS Code показує ці помилки прямо в редакторі, а плагін ESLint маркує неохоплені рядки правилом `no-raw-text`. Див. [тестування контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/testing.md).

</Question>

<Question title="Чи обов'язково додавати локаль до URL?">

Ні. Налаштування `routing.mode` приймає `"prefix-no-default"` (за замовчуванням: `/about` та `/uk/about`), `"prefix-all"`, `"no-prefix"` та `"search-params"`, а налаштування `routing.domains` дозволяє призначити кожну мову на власний домен. Незалежно від обраної схеми, `getMultilingualUrls` формує альтернативні адреси `hreflang` для пошукових систем. Див. [довідник конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

</Question>

<Question title="Як перекладачі та редактори можуть працювати без доступу до коду?">

Візуальний редактор працює на вашій інфраструктурі і дозволяє будь-кому клацати по текстах працюючого додатку для їх редагування, записуючи зміни назад у кодову базу. CMS відокремлює контент для оновлення без нового деплою. Див. [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) та [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

</Question>

<Question title="Чи є Intlayer безкоштовним та відкритим кодом?">

Так. Intlayer є проектом з відкритим кодом під ліцензією Apache 2.0; бібліотека, CLI, компілятор та візуальний редактор повністю безкоштовні для комерційного використання. Хмарна CMS - це опціональна платна послуга, яку також можна [розгорнути самостійно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

</Question>

</FAQ>
