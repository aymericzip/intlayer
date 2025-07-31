---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - Ferramenta de Linha de Comando para Internacionalização
description: Pacote de interface de linha de comando para Intlayer fornecendo ferramentas para gerenciar traduções, construir dicionários e automatizar fluxos de trabalho de internacionalização.
keywords:
  - intlayer
  - CLI
  - linha de comando
  - internacionalização
  - i18n
  - ferramentas
  - NPM
  - automação
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: Pacote NPM para usar o Intlayer CLI

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`intlayer-cli`** é um pacote NPM que consome o pacote `@intlayer/cli` e o torna disponível para as interfaces de linha de comando `intlayer`.

> Note que este pacote não é necessário se o pacote [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/pt/packages/intlayer/index.md) estiver instalado. Em comparação com o pacote `intlayer`, o pacote `intlayer-cli` é um pacote mais leve que contém apenas a ferramenta CLI, sem dependências do `@intlayer/core`.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

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

- auditar suas declarações de conteúdo e completar traduções faltantes
- construir dicionários a partir de suas declarações de conteúdo
- enviar e puxar dicionários remotos do seu CMS para seu projeto local

Consulte [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md) para mais informações.

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
