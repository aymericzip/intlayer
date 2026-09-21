---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Documentação do contexto Intlayer | remix-intlayer
description: Veja como usar a chave e a propriedade de contexto de requisição Intlayer em aplicações Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - contexto
  - RequestContext
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentação do contexto Intlayer

No `remix-intlayer`, `Intlayer` é a chave de `RequestContext` usada para acessar o estado de internacionalização dentro dos manipuladores de requisição do Remix 3.

## Uso

Quando o middleware `intlayer()` é executado, ele armazena um objeto `IntlayerState` no contexto da requisição sob a chave `Intlayer`. Você pode recuperá-lo dentro de qualquer manipulador de rota:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Acesso via context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Você também pode acessar utilizando o atalho de propriedade direta `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Estrutura do `IntlayerState`

O objeto `IntlayerState` contém:

| Propriedade        | Tipo                | Descrição                                                           |
| ------------------ | ------------------- | ------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | A locale resolvida para a requisição atual.                         |
| `defaultLocale`    | `DeclaredLocales`   | A locale de fallback padrão configurada em `intlayer.config.ts`.    |
| `availableLocales` | `DeclaredLocales[]` | A lista de todas as locales suportadas configuradas para o projeto. |

## Documentação relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useLocale.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useIntlayer.md)
