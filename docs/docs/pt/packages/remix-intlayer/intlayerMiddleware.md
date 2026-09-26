---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentação do middleware intlayer | remix-intlayer
description: Veja como usar o middleware intlayer em aplicações Remix 3 para roteamento baseado em locale e gerenciamento de contexto de requisição.
keywords:
  - intlayer
  - intlayerMiddleware
  - remix
  - remix-3
  - middleware
  - roteamento
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentação do middleware Remix 3 intlayer

O middleware `intlayer` para Remix 3 gerencia a camada de internacionalização em toda a sua aplicação. Desenvolvido sobre padrões web (`Request` e `Response`), gerencia o roteamento baseado em locale (redirecionamentos e reescritas internas), detecta a locale da requisição, persiste-a em cookies e cabeçalhos, e configura um escopo `AsyncLocalStorage` para que os manipuladores e componentes possam acessar traduções sem repasse manual de props.

## Uso

Registre o middleware `intlayer` ao inicializar seu roteador Remix 3:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Atende `/`, `/fr`, `/es`, a locale é resolvida a partir da requisição
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Descrição

O middleware `intlayer` realiza as seguintes tarefas:

1. **Preparação de dicionários**: Executa `prepareIntlayer` na inicialização para garantir que todos os dicionários gerados estejam construídos e disponíveis.
2. **Roteamento por locale**: Avalia a requisição de acordo com a estratégia de roteamento configurada (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Redirecionamentos**: Se um usuário acessar `/about` e dever ser redirecionado para um prefixo de idioma (ex.: `/pt/about`), o middleware retorna uma resposta de redirecionamento com os cabeçalhos `location` e `Set-Cookie` adequados.
   - **Reescritas internas**: Quando um usuário acessa `/pt/about`, a URL é reescrita internamente para que o manipulador corresponda a `/about`, enquanto a locale resolvida é capturada como `pt`.
   - **Aliases de URL localizados**: Respeita regras de reescrita de URL definidas em `intlayer.config.ts` (ex.: reescrever `/pt/about` para `/pt/sobre`).
3. **Resolução de locale**: Detecta a locale ativa com base no prefixo da URL, cookies persistidos, cabeçalhos personalizados ou preferências do navegador `Accept-Language`.
4. **Injeção de contexto**:
   - Anexa `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) ao `RequestContext` do Remix sob a chave `Intlayer` e `context.intlayer`.
   - Executa o restante da requisição dentro de um escopo `AsyncLocalStorage` (`requestStorage`), permitindo que `useIntlayer`, `useDictionary` e `useLocale` sejam chamados de forma limpa em manipuladores, visualizações e componentes.
5. **Persistência**: Anexa os cabeçalhos e cookies de locale de saída à resposta HTTP final para reter a preferência do usuário.

## Parâmetros

A função `intlayer` aceita `IntlayerMiddlewareOptions` opcionais:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Substituições personalizadas de configuração de roteamento
};

const middleware = intlayer(options);
```

## Acesso direto ao contexto

Além de usar hooks, você pode acessar o `IntlayerState` resolvido diretamente a partir do contexto de requisição do Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Via context.get()
  const state = context.get(Intlayer);

  // Ou via propriedade direta context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Documentação relacionada

- [Contexto `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/Intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useLocale.md)
