---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документация middleware onRequest | astro-intlayer
description: Узнайте, как использовать middleware onRequest в приложениях Astro для определения локали запроса и заполнения Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - интернационализация
  - документация
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация"
author: aymericzip
---

# Документация middleware Astro onRequest

Middleware `onRequest` из `astro-intlayer/middleware` определяет локаль каждого входящего HTTP-запроса и заполняет `Astro.locals.intlayer`.

При регистрации интеграции `intlayer()` в `astro.config.mjs` это промежуточное ПО внедряется автоматически. Вам нужно импортировать его напрямую только в том случае, если вы вручную компонуете middleware Astro с помощью `sequence(...)`.

## Использование

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Доступ к разрешенной локали в вашем пользовательском middleware
  const { locale } = context.locals.intlayer;
  console.log(`Обработка запроса для локали: ${locale}`);

  return next();
});
```

## Описание

Middleware выполняет следующие действия:

1. **Определение локали**:
   - **URL**: Анализирует префикс пути URL или параметр поиска `?locale=` (если `routing.mode` не установлен в `no-prefix`).
   - **Куки / Заголовки**: Проверяет сохраненные файлы cookie локали или пользовательские значения заголовков.
   - **Accept-Language**: Использует предпочтительный язык браузера в качестве резерва.
   - Для предрендеренных страниц (`context.isPrerendered`) локаль извлекается строго из URL, чтобы предотвратить предупреждения сборки Astro.
2. **Заполнение контекста**: Заполняет `Astro.locals.intlayer` следующими данными:
   - `locale`: Разрешенная локаль.
   - `defaultLocale`: Резервная локаль по умолчанию.
   - `availableLocales`: Массив настроенных локалей.
3. **Область AsyncLocalStorage**: Оборачивает обработку запроса в область `AsyncLocalStorage`, позволяя `useIntlayer()`, `useDictionary()` и `useLocale()` получать доступ к состоянию запроса без явной передачи аргументов.

## Тип `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Связанная документация

- [Интеграция `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useLocale.md)
