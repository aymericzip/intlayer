---
createdAt: 2025-08-23
updatedAt: 2026-07-08
title: Intlayer CMS | Виносьте свій контент у Intlayer CMS
description: Виносьте свій контент у Intlayer CMS, щоб делегувати керування ним вашій команді.
keywords:
  - CMS
  - Visual Editor
  - Internationalization
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cms
youtubeVideo: https://www.youtube.com/watch?v=UDDTnirwi_4
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Розділ «Live Sync» перенесено на окрему сторінку (live-sync.md), тут залишено короткий вступ і посилання"
  - version: 9.0.0
    date: 2026-06-30
    changes: "Додано розділ «Самостійне розгортання»"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Додано документацію `liveSync`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Замінено поле `hotReload` на `liveSync`"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізовано історію"
author: aymericzip
---

# Документація системи керування контентом Intlayer (CMS)

<iframe title="Візуальний редактор + CMS для вашого вебзастосунку: Intlayer, пояснення" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS, це застосунок, який дозволяє винести вміст вашого проєкту Intlayer у зовнішню систему (CMS).

Для цього Intlayer вводить поняття «віддалених словників» (distant dictionaries).

![Інтерфейс Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Зміст

<TOC/>

---

## Розуміння віддалених словників

Intlayer розрізняє 'local' та 'remote' словники.

- 'local' словник, це словник, який оголошений у вашому проєкті Intlayer. Наприклад файл декларації кнопки або ваша панель навігації. Виносити контент назовні в такому випадку не має сенсу, оскільки цей контент зазвичай не змінюється часто.

- 'remote' словник, це словник, яким керують через Intlayer CMS. Це може бути корисно, щоб дозволити вашій команді керувати контентом безпосередньо на вашому вебсайті, а також для використання функцій A/B тестування та автоматичної SEO-оптимізації.

## Візуальний редактор проти CMS

Редактор [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md), це інструмент, який дозволяє керувати вашим вмістом у візуальному редакторі для локальних словників. Після внесення зміни вміст буде замінено в code-base. Це означає, що застосунок буде перебудовано, а сторінка перезавантажиться для відображення нового вмісту.

На відміну від цього, Intlayer CMS, це інструмент, який дозволяє керувати вмістом у візуальному редакторі для віддалених словників. Після внесення зміни вміст **не** вплине на ваш code-base. Вебсайт автоматично відобразить змінений вміст.

## Інтеграція

Для детальнішої інформації про встановлення пакета див. відповідний розділ нижче:

### Інтеграція з Next.js

Для інтеграції з Next.js зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_nextjs_15.md).

### Інтеграція з Create React App

Для інтеграції з Create React App зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_create_react_app.md).

### Інтеграція з Vite + React

Для інтеграції з Vite + React зверніться до [керівництва з налаштування](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_vite+react.md).

## Конфігурація

Запустіть наступну команду, щоб увійти в Intlayer CMS:

```bash packageManager="npm"
npx intlayer login
```

```bash packageManager="yarn"
yarn intlayer login
```

```bash packageManager="pnpm"
pnpm intlayer login
```

```bash packageManager="bun"
bun x intlayer login
```

Це відкриє ваш браузер за замовчуванням, щоб завершити процес автентифікації й отримати необхідні облікові дані (Client ID та Client Secret) для використання сервісів Intlayer.

У файлі конфігурації Intlayer ви можете налаштувати параметри CMS:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... інші налаштування конфігурації
  editor: {
    /**
     * Обов'язково
     *
     * URL застосунку.
     * Це URL, що використовується візуальним редактором.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Обов'язково
     *
     * Client ID та client secret потрібні для увімкнення редактора.
     * Вони дозволяють ідентифікувати користувача, який редагує контент.
     * Їх можна отримати, створивши нового клієнта в Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Необов'язково
     *
     * Якщо ви розгортаєте Intlayer CMS самостійно, ви можете вказати URL CMS.
     *
     * URL Intlayer CMS.
     * За замовчуванням встановлено на https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необов'язково
     *
     * У випадку, якщо ви самостійно розгортаєте Intlayer CMS, ви можете вказати URL бекенду.
     *
     * URL Intlayer CMS.
     * За замовчуванням встановлено на https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

> Якщо у вас немає client ID та client secret, ви можете отримати їх, створивши нового клієнта в [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Щоб побачити всі доступні параметри, зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Використання CMS

### Надіслати вашу конфігурацію

Щоб налаштувати Intlayer CMS, ви можете використовувати команди [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/uk/cli/index.md).

```bash packageManager="npm"
npx intlayer config push
```

```bash packageManager="yarn"
yarn intlayer config push
```

```bash packageManager="pnpm"
pnpm intlayer config push
```

```bash packageManager="bun"
bun x intlayer config push
```

> Якщо ви використовуєте змінні оточення в файлі конфігурації `intlayer.config.ts`, ви можете вказати потрібне оточення за допомогою аргументу `--env`:

```bash packageManager="npm"
npx intlayer config push --env production
```

```bash packageManager="yarn"
yarn intlayer config push --env production
```

```bash packageManager="pnpm"
pnpm intlayer config push --env production
```

```bash packageManager="bun"
bun x intlayer config push --env production
```

Ця команда завантажує вашу конфігурацію в Intlayer CMS.

### Відправити словник

Щоб перетворити ваші локальні словники у віддалений словник, ви можете використовувати команди [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/uk/cli/index.md).

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key
```

> Якщо ви використовуєте змінні середовища у вашому файлі конфігурації `intlayer.config.ts`, ви можете вказати потрібне середовище за допомогою аргументу `--env`:

```bash packageManager="npm"
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="yarn"
yarn intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="pnpm"
pnpm intlayer dictionary push -d my-first-dictionary-key --env production
```

```bash packageManager="bun"
bun x intlayer dictionary push -d my-first-dictionary-key --env production
```

Ця команда завантажує ваші початкові словники контенту, роблячи їх доступними для асинхронного отримання та редагування через платформу Intlayer.

### Редагування словника

Потім ви зможете переглядати та керувати своїм словником у [Intlayer CMS](https://app.intlayer.org/content).

## Live Sync

Live Sync дозволяє вашому застосунку відображати зміни контенту з CMS під час виконання. Немає потреби у перебудові або повторному розгортанні. Коли увімкнено, оновлення передаються на сервер Live Sync, який оновлює словники, які читає ваш застосунок.

Повний посібник з налаштування (увімкнення, запуск сервера Live Sync, локальний робочий процес розробки та обмеження) наведено в [документації Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/live-sync.md).

## Самостійне розгортання (Self-Hosting)

Intlayer може працювати повністю на вашій власній інфраструктурі. Одна команда розгортає повний стек (дашборд, API, база даних, сховище об'єктів та електронна пошта) за допомогою Docker Compose:

```sh
curl -fsSL https://intlayer.org/install.sh | sh
```

Повний посібник із налаштування, довідник зі змінних середовища, інструкції з оновлення та процедури резервного копіювання/відновлення наведені в [Посібнику із самостійного розгортання](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md).

---

## Налагодження

Якщо у вас виникли проблеми з CMS, перевірте наступне:

- Застосунок запущено.

- Налаштування [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) правильно встановлені у вашому конфігураційному файлі Intlayer.
  - Обов'язкові поля:
    - URL застосунку має відповідати тому, що ви вказали в конфігурації редактора (`applicationURL`).
    - URL CMS

- Переконайтеся, що конфігурацію проєкту було pushed до Intlayer CMS.

- Візуальний редактор використовує iframe для відображення вашого вебсайту. Переконайтеся, що Content Security Policy (CSP) вашого сайту дозволяє URL CMS у `frame-ancestors` ('https://app.intlayer.org' за замовчуванням). Перевірте консоль редактора на наявність помилок.
