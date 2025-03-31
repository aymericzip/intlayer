# Documentação do Intlayer

Bem-vindo à documentação oficial do Intlayer! Aqui, você encontrará tudo o que precisa para integrar, configurar e dominar o Intlayer para todas as suas necessidades de internacionalização (i18n), seja trabalhando com Next.js, React, Vite, Express ou outro ambiente JavaScript.

## Introdução

### O que é o Intlayer?

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração de seu conteúdo em qualquer lugar do seu código. Converte declarações de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Usando TypeScript, **Intlayer** torna seu desenvolvimento mais robusto e eficiente.

O Intlayer também fornece um editor visual opcional que permite editar e gerenciar seu conteúdo facilmente. Este editor é particularmente útil para desenvolvedores que preferem uma interface visual para gerenciamento de conteúdo ou para equipes que geram conteúdo sem precisar se preocupar com código.

### Exemplo de uso

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

// Conteúdo traduzido do componente
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      pt: "Olá Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Conteúdo traduzido do componente
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      pt: "Olá Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Conteúdo traduzido do componente
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      pt: "Olá Mundo",
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
        "es": "Hola Mundo",
        "pt": "Olá Mundo"
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

O Intlayer oferece uma variedade de funcionalidades adaptadas às necessidades do desenvolvimento web moderno. Abaixo estão os principais recursos, com links para a documentação detalhada de cada um:

- **Suporte à Internacionalização**: Amplie o alcance global do seu aplicativo com suporte integrado à internacionalização.
- **Editor Visual**: Melhore seu fluxo de trabalho de desenvolvimento com plugins de editor projetados para o Intlayer. Confira o [Guia do Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_visual_editor.md).
- **Flexibilidade de Configuração**: Personalize sua configuração com opções extensivas detalhadas no [Guia de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).
- **Ferramentas Avançadas de CLI**: Gerencie seus projetos de forma eficiente usando a interface de linha de comando do Intlayer. Explore as capacidades na [Documentação de Ferramentas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

## Conceitos Centrais

### Dicionário

Organize seu conteúdo multilíngue próximo ao seu código para manter tudo consistente e fácil de gerenciar.

- **[Comece Aqui](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/get_started.md)**  
  Aprenda o básico sobre como declarar seu conteúdo no Intlayer.

- **[Tradução](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/translation.md)**  
  Entenda como as traduções são geradas, armazenadas e utilizadas em sua aplicação.

- **[Enumeração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/enumeration.md)**  
  Gerencie facilmente conjuntos repetidos ou fixos de dados em vários idiomas.

- **[Busca por Função](https://github.com/aymericzip/intlayer/blob/main/docs/pt/dictionary/function_fetching.md)**  
  Veja como buscar dinamicamente conteúdo com lógica personalizada para atender ao fluxo de trabalho do seu projeto.

### Ambientes e Integrações

Criamos o Intlayer com flexibilidade em mente, oferecendo integração perfeita com frameworks e ferramentas de construção populares:

- **[Intlayer com Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md)**
- **[Intlayer com Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_14.md)**
- **[Intlayer com Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_page_router.md)**
- **[Intlayer com React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md)**
- **[Intlayer com Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md)**
- **[Intlayer com Express](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_express.md)**

Cada guia de integração inclui as melhores práticas para usar os recursos do Intlayer, como **renderização no lado do servidor**, **roteamento dinâmico** ou **renderização no lado do cliente**, para que você possa manter um aplicativo rápido, amigável para SEO e altamente escalável.

## Contribuindo e Feedback

Valorizamos o poder do código aberto e do desenvolvimento orientado pela comunidade. Se você deseja propor melhorias, adicionar um novo guia ou corrigir quaisquer problemas em nossa documentação, sinta-se à vontade para enviar um Pull Request ou abrir uma issue em nosso [repositório no GitHub](https://github.com/aymericzip/intlayer/blob/main/docs).

**Pronto para traduzir seu aplicativo de forma mais rápida e eficiente?** Mergulhe em nossa documentação para começar a usar o Intlayer hoje. Experimente uma abordagem robusta e simplificada para internacionalização que mantém seu conteúdo organizado e sua equipe mais produtiva.

Boas traduções!
