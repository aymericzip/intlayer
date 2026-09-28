---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация промежуточного ПО intlayer | remix-intlayer
description: Узнайте, как использовать промежуточное ПО intlayer в Remix 3 для определения локали, обработки перенаправлений и внедрения состояния Intlayer в контекст запроса.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по промежуточному ПО intlayer"
author: aymericzip
---

# Документация промежуточного ПО intlayer для Remix 3

Промежуточное ПО `intlayer` для Remix 3 управляет слоем интернационализации во всём вашем приложении. Построенное на веб-стандартах (`Request` и `Response`), оно обрабатывает маршрутизацию по локалям (перенаправления и внутренние перезаписи), определяет локаль запроса, сохраняет её в cookie и заголовках, а также создаёт область `AsyncLocalStorage`, чтобы последующие обработчики и компоненты могли получать доступ к переводам без передачи props по цепочке.

## Использование

Зарегистрируйте промежуточное ПО `intlayer` при инициализации маршрутизатора Remix 3:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Обслуживает `/`, `/fr`, `/es`, локаль определяется из запроса
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Описание

Промежуточное ПО `intlayer` выполняет следующие задачи:

1. **Подготовка словарей**: Запускает `prepareIntlayer` при старте, чтобы все сгенерированные словари были собраны и доступны.
2. **Маршрутизация по локалям**: Оценивает запрос в соответствии с настроенной стратегией маршрутизации (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Перенаправления**: Если пользователь открывает `/about` и должен быть направлен на путь с префиксом локали (например, `/fr/about`), промежуточное ПО возвращает ответ-перенаправление с соответствующими заголовками `location` и `Set-Cookie`.
   - **Внутренние перезаписи**: Когда пользователь обращается к `/fr/about`, URL внутренне перезаписывается, чтобы ваш обработчик маршрута совпадал с `/about`, а определённая локаль фиксируется как `fr`.
   - **Локализованные псевдонимы URL**: Учитывает правила перезаписи URL, заданные в `intlayer.config.ts` (например, перезапись `/fr/about` в `/fr/a-propos`).
3. **Определение локали**: Определяет активную локаль по префиксу URL, сохранённым cookie, пользовательским заголовкам или предпочтениям браузера `Accept-Language`.
4. **Внедрение контекста**:
   - Прикрепляет `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) к `RequestContext` Remix под ключом `Intlayer` и в `context.intlayer`.
   - Выполняет оставшуюся часть запроса внутри области `AsyncLocalStorage` (`requestStorage`), что позволяет корректно вызывать `useIntlayer`, `useDictionary` и `useLocale` в обработчиках, представлениях и компонентах.
5. **Сохранение**: Добавляет исходящие заголовки и cookie локали к итоговому HTTP-ответу, чтобы сохранить предпочтение пользователя.

## Параметры

Функция `intlayer` принимает необязательные параметры `IntlayerMiddlewareOptions`:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Переопределения пользовательской конфигурации маршрутизации
};

const middleware = intlayer(options);
```

## Прямой доступ к контексту

Помимо использования хуков, вы можете получить разрешённое состояние `IntlayerState` непосредственно из контекста запроса Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Через context.get()
  const state = context.get(Intlayer);

  // Или через прямое свойство context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Связанная документация

- [Контекст запроса `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/Intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)
