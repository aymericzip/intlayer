---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de i18n-js para Intlayer"
description: "Aprenda como migrar sua aplicação de i18n-js para Intlayer usando o adaptador de compatibilidade."
keywords:
  - i18n-js
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migrar de i18n-js para Intlayer

Fazer a transição da biblioteca `i18n-js` para Intlayer é uma migração altamente otimizada projetada para transferir grandes configurações de traduções para o sistema de resolução de arquivos estruturado do Intlayer.

## O que fazer

Execute o seguinte comando de configuração em seu repositório:

```bash
npx intlayer init
```

Com `intlayer.config.ts` preparado, você pode adicionar o alias do Intlayer à configuração do seu bundler para que qualquer importação de `i18n-js` aponte para o pacote de compatibilidade `@intlayer/i18n-js`.

## O que faz sob o capô

`i18n-js` acessa namespaces através de expressões como `i18n.t('scope.key', {name})` juntamente com fallbacks de locale e mapeamentos de pluralização específicos.

Sob o capô:

- **Interpolação:** O adaptador de compatibilidade analisa facilmente mapeamentos `%{name}` em seu valor de dicionário de runtime alvo.
- **Pluralização:** Substitui subchaves `one/other` e as mapeia contra os poderosos mecanismos de pluralização subjacentes do Intlayer (`Intl.PluralRules`), abstraindo mapeamentos manuais.
- **Locales:** Em vez de carregar payloads monolíticos de linguagem no bootstrap, dicionários são servidos de forma otimizada com base na configuração de contexto atual via configuração nativa do Intlayer.
