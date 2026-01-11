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
    changes: Додано опцію 'with' у CLI
  - version: 6.0.1
    date: 2025-09-22
    changes: Змінено поведінку редактора, коли розширення файлу не `.json`
  - version: 6.0.0
    date: 2025-09-21
    changes: Додано команду reexported
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Документація Intlayer Visual Editor

<iframe title="Візуальний редактор + CMS для вашого вебзастосунку: пояснення Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer Visual Editor — це інструмент, який обгортає ваш вебсайт для взаємодії з файлами декларації контенту за допомогою візуального редактора.

![Інтерфейс Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

Пакет `intlayer-editor` базується на Intlayer і доступний для JavaScript-застосунків, таких як React (Create React App), Vite + React та Next.js.

## Візуальний редактор проти CMS

Intlayer Visual editor — це інструмент, який дозволяє керувати вашим контентом у візуальному редакторі для локальних словників. Після внесення зміни вміст буде замінено в code-base. Це означає, що застосунок буде перебудований, а сторінка перезавантажена для відображення нового контенту.

На відміну від цього, [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md) — це інструмент, який дозволяє керувати вашим контентом у візуальному редакторі для віддалених словників. Після внесення змін, контент **не** впливає на ваш code-base. А вебсайт автоматично відобразить змінений контент.

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

> Зауважте, що Intlayer Editor запише ваші файли декларацій вмісту як JSON, якщо розширення файлу — `.json`. Якщо розширення файлу — `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.cjs`, він запише файл як JavaScript-файл, використовуючи babel-трансформер.

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

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... інші налаштування конфігурації
  editor: {
    /**
     * Обов'язково
     * URL застосунку.
     * Це URL, на який спрямований візуальний редактор.
     * Приклад: 'http://localhost:3000'
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Необов'язково
     * Значення за замовчуванням — `true`. Якщо `false`, редактор неактивний і до нього неможливо отримати доступ.
     * Може використовуватися для відключення редактора в певних оточеннях з міркувань безпеки, наприклад у production.
     */
    enabled: process.env.INTLAYER_ENABLED,
    /**
     * Необов'язково
     * Значення за замовчуванням — `8000`.
     * Порт, який використовує сервер візуального редактора.
     */
    port: process.env.INTLAYER_PORT,
    /**
     * Необов'язково
     * Значення за замовчуванням — "http://localhost:8000"
     * URL сервера редактора, до якого звертається застосунок. Використовується для обмеження origin-ів, які можуть взаємодіяти із застосунком з міркувань безпеки. Якщо встановлено `'*'`, редактор доступний з будь-якого origin. Має бути задано, якщо змінено порт або якщо редактор розміщений на іншому домені.
     */
    editorURL: process.env.INTLAYER_EDITOR_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... other configuration settings
  editor: {
    /**
     * Обов'язково
     * URL застосунку.
     * Це URL, на який спрямований візуальний редактор.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    /**
     * Необов'язковий
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
    /**
     * Необов'язково
     * За замовчуванням `true`. Якщо `false`, редактор неактивний і до нього неможливо отримати доступ.
     * Можна використати для вимкнення редактора в певних середовищах з міркувань безпеки, наприклад у production.
     */
    enabled: process.env.INTLAYER_ENABLED,
  },
};

module.exports = config;
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

2. Потім відкрийте вказаний URL. За замовчуванням — `http://localhost:8000`.

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

- Візуальний редактор використовує iframe для відображення вашого сайту. Переконайтесь, що Content Security Policy (CSP) вашого сайту дозволяє URL CMS як значення `frame-ancestors` ('http://localhost:8000' за замовчуванням). Перевірте консоль редактора на наявність помилок.
