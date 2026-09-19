---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документація пакета remix-intlayer
description: Документація щодо експортів пакета remix-intlayer, що забезпечує інтернаціоналізацію (i18n) для додатків Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Початкова документація щодо експортів remix-intlayer"
author: aymericzip
---

# Пакет remix-intlayer

Пакет `remix-intlayer` надає інструменти для інтеграції Intlayer у додатки Remix 3. Він включає проміжне програмне забезпечення (middleware) для визначення локалі запиту, доступ до контексту запиту та хуки для отримання словників і керування локалями.

## Встановлення

```bash
npm install remix-intlayer
```

## Експорти пакета

### Проміжне програмне забезпечення (Middleware)

| Експорт    | Тип                | Опис                                                                                                                          | Пов'язаний документ                                                                                                                |
| ---------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Функція Middleware | Проміжне програмне забезпечення для Remix 3, яке визначає локаль запиту, керує перенаправленнями та заповнює контекст запиту. | [Middleware intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/intlayerMiddleware.md) |

### Зберігання контексту

| Експорт    | Тип                           | Опис                                                                                                                            | Пов'язаний документ                                                                                                    |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | Ключ RequestContext / Сховище | Ключ контексту запиту, який використовується для отримання стану Intlayer з контексту запиту Remix 3 (`context.get(Intlayer)`). | [Контекст Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/Intlayer.md) |

### Хуки

| Експорт         | Тип | Опис                                                                                                        | Пов'язаний документ                                                                                                         |
| --------------- | --- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Хук | Отримує та декорує вміст словника за ключем для поточної локалі запиту.                                     | [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Хук | Повертає вміст попередньо імпортованого об'єкта словника для поточної локалі запиту.                        | [Хук useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Хук | Надає доступ до поточної локалі запиту, локалі за замовчуванням та списку всіх доступних у проєкті локалей. | [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)         |

## Швидкий старт

### Налаштування маршрутизатора з Middleware

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### Використання контенту у представленнях та компонентах

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
