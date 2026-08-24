---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do plugin intlayerPrune para Vite | vite-intlayer
description: Veja como usar o plugin intlayerPrune do pacote vite-intlayer
keywords:
  - intlayerPrune
  - vite
  - plugin
  - tree-shaking
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Doc inicial"
author: aymericzip
---

# Documentação do plugin intlayerPrune para Vite

O plugin Vite `intlayerPrune` é usado para realizar tree-shaking e podar dicionários não utilizados do bundle da sua aplicação. Isso ajuda a reduzir o tamanho final do bundle incluindo apenas o conteúdo multilíngue necessário.

> O plugin já está incluído e configurado automaticamente quando você usa [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md). Você só precisa registrá-lo manualmente se estiver compondo a pilha de plugins você mesmo.

## Utilização

### Como parte de `intlayer()` (recomendado)

Ative a poda através da sua configuração Intlayer e o plugin principal trata de tudo:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // ativa poda e minificação
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### Standalone

Se você está compondo a pilha de plugins manualmente, `intlayerPrune` e `intlayerMinify` compartilham um objeto `PruneContext` que deve ser criado uma vez e passado para ambos:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // opcional, lê do mesmo contexto
  ],
});
```

## Como funciona

### 1. Análise de uso (buildStart)

Durante `buildStart`, o plugin `intlayerOptimize` (também parte de `intlayer()`) verifica cada arquivo de código-fonte de componente listado em `build.filesList`. Para cada chamada `useIntlayer('key')` ou `getIntlayer('key')`, ele registra exatamente quais campos são acessados, por exemplo:

```ts
const { title, description } = useIntlayer("myDict");
// registra: myDict → { title, description }
```

Isso constrói `pruneContext.fieldUsageMap` antes de qualquer chamada `transform` ser executada.

### 2. JSON pruning (transform, enforce: 'pre')

When Vite processes a compiled dictionary JSON file, `intlayerPrune` intercepts it before Vite's built-in JSON → ESM conversion. It reads the field-usage map from `pruneContext` and removes any content field that is not in the recorded usage set.

Two content shapes are supported:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Fields are pruned per-locale inside `translation`.
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Fields are pruned at the top level.

### 3. Casos extremos

Se a estrutura de conteúdo de um dicionário não puder ser reconhecida (por exemplo, uma forma aninhada incomum), ele será adicionado a `pruneContext.dictionariesWithEdgeCases` e **deixado intocado**. Um aviso é registrado. `intlayerMinify` também ignora esses dicionários.

### 4. Mapa de renomeação de campos

Quando a limpeza tem sucesso, `intlayerPrune` também escreve `pruneContext.dictionaryKeyToFieldRenameMap` — um mapeamento de nomes de campos originais para aliases curtos. `intlayerMinify` lê este mapa para renomear campos no JSON de saída, e a passagem de renomeação Babel de `intlayerOptimize` atualiza os acessos de propriedades nos arquivos fonte de acordo.

## Condições de ativação

`intlayerPrune` está ativo **apenas** quando todas as seguintes condições são verdadeiras:

1. O comando Vite é `build`.
2. `build.optimize` é `true` (ou `undefined`, que assume como padrão `true` para builds).
3. `build.purge` é `true` na sua configuração do Intlayer.

Ele permanece ativo quando `editor.enabled` é `true`: o editor visual resolve cada edição por meio de `dictionaryKey` + `keyPath` em relação aos dicionários não mesclados, que este plugin nunca toca, e um campo removido é um campo que nenhum componente lê — portanto, nunca é renderizado nem selecionável na página.
