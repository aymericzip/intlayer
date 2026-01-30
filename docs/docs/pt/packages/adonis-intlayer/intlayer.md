---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentação do Middleware intlayer para AdonisJS | adonis-intlayer
description: Veja como usar o middleware intlayer para o pacote adonis-intlayer
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentação inicial
---

# Documentação do Middleware intlayer para AdonisJS

O middleware `intlayer` para AdonisJS detecta o locale do usuário e fornece funções de tradução por meio do contexto da solicitação. Ele também permite o uso de funções de tradução globais dentro do fluxo da solicitação.

## Uso

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Descrição

O middleware realiza as seguintes tarefas:

1. **Detecção de Locale**: Ele analisa a solicitação (cabeçalhos, cookies, etc.) para determinar o locale de preferência do usuário.
2. **Configuração de Contexto**: Ele preenche o contexto da solicitação com informações de locale.
3. **Async Local Storage**: Ele usa `cls-hooked` para gerenciar um contexto assíncrono, permitindo que funções globais do Intlayer como `t`, `getIntlayer` e `getDictionary` acessem o locale específico da solicitação sem passá-lo manualmente.

> Nota: Para usar cookies para detecção de locale, certifique-se de que `@adonisjs/cookie` esteja configurado e sendo usado em sua aplicação.
