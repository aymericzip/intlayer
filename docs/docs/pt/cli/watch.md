---
createdAt: 2024-08-11
updatedAt: 2025-11-22
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
---

# Monitorar Dicionários

```bash
npx intlayer watch
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

  > Exemplo: `npx intlayer watch --with "next dev --turbopack"`
