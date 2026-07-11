---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Live Sync | Відображення змін контенту CMS у реальному часі
description: Дозвольте вашому застосунку відображати зміни контенту Intlayer CMS у реальному часі — без пересборки чи повторного розгортання.
keywords:
  - Live Sync
  - Жива синхронізація
  - CMS
  - Візуальний редактор
  - Інтернаціоналізація
  - Документація
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Перенесено з документації Intlayer CMS на окрему сторінку"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Додано документацію `liveSync`"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Замінено поле `hotReload` на `liveSync`"
author: aymericzip
---

# Live Sync

Live Sync дозволяє вашому застосунку відображати зміни контенту з CMS під час виконання. Немає потреби у перебудові або повторному розгортанні. Коли увімкнено, оновлення передаються на сервер Live Sync, який оновлює словники, які читає ваш застосунок.

## Зміст

<TOC/>

---

## Увімкнення Live Sync

Увімкніть Live Sync, оновивши конфігурацію Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
  dictionary: {
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
    importMode: "fetch",
  },
};

export default config;
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
    "start": "npx intlayer live --with 'next start'",
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
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Live Sync-сервер обгортає ваш додаток і автоматично застосовує оновлений контент у міру його надходження.

Щоб отримувати сповіщення про зміни з CMS, Live Sync-сервер підтримує SSE-з'єднання з бекендом. Коли вміст у CMS змінюється, бекенд пересилає оновлення до Live Sync-сервера, який записує нові словники. Ваш додаток відобразить оновлення при наступній навігації або перезавантаженні браузера, без необхідності перебудови.

Схема потоку (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Схема потоку Live Sync (CMS/Backend -> Live Sync Server -> Application Server -> Frontend)](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Як це працює:

![Схема логіки Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## Робочий процес розробки (локально)

- Під час розробки всі віддалені словники завантажуються при запуску застосунку, тож ви можете швидко тестувати оновлення.
- Щоб протестувати Live Sync локально з Next.js, обгорніть ваш dev-сервер:

```json5 fileName="package.json"
{
  "scripts": {
    // ... інші скрипти
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Для Vite
  },
}
```

Увімкніть оптимізацію, щоб Intlayer застосовував трансформації Live import під час розробки:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Ця конфігурація обгортає ваш dev-сервер Live Sync-сервером, завантажує віддалені словники при старті та передає оновлення з CMS через SSE. Оновіть сторінку, щоб побачити зміни.

## Примітки та обмеження

- Додайте origin Live Sync до політики безпеки вашого сайту (CSP). Переконайтеся, що URL Live Sync дозволений у `connect-src` (і в `frame-ancestors`, якщо це доречно).
- Live Sync не працює зі статичним виводом. Для Next.js сторінка має бути динамічною, щоб отримувати оновлення під час виконання (наприклад, використовуйте `generateStaticParams`, `generateMetadata`, `getServerSideProps` або `getStaticProps` відповідно, щоб уникнути повного обмеження лише статикою).
- У CMS кожний словник має прапорець `live`. Лише словники з `live=true` завантажуються через API live sync; інші імпортуються динамічно і залишаються незмінними під час виконання.
- Прапорець `live` оцінюється для кожного словника під час збірки. Якщо віддалений контент не мав `live=true` під час збірки, потрібно перебудувати проект, щоб увімкнути Live Sync для цього словника.
- Сервер live sync має мати можливість записувати в `.intlayer`. У контейнерах переконайтеся, що є права запису до `/.intlayer`.

## Корисні посилання

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_CMS.md)
- [Візуальний редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md)
- [Довідник з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
- [Посібник із самостійного розгортання](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/self_hosting.md)
