---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: Listar Arquivos de Declaração de Conteúdo
description: Aprenda como listar todos os arquivos de declaração de conteúdo no seu projeto.
keywords:
  - Listar
  - Declaração de Conteúdo
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - list
history:
  - version: 7.5.11
    date: 2026-01-06
    changes: Adicionar opção de saída JSON ao comando list
---

# Listar arquivos de declaração de conteúdo

```bash
npx intlayer content list
```

## Apelidos:

- `npx intlayer list`

Este comando exibe todos os arquivos de declaração de conteúdo no seu projeto, mostrando suas chaves de dicionário e caminhos dos arquivos. É útil para obter uma visão geral de todos os seus arquivos de conteúdo e verificar se eles estão sendo corretamente descobertos pelo Intlayer.

## Argumentos:

- **`--json`**: Exibe os resultados como JSON em vez de texto formatado. Útil para scripts e acesso programático.

  > Exemplo: `npx intlayer content list --json`

## Exemplos:

### Listar arquivos de declaração de conteúdo:

```bash
npx intlayer content list
```

### Saída como JSON:

```bash
npx intlayer content list --json
```

## Exemplo de saída:

### Saída formatada:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total de arquivos de declaração de conteúdo: 3
```

### Saída JSON:

```bash
$ npx intlayer content list --json

[{"key":"home-page","path":"src/components/HomePage/homePage.content.ts"},{"key":"server-component","path":"src/components/ServerComponent/serverComponent.content.ts"},{"key":"client-component","path":"src/components/ClientComponent/clientComponent.content.ts"}]
```

Este comando exibirá:

- Uma lista formatada de todos os arquivos de declaração de conteúdo com suas chaves e caminhos relativos dos arquivos
- A contagem total de arquivos de declaração de conteúdo encontrados

A saída ajuda você a verificar se todos os seus arquivos de conteúdo estão corretamente configurados e descobertos pelo sistema Intlayer.
