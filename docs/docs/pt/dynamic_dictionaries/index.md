---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Dicionários dinâmicos
description: Visão geral dos recursos de dicionários dinâmicos do Intlayer — coleções e variantes — para criar conteúdo i18n flexível e orientado em tempo de execução.
keywords:
  - Dicionários dinâmicos
  - Coleções
  - Variantes
  - Intlayer
  - Internacionalização
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Lançamento do recurso de dicionários dinâmicos"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Fusão dos registros dinâmicos nas variantes — `variant` agora aceita uma string ou um objeto"
author: aymericzip
---

# Dicionários dinâmicos

O Intlayer suporta dois mecanismos para expressar conteúdo que vai além de um único dicionário estático por chave. Cada um é declarado por meio de um **campo de metadados de nível superior** no arquivo de conteúdo; nenhuma função de invólucro é necessária.

| Recurso                                                                                                       | Campo de metadados                      | Seletor em `useIntlayer`                        |
| ------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| [Coleções](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/collections.md) | `item: N`                               | `{ item: N }`                                   |
| [Variantes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md)   | `variant: "name"` _ou_ `variant: { … }` | `{ variant: "name" }` _ou_ `{ variant: { … } }` |

Ambos se combinam com o argumento de locale e suportam carregamento seletivo / preguiçoso via `importMode`.

## Quando usar cada um

- **Coleções** — lista ordenada de itens gerenciados em arquivos separados (entradas de FAQ, posts de blog, produtos).
- **Variantes** — alternativas de conteúdo nomeadas ou estruturadas:
  - uma variante de **string** para testes A/B, banners sazonais ou feature flags;
  - uma variante de **objeto** para registros de CMS, conteúdo específico do usuário ou qualquer conteúdo endereçado por um conjunto de campos (os antigos «registros dinâmicos»).

> Versões anteriores expunham um campo `meta` separado para conteúdo indexado por registro. Ele foi fundido em `variant`: passe um **objeto** para `variant` em vez de usar `meta`.

## Desambiguação do seletor

Uma chave pode declarar ambas as dimensões ao mesmo tempo (por exemplo, uma coleção cujos itens têm cada um uma variante). Elas são resolvidas na ordem:

```
variant → item
```

Assim, `{ variant: "promo" }` em uma chave variante × item retorna todos os itens promo como um array, e adicionar `{ item: 2 }` o restringe a uma única entrada.
