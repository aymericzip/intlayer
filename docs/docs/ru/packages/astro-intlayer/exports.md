---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета astro-intlayer
description: Интеграция Intlayer для Astro, предоставляющая настройку маршрутизации на основе локали и управление словарями.
keywords:
  - astro-intlayer
  - astro
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Пакет astro-intlayer

Пакет `astro-intlayer` предоставляет необходимые инструменты для интеграции Intlayer в приложения на Astro. Он настраивает маршрутизацию в зависимости от локали и управление словарями.

## Установка

```bash
npm install astro-intlayer
```

## Экспорты

### Интеграция

Пакет `astro-intlayer` предоставляет интеграцию для Astro, позволяющую настроить Intlayer в вашем проекте.

Импорт:

```tsx
import "astro-intlayer";
```

или добавив в `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| Функция    | Описание                                                            |
| ---------- | ------------------------------------------------------------------- |
| `intlayer` | Интеграция для Astro, которая настраивает Intlayer в вашем проекте. |
