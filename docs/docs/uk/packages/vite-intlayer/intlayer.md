---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація Vite-плагіна intlayer | vite-intlayer
description: Дізнайтеся, як використовувати плагін intlayer для пакета vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - інтернаціоналізація
  - документація
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ініціалізація документації
---

# Документація Vite-плагіна intlayer

Vite-плагін `intlayer` інтегрує конфігурацію Intlayer у процес збірки. Він обробляє псевдоніми словників, запускає стеження за файлами словників у режимі розробки та готує словники для збірки.

## Використання

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Опис

Плагін виконує такі завдання:

1. **Підготовка словників**: Він компілює словники в оптимізовані файли на початку процесу збірки або під час режиму розробки.
2. **Режим спостереження**: У режимі розробки він стежить за змінами у файлах словників і автоматично їх перекомпілює.
3. **Аліаси**: він надає аліаси для доступу до словників у вашому застосунку.
4. **Tree-shaking**: він підтримує tree-shaking невикористаних перекладів через плагін `intlayerPrune`.
