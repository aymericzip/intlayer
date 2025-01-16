# intlayer-cli: Pacote NPM para usar a CLI do Intlayer

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O **`intlayer-cli`** é um pacote NPM que consome o pacote `@intlayer/cli` e o torna disponível para as interfaces de linha de comando do `intlayer`.

> Observe que este pacote não é necessário se o pacote [`intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/pt/packages/intlayer/index.md) estiver instalado. Em comparação com o pacote `intlayer`, o pacote `intlayer-cli` é um pacote mais leve que contém apenas a ferramenta CLI, sem as dependências de `@intlayer/core`.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## Uso

Aqui está um exemplo de como usar o pacote `intlayer-cli`:

```bash
npx intlayer build
```

## Comandos CLI

Intlayer fornece uma ferramenta CLI para:

- auditar suas declarações de conteúdo e completar traduções ausentes
- construir dicionários a partir de suas declarações de conteúdo
- enviar e receber dicionários remotos do seu CMS para o seu projeto local

Consulte [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md) para mais informações.
