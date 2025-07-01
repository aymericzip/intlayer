---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Plugin Webpack para Intlayer i18n
description: Pacote NPM que fornece configuração e plugin Webpack para integração perfeita da internacionalização Intlayer com aplicações baseadas em Webpack.
keywords:
  - intlayer
  - webpack
  - plugin
  - configuração
  - i18n
  - JavaScript
  - NPM
  - bundler
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack: Pacote NPM para usar o Plugin Webpack do Intlayer na sua aplicação

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`@intlayer/webpack`** é usado para fornecer uma configuração Webpack que facilita o trabalho com uma aplicação baseada em Webpack utilizando Intlayer. O pacote também fornece um plugin para ser adicionado em uma aplicação Webpack existente.

## Uso

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // Opções
    }),
  ],
};
```

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
yarn add @intlayer/webpack
```

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
