---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentação do middleware onRequest | astro-intlayer
description: Veja como usar o middleware onRequest em aplicações Astro para resolver o locale da requisição e preencher Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - internacionalização
  - documentação
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Doc inicial"
author: aymericzip
---

# Documentação do middleware Astro onRequest

O middleware `onRequest` de `astro-intlayer/middleware` resolve o locale de cada requisição HTTP recebida e preenche `Astro.locals.intlayer`.

Quando você registra a integração `intlayer()` em `astro.config.mjs`, esse middleware é injetado automaticamente. Você só precisa importá-lo diretamente se estiver compondo manualmente o middleware Astro usando `sequence(...)`.

## Utilização

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Acesse o locale resolvido em seu middleware personalizado
  const { locale } = context.locals.intlayer;
  console.log(`Manipulando requisição para o locale: ${locale}`);

  return next();
});
```

## Descrição

O middleware realiza as seguintes tarefas:

1. **Detecção de Locale**:
   - **URL**: Analisa o prefixo do caminho da URL ou o parâmetro de busca `?locale=` (a menos que `routing.mode` esteja configurado como `no-prefix`).
   - **Cookies / Cabeçalhos**: Verifica cookies de locale persistidos ou valores de cabeçalho personalizados.
   - **Accept-Language**: Utiliza a negociação de idioma preferencial do navegador como fallback.
   - Para páginas pré-renderizadas (`context.isPrerendered`), o locale é extraído estritamente da URL para evitar avisos de compilação do Astro.
2. **Preenchimento de Contexto**: Preenche `Astro.locals.intlayer` com:
   - `locale`: O locale resolvido.
   - `defaultLocale`: O locale de fallback padrão.
   - `availableLocales`: O array de locales configurados.
3. **Escopo AsyncLocalStorage**: Envolve o processamento subsequente da requisição dentro de um escopo `AsyncLocalStorage`, permitindo que `useIntlayer()`, `useDictionary()` e `useLocale()` acessem o estado da requisição sem passar argumentos.

## Tipo `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Documentação relacionada

- [Integração `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useLocale.md)
