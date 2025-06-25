---
docName: package__lynx-intlayer
url: /doc/packages/lynx-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/lynx-intlayer/index.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Documentação do pacote | lynx-intlayer
description: Veja como usar o pacote lynx-intlayer
keywords:
  - Intlayer
  - lynx-intlayer
  - internacionalização
  - documentação
  - Next.js
  - JavaScript
  - React
---

**Intlayer** é um conjunto de pacotes projetado especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

**O pacote `lynx-intlayer`** permite que você internacionalize sua aplicação Vite. Ele inclui o plugin Metro para configurar através de variáveis de ambiente no [Lynx bundler](https://lynxjs.org/index.html).

## Por que Internacionalizar Sua Aplicação Lynx?

Internacionalizar sua aplicação Lynx é essencial para atender efetivamente a um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

## Configuração

O pacote `lynx-intlayer` funciona perfeitamente com o [pacote `react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/react-intlayer/index.md) e o [pacote `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md). Consulte a documentação relevante para mais informações.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install lynx-intlayer
```

```bash packageManager="yarn"
yarn add lynx-intlayer
```

```bash packageManager="pnpm"
pnpm add lynx-intlayer
```

## Exemplo de uso

Veja um exemplo de como incluir os plugins na configuração do seu Vite.

```ts
// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginIntlayerLynx } from "lynx-intlayer/plugin";

export default defineConfig({
  plugins: [
    // ... outros plugins
    pluginIntlayerLynx(),
  ],
});
```

## Dominando a internacionalização da sua aplicação Vite

O Intlayer oferece muitos recursos para ajudá-lo a internacionalizar sua aplicação Vite.

**Para saber mais sobre esses recursos, consulte o guia [Internacionalização (i18n) com Intlayer e Lynx no React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_lynx+react.md) para Aplicações Lynx.**

## Leia sobre o Intlayer

- [Site do Intlayer](https://intlayer.org)
- [Documentação do Intlayer](https://intlayer.org/doc)
- [GitHub do Intlayer](https://github.com/aymericzip/intlayer)

- [Faça suas perguntas à nossa documentação inteligente](https://intlayer.org/docchat)
