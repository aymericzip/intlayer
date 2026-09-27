---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/next-intl: adaptador de compatibilidade para next-intl"
description: "Mantenha seu código next-intl e sirva-o com o Intlayer: instale @intlayer/next-intl, crie aliases para os imports e veja o que o adaptador muda internamente."
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

# @intlayer/next-intl: adaptador de compatibilidade para next-intl

Para um tutorial completo e detalhado passo a passo, consulte nosso [Guia de Migração next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md).

- [Guia de Migração next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/migration_from_next-intl_to_intlayer.md)

Migrar de `next-intl` para Intlayer permite que você mantenha seu roteamento de aplicação e sintaxe completamente intactos.

## O que fazer

Execute o seguinte comando no seu repositório:

```bash
npx intlayer init --interactive
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

> Para entender de onde vêm essas bibliotecas, leia a história do i18n em JavaScript.

- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)
