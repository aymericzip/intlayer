---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote express-intlayer
description: Middleware Express para Intlayer, fornecendo funções de tradução e detecção de locale.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exports
---

# Pacote express-intlayer

O pacote `express-intlayer` fornece um middleware para aplicações Express para tratar internacionalização. Ele detecta o locale do utilizador e fornece funções de tradução.

## Instalação

```bash
npm install express-intlayer
```

## Exports

### Middleware

Importação:

```tsx
import "express-intlayer";
```

| Função     | Descrição                                                                                                                                                                                                                                                                                                                    | Doc Relacionado                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware Express que detecta o locale do utilizador e popula `res.locals` com os dados do Intlayer. Realiza a deteção do locale a partir de cookies/headers, injeta `t`, `getIntlayer` e `getDictionary` em `res.locals`, e configura o namespace do CLS (Async Local Storage) para acesso ao ciclo de vida da requisição. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/express-intlayer/intlayer.md) |

### Funções

Importar:

```tsx
import "express-intlayer";
```

| Função          | Descrição                                                                                                                                                                                                                | Doc Relacionado                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Função de tradução que recupera conteúdo para o locale atual. Funciona dentro do ciclo de vida da requisição gerenciado pelo middleware `intlayer`. Usa CLS (Async Local Storage) para acessar o contexto da requisição. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getIntlayer`   | Recupera um dicionário pela sua chave da declaração gerada e retorna seu conteúdo para o locale especificado. Versão otimizada de `getDictionary`. Usa CLS para acessar o contexto da requisição.                        | -                                                                                                      |
| `getDictionary` | Processa objetos de dicionário e retorna o conteúdo para o locale especificado. Processa traduções `t()`, enumerações, markdown, HTML, etc. Usa CLS para acessar o contexto da requisição.                               | -                                                                                                      |
