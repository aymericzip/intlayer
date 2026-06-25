---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar do Next Translate para Intlayer"
description: "Aprenda como migrar sua aplicação Next.js do next-translate para Intlayer usando o adaptador de compatibilidade."
keywords:
  - next-translate
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-translate
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar do Next Translate para o Intlayer

Migrar de `next-translate` para Intlayer é uma substituição praticamente imediata que mantém sua sintaxe e tags existentes.

## O que fazer

Initialize Intlayer in your project:

```bash
npx intlayer init
```

O CLI irá scaffolding sua configuração. Você pode então aplicar o plugin Intlayer no seu `next.config.ts`, que injeta aliases de subpath em build-time mapeando `next-translate/useTranslation` para `@intlayer/next-translate`.

## O que faz nos bastidores

`next-translate` fornece hooks como `useTranslation('ns')`, `t('ns:key.path')`, e o componente `<Trans>`.

Nos bastidores:

- **Interpolação & Plurais:** Depende fortemente do comportamento do adaptador `react-i18next`. Tratados dinamicamente são placeholders `{{var}}` e pluralização mapeada a partir de sufixos como `key_0`, `key_one`, e `key_other`.
- **Componente `<Trans>`:** Diretamente suportado para análise de tags semelhantes a HTML juntamente com uma prop `components` baseada em array.
- **Namespaces:** Alias de subpath garante que sua `useTranslation` referencia os namespaces corretos do dicionário interno sem modificação manual.
