---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с Svelte I18n на Intlayer"
description: "Узнайте, как перенести ваше приложение Svelte с svelte-i18n на Intlayer, используя адаптер совместимости."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Миграция с Svelte I18n на Intlayer

Переместить ваше приложение Svelte с `svelte-i18n` на Intlayer занимает всего минуту, используя адаптер совместимости.

## Что делать

Просто запустите команду инициализации в вашем проекте:

```bash
npx intlayer init
```

Это генерирует `intlayer.config.ts`. Убедитесь, что ваши плагины SvelteKit / Vite обернуты плагином alias Intlayer для бесшовного сопоставления `svelte-i18n` с `@intlayer/svelte-i18n`.

## Что происходит под капотом

Svelte-i18n полагается на интенсивно используемые хранилища (`$_`, `$t`, `$format` и т. д.) и ICU MessageFormat.

Под капотом:

- **Хранилища:** Intlayer проксирует хранилища `svelte-i18n`. `$_` становится производным хранилищем текущей локали, возвращающей resolver Intlayer.
- **Ключи:** Ваши плоские ключи (например, `$_('home.title')`) оцениваются таким образом, что первый сегмент пути представляет словарь Intlayer.
- **Синтаксис ICU:** Полностью обрабатывается общим resolver ICU (парсинг, эквивалентный `intl-messageformat`).
- **Форматеры:** Вызовы `$date`, `$time`, `$number` безопасно перенаправляются на встроенные форматеры Intlayer core.
- **Анализ Babel/SWC:** Анализатор Intlayer читает вызовы хранилища Svelte (`$_`) внутри ваших исходных файлов `.svelte` перед компиляцией, чтобы автоматически построить релевантные куски словаря.
