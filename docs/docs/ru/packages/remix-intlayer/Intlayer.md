---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация контекста Intlayer | remix-intlayer
description: Документация по ключу хранилища контекста запроса Intlayer в приложениях Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - контекст запроса
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по ключу контекста Intlayer"
author: aymericzip
---

# Ключ контекста запроса Intlayer

Экспорт `Intlayer` служит идентификатором хранилища контекста запроса в Remix 3. Он позволяет извлекать состояние Intlayer напрямую из объекта контекста Remix внутри обработчиков маршрутов или пользовательского промежуточного ПО.

## Использование

При выполнении промежуточного ПО `intlayer()` оно сохраняет объект `IntlayerState` в контексте запроса под ключом `Intlayer`. Его можно получить в любом обработчике маршрута:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Доступ через context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Также к нему можно обратиться с помощью сокращённой записи через прямое свойство `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Структура `IntlayerState`

Объект `IntlayerState` содержит:

| Свойство           | Тип                 | Описание                                                     |
| ------------------ | ------------------- | ------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | Локаль, определённая для текущего запроса.                   |
| `defaultLocale`    | `DeclaredLocales`   | Резервная локаль, заданная в `intlayer.config.ts`.           |
| `availableLocales` | `DeclaredLocales[]` | Список всех поддерживаемых локалей, настроенных для проекта. |

## Связанная документация

- [Промежуточное ПО `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useIntlayer.md)
