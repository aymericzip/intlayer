---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Документація плагіна intlayer для Elysia | elysia-intlayer
description: Дізнайтеся, як використовувати плагін intlayer з пакета elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Ініціалізація документації"
author: aymericzip
---

# Документація плагіна intlayer для Elysia

Плагін `intlayer` для Elysia визначає локаль користувача та впроваджує об'єкт `intlayer` у контекст маршруту. Він також дозволяє використовувати глобальні функції перекладу в контексті запиту.

## Використання

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    uk: "Привіт",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> Плагін реєструє свій контекст через **глобальний** `derive`, який Elysia типізує як `Partial<{ intlayer: IntlayerContext }>`. Під час виконання значення завжди присутнє для маршрутів, зареєстрованих після `.use(intlayer())`, тож використовуйте non-null assertion (`intlayer!.t`) — або optional chaining — щоб задовольнити TypeScript у режимі `strict`.

Ті самі хелпери доступні як окремі експорти, тож їх можна викликати без деструктуризації контексту маршруту:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    uk: "Привіт",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Опис

Плагін виконує такі завдання:

1. **Визначення локалі**: Він зчитує локаль, явно встановлену клієнтом, зі storage (cookie, header), а потім повертається до локалі, узгодженої із заголовка `Accept-Language`.
2. **Впровадження в контекст**: Додає властивість `intlayer` до контексту маршруту Elysia (див. таблицю «Контекст маршруту» нижче).
3. **Управління контекстом**: Використовує `AsyncLocalStorage` для керування асинхронним контекстом, що дозволяє глобальним функціям Intlayer (`t`, `getIntlayer`, `getDictionary`) отримувати доступ до локалі, специфічної для запиту, без передавання об'єкта контексту.
4. **Підготовка словників**: Викликає `prepareIntlayer` під час створення плагіна, тож словники збираються під час старту застосунку.

### Контекст маршруту

| Властивість       | Тип                      | Опис                                                                                                 |
| ----------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`                 | Локаль, яку слід використати для цього запиту; `locale_storage` має пріоритет над `locale_detected`. |
| `locale_storage`  | `Locale` (необов'язково) | Локаль, явно запитана клієнтом через cookie або header.                                              |
| `locale_detected` | `Locale`                 | Локаль, узгоджена із заголовків запиту.                                                              |
| `defaultLocale`   | `Locale`                 | Локаль, налаштована як fallback у `intlayer.config.ts`.                                              |
| `t`               | `TranslateFunction`      | Функція перекладу.                                                                                   |
| `getIntlayer`     | `typeof getIntlayer`     | Функція для отримання словників за ключем.                                                           |
| `getDictionary`   | `typeof getDictionary`   | Функція для обробки об'єктів словників.                                                              |

> На відміну від плагінів Intlayer, побудованих на Node, `elysia-intlayer` спирається на `AsyncLocalStorage` замість `cls-hooked`, оскільки `cls-hooked` залежить від `async_hooks.createHook`, який Bun не реалізує.

Контекст запиту звільняється одразу після мапінгу відповіді, тож окремі хелпери ніколи не розв'язуються щодо вже завершеного запиту. Якщо їх викликати поза запитом, який обробляє плагін, вони повертаються до налаштованої локалі за замовчуванням.

## Порядок визначення локалі

За замовчуванням плагін визначає локаль у такому порядку:

1. Cookie `INTLAYER_LOCALE`.
2. Заголовок `x-intlayer-locale`.
3. Узгодження через заголовок `Accept-Language`.
4. Налаштована `defaultLocale`.

```bash
# Узгоджено з `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# Cookie має пріоритет над `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# Заголовок має пріоритет над `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Конфігурація

Плагін читає ваш файл `intlayer.config.ts`. Ви можете налаштувати cookie та header, які використовуються для визначення локалі:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Докладніше про конфігурацію дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Пов'язана документація

- [Документація пакета elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Повний посібник щодо перекладу вашого додатка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_elysia.md)
