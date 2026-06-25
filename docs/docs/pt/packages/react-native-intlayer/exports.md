---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Documentação do pacote react-native-intlayer
description: Suporte a React Native para o Intlayer, fornecendo providers, hooks, polyfills e configuração Metro.
keywords:
  - react-native-intlayer
  - react-native
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Reexportar a API completa do react-intlayer (hooks, utilitários, subcaminhos format/html/markdown) para que um aplicativo React Native dependa apenas de react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentação unificada para todas as exportações"
author: aymericzip
---

# Pacote react-native-intlayer

O pacote `react-native-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações React Native. Reexporta a API completa do `react-intlayer` (hooks e utilitários) com um `IntlayerProvider` pronto para React Native, além dos polyfills e da configuração Metro exigidos pelo React Native.

> Em um aplicativo React Native, importe **tudo** de `react-native-intlayer`. Você não precisa instalar ou importar `react-intlayer` diretamente.

## Instalação

```bash
npm install react-native-intlayer
```

## Exportações

### Provider

| Componente         | Descrição                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Componente Provider que envolve sua aplicação e fornece o contexto do Intlayer. Aplica automaticamente os polyfills necessários. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hooks e utilitários

Estes são reexportados de `react-intlayer`, portanto você pode importá-los diretamente de `react-native-intlayer`:

| Exportação                                                                                                        | Descrição                                                |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `useIntlayer`                                                                                                     | Acessa conteúdo localizado para uma chave de dicionário. |
| `useLocale`                                                                                                       | Lê e altera o locale atual.                              |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Carrega conteúdo de dicionário de diversas formas.       |
| `useI18n`                                                                                                         | Hook compatível com i18next.                             |
| `t`                                                                                                               | Auxiliar de tradução inline.                             |
| `getIntlayer`, `getDictionary`                                                                                    | Getters imperativos de conteúdo.                         |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Auxiliares de persistência de locale.                    |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Function           | Descrição                                                                               |
| ------------------ | --------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Função que aplica os polyfills necessários para o React Native dar suporte ao Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> O polyfill é aplicado automaticamente quando você importa `IntlayerProvider`. Chame `intlayerPolyfill` manualmente apenas se precisar dos polyfills antes que o provider seja montado.

### Formatadores

Hooks de formatação numérica, de data e outros baseados em Intl estão disponíveis no subcaminho `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Renderização de Markdown e HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Configuração do Metro

O pacote `react-native-intlayer` fornece utilitários de configuração do Metro para garantir que o Intlayer funcione corretamente com o React Native.

| Função                    | Descrição                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Função assíncrona que prepara o Intlayer e mescla a configuração do Metro.                   |
| `configMetroIntlayerSync` | Função síncrona que mescla a configuração do Metro sem preparar os recursos do Intlayer.     |
| `exclusionList`           | Cria um padrão RegExp para o blockList do Metro para excluir arquivos de conteúdo do bundle. |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
