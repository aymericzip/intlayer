# intlayer-cli: Pacote NPM para usar o Intlayer CLI

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`intlayer-cli`** é um pacote NPM que consome o pacote `@intlayer/cli` e o disponibiliza para as interfaces de linha de comando `intlayer`.

> Observe que este pacote não é necessário se o pacote [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/pt/packages/intlayer/index.md) estiver instalado. Em comparação com o pacote `intlayer`, o pacote `intlayer-cli` é um pacote mais leve que contém apenas a ferramenta CLI, sem dependências de `@intlayer/core`.

## Instalação

Instale o pacote necessário usando o gerenciador de pacotes de sua preferência:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Uso

Aqui está um exemplo de como usar o pacote `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## Comandos CLI

O Intlayer fornece uma ferramenta CLI para:

- auditar suas declarações de conteúdo e completar traduções ausentes
- construir dicionários a partir de suas declarações de conteúdo
- enviar e receber dicionários distantes do seu CMS para o seu projeto local

Consulte [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md) para mais informações.
