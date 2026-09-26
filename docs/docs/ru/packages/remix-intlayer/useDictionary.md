---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация хука useDictionary | remix-intlayer
description: Узнайте, как использовать хук useDictionary в приложениях Remix 3 для получения содержимого объектов словарей для текущей локали запроса.
keywords:
  - useDictionary
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - интернационализация
  - Документация
slugs:
  - doc
  - packages
  - remix-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по хуку useDictionary"
author: aymericzip
---

# Документация хука useDictionary

Хук `useDictionary` преобразует импортированный или встроенный объект словаря и возвращает его содержимое, разрешенное для локали текущего запроса в приложениях Remix 3.

В отличие от `useIntlayer`, который находит словари по строковому ключу из глобального реестра словарей, `useDictionary` принимает объект словаря напрямую.

## Использование

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Вы также можете передавать встроенные словари, определенные с помощью функции `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        ru: "Все права защищены.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Параметры

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Объект словаря или квалифицированная группа словарей.
2. **`localeOrSelector`** (необязательно): Конкретная локаль или объект селектора (`{ item }`, `{ variant }`, при необходимости с `locale`). Имеет приоритет над локалью запроса, если указан.

## Описание

Хук выполняет следующие задачи:

1. **Определение локали**: Считывает активную локаль запроса из хранилища `AsyncLocalStorage`, созданного промежуточным ПО `intlayer()`.
2. **Разрешение содержимого**: Вычисляет переводы (`t()`), перечисления, условия и вложенные структуры в соответствии с разрешенной локалью.
3. **Обработка селектора**: Применяет любые селекторы элементов или вариантов, указанные в аргументах.

## Связанная документация

- [Промежуточное ПО `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)
