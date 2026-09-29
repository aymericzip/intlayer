---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: "Documentação da função getIntlayerAsync | intlayer"
description: "Use getIntlayerAsync para carregar e ler o conteúdo de um dicionário para um único locale, sem incluir os outros idiomas."
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
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
  - getIntlayerAsync
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "Sem locale, aguarda o locale da requisição (headers e cookies do Next.js)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentação inicial"
author: aymericzip
---

# Documentação: Função `getIntlayerAsync` em `intlayer`

## Descrição

A função `getIntlayerAsync` seleciona um dicionário pela sua chave e resolve seu conteúdo para uma localidade específica, **carregando apenas essa localidade**.

É o equivalente assíncrono de [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md), destinado aos locais onde um dicionário é lido fora da renderização, construtores de rota `head` / metadados, loaders, funções de servidor.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md)

Enquanto `getIntlayer` carrega o dicionário mesclado contendo cada localidade, os [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) reescrevem esta chamada em `getDictionaryAsync(loaderMap, key, locale)`, apontando para os chunks por localidade em `.intlayer/dynamic_dictionaries/`. O bundle portanto nunca carrega mais do que a localidade realmente solicitada.

- [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)

Sem esses plugins, uma build não otimizada, a chamada é resolvida através do registro de dicionário síncrono: o mesmo conteúdo, sem a divisão por localidade.

**Principais Funcionalidades:**

- As mesmas chaves digitadas, seletores e conteúdo retornado que `getIntlayer`
- Carrega apenas o chunk da localidade solicitada em builds otimizadas
- Chamadas simultâneas para o mesmo chunk compartilham um único carregamento
- Seguro de usar em construtores de metadados `async`, loaders e funções de servidor

## Assinatura da função

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Obrigatório
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                         // Opcional
): Promise<DeepTransformContent<...>>
```

## Parâmetros

- `key: DictionaryKeys`
  - **Descrição**: A chave do dicionário a ser lida, conforme declarado em seus arquivos de conteúdo.
  - **Tipo**: `DictionaryKeys`, uma união de todas as chaves de dicionário declaradas.
  - **Obrigatório**: Sim

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Descrição**: A localidade para interpretar o conteúdo, ou um objeto seletor para [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md).
    - `'fr'`: uma localidade
    - `{ item: 2 }`: um item de [coleção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/collections.md) (omita `item` para obter todos os itens como um array)
    - `{ variant: 'black-friday' }`: uma [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md) nomeada (omita para a `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: uma variante estruturada
    - Qualquer seletor pode carregar uma localidade: `{ item: 2, locale: 'fr' }`
  - **Tipo**: `LocalesValues | DictionarySelector`
  - **Obrigatório**: Não (opcional). Se omitido, é resolvido como em [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md) (locale da requisição, depois locale armazenado, depois `defaultLocale`). Por ser assíncrona, também pode aguardar o locale da requisição quando ele só pode ser lido de forma assíncrona: nos Server Components do Next.js, em `generateMetadata` e nos route handlers, ela lê os `headers()` e `cookies()` da requisição, como `getLocale()` de `next-intlayer/server`. Essa leitura faz a rota passar para renderização dinâmica, por isso só acontece quando o `IntlayerProvider` ainda não forneceu o locale.

- `plugins: Plugins[]`
  - **Descrição**: Transformadores de nó customizados que substituem os plugins do interpretador base. Apenas para uso avançado.
  - **Tipo**: `Plugins[]`
  - **Obrigatório**: Não (opcional)

### Retorna

- **Tipo**: `Promise<Content>`, uma promessa que resolve para o conteúdo interpretado do dicionário, tipado a partir da sua declaração.

## Exemplo de Uso

### Uso Básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Returns            | O conteúdo                                                                                                      | Uma promise do conteúdo                                  |
| Dictionary loaded  | O dicionário mesclado (todos os locales)                                                                        | O chunk do locale solicitado apenas                      |
| Best suited for    | Renderização, caminhos de código síncronos                                                                      | Metadata, loaders, funções de servidor                   |
| Requires a plugin? | Não                                                                                                             | Não, a divisão por locale necessita dos plugins de build |

Ambas aceitam os mesmos argumentos e retornam o mesmo conteúdo: trocar uma pela outra só muda **quando** e **quanto** é carregado.

## Funções Relacionadas

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocale.md)

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
