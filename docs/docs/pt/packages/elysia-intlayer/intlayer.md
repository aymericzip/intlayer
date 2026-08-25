---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Documentação do Plugin intlayer para Elysia | elysia-intlayer
description: Veja como utilizar o plugin intlayer do pacote elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Inicialização da documentação"
author: aymericzip
---

# Documentação do Plugin intlayer para Elysia

O plugin `intlayer` para Elysia deteta o locale do utilizador e injeta um objeto `intlayer` no contexto da rota. Também permite o uso de funções de tradução globais dentro do contexto da request.

## Uso

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    pt: "Olá",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> O plugin registra seu contexto por meio de um `derive` **global**, que o Elysia tipa como `Partial<{ intlayer: IntlayerContext }>`. Em tempo de execução o valor está sempre presente para as rotas registradas após `.use(intlayer())`, portanto use a non-null assertion (`intlayer!.t`) — ou optional chaining — para satisfazer o TypeScript no modo `strict`.

Os mesmos helpers estão disponíveis como exports autónomos, para que possa chamá-los sem desestruturar o contexto da rota:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    pt: "Olá",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Descrição

O plugin realiza as seguintes tarefas:

1. **Detecção de locale**: Lê o locale definido explicitamente pelo cliente a partir do storage (cookie, header) e, em seguida, recorre ao locale negociado a partir do header `Accept-Language`.
2. **Injeção no contexto**: Adiciona uma propriedade `intlayer` ao contexto de rota do Elysia (veja a tabela Contexto da rota abaixo).
3. **Gerenciamento de contexto**: Utiliza `AsyncLocalStorage` para gerir um contexto assíncrono, permitindo que as funções globais do Intlayer (`t`, `getIntlayer`, `getDictionary`) acedam ao locale específico da request sem terem de passar o objeto de contexto.
4. **Preparação dos dicionários**: Chama `prepareIntlayer` quando o plugin é criado, de modo que os dicionários são construídos na inicialização da aplicação.

### Contexto da rota

| Propriedade       | Tipo                   | Descrição                                                                                      |
| ----------------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | O locale a usar nesta request, com `locale_storage` a ter precedência sobre `locale_detected`. |
| `locale_storage`  | `Locale` (opcional)    | O locale explicitamente pedido pelo cliente através de um cookie ou de um header.              |
| `locale_detected` | `Locale`               | O locale negociado a partir dos headers da request.                                            |
| `defaultLocale`   | `Locale`               | O locale configurado como fallback no `intlayer.config.ts`.                                    |
| `t`               | `TranslateFunction`    | Uma função de tradução.                                                                        |
| `getIntlayer`     | `typeof getIntlayer`   | Uma função para obter dicionários pela sua chave.                                              |
| `getDictionary`   | `typeof getDictionary` | Uma função para processar objetos de dicionário.                                               |

> Ao contrário dos plugins Intlayer baseados em Node, `elysia-intlayer` apoia-se em `AsyncLocalStorage` em vez de `cls-hooked`, porque `cls-hooked` depende de `async_hooks.createHook`, que o Bun não implementa.

O contexto da request é libertado assim que a resposta é mapeada, para que os helpers autónomos nunca sejam resolvidos contra uma request já terminada. Quando chamados fora de uma request tratada pelo plugin, recorrem ao locale por omissão configurado.

## Ordem de resolução da locale

Por padrão, o plugin resolve a locale nesta ordem:

1. O cookie `INTLAYER_LOCALE`.
2. O header `x-intlayer-locale`.
3. A negociação do header `Accept-Language`.
4. A `defaultLocale` configurada.

```bash
# Negociada a partir de `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# O cookie tem precedência sobre `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# O header tem precedência sobre `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Configuração

O plugin lê o seu ficheiro `intlayer.config.ts`. Pode personalizar o cookie e o header usados para a deteção do locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Para mais informações sobre a configuração, visite a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

## Documentação relacionada

- [Documentação do pacote elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Guia completo para traduzir sua aplicação](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_elysia.md)
