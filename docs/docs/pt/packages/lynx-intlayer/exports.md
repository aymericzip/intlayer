---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote lynx-intlayer
description: Suporte do Lynx para o Intlayer, fornecendo polyfills para suporte a locale.
keywords:
  - lynx-intlayer
  - lynx
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exports
---

# Pacote lynx-intlayer

O pacote `lynx-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Lynx.

## Instalação

```bash
npm install lynx-intlayer
```

## Exportações

### Polyfill

Importação:

```tsx
import "lynx-intlayer";
```

| Função             | Descrição                                                                      |
| ------------------ | ------------------------------------------------------------------------------ |
| `intlayerPolyfill` | Função que aplica os polyfills necessários para que o Lynx suporte o Intlayer. |

### Plugin Rsbuild

O pacote `lynx-intlayer` fornece um plugin Rsbuild para integrar o Intlayer no processo de build do Lynx.

Importação:

```tsx
import "lynx-intlayer";
```

| Função               | Descrição                                                           |
| -------------------- | ------------------------------------------------------------------- |
| `pluginIntlayerLynx` | Plugin Rsbuild que integra o Intlayer no processo de build do Lynx. |
