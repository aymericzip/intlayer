# Intlayer: Uma maneira mais próxima de traduzir sua aplicação

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração de seu conteúdo em qualquer lugar no seu código. Converte a declaração de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Usando TypeScript, **Intlayer** torna seu desenvolvimento mais robusto e eficiente.

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

// Conteúdo traduzido do componente
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

// Conteúdo traduzido do componente
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

// Conteúdo traduzido do componente
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

// Exemplo de componente
export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// Exemplo de componente
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// Exemplo de componente
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Por que escolher o Intlayer?

- **Gerenciamento de Conteúdo com JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de forma eficiente.
- **Ambiente com Tipagem Segura**: Utilize TypeScript para garantir que todas as definições de conteúdo sejam precisas e livres de erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas aos seus respectivos componentes, melhorando a manutenção e a clareza.
- **Configuração Simplificada**: Comece rapidamente com configuração mínima, especialmente otimizado para projetos Next.js.
- **Suporte a Componentes de Servidor**: Perfeitamente adequado para componentes de servidor do Next.js, garantindo uma renderização no lado do servidor suave.
- **Roteamento Aprimorado**: Suporte completo para roteamento de aplicativos Next.js, adaptando-se perfeitamente a estruturas de aplicativos complexas.
- **Interoperabilidade**: Permite interoperabilidade com [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_next-intl.md), e [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_react-intl.md).
