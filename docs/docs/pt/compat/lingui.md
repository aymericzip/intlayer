---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar do Lingui para Intlayer"
description: "Aprenda como migrar sua aplicação do Lingui para Intlayer usando o adaptador de compatibilidade."
keywords:
  - lingui
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - lingui
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar do Lingui para Intlayer

Se seu projeto atualmente depende da compilação baseada em macros do Lingui, a transição para Intlayer permite que você mantenha seus poderosos fluxos de trabalho de macros enquanto os respalda nativamente com a estratégia de compilação JSON do Intlayer.

## O que fazer

Para começar, inicialize o Intlayer no seu projeto:

```bash
npx intlayer init
```

Isso cria seu `intlayer.config.ts`. Certifique-se de manter `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` na sua etapa de build para executar _antes_ do compilador Intlayer. Em seguida, use o alias do plugin bundler para rotear `@lingui/core` e `@lingui/react` para `@intlayer/lingui`.

## O que acontece nos bastidores

Lingui utiliza macros (como `` t`Hello ${name}` `` e `<Trans>`) que são compiladas em chamadas de tempo de execução como `i18n._(id, values)`.

Nos bastidores:

- **Macros:** Elas são compiladas precisamente como antes, garantindo nenhuma interrupção na sua sintaxe de origem.
- **Tradução em tempo de execução:** O `i18n._()` com alias utiliza dicionários Intlayer. IDs explicitamente nomeados e IDs hash são totalmente mapeados usando plugins de sincronização `.po` do Intlayer para agregar e remover chaves com segurança.
- **Capacidades ICU:** O suporte para pluralização, seleção e variantes ICU permanece robusto devido ao parser ICU unificado do Intlayer, garantindo resultados de renderização idênticos.
