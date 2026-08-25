---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Документація пакета elysia-intlayer
description: Плагін Elysia для Intlayer, який надає функції перекладу та визначення локалі.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Уніфікована документація для всіх експортів"
author: aymericzip
---

# Пакет elysia-intlayer

Пакет `elysia-intlayer` надає плагін для додатків на Elysia для роботи з інтернаціоналізацією. Він визначає локаль користувача та впроваджує об'єкт `intlayer` у контекст маршруту.

## Встановлення

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` — це peer dependency (`>=1.0.0`). Elysia орієнтований на runtime **Bun**.

## Експорти

### Плагін

Імпорт:

```ts
import { intlayer } from "elysia-intlayer";
```

| Функція    | Опис                                                                                                                                                                                                                                                                                                             | Пов'язана документація                                                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Плагін Elysia, який інтегрує Intlayer у ваш додаток Elysia. Обробляє визначення локалі зі storage (cookies, headers), потім із `Accept-Language`, впроваджує об'єкт `intlayer`, що надає `locale`, `t`, `getIntlayer` та `getDictionary`, у контекст маршруту, і налаштовує контекст запиту `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/elysia-intlayer/intlayer.md) |

### Функції

Імпорт:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Функція         | Опис                                                                                                                                                                                                                                                                     | Пов'язана документація                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Глобальна функція перекладу, яка отримує вміст для поточної локалі в Elysia. Використовує `AsyncLocalStorage` для доступу до контексту запиту, налаштованого плагіном `intlayer`, а поза ним повертається до локалі за замовчуванням. Також доступна через `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/translation.md) |
| `getIntlayer`   | Отримує словник за його ключем зі згенерованої декларації та повертає його вміст для поточної локалі. Оптимізована версія `getDictionary`. Використовує `AsyncLocalStorage` для доступу до контексту запиту. Також доступна через `intlayer.getIntlayer`.                | -                                                                                                      |
| `getDictionary` | Обробляє об'єкти словників і повертає вміст для поточної локалі. Обробляє переклади `t()`, перелічення, markdown, HTML тощо. Використовує `AsyncLocalStorage` для доступу до контексту запиту. Також доступна через `intlayer.getDictionary`.                            | -                                                                                                      |

### Типи

Імпорт:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Тип                 | Опис                                                                                                                                                                        |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Форма об'єкта `intlayer`, що впроваджується в кожен контекст маршруту: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Сигнатура функції перекладу, яка перетворює locale map на вміст, що відповідає локалі поточного запиту.                                                                     |

## Використання

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Завантажте плагін інтернаціоналізації
  .use(intlayer())
  // Читаємо локаль і helpers з контексту маршруту
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      uk: "Привіт",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Або використовуємо standalone helpers, прив'язані до поточного запиту
  .get("/t_example", () =>
    t({
      uk: "Приклад повернутого вмісту українською мовою",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Плагін реєструє свій контекст через **глобальний** `derive`, який Elysia типізує як `Partial<{ intlayer: IntlayerContext }>`. Під час виконання значення завжди присутнє для маршрутів, зареєстрованих після `.use(intlayer())`, тож використовуйте non-null assertion (`intlayer!.locale`) — або optional chaining — щоб задовольнити TypeScript у режимі `strict`.

## Пов'язана документація

- [Elysia i18n - Повний посібник щодо перекладу вашого додатка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_with_elysia.md)
- [Конфігурація](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md)
