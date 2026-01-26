---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote vue-intlayer
description: Integração específica para Vue do Intlayer, fornecendo plugins e composables para aplicações Vue.
keywords:
  - vue-intlayer
  - vue
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todos os exports
---

# Pacote vue-intlayer

O pacote `vue-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Vue. Inclui um plugin Vue e composables para lidar com conteúdo multilíngue.

## Instalação

```bash
npm install vue-intlayer
```

## Exportações

### Plugin

| Função            | Descrição                                             |
| ----------------- | ----------------------------------------------------- |
| `installIntlayer` | Plugin Vue para instalar o Intlayer na sua aplicação. |

### Composables

| Composable      | Descrição                                                    |
| --------------- | ------------------------------------------------------------ |
| `useIntlayer`   | Seleciona um dicionário pela sua chave e retorna o conteúdo. |
| `useDictionary` | Seleciona um dicionário pela sua chave e retorna o conteúdo. |
| `useLocale`     | Retorna o locale atual e uma função para defini-lo.          |
| `useIntl`       | Retorna o objeto Intl para o locale atual.                   |

### Funções

| Função          | Descrição                        |
| --------------- | -------------------------------- |
| `getDictionary` | Obtém um dicionário.             |
| `getIntlayer`   | Obtém conteúdo de um dicionário. |

### Markdown

| Função                    | Descrição                                                      |
| ------------------------- | -------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue para instalar o Intlayer Markdown na sua aplicação. |
