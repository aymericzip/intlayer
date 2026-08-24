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

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    pt: "Olá",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Os mesmos helpers estão disponíveis como exports autónomos, para que possa chamá-los sem desestruturar o contexto da rota:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    pt: "Olá",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Descrição

O plugin realiza as seguintes tarefas:

1. **Detecção de locale**: Lê o locale definido explicitamente pelo cliente a partir do storage (cookie, header) e, em seguida, recorre ao locale negociado a partir do header `Accept-Language`.
2. **Injeção no contexto**: Adiciona uma propriedade `intlayer` ao contexto de rota do Elysia, contendo:
   - `locale`: O locale a usar nesta request, com `locale_storage` a ter precedência sobre `locale_detected`.
   - `locale_storage`: O locale explicitamente pedido pelo cliente através de um cookie ou de um header.
   - `locale_detected`: O locale negociado a partir dos headers da request.
   - `defaultLocale`: O locale configurado como fallback no `intlayer.config.ts`.
   - `t`: Uma função de tradução.
   - `getIntlayer`: Uma função para obter dicionários pela sua chave.
   - `getDictionary`: Uma função para processar objetos de dicionário.
3. **Gerenciamento de contexto**: Utiliza `AsyncLocalStorage` para gerir um contexto assíncrono, permitindo que as funções globais do Intlayer (`t`, `getIntlayer`, `getDictionary`) acedam ao locale específico da request sem terem de passar o objeto de contexto.

> Ao contrário dos plugins Intlayer baseados em Node, `elysia-intlayer` apoia-se em `AsyncLocalStorage` em vez de `cls-hooked`, porque `cls-hooked` depende de `async_hooks.createHook`, que o Bun não implementa.

O contexto da request é libertado assim que a resposta é mapeada, para que os helpers autónomos nunca sejam resolvidos contra uma request já terminada. Quando chamados fora de uma request tratada pelo plugin, recorrem ao locale por omissão configurado.

## Configuração

O plugin lê o seu ficheiro `intlayer.config.ts`. Pode personalizar o cookie e o header usados para a deteção do locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

> Para mais informações sobre a configuração, visite a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).
