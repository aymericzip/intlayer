---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: "Documentação da função validatePrefix | intlayer"
description: Veja como usar a função validatePrefix do pacote intlayer
keywords:
  - validatePrefix
  - translation
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação inicial
---

# Documentação da função validatePrefix

A função `validatePrefix` verifica se um prefixo fornecido é um prefixo de idioma válido de acordo com a configuração.

## Uso

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Saída: true
```

## Parâmetros

| Parâmetro | Tipo     | Descrição            |
| --------- | -------- | -------------------- |
| `prefix`  | `string` | O prefixo a validar. |

## Retorno

`true` se o prefixo for válido, `false` caso contrário.
