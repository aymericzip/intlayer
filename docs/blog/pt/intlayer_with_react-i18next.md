---
createdAt: 2025-01-02
updatedAt: 2025-06-29
title: Intlayer e react-i18next
description: Compare o Intlayer com o react-i18next para um aplicativo React
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internacionalização
  - Blogumentação
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-react-i18next
---

# React Internationalization (i18n) com react-i18next e Intlayer

## Visão Geral

- **Intlayer** ajuda você a gerenciar traduções através de arquivos de declaração de conteúdo **a nível de componente**.
- **react-i18next** é uma integração popular do React para **i18next** que fornece hooks como `useTranslation` para buscar strings localizadas em seus componentes.

Quando combinados, Intlayer pode **exportar** dicionários em **JSON compatível com i18next** para que react-i18next possa **consumi-los** em tempo de execução.

## Por que usar Intlayer com react-i18next?

Os arquivos de declaração de conteúdo **Intlayer** oferecem uma melhor experiência para o desenvolvedor, pois são:

1. **Flexíveis na Colocação de Arquivos**  
   Coloque cada arquivo de declaração de conteúdo ao lado do componente que precisa dele. Essa estrutura permite que você mantenha traduções localizadas, prevenindo traduções órfãs quando componentes se movem ou são excluídos.

   ```bash codeFormat="typescript"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.ts # Arquivo de declaração de conteúdo
               └── index.tsx
   ```

   ```bash codeFormat="esm"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.mjs # Arquivo de declaração de conteúdo
               └── index.mjx
   ```

   ```bash codeFormat="cjs"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.cjs # Arquivo de declaração de conteúdo
               └── index.cjx
   ```

   ```bash codeFormat="json"
   .
   └── src
       └── components
           └── MyComponent
               ├── index.content.json # Arquivo de declaração de conteúdo
               └── index.jsx
   ```

2. **Traduções Centralizadas**  
   Um único arquivo de declaração de conteúdo coleta todas as traduções necessárias para um componente, tornando mais fácil identificar traduções ausentes.  
   Com TypeScript, você ainda recebe erros em tempo de compilação se traduções estiverem faltando.

## Instalação

Em um projeto Create React App, instale essas dependências:

```bash
# Com npm
npm install intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Com yarn
yarn add intlayer react-i18next i18next i18next-resources-to-backend
```

```bash
# Com pnpm
pnpm add intlayer react-i18next i18next i18next-resources-to-backend
```

### O que são esses pacotes?

- **intlayer** – A CLI e biblioteca principal para gerenciar configurações de i18n, declarações de conteúdo e construir saídas de dicionário.
- **react-intlayer** –
