---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/config - Gestão de Configuração para Intlayer
description: Pacote NPM para recuperar a configuração do Intlayer e definir variáveis de ambiente para configurações de internacionalização em diferentes ambientes.
keywords:
  - intlayer
  - configuração
  - ambiente
  - configurações
  - i18n
  - JavaScript
  - NPM
  - variáveis
slugs:
  - doc
  - package
  - @intlayer_config
---

# @intlayer/config: Pacote NPM para recuperar a configuração do Intlayer

**Intlayer** é um conjunto de pacotes projetados especificamente para desenvolvedores JavaScript. É compatível com frameworks como React, React e Express.js.

O pacote **`@intlayer/config`** é um pacote NPM que permite recuperar a configuração do Intlayer e definir as variáveis de ambiente relacionadas ao ambiente atual.

## Instalação

Instale o pacote necessário usando seu gerenciador de pacotes preferido:

```bash packageManager="npm"
npm install @intlayer/config
```

```bash packageManager="pnpm"
pnpm add @intlayer/config
```

```bash packageManager="yarn"
yarn add @intlayer/config
```

## Uso

### Ler a configuração do Intlayer usando o sistema de arquivos

Exemplo:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config";

const config: IntlayerConfig = getConfiguration();

console.log(config);
// Saída:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Esta função usa o pacote `fs` e funcionará apenas no lado do servidor.

### Ler a configuração do Intlayer usando variáveis de ambiente

Exemplo:

```ts
import { getConfiguration, type IntlayerConfig } from "@intlayer/config/client";

const config: IntlayerConfig = getConfiguration({
  env: "production",
});

console.log(config);
// Saída:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

> Esta função não retornará nada se as variáveis de ambiente não estiverem definidas.

### Definir as variáveis de ambiente

1. Crie um arquivo de configuração.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    /* ... */
  },
  middleware: {
    /* ... */
  },
  content: {
    /* ... */
  },
  editor: {
    /* ... */
  },
};

export default config;
```

> Veja a [documentação de configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md) para mais detalhes.

2. Defina as variáveis de ambiente.

```ts
import { getConfiguration } from "@intlayer/config";

const intlayerConfig = getConfiguration();

// Formate todos os valores de configuração como variáveis de ambiente
const env = formatEnvVariable();

// Defina cada variável de ambiente formatada em process.env
Object.assign(process.env, env);
```

3. Importe o arquivo de configuração.

```ts
import { getConfiguration } from "@intlayer/config/client";

const intlayerConfig = getConfiguration();
```

## Histórico do Documento

- 5.5.10 - 2025-06-29: Histórico inicial
