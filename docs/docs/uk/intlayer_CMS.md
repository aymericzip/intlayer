---
createdAt: 2025-08-23
updatedAt: 2025-08-23
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
  - version: 6.0.1
    date: 2025-09-22
    changes: Додано документацію `liveSync`
  - version: 6.0.0
    date: 2025-09-04
    changes: Замінено поле `hotReload` на `liveSync`
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізовано історію
---

# Документація системи керування контентом Intlayer (CMS)

<iframe title="Візуальний редактор + CMS для вашого вебзастосунку: Intlayer — пояснення" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/UDDTnirwi_4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Intlayer CMS — це застосунок, який дозволяє винести вміст вашого проєкту Intlayer у зовнішню систему (CMS).

Для цього Intlayer вводить поняття «віддалених словників» (distant dictionaries).

![Інтерфейс Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/assets/CMS.png)

## Зміст

<TOC/>

---

## Розуміння віддалених словників

Intlayer розрізняє 'local' та 'remote' словники.

- 'local' словник — це словник, який оголошений у вашому проєкті Intlayer. Наприклад файл декларації кнопки або ваша панель навігації. Виносити контент назовні в такому випадку не має сенсу, оскільки цей контент зазвичай не змінюється часто.

- 'remote' словник — це словник, яким керують через Intlayer CMS. Це може бути корисно, щоб дозволити вашій команді керувати контентом безпосередньо на вашому вебсайті, а також для використання функцій A/B тестування та автоматичної SEO-оптимізації.

## Візуальний редактор проти CMS

Редактор [Intlayer Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) — це інструмент, який дозволяє керувати вашим вмістом у візуальному редакторі для локальних словників. Після внесення зміни вміст буде замінено в code-base. Це означає, що застосунок буде перебудовано, а сторінка перезавантажиться для відображення нового вмісту.

На відміну від цього, Intlayer CMS — це інструмент, який дозволяє керувати вмістом у візуальному редакторі для віддалених словників. Після внесення зміни вміст **не** вплине на ваш code-base. Вебсайт автоматично відобразить змінений вміст.

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
bunx intlayer login
```

Це відкриє ваш браузер за замовчуванням, щоб завершити процес автентифікації й отримати необхідні облікові дані (Client ID та Client Secret) для використання сервісів Intlayer.

У файлі конфігурації Intlayer ви можете налаштувати параметри CMS:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... інші налаштування конфігурації
  editor: {
    /**
     * Обов'язково
     *
     * URL застосунку.
     * Це URL, на який спрямований візуальний редактор.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Обов'язково
     *
     * Client ID та client secret необхідні для увімкнення редактора.
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
     * За замовчуванням встановлено https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необов'язково
     *
     * Якщо ви самостійно розгортаєте Intlayer CMS, ви можете вказати URL бекенду.
     *
     * URL Intlayer CMS.
     * За замовчуванням встановлено на https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... інші параметри конфігурації
  editor: {
    /**
     * Обов'язково
     *
     * URL додатка.
     * Це URL, на який спрямований візуальний редактор.
     */
    applicationURL: process.env.INTLAYER_APPLICATION_URL,

    /**
     * Обов'язково
     *
     * Client ID та client secret необхідні для увімкнення редактора.
     * Вони дозволяють ідентифікувати користувача, який редагує вміст.
     * Їх можна отримати, створивши нового клієнта в Intlayer Dashboard - Projects (https://app.intlayer.org/projects).
     * clientId: process.env.INTLAYER_CLIENT_ID,
     * clientSecret: process.env.INTLAYER_CLIENT_SECRET,
     */
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,

    /**
     * Необов'язково
     *
     * Якщо ви самостійно розгортаєте Intlayer CMS, ви можете вказати URL CMS.
     *
     * URL Intlayer CMS.
     * За замовчуванням встановлено https://intlayer.org
     */
    cmsURL: process.env.INTLAYER_CMS_URL,

    /**
     * Необов'язково
     *
     * Якщо ви розгортаєте Intlayer CMS самостійно, ви можете вказати URL бекенду.
     *
     * URL Intlayer CMS.
     * За замовчуванням встановлено https://back.intlayer.org
     */
    backendURL: process.env.INTLAYER_BACKEND_URL,
  },
};

module.exports = config;
```

> Якщо у вас немає client ID та client secret, ви можете отримати їх, створивши нового клієнта в [Intlayer Dashboard - Projects](https://app.intlayer.org/projects).

> Щоб побачити всі доступні параметри, зверніться до [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Використання CMS

### Надіслати вашу конфігурацію

Щоб налаштувати Intlayer CMS, ви можете використовувати команди [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/uk/intlayer_cli.md).

```bash
npx intlayer config push
```

> Якщо ви використовуєте змінні оточення в файлі конфігурації `intlayer.config.ts`, ви можете вказати потрібне оточення за допомогою аргументу `--env`:

```bash
npx intlayer config push --env production
```

Ця команда завантажує вашу конфігурацію в Intlayer CMS.

### Відправити словник

Щоб перетворити ваші локальні словники у віддалений словник, ви можете використовувати команди [intlayer CLI](https://github.com/aymericzip/intlayer/tree/main/docs/uk/intlayer_cli.md).

```bash
npx intlayer dictionary push -d my-first-dictionary-key
```

> Якщо ви використовуєте змінні середовища у вашому файлі конфігурації `intlayer.config.ts`, ви можете вказати потрібне середовище за допомогою аргументу `--env`:

```bash
npx intlayer dictionary push -d my-first-dictionary-key --env production
```

Ця команда завантажує ваші початкові словники контенту, роблячи їх доступними для асинхронного отримання та редагування через платформу Intlayer.

### Редагування словника

Потім ви зможете переглядати та керувати своїм словником у [Intlayer CMS](https://app.intlayer.org/content).

## Live Sync

Live Sync дозволяє вашому застосунку відображати зміни контенту з CMS під час виконання. Немає потреби у перебудові або повторному розгортанні. Коли увімкнено, оновлення передаються на сервер Live Sync, який оновлює словники, які читає ваш застосунок.

Увімкніть Live Sync, оновивши конфігурацію Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... other configuration settings
  editor: {
    /**
     * Увімкнення гарячого перезавантаження конфігурацій локалей при виявленні змін.
     * Наприклад, коли словник додається або оновлюється, застосунок оновлює
     * вміст, що відображається на сторінці.
     *
     * Оскільки гаряче перезавантаження вимагає постійного з'єднання з сервером,
     * воно доступне лише клієнтам плану `enterprise`.
     *
     * За замовчуванням: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Керує способом імпорту словників:
     *
     * - "live": словники завантажуються динамічно за допомогою Live Sync API.
     *   Замінює useIntlayer на useDictionaryDynamic.
     *
     * Примітка: режим live використовує Live Sync API для отримання словників. Якщо виклик API
     * не вдасться, словники імпортуються динамічно.
     * Примітка: режим live використовується лише для словників з віддаленим контентом і прапорцем "live".
     * Інші використовують динамічний режим для кращої продуктивності.
     */
    importMode: "live",
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
     * Вмикає гаряче перезавантаження конфігурацій локалей при виявленні змін.
     * Наприклад, коли словник додається або оновлюється, додаток оновлює
     * вміст, відображений на сторінці.
     *
     * Оскільки гаряче перезавантаження (hot reloading) вимагає безперервного з'єднання з сервером, воно
     * доступне лише клієнтам з планом `enterprise`.
     *
     * За замовчуванням: false
     */
    liveSync: true,
  },
  build: {
    /**
     * Контролює, як імпортуються словники:
     *
     * - "live": Словники отримуються динамічно за допомогою Live Sync API.
     *   Замінює useIntlayer на useDictionaryDynamic.
     *
     * Примітка: У live-режимі використовується Live Sync API для отримання словників. Якщо виклик API
     * не вдається, словники імпортуються динамічно.
     * Примітка: Тільки словники з віддаленим вмістом і прапором "live" використовують live-режим.
     * Інші використовують динамічний режим для підвищення продуктивності.
     */
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... інші налаштування конфігурації
  editor: {
    /**
     * Увімкнення гарячого перезавантаження (hot reloading) конфігурацій локалей при виявленні змін.
     * Наприклад, коли словник додається або оновлюється, додаток оновлює
     * вміст, що відображається на сторінці.
     *
     * Оскільки гаряче перезавантаження потребує постійного з'єднання із сервером, воно
     * доступне лише для клієнтів плану `enterprise`.
     *
     * За замовчуванням: false
     */
    liveSync: true,

    /**
     * Порт сервера Live Sync.
     *
     * За замовчуванням: 4000
     */
    liveSyncPort: 4000,

    /**
     * URL сервера Live Sync.
     *
     * За замовчуванням: http://localhost:{liveSyncPort}
     */
    liveSyncURL: "https://live.example.com",
  },
  build: {
    /**
     * Керує тим, як імпортуються словники:
     *
     * - "live": словники завантажуються динамічно за допомогою Live Sync API.
     *   Замінює useIntlayer на useDictionaryDynamic.
     *
     * Примітка: режим live використовує Live Sync API для отримання словників. Якщо виклик API
     * зазнає невдачі, словники імпортуються динамічно.
     * Примітка: режим live використовується лише для словників з віддаленим вмістом і прапорцем "live".
     * Інші використовують динамічний режим заради продуктивності.
     */
    importMode: "live",
  },
};

module.exports = config;
```

Запустіть Live Sync сервер, щоб обгорнути ваш додаток:

Приклад із окремим (standalone) сервером:

```json5 fileName="package.json"
{
  "scripts": {
    // ... інші скрипти
    "live:start": "npx intlayer live",
  },
}
```

Ви також можете запустити сервер вашого додатку паралельно, використовуючи аргумент `--process`.

Приклад із Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... інші скрипти
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --process 'next start'",
  },
}
```

Приклад із Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... інші скрипти
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --process 'vite start'",
  },
}
```

Live Sync-сервер обгортає ваш додаток і автоматично застосовує оновлений контент у міру його надходження.

Щоб отримувати сповіщення про зміни з CMS, Live Sync-сервер підтримує SSE-з'єднання з бекендом. Коли вміст у CMS змінюється, бекенд пересилає оновлення до Live Sync-сервера, який записує нові словники. Ваш додаток відобразить оновлення при наступній навігації або перезавантаженні браузера — без необхідності перебудови.

Схема потоку (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Схема потоку Live Sync (CMS/Backend -> Live Sync Server -> Application Server -> Frontend)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Як це працює:

![Схема логіки Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

### Робочий процес розробки (локально)

- Під час розробки всі віддалені словники завантажуються при запуску застосунку, тож ви можете швидко тестувати оновлення.
- Щоб протестувати Live Sync локально з Next.js, обгорніть ваш dev-сервер:

```json5 fileName="package.json"
{
  "scripts": {
    // ... інші скрипти
    "dev": "npx intlayer live --process 'next dev'",
    // "dev": "npx intlayer live --process 'vite dev'", // Для Vite
  },
}
```

Увімкніть оптимізацію, щоб Intlayer застосовував трансформації Live import під час розробки:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // за замовчуванням: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // за замовчуванням: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  build: {
    optimize: true, // default: process.env.NODE_ENV === 'production'
    importMode: "live",
  },
};

module.exports = config;
```

Ця конфігурація обгортає ваш dev-сервер Live Sync-сервером, завантажує віддалені словники при старті та передає оновлення з CMS через SSE. Оновіть сторінку, щоб побачити зміни.

Примітки та обмеження:

- Додайте origin Live Sync до політики безпеки вашого сайту (CSP). Переконайтеся, що URL Live Sync дозволений у `connect-src` (і в `frame-ancestors`, якщо це доречно).
- Live Sync не працює зі статичним виводом. Для Next.js сторінка має бути динамічною, щоб отримувати оновлення під час виконання (наприклад, використовуйте `generateStaticParams`, `generateMetadata`, `getServerSideProps` або `getStaticProps` відповідно, щоб уникнути повного обмеження лише статикою).
- У CMS кожний словник має прапорець `live`. Лише словники з `live=true` завантажуються через API live sync; інші імпортуються динамічно і залишаються незмінними під час виконання.
- Прапорець `live` оцінюється для кожного словника під час збірки. Якщо віддалений контент не мав `live=true` під час збірки, потрібно перебудувати проект, щоб увімкнути Live Sync для цього словника.
- Сервер live sync має мати можливість записувати в `.intlayer`. У контейнерах переконайтеся, що є права запису до `/.intlayer`.

## Налагодження

Якщо у вас виникли проблеми з CMS, перевірте наступне:

- Застосунок запущено.

- Налаштування [`editor`](https://intlayer.org/doc/concept/configuration#editor-configuration) правильно встановлені у вашому конфігураційному файлі Intlayer.
  - Обов'язкові поля:
    - URL застосунку має відповідати тому, що ви вказали в конфігурації редактора (`applicationURL`).
    - URL CMS

- Переконайтеся, що конфігурацію проєкту було pushed до Intlayer CMS.

- Візуальний редактор використовує iframe для відображення вашого вебсайту. Переконайтеся, що Content Security Policy (CSP) вашого сайту дозволяє URL CMS у `frame-ancestors` ('https://app.intlayer.org' за замовчуванням). Перевірте консоль редактора на наявність помилок.
