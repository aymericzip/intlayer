---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar do Polyglot.js para o Intlayer"
description: "Aprenda como migrar do Polyglot.js para o Intlayer usando o adaptador de compatibilidade."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar do Polyglot.js para Intlayer

Se está a utilizar o Polyglot.js da Airbnb, migrar para Intlayer é extremamente simples usando a camada de compatibilidade.

## O que fazer

Simplesmente execute o comando de inicialização em seu projeto:

```bash
npx intlayer init
```

Isso gera `intlayer.config.ts`. Você pode então utilizar o alias do plugin bundler para redirecionar transparentemente as importações do Polyglot para `@intlayer/polyglot`.

## O que faz por trás dos panos

A sintaxe do Polyglot.js normalmente depende de `polyglot.t('key', {name})` com interpolações `%{name}` e plurais `smart_count` separados por `"singular |||| plural"`.

Por trás dos panos:

- **Interpolation:** A camada de compatibilidade manipula placeholders `%{var}` nativamente.
- **Plurals:** A string é dividida em `||||` e avaliada contra `Intl.PluralRules` nativo de acordo com a locale ativa, espelhando a ordem de bucket própria do Polyglot por locale.
- **Dictionaries:** Você evita a necessidade de fornecer enormes configurações JSON para `new Polyglot()` – Intlayer manipula os dictionaries dinamicamente e os prune automaticamente.
