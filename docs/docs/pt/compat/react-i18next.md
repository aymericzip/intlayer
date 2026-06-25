---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de react-i18next para Intlayer"
description: "Aprenda como migrar sua aplicação React de react-i18next para Intlayer usando o adaptador de compatibilidade."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar de react-i18next para Intlayer

Para um tutorial completo e detalhado passo a passo, consulte nosso completo [Guia de Migração react-i18next](../migration_from_react-i18next_to_intlayer.md).

Usar o adaptador de compatibilidade do Intlayer permite que você migre de `react-i18next` sem qualquer alteração nos seus imports de código-fonte.

## O que fazer

Para inicializar o projeto, execute:

```bash
npx intlayer init
```

Durante a inicialização, o Intlayer instalará `@intlayer/react-i18next` e criará `intlayer.config.ts`. No seu bundler (como Vite), aplique o plugin do Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## O que faz sob o capô

O `reactI18nextVitePlugin` envolve o plugin central `vite-intlayer` e injeta aliases de resolução para `react-i18next` e `i18next`, redirecionando-os para `@intlayer/react-i18next` e `@intlayer/i18next`.

Sob o capô:

- **`useTranslation` & `withTranslation`:** Reescritos para usar os hooks nativos do Intlayer, dando-lhe preenchimento automático de TypeScript para suas chaves de dicionário. Oferece suporte contínuo a namespaces (por exemplo, `t('namespace:key')`).
- **Plurais & Contexto:** Manipula a pluralização baseada em sufixo do i18next (`key_one`, `key_other`) usando `Intl.PluralRules` nativo e sufixos de contexto (`key_male`).
- **Componente `<Trans>`:** Re-implementado para suportar a prop `components`, formas de objeto e array, e tags numeradas `<1>...</1>` mapeadas diretamente para seus nós React.
- **Instância `i18n`:** Resolve chaves diretamente do Intlayer sem buscar grandes arquivos JSON, resultando em tamanhos de bundle significativamente menores.
