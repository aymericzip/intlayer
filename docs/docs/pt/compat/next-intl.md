---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de next-intl para Intlayer"
description: "Aprenda como migrar sua aplicação Next.js de next-intl para Intlayer usando o adaptador de compatibilidade."
keywords:
  - next-intl
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar de next-intl para Intlayer

Para um tutorial completo e detalhado passo a passo, consulte nosso [Guia de Migração next-intl](../migration_from_next-intl_to_intlayer.md).

Migrar de `next-intl` para Intlayer permite que você mantenha seu roteamento de aplicação e sintaxe completamente intactos.

## O que fazer

Execute o seguinte comando no seu repositório:

```bash
npx intlayer init
```

Isso criará um `intlayer.config.ts`. No seu `next.config.ts`, use o wrapper do plugin para injetar perfeitamente os aliases `next-intl` em direção a `@intlayer/next-intl`.

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## O que faz nos bastidores

O wrapper do bundler substitui traduções, mas **mantém os recursos de `next-intl/navigation` intactos** (p.ex. `Link`, `redirect`, `usePathname`).

Nos bastidores:

- **ICU runtime:** Plurais (`=0`, `one`, `other`), select/selectordinal, argumentos `#` e argumentos formatados (`{ts, date, long}`) funcionam corretamente usando o resolver compartilhado `resolveMessage(..., 'icu')`.
- **`useTranslations()` & `getTranslations()`:** As chamadas de escopo simples extraem o primeiro segmento de chave como o identificador de dicionário correto. Namespaces aninhados se dividem graciosamente em caminhos de dicionário e prefixos.
- **Rich formatting:** Tanto `t.rich()` quanto `t.markup()` são totalmente implementados nativamente, convertendo nós semelhantes a HTML em chunks React renderizados.
- **`useFormatter`:** `relativeTime`, `list`, `dateTimeRange` e formatos nomeados da configuração fazem ponte para os formatadores nativos `Intl` principais.
