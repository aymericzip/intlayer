---
createdAt: 2026-01-21
updatedAt: 2026-02-25
title: Документация intlayerMiddleware | next-intlayer
description: Узнайте, как использовать функцию intlayerMiddleware из пакета next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.1.7
    date: 2026-02-25
    changes: Переименование intlayerMiddleware в intlayerProxy
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Документация intlayerProxy (intlayerMiddleware)

Функция `intlayerProxy` (`intlayerMiddleware` для nextjs < 16) — это middleware для Next.js, который обрабатывает маршрутизацию и перенаправления на основе локали. Она автоматически определяет предпочитаемую локаль пользователя и при необходимости перенаправляет его на соответствующий локализованный путь.

## Использование

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Описание

Middleware выполняет следующие задачи:

1. **Определение локали**: Проверяет путь URL, cookie и заголовок `Accept-Language`, чтобы определить локаль пользователя.
2. **Перенаправление**: Если URL не содержит префикса локали и конфигурация требует его (или на основе предпочтений пользователя), выполняется редирект на локализованный URL.
3. **Управление cookie**: Может сохранять обнаруженную локаль в cookie для последующих запросов.

## Параметры

Функция принимает стандартный Next.js `NextRequest` в качестве параметра при непосредственном использовании, либо её можно экспортировать, как показано выше.

## Конфигурация

Чтобы настроить middleware, вы можете задать опцию `routing` в файле `intlayer.config.ts`. См. [конфигурацию](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md) для более подробной информации.
