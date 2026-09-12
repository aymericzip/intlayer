---
createdAt: 2024-08-11
updatedAt: 2026-09-12
title: Comandos Live Sync
description: Aprenda como usar o Live Sync para refletir mudanças de conteúdo do CMS em tempo de execução.
keywords:
  - Live Sync
  - CMS
  - Runtime
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - live
author: aymericzip
---

# Comandos Live Sync

O Live Sync permite que seu app reflita mudanças de conteúdo do CMS em tempo de execução. Não é necessário rebuild ou redeploy. Quando ativado, as atualizações são transmitidas para um servidor Live Sync que atualiza os dicionários que sua aplicação lê. Veja [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md) para mais detalhes.

```json fileName="package.json"
"scripts": {
  "intlayer:live:start": "npx intlayer live start --with 'next dev --turbopack'"
}
```

## Argumentos:

**Opções de configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto. Para recuperar a configuração do intlayer, o comando irá procurar pelo arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

- **`--no-cache`**: Desativa o cache.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`

- **`--ci`**: Executa o comando em cada projeto Intlayer do monorepo (ou apenas no atual quando executado de dentro de um diretório de projeto). Credenciais por projeto podem ser injetadas via `INTLAYER_PROJECT_CREDENTIALS`, um objeto JSON que associa cada caminho de projeto a `{ "clientId", "clientSecret" }`.

  > Exemplo: `npx intlayer live --ci`

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração. (padrão é true ao usar CLI)
