---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Adaptadores de Compatibilidade Intlayer"
description: "Migre sua solução i18n existente para Intlayer sem atrito usando adaptadores de compatibilidade."
keywords:
  - compat
  - migration
  - internationalization
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Adaptadores de Compatibilidade Intlayer

Migrar uma aplicação grande para uma nova biblioteca de internacionalização pode ser intimidante. Para facilitar essa transição, Intlayer fornece **adaptadores de compatibilidade** para as bibliotecas i18n mais populares do ecossistema.

Esses pacotes de adaptadores expõem a **mesma API pública exata** das suas bibliotecas i18n existentes, mas delegam todo o trabalho de tradução para Intlayer em tempo de execução.

## Como funciona

Quando você usa um compat adapter, não precisa reescrever as importações da sua aplicação ou mudar como você usa seus hooks e componentes de tradução. Em vez disso, os plugins bundler do Intlayer fazem automaticamente um alias das suas importações existentes para os pacotes compat do Intlayer.

Por exemplo, um desenvolvedor substitui `import { useTranslation } from 'react-i18next'` por `import { useTranslation } from '@intlayer/react-i18next'` (feito automaticamente via plugin bundler), e a aplicação continua funcionando com traduções agora servidas a partir dos dicionários do Intlayer. As chaves também são tipadas contra seus dicionários do Intlayer!

## Adaptadores Compat Disponíveis

Escolha sua biblioteca existente abaixo para ver como migrar perfeitamente:

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
