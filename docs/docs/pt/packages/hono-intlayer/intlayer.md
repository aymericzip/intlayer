---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentação do Middleware Hono intlayer | hono-intlayer
description: Veja como usar o middleware intlayer para o pacote hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Inicialização da doc
---

# Documentação do Middleware Hono intlayer

O middleware `intlayer` para Hono detecta a localidade do usuário e preenche o objeto de contexto com funções Intlayer. Ele também permite o uso de funções de tradução globais dentro do contexto da solicitação.

## Uso

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    pt: "Olá",
  });

  return c.text(content);
});
```

## Descrição

O middleware executa as seguintes tarefas:

1. **Detecção de Localidade**: Analisa a solicitação (cabeçalhos, cookies, etc.) para determinar a localidade preferida do usuário.
2. **Preenchimento do Contexto**: Adiciona dados do Intlayer ao contexto Hono, acessíveis via `c.get()`. Isso inclui:
   - `locale`: A localidade detectada.
   - `t`: Uma função de tradução.
   - `getIntlayer`: Uma função para recuperar dicionários.
   - `getDictionary`: Uma função para processar objetos de dicionário.
3. **Gerenciamento de Contexto**: Usa `cls-hooked` para gerenciar um contexto assíncrono, permitindo que as funções globais do Intlayer (`t`, `getIntlayer`, `getDictionary`) acessem a localidade específica da solicitação sem passar o objeto de contexto.
