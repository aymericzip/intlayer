---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета vite-intlayer
description: Плагин Vite для Intlayer, обеспечивающий псевдонимы словарей и наблюдатели.
keywords:
  - vite-intlayer
  - vite
  - плагин
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Унифицированная документация для всех экспортов
---

# Пакет vite-intlayer

Пакет `vite-intlayer` предоставляет плагин для Vite, который интегрирует Intlayer в ваше приложение на основе Vite.

## Установка

```bash
npm install vite-intlayer
```

## Экспорты

### Плагин

Импорт:

```tsx
import "vite-intlayer";
```

| Функция              | Описание                                                                            | Связанная документация                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Основной плагин Vite, который интегрирует Intlayer в процесс сборки.                | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Устаревший**) Псевдоним для `intlayer`.                                          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Плагин middleware для разработки, отвечающий за определение локали и маршрутизацию. | -                                                                                                                      |
| `intlayerMiddleware` | (**Устаревший**) Псевдоним для `intlayerProxy`.                                     | -                                                                                                                      |
| `intlayerPrune`      | Плагин для tree-shaking и удаления неиспользуемых словарей во время сборки.         | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/vite-intlayer/intlayerPrune.md) |
