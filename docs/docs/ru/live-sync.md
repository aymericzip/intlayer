---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Live Sync | Отражение изменений контента CMS в реальном времени
description: Позвольте вашему приложению отражать изменения контента Intlayer CMS в реальном времени — без пересборки и повторного развёртывания.
keywords:
  - Live Sync
  - Живая синхронизация
  - CMS
  - Визуальный редактор
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Перенесено из документации Intlayer CMS в отдельную страницу"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Добавлена документация по live sync"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Заменено поле `hotReload` на `liveSync`"
author: aymericzip
---

# Живая синхронизация

Живая синхронизация позволяет вашему приложению отражать изменения контента CMS в режиме реального времени. Пересборка или повторный деплой не требуются. Когда функция включена, обновления передаются на сервер живой синхронизации, который обновляет словари, используемые вашим приложением.

## Содержание

<TOC/>

---

## Включение Live Sync

Включите живую синхронизацию, обновив конфигурацию Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... другие настройки конфигурации
  editor: {
    /**
     * Включает горячую перезагрузку конфигураций локалей при обнаружении изменений.
     * Например, когда словарь добавляется или обновляется, приложение обновляет
     * отображаемый на странице контент.
     *
     * Поскольку горячая перезагрузка требует постоянного подключения к серверу,
     * она доступна только для клиентов с тарифным планом `enterprise`.
     *
     * По умолчанию: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Управляет способом импорта словарей:
     *
     * - "fetch": словари загружаются динамически с использованием Live Sync API.
     *   Заменяет useIntlayer на useDictionaryDynamic.
     *
     * Примечание: Режим "fetch" использует Live Sync API для загрузки словарей. Если вызов API
     * не удаётся, словари импортируются динамически.
     * Примечание: Только словари с удалённым содержимым и флагом "live" используют режим "fetch".
     * Остальные используют динамический режим для повышения производительности.
     */
    importMode: "fetch",
  },
};

export default config;
```

Запустите сервер Live Sync, чтобы обернуть ваше приложение:

Пример использования автономного сервера:

```json5 fileName="package.json"
{
  "scripts": {
    // ... other scripts
    "live:start": "npx intlayer live",
  },
}
```

Вы также можете использовать сервер вашего приложения параллельно, используя аргумент `--process`.

Пример с использованием Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Пример с использованием Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Сервер Live Sync оборачивает ваше приложение и автоматически применяет обновлённый контент по мере его поступления.

Чтобы получать уведомления об изменениях из CMS, сервер Live Sync поддерживает SSE-соединение с бэкендом. Когда контент в CMS изменяется, бэкенд пересылает обновление серверу Live Sync, который записывает новые словари. Ваше приложение отобразит обновление при следующей навигации или перезагрузке браузера, пересборка не требуется.

Блок-схема (CMS/Backend -> Live Sync Server -> Application Server -> Frontend):

![Схема потока Live Sync CMS/Backend/Live Sync Server/Application Server/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Как это работает:

![Схема логики Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## Рабочий процесс разработки (локально)

- В процессе разработки все удалённые словари загружаются при запуске приложения, чтобы вы могли быстро тестировать обновления.
- Чтобы протестировать Live Sync локально с Next.js, оберните ваш dev-сервер:

```json5 fileName="package.json"
{
  "scripts": {
    // ... другие скрипты
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Для Vite
  },
}
```

Включите оптимизацию, чтобы Intlayer применял трансформации Live импорта во время разработки:

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
    optimize: true, // default: process.env.NODE_ENV === 'production'
  },
};

export default config;
```

Эта настройка оборачивает ваш dev-сервер сервером Live Sync, загружает удалённые словари при запуске и транслирует обновления из CMS через SSE. Обновите страницу, чтобы увидеть изменения.

## Примечания и ограничения

- Добавьте источник live sync в политику безопасности вашего сайта (CSP). Убедитесь, что URL live sync разрешён в `connect-src` (и в `frame-ancestors`, если это актуально).
- Live Sync не работает со статическим выводом. Для Next.js страница должна быть динамической, чтобы получать обновления во время выполнения (например, используйте `generateStaticParams`, `generateMetadata`, `getServerSideProps` или `getStaticProps` соответствующим образом, чтобы избежать ограничений полностью статического вывода).
- В CMS у каждого словаря есть флаг `live`. Только словари с `live=true` загружаются через API live sync; остальные импортируются динамически и остаются неизменными во время выполнения.
- Флаг `live` оценивается для каждого словаря во время сборки. Если удалённый контент не был помечен как `live=true` во время сборки, необходимо выполнить повторную сборку, чтобы включить Live Sync для этого словаря.
- Сервер live sync должен иметь возможность записывать в `.intlayer`. В контейнерах убедитесь, что есть права на запись в `/.intlayer`.

## Полезные ссылки

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)
- [Визуальный редактор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)
- [Справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
- [Руководство по самостоятельному размещению](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md)
