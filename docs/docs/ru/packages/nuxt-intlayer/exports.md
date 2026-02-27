---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета nuxt-intlayer
description: Интеграция Intlayer в Nuxt, предоставляющая модуль для приложений Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Пакет nuxt-intlayer

Пакет `nuxt-intlayer` предоставляет модуль Nuxt для интеграции Intlayer в ваш Nuxt-проект.

## Установка

```bash
npm install nuxt-intlayer
```

## Экспорты

### Модуль

Пакет `nuxt-intlayer` предоставляет модуль Nuxt для интеграции Intlayer в ваш Nuxt-проект.

Импорт:

```tsx
import "nuxt-intlayer";
```

или добавление в `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Экспорт   | Тип          | Описание                                                         |
| --------- | ------------ | ---------------------------------------------------------------- |
| `default` | `NuxtModule` | Экспорт по умолчанию, модуль Nuxt, который настраивает Intlayer. |
