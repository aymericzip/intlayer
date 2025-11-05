---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Como construir dicionários?
description: Aprenda como construir dicionários.
keywords:
  - construir
  - dicionários
  - intlayer
  - comando
  - watch
  - vscode
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - frequent-questions
  - build-dictionaries
---

# Construir Dicionários

## Como Construir Dicionários

O Intlayer fornece uma ferramenta de linha de comando para construir dicionários.

```bash
npx intlayer dictionaries build
```

Este comando:

- Escaneia todos os arquivos de declaração de conteúdo (`.content.{ts,tsx,js,mjs,cjs,json,...}`) no seu projeto.
- Gera dicionários e os armazena na pasta `.intlayer/dictionary`.

### Modo Watch

Se você quiser atualizar automaticamente os dicionários quando alterações forem feitas nos arquivos de declaração de conteúdo, execute o seguinte comando:

```bash
npx intlayer dictionaries build --watch
```

Neste modo, o Intlayer irá escanear e construir os dicionários sempre que alterações forem feitas nos arquivos de declaração de conteúdo e atualizará automaticamente a pasta `.intlayer/dictionary`.

### Usando a extensão do VSCode

Você também pode usar a [extensão Intlayer para VSCode](https://github.com/aymericzip/intlayer/tree/main/docs/pt/vs_code_extension.md) para melhorar sua experiência com o Intlayer no VSCode.

### Usando o plugin para seu framework de aplicação favorito

Se você estiver usando um framework como Next.js (Webpack / Turbopack), Vite, React Native, Lynx etc., o Intlayer fornece um plugin que você pode usar para integrar o Intlayer em sua aplicação.

O Intlayer irá construir os dicionários antes da compilação da sua aplicação.
Da mesma forma, no modo de desenvolvimento, o Intlayer irá monitorar as alterações nos seus arquivos de declaração de conteúdo e reconstruir os dicionários automaticamente.

Portanto, consulte a documentação específica do seu framework para aprender como integrar o plugin.
