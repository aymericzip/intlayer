---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote react-native-intlayer
description: Suporte a React Native para o Intlayer, fornecendo providers e polyfills.
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
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentação unificada para todas as exportações
---

# Pacote react-native-intlayer

O pacote `react-native-intlayer` fornece as ferramentas necessárias para integrar o Intlayer em aplicações React Native. Inclui um provider e polyfills para suporte a locale.

## Instalação

```bash
npm install react-native-intlayer
```

## Exportações

### Provider

| Componente         | Descrição                                                                       |
| ------------------ | ------------------------------------------------------------------------------- |
| `IntlayerProvider` | Componente Provider que envolve sua aplicação e fornece o contexto do Intlayer. |

Import:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Function           | Descrição                                                                               |
| ------------------ | --------------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Função que aplica os polyfills necessários para o React Native dar suporte ao Intlayer. |

Import:

```tsx
import "react-native-intlayer";
```

### Configuração do Metro

O pacote `react-native-intlayer` fornece utilitários de configuração do Metro para garantir que o Intlayer funcione corretamente com o React Native.

| Função                    | Descrição                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Função assíncrona que prepara o Intlayer e mescla a configuração do Metro.                   |
| `configMetroIntlayerSync` | Função síncrona que mescla a configuração do Metro sem preparar os recursos do Intlayer.     |
| `exclusionList`           | Cria um padrão RegExp para o blockList do Metro para excluir arquivos de conteúdo do bundle. |

Importação:

```tsx
import "react-native-intlayer/metro";
```
