---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Otrzymuję błąd "module not found" podczas używania bun
description: Napraw błąd podczas używania bun.
keywords:
  - bun
  - module not found
  - intlayer
  - konfiguracja
  - menedżer pakietów
slugs:
  - frequent-questions
  - bun-set-up
---

# Otrzymuję błąd "module not found" podczas używania bun

## Opis problemu

Podczas używania bun możesz napotkać błąd podobny do tego:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Przyczyna

Intlayer używa wewnętrznie `require`. Bun ogranicza funkcję require do rozwiązywania tylko pakietów `@intlayer/config`, zamiast całego projektu.

## Rozwiązanie

### Udostępnij funkcję `require` w konfiguracji

```ts
ts;
const config: IntlayerConfig = {
  build: {
    require, // udostępnij funkcję require w konfiguracji build
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // przekazanie funkcji require do konfiguracji next-intlayer
});

export default configuration;
```
