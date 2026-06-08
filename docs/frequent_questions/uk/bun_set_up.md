---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Отримую помилку module not found при використанні bun
description: Виправлення помилки при використанні bun.
keywords:
  - bun
  - модуль не знайдено
  - intlayer
  - конфігурація
  - пакетний менеджер
slugs:
  - frequent-questions
  - bun-set-up
---

# Отримую помилку 'module not found' при використанні bun

## Опис проблеми

При використанні bun ви можете зіткнутися з помилкою на кшталт цієї:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Причина

Intlayer використовує `require` внутрішньо. А bun обмежує область дії функції `require`, через що вона резолвить лише пакети пакета `@intlayer/config`, а не весь проєкт.

## Рішення

### Надайте функцію `require` у конфігурації

```ts
const config: IntlayerConfig = {
  build: {
    require,
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require,
});

export default configuration;
```
