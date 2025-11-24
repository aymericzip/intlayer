---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Puxar Dicionários
description: Aprenda como puxar dicionários do editor Intlayer e CMS.
keywords:
  - Puxar
  - Dicionários
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - pull
---

# Puxar Dicionários Remotos

```bash
npx intlayer pull
```

Se o [editor intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode puxar dicionários a partir do editor. Dessa forma, você pode sobrescrever o conteúdo dos seus dicionários conforme a necessidade da sua aplicação.

## Apelidos:

- `npx intlayer dictionaries pull`
- `npx intlayer dictionary pull`
- `npx intlayer dic pull`

## Argumentos:

**Opções de Dicionário:**

- **`-d, --dictionaries`**: IDs dos dicionários para puxar. Se não especificado, todos os dicionários serão puxados.

  > Exemplo: `npx intlayer dictionary pull -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: IDs dos dicionários para puxar (apelido para --dictionaries).

  > Exemplo: `npx intlayer dictionary pull --dictionary my-dictionary-id my-other-dictionary-id`

**Opções de configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto. Para recuperar a configuração do intlayer, o comando procurará o arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Desabilita o cache.

  > Exemplo: `npx intlayer build --no-cache`

**Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`).
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar as variáveis.
- **`--base-dir`**: Especifica o diretório base do projeto. Para recuperar a configuração do intlayer, o comando procurará o arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`

  > Exemplo: `npx intlayer dictionary push --env production`

**Opções de saída:**

- **`--new-dictionaries-path`**: Caminho para o diretório onde os novos dicionários serão salvos. Se não especificado, os novos dicionários serão salvos no diretório `./intlayer-dictionaries` do projeto. Se um campo `filePath` for especificado no conteúdo do seu dicionário, os dicionários não considerarão este argumento e serão salvos no diretório especificado pelo `filePath`.

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração. (padrão para true ao usar CLI)

## Exemplo:

```bash
npx intlayer dictionary pull --newDictionariesPath ./my-dictionaries-dir/
```
