---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Construir Dicionários
description: Aprenda como construir seus dicionários Intlayer a partir de arquivos de declaração de conteúdo.
keywords:
  - Construir
  - Dicionários
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - build
history:
  - version: 9.5.2
    date: 2026-09-12
    changes: "Adicionar o flag `--ci`"
  - version: 8.1.5
    date: 2026-02-23
    changes: "Adicionar opção checkTypes"
author: aymericzip
---

# Construir Dicionários

Para construir seus dicionários, você pode executar os comandos:

```bash packageManager="npm"
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

```bash packageManager="bun"
bun x intlayer build
```

ou no modo watch

```bash packageManager="npm"
npx intlayer build --watch
```

```bash packageManager="yarn"
yarn intlayer build --watch
```

```bash packageManager="pnpm"
pnpm intlayer build --watch
```

```bash packageManager="bun"
bun x intlayer build --watch
```

Este comando irá localizar seus arquivos de declaração de conteúdo por padrão em `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. E construir os dicionários no diretório `.intlayer`.

## Apelidos:

- `npx intlayer dictionaries build`
- `npx intlayer dictionary build`
- `npx intlayer dic build`

## Argumentos:

- **`--base-dir`**: Especifica o diretório base para o projeto. Para recuperar a configuração do intlayer, o comando irá procurar pelo arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

  > Exemplo: `npx intlayer build --base-dir ./src`

- **`--env`**: Especifica o ambiente (por exemplo, `development`, `production`). Útil no caso de você usar variáveis de ambiente no seu arquivo de configuração do intlayer.

  > Exemplo: `npx intlayer build --env production`

- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar variáveis. Útil no caso de você usar variáveis de ambiente no seu arquivo de configuração do intlayer.

  > Exemplo: `npx intlayer build --env-file .env.production.local`

- **`--with`**: Inicia um comando em paralelo com a build.

  > Exemplo: `npx intlayer build --with "next dev --turbopack"`

- **`--skip-prepare`**: Pula a etapa de prepare.

  > Exemplo: `npx intlayer build --skip-prepare`

- **`--no-cache`**: Desativa o cache.

  > Exemplo: `npx intlayer build --no-cache`

- **`--ci`**: Executa o comando em cada projeto Intlayer do monorepo (ou apenas no atual quando executado de dentro de um diretório de projeto). Credenciais por projeto podem ser injetadas via `INTLAYER_PROJECT_CREDENTIALS`, um objeto JSON que associa cada caminho de projeto a `{ "clientId", "clientSecret" }`.

  > Exemplo: `npx intlayer build --ci`

- **`--check-types`**: Verifica os tipos dos arquivos de declaração de conteúdo.

  > Exemplo: `npx intlayer build --check-types`
