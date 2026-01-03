---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Enviar Dicionários
description: Aprenda como enviar seus dicionários para o editor e CMS do Intlayer.
keywords:
  - Enviar
  - Dicionários
  - CLI
  - Intlayer
  - Editor
  - CMS
slugs:
  - doc
  - concept
  - cli
  - push
---

# Enviar Dicionários

```bash
npx intlayer dictionary push
```

Se o [editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) estiver instalado, você também pode enviar dicionários para o editor. Este comando permitirá tornar os dicionários disponíveis para [o editor](https://app.intlayer.org/). Dessa forma, você pode compartilhar seus dicionários com sua equipe e editar seu conteúdo sem precisar alterar o código da sua aplicação.

## Apelidos:

- `npx intlayer dictionaries push`
- `npx intlayer dictionary push`
- `npx intlayer dic push`

## Argumentos:

**Opções de Dicionário:**

- **`-d`, `--dictionaries`**: ids dos dicionários para enviar. Se não especificado, todos os dicionários serão enviados.

  > Exemplo: `npx intlayer dictionary push -d my-dictionary-id my-other-dictionary-id`

- **`--dictionary`**: ids dos dicionários para enviar (apelido para --dictionaries).

  > Exemplo: `npx intlayer dictionary push --dictionary my-dictionary-id my-other-dictionary-id`

**Opções de Configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto. Para recuperar a configuração do intlayer, o comando irá procurar pelo arquivo `intlayer.config.{ts,js,json,cjs,mjs}` no diretório base.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`

- **`--no-cache`**: Desativa o cache.

  > Exemplo: `npx intlayer build --no-cache`

**Opções de variáveis de ambiente:**

- **`--env`**: Especifica o ambiente (ex.: `development`, `production`). Útil no caso de uso de variáveis de ambiente no arquivo de configuração do intlayer.
- **`--env-file`**: Fornece um arquivo de ambiente personalizado para carregar as variáveis. Útil no caso de uso de variáveis de ambiente no arquivo de configuração do intlayer.

  > Exemplo: `npx intlayer dictionary push --env-file .env.production.local`

  > Exemplo: `npx intlayer dictionary push --env production`

**Opções de saída:**

- **`-r`, `--delete-locale-dictionary`**: Ignora a pergunta que solicita a exclusão dos diretórios de locais após o envio dos dicionários, e os remove. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.

  > Exemplo: `npx intlayer dictionary push -r`

  > Exemplo: `npx intlayer dictionary push --delete-locale-dictionary`

- **`-k`, `--keep-locale-dictionary`**: Ignora a pergunta que solicita a exclusão dos diretórios de locais após o envio dos dicionários, e os mantém. Por padrão, se o dicionário estiver definido localmente, ele sobrescreverá o conteúdo dos dicionários remotos.

  > Exemplo: `npx intlayer dictionary push -k`

  > Exemplo: `npx intlayer dictionary push --keep-locale-dictionary`

**Opções de preparação:**

- **`--build`**: Constrói os dicionários antes de enviá-los para garantir que o conteúdo esteja atualizado. True forçará a construção, false pulará a construção, undefined permitirá usar o cache da construção.

**Opções de log:**

- **`--verbose`**: Ativa o log detalhado para depuração. (padrão para true ao usar CLI)

**Opções Git:**

- **`--git-diff`**: Executa apenas nos dicionários que incluem alterações desde a base (padrão `origin/main`) até o branch atual (padrão: `HEAD`).
- **`--git-diff-base`**: Especifica a referência base para o git diff (padrão `origin/main`).
- **`--git-diff-current`**: Especifica a referência atual para o git diff (padrão: `HEAD`).
- **`--uncommitted`**: Inclui alterações não comitadas.
- **`--unpushed`**: Inclui alterações não enviadas (unpushed).
- **`--untracked`**: Inclui arquivos não rastreados.

  > Exemplo: `npx intlayer dictionary push --git-diff --git-diff-base origin/main --git-diff-current HEAD`

  > Exemplo: `npx intlayer dictionary push --uncommitted --unpushed --untracked`
