---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Construir Dicionários

Para construir seus dicionários, você pode executar os comandos:

```bash
npx intlayer build
```

ou no modo watch

```bash
npx intlayer build --watch
```

Este comando irá localizar seus arquivos de declaração de conteúdo por padrão em `./src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx}`. E construir os dicionários no diretório `.intlayer`.

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
