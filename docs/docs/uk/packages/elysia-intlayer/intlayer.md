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

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    uk: "Привіт",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Ті самі хелпери доступні як окремі експорти, тож їх можна викликати без деструктуризації контексту маршруту:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    uk: "Привіт",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Опис

Плагін виконує такі завдання:

1. **Визначення локалі**: Він зчитує локаль, явно встановлену клієнтом, зі storage (cookie, header), а потім повертається до локалі, узгодженої із заголовка `Accept-Language`.
2. **Впровадження в контекст**: Додає властивість `intlayer` до контексту маршруту Elysia, яка містить:
   - `locale`: Локаль, яку слід використати для цього запиту; `locale_storage` має пріоритет над `locale_detected`.
   - `locale_storage`: Локаль, явно запитана клієнтом через cookie або header.
   - `locale_detected`: Локаль, узгоджена із заголовків запиту.
   - `defaultLocale`: Локаль, налаштована як fallback у `intlayer.config.ts`.
   - `t`: Функція перекладу.
   - `getIntlayer`: Функція для отримання словників за ключем.
   - `getDictionary`: Функція для обробки об'єктів словників.
3. **Управління контекстом**: Використовує `AsyncLocalStorage` для керування асинхронним контекстом, що дозволяє глобальним функціям Intlayer (`t`, `getIntlayer`, `getDictionary`) отримувати доступ до локалі, специфічної для запиту, без передавання об'єкта контексту.

> На відміну від плагінів Intlayer, побудованих на Node, `elysia-intlayer` спирається на `AsyncLocalStorage` замість `cls-hooked`, оскільки `cls-hooked` залежить від `async_hooks.createHook`, який Bun не реалізує.

Контекст запиту звільняється одразу після мапінгу відповіді, тож окремі хелпери ніколи не розв'язуються щодо вже завершеного запиту. Якщо їх викликати поза запитом, який обробляє плагін, вони повертаються до налаштованої локалі за замовчуванням.

## Конфігурація

Плагін читає ваш файл `intlayer.config.ts`. Ви можете налаштувати cookie та header, які використовуються для визначення локалі:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

> Докладніше про конфігурацію дивіться в [документації з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).
