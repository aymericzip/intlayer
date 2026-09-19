---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документация пакета remix-intlayer
description: Документация по экспортам пакета remix-intlayer, обеспечивающего интернационализацию (i18n) для приложений Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по экспортам remix-intlayer"
author: aymericzip
---

# Пакет remix-intlayer

Пакет `remix-intlayer` предоставляет инструменты для интеграции Intlayer в приложения Remix 3. Он включает промежуточное ПО (middleware) для определения локали запроса, доступ к контексту запроса и хуки для получения словарей и управления локалями.

## Установка

```bash
npm install remix-intlayer
```

## Экспорты пакета

### Промежуточное ПО (Middleware)

| Экспорт    | Тип                | Описание                                                                                                                 | Связанная документация                                                                                                                   |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Функция Middleware | Промежуточное ПО для Remix 3, определяющее локаль запроса, управляющее перенаправлениями и заполняющее контекст запроса. | [Промежуточное ПО intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/intlayerMiddleware.md) |

### Хранилище контекста

| Экспорт    | Тип                             | Описание                                                                                                                       | Связанная документация                                                                                                 |
| ---------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer` | Ключ RequestContext / Хранилище | Ключ контекста запроса, используемый для извлечения состояния Intlayer из контекста запроса Remix 3 (`context.get(Intlayer)`). | [Контекст Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/Intlayer.md) |

### Хуки

| Экспорт         | Тип | Описание                                                                                       | Связанная документация                                                                                                      |
| --------------- | --- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Хук | Получает и декорирует контент словаря по ключу с учетом текущей локали запроса.                | [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Хук | Возвращает контент предварительно импортированного словаря для текущей локали запроса.         | [Хук useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Хук | Предоставляет доступ к текущей локали запроса, локали по умолчанию и списку доступных локалей. | [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)         |

## Быстрый старт

### Настройка маршрутизатора с промежуточным ПО

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

### Использование контента в компонентах и представлениях

```ts fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `<h1>${content.title}</h1><p>${content.description}</p>`;
};
```
