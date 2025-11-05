---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Я получаю ошибку "module not found" при использовании bun
description: Исправление ошибки при использовании bun.
keywords:
  - bun
  - module not found
  - intlayer
  - конфигурация
  - менеджер пакетов
slugs:
  - frequent-questions
  - bun-set-up
---

# Я получаю ошибку "module not found" при использовании bun

## Описание проблемы

При использовании bun вы можете столкнуться с ошибкой следующего вида:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Причина

Intlayer использует `require` внутренне. А bun ограничивает функцию require так, что она разрешает только пакеты из пакета `@intlayer/config`, вместо всего проекта.

## Решение

### Предоставьте функцию `require` в конфигурации

```ts
ts;
const config: IntlayerConfig = {
  build: {
    require, // предоставляем функцию require в конфигурации
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // передаем функцию require в конфигурацию next-intlayer
});

export default configuration;
```
