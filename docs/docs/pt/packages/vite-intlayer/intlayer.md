---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentação do Plugin intlayer para Vite | vite-intlayer
description: Veja como usar o plugin intlayer do package vite-intlayer
keywords:
  - intlayer
  - vite
  - plugin
  - Intlayer
  - intlayer
  - Internacionalização
  - Documentação
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documento inicial"
author: aymericzip
---

# Documentação do Plugin intlayer para Vite

O plugin Vite `intlayer` integra a configuração do Intlayer ao processo de build. Ele gerencia aliases de dicionários, inicia o watcher de dicionários em modo de desenvolvimento e prepara os dicionários para o build.

## Uso

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opções

```ts
import type { IntlayerPluginOptions } from "vite-intlayer";
```

`IntlayerPluginOptions` estende `GetConfigurationOptions` (ver `@intlayer/config`) com os seguintes campos adicionais:

| Opção           | Tipo                            | Padrão      | Descrição                                                                                                                                                      |
| --------------- | ------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compatCallers` | `CompatCallerConfig[]`          | `[]`        | Padrões de chamador extra para pacotes compat-adapter (ex.: `@intlayer/react-i18next`). Passado ao analisador de uso de campo no momento da compilação.        |
| `proxy`         | `{ ignore?: (req) => boolean }` | `undefined` | Opções encaminhadas para o proxy de roteamento de locale agrupado. Use `ignore` para excluir caminhos específicos (ex.: rotas de API) do roteamento de locale. |

Todas as outras opções (`override`, `configFile`, …) são encaminhadas diretamente para `getConfiguration()`.

### Exemplos

#### Ignorar rotas de API do roteamento de locale

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

#### Com um caminho de arquivo de configuração personalizado

```ts
export default defineConfig({
  plugins: [
    intlayer({
      configFile: "./config/intlayer.config.ts",
    }),
  ],
});
```

#### Com callers compat-adapter

```ts
import { intlayer } from "vite-intlayer";
import { reactI18nextCallerConfig } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [
    intlayer({
      compatCallers: [reactI18nextCallerConfig],
    }),
  ],
});
```

## O que o plugin faz

### 1. Preparação do dicionário

Antes do build iniciar (e uma vez por hora em dev), `intlayer` chama `prepareIntlayer` para compilar todos os arquivos `.content.ts` em dicionários JSON otimizados armazenados em `.intlayer/`.

### 2. Aliases de módulo

O plugin adiciona aliases de resolução do Vite para que `import { myDict } from 'intlayer/dictionaries/my-dict'` seja resolvido para o arquivo JSON compilado no disco. Os builds SSR usam `ssr.noExternal` para garantir que todos os pacotes `@intlayer/*` sejam agrupados com aliases aplicados.

### 3. Dev-server watcher

Em modo de desenvolvimento, um watcher `chokidar` é iniciado. Quando um arquivo `.content.ts` é alterado, os dicionários são recompilados e o HMR do Vite propaga a atualização para o navegador.

### 4. Proxy de roteamento de locale agrupado (v9+)

Desde o Intlayer v9, o middleware `intlayerProxy` é registrado automaticamente dentro de `intlayer()`. Ele trata:

- Detecção de locale a partir do prefixo da URL, cookies e cabeçalho `Accept-Language`.
- Redirecionamentos 301 quando o locale detectado não corresponde à URL atual.
- Reescritas de URL internas para que o framework veja o parâmetro de rota `[locale]` correto.

O proxy é controlado por `routing.enableProxy` (padrão `true`) na sua configuração do Intlayer. Para desabilitá-lo completamente:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  routing: { enableProxy: false },
});
```

Para personalizar o comportamento do proxy sem uma chamada `intlayerProxy()` separada, passe opções `proxy` para o plugin principal:

```ts
intlayer({ proxy: { ignore: (req) => req.url?.startsWith("/api") } });
```

Veja a [documentação do intlayerProxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerProxy.md) para a referência completa do comportamento de roteamento.

### 5. Compilador agrupado (v9+)

Quando `compiler.enabled` é `true` **e** `compiler.output` está definido na sua configuração Intlayer, `intlayer()` registra `intlayerCompiler` automaticamente. O compilador extrai declarações de conteúdo inline escritas diretamente dentro de arquivos de componente e as escreve em dicionários no tempo de transformação. Consulte a [documentação do intlayerCompiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/packages/vite-intlayer/intlayerCompiler.md).

### 6. Otimizações de build

Durante um build de produção, o plugin adiciona:

- **intlayerOptimize** – Babel transform que reescreve `useIntlayer('key')` → `useDictionary(hash)` e injeta importações JSON diretas.
- **intlayerPrune** – remove campos de conteúdo não utilizados do dictionary JSON.
- **intlayerMinify** – compacta dictionary JSON e opcionalmente faz mangling de nomes de campos.

Estes estão inativos em modo de desenvolvimento.

## Aliases Descontinuadas

| Exportação Descontinuada | Substituição |
| ------------------------ | ------------ |
| `intlayerPlugin`         | `intlayer`   |
| `intLayerPlugin`         | `intlayer`   |
