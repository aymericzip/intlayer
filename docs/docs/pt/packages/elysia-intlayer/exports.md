---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentação do pacote elysia-intlayer
description: Plugin Elysia para o Intlayer, fornecendo funções de tradução e detecção de locale.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Documentação unificada para todas as exportações"
author: aymericzip
---

# Pacote elysia-intlayer

O pacote `elysia-intlayer` fornece um plugin para aplicações Elysia para tratar da internacionalização. Ele deteta o locale do utilizador e injeta um objeto `intlayer` no contexto da rota.

## Instalação

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` é uma peer dependency (`>=1.0.0`). O Elysia tem como alvo o runtime **Bun**.

## Exportações

### Plugin

Importação:

```ts
import { intlayer } from "elysia-intlayer";
```

| Função     | Descrição                                                                                                                                                                                                                                                                                                                          | Documento Relacionado                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia que integra o Intlayer na sua aplicação Elysia. Trata da deteção do locale a partir do storage (cookies, headers) e depois de `Accept-Language`, injeta um objeto `intlayer` que expõe `locale`, `t`, `getIntlayer` e `getDictionary` no contexto da rota, e configura o contexto de request do `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/elysia-intlayer/intlayer.md) |

### Funções

Importação:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Função          | Descrição                                                                                                                                                                                                                                                           | Documento Relacionado                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Função de tradução global que obtém o conteúdo para o locale atual no Elysia. Usa `AsyncLocalStorage` para aceder ao contexto de request configurado pelo plugin `intlayer` e recorre ao locale por omissão fora dele. Também acessível através de `intlayer.t`.    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getIntlayer`   | Obtém um dicionário pela sua chave a partir da declaração gerada e devolve o seu conteúdo para o locale atual. Versão otimizada de `getDictionary`. Usa `AsyncLocalStorage` para aceder ao contexto da request. Também acessível através de `intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Processa objetos de dicionário e devolve o conteúdo para o locale atual. Processa traduções `t()`, enumerações, markdown, HTML, etc. Usa `AsyncLocalStorage` para aceder ao contexto da request. Também acessível através de `intlayer.getDictionary`.              | -                                                                                                      |

### Tipos

Importação:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tipo                | Descrição                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerContext`   | Forma do objeto `intlayer` injetado em cada contexto de rota: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Assinatura da função de tradução, que traduz um locale map no conteúdo correspondente ao locale da request atual.                                                  |

## Uso

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Carregue o plugin de internacionalização
  .use(intlayer())
  // Ler a locale e os helpers do contexto da rota
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      pt: "Olá",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Ou usar os helpers standalone, vinculados à requisição atual
  .get("/t_example", () =>
    t({
      pt: "Exemplo de conteúdo retornado em português",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> O plugin registra seu contexto por meio de um `derive` **global**, que o Elysia tipa como `Partial<{ intlayer: IntlayerContext }>`. Em tempo de execução o valor está sempre presente para as rotas registradas após `.use(intlayer())`, portanto use a non-null assertion (`intlayer!.locale`) — ou optional chaining — para satisfazer o TypeScript no modo `strict`.

## Documentação relacionada

- [Elysia i18n - Guia completo para traduzir sua aplicação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_elysia.md)
- [Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)
