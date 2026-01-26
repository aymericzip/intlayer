---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote solid-intlayer
description: Integração específica do Solid para o Intlayer, fornecendo providers e hooks para aplicações Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# pacote solid-intlayer

O pacote `solid-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Solid. Inclui providers e hooks para lidar com conteúdo multilíngue.

## Instalação

```bash
npm install solid-intlayer
```

## Exportações

### Provedor

Importar:

```tsx
import "solid-intlayer";
```

| Componente         | Descrição                                                                        | Documento Relacionado                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | O provider principal que envolve sua aplicação e fornece o contexto do Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/IntlayerProvider.md) |

### Hooks

Importação:

```tsx
import "solid-intlayer";
```

| Hook                   | Descrição                                                                                                                          | Documento Relacionado                                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Com base em `useDictionary`, mas injeta uma versão otimizada do dicionário a partir da declaração gerada.                          | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Processa objetos que se parecem com dicionários (key, content). Processa traduções `t()`, enumerações, etc.                        | -                                                                                                                       |
| `useDictionaryAsync`   | Igual a `useDictionary`, mas lida com dicionários assíncronos.                                                                     | -                                                                                                                       |
| `useDictionaryDynamic` | Igual a `useDictionary`, mas lida com dicionários dinâmicos.                                                                       | -                                                                                                                       |
| `useLocale`            | Retorna o locale atual e uma função para defini-lo.                                                                                | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook do lado do cliente para gerir reescritas de URL. Atualiza automaticamente a URL se existir uma regra de reescrita localizada. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Retorna o objeto Intl para o locale atual.                                                                                         | -                                                                                                                       |
| `useLoadDynamic`       | Hook para carregar dicionários dinâmicos.                                                                                          | -                                                                                                                       |
| `t`                    | Seleciona conteúdo com base no locale atual.                                                                                       | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)                  |

### Componentes

Importar:

```tsx
import "solid-intlayer";
```

| Componente         | Descrição                                             |
| ------------------ | ----------------------------------------------------- |
| `MarkdownProvider` | Provider para o contexto de renderização de markdown. |
