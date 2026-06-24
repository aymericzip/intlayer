---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с NuxtJS I18n на Intlayer"
description: "Узнайте, как перенести ваше приложение Nuxt.js с @nuxtjs/i18n на Intlayer, используя адаптер совместимости."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Миграция с NuxtJS I18n на Intlayer

Миграция вашего приложения Nuxt с `@nuxtjs/i18n` на Intlayer - это бесшовный процесс с использованием модуля Nuxt adapter.

## Что делать

Чтобы инициализировать проект, запустите:

```bash
npx intlayer init
```

Это установит `intlayer.config.ts`. Затем добавьте модуль Intlayer Nuxt (например, `@intlayer/nuxt-i18n`) в массив модулей вашего `nuxt.config.ts`. Это автоматически применяет конфигурацию совместимости для вашего приложения.

## Что происходит под капотом

`@nuxtjs/i18n` оборачивает `vue-i18n` при этом предоставляя composables, специфичные для Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Под капотом:

- **Переводы:** Изначально полагается на слой совместимости `@intlayer/vue-i18n` для всех задач перевода строк (полностью поддерживая форматы `vue-i18n`, плюральные трубы и реактивность).
- **Маршрутизация:** Отражает composables маршрутизации, используя помощников локализованного URL Intlayer.
- **Конфигурация:** Читает `availableLocales` и параметры по умолчанию прямо из вашего `intlayer.config.ts` для автоматической координации страниц Nuxt.
