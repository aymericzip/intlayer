---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote vite-intlayer
description: Plugin Vite para o Intlayer, fornecendo aliases de dicionário e watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# pacote vite-intlayer

O pacote `vite-intlayer` fornece um plugin Vite para integrar o Intlayer à sua aplicação baseada em Vite.

## Instalação

```bash
npm install vite-intlayer
```

## Exportações

### Plugin

Importação:

```tsx
import "vite-intlayer";
```

| Função               | Descrição                                                                           | Documento Relacionado                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | Plugin principal do Vite que integra o Intlayer ao processo de build.               | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**Obsoleto**) Alias para `intlayer`.                                               | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | Plugin middleware de desenvolvimento para tratar a detecção de locale e roteamento. | -                                                                                                                      |
| `intlayerMiddleware` | (**Obsoleto**) Alias para `intlayerProxy`.                                          | -                                                                                                                      |
| `intlayerPrune`      | Plugin para tree-shake e remover dicionários não utilizados durante o build.        | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerPrune.md) |
