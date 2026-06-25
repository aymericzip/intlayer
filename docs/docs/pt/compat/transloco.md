---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar do Transloco para Intlayer"
description: "Aprenda como migrar sua aplicação Angular do Transloco para Intlayer usando o adaptador de compatibilidade."
keywords:
  - transloco
  - angular
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - transloco
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar de Transloco para Intlayer

Se sua aplicação Angular atualmente usa `@jsverse/transloco`, você pode migrar para Intlayer usando nosso adaptador de compatibilidade. Esta transição permite que você mantenha sua sintaxe de template existente enquanto utiliza a poderosa estrutura de dicionário do Intlayer.

## O que fazer

Execute simplesmente o comando de inicialização no seu projeto:

```bash
npx intlayer init
```

Isso vai gerar a configuração necessária `intlayer.config.ts`. Você então vai substituir seus imports Transloco com módulos `@intlayer/transloco` ou depender dos aliases de build.

## O que faz sob o capô

Transloco usa scopes e um `TranslocoService` (`translate`, `selectTranslate`), juntamente com diretivas estruturais (`*transloco="let t"`) e pipes (`| transloco`).

Sob o capô:

- **Scopes:** Mapeiam naturalmente para chaves de dicionário do Intlayer, fornecendo uma ótima história de pruning para otimização de bundle.
- **Service & Directives:** O adaptador Angular do Intlayer substitui perfeitamente os provedores, permitindo que seus pipes e diretivas de template existentes resolvam strings contra dicionários do Intlayer.
- **Build time parsing:** O analisador TypeScript reconhece chamadas `instant/get`, e fallback pruning garante correção mesmo quando o uso do template não é estaticamente rastreável.
