---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація пакету lynx-intlayer
description: Підтримка Intlayer для Lynx, що забезпечує поліфіли для підтримки локалі.
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Уніфікована документація для всіх експортів
---

# Пакет lynx-intlayer

Пакет `lynx-intlayer` надає необхідні інструменти для інтеграції Intlayer у застосунки Lynx.

## Встановлення

```bash
npm install lynx-intlayer
```

## Експорти

### Поліфіл

Імпорт:

```tsx
import "lynx-intlayer";
```

| Function           | Опис                                                                       |
| ------------------ | -------------------------------------------------------------------------- |
| `intlayerPolyfill` | Функція, яка застосовує необхідні polyfills у Lynx для підтримки Intlayer. |

### Плагін Rsbuild

Пакет `lynx-intlayer` надає Rsbuild-плагін для інтеграції Intlayer у процес збірки Lynx.

Імпорт:

```tsx
import "lynx-intlayer";
```

| Функція              | Опис                                                         |
| -------------------- | ------------------------------------------------------------ |
| `pluginIntlayerLynx` | Rsbuild-плагін, який інтегрує Intlayer у процес збірки Lynx. |
