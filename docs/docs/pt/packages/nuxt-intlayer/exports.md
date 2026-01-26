---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote nuxt-intlayer
description: Integração Nuxt para Intlayer, fornecendo um módulo para aplicações Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote nuxt-intlayer

O pacote `nuxt-intlayer` fornece um módulo Nuxt para integrar o Intlayer ao seu projeto Nuxt.

## Instalação

```bash
npm install nuxt-intlayer
```

## Exportações

### Módulo

O pacote `nuxt-intlayer` fornece um módulo Nuxt para integrar o Intlayer ao seu projeto Nuxt.

Importação:

```tsx
import "nuxt-intlayer";
```

ou adicionando a `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| Exportação | Tipo         | Descrição                                                     |
| ---------- | ------------ | ------------------------------------------------------------- |
| `default`  | `NuxtModule` | A exportação padrão é o módulo Nuxt que configura o Intlayer. |
