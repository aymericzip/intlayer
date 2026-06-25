---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Documentação do plugin Vite intlayerMinify | vite-intlayer
description: Plugin do Vite que minifica os arquivos JSON de dicionário compilados do Intlayer e, opcionalmente, ofusca os nomes dos campos de conteúdo para reduzir o tamanho do bundle.
keywords:
  - intlayerMinify
  - vite
  - plugin
  - minificar
  - tamanho do bundle
  - dicionário
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Inicialização da doc"
author: aymericzip
---

# intlayerMinify

O `intlayerMinify` é um plugin do Vite que minifica arquivos JSON de dicionário compilados durante um build de produção. Ele remove todos os espaços em branco desnecessários e, quando combinado com o `intlayerPrune`, opcionalmente renomeia os nomes dos campos de conteúdo para apelidos (aliases) alfabéticos curtos (`a`, `b`, `c`, …) para reduzir ainda mais o tamanho do bundle.

> O plugin já está incluído e configurado automaticamente quando você usa o [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md). Você só precisa registrá-lo manualmente se estiver compondo a pilha de plugins por conta própria.

## Uso

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## Condições de ativação

O `intlayerMinify` fica ativo **apenas** quando todas as três condições a seguir forem verdadeiras:

1. O comando do Vite é `build` (não `serve` / dev).
2. `build.optimize` é `true` (ou `undefined`, que assume o padrão `true` para builds).
3. `build.minify` é `true` na sua configuração do Intlayer.

Ele é desativado automaticamente quando `editor.enabled` é `true` porque o editor precisa do conteúdo do dicionário completo e legível por humanos.

## O que é minificado

O plugin tem como alvo dois locais de dicionário (conforme resolvido a partir de `intlayer.system`):

- `dictionariesDir` — dicionários estáticos de todos os idiomas (ex: `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — dicionários dinâmicos por idioma

> Os dicionários no modo fetch (`fetchDictionariesDir`) **nunca** são minificados porque são servidos a partir de uma API remota em tempo de execução usando seus nomes de campo originais. Renomear os campos criaria uma incompatibilidade entre a resposta do servidor e os acessos às propriedades no lado do cliente.

## Ofuscação de nomes de campos (minificação de propriedades)

Quando o `intlayerPrune` analisa o código-fonte e preenche `pruneContext.dictionaryKeyToFieldRenameMap`, o `intlayerMinify` também renomeia os nomes dos campos de conteúdo para aliases curtos. Por exemplo:

```json
// antes
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// depois (com ofuscação)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

Os acessos correspondentes às propriedades do arquivo fonte são renomeados pela passagem do Babel dentro do `intlayerOptimize`, de modo que o comportamento em tempo de execução permanece inalterado.

Campos internos do Intlayer (`nodeType`, `translation`, etc.) nunca são renomeados.

## Dicionários de casos extremos (Edge-cases)

Dicionários sinalizados em `pruneContext.dictionariesWithEdgeCases` (anomalias estruturais detectadas durante a fase de eliminação) são ignorados inteiramente — não são minificados nem ofuscados — para evitar o envio de dados corrompidos.

## Grupos qualificados (coleções / variantes / registros meta)

Para dicionários com uma matriz `qualifierTypes` (coleções, variantes e registros meta), o plugin preserva a matriz `qualifierTypes` e o mapa lateral `meta` literalmente. Apenas as entradas de `content` têm seus nomes de campo ofuscados. As chaves compostas (usadas para correspondência de seletores em tempo de execução) nunca são tocadas.
