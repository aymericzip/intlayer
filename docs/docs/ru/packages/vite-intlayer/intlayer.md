---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация плагина intlayer для Vite | vite-intlayer
description: Узнайте, как использовать плагин intlayer для пакета vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Инициализация документации
---

# Документация плагина intlayer для Vite

Плагин Vite `intlayer` интегрирует конфигурацию Intlayer в процесс сборки. Он управляет алиасами словарей, запускает наблюдатель за словарями в режиме разработки и подготавливает словари для сборки.

## Использование

```ts
// файл vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Описание

Плагин выполняет следующие задачи:

1. **Подготовка словарей**: Компилирует словари в оптимизированные файлы в начале процесса сборки или dev.
2. **Режим слежения**: В режиме разработки следит за изменениями в файлах словарей и автоматически перекомпилирует их.
3. **Алиасы**: Предоставляет алиасы для доступа к словарям в вашем приложении.
4. **Tree-shaking**: Поддерживает tree-shaking неиспользуемых переводов через плагин `intlayerPrune`.
