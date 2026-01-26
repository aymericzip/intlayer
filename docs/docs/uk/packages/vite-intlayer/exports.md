---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакета vite-intlayer
description: Плагін Vite для Intlayer, що надає псевдоніми словників та спостерігачі.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Уніфікована документація для всіх експортів
---

# Пакет vite-intlayer

Пакет `vite-intlayer` надає плагін Vite для інтеграції Intlayer у ваш додаток на базі Vite.

## Встановлення

```bash
npm install vite-intlayer
```

## Експорти

### Плагін

Імпорт:

```tsx
import "vite-intlayer";
```

| Функція              | Опис                                                                            | Пов'язаний документ                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Основний плагін Vite, який інтегрує Intlayer у процес збірки.                   | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Застарілий**) Аліас для `intlayer`.                                          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Плагін middleware для розробки, що обробляє визначення локалі та маршрутизацію. | -                                                                                                                      |
| `intlayerMiddleware` | (**Застарілий**) Аліас для `intlayerProxy`.                                     | -                                                                                                                      |
| `intlayerPrune`      | Плагін для tree-shake та видалення невикористаних словників під час збірки.     | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/intlayerPrune.md) |
