---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Recebo erro de módulo não encontrado ao usar bun
description: Corrigir erro ao usar bun.
keywords:
  - bun
  - módulo não encontrado
  - intlayer
  - configuração
  - gerenciador de pacotes
slugs:
  - doc
  - faq
  - bun-set-up
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
