---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Plugin intlayer para Vite | vite-intlayer
description: Veja como usar o plugin intlayer do package vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documento inicial
---

# Documentação do Plugin intlayer para Vite

O plugin Vite `intlayer` integra a configuração do Intlayer ao processo de build. Ele gerencia aliases de dicionários, inicia o watcher de dicionários em modo de desenvolvimento e prepara os dicionários para o build.

## Uso

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Descrição

O plugin realiza as seguintes tarefas:

1. **Preparar dicionários**: Compila os dicionários em arquivos otimizados no início do processo de build ou de desenvolvimento.
2. **Modo de observação (watch)**: Em modo de desenvolvimento, observa mudanças nos arquivos de dicionário e os recompila automaticamente.
3. **Aliases**: Fornece aliases para aceder aos dicionários na sua aplicação.
4. **Tree-shaking**: Suporta tree-shaking de traduções não utilizadas através do plugin `intlayerPrune`.
