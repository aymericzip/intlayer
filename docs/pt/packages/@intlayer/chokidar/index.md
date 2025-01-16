# @intlayer/chokidar: Pacote NPM para Escanear e construir arquivos de declaração Intlayer em dicionários

**Intlayer** é uma suíte de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O **`@intlayer/chokidar`** pacote é usado para escanear e construir arquivos de declaração Intlayer em dicionários usando [chokidar](https://github.com/paulmillr/chokidar) e de acordo com a [configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).

## Uso

```ts
import { watch } from "@intlayer/chokidar";

watch(); // Construir dicionários Intlayer

// Ou

watch({ persistent: true }); // Modo de observação
```

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```
