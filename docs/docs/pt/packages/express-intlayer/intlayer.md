---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Middleware intlayer para Express | express-intlayer
description: Veja como usar o middleware intlayer do pacote express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Doc inicial
---

# Documentação do Middleware intlayer para Express

O middleware `intlayer` para Express detecta o locale do utilizador e fornece funções de tradução através do objeto `res.locals`. Ele também permite o uso das funções `t` e `getIntlayer` em todos os seus handlers de requisição.

## Uso

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    pt: "Olá",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Descrição

O middleware realiza as seguintes tarefas:

1. **Detecção de locale**: Verifica cookies, cabeçalhos (como `Accept-Language`) e parâmetros de URL para determinar o locale do utilizador.
2. **Configuração do contexto**: preenche `res.locals` com:
   - `locale`: O locale detectado.
   - `t`: Uma função de tradução vinculada ao locale detectado.
   - `getIntlayer`: Uma função para obter dicionários vinculados ao locale detectado.
3. **Async Local Storage**: configura um contexto que permite o uso das funções globais `t` e `getIntlayer` importadas de `express-intlayer` no fluxo da requisição.
