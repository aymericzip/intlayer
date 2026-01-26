---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация пакета lynx-intlayer
description: Поддержка Intlayer в Lynx, предоставляющая полифилы для поддержки локалей.
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
    changes: Унифицированная документация для всех экспортов
---

# Пакет lynx-intlayer

Пакет `lynx-intlayer` предоставляет необходимые инструменты для интеграции Intlayer в приложения Lynx.

## Установка

```bash
npm install lynx-intlayer
```

## Экспорты

### Полифилл

Импорт:

```tsx
import "lynx-intlayer";
```

| Function           | Описание                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| `intlayerPolyfill` | Функция, применяющая необходимые полифилы для поддержки Intlayer в Lynx. |

### Плагин Rsbuild

Пакет `lynx-intlayer` предоставляет плагин Rsbuild для интеграции Intlayer в процесс сборки Lynx.

Import:

```tsx
import "lynx-intlayer";
```

| Функция              | Описание                                                      |
| -------------------- | ------------------------------------------------------------- |
| `pluginIntlayerLynx` | Плагин Rsbuild, интегрирующий Intlayer в процесс сборки Lynx. |
