---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Listar arquivos de declaração de conteúdo

```bash
npx intlayer content list
```

## Apelidos:

- `npx intlayer list`

Este comando exibe todos os arquivos de declaração de conteúdo no seu projeto, mostrando suas chaves de dicionário e caminhos dos arquivos. É útil para obter uma visão geral de todos os seus arquivos de conteúdo e verificar se eles estão sendo corretamente descobertos pelo Intlayer.

## Exemplo:

```bash
npx intlayer content list
```

## Exemplo de saída:

```bash
npx intlayer content list
Content declaration files:
 - home-page        - src/components/HomePage/homePage.content.ts
 - server-component - src/components/ServerComponent/serverComponent.content.ts
 - client-component - src/components/ClientComponent/clientComponent.content.ts

Total de arquivos de declaração de conteúdo: 3
```

Este comando exibirá:

- Uma lista formatada de todos os arquivos de declaração de conteúdo com suas chaves e caminhos relativos dos arquivos
- A contagem total de arquivos de declaração de conteúdo encontrados

A saída ajuda você a verificar se todos os seus arquivos de conteúdo estão corretamente configurados e descobertos pelo sistema Intlayer.
