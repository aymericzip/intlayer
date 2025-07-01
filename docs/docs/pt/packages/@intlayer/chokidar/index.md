---
docName: package__@intlayer_chokidar
url: https://intlayer.org/doc/package/@intlayer_chokidar
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/@intlayer/chokidar/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Monitoramento de Arquivos para i18n do Intlayer
description: Pacote NPM que fornece capacidades de monitoramento de arquivos para o Intlayer, permitindo atualizações automáticas e recarga a quente para conteúdo de internacionalização.
keywords:
  - intlayer
  - chokidar
  - monitoramento de arquivos
  - recarga a quente
  - i18n
  - JavaScript
  - NPM
  - desenvolvimento
---

# @intlayer/chokidar: Pacote NPM para Escanear e Construir Arquivos de Declaração do Intlayer em Dicionários

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`@intlayer/chokidar`** é usado para escanear e construir arquivos de declaração do Intlayer em dicionários utilizando [chokidar](https://github.com/paulmillr/chokidar) e de acordo com a [configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Uso

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Construir dicionários do Intlayer

watch({ persistent: true }); // Monitorar alterações nos arquivos de configuração
```

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
