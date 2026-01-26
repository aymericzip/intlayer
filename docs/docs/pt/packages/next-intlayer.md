---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote next-intlayer
description: Integração específica do Next.js para o Intlayer, fornecendo middleware e provedores para App Router e Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote next-intlayer

O pacote `next-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Next.js. Suporta tanto o App Router quanto o Page Router, incluindo middleware para roteamento baseado em locale.

## Instalação

```bash
npm install next-intlayer
```

## Exportações

### Middleware

| Função               | Descrição                                                                              |
| -------------------- | -------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware do Next.js para lidar com roteamento baseado em locale e redirecionamentos. |

### Provedores

| Componente               | Descrição                                                              |
| ------------------------ | ---------------------------------------------------------------------- |
| `IntlayerClientProvider` | Provedor para componentes do lado do cliente no Next.js.               |
| `IntlayerServerProvider` | Provedor para componentes do lado do servidor no Next.js (App Router). |

### Hooks (Lado do cliente)

Reexporta a maioria dos hooks de `react-intlayer`.

| Hook            | Descrição                                                  |
| --------------- | ---------------------------------------------------------- |
| `useIntlayer`   | Seleciona um dicionário pelo seu key e retorna o conteúdo. |
| `useDictionary` | Seleciona um dicionário pelo seu key e retorna o conteúdo. |
| `useLocale`     | Retorna a locale atual e uma função para defini-la.        |
| `useI18n`       | Retorna os valores do contexto Intlayer atual.             |

### Funções (Server-side)

| Função                 | Descrição                                                           |
| ---------------------- | ------------------------------------------------------------------- |
| `t`                    | Versão server-side da função de tradução para o Next.js App Router. |
| `generateStaticParams` | Gera parâmetros estáticos para as rotas dinâmicas do Next.js.       |

### Tipos

| Tipo                 | Descrição                                          |
| -------------------- | -------------------------------------------------- |
| `NextPageIntlayer`   | Tipo para páginas Next.js com suporte ao Intlayer. |
| `NextLayoutIntlayer` | Tipo para layouts Next.js com suporte ao Intlayer. |
