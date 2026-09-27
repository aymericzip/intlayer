---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "@intlayer/nuxt-i18n: adaptador de compatibilidade para @nuxtjs/i18n"
description: "Mantenha seu código @nuxtjs/i18n e sirva-o com o Intlayer: instale @intlayer/nuxt-i18n, crie aliases para os imports e veja o que o adaptador muda internamente."
keywords:
  - nuxtjs-i18n
  - nuxt
  - vue
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# @intlayer/nuxt-i18n: adaptador de compatibilidade para @nuxtjs/i18n

Migrar sua aplicação Nuxt de `@nuxtjs/i18n` para Intlayer é um processo perfeito usando o módulo adaptador Nuxt.

## O que fazer

Para inicializar o projeto, execute:

```bash
npx intlayer init --interactive
```

Isso irá configurar `intlayer.config.ts`. Depois, adicione o módulo Intlayer Nuxt (por exemplo, `@intlayer/nuxt-i18n`) no array de módulos do seu `nuxt.config.ts`. Isso aplica automaticamente a configuração de compatibilidade para sua aplicação.

## O que faz internamente

`@nuxtjs/i18n` envolve `vue-i18n` enquanto fornece composables de roteamento específicos do Nuxt (`useLocalePath`, `useSwitchLocalePath`, `<NuxtLinkLocale>`).

Internamente:

- **Translations:** Depende nativamente da camada de compatibilidade `@intlayer/vue-i18n` para todas as tarefas de tradução de strings (suportando completamente formatos `vue-i18n`, plurais por pipe e reatividade).
- **Routing:** Espelha os composables de roteamento usando os helpers de URL localizadas do Intlayer.
- **Configuration:** Lê `availableLocales` e configurações padrão diretamente do seu `intlayer.config.ts` para coordenar páginas Nuxt automaticamente.

> Para entender de onde vêm essas bibliotecas, leia a história do i18n em JavaScript.

- [A história do i18n em JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/history_of_i18n.md)
