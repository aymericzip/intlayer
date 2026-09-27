---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: Recebo erro de módulo não encontrado ao usar bun
description: "Corrija o erro «Cannot find package» ao usar o Intlayer com Bun, causado pela forma como o Bun limita o require(), com a configuração que resolve."
keywords:
  - bun
  - módulo não encontrado
  - intlayer
  - configuração
  - gerenciador de pacotes
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
---

# Recebo erro de módulo não encontrado ao usar bun

## Descrição do Problema

Ao usar bun, você pode encontrar um erro como este:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Motivo

O Intlayer usa `require` internamente. E o bun limita a função require para resolver apenas os pacotes do pacote `@intlayer/config`, em vez de todo o projeto.

## Solução

### Forneça a função `require` na configuração

```ts
ts;
const config: IntlayerConfig = {
  build: {
    require, // forneça a função require para o build
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // forneça a função require para a configuração do Next.js com Intlayer
});

export default configuration;
```
