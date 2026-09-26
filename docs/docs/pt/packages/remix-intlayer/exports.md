---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Documentação do pacote remix-intlayer
description: Integração do Remix 3 para o Intlayer, fornecendo middleware, contexto, hooks e formatadores para roteamento baseado em locale e gerenciamento de conteúdo.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Documentação unificada para todas as exportações"
author: aymericzip
---

# Pacote remix-intlayer

O pacote `remix-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Remix 3. Desenvolvido inteiramente sobre padrões web (`Request`, `Response`, `Headers` e `URL`), oferece middleware de roteador para roteamento por locale e reescritas internas, armazenamento de contexto, hooks e utilitários de formatação para gerenciamento simples de conteúdo multilíngue.

## Instalação

```bash
npm install remix-intlayer
```

## Exportações

### Middleware

Importação:

```tsx
import { intlayer } from "remix-intlayer";
```

| Função     | Descrição                                                                                                                                                                                                                               | Doc relacionada                                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware de roteador Remix 3 que gerencia o roteamento baseado em locale (redirecionamentos e reescritas internas), resolve a locale da requisição, persiste-a em cookies/cabeçalhos e estabelece o escopo de contexto da requisição. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/intlayerMiddleware.md) |

### Contexto

Importação:

```tsx
import { Intlayer, INTLAYER_CONTEXT_PROPERTY } from "remix-intlayer";
```

| Exportação                  | Tipo         | Descrição                                                                                                                                       | Doc relacionada                                                                                               |
| --------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | `ContextKey` | Chave de RequestContext contendo o `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) para a requisição atual.                     | [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`     | Nome de propriedade (`'intlayer'`) instalado diretamente no contexto da requisição, acessível via `context.intlayer` e `context.get(Intlayer)`. | -                                                                                                             |

### Hooks

Importação:

```tsx
import { useIntlayer, useDictionary, useLocale } from "remix-intlayer";
```

| Hook            | Descrição                                                                                                                                     | Doc relacionada                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Seleciona um dicionário por sua chave e retorna seu conteúdo para a locale da requisição atual. Lê automaticamente do contexto da requisição. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforma um objeto de dicionário importado e retorna seu conteúdo para a locale da requisição atual. Suporta seletores.                     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Retorna a locale resolvida da requisição atual, juntamente com `defaultLocale` e `availableLocales` configuradas.                             | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/remix-intlayer/useLocale.md)         |

### Utilitários

Importação:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Função                | Descrição                                                                                                                       | Doc relacionada |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `createLocaleRouting` | Função pura que calcula decisões de roteamento (`redirect`, `rewrite` ou `pass`) com base em requisição, configuração e opções. | -               |
| `getIntlayerState`    | Lê o `IntlayerState` atual (`locale`, `defaultLocale`, `availableLocales`) do escopo `AsyncLocalStorage`.                       | -               |

### Formatadores (remix-intlayer/format)

Importação:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "remix-intlayer/format";
```

| Hook              | Descrição                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Retorna uma instância Intl vinculada à locale da requisição com recursos de cache e assinatura.                  |
| `useDate`         | Retorna uma função de formatação de data vinculada à locale da requisição (`Intl.DateTimeFormat`).               |
| `useNumber`       | Retorna uma função de formatação de número vinculada à locale da requisição (`Intl.NumberFormat`).               |
| `useCurrency`     | Retorna uma função de formatação de moeda vinculada à locale da requisição.                                      |
| `usePercentage`   | Retorna uma função de formatação de porcentagem vinculada à locale da requisição.                                |
| `useRelativeTime` | Retorna uma função de formatação de tempo relativo vinculada à locale da requisição (`Intl.RelativeTimeFormat`). |
| `useList`         | Retorna uma função de formatação de lista vinculada à locale da requisição (`Intl.ListFormat`).                  |
| `useUnit`         | Retorna uma função de formatação de unidade vinculada à locale da requisição.                                    |
| `useCompact`      | Retorna uma função de formatação de número compacto vinculada à locale da requisição (ex.: `1.5K`).              |

### Utilitários HTML (remix-intlayer/html)

Importação:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Exportação        | Tipo       | Descrição                                                                |
| ----------------- | ---------- | ------------------------------------------------------------------------ |
| `renderHTML`      | `Function` | Função utilitária para renderizar nós HTML fora da interface do usuário. |
| `useHTML`         | `Hook`     | Hook para obter o contexto e a configuração do provedor HTML.            |
| `useHTMLRenderer` | `Hook`     | Hook para obter uma função de renderização HTML pré-configurada.         |

### Utilitários Markdown (remix-intlayer/markdown)

Importação:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Exportação            | Tipo       | Descrição                                                            |
| --------------------- | ---------- | -------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compila strings markdown em representação estruturada.               |
| `renderMarkdown`      | `Function` | Renderiza conteúdo markdown em nós de saída.                         |
| `parseMarkdown`       | `Function` | Analisa conteúdo markdown bruto em uma AST.                          |
| `useMarkdown`         | `Hook`     | Hook para acessar o contexto do provedor markdown.                   |
| `useMarkdownRenderer` | `Hook`     | Hook para obter uma função de renderização Markdown pré-configurada. |

### Tipos

Importação:

```tsx
import type {
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Tipo                        | Descrição                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `IntlayerState`             | Objeto de estado contendo `locale`, `defaultLocale` e `availableLocales` armazenado no contexto Remix. |
| `IntlayerMiddlewareOptions` | Opções de configuração passadas para o middleware `intlayer()`.                                        |
| `LocaleRoutingOptions`      | Opções que personalizam prefixos de locale, detecção e redirecionamentos.                              |
| `LocaleRoutingAction`       | União discriminada representando a decisão de roteamento: `redirect`, `rewrite` ou `pass`.             |
| `LocaleRoutingRequest`      | Representação mínima de requisição exigida por `createLocaleRouting`.                                  |
| `UseLocaleResult`           | Tipo de retorno de `useLocale()`, contendo `locale`, `defaultLocale` e `availableLocales`.             |
