---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Миграция с React Intl на Intlayer"
description: "Узнайте, как перенести ваше приложение React с react-intl на Intlayer, используя адаптер совместимости."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - миграция
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Инициализация истории"
author: aymericzip
---

# Миграция с React Intl на Intlayer

Если ваше приложение React использует `react-intl` (FormatJS), переход на Intlayer - это удача. Наш слой совместимости безпроблемно обрабатывает ICU MessageFormat и все существующие компоненты `Formatted*`.

## Что делать

Начните с запуска команды инициализации в вашем проекте:

```bash
npx intlayer init
```

Затем установите плагин Intlayer Vite или Next.js в вашу конфигурацию. Этот плагин впрыскивает псевдонимы времени сборки для перенаправления импортов `react-intl` на `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Что происходит под капотом

Плагин bundler создает псевдоним `react-intl` на `@intlayer/react-intl`. Вместо того, чтобы вручную парсить большие JSON файлы и оборачивать ваше приложение в `IntlProvider`, плагин Intlayer статически извлекает ключи и использует словари Intlayer во время выполнения.

Под капотом:

- **ICU MessageFormat:** Intlayer использует resolver `resolveMessage(..., 'icu')`, который полностью поддерживает множественное число ICU, выбор, форматирование дат/чисел и теги rich text изначально.
- **Вызовы методов и JSX:** `intl.formatMessage({ id: 'a.b' })` и `<FormattedMessage id="a.b">` идентифицируются плагинами компилятора Intlayer (`@intlayer/babel` / `@intlayer/swc`), преобразуя плоские точечные ключи, чтобы первый сегмент правильно разрешал на ключ словаря Intlayer.
- **Форматеры:** `<FormattedNumber>`, `<FormattedDate>` и т. д. переходят в встроенные `core/formatters`, используя `Intl`.
