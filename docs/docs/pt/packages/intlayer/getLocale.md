---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação da função getLocale | intlayer
description: Veja como usar a função getLocale do pacote intlayer
keywords:
  - getLocale
  - tradução
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Inicialização da documentação
---

# Documentação da função getLocale

A função `getLocale` permite detetar a locale a partir de uma string fornecida, como uma URL ou um caminho.

## Uso

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Output: 'fr'
```

## Parâmetros

| Parâmetro | Tipo     | Descrição                                     |
| --------- | -------- | --------------------------------------------- |
| `path`    | `string` | O caminho ou string de onde extrair a locale. |

## Retorno

A locale detectada, ou a locale padrão se nenhuma locale for detectada.
