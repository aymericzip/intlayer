---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Documentação do Pacote hono-intlayer
description: Middleware Hono para Intlayer, fornecendo funções de tradução e detecção de localidade.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Documentação unificada para todas as exportações
---

# Pacote hono-intlayer

O pacote `hono-intlayer` fornece um middleware para aplicações Hono para lidar com a internacionalização. Ele detecta a localidade do usuário e preenche o objeto de contexto.

## Instalação

```bash
npm install hono-intlayer
```

## Exportações

### Middleware

Importar:

```tsx
import { intlayer } from "hono-intlayer";
```

| Função     | Descrição                                                                                                                                                                                                                                                                                                  | Doc Relacionada                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Middleware Hono que integra o Intlayer na sua aplicação Hono. Lida com a detecção de localidade a partir do armazenamento (cookies, cabeçalhos), preenche o contexto com `t`, `getIntlayer` e `getDictionary` e configura o namespace CLS para acesso programático durante o ciclo de vida da solicitação. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/hono-intlayer/intlayer.md) |

### Funções

Importar:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Função          | Descrição                                                                                                                                                                                                                                              | Doc Relacionada                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `t`             | Função de tradução global que recupera conteúdo para a localidade atual no Hono. Utiliza CLS (Async Local Storage) e deve ser usada dentro de um contexto de solicitação gerenciado pelo middleware `intlayer`. Também pode ser acessada via contexto. | [tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getIntlayer`   | Recupera um dicionário por sua chave da declaração gerada e retorna seu conteúdo para a localidade especificada. Versão otimizada do `getDictionary`. Usa CLS para acessar o contexto da solicitação. Também pode ser acessada via contexto.           | -                                                                                                   |
| `getDictionary` | Processa objetos de dicionário e retorna o conteúdo para a localidade especificada. Processa traduções `t()`, enumerações, markdown, HTML, etc. Usa CLS para acessar o contexto da solicitação. Também pode ser acessada via contexto.                 | -                                                                                                   |
