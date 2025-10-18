---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Introdução
description: Descubra como o Intlayer funciona. Veja os passos usados pelo Intlayer na sua aplicação. Veja o que os diferentes pacotes fazem.
keywords:
  - Introdução
  - Começar
  - Intlayer
  - Aplicação
  - Pacotes
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Histórico inicial
---

# Documentação do Intlayer

Bem-vindo à documentação oficial do Intlayer! Aqui, você encontrará tudo o que precisa para integrar, configurar e dominar o Intlayer para todas as suas necessidades de internacionalização (i18n), seja você um desenvolvedor usando Next.js, React, Vite, Express ou outro ambiente JavaScript.

## Introdução

### O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração do seu conteúdo em qualquer lugar do seu código. Converte declarações de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Usando TypeScript, **Intlayer** torna seu desenvolvimento mais robusto e eficiente.

O Intlayer também oferece um editor visual opcional que permite editar e gerenciar seu conteúdo facilmente. Esse editor é particularmente útil para desenvolvedores que preferem uma interface visual para gerenciamento de conteúdo, ou para equipes que geram conteúdo sem precisar se preocupar com código.

### Exemplo de uso

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Conteúdo do componente com traduções multilíngues
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Principais Funcionalidades

Intlayer oferece uma variedade de funcionalidades adaptadas para atender às necessidades do desenvolvimento web moderno. Abaixo estão as principais funcionalidades, com links para documentação detalhada de cada uma:

- **Suporte à Internacionalização**: Amplie o alcance global da sua aplicação com suporte integrado para internacionalização.
- **Editor Visual**: Melhore seu fluxo de desenvolvimento com plugins de editor projetados para Intlayer. Confira o [Guia do Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
  };

```

## Principais Funcionalidades

O Intlayer oferece uma variedade de funcionalidades adaptadas para atender às necessidades do desenvolvimento web moderno. Abaixo estão as principais funcionalidades, com links para documentação detalhada de cada uma:

- **Suporte à Internacionalização**: Amplie o alcance global da sua aplicação com suporte integrado para internacionalização.
- **Editor Visual**: Melhore seu fluxo de trabalho de desenvolvimento com plugins de editor projetados para o Intlayer. Confira o [Guia do Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md).
- **Flexibilidade de Configuração**: Personalize sua configuração com opções extensas detalhadas no [Guia de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).
- **Ferramentas Avançadas de CLI**: Gerencie seus projetos de forma eficiente usando a interface de linha de comando do Intlayer. Explore as capacidades na [Documentação das Ferramentas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

## Conceitos Principais

### Dicionário

Organize seu conteúdo multilíngue próximo ao seu código para manter tudo consistente e fácil de manter.

- **[Começando](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/get_started.md)**
  Aprenda o básico de como declarar seu conteúdo no Intlayer.

- **[Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/translation.md)**
  Entenda como as traduções são geradas, armazenadas e utilizadas na sua aplicação.

- **[Enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/enumeration.md)**
  Gerencie facilmente conjuntos de dados repetidos ou fixos em vários idiomas.

- **[Condição](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/conditional.md)**
  Aprenda a usar lógica condicional no Intlayer para criar conteúdo dinâmico.

- **[Inserção](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/insertion.md)**
  Descubra como inserir valores em uma string usando espaços reservados para inserção.

- **[Busca por Função](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/function_fetching.md)**
  Veja como buscar conteúdo dinamicamente com lógica personalizada para adequar ao fluxo de trabalho do seu projeto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/markdown.md)**
  Aprenda a usar Markdown no Intlayer para criar conteúdo rico.

- **[Incorporação de Arquivos](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/file_embeddings.md)**
  Descubra como incorporar arquivos externos no Intlayer para usá-los no editor de conteúdo.

- **[Aninhamento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/nesting.md)**
  Entenda como aninhar conteúdo no Intlayer para criar estruturas complexas.

### Ambientes & Integrações

Construímos o Intlayer com flexibilidade em mente, oferecendo integração perfeita com frameworks populares e ferramentas de build:

- **[Intlayer com Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_15.md)**
- **[Intlayer com Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_14.md)**
- **[Intlayer com Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_nextjs_page_router.md)**
- **[Intlayer com React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_create_react_app.md)**
- **[Intlayer com Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+react.md)**
- **[Intlayer com React Native e Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_react_native+expo.md)**
- **[Intlayer com Lynx e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_lynx+react.md)**
- **[Intlayer com Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_express.md)**

Cada guia de integração inclui as melhores práticas para usar os recursos do Intlayer, como **renderização no lado do servidor**, **roteamento dinâmico** ou **renderização no lado do cliente**, para que você possa manter uma aplicação rápida, otimizada para SEO e altamente escalável.

## Contribuindo & Feedback

Valorizamos o poder do código aberto e do desenvolvimento orientado pela comunidade. Se desejar propor melhorias, adicionar um novo guia ou corrigir quaisquer problemas em nossa documentação, sinta-se à vontade para enviar um Pull Request ou abrir uma issue em nosso [repositório GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Pronto para traduzir sua aplicação de forma mais rápida e eficiente?** Mergulhe em nossa documentação para começar a usar o Intlayer hoje mesmo. Experimente uma abordagem robusta e simplificada para internacionalização que mantém seu conteúdo organizado e sua equipe mais produtiva.

---
