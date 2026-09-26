---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Документация интеграции intlayer | astro-intlayer
description: Узнайте, как настроить и использовать интеграцию Astro intlayer в astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - интеграция
  - i18n
  - интернационализация
  - документация
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Обновлена документация интеграции с подробностями о middleware и хуках"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Начальная документация"
author: aymericzip
---

# Документация интеграции Astro intlayer

Интеграция `intlayer` для Astro настраивает ваш проект для многоязычной интернационализации (i18n). Она управляет подготовкой словарей во время сборки, внедрением плагинов Vite, автоматической регистрацией middleware для запросов и генерацией локализованных предрендеренных страниц.

## Использование

Добавьте `intlayer()` в ваш `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Кодмод Astro CLI (`astro add astro-intlayer`) также генерирует поддерживаемый импорт по умолчанию:

```ts
import intlayer from "astro-intlayer";
```

## Описание

Интеграция встраивается в жизненный цикл сборки и выполнения Astro:

1. **Настройка конфигурации (`astro:config:setup`)**:
   - **Подготовка словарей**: Подготавливает словари Intlayer и сгенерированные типы до запуска сборки.
   - **Плагины Vite**: Внедряет плагины для алиасов Vite (обеспечивая беспрепятственный импорт словарей), прокси маршрутизации локалей и очистки сборки.
   - **Регистрация Middleware**: Автоматически внедряет `astro-intlayer/middleware` в цепочку промежуточного ПО вашего проекта, заполняя `Astro.locals.intlayer` для каждого входящего запроса.
2. **Завершение сборки (`astro:build:done`)**:
   - **Перезапись страниц**: Анализирует правила перезаписи локализованных URL-адресов и выводит предрендеренные HTML-страницы по соответствующим локализованным путям.

## Что предоставляется «из коробки»

После настройки ваше приложение Astro может сразу использовать:

- Хуки `useIntlayer`, `useDictionary` и `useLocale` внутри frontmatter компонентов `.astro`.
- Объект `Astro.locals.intlayer` в эндпоинтах и страницах Astro.
- Клиентские импорты в блоках `<script>`, повторяющие тот же API с реактивными обновлениями.
- Встроенные форматтеры в `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency` и т. д.).

## Связанная документация

- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useLocale.md)
- [Промежуточное ПО `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/onRequest.md)
