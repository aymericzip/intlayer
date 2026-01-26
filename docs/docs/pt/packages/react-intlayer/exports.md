---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote react-intlayer
description: Implementação específica para React do Intlayer, fornecendo hooks e providers para aplicações React.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Pacote react-intlayer

O pacote `react-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações React. Inclui providers de contexto, hooks e componentes para lidar com conteúdo multilíngue.

## Instalação

```bash
npm install react-intlayer
```

## Exportações

### Provedores

Importação:

```tsx
import "react-intlayer";
```

| Componente                | Descrição                                                                                                                 | Doc Relacionado                                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | O provedor principal que envolve sua aplicação e fornece o contexto do Intlayer. Inclui suporte ao editor por padrão.     | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Um componente provedor focado no conteúdo sem os recursos do editor. Use-o quando não precisar do editor visual.          | -                                                                                                                             |
| `HTMLProvider`            | Provider para configurações de internacionalização relacionadas ao HTML. Permite sobrescrever componentes para tags HTML. | -                                                                                                                             |

### Hooks

Importação:

```tsx
import "react-intlayer";
```

| Hook                   | Descrição                                                                                                                                       | Doc Relacionado                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook do lado do cliente que seleciona um dicionário pela sua chave e retorna o seu conteúdo. Usa a locale do contexto se não for fornecida.     | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook que transforma um objeto de dicionário e retorna o conteúdo para o locale atual. Processa traduções `t()`, enumerações, etc.               | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook que lida com dicionários assíncronos. Aceita um mapa de dicionários baseado em Promise e o resolve para o locale atual.                    | -                                                                                                                       |
| `useDictionaryDynamic` | Hook que lida com dicionários dinâmicos carregados por chave. Usa React Suspense internamente para estados de carregamento.                     | -                                                                                                                       |
| `useLocale`            | Hook do lado do cliente para obter a locale atual, a locale padrão, as locales disponíveis e uma função para atualizar a locale.                | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook para obter a locale atual e todos os campos relacionados (locale, defaultLocale, availableLocales, setLocale) a partir do contexto.        | -                                                                                                                       |
| `useRewriteURL`        | Hook do lado do cliente para gerir reescritas de URL. Se existir uma regra de reescrita para o pathname e a locale atuais, irá atualizar a URL. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook que fornece uma função de tradução `t()` para acessar conteúdo aninhado por chave. Imita o padrão do i18next/next-intl.                    | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook que fornece um objeto `Intl` vinculado ao locale. Injeta automaticamente o locale atual e usa cache otimizado.                             | -                                                                                                                       |
| `useLocaleStorage`     | Hook que fornece persistência do locale em localStorage ou em cookies. Retorna funções getter e setter.                                         | -                                                                                                                       |
| `useLocaleCookie`      | Obsoleto. Use `useLocaleStorage` em vez disso. Hook que gerencia a persistência do locale em cookies.                                           | -                                                                                                                       |
| `useLoadDynamic`       | Hook para carregar dicionários dinâmicos usando React Suspense. Aceita uma chave e uma Promise, faz cache dos resultados.                       | -                                                                                                                       |
| `useIntlayerContext`   | Hook que fornece os valores do contexto do cliente Intlayer atual (locale, setLocale, etc.).                                                    | -                                                                                                                       |
| `useHTMLContext`       | Hook para acessar substituições de componentes HTML a partir do contexto HTMLProvider.                                                          | -                                                                                                                       |

### Funções

Importação:

```tsx
import "react-intlayer";
```

| Função               | Descrição                                                                                                                                                   | Doc relacionado                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `t`                  | Função de tradução no lado do cliente que retorna a tradução do conteúdo multilíngue fornecido. Usa o locale do contexto se não for fornecido.              | [tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md) |
| `getDictionary`      | Processa objetos de dicionário e retorna conteúdo para o locale especificado. Processa traduções `t()`, enumerações, markdown, HTML, etc.                   | -                                                                                                   |
| `getIntlayer`        | Recupera um dicionário pela sua chave a partir da declaração gerada e retorna seu conteúdo para o locale especificado. Versão otimizada de `getDictionary`. | -                                                                                                   |
| `setLocaleInStorage` | Define o locale no armazenamento (local storage ou cookie conforme a configuração).                                                                         | -                                                                                                   |
| `setLocaleCookie`    | Depreciado. Use `setLocaleInStorage` em vez disso. Define o locale em um cookie.                                                                            | -                                                                                                   |
| `localeInStorage`    | Obtém o locale do armazenamento (local storage ou cookie).                                                                                                  | -                                                                                                   |
| `localeCookie`       | Depreciado. Use `localeInStorage` em vez disso. Obtém o locale do cookie.                                                                                   | -                                                                                                   |

### Componentes

Importar:

```tsx
import "react-intlayer";
```

ou

```tsx
import "react-intlayer/markdown";
```

| Componente         | Descrição                                                                                                                                    | Documento Relacionado                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Provedor para o contexto de renderização de Markdown. Permite sobrescrever componentes personalizados para elementos Markdown.               | -                                                                                                                             |
| `MarkdownRenderer` | Renderiza conteúdo Markdown com componentes personalizados. Suporta todos os recursos padrão do Markdown e a sintaxe específica do Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/react-intlayer/MarkdownRenderer.md) |

### Tipos

Importação:

```tsx
import "react-intlayer";
```

| Tipo           | Descrição                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Tipo que representa um nó na árvore de conteúdo do Intlayer. Usado para manipulação de conteúdo com tipagem segura. |

### Lado do servidor (react-intlayer/server)

Importação:

```tsx
import "react-intlayer/server";
```

| Exportação               | Tipo        | Descrição                                              |
| ------------------------ | ----------- | ------------------------------------------------------ |
| `IntlayerServerProvider` | `Component` | Provider para renderização no lado do servidor.        |
| `IntlayerServer`         | `Component` | Wrapper do lado do servidor para conteúdo do Intlayer. |
| `t`                      | `Function`  | Versão do lado do servidor da função de tradução.      |
| `useLocale`              | `Hook`      | Hook para acessar a locale no lado do servidor.        |
| `useIntlayer`            | `Hook`      | Versão para servidor de `useIntlayer`.                 |
| `useDictionary`          | `Hook`      | Versão para servidor de `useDictionary`.               |
| `useI18n`                | `Hook`      | Versão para servidor de `useI18n`.                     |
| `locale`                 | `Function`  | Função para obter ou definir a locale no servidor.     |
