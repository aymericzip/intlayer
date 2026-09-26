---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentação do hook useIntlayer | remix-intlayer
description: Veja como usar o hook useIntlayer em aplicações Remix 3 para acessar conteúdo localizado por chave.
keywords:
  - useIntlayer
  - dicionário
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Documentação do hook useIntlayer

O hook `useIntlayer` permite recuperar conteúdo localizado de um dicionário do Intlayer por chave em aplicações Remix 3.

Ele lê automaticamente a locale ativa do contexto da requisição atual (via `AsyncLocalStorage`), dispensando o repasse manual da locale por manipuladores de rota, templates de visualização ou componentes.

## Uso

### Em manipuladores de rota

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### Em templates de visualização / componentes

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parâmetros

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: A chave exclusiva do dicionário (conforme definida em seus arquivos de declaração `.content.ts`).
2. **`localeOrSelector`** (opcional): Uma locale específica ou objeto seletor (`{ item }`, `{ variant }`, opcionalmente com `locale`). Quando fornecido, substitui a locale detectada a partir do contexto da requisição.

## Descrição

O hook realiza as seguintes tarefas:

1. **Recuperação de locale do contexto**: Detecta a locale atual a partir do escopo `AsyncLocalStorage` vinculado à requisição, estabelecido pelo middleware `intlayer()`.
2. **Recuperação de dicionário**: Obtém o dicionário pré-compilado correspondente à chave fornecida.
3. **Processamento de tradução**: Resolve traduções, enumerações, markdown e conteúdo condicional para a locale resolvida.
4. **Tratamento de fallback**: Se chamado fora de um contexto de requisição HTTP ativo, retorna de forma segura para a `defaultLocale` configurada.

## Documentação relacionada

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useLocale.md)
