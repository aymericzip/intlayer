---
createdAt: 2025-08-23
updatedAt: 2025-09-23
title: Intlayer Visual Editor | Редагуйте ваш контент за допомогою візуального редактора
description: Дізнайтеся, як використовувати Intlayer Editor для керування вашим багатомовним вебсайтом. Дотримуйтеся кроків цієї онлайн-документації, щоб налаштувати проєкт за кілька хвилин.
keywords:
  - Редактор
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - editor
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 6.1.0
    date: 2025-09-23
    changes: "Додано опцію 'with' у CLI"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Змінено поведінку редактора, коли розширення файлу не `.json`"
  - version: 6.0.0
    date: 2025-09-21
    changes: "Додано команду reexported"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Документація Intlayer Visual Editor

<iframe title="Візуальний редактор + CMS для вашого вебзастосунку: пояснення Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor, це інструмент, який обгортає ваш вебсайт для взаємодії з файлами декларації контенту за допомогою візуального редактора.

![Інтерфейс Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Пакет `intlayer-editor` базується на Intlayer і доступний для JavaScript-застосунків, таких як React (Create React App), Vite + React та Next.js.

## Візуальний редактор проти CMS

Intlayer Visual editor, це інструмент, який дозволяє керувати вашим контентом у візуальному редакторі для локальних словників. Після внесення зміни вміст буде замінено в code-base. Це означає, що застосунок буде перебудований, а сторінка перезавантажена для відображення нового контенту.

На відміну від цього, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md), це інструмент, який дозволяє керувати вашим контентом у візуальному редакторі для віддалених словників. Після внесення змін, контент **не** впливає на ваш code-base. А вебсайт автоматично відобразить змінений контент.

## Інтегруйте Intlayer у ваш застосунок

Для детальнішої інформації про те, як інтегрувати intlayer, див. відповідний розділ нижче:

### Інтеграція з Next.js

Для інтеграції з Next.js зверніться до [інструкції з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md).

### Інтеграція з Create React App

Для інтеграції з Create React App зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md).

### Інтеграція з Vite + React

Для інтеграції з Vite + React зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md).

## Як працює Intlayer Editor

Візуальний редактор у застосунку складається з двох частин:

- Фронтенд-додаток, який відображає ваш вебсайт у iframe. Якщо ваш сайт використовує Intlayer, візуальний редактор автоматично виявить ваш контент і дозволить взаємодіяти з ним. Після внесення змін ви зможете завантажити свої зміни.

- Після натискання кнопки завантаження візуальний редактор надішле запит на сервер, щоб замінити ваші файли декларацій вмісту на новий вміст (у тих місцях, де ці файли оголошені у вашому проєкті).

> Зауважте, що Intlayer Editor запише ваші файли декларацій вмісту як JSON, якщо розширення файлу, `.json`. Якщо розширення файлу, `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.cjs`, він запише файл як JavaScript-файл, використовуючи babel-трансформер.

## Встановлення

Після того як Intlayer налаштовано у вашому проєкті, просто встановіть `intlayer-editor` як залежність для розробки:

```bash packageManager="npm"
npm install intlayer-editor --save-dev
```

```bash packageManager="yarn"
yarn add intlayer-editor --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer-editor --save-dev
```

```bash packageManager="bun"
bun add intlayer-editor --dev
```

За допомогою прапорця `--with` ви можете запустити редактор паралельно з іншою командою:

```json5 fileName="package.json"
{
  "scripts": {
    "start:editor": "npx intlayer-editor start --with 'next dev --turbopack'",
  },
}
```

## Конфігурація

У файлі конфігурації Intlayer ви можете налаштувати параметри редактора:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... інші параметри конфігурації
  editor: {
    /**
     * Обов'язково
     * URL додатка.
     * Це URL, на який орієнтований візуальний редактор.
     * Приклад: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Необов'язково
     * За замовчуванням `true`. Якщо `false`, редактор неактивний і до нього неможливо отримати доступ.
     * Може використовуватися для відключення редактора в певних середовищах з міркувань безпеки, таких як production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Необов'язково
     * За замовчуванням `8000`.
     * Порт сервера редактора.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Необов'язково
     * За замовчуванням "http://localhost:8000"
     * URL сервера редактора.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

> Щоб переглянути всі доступні параметри, зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Використання редактора

1. Коли редактор встановлено, ви можете запустити його за допомогою наступної команди:

   ```bash packageManager="npm"
   npx intlayer-editor start
   ```

   ```bash packageManager="yarn"
   yarn intlayer-editor start
   ```

   ```bash packageManager="pnpm"
   pnpm intlayer-editor start
   ```

   > **Примітка: потрібно запускати ваш додаток паралельно.** URL додатку має відповідати тому, який ви вказали в конфігурації редактора (`applicationURL`).

   > **Зверніть увагу, що команда реекспортується пакетом `intlayer`. Ви можете використовувати `npx intlayer editor start` натомість.**

2. Потім відкрийте вказаний URL. За замовчуванням, `http://localhost:8000`.

   Ви можете переглянути кожне поле, індексоване Intlayer, навівши курсор на вміст.

   ![Наведіть курсор на вміст](https://github.com/aymericzip/intlayer/blob/main/docs/assets/intlayer_editor_hover_content.png)

3. Якщо ваш контент має контур, ви можете натиснути і утримувати його, щоб відобразити панель редагування.

## Конфігурація середовища

Редактор можна налаштувати на використання конкретного файлу середовища. Це корисно, коли ви хочете використовувати той самий файл конфігурації для development та production.

Щоб використовувати конкретний файл середовища, ви можете вказати прапорець `--env-file` або `-f` при запуску редактора:

```bash packageManager="npm"
npx intlayer-editor start -f .env.development
```

```bash packageManager="yarn"
yarn intlayer-editor start -f .env.development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -f .env.development
```

> Зауважте, що файл оточення має знаходитися в кореневому каталозі вашого проєкту.

Або ви можете використати прапорець `--env` або `-e`, щоб вказати середовище:

```bash packageManager="npm"
npx intlayer-editor start -e development
```

```bash packageManager="yarn"
yarn intlayer-editor start -e development
```

```bash packageManager="pnpm"
pnpm intlayer-editor start -e development
```

## Налагодження

Якщо ви зіткнулися з будь-якими проблемами у візуальному редакторі, перевірте наступне:

- Візуальний редактор і застосунок запущені.

- Налаштування [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) правильно вказані у вашому конфігураційному файлі Intlayer.
  - Обов'язкові поля:
    - URL застосунку має відповідати тому, який ви вказали в конфігурації редактора (`applicationURL`).

- Візуальний редактор використовує iframe для відображення вашого сайту. Переконайтесь, що Content Security Policy (CSP) вашого сайту дозволяє URL CMS як значення `frame-ancestors` (`http://localhost:8000` за замовчуванням). Перевірте консоль редактора на наявність помилок.

## Часто задавані запитання

<FAQ>

<Question title="У чому різниця між візуальним редактором та CMS?">

Візуальний редактор змінює локальні словники і записує зміни безпосередньо у файли коду, тому вони проходять стандартну процедуру Git. CMS зберігає тексти на віддаленому сервері для миттєвої публікації без нового білду.

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

<Question title="Де запускається візуальний редактор?">

На вашій власній інфраструктурі. Він завантажує ваш додаток усередині iframe та взаємодіє з локальним сервером редактора, тому ваш контент ніколи не передається стороннім сервісам.

</Question>

<Question title="Чи потрібно редакторам вміти програмувати?">

Ні. Вони відкривають сайт, натискають на потрібний текст і редагують його на місці. Редактор автоматично знаходить відповідний запис у словнику.

</Question>

<Question title="Чи змінює редагування через візуальний редактор мої вихідні файли?">

Так, саме так це задумано. Зміна записується у файл оголошення контенту у вашій кодовій базі та відображається у звичайному diff git.

</Question>

<Question title="Редактор показує порожню сторінку або відмовляється завантажувати сайт. Що перевірити?">

Редактор відображає додаток в iframe, тому ваша політика Content Security Policy (CSP) повинна дозволяти адресу редактора в директиві `frame-ancestors`. Також перевірте, чи запущені обидва сервери.

</Question>

<Question title="Чи можна використовувати візуальний редактор у продакшні?">

Він створений для середовищ розробки та стейджингу, де допустима перезбірка після редагування. Для редагування контенту на живих сайтах рекомендується [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md).

</Question>

<Question title="Чи є візуальний редактор безкоштовним?">

Так. Візуальний редактор є частиною відкритого проекту під ліцензією Apache 2.0, включно з комерційним використанням.

</Question>

</FAQ>
