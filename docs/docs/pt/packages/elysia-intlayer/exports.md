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

```bash
npm install elysia-intlayer
```

## Exportações

### Plugin

Importação:

```tsx
import { intlayer } from "elysia-intlayer";
```

| Função     | Descrição                                                                                                                                                                                                                                                                                                                          | Documento Relacionado                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Elysia que integra o Intlayer na sua aplicação Elysia. Trata da deteção do locale a partir do storage (cookies, headers) e depois de `Accept-Language`, injeta um objeto `intlayer` que expõe `locale`, `t`, `getIntlayer` e `getDictionary` no contexto da rota, e configura o contexto de request do `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/elysia-intlayer/intlayer.md) |

### Funções

Importação:

```tsx
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Função          | Descrição                                                                                                                                                                                                                                                           | Documento Relacionado                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Função de tradução global que obtém o conteúdo para o locale atual no Elysia. Usa `AsyncLocalStorage` para aceder ao contexto de request configurado pelo plugin `intlayer` e recorre ao locale por omissão fora dele. Também acessível através de `intlayer.t`.    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getIntlayer`   | Obtém um dicionário pela sua chave a partir da declaração gerada e devolve o seu conteúdo para o locale atual. Versão otimizada de `getDictionary`. Usa `AsyncLocalStorage` para aceder ao contexto da request. Também acessível através de `intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Processa objetos de dicionário e devolve o conteúdo para o locale atual. Processa traduções `t()`, enumerações, markdown, HTML, etc. Usa `AsyncLocalStorage` para aceder ao contexto da request. Também acessível através de `intlayer.getDictionary`.              | -                                                                                                      |

### Tipos

Importação:

```tsx
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Tipo                | Descrição                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IntlayerContext`   | Forma do objeto `intlayer` injetado em cada contexto de rota: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Assinatura da função de tradução, que traduz um locale map no conteúdo correspondente ao locale da request atual.                                                  |
