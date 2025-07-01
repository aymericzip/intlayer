---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Interesse do Intlayer
description: Descubra os benefícios e vantagens de usar o Intlayer em seus projetos. Entenda por que o Intlayer se destaca entre outros frameworks.
keywords:
  - Benefícios
  - Vantagens
  - Intlayer
  - Framework
  - Comparação
---

# Intlayer: Uma forma personalizada de traduzir seu site

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração do seu conteúdo em qualquer lugar do seu código. Converte declarações de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Usando TypeScript, **Intlayer** torna seu desenvolvimento mais robusto e eficiente.

## Exemplo de uso

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Conteúdo de exemplo do componente com traduções multilíngues
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Conteúdo de exemplo do componente com traduções multilíngues
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Por que escolher o Intlayer?

| Recurso                                  | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gestão de Conteúdo com JavaScript**    | Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.                                                                                                                                                                                                                                                                                                                                                                            |
| **Ambiente com Tipagem Segura**          | Aproveite o TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e livres de erros.                                                                                                                                                                                                                                                                                                                                                              |
| **Arquivos de Conteúdo Integrados**      | Mantenha suas traduções próximas aos seus respectivos componentes, melhorando a manutenção e a clareza.                                                                                                                                                                                                                                                                                                                                                                      |
| **Configuração Simplificada**            | Comece rapidamente com configuração mínima, especialmente otimizada para projetos Next.js.                                                                                                                                                                                                                                                                                                                                                                                   |
| **Suporte a Componentes de Servidor**    | Perfeitamente adequado para componentes de servidor Next.js, garantindo uma renderização do lado do servidor suave.                                                                                                                                                                                                                                                                                                                                                          |
| **Roteamento Aprimorado**                | Suporte completo para roteamento de aplicativos Next.js, adaptando-se perfeitamente a estruturas complexas de aplicação.                                                                                                                                                                                                                                                                                                                                                     |
| **Código Organizado**                    | Mantenha seu código mais organizado: 1 componente = 1 dicionário na mesma pasta.                                                                                                                                                                                                                                                                                                                                                                                             |
| **Tradução Automática no CI**            | Preencha automaticamente suas traduções no seu CI usando sua própria chave de API do OpenAI, eliminando a necessidade de uma plataforma de L10n.                                                                                                                                                                                                                                                                                                                             |
| **Integração do Servidor MCP**           | Fornece um servidor MCP (Model Context Protocol) para automação em IDE, permitindo fluxos de trabalho contínuos de gerenciamento de conteúdo e i18n diretamente no seu ambiente de desenvolvimento. [Saiba mais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md).                                                                                                                                                                               |
| **Suporte a Markdown**                   | Importar e interpretar arquivos markdown para conteúdo multilíngue, como políticas de privacidade.                                                                                                                                                                                                                                                                                                                                                                           |
| **Editor Visual Gratuito & CMS**         | Um editor visual gratuito e CMS estão disponíveis se você precisar trabalhar com redatores de conteúdo para suas traduções, eliminando novamente a necessidade de uma plataforma de localização e permitindo a externalização do conteúdo fora da base de código.                                                                                                                                                                                                            |
| **Recuperação Simplificada de Conteúdo** | Não é necessário chamar sua função `t` para cada pedaço de conteúdo; recupere todo o seu conteúdo diretamente usando um único hook.                                                                                                                                                                                                                                                                                                                                          |
| **Implementação Consistente**            | A mesma implementação para componentes cliente e servidor, sem necessidade de passar sua função `t` por cada componente servidor.                                                                                                                                                                                                                                                                                                                                            |
| **Conteúdo Tree-shakable**               | O conteúdo é tree-shakable, o que alivia o pacote final.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Renderização Estática Não Bloqueante** | O Intlayer não bloqueia a Renderização Estática como o `next-intl` faz.                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Interoperabilidade**                   | Permite interoperabilidade com [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_next-intl.md), e [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_react-intl.md). |

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
