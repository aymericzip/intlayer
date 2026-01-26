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
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Pacote vue-intlayer

O pacote `vue-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Vue. Inclui um plugin Vue e composables para lidar com conteúdo multilíngue.

## Instalação

```bash
npm install vue-intlayer
```

## Exportações

### Plugin

Importação:

```tsx
import "vue-intlayer";
```

| Função            | Descrição                                             |
| ----------------- | ----------------------------------------------------- |
| `installIntlayer` | Plugin Vue para instalar o Intlayer na sua aplicação. |

### Composables

Importação:

```tsx
import "vue-intlayer";
```

| Composable             | Descrição                                                                                                                                | Doc Relacionado                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Baseado em `useDictionary`, mas injeta uma versão otimizada do dicionário a partir da declaração gerada.                                 | -                                                                                                                     |
| `useDictionary`        | Processa objetos que se assemelham a dicionários (chave, conteúdo). Processa traduções `t()`, enumerações, etc.                          | -                                                                                                                     |
| `useDictionaryAsync`   | Mesmo que `useDictionary`, mas lida com dicionários assíncronos.                                                                         | -                                                                                                                     |
| `useDictionaryDynamic` | Mesmo que `useDictionary`, mas lida com dicionários dinâmicos.                                                                           | -                                                                                                                     |
| `useLocale`            | Retorna a locale atual e uma função para defini-la.                                                                                      | -                                                                                                                     |
| `useRewriteURL`        | Composable do lado do cliente para gerir reescritas de URL. Atualiza automaticamente a URL se existir uma regra de reescrita localizada. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Retorna o objeto Intl para a localidade atual.                                                                                           | -                                                                                                                     |
| `useLoadDynamic`       | Composable para carregar dicionários dinâmicos.                                                                                          | -                                                                                                                     |

### Funções

Importar:

```tsx
import "vue-intlayer";
```

| Função          | Descrição                                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Processa objetos que se assemelham a dicionários (chave, conteúdo). Processa traduções `t()`, enumerações, etc. |
| `getIntlayer`   | Baseado em `getDictionary`, mas injeta uma versão otimizada do dicionário proveniente da declaração gerada.     |

### Markdown

Importar:

```tsx
import "vue-intlayer/markdown";
```

| Função                    | Descrição                                                      |
| ------------------------- | -------------------------------------------------------------- |
| `installIntlayerMarkdown` | Plugin Vue para instalar o Intlayer Markdown na sua aplicação. |
