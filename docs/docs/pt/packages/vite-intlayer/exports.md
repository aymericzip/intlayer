---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do pacote vite-intlayer
description: Plugin Vite para o Intlayer, fornecendo aliases de dicionário e watchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internacionalização
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Índice de exportações atualizado – proxy e compilador agora integrados no intlayer(); adicionada documentação de intlayerProxy, intlayerCompiler, intlayerMinify"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentação unificada para todas as exportações"
author: aymericzip
---

# pacote vite-intlayer

O pacote `vite-intlayer` fornece um plugin Vite para integrar o Intlayer à sua aplicação baseada em Vite.

## Instalação

```bash
npm install vite-intlayer
```

## Exportações

### Plugin

Importação:

```tsx
import "vite-intlayer";
```

| Função                     | Descrição                                                                                                                                                                       | Documento Relacionado                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `intlayer`                 | Plugin principal do Vite. Prepara dicionários, configura aliases, inicia observadores do servidor dev e (desde v9) integra o proxy e o compilador.                              | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md)                 |
| `intlayerPlugin`           | (**Descontinuado**) Alias para `intlayer`.                                                                                                                                      | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md)                 |
| `intLayerPlugin`           | (**Descontinuado**) Alias para `intlayer`.                                                                                                                                      | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayer.md)                 |
| `intlayerProxy`            | Plugin middleware de roteamento de localidade (detecção, redirecionamento, reescrita). Desde a v9 está integrado em `intlayer()` – registre separadamente apenas se necessário. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerMiddleware`       | (**Descontinuado**) Alias para `intlayerProxy`.                                                                                                                                 | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerProxy.md)       |
| `intLayerMiddlewarePlugin` | (**Descontinuado**) Alias para `intlayerProxy`.                                                                                                                                 | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerProxy.md)       |
| `intlayerCompiler`         | Extrai declarações de conteúdo inline de componentes e as grava nos dicionários. Desde a v9 está integrado em `intlayer()`.                                                     | [intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerCompiler.md) |
| `intlayerPrune`            | Remove campos de dicionário não utilizados do pacote de produção via tree-shaking.                                                                                              | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerPrune.md)       |
| `intlayerMinify`           | Minifica arquivos JSON de dicionários compilados e opcionalmente altera nomes de campos.                                                                                        | [intlayerMinify](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerMinify.md)     |

### Utilitários

| Exportação                   | Descrição                                                                                                   | Documentação Relacionada                                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `createIntlayerProxyHandler` | Retorna um middleware Node.js agnóstico de framework `(req, res, next)` com lógica de roteamento de locale. | [intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerProxy.md) |

### Tipos

| Exportação                   | Descrição                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `IntlayerPluginOptions`      | Opções aceitas por `intlayer()`. Estende `GetConfigurationOptions` com `compatCallers` e `proxy`.               |
| `IntlayerProxyPluginOptions` | Opções aceitas por `intlayerProxy()` e `createIntlayerProxyHandler()`. Inclui `ignore` e `configOptions`.       |
| `IntlayerCompilerOptions`    | Opções aceitas por `intlayerCompiler()`. Inclui `configOptions` e `compilerConfig`.                             |
| `CompatCallerConfig`         | Re-exportação de `@intlayer/babel`. Descreve um padrão de chamador compat-adapter para análise de uso de campo. |
