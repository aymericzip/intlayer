---
createdAt: 2025-12-30
updatedAt: 2026-01-06
title: Listar Projetos Intlayer
description: Aprenda como listar todos os projetos Intlayer em um diretório ou repositório git.
keywords:
  - Listar
  - Projetos
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
---

# Listar Projetos Intlayer

```bash
npx intlayer projects list
```

Este comando procura e lista todos os projetos Intlayer ao encontrar diretórios que contenham ficheiros de configuração do Intlayer. É útil para descobrir todos os projetos Intlayer em um monorepo, workspace ou repositório git.

## Atalhos:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Argumentos:

- **`--base-dir [path]`**: Especifica o diretório base a partir do qual pesquisar. O padrão é o diretório de trabalho atual.

  > Exemplo: `npx intlayer projects list --base-dir /path/to/workspace`

  > Exemplo: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Pesquise a partir do diretório raiz do git em vez do diretório base. Isto é útil para encontrar todos os projetos Intlayer num monorepo ou repositório git.

  > Exemplo: `npx intlayer projects list --git-root`

- **`--json`**: Exibe os resultados como JSON em vez de texto formatado. Útil para scripts e acesso programático.

  > Exemplo: `npx intlayer projects list --json`

## Como funciona:

O comando procura ficheiros de configuração do Intlayer no diretório especificado (ou na raiz do git se `--git-root` for usado). Procura pelos seguintes padrões de ficheiro de configuração:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Cada diretório que contiver um destes ficheiros é considerado um projeto Intlayer e será listado na saída.

## Exemplos:

### Listar projetos no diretório atual:

```bash
npx intlayer projects list
```

### Listar projetos em um diretório específico:

```bash
npx intlayer projects list --base-dir ./packages
```

### Listar todos os projetos no repositório git:

```bash
npx intlayer projects list --git-root
```

### Usando o alias de atalho:

```bash
npx intlayer pl --git-root
```

### Saída como JSON:

```bash
npx intlayer projects list --json
```

## Exemplo de saída:

### Saída formatada:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### Saída JSON:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Casos de uso:

- **Gestão de monorepo**: Descobrir todos os projetos Intlayer numa estrutura monorepo
- **Descoberta de projetos**: Encontrar todos os projetos com Intlayer num workspace
- **CI/CD**: Verificar projetos Intlayer em workflows automatizados
- **Documentação**: Gerar documentação listando todos os projetos que usam Intlayer

A saída fornece caminhos absolutos para cada diretório de projeto, facilitando a navegação ou a automatização de operações em múltiplos projetos Intlayer.

- **Documentação**: Gerar documentação listando todos os projetos que usam o Intlayer

A saída fornece caminhos absolutos para cada diretório de projeto, tornando fácil navegar até eles ou escrever scripts para executar operações em vários projetos Intlayer.
