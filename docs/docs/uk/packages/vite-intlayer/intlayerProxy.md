---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Документація плагина Vite intlayerProxy | vite-intlayer
description: Middleware локалізації роутингу для серверів dev/preview у Vite та серверного рендерингу (SSR) у продакшені. Обробляє визначення мови, перенаправлення URL та внутрішні перезаписи шляхів.
keywords:
  - intlayerProxy
  - vite
  - плагін
  - middleware
  - локаль
  - роутинг
  - інтернаціоналізація
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
    changes: "Параметр configOptions об'єднано в один об'єкт налаштувань; проксі вбудовано в intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` — це плагін Vite, який реєструє проміжне програмне забезпечення (middleware) локалізації роутингу для **будь-якого середовища**: dev-сервера, preview-сервера та продакшен SSR (Nitro / TanStack Start).

> **Починаючи з Intlayer v9**, `intlayerProxy` автоматично включається в основний плагін [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md) і активований за замовчуванням за допомогою налаштування `routing.enableProxy: true`. Вам потрібно реєструвати його окремо лише в тому випадку, якщо вам потрібен низькорівневий контроль або якщо ви використовуєте його за межами стандартної конфігурації `intlayer()`.

## Використання

### У складі `intlayer()` (рекомендовано, v9+)

Передайте параметри `proxy` в основний плагін замість окремої реєстрації `intlayerProxy`:

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

### Окремо (за необхідності)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Параметри

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Усі параметри є необов'язковими і передаються у вигляді єдиного об'єкта:

| Параметр        | Тип                                 | Опис                                                                                                                                                                                        |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ignore`        | `(req: IncomingMessage) => boolean` | Предикат, який виключає запити з локалізації роутингу. Поверніть `true`, щоб пропустити запит (наприклад, для роутів API, health check-ів).                                                 |
| `configOptions` | `GetConfigurationOptions`           | Перевизначення конфігурації Intlayer, що передаються в `getConfiguration()`. Використовуйте, коли вам потрібно, щоб проксі читав конкретний конфігураційний файл або перевизначав значення. |

### Приклад

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` створює незалежний від фреймворку Node.js middleware `(req, res, next)`, який містить всю логіку локалізації роутингу. Це корисно в середовищах, де API плагінів Vite недоступний (наприклад, на звичайному сервері Node.js або в кастомному модулі Nitro).

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

## Поведінка роутингу

Цей middleware дублює логіку роутингу з middleware `next-intlayer` і підтримує всі режими роутингу Intlayer.

### Режими роутингу

| Режим           | URL видно в браузері     | Поведінка                                                                                                                      |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `prefix`        | `/uk/about`              | За замовчуванням. Префікс мови в URL. Мова за замовчуванням перенаправляє на URL без префікса, якщо не активний `prefix-all`.  |
| `prefix-all`    | `/en/about`, `/uk/about` | Усі мови (включаючи мову за замовчуванням) завжди мають префікс в URL.                                                         |
| `no-prefix`     | `/about`                 | Немає мови в URL. Мова зберігається тільки в cookies; перезапис URL відбувається на внутрішньому рівні.                        |
| `search-params` | `/about?locale=uk`       | Мова передається як query-параметр. Перенаправляє для додавання/оновлення параметра `locale`, якщо він відсутній або застарів. |

### Пріоритет визначення

1. Префікс шляху URL (наприклад, `/uk/about` → `uk`).
2. Значення в cookie / localStorage (`intlayer-locale`).
3. Заголовок `Accept-Language`.
4. `defaultLocale` з конфігурації.

### Автоматичний обхід (Bypass)

Цей middleware завжди пропускає наступні запити безпосередньо без обробки локалі:

- Запити, що відповідають предикату `ignore`.
- `/node_modules/**`
- `/@**` — внутрішні запити Vite (`@vite/`, `@fs/`, `@id/` тощо).
- `/_**` — внутрішні запити сервера (`__vite_ping`, `__manifest` тощо).
- Запити, шлях яких закінчується розширенням файлу (статичні файли). Якщо в шляху статичного файлу присутній мовний префікс (наприклад, `/uk/logo.png`), він видаляється, щоб файл міг бути відданий коректно.

### Роутинг по доменах

Коли у вашій конфігурації Intlayer налаштовано параметр `routing.domains`, цей middleware обробляє роутинг мов між різними доменами:

- Запит для `/zh/about` на домені `intlayer.org` перенаправляється на `https://intlayer.zh/about`, коли `domains.zh = "intlayer.zh"`.
- Запит до `intlayer.zh/about` внутрішньо переписується в `/zh/about`, щоб заповнився параметр маршруту `[locale]`.

### Захист від нескінченного редиректу

Цей middleware відстежує кількість перенаправлень для пари `originalUrl → newUrl` у рухомому 2-секундному вікні. Більше 10 перенаправлень у цьому вікні повертають помилку `500` із докладним описом замість нескінченного циклу.

## Nitro / SSR у продакшені (автоматичне впровадження, v9+)

Коли `intlayerProxy` використовується як плагін Vite, він містить властивість `.nitro`. Плагін збірки `nitro/vite` зчитує цю властивість і поміщає її в `nitroConfig.modules`, завдяки чому `intlayerNitroHandler` реєструється як middleware сервера Nitro автоматично — для продакшен SSR не потрібне ручне налаштування.

Обробник Nitro використовує модель подій Web Fetch API h3 v2 (а не `fromNodeMiddleware`), тому він сумісний з усіма пресетами Nitro: Node, Bun, Deno, edge runtimes.

## Застарілі аліаси

| Застарілий експорт         | Заміна          |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
