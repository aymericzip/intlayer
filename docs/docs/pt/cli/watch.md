---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Monitorar Dicionários
description: Aprenda como monitorar alterações nos seus arquivos de declaração de conteúdo e construir dicionários automaticamente.
keywords:
  - Monitorar
  - Dicionários
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - watch
author: aymericzip
---

# Monitorar Dicionários

```bash packageManager="npm"
npx intlayer watch
```

```bash packageManager="yarn"
yarn intlayer watch
```

```bash packageManager="pnpm"
pnpm intlayer watch
```

```bash packageManager="bun"
bun x intlayer watch
```

Este comando irá monitorar alterações nos seus arquivos de declaração de conteúdo e construir os dicionários no diretório `.intlayer`.
Este comando é o equivalente a `npx intlayer build --watch --skip-prepare`.

## Apelidos:

- `npx intlayer dictionaries watch`
- `npx intlayer dictionary watch`
- `npx intlayer dic watch`

## Argumentos:

- **`--with`**: Inicia um comando em paralelo com o monitoramento.

  > Exemplo: `npx intlayer watch --with "next dev --turbopack"`

- **`--ci`**: Executa o comando em cada projeto Intlayer do monorepo (ou apenas no atual quando executado de dentro de um diretório de projeto). Credenciais por projeto podem ser injetadas via `INTLAYER_PROJECT_CREDENTIALS`, um objeto JSON que associa cada caminho de projeto a `{ "clientId", "clientSecret" }`.

  > Exemplo: `npx intlayer watch --ci`
