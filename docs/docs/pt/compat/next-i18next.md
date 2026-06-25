---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de next-i18next para Intlayer"
description: "Aprenda como migrar sua aplicação Next.js de next-i18next para Intlayer usando o adaptador de compatibilidade."
keywords:
  - next-i18next
  - nextjs
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar de next-i18next para Intlayer

Para um tutorial completo e detalhado passo a passo, consulte nosso [Guia de Migração next-i18next](../migration_from_next-i18next_to_intlayer.md).

O Intlayer manipula todas as implementações do Next.js Pages Router e App Router de forma transparente. Usar o adapter permite que você migre sua implementação de `next-i18next` sem reescrever nenhum código.

## O que fazer

Para começar, execute:

```bash
npx intlayer init
```

Isso cria o arquivo de configuração necessário do Intlayer. Para integrar o Intlayer nos bastidores, atualize seu `next.config.ts`:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

## O que faz sob o capô

O `createNextI18nPlugin` compõe o comportamento nativo do Next.js junto com o plugin central `next-intlayer`, injetando todos os aliases Webpack/Turbopack necessários para `next-i18next`, `react-i18next`, e `i18next`.

Sob o capô:

- **`serverSideTranslations` & `appWithTranslation`:** Agora funcionam como wrappers para os loaders internos do Intlayer, contornando a injeção estática de grandes JSONs.
- **Client hooks:** Delega imediatamente para `@intlayer/react-i18next` mantendo todas as funcionalidades de formatação, plurais e namespaces aninhados.
