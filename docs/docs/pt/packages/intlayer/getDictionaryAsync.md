---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentação da Função getDictionaryAsync | intlayer
description: Veja como usar a função getDictionaryAsync para o pacote intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentação: Função `getDictionaryAsync` em `intlayer`

## Descrição

A função `getDictionaryAsync` carrega um **único chunk de locale** de um dicionário e retorna seu conteúdo interpretado.

É a contrapartida de [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getDictionary.md) para os mapas de loader por locale emitidos em `.intlayer/dynamic_dictionaries/`: em vez de receber um dicionário contendo cada locale, ele recebe o mapa de loader e aguarda apenas o chunk que o locale solicitado necessita.

> No código da aplicação você normalmente chama [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayerAsync.md), não esta função. Os [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) reescrevem cada chamada `getIntlayerAsync('key', locale)` em uma `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` é exportado para loaders customizados e para ferramentas que constroem seus próprios mapas de loader.

**Características principais:**

- Carrega apenas o chunk de locale que é solicitado
- Suporta mapas de loader simples (`locale → loader`) e qualificados (`locale → qualifierId → loader`)
- Deduplica carregamentos simultâneos do mesmo chunk e cacheia o conteúdo resolvido
- Carregamentos falhados são removidos do cache para que uma chamada posterior tente novamente o chunk

---

## Assinatura da Função

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Obrigatório
  key: string,                                           // Obrigatório
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                                    // Opcional
): Promise<DeepTransformContent<...>>
```

---

## Parâmetros

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: O mapa de loader por locale. Mapas simples associam um locale com um loader; mapas qualificados (usados por coleções e variantes) associam um locale com um id de qualificador, depois com um loader. Para um mapa qualificado, apenas o(s) chunk(s) que o seletor alvo carrega(m).
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Sim

- `key: string`
  - **Description**: A chave do dicionário, usada para nomear o cache do chunk.
  - **Type**: `string`
  - **Required**: Sim

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: O locale para interpretar o conteúdo com, ou um objeto seletor (`{ item }`, `{ variant }`, opcionalmente com `locale`). Veja [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: Não (Opcional) — padrão para o `defaultLocale` configurado.

- `plugins: Plugins[]`
  - **Description**: Node transformers. Padrão para o conjunto de intérprete base.
  - **Type**: `Plugins[]`
  - **Required**: Não (Opcional)

### Retorna

- **Type**: `Promise<Content>` — uma promise resolvendo para o conteúdo interpretado do chunk carregado.
- **Description**: Resolve para `null` quando o map não emite nenhum chunk para a locale solicitada nem para nenhum de seus fallbacks, espelhando como uma coordenada qualificada ausente é resolvida.

---

## Exemplo de Uso

### Com um mapa de loader gerado

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Com um mapa de carregador personalizado

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Com um seletor em um mapa qualificado

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Notas de Comportamento

### Caching e deduplicação

O cache armazena a **promise** de cada tripla `key + locale + selector`, então chamadas concorrentes para o mesmo chunk aguardam um único carregamento. Um carregamento rejeitado é removido do cache, então um chunk que falha é retentado na próxima chamada em vez de repetir a mesma falha para sempre.

### Fallback de locale

Um mapa de loader simples é percorrido ao longo da mesma cadeia de fallback que o modo síncrono: a locale solicitada primeiro, depois seus fallbacks, depois `null` se nenhum emitir um chunk.

---

## Funções Relacionadas

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayerAsync.md): A função que as aplicações chamam; os plugins de build reescrevem-na em `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getDictionary.md): Equivalente síncrono que recebe um dicionário completo.
- [Dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md): Coleções e variantes, e os mapas de loader que geram.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
