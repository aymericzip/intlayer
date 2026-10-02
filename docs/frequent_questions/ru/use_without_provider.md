---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "Можно ли использовать Intlayer без глобального провайдера?"
description: "Чтение контента Intlayer без провайдера, как определяется локаль на сервере и в браузере, и разница в производительности по сравнению с провайдером."
keywords:
  - провайдер
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - локаль
  - производительность
  - гидратация
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Можно ли использовать Intlayer без глобального провайдера?

Да. `getIntlayer` и `getDictionary` являются обычными функциями, которым не нужен провайдер, и `useIntlayer` тоже работает вне провайдера.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Локаль не передана
```

## Какая локаль используется?

Явно переданная локаль всегда имеет приоритет. Иначе локаль определяется в следующем порядке:

1. **Локаль текущего запроса**, на сервере, когда его обрабатывает интеграция Intlayer: middleware `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` и `astro-intlayer` или `IntlayerProvider` в React Server Components.
2. **Локаль, сохранённая в браузере** (cookie, `localStorage`, `sessionStorage`), которую сохраняет ваш переключатель языка.
3. **`defaultLocale`** из вашей конфигурации.

Каждый запрос определяется по его собственным cookies и заголовкам и хранится в области видимости этого запроса. Одновременные пользователи с разными локалями никогда не делят одну локаль.

То же определение применяется к `getDictionary`, к вызовам, переписанным [оптимизацией сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md), а также к `useIntlayer` и `useDictionaryDynamic`, отрендеренным вне провайдера.

- [оптимизацией сборки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md)

[Форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md) (`number`, `date`, `list`…) и их хуки (`useNumber`, `useDate`, `useList`…) следуют тому же порядку, если `locale` не передана.

- [Форматтеры](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/formatters.md)

### Server Components в Next.js

В Next.js локаль запроса можно прочитать только асинхронно, через `headers()` и `cookies()`. Используйте [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayerAsync.md), которая дожидается её так же, как `getLocale()` из `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Локаль запроса

  return { title };
};
```

Чтение заголовков переводит маршрут в динамический рендеринг. Если `IntlayerProvider` уже предоставляет локаль, заголовки не читаются и маршрут остаётся статическим.

## Производительность: с провайдером или без

Контент одинаковый. Разница касается реактивности и стоимости рендеринга.

|                     | С провайдером                                          | Без провайдера                                                                                                     |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Смена локали        | Компоненты перерисовываются на месте, без перезагрузки | Ничего не перерисовывается; новая локаль появляется при следующем вызове (навигация, перезагрузка)                 |
| Стоимость чтения    | Обращение к контексту и подписка на локаль             | Мемоизированный вызов функции, тот же объект для той же `key + locale`                                             |
| Стоимость смены     | Перерисовка каждого потребителя                        | Нет                                                                                                                |
| Серверный рендеринг | Сервер и браузер рендерят одну и ту же локаль          | Вне интеграции запросов сервер рендерит `defaultLocale`, а браузер сохранённую локаль: возможен hydration mismatch |
| Бандл               | Код провайдера                                         | Около 100 байт (gzip) для чтения сохранённой локали, кэшируется до следующей смены                                 |

Оставьте провайдер для интерактивных приложений, которые меняют локаль на месте или рендерятся на сервере. Обходитесь без него в бэкендах, скриптах, статических страницах, где локаль берётся из URL (передавайте её явно), или в коде, который читает контент один раз.

Подробнее см. [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md).

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getIntlayer.md)
