# @intlayer/chokidar: Pacote NPM para Escanear e construir arquivos de declaração Intlayer em dicionários

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`@intlayer/chokidar`** é usado para escanear e construir arquivos de declaração Intlayer em dicionários usando [chokidar](https://github.com/paulmillr/chokidar) e de acordo com a [configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Uso

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Constrói os dicionários do Intlayer

watch({ persistent: true }); // Observa mudanças nos arquivos de configuração
```

## Instalação

Instale o pacote necessário usando o gerenciador de pacotes de sua preferência:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
