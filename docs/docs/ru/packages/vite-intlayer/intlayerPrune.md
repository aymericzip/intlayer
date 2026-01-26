---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документация плагина intlayerPrune для Vite | vite-intlayer
description: Узнайте, как использовать плагин intlayerPrune для пакета vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Инициализация документации
---

# Документация плагина intlayerPrune для Vite

Плагин Vite `intlayerPrune` используется для tree-shake и удаления неиспользуемых словарей из бандла вашего приложения. Это помогает уменьшить итоговый размер бандла, включая только необходимое мультиязычное содержимое.

## Использование

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Описание

Плагин анализирует ваш исходный код, чтобы определить, какие ключи словарей действительно используются. Затем он удаляет любое неиспользуемое содержимое из собранных файлов словарей. Это особенно полезно для крупных проектов с множеством словарей, где в конкретных страницах или компонентах используется только их подмножество.
