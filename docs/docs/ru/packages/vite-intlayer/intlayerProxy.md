---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Документация плагина Vite intlayerProxy | vite-intlayer
description: Middleware локализации роутинга для серверов dev/preview в Vite и серверного рендеринга (SSR) в продакшене. Обрабатывает определение языка, перенаправления URL и внутренние перезаписи путей.
keywords:
  - intlayerProxy
  - vite
  - плагин
  - middleware
  - локаль
  - роутинг
  - интернационализация
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Параметр configOptions объединен в один объект настроек; прокси встроен в intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` — это плагин Vite, который регистрирует промежуточное ПО (middleware) локализации роутинга для **любой среды**: dev-сервера, preview-сервера и продакшен SSR (Nitro / TanStack Start).

> **Начиная с Intlayer v9** `intlayerProxy` автоматически включается в основной плагин [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md) и активирован по умолчанию с помощью настройки `routing.enableProxy: true`. Вам нужно регистрировать его отдельно только в том случае, если вам нужен низкоуровневый контроль или если вы используете его за пределами стандартной конфигурации `intlayer()`.

## Использование

### В составе `intlayer()` (рекомендуется, v9+)

Передайте параметры `proxy` в основной плагин вместо отдельной регистрации `intlayerProxy`:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### Отдельно (при необходимости)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Параметры

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Все параметры являются необязательными и передаются в виде единого объекта:

| Параметр        | Тип                                 | Описание                                                                                                                                                                                  |
| --------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | Предикат, который исключает запросы из локализации роутинга. Верните `true`, чтобы пропустить запрос (например, для роутов API, health check-ов).                                         |
| `configOptions` | `GetConfigurationOptions`           | Переопределения конфигурации Intlayer, передаваемые в `getConfiguration()`. Используйте, когда вам нужно, чтобы прокси читал конкретный конфигурационный файл или переопределял значения. |

### Пример

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` создает независимый от фреймворка Node.js middleware `(req, res, next)`, который содержит всю логику локализации роутинга. Это полезно в средах, где API плагинов Vite недоступен (например, на обычном сервере Node.js или в кастомном модуле Nitro).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### Продакшен SSR (TanStack Start / Nitro через h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Поведение роутинга

Этот middleware дублирует логику роутинга из middleware `next-intlayer` и поддерживает все режимы роутинга Intlayer.

### Режимы роутинга

| Режим           | URL виден в браузере     | Поведение                                                                                                                         |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/ru/about`              | По умолчанию. Префикс языка в URL. Язык по умолчанию перенаправляет на URL без префикса, если не активен `prefix-all`.            |
| `prefix-all`    | `/en/about`, `/ru/about` | Все языки (включая язык по умолчанию) всегда имеют префикс в URL.                                                                 |
| `no-prefix`     | `/about`                 | Нет языка в URL. Язык сохраняется только в cookies; перезапись URL происходит на внутреннем уровне.                               |
| `search-params` | `/about?locale=ru`       | Язык передается как query-параметр. Перенаправляет для добавления/обновления параметра `locale`, если он отсутствует или устарел. |

### Приоритет определения

1. Префикс пути URL (например, `/ru/about` → `ru`).
2. Значение в cookie / localStorage (`intlayer-locale`).
3. Заголовок `Accept-Language`.
4. `defaultLocale` из конфигурации.

### Автоматический обход (Bypass)

Этот middleware всегда пропускает следующие запросы напрямую без обработки локали:

- Запросы, соответствующие предикату `ignore`.
- `/node_modules/**`
- `/@**` — внутренние запросы Vite (`@vite/`, `@fs/`, `@id/` и т.д.).
- `/_**` — внутренние запросы сервера (`__vite_ping`, `__manifest` и т.д.).
- Запросы, путь которых заканчивается расширением файла (статические файлы). Если в пути статического файла присутствует языковой префикс (например, `/ru/logo.png`), он удаляется, чтобы файл мог быть отдан корректно.

### Роутинг по доменам

Когда в вашей конфигурации Intlayer настроен параметр `routing.domains`, этот middleware обрабатывает роутинг языков между разными доменами:

- Запрос для `/zh/about` на домене `intlayer.org` перенаправляется на `https://intlayer.zh/about`, когда `domains.zh = "intlayer.zh"`.
- Запрос к `intlayer.zh/about` внутренне переписывается в `/zh/about`, чтобы заполнился параметр маршрута `[locale]`.

### Защита от бесконечного редиректа

Этот middleware отслеживает количество перенаправлений для пары `originalUrl → newUrl` в скользящем 2-секундном окне. Более 10 перенаправлений в этом окне возвращают ошибку `500` с подробным описанием вместо бесконечного цикла.

## Nitro / SSR в продакшене (автоматическое внедрение, v9+)

Когда `intlayerProxy` используется как плагин Vite, он содержит свойство `.nitro`. Плагин сборки `nitro/vite` считывает это свойство и помещает его в `nitroConfig.modules`, благодаря чему `intlayerNitroHandler` регистрируется как middleware сервера Nitro автоматически — для продакшен SSR не требуется ручная настройка.

Обработчик Nitro использует модель событий Web Fetch API h3 v2 (а не `fromNodeMiddleware`), поэтому он совместим со всеми пресетами Nitro: Node, Bun, Deno, edge runtimes.

## Устаревшие алиасы

| Устаревший экспорт         | Замена          |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
