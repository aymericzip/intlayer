---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote svelte-intlayer
description: Integração específica para Svelte do Intlayer, fornecendo funções de configuração e stores para aplicações Svelte.
keywords:
  - svelte-intlayer
  - svelte
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote svelte-intlayer

O pacote `svelte-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Svelte. Inclui funções de configuração e stores para lidar com conteúdo multilíngue.

## Instalação

```bash
npm install svelte-intlayer
```

## Exportações

### Configuração

Importação:

```tsx
import "svelte-intlayer";
```

| Função          | Descrição                                                  |
| --------------- | ---------------------------------------------------------- |
| `setupIntlayer` | Função para configurar o Intlayer na sua aplicação Svelte. |

### Store (Armazenamento)

Import:

```tsx
import "svelte-intlayer";
```

| Store           | Descrição                                           |
| --------------- | --------------------------------------------------- |
| `intlayerStore` | Store Svelte que contém o estado atual do Intlayer. |

### Hooks (Contexto)

Import:

```tsx
import "svelte-intlayer";
```

| Função                 | Descrição                                                                                                                            | Documento Relacionado                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `useIntlayer`          | Com base em `useDictionary`, mas injeta uma versão otimizada do dictionary a partir da declaração gerada.                            | -                                                                                                                        |
| `useDictionary`        | Processa objetos que se parecem com dicionários (chave, conteúdo). Processa traduções `t()`, enumerações, etc.                       | -                                                                                                                        |
| `useDictionaryAsync`   | Mesmo que `useDictionary`, mas lida com dicionários assíncronos.                                                                     | -                                                                                                                        |
| `useDictionaryDynamic` | Mesmo que `useDictionary`, mas lida com dicionários dinâmicos.                                                                       | -                                                                                                                        |
| `useLocale`            | Retorna o locale atual e uma função para defini-lo.                                                                                  | -                                                                                                                        |
| `useRewriteURL`        | Função do lado do cliente para gerir reescritas de URL. Atualiza automaticamente a URL se existir uma regra de reescrita localizada. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/svelte-intlayer/useRewriteURL.md) |
| `useIntl`              | Retorna o objeto Intl para o locale atual.                                                                                           | -                                                                                                                        |

### Markdown

Importar:

```tsx
import "svelte-intlayer";
```

| Função                | Descrição                                                           |
| --------------------- | ------------------------------------------------------------------- |
| `setIntlayerMarkdown` | Função para definir o contexto de markdown na sua aplicação Svelte. |
