---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: Veja como usar a função getIntlayerAsync para o pacote intlayer
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
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentação: Função `getIntlayerAsync` em `intlayer`

## Descrição

A função `getIntlayerAsync` seleciona um dicionário pela sua chave e resolve seu conteúdo para uma localidade específica, **carregando apenas essa localidade**.

É o equivalente assíncrono de [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md), destinado aos locais onde um dicionário é lido fora da renderização — construtores de rota `head` / metadados, loaders, funções de servidor.

Enquanto `getIntlayer` carrega o dicionário mesclado contendo cada localidade, os [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) reescrevem esta chamada em `getDictionaryAsync(loaderMap, key, locale)`, apontando para os chunks por localidade em `.intlayer/dynamic_dictionaries/`. O bundle portanto nunca carrega mais do que a localidade realmente solicitada.

Sem esses plugins — uma build não otimizada — a chamada é resolvida através do registro de dicionário síncrono: o mesmo conteúdo, sem a divisão por localidade.

**Principais Funcionalidades:**

- As mesmas chaves digitadas, seletores e conteúdo retornado que `getIntlayer`
- Carrega apenas o chunk da localidade solicitada em builds otimizadas
- Chamadas simultâneas para o mesmo chunk compartilham um único carregamento
- Seguro de usar em construtores de metadados `async`, loaders e funções de servidor

---

## Function Signature

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Obrigatório
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                         // Opcional
): Promise<DeepTransformContent<...>>
```

---

## Parâmetros

- `key: DictionaryKeys`
  - **Description**: A chave do dicionário a ser lida, conforme declarado em seus arquivos de conteúdo.
  - **Type**: `DictionaryKeys` — uma união de todas as chaves de dicionário declaradas.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: A localidade para interpretar o conteúdo, ou um objeto seletor para [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md).
    - `'fr'` — uma localidade
    - `{ item: 2 }` — um item de [coleção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/collections.md) (omita `item` para obter todos os itens como um array)
    - `{ variant: 'black-friday' }` — uma [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md) nomeada (omita para a `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — uma variante estruturada
    - Qualquer seletor pode carregar uma localidade: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Transformadores de nó customizados que substituem os plugins do interpretador base. Apenas para uso avançado.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Retorna

- **Type**: `Promise<Content>` — uma promessa que resolve para o conteúdo interpretado do dicionário, tipado a partir da sua declaração.

---

## Exemplo de Uso

### Uso Básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Returns            | O conteúdo                                                                                                      | Uma promise do conteúdo                                   |
| Dictionary loaded  | O dicionário mesclado (todos os locales)                                                                        | O chunk do locale solicitado apenas                       |
| Best suited for    | Renderização, caminhos de código síncronos                                                                      | Metadata, loaders, funções de servidor                    |
| Requires a plugin? | Não                                                                                                             | Não — a divisão por locale necessita dos plugins de build |

Both accept the same arguments and return the same content: switching from one to the other only changes **when** and **how much** is loaded.

---

## Funções Relacionadas

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md): Equivalente síncrono que lê o dicionário mesclado.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getDictionaryAsync.md): A função de nível inferior que os plugins de build reescrevem esta chamada em.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocale.md): Detecta o locale de uma requisição de entrada.

---

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
