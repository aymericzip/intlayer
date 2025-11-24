---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Testar traduções ausentes
description: Aprenda como testar e identificar traduções ausentes em seus dicionários.
keywords:
  - Teste
  - Traduções Ausentes
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Testar traduções ausentes

```bash
npx intlayer content test
```

## Apelidos:

- `npx intlayer test`

Este comando analisa seus arquivos de declaração de conteúdo para identificar traduções ausentes em todos os locais configurados. Ele fornece um relatório abrangente mostrando quais chaves de tradução estão faltando para quais locais, ajudando você a manter a consistência em seu conteúdo multilíngue.

## Exemplo de saída:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Locales: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Locais obrigatórios: en
Locais ausentes: pl, tr, es
Locais obrigatórios ausentes: -
Total de locais ausentes: 3
Total de locais obrigatórios ausentes: 0
```

## Argumentos:

**Opções de configuração:**

- **`--env`**: Especificar o ambiente (ex.: `development`, `production`).
- **`--env-file [envFile]`**: Fornecer um arquivo de ambiente personalizado para carregar variáveis.
- **`--base-dir`**: Especificar o diretório base do projeto.

  > Exemplo: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Desabilitar o cache.

  > Exemplo: `npx intlayer build --no-cache`

**Opções de preparação:**

- **`--build`**: Construir os dicionários antes de enviar para garantir que o conteúdo esteja atualizado. True forçará a construção, false pulará a construção, undefined permitirá usar o cache da construção.

**Opções de log:**

- **`--verbose`**: Ativar logging detalhado para depuração. (padrão para true usando CLI)

  > Exemplo: `npx intlayer content test --verbose`

## Exemplo:

```bash
npx intlayer content test --verbose
```

A saída ajuda você a identificar rapidamente quais traduções precisam ser concluídas para garantir que sua aplicação funcione corretamente em todos os locais configurados.
