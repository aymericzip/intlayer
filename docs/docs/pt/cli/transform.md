---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Transformar Componentes
description: Aprenda como transformar componentes existentes para usar o Intlayer.
keywords:
  - Transformar
  - Componentes
  - Migração
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - transform
---

# Transformar componentes

```bash
npx intlayer transform
```

Este comando analisa seus arquivos de código para ajudar a migrar componentes existentes para usar o Intlayer. Ele suporta seleção interativa de arquivos ou direcionamento específico de arquivos.

## Apelidos:

- `npx intlayer trans`

## Argumentos:

**Opções de seleção de arquivos:**

- **`-f, --file [files...]`**: Lista de arquivos específicos para transformar. Se não for fornecido, o CLI irá escanear arquivos correspondentes (`**/*.{tsx,jsx,vue,svelte,ts,js}`) e solicitará que você selecione quais deseja transformar.

  > Exemplo: `npx intlayer transform -f src/components/MyComponent.tsx`

**Opções de saída:**

- **`-o, --output-content-declarations [outputContentDeclarations]`**: Diretório para salvar os arquivos gerados de declaração de conteúdo.

  > Exemplo: `npx intlayer transform -o src/content`

- **`--code-only`**: Apenas transforma o código do componente (não escreve declaração de conteúdo).

  > Exemplo: `npx intlayer transform --code-only`

- **`--declaration-only`**: Apenas gera a declaração de conteúdo (não reescreve o componente).

  > Exemplo: `npx intlayer transform --declaration-only`

**Opções de configuração:**

- **`--base-dir`**: Especifica o diretório base do projeto.
- **`--env`**: Especifica o ambiente.
- **`--env-file`**: Fornece um arquivo de ambiente personalizado.
- **`--verbose`**: Ativa o registro detalhado (verbose).

**Plugins necessários:**

O comando transform funciona sem plugins adicionais em arquivos TypeScript / JSX. No entanto, requer que os seguintes plugins estejam instalados para projetos Vue e Svelte:

- **`@intlayer/vue-transformer`**: Para arquivos Vue.
- **`@intlayer/svelte-transformer`**: Para arquivos Svelte.
