---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация хука useIntlayer | astro-intlayer
description: Узнайте, как использовать хук useIntlayer в компонентах Astro и клиентских скриптах для доступа к локализованному контенту.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация"
author: aymericzip
---

# Документация хука useIntlayer

Хук `useIntlayer` позволяет получать локализованный контент словаря по ключу в приложениях Astro.

Его можно вызывать в двух различных контекстах, используя один и тот же путь импорта:

1. **Сервер / Frontmatter**: Внутри файлов `.astro` он автоматически разрешает контент, используя локаль запроса, сохраненную в `Astro.locals.intlayer`.
2. **Браузер / Клиентский тег `<script>`**: Внутри клиентских скриптов или компонентов UI-фреймворков он перенаправляется на реализацию клиентского хранилища (`vanilla-intlayer`).

## Использование

### Во frontmatter компонентов Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### В блоках `<script>` на клиенте

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Параметры

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Уникальный ключ словаря (определенный в файлах `.content.ts`).
2. **`localeOrSelector`** (необязательно): Конкретная локаль или объект селектора (`{ item }`, `{ variant }`, при необходимости с `locale`). Если указан, переопределяет локаль, определенную из контекста запроса или клиентского хранилища.

## Описание

Хук выполняет следующие задачи:

1. **Разрешение локали**:
   - На сервере считывает активную локаль из `Astro.locals.intlayer` через область `AsyncLocalStorage`, инициализированную `astro-intlayer/middleware`.
   - В браузере считывает активную локаль из клиентского хранилища/стора.
2. **Получение словаря**: Извлекает содержимое словаря, соответствующее указанному ключу.
3. **Обработка перевода**: Обрабатывает переводы (`t()`), перечисления, условия и markdown в готовый к рендерингу контент.

## Связанная документация

- [Интеграция `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/intlayer.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useDictionary.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useLocale.md)
