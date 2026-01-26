---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Package Documentation
description: The core package of Intlayer, providing the base functions and types for internationalization.
keywords:
  - intlayer
  - core
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Pacote intlayer

O pacote `intlayer` é a biblioteca core do ecossistema Intlayer. Ele fornece as funções essenciais, tipos e utilitários para gerenciar conteúdo multilíngue em aplicações JavaScript e TypeScript.

## Instalação

```bash
npm install intlayer
```

## Exportações

### Configuração

Importação:

```tsx
import "intlayer";
```

| Variável           | Tipo                   | Descrição                                                                                      | Documento Relacionado                                                                                                   |
| ------------------ | ---------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | O objeto de configuração do Intlayer.                                                          | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Retorna o objeto de configuração do Intlayer. (**Obsoleto**: Use `configuration` em vez disso) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | A lista de todos os locales suportados.                                                        | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | A lista de todos os locales obrigatórios.                                                      | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | O locale padrão.                                                                               | -                                                                                                                       |

### Tipos

Importação:

```tsx
import "intlayer";
```

| Tipo                  | Descrição                                                          |
| --------------------- | ------------------------------------------------------------------ |
| `Dictionary`          | O tipo Dictionary usado para definir a estrutura de um dicionário. |
| `DeclarationContent`  | (**Depreciado**) Use `Dictionary<T>` em vez disso.                 |
| `IntlayerConfig`      | O tipo que define a configuração do Intlayer.                      |
| `ContentNode`         | Um nó no conteúdo do dicionário.                                   |
| `Locale`              | O tipo que representa um locale.                                   |
| `LocalesValues`       | Os valores possíveis para um locale.                               |
| `StrictModeLocaleMap` | Um mapa de locales com verificação de tipos estrita.               |

### Funções de Conteúdo

Importação:

```tsx
import "intlayer";
```

| Função                   | Tipo       | Descrição                                                                                                   | Doc Relacionado                                                                                       |
| ------------------------ | ---------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `t` / `getTranslation`   | `Function` | Seleciona conteúdo com base na localidade atual.                                                            | [tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)   |
| `enu` / `getEnumeration` | `Function` | Seleciona conteúdo com base na quantidade.                                                                  | [enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Seleciona conteúdo com base numa condição booleana.                                                         | [condition](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/condition.md)    |
| `gender`                 | `Function` | Seleciona conteúdo com base no género.                                                                      | [gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/gender.md)          |
| `insert`                 | `Function` | Insere valores numa string de conteúdo.                                                                     | [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md)    |
| `nest` / `getNesting`    | `Function` | Aninha outro dicionário.                                                                                    | [aninhamento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/nesting.md)    |
| `md`                     | `Function` | Processa conteúdo em Markdown.                                                                              | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md)      |
| `html`                   | `Function` | Processa conteúdo HTML.                                                                                     | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/html.md)              |
| `file`                   | `Function` | Trata o conteúdo do ficheiro.                                                                               | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/file.md)              |
| `getDictionary`          | `Function` | Processa objetos que se parecem com dicionários (key, content). Processa traduções `t()`, enumerações, etc. | -                                                                                                     |
| `getIntlayer`            | `Function` | Baseado em `getDictionary`, mas injeta uma versão otimizada do dicionário a partir da declaração gerada.    | -                                                                                                     |

### Utilitários de Localização

Importação:

```tsx
import "intlayer";
```

| Função                 | Tipo       | Descrição                                              | Documento Relacionado                                                                                                           |
| ---------------------- | ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Detecta a locale a partir de uma string ou path.       | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Obtém a parte de idioma de uma locale.                 | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Obtém o nome de exibição de uma locale.                | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Resolve um caminho canônico para a versão localizada.  | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Resolve um caminho localizado para sua forma canônica. | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Gera uma URL localizada.                               | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Gera URLs para todos os locales suportados.            | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Remove o prefixo de locale de um caminho.              | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Obtém o prefixo de locale de um caminho.               | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Obtém a direção do texto (LTR/RTL).                    | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Valida um prefixo de locale.                           | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/intlayer/validatePrefix.md)             |

### Utilitários do Navegador

Importação:

```tsx
import "intlayer";
```

| Função                 | Tipo       | Descrição                                |
| ---------------------- | ---------- | ---------------------------------------- |
| `getBrowserLocale`     | `Function` | Detecta o locale preferido do navegador. |
| `getCookie`            | `Function` | Recupera o valor de um cookie.           |
| `getLocaleFromStorage` | `Function` | Recupera o locale do armazenamento.      |
| `setLocaleInStorage`   | `Function` | Salva o locale no armazenamento.         |

### Formatadores

Importação:

```tsx
import "intlayer";
```

| Function       | Description                            |
| -------------- | -------------------------------------- |
| `number`       | Formata um número.                     |
| `currency`     | Formata um valor monetário.            |
| `percentage`   | Formata uma percentagem.               |
| `compact`      | Formata um número em formato compacto. |
| `date`         | Formata uma data.                      |
| `relativeTime` | Formata tempo relativo.                |
| `units`        | Formata um valor com unidades.         |
| `Intl`         | O objeto Intl padrão.                  |
