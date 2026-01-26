---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do plugin intlayerPrune para Vite | vite-intlayer
description: Veja como usar o plugin intlayerPrune do pacote vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Doc inicial
---

# Documentação do plugin intlayerPrune para Vite

O plugin Vite `intlayerPrune` é usado para realizar tree-shaking e podar dicionários não utilizados do bundle da sua aplicação. Isso ajuda a reduzir o tamanho final do bundle incluindo apenas o conteúdo multilíngue necessário.

## Uso

```ts
// vite.config.ts
import { defineConfig } from "vite";
ts;
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## Descrição

O plugin analisa o seu código-fonte para identificar quais chaves de dicionário são realmente utilizadas. Em seguida, remove qualquer conteúdo não utilizado dos arquivos de dicionário empacotados. Isto é particularmente útil em projetos grandes com muitos dicionários, onde apenas um subconjunto é usado em páginas ou componentes específicos.
