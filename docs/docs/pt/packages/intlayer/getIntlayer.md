---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Documentação da Função getIntlayer | intlayer
description: "Use getIntlayer para ler o conteúdo de um dicionário para um locale em qualquer lugar, o equivalente agnóstico do hook useIntlayer."
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.5.12
    date: 2026-09-28
    changes: "Sem locale, resolve o locale da requisição ou o locale armazenado antes do locale padrão"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentação inicial"
author: aymericzip
---

# Documentação: Função `getIntlayer` em `intlayer`

## Descrição

A função `getIntlayer` seleciona um dicionário pela sua chave e retorna seu conteúdo interpretado para uma determinada localidade. É o equivalente agnóstico de framework do hook `useIntlayer`: mesmo conteúdo, mesmos seletores, mas utilizável em qualquer lugar onde um contexto React não está disponível, scripts Node, funções de servidor, carregadores de rotas, construtores de metadados, manipuladores Express/Fastify, testes.

Ela lê os dicionários gerados pelo Intlayer em `.intlayer/`, então o argumento `key` é digitado e autocompletado a partir de suas próprias declarações de conteúdo, e o objeto retornado é totalmente digitado até cada folha.

**Principais Recursos:**

- Chaves de dicionário digitadas e conteúdo retornado digitado
- Interpreta cada nó de conteúdo (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Aceita uma localidade ou um objeto seletor (coleções, variantes)
- Os resultados são memorizados por `key + locale + selector`
- Retorna a um proxy seguro em desenvolvimento quando um dicionário está faltando, em vez de travar

## Assinatura da Função

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Obrigatório
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcional
  plugins?: Plugins[]                         // Opcional
): DeepTransformContent<...>
```

## Parâmetros

- `key: DictionaryKeys`
  - **Descrição**: A chave do dicionário a ler, conforme declarado nos seus arquivos de conteúdo.
  - **Tipo**: `DictionaryKeys`, uma união de cada chave de dicionário declarada.
  - **Obrigatório**: Sim

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Descrição**: O locale para interpretar o conteúdo, ou um objeto seletor para [dicionários dinâmicos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/index.md).
    - `'fr'`: um locale
    - `{ item: 2 }`: um item de [coleção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/collections.md) (omita `item` para obter cada item como um array)
    - `{ variant: 'black-friday' }`: uma [variante](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dynamic_dictionaries/variants.md) nomeada (omita para a variante `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: uma variante estruturada
    - Qualquer seletor pode levar um locale: `{ item: 2, locale: 'fr' }`
  - **Tipo**: `LocalesValues | DictionarySelector`
  - **Obrigatório**: Não (opcional). Se omitido, veja [Sem um locale](#sem-um-locale).

- `plugins: Plugins[]`
  - **Descrição**: Transformadores de nó personalizados que substituem os plugins do interpretador base. Uso avançado apenas; omita para manter o comportamento padrão.
  - **Tipo**: `Plugins[]`
  - **Obrigatório**: Não (opcional)

### Retorna

- **Tipo**: O conteúdo interpretado do dicionário, tipado a partir da sua declaração.
- **Descrição**: Um objeto simples espelhando o campo `content` do seu dicionário, onde cada nó Intlayer foi resolvido para seu valor final para a locale solicitada.

## Exemplo de Uso

### Uso Básico

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      pt: "Olá",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "pt"); // "Olá"
```

### Sem um locale

Quando nenhum locale é passado, `getIntlayer` não recorre diretamente ao locale padrão. Ela resolve, nesta ordem:

1. **O locale da requisição atual**, no servidor, quando uma integração do Intlayer a trata: os middlewares `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer` e `elysia-intlayer`, os middlewares `remix-intlayer` e `astro-intlayer`, e `IntlayerProvider` / `setLocale` nos React Server Components. Cada requisição é resolvida a partir dos seus próprios cookies e headers, então usuários simultâneos nunca compartilham o locale.
2. **O locale armazenado no navegador** (cookie, `localStorage`, `sessionStorage`), aquele que um seletor de idioma persiste.
3. **O `defaultLocale`** declarado na sua [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

- [configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Locale da requisição, senão o armazenado, senão o locale padrão
```

A mesma resolução se aplica a `getDictionary`, às chamadas reescritas pelos [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) e a `useIntlayer` / `useDictionaryDynamic` renderizados fora de um provider. Um locale passado explicitamente sempre tem prioridade.

- [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)

> `getIntlayer` não é reativa: após uma troca de locale, chame-a novamente para ler o novo locale. Em uma página renderizada no servidor, uma chamada feita fora de qualquer provider renderiza o locale padrão no servidor e o locale armazenado no navegador, o que pode causar um hydration mismatch. Nesse caso, monte o provider do seu framework ou passe o locale.

### Dentro de um manipulador de servidor

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Com um seletor (coleções e variantes)

```typescript
import { getIntlayer } from "intlayer";

// Um único item da coleção
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Cada item da coleção, como um array ordenado
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Uma variante nomeada
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

## Notas de Comportamento

### Armazenamento em cache

Os resultados são memoizados em um cache de nível de módulo com chave `key + locale + selector`. Chamar `getIntlayer("app", "fr")` repetidamente interpreta o dicionário uma vez e retorna o mesmo objeto depois.

### Dicionários faltantes

Em desenvolvimento, solicitar uma chave que não possui um dicionário gerado registra um aviso uma vez e retorna um proxy de fallback seguro: ler `content.title` fornece a string `"app.title"` em vez de lançar um erro. Isso mantém uma página utilizável enquanto a declaração faltante é corrigida. Execute a compilação do Intlayer (ou o servidor de desenvolvimento) para que o dicionário seja gerado.

### Tamanho do bundle

`getIntlayer` lê o dicionário mesclado, que contém **todos** os locales. Em bundles de cliente, os [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md) reescrevem a chamada para que apenas o conteúdo necessário seja enviado. Quando você lê conteúdo fora da renderização (metadados, loaders, funções de servidor) e deseja um único locale carregado sob demanda, use [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayerAsync.md) em vez disso.

- [plugins de build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayerAsync.md)

## Funções Relacionadas

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md)

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
