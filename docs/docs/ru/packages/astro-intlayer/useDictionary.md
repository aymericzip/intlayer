---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документация хука useDictionary | astro-intlayer
description: Узнайте, как использовать хук useDictionary в компонентах и скриптах Astro для разрешения объектов словарей.
keywords:
  - useDictionary
  - dictionary
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - интернационализация
  - документация
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация"
author: aymericzip
---

# Документация хука useDictionary

Хук `useDictionary` разрешает импортированный или встроенный объект словаря и возвращает его содержимое для текущей локали в приложениях Astro.

В отличие от `useIntlayer`, который получает словари по ключу из глобального реестра словарей, `useDictionary` работает непосредственно с объектом словаря.

## Использование

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Вы также можете передавать встроенные словари, определенные с помощью функции `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
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
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Параметры

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Объект словаря или квалифицированная группа словарей.
2. **`localeOrSelector`** (необязательно): Конкретная локаль или объект селектора (`{ item }`, `{ variant }`, при необходимости с `locale`).

## Описание

Хук выполняет следующие задачи:

1. **Определение локали**: На сервере получает локаль из `Astro.locals.intlayer`. В браузере использует локаль клиентского хранилища.
2. **Обработка контента**: Разрешает переводы (`t()`), перечисления, условия и вложенные структуры в соответствии с разрешенной локалью.
3. **Селекторы**: Применяет любые селекторы элементов или вариантов, переданные в аргументах.

## Связанная документация

- [Интеграция `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useLocale.md)
