---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migrar de Svelte I18n para Intlayer"
description: "Aprenda como migrar sua aplicação Svelte de svelte-i18n para Intlayer usando o adaptador de compatibilidade."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migration
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Inicializar histórico"
author: aymericzip
---

# Migrar de Svelte I18n para Intlayer

Mover sua aplicação Svelte de `svelte-i18n` para Intlayer leva apenas um momento usando o adaptador de compatibilidade.

## O que fazer

Simplesmente execute o comando de inicialização no seu projeto:

```bash
npx intlayer init
```

Isso gera `intlayer.config.ts`. Certifique-se de que seus plugins SvelteKit / Vite estão envolvidos com o plugin de alias do Intlayer para mapear perfeitamente `svelte-i18n` para `@intlayer/svelte-i18n`.

## O que acontece nos bastidores

Svelte-i18n depende de stores intensamente usadas (`$_`, `$t`, `$format`, etc.) e ICU MessageFormat.

Nos bastidores:

- **Stores:** Intlayer faz proxy dos stores do `svelte-i18n`. `$_` torna-se uma derived store da locale atual retornando um resolver do Intlayer.
- **Keys:** Suas chaves planas (ex. `$_('home.title')`) são avaliadas de forma que o primeiro segmento de caminho represente o dicionário do Intlayer.
- **ICU Syntax:** Totalmente gerenciada pelo resolver ICU compartilhado (análise equivalente ao `intl-messageformat`).
- **Formatters:** As chamadas `$date`, `$time`, `$number` redirecionam com segurança para os formatadores core nativos do Intlayer.
- **Babel/SWC Analysis:** O analisador do Intlayer lê os callers de store do Svelte (`$_`) dentro de seus arquivos fonte `.svelte` antes da compilação para construir automaticamente os chunks de dicionário relevantes.
