---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar do i18next para Intlayer"
description: "Aprenda como migrar sua aplicação Vanilla JS/TS do i18next para Intlayer usando o adaptador de compatibilidade."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar de i18next para Intlayer

Para um tutorial passo a passo detalhado, consulte nosso [i18next Migration Guide](../migration_from_i18next_to_intlayer.md) completo.

Intlayer replica perfeitamente as características de runtime do núcleo do `i18next`. Utilizando o pacote de compatibilidade, suas aplicações Vanilla ou módulos internos podem continuar aproveitando a sintaxe familiar.

## O que fazer

Para começar, inicialize o Intlayer no seu projeto:

```bash
npx intlayer init
```

Se você está usando Vite, inclua o plugin do Intlayer para rotear importações para `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## O que funciona nos bastidores

O `i18nextVitePlugin` cria aliases para importações de `i18next` para `@intlayer/i18next`, evitando inchamento de bundle por inclusões de arquivos JSON.

Nos bastidores:

- **Configuração de instância:** `createInstance` analisa e aplica corretamente fallbacks de namespace enquanto aproveita o pipeline de compilação do Intlayer para recuperação de dicionários.
- **Interpolação:** Suporte nativo para substituições `{{name}}` e aninhamento `$t(key)` recursivamente.
- **Contexto e plurais:** Identifica e resolve formatos de sufixo como `key_male` e `key_one`/`key_other` avaliando contra `Intl.PluralRules` padrão.
- **Retorno de objetos:** O modo `returnObjects: true` extrai com segurança árvores de dicionários do Intlayer.
