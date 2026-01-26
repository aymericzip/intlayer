---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote angular-intlayer
description: Integração específica para Angular do Intlayer, fornecendo providers e serviços para aplicações Angular.
keywords:
  - angular-intlayer
  - angular
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todos os exports
---

# Pacote angular-intlayer

O pacote `angular-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações Angular. Inclui providers e serviços para tratar conteúdo multilíngue.

## Instalação

```bash
npm install angular-intlayer
```

## Exportações

Importação:

```tsx
import "angular-intlayer";
```

### Configuração

| Função            | Descrição                                                       |
| ----------------- | --------------------------------------------------------------- |
| `provideIntlayer` | Função para disponibilizar o Intlayer na sua aplicação Angular. |

### Hooks

| Hook                   | Descrição                                                                                                      | Documento Relacionado |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------- |
| `useIntlayer`          | Baseado em `useDictionary`, mas injeta uma versão otimizada do dicionário a partir da declaração gerada.       | -                     |
| `useDictionary`        | Processa objetos que se parecem com dicionários (chave, conteúdo). Processa traduções `t()`, enumerações, etc. | -                     |
| `useDictionaryAsync`   | Mesmo que `useDictionary`, mas lida com dicionários assíncronos.                                               | -                     |
| `useDictionaryDynamic` | Mesmo que `useDictionary`, mas lida com dicionários dinâmicos.                                                 | -                     |
| `useLocale`            | Retorna a locale atual e uma função para defini-la.                                                            | -                     |
| `useIntl`              | Retorna o objeto Intl para a locale atual.                                                                     | -                     |
| `useLoadDynamic`       | Hook para carregar dicionários dinâmicos.                                                                      | -                     |

### Componentes

| Componente                  | Descrição                                           |
| --------------------------- | --------------------------------------------------- |
| `IntlayerMarkdownComponent` | Componente Angular que renderiza conteúdo Markdown. |
