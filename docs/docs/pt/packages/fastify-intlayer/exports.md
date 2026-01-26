---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote fastify-intlayer
description: Plugin Fastify para o Intlayer, fornecendo funções de tradução e detecção de locale.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Pacote fastify-intlayer

O pacote `fastify-intlayer` fornece um plugin para aplicações Fastify para tratar da internacionalização. Ele detecta o locale do utilizador e decora o objeto request.

## Instalação

```bash
npm install fastify-intlayer
```

## Exportações

### Plugin

Importação:

```tsx
import "fastify-intlayer";
```

| Função     | Descrição                                                                                                                                                                                                                                                                                                                         | Documento Relacionado                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Plugin Fastify que integra o Intlayer à sua aplicação Fastify. Trata da detecção de locale a partir do armazenamento (cookies, headers), decora o objeto request com dados `intlayer` contendo `t`, `getIntlayer` e `getDictionary`, e configura um namespace CLS para acesso programático durante o ciclo de vida da requisição. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/fastify-intlayer/intlayer.md) |

### Funções

Importação:

```tsx
import "fastify-intlayer";
```

| Função          | Descrição                                                                                                                                                                                                                                                         | Doc Relacionado                                                                                        |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Função global de tradução que recupera o conteúdo para o locale atual no Fastify. Utiliza CLS (Async Local Storage) e deve ser usada dentro de um contexto de request gerenciado pelo plugin `intlayer`. Também pode ser acessada via `req.intlayer.t`.           | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getIntlayer`   | Recupera um dicionário pela sua chave a partir da declaração gerada e retorna o seu conteúdo para o locale especificado. Versão otimizada de `getDictionary`. Usa CLS para aceder ao contexto da request. Também pode ser acedida via `req.intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Processa objetos de dicionário e retorna conteúdo para o locale especificado. Processa traduções `t()`, enumerações, markdown, HTML, etc. Usa CLS para acessar o contexto da request. Também pode ser acessado via `req.intlayer.getDictionary`.                  | -                                                                                                      |
