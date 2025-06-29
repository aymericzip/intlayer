---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md
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

# Intlayer: Uma maneira personalizada de traduzir seu site

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Permite declarar seu conteúdo em qualquer lugar do seu código. Converte a declaração de conteúdo multilíngue em dicionários estruturados para se integrar facilmente ao seu código. Usando TypeScript, o **Intlayer** torna seu desenvolvimento mais robusto e eficiente.

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

- **Gerenciamento de conteúdo baseado em JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente type-safe**: Use TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e livres de erros.
- **Arquivos de conteúdo integrados**: Mantenha suas traduções próximas aos seus respectivos componentes, melhorando a manutenibilidade e clareza.
- **Configuração simplificada**: Comece rapidamente com configuração mínima, especialmente otimizada para projetos Next.js.
- **Suporte a componentes de servidor**: Perfeitamente adequado para componentes de servidor Next.js, garantindo renderização do lado do servidor suave.
- **Roteamento aprimorado**: Suporte completo para roteamento de aplicativos Next.js, adaptando-se perfeitamente a estruturas de aplicativos complexas.
- **Base de código organizada**: Mantenha sua base de código mais organizada: 1 componente = 1 dicionário na mesma pasta.
- **Tipos TypeScript automáticos**: Os tipos TypeScript são implementados automaticamente, evitando quebra de código devido a chaves renomeadas ou excluídas.
- **Tradução automática CI**: Preencha automaticamente suas traduções em seu CI usando sua própria chave API OpenAI, eliminando a necessidade de uma plataforma L10n.
- **Integração de servidor MCP**: Fornece um servidor MCP (Model Context Protocol) para automação IDE, habilitando gerenciamento de conteúdo e fluxos de trabalho i18n perfeitamente dentro do seu ambiente de desenvolvimento. [Saiba mais](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md).
- **Suporte a Markdown**: Importe e interprete arquivos markdown para conteúdo multilíngue como políticas de privacidade.
- **Editor visual e CMS gratuitos**: Um editor visual e CMS gratuitos estão disponíveis se você precisar trabalhar com redatores de conteúdo para suas traduções, eliminando novamente a necessidade de uma plataforma de localização e permitindo a externalização de conteúdo da base de código.
- **Recuperação de conteúdo simplificada**: Não é necessário chamar sua função `t` para cada parte do conteúdo; recupere todo seu conteúdo diretamente usando um único hook.
- **Implementação consistente**: A mesma implementação para componentes de cliente e servidor, sem necessidade de passar sua função `t` através de cada componente de servidor.
- **Conteúdo tree-shakable**: O conteúdo é tree-shakable, tornando o bundle final mais leve.
- **Renderização estática não bloqueante**: O Intlayer não bloqueia a renderização estática como o `next-intl`.
- **Interoperabilidade**: Permite interoperabilidade com [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md), e [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-intl.md).
