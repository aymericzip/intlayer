---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Documentação do pacote astro-intlayer
description: Integração Astro para Intlayer, fornecendo configuração para roteamento baseado em locale, middleware, hooks, store de cliente e gestão de dicionários.
keywords:
  - astro-intlayer
  - astro
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Adicionada documentação dos hooks useIntlayer, useDictionary, useLocale, do middleware e dos formatadores"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentação unificada para todas as exportações"
author: aymericzip
---

# Pacote astro-intlayer

O pacote `astro-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Astro. Ele configura o roteamento baseado em locale, gerenciamento de dicionários, reescrita de páginas no momento da compilação, middleware de requisição e hooks para acessar conteúdo multilíngue tanto em componentes `.astro` renderizados no servidor quanto em scripts do lado do cliente.

## Instalação

```bash
npm install astro-intlayer
```

## Exportações

### Integração

O pacote `astro-intlayer` fornece uma integração Astro que configura o Intlayer no seu projeto.

Importação:

```tsx
import { intlayer } from "astro-intlayer";
```

ou importação padrão em `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Função     | Descrição                                                                                                                                                                                                     | Documentação relacionada                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Integração Astro que prepara dicionários, configura plugins Vite (aliases, proxy de roteamento, poda), registra automaticamente middleware de requisição e emite páginas pré-renderizadas em URLs reescritas. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/intlayer.md) |

### Hooks (Servidor e Cliente)

Importação:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Hook            | Descrição                                                                                                                                                                             | Documentação relacionada                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Seleciona um dicionário por sua chave e retorna seu conteúdo localizado. No frontmatter `.astro`, lê o locale da requisição de `Astro.locals`. Em `<script>`, lê da store do cliente. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Transforma um objeto dicionário e retorna conteúdo para o locale resolvido. Funciona no frontmatter e em scripts do cliente.                                                          | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Retorna o locale atual, o locale padrão, os locales disponíveis e uma função para atualizar o locale.                                                                                 | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Importação:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Exportação  | Tipo                | Descrição                                                                                                                                                               | Documentação relacionada                                                                                        |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware Astro que detecta o locale da requisição e anexa `Astro.locals.intlayer`. Registrado automaticamente por `intlayer()`, ou importado manualmente para compor. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/astro-intlayer/onRequest.md) |

### Utilitários

Importação:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Função              | Descrição                                                                                                                       | Documentação relacionada |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `getIntlayerLocals` | Função auxiliar para recuperar o objeto `IntlayerLocals` atual do escopo de armazenamento da requisição fora de `Astro.locals`. | -                        |

### Utilitários de Cliente (astro-intlayer/client)

Importação:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

Quando importado no navegador ou dentro de tags `<script>` do cliente, `astro-intlayer` mapeia automaticamente para `astro-intlayer/client` (alimentado por `vanilla-intlayer`), fornecendo getters de dicionário do lado do cliente, assinantes da store e ferramentas de persistência de locale.

### Formatadores (astro-intlayer/format)

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
} from "astro-intlayer/format";
```

| Hook              | Descrição                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Retorna uma instância Intl vinculada ao locale com recursos de cache e assinatura.                        |
| `useDate`         | Retorna uma função de formatação de data vinculada ao locale atual (`Intl.DateTimeFormat`).               |
| `useNumber`       | Retorna uma função de formatação de número vinculada ao locale atual (`Intl.NumberFormat`).               |
| `useCurrency`     | Retorna uma função de formatação de moeda vinculada ao locale atual.                                      |
| `usePercentage`   | Retorna uma função de formatação de porcentagem vinculada ao locale atual.                                |
| `useRelativeTime` | Retorna uma função de formatação de tempo relativo vinculada ao locale atual (`Intl.RelativeTimeFormat`). |
| `useList`         | Retorna uma função de formatação de lista vinculada ao locale atual (`Intl.ListFormat`).                  |
| `useUnit`         | Retorna uma função de formatação de unidade vinculada ao locale atual.                                    |
| `useCompact`      | Retorna uma função de formatação de número compacto vinculada ao locale atual (ex.: `1.5K`).              |

### Utilitários HTML (astro-intlayer/html)

Importação:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Exportação        | Tipo       | Descrição                                                        |
| ----------------- | ---------- | ---------------------------------------------------------------- |
| `renderHTML`      | `Function` | Função utilitária independente para renderizar nós HTML.         |
| `useHTML`         | `Hook`     | Hook para obter o contexto e configuração do provedor HTML.      |
| `useHTMLRenderer` | `Hook`     | Hook para obter uma função de renderização HTML pré-configurada. |

### Utilitários Markdown (astro-intlayer/markdown)

Importação:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Exportação            | Tipo       | Descrição                                                            |
| --------------------- | ---------- | -------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Compila strings markdown em uma representação estruturada.           |
| `renderMarkdown`      | `Function` | Renderiza conteúdo markdown em nós de saída.                         |
| `parseMarkdown`       | `Function` | Analisa conteúdo markdown bruto em uma AST.                          |
| `useMarkdown`         | `Hook`     | Hook para obter o contexto do provedor markdown.                     |
| `useMarkdownRenderer` | `Hook`     | Hook para obter uma função de renderização Markdown pré-configurada. |

### Tipos

Importação:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Tipo              | Descrição                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | O objeto anexado a `Astro.locals.intlayer` contendo `locale`, `defaultLocale` e `availableLocales`. |
| `UseLocaleProps`  | Propriedades de configuração opcionais aceitas por `useLocale()`.                                   |
| `UseLocaleResult` | O tipo de retorno de `useLocale()`, fornecendo propriedades de locale e métodos de atualização.     |
