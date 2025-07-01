---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentação do Pacote | vite-intlayer
description: Veja como usar o pacote vite-intlayer
keywords:
  - Intlayer
  - vite-intlayer
  - Internacionalização
  - Documentação
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - vite-intlayer
---

# vite-intlayer: Pacote NPM para internacionalizar (i18n) uma aplicação Vite

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

**O pacote `vite-intlayer`** permite que você internacionalize sua aplicação Vite. Ele inclui o plugin Vite para configurar através de variáveis de ambiente no [empacotador Vite](https://vitejs.dev/guide/why.html#why-bundle-for-production). Também fornece um middleware para detectar o idioma preferido do usuário e redirecionar o usuário para a URL apropriada conforme especificado na [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Por que internacionalizar sua aplicação Vite?

Internacionalizar sua aplicação Vite é essencial para atender eficazmente a um público global. Isso permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade melhora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

## Configuração

O pacote `vite-intlayer` funciona perfeitamente com o pacote [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/index.md) e o pacote [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/index.md). Consulte a documentação relevante para mais informações.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install vite-intlayer
```

```bash packageManager="yarn"
yarn add vite-intlayer
```

```bash packageManager="pnpm"
pnpm add vite-intlayer
```

## Exemplo de uso

Veja um exemplo de como incluir os plugins na sua configuração do vite.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

> O plugin `intlayerPlugin()` para Vite é usado para integrar o Intlayer com o Vite. Ele garante a construção dos arquivos de declaração de conteúdo e os monitora no modo de desenvolvimento. Define as variáveis de ambiente do Intlayer dentro da aplicação Vite. Além disso, fornece aliases para otimizar o desempenho.

> O `intLayerMiddlewarePlugin()` adiciona roteamento do lado do servidor à sua aplicação. Este plugin detectará automaticamente o idioma atual com base na URL e definirá o cookie de idioma apropriado. Se nenhum idioma for especificado, o plugin determinará o idioma mais adequado com base nas preferências de idioma do navegador do usuário. Se nenhum idioma for detectado, ele redirecionará para o idioma padrão.

## Dominando a internacionalização da sua aplicação Vite

Intlayer oferece muitos recursos para ajudar você a internacionalizar sua aplicação Vite.

**Para saber mais sobre esses recursos, consulte o guia [Internacionalização React (i18n) com Intlayer e Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md) para Aplicação Vite e React.**

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
