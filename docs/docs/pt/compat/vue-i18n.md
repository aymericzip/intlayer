---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de Vue I18n para Intlayer"
description: "Aprenda como migrar sua aplicação Vue de vue-i18n para Intlayer usando o adaptador de compatibilidade."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar de Vue I18n para Intlayer

Se sua aplicação Vue atualmente usa `vue-i18n`, você pode migrar para Intlayer sem reescrever seus componentes ou traduzir hooks. Intlayer fornece um adaptador de compatibilidade que espelha perfeitamente a API do `vue-i18n` enquanto aproveita os poderosos recursos do Intlayer por trás dos panos.

## O que fazer

Para começar, basta executar o comando de inicialização no seu projeto:

```bash
npx intlayer init
```

Durante a inicialização, o Intlayer configurará seu arquivo de configuração (`intlayer.config.ts`) e preparará seu projeto para migração. Você só precisará adicionar o plugin Intlayer à sua configuração do Vite para fazer um alias automático das importações `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## O que faz por baixo

O `vueI18nVitePlugin` injeta um alias de módulo no seu bundler. Qualquer import de `vue-i18n` no seu codebase será redirecionado transparentemente para `@intlayer/vue-i18n`.

**Por baixo, o adapter manipula a sintaxe complexa do `vue-i18n` nativamente:**

- **Interpolação & Plurais:** Resolve interpolações `{name}` e de lista `{0}`. Plurais com pipe (`"car | cars"`) são convertidos em nós de enumeração/plural do Intlayer baseados em semântica posicional.
- **Formatos:** Funções como `d()` e `n()` envolvem `Intl` por baixo, honrando os `datetimeFormats` e `numberFormats` definidos nas suas opções.
- **Estado Global & Local:** `global.locale` é mapeado para um `WritableComputedRef` apoiado pelo cliente Intlayer, então a reatividade funciona exatamente como esperado (ex: `locale.value = 'fr'`).
- **Diretivas:** A diretiva `v-t` é registrada e funciona normalmente.

Sua aplicação continua renderizando exatamente como antes, mas o conteúdo é alimentado pelos seus dicionários Intlayer, oferecendo segurança de tipo, melhor otimização de bundle e integração CMS contínua.
