---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dicionários Dinâmicos
description: Visão geral dos três recursos de dicionário dinâmico do Intlayer — coleções, variantes e registros dinâmicos — para criar conteúdo i18n flexível e orientado a runtime.
keywords:
  - Dicionários Dinâmicos
  - Coleções
  - Variantes
  - Registros Dinâmicos
  - Intlayer
  - Internacionalização
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Lançamento do recurso de dicionários dinâmicos"
author: aymericzip
---

# Dicionários Dinâmicos

O Intlayer suporta três mecanismos para expressar conteúdo que vai além de um único dicionário estático por chave. Cada um é declarado através de um **campo de metadados de nível superior** no arquivo de conteúdo; nenhuma função de empacotamento (wrapper) é necessária.

| Recurso                                                                                                                      | Campo de metadados | Seletor em `useIntlayer` |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------ |
| [Coleções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/collections.md)                | `item: N`          | `{ item: N }`            |
| [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md)                  | `variant: "name"`  | `{ variant: "name" }`    |
| [Registros Dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }`  | `{ id, … }`              |

Todos os três se compõem com o argumento de localidade e suportam carregamento seletivo / diferido (lazy loading) via `importMode`.

## Quando usar cada um

- **Coleções** — lista ordenada de itens gerenciados em arquivos separados (perguntas frequentes, posts de blog, produtos).
- **Variantes** — alternativas de conteúdo nomeadas para testes A/B, banners sazonais ou sinalizadores de recursos (feature flags).
- **Registros dinâmicos** — conteúdo buscado em tempo de execução por um ID opaco (registros de CMS, cópia específica do usuário).

## Desambiguação de seletores

Quando múltiplos seletores estão presentes em um dicionário, a ordem de resolução é:

```
variant → meta → item
```
