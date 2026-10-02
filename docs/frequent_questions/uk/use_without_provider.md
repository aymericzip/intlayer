---
createdAt: 2026-09-28
updatedAt: 2026-10-02
priority: 4
title: "Чи можна використовувати Intlayer без глобального провайдера?"
description: "Читання контенту Intlayer без провайдера, як визначається локаль на сервері та в браузері, і різниця в продуктивності порівняно з провайдером."
keywords:
  - провайдер
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - локаль
  - продуктивність
  - гідратація
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Чи можна використовувати Intlayer без глобального провайдера?

Так. `getIntlayer` і `getDictionary` є звичайними функціями, яким не потрібен провайдер, і `useIntlayer` теж працює поза провайдером.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Локаль не передано
```

## Яка локаль використовується?

Явно передана локаль завжди має пріоритет. Інакше локаль визначається в такому порядку:

1. **Локаль поточного запиту**, на сервері, коли його обробляє інтеграція Intlayer: middleware `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` та `astro-intlayer` або `IntlayerProvider` у React Server Components.
2. **Локаль, збережена в браузері** (cookie, `localStorage`, `sessionStorage`), яку зберігає ваш перемикач мови.
3. **`defaultLocale`** з вашої конфігурації.

Кожен запит визначається за його власними cookies і заголовками та зберігається в області видимості цього запиту. Одночасні користувачі з різними локалями ніколи не ділять одну локаль.

Те саме визначення застосовується до `getDictionary`, до викликів, переписаних [оптимізацією збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md), а також до `useIntlayer` і `useDictionaryDynamic`, відрендерених поза провайдером.

- [оптимізацією збірки](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md)

[Форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md) (`number`, `date`, `list`…) та їхні хуки (`useNumber`, `useDate`, `useList`…) дотримуються того самого порядку, якщо `locale` не передано.

- [Форматери](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/formatters.md)

### Server Components у Next.js

У Next.js локаль запиту можна прочитати лише асинхронно, через `headers()` і `cookies()`. Використовуйте [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md), яка чекає на неї так само, як `getLocale()` з `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Локаль запиту

  return { title };
};
```

Читання заголовків переводить маршрут у динамічний рендеринг. Якщо `IntlayerProvider` уже надає локаль, заголовки не читаються і маршрут залишається статичним.

## Продуктивність: з провайдером чи без

Контент однаковий. Різниця стосується реактивності та вартості рендерингу.

|                     | З провайдером                                              | Без провайдера                                                                                                     |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Зміна локалі        | Компоненти перерендерюються на місці, без перезавантаження | Нічого не перерендерюється; нова локаль з'являється під час наступного виклику (навігація, перезавантаження)       |
| Вартість читання    | Звернення до контексту та підписка на локаль               | Мемоізований виклик функції, той самий об'єкт для тієї самої `key + locale`                                        |
| Вартість зміни      | Перерендеринг кожного споживача                            | Немає                                                                                                              |
| Серверний рендеринг | Сервер і браузер рендерять ту саму локаль                  | Поза інтеграцією запитів сервер рендерить `defaultLocale`, а браузер збережену локаль: можливий hydration mismatch |
| Бандл               | Код провайдера                                             | Близько 100 байт (gzip) для читання збереженої локалі, кешується до наступної зміни                                |

Залиште провайдер для інтерактивних застосунків, які змінюють локаль на місці або рендеряться на сервері. Обходьтеся без нього в бекендах, скриптах, статичних сторінках, де локаль береться з URL (передавайте її явно), або в коді, який читає контент один раз.

Докладніше див. [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayer.md).

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getIntlayer.md)
