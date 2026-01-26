---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Plugin intlayer para Fastify | fastify-intlayer
description: Veja como usar o plugin intlayer para o pacote fastify-intlayer
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Doc inicial
---

# Documentação do Plugin intlayer para Fastify

O plugin `intlayer` para Fastify detecta a localidade do utilizador e decora o objeto request com as funções do Intlayer. Também permite o uso de funções de tradução globais dentro do contexto da request.

## Uso

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    pt: "Olá",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Descrição

O plugin realiza as seguintes tarefas:

1. **Detecção de locale**: Analisa a request (headers, cookies, etc.) para determinar o locale preferido do utilizador.
2. **Decoração da Request**: Adiciona uma propriedade `intlayer` ao objeto `FastifyRequest`, contendo:
   - `locale`: O locale detectado.
   - `t`: Uma função de tradução.
   - `getIntlayer`: Uma função para recuperar dicionários.
3. **Gerenciamento de contexto**: Utiliza `cls-hooked` para gerir um contexto assíncrono, permitindo que funções globais do Intlayer acedam ao locale específico da request.
