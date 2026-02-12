---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Extrair strings
description: Aprenda como extrair strings dos seus componentes para um ficheiro .content próximo do componente.
keywords:
  - Extrair
  - Componentes
  - Migração
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - extract
---

# Extrair strings

```bash
npx intlayer extract
```

Este comando analisa os seus ficheiros de código para extrair strings dos componentes para um ficheiro .content próximo do componente. Suporta seleção interativa de ficheiros ou direcionamento de ficheiros específicos.

## Apelidos:

- `npx intlayer ext`

## Argumentos:

**Opções de seleção de ficheiros:**

- **`-f, --file [files...]`**: Lista de ficheiros específicos para extrair. Se não for fornecido, a CLI irá procurar ficheiros correspondentes (`**/*.{tsx,jsx,vue,svelte,ts,js}`) e pedir-lhe-á para selecionar quais extrair.

  > Exemplo: `npx intlayer extract -f src/components/MyComponent.tsx`

**Opções de saída:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Diretório onde serão guardados os ficheiros de declaração de conteúdo gerados.

  > Exemplo: `npx intlayer extract -o src/content`

- **`--code-only`**: Extrair apenas o código do componente (não escrever a declaração de conteúdo).

  > Exemplo: `npx intlayer extract --code-only`

- **`--declaration-only`**: Gerar apenas a declaração de conteúdo (não reescrever o componente).

  > Exemplo: `npx intlayer extract --declaration-only`

**Opções de configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--env`**: Especifica o ambiente.
- **`--env-file`**: Fornece um ficheiro de ambiente personalizado.
- **`--verbose`**: Ativa o logging detalhado.

**Plugins obrigatórios:**

O comando extract funciona sem plugins adicionais em ficheiros TypeScript/JSX. Contudo, requer os seguintes plugins instalados para projetos Vue e Svelte:

- **`@intlayer/vue-transformer`**: Para ficheiros Vue.
- **`@intlayer/svelte-transformer`**: Para ficheiros Svelte.
