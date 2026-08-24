---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentação da Função getDictionary | intlayer
description: Veja como usar a função getDictionary para o pacote intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentação inicial"
author: aymericzip
---

# Documentação: Função `getDictionary` em `intlayer`

## Description

A função `getDictionary` interpreta um objeto de dicionário **que você passa você mesmo** e retorna seu conteúdo resolvido para um local específico. Ela percorre o conteúdo em uma única passagem e aplica cada plugin de interpretador conforme necessário, resolvendo traduções `t()`, enumerações, condições, inserções, aninhamento, markdown, HTML e nós de arquivo.

Diferentemente de [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md), que procura um dicionário por chave no registro gerado, `getDictionary` recebe o próprio dicionário. Isso o torna a ferramenta certa para conteúdo construído em tempo de execução, buscado de uma API ou CMS, ou declarado inline em um teste.

**Principais Características:**

- Funciona com qualquer objeto seguindo a estrutura de dicionário (`{ key, content }`)
- Também aceita um grupo de dicionário qualificado (coleções, variantes) junto com um seletor
- Totalmente tipado: o objeto retornado espelha o `content` que você passou
- Aceita plugins de interpretador personalizados

---

## Function Signature

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Obrigatório
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                                // Opcional
): DeepTransformContent<...>
```

---

## Parâmetros

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Descrição**: O dicionário (ou grupo de dicionários qualificados) a ser interpretado.
  - **Tipo**: `Dictionary | QualifiedDictionaryGroup`
  - **Obrigatório**: Sim

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Descrição**: A localidade para interpretar o conteúdo, ou um objeto seletor (`{ item }`, `{ variant }`, opcionalmente com `locale`). Veja [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md).
  - **Tipo**: `LocalesValues | DictionarySelector`
  - **Obrigatório**: Não (Opcional) — padrão é o `defaultLocale` configurado.

- `plugins: Plugins[]`
  - **Descrição**: Um array de transformadores de nó definindo como nós reconhecidos são interpretados. Se omitido, o conjunto padrão de plugins do interpretador é usado.
  - **Tipo**: `Plugins[]`
  - **Obrigatório**: Não (Opcional)

### Retorna

- **Tipo**: O conteúdo interpretado do dicionário.
- **Descrição**: O `content` que você passou, com cada nó do Intlayer resolvido para a localidade solicitada. Para um grupo de coleção sem um seletor `item`, um array ordenado de entradas interpretadas é retornado; `null` é retornado quando o seletor não visa nada.

---

## Exemplo de Uso

### Uso Básico

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        pt: "Olá",
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "pt"
);

console.log(content.greeting); // "Olá"
```

### Interpretando conteúdo obtido em tempo de execução

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Com um seletor

```typescript
import { getDictionary } from "intlayer";

// Um grupo de dicionário qualificado é resolvido para uma única entrada…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …ou para um array ordenado quando nenhum `item` é fornecido
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Funções Relacionadas

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayer.md): Mesma interpretação, mas o dicionário é procurado por chave no registro gerado.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getDictionaryAsync.md): Equivalente para mapas de loader por locale.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useDictionary.md): O equivalente do React hook, lendo o locale do provider.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
