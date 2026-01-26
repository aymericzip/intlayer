---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета nuxt-intlayer
description: Інтеграція Intlayer для Nuxt, що забезпечує модуль для Nuxt-застосунків.
keywords:
  - nuxt-intlayer
  - nuxt
  - internationalization
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

Пакет `nuxt-intlayer` надає модуль Nuxt для інтеграції Intlayer у ваш Nuxt-проєкт.

## Встановлення

```bash
npm install nuxt-intlayer
```

## Експорти

### Модуль

Пакет `nuxt-intlayer` надає модуль Nuxt для інтеграції Intlayer у ваш Nuxt-проєкт.

Import:

```tsx
import "nuxt-intlayer";
```

or adding to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Експорт   | Тип          | Опис                                                                 |
| --------- | ------------ | -------------------------------------------------------------------- |
| `default` | `NuxtModule` | Експорт за замовчуванням — це Nuxt-модуль, який налаштовує Intlayer. |
