---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Recebo um erro relacionado aos sub-pacotes @intlayer/*
description: Corrigir erro relacionado aos sub-pacotes @intlayer/*.
keywords:
  - @intlayer/*
  - sub-pacotes
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Recebo um erro relacionado aos sub-pacotes `@intlayer/*`

Este problema geralmente ocorre após uma atualização dos pacotes Intlayer.

Exemplo de mensagem de erro:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERRO  Nenhuma exportação correspondente em "node_modules/@intlayer/config/dist/esm/client.mjs" para a importação "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Razão

Pacotes base como `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer` estão reutilizando os mesmos sub-pacotes como `@intlayer/config`, `@intlayer/core`, `@intlayer/types` para evitar duplicação de código.

Entre duas versões, as exportações dos sub-pacotes não são garantidas como sendo as mesmas. Para limitar esse problema, o intlayer fixa a versão dos sub-pacotes para a versão do pacote principal.

> Ex: `intlayer@1.0.0` usa `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (Exceto para `@intlayer/swc`), os sub-pacotes `@intlayer/*` não são destinados a serem usados diretamente. Portanto, recomendamos não instalá-los diretamente.

## Resolução

1. Garanta que as versões do pacote principal e dos sub-pacotes sejam as mesmas.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Versão errada, deveria ser 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Tente remover o arquivo de bloqueio (lockfile) e a pasta node_modules e reinstalar as dependências.

Às vezes, o gerenciador de pacotes mantém uma versão antiga dos sub-pacotes no arquivo de bloqueio em cache. Para corrigir isso, você pode tentar remover o arquivo de bloqueio e a pasta node_modules e reinstalar as dependências.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Verifique a instalação global

Recomendamos instalar `intlayer` ou `intlayer-cli` globalmente para acessar os comandos CLI. Se a versão global não for a mesma que a versão local, o gerenciador de pacotes pode considerar a versão errada.

**Verifique se um pacote está instalado globalmente**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Corrigir potenciais conflitos de dependências globais**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Tente limpar o cache

Em alguns ambientes como docker, github actions, ou plataformas de hospedagem web como Vercel, pode haver um cache presente. Você pode tentar limpar o cache e tentar a instalação novamente.

Você também pode tentar limpar o cache do seu gerenciador de pacotes com o seguinte comando:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
