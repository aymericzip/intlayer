---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Documentação do Pacote adonis-intlayer
description: Middleware AdonisJS para Intlayer, fornecendo funções de tradução e detecção de locale.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Documentação inicial
---

# Pacote adonis-intlayer

O pacote `adonis-intlayer` fornece um middleware para aplicações AdonisJS para lidar com a internacionalização. Ele detecta o locale do usuário e fornece funções de tradução.

## Instalação

```bash
npm install adonis-intlayer
```

## Exportações

### Middleware

O pacote fornece um middleware AdonisJS para lidar com a internacionalização.

| Função               | Descrição                                                                                                                                                                                                                                                                               | Doc Relacionada                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Middleware AdonisJS que detecta o locale do usuário e preenche o contexto da solicitação com dados do Intlayer. Ele também define um namespace CLS (Async Local Storage) para acesso ao ciclo de vida da solicitação, permitindo o uso de funções globais como `t`, `getIntlayer`, etc. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/adonis-intlayer/intlayer.md) |

### Funções

| Função          | Descrição                                                                                                                                                                                                                  | Doc Relacionada                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Função de tradução que recupera conteúdo para o locale atual. Funciona dentro do ciclo de vida da solicitação gerenciado pelo middleware `intlayer`. Usa CLS (Async Local Storage) para acessar o contexto da solicitação. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getIntlayer`   | Recupera um dicionário por sua chave da declaração gerada e retorna seu conteúdo para o locale especificado. Versão otimizada do `getDictionary`. Usa CLS para acessar o contexto da solicitação.                          | -                                                                                                      |
| `getDictionary` | Processa objetos de dicionário e retorna conteúdo para o locale especificado. Processa traduções `t()`, enumerações, markdown, HTML, etc. Usa CLS para acessar o contexto da solicitação.                                  | -                                                                                                      |
| `getLocale`     | Recupera o locale atual do contexto da solicitação usando CLS.                                                                                                                                                             | -                                                                                                      |
