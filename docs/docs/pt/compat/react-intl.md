---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de React Intl para Intlayer"
description: "Aprenda como migrar sua aplicação React de react-intl para Intlayer usando o adaptador de compatibilidade."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar do React Intl para Intlayer

Se sua aplicação React usa `react-intl` (FormatJS), a transição para Intlayer é muito fácil. Nossa camada de compatibilidade lida perfeitamente com ICU MessageFormat e todos os componentes `Formatted*` existentes.

## O que fazer

Comece executando o comando de inicialização em seu projeto:

```bash
npx intlayer init
```

Em seguida, configure o plugin Intlayer Vite ou Next.js em sua configuração. Este plugin injeta aliases em tempo de construção para redirecionar as importações de `react-intl` para `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## O que faz sob o capô

O plugin bundler cria um alias de `react-intl` para `@intlayer/react-intl`. Em vez de analisar manualmente arquivos JSON grandes e envolver seu app em um `IntlProvider`, o plugin Intlayer extrai estaticamente chaves e usa dicionários Intlayer em tempo de execução.

Sob o capô:

- **ICU MessageFormat:** Intlayer usa o resolver `resolveMessage(..., 'icu')` que suporta totalmente pluralização ICU, seleção, formatação de data/número e tags de rich text nativamente.
- **Method & JSX callers:** `intl.formatMessage({ id: 'a.b' })` e `<FormattedMessage id="a.b">` são identificados pelos plugins compilador Intlayer (`@intlayer/babel` / `@intlayer/swc`), convertendo chaves pontilhadas planas para que o primeiro segmento se resolva corretamente para a chave do dicionário Intlayer.
- **Formatters:** `<FormattedNumber>`, `<FormattedDate>`, etc., fazem ponte para o `core/formatters` nativo usando `Intl`.
