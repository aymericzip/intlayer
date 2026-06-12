---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote preact-intlayer
description: Integração específica para Preact com o Intlayer, fornecendo providers e hooks para aplicações Preact.
keywords:
  - preact-intlayer
  - preact
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentação unificada para todas as exportações"
author: aymericzip
---

# Pacote preact-intlayer

O pacote `preact-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Preact. Inclui providers e hooks para lidar com conteúdo multilíngue.

## Instalação

```bash
npm install preact-intlayer
```

## Exportações

### Provedor

| Componente         | Descrição                                                                        |
| ------------------ | -------------------------------------------------------------------------------- |
| `IntlayerProvider` | O provedor principal que envolve sua aplicação e fornece o contexto do Intlayer. |

### Hooks

| Hook            | Descrição                                                                                                       | Documento Relacionado                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `useIntlayer`   | Baseado em `useDictionary`, mas injeta uma versão otimizada do dicionário a partir da declaração gerada.        | -                                                                                                      |
| `useDictionary` | Processa objetos que se assemelham a dicionários (chave, conteúdo). Processa traduções `t()`, enumerações, etc. | -                                                                                                      |
| `useLocale`     | Retorna a locale atual e uma função para defini-la.                                                             | -                                                                                                      |
| `t`             | Seleciona conteúdo com base na locale atual.                                                                    | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |

### Componentes

| Componente         | Descrição                                                   |
| ------------------ | ----------------------------------------------------------- |
| `MarkdownProvider` | Provider para o contexto de renderização de Markdown.       |
| `MarkdownRenderer` | Renderiza conteúdo Markdown com componentes personalizados. |
