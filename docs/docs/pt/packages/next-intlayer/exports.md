---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote next-intlayer
description: Integração específica para Next.js com o Intlayer, fornecendo middleware e providers para App Router e Page Router.
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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote next-intlayer

O pacote `next-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Next.js. Ele oferece suporte tanto ao App Router quanto ao Page Router, incluindo middleware para roteamento baseado em locale.

## Instalação

```bash
npm install next-intlayer
```

## Exportações

### Middleware

Importação:

```tsx
import "next-intlayer/middleware";
```

| Função               | Descrição                                                                                                                                                                                | Doc Relacionado                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware do Next.js para lidar com roteamento e redirecionamentos baseados em locale. Detecta o locale a partir dos headers/cookies e redireciona para o caminho de locale apropriado. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/intlayerMiddleware.md) |

### Auxiliares de Configuração

Import:

```tsx
import "next-intlayer/server";
```

| Função             | Descrição                                                                                                                                                                                                  | Doc Relacionado |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `withIntlayer`     | Auxiliar assíncrono para envolver a configuração do Next.js, garantindo que os dicionários do Intlayer estejam preparados antes da build. Prepara arquivos de conteúdo e configura plugins do webpack/SWC. | -               |
| `withIntlayerSync` | Auxiliar síncrono para envolver a configuração do Next.js, ideal para configurações onde async não é possível/desejado. Não prepara os dicionários na inicialização do servidor.                           | -               |

### Provedores

Importar:

```tsx
import "next-intlayer";
```

ou

```tsx
import "next-intlayer/server";
```

| Componente               | Descrição                                                                                                                          | Doc Relacionado |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `IntlayerClientProvider` | Provider para componentes do lado do cliente no Next.js App Router. Envolve o `IntlayerProvider` do react-intlayer.                | -               |
| `IntlayerServerProvider` | Provider para componentes do lado do servidor no Next.js (App Router). Fornece o contexto de locale no servidor.                   | -               |
| `IntlayerServer`         | Wrapper do lado do servidor para conteúdo do Intlayer no App Router. Garante o tratamento adequado de locale em Server Components. | -               |
| `HTMLProvider`           | Provider para configurações de internacionalização relacionadas a HTML. Permite sobrescrever componentes para tags HTML.           | -               |
| `HTMLRenderer`           | Renderiza conteúdo HTML com componentes personalizados.                                                                            | -               |
| `MarkdownProvider`       | Provider para o contexto de renderização Markdown. Permite sobrescrever componentes personalizados para elementos Markdown.        | -               |
| `MarkdownRenderer`       | Renderiza conteúdo Markdown com componentes personalizados.                                                                        | -               |

### Hooks (Lado do Cliente)

Importação:

```tsx
import "next-intlayer";
```

Re-exporta a maioria dos hooks de `react-intlayer`.

| Hook                   | Descrição                                                                                                                                           | Documento Relacionado                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook do lado do cliente que seleciona um dicionário pela sua key e retorna seu conteúdo. Usa a locale do contexto se não for fornecida.             | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook que transforma um objeto dicionário e retorna o conteúdo para a locale atual. Processa traduções `t()`, enumerações, etc.                      | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook que lida com dicionários assíncronos. Aceita um mapa de dicionários baseado em Promise e resolve-o para o locale atual.                        | -                                                                                                                       |
| `useDictionaryDynamic` | Hook que lida com dicionários dinâmicos carregados por chave. Usa React Suspense internamente para estados de carregamento.                         | -                                                                                                                       |
| `useLocale`            | Hook do lado do cliente para obter a locale atual e uma função para defini-la. Aprimorado para o App Router do Next.js com suporte à navegação.     | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook do lado do cliente para gerenciar reescritas de URL. Atualiza automaticamente a URL se existir uma regra de reescrita localizada mais legível. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook específico do Page Router do Next.js para gerenciamento de locale. Trata redirecionamentos e recarregamentos de página ao alterar o locale.    | -                                                                                                                       |
| `useI18n`              | Hook que fornece uma função de tradução `t()` para acessar conteúdo aninhado por chave. Imita o padrão i18next/next-intl.                           | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook que fornece um objeto `Intl` vinculado à locale. Injeta automaticamente a locale atual e utiliza cache otimizado.                              | -                                                                                                                       |
| `useLoadDynamic`       | Hook para carregar dicionários dinâmicos usando React Suspense. Aceita uma chave e uma promise, e faz cache dos resultados.                         | -                                                                                                                       |
| `useHTMLRenderer`      | Hook para obter uma função de renderização de HTML pré-configurada.                                                                                 | -                                                                                                                       |
| `useMarkdownRenderer`  | Hook para obter uma função de renderização de Markdown pré-configurada.                                                                             | -                                                                                                                       |

### Funções (Server-side)

Importe:

```tsx
import "next-intlayer/server";
```

| Função                 | Descrição                                                                                                                                                    | Documento relacionado                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Versão do lado do servidor da função de tradução para o Next.js App Router. Retorna a tradução de conteúdo multilíngue para a locale do servidor.            | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getLocale`            | Função helper para extrair a locale atual a partir dos headers e cookies do Next.js. Projetada para Server Components, Server Actions ou Route Handlers.     | -                                                                                                      |
| `generateStaticParams` | Gera parâmetros estáticos para as rotas dinâmicas do Next.js com base nas locales configuradas. Retorna um array de objetos de locale para pré-renderização. | -                                                                                                      |
| `locale`               | Função para obter ou definir o locale no contexto do servidor (App Router). Fornece gerenciamento de locale em Server Components.                            | -                                                                                                      |

### Tipos

Import:

```tsx
import "next-intlayer";
```

| Tipo                   | Descrição                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `NextPageIntlayer`     | Tipo para páginas Next.js com suporte ao Intlayer. Tipo genérico que inclui parâmetro de locale.                                     |
| `Next14PageIntlayer`   | Tipo para páginas Next.js 14 com suporte ao Intlayer.                                                                                |
| `Next15PageIntlayer`   | Tipo para páginas Next.js 15 com suporte ao Intlayer.                                                                                |
| `NextLayoutIntlayer`   | Tipo para layouts Next.js com suporte ao Intlayer. Tipo genérico que inclui parâmetro de locale.                                     |
| `Next14LayoutIntlayer` | Tipo para layouts do Next.js 14 com suporte ao Intlayer.                                                                             |
| `Next15LayoutIntlayer` | Tipo para layouts do Next.js 15 com suporte ao Intlayer.                                                                             |
| `LocalParams`          | Tipo para parâmetros de rota do Next.js com locale. Objeto com propriedade `locale`.                                                 |
| `LocalPromiseParams`   | Tipo para parâmetros de rota do Next.js com locale (versão assíncrona). Promise que resolve para um objeto com propriedade `locale`. |
