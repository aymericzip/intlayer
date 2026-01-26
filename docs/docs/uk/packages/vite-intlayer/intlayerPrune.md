---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація плагіна intlayerPrune для Vite | vite-intlayer
description: Дізнайтеся, як використовувати плагін intlayerPrune для пакета vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - плагін
  - tree-shaking
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Документація плагіна intlayerPrune для Vite

Плагін Vite `intlayerPrune` використовується для виконання tree-shaking та видалення невикористаних словників з бандла вашого застосунку. Це допомагає зменшити фінальний розмір бандла, включаючи лише необхідний багатомовний вміст.

## Використання

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Опис

Плагін аналізує ваш вихідний код, щоб визначити, які ключі словників фактично використовуються. Після цього він видаляє будь-який невикористаний вміст із bundled файлів словників. Це особливо корисно для великих проєктів з багатьма словниками, де лише підмножина використовується на певних сторінках або в компонентах.
